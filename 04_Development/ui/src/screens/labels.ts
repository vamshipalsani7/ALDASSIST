/**
 * ALDASSIST Phase 8 — shared display-label maps for Client screens (B2).
 * Lifecycle labels come from the frozen object taxonomy — no invented states (P5:X8). Icons are
 * decorative reinforcement; the text label always carries the meaning (CR-4).
 */
import type { InventionLifecycle, AssessmentLifecycle, VerdictLabel, DeadlineState, MatterLifecycle, NotificationClass } from '../contract';
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

/** Deadline state axis (P4:§11.5) — the enumerated frozen set. Icon + text, never colour-only (CR-4). */
export const DEADLINE_STATE_CHIP: Record<DeadlineState, { label: string; icon: IconName }> = {
  upcoming: { label: 'Upcoming', icon: 'waiting' },
  approaching: { label: 'Approaching', icon: 'waiting' },
  due: { label: 'Due', icon: 'action-needed' },
  confirmed: { label: 'Confirmed', icon: 'success' },
  met: { label: 'Met', icon: 'success' },
  missed: { label: 'Missed', icon: 'at-risk' },
  superseded: { label: 'Superseded', icon: 'info' },
  na: { label: 'N/A', icon: 'info' },
};

/** Matter lifecycle (P4:§11.4) — the enumerated frozen set. Icon + text, never colour-only (CR-4). */
export const MATTER_CHIP: Record<MatterLifecycle, { label: string; icon: IconName }> = {
  quoted: { label: 'Quoted', icon: 'info' },
  engaged: { label: 'Engaged', icon: 'success' },
  'in-progress': { label: 'In progress', icon: 'waiting' },
  'awaiting-you': { label: 'Awaiting you', icon: 'action-needed' },
  'awaiting-the-office': { label: 'Awaiting the office', icon: 'waiting' },
  complete: { label: 'Complete', icon: 'success' },
  closed: { label: 'Closed', icon: 'info' },
};

/** Notification classes in their FIXED display order (P4:§18.2), with labels + icons. Grouped by class,
 * never chronologically. Critical is unmutable / undismissable-without-action (enforced by the screen). */
export const NOTIFICATION_CLASS_ORDER: NotificationClass[] = [
  'critical', 'action-required', 'progress', 'informational', 'proactive-reassurance',
];
export const NOTIFICATION_CLASS: Record<NotificationClass, { label: string; icon: IconName }> = {
  critical: { label: 'Critical', icon: 'at-risk' },
  'action-required': { label: 'Action required', icon: 'action-needed' },
  progress: { label: 'Progress', icon: 'waiting' },
  informational: { label: 'Informational', icon: 'info' },
  'proactive-reassurance': { label: 'Reassurance', icon: 'on-track' },
};
