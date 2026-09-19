/**
 * ALDASSIST Phase 8 — Public-surface display-label maps (B8). Route-segment → display label, sourced from
 * WP-2 §SC-P04/P05/P11/P14/P15 — none invented (P5:X8). No banned marketing terms (P4:§10.3).
 */
import type { StageKey, SegmentKey, TrustPageKey, CompanyLegalKey } from '../contract';

export const STAGE_LABEL: Record<StageKey, string> = {
  'idea-stage': 'Idea stage',
  'ready-to-file': 'Ready to file',
  'application-pending': 'Application pending',
  'patent-portfolio': 'Patent portfolio',
};

export const SEGMENT_LABEL: Record<SegmentKey, string> = {
  startups: 'Startups',
  companies: 'Companies',
  researchers: 'Researchers',
  inventors: 'Inventors',
  universities: 'Universities',
  'patent-agents': 'Patent agents',
};

export const TRUST_LABEL: Record<TrustPageKey, string> = {
  security: 'Security',
  ai: 'AI policy',
  limitations: 'Limitations',
  subprocessors: 'Subprocessors',
  status: 'Status',
};

export const COMPANY_LEGAL_LABEL: Record<CompanyLegalKey, string> = {
  about: 'About',
  careers: 'Careers',
  contact: 'Contact',
  terms: 'Terms',
  privacy: 'Privacy',
  disclaimer: 'Disclaimer',
};
