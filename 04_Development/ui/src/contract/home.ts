/**
 * ALDASSIST Phase 8 — contract: Client Home / Documents / Settings / Notifications view-models (B5).
 * Screens SC-C01 (home / action queue), SC-C17 (documents), SC-C20 (settings), SC-C21 (notifications).
 *
 * Governance encoded in the types:
 *  - SC-C01: two-axis on every item; the core split is Needs you vs Waiting on others (whose-turn, IP-12).
 *    A waiting item's "expected when" is a SlotValue — never an invented time (CR-19). Items link to the
 *    B2–B4 objects via RelatedObjectRef.
 *  - SC-C17: each document carries class · version · source and an Authorship (AI vs human — distinguishable,
 *    IP-07); a filed/assessed version is immutable (BR-20).
 *  - SC-C20: the client MFA policy and per-class notification channel defaults are SlotValues rendered as
 *    containers (S-10 / S-7), never filled; billing/deletion are Owner-only (others visible-but-locked).
 *  - SC-C21: notifications are grouped by CLASS in a fixed order; a Critical notification is structurally
 *    unmutable and cannot be dismissed without acknowledgement/action.
 *  - Cross-tenant objects are represented ONLY by Loaded's `not-found` (CR-5); role gaps by `permission-denied`.
 */
import type {
  TwoAxisStatus, WhoseTurn, NextActionVM, RelatedObjectRef, OpaqueId, IsoDate,
  SlotValue, Authorship, FreshnessStamp,
} from './primitives';
import type { DeadlineState } from './portfolio';
import type { PriceDisplayVM } from './matters';

/* ── SC-C01 · Home / action queue ★ (four fixed regions, P4:§18.1) ──────────*/
export interface NeedsYouItemVM {
  object: RelatedObjectRef; // links to a B2–B4 object (invention/application/deadline/matter/…)
  what: string;
  why: string;
  byWhen?: IsoDate; // a date the Rules Engine computed — rendered, not authored; omitted when none.
                    // Drives the deadline-proximity → criticality ordering of the queue (never invented).
  action: NextActionVM; // the single action for this item
  status: TwoAxisStatus<string>; // two-axis on EVERY item (CR-4) — lifecycle label + attention; never merged
}
export interface WaitingItemVM {
  object: RelatedObjectRef;
  who: string; // who we are waiting on (e.g. "the reviewer", "the office")
  what: string;
  whoseTurn: WhoseTurn; // actor + optional expected estimate (a SLOT — never invented)
  status: TwoAxisStatus<string>; // two-axis on EVERY item (CR-4)
}
export interface RecentChangeVM {
  object: RelatedObjectRef;
  change: string;
  date: IsoDate;
}
export interface PortfolioGlanceVM {
  countsByState: { label: string; count: number }[];
  next90Days: { label: string; date: IsoDate; state: DeadlineState }[];
  spend: PriceDisplayVM; // [L1] via PriceDisplay — the only money renderer
}
export interface HomeVM {
  needsYou: NeedsYouItemVM[];
  waitingOnOthers: WaitingItemVM[];
  recentlyChanged: RecentChangeVM[];
  glance: PortfolioGlanceVM;
  /** the queue never renders a false "all clear" when data is stale — set when a region is stale. */
  staleness?: FreshnessStamp;
}

/* ── SC-C17 · Documents ─────────────────────────────────────────────────────*/
export interface DocumentRowVM {
  id: OpaqueId;
  name: string;
  docClass: string; // e.g. "Disclosure", "Assessment", "Filed application" (sourced, not invented)
  version: string;
  source: string; // provenance: where it came from
  relatedRef: string; // matter/application reference
  date: IsoDate;
  authorship: Authorship; // AI vs human — visually/structurally distinguishable (IP-07)
  immutable: boolean; // a version referenced by a released assessment / filing is locked (BR-20)
}
export interface DocumentsIndexVM {
  rows: DocumentRowVM[];
  facets: { id: string; label: string; count: number }[];
  /** Entry point to the workspace access log — who accessed this workspace, including any time-boxed
   * support access (P4:§18 / mirrors SC-C20 `security.accessLogNote`). A navigable link, not a model. */
  accessLog: { label: string };
}

/* ── SC-C20 · Settings ──────────────────────────────────────────────────────*/
export interface MemberVM { name: string; role: 'Owner' | 'Admin' | 'Member' | 'Viewer' }
/** A control that a role may not change is shown visible-but-locked with the reason + who can act (IP-15). */
export interface LockInfo { reason: string; whoCanAct: string }
export interface SettingsVM {
  profileNote: string;
  workspaceName: string;
  members: MemberVM[];
  notifications: {
    criticalNote: string; // "Critical notifications cannot be muted" — stated here (P4:§18.2)
    channelDefault: SlotValue<string>; // per-class default channel (S-7) — container, never filled
  };
  billing: {
    note: string;
    price: PriceDisplayVM; // billing figures cross the L1 boundary via PriceDisplay — the only money
                           // renderer; amounts stay pending-slot and O-2026-001 stays OPEN (never invented).
    locked?: LockInfo;     // billing actions are Owner-only (Admin cannot act either — IP-15 routes to Owner)
  };
  security: {
    mfaPolicy: SlotValue<string>; // client MFA policy (S-10) — container, never filled
    sessionsNote: string;
    accessLogNote: string;
  };
  data: {
    residency: SlotValue<string>; // data residency (L7) — container, not an active control (V2)
    exportNote: string;
    retentionNote: string;
    deletion: { note: string; locked?: LockInfo }; // deletion is Owner-only
  };
}

/* ── SC-C21 · Notifications (grouped by class, not chronology) ──────────────*/
export type NotificationClass =
  | 'critical' | 'action-required' | 'progress' | 'informational' | 'proactive-reassurance';
export interface NotificationVM {
  id: OpaqueId;
  class: NotificationClass;
  title: string;
  object?: RelatedObjectRef; // the object this concerns (links to B2–B4)
  whoseTurn: WhoseTurn;
}
export interface NotificationGroupVM {
  class: NotificationClass;
  items: NotificationVM[];
}
export interface NotificationsVM {
  /** groups appear in the fixed class order; a Critical group's items are unmutable and cannot be
   * dismissed without acknowledgement/action (P4:§18.2) — enforced by the screen from `class`. */
  groups: NotificationGroupVM[];
}
