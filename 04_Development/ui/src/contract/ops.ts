/**
 * ALDASSIST Phase 8 — contract: Operations surface (`/ops`) view-models (B7). Consoles SC-O01…O05.
 * Internal-only (MFA + justification, P4:§2.3); every access audited/justified.
 *
 * Grounded in the FROZEN specs (no invention): WP-2 §SC-O01…O05, WP-3 §IX-3.4/§IX-3.5, Metrics.md
 * (OP-1…OP-6 exact definitions/targets/thresholds), Decision Log D-2026-018 (OP-5 split; OP-6 <15% target
 * / <20% must-hold + the three-clause "material" definition, validated during measurement design — a
 * pending step). Governance encoded structurally:
 *  - CR-13 deadline safety: SC-O01 surfaces unconfirmed critical deadlines · source discrepancies ·
 *    undelivered critical notifications · escalations, with a HUMAN critical-deadline confirm (BR-03).
 *  - BR-16: Disclosure BODIES are consent-gated — Ops VMs carry metadata / refs / status only, never body.
 *  - SC-O02: an unavailable register check is a HOLD — no approve affordance is representable (never
 *    auto-approve); verification precedes any client Zone-1 access (F21).
 *  - AP-02 / BR-07: SC-O03 rules are DATA, versioned + immutable + reproducible; publish is gated by
 *    passing golden cases + a pre-publication impact review + dual control; the source citation is
 *    provenance (CR-6). Official fees derive here (BR-14) — O-2026-001 stays open elsewhere.
 *  - CR-19: OP-2 target stays UNCALIBRATED (pending), OP-3 baseline is undefined, the OP-6 validation step
 *    is a pending SLOT, and every current metric VALUE is a pending slot (Phase 9 supplies measurement).
 *    Definitions/targets/thresholds are transcribed from Metrics.md, never invented.
 *  - CR-16: the SC-O02 console is "Agent Verification" — never "Marketplace" in any user-facing label.
 */
import type {
  SlotValue, AttentionState, RelatedObjectRef, OpaqueId, IsoDate, IsoDateTime,
  FreshnessStamp, Assertion,
} from './primitives';
import type { DeadlineState, DeadlineCriticalityVM } from './portfolio';

/** Internal Ops action affordance (a plain sourced label — Ops interactions are outside the client
 * object-verb lexicon). Rendered by the shared Button; text carries the meaning (CR-4). */
export interface OpsActionVM { label: string; emphasis: 'primary' | 'secondary' }

/* ── SC-O01 · Docket Health Console ★ (the operational spine of deadline safety) ─*/
/** The four fixed queues (WP-2 §SC-O01 / WP-3 §IX-3.5). Disclosure bodies are NOT carried (BR-16). */
export type DocketQueueKey = 'unconfirmed' | 'discrepancies' | 'undelivered' | 'escalations';
export interface DocketHealthItemVM {
  id: OpaqueId;
  title: string; // what the item is (metadata)
  objectRef: RelatedObjectRef; // the underlying object — one click away; metadata only (BR-16)
  detail: string; // short, metadata-only description of the issue
  date?: IsoDate; // deadline date — computed by the Deadline Engine, rendered never authored (X9/D1)
  state?: DeadlineState;
  criticality?: DeadlineCriticalityVM; // icon + text, never colour-only
  attention: AttentionState; // two-axis attention (CR-4)
  action: OpsActionVM; // inline action: confirm (unconfirmed critical, BR-03) / resolve / act
}
export interface DocketHealthQueueVM {
  key: DocketQueueKey;
  label: string;
  items: DocketHealthItemVM[]; // empty is a GOOD state, honestly shown (WP-3 §IX-3.5)
}
export interface DocketHealthVM {
  queues: DocketHealthQueueVM[];
  /** Internal access is audited/justified; Disclosure bodies are consent-gated and never shown here. */
  accessNote: string;
  staleness?: FreshnessStamp; // register-source stale → last-known + freshness, never an error page
}

/* ── SC-O02 · Agent Verification (Gate J-S1; NEVER "Marketplace" in the UI, CR-16) ─*/
/** Unverified → Pending → Verified | Failed (WP-3 §2 IX / WP-2 §SC-O02). Named Ops-specific to avoid
 * colliding with the agent-onboarding VerificationStatus (which also carries 'not-submitted'). */
export type OpsVerificationStatus = 'pending' | 'verified' | 'failed';
/** The official-register check. `unavailable` is a HOLD — no auto-approve (WP-2 §SC-O02). */
export type RegisterCheckVM =
  | { status: 'passed'; note: string }
  | { status: 'failed'; note: string }
  | { status: 'unavailable'; note: string }; // hold; the approve affordance is withheld by construction
export interface VerificationSubmissionVM {
  id: OpaqueId;
  agentName: string; // internal identity (not client material)
  credentials: string; // registration number / qualification (submitted for review)
  registerCheck: RegisterCheckVM;
  domains: string[]; // declared technical domains (capacity by domain)
  conflicts: string; // declared conflicts — feed BR-10
  status: OpsVerificationStatus;
  reject: OpsActionVM;
  /** Approve is present ONLY when the register check is not `unavailable` — never auto-approve on a hold. */
  approve?: OpsActionVM;
}
export interface AgentVerificationVM {
  submissions: VerificationSubmissionVM[];
  disputes: { id: string; label: string; note: string }[]; // conflict / dispute queues
  precedenceNote: string; // verification precedes any client Zone-1 access (F21)
  holdNote: string; // register-check unavailable → hold, honest status, no auto-approve
}

/* ── SC-O03 · Rule Authoring Console ★ (rules as DATA — the source of deadlines & fees) ─*/
export interface RuleVersionVM {
  version: string; // immutable, versioned (BR-07)
  status: 'draft' | 'published';
  publishedAt?: IsoDateTime;
  note: string;
}
export interface GoldenCaseVM {
  id: string;
  label: string;
  result: 'pass' | 'fail'; // any failure blocks publication
}
export interface RuleImpactVM {
  summary: string; // pre-publication impact across the live portfolio (P4:§8)
  affectedCount: SlotValue<string>; // a computed figure — pending (no live portfolio data in Phase 8)
}
export interface RuleAuthoringVM {
  ruleId: string;
  jurisdiction: string; // MVP seeds India + PCT (P3:§12.4)
  editorNote: string; // the rule editor operates on rules-as-data (AP-02) — no code
  sourceCitation: Assertion; // the statutory source — provenance-linked or shown unverified (CR-6)
  versions: RuleVersionVM[]; // version history, newest first (immutable, reproducible — BR-07)
  goldenCases: GoldenCaseVM[]; // golden-case test suites
  impact: RuleImpactVM;
  gate: {
    testsPass: boolean; // all golden cases pass
    impactReviewed: boolean; // pre-publication impact reviewed
    dualControlNote: string; // dual control per P3:§4.1
  };
  /** Publish is present ONLY when the tests+impact gate is satisfied — a failing suite blocks publication. */
  publish?: OpsActionVM;
  blockedNote?: string; // shown when the gate is not satisfied (why publication is blocked)
  feesDeriveNote: string; // official fees derive here (BR-14); O-2026-001 pricing mode stays open elsewhere
}

/* ── SC-O04 · Quality & Review Console (where OP-6 is measured) ──────────────*/
/** OP-6, transcribed EXACTLY from Metrics.md §3 / D-2026-018 §4.3. The VALIDATION step is a pending SLOT. */
export interface OP6DefinitionVM {
  metricName: string; // "Percentage of AI Output Materially Edited"
  formula: string; // "AI outputs materially edited by the reviewer ÷ AI outputs reviewed"
  target: string; // "<15% (falling toward)"
  mustHoldThreshold: string; // "<20%"
  materialClauses: string[]; // the three D-2026-018 clauses, verbatim
  nonMaterialNote: string; // stylistic / clarity / formatting / reordering are non-material
  provenanceRule: string; // any provenance change is material by rule (AP-04/AP-08)
  validation: SlotValue<string>; // "validated against real diffs during measurement design" — pending step
}
export interface QualityMetricVM {
  key: string;
  label: string;
  definitionNote: string;
  value: SlotValue<string>; // current value — pending (Phase 9 measurement); never invented (CR-19)
}
export interface QualityConsoleVM {
  op6: OP6DefinitionVM;
  metrics: QualityMetricVM[]; // edit rate · severity · eval results · regressions · outcome quality
  samplingQueue: { id: string; label: string; note: string }[]; // review sampling queue
  capabilityDriftNote: string; // no silent capability drift — T2 changes need eval + recorded approval
}

/* ── SC-O05 · Business metrics dashboard (Metrics.md is canonical) ───────────*/
/** A metric transcribed from Metrics.md. `target` is sourced where defined; a pending slot where the
 * repository does not fix one (OP-2 uncalibrated; OP-3 baseline undefined). `value` is always pending —
 * measurement is Phase 9; sparse data is shown honestly, never fabricated (CR-19). */
export interface BusinessMetricVM {
  id: string; // "OP-1" etc.
  name: string;
  formula: string;
  target: SlotValue<string>;
  threshold?: string; // failure threshold where the repository defines one
  value: SlotValue<string>; // current measured value — pending (no live data in Phase 8)
  note?: string; // e.g. OP-3 "baseline not defined in the repository"
}
export interface BusinessDashboardVM {
  headline: BusinessMetricVM[]; // OP-1, OP-3, OP-4 (headline four minus OP-5, which carries its split)
  /** OP-5 keeps its required split (D-2026-018 §4.2): platform-attributable (target zero; Sev-1 each) vs
   * total operational (no zero bar). */
  op5: { platformAttributable: BusinessMetricVM; totalOperational: BusinessMetricVM };
  additional: BusinessMetricVM[]; // OP-2 (uncalibrated), OP-6
  definitionsNote: string; // metric definitions are canonical in Metrics.md
}
