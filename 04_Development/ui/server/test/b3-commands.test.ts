import { describe, it, expect, afterAll } from 'vitest';
import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from '../db/types';
import { resolveActor } from '../modules/identity/actor';
import { createCommandPort } from '../modules/commands/dispatch';
import type { CommandPort } from '../../src/contract/commands';

const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};
const ID = {
  agentMfa: '22222222-2222-2222-2222-222222222222',
  clientNoMfa: '11111111-1111-1111-1111-111111111111',
  wcAdmin: 'aaaaaaaa-0000-0000-0000-0000000000a1',
  wcViewer: 'aaaaaaaa-0000-0000-0000-0000000000a2',
  w1: 'aaaaaaaa-0000-0000-0000-000000000001',
  m1: 'bbbbbbbb-0000-0000-0000-000000000001',
  m2: 'bbbbbbbb-0000-0000-0000-000000000002',
  dv1: 'cccccccc-0000-0000-0000-000000000001',
  rd1: 'dddddddd-0000-0000-0000-000000000001',
};

// Idempotency keys are persisted; on the reachable-DB path the same database is reused across runs.
// Prefix every key with a per-run token so each run executes fresh commands (a fixed key would replay).
const RUN = `b3-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const K = (s: string) => `${RUN}-${s}`;

const { Pool } = pg;
const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool: new Pool({ ...base, user: process.env.DB_ZONE1_USER ?? 'alda_zone1', max: 3 }) }),
});
const portFor = async (actorId: string): Promise<CommandPort> =>
  createCommandPort(db, await resolveActor(db, 'fixture', { actorId }));
afterAll(async () => {
  await db.destroy();
});

describe('B3 — command surface conformance (ADR-03: one operation per verb)', () => {
  it('createCommandPort provides all ten verb operations', async () => {
    const p = await portFor(ID.agentMfa);
    for (const op of ['record', 'import', 'assess', 'engage', 'file', 'respond', 'confirm', 'decide', 'release', 'review'] as const) {
      expect(typeof p[op]).toBe('function');
    }
  });
});

describe('B3 — commands route through the B2 authorization layer (never bypass it)', () => {
  it('a granted command → accepted (engagement grant on the engaged matter)', async () => {
    const p = await portFor(ID.agentMfa);
    const r = await p.assess({ idempotencyKey: K('assess-1'), params: { matterId: ID.m1 } });
    expect(r.status).toBe('accepted');
  });
  it('a granted workspace command → accepted (member meets required role)', async () => {
    const p = await portFor(ID.wcAdmin);
    const r = await p.record({ idempotencyKey: K('record-1'), params: { workspaceId: ID.w1, title: 'A disclosure' } });
    expect(r.status).toBe('accepted');
  });
  it('an in-tenancy actor above their role → permission-denied (with reason + who-can-act)', async () => {
    const p = await portFor(ID.wcViewer); // viewer trying an Import that requires admin
    const r = await p.import({ idempotencyKey: K('import-1'), params: { workspaceId: ID.w1 } });
    expect(r.status).toBe('permission-denied');
    if (r.status === 'permission-denied') {
      expect(r.reason.length).toBeGreaterThan(0);
      expect(r.whoCanAct).toMatch(/admin/);
    }
  });
});

describe('B3 — CR-5 preserved on the command surface (not-found never leaks as permission-denied)', () => {
  it('a command outside the actor’s tenancy → neutral rejected, NOT permission-denied', async () => {
    const p = await portFor(ID.agentMfa); // agent is not a member of W1
    const r = await p.record({ idempotencyKey: K('crossws-1'), params: { workspaceId: ID.w1, title: 'x' } });
    expect(r.status).toBe('rejected');
    expect(r.status).not.toBe('permission-denied');
  });
  it('a command on a matter with no engagement → neutral rejected', async () => {
    const p = await portFor(ID.clientNoMfa);
    const r = await p.assess({ idempotencyKey: K('crossmatter-1'), params: { matterId: ID.m1 } });
    expect(r.status).toBe('rejected');
  });
  it('an engaged agent, different matter → neutral rejected (no portfolio reach)', async () => {
    const p = await portFor(ID.agentMfa);
    const r = await p.file({ idempotencyKey: K('otherm-1'), params: { matterId: ID.m2 } });
    expect(r.status).toBe('rejected');
  });
});

describe('B3 — failure semantics: validation & missing idempotency key → rejected', () => {
  it('an empty required field → rejected', async () => {
    const p = await portFor(ID.wcAdmin);
    const r = await p.record({ idempotencyKey: K('empty-1'), params: { workspaceId: ID.w1, title: '  ' } });
    expect(r.status).toBe('rejected');
    if (r.status === 'rejected') expect(r.reason).toMatch(/title is required/i);
  });
  it('a missing idempotency key → rejected', async () => {
    const p = await portFor(ID.agentMfa);
    const r = await p.assess({ idempotencyKey: '', params: { matterId: ID.m1 } });
    expect(r.status).toBe('rejected');
    if (r.status === 'rejected') expect(r.reason).toMatch(/idempotency key is required/i);
  });
});

describe('B3 — idempotency (ADR-05)', () => {
  it('replaying the same key + verb returns the same accepted result (no double-apply)', async () => {
    const p = await portFor(ID.agentMfa);
    const key = K('idem-1');
    const first = await p.engage({ idempotencyKey: key, params: { matterId: ID.m1 } });
    const replay = await p.engage({ idempotencyKey: key, params: { matterId: ID.m1 } });
    expect(first.status).toBe('accepted');
    expect(replay.status).toBe('accepted');
    const rows = await db
      .selectFrom('commands.idempotency')
      .select((eb) => eb.fn.countAll<number>().as('n'))
      .where('key', '=', key)
      .executeTakeFirstOrThrow();
    expect(Number(rows.n)).toBe(1); // recorded exactly once
  });
  it('reusing a key for a DIFFERENT verb → conflict', async () => {
    const p = await portFor(ID.agentMfa);
    const key = K('idem-2');
    await p.engage({ idempotencyKey: key, params: { matterId: ID.m1 } });
    const conflict = await p.assess({ idempotencyKey: key, params: { matterId: ID.m1 } });
    expect(conflict.status).toBe('conflict');
  });
});

describe('B3 — deny is logged as loudly as grant (T-5, M0.10)', () => {
  it('an accepted and a denied command both append Event-Log entries', async () => {
    const before = await countCommandEvents();
    const p = await portFor(ID.agentMfa);
    await p.assess({ idempotencyKey: K('log-ok'), params: { matterId: ID.m1 } });   // accepted
    await p.assess({ idempotencyKey: K('log-deny'), params: { matterId: ID.m2 } });  // rejected (not engaged)
    const after = await countCommandEvents();
    expect(after).toBe(before + 2);
  });
});

async function countCommandEvents(): Promise<number> {
  const r = await db
    .selectFrom('eventlog.event')
    .select((eb) => eb.fn.countAll<number>().as('n'))
    .where('type', 'in', ['access.granted', 'access.denied'])
    .executeTakeFirstOrThrow();
  return Number(r.n);
}
