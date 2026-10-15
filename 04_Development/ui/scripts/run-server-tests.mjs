/**
 * ALDASSIST Phase 9 — B1b: server TS-2 / Event-Log / contract-E2E test runner (D-2026-031).
 *
 * These tests enforce zone separation at the DB-permission level, Event-Log immutability, and the
 * trivial contract-mode resource end-to-end, so they require a real PostgreSQL (pg-mem cannot enforce
 * roles/GRANTs/triggers). Per D-2026-031 the runner uses a DISPOSABLE Docker PostgreSQL by default and
 * always tears it down; if an admin DB is already reachable (DATABASE_URL_ADMIN), it uses that instead
 * (dev/CI where a database is already provisioned). If neither is available it FAILS loudly — this is a
 * mandatory Floor gate, never silently skipped.
 *
 * Usage:  node scripts/run-server-tests.mjs
 * Env:    DATABASE_URL_ADMIN  — if set and reachable, used directly (no Docker).
 */
import { execSync, execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import net from 'node:net';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTAINER = 'alda-b1b-verify';
// Default to Docker Hub's postgres:16-alpine (D-2026-031). Overridable so the gate also runs in
// locked-down CI that mirrors images from an internal registry (set ALDA_PG_IMAGE=<registry>/postgres:16).
const IMAGE = process.env.ALDA_PG_IMAGE ?? 'postgres:16-alpine';
// Default database name for the disposable Docker path. On the reachable-DB path the database name is
// taken from DATABASE_URL_ADMIN so the migration and the test connections always target the SAME
// database (see audit finding M-1).
const DEFAULT_DB_NAME = 'alda_b1b';

function run(cmd, env) {
  execSync(cmd, { cwd: root, stdio: 'inherit', env: { ...process.env, ...env } });
}
function tryExec(file, args) {
  try { return { ok: true, out: execFileSync(file, args, { encoding: 'utf8' }) }; }
  catch (e) { return { ok: false, out: `${e.stdout || ''}${e.stderr || ''}` }; }
}
function hasDocker() {
  return tryExec('docker', ['version', '--format', '{{.Server.Version}}']).ok;
}
async function reachable(host, port, timeoutMs = 1200) {
  return new Promise((res) => {
    const s = net.connect({ host, port }, () => { s.end(); res(true); });
    s.on('error', () => res(false));
    s.setTimeout(timeoutMs, () => { s.destroy(); res(false); });
  });
}
function parseAdminUrl(url) {
  const u = new URL(url);
  // The database is the URL path minus its leading slash (empty if the URL omits it).
  const database = decodeURIComponent(u.pathname.replace(/^\//, ''));
  return { host: u.hostname, port: Number(u.port || '5432'), database: database || undefined };
}

async function main() {
  let adminUrl = process.env.DATABASE_URL_ADMIN;
  let host = process.env.DB_HOST ?? '127.0.0.1';
  let port = Number(process.env.DB_PORT ?? '5432');
  // dbName defaults to the Docker-path constant; the reachable path below overrides it from the admin URL.
  let dbName = DEFAULT_DB_NAME;
  let startedContainer = false;

  // 1) Prefer an already-reachable admin DB (dev/CI).
  if (adminUrl) {
    const { host: h, port: p, database: d } = parseAdminUrl(adminUrl);
    if (await reachable(h, p)) {
      host = h; port = p;
      // M-1 fix: the migration runs against DATABASE_URL_ADMIN, so the tests MUST connect to the same
      // database. Take the db name from the admin URL; never silently fall back to a different name.
      if (d) {
        // Guard: if DB_NAME is explicitly set and disagrees with the admin URL, fail loudly rather than
        // migrating one database and testing another.
        if (process.env.DB_NAME && process.env.DB_NAME !== d) {
          console.error(
            `\n[server-tests] FAIL: DB_NAME='${process.env.DB_NAME}' conflicts with the database in ` +
            `DATABASE_URL_ADMIN ('${d}'). The migration and the tests would target different databases. ` +
            `Unset DB_NAME or make it match the admin URL.\n`,
          );
          process.exit(4);
        }
        dbName = d;
      } else {
        // Admin URL omitted the database — fall back to DB_NAME env or the default, and pin the admin
        // URL to that same database so migration and tests still agree.
        dbName = process.env.DB_NAME ?? DEFAULT_DB_NAME;
        const u = new URL(adminUrl);
        u.pathname = `/${dbName}`;
        adminUrl = u.toString();
      }
      console.log(`[server-tests] using reachable DATABASE_URL_ADMIN at ${h}:${p} — database '${dbName}'`);
    } else {
      console.log(`[server-tests] DATABASE_URL_ADMIN set but ${h}:${p} not reachable — falling back`);
      adminUrl = undefined;
    }
  }

  // 2) Otherwise provision a disposable Docker PostgreSQL (D-2026-031).
  if (!adminUrl) {
    if (!hasDocker()) {
      console.error(
        '\n[server-tests] FAIL: no reachable database and Docker is unavailable.\n' +
        '  The B1b TS-2 / Event-Log / contract gates require a real PostgreSQL.\n' +
        '  Fix: start Docker, or set DATABASE_URL_ADMIN to a reachable Postgres (superuser/owner).\n',
      );
      process.exit(3);
    }
    dbName = process.env.DB_NAME ?? DEFAULT_DB_NAME;
    tryExec('docker', ['rm', '-f', CONTAINER]); // clear any stale container
    console.log('[server-tests] starting disposable Docker PostgreSQL...');
    execFileSync('docker', [
      'run', '-d', '--name', CONTAINER,
      '-e', 'POSTGRES_HOST_AUTH_METHOD=trust',
      '-e', `POSTGRES_DB=${dbName}`,
      '-p', '127.0.0.1::5432',
      IMAGE,
    ], { stdio: 'inherit' });
    startedContainer = true;
    // discover the mapped host port (L-2: `docker port` may print several lines, e.g. IPv4 + IPv6 —
    // take the first line and the last colon-separated token of that line).
    const mapping = execFileSync('docker', ['port', CONTAINER, '5432/tcp'], { encoding: 'utf8' })
      .split('\n').map((l) => l.trim()).filter(Boolean)[0] ?? '';
    port = Number(mapping.split(':').pop());
    if (!Number.isInteger(port) || port <= 0) {
      tryExec('docker', ['rm', '-f', CONTAINER]);
      throw new Error(`could not parse mapped host port from docker output: "${mapping}"`);
    }
    host = '127.0.0.1';
    adminUrl = `postgres://postgres@${host}:${port}/${dbName}`;
    // wait for readiness
    let ready = false;
    for (let i = 0; i < 60; i++) {
      const r = tryExec('docker', ['exec', CONTAINER, 'pg_isready', '-U', 'postgres', '-d', dbName]);
      if (r.ok && /accepting connections/.test(r.out)) { ready = true; break; }
      await new Promise((res) => setTimeout(res, 500));
    }
    if (!ready) { tryExec('docker', ['rm', '-f', CONTAINER]); throw new Error('Postgres did not become ready'); }
    console.log(`[server-tests] Docker PostgreSQL ready at ${host}:${port}`);
  }

  const testEnv = {
    DB_HOST: host,
    DB_PORT: String(port),
    DB_NAME: dbName, // always the SAME database the migration ran against (M-1 fix)
    DB_ZONE1_USER: 'alda_zone1',
    DB_ZONE2_USER: 'alda_zone2',
    DB_ZONE3_USER: 'alda_zone3',
    DATABASE_URL_ADMIN: adminUrl,
    DATABASE_URL: adminUrl, // node-pg-migrate reads this
  };

  let exitCode = 0;
  try {
    console.log('[server-tests] applying migration (schemas, per-zone roles/GRANTs, Event Log, seed)...');
    // npx, not node_modules/.bin/... : execSync goes through cmd.exe on Windows, which reads a
    // forward-slash path as a command plus switches. Matches the npx vitest call below.
    run('npx --no-install node-pg-migrate up -m server/migrations -d DATABASE_URL', testEnv);
    console.log('[server-tests] running server suite (TS-2, Event Log, contract E2E, static fitness)...');
    run('npx vitest run --config vitest.server.config.ts', testEnv);
  } catch {
    exitCode = 1;
  } finally {
    if (startedContainer) {
      console.log('[server-tests] tearing down disposable Docker PostgreSQL...');
      tryExec('docker', ['rm', '-f', CONTAINER]);
    }
  }
  process.exit(exitCode);
}

main().catch((e) => { console.error('[server-tests] error:', e.message); process.exit(1); });
