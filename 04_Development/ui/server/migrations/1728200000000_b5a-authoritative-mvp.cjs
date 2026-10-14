/**
 * ALDASSIST Phase 9 — B5a: authoritative D5 MVP rules + fee schedule (owner authorization D5-M / D5-M-A).
 *
 * ADDITIVE ONLY. This migration does NOT modify the frozen b5 migration (1728100000000_b5-rules.cjs).
 * It implements the already-approved §18.2 rule model (offset + unit: months|days) that the accepted B5
 * engine-mechanism slice deliberately left as a days-only representative subset (D-2026-044). It:
 *   (1) adds the §18.2 offset/unit/from fields + provenance fields to rules.rule_set (nullable → existing
 *       REPRESENTATIVE rows keep window_days behaviour unchanged; guardrail intact);
 *   (2) creates the previously-deferred rules.fee_schedule (Zone-2 public reference data, owner-decision
 *       extension — NOT a fourth zone; granted to alda_zone2 only);
 *   (3) seeds the three AUTHORITATIVE MVP rules (R-B1-BASE, R-B1-EXT, R-B3-NP) and their verified fees,
 *       each carrying full provenance (jurisdiction / source provision / source citation / effective date /
 *       provenance / authority-status).
 *
 * EXCLUDED by authorization (NOT represented here): Rule 138 extension/condonation + its fees; holiday /
 * weekend / working-day / GCA §10 adjustment (no calendar/holiday field — computed date is the PLAIN
 * statutory calendar date); B2 RFE; B5 renewal/annuity; unresolved Art.19/34 page-count edge mechanics.
 * Legal basis: D5-F/F1/F2 (Rule 138 UNRESOLVED), D5-G3 (First Schedule current fees), D5-H (counting).
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    -- (1) ADDITIVE §18.2 model + provenance on the existing Zone-2 rules.rule_set. Nullable: existing
    --     representative rows (window_days-based) are untouched and keep computing via the days path.
    ALTER TABLE rules.rule_set
      ADD COLUMN IF NOT EXISTS offset_value integer,
      ADD COLUMN IF NOT EXISTS offset_unit text,       -- 'days' | 'months' (no 'years' in this scope)
      ADD COLUMN IF NOT EXISTS from_anchor text,        -- §18.2 'from' (documentary; computation adds to the anchor date)
      ADD COLUMN IF NOT EXISTS effective_date date,
      ADD COLUMN IF NOT EXISTS source_provision text,
      ADD COLUMN IF NOT EXISTS provenance text;
    -- window_days is representative-only; authoritative offset/unit rows leave it NULL.
    ALTER TABLE rules.rule_set ALTER COLUMN window_days DROP NOT NULL;
    -- Guard the unit vocabulary for this scope (days|months). NULL allowed (representative rows).
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'rule_set_offset_unit_chk') THEN
        ALTER TABLE rules.rule_set
          ADD CONSTRAINT rule_set_offset_unit_chk CHECK (offset_unit IS NULL OR offset_unit IN ('days','months'));
      END IF;
    END $$;

    -- (2) Deferred-until-now fee schedule (Zone-2 public reference data; owner-decision extension D5-M-A).
    CREATE TABLE IF NOT EXISTS rules.fee_schedule (
      fee_id text PRIMARY KEY,
      jurisdiction text NOT NULL,
      entry_ref text NOT NULL,          -- e.g. 'First Schedule Entry 1' / 'First Schedule Entry 4 (rule 24B(6))'
      applies_to text NOT NULL,         -- what the fee is for
      tier text NOT NULL,               -- 'low' (natural person/startup/small entity/educational institution) | 'other'
      mode text NOT NULL,               -- 'efiling' | 'physical'
      basis text NOT NULL,              -- 'flat' | 'per_month' | 'per_claim_over_10' | 'per_page_over_30'
      amount_inr integer NOT NULL,
      source_provision text NOT NULL,
      source_citation text NOT NULL,
      effective_date date NOT NULL,
      provenance text NOT NULL,         -- how this figure was established (primary-read vs uplift representation)
      authoritative boolean NOT NULL DEFAULT false,
      CONSTRAINT fee_schedule_tier_chk CHECK (tier IN ('low','other')),
      CONSTRAINT fee_schedule_mode_chk CHECK (mode IN ('efiling','physical'))
    );
    GRANT SELECT ON rules.fee_schedule TO alda_zone2;

    -- (3a) AUTHORITATIVE MVP rules (authoritative = true). Calendar-month offsets; NO holiday field.
    INSERT INTO rules.rule_set
      (rule_id, rule_version, jurisdiction, trigger_type, window_days,
       offset_value, offset_unit, from_anchor, statutory_citation, source_provision,
       calendar_adjustment, extensions, effective_date, provenance, authoritative) VALUES
      ('IN-FER-RESP-BASE', 'v1', 'IN', 'application.examination_report.issued', NULL,
        6, 'months', 'trigger_date',
        'Patents Rules 2003, rule 24B(5); Patents Act 1970, s.21',
        'Patents Act 1970 s.21; Patents Rules 2003 r.24B(5)',
        'none (plain statutory calendar date; no holiday/working-day adjustment applied — MVP)',
        'Extendable up to 3 months under r.24B(6) on Form 4 + prescribed fee (see IN-FER-RESP-EXT).',
        '2024-03-15',
        'D5-F (verified primary: Rules consolidated to 15-03-2024). Window counted from FER issuance.',
        true),
      ('IN-FER-RESP-EXT', 'v1', 'IN', 'deadline.fer_response.base_computed', NULL,
        3, 'months', 'prior_deadline',
        'Patents Rules 2003, rule 24B(6)',
        'Patents Rules 2003 r.24B(6)',
        'none (plain statutory calendar date; no holiday/working-day adjustment applied — MVP)',
        'Form 4 request; fee per month (see fee IN-FER-EXT-*). Max 3 months.',
        '2024-03-15',
        'D5-F (verified primary). Extension of the r.24B(5) base window; Rule 138 route EXCLUDED (unresolved, D5-I).',
        true),
      ('IN-NP-ENTRY', 'v1', 'IN', 'application.priority_established', NULL,
        31, 'months', 'priority_date',
        'Patents Rules 2003, rule 20(4)(i); PCT Article 2(xi)',
        'Patents Rules 2003 r.20(4)(i); PCT Art.2(xi)',
        'none (plain statutory calendar date; no holiday/working-day adjustment applied — MVP)',
        'None represented in MVP (extension/condonation is a separate legal-review item — D5-I).',
        '2024-03-15',
        'D5-F (verified primary). 31 months from the priority date; Rule 138 applicability EXCLUDED (unresolved).',
        true)
    ON CONFLICT (rule_id) DO NOTHING;

    INSERT INTO rules.rule_version (rule_id, version, authoritative, note) VALUES
      ('IN-FER-RESP-BASE', 1, true, 'authoritative MVP (D5-M); r.24B(5) +6 months from FER issuance'),
      ('IN-FER-RESP-EXT',  1, true, 'authoritative MVP (D5-M); r.24B(6) +3 months, Form 4 + fee'),
      ('IN-NP-ENTRY',      1, true, 'authoritative MVP (D5-M); r.20(4)(i) +31 months from priority')
    ON CONFLICT (rule_id, version) DO NOTHING;

    -- (3b) AUTHORITATIVE fees (verified First Schedule, current consolidated Table I, G.S.R. 211(E) 15-03-2024).
    --      Physical = e-filing plus the standard ten-percent uplift (Entry-4 physical verified from the
    --      Gazette; others per that standard uplift per owner authorization D5-M-A, flagged in provenance).
    --      NO Rule-138 fee.
    INSERT INTO rules.fee_schedule
      (fee_id, jurisdiction, entry_ref, applies_to, tier, mode, basis, amount_inr,
       source_provision, source_citation, effective_date, provenance, authoritative) VALUES
      -- B3 national-phase filing (Entry 1, Form 1)
      ('IN-NP-FILING-LOW-EFILING',   'IN', 'First Schedule Entry 1', 'national-phase filing (Form 1)', 'low',   'efiling',  'flat', 1600,
        'Patents Rules 2003 First Schedule, Entry 1', 'First Schedule Entry 1 (Form 1)', '2024-03-15',
        'D5-G3 verified primary (substituted Table I, G.S.R. 211(E)).', true),
      ('IN-NP-FILING-OTHER-EFILING', 'IN', 'First Schedule Entry 1', 'national-phase filing (Form 1)', 'other', 'efiling',  'flat', 8000,
        'Patents Rules 2003 First Schedule, Entry 1', 'First Schedule Entry 1 (Form 1)', '2024-03-15',
        'D5-G3 verified primary (substituted Table I, G.S.R. 211(E)).', true),
      ('IN-NP-FILING-LOW-PHYSICAL',  'IN', 'First Schedule Entry 1', 'national-phase filing (Form 1)', 'low',   'physical', 'flat', 1760,
        'Patents Rules 2003 First Schedule, Entry 1', 'First Schedule Entry 1 (Form 1)', '2024-03-15',
        'e-filing plus the standard ten-percent uplift (D5-M-A); exact physical figure not separately read from primary.', true),
      ('IN-NP-FILING-OTHER-PHYSICAL','IN', 'First Schedule Entry 1', 'national-phase filing (Form 1)', 'other', 'physical', 'flat', 8800,
        'Patents Rules 2003 First Schedule, Entry 1', 'First Schedule Entry 1 (Form 1)', '2024-03-15',
        'e-filing plus the standard ten-percent uplift (D5-M-A); exact physical figure not separately read from primary.', true),
      -- B3 excess claims (> 10) and pages (> 30), Entry 1 general
      ('IN-NP-EXCESS-CLAIM-LOW-EFILING',   'IN', 'First Schedule Entry 1', 'each claim in excess of 10', 'low',   'efiling', 'per_claim_over_10', 320,
        'Patents Rules 2003 First Schedule, Entry 1', 'First Schedule Entry 1 (excess claims)', '2024-03-15',
        'D5-G verified primary (First Schedule).', true),
      ('IN-NP-EXCESS-CLAIM-OTHER-EFILING', 'IN', 'First Schedule Entry 1', 'each claim in excess of 10', 'other', 'efiling', 'per_claim_over_10', 1600,
        'Patents Rules 2003 First Schedule, Entry 1', 'First Schedule Entry 1 (excess claims)', '2024-03-15',
        'D5-G verified primary (First Schedule).', true),
      ('IN-NP-EXCESS-PAGE-LOW-EFILING',    'IN', 'First Schedule Entry 1', 'each page in excess of 30', 'low',   'efiling', 'per_page_over_30', 160,
        'Patents Rules 2003 First Schedule, Entry 1', 'First Schedule Entry 1 (excess pages)', '2024-03-15',
        'D5-G verified primary (First Schedule).', true),
      ('IN-NP-EXCESS-PAGE-OTHER-EFILING',  'IN', 'First Schedule Entry 1', 'each page in excess of 30', 'other', 'efiling', 'per_page_over_30', 800,
        'Patents Rules 2003 First Schedule, Entry 1', 'First Schedule Entry 1 (excess pages)', '2024-03-15',
        'D5-G verified primary (First Schedule).', true),
      -- B1 FER-response extension (Entry 4, rule 24B(6)), per month
      ('IN-FER-EXT-LOW-EFILING',   'IN', 'First Schedule Entry 4 (rule 24B(6))', 'FER-response extension (per month)', 'low',   'efiling',  'per_month', 1000,
        'Patents Rules 2003 First Schedule, Entry 4 (extension under r.24B(6))', 'First Schedule Entry 4 (r.24B(6))', '2024-03-15',
        'D5-G3 verified primary (substituted Table I, G.S.R. 211(E)).', true),
      ('IN-FER-EXT-OTHER-EFILING', 'IN', 'First Schedule Entry 4 (rule 24B(6))', 'FER-response extension (per month)', 'other', 'efiling',  'per_month', 4000,
        'Patents Rules 2003 First Schedule, Entry 4 (extension under r.24B(6))', 'First Schedule Entry 4 (r.24B(6))', '2024-03-15',
        'D5-G3 verified primary (substituted Table I, G.S.R. 211(E)).', true),
      ('IN-FER-EXT-LOW-PHYSICAL',  'IN', 'First Schedule Entry 4 (rule 24B(6))', 'FER-response extension (per month)', 'low',   'physical', 'per_month', 1100,
        'Patents Rules 2003 First Schedule, Entry 4 (extension under r.24B(6))', 'First Schedule Entry 4 (r.24B(6))', '2024-03-15',
        'D5-G3 verified primary (substituted Table I physical column, G.S.R. 211(E)).', true),
      ('IN-FER-EXT-OTHER-PHYSICAL','IN', 'First Schedule Entry 4 (rule 24B(6))', 'FER-response extension (per month)', 'other', 'physical', 'per_month', 4400,
        'Patents Rules 2003 First Schedule, Entry 4 (extension under r.24B(6))', 'First Schedule Entry 4 (r.24B(6))', '2024-03-15',
        'D5-G3 verified primary (substituted Table I physical column, G.S.R. 211(E)).', true)
    ON CONFLICT (fee_id) DO NOTHING;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DELETE FROM rules.rule_version WHERE rule_id IN ('IN-FER-RESP-BASE','IN-FER-RESP-EXT','IN-NP-ENTRY');
    DELETE FROM rules.rule_set     WHERE rule_id IN ('IN-FER-RESP-BASE','IN-FER-RESP-EXT','IN-NP-ENTRY');
    DROP TABLE IF EXISTS rules.fee_schedule;
    ALTER TABLE rules.rule_set DROP CONSTRAINT IF EXISTS rule_set_offset_unit_chk;
    ALTER TABLE rules.rule_set
      DROP COLUMN IF EXISTS offset_value,
      DROP COLUMN IF EXISTS offset_unit,
      DROP COLUMN IF EXISTS from_anchor,
      DROP COLUMN IF EXISTS effective_date,
      DROP COLUMN IF EXISTS source_provision,
      DROP COLUMN IF EXISTS provenance;
    -- NOTE: window_days NOT NULL is intentionally NOT re-imposed on down (representative rows retain values).
  `);
};
