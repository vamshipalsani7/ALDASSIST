/**
 * ALDASSIST Phase 8 — shared display-label maps for Client screens (B2).
 * Lifecycle labels come from the frozen object taxonomy — no invented states (P5:X8). Icons are
 * decorative reinforcement; the text label always carries the meaning (CR-4).
 */
import type { InventionLifecycle, AssessmentLifecycle, VerdictLabel } from '../contract';
import type { IconName } from '../components';

export const INVENTION_CHIP: Record<InventionLifecycle, { label: string; icon: IconName }> = {
  drafting: { label: 'Drafting', icon: 'waiting' },
  recorded: { label: 'Recorded', icon: 'on-track' },
  assessing: { label: 'Assessing', icon: 'waiting' },
  assessed: { label: 'Assessed', icon: 'success' },
  filing: { label: 'Filing', icon: 'waiting' },
  protected: { label: 'Protected', icon: 'success' },
  'not-pursued': { label: 'Not pursued', icon: 'info' },
  lapsed: { label: 'Lapsed', icon: 'info' },
};

export const ASSESSMENT_CHIP: Record<AssessmentLifecycle, { label: string; icon: IconName }> = {
  requested: { label: 'Requested', icon: 'waiting' },
  analysing: { label: 'Analysing', icon: 'waiting' },
  'in-review': { label: 'In review', icon: 'waiting' },
  released: { label: 'Released', icon: 'success' },
  decided: { label: 'Decided', icon: 'success' },
};

export const VERDICT_LABEL: Record<VerdictLabel, string> = {
  'looks-protectable': 'Looks protectable',
  'protectable-with-changes': 'Protectable with changes',
  'unlikely-to-be-protectable': 'Unlikely to be protectable',
  'not-enough-to-assess': 'Not enough to assess',
};
