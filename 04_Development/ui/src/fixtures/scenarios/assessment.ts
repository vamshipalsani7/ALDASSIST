/**
 * ALDASSIST Phase 8 — fixtures: Assessment/Verdict scenarios (B0 §6.2 mandatory coverage).
 *
 * NO INVENTED VALUES (CR-19): confidence scale + review turnaround are `pending-slot`; identifiers,
 * titles and passages are obviously SYNTHETIC demo data (no real register content, no PII). The verdict
 * is only present in `released-*` scenarios (CR-2). Every VERIFIED citation resolves through the passage
 * store (CR-6); `provenance-unresolved` carries one `unverified` assertion to exercise the IP-08 fail-safe.
 */
import type {
  Loaded, AssessmentVM, ConfidenceVM, ObjectHeaderVM, AssessmentLifecycle, EvidenceVM, ReasoningVM,
} from '../../contract';
import { makeCitation } from '../passages';

// --- shared synthetic header for the demo invention ------------------------
function header<L extends AssessmentLifecycle>(lifecycle: L): ObjectHeaderVM<L> {
  return {
    id: 'asmt_DEMO_0001',
    title: 'Assessment — Invention INV-7F3A (demo)',
    identity: [
      { label: 'Invention', value: 'INV-7F3A', mono: true },
      { label: 'Technical domain', value: 'Signal processing (demo)' },
      { label: 'Assessed disclosure version', value: 'v3', mono: true },
      { label: 'Jurisdiction', value: 'India' },
    ],
    status: { lifecycle, attention: lifecycle === 'released' ? 'action-needed' : 'on-track' },
    nextAction:
      lifecycle === 'released'
        ? { verb: 'Decide', label: 'Decide: file or not', emphasis: 'primary' }
        : { verb: 'Review', label: 'Nothing needed — the reviewer is reviewing', emphasis: 'secondary', nothingNeeded: true },
    whoseTurn:
      lifecycle === 'analysing'
        ? { actor: 'analysing' }
        : lifecycle === 'in-review'
        ? { actor: 'with-the-reviewer', estimate: { status: 'pending-slot', slotId: 'S-1 review turnaround', source: 'config' } }
        : { actor: 'needs-you' },
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'disclosure', label: 'Disclosure' },
      { id: 'assessments', label: 'Assessments' },
    ],
    relationshipRail: [
      { kind: 'invention', id: 'inv_7F3A', label: 'Invention INV-7F3A' },
      { kind: 'document', id: 'doc_disc_v3', label: 'Disclosure v3' },
    ],
  };
}

// confidence: basis is REQUIRED; the scale itself is an unfilled SLOT.
const confidence = (basisText: string): ConfidenceVM => ({
  basisText,
  scale: { status: 'pending-slot', slotId: 'S-2 confidence representation', source: 'measurement' },
});

const reasoning: ReasoningVM = {
  elements: [
    {
      element: 'Adaptive threshold module (demo element A)',
      finding: 'Disclosed feature compared against the closest located art.',
      references: [
        { label: 'REF-α', why: 'Discloses a fixed-threshold variant; does not teach adaptation.', citation: makeCitation('REF-ALPHA', '¶17') },
      ],
    },
    {
      element: 'Feedback-driven recalibration (demo element B)',
      finding: 'No located reference teaches the recalibration step in combination.',
      references: [
        { label: 'REF-β', why: 'Teaches recalibration in an unrelated field; combination not motivated.', citation: makeCitation('REF-BETA', '¶9') },
      ],
    },
  ],
  statutoryExclusion: [
    { provision: 'India s.3(k)', analysis: 'Assessed as not a computer-program-per-se on the demo facts (illustrative).' },
  ],
};

const evidence = (opts: { unresolved?: boolean } = {}): EvidenceVM => ({
  assertions: [
    {
      kind: 'verified',
      text: 'The closest located reference discloses a fixed threshold, not an adaptive one.',
      citation: makeCitation('REF-ALPHA', '¶17'),
    },
    opts.unresolved
      ? { kind: 'unverified', text: 'A further reference may bear on the recalibration step.', note: 'citation-unresolved' }
      : {
          kind: 'verified',
          text: 'No located reference teaches the recalibration step in combination.',
          citation: makeCitation('SEARCH-REC', '§2'),
        },
  ],
  referenceList: [
    { id: 'REF-ALPHA', label: 'REF-α — synthetic prior-art record' },
    { id: 'REF-BETA', label: 'REF-β — synthetic prior-art record' },
  ],
  coverageStatement: 'Searched: public register corpus (demo). Not searched: unpublished applications within the 18-month window.',
  blindSpotNotice: 'Applications filed within the last 18 months may not yet be public and cannot be assessed.',
});

const reviewer = { by: 'reviewer' as const, reviewerName: 'A. Reviewer, Verified Agent (demo)', releasedAt: '2026-09-03T09:00:00+05:30' };

// --- domain scenarios ------------------------------------------------------
const analysing: AssessmentVM = { status: 'analysing', header: header('analysing'), whoseTurn: header('analysing').whoseTurn };
const inReview: AssessmentVM = {
  status: 'in-review',
  header: header('in-review'),
  whoseTurn: header('in-review').whoseTurn,
  expected: { status: 'pending-slot', slotId: 'S-1 review turnaround', source: 'config' },
};
const releasedFavourable: AssessmentVM = {
  status: 'released', header: header('released'), releasedAt: reviewer.releasedAt,
  verdict: {
    review: reviewer,
    depth1: { label: 'looks-protectable', confidence: confidence('Based on the located art and the disclosed combination.'), plainMeaning: 'On the located art, this looks protectable.', recommendedNextSteps: ['Consider filing in India and/or via PCT.'] },
    depth2: reasoning, depth3: evidence(),
  },
};
const releasedQualified: AssessmentVM = {
  status: 'released', header: header('released'), releasedAt: reviewer.releasedAt,
  verdict: {
    review: reviewer,
    depth1: { label: 'protectable-with-changes', confidence: confidence('Protectable if the independent claim is narrowed to the recalibration combination.'), plainMeaning: 'Protectable with changes to the claim scope.', recommendedNextSteps: ['Narrow the independent claim before filing.'] },
    depth2: reasoning, depth3: evidence(),
    alternatives: { designAround: 'Design around REF-α.', tradeSecret: 'Keep the recalibration step as a trade secret.', defensivePublication: 'Publish defensively to prevent others patenting.', deferAndReassess: 'Defer and re-assess after further development.' },
  },
};
const releasedUnfavourable: AssessmentVM = {
  status: 'released', header: header('released'), releasedAt: reviewer.releasedAt,
  verdict: {
    review: reviewer,
    depth1: { label: 'unlikely-to-be-protectable', confidence: confidence('The located art appears to teach the disclosed combination.'), plainMeaning: 'On the located art, this is unlikely to be protectable — and here is why.', recommendedNextSteps: ['Consider the alternatives below.'] },
    depth2: reasoning, depth3: evidence(),
    alternatives: { designAround: 'Design around the blocking reference.', tradeSecret: 'Protect as a trade secret.', defensivePublication: 'Publish defensively.', deferAndReassess: 'Defer and re-assess if the invention develops.' },
  },
};
const inconclusive: AssessmentVM = {
  status: 'released', header: header('released'), releasedAt: reviewer.releasedAt,
  verdict: {
    review: reviewer,
    depth1: { label: 'not-enough-to-assess', confidence: confidence('The disclosure lacks the detail needed to assess the recalibration step.'), plainMeaning: 'There is not enough here to assess yet — here is what is missing.', recommendedNextSteps: ['Add detail on the recalibration step, then request a NEW assessment.'] },
    depth2: reasoning, depth3: evidence(),
  },
};
const provenanceUnresolved: AssessmentVM = {
  status: 'released', header: header('released'), releasedAt: reviewer.releasedAt,
  verdict: {
    review: reviewer,
    depth1: { label: 'protectable-with-changes', confidence: confidence('One supporting reference could not be resolved and is withheld.'), plainMeaning: 'Protectable with changes; one supporting source could not be verified and is shown as unverified.', recommendedNextSteps: ['Narrow the claim; the withheld reference is not relied upon.'] },
    depth2: reasoning, depth3: evidence({ unresolved: true }),
  },
};

export type AssessmentScenarioId =
  | 'analysing' | 'in-review'
  | 'released-favourable' | 'released-qualified' | 'released-unfavourable'
  | 'inconclusive' | 'provenance-unresolved'
  | 'loading' | 'empty' | 'error' | 'permission-denied' | 'not-found';

export const assessmentScenarios: Record<AssessmentScenarioId, Loaded<AssessmentVM>> = {
  analysing: { state: 'ready', data: analysing },
  'in-review': { state: 'ready', data: inReview },
  'released-favourable': { state: 'ready', data: releasedFavourable },
  'released-qualified': { state: 'ready', data: releasedQualified },
  'released-unfavourable': { state: 'ready', data: releasedUnfavourable },
  inconclusive: { state: 'ready', data: inconclusive },
  'provenance-unresolved': { state: 'ready', data: provenanceUnresolved },
  loading: { state: 'loading' },
  empty: { state: 'empty', empty: { teaches: 'Assessments appear here once you request one.', action: { verb: 'Assess', label: 'Request assessment', emphasis: 'primary' } } },
  error: { state: 'error', error: { reason: 'The assessment could not be loaded.', nextStep: 'Nothing was lost — retry, or come back shortly.' } },
  'permission-denied': { state: 'permission-denied', denied: { reason: 'Your role can view inventions but not this assessment.', whoCanAct: 'Ask the Workspace Owner.' } },
  'not-found': { state: 'not-found' },
};
