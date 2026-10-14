/**
 * ALDASSIST Phase 9 — B1b: the trivial NON-PRODUCT resource used to prove the stack end-to-end in
 * `contract` mode. It reads a Zone-2/platform row and appends an Event-Log entry — exercising a zone
 * pool + the Event Log without touching any product data or any of the 56 frozen product ports.
 */
import type { ZonePools } from '../../db/pools';
import { appendEvent } from '../eventlog/eventlog';

export interface PingResource {
  resource: 'ping';
  note: string;
  at: string; // ISO instant, server-provided (NOT a computed product date — trivial infra timestamp)
}

export async function readPing(pools: ZonePools): Promise<PingResource> {
  const row = await pools.zone2
    .selectFrom('platform.ping')
    .select(['note'])
    .orderBy('id', 'asc')
    .limit(1)
    .executeTakeFirstOrThrow();
  await appendEvent(pools.zone2, { type: 'platform.ping.read', payload: { note: row.note } });
  return { resource: 'ping', note: row.note, at: new Date().toISOString() };
}
