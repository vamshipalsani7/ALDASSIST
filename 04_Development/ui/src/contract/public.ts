/**
 * ALDASSIST Phase 8 — contract: Public surface (`/`) view-models (B8). Screens SC-P01…P16.
 *
 * Grounded in the FROZEN specs (no invention): WP-2 §SC-P01…P16, Glossary.md (dual-register), Metrics/
 * D-2026-019 (agent stats). Governance encoded structurally:
 *  - CR-15 / O-2026-001: money renders ONLY through PriceDisplay; official fees separately identifiable;
 *    the rendering mode stays a SLOT (component primary, both modes). Applies to Pricing, Cost Planner,
 *    Find-your-path range, stage-landing cost, agent professional fee.
 *  - CR-19: Rules-Engine fee/timeline figures, the find-your-path cost range, and agent confidence are
 *    SLOTs/containers — never invented. No banned marketing terms ("affordable/cheap/starting from ₹X").
 *  - CR-6: register data carries source + freshness PER FIELD; the AI plain-language summary is LABELLED
 *    AI (Authorship), distinct from register/human content.
 *  - CR-21 / D-2026-019: agent outcome stats only at n≥20 with sample size + confidence; below → "not
 *    enough data yet" (reuses AgentStatsVM). Publication go-live is L3-gated (LegalContentSlot).
 *  - CR-16: "Agent Matching / Engagement", never "Marketplace"; no licensing-marketplace messaging.
 *  - Zone-2: public register search is distinct from Zone-1 app search; FR-S11 own-invention → Vault.
 *  - Legal wording (L1 / L1-04 / L1-20 / L4) is a LegalContentSlot container — counsel-owned, never authored.
 *  - A1: sign-up creates NO Workspace; client MFA policy is a SLOT.
 *  The SSR/SSG rendering strategy is NOT modelled here — these are fixture-driven view-models like B1–B7.
 */
import type {
  SlotValue, LegalContentSlot, FreshnessStamp, Authorship, Citation, TabRef, IsoDate,
} from './primitives';
import type { PriceDisplayVM } from './matters';
import type { AgentStatsVM } from './matters';

/** Public call-to-action. `gated` marks an action that requires an account (routes to SC-P16). */
export interface PublicCtaVM { label: string; emphasis: 'primary' | 'secondary'; gated?: boolean }

/* ── SC-P01 · Public Home ───────────────────────────────────────────────────*/
export interface PublicHomeVM {
  hero: { headline: string; sub: string; primaryCta: PublicCtaVM; secondaryCta: PublicCtaVM };
  layers: { title: string; body: string }[]; // Record · Judgement · Work
  proof: { label: string }[]; // verifiable artifacts, NOT testimonial carousels
  pathFinder: PublicCtaVM;
  footerTrustLinks: { label: string }[];
}

/* ── SC-P02 · Patent Search (Zone-2 register search) ────────────────────────*/
export interface FacetVM { id: string; label: string; options: { label: string; count: number }[] }
export interface PatentResultRowVM {
  id: string;
  number: string;
  jurisdiction: string;
  title: string; // register title (public)
  applicant: string;
  legalStatus: string; // register legal status (sourced string)
  freshness: FreshnessStamp; // source + freshness (FR-S05)
}
export interface PatentSearchVM {
  query: string;
  facets: FacetVM[]; // jurisdiction/date/applicant/inventor/classification/legal status
  results: PatentResultRowVM[];
  confidentialityNotice: string; // FR-S11
  ownInventionWarning?: string; // FR-S11 — routes suspected own invention to the Vault
  freshness: FreshnessStamp; // overall source/freshness
  saveSearch: PublicCtaVM; // gated (Free account)
}

/* ── SC-P03 · Patent Document page ★ (SEO crown-jewel) ──────────────────────*/
export interface StatusEventVM { event: string; date: IsoDate; freshness: FreshnessStamp }
export interface FamilyMemberVM { number: string; jurisdiction: string; relation: string }
export interface PatentDocumentVM {
  header: { number: string; jurisdiction: string; title: string; applicant: string; inventors: string; filingDate: IsoDate; kind: string };
  tabs: TabRef[]; // overview · claims · description · status · family · citations · documents
  /** Tier-0 AI plain-language summary — LABELLED AI (Authorship), distinct from register content. */
  aiSummary: { authorship: Extract<Authorship, { by: 'ai' }>; text: string };
  claims: string[];
  description: string;
  statusTimeline: StatusEventVM[]; // source + freshness per entry
  family: FamilyMemberVM[];
  citations: { cites: { number: string; jurisdiction: string }[]; citedBy: { number: string; jurisdiction: string }[] };
  documents: { label: string }[];
  sparseNote: string; // missing fields shown as "not available from the register"
  ownInventionWarning?: string; // FR-S11 → Vault
  saveAlert: PublicCtaVM; // gated
  citation?: Citation; // optional register-source provenance affordance (CR-6), when present
}

/* ── SC-P04 · Stage landings (grouped) ──────────────────────────────────────*/
export type StageKey = 'idea-stage' | 'ready-to-file' | 'application-pending' | 'patent-portfolio';
export interface StageLandingVM {
  stage: StageKey;
  framing: string;
  whatHappens: string;
  cost: PriceDisplayVM; // price reference via PriceDisplay (container)
  nextStep: PublicCtaVM;
}

/* ── SC-P05 · Segment landings (grouped) ────────────────────────────────────*/
export type SegmentKey = 'startups' | 'companies' | 'researchers' | 'inventors' | 'universities' | 'patent-agents';
export interface SegmentLandingVM {
  segment: SegmentKey;
  framing: string;
  capabilities: string[];
  cta: PublicCtaVM; // Start free (client) / value-prop (agent)
  pricingPointer: PublicCtaVM;
  note?: string; // e.g. universities → client-app researcher access, NOT the V2 institution module
}

/* ── SC-P06 · Pricing (L1) ──────────────────────────────────────────────────*/
export interface PricingVM {
  catalogue: { service: string; price: PriceDisplayVM }[]; // fixed-price catalogue; official fees separable
  varianceNote: string; // honest "what affects price" — no "affordable/cheap/starting from"
  entityTypeNote: string; // official fees by entity type
  renderingNote: string; // component mode primary; O-2026-001 stays OPEN (a SLOT), never decided in copy
}

/* ── SC-P07 · Cost Planner (L1, ungated) ────────────────────────────────────*/
export interface CostPlannerVM {
  inputs: { id: string; label: string; note: string }[];
  projection: PriceDisplayVM; // live 20-year projection — amounts are pending slots (Rules Engine)
  entityTypeBasis: string;
  ruleVersionBasis: string;
  ungatedNote: string; // never gated — no email required (FR-C01)
}

/* ── SC-P08 · Find-your-path router ─────────────────────────────────────────*/
export interface FindYourPathVM {
  questions: { id: string; prompt: string; options: { label: string }[] }[];
  recommendation: { label: string; note: string; cta: PublicCtaVM };
  costRange: SlotValue<string>; // a real range or a SLOT — never a fabricated figure
  noEmailNote: string; // no email required
}

/* ── SC-P09 · Learn — guides (grouped: index + article) ─────────────────────*/
export interface GuidesVM {
  mode: 'index' | 'article';
  index?: { items: { slug: string; title: string; summary: string }[] };
  article?: {
    title: string;
    toc: { id: string; label: string }[];
    body: string;
    related: { label: string }[];
    glossaryLinks: { term: string }[]; // auto-links to the shared glossary record
    figuresNote: string; // fee/timeline figures derive from the Rules Engine, not hand-authored
  };
}

/* ── SC-P10 · Glossary (grouped: index + term) — shares the tooltip record ───*/
export interface GlossaryVM {
  mode: 'index' | 'term';
  index?: { terms: { slug: string; term: string; plain: string }[] };
  term?: {
    term: string;
    plainLanguage: string; // dual-register: plain-language …
    termOfArt: string; // … and term-of-art definition
    usage: string;
    related: { term: string }[];
    jurisdiction: string;
    sharedRecordNote: string; // rendered from the same record as in-product tooltips — cannot diverge
  };
}

/* ── SC-P11 · Jurisdiction guide (India / PCT only for MVP) ──────────────────*/
export interface JurisdictionGuideVM {
  jurisdiction: 'India' | 'PCT';
  processOverview: string;
  timelines: { label: string; note: string }[];
  feeStructure: PriceDisplayVM; // from the Rules Engine — amounts pending (container)
  pitfalls: string[];
}

/* ── SC-P12 · Reports ───────────────────────────────────────────────────────*/
export interface ReportsVM {
  title: string;
  methodology: string;
  data: { label: string; value: string }[]; // no unverifiable statistic as a headline
  findings: string[];
  publicationDate: IsoDate;
}

/* ── SC-P13 · Public agent directory + profile (L1) ─────────────────────────*/
export interface AgentDirectoryRowVM {
  slug: string;
  name: string;
  specializations: string[];
  jurisdiction: string;
  stats: AgentStatsVM; // n≥20 published(+confidence SLOT) | below-floor "not enough data yet"
}
export interface AgentDirectoryVM {
  agents: AgentDirectoryRowVM[];
  filters: { id: string; label: string }[];
}
export interface AgentPublicProfileVM {
  slug: string;
  name: string;
  credentials: string; // verified credentials
  background: string;
  specializations: string[];
  jurisdiction: string;
  languages: string[];
  stats: AgentStatsVM;
  professionalFee: LegalContentSlot; // professional-fee display governed by L1-04 (container)
  publicationGate: LegalContentSlot; // published outcome stats go-live is L3-gated
  engage: PublicCtaVM; // gated (account + Owner downstream)
}

/* ── SC-P14 · Trust pages (grouped) ─────────────────────────────────────────*/
export type TrustPageKey = 'security' | 'ai' | 'limitations' | 'subprocessors' | 'status';
export interface TrustPageVM {
  page: TrustPageKey;
  title: string;
  sections: { heading: string; body: string }[];
  providersNamed?: string[]; // ai page — model providers named publicly
  blindSpotNote?: string; // limitations page — the 18-month blind spot, stated honestly
  legalWording: LegalContentSlot; // L4 privilege/disclaimer wording — counsel container
}

/* ── SC-P15 · Company + Legal (grouped) ─────────────────────────────────────*/
export type CompanyLegalKey = 'about' | 'careers' | 'contact' | 'terms' | 'privacy' | 'disclaimer';
export interface CompanyLegalVM {
  page: CompanyLegalKey;
  title: string;
  body: string;
  legalWording: LegalContentSlot; // L1-20 (terms) / L4 — counsel container; empty for non-legal pages
}

/* ── SC-P16 · Account creation & sign-in ────────────────────────────────────*/
export interface AuthVM {
  mode: 'sign-up' | 'sign-in' | 'verify';
  emailNote: string;
  verificationNote: string;
  noPhoneNote: string; // no phone, no sales contact
  returnToActionNote: string; // returns to the action being attempted (F2)
  noWorkspaceNote: string; // NO Workspace created here (A1)
  mfa: SlotValue<string>; // client MFA policy — a SLOT (agent/internal MFA is fixed)
  primaryCta: PublicCtaVM;
}
