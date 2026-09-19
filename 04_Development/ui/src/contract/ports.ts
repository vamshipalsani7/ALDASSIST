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
import type {
  AgentOnboardingVM, AgentTodayVM, AgentDocketVM, AgentMattersIndexVM, MatterImportVM,
  AgentMatterDetailVM, ReviewsQueueVM, ReviewWorkspaceVM, OpportunitiesVM, PracticeVM,
  AgentSettingsVM, AgentNotificationsVM,
} from './agent';
import type {
  DocketHealthVM, AgentVerificationVM, RuleAuthoringVM, QualityConsoleVM, BusinessDashboardVM,
} from './ops';
import type {
  PublicHomeVM, PatentSearchVM, PatentDocumentVM, StageLandingVM, SegmentLandingVM, PricingVM,
  CostPlannerVM, FindYourPathVM, GuidesVM, GlossaryVM, JurisdictionGuideVM, ReportsVM,
  AgentDirectoryVM, AgentPublicProfileVM, TrustPageVM, CompanyLegalVM, AuthVM,
} from './public';

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

/* ── B6 · Agent surface (`/agent`) ports ────────────────────────────────────
   Every object-scoped port returns Loaded's `not-found` for a cross-tenant / out-of-grant object (CR-5) —
   a review grant exposes exactly one Disclosure version + analysis (IP-16). Slots (turnaround, stat
   confidence, settlement) and fees (PriceDisplay) are containers, never invented (CR-19). DR-02 stays
   agnostic (import performs no de-duplication). FixtureProviders implement these now; Phase 9 adds
   ApiProviders behind the identical interfaces. */

/** SC-A00 — agent onboarding & verification. */
export interface AgentOnboardingProvider {
  get(): Promise<Loaded<AgentOnboardingVM>>;
}
/** SC-A01 — agent Today (risk-ranked queue across docket / matters / reviews). */
export interface AgentTodayProvider {
  get(): Promise<Loaded<AgentTodayVM>>;
}
/** SC-A02 — agent docket (+ deadline detail). */
export interface AgentDocketProvider {
  get(): Promise<Loaded<AgentDocketVM>>;
}
/** SC-A03 — agent matters index (platform + own). */
export interface AgentMattersProvider {
  list(): Promise<Loaded<AgentMattersIndexVM>>;
}
/** SC-A04 — matter import (DR-02-agnostic; no de-duplication). */
export interface MatterImportProvider {
  get(): Promise<Loaded<MatterImportVM>>;
}
/** SC-A05 — agent matter detail (brief + work). `not-found` when not the assigned agent (CR-5). */
export interface AgentMatterDetailProvider {
  get(matterId: OpaqueId): Promise<Loaded<AgentMatterDetailVM>>;
}
/** SC-A06 — reviews queue (domain-matched; conflicted items never appear). */
export interface ReviewsQueueProvider {
  list(): Promise<Loaded<ReviewsQueueVM>>;
}
/** SC-A07 — review workspace (review grant only; the CR-2/BR-01 gate). `not-found` outside the grant. */
export interface ReviewWorkspaceProvider {
  get(reviewId: OpaqueId): Promise<Loaded<ReviewWorkspaceVM>>;
}
/** SC-A08 — opportunities (Agent Matching / Engagement). */
export interface OpportunitiesProvider {
  list(): Promise<Loaded<OpportunitiesVM>>;
}
/** SC-A09–A12 — Practice (profile / outcomes / capacity / earnings). */
export interface PracticeProvider {
  get(): Promise<Loaded<PracticeVM>>;
}
/** SC-A13 — agent settings. */
export interface AgentSettingsProvider {
  get(): Promise<Loaded<AgentSettingsVM>>;
}
/** SC-A14 — agent notification centre + context switcher. */
export interface AgentNotificationsProvider {
  list(): Promise<Loaded<AgentNotificationsVM>>;
}

/* ── B7 · Operations surface (`/ops`) ports ─────────────────────────────────
   Internal-only (MFA + justification, P4:§2.3); every access audited/justified. Ops may aggregate across
   tenants where the frozen model permits (docket health), but Disclosure bodies stay consent-gated
   (BR-16) — the VMs carry metadata/refs/status only. Slots (metric values, OP-2 target, OP-6 validation)
   are containers, never invented (CR-19). FixtureProviders implement these now; Phase 9 adds ApiProviders. */

/** SC-O01 — Docket Health Console (unconfirmed / discrepancies / undelivered / escalations). */
export interface DocketHealthProvider {
  get(): Promise<Loaded<DocketHealthVM>>;
}
/** SC-O02 — Agent Verification (register check → hold when unavailable; never auto-approve). */
export interface AgentVerificationProvider {
  get(): Promise<Loaded<AgentVerificationVM>>;
}
/** SC-O03 — Rule Authoring Console (rules-as-data; publish gated by tests + impact + dual control). */
export interface RuleAuthoringProvider {
  get(): Promise<Loaded<RuleAuthoringVM>>;
}
/** SC-O04 — Quality & Review Console (OP-6 measured; validation step is a pending slot). */
export interface QualityConsoleProvider {
  get(): Promise<Loaded<QualityConsoleVM>>;
}
/** SC-O05 — Business metrics dashboard (Metrics.md definitions; OP-2 uncalibrated; OP-5 split). */
export interface BusinessDashboardProvider {
  get(): Promise<Loaded<BusinessDashboardVM>>;
}

/* ── B8 · Public surface (`/`) ports ────────────────────────────────────────
   Public/anonymous read. Register data carries source + freshness; upstream failure → cached + staleness,
   never an error page. Fees/timelines from the Rules Engine and legal wording (L1/L3/L4) are containers,
   never invented (CR-19). The SSR/SSG rendering strategy is NOT modelled — these return fixture-driven
   view-models like every other surface. FixtureProviders implement these now; Phase 9 adds ApiProviders. */

/** SC-P01 — public home. */
export interface PublicHomeProvider { get(): Promise<Loaded<PublicHomeVM>>; }
/** SC-P02 — Zone-2 register search. */
export interface PatentSearchProvider { search(query: string): Promise<Loaded<PatentSearchVM>>; }
/** SC-P03 — patent document page. */
export interface PatentDocumentProvider { get(jurisdiction: string, number: string): Promise<Loaded<PatentDocumentVM>>; }
/** SC-P04 — stage landings (grouped). */
export interface StageLandingProvider { get(stage: string): Promise<Loaded<StageLandingVM>>; }
/** SC-P05 — segment landings (grouped). */
export interface SegmentLandingProvider { get(segment: string): Promise<Loaded<SegmentLandingVM>>; }
/** SC-P06 — pricing. */
export interface PricingProvider { get(): Promise<Loaded<PricingVM>>; }
/** SC-P07 — cost planner (ungated). */
export interface CostPlannerProvider { get(): Promise<Loaded<CostPlannerVM>>; }
/** SC-P08 — find-your-path. */
export interface FindYourPathProvider { get(): Promise<Loaded<FindYourPathVM>>; }
/** SC-P09 — learn / guides (index + article). */
export interface GuidesProvider { get(slug?: string): Promise<Loaded<GuidesVM>>; }
/** SC-P10 — glossary (index + term); shares the in-product tooltip record. */
export interface GlossaryProvider { get(term?: string): Promise<Loaded<GlossaryVM>>; }
/** SC-P11 — jurisdiction guide (India / PCT). */
export interface JurisdictionGuideProvider { get(jurisdiction: string): Promise<Loaded<JurisdictionGuideVM>>; }
/** SC-P12 — reports. */
export interface ReportsProvider { get(slug: string): Promise<Loaded<ReportsVM>>; }
/** SC-P13 — public agent directory + profile. */
export interface AgentDirectoryProvider { list(): Promise<Loaded<AgentDirectoryVM>>; }
export interface AgentPublicProfileProvider { get(slug: string): Promise<Loaded<AgentPublicProfileVM>>; }
/** SC-P14 — trust pages (grouped). */
export interface TrustProvider { get(page: string): Promise<Loaded<TrustPageVM>>; }
/** SC-P15 — company + legal (grouped). */
export interface CompanyLegalProvider { get(page: string): Promise<Loaded<CompanyLegalVM>>; }
/** SC-P16 — account creation & sign-in (no Workspace created here, A1). */
export interface AuthProvider { get(mode: string): Promise<Loaded<AuthVM>>; }

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
