/**
 * ALDASSIST Phase 8 — aggregate verification orchestrator (B9).
 *
 * Runs every gate and prints ONE explicit table. Its defining behaviour (B9 mandate): it DISTINGUISHES a
 * passing gate from an intentional INHERITED BASELINE, and never reports the whole run clean just because a
 * sub-command exited. In particular the token checker exits 1 BY DESIGN (Gate A carries 211 inherited
 * deferred refs); this orchestrator treats that as PASS *only* when Gate A == the inherited baseline and
 * Gate B == 0 — and FAILS the moment Gate A grows (new debt) or Gate B regresses. Likewise the raw-value
 * gate passes only when no NEW raw values appear beyond its committed baseline.
 *
 * Usage:  node scripts/verify.mjs           (full run incl. build + Storybook)
 *         node scripts/verify.mjs --fast     (skip the slow build + Storybook gates; the rest still run)
 */
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FAST = process.argv.includes('--fast');

// The INHERITED, documented Gate-A baseline (deferred component-style debt predating B9). B9 introduces
// ZERO new Gate-A debt: verification passes only while Gate A == this number. Reducing it is an
// improvement (still passes); exceeding it is NEW DEBT (fails). Changing this constant is a Decision-Log act.
const INHERITED_GATE_A_BASELINE = 211;

function sh(cmd) {
  try {
    const out = execSync(cmd, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: `${e.stdout || ''}${e.stderr || ''}` };
  }
}

const rows = [];
function record(gate, pass, detail) {
  rows.push({ gate, pass, detail });
}

// 1. Typecheck --------------------------------------------------------------
{
  const r = sh('npx tsc --noEmit');
  record('typecheck', r.code === 0, r.code === 0 ? 'exit 0 (clean)' : `exit ${r.code}`);
}

// 2. Tests (full suite — includes vocabulary, consistency, open-slot, scanner specs) -----------------
{
  const r = sh('npx vitest run');
  const m = r.out.match(/Tests\s+(\d+)\s+passed(?:\s+\((\d+)\))?/);
  const failed = /(\d+)\s+failed/.test(r.out);
  record('tests', r.code === 0 && !failed, m ? `${m[1]} passed` : `exit ${r.code}`);
}

// 3. Token hierarchy — Gate A (inherited vs new), Gate B, anti-leak, harness -------------------------
{
  const r = sh('node scripts/check-token-hierarchy.mjs');
  const summary = r.out.match(/Gate A:\s*(\d+)[^;]*;\s*Gate B:\s*(\d+)[^;]*;\s*(\d+)\s*anti-leak[^;]*;\s*(\d+)\s*harness/i);
  if (!summary) {
    record('token Gate A (inherited/new)', false, 'could not parse token-checker output');
    record('token Gate B', false, 'could not parse');
    record('token anti-leak', false, 'could not parse');
    record('token harness', false, 'could not parse');
  } else {
    const gateA = Number(summary[1]);
    const gateB = Number(summary[2]);
    const antiLeak = Number(summary[3]);
    const harness = Number(summary[4]);
    const newDebt = gateA - INHERITED_GATE_A_BASELINE;
    record('token Gate A (inherited/new)', newDebt <= 0,
      `inherited baseline ${INHERITED_GATE_A_BASELINE}; current ${gateA}; new debt ${newDebt > 0 ? '+' + newDebt : 0}`);
    record('token Gate B', gateB === 0, `${gateB} definition hard-fail(s)`);
    record('token anti-leak', antiLeak === 0, `${antiLeak} violation(s)`);
    record('token harness', harness === 0, `${harness} finding(s)`);
  }
}

// 4. Raw design-value scanner — inherited baseline vs new violations --------------------------------
{
  const r = sh('node scripts/check-raw-values.mjs');
  const inh = r.out.match(/(\d+)\s*occurrence/);
  const pass = r.code === 0;
  record('raw-value (inherited/new)', pass,
    pass ? `inherited baseline ${inh ? inh[1] : '?'} occurrence(s); 0 new` : r.out.trim().split('\n')[0]);
}

// 5. Vocabulary corpus (discrete line) --------------------------------------------------------------
{
  const r = sh('npx vitest run src/test/vocabulary.crosscutting.test.ts');
  record('vocabulary (CR-16)', r.code === 0,
    r.code === 0 ? '0 banned-term violation(s) — provisional seed; lexicon authority = NOT authoritative' : `exit ${r.code}`);
}

// 6. Open-slot preservation (discrete line) ---------------------------------------------------------
{
  const r = sh('npx vitest run src/test/openSlots.preservation.test.ts');
  record('open-slot preservation', r.code === 0,
    r.code === 0 ? 'O-2026-001 / L1 / L1-04 / S-3 / MFA / Rules-Engine all UNRESOLVED' : `exit ${r.code}`);
}

// 7. Build + 8. Storybook (heavy; skipped under --fast) ----------------------------------------------
if (FAST) {
  record('build (vite)', null, 'skipped (--fast)');
  record('storybook build', null, 'skipped (--fast)');
} else {
  const b = sh('npx vite build');
  record('build (vite)', b.code === 0, b.code === 0 ? 'exit 0' : `exit ${b.code}`);
  const s = sh('npm run build-storybook');
  record('storybook build', s.code === 0, s.code === 0 ? 'exit 0' : `exit ${s.code}`);
}

// ---- Report ---------------------------------------------------------------------------------------
const mark = (p) => (p === null ? '— SKIP' : p ? '✓ PASS' : '✗ FAIL');
const width = Math.max(...rows.map((r) => r.gate.length));
console.log('\nB9 aggregate verification\n' + '='.repeat(60));
for (const r of rows) console.log(`${mark(r.pass)}  ${r.gate.padEnd(width)}  ${r.detail}`);
console.log('='.repeat(60));

const hardFail = rows.some((r) => r.pass === false);
console.log(hardFail
  ? 'VERIFY: FAIL — one or more gates did not meet their pass condition (see ✗ above).'
  : 'VERIFY: PASS — all gates meet their pass condition; token Gate A and raw-value gate are at their documented INHERITED baselines (no new debt), not clean-by-accident.');
process.exit(hardFail ? 1 : 0);
