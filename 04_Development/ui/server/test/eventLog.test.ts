import { describe, it, expect } from 'vitest';
import pg from 'pg';

const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};
const adminUrl = process.env.DATABASE_URL_ADMIN ?? `postgres://postgres@${base.host}:${base.port}/${base.database}`;

describe('Event Log — append-only and immutable (M0.10)', () => {
  it('a zone role can append (INSERT) but the DB rejects its UPDATE and DELETE; the row survives', async () => {
    const c = new pg.Client({ ...base, user: 'alda_zone2' });
    await c.connect();
    try {
      const ins = await c.query(`insert into eventlog.event (type,payload) values ('test.append', '{"k":1}'::jsonb) returning id`);
      const id = ins.rows[0].id as string;
      expect(id).toBeTruthy();

      let updateErr = '';
      try { await c.query(`update eventlog.event set type='x' where id=$1`, [id]); } catch (e) { updateErr = (e as Error).message; }
      expect(updateErr).toMatch(/append-only|immutable|permission denied/i);

      let deleteErr = '';
      try { await c.query(`delete from eventlog.event where id=$1`, [id]); } catch (e) { deleteErr = (e as Error).message; }
      expect(deleteErr).toMatch(/append-only|immutable|permission denied/i);

      const still = await c.query(`select count(*)::int as n from eventlog.event where id=$1`, [id]);
      expect(still.rows[0].n).toBe(1);
    } finally {
      await c.end().catch(() => {});
    }
  });

  it('the DB immutability TRIGGER blocks UPDATE/DELETE/TRUNCATE even for a privileged writer (not just a missing grant)', async () => {
    const c = new pg.Client({ connectionString: adminUrl });
    await c.connect();
    try {
      const ins = await c.query(`insert into eventlog.event (type,payload) values ('test.trigger', '{"k":2}'::jsonb) returning id`);
      const id = ins.rows[0].id as string;

      let updErr = '';
      try { await c.query(`update eventlog.event set type='mutated' where id=$1`, [id]); } catch (e) { updErr = (e as Error).message; }
      expect(updErr).toMatch(/append-only and immutable/i);

      let delErr = '';
      try { await c.query(`delete from eventlog.event where id=$1`, [id]); } catch (e) { delErr = (e as Error).message; }
      expect(delErr).toMatch(/append-only and immutable/i);

      let truncErr = '';
      try { await c.query(`truncate eventlog.event`); } catch (e) { truncErr = (e as Error).message; }
      expect(truncErr).toMatch(/append-only and immutable/i);

      const still = await c.query(`select type from eventlog.event where id=$1`, [id]);
      expect(still.rows[0].type).toBe('test.trigger');
    } finally {
      await c.end().catch(() => {});
    }
  });
});
