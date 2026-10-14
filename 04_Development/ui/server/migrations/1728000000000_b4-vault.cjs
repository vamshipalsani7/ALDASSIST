/**
 * ALDASSIST Phase 9 — B4 Vault migration (Zone 1; node-pg-migrate, explicit & reviewable — D-2026-031).
 *
 * The Client Vault (M1.2 + M0.5 + M0.10): inventions, the disclosure-capture state, and the immutable
 * disclosure version history. All Zone-1 confidential — GRANTed to the Zone-1 role ONLY (Zone-2/3 get
 * nothing; D-2026-003 / P9-ADR-08). Disclosure versions are APPEND-ONLY and DB-immutable (BR-20 / an
 * Event-Log property, M0.10): a REVOKE + trigger blocks UPDATE/DELETE/TRUNCATE, so a released/filed
 * version can never be mutated. Seed rows are fixed-UUID representative records for the B4 tests
 * (analogous to B1b/B2/B3 seeds) — NOT product data.
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE SCHEMA IF NOT EXISTS vault;
    REVOKE ALL ON SCHEMA vault FROM PUBLIC;

    -- A second workspace (Zone-1 identity) so cross-tenant CR-5 can be exercised.
    INSERT INTO identity.workspace (id, name) VALUES
      ('aaaaaaaa-0000-0000-0000-000000000002', 'B4 Other Workspace')
    ON CONFLICT (id) DO NOTHING;

    -- ── Invention (M1.2). title is confidential Zone-1 data and is NEVER placed in an index VM. ──
    CREATE TABLE IF NOT EXISTS vault.invention (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      workspace_id uuid NOT NULL REFERENCES identity.workspace(id),
      title text NOT NULL,
      technical_domain text NOT NULL,
      lifecycle text NOT NULL
        CHECK (lifecycle IN ('drafting','recorded','assessing','assessed','filing','protected','not-pursued','lapsed')),
      attention text NOT NULL CHECK (attention IN ('on-track','action-needed','at-risk')),
      recorded_date date NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    -- ── Disclosure capture state (M1.2), one per invention. ──
    CREATE TABLE IF NOT EXISTS vault.disclosure (
      invention_id uuid PRIMARY KEY REFERENCES vault.invention(id),
      current_step_id text NOT NULL
    );

    -- ── Immutable disclosure version history (M1.2 · M0.5 · M0.10). Append-only; "current" = MAX(version). ──
    CREATE TABLE IF NOT EXISTS vault.disclosure_version (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      invention_id uuid NOT NULL REFERENCES vault.invention(id),
      version int NOT NULL,
      saved_at timestamptz NOT NULL DEFAULT now(),
      immutable boolean NOT NULL DEFAULT true,
      referenced_by text,
      UNIQUE (invention_id, version)
    );

    -- BR-20: a disclosure version is immutable once written — no UPDATE/DELETE/TRUNCATE (append-only).
    CREATE OR REPLACE FUNCTION vault.prevent_version_mutation() RETURNS trigger LANGUAGE plpgsql AS $fn$
    BEGIN
      RAISE EXCEPTION 'vault.disclosure_version is append-only and immutable (BR-20): no UPDATE/DELETE/TRUNCATE';
    END $fn$;
    DROP TRIGGER IF EXISTS vault_version_immutable ON vault.disclosure_version;
    CREATE TRIGGER vault_version_immutable BEFORE UPDATE OR DELETE ON vault.disclosure_version
      FOR EACH ROW EXECUTE FUNCTION vault.prevent_version_mutation();
    DROP TRIGGER IF EXISTS vault_version_no_truncate ON vault.disclosure_version;
    CREATE TRIGGER vault_version_no_truncate BEFORE TRUNCATE ON vault.disclosure_version
      EXECUTE FUNCTION vault.prevent_version_mutation();
    REVOKE UPDATE, DELETE, TRUNCATE ON vault.disclosure_version FROM PUBLIC;

    -- ── Zone-1 role only. ──
    GRANT USAGE ON SCHEMA vault TO alda_zone1;
    GRANT SELECT, INSERT ON vault.invention TO alda_zone1;
    GRANT SELECT, INSERT ON vault.disclosure TO alda_zone1;
    GRANT SELECT, INSERT ON vault.disclosure_version TO alda_zone1;
    -- (No grant to alda_zone2 / alda_zone3.)

    -- ── representative seed (fixed UUIDs; non-product) ────────────────────────────────────────────
    -- Two inventions in W1 (aaaa…001, seeded in B2b) and one in W2 (for cross-tenant CR-5).
    INSERT INTO vault.invention (id, workspace_id, title, technical_domain, lifecycle, attention, recorded_date) VALUES
      ('e1111111-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'Confidential invention one', 'Signal processing', 'recorded', 'on-track', '2026-02-01'),
      ('e1111111-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'Confidential invention two', 'Optics',           'drafting', 'action-needed', '2026-03-15'),
      ('e2222222-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 'Confidential invention three', 'Chemistry',      'assessed', 'on-track', '2026-01-10')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO vault.disclosure (invention_id, current_step_id) VALUES
      ('e1111111-0000-0000-0000-000000000001', 'invention')
    ON CONFLICT (invention_id) DO NOTHING;

    INSERT INTO vault.disclosure_version (invention_id, version, immutable, referenced_by) VALUES
      ('e1111111-0000-0000-0000-000000000001', 1, true, 'Released assessment'),
      ('e1111111-0000-0000-0000-000000000001', 2, true, NULL);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP SCHEMA IF EXISTS vault CASCADE;`);
};
