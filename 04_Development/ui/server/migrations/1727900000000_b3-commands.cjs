/**
 * ALDASSIST Phase 9 — B3 command-surface migration (node-pg-migrate, explicit & reviewable — D-2026-031).
 *
 * Adds a `commands` schema (one schema per module, Phase 3 §2.2) with the idempotency store that backs
 * ADR-05 idempotency keys on mutations: a repeated key replays the recorded outcome; a key reused for a
 * different verb is a conflict. B3 wires NO product data — the store records only the key, the verb, the
 * (server-resolved) actor, and the result status.
 *
 * Zone separation stays at the DB-permission level (D-2026-003 / P9-ADR-08). The B3 dispatcher runs on
 * the Zone-1 pool (its authorization reads are Zone-1 identity/grant tables), so the store is granted to
 * the Zone-1 role only; Zone-2 and Zone-3 get nothing.
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE SCHEMA IF NOT EXISTS commands;
    REVOKE ALL ON SCHEMA commands FROM PUBLIC;

    CREATE TABLE IF NOT EXISTS commands.idempotency (
      key text PRIMARY KEY,
      verb text NOT NULL,
      actor_id uuid,
      result_status text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    GRANT USAGE ON SCHEMA commands TO alda_zone1;
    GRANT SELECT, INSERT ON commands.idempotency TO alda_zone1;
    -- (No grant to alda_zone2 / alda_zone3.)
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP SCHEMA IF EXISTS commands CASCADE;`);
};
