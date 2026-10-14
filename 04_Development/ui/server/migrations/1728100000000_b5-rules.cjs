/**
 * ALDASSIST Phase 9 — B5 engine-mechanism slice migration (node-pg-migrate; explicit & reviewable).
 *
 * Rules-as-data for the Deadline & Rules Engine (M0.2), placed on the EXISTING Zone-2 public-data boundary.
 * PLACEMENT RATIONALE: rules and fee schedules are public, non-confidential reference data. The frozen
 * three-zone model (D-2026-003 / §13.1) does not explicitly name a zone for operational rule data; the
 * owner decided (this session) to treat it as an EXTENSION of the existing Zone-2 public-data model — NOT
 * a fourth zone/role/pool, and NOT a claim that the architecture previously named rules/fees as Zone 2.
 * Granted to the existing `alda_zone2` role only; Zone 1 is untouched and the Zone-1→Zone-3 isolation is
 * preserved.
 *
 * SCOPE: deadline/rules-engine only. Every seeded rule is REPRESENTATIVE and non-authoritative
 * (`authoritative = false`) until the external D5 dependency supplies authoritative Indian rule sources —
 * representative values never surface as resolved authoritative deadlines (see service.ts). The rule
 * version history is append-only / DB-immutable (BR-07), mirroring the Event Log and vault. NO
 * `fee_schedule` table is created here — it is deferred to the later Costs/CostPlanner fee-consuming slice.
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE SCHEMA IF NOT EXISTS rules;         -- Zone 2 (public reference data) — owner-decision extension
    REVOKE ALL ON SCHEMA rules FROM PUBLIC;

    -- ── Rules-as-data: declarative deadline rules (AP-02). Representative only (authoritative=false). ──
    CREATE TABLE IF NOT EXISTS rules.rule_set (
      rule_id text PRIMARY KEY,
      rule_version text NOT NULL,
      jurisdiction text NOT NULL,
      trigger_type text NOT NULL,
      window_days integer NOT NULL,
      statutory_citation text NOT NULL,
      calendar_adjustment text NOT NULL DEFAULT '',
      extensions text NOT NULL DEFAULT '',
      authoritative boolean NOT NULL DEFAULT false
    );

    -- ── Append-only, DB-immutable rule version history (BR-07). ──
    CREATE TABLE IF NOT EXISTS rules.rule_version (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      rule_id text NOT NULL REFERENCES rules.rule_set(rule_id),
      version integer NOT NULL,
      published_at timestamptz NOT NULL DEFAULT now(),
      authoritative boolean NOT NULL DEFAULT false,
      note text,
      UNIQUE (rule_id, version)
    );

    -- BR-07: a published rule version is immutable — no UPDATE/DELETE/TRUNCATE (append-only history).
    CREATE OR REPLACE FUNCTION rules.prevent_version_mutation() RETURNS trigger LANGUAGE plpgsql AS $fn$
    BEGIN
      RAISE EXCEPTION 'rules.rule_version is append-only and immutable (BR-07): no UPDATE/DELETE/TRUNCATE';
    END $fn$;
    DROP TRIGGER IF EXISTS rules_version_immutable ON rules.rule_version;
    CREATE TRIGGER rules_version_immutable BEFORE UPDATE OR DELETE ON rules.rule_version
      FOR EACH ROW EXECUTE FUNCTION rules.prevent_version_mutation();
    DROP TRIGGER IF EXISTS rules_version_no_truncate ON rules.rule_version;
    CREATE TRIGGER rules_version_no_truncate BEFORE TRUNCATE ON rules.rule_version
      EXECUTE FUNCTION rules.prevent_version_mutation();
    REVOKE UPDATE, DELETE, TRUNCATE ON rules.rule_version FROM PUBLIC;

    -- ── Zone-2 role only (public reference data). Read access; NO grant to Zone 1 / Zone 3. ──
    GRANT USAGE ON SCHEMA rules TO alda_zone2;
    GRANT SELECT ON rules.rule_set TO alda_zone2;
    GRANT SELECT ON rules.rule_version TO alda_zone2;

    -- ── REPRESENTATIVE seed (authoritative=false). NOT authoritative Indian rule data (pending D5). ──
    INSERT INTO rules.rule_set
      (rule_id, rule_version, jurisdiction, trigger_type, window_days, statutory_citation, calendar_adjustment, extensions, authoritative) VALUES
      ('REP-IN-FER-RESPONSE', 'rep-0', 'IN', 'application.examination_report.issued', 90,
       'REPRESENTATIVE — not an authoritative source (pending D5)', 'none (representative)', '', false),
      ('REP-IN-RENEWAL', 'rep-0', 'IN', 'application.granted', 365,
       'REPRESENTATIVE — not an authoritative source (pending D5)', 'none (representative)', '', false)
    ON CONFLICT (rule_id) DO NOTHING;

    INSERT INTO rules.rule_version (rule_id, version, authoritative, note) VALUES
      ('REP-IN-FER-RESPONSE', 0, false, 'representative seed (pending D5)'),
      ('REP-IN-RENEWAL', 0, false, 'representative seed (pending D5)')
    ON CONFLICT (rule_id, version) DO NOTHING;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP SCHEMA IF EXISTS rules CASCADE;`);
};
