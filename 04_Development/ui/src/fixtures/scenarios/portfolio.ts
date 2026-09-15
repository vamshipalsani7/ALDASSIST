/**
 * ALDASSIST Phase 8 — fixtures: Client Portfolio / Deadlines scenarios (B3 mandatory-state coverage).
 *
 * NO INVENTED VALUES (CR-19): the expected-next-event range (silence, S-5) is `pending-slot`; deadline
 * dates are synthetic demo values standing in for Rules-Engine-computed dates (rendered, never authored).
 * Identifiers are opaque/synthetic; titles are confidential placeholders (P4:§9.2). Two-axis status is
 * always separate elements (CR-4). Cross-tenant objects are represented ONLY by `not-found` (CR-5). A
 * "Closed" application always carries its reason (P4:§11.3). The `responding` variant is status-only.
 */
import type {
  Loaded, PortfolioIndexVM, ApplicationDetailVM, DeadlinesIndexVM, DeadlineDetailVM,
  ApplicationHeaderVM, FreshnessStamp,
} from '../../contract';

const fresh = (source: string, stale = false): FreshnessStamp => ({ source, retrievedAt: '2026-09-13T08:00:00+05:30', stale });

/* ── SC-C10 · Portfolio index ──────────────────────────────────────────────*/
const portfolio: PortfolioIndexVM = {
  facets: [
    { id: 'state', label: 'State', count: 3 },
    { id: 'jurisdiction', label: 'Jurisdiction', count: 2 },
    { id: 'family', label: 'Family', count: 2 },
  ],
  rows: [
    {
      id: 'APP-11A2', officialNumber: '2026/DEL/000123',
      status: { lifecycle: 'Under examination', officialSubStatus: 'First examination report issued (demo)', attention: 'action-needed' },
      jurisdiction: 'India', family: 'Family A (demo)', agent: 'Verified Agent (demo)',
      nextDeadline: { label: 'FER response', date: '2026-10-15', state: 'approaching' },
    },
    {
      id: 'APP-4C7D', officialNumber: 'PCT/IB2026/050456',
      status: { lifecycle: 'Responding', officialSubStatus: 'Response being prepared off-platform (demo)', attention: 'on-track' },
      jurisdiction: 'PCT', family: 'Family A (demo)', agent: 'Verified Agent (demo)',
      nextDeadline: { label: 'Written-opinion response', date: '2026-11-02', state: 'upcoming' },
    },
    {
      id: 'APP-90E1', officialNumber: '2025/DEL/009876',
      status: { lifecycle: 'Closed', officialSubStatus: 'Withdrawn before publication (demo)', attention: 'on-track', closedReason: 'Withdrawn by the applicant before publication (demo)' },
      jurisdiction: 'India', family: 'Family B (demo)', agent: 'Verified Agent (demo)',
    },
  ],
};

/* ── SC-C11 · Application detail (shared header + three modes) ──────────────*/
function header(opts: { lifecycle: string; sub: string; attention: 'on-track' | 'action-needed' | 'at-risk'; closedReason?: string; next: ApplicationHeaderVM['nextAction']; whose: ApplicationHeaderVM['whoseTurn'] }): ApplicationHeaderVM {
  return {
    id: 'APP-11A2',
    identity: {
      officialNumber: '2026/DEL/000123',
      title: 'Application for INV-7F3A (demo)',
      jurisdiction: 'India',
      filingDate: '2026-03-10',
      priorityDate: '2025-09-12',
    },
    status: { lifecycle: opts.lifecycle, officialSubStatus: opts.sub, attention: opts.attention, closedReason: opts.closedReason },
    whoseTurn: opts.whose,
    nextAction: opts.next,
    tabs: [
      { id: 'status', label: 'Status' },
      { id: 'deadlines', label: 'Deadlines' },
      { id: 'documents', label: 'Documents' },
      { id: 'costs', label: 'Costs' },
      { id: 'family', label: 'Family' },
    ],
    relationshipRail: [
      { kind: 'invention', id: 'inv_7F3A', label: 'Invention INV-7F3A (parent)' },
      { kind: 'deadline', id: 'dl_fer_1', label: 'FER response — approaching' },
    ],
  };
}

const applicationActive: ApplicationDetailVM = {
  mode: 'active',
  header: header({ lifecycle: 'Under examination', sub: 'First examination report issued (demo)', attention: 'action-needed',
    next: { verb: 'Respond', label: 'Review the examination report', emphasis: 'primary' }, whose: { actor: 'needs-you' } }),
  timeline: [
    { event: 'First examination report issued', date: '2026-09-01', freshness: fresh('IN Patent Office register (demo)') },
    { event: 'Request for examination filed', date: '2026-06-20', freshness: fresh('IN Patent Office register (demo)') },
    { event: 'Application filed', date: '2026-03-10', freshness: fresh('IN Patent Office register (demo)') },
  ],
};

const applicationQuiet: ApplicationDetailVM = {
  mode: 'quiet',
  header: header({ lifecycle: 'Awaiting the office', sub: 'Published; awaiting examination (demo)', attention: 'on-track',
    next: { verb: 'Review', label: 'Nothing needed — next expected event is a while away', emphasis: 'secondary', nothingNeeded: true }, whose: { actor: 'awaiting-the-office' } }),
  lastEvent: { event: 'Application published', date: '2026-08-05', freshness: fresh('IN Patent Office register (demo)') },
  // S-5 expected-next-event range — a SLOT from the Rules Engine / field timelines. Never invented.
  expectedNextEvent: { status: 'pending-slot', slotId: 'S-5 expected-next-event range', source: 'rules-engine' },
  reassurance: 'Nothing has happened — and that is expected. Nothing is required from you. We are monitoring this daily.',
  whatHappensNext: 'The patent office will pick the application up for examination in turn.',
  whySoLong: 'Examination queues are long; a quiet period here is normal and not a cause for concern.',
};

const applicationResponding: ApplicationDetailVM = {
  mode: 'responding',
  header: header({ lifecycle: 'Responding', sub: 'Response being prepared off-platform (demo)', attention: 'on-track',
    next: { verb: 'Review', label: 'Nothing needed — your agent is handling the response', emphasis: 'secondary', nothingNeeded: true }, whose: { actor: 'with-the-reviewer' } }),
  responseDeadline: { label: 'Examination-response deadline', date: '2026-10-15', state: 'approaching' },
  filedResponse: undefined,
  offPlatformNote: 'Your Verified Agent is drafting and filing the examination response off-platform. ALDASSIST tracks the status and the deadline; it is not a prosecution workspace. The filed response will be uploaded here once submitted.',
};

const applicationClosed: ApplicationDetailVM = {
  mode: 'active',
  header: header({ lifecycle: 'Closed', sub: 'Withdrawn before publication (demo)', attention: 'on-track',
    closedReason: 'Withdrawn by the applicant before publication (demo)',
    next: { verb: 'Review', label: 'Nothing needed', emphasis: 'secondary', nothingNeeded: true }, whose: { actor: 'nothing-needed' } }),
  timeline: [
    { event: 'Application withdrawn', date: '2026-07-01', freshness: fresh('IN Patent Office register (demo)') },
    { event: 'Application filed', date: '2025-11-20', freshness: fresh('IN Patent Office register (demo)') },
  ],
};

const applicationStale: ApplicationDetailVM = {
  mode: 'active',
  header: header({ lifecycle: 'Under examination', sub: 'Last-known position (demo)', attention: 'on-track',
    next: { verb: 'Review', label: 'Nothing needed', emphasis: 'secondary', nothingNeeded: true }, whose: { actor: 'awaiting-the-office' } }),
  timeline: [
    { event: 'Request for examination filed', date: '2026-06-20', freshness: fresh('IN Patent Office register (demo)', true) },
  ],
  // IP-18: register unavailable → last-known position + staleness stamp, never an error page.
  staleness: fresh('IN Patent Office register (demo)', true),
};

/* ── SC-C12 · Deadlines index ──────────────────────────────────────────────*/
const deadlines: DeadlinesIndexVM = {
  view: 'list',
  facets: [
    { id: 'criticality', label: 'Criticality', count: 2 },
    { id: 'state', label: 'State', count: 4 },
    { id: 'jurisdiction', label: 'Jurisdiction', count: 2 },
  ],
  rows: [
    { id: 'dl_fer_1', title: 'FER response', applicationRef: '2026/DEL/000123', date: '2026-10-15', state: 'approaching', criticality: { label: 'Critical (demo)', elevated: true }, attention: 'action-needed' },
    { id: 'dl_wo_1', title: 'Written-opinion response', applicationRef: 'PCT/IB2026/050456', date: '2026-11-02', state: 'upcoming', criticality: { label: 'Routine (demo)', elevated: false }, attention: 'on-track' },
    { id: 'dl_nat_1', title: 'National-phase entry', applicationRef: 'PCT/IB2026/050456', date: '2026-12-12', state: 'upcoming', criticality: { label: 'Critical (demo)', elevated: true }, attention: 'on-track' },
    { id: 'dl_old_1', title: 'Annuity (superseded)', applicationRef: '2025/DEL/009876', date: '2026-05-30', state: 'superseded', criticality: { label: 'Routine (demo)', elevated: false }, attention: 'on-track' },
  ],
};

/* ── SC-C13 · Deadline detail (trace) ──────────────────────────────────────*/
const deadlineDetail: DeadlineDetailVM = {
  id: 'dl_fer_1',
  title: 'FER response', date: '2026-10-15', state: 'approaching',
  criticality: { label: 'Critical (demo)', elevated: true }, applicationRef: '2026/DEL/000123',
  why: { trigger: 'First examination report issued on 2026-09-01', window: 'Statutory window for filing the response' },
  trace: {
    status: 'available',
    detail: {
      ruleId: 'IN-FER-RESPONSE (demo)', ruleVersion: 'v3 (demo)',
      statutoryCitation: 'Illustrative statutory citation (demo)',
      calendarAdjustment: 'Rolled forward off a weekend/holiday (demo)',
      extensions: 'Extension mechanism available per the demo rule',
    },
  },
  // The client ACKNOWLEDGES only — never 'Confirm' (confirmation of a critical deadline is an agent/ops act).
  clientAction: { verb: 'Review', label: 'Acknowledge — I understand this deadline', emphasis: 'secondary' },
  confirmationNote: 'Critical deadlines are confirmed by your Verified Agent or Docket Ops — not from here.',
};
const deadlineDetailTraceUnavailable: DeadlineDetailVM = {
  ...deadlineDetail,
  trace: { status: 'unavailable' },
};

/* ── Scenario registries ───────────────────────────────────────────────────*/
export const portfolioScenarios = {
  ready: { state: 'ready', data: portfolio } as Loaded<PortfolioIndexVM>,
  empty: { state: 'empty', empty: { teaches: 'Filed applications appear here. Nothing is filed yet — applications are created from your inventions.', action: { verb: 'Record', label: 'Go to Inventions', emphasis: 'primary' } } } as Loaded<PortfolioIndexVM>,
  loading: { state: 'loading' } as Loaded<PortfolioIndexVM>,
  error: { state: 'error', error: { reason: 'Your portfolio could not be loaded.', nextStep: 'Nothing was lost — retry, or come back shortly.' } } as Loaded<PortfolioIndexVM>,
};

export const applicationDetailScenarios = {
  active: { state: 'ready', data: applicationActive } as Loaded<ApplicationDetailVM>,
  'quiet-silence': { state: 'ready', data: applicationQuiet } as Loaded<ApplicationDetailVM>,
  'responding-status-only': { state: 'ready', data: applicationResponding } as Loaded<ApplicationDetailVM>,
  'closed-with-reason': { state: 'ready', data: applicationClosed } as Loaded<ApplicationDetailVM>,
  'stale-last-known': { state: 'ready', data: applicationStale } as Loaded<ApplicationDetailVM>,
  loading: { state: 'loading' } as Loaded<ApplicationDetailVM>,
  'permission-denied': { state: 'permission-denied', denied: { reason: 'Your role can view this workspace but not this application.', whoCanAct: 'Ask the Workspace Owner.' } } as Loaded<ApplicationDetailVM>,
  'not-found': { state: 'not-found' } as Loaded<ApplicationDetailVM>,
};

export const deadlinesScenarios = {
  ready: { state: 'ready', data: deadlines } as Loaded<DeadlinesIndexVM>,
  empty: { state: 'empty', empty: { teaches: 'Deadlines appear here once something is filed.', action: { verb: 'Record', label: 'Go to Inventions', emphasis: 'primary' } } } as Loaded<DeadlinesIndexVM>,
  loading: { state: 'loading' } as Loaded<DeadlinesIndexVM>,
  error: { state: 'error', error: { reason: 'Your deadlines could not be loaded.', nextStep: 'Nothing was lost — retry, or come back shortly.' } } as Loaded<DeadlinesIndexVM>,
};

export const deadlineDetailScenarios = {
  ready: { state: 'ready', data: deadlineDetail } as Loaded<DeadlineDetailVM>,
  'trace-unavailable': { state: 'ready', data: deadlineDetailTraceUnavailable } as Loaded<DeadlineDetailVM>,
  loading: { state: 'loading' } as Loaded<DeadlineDetailVM>,
  'not-found': { state: 'not-found' } as Loaded<DeadlineDetailVM>,
};
