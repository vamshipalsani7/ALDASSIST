/**
 * ALDASSIST Phase 8 — Presentation-data contract: shared trust-critical primitives.
 * Realises B0 (`04_Development/Phase-8-B0-Presentation-Data-Contract-v0.1.md`) §3.
 *
 * Plain TypeScript, no React/DOM dependency — consumable by fixtures, Storybook, tests,
 * and (Phase 9) real service adapters alike. Constraints are encoded in the types.
 */

export type IsoDateTime = string; // ISO 8601 instant
export type IsoDate = string; // ISO 8601 date
export type OpaqueId = string; // confidential objects use opaque ids (P4:§9.2)
export type HumanReadableRange = string; // e.g. "typically 2–4 weeks" — never a countdown

/** §3.2 — a value the frozen baseline does NOT fix. Rendered as a container, never invented (CR-19). */
export type SlotSource = 'rules-engine' | 'config' | 'legal' | 'owner-decision' | 'measurement';
export type SlotValue<T> =
  | { status: 'resolved'; value: T; source: SlotSource }
  | { status: 'pending-slot'; slotId: string; source: SlotSource }
  | { status: 'unavailable'; reason: 'source-unreachable'; lastKnown?: T; asOf?: IsoDateTime };

/** Legal copy is owned by counsel; Phase 8 provides only the container. */
export type LegalContentSlot =
  | { slotId: string; status: 'pending-legal' }
  | { slotId: string; status: 'provided'; text: string };

/** §3.3 — two-axis status. Exactly three attention values; lifecycle is per-object (see each object file). */
export type AttentionState = 'on-track' | 'action-needed' | 'at-risk';
export interface TwoAxisStatus<L> {
  lifecycle: L; // lifecycle state chip — names ONLY from the frozen taxonomy
  attention: AttentionState; // independent attention marker — NEVER merged with lifecycle (CR-4)
}

/** §3.4 — whose-turn (the anti-silence backbone). */
export type WhoseTurnActor =
  | 'needs-you'
  | 'awaiting-you'
  | 'with-the-reviewer'
  | 'awaiting-the-office'
  | 'analysing'
  | 'nothing-needed';
export interface WhoseTurn {
  actor: WhoseTurnActor;
  /** "roughly when" — a SLOT (turnaround/range), never a fabricated time and never a countdown. */
  estimate?: SlotValue<HumanReadableRange>;
}

/** §3.5 — provenance. An assertion is EITHER verified-with-citation OR unverified. No third state. */
export interface SourcePassageRef {
  documentId: string; // e.g. a public register document id (synthetic in fixtures)
  locator: string; // e.g. "¶42"
}
export interface Citation {
  accessibleName: string; // "Cited passage in US 9,876,543, ¶42" — never "[1]" (P4:§22.3)
  passage: SourcePassageRef;
  source: 'ai-derived';
}
export type Assertion =
  | { kind: 'verified'; text: string; citation: Citation }
  | { kind: 'unverified'; text: string; note: 'citation-unresolved' }; // IP-08 fail-safe: never styled as fact

/**
 * The resolved cited passage — the content behind a Citation's `passage` ref. Produced by a
 * CitationResolver (fixtures now, register/corpus in Phase 9). A `verified` citation MUST resolve;
 * if resolution returns null the affordance falls back to the IP-08 fail-safe (never shown as verified).
 */
export interface ResolvedPassage {
  documentId: string;
  locator: string;
  sourceLabel: string; // e.g. "REF-α — synthetic prior-art record"
  excerpt: string; // the exact cited text (synthetic in fixtures; never real register content)
}

/** §3.6 — authorship distinction (AI vs human-reviewer), preserved in exports. */
export type Authorship =
  | { by: 'ai'; label: 'AI-generated' }
  | { by: 'reviewer'; reviewerName: string; releasedAt: IsoDateTime };

/** §3.8 — external-data freshness. */
export interface FreshnessStamp {
  source: string;
  retrievedAt: IsoDateTime;
  stale: boolean;
}

/** Object-page skeleton support types (B0 §5.1). */
export interface KeyValue {
  label: string;
  value: string;
  mono?: boolean;
}
export interface RelatedObjectRef {
  kind: 'invention' | 'application' | 'matter' | 'assessment' | 'document' | 'deadline';
  id: OpaqueId;
  label: string;
}
export interface NextActionVM {
  /** verbs come from the controlled lexicon (P4:§10.4) */
  verb: 'Record' | 'Assess' | 'Engage' | 'File' | 'Respond' | 'Confirm' | 'Decide' | 'Release' | 'Import' | 'Review';
  label: string;
  emphasis: 'primary' | 'secondary';
  /** "Nothing needed" is a valid resolution of the single-next-action slot (P4:§15.4). */
  nothingNeeded?: boolean;
}
export interface TabRef {
  id: string;
  label: string;
}

/** §3.1 — screen-level availability envelope. */
export interface EmptyStateVM {
  teaches: string; // teaches one thing
  action: NextActionVM; // offers one action (P4:§19.1)
}
export interface ErrorStateVM {
  reason: string; // plain language
  nextStep: string; // a way forward (P4:§19.3)
}
export interface PermissionDeniedVM {
  reason: string; // visible-but-locked (IP-15)
  whoCanAct: string; // e.g. "Ask the Workspace Owner" — never a silent escalation (CR-12)
}

/** The ONLY representation of a cross-tenant object is `not-found`, carrying nothing (CR-5). */
export type Loaded<T> =
  | { state: 'loading' }
  | { state: 'ready'; data: T }
  | { state: 'empty'; empty: EmptyStateVM }
  | { state: 'error'; error: ErrorStateVM }
  | { state: 'permission-denied'; denied: PermissionDeniedVM }
  | { state: 'not-found' };
