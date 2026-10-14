import { describe, it, expect, afterAll } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../api/app';
import { destroyZonePools } from '../db/pools';
import { fetchTrivialResource } from '../../src/runtime/transport/contractProbe';

let app: FastifyInstance | undefined;

afterAll(async () => {
  if (app) await app.close();
  await destroyZonePools();
});

describe('B1b — trivial NON-PRODUCT resource, end-to-end in `contract` mode', () => {
  it('serves GET /internal/v1/ping through a zone pool + Event Log, read via the contract-mode transport', async () => {
    app = buildApp();
    await app.listen({ port: 0, host: '127.0.0.1' });
    const addr = app.server.address();
    if (!addr || typeof addr === 'string') throw new Error('no ephemeral port');
    const baseUrl = `http://127.0.0.1:${addr.port}`;

    const before = await countEvents();
    const resource = await fetchTrivialResource(baseUrl);

    expect(resource.resource).toBe('ping');
    expect(resource.note).toBe('b1b-foundation-ok');
    expect(new Date(resource.at).toString()).not.toBe('Invalid Date');

    // The end-to-end read appended exactly one Event-Log entry (proves the Event Log path is live).
    const after = await countEvents();
    expect(after).toBe(before + 1);
  });

  it('health endpoint responds (API shell is up)', async () => {
    if (!app) throw new Error('app not started');
    const addr = app.server.address();
    if (!addr || typeof addr === 'string') throw new Error('no ephemeral port');
    const res = await fetch(`http://127.0.0.1:${addr.port}/internal/v1/health`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: 'ok' });
  });
});

async function countEvents(): Promise<number> {
  const pg = (await import('pg')).default;
  const c = new pg.Client({
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT ?? '5433'),
    database: process.env.DB_NAME ?? 'alda_b1b',
    user: process.env.DB_ZONE2_USER ?? 'alda_zone2',
    password: process.env.DB_ZONE2_PASSWORD,
  });
  await c.connect();
  try {
    const r = await c.query(`select count(*)::int as n from eventlog.event where type='platform.ping.read'`);
    return r.rows[0].n as number;
  } finally {
    await c.end().catch(() => {});
  }
}
