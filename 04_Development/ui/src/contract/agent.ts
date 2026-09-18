/**
 * ALDASSIST Phase 8 — contract: Agent surface (`/agent`) view-models (B6). Screens SC-A00…A14.
 *
 * Grounded in the FROZEN specs (no invention): WP-2 §SC-A00…A14, WP-1 §6/§6.1/§12.4, Component
 * Catalogue §3.4 (Stat), §4.4 (Confidence), §9.11 (action queue), §9.12 (review workspace two-pane),
 * §9.13 (agent matching), §9.14 (PriceDisplay). Governance encoded structurally:
 *  - CR-2 / BR-01 mandatory review gate: SC-A07 is the reviewer's PRE-release workspace; the verdict is
 *    released FROM here (the gate in action). No released-verdict-to-client is representable before Release.
 *  - CR-5: cross-tenant / out-of-grant objects are Loaded's `not-found`; a review grant exposes exactly ONE
 *    Disclosure version + its analysis and nothing else (IP-16) — modelled as a single version, no siblings.
 *  - CR-6: every reviewer-facing assertion is provenance-linked or shown unverified (fail-safe).
 *  - CR-16: "Agent Matching / Engagement", never "Marketplace".
 *  - CR-17: SC-A05 has an upload affordance and NO prosecution/drafting surface (agent works off-platform).
 *  - CR-19: turnaround, agent-stat confidence, settlement presentation, channel defaults are SLOTs; fees
 *    are PriceDisplay containers; deadline dates are rendered (Rules Engine), never authored.
 *  - CR-21 / D-2026-019: agent outcome stats only at n≥20 with sample size + confidence; below → "not
 *    enough data yet" (reuses AgentStatsVM). Publication go-live is L3-gated (LegalContentSlot container).
 *  - DR-02 stays OPEN: SC-A04 import has NO de-duplication behaviour; the absence is noted, not resolved.
 */
import type {
  SlotValue, WhoseTurn, TwoAxisStatus, RelatedObjectRef, OpaqueId, IsoDate, IsoDateTime,
  HumanReadableRange, Authorship, FreshnessStamp, LegalContentSlot, Assertion, AttentionState, TabRef,
} from './primitives';
import type { ReasoningVM, EvidenceVM, ConfidenceVM } from './assessment';
import type { DisclosureVersionVM } from './vault';
import type { DeadlineState, DeadlineCriticalityVM, DeadlineTraceDetailVM } from './portfolio';
import type { MatterStatusVM, PriceDisplayVM, AgentStatsVM } from './matters';
import type { NotificationGroupVM } from './home';

/**
 * Agent-surface action affordance. The client object-verb lexicon (NextActionVM, P4:§10.4) governs
 * client lifecycle transitions only; agent-surface interactions (submit for verification, take an item,
 * accept an opportunity, confirm a deadline) fall outside it, so they carry a plain sourced label rather
 * than an invented verb. Rendered by the shared Button; text carries the meaning (CR-4).
 */
export interface AgentActionVM { label: string; emphasis: 'primary' | 'secondary'; nothingNeeded?: boolean }

/* ── SC-A00 · Agent onboarding & verification (AT-4) ────────────────────────*/
/** States stated in WP-2 §SC-A00 (submitted/pending · verified · failed) — sourced, not invented. */
export type VerificationStatus = 'not-submitted' | 'pending' | 'verified' | 'failed';
export interface AgentOnboardingVM {
  valueProp: string; // "your docket first, matters second" (P3:J6)
  credentialFields: { id: string; label: string; note: string }[]; // registration no. · qualification · identity
  declarations: { domains: string; conflicts: string; capacity: string }; // declared up front (BR-10)
  optIns: { reviewQueue: string; opportunities: string };
  verification: { status: VerificationStatus; note: string; remediation?: string }; // failed → reason + remediation
  submit: AgentActionVM; // Submit for verification (F21)
  pendingLimitationsNote: string; // pending = limited account: no review, no match, no client material (F21 alt)
}

/* ── SC-A01 · Today (agent action queue; docket + matter + review, distinct rhythms) ─*/
export interface AgentTodayItemVM {
  object: RelatedObjectRef;
  what: string;
  why: string;
  byWhen?: IsoDate; // computed date — rendered, never authored; drives risk ranking with attention
  rhythm: 'docket' | 'matter' | 'review'; // the three distinct rhythms, surfaced without blending (P4:§6.1)
  status: TwoAxisStatus<string>; // two-axis on every item (CR-4)
  whoseTurn: WhoseTurn;
  action: AgentActionVM;
}
export interface AgentTodayVM {
  items: AgentTodayItemVM[]; // risk-ranked
  staleness?: FreshnessStamp; // never a false "all clear" when data is stale
}

/* ── SC-A02 · Docket + deadline detail (AT-6) ───────────────────────────────*/
export interface AgentDeadlineRowVM {
  id: OpaqueId;
  title: string;
  matterRef: string; // matter / application this deadline belongs to
  source: string; // where the deadline came from
  date: IsoDate; // computed by the Deadline Engine — rendered, never authored (X9/D1)
  state: DeadlineState;
  criticality: DeadlineCriticalityVM; // icon + text, never colour-only
  attention: AttentionState;
  confirm?: AgentActionVM; // human confirmation of a CRITICAL deadline is an agent act (BR-03/X9)
}
/** Depth-3 computation trace incl. governing Rule (agent-visible), OR an honest unavailable state. */
export interface AgentDeadlineDetailVM {
  id: OpaqueId;
  title: string;
  matterRef: string;
  date: IsoDate;
  state: DeadlineState;
  criticality: DeadlineCriticalityVM;
  why: { trigger: string; window: string };
  trace: { status: 'available'; detail: DeadlineTraceDetailVM } | { status: 'unavailable' };
  confirm: AgentActionVM; // Confirm the critical deadline (BR-03)
  confirmationNote: string;
}
export interface AgentDocketVM {
  view: 'list' | 'calendar';
  rows: AgentDeadlineRowVM[];
  facets: { id: string; label: string; count: number }[];
  selectedDetail?: AgentDeadlineDetailVM; // the "+ deadline detail" of SC-A02, in the same screen
  staleness?: FreshnessStamp; // register-source stale → last-known + freshness, never an error page
}

/* ── SC-A03 · Matters index (platform + own) ────────────────────────────────*/
export interface AgentMatterRowVM {
  id: OpaqueId;
  ref: string;
  source: 'platform' | 'own'; // source tag (engaged platform matters vs imported own-practice matters)
  status: MatterStatusVM; // reuse — two-axis (CR-4)
  invention: string; // invention/application, within scope (opaque where confidential)
  client: string; // within scope only (no cross-matter aggregation, P4:§17.3)
  whoseTurn: WhoseTurn;
  nextDeadline?: { label: string; date: IsoDate; state: DeadlineState };
}
export interface AgentMattersIndexVM {
  rows: AgentMatterRowVM[];
  facets: { id: string; label: string; count: number }[];
  importAction: AgentActionVM; // Import matters — prominent (P4:§6.1)
}

/* ── SC-A04 · Matter import ★ (DR-02 AGNOSTIC — no de-duplication) ───────────*/
export interface ImportMatterPreviewVM {
  ref: string;
  completeness: { complete: boolean; missing: string[] }; // exactly what's missing per matter (F22 failure)
  computedDeadlines: { label: string; date: IsoDate; state: DeadlineState }[]; // partial value for complete matters
}
export interface MatterImportVM {
  inputsNote: string; // import inputs container
  preview: ImportMatterPreviewVM[];
  importAction: AgentActionVM;
  /** DR-02 is OPEN: docket-import duplicate handling is not decided. Import performs NO de-duplication;
   * this note states the absence — it never invents a merge/dedup step. */
  dedupNote: string;
  ownTenancyNote: string; // agent's own tenancy — not marketplace matters (F22)
}

/* ── SC-A05 · Agent matter detail (brief + work) ────────────────────────────*/
export interface AgentMatterBriefVM {
  disclosure: DisclosureVersionVM; // the Disclosure the matter works from
  releasedAssessment: { verdictLabel: string; reviewer: string; releasedAt: IsoDateTime; provenanceNote: string };
  clientContext: string; // client context within scope
}
export type AgentMatterTabId = 'brief' | 'deadlines' | 'documents' | 'client' | 'billing';
export interface AgentMatterDocumentVM { label: string; author: Authorship; date: IsoDate; immutable: boolean }
export interface AgentMatterDetailVM {
  id: OpaqueId;
  ref: string;
  status: MatterStatusVM;
  where: string; // header: where are we
  whatsNext: string;
  whoseTurn: WhoseTurn; // Awaiting you / Awaiting the office
  tabs: TabRef[]; // brief · deadlines · documents · client · billing
  brief: AgentMatterBriefVM;
  deadlines: { label: string; date: IsoDate; state: DeadlineState }[];
  documents: AgentMatterDocumentVM[]; // incl. AI-vs-human authorship; the filed-response upload
  clientThreadNote: string; // matter-confined messaging (A2) — no cross-matter/tenancy channel
  billing: PriceDisplayVM; // billing [L1] via PriceDisplay container
  fileAction: AgentActionVM; // "File with the office" — human agent act, on client approval (BR-09/T3)
  uploadNote: string; // agent uploads externally-prepared documents; NO prosecution/drafting surface (CR-17)
  relationshipRail: RelatedObjectRef[];
}

/* ── SC-A06 · Reviews queue ★ (the BR-01 gate; domain-matched) ───────────────*/
export interface ReviewQueueItemVM {
  id: OpaqueId;
  domain: string; // domain-matched
  summary: string; // no client identity beyond what the review grant permits (ADR:§6)
  age: string; // item age (sourced display string)
  expectedTurnaround: SlotValue<HumanReadableRange>; // committed turnaround = SLOT (ADR §9)
  take: AgentActionVM; // Take an item (F23) — a review grant is issued only on taking
}
export interface ReviewsQueueVM {
  items: ReviewQueueItemVM[]; // conflicted items never appear (ADR:§5) — absent by construction
  queueDepthNote: string; // queue depth / wait
}

/* ── SC-A07 · Review workspace ★★ (two-pane; CR-2/BR-01 gate in action) ──────*/
export type ReviewDecisionType = 'release' | 'inconclusive' | 'return';
export interface ReviewSourcePaneVM {
  grantedDisclosure: DisclosureVersionVM; // exactly ONE granted version — everything else invisible (IP-16)
  authorship: Extract<Authorship, { by: 'ai' }>; // the analysis is AI-generated (distinguished from release)
  aiAnalysis: ReasoningVM; // AI-authored element-by-element analysis
  evidence: EvidenceVM; // cited passages · reference list · coverage statement
}
export interface ReviewWorkPaneVM {
  assertions: Assertion[]; // editable; each provenance-linked or shown unverified (CR-6 fail-safe)
  confidence: ConfidenceVM; // basis stated; scale is a SLOT
  decisionOptions: { type: ReviewDecisionType; label: string; note: string }[]; // release · inconclusive · return
  releaseAffordance: string; // reviewer-name-on-release (BR-01/FR-A07)
  editsNote: string; // edits captured as diffs; materiality per D-2026-018 (not redefined here)
}
export interface ReviewWorkspaceVM {
  id: OpaqueId;
  grantNote: string; // review grant only; expires on release/reassignment; reviewer sees nothing else
  boundaryNote: string; // boundary-violation denied + audited (§8-J); no client↔reviewer channel (A2)
  source: ReviewSourcePaneVM;
  work: ReviewWorkPaneVM;
}

/* ── SC-A08 · Opportunities (Agent Matching / Engagement — never "Marketplace") ─*/
export interface OpportunityVM {
  id: OpaqueId;
  scope: string;
  fee: PriceDisplayVM; // fee via PriceDisplay [L1]; fixed published price before engagement (BR-06)
  conflictStatus: string; // only conflict-clear opportunities are shown (BR-10)
  clientContext: string; // within permitted scope
  accept: AgentActionVM; // acceptance triggers the client-side Engagement / Matter (SC-C19, F15)
  decline: AgentActionVM;
}
export interface OpportunitiesVM {
  items: OpportunityVM[];
  matchingNote: string; // "Agent Matching / Engagement" framing; honest "none available" when empty
}

/* ── SC-A09–A12 · Practice (profile · outcomes · capacity · earnings) ────────*/
export interface PracticeProfileVM {
  credentials: string;
  background: string;
  specializations: string[];
  languages: string[];
  publicProfileNote: string; // public rendering is SC-P13, governed by L1/L3
  editAction: AgentActionVM;
}
export interface PracticeOutcomesVM {
  stats: AgentStatsVM; // n≥20 → published(+confidence SLOT); below floor → "not enough data yet" (D-2026-019)
  sampleSizeNote: string; // sample size shown with any client-visible statistic (BR-17)
  publicationGate: LegalContentSlot; // go-live of published outcome statistics is L3-gated
  agentVisibilityNote: string; // the agent sees own outcomes with n before clients see them
}
export interface PracticeCapacityVM {
  availabilityNote: string;
  specializations: string[];
  limits: string;
  conflicts: string; // conflict-list management feeds BR-10
  saveAction: AgentActionVM;
}
export interface PracticeEarningsVM {
  settlement: PriceDisplayVM; // earnings / settlement via PriceDisplay [L1-16]
  settlementPresentation: LegalContentSlot; // [SLOT: L1 settlement presentation] — counsel-owned container
  note: string;
}
export interface PracticeVM {
  profile: PracticeProfileVM;
  outcomes: PracticeOutcomesVM;
  capacity: PracticeCapacityVM;
  earnings: PracticeEarningsVM;
}

/* ── SC-A13 · Agent settings ────────────────────────────────────────────────*/
export interface AgentSettingsVM {
  accountNote: string;
  security: { mfaNote: string; sessionsNote: string }; // MFA is REQUIRED for agents (fixed — not the client slot)
  notifications: { criticalNote: string; channelDefault: SlotValue<string> }; // Critical unmutable; S-7 slot
  org: { conflictListNote: string; membersNote: string }; // Org Admin manages agents/capacity/conflicts/billing
}

/* ── SC-A14 · Notification centre (agent) + context switcher (shared) ────────*/
export interface AgentContextVM { id: string; label: string; current: boolean }
export interface AgentNotificationsVM {
  groups: NotificationGroupVM[]; // reuse — grouped by class in fixed order; Critical unmutable (P4:§18.2)
  /** Context switcher: appears only for multi-role users; ONE context at a time, no blended contexts (CR-5). */
  contexts: AgentContextVM[];
}
