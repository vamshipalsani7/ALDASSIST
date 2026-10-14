/**
 * ALDASSIST Phase 9 — B1b: minimal Kysely schema types.
 * One schema per module (Phase 3 §2.2). Tables are representative stubs for the platform foundation;
 * NO product data model is implemented here (that belongs to later batches).
 */
import type { Generated, ColumnType } from 'kysely';

type JsonValue = unknown;
type TimestampDefault = ColumnType<Date, Date | string | undefined, Date | string>;

export interface Database {
  // Zone 1 (confidential) — module M0.1 Identity/Tenancy (representative stub)
  'identity.workspace': {
    id: Generated<string>;
    name: string;
    created_at: TimestampDefault;
  };
  // Zone 1 — M0.1 Identity: the server-resolved principal (B2a). principal_type drives mandatory-MFA
  // policy (T-6); mfa_satisfied is set by the (deferred, fail-closed) session/auth layer.
  'identity.actor': {
    id: Generated<string>;
    principal_type: string;
    mfa_satisfied: boolean;
    created_at: TimestampDefault;
  };
  // Zone 1 — M0.1 the four grant shapes (B2b). Workspace membership (one tenancy, roled).
  'identity.membership': {
    id: Generated<string>;
    actor_id: string;
    workspace_id: string;
    role: string;
  };
  // Zone 1 — engagement grant: an engaged agent, scoped to ONE matter (never the portfolio).
  'identity.engagement_grant': {
    id: Generated<string>;
    actor_id: string;
    matter_id: string;
    workspace_id: string;
    active: boolean;
  };
  // Zone 1 — review grant: exactly one Disclosure version + its analysis, for exactly one ReviewDecision.
  'identity.review_grant': {
    id: Generated<string>;
    actor_id: string;
    disclosure_version_id: string;
    review_decision_id: string;
    active: boolean;
  };
  // Zone 2 (public corpus) — representative stub
  'public_reg.register_doc': {
    id: Generated<string>;
    jurisdiction: string;
    number: string;
    title: string;
  };
  // Zone 3 (outcome metadata) — representative stub
  'outcome.metric': {
    id: Generated<string>;
    name: string;
    value_num: number;
  };
  // Event Log — module M0.10 (append-only, immutable)
  'eventlog.event': {
    id: Generated<string>;
    occurred_at: TimestampDefault;
    type: string;
    payload: JsonValue;
  };
  // Trivial NON-PRODUCT resource for the B1b end-to-end probe
  'platform.ping': {
    id: Generated<number>;
    note: string;
    created_at: TimestampDefault;
  };
  // Command surface — idempotency store (B3; ADR-05 idempotency keys on mutations).
  'commands.idempotency': {
    key: string;
    verb: string;
    actor_id: string | null;
    result_status: string;
    created_at: TimestampDefault;
  };
  // Zone 1 — Client Vault (B4; M1.2). `title` is confidential and never exposed in an index VM.
  'vault.invention': {
    id: Generated<string>;
    workspace_id: string;
    title: string;
    technical_domain: string;
    lifecycle: string;
    attention: string;
    recorded_date: string;
    created_at: TimestampDefault;
  };
  'vault.disclosure': {
    invention_id: string;
    current_step_id: string;
  };
  // Append-only, DB-immutable version history (B4; BR-20 / M0.10).
  'vault.disclosure_version': {
    id: Generated<string>;
    invention_id: string;
    version: number;
    saved_at: TimestampDefault;
    immutable: boolean;
    referenced_by: string | null;
  };
  // Zone 2 (public reference data) — B5 Rules & Deadline Engine (rules-as-data; AP-02). Placed on the
  // existing Zone-2 public-data boundary by owner decision (NOT a fourth zone; NOT a pre-existing naming).
  // Representative rows only (authoritative=false) until D5. No fee_schedule here (deferred).
  'rules.rule_set': {
    rule_id: string;
    rule_version: string;
    jurisdiction: string;
    trigger_type: string;
    // Representative (days-only) path — NULL on authoritative §18.2 offset/unit rows (B5a).
    window_days: number | null;
    // §18.2 offset model (B5a, additive): calendar-aware offset. unit ∈ {'days','months'} this scope.
    offset_value: number | null;
    offset_unit: string | null;
    from_anchor: string | null;
    statutory_citation: string;
    source_provision: string | null;
    calendar_adjustment: string;
    extensions: string;
    effective_date: string | null;
    provenance: string | null;
    authoritative: boolean;
  };
  // Zone 2 — B5a authoritative fee schedule (First Schedule, current consolidated Table I). Owner-decision
  // extension on the existing public-data boundary (NOT a fourth zone). Product pricing is separate.
  'rules.fee_schedule': {
    fee_id: string;
    jurisdiction: string;
    entry_ref: string;
    applies_to: string;
    tier: string; // 'low' | 'other'
    mode: string; // 'efiling' | 'physical'
    basis: string; // 'flat' | 'per_month' | 'per_claim_over_10' | 'per_page_over_30'
    amount_inr: number;
    source_provision: string;
    source_citation: string;
    effective_date: string;
    provenance: string;
    authoritative: boolean;
  };
  // Append-only, DB-immutable rule version history (B5; BR-07).
  'rules.rule_version': {
    id: Generated<string>;
    rule_id: string;
    version: number;
    published_at: TimestampDefault;
    authoritative: boolean;
    note: string | null;
  };
}
