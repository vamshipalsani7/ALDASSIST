import { describe, it, expect, afterAll } from 'vitest';
import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from '../db/types';
import { resolveActor, ActorNotFoundError, LiveSessionUnavailableError } from '../modules/identity/actor';
import { checkMfaPolicy } from '../modules/identity/mfa';
import { logAccess } from '../modules/identity/accessLog';

const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};

// Fixed-UUID seed principals from the B2a migration.
const A = {
  clientNoMfa: '11111111-1111-1111-1111-111111111111',
  agentMfa: '22222222-2222-2222-2222-222222222222',
  agentNoMfa: '33333333-3333-3333-3333-333333333333',
  instAdminNoMfa: '44444444-4444-4444-4444-444444444444',
  internalMfa: '55555555-5555-5555-5555-555555555555',
  internalNoMfa: '66666666-6666-6666-6666-666666666666',
};

const { Pool } = pg;
function zone1Db(): Kysely<Database> {
  const pool = new Pool({ ...base, user: process.env.DB_ZONE1_USER ?? 'alda_zone1', max: 2 });
  return new Kysely<Database>({ dialect: new PostgresDialect({ pool }) });
}
const db = zone1Db();

afterAll(async () => {
  await db.destroy();
});

describe('B2a — server-resolved actor seam (T-1 / D-2026-025)', () => {
  it('resolves a seeded actor in `fixture` mode from the Zone-1 pool', async () => {
    const actor = await resolveActor(db, 'fixture', { actorId: A.agentMfa });
    expect(actor).toEqual({ id: A.agentMfa, principalType: 'agent', mfaSatisfied: true });
  });

  it('resolves in `contract` mode as well (same server-side resolution)', async () => {
    const actor = await resolveActor(db, 'contract', { actorId: A.clientNoMfa });
    expect(actor.principalType).toBe('client_user');
  });

  it('`live` mode is FAIL-CLOSED — no session mechanism decided yet (B2 Option A)', async () => {
    await expect(resolveActor(db, 'live', { actorId: A.agentMfa })).rejects.toBeInstanceOf(
      LiveSessionUnavailableError,
    );
  });

  it('an unknown actor is uniform absence — `not found`, carrying nothing (T-3)', async () => {
    await expect(
      resolveActor(db, 'fixture', { actorId: '00000000-0000-0000-0000-0000000000ff' }),
    ).rejects.toBeInstanceOf(ActorNotFoundError);
  });
});

describe('B2a — mandatory MFA policy (T-6); client MFA is S-10, NOT gated', () => {
  it('privileged principals without satisfied MFA are denied', async () => {
    for (const id of [A.agentNoMfa, A.instAdminNoMfa, A.internalNoMfa]) {
      const actor = await resolveActor(db, 'fixture', { actorId: id });
      const r = checkMfaPolicy(actor);
      expect(r.satisfied).toBe(false);
      expect(r.reason).toMatch(/MFA required/i);
    }
  });

  it('privileged principals with satisfied MFA pass', async () => {
    for (const id of [A.agentMfa, A.internalMfa]) {
      const actor = await resolveActor(db, 'fixture', { actorId: id });
      expect(checkMfaPolicy(actor).satisfied).toBe(true);
    }
  });

  it('client users are NOT gated by MFA (S-10 unresolved — stays a container)', async () => {
    const actor = await resolveActor(db, 'fixture', { actorId: A.clientNoMfa });
    expect(actor.mfaSatisfied).toBe(false);
    expect(checkMfaPolicy(actor).satisfied).toBe(true);
  });
});

describe('B2a — deny is logged as loudly as grant (T-5, M0.10)', () => {
  it('both granted and denied access decisions append immutable Event-Log entries', async () => {
    const before = await countAccessEvents();
    await logAccess(db, { decision: 'granted', actorId: A.agentMfa, action: 'b2a.selftest' });
    await logAccess(db, { decision: 'denied', actorId: A.agentNoMfa, action: 'b2a.selftest', reason: 'mfa' });
    const after = await countAccessEvents();
    expect(after).toBe(before + 2);
  });
});

describe('B2a — identity.actor stays Zone-1 (zone separation at the DB level)', () => {
  it('Zone-3 role CANNOT read identity.actor (permission denied)', async () => {
    const r = await asRole('alda_zone3', 'select * from identity.actor limit 1');
    expect(r.ok).toBe(false);
    expect(String(r.error)).toMatch(/permission denied/i);
  });
  it('Zone-1 role CAN read identity.actor (positive control)', async () => {
    const r = await asRole(process.env.DB_ZONE1_USER ?? 'alda_zone1', 'select * from identity.actor limit 1');
    expect(r.ok).toBe(true);
  });
});

async function countAccessEvents(): Promise<number> {
  const r = await db
    .selectFrom('eventlog.event')
    .select((eb) => eb.fn.countAll<number>().as('n'))
    .where('type', 'in', ['access.granted', 'access.denied'])
    .executeTakeFirstOrThrow();
  return Number(r.n);
}

async function asRole(user: string, sql: string): Promise<{ ok: boolean; error?: string }> {
  const c = new pg.Client({ ...base, user });
  try {
    await c.connect();
    await c.query(sql);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  } finally {
    await c.end().catch(() => {});
  }
}
