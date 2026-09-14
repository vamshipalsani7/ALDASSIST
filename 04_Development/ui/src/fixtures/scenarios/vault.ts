/**
 * ALDASSIST Phase 8 — fixtures: Client Vault-path scenarios (B2 mandatory-state coverage).
 *
 * NO INVENTED VALUES (CR-19): review turnaround and the edit-idle-timeout are `pending-slot`;
 * the DR-01 not-file-decision role is a `pending-slot` capability. All identifiers/titles are
 * obviously SYNTHETIC demo data (opaque ids — titles are confidential, P4:§9.2). Two-axis status
 * is always a pair (CR-4). Cross-tenant objects are represented ONLY by `not-found` (CR-5).
 */
import type {
  Loaded, WorkspaceSetupVM, InventionsIndexVM, DisclosureCaptureVM, InventionDetailVM,
  DisclosureVersionsVM, AssessmentRequestVM, AssessmentsListVM, DecisionVM,
} from '../../contract';

/* ── SC-C00 · Workspace setup ──────────────────────────────────────────────*/
const workspaceCreate: WorkspaceSetupVM = {
  mode: 'create',
  roleExplanation: 'Creating a workspace makes you its Owner. You can invite others later as Admin, Member, or Viewer.',
  nameFieldLabel: 'Workspace name',
  primaryAction: { verb: 'Record', label: 'Create workspace', emphasis: 'primary' },
};
const workspaceAccept: WorkspaceSetupVM = {
  mode: 'accept-invitation',
  assignedRole: 'member',
  roleExplanation: 'You have been invited to join this workspace as a Member. Only the workspace creator holds the Owner role.',
  nameFieldLabel: 'Workspace name',
  primaryAction: { verb: 'Confirm', label: 'Accept invitation', emphasis: 'primary' },
};

/* ── SC-C02 · Inventions index ─────────────────────────────────────────────*/
const inventionsIndex: InventionsIndexVM = {
  recordAction: { verb: 'Record', label: 'Record an invention', emphasis: 'primary' },
  facets: [
    { id: 'state', label: 'State', count: 4 },
    { id: 'domain', label: 'Technical domain', count: 3 },
    { id: 'has-applications', label: 'Has applications', count: 1 },
  ],
  rows: [
    {
      id: 'INV-7F3A',
      status: { lifecycle: 'assessed', attention: 'action-needed' },
      technicalDomain: 'Signal processing (demo)',
      recordedDate: '2026-07-12',
      nextAction: { verb: 'Decide', label: 'Decide: file or not', emphasis: 'primary' },
    },
    {
      id: 'INV-2B9C',
      status: { lifecycle: 'assessing', attention: 'on-track' },
      technicalDomain: 'Materials (demo)',
      recordedDate: '2026-08-01',
      nextAction: { verb: 'Review', label: 'Nothing needed — being assessed', emphasis: 'secondary', nothingNeeded: true },
    },
    {
      id: 'INV-51D0',
      status: { lifecycle: 'drafting', attention: 'action-needed' },
      technicalDomain: 'Software (demo)',
      recordedDate: '2026-08-20',
      nextAction: { verb: 'Record', label: 'Continue recording', emphasis: 'primary' },
    },
    {
      id: 'INV-0A44',
      status: { lifecycle: 'not-pursued', attention: 'on-track' },
      technicalDomain: 'Mechanical (demo)',
      recordedDate: '2026-05-30',
      nextAction: { verb: 'Review', label: 'Nothing needed', emphasis: 'secondary', nothingNeeded: true },
    },
  ],
};

/* ── SC-C03 · Disclosure capture ───────────────────────────────────────────*/
const disclosureCapture: DisclosureCaptureVM = {
  inventionId: 'INV-51D0',
  currentStepId: 'invention',
  steps: [
    { id: 'problem', label: 'The problem', complete: true },
    { id: 'prior-approaches', label: 'Prior approaches', complete: true },
    { id: 'invention', label: 'The invention', complete: false },
    { id: 'how-it-works', label: 'How it works', complete: false },
    { id: 'variants', label: 'Variants', complete: false },
    { id: 'advantages', label: 'Advantages', complete: false },
    { id: 'prior-disclosure', label: 'Prior disclosure', complete: false, mandatoryNonSkippable: true },
  ],
  completeness: {
    tier: 'tier-1-structure-only',
    disclaimer: 'This check looks at structure and prompts you for missing detail only. It never assesses patentability.',
    prompts: [
      'The "how it works" step has no detail yet.',
      'The prior-disclosure step is required and cannot be skipped.',
    ],
  },
  lock: {
    heldByOther: false,
    idleTimeout: { status: 'pending-slot', slotId: 'S-8 edit-session idle timeout', source: 'config' },
  },
  autosaveNote: 'Every save records a new, timestamped version. Your work is saved as you go.',
};
const disclosureCaptureLocked: DisclosureCaptureVM = {
  ...disclosureCapture,
  lock: {
    heldByOther: true,
    heldByName: 'A. Colleague (demo)',
    since: '2026-09-03T10:15:00+05:30',
    idleTimeout: { status: 'pending-slot', slotId: 'S-8 edit-session idle timeout', source: 'config' },
  },
};

/* ── SC-C04 · Invention detail ─────────────────────────────────────────────*/
function inventionDetail(opts: { notPursued?: boolean } = {}): InventionDetailVM {
  const lifecycle = opts.notPursued ? 'not-pursued' : 'assessed';
  return {
    activeTabDefault: 'overview',
    header: {
      id: 'INV-7F3A',
      title: 'Invention INV-7F3A',
      identity: [
        { label: 'Reference', value: 'INV-7F3A', mono: true },
        { label: 'Technical domain', value: 'Signal processing (demo)' },
        { label: 'Recorded', value: '2026-07-12' },
        { label: 'Inventors', value: '2 named (demo)' },
      ],
      status: { lifecycle, attention: opts.notPursued ? 'on-track' : 'action-needed' },
      nextAction: opts.notPursued
        ? { verb: 'Review', label: 'Nothing needed', emphasis: 'secondary', nothingNeeded: true }
        : { verb: 'Decide', label: 'Decide: file or not', emphasis: 'primary' },
      whoseTurn: opts.notPursued ? { actor: 'nothing-needed' } : { actor: 'needs-you' },
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'disclosure', label: 'Disclosure' },
        { id: 'assessments', label: 'Assessments' },
        { id: 'applications', label: 'Applications' },
        { id: 'decisions', label: 'Decisions' },
        { id: 'documents', label: 'Documents' },
      ],
      relationshipRail: [
        { kind: 'assessment', id: 'asmt_DEMO_0001', label: 'Assessment (released)' },
        { kind: 'document', id: 'doc_disc_v3', label: 'Disclosure v3' },
      ],
    },
    tabs: [
      {
        id: 'overview', label: 'Overview',
        content: {
          kind: 'summary',
          summary: 'A plain-language summary of the invention, its problem and the disclosed approach (demo).',
          protectionByJurisdiction: [
            { label: 'India', value: 'Not yet filed' },
            { label: 'PCT', value: 'Not yet filed' },
          ],
        },
      },
      { id: 'disclosure', label: 'Disclosure', content: { kind: 'related', items: [{ kind: 'document', id: 'doc_disc_v3', label: 'Disclosure v3 (current)' }] } },
      { id: 'assessments', label: 'Assessments', content: { kind: 'related', items: [{ kind: 'assessment', id: 'asmt_DEMO_0001', label: 'Assessment — released' }] } },
      {
        id: 'applications', label: 'Applications',
        content: { kind: 'empty', teaches: 'Filed applications for this invention will appear here.', action: { verb: 'File', label: 'File an application', emphasis: 'secondary' } },
      },
      {
        id: 'decisions', label: 'Decisions',
        content: opts.notPursued
          ? { kind: 'related', items: [{ kind: 'invention', id: 'dec_not_file', label: 'Decision: not to file (with alternatives)' }] }
          : { kind: 'empty', teaches: 'Decisions you record about this invention will appear here.', action: { verb: 'Decide', label: 'Record a decision', emphasis: 'secondary' } },
      },
      {
        id: 'documents', label: 'Documents',
        content: { kind: 'empty', teaches: 'Documents attached to this invention will appear here.', action: { verb: 'Record', label: 'Add a document', emphasis: 'secondary' } },
      },
    ],
    notPursued: opts.notPursued
      ? { note: 'This invention was not pursued. It remains in your Vault, and the decision can be revisited.', alternativesTaken: ['Deferred and may be re-assessed later.'] }
      : undefined,
  };
}

/* ── SC-C05 · Disclosure versions ──────────────────────────────────────────*/
const disclosureVersions: DisclosureVersionsVM = {
  inventionId: 'INV-7F3A',
  current: { version: 'v3', savedAt: '2026-08-30T14:02:00+05:30', immutable: true, referencedBy: 'Assessed by the released assessment', isCurrent: true },
  history: [
    { version: 'v3', savedAt: '2026-08-30T14:02:00+05:30', immutable: true, referencedBy: 'Assessed by the released assessment', isCurrent: true },
    { version: 'v2', savedAt: '2026-08-10T09:41:00+05:30', immutable: false, isCurrent: false },
    { version: 'v1', savedAt: '2026-07-12T17:20:00+05:30', immutable: false, isCurrent: false },
  ],
};

/* ── SC-C06 · Request assessment ───────────────────────────────────────────*/
const assessmentRequest: AssessmentRequestVM = {
  inventionId: 'INV-7F3A',
  jurisdictions: [
    { id: 'india', label: 'India' },
    { id: 'pct', label: 'PCT' },
  ],
  trustCopy: 'This assessment is free — there is no payment and no engagement.',
  turnaround: { status: 'pending-slot', slotId: 'S-1 committed review turnaround', source: 'config' },
  reviewNote: 'We run an automated analysis, then a Verified Agent reviews it. You will be notified when the assessment is ready — there is no need to wait here.',
  disclosureComplete: true,
  primaryAction: { verb: 'Assess', label: 'Request assessment', emphasis: 'primary' },
};
const assessmentRequestBlocked: AssessmentRequestVM = {
  ...assessmentRequest,
  disclosureComplete: false,
};

/* ── SC-C07 · Assessments list ─────────────────────────────────────────────*/
const assessmentsList: AssessmentsListVM = {
  inventionId: 'INV-7F3A',
  rows: [
    {
      id: 'asmt_DEMO_0001',
      status: { lifecycle: 'released', attention: 'action-needed' },
      requestedDate: '2026-08-30',
      assessedVersion: 'v3',
      reviewerName: 'A. Reviewer, Verified Agent (demo)',
      verdictLabel: 'protectable-with-changes', // present ONLY because released (CR-2)
    },
    {
      id: 'asmt_DEMO_0000',
      status: { lifecycle: 'in-review', attention: 'on-track' },
      requestedDate: '2026-08-12',
      assessedVersion: 'v2',
      reviewerName: 'A. Reviewer, Verified Agent (demo)',
      // no verdictLabel — not released yet (CR-2)
    },
  ],
};

/* ── SC-C09 · Record decision (DR-01-agnostic) ─────────────────────────────*/
const decision: DecisionVM = {
  inventionId: 'INV-7F3A',
  alternatives: {
    designAround: 'Design around the blocking reference.',
    tradeSecret: 'Keep the invention as a trade secret.',
    defensivePublication: 'Publish defensively to prevent others patenting it.',
    deferAndReassess: 'Defer and re-assess as the invention develops.',
  },
  trustCopy: 'Recording a decision costs nothing: no money, and no engagement.',
  rationaleLabel: 'Reason for this decision',
  capability: { mayRecordNotFileDecision: { status: 'pending-slot', slotId: 'DR-01', source: 'owner-decision' } },
  engagePayOwnerOnly: true,
  requiresHumanActor: true,
};

/* ── Scenario registries (one Loaded map per screen) ───────────────────────*/
export type VaultAvailability = 'loading' | 'empty' | 'error' | 'permission-denied' | 'not-found';

const emptyInventions: Loaded<InventionsIndexVM> = {
  state: 'empty',
  empty: {
    teaches: 'An Invention is your private record of an idea. Recording it early establishes your conception evidence.',
    action: { verb: 'Record', label: 'Record an invention', emphasis: 'primary' },
  },
};

export const workspaceSetupScenarios = {
  create: { state: 'ready', data: workspaceCreate } as Loaded<WorkspaceSetupVM>,
  'accept-invitation': { state: 'ready', data: workspaceAccept } as Loaded<WorkspaceSetupVM>,
  loading: { state: 'loading' } as Loaded<WorkspaceSetupVM>,
  error: { state: 'error', error: { reason: 'This invitation has expired or is invalid.', nextStep: 'Ask the person who invited you to send a fresh invitation.' } } as Loaded<WorkspaceSetupVM>,
};

export const inventionsIndexScenarios = {
  ready: { state: 'ready', data: inventionsIndex } as Loaded<InventionsIndexVM>,
  empty: emptyInventions,
  loading: { state: 'loading' } as Loaded<InventionsIndexVM>,
  error: { state: 'error', error: { reason: 'Your inventions could not be loaded.', nextStep: 'Nothing was lost — retry, or come back shortly. Your filters are preserved.' } } as Loaded<InventionsIndexVM>,
};

export const disclosureCaptureScenarios = {
  ready: { state: 'ready', data: disclosureCapture } as Loaded<DisclosureCaptureVM>,
  'locked-by-other': { state: 'ready', data: disclosureCaptureLocked } as Loaded<DisclosureCaptureVM>,
  loading: { state: 'loading' } as Loaded<DisclosureCaptureVM>,
  'not-found': { state: 'not-found' } as Loaded<DisclosureCaptureVM>,
};

export const inventionDetailScenarios = {
  ready: { state: 'ready', data: inventionDetail() } as Loaded<InventionDetailVM>,
  'not-pursued': { state: 'ready', data: inventionDetail({ notPursued: true }) } as Loaded<InventionDetailVM>,
  loading: { state: 'loading' } as Loaded<InventionDetailVM>,
  'permission-denied': { state: 'permission-denied', denied: { reason: 'Your role can view this workspace but not this invention.', whoCanAct: 'Ask the Workspace Owner.' } } as Loaded<InventionDetailVM>,
  'not-found': { state: 'not-found' } as Loaded<InventionDetailVM>,
};

export const disclosureVersionsScenarios = {
  ready: { state: 'ready', data: disclosureVersions } as Loaded<DisclosureVersionsVM>,
  empty: { state: 'empty', empty: { teaches: 'Versions appear here each time you save the disclosure.', action: { verb: 'Record', label: 'Start the disclosure', emphasis: 'primary' } } } as Loaded<DisclosureVersionsVM>,
  loading: { state: 'loading' } as Loaded<DisclosureVersionsVM>,
  'not-found': { state: 'not-found' } as Loaded<DisclosureVersionsVM>,
};

export const assessmentRequestScenarios = {
  ready: { state: 'ready', data: assessmentRequest } as Loaded<AssessmentRequestVM>,
  'blocked-incomplete': { state: 'ready', data: assessmentRequestBlocked } as Loaded<AssessmentRequestVM>,
  loading: { state: 'loading' } as Loaded<AssessmentRequestVM>,
  'not-found': { state: 'not-found' } as Loaded<AssessmentRequestVM>,
};

export const assessmentsListScenarios = {
  ready: { state: 'ready', data: assessmentsList } as Loaded<AssessmentsListVM>,
  empty: { state: 'empty', empty: { teaches: 'Assessments for this invention appear here once you request one.', action: { verb: 'Assess', label: 'Request assessment', emphasis: 'primary' } } } as Loaded<AssessmentsListVM>,
  loading: { state: 'loading' } as Loaded<AssessmentsListVM>,
  'not-found': { state: 'not-found' } as Loaded<AssessmentsListVM>,
};

export const decisionScenarios = {
  ready: { state: 'ready', data: decision } as Loaded<DecisionVM>,
  loading: { state: 'loading' } as Loaded<DecisionVM>,
  'permission-denied': { state: 'permission-denied', denied: { reason: 'Filing and engagement are limited to the Workspace Owner.', whoCanAct: 'Ask the Workspace Owner to act, or record a not-file decision.' } } as Loaded<DecisionVM>,
  'not-found': { state: 'not-found' } as Loaded<DecisionVM>,
};
