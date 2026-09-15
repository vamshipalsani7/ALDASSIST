/**
 * ALDASSIST Phase 8 — fixtures: Home / Documents / Settings / Notifications scenarios (B5).
 *
 * NO INVENTED VALUES (CR-19): "expected when" (waiting items), the notification channel default, the client
 * MFA policy, and data residency are all `pending-slot` containers; spend/billing are PriceDisplay
 * containers with pending amounts. Two-axis on every home item (CR-4). Documents distinguish AI vs human
 * authorship (IP-07) and mark immutable versions (BR-20). Notifications are grouped by class in the fixed
 * order; Critical is unmutable. Identifiers/synthetic demo data only.
 */
import type {
  Loaded, HomeVM, DocumentsIndexVM, SettingsVM, NotificationsVM, PriceDisplayVM, FreshnessStamp, LockInfo,
} from '../../contract';

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
const fresh = (source: string, stale = false): FreshnessStamp => ({ source, retrievedAt: '2026-09-14T08:00:00+05:30', stale });

/* ── SC-C01 · Home / action queue ───────────────────────────────────────────*/
const home: HomeVM = {
  // Deliberately listed action-needed BEFORE at-risk so the screen's proximity→criticality sort is
  // exercised (it must surface the at-risk / dated FER item first).
  needsYou: [
    { object: { kind: 'assessment', id: 'asmt_DEMO_0001', label: 'Assessment for INV-7F3A' }, what: 'A verdict is ready to review', why: 'Your assessment was released', action: { verb: 'Decide', label: 'Decide: file or not', emphasis: 'primary' }, status: { lifecycle: 'Released', attention: 'action-needed' } },
    { object: { kind: 'application', id: 'app_11A2', label: 'Application 2026/DEL/000123' }, what: 'Review the examination report', why: 'A first examination report was issued', byWhen: '2026-10-15', action: { verb: 'Respond', label: 'Review the report', emphasis: 'primary' }, status: { lifecycle: 'Responding', attention: 'at-risk' } },
  ],
  waitingOnOthers: [
    { object: { kind: 'assessment', id: 'asmt_DEMO_0000', label: 'Assessment (in review)' }, who: 'the reviewer', what: 'A Verified Agent is reviewing your assessment', whoseTurn: { actor: 'with-the-reviewer', estimate: { status: 'pending-slot', slotId: 'S-1 review turnaround', source: 'config' } }, status: { lifecycle: 'In review', attention: 'on-track' } },
    { object: { kind: 'application', id: 'app_4C7D', label: 'Application PCT/IB2026/050456' }, who: 'the office', what: 'Awaiting examination by the office', whoseTurn: { actor: 'awaiting-the-office', estimate: { status: 'pending-slot', slotId: 'S-5 expected-next-event range', source: 'rules-engine' } }, status: { lifecycle: 'Awaiting the office', attention: 'on-track' } },
  ],
  recentlyChanged: [
    { object: { kind: 'invention', id: 'inv_51D0', label: 'Invention INV-51D0' }, change: 'Disclosure saved (v2)', date: '2026-09-12' },
  ],
  glance: {
    countsByState: [{ label: 'Assessing', count: 1 }, { label: 'Assessed', count: 1 }, { label: 'Filing', count: 1 }, { label: 'Not pursued', count: 1 }],
    next90Days: [
      { label: 'FER response (2026/DEL/000123)', date: '2026-10-15', state: 'approaching' },
      { label: 'National-phase entry (PCT)', date: '2026-12-12', state: 'upcoming' },
    ],
    spend: openPrice(),
  },
};

/* ── SC-C17 · Documents ─────────────────────────────────────────────────────*/
const documents: DocumentsIndexVM = {
  accessLog: { label: 'View access log' },
  facets: [{ id: 'class', label: 'Class', count: 3 }, { id: 'source', label: 'Source', count: 2 }],
  rows: [
    { id: 'DOC-1', name: 'Disclosure v3', docClass: 'Disclosure', version: 'v3', source: 'Recorded by you', relatedRef: 'INV-7F3A', date: '2026-08-30', authorship: { by: 'reviewer', reviewerName: 'You (client)', releasedAt: '2026-08-30T14:02:00+05:30' }, immutable: true },
    { id: 'DOC-2', name: 'Assessment report', docClass: 'Assessment', version: 'v1', source: 'AI analysis, human-reviewed', relatedRef: 'asmt_DEMO_0001', date: '2026-09-03', authorship: { by: 'ai', label: 'AI-generated' }, immutable: true },
    { id: 'DOC-3', name: 'Draft notes', docClass: 'Note', version: 'v1', source: 'Recorded by you', relatedRef: 'INV-51D0', date: '2026-09-12', authorship: { by: 'reviewer', reviewerName: 'You (client)', releasedAt: '2026-09-12T09:00:00+05:30' }, immutable: false },
  ],
};

/* ── SC-C20 · Settings ──────────────────────────────────────────────────────*/
const settingsOwner: SettingsVM = {
  profileNote: 'Your name, email, and language preference.',
  workspaceName: 'Demo Workspace',
  members: [
    { name: 'You', role: 'Owner' },
    { name: 'A. Colleague (demo)', role: 'Member' },
  ],
  notifications: {
    criticalNote: 'Critical notifications cannot be muted. They always reach you.',
    channelDefault: { status: 'pending-slot', slotId: 'S-7 per-class default channel', source: 'config' },
  },
  billing: { note: 'Billing and invoices.', price: openPrice() },
  security: {
    mfaPolicy: { status: 'pending-slot', slotId: 'S-10 client MFA policy', source: 'config' },
    sessionsNote: 'Active sessions and sign-out.',
    accessLogNote: 'Who accessed this workspace, including any time-boxed support access.',
  },
  data: {
    residency: { status: 'pending-slot', slotId: 'L7 data residency', source: 'legal' },
    exportNote: 'Export your data.',
    retentionNote: 'Retention follows the workspace policy; filed documents are retained immutably.',
    deletion: { note: 'Delete workspace data.' },
  },
};
// Billing & workspace-deletion are Owner-only. Everyone else — including an Admin — sees them
// visible-but-locked with the reason + who can act (IP-15 routes to the Owner; nothing auto-escalates).
const billingOwnerOnlyLock: LockInfo = { reason: 'Billing is visible to the Owner only.', whoCanAct: 'Ask the Workspace Owner.' };
const deletionOwnerOnlyLock: LockInfo = { reason: 'Deleting workspace data is limited to the Owner.', whoCanAct: 'Ask the Workspace Owner.' };

// Admin: broad workspace access, but billing/deletion remain Owner-only (an Admin cannot act on them).
const settingsAdmin: SettingsVM = {
  ...settingsOwner,
  members: [{ name: 'You', role: 'Admin' }, { name: 'The Owner (demo)', role: 'Owner' }],
  billing: { note: 'Billing and invoices.', price: openPrice(), locked: billingOwnerOnlyLock },
  data: { ...settingsOwner.data, deletion: { note: 'Delete workspace data.', locked: deletionOwnerOnlyLock } },
};
// Member view: billing and deletion are Owner-only (visible-but-locked, IP-15).
const settingsMember: SettingsVM = {
  ...settingsOwner,
  members: [{ name: 'You', role: 'Member' }, { name: 'The Owner (demo)', role: 'Owner' }],
  billing: { note: 'Billing and invoices.', price: openPrice(), locked: billingOwnerOnlyLock },
  data: { ...settingsOwner.data, deletion: { note: 'Delete workspace data.', locked: deletionOwnerOnlyLock } },
};

/* ── SC-C21 · Notifications ─────────────────────────────────────────────────*/
const notifications: NotificationsVM = {
  groups: [
    { class: 'critical', items: [
      { id: 'N-1', class: 'critical', title: 'A critical deadline is approaching', object: { kind: 'deadline', id: 'dl_fer_1', label: 'FER response' }, whoseTurn: { actor: 'needs-you' } },
    ] },
    { class: 'action-required', items: [
      { id: 'N-2', class: 'action-required', title: 'A verdict is ready to review', object: { kind: 'assessment', id: 'asmt_DEMO_0001', label: 'Assessment for INV-7F3A' }, whoseTurn: { actor: 'needs-you' } },
    ] },
    { class: 'progress', items: [
      { id: 'N-3', class: 'progress', title: 'Your assessment is in review', object: { kind: 'assessment', id: 'asmt_DEMO_0000', label: 'Assessment (in review)' }, whoseTurn: { actor: 'with-the-reviewer' } },
    ] },
    { class: 'informational', items: [
      { id: 'N-4', class: 'informational', title: 'Disclosure v2 saved', object: { kind: 'invention', id: 'inv_51D0', label: 'Invention INV-51D0' }, whoseTurn: { actor: 'nothing-needed' } },
    ] },
    { class: 'proactive-reassurance', items: [
      { id: 'N-5', class: 'proactive-reassurance', title: "Nothing needed — your PCT application is progressing normally", object: { kind: 'application', id: 'app_4C7D', label: 'Application PCT/IB2026/050456' }, whoseTurn: { actor: 'awaiting-the-office' } },
    ] },
  ],
};

/* ── Scenario registries ────────────────────────────────────────────────────*/
export const homeScenarios = {
  ready: { state: 'ready', data: home } as Loaded<HomeVM>,
  'stale-region': { state: 'ready', data: { ...home, staleness: fresh('IN Patent Office register (demo)', true) } } as Loaded<HomeVM>,
  empty: { state: 'empty', empty: { teaches: 'This workspace holds your inventions, applications, deadlines and matters. Start by recording your first invention.', action: { verb: 'Record', label: 'Record your first invention', emphasis: 'primary' } } } as Loaded<HomeVM>,
  loading: { state: 'loading' } as Loaded<HomeVM>,
  error: { state: 'error', error: { reason: 'Your home could not be fully loaded.', nextStep: 'Some regions may be delayed — retry shortly. Nothing is marked "all clear" that we could not confirm.' } } as Loaded<HomeVM>,
};

export const documentsScenarios = {
  ready: { state: 'ready', data: documents } as Loaded<DocumentsIndexVM>,
  empty: { state: 'empty', empty: { teaches: 'Documents appear as you record, assess and file.', action: { verb: 'Record', label: 'Record an invention', emphasis: 'primary' } } } as Loaded<DocumentsIndexVM>,
  loading: { state: 'loading' } as Loaded<DocumentsIndexVM>,
  error: { state: 'error', error: { reason: 'Your documents could not be loaded.', nextStep: 'Nothing was lost — retry shortly.' } } as Loaded<DocumentsIndexVM>,
};

export const settingsScenarios = {
  owner: { state: 'ready', data: settingsOwner } as Loaded<SettingsVM>,
  'admin-locked': { state: 'ready', data: settingsAdmin } as Loaded<SettingsVM>,
  'member-locked': { state: 'ready', data: settingsMember } as Loaded<SettingsVM>,
  loading: { state: 'loading' } as Loaded<SettingsVM>,
};

export const notificationsScenarios = {
  ready: { state: 'ready', data: notifications } as Loaded<NotificationsVM>,
  empty: { state: 'empty', empty: { teaches: "You're all caught up.", action: { verb: 'Review', label: 'Go to Home', emphasis: 'secondary', nothingNeeded: true } } } as Loaded<NotificationsVM>,
  loading: { state: 'loading' } as Loaded<NotificationsVM>,
};
