/**
 * ALDASSIST Phase 9 — B5 engine-mechanism slice: module-internal types for the Rules & Deadline Engine.
 *
 * Scope (owner-authorized narrow slice): the engine MECHANISM + ONE representative consumer
 * (DeadlineDetail). Rules-as-data lives on the existing Zone-2 public-data boundary (owner decision this
 * session; NOT a pre-existing explicit naming — see the migration header). ALL rule rows are
 * REPRESENTATIVE and non-authoritative (`authoritative = false`) until the external D5 dependency supplies
 * authoritative Indian rule/fee sources; representative values are NEVER surfaced as resolved authoritative
 * deadlines (see service.ts). No fee-schedule structures here (deferred to the Costs/CostPlanner slice).
 */
import type { DeadlineTraceDetailVM } from '../../../src/contract/portfolio';

/** A rules-as-data row (AP-02 / D-2026-002): a declaratively-expressed deadline rule.
 *  B5 shipped a representative days-only subset (windowDays). B5a adds the already-approved §18.2 model
 *  (offset + unit) so AUTHORITATIVE calendar-month rules can be expressed without day-approximation. A row
 *  carries EITHER offsetUnit/offsetValue (§18.2 path) OR windowDays (legacy representative days path). */
export interface DeadlineRule {
  ruleId: string;
  ruleVersion: string;
  jurisdiction: string;
  triggerType: string; // the Event-Log event type that starts this deadline's window
  /** Legacy representative window length in days (NON-authoritative). NULL on §18.2 offset/unit rows. */
  windowDays?: number | null;
  /** §18.2 offset model: value + unit. unit ∈ {'days','months'} in this scope (no 'years'). */
  offsetValue?: number | null;
  offsetUnit?: 'days' | 'months' | null;
  /** §18.2 `from` anchor (documentary; computation adds the offset to the supplied anchor/trigger date). */
  fromAnchor?: string | null;
  statutoryCitation: string;
  sourceProvision?: string | null;
  calendarAdjustment: string;
  extensions: string;
  effectiveDate?: string | null;
  provenance?: string | null;
  /** Representative rows are FALSE; authoritative MVP rows (B5a) are TRUE. The ready presentation path
   *  is built ONLY for authoritative rows — a non-authoritative value never surfaces as a resolved date. */
  authoritative: boolean;
}

/** An authoritative First-Schedule fee datum (B5a). Verified primary; product pricing is separate (L1). */
export interface FeeItem {
  feeId: string;
  jurisdiction: string;
  entryRef: string;
  appliesTo: string;
  tier: 'low' | 'other';
  mode: 'efiling' | 'physical';
  basis: 'flat' | 'per_month' | 'per_claim_over_10' | 'per_page_over_30';
  amountInr: number;
  sourceProvision: string;
  sourceCitation: string;
  effectiveDate: string;
  provenance: string;
  authoritative: boolean;
}

/** Non-rule presentation context for a ready DeadlineDetailVM. Supplied by the (deferred) Portfolio/tenancy
 *  layer — the rules module owns only the computed date + trace, never the portfolio presentation fields. */
export interface DeadlinePresentationContext {
  id: string;
  title: string;
  applicationRef: string;
  criticalityLabel: string;
  criticalityElevated: boolean;
  state: string; // DeadlineState (frozen contract enum) — supplied by the caller, not invented here
  whyTrigger: string;
  whyWindow: string;
  clientActionLabel: string;
  confirmationNote: string;
}

/** A trigger drawn from the immutable Event Log (M0.10) — deadlines derive from our Event Log (§20.3). */
export interface TriggerEvent {
  type: string;
  occurredAt: string; // ISO date (YYYY-MM-DD)
}

/** The deterministic engine output: a computed date + its computation trace (the trace is the product). */
export interface ComputedDeadline {
  date: string; // ISO date, deterministically derived; rendered, never authored (X9/D1)
  trace: DeadlineTraceDetailVM;
}

/** TA-8 escape-hatch (per D-2026-043): a genuine exception that resists declarative expression. */
export interface EscapeHatchRequest {
  ruleId: string;
  author: string; // the rule author (actor id)
  approver: string; // a Rule Governance / Ops approver — MUST differ from the author (D-2026-043)
  exception: string; // what the exception is
  justification: string; // why it is needed
}

export interface EscapeHatchResult {
  auditEventId: string; // the immutable Event-Log record id
  traceMarker: string; // carried into the computation trace's `extensions` (no frozen field added)
}
