import { describe, it, expect, afterAll } from 'vitest';
import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from '../db/types';
import { resolveActor } from '../modules/identity/actor';
import type { Actor } from '../modules/identity/types';
import { authorizeWorkspace, authorizeEngagement, authorizeReview, authorizeOps } from '../modules/identity/grants';

/**
 * TS-1 — per-object-type cross-tenant behaviour (P9-B0 §10). For each grant-backed object type, an
 * actor with no relationship to that object (a cross-tenant / foreign actor) receives `not-found` and
 * NOTHING ELSE — the object is never disclosed, and the miss is never dressed up as `permission-denied`.
 * (CR-5: cross-tenant invisibility, server-authoritative.)
 */
const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};
const ID = {
  agentMfa: '22222222-2222-2222-2222-222222222222',
  clientNoMfa: '11111111-1111-1111-1111-111111111111',
  w1: 'aaaaaaaa-0000-0000-0000-000000000001',
  m1: 'bbbbbbbb-0000-0000-0000-000000000001',
  m2: 'bbbbbbbb-0000-0000-0000-000000000002',
  dv1: 'cccccccc-0000-0000-0000-000000000001',
  dvForeign: 'cccccccc-0000-0000-0000-0000000000ff',
  rd1: 'dddddddd-0000-0000-0000-000000000001',
};
const { Pool } = pg;
const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({ ...base, user: process.env.DB_ZONE1_USER ?? 'alda_zone1', max: 2 }),
  }),
});
const actor = (id: string): Promise<Actor> => resolveActor(db, 'fixture', { actorId: id });
afterAll(async () => {
  await db.destroy();
});

function expectNotFoundCarryingNothing(r: { decision: string }) {
  expect(r.decision).toBe('not-found');
  expect(Object.keys(r)).toEqual(['decision']);
}

describe('TS-1 — cross-tenant access returns not-found, carrying nothing', () => {
  it('workspace object: a non-member gets not-found (not permission-denied)', async () => {
    const r = await authorizeWorkspace(db, await actor(ID.agentMfa), { workspaceId: ID.w1, requiredRole: 'viewer' });
    expectNotFoundCarryingNothing(r);
  });

  it('matter object: an actor with no engagement gets not-found', async () => {
    const r = await authorizeEngagement(db, await actor(ID.clientNoMfa), { matterId: ID.m1 });
    expectNotFoundCarryingNothing(r);
  });

  it('matter object: an agent engaged elsewhere gets not-found for a different matter (no portfolio reach)', async () => {
    const r = await authorizeEngagement(db, await actor(ID.agentMfa), { matterId: ID.m2 });
    expectNotFoundCarryingNothing(r);
  });

  it('review object: a foreign Disclosure version gets not-found', async () => {
    const r = await authorizeReview(db, await actor(ID.agentMfa), {
      disclosureVersionId: ID.dvForeign,
      reviewDecisionId: ID.rd1,
    });
    expectNotFoundCarryingNothing(r);
  });

  it('ops object: a non-internal actor has no Ops relationship → not-found', async () => {
    const r = authorizeOps(await actor(ID.clientNoMfa), { scope: 'metadata', justification: 'x' });
    expectNotFoundCarryingNothing(r);
  });
});
