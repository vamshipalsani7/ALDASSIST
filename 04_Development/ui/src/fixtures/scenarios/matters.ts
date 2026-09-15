/**
 * ALDASSIST Phase 8 — fixtures: Matter / Costs / Matching + PriceDisplay scenarios (B4).
 *
 * NO INVENTED PRICES OR FEES (CR-19 / CR-15): every fee amount and the bundled total are `pending-slot`
 * containers, and the PriceDisplay rendering mode is `pending-slot` (O-2026-001 OPEN) except where a demo
 * scenario resolves the MODE only (never the amounts) to show both layouts. L1 disclosure is `pending-legal`.
 * Two-axis status uses the enumerated matter set (P4:§11.4). Cross-tenant → `not-found` (CR-5); role-gated
 * surfaces (costs, engage/pay) → `permission-denied` (IP-15). Identifiers are opaque/synthetic.
 */
import type {
  Loaded, PriceDisplayVM, PriceRenderingMode, MattersIndexVM, MatterWorkspaceVM, CostsVM, MatchingVM,
  QuoteEngagementVM, FreshnessStamp,
} from '../../contract';

const fresh = (source: string): FreshnessStamp => ({ source, retrievedAt: '2026-09-14T08:00:00+05:30', stale: false });

/* ── PriceDisplay builders — amounts always pending-slot (never invented) ───*/
function price(mode?: PriceRenderingMode): PriceDisplayVM {
  return {
    renderingMode: mode
      ? { status: 'resolved', value: mode, source: 'config' }
      : { status: 'pending-slot', slotId: 'O-2026-001 pricing rendering mode', source: 'owner-decision' },
    lines: [
      { kind: 'platform-fee', label: 'Platform fee', amount: { status: 'pending-slot', slotId: 'L1 platform fee', source: 'legal' }, disclosure: { slotId: 'L1', status: 'pending-legal' } },
      { kind: 'professional-fee', label: 'Professional fee', amount: { status: 'pending-slot', slotId: 'L1-04 professional fee', source: 'legal' }, disclosure: { slotId: 'L1-04', status: 'pending-legal' } },
      { kind: 'official-fee', label: 'Official fee', amount: { status: 'pending-slot', slotId: 'official fee (Rules Engine)', source: 'rules-engine' }, disclosure: { slotId: 'L1', status: 'pending-legal' } },
    ],
    bundledTotal: { status: 'pending-slot', slotId: 'L1 bundled total', source: 'legal' },
    disclosure: { slotId: 'L1', status: 'pending-legal' },
  };
}

/* ── SC-C14 · Matters index ─────────────────────────────────────────────────*/
const matters: MattersIndexVM = {
  facets: [
    { id: 'state', label: 'State', count: 4 },
    { id: 'agent', label: 'Agent', count: 2 },
  ],
  rows: [
    { id: 'MAT-01', ref: 'Matter M-2026-014', status: { lifecycle: 'engaged', attention: 'on-track' }, agent: 'Verified Agent (demo)', invention: 'INV-7F3A', cost: { kind: 'price', price: price() } },
    { id: 'MAT-02', ref: 'Matter M-2026-021', status: { lifecycle: 'awaiting-you', attention: 'action-needed' }, agent: 'Verified Agent (demo)', invention: 'INV-2B9C', cost: { kind: 'price', price: price() } },
    { id: 'MAT-03', ref: 'Matter M-2026-009', status: { lifecycle: 'complete', attention: 'on-track' }, agent: 'Verified Agent (demo)', invention: 'INV-51D0', cost: { kind: 'price', price: price() } },
    { id: 'MAT-04', ref: 'Matter M-2025-140', status: { lifecycle: 'closed', attention: 'on-track', closedReason: 'Engagement completed and closed by the client (demo)' }, agent: 'Verified Agent (demo)', invention: 'INV-0A44', cost: { kind: 'price', price: price() } },
  ],
};
// Member view: costs are not visible (P4:§17.2) — the cost cell is hidden with a reason, never a number.
const mattersMemberView: MattersIndexVM = {
  ...matters,
  rows: matters.rows.map((r) => ({ ...r, cost: { kind: 'hidden', reason: 'Costs are visible to the Owner and Admins.' } })),
};

/* ── SC-C15 · Matter workspace ──────────────────────────────────────────────*/
const matterWorkspace: MatterWorkspaceVM = {
  id: 'MAT-01', ref: 'Matter M-2026-014',
  status: { lifecycle: 'engaged', attention: 'action-needed' },
  header: {
    where: 'Engaged — your agent is preparing the filing.',
    whatsNext: 'Your agent will share the application document for your review before filing.',
    needsYou: { verb: 'Review', label: 'Review the application document before filing', emphasis: 'primary' },
    cost: { kind: 'price', price: price() },
  },
  tabs: [
    { id: 'activity', label: 'Activity' },
    { id: 'documents', label: 'Documents' },
    { id: 'decisions', label: 'Decisions' },
    { id: 'costs', label: 'Costs' },
  ],
  activity: [
    { event: 'Agent engaged', date: '2026-09-05', freshness: fresh('ALDASSIST matter record (demo)') },
    { event: 'Quote accepted', date: '2026-09-05', freshness: fresh('ALDASSIST matter record (demo)') },
  ],
  messagesNote: 'Messages in this matter stay within this matter. There is no cross-matter or reviewer channel.',
  relationshipRail: [
    { kind: 'invention', id: 'inv_7F3A', label: 'Invention INV-7F3A' },
    { kind: 'application', id: 'app_11A2', label: 'Application 2026/DEL/000123' },
  ],
};

/* ── SC-C16 · Costs (Owner/Admin only) ──────────────────────────────────────*/
const costs: CostsVM = {
  spendToDate: price(), committed: price(), forecast: price(),
  invoices: [
    { id: 'INV-1', label: 'Engagement invoice', issuer: 'Verified Agent (demo)', amount: { status: 'pending-slot', slotId: 'L1-10 invoice amount', source: 'legal' } },
    { id: 'INV-2', label: 'Official-fee invoice', issuer: 'Patent office (demo)', amount: { status: 'pending-slot', slotId: 'official fee (Rules Engine)', source: 'rules-engine' } },
  ],
  projectionNote: 'A 20-year cost projection across your portfolio will appear here (L1-09). Figures come from the Rules Engine and are not shown until available.',
};

/* ── SC-C18 · Agent Matching / Engagement ───────────────────────────────────*/
const matching: MatchingVM = {
  conflictCheck: 'passed',
  matches: [
    {
      id: 'AG-1', name: 'Verified Agent A (demo)', rationale: 'Matters in this domain · availability this month',
      credentials: 'Registered patent agent (demo)', jurisdiction: 'India',
      publishedPrice: price(),
      stats: { status: 'published', n: 24, confidence: { status: 'pending-slot', slotId: 'S-3 confidence representation', source: 'measurement' } },
    },
    {
      id: 'AG-2', name: 'Verified Agent B (demo)', rationale: 'Matters in this domain',
      credentials: 'Registered patent agent (demo)', jurisdiction: 'India / PCT',
      publishedPrice: price(),
      stats: { status: 'below-floor', note: 'Not enough data yet to show outcome statistics.' },
    },
  ],
};

/* ── SC-C19 · Quote & engagement ────────────────────────────────────────────*/
const quote: QuoteEngagementVM = {
  agentId: 'AG-1', agentName: 'Verified Agent A (demo)',
  scope: 'Prepare and file the Indian patent application for INV-7F3A, including one examination response (demo scope).',
  quote: price(),
  contractingParties: { slotId: 'L1-06 contracting parties', status: 'pending-legal' },
  engageAction: { verb: 'Engage', label: 'Accept scope & quote — engage', emphasis: 'primary' },
  scopeChangeNote: 'Need a different scope? Request a change and your agent will issue a new quote.',
  trustBoundaryNote: 'This is the first point where money and engagement appear. The earlier assessment was free, with no payment and no engagement.',
};

/* ── Scenario registries ────────────────────────────────────────────────────*/
export const priceDisplayScenarios = {
  'open-decision': price(),
  component: price('component'),
  bundled: price('bundled'),
};

export const mattersScenarios = {
  ready: { state: 'ready', data: matters } as Loaded<MattersIndexVM>,
  'member-no-costs': { state: 'ready', data: mattersMemberView } as Loaded<MattersIndexVM>,
  empty: { state: 'empty', empty: { teaches: 'Your engagements appear here when you engage an agent.', action: { verb: 'Engage', label: 'Find an agent', emphasis: 'primary' } } } as Loaded<MattersIndexVM>,
  loading: { state: 'loading' } as Loaded<MattersIndexVM>,
  error: { state: 'error', error: { reason: 'Your matters could not be loaded.', nextStep: 'Nothing was lost — retry, or come back shortly.' } } as Loaded<MattersIndexVM>,
};

export const matterWorkspaceScenarios = {
  ready: { state: 'ready', data: matterWorkspace } as Loaded<MatterWorkspaceVM>,
  loading: { state: 'loading' } as Loaded<MatterWorkspaceVM>,
  'permission-denied': { state: 'permission-denied', denied: { reason: 'Your role can view this workspace but not this matter.', whoCanAct: 'Ask the Workspace Owner.' } } as Loaded<MatterWorkspaceVM>,
  'not-found': { state: 'not-found' } as Loaded<MatterWorkspaceVM>,
};

export const costsScenarios = {
  ready: { state: 'ready', data: costs } as Loaded<CostsVM>,
  // Members / Viewers have no cost access — visible-but-locked with who-can-act (IP-15).
  'permission-denied': { state: 'permission-denied', denied: { reason: 'Costs are visible to the Owner and Admins.', whoCanAct: 'Ask the Workspace Owner if you need cost access.' } } as Loaded<CostsVM>,
  loading: { state: 'loading' } as Loaded<CostsVM>,
  error: { state: 'error', error: { reason: 'Cost data is temporarily unavailable.', nextStep: 'Showing nothing rather than an out-of-date figure — retry shortly.' } } as Loaded<CostsVM>,
};

export const matchingScenarios = {
  ready: { state: 'ready', data: matching } as Loaded<MatchingVM>,
  // No agent in domain/jurisdiction → honest message + notify-me; never a fabricated match.
  empty: { state: 'empty', empty: { teaches: 'No agent is available in this domain and jurisdiction yet. We can notify you when one is.', action: { verb: 'Confirm', label: 'Notify me when an agent is available', emphasis: 'primary' } } } as Loaded<MatchingVM>,
  // Conflict check could not complete → matching does not proceed; a temporary hold, not a rejection (fails closed).
  error: { state: 'error', error: { reason: 'The conflict check could not be completed, so no agents are shown.', nextStep: 'This is a temporary hold, not a rejection — retry shortly.' } } as Loaded<MatchingVM>,
  loading: { state: 'loading' } as Loaded<MatchingVM>,
};

export const quoteScenarios = {
  ready: { state: 'ready', data: quote } as Loaded<QuoteEngagementVM>,
  // Non-Owner: engage/pay is Owner-only — visible-but-locked, routed to the Owner, never auto-escalated.
  'permission-denied': { state: 'permission-denied', denied: { reason: 'Engaging an agent (and payment) is limited to the Workspace Owner.', whoCanAct: 'Your request can be sent to the Workspace Owner to act on.' } } as Loaded<QuoteEngagementVM>,
  // Payment failure boundary: the matter is not created; nothing is at risk.
  error: { state: 'error', error: { reason: 'The engagement could not be completed.', nextStep: 'No matter was created and nothing is at risk — no deadline exists yet. You can retry.' } } as Loaded<QuoteEngagementVM>,
  loading: { state: 'loading' } as Loaded<QuoteEngagementVM>,
  'not-found': { state: 'not-found' } as Loaded<QuoteEngagementVM>,
};
