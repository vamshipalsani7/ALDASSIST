import { describe, it, expect, afterAll } from 'vitest';
import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from '../db/types';
import { resolveActor } from '../modules/identity/actor';
import type { Actor } from '../modules/identity/types';
import {
  loadInventionsIndex,
  loadInventionDetail,
  loadDisclosureVersions,
  loadDisclosureCapture,
} from '../modules/vault/service';

const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};
const adminUrl = process.env.DATABASE_URL_ADMIN ?? `postgres://postgres@${base.host}:${base.port}/${base.database}`;
const ID = {
  agentMfa: '22222222-2222-2222-2222-222222222222',
  wcAdmin: 'aaaaaaaa-0000-0000-0000-0000000000a1',
  w1: 'aaaaaaaa-0000-0000-0000-000000000001',
  w2: 'aaaaaaaa-0000-0000-0000-000000000002',
  inv1: 'e1111111-0000-0000-0000-000000000001',
  inv2: 'e1111111-0000-0000-0000-000000000002',
  inv3: 'e2222222-0000-0000-0000-000000000003',
  absent: 'e9999999-0000-0000-0000-0000000000ff',
};
const { Pool } = pg;
const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool: new Pool({ ...base, user: process.env.DB_ZONE1_USER ?? 'alda_zone1', max: 3 }) }),
});
const actor = (id: string): Promise<Actor> => resolveActor(db, 'fixture', { actorId: id });
afterAll(async () => {
  await db.destroy();
});

describe('B4 — inventions index (tenancy-scoped; titles never exposed)', () => {
  it('a member sees their workspace inventions (ready)', async () => {
    const r = await loadInventionsIndex(db, await actor(ID.wcAdmin), ID.w1);
    expect(r.state).toBe('ready');
    if (r.state === 'ready') {
      expect(r.data.rows.length).toBe(2);
      expect(r.data.rows.map((x) => x.id).sort()).toEqual([ID.inv1, ID.inv2].sort());
    }
  });
  it('index rows carry the opaque id but NEVER the confidential title (P4:§9.2)', async () => {
    const r = await loadInventionsIndex(db, await actor(ID.wcAdmin), ID.w1);
    if (r.state !== 'ready') throw new Error('expected ready');
    for (const row of r.data.rows) {
      expect(Object.keys(row)).not.toContain('title');
      expect(row.id).toBeTruthy();
    }
  });
  it('a non-member gets not-found (CR-5), carrying nothing', async () => {
    const r = await loadInventionsIndex(db, await actor(ID.agentMfa), ID.w1);
    expect(r).toEqual({ state: 'not-found' });
  });
  it('a member of W1 gets not-found for W2 (cross-tenant)', async () => {
    const r = await loadInventionsIndex(db, await actor(ID.wcAdmin), ID.w2);
    expect(r).toEqual({ state: 'not-found' });
  });
});

describe('B4 — invention detail (CR-5 not-found server-side)', () => {
  it('a member sees the invention (ready) with its header', async () => {
    const r = await loadInventionDetail(db, await actor(ID.wcAdmin), ID.inv1);
    expect(r.state).toBe('ready');
    if (r.state === 'ready') expect(r.data.header.id).toBe(ID.inv1);
  });
  it('a cross-tenant invention → not-found (member of W1 cannot see a W2 invention)', async () => {
    const r = await loadInventionDetail(db, await actor(ID.wcAdmin), ID.inv3);
    expect(r).toEqual({ state: 'not-found' });
  });
  it('a non-member → not-found', async () => {
    const r = await loadInventionDetail(db, await actor(ID.agentMfa), ID.inv1);
    expect(r).toEqual({ state: 'not-found' });
  });
  it('an absent invention → not-found (indistinguishable from cross-tenant)', async () => {
    const r = await loadInventionDetail(db, await actor(ID.wcAdmin), ID.absent);
    expect(r).toEqual({ state: 'not-found' });
  });
});

describe('B4 — immutable disclosure version history (BR-20)', () => {
  it('a member sees the version history; current is the highest version', async () => {
    const r = await loadDisclosureVersions(db, await actor(ID.wcAdmin), ID.inv1);
    expect(r.state).toBe('ready');
    if (r.state === 'ready') {
      expect(r.data.history.length).toBe(2);
      expect(r.data.current.version).toBe('v2');
      expect(r.data.current.isCurrent).toBe(true);
      const v1 = r.data.history.find((h) => h.version === 'v1');
      expect(v1?.immutable).toBe(true);
      expect(v1?.referencedBy).toMatch(/released assessment/i);
    }
  });
  it('a cross-tenant / non-member → not-found', async () => {
    const r = await loadDisclosureVersions(db, await actor(ID.agentMfa), ID.inv1);
    expect(r).toEqual({ state: 'not-found' });
  });
  it('an invention with no versions → empty (not a fabricated version)', async () => {
    const r = await loadDisclosureVersions(db, await actor(ID.wcAdmin), ID.inv2);
    expect(r.state).toBe('empty');
  });
});

describe('B4 — disclosure capture (S-8 idle-timeout slot preserved, never invented)', () => {
  it('a member sees the capture state with the seven steps', async () => {
    const r = await loadDisclosureCapture(db, await actor(ID.wcAdmin), ID.inv1);
    expect(r.state).toBe('ready');
    if (r.state === 'ready') {
      expect(r.data.currentStepId).toBe('invention');
      expect(r.data.steps.length).toBe(7);
      expect(r.data.steps.find((s) => s.id === 'prior-disclosure')?.mandatoryNonSkippable).toBe(true);
      expect(r.data.lock.idleTimeout.status).toBe('pending-slot');
      if (r.data.lock.idleTimeout.status === 'pending-slot') expect(r.data.lock.idleTimeout.slotId).toBe('S-8');
    }
  });
  it('a non-member → not-found', async () => {
    const r = await loadDisclosureCapture(db, await actor(ID.agentMfa), ID.inv1);
    expect(r).toEqual({ state: 'not-found' });
  });
});

describe('B4 — Zone-1 vault stays isolated at the DB permission level', () => {
  it('Zone-3 role CANNOT read vault.invention (permission denied)', async () => {
    const r = await asRole('alda_zone3', 'select * from vault.invention limit 1');
    expect(r.ok).toBe(false);
    expect(String(r.error)).toMatch(/permission denied/i);
  });
  it('Zone-1 role CAN read vault.invention (positive control)', async () => {
    const r = await asRole(process.env.DB_ZONE1_USER ?? 'alda_zone1', 'select * from vault.invention limit 1');
    expect(r.ok).toBe(true);
  });
});

describe('B4 — disclosure versions are append-only & immutable even for a privileged writer (BR-20)', () => {
  it('UPDATE / DELETE / TRUNCATE are rejected by the DB; the row survives', async () => {
    const c = new pg.Client({ connectionString: adminUrl });
    await c.connect();
    try {
      let upd = '';
      try { await c.query(`update vault.disclosure_version set immutable=false where invention_id=$1`, [ID.inv1]); } catch (e) { upd = (e as Error).message; }
      expect(upd).toMatch(/append-only and immutable \(BR-20\)/i);

      let del = '';
      try { await c.query(`delete from vault.disclosure_version where invention_id=$1`, [ID.inv1]); } catch (e) { del = (e as Error).message; }
      expect(del).toMatch(/append-only and immutable \(BR-20\)/i);

      let trunc = '';
      try { await c.query(`truncate vault.disclosure_version`); } catch (e) { trunc = (e as Error).message; }
      expect(trunc).toMatch(/append-only and immutable \(BR-20\)/i);

      const still = await c.query(`select count(*)::int as n from vault.disclosure_version where invention_id=$1 and immutable=true`, [ID.inv1]);
      expect(still.rows[0].n).toBe(2);
    } finally {
      await c.end().catch(() => {});
    }
  });
});

async function asRole(user: string, q: string): Promise<{ ok: boolean; error?: string }> {
  const c = new pg.Client({ ...base, user });
  try {
    await c.connect();
    await c.query(q);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  } finally {
    await c.end().catch(() => {});
  }
}
