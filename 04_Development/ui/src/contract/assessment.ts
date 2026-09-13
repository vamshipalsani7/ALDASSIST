/**
 * ALDASSIST Phase 8 — contract: Assessment / Verdict view-models (SC-C08, the ★★ screen).
 * B0 §3, §5.3. The frozen review gate (CR-2/BR-01) is STRUCTURAL: a verdict is only representable
 * on `status:'released'`. Pre-release view-models have no verdict field at all.
 */
import type {
  Assertion, Authorship, SlotValue, WhoseTurn, HumanReadableRange, IsoDateTime, Citation,
} from './primitives';
import type { ObjectHeaderVM } from './invention';

/** Lifecycle sub-sets that gate each AssessmentVM branch (CR-2 enforced at the type level). */
export type PreReleaseAnalysing = 'requested' | 'analysing';
export type PreReleaseInReview = 'in-review';
export type PostReleaseLifecycle = 'released' | 'decided';

/** Assessment lifecycle — Phase 7 B.8 / ADR §4. */
export type AssessmentLifecycle = 'requested' | 'analysing' | 'in-review' | 'released' | 'decided';

/** Depth-1 verdict labels — the four fixed values (P4:§11.6). No fifth value. */
export type VerdictLabel =
  | 'looks-protectable'
  | 'protectable-with-changes'
  | 'unlikely-to-be-protectable'
  | 'not-enough-to-assess';

/** Confidence is shown WITH its basis; the scale is a SLOT (AP-08 / §12.3.4). Never colour-only, never a bare number. */
export interface ConfidenceVM {
  basisText: string;
  scale: SlotValue<{ level: string; of: string }>; // e.g. representation not fixed by baseline → pending-slot
}

/** Depth 2 — reasoning. */
export interface ReasoningElement {
  element: string; // the invention element under comparison
  finding: string;
  // Depth-2 references are AI-authored analysis (labelled AI-generated). If a reference is presented
  // with a resolvable `citation`, it is subject to the SAME provenance requirement (CR-6): it renders
  // the primary citation affordance and resolves to its passage, or it is not shown as verified.
  references: { label: string; why: string; citation?: Citation }[];
}
export interface ReasoningVM {
  elements: ReasoningElement[];
  statutoryExclusion: { provision: string; analysis: string }[]; // India s.3(k)/s.3(d) etc.
}

/** Depth 3 — evidence. Coverage statement is never collapsed by default on an unfavourable verdict (CR-6). */
export interface EvidenceVM {
  assertions: Assertion[]; // each verified-with-citation OR unverified (fail-safe)
  referenceList: { id: string; label: string }[];
  coverageStatement: string; // what was / was not searched
  blindSpotNotice: string; // the 18-month blind-spot (P3:§12.5)
}

/** Four alternatives shown at EQUAL visual weight on an unfavourable verdict (UXP-7 / P4:§11.6). */
export interface FourAlternativesVM {
  designAround: string;
  tradeSecret: string;
  defensivePublication: string;
  deferAndReassess: string;
}

/** The released verdict. Only exists when the mandatory human review has released it. */
export interface VerdictVM {
  review: Extract<Authorship, { by: 'reviewer' }>; // named reviewer + release date (BR-01/FR-A07)
  depth1: {
    label: VerdictLabel;
    confidence: ConfidenceVM;
    plainMeaning: string;
    recommendedNextSteps: string[];
  };
  depth2: ReasoningVM;
  depth3: EvidenceVM;
  /** Present on unfavourable/qualified outcomes; options, not consolation. */
  alternatives?: FourAlternativesVM;
}

/**
 * The Assessment view-model. Discriminated by lifecycle:
 * - `analysing`  → header + whose-turn; NO verdict field exists.
 * - `in-review`  → header + whose-turn + expected turnaround SLOT; still NO verdict.
 * - `released`   → the verdict.
 * This makes "show a verdict before human release" unrepresentable (CR-2).
 */
export type AssessmentVM =
  | {
      status: 'analysing';
      header: ObjectHeaderVM<PreReleaseAnalysing>; // header lifecycle cannot be 'released' (CR-2)
      whoseTurn: WhoseTurn; // actor: 'analysing'
    }
  | {
      status: 'in-review';
      header: ObjectHeaderVM<PreReleaseInReview>; // header lifecycle is exactly 'in-review'
      whoseTurn: WhoseTurn; // actor: 'with-the-reviewer'
      expected: SlotValue<HumanReadableRange>;
    }
  | {
      status: 'released';
      header: ObjectHeaderVM<PostReleaseLifecycle>; // header lifecycle must be 'released' | 'decided'
      releasedAt: IsoDateTime;
      verdict: VerdictVM;
    };
