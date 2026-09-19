/**
 * ALDASSIST Phase 8 — fixtures: Public surface scenarios (B8). Synthetic/demo data only.
 *
 * NO INVENTED VALUES (CR-19): fee/timeline figures are PriceDisplay containers with pending amounts (Rules
 * Engine, Phase 9); the find-your-path cost range and agent confidence are pending slots; legal wording
 * (L1/L1-04/L1-20/L4) and the L3 publication gate are LegalContentSlot containers. No banned marketing
 * terms. Register data carries source + freshness; upstream failure → cached + staleness. Agent stats
 * include an n<20 below-floor case (CR-21/D-2026-019). The AI plain-language summary is labelled AI (CR-6).
 */
import type {
  Loaded, PublicHomeVM, PatentSearchVM, PatentDocumentVM, StageLandingVM, SegmentLandingVM, PricingVM,
  CostPlannerVM, FindYourPathVM, GuidesVM, GlossaryVM, JurisdictionGuideVM, ReportsVM, AgentDirectoryVM,
  AgentPublicProfileVM, TrustPageVM, CompanyLegalVM, AuthVM, PriceDisplayVM, LegalContentSlot, FreshnessStamp,
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
const legal = (slotId: string): LegalContentSlot => ({ slotId, status: 'pending-legal' });
const fresh = (source: string, stale = false): FreshnessStamp => ({ source, retrievedAt: '2026-09-14T08:00:00+05:30', stale });

/* ── SC-P01 · Home ──────────────────────────────────────────────────────────*/
const home: PublicHomeVM = {
  hero: { headline: 'Record it. Understand it. Protect it.', sub: 'One place for the invention record, an honest assessment, and the work of filing.', primaryCta: { label: 'Start free', emphasis: 'primary' }, secondaryCta: { label: 'Search the register', emphasis: 'secondary' } },
  layers: [
    { title: 'The Record', body: 'A durable, versioned record of your invention.' },
    { title: 'The Judgement', body: 'A human-reviewed assessment — never a verdict before release.' },
    { title: 'The Work', body: 'Filing handled by a Verified Agent.' },
  ],
  proof: [{ label: 'The register, searchable for free' }, { label: 'Published, fixed prices' }, { label: 'A 20-year cost projection you can run without an account' }],
  pathFinder: { label: 'Find your path', emphasis: 'secondary' },
  footerTrustLinks: [{ label: 'Security' }, { label: 'AI policy' }, { label: 'Limitations' }],
};

/* ── SC-P02 · Search ────────────────────────────────────────────────────────*/
const search: PatentSearchVM = {
  query: 'signal conditioning',
  facets: [
    { id: 'jurisdiction', label: 'Jurisdiction', options: [{ label: 'India', count: 12 }, { label: 'PCT', count: 5 }] },
    { id: 'legal-status', label: 'Legal status', options: [{ label: 'Granted', count: 7 }, { label: 'Pending', count: 10 }] },
  ],
  results: [
    { id: 'r1', number: '2026/DEL/000123', jurisdiction: 'IN', title: 'A signal-conditioning apparatus (demo)', applicant: 'Demo Applicant', legalStatus: 'Pending', freshness: fresh('IN Patent Office register (demo)') },
    { id: 'r2', number: 'PCT/IB2026/050456', jurisdiction: 'PCT', title: 'Method for conditioning sensor signals (demo)', applicant: 'Demo Applicant', legalStatus: 'Published', freshness: fresh('WIPO PATENTSCOPE (demo)') },
  ],
  confidentialityNotice: 'This is a public register search (Zone 2). If you are searching for your own unfiled invention, do not describe it here — record it privately in your Vault instead.',
  ownInventionWarning: 'Searching for your own invention? Keep it confidential — start a private Disclosure in the Vault.',
  freshness: fresh('IN Patent Office register (demo)'),
  saveSearch: { label: 'Save this search', emphasis: 'secondary', gated: true },
};
const searchStale: PatentSearchVM = { ...search, freshness: fresh('IN Patent Office register (demo)', true) };

/* ── SC-P03 · Patent Document ★ ─────────────────────────────────────────────*/
const doc: PatentDocumentVM = {
  header: { number: '2026/DEL/000123', jurisdiction: 'IN', title: 'A signal-conditioning apparatus (demo)', applicant: 'Demo Applicant', inventors: 'Demo Inventor', filingDate: '2026-01-15', kind: 'Application' },
  tabs: [
    { id: 'overview', label: 'Overview' }, { id: 'claims', label: 'Claims' }, { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' }, { id: 'family', label: 'Family' }, { id: 'citations', label: 'Citations' }, { id: 'documents', label: 'Documents' },
  ],
  aiSummary: { authorship: { by: 'ai', label: 'AI-generated' }, text: 'In plain language: the document describes conditioning a sensor signal before further processing. (AI-generated summary of the public document — not legal advice.)' },
  claims: ['1. A signal-conditioning apparatus comprising… (as published).'],
  description: 'The description as published in the register (demo).',
  statusTimeline: [
    { event: 'Application filed', date: '2026-01-15', freshness: fresh('IN Patent Office register (demo)') },
    { event: 'Published', date: '2026-07-15', freshness: fresh('IN Patent Office register (demo)') },
  ],
  family: [{ number: 'PCT/IB2026/050456', jurisdiction: 'PCT', relation: 'PCT parent' }],
  citations: { cites: [{ number: 'IN 111111', jurisdiction: 'IN' }], citedBy: [] },
  documents: [{ label: 'Published specification (register)' }],
  sparseNote: 'Fields not provided by the register are shown as "not available from the register".',
  ownInventionWarning: 'Is this your own unfiled invention? Record it privately in the Vault rather than here.',
  saveAlert: { label: 'Set a status alert', emphasis: 'primary', gated: true },
};
const docSparse: PatentDocumentVM = { ...doc, claims: [], description: 'not available from the register', family: [] };

/* ── SC-P04 · Stage landings ────────────────────────────────────────────────*/
const stage: StageLandingVM = {
  stage: 'idea-stage',
  framing: 'You have an idea and want to know what protecting it involves.',
  whatHappens: 'Record the invention privately, request a human-reviewed assessment, then decide.',
  cost: openPrice(),
  nextStep: { label: 'Record an invention', emphasis: 'primary' },
};

/* ── SC-P05 · Segment landings ──────────────────────────────────────────────*/
const segmentUni: SegmentLandingVM = {
  segment: 'universities',
  framing: 'Researcher access to record and assess inventions.',
  capabilities: ['Record inventions', 'Request assessments', 'Work with Verified Agents'],
  cta: { label: 'Start free', emphasis: 'primary' },
  pricingPointer: { label: 'See pricing', emphasis: 'secondary' },
  note: 'This markets client-app researcher access — not an institutional intake / approval / budget module.',
};
const segmentAgents: SegmentLandingVM = {
  segment: 'patent-agents',
  framing: 'Bring your practice in — your docket first, matters second.',
  capabilities: ['Import your matters', 'Review assessments in your domains', 'Accept filing opportunities'],
  cta: { label: 'Apply to become a Verified Agent', emphasis: 'primary' },
  pricingPointer: { label: 'See pricing', emphasis: 'secondary' },
};

/* ── SC-P06 · Pricing ───────────────────────────────────────────────────────*/
const pricing: PricingVM = {
  catalogue: [
    { service: 'Assessment', price: openPrice() },
    { service: 'Filing (India)', price: openPrice() },
    { service: 'National-phase entry (PCT)', price: openPrice() },
  ],
  varianceNote: 'What affects price: jurisdiction, entity type and the official fees set by the office. We publish the components; we do not use "from ₹X" teasers.',
  entityTypeNote: 'Official fees vary by entity type and are shown separately from professional and platform fees.',
  renderingNote: 'Prices are shown as components by default. How pricing is presented is an open decision; official fees are always separately identifiable in either presentation.',
};

/* ── SC-P07 · Cost Planner ──────────────────────────────────────────────────*/
const costPlanner: CostPlannerVM = {
  inputs: [
    { id: 'jurisdictions', label: 'Jurisdictions', note: 'Where you intend to file.' },
    { id: 'entity-type', label: 'Entity type', note: 'Drives the official-fee basis.' },
  ],
  projection: openPrice(),
  entityTypeBasis: 'Projection is computed on the entity-type basis you select.',
  ruleVersionBasis: 'Figures derive from the current published rule version.',
  ungatedNote: 'This planner is free and requires no email — run it as many times as you like.',
};

/* ── SC-P08 · Find-your-path ────────────────────────────────────────────────*/
const findPath: FindYourPathVM = {
  questions: [
    { id: 'q1', prompt: 'Where are you in the process?', options: [{ label: 'Just an idea' }, { label: 'Ready to file' }, { label: 'Already filed' }] },
    { id: 'q2', prompt: 'Which jurisdictions matter to you?', options: [{ label: 'India' }, { label: 'International (PCT)' }] },
  ],
  recommendation: { label: 'Record your invention, then request an assessment.', note: 'Based on your answers, the next real step is a private Disclosure.', cta: { label: 'Record an invention', emphasis: 'primary' } },
  costRange: { status: 'pending-slot', slotId: 'find-your-path cost range (Rules Engine)', source: 'rules-engine' },
  noEmailNote: 'No email required — this router is free to use.',
};

/* ── SC-P09 · Guides ────────────────────────────────────────────────────────*/
const guidesIndex: GuidesVM = { mode: 'index', index: { items: [
  { slug: 'what-is-a-disclosure', title: 'What is a disclosure?', summary: 'How the private invention record works.' },
  { slug: 'india-filing-basics', title: 'India filing basics', summary: 'The process, at a glance.' },
] } };
const guidesArticle: GuidesVM = { mode: 'article', article: {
  title: 'What is a disclosure?', toc: [{ id: 's1', label: 'Overview' }, { id: 's2', label: 'Why record early' }],
  body: 'A disclosure is a versioned, private record of an invention (demo article body).',
  related: [{ label: 'India filing basics' }], glossaryLinks: [{ term: 'Disclosure' }, { term: 'Invention' }],
  figuresNote: 'Any fee or timeline figures in guides derive from the Rules Engine, not hand-authored.',
} };

/* ── SC-P10 · Glossary (shares the tooltip record) ──────────────────────────*/
const glossaryIndex: GlossaryVM = { mode: 'index', index: { terms: [
  { slug: 'invention', term: 'Invention', plain: 'The durable concept of what was invented.' },
  { slug: 'disclosure', term: 'Disclosure', plain: 'A versioned, private capture of an invention.' },
] } };
const glossaryTerm: GlossaryVM = { mode: 'term', term: {
  term: 'Invention',
  plainLanguage: 'The durable concept of what was invented — it persists independently of any application.',
  termOfArt: 'The root entity of the platform; never deleted by an application’s lifecycle.',
  usage: 'Do not use "idea" once recorded, "IP", or "asset".',
  related: [{ term: 'Disclosure' }, { term: 'Application' }],
  jurisdiction: 'General',
  sharedRecordNote: 'This definition is rendered from the same record as the in-product tooltip — the two cannot diverge.',
} };

/* ── SC-P11 · Jurisdiction guide ────────────────────────────────────────────*/
const jurisdiction: JurisdictionGuideVM = {
  jurisdiction: 'India',
  processOverview: 'Filing → publication → examination → response → grant (demo overview).',
  timelines: [{ label: 'Request for examination', note: 'Statutory window (per the governing rule).' }, { label: 'FER response', note: 'Statutory response window.' }],
  feeStructure: openPrice(),
  pitfalls: ['Missing the examination-request window.', 'Overlooking the response deadline.'],
};

/* ── SC-P12 · Reports ───────────────────────────────────────────────────────*/
const report: ReportsVM = {
  title: 'Indian patent timelines — a data note (demo)',
  methodology: 'Methodology described here; data is synthetic in this demo.',
  data: [{ label: 'Applications reviewed', value: 'sample (demo)' }],
  findings: ['Finding one (demo).', 'Finding two (demo).'],
  publicationDate: '2026-09-01',
};

/* ── SC-P13 · Agent directory + profile ─────────────────────────────────────*/
const directory: AgentDirectoryVM = {
  filters: [{ id: 'domain', label: 'Domain' }, { id: 'jurisdiction', label: 'Jurisdiction' }],
  agents: [
    { slug: 'a-reviewer', name: 'A. Reviewer (demo)', specializations: ['Electronics'], jurisdiction: 'India', stats: { status: 'published', n: 24, confidence: { status: 'pending-slot', slotId: 'S-3 agent-stat confidence representation', source: 'measurement' } } },
    { slug: 'b-newagent', name: 'B. New Agent (demo)', specializations: ['Chemistry'], jurisdiction: 'India', stats: { status: 'below-floor', note: 'Not enough data yet — outcome statistics appear once there are at least 20 completed matters.' } },
  ],
};
const profile: AgentPublicProfileVM = {
  slug: 'a-reviewer', name: 'A. Reviewer (demo)', credentials: 'Registered patent agent (demo).', background: 'Practice background (demo).',
  specializations: ['Electronics', 'Signal processing'], jurisdiction: 'India', languages: ['English', 'Hindi'],
  stats: { status: 'published', n: 24, confidence: { status: 'pending-slot', slotId: 'S-3 agent-stat confidence representation', source: 'measurement' } },
  professionalFee: legal('L1-04 professional fee display'),
  publicationGate: legal('L3 advertising-rules review (publication go-live)'),
  engage: { label: 'Engage', emphasis: 'primary', gated: true },
};
const profileBelowFloor: AgentPublicProfileVM = { ...profile, slug: 'b-newagent', name: 'B. New Agent (demo)', stats: { status: 'below-floor', note: 'Not enough data yet.' } };

/* ── SC-P14 · Trust pages ───────────────────────────────────────────────────*/
const trustAi: TrustPageVM = {
  page: 'ai', title: 'AI policy',
  sections: [{ heading: 'How we use AI', body: 'AI drafts analysis; a Verified Agent reviews and releases it. We do not train on your private data.' }],
  providersNamed: ['Model provider (named publicly here)'],
  legalWording: legal('L4 privilege / disclaimer wording'),
};
const trustLimitations: TrustPageVM = {
  page: 'limitations', title: 'Limitations',
  sections: [{ heading: 'What we can and cannot do', body: 'Assessment is decision support, not a legal determination.' }],
  blindSpotNote: 'Applications filed within roughly the last 18 months may not yet be published and cannot be searched — we state this openly.',
  legalWording: legal('L4 privilege / disclaimer wording'),
};

/* ── SC-P15 · Company + Legal ───────────────────────────────────────────────*/
const companyAbout: CompanyLegalVM = { page: 'about', title: 'About', body: 'About ALDASSIST (demo).', legalWording: { slotId: '(none)', status: 'pending-legal' } };
const legalTerms: CompanyLegalVM = { page: 'terms', title: 'Terms', body: 'Terms of service.', legalWording: legal('L1-20 contracting parties & fee terms; L4') };

/* ── SC-P16 · Auth ──────────────────────────────────────────────────────────*/
const authSignup: AuthVM = {
  mode: 'sign-up',
  emailNote: 'Enter your email to create a free account.',
  verificationNote: 'We’ll send a verification link; your account stays inert until verified.',
  noPhoneNote: 'No phone number and no sales contact — email only.',
  returnToActionNote: 'After you verify, you return to whatever you were doing.',
  noWorkspaceNote: 'Creating an account does not create a workspace — a workspace is created only when you record your first invention.',
  mfa: { status: 'pending-slot', slotId: 'client MFA policy (§4.1)', source: 'config' },
  primaryCta: { label: 'Create account', emphasis: 'primary' },
};

/* ── Scenario registries ────────────────────────────────────────────────────*/
export const publicHomeScenarios = { ready: { state: 'ready', data: home } as Loaded<PublicHomeVM>, loading: { state: 'loading' } as Loaded<PublicHomeVM> };
export const patentSearchScenarios = {
  ready: { state: 'ready', data: search } as Loaded<PatentSearchVM>,
  stale: { state: 'ready', data: searchStale } as Loaded<PatentSearchVM>,
  empty: { state: 'empty', empty: { teaches: 'No results for "signal conditioning" in the register. Try a broader term, or search by applicant. If you are looking for your own unfiled invention, record it privately in the Vault instead.', action: { verb: 'Record', label: 'Record an invention', emphasis: 'secondary' } } } as Loaded<PatentSearchVM>,
  loading: { state: 'loading' } as Loaded<PatentSearchVM>,
};
export const patentDocumentScenarios = {
  ready: { state: 'ready', data: doc } as Loaded<PatentDocumentVM>,
  sparse: { state: 'ready', data: docSparse } as Loaded<PatentDocumentVM>,
  loading: { state: 'loading' } as Loaded<PatentDocumentVM>,
};
export const stageLandingScenarios = { ready: { state: 'ready', data: stage } as Loaded<StageLandingVM>, loading: { state: 'loading' } as Loaded<StageLandingVM> };
export const segmentLandingScenarios = {
  universities: { state: 'ready', data: segmentUni } as Loaded<SegmentLandingVM>,
  'patent-agents': { state: 'ready', data: segmentAgents } as Loaded<SegmentLandingVM>,
  loading: { state: 'loading' } as Loaded<SegmentLandingVM>,
};
export const pricingScenarios = { ready: { state: 'ready', data: pricing } as Loaded<PricingVM>, loading: { state: 'loading' } as Loaded<PricingVM> };
export const costPlannerScenarios = { ready: { state: 'ready', data: costPlanner } as Loaded<CostPlannerVM>, loading: { state: 'loading' } as Loaded<CostPlannerVM> };
export const findYourPathScenarios = { ready: { state: 'ready', data: findPath } as Loaded<FindYourPathVM>, loading: { state: 'loading' } as Loaded<FindYourPathVM> };
export const guidesScenarios = {
  index: { state: 'ready', data: guidesIndex } as Loaded<GuidesVM>,
  article: { state: 'ready', data: guidesArticle } as Loaded<GuidesVM>,
  loading: { state: 'loading' } as Loaded<GuidesVM>,
};
export const glossaryScenarios = {
  index: { state: 'ready', data: glossaryIndex } as Loaded<GlossaryVM>,
  term: { state: 'ready', data: glossaryTerm } as Loaded<GlossaryVM>,
  loading: { state: 'loading' } as Loaded<GlossaryVM>,
};
export const jurisdictionScenarios = { india: { state: 'ready', data: jurisdiction } as Loaded<JurisdictionGuideVM>, loading: { state: 'loading' } as Loaded<JurisdictionGuideVM> };
export const reportsScenarios = { ready: { state: 'ready', data: report } as Loaded<ReportsVM>, loading: { state: 'loading' } as Loaded<ReportsVM> };
export const agentDirectoryScenarios = { ready: { state: 'ready', data: directory } as Loaded<AgentDirectoryVM>, loading: { state: 'loading' } as Loaded<AgentDirectoryVM> };
export const agentProfileScenarios = {
  ready: { state: 'ready', data: profile } as Loaded<AgentPublicProfileVM>,
  'below-floor': { state: 'ready', data: profileBelowFloor } as Loaded<AgentPublicProfileVM>,
  loading: { state: 'loading' } as Loaded<AgentPublicProfileVM>,
};
export const trustScenarios = {
  ai: { state: 'ready', data: trustAi } as Loaded<TrustPageVM>,
  limitations: { state: 'ready', data: trustLimitations } as Loaded<TrustPageVM>,
  loading: { state: 'loading' } as Loaded<TrustPageVM>,
};
export const companyLegalScenarios = {
  about: { state: 'ready', data: companyAbout } as Loaded<CompanyLegalVM>,
  terms: { state: 'ready', data: legalTerms } as Loaded<CompanyLegalVM>,
  loading: { state: 'loading' } as Loaded<CompanyLegalVM>,
};
export const authScenarios = { 'sign-up': { state: 'ready', data: authSignup } as Loaded<AuthVM>, loading: { state: 'loading' } as Loaded<AuthVM> };
