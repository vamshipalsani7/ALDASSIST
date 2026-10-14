import { describe, it, expect, afterAll } from 'vitest';
import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from '../db/types';
import { resolveActor } from '../modules/identity/actor';
import type { Actor } from '../modules/identity/types';
import {
  authorizeWorkspace,
  authorizeEngagement,
  authorizeReview,
  authorizeOps,
  type AccessResult,
} from '../modules/identity/grants';

/**
 * TS-5 — Authorisation matrix (P9-B0 §10). Every (actor shape × object × operation) triple from §8,
 * asserted as not-found | permission-denied | success, with the structural invariants that keep CR-5
 * intact (not-found carries nothing; permission-denied carries reason + who-can-act; the two are never
 * conflated). Closes audit L4 by construction. Server-authoritative; actor server-resolved.
 */
const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};
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
  rd1: 'dddddddd-0000-0000-0000-000000000001',
  rd2: 'dddddddd-0000-0000-0000-000000000002',
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

type Expected = 'granted' | 'not-found' | 'permission-denied';
interface Case {
  shape: string;
  name: string;
  run: () => Promise<AccessResult> | AccessResult;
  expected: Expected;
}

const MATRIX: Case[] = [
  // Shape 1 — workspace membership
  { shape: 'workspace', name: 'admin meets admin', expected: 'granted',
    run: async () => authorizeWorkspace(db, await actor(ID.wcAdmin), { workspaceId: ID.w1, requiredRole: 'admin' }) },
  { shape: 'workspace', name: 'viewer below owner', expected: 'permission-denied',
    run: async () => authorizeWorkspace(db, await actor(ID.wcViewer), { workspaceId: ID.w1, requiredRole: 'owner' }) },
  { shape: 'workspace', name: 'non-member outside tenancy', expected: 'not-found',
    run: async () => authorizeWorkspace(db, await actor(ID.agentMfa), { workspaceId: ID.w1, requiredRole: 'viewer' }) },
  // Shape 2 — engagement grant (binary: granted or not-found; never a role escalation)
  { shape: 'engagement', name: 'engaged matter', expected: 'granted',
    run: async () => authorizeEngagement(db, await actor(ID.agentMfa), { matterId: ID.m1 }) },
  { shape: 'engagement', name: 'other matter (no portfolio reach)', expected: 'not-found',
    run: async () => authorizeEngagement(db, await actor(ID.agentMfa), { matterId: ID.m2 }) },
  { shape: 'engagement', name: 'actor with no engagement', expected: 'not-found',
    run: async () => authorizeEngagement(db, await actor(ID.clientNoMfa), { matterId: ID.m1 }) },
  // Shape 3 — review grant
  { shape: 'review', name: 'exact version + decision', expected: 'granted',
    run: async () => authorizeReview(db, await actor(ID.agentMfa), { disclosureVersionId: ID.dv1, reviewDecisionId: ID.rd1 }) },
  { shape: 'review', name: 'wrong decision', expected: 'not-found',
    run: async () => authorizeReview(db, await actor(ID.agentMfa), { disclosureVersionId: ID.dv1, reviewDecisionId: ID.rd2 }) },
  // Shape 4 — ops access
  { shape: 'ops', name: 'internal + mfa + justification + metadata', expected: 'granted',
    run: async () => authorizeOps(await actor(ID.internalMfa), { scope: 'metadata', justification: 'audit' }) },
  { shape: 'ops', name: 'internal reaching for a body (BR-16)', expected: 'permission-denied',
    run: async () => authorizeOps(await actor(ID.internalMfa), { scope: 'disclosure_body', justification: 'audit' }) },
  { shape: 'ops', name: 'internal without mfa', expected: 'permission-denied',
    run: async () => authorizeOps(await actor(ID.internalNoMfa), { scope: 'metadata', justification: 'audit' }) },
  { shape: 'ops', name: 'non-internal actor', expected: 'not-found',
    run: async () => authorizeOps(await actor(ID.clientNoMfa), { scope: 'metadata', justification: 'audit' }) },
];

describe('TS-5 — authorisation matrix: every triple resolves to the expected decision', () => {
  for (const c of MATRIX) {
    it(`[${c.shape}] ${c.name} → ${c.expected}`, async () => {
      const r = await c.run();
      expect(r.decision).toBe(c.expected);
    });
  }
});

describe('TS-5 — CR-5 structural invariants hold across the whole matrix', () => {
  it('not-found carries nothing; permission-denied carries reason + who-can-act; granted is bare', async () => {
    for (const c of MATRIX) {
      const r = await c.run();
      if (r.decision === 'not-found') {
        expect(Object.keys(r)).toEqual(['decision']); // carries nothing
      } else if (r.decision === 'permission-denied') {
        expect(r.reason.length).toBeGreaterThan(0);
        expect(r.whoCanAct.length).toBeGreaterThan(0);
      } else {
        expect(Object.keys(r)).toEqual(['decision']); // granted is bare
      }
    }
  });

  it('every decision is exactly one of the three shapes (never conflated)', async () => {
    for (const c of MATRIX) {
      const r = await c.run();
      expect(['granted', 'not-found', 'permission-denied']).toContain(r.decision);
    }
  });
});
