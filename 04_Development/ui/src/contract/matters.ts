/**
 * ALDASSIST Phase 8 — contract: Client Matter / Costs / Matching + PriceDisplay view-models (B4).
 * Screens SC-C14 (matters), SC-C15 (matter workspace), SC-C16 (costs), SC-C18 (matching),
 * SC-C19 (quote & engagement). Plus the shared PriceDisplay view-model (the only money renderer).
 *
 * Governance encoded in the types:
 *  - PriceDisplay is the ONLY money renderer (CR-15). Its rendering MODE is O-2026-001, which is OPEN:
 *    `renderingMode` is a SlotValue, never a decided value. Official fees are ALWAYS a separately
 *    identifiable line in BOTH modes (CR-15 / P4:§21.1). Fee amounts are SlotValues — never invented
 *    (CR-19); the L1 disclosure content is a LegalContentSlot container (counsel-owned).
 *  - Matter lifecycle is the enumerated frozen set (P4:§11.4). Two-axis never merged (CR-4).
 *  - Money / Engagement appear only at SC-C19, after the free assessment (P5:X5 / ADR:§7). engage/pay is
 *    Owner-only (P4:§17.2); a non-Owner is represented via Loaded's `permission-denied` (IP-15).
 *  - Cross-tenant objects are represented ONLY by Loaded's `not-found` (CR-5).
 *  - No screen composes its own price logic (P5:X12) — screens embed a PriceDisplayVM container only.
 */
import type {
  AttentionState, NextActionVM, TabRef, RelatedObjectRef, OpaqueId,
  SlotValue, LegalContentSlot,
} from './primitives';
import type { TimelineEntryVM } from './portfolio';

/* ── PriceDisplay (shared) ──────────────────────────────────────────────────
   Fee amounts are display strings behind a SlotValue — never invented. The official-fee line is always
   present and separately identifiable. L1 disclosure is a container. */
export type FeeKind = 'platform-fee' | 'professional-fee' | 'official-fee';
export interface FeeLineVM {
  kind: FeeKind;
  label: string;
  amount: SlotValue<string>; // display string (e.g. "₹…"); pending-slot when unset — never fabricated
  disclosure: LegalContentSlot; // per-fee L1 disclosure content (counsel-owned container)
}
export type PriceRenderingMode = 'component' | 'bundled';
export interface PriceDisplayVM {
  /** O-2026-001 is OPEN — the mode is a SLOT, never decided by the UI. When pending, the component renders
   * the recorded probable direction (component breakdown) and notes the decision is open; official fees
   * stay separately identifiable in either mode. */
  renderingMode: SlotValue<PriceRenderingMode>;
  lines: FeeLineVM[]; // MUST include the official-fee line, always separately identifiable (CR-15/§21.1)
  bundledTotal: SlotValue<string>; // the single combined figure used by bundled mode — a SLOT, never invented
  disclosure: LegalContentSlot; // overall L1 disclosure container
}

/* ── Matter lifecycle — enumerated frozen set (P4:§11.4) ────────────────────*/
export type MatterLifecycle =
  | 'quoted' | 'engaged' | 'in-progress' | 'awaiting-you' | 'awaiting-the-office' | 'complete' | 'closed';
export interface MatterStatusVM {
  lifecycle: MatterLifecycle;
  attention: AttentionState; // whose-turn axis — never merged with lifecycle (CR-4)
  closedReason?: string; // a closed matter carries its reason (honesty rule, cf. P4:§11.3)
}
/** A cost cell is either a PriceDisplay container or hidden because the role has no cost access
 * (Members no costs — P4:§17.2 / IP-15 visible-but-locked). */
export type CostCellVM =
  | { kind: 'price'; price: PriceDisplayVM }
  | { kind: 'hidden'; reason: string };

/* ── SC-C14 · Matters index ─────────────────────────────────────────────────*/
export interface MatterRowVM {
  id: OpaqueId;
  ref: string; // matter reference shown to the client
  status: MatterStatusVM;
  agent: string;
  invention: string; // opaque invention reference
  cost: CostCellVM;
}
export interface MattersIndexVM {
  rows: MatterRowVM[];
  facets: { id: string; label: string; count: number }[];
}

/* ── SC-C15 · Matter workspace ★ (always answer the four questions, P4:§15.4) ─*/
export interface FourCellHeaderVM {
  where: string; // lifecycle-derived "where are we"
  whatsNext: string; // the next step in plain language
  needsYou: NextActionVM; // the current requested client action (may be nothingNeeded)
  cost: CostCellVM; // the cost cell — PriceDisplay container or hidden
}
export interface MatterWorkspaceVM {
  id: OpaqueId;
  ref: string;
  status: MatterStatusVM;
  header: FourCellHeaderVM;
  tabs: TabRef[]; // activity · documents · decisions · costs
  activity: TimelineEntryVM[]; // matter activity with source + freshness
  messagesNote: string; // matter-confined messaging note (no cross-matter/tenancy channel)
  relationshipRail: RelatedObjectRef[];
}

/* ── SC-C16 · Costs (Owner/Admin only) ──────────────────────────────────────*/
export interface InvoiceRowVM {
  id: string;
  label: string;
  issuer: string; // invoice structure — single or multiple issuers (L1-10 container)
  amount: SlotValue<string>; // never invented
}
export interface CostsVM {
  spendToDate: PriceDisplayVM;
  committed: PriceDisplayVM;
  forecast: PriceDisplayVM;
  invoices: InvoiceRowVM[]; // L1-10 invoice-structure container
  projectionNote: string; // 20-year projection (L1-09) — a container, not computed values
}

/* ── SC-C18 · Agent Matching / Engagement (never "Marketplace") ─────────────*/
/** Agent outcome stats are shown only at n≥20 with a confidence indicator; below the floor, "not enough
 * data yet" (D-2026-019). Represented structurally so a below-floor agent cannot show a statistic. */
export type AgentStatsVM =
  | { status: 'published'; n: number; confidence: SlotValue<string> } // n ≥ 20 (L3-gated go-live)
  | { status: 'below-floor'; note: string }; // "not enough data yet"
export interface AgentMatchVM {
  id: OpaqueId;
  name: string;
  rationale: string; // e.g. "matters in this domain · availability" — matching rationale, not a ranking claim
  credentials: string;
  jurisdiction: string;
  publishedPrice: PriceDisplayVM; // fixed published price BEFORE engagement (BR-06)
  stats: AgentStatsVM;
}
export interface MatchingVM {
  /** Agents are shown ONLY after the conflict check passes (BR-10). A ready MatchingVM implies it passed;
   * a check that cannot complete fails closed and is surfaced through Loaded's `error` (temporary hold). */
  conflictCheck: 'passed';
  matches: AgentMatchVM[];
}

/* ── SC-C19 · Quote & engagement ★ (checkout) ───────────────────────────────*/
export interface QuoteEngagementVM {
  agentId: OpaqueId;
  agentName: string;
  scope: string; // the engagement scope (fixture demo text; real scope is agent-authored)
  quote: PriceDisplayVM; // fixed-price quote — official fees separable; mode is O-2026-001 (open)
  contractingParties: LegalContentSlot; // [L1-06] who you are contracting with — legal container
  engageAction: NextActionVM; // "Accept scope & quote → engage" (Owner-only; non-Owner sees permission-denied)
  scopeChangeNote: string; // request a scope change → a new quote (BR-06)
  trustBoundaryNote: string; // money/Engagement appear only here, after the free assessment (P5:X5/ADR:§7)
}
