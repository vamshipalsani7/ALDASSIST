/**
 * ALDASSIST Phase 8 — contract: Client Portfolio / Deadlines view-models (B3).
 * Screens SC-C10 (portfolio), SC-C11 (application detail), SC-C12 (deadlines), SC-C13 (deadline detail).
 *
 * Governance encoded in the types:
 *  - Two-axis status never merged (CR-4): applications carry lifecycle + official sub-status + attention;
 *    deadlines carry a state axis + a criticality axis + attention.
 *  - "'Closed' never without its reason" (P4:§11.3): a closed application status carries `closedReason`.
 *  - Silence / Responding are STRUCTURAL modes of the application VM (like CR-2's released gate): the
 *    `responding` variant has no prosecution-workspace fields at all (status-only, DL:D-2026-016), and the
 *    `quiet` variant carries the expected-next-event range as a SLOT (S-5) — never an invented time (CR-19).
 *  - Deadline dates are COMPUTED, never authored (P5:X9/P3:D1): they are rendered data, and the trace may
 *    be `unavailable` (never a fabricated basis).
 *  - Cross-tenant objects are represented ONLY by Loaded's `not-found` (CR-5).
 *
 * NOTE on enumerations: the deadline STATE set is enumerated in the frozen baseline (P4:§11.5) and typed
 * here. The application §11.3 lifecycle/sub-status labels and the deadline criticality ladder are NOT
 * enumerated in the frozen Phase-6 set, so they are modelled as sourced strings/flags (rendered from the
 * provider, synthetic in fixtures) — never an invented taxonomy.
 */
import type {
  AttentionState, WhoseTurn, NextActionVM, TabRef, RelatedObjectRef, OpaqueId,
  IsoDate, SlotValue, HumanReadableRange, FreshnessStamp,
} from './primitives';

/* ── Deadline state axis — enumerated in the frozen baseline (P4:§11.5) ─────*/
export type DeadlineState =
  | 'upcoming' | 'approaching' | 'due' | 'confirmed' | 'met' | 'missed' | 'superseded' | 'na';

/** Criticality ladder tier — the tier LABELS are not enumerated in Phase 6; sourced, not invented.
 * `elevated` drives icon/emphasis only; criticality is shown icon + text (never colour-only, P4:§22.3). */
export interface DeadlineCriticalityVM {
  label: string;
  elevated: boolean;
}

/* ── SC-C10 · Portfolio index (filed applications — the post-filing spine) ──*/
export interface ApplicationStatusVM {
  lifecycle: string; // §11.3 lifecycle label — sourced, not enumerated here
  officialSubStatus: string; // official register sub-status (P4:§11.3)
  attention: AttentionState; // whose-turn axis — never merged with lifecycle (CR-4)
  closedReason?: string; // "'Closed' never without its reason" (P4:§11.3)
}
export interface ApplicationNextDeadlineVM {
  label: string;
  date: IsoDate; // computed by the Rules Engine — rendered, never authored (X9/D1)
  state: DeadlineState;
}
export interface ApplicationRowVM {
  id: OpaqueId; // opaque internal id in /app (P4:§9.2)
  officialNumber: string; // the official application number (shown)
  status: ApplicationStatusVM;
  jurisdiction: string;
  family: string;
  agent: string;
  nextDeadline?: ApplicationNextDeadlineVM;
}
export interface PortfolioIndexVM {
  rows: ApplicationRowVM[];
  facets: { id: string; label: string; count: number }[];
}

/* ── SC-C11 · Application detail (silence + Responding status-only) ─────────*/
export interface ApplicationIdentityVM {
  officialNumber: string;
  title: string; // confidential titles are opaque/placeholder in fixtures (P4:§9.2)
  jurisdiction: string;
  filingDate: IsoDate;
  priorityDate: IsoDate;
}
export interface TimelineEntryVM {
  event: string;
  date: IsoDate;
  freshness: FreshnessStamp; // source + freshness per entry (P4:§15.3 / NFR-A05)
}
export interface ApplicationHeaderVM {
  id: OpaqueId;
  identity: ApplicationIdentityVM;
  status: ApplicationStatusVM;
  whoseTurn: WhoseTurn;
  nextAction: NextActionVM;
  tabs: TabRef[]; // status · deadlines · documents · costs · family
  relationshipRail: RelatedObjectRef[]; // parent Invention etc. (one click away)
}
/**
 * Discriminated by presentation mode (structural, like CR-2):
 *  - 'active'     → the event timeline (source + freshness per entry).
 *  - 'quiet'      → the SILENCE view: last event + expected-next-event RANGE (S-5 SLOT), reassurance copy.
 *  - 'responding' → STATUS-ONLY: status + response deadline + the agent-uploaded filed response + an honest
 *                   "handled off-platform" note. There is NO prosecution-workspace / response-authoring
 *                   field on this variant — status-only is enforced by construction (DL:D-2026-016).
 */
export type ApplicationDetailVM =
  | { mode: 'active'; header: ApplicationHeaderVM; timeline: TimelineEntryVM[]; staleness?: FreshnessStamp }
  | { mode: 'quiet'; header: ApplicationHeaderVM; lastEvent: TimelineEntryVM;
      expectedNextEvent: SlotValue<HumanReadableRange>; reassurance: string; whatHappensNext: string; whySoLong: string }
  | { mode: 'responding'; header: ApplicationHeaderVM;
      responseDeadline: { label: string; date: IsoDate; state: DeadlineState };
      filedResponse?: { label: string; uploadedBy: string; date: IsoDate };
      offPlatformNote: string };

/* ── SC-C12 · Deadlines index (safety-critical visibility) ──────────────────*/
export interface DeadlineRowVM {
  id: OpaqueId;
  title: string;
  applicationRef: string; // the application this deadline belongs to (official number)
  date: IsoDate; // computed, never authored (X9/D1) — rendered, not set
  state: DeadlineState; // state axis
  criticality: DeadlineCriticalityVM; // criticality axis — icon + text, never colour-only
  attention: AttentionState;
}
export interface DeadlinesIndexVM {
  rows: DeadlineRowVM[];
  facets: { id: string; label: string; count: number }[];
  view: 'list' | 'calendar';
}

/* ── SC-C13 · Deadline detail — computation trace (IP-09 three-depth) ───────*/
export interface DeadlineTraceDetailVM {
  ruleId: string;
  ruleVersion: string;
  statutoryCitation: string;
  calendarAdjustment: string;
  extensions: string;
}
export interface DeadlineDetailVM {
  id: OpaqueId;
  // D1 — the date + criticality
  title: string;
  date: IsoDate; // computed, rendered, never set
  state: DeadlineState;
  criticality: DeadlineCriticalityVM;
  applicationRef: string;
  // D2 — why (trigger event + window)
  why: { trigger: string; window: string };
  // D3 — the full computation trace, OR an honest unavailable state (never a fabricated basis)
  trace: { status: 'available'; detail: DeadlineTraceDetailVM } | { status: 'unavailable' };
  /** The client ACKNOWLEDGES/understands — confirmation of a critical deadline is an agent/ops act
   * (BR-03), never the client's. The verb is never 'Confirm' for the client. */
  clientAction: NextActionVM;
  confirmationNote: string; // e.g. "Critical deadlines are confirmed by your agent or Docket Ops."
}
