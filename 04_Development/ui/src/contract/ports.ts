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
