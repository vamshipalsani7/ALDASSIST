/**
 * ALDASSIST Phase 8 — contract: provider ports (B0 §4).
 * The UI depends only on these interfaces. FixtureProvider implements them now;
 * Phase 9 adds ApiProvider behind the identical interfaces. A port returns `not-found`
 * for a cross-tenant object (CR-5) — it never throws "does not exist".
 */
import type { Loaded, OpaqueId, SourcePassageRef, ResolvedPassage } from './primitives';
import type { AssessmentVM } from './assessment';

export interface AssessmentProvider {
  /** One assessment for one invention. `not-found` if outside the actor's tenancy/grant. */
  get(inventionId: OpaqueId, assessmentId: OpaqueId): Promise<Loaded<AssessmentVM>>;
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
 * DR-01 seam (not resolved): whether the current actor may record a not-file Decision is a
 * reported capability sourced from an owner-decision slot — never a hard-coded role here.
 * Included as a type only; wired in B2 with the decision screen (SC-C09).
 */
export interface DecisionCapabilitiesVM {
  mayRecordNotFileDecision: { status: 'pending-slot'; slotId: 'DR-01'; source: 'owner-decision' };
}
