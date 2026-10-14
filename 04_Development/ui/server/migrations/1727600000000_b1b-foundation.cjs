/**
 * ALDASSIST Phase 9 — B1b foundation migration (node-pg-migrate, D-2026-031).
 * Explicit, reviewable DDL for: one schema per module; per-zone login roles + GRANTs enforcing zone
 * separation at the DB-permission level (D-2026-003 / P9-ADR-08) — the Zone-3 role gets NO grant on
 * Zone-1; an append-only, immutable Event Log (M0.10) enforced by REVOKE + trigger; and the trivial
 * non-product `platform.ping` resource. Secrets are NOT set here: role passwords are provisioned
 * out-of-band from a secret store in non-trust environments (Phase 3 §15.2).
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    -- ── per-zone login roles (passwords provisioned out-of-band; never in source) ───────────────
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='alda_zone1') THEN CREATE ROLE alda_zone1 LOGIN; END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='alda_zone2') THEN CREATE ROLE alda_zone2 LOGIN; END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='alda_zone3') THEN CREATE ROLE alda_zone3 LOGIN; END IF;
    END $$;

    -- ── one schema per module / zone ─────────────────────────────────────────────────────────────
    CREATE SCHEMA IF NOT EXISTS identity;     -- Zone 1 (confidential)   · M0.1 Identity/Tenancy
    CREATE SCHEMA IF NOT EXISTS public_reg;   -- Zone 2 (public corpus)
    CREATE SCHEMA IF NOT EXISTS outcome;      -- Zone 3 (outcome metadata)
    CREATE SCHEMA IF NOT EXISTS eventlog;     -- Event Log (M0.10)
    CREATE SCHEMA IF NOT EXISTS platform;     -- trivial non-product resource

    -- defensive: no ambient PUBLIC access to these schemas
    REVOKE ALL ON SCHEMA identity, public_reg, outcome, eventlog, platform FROM PUBLIC;

    -- ── tables (representative stubs; no product data model) ────────────────────────────────────
    CREATE TABLE IF NOT EXISTS identity.workspace (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS public_reg.register_doc (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      jurisdiction text NOT NULL,
      number text NOT NULL,
      title text NOT NULL
    );
    CREATE TABLE IF NOT EXISTS outcome.metric (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      value_num numeric NOT NULL
    );
    CREATE TABLE IF NOT EXISTS eventlog.event (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      occurred_at timestamptz NOT NULL DEFAULT now(),
      type text NOT NULL,
      payload jsonb NOT NULL DEFAULT '{}'::jsonb
    );
    CREATE TABLE IF NOT EXISTS platform.ping (
      id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      note text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    -- ── Event Log immutability: append-only, no update/delete/truncate ──────────────────────────
    CREATE OR REPLACE FUNCTION eventlog.prevent_mutation() RETURNS trigger LANGUAGE plpgsql AS $fn$
    BEGIN
      RAISE EXCEPTION 'eventlog.event is append-only and immutable (no UPDATE/DELETE/TRUNCATE)';
    END $fn$;
    DROP TRIGGER IF EXISTS eventlog_immutable ON eventlog.event;
    CREATE TRIGGER eventlog_immutable BEFORE UPDATE OR DELETE ON eventlog.event
      FOR EACH ROW EXECUTE FUNCTION eventlog.prevent_mutation();
    DROP TRIGGER IF EXISTS eventlog_no_truncate ON eventlog.event;
    CREATE TRIGGER eventlog_no_truncate BEFORE TRUNCATE ON eventlog.event
      EXECUTE FUNCTION eventlog.prevent_mutation();
    REVOKE UPDATE, DELETE, TRUNCATE ON eventlog.event FROM PUBLIC;

    -- ── per-zone GRANTs (zone separation at the permission level) ───────────────────────────────
    -- Zone 1 → identity (confidential) + append to the Event Log. NO access to Zone 2/3.
    GRANT USAGE ON SCHEMA identity, eventlog TO alda_zone1;
    GRANT SELECT, INSERT ON identity.workspace TO alda_zone1;
    GRANT SELECT, INSERT ON eventlog.event TO alda_zone1;

    -- Zone 2 → public corpus + platform + append to the Event Log. NO access to Zone 1/3.
    GRANT USAGE ON SCHEMA public_reg, platform, eventlog TO alda_zone2;
    GRANT SELECT ON public_reg.register_doc TO alda_zone2;
    GRANT SELECT ON platform.ping TO alda_zone2;
    GRANT SELECT, INSERT ON eventlog.event TO alda_zone2;

    -- Zone 3 → outcome metadata + append to the Event Log. **NO grant on Zone 1 (identity).**
    GRANT USAGE ON SCHEMA outcome, eventlog TO alda_zone3;
    GRANT SELECT ON outcome.metric TO alda_zone3;
    GRANT SELECT, INSERT ON eventlog.event TO alda_zone3;

    -- ── seed the trivial resource ───────────────────────────────────────────────────────────────
    INSERT INTO platform.ping (note) VALUES ('b1b-foundation-ok');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP SCHEMA IF EXISTS platform CASCADE;
    DROP SCHEMA IF EXISTS eventlog CASCADE;
    DROP SCHEMA IF EXISTS outcome CASCADE;
    DROP SCHEMA IF EXISTS public_reg CASCADE;
    DROP SCHEMA IF EXISTS identity CASCADE;
    DROP ROLE IF EXISTS alda_zone1;
    DROP ROLE IF EXISTS alda_zone2;
    DROP ROLE IF EXISTS alda_zone3;
  `);
};
