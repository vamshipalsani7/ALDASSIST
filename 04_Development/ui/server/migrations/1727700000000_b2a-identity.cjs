/**
 * ALDASSIST Phase 9 — B2a identity migration (node-pg-migrate, explicit & reviewable — D-2026-031).
 *
 * Adds the Zone-1 `identity.actor` table (M0.1): the server-resolved principal, with the principal
 * type that drives mandatory-MFA policy (T-6) and an mfa_satisfied flag set by the (deferred,
 * fail-closed) session/auth layer. GRANTs keep zone separation at the DB-permission level: only the
 * Zone-1 role may read/insert identity; Zone-2 and Zone-3 get nothing on it (D-2026-003 / P9-ADR-08).
 *
 * Seed rows are fixed-UUID representative principals used by the B2a tests (analogous to platform.ping
 * in B1b). They are NOT product data and wire no product port to real data.
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS identity.actor (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      principal_type text NOT NULL
        CHECK (principal_type IN ('client_user','agent','institution_admin','internal')),
      mfa_satisfied boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    -- Zone 1 only. identity schema USAGE was granted to alda_zone1 in the B1b foundation migration.
    GRANT SELECT, INSERT ON identity.actor TO alda_zone1;
    -- (No grant to alda_zone2 / alda_zone3 — identity is Zone-1 confidential.)

    -- Representative principals for the B2a seam/policy tests (fixed UUIDs; non-product).
    INSERT INTO identity.actor (id, principal_type, mfa_satisfied) VALUES
      ('11111111-1111-1111-1111-111111111111', 'client_user',        false),
      ('22222222-2222-2222-2222-222222222222', 'agent',              true),
      ('33333333-3333-3333-3333-333333333333', 'agent',              false),
      ('44444444-4444-4444-4444-444444444444', 'institution_admin',  false),
      ('55555555-5555-5555-5555-555555555555', 'internal',           true),
      ('66666666-6666-6666-6666-666666666666', 'internal',           false)
    ON CONFLICT (id) DO NOTHING;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS identity.actor;`);
};
