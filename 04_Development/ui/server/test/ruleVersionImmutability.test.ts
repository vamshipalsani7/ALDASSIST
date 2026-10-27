/**
 * ALDASSIST Phase 9 — BR-07: rules.rule_version is append-only and DB-immutable (D-2026-049).
 *
 * Companion to the DB-free guard in fitness.static.test.ts. That one asserts the b5a migration's
 * down() throws; this asserts the database invariants that make it have to — the BR-07 trigger and
 * the NO ACTION foreign key. Mirrors eventLog.test.ts (M0.10) and the BR-20 block in b4-vault.test.ts;
 * rules.rule_version was the only append-only table of the three without DB-level coverage.
 *
 * Both enforcement layers are covered: the REVOKE that binds application roles (Zone-2 holds SELECT
 * only), and the trigger that binds the owner and superuser, which is the path a migration uses.
 *
 * Every write attempted here must FAIL, so nothing is inserted and no residue is left in the
 * shared database.
 */
import { describe, it, expect } from 'vitest';
import pg from 'pg';

const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};
const adminUrl = process.env.DATABASE_URL_ADMIN ?? `postgres://postgres@${base.host}:${base.port}/${base.database}`;
const RULE = 'IN-FER-RESP-BASE'; // authoritative MVP rule seeded by b5a, carrying a rule_version row

describe('BR-07 — rules.rule_version is append-only and immutable, even for a privileged writer (D-2026-049)', () => {
  it('the trigger blocks UPDATE / DELETE / TRUNCATE; the version row survives', async () => {
    const c = new pg.Client({ connectionString: adminUrl });
    await c.connect();
    try {
      let upd = '';
      try { await c.query(`update rules.rule_version set note='mutated' where rule_id=$1`, [RULE]); } catch (e) { upd = (e as Error).message; }
      expect(upd).toMatch(/append-only and immutable \(BR-07\)/i);

      let del = '';
      try { await c.query(`delete from rules.rule_version where rule_id=$1`, [RULE]); } catch (e) { del = (e as Error).message; }
      expect(del).toMatch(/append-only and immutable \(BR-07\)/i);

      let trunc = '';
      try { await c.query(`truncate rules.rule_version`); } catch (e) { trunc = (e as Error).message; }
      expect(trunc).toMatch(/append-only and immutable \(BR-07\)/i);

      const still = await c.query(`select count(*)::int as n from rules.rule_version where rule_id=$1`, [RULE]);
      expect(still.rows[0].n).toBe(1);
    } finally {
      await c.end().catch(() => {});
    }
  });

  it('the NO ACTION foreign key pins the parent rule_set row while a version row references it', async () => {
    const c = new pg.Client({ connectionString: adminUrl });
    await c.connect();
    try {
      let del = '';
      try { await c.query(`delete from rules.rule_set where rule_id=$1`, [RULE]); } catch (e) { del = (e as Error).message; }
      expect(del).toMatch(/violates foreign key constraint/i);
      expect(del).toMatch(/rule_version/i);

      const still = await c.query(`select count(*)::int as n from rules.rule_set where rule_id=$1`, [RULE]);
      expect(still.rows[0].n).toBe(1);
    } finally {
      await c.end().catch(() => {});
    }
  });
});

describe('BR-07 — the grant layer: Zone-2 holds SELECT only on rules.rule_version', () => {
  it('a zone role is refused INSERT / UPDATE / DELETE / TRUNCATE on permission, not on the trigger', async () => {
    const c = new pg.Client({ ...base, user: process.env.DB_ZONE2_USER ?? 'alda_zone2' });
    await c.connect();
    try {
      // positive control: the one grant that does exist (b5-rules: GRANT SELECT ... TO alda_zone2)
      const read = await c.query(`select count(*)::int as n from rules.rule_version where rule_id=$1`, [RULE]);
      expect(read.rows[0].n).toBe(1);

      let ins = '';
      try { await c.query(`insert into rules.rule_version (rule_id, version) values ($1, 99)`, [RULE]); } catch (e) { ins = (e as Error).message; }
      expect(ins).toMatch(/permission denied/i);

      // UPDATE/DELETE are stopped by the REVOKE before any row trigger runs, so the BR-07 message
      // must NOT appear here. If it ever did, a grant had been widened.
      let upd = '';
      try { await c.query(`update rules.rule_version set note='mutated' where rule_id=$1`, [RULE]); } catch (e) { upd = (e as Error).message; }
      expect(upd).toMatch(/permission denied/i);
      expect(upd).not.toMatch(/append-only and immutable/i);

      let del = '';
      try { await c.query(`delete from rules.rule_version where rule_id=$1`, [RULE]); } catch (e) { del = (e as Error).message; }
      expect(del).toMatch(/permission denied/i);
      expect(del).not.toMatch(/append-only and immutable/i);

      let trunc = '';
      try { await c.query(`truncate rules.rule_version`); } catch (e) { trunc = (e as Error).message; }
      expect(trunc).toMatch(/permission denied|must be owner/i);
    } finally {
      await c.end().catch(() => {});
    }
  });
});
