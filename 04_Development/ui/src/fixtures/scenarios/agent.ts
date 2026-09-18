/**
 * ALDASSIST Phase 8 — fixtures: Agent surface scenarios (B6). Synthetic/demo data only.
 *
 * NO INVENTED VALUES (CR-19): review turnaround, agent-stat confidence, L1 settlement presentation and
 * per-class channel default are `pending-slot`/legal containers; fees are PriceDisplay containers with
 * pending amounts. Two-axis on every Today item (CR-4). The review workspace is PRE-release (CR-2): it
 * carries the AI analysis + a provenance-verified and a fail-safe unverified assertion (CR-6), and the
 * Release affordance is the gate. Agent outcome stats show BOTH an n≥20 published scenario and a
 * below-floor "not enough data yet" scenario (CR-21/D-2026-019). Import performs NO de-duplication (DR-02).
 */
import type {
  Loaded, AgentOnboardingVM, AgentTodayVM, AgentDocketVM, AgentMattersIndexVM, MatterImportVM,
  AgentMatterDetailVM, ReviewsQueueVM, ReviewWorkspaceVM, OpportunitiesVM, PracticeVM,
  AgentSettingsVM, AgentNotificationsVM, PriceDisplayVM, NotificationsVM,
} from '../../contract';
import { notificationsScenarios } from './home';

function openPrice(): PriceDisplayVM {
  return {
    renderingMode: { status: 'pending-slot', slotId: 'O-2026-001 pricing rendering mode', source: 'owner-decision' },
    lines: [
      { kind: 'platform-fee', label: 'Platform fee', amount: { status: 'pending-slot', slotId: 'L1 platform fee', source: 'legal' }, disclosure: { slotId: 'L1', status: 'pending-legal' } },
      { kind: 'professional-fee', label: 'Professional fee', amount: { status: 'pending-slot', slotId: 'L1-04 professional fee', source: 'legal' }, disclosure: { slotId: 'L1-04', status: 'pending-legal' } },
      { kind: 'official-fee', label: 'Official fee', amount: { status: 'pending-slot', slotId: 'official fee (Rules Engine)', source: 'rules-engine' }, disclosure: { slotId: 'L1', status: 'pending-legal' } },
    ],
    bundledTotal: { status: 'pending-slot', slotId: 'L1 bundled total', source: 'legal' },
    disclosure: { slotId: 'L1', status: 'pending-legal' },
  };
}

/* ── SC-A00 · Onboarding & verification ─────────────────────────────────────*/
const onboardingPending: AgentOnboardingVM = {
  valueProp: 'Your docket first, matters second — bring your practice in and get instant deadline safety.',
  credentialFields: [
    { id: 'reg', label: 'Registration number', note: 'Your patent-agent registration number.' },
    { id: 'qual', label: 'Qualification', note: 'Qualification / bar details.' },
    { id: 'id', label: 'Identity', note: 'Identity verification.' },
  ],
  declarations: {
    domains: 'Declare your technical domains — these route your review-queue items.',
    conflicts: 'Declare conflicts up front.',
    capacity: 'Set your review/matter capacity.',
  },
  optIns: { reviewQueue: 'Opt into the review queue.', opportunities: 'Opt into filing opportunities.' },
  verification: { status: 'pending', note: 'Submitted — a register check and manual review are in progress.' },
  submit: { label: 'Submit for verification', emphasis: 'primary' },
  pendingLimitationsNote: 'While pending, this is a limited account: no reviews, no matching, and no access to client material.',
};
const onboardingFailed: AgentOnboardingVM = {
  ...onboardingPending,
  verification: { status: 'failed', note: 'Verification could not be completed.', remediation: 'The registration number could not be matched. Re-check the number and resubmit; no client access is granted in the interim.' },
};

/* ── SC-A01 · Today ─────────────────────────────────────────────────────────*/
const today: AgentTodayVM = {
  items: [
    { object: { kind: 'deadline', id: 'dl_a_1', label: 'FER response · 2026/DEL/000777' }, what: 'Confirm a critical deadline', why: 'A first examination report response is approaching', byWhen: '2026-10-02', rhythm: 'docket', status: { lifecycle: 'Approaching', attention: 'at-risk' }, whoseTurn: { actor: 'needs-you' }, action: { label: 'Open the deadline', emphasis: 'primary' } },
    { object: { kind: 'assessment', id: 'rev_9001', label: 'Review · electronics domain' }, what: 'A review is waiting in your domain', why: 'A domain-matched assessment is queued', rhythm: 'review', status: { lifecycle: 'In review', attention: 'action-needed' }, whoseTurn: { actor: 'needs-you' }, action: { label: 'Take the review', emphasis: 'primary' } },
    { object: { kind: 'matter', id: 'mat_a_5', label: 'Matter M-2026-0042' }, what: 'Client approved filing', why: 'Ready to file with the office', rhythm: 'matter', status: { lifecycle: 'In progress', attention: 'action-needed' }, whoseTurn: { actor: 'awaiting-you' }, action: { label: 'Open the matter', emphasis: 'secondary' } },
  ],
};
const todayStale: AgentTodayVM = { ...today, staleness: { source: 'IN Patent Office register (demo)', retrievedAt: '2026-09-14T08:00:00+05:30', stale: true } };

/* ── SC-A02 · Docket + deadline detail ──────────────────────────────────────*/
const docket: AgentDocketVM = {
  view: 'list',
  facets: [{ id: 'state', label: 'State', count: 3 }, { id: 'source', label: 'Source', count: 2 }],
  rows: [
    { id: 'dl_a_1', title: 'FER response', matterRef: '2026/DEL/000777', source: 'IN Patent Office register (demo)', date: '2026-10-02', state: 'approaching', criticality: { label: 'Rights-affecting', elevated: true }, attention: 'at-risk', confirm: { label: 'Confirm deadline', emphasis: 'primary' } },
    { id: 'dl_a_2', title: 'National-phase entry', matterRef: 'PCT/IB2026/050999', source: 'Computed (Deadline Engine, demo)', date: '2026-12-20', state: 'upcoming', criticality: { label: 'Standard', elevated: false }, attention: 'on-track' },
  ],
  selectedDetail: {
    id: 'dl_a_1', title: 'FER response', matterRef: '2026/DEL/000777', date: '2026-10-02', state: 'approaching',
    criticality: { label: 'Rights-affecting', elevated: true },
    why: { trigger: 'First Examination Report issued', window: 'Statutory response window' },
    trace: { status: 'available', detail: { ruleId: 'IN-FER-RESP', ruleVersion: 'v3 (demo)', statutoryCitation: 'Governing Rule (demo)', calendarAdjustment: 'Next working day if it falls on a holiday', extensions: 'Extension provisions apply per the governing Rule' } },
    confirm: { label: 'Confirm this critical deadline', emphasis: 'primary' },
    confirmationNote: 'Critical deadlines require human confirmation by the accountable agent (BR-03).',
  },
};

/* ── SC-A03 · Matters index ─────────────────────────────────────────────────*/
const matters: AgentMattersIndexVM = {
  importAction: { label: 'Import matters', emphasis: 'primary' },
  facets: [{ id: 'source', label: 'Source', count: 2 }, { id: 'state', label: 'State', count: 3 }],
  rows: [
    { id: 'mat_a_5', ref: 'M-2026-0042', source: 'platform', status: { lifecycle: 'in-progress', attention: 'action-needed' }, invention: 'INV-7F3A', client: 'Client (in scope)', whoseTurn: { actor: 'awaiting-you' }, nextDeadline: { label: 'File with office', date: '2026-09-30', state: 'due' } },
    { id: 'mat_a_6', ref: 'OWN-1180', source: 'own', status: { lifecycle: 'awaiting-the-office', attention: 'on-track' }, invention: '2026/DEL/000777', client: 'Own-practice client', whoseTurn: { actor: 'awaiting-the-office' }, nextDeadline: { label: 'FER response', date: '2026-10-02', state: 'approaching' } },
  ],
};

/* ── SC-A04 · Matter import (DR-02 agnostic) ────────────────────────────────*/
const matterImport: MatterImportVM = {
  inputsNote: 'Provide your matter references and key dates; the Deadline Engine computes the docket from versioned rules.',
  preview: [
    { ref: 'OWN-1201', completeness: { complete: true, missing: [] }, computedDeadlines: [{ label: 'FER response', date: '2026-11-15', state: 'upcoming' }] },
    { ref: 'OWN-1202', completeness: { complete: false, missing: ['Filing date', 'Application number'] }, computedDeadlines: [] },
  ],
  importAction: { label: 'Import matters', emphasis: 'primary' },
  dedupNote: 'Duplicate handling for imported matters is not configured yet; import adds matters as provided and performs no automatic de-duplication.',
  ownTenancyNote: 'Import brings in your own-practice matters — not platform-assigned matters.',
};

/* ── SC-A05 · Agent matter detail ───────────────────────────────────────────*/
const matterDetail: AgentMatterDetailVM = {
  id: 'mat_a_5', ref: 'M-2026-0042',
  status: { lifecycle: 'in-progress', attention: 'action-needed' },
  where: 'Engaged — preparing to file', whatsNext: 'File the application with the office once the client approves',
  whoseTurn: { actor: 'awaiting-you' },
  tabs: [
    { id: 'brief', label: 'Brief' }, { id: 'deadlines', label: 'Deadlines' }, { id: 'documents', label: 'Documents' },
    { id: 'client', label: 'Client' }, { id: 'billing', label: 'Billing' },
  ],
  brief: {
    disclosure: { version: 'v3', savedAt: '2026-08-30T14:02:00+05:30', immutable: true, referencedBy: 'Released assessment / matter', isCurrent: true },
    releasedAssessment: { verdictLabel: 'Looks protectable', reviewer: 'A. Reviewer (Verified Agent)', releasedAt: '2026-09-03T11:00:00+05:30', provenanceNote: 'The released assessment travels with the invention into this matter, with its provenance intact.' },
    clientContext: 'Client context within the engaged scope.',
  },
  deadlines: [{ label: 'File with office', date: '2026-09-30', state: 'due' }],
  documents: [
    { label: 'Prepared application (uploaded)', author: { by: 'reviewer', reviewerName: 'You (agent)', releasedAt: '2026-09-20T10:00:00+05:30' }, date: '2026-09-20', immutable: false },
    { label: 'Assessment report', author: { by: 'ai', label: 'AI-generated' }, date: '2026-09-03', immutable: true },
  ],
  clientThreadNote: 'Messaging is confined to this matter. There is no channel outside the active matter.',
  billing: openPrice(),
  fileAction: { label: 'File with the office', emphasis: 'primary' },
  uploadNote: 'You prepare the application off-platform and upload it here. ALDASSIST has no drafting or prosecution workspace, and never files autonomously.',
  relationshipRail: [
    { kind: 'invention', id: 'inv_7f3a', label: 'Invention INV-7F3A' },
    { kind: 'assessment', id: 'asmt_1', label: 'Released assessment' },
  ],
};

/* ── SC-A06 · Reviews queue ─────────────────────────────────────────────────*/
const reviews: ReviewsQueueVM = {
  queueDepthNote: 'Queue depth and wait are shown honestly; conflicted items never appear.',
  items: [
    { id: 'rev_9001', domain: 'Electronics / signal processing', summary: 'Assessment awaiting review in your domain', age: 'Queued 6 hours ago', expectedTurnaround: { status: 'pending-slot', slotId: 'S-1 committed review turnaround', source: 'config' }, take: { label: 'Take this item', emphasis: 'primary' } },
    { id: 'rev_9002', domain: 'Electronics / signal processing', summary: 'Assessment awaiting review in your domain', age: 'Queued 2 hours ago', expectedTurnaround: { status: 'pending-slot', slotId: 'S-1 committed review turnaround', source: 'config' }, take: { label: 'Take this item', emphasis: 'secondary' } },
  ],
};

/* ── SC-A07 · Review workspace (PRE-release; CR-2 gate) ──────────────────────*/
const reviewWorkspace: ReviewWorkspaceVM = {
  id: 'rev_9001',
  grantNote: 'You hold a review grant for exactly one Disclosure version and its analysis. Everything else in the workspace is invisible, and the grant expires on release or reassignment.',
  boundaryNote: 'Any attempt to reach material outside this grant is denied and audited. There is no channel to the client.',
  source: {
    grantedDisclosure: { version: 'v3', savedAt: '2026-08-30T14:02:00+05:30', immutable: true, referencedBy: 'Under review', isCurrent: true },
    authorship: { by: 'ai', label: 'AI-generated' },
    aiAnalysis: {
      elements: [
        { element: 'Claimed signal-conditioning stage', finding: 'Compared against the closest cited art', references: [{ label: 'REF-α', why: 'Discloses a comparable conditioning stage', citation: { accessibleName: 'Cited passage in REF-α (synthetic), ¶17', passage: { documentId: 'REF-ALPHA', locator: '¶17' }, source: 'ai-derived' } }] },
      ],
      statutoryExclusion: [{ provision: 'India s.3(k)', analysis: 'Considered; the claim is not merely an algorithm per se on the current reading (demo analysis).' }],
    },
    evidence: {
      assertions: [
        { kind: 'verified', text: 'The closest cited art discloses a comparable conditioning stage.', citation: { accessibleName: 'Cited passage in REF-α (synthetic), ¶17', passage: { documentId: 'REF-ALPHA', locator: '¶17' }, source: 'ai-derived' } },
        { kind: 'unverified', text: 'A second reference may bear on the feedback loop, but its passage could not be resolved.', note: 'citation-unresolved' },
      ],
      referenceList: [{ id: 'REF-ALPHA', label: 'REF-α — synthetic prior-art record' }],
      coverageStatement: 'Searched the electronics/signal-processing classes noted; databases and date range per the coverage note.',
      blindSpotNotice: 'Applications filed within the last ~18 months may not yet be published and cannot be searched.',
    },
  },
  work: {
    assertions: [
      { kind: 'verified', text: 'The closest cited art discloses a comparable conditioning stage.', citation: { accessibleName: 'Cited passage in REF-α (synthetic), ¶17', passage: { documentId: 'REF-ALPHA', locator: '¶17' }, source: 'ai-derived' } },
      { kind: 'unverified', text: 'Second reference on the feedback loop — citation unresolved; not shown as verified.', note: 'citation-unresolved' },
    ],
    confidence: { basisText: 'Based on the cited art and the coverage above.', scale: { status: 'pending-slot', slotId: 'S-2 confidence representation', source: 'measurement' } },
    decisionOptions: [
      { type: 'release', label: 'Release to client', note: 'Records your ReviewDecision and releases the verdict to the client under your name.' },
      { type: 'inconclusive', label: 'Mark inconclusive', note: 'State what is missing; the client updates the Disclosure and requests a new assessment.' },
      { type: 'return', label: 'Decline / return to queue', note: 'Return the item; the grant is released and the client still sees "In review".' },
    ],
    releaseAffordance: 'On release, your name is recorded as the reviewer of this verdict.',
    editsNote: 'Your edits are captured as diffs for quality metrics (materiality per the fixed definition).',
  },
};

/* ── SC-A08 · Opportunities ─────────────────────────────────────────────────*/
const opportunities: OpportunitiesVM = {
  matchingNote: 'These are Agent Matching / Engagement opportunities in your domains. Accepting one starts the client-side engagement.',
  items: [
    { id: 'opp_1', scope: 'File a patent application (India) for a disclosed invention.', fee: openPrice(), conflictStatus: 'Conflict-clear', clientContext: 'Client context within the permitted scope.', accept: { label: 'Accept', emphasis: 'primary' }, decline: { label: 'Decline', emphasis: 'secondary' } },
  ],
};

/* ── SC-A09–A12 · Practice ──────────────────────────────────────────────────*/
const practice: PracticeVM = {
  profile: {
    credentials: 'Registered patent agent (demo).', background: 'Practice background (demo).',
    specializations: ['Electronics', 'Signal processing'], languages: ['English', 'Hindi'],
    publicProfileNote: 'Your public profile is rendered separately (governed by legal review) — this is the private editor.',
    editAction: { label: 'Edit profile', emphasis: 'secondary' },
  },
  outcomes: {
    stats: { status: 'published', n: 24, confidence: { status: 'pending-slot', slotId: 'S-3 agent-stat confidence representation', source: 'measurement' } },
    sampleSizeNote: 'Any client-visible statistic shows its sample size (n).',
    publicationGate: { slotId: 'L3 advertising-rules review', status: 'pending-legal' },
    agentVisibilityNote: 'You see your own outcomes with n before they are ever shown to clients.',
  },
  capacity: {
    availabilityNote: 'Set your availability for reviews and matters.', specializations: ['Electronics', 'Signal processing'],
    limits: 'Set your concurrent-work limits.', conflicts: 'Manage your conflict list — this feeds conflict checks.',
    saveAction: { label: 'Save capacity', emphasis: 'primary' },
  },
  earnings: {
    settlement: openPrice(),
    settlementPresentation: { slotId: 'L1 settlement presentation', status: 'pending-legal' },
    note: 'Earnings and settlement are shown through the standard price display; amounts follow legal review.',
  },
};
// A below-floor outcomes scenario (n < 20 → "not enough data yet"), for the stat-floor gate.
const practiceBelowFloor: PracticeVM = {
  ...practice,
  outcomes: { ...practice.outcomes, stats: { status: 'below-floor', note: 'Not enough data yet — outcome statistics appear once there are at least 20 completed matters.' } },
};

/* ── SC-A13 · Agent settings ────────────────────────────────────────────────*/
const agentSettings: AgentSettingsVM = {
  accountNote: 'Your agent account details.',
  security: { mfaNote: 'Multi-factor authentication is required for all agents.', sessionsNote: 'Active sessions and sign-out.' },
  notifications: { criticalNote: 'Critical notifications cannot be muted. They always reach you.', channelDefault: { status: 'pending-slot', slotId: 'S-7 per-class default channel', source: 'config' } },
  org: { conflictListNote: 'Manage the organisation conflict list.', membersNote: 'The Org Admin manages agents, capacity, conflicts and billing.' },
};

/* ── SC-A14 · Notifications + context switcher ──────────────────────────────*/
// Reuse the client notification groups, minus proactive-reassurance (agent classes: Critical→Action→
// Progress→Informational per WP-2 §SC-A14). One context at a time (CR-5).
const clientNotifs = (notificationsScenarios.ready as Extract<Loaded<NotificationsVM>, { state: 'ready' }>).data;
const agentNotifications: AgentNotificationsVM = {
  groups: clientNotifs.groups.filter((g) => g.class !== 'proactive-reassurance'),
  contexts: [
    { id: 'agent', label: 'Agent', current: true },
    { id: 'client', label: 'My inventions (client)', current: false },
  ],
};
const agentNotificationsSingle: AgentNotificationsVM = { ...agentNotifications, contexts: [] }; // single-role → no switcher

/* ── Scenario registries ────────────────────────────────────────────────────*/
export const agentOnboardingScenarios = {
  pending: { state: 'ready', data: onboardingPending } as Loaded<AgentOnboardingVM>,
  failed: { state: 'ready', data: onboardingFailed } as Loaded<AgentOnboardingVM>,
  loading: { state: 'loading' } as Loaded<AgentOnboardingVM>,
};
export const agentTodayScenarios = {
  ready: { state: 'ready', data: today } as Loaded<AgentTodayVM>,
  stale: { state: 'ready', data: todayStale } as Loaded<AgentTodayVM>,
  empty: { state: 'empty', empty: { teaches: 'Bring your practice in and your docket lights up. Start by importing your matters.', action: { verb: 'Import', label: 'Import your matters', emphasis: 'primary' } } } as Loaded<AgentTodayVM>,
  loading: { state: 'loading' } as Loaded<AgentTodayVM>,
};
export const agentDocketScenarios = {
  ready: { state: 'ready', data: docket } as Loaded<AgentDocketVM>,
  empty: { state: 'empty', empty: { teaches: 'Your docket is empty. Import your matters to compute their deadlines.', action: { verb: 'Import', label: 'Import matters', emphasis: 'primary' } } } as Loaded<AgentDocketVM>,
  loading: { state: 'loading' } as Loaded<AgentDocketVM>,
};
export const agentMattersScenarios = {
  ready: { state: 'ready', data: matters } as Loaded<AgentMattersIndexVM>,
  empty: { state: 'empty', empty: { teaches: 'No matters yet. Importing your practice matters is the fastest way to get value.', action: { verb: 'Import', label: 'Import matters', emphasis: 'primary' } } } as Loaded<AgentMattersIndexVM>,
  loading: { state: 'loading' } as Loaded<AgentMattersIndexVM>,
};
export const matterImportScenarios = {
  ready: { state: 'ready', data: matterImport } as Loaded<MatterImportVM>,
  loading: { state: 'loading' } as Loaded<MatterImportVM>,
};
export const agentMatterDetailScenarios = {
  ready: { state: 'ready', data: matterDetail } as Loaded<AgentMatterDetailVM>,
  'not-found': { state: 'not-found' } as Loaded<AgentMatterDetailVM>, // cross-tenant / not-assigned (CR-5)
  loading: { state: 'loading' } as Loaded<AgentMatterDetailVM>,
};
export const reviewsQueueScenarios = {
  ready: { state: 'ready', data: reviews } as Loaded<ReviewsQueueVM>,
  empty: { state: 'empty', empty: { teaches: 'No items in your domains right now.', action: { verb: 'Review', label: 'Refresh the queue', emphasis: 'secondary', nothingNeeded: true } } } as Loaded<ReviewsQueueVM>,
  loading: { state: 'loading' } as Loaded<ReviewsQueueVM>,
};
export const reviewWorkspaceScenarios = {
  ready: { state: 'ready', data: reviewWorkspace } as Loaded<ReviewWorkspaceVM>,
  'not-found': { state: 'not-found' } as Loaded<ReviewWorkspaceVM>, // outside the review grant (CR-5/IP-16)
  loading: { state: 'loading' } as Loaded<ReviewWorkspaceVM>,
};
export const opportunitiesScenarios = {
  ready: { state: 'ready', data: opportunities } as Loaded<OpportunitiesVM>,
  empty: { state: 'empty', empty: { teaches: 'No opportunities in your domains right now. We’ll notify you when one appears.', action: { verb: 'Review', label: 'Manage notifications', emphasis: 'secondary', nothingNeeded: true } } } as Loaded<OpportunitiesVM>,
  loading: { state: 'loading' } as Loaded<OpportunitiesVM>,
};
export const practiceScenarios = {
  ready: { state: 'ready', data: practice } as Loaded<PracticeVM>,
  'below-floor': { state: 'ready', data: practiceBelowFloor } as Loaded<PracticeVM>,
  loading: { state: 'loading' } as Loaded<PracticeVM>,
};
export const agentSettingsScenarios = {
  ready: { state: 'ready', data: agentSettings } as Loaded<AgentSettingsVM>,
  loading: { state: 'loading' } as Loaded<AgentSettingsVM>,
};
export const agentNotificationsScenarios = {
  ready: { state: 'ready', data: agentNotifications } as Loaded<AgentNotificationsVM>,
  'single-role': { state: 'ready', data: agentNotificationsSingle } as Loaded<AgentNotificationsVM>,
  loading: { state: 'loading' } as Loaded<AgentNotificationsVM>,
};
