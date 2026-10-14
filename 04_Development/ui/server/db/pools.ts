/**
 * ALDASSIST Phase 9 — B1b: one Kysely instance + connection pool PER DATA ZONE (D-2026-031).
 * Each zone connects with its own login role; zone separation is enforced by the database's own
 * GRANTs (D-2026-003 / P9-ADR-08), not by application convention. The Zone-3 role holds no grant on
 * Zone-1 tables — asserted by the TS-2 fitness tests.
 */
import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import type { Database } from './types';
import { zoneDbConfig, type Zone } from '../config/env';

const { Pool } = pg;

function makeZoneDb(zone: Zone): Kysely<Database> {
  const cfg = zoneDbConfig(zone);
  const pool = new Pool({
    host: cfg.host,
    port: cfg.port,
    database: cfg.database,
    user: cfg.user,
    password: cfg.password,
    max: 4,
  });
  return new Kysely<Database>({ dialect: new PostgresDialect({ pool }) });
}

export interface ZonePools {
  zone1: Kysely<Database>;
  zone2: Kysely<Database>;
  zone3: Kysely<Database>;
}

let pools: ZonePools | null = null;

/** Build (once) the per-zone Kysely instances. */
export function getZonePools(): ZonePools {
  if (!pools) {
    pools = { zone1: makeZoneDb('zone1'), zone2: makeZoneDb('zone2'), zone3: makeZoneDb('zone3') };
  }
  return pools;
}

export async function destroyZonePools(): Promise<void> {
  if (pools) {
    await Promise.all([pools.zone1.destroy(), pools.zone2.destroy(), pools.zone3.destroy()]);
    pools = null;
  }
}
