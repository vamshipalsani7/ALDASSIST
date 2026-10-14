/**
 * ALDASSIST Phase 9 — B2b grants migration (node-pg-migrate, explicit & reviewable — D-2026-031).
 *
 * Adds the three Zone-1 grant tables backing the four grant shapes (§8 T-2): workspace membership,
 * engagement grant (one matter), and review grant (one Disclosure version + one ReviewDecision). The
 * fourth shape, Ops access, is a property of an `internal` principal (B2a) and needs no table here.
 *
 * Zone separation stays at the DB-permission level (D-2026-003 / P9-ADR-08): only the Zone-1 role may
 * read/insert these; Zone-2 and Zone-3 get nothing. matter/disclosure/review-decision ids are opaque
 * uuids (those product tables belong to later batches), so no FK is placed on them.
 *
 * Seed rows are fixed-UUID representative records for the B2b tests (analogous to B1b/B2a seeds). They
 * are NOT product data and wire no product port to real data.
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS identity.membership (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      actor_id uuid NOT NULL REFERENCES identity.actor(id),
      workspace_id uuid NOT NULL REFERENCES identity.workspace(id),
      role text NOT NULL CHECK (role IN ('owner','admin','member','viewer')),
      UNIQUE (actor_id, workspace_id)
    );
    CREATE TABLE IF NOT EXISTS identity.engagement_grant (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      actor_id uuid NOT NULL REFERENCES identity.actor(id),
      matter_id uuid NOT NULL,
      workspace_id uuid NOT NULL REFERENCES identity.workspace(id),
      active boolean NOT NULL DEFAULT true
    );
    CREATE TABLE IF NOT EXISTS identity.review_grant (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      actor_id uuid NOT NULL REFERENCES identity.actor(id),
      disclosure_version_id uuid NOT NULL,
      review_decision_id uuid NOT NULL,
      active boolean NOT NULL DEFAULT true
    );

    -- Zone 1 only (identity schema USAGE already granted to alda_zone1 in the B1b foundation migration).
    GRANT SELECT, INSERT ON identity.membership TO alda_zone1;
    GRANT SELECT, INSERT ON identity.engagement_grant TO alda_zone1;
    GRANT SELECT, INSERT ON identity.review_grant TO alda_zone1;

    -- ── representative seed (fixed UUIDs; non-product) ─────────────────────────────────────────────
    -- workspace + two client members (reusing B2a's agent 2222… for the agent grants).
    INSERT INTO identity.workspace (id, name) VALUES
      ('aaaaaaaa-0000-0000-0000-000000000001', 'B2b Test Workspace')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO identity.actor (id, principal_type, mfa_satisfied) VALUES
      ('aaaaaaaa-0000-0000-0000-0000000000a1', 'client_user', false),
      ('aaaaaaaa-0000-0000-0000-0000000000a2', 'client_user', false)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO identity.membership (actor_id, workspace_id, role) VALUES
      ('aaaaaaaa-0000-0000-0000-0000000000a1', 'aaaaaaaa-0000-0000-0000-000000000001', 'admin'),
      ('aaaaaaaa-0000-0000-0000-0000000000a2', 'aaaaaaaa-0000-0000-0000-000000000001', 'viewer')
    ON CONFLICT (actor_id, workspace_id) DO NOTHING;

    -- agent 2222… engaged on matter M1 only (not M2), and holds a review grant on (DV1, RD1) only.
    INSERT INTO identity.engagement_grant (actor_id, matter_id, workspace_id, active) VALUES
      ('22222222-2222-2222-2222-222222222222',
       'bbbbbbbb-0000-0000-0000-000000000001',
       'aaaaaaaa-0000-0000-0000-000000000001', true);

    INSERT INTO identity.review_grant (actor_id, disclosure_version_id, review_decision_id, active) VALUES
      ('22222222-2222-2222-2222-222222222222',
       'cccccccc-0000-0000-0000-000000000001',
       'dddddddd-0000-0000-0000-000000000001', true);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS identity.review_grant;
    DROP TABLE IF EXISTS identity.engagement_grant;
    DROP TABLE IF EXISTS identity.membership;
  `);
};
