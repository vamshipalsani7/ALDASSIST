import { describe, it, expect } from 'vitest';
import pg from 'pg';

const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};
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

describe('TS-2 — zone credential separation enforced at the DB permission level (D-2026-003 / ADR-08)', () => {
  it('Zone-3 role CANNOT read Zone-1 (identity) — the boundary that must never be crossed', async () => {
    const r = await asRole('alda_zone3', 'select * from identity.workspace limit 1');
    expect(r.ok).toBe(false);
    expect(String(r.error)).toMatch(/permission denied/i);
  });
  it('Zone-2 role CANNOT read Zone-1 (identity)', async () => {
    const r = await asRole('alda_zone2', 'select * from identity.workspace limit 1');
    expect(r.ok).toBe(false);
    expect(String(r.error)).toMatch(/permission denied/i);
  });
  it('Zone-3 role CANNOT read Zone-2 (public_reg) — cross-module/zone deny', async () => {
    const r = await asRole('alda_zone3', 'select * from public_reg.register_doc limit 1');
    expect(r.ok).toBe(false);
    // L-3: assert the failure is a genuine PERMISSION denial, not e.g. a missing relation masquerading
    // as a "deny" (which would let a dropped/renamed table hide a lost boundary).
    expect(String(r.error)).toMatch(/permission denied/i);
  });
  it('Zone-1 role CANNOT read Zone-3 (outcome) — cross-zone deny', async () => {
    const r = await asRole('alda_zone1', 'select * from outcome.metric limit 1');
    expect(r.ok).toBe(false);
    expect(String(r.error)).toMatch(/permission denied/i);
  });
  it('each zone CAN read its own schema (positive control)', async () => {
    expect((await asRole('alda_zone3', 'select * from outcome.metric limit 1')).ok).toBe(true);
    expect((await asRole('alda_zone2', 'select * from platform.ping limit 1')).ok).toBe(true);
    expect((await asRole('alda_zone1', 'select * from identity.workspace limit 1')).ok).toBe(true);
  });
});
