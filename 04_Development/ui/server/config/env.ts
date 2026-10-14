/**
 * ALDASSIST Phase 9 — B1b: backend configuration (D-2026-031).
 * Secrets are read from the environment only — NEVER hard-coded or committed (Phase 3 §15.2).
 * Per-zone database credentials are separate (D-2026-003 / P9-ADR-08): each data zone connects with its
 * own login role, so zone separation is enforced at the DB-permission level, not by application convention.
 */
export type Zone = 'zone1' | 'zone2' | 'zone3';

export interface ZoneDbConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string | undefined;
}

export interface AdminDbConfig {
  connectionString: string;
}

function req(name: string): string {
  const v = process.env[name];
  if (v == null || v === '') throw new Error(`[ALDASSIST] missing required env var ${name}`);
  return v;
}
function opt(name: string, fallback: string): string {
  const v = process.env[name];
  return v == null || v === '' ? fallback : v;
}

const HOST = opt('DB_HOST', '127.0.0.1');
const PORT = Number(opt('DB_PORT', '5432'));
const NAME = opt('DB_NAME', 'alda_b1b');

const ZONE_USER_ENV: Record<Zone, string> = {
  zone1: 'DB_ZONE1_USER',
  zone2: 'DB_ZONE2_USER',
  zone3: 'DB_ZONE3_USER',
};
const ZONE_PASS_ENV: Record<Zone, string> = {
  zone1: 'DB_ZONE1_PASSWORD',
  zone2: 'DB_ZONE2_PASSWORD',
  zone3: 'DB_ZONE3_PASSWORD',
};

export function zoneDbConfig(zone: Zone): ZoneDbConfig {
  return {
    host: HOST,
    port: PORT,
    database: NAME,
    user: req(ZONE_USER_ENV[zone]),
    password: process.env[ZONE_PASS_ENV[zone]],
  };
}

/** Admin/migration connection (schema + role + grant DDL). Superuser/owner; used by node-pg-migrate. */
export function adminDbConfig(): AdminDbConfig {
  return { connectionString: req('DATABASE_URL_ADMIN') };
}

/** The trivial-resource base URL the contract-mode probe targets in tests/dev. */
export function apiBaseUrl(): string {
  return opt('ALDA_API_BASE_URL', 'http://127.0.0.1:5510');
}
