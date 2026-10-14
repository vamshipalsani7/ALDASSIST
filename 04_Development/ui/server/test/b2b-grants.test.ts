import { describe, it, expect, afterAll } from 'vitest';
import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from '../db/types';
import { resolveActor } from '../modules/identity/actor';
import {
  authorizeWorkspace,
  authorizeEngagement,
  authorizeReview,
  authorizeOps,
} from '../modules/identity/grants';

const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};

// Fixed-UUID seed identifiers (B2a actors + B2b grants).
const ID = {
  agentMfa: '22222222-2222-2222-2222-222222222222',
  internalMfa: '55555555-5555-5555-5555-555555555555',
  internalNoMfa: '66666666-6666-6666-6666-666666666666',
  clientNoMfa: '11111111-1111-1111-1111-111111111111',
  wcAdmin: 'aaaaaaaa-0000-0000-0000-0000000000a1',
  wcViewer: 'aaaaaaaa-0000-0000-0000-0000000000a2',
  w1: 'aaaaaaaa-0000-0000-0000-000000000001',
  m1: 'bbbbbbbb-0000-0000-0000-000000000001',
  m2: 'bbbbbbbb-0000-0000-0000-000000000002',
  dv1: 'cccccccc-0000-0000-0000-000000000001',
  dv2: 'cccccccc-0000-0000-0000-0000000000ff',
  rd1: 'dddddddd-0000-0000-0000-000000000001',
  rd2: 'dddddddd-0000-0000-0000-000000000002',
};

const { Pool } = pg;
const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({ ...base, user: process.env.DB_ZONE1_USER ?? 'alda_zone1', max: 2 }),
  }),
});
const actor = (id: string) => resolveActor(db, 'fixture', { actorId: id });

afterAll(async () => {
  await db.destroy();
});

describe('B2b — Shape 1: workspace membership (roled, one tenancy)', () => {
  it('a member at/above the required role → granted', async () => {
    expect(await authorizeWorkspace(db, await actor(ID.wcAdmin), { workspaceId: ID.w1, requiredRole: 'admin' }))
      .toEqual({ decision: 'granted' });
    expect(await authorizeWorkspace(db, await actor(ID.wcViewer), { workspaceId: ID.w1, requiredRole: 'viewer' }))
      .toEqual({ decision: 'granted' });
  });
  it('a member below the required role → permission-denied with reason + who-can-act', async () => {
    const r = await authorizeWorkspace(db, await actor(ID.wcViewer), { workspaceId: ID.w1, requiredRole: 'admin' });
    expect(r.decision).toBe('permission-denied');
    if (r.decision === 'permission-denied') {
      expect(r.reason).toMatch(/below the required/i);
      expect(r.whoCanAct).toMatch(/admin/);
      expect(r.whoCanAct).toMatch(/owner/);
    }
  });
  it('a non-member (agent) → not-found, carrying nothing', async () => {
    const r = await authorizeWorkspace(db, await actor(ID.agentMfa), { workspaceId: ID.w1, requiredRole: 'viewer' });
    expect(r).toEqual({ decision: 'not-found' });
    expect(r).not.toHaveProperty('reason');
    expect(r).not.toHaveProperty('whoCanAct');
  });
});

describe('B2b — Shape 2: engagement grant (one matter, never the portfolio)', () => {
  it('the engaged matter → granted', async () => {
    expect(await authorizeEngagement(db, await actor(ID.agentMfa), { matterId: ID.m1 }))
      .toEqual({ decision: 'granted' });
  });
  it('a different matter → not-found (no portfolio-wide reach)', async () => {
    expect(await authorizeEngagement(db, await actor(ID.agentMfa), { matterId: ID.m2 }))
      .toEqual({ decision: 'not-found' });
  });
  it('an actor with no engagement → not-found', async () => {
    expect(await authorizeEngagement(db, await actor(ID.clientNoMfa), { matterId: ID.m1 }))
      .toEqual({ decision: 'not-found' });
  });
});

describe('B2b — Shape 3: review grant (one Disclosure version + one ReviewDecision)', () => {
  it('the exact (version, decision) → granted', async () => {
    expect(await authorizeReview(db, await actor(ID.agentMfa), { disclosureVersionId: ID.dv1, reviewDecisionId: ID.rd1 }))
      .toEqual({ decision: 'granted' });
  });
  it('the right version but a different decision → not-found', async () => {
    expect(await authorizeReview(db, await actor(ID.agentMfa), { disclosureVersionId: ID.dv1, reviewDecisionId: ID.rd2 }))
      .toEqual({ decision: 'not-found' });
  });
  it('a different version → not-found', async () => {
    expect(await authorizeReview(db, await actor(ID.agentMfa), { disclosureVersionId: ID.dv2, reviewDecisionId: ID.rd1 }))
      .toEqual({ decision: 'not-found' });
  });
});

describe('B2b — Shape 4: Ops access (internal; metadata only; MFA + justification; no bodies)', () => {
  it('internal + MFA + justification + metadata → granted', async () => {
    expect(authorizeOps(await actor(ID.internalMfa), { scope: 'metadata', justification: 'audit-42' }))
      .toEqual({ decision: 'granted' });
  });
  it('internal reaching for a Disclosure body → permission-denied (BR-16)', async () => {
    const r = authorizeOps(await actor(ID.internalMfa), { scope: 'disclosure_body', justification: 'audit-42' });
    expect(r.decision).toBe('permission-denied');
    if (r.decision === 'permission-denied') {
      expect(r.reason).toMatch(/metadata only|Disclosure bodies|BR-16/i);
      expect(r.whoCanAct).toMatch(/consent|BR-16/i);
    }
  });
  it('internal without satisfied MFA → permission-denied (T-6)', async () => {
    const r = authorizeOps(await actor(ID.internalNoMfa), { scope: 'metadata', justification: 'audit-42' });
    expect(r.decision).toBe('permission-denied');
    if (r.decision === 'permission-denied') expect(r.reason).toMatch(/MFA required/i);
  });
  it('internal without a justification → permission-denied', async () => {
    const r = authorizeOps(await actor(ID.internalMfa), { scope: 'metadata' });
    expect(r.decision).toBe('permission-denied');
    if (r.decision === 'permission-denied') expect(r.reason).toMatch(/justification/i);
  });
  it('a non-internal actor → not-found (no Ops relationship)', async () => {
    const r = authorizeOps(await actor(ID.clientNoMfa), { scope: 'metadata', justification: 'x' });
    expect(r).toEqual({ decision: 'not-found' });
  });
});

describe('B2b — CR-5: not-found and permission-denied are never conflated', () => {
  it('an outside actor gets not-found (never permission-denied)', async () => {
    const r = await authorizeWorkspace(db, await actor(ID.agentMfa), { workspaceId: ID.w1, requiredRole: 'viewer' });
    expect(r.decision).toBe('not-found');
    expect(r.decision).not.toBe('permission-denied');
  });
  it('an in-tenancy but under-privileged actor gets permission-denied (never not-found)', async () => {
    const r = await authorizeWorkspace(db, await actor(ID.wcViewer), { workspaceId: ID.w1, requiredRole: 'owner' });
    expect(r.decision).toBe('permission-denied');
    expect(r.decision).not.toBe('not-found');
  });
});

describe('B2b — grant tables stay Zone-1 (DB-level separation)', () => {
  it('Zone-3 role CANNOT read identity.membership (permission denied)', async () => {
    const c = new pg.Client({ ...base, user: 'alda_zone3' });
    let err = '';
    try {
      await c.connect();
      await c.query('select * from identity.membership limit 1');
    } catch (e) {
      err = (e as Error).message;
    } finally {
      await c.end().catch(() => {});
    }
    expect(err).toMatch(/permission denied/i);
  });
});
