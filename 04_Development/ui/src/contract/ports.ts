/**
 * ALDASSIST Phase 8 — contract: provider ports (B0 §4).
 * The UI depends only on these interfaces. FixtureProvider implements them now;
 * Phase 9 adds ApiProvider behind the identical interfaces. A port returns `not-found`
 * for a cross-tenant object (CR-5) — it never throws "does not exist".
 */
import type { Loaded, OpaqueId, SourcePassageRef, ResolvedPassage } from './primitives';
import type { AssessmentVM } from './assessment';
import type {
  WorkspaceSetupVM, InventionsIndexVM, DisclosureCaptureVM, InventionDetailVM,
  DisclosureVersionsVM, AssessmentRequestVM, AssessmentsListVM, DecisionVM,
} from './vault';
import type {
  PortfolioIndexVM, ApplicationDetailVM, DeadlinesIndexVM, DeadlineDetailVM,
} from './portfolio';
import type {
  MattersIndexVM, MatterWorkspaceVM, CostsVM, MatchingVM, QuoteEngagementVM,
} from './matters';
import type {
  HomeVM, DocumentsIndexVM, SettingsVM, NotificationsVM,
} from './home';

export interface AssessmentProvider {
  /** One assessment for one invention. `not-found` if outside the actor's tenancy/grant. */
  get(inventionId: OpaqueId, assessmentId: OpaqueId): Promise<Loaded<AssessmentVM>>;
}

/* ── B2 · Client Vault-path ports ──────────────────────────────────────────
   Every object-scoped port returns Loaded's `not-found` for a cross-tenant object (CR-5) —
   it never throws or reveals existence. FixtureProviders implement these now; Phase 9 adds
   ApiProviders behind the identical interfaces. */

/** SC-C00 — workspace creation/join interstitial (tenancy born on first disclosure). */
export interface WorkspaceSetupProvider {
  get(mode: 'create' | 'accept-invitation'): Promise<Loaded<WorkspaceSetupVM>>;
}
/** SC-C02 — the inventions index (tenancy-scoped list). */
export interface InventionsProvider {
  list(): Promise<Loaded<InventionsIndexVM>>;
}
/** SC-C04 — invention detail hub. `not-found` when cross-tenant / Named-Inventor out of scope. */
export interface InventionDetailProvider {
  get(inventionId: OpaqueId): Promise<Loaded<InventionDetailVM>>;
}
/** SC-C03 — guided disclosure capture. */
export interface DisclosureCaptureProvider {
  get(inventionId: OpaqueId): Promise<Loaded<DisclosureCaptureVM>>;
}
/** SC-C05 — current disclosure + immutable version history. */
export interface DisclosureVersionsProvider {
  get(inventionId: OpaqueId): Promise<Loaded<DisclosureVersionsVM>>;
}
/** SC-C06 — request assessment. */
export interface AssessmentRequestProvider {
  get(inventionId: OpaqueId): Promise<Loaded<AssessmentRequestVM>>;
}
/** SC-C07 — assessments list for one invention. */
export interface AssessmentsListProvider {
  list(inventionId: OpaqueId): Promise<Loaded<AssessmentsListVM>>;
}
/** SC-C09 — record decision (DR-01-agnostic; capability is a pending slot in the VM). */
export interface DecisionProvider {
  get(inventionId: OpaqueId): Promise<Loaded<DecisionVM>>;
}

/* ── B3 · Client Portfolio / Deadlines ports ────────────────────────────────
   Object-scoped ports return Loaded's `not-found` for a cross-tenant object (CR-5). Deadline dates are
   computed by the Rules Engine and only rendered here (never authored). */

/** SC-C10 — portfolio index (filed applications). */
export interface PortfolioProvider {
  list(): Promise<Loaded<PortfolioIndexVM>>;
}
/** SC-C11 — application detail (active / quiet-silence / responding-status-only). */
export interface ApplicationDetailProvider {
  get(applicationId: OpaqueId): Promise<Loaded<ApplicationDetailVM>>;
}
/** SC-C12 — deadlines index (safety-critical visibility). */
export interface DeadlinesProvider {
  list(): Promise<Loaded<DeadlinesIndexVM>>;
}
/** SC-C13 — deadline detail with the full computation trace (may be `unavailable`). */
export interface DeadlineDetailProvider {
  get(deadlineId: OpaqueId): Promise<Loaded<DeadlineDetailVM>>;
}

/* ── B4 · Client Matter / Costs / Matching ports ────────────────────────────
   Object-scoped ports return Loaded's `not-found` for a cross-tenant object (CR-5). Costs and engage/pay
   are role-gated: a role without access is represented by Loaded's `permission-denied` (IP-15), never a
   silent escalation. No provider composes price logic — they return PriceDisplayVM containers (P5:X12). */

/** SC-C14 — matters index. */
export interface MattersProvider {
  list(): Promise<Loaded<MattersIndexVM>>;
}
/** SC-C15 — matter workspace. */
export interface MatterWorkspaceProvider {
  get(matterId: OpaqueId): Promise<Loaded<MatterWorkspaceVM>>;
}
/** SC-C16 — costs (Owner/Admin only; Member/Viewer → permission-denied). */
export interface CostsProvider {
  get(): Promise<Loaded<CostsVM>>;
}
/** SC-C18 — agent matching (Owner-only; `error` = conflict check could not complete, fails closed). */
export interface MatchingProvider {
  get(): Promise<Loaded<MatchingVM>>;
}
/** SC-C19 — quote & engagement (Owner-only; non-Owner → permission-denied, routed to Owner). */
export interface QuoteEngagementProvider {
  get(agentId: OpaqueId): Promise<Loaded<QuoteEngagementVM>>;
}

/* ── B5 · Client Home / Documents / Settings / Notifications ports ──────────
   Home and Notifications aggregate across the B2–B4 object surfaces; a role gap is `permission-denied`. */

/** SC-C01 — home / action queue. */
export interface HomeProvider {
  get(): Promise<Loaded<HomeVM>>;
}
/** SC-C17 — documents index. */
export interface DocumentsProvider {
  list(): Promise<Loaded<DocumentsIndexVM>>;
}
/** SC-C20 — settings. */
export interface SettingsProvider {
  get(): Promise<Loaded<SettingsVM>>;
}
/** SC-C21 — notification centre. */
export interface NotificationsProvider {
  list(): Promise<Loaded<NotificationsVM>>;
}

/**
 * Resolves a citation's passage reference to its exact cited content (B0 §3.5 / CR-6).
 * FixtureCitationResolver implements this now; Phase 9 resolves against the register/corpus.
 * Returns null when the passage cannot be resolved → the caller must apply the IP-08 fail-safe.
 */
export interface CitationResolver {
  resolve(ref: SourcePassageRef): Promise<ResolvedPassage | null>;
}

/**
 * DR-01 seam (not resolved): realised in B2 as `DecisionCapabilityVM` in ./vault — whether the
 * current actor may record a not-file Decision is a reported capability sourced from an
 * owner-decision slot, never a hard-coded role. Consumed by SC-C09 (DecisionRecordScreen).
 */
