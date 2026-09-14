/**
 * ALDASSIST Phase 8 — contract: Client Vault-path view-models (B2).
 * Screens SC-C00, SC-C02, SC-C03, SC-C04, SC-C05, SC-C06, SC-C07, SC-C09.
 *
 * Extends the B0/B1 primitives. Governance encoded in the types:
 *  - No invented values (CR-19): turnaround, confidence, edit-idle-timeout, DR-01 role are SLOTs.
 *  - Two-axis status never merged (CR-4): rows/headers carry TwoAxisStatus<L>.
 *  - Cross-tenant objects are represented ONLY by Loaded's `not-found` (CR-5) — nothing else.
 *  - SC-C09 stays DR-01-agnostic: the not-file-decision capability is a pending slot, never a role.
 */
import type {
  TwoAxisStatus, NextActionVM, RelatedObjectRef, KeyValue, OpaqueId,
  IsoDate, IsoDateTime, SlotValue, HumanReadableRange,
} from './primitives';
import type { InventionLifecycle, ObjectHeaderVM } from './invention';
import type { AssessmentLifecycle, VerdictLabel } from './assessment';

/* ── SC-C00 · Workspace creation interstitial ──────────────────────────────
   The client tenancy is born the moment an Invention first needs holding (DL:D-2026-015).
   Minimal setup only (name). The creator is Owner; an invitee joins as Admin/Member/Viewer
   — NEVER Owner. Invitation-expired/invalid surfaces through Loaded's `error` state. */
export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer';
export interface WorkspaceSetupVM {
  mode: 'create' | 'accept-invitation';
  /** accept-invitation only: the assigned role, which can never be 'owner' (P5:F3 / P3:§4.1). */
  assignedRole?: Exclude<WorkspaceRole, 'owner'>;
  roleExplanation: string;
  nameFieldLabel: string;
  primaryAction: NextActionVM;
}

/* ── SC-C02 · Inventions index (the Vault spine) ───────────────────────────
   Rows show the lifecycle+attention pair, technical domain, recorded date, next action.
   Inventions are shown by OPAQUE id — titles are confidential (P4:§9.2). */
export interface InventionRowVM {
  id: OpaqueId; // opaque; never the confidential title
  status: TwoAxisStatus<InventionLifecycle>;
  technicalDomain: string;
  recordedDate: IsoDate;
  nextAction: NextActionVM;
}
export interface InventionFacetVM { id: string; label: string; count: number }
export interface InventionsIndexVM {
  rows: InventionRowVM[];
  facets: InventionFacetVM[]; // filter: state / domain / date / has-applications (P4:§13.3)
  recordAction: NextActionVM; // "Record an invention" (P4:§19.1)
}

/* ── SC-C03 · Disclosure capture (guided; becomes the immutable record) ─────
   Fixed step order; the prior-disclosure interrogation CANNOT be skipped (FR-D03).
   The completeness check is Tier-1 AI — structure/prompt only, NEVER patentability (P3:§12.1).
   Soft edit-session lock: sequential not concurrent (A3); no takeover offered. */
export type DisclosureStepId =
  | 'problem' | 'prior-approaches' | 'invention' | 'how-it-works' | 'variants' | 'advantages'
  | 'prior-disclosure';
export interface DisclosureStepVM {
  id: DisclosureStepId;
  label: string;
  complete: boolean;
  mandatoryNonSkippable?: boolean; // the prior-disclosure step
}
export interface CompletenessCheckVM {
  tier: 'tier-1-structure-only';
  disclaimer: string; // e.g. "Checks structure and prompts only — never patentability."
  prompts: string[];
}
export interface EditSessionLockVM {
  heldByOther: boolean;
  heldByName?: string;
  since?: IsoDateTime;
  /** idle auto-release is a Phase-6 PROPOSAL, not baseline — a pending slot (S-8), never invented. */
  idleTimeout: SlotValue<HumanReadableRange>;
}
export interface DisclosureCaptureVM {
  inventionId: OpaqueId;
  steps: DisclosureStepVM[];
  currentStepId: DisclosureStepId;
  completeness: CompletenessCheckVM;
  lock: EditSessionLockVM;
  autosaveNote: string; // every save writes an immutable version (BR-20)
}

/* ── SC-C04 · Invention detail (the hub; dignified even when Not pursued) ───
   Object skeleton + tabs: Overview·Disclosure·Assessments·Applications·Decisions·Documents.
   Empty tabs teach what will appear and offer the enabling action. */
export type InventionTabId =
  | 'overview' | 'disclosure' | 'assessments' | 'applications' | 'decisions' | 'documents';
export type InventionTabContent =
  | { kind: 'summary'; summary: string; protectionByJurisdiction: KeyValue[] }
  | { kind: 'related'; items: RelatedObjectRef[] }
  | { kind: 'empty'; teaches: string; action: NextActionVM };
export interface InventionTabVM {
  id: InventionTabId;
  label: string;
  content: InventionTabContent;
}
export interface InventionDetailVM {
  header: ObjectHeaderVM<InventionLifecycle>;
  tabs: InventionTabVM[];
  activeTabDefault: InventionTabId;
  /** Not pursued is a complete, dignified page — not a husk (P4:§15.1). */
  notPursued?: { note: string; alternativesTaken?: string[] };
}

/* ── SC-C05 · Disclosure current + immutable version history (IP-02) ────────
   Each save = a new immutable, timestamped version. A version referenced by a released
   Assessment or a filing is LOCKED and marked immutable (BR-20). Never mutate/delete a version. */
export interface DisclosureVersionVM {
  version: string; // e.g. "v3"
  savedAt: IsoDateTime; // rendered as real timestamp text, never colour/badge-only
  immutable: boolean;
  referencedBy?: string; // why it is locked (e.g. "Released assessment / filed application")
  isCurrent: boolean;
}
export interface DisclosureVersionsVM {
  inventionId: OpaqueId;
  current: DisclosureVersionVM;
  history: DisclosureVersionVM[]; // newest first
}

/* ── SC-C06 · Request assessment (free, human-reviewed) ─────────────────────
   India/PCT only. Trust copy verbatim. Turnaround is a SLOT (retired "hours/seconds" banned).
   No payment, no Engagement (P5:X5). Blocked when the disclosure is incomplete (F5 alt). */
export type AssessmentJurisdiction = 'india' | 'pct';
export interface AssessmentRequestVM {
  inventionId: OpaqueId;
  jurisdictions: { id: AssessmentJurisdiction; label: string }[]; // India / PCT only
  trustCopy: string; // verbatim promise (ADR:§7): free, no payment, no engagement
  turnaround: SlotValue<HumanReadableRange>; // committed review turnaround — SLOT, never invented
  reviewNote: string; // automated analysis then human review; you'll be notified — no need to wait
  disclosureComplete: boolean; // false → blocked with a clear reason, routed back to finish
  primaryAction: NextActionVM; // "Request assessment"
}

/* ── SC-C07 · Assessments list (per Invention, newest first) ────────────────
   Row: status (Analysing/In review/Released) two-axis, requested date, assessed disclosure
   version, reviewer (named once reviewing), verdict label ONLY when released (CR-2). */
export interface AssessmentRowVM {
  id: OpaqueId;
  status: TwoAxisStatus<AssessmentLifecycle>;
  requestedDate: IsoDate;
  assessedVersion: string; // the immutable disclosure version assessed
  reviewerName?: string; // named on the output (BR-01/FR-A07)
  verdictLabel?: VerdictLabel; // present ONLY when released — never before human release (CR-2)
}
export interface AssessmentsListVM {
  inventionId: OpaqueId;
  rows: AssessmentRowVM[]; // newest first
}

/* ── SC-C09 · Record decision (file / not-file) — DR-01 AGNOSTIC ────────────
   A Decision entity requires a human actor (BR-09); no AI output is the sole basis (IP-10).
   Four alternatives at EQUAL weight — options, not consolation (P4:§11.6). Not-file → the
   Invention becomes Not pursued but PERSISTS in the Vault (AP-01). "No money, no engagement." */
export type DecisionType = 'file' | 'not-file';
export interface DecisionAlternativesVM {
  designAround: string;
  tradeSecret: string;
  defensivePublication: string;
  deferAndReassess: string;
}
/**
 * DR-01 seam (deferred): whether the current actor may record a not-file Decision is a REPORTED
 * capability sourced from an owner-decision slot — NEVER a hard-coded role. This is the type-level
 * guarantee that the screen presupposes no specific role for DR-01.
 */
export interface DecisionCapabilityVM {
  mayRecordNotFileDecision: { status: 'pending-slot'; slotId: 'DR-01'; source: 'owner-decision' };
}
export interface DecisionVM {
  inventionId: OpaqueId;
  alternatives: DecisionAlternativesVM; // rendered at equal visual weight
  trustCopy: string; // "No money, no engagement." (ADR:§7)
  rationaleLabel: string; // a Decision entity captures actor + rationale (BR-09)
  capability: DecisionCapabilityVM; // DR-01-agnostic — pending slot, not a role
  /** The ONE baseline-fixed permission in this area: engage/pay is Owner-only (P4:§17.2). */
  engagePayOwnerOnly: true;
  /** A Decision entity requires a human actor — no AI output is the sole basis (BR-09/IP-10). */
  requiresHumanActor: true;
}
