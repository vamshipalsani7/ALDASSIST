/**
 * ALDASSIST Phase 8 — fixtures: Operations-surface scenarios (B7). Synthetic/demo data only.
 *
 * NO INVENTED VALUES (CR-19): every current metric VALUE is a pending slot (Phase 9 measurement); OP-2's
 * target is uncalibrated (pending); the OP-6 validation step is a pending slot. Definitions, targets and
 * thresholds are transcribed EXACTLY from Metrics.md / D-2026-018. SC-O02 includes a register-check
 * `unavailable` submission (a HOLD — no approve affordance). SC-O03 includes a gate-blocked scenario (a
 * failing golden case → no publish). Disclosure bodies are never present (BR-16).
 */
import type {
  Loaded, DocketHealthVM, AgentVerificationVM, RuleAuthoringVM, QualityConsoleVM, BusinessDashboardVM,
  SlotValue,
} from '../../contract';

const pending = (slotId: string): SlotValue<string> => ({ status: 'pending-slot', slotId, source: 'measurement' });
// Targets/thresholds are transcribed from the canonical Metrics.md definitions (config source).
const val = (v: string): SlotValue<string> => ({ status: 'resolved', value: v, source: 'config' });

/* ── SC-O01 · Docket Health Console ─────────────────────────────────────────*/
const docketHealth: DocketHealthVM = {
  accessNote: 'Internal console — access is justified and audited. Disclosure bodies are consent-gated and are not shown here; only metadata, deadlines, events and status appear.',
  queues: [
    { key: 'unconfirmed', label: 'Unconfirmed critical deadlines', items: [
      { id: 'dh_1', title: 'FER response awaiting confirmation', objectRef: { kind: 'deadline', id: 'dl_x1', label: '2026/DEL/000777 · FER response' }, detail: 'A rights-affecting deadline is unconfirmed.', date: '2026-10-02', state: 'approaching', criticality: { label: 'Rights-affecting', elevated: true }, attention: 'at-risk', action: { label: 'Confirm deadline', emphasis: 'primary' } },
    ] },
    { key: 'discrepancies', label: 'Source discrepancies', items: [
      { id: 'dh_2', title: 'Register date differs from computed date', objectRef: { kind: 'application', id: 'app_x2', label: 'PCT/IB2026/050999' }, detail: 'The register-reported date does not match the Deadline Engine computation.', attention: 'action-needed', action: { label: 'Resolve discrepancy', emphasis: 'primary' } },
    ] },
    { key: 'undelivered', label: 'Undelivered critical notifications', items: [
      { id: 'dh_3', title: 'Critical notification not confirmed delivered', objectRef: { kind: 'deadline', id: 'dl_x3', label: 'National-phase entry reminder' }, detail: 'A Critical notification has no delivery receipt; Docket Ops paged.', attention: 'at-risk', action: { label: 'Act on undelivered', emphasis: 'primary' } },
    ] },
    { key: 'escalations', label: 'Escalations', items: [] },
  ],
};
const docketHealthClear: DocketHealthVM = {
  accessNote: docketHealth.accessNote,
  queues: [
    { key: 'unconfirmed', label: 'Unconfirmed critical deadlines', items: [] },
    { key: 'discrepancies', label: 'Source discrepancies', items: [] },
    { key: 'undelivered', label: 'Undelivered critical notifications', items: [] },
    { key: 'escalations', label: 'Escalations', items: [] },
  ],
};

/* ── SC-O02 · Agent Verification ────────────────────────────────────────────*/
const agentVerification: AgentVerificationVM = {
  precedenceNote: 'Verification precedes any client (Zone-1) access. A pending agent is a limited account: no reviews, no matching, no client material.',
  holdNote: 'If the official-register check is unavailable, the submission is held with an honest status — it is never auto-approved.',
  submissions: [
    { id: 'ver_1', agentName: 'A. Candidate (demo)', credentials: 'Registration no. + qualification (submitted)', registerCheck: { status: 'passed', note: 'Matched against the official register (demo).' }, domains: ['Electronics', 'Signal processing'], conflicts: 'No conflicts declared.', status: 'pending', reject: { label: 'Reject', emphasis: 'secondary' }, approve: { label: 'Approve verification', emphasis: 'primary' } },
    { id: 'ver_2', agentName: 'B. Candidate (demo)', credentials: 'Registration no. + qualification (submitted)', registerCheck: { status: 'unavailable', note: 'The official register could not be reached; the check is on hold.' }, domains: ['Chemistry'], conflicts: 'One conflict declared — under review.', status: 'pending', reject: { label: 'Reject', emphasis: 'secondary' } },
  ],
  disputes: [
    { id: 'dis_1', label: 'Conflict review — matter 0042', note: 'A declared conflict is queued for review.' },
  ],
};

/* ── SC-O03 · Rule Authoring Console ────────────────────────────────────────*/
const ruleAuthoring: RuleAuthoringVM = {
  ruleId: 'IN-FER-RESP',
  jurisdiction: 'India',
  editorNote: 'Rules are authored as data, never code. This editor changes versioned rule data; the Deadline Engine and official-fee derivation read it.',
  sourceCitation: { kind: 'verified', text: 'The response window derives from the governing provision.', citation: { accessibleName: 'Governing provision — synthetic source record, ¶17', passage: { documentId: 'REF-ALPHA', locator: '¶17' }, source: 'ai-derived' } },
  versions: [
    { version: 'v3', status: 'draft', note: 'Working draft — not yet published.' },
    { version: 'v2', status: 'published', publishedAt: '2026-06-01T10:00:00+05:30', note: 'Current published version.' },
    { version: 'v1', status: 'published', publishedAt: '2026-01-15T10:00:00+05:30', note: 'Superseded.' },
  ],
  goldenCases: [
    { id: 'gc_1', label: 'Standard FER window', result: 'pass' },
    { id: 'gc_2', label: 'Window falling on a holiday', result: 'pass' },
    { id: 'gc_3', label: 'Extension provisions', result: 'pass' },
  ],
  impact: { summary: 'Pre-publication impact across the live portfolio.', affectedCount: pending('impact: affected applications (live portfolio)') },
  gate: { testsPass: true, impactReviewed: true, dualControlNote: 'Publication requires dual control — a second Rule Author approves before a version goes live.' },
  publish: { label: 'Publish rule version', emphasis: 'primary' },
  feesDeriveNote: 'Official fees derive from these rules. How fees are displayed to clients is a separate, still-open decision (rendered only through the price component).',
};
const ruleAuthoringBlocked: RuleAuthoringVM = {
  ...ruleAuthoring,
  goldenCases: [
    { id: 'gc_1', label: 'Standard FER window', result: 'pass' },
    { id: 'gc_2', label: 'Window falling on a holiday', result: 'fail' },
    { id: 'gc_3', label: 'Extension provisions', result: 'pass' },
  ],
  gate: { testsPass: false, impactReviewed: true, dualControlNote: ruleAuthoring.gate.dualControlNote },
  publish: undefined,
  blockedNote: 'Publication is blocked: a golden case is failing. Fix the rule and re-run the suite before publishing.',
};

/* ── SC-O04 · Quality & Review Console ──────────────────────────────────────*/
const quality: QualityConsoleVM = {
  op6: {
    metricName: 'Percentage of AI Output Materially Edited',
    formula: 'AI outputs materially edited by the reviewer ÷ AI outputs reviewed',
    target: '<15% (falling toward)',
    mustHoldThreshold: '<20%',
    materialClauses: [
      'Changes the verdict outcome (favourable / qualified / unfavourable / inconclusive)',
      'Adds, removes or changes a citation (provenance)',
      'Changes a substantive conclusion the client would rely on',
    ],
    nonMaterialNote: 'Stylistic, clarity, formatting and reordering edits are non-material.',
    provenanceRule: 'Any provenance change is material by rule (AP-04 / AP-08).',
    validation: pending('OP-6 material-diff validation step (D-2026-018) — validated against real reviewer edit diffs during measurement design'),
  },
  metrics: [
    { key: 'edit-rate', label: 'AI edit rate', definitionNote: 'Share of AI outputs materially edited (OP-6).', value: pending('OP-6 measured value') },
    { key: 'severity', label: 'Edit severity', definitionNote: 'Severity distribution of reviewer edits (FR-A08 diffs).', value: pending('edit-severity measurement') },
    { key: 'evals', label: 'Eval results', definitionNote: 'Latest evaluation-suite results.', value: pending('eval-suite results') },
    { key: 'regressions', label: 'Regressions', definitionNote: 'Open quality regressions.', value: pending('regression count') },
    { key: 'outcome-quality', label: 'Outcome quality', definitionNote: 'Sampled outcome quality.', value: pending('outcome-quality sample') },
  ],
  samplingQueue: [
    { id: 'sq_1', label: 'Sample: assessment INV-7F3A', note: 'Queued for quality review.' },
  ],
  capabilityDriftNote: 'No silent capability drift: a T2 model or prompt change requires an evaluation and a recorded approval before it ships.',
};

/* ── SC-O05 · Business metrics dashboard ────────────────────────────────────*/
const business: BusinessDashboardVM = {
  headline: [
    { id: 'OP-1', name: 'Disclosure → Filing Conversion', formula: 'Disclosures that resulted in a filing ÷ Disclosures', target: val('>25%'), threshold: '~15%', value: pending('OP-1 measured value') },
    { id: 'OP-3', name: 'Agent-Hours per Matter', formula: 'Agent hours ÷ Matters', target: val('−40% within 18 months'), value: pending('OP-3 measured value'), note: 'Baseline not defined in the repository — the target is a relative reduction with no stated starting value.' },
    { id: 'OP-4', name: 'Recurring Revenue Share', formula: 'Recurring revenue ÷ Total revenue', target: val('>40% by Year 3'), value: pending('OP-4 measured value') },
  ],
  op5: {
    platformAttributable: { id: 'OP-5 (platform-attributable)', name: 'Missed Deadlines — platform-attributable', formula: 'Count of missed deadlines attributable to platform error', target: val('Zero — each a Sev-1 incident (24h client disclosure, NFR-C01)'), value: pending('OP-5 platform-attributable count') },
    totalOperational: { id: 'OP-5 (total)', name: 'Missed Deadlines — total operational', formula: 'Count of all missed deadlines (incl. client / agent inaction)', target: val('No zero bar — monitored as a separate operational measure'), value: pending('OP-5 total count') },
  },
  additional: [
    { id: 'OP-2', name: 'Released Assessment → Paid Filing Engagement', formula: 'Released Assessments converting to a paid filing engagement ÷ Released Assessments', target: pending('OP-2 target — calibrated from early released-assessment cohort data (D-2026-018), not fixed'), threshold: '<15%', value: pending('OP-2 measured value'), note: 'Expected higher than OP-1 (OP-1 ≤ OP-2 by construction). Target is uncalibrated.' },
    { id: 'OP-6', name: 'Percentage of AI Output Materially Edited', formula: 'AI outputs materially edited ÷ AI outputs reviewed', target: val('<15% (falling toward)'), threshold: '<20% (must-hold)', value: pending('OP-6 measured value') },
  ],
  definitionsNote: 'Metric definitions are canonical in Metrics.md. Values are measured from live data (Phase 9); sparse data is shown honestly, never fabricated.',
};

/* ── Scenario registries ────────────────────────────────────────────────────*/
export const docketHealthScenarios = {
  ready: { state: 'ready', data: docketHealth } as Loaded<DocketHealthVM>,
  clear: { state: 'ready', data: docketHealthClear } as Loaded<DocketHealthVM>,
  loading: { state: 'loading' } as Loaded<DocketHealthVM>,
  error: { state: 'error', error: { reason: 'The Docket Health console could not be fully loaded.', nextStep: 'Retry shortly. Nothing is marked clear that we could not confirm.' } } as Loaded<DocketHealthVM>,
};
export const agentVerificationScenarios = {
  ready: { state: 'ready', data: agentVerification } as Loaded<AgentVerificationVM>,
  loading: { state: 'loading' } as Loaded<AgentVerificationVM>,
};
export const ruleAuthoringScenarios = {
  ready: { state: 'ready', data: ruleAuthoring } as Loaded<RuleAuthoringVM>,
  'gate-blocked': { state: 'ready', data: ruleAuthoringBlocked } as Loaded<RuleAuthoringVM>,
  loading: { state: 'loading' } as Loaded<RuleAuthoringVM>,
};
export const qualityScenarios = {
  ready: { state: 'ready', data: quality } as Loaded<QualityConsoleVM>,
  loading: { state: 'loading' } as Loaded<QualityConsoleVM>,
};
export const businessScenarios = {
  ready: { state: 'ready', data: business } as Loaded<BusinessDashboardVM>,
  loading: { state: 'loading' } as Loaded<BusinessDashboardVM>,
};
