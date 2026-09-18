/**
 * ALDASSIST Phase 8 — agent-surface display-label maps (B6). Kept separate from the client `labels.ts`
 * so neither batch's label file churns the other. Labels are sourced from the frozen WP-2 agent specs /
 * taxonomy — none invented (P5:X8). Icons reinforce; the text label always carries the meaning (CR-4).
 */
import type { VerificationStatus, ReviewDecisionType } from '../contract';
import type { IconName } from '../components';

/** SC-A00 verification states (WP-2 §SC-A00: submitted/pending · verified · failed). */
export const VERIFICATION_STATUS: Record<VerificationStatus, { label: string; icon: IconName }> = {
  'not-submitted': { label: 'Not submitted', icon: 'info' },
  pending: { label: 'Pending verification', icon: 'waiting' },
  verified: { label: 'Verified', icon: 'reviewed' },
  failed: { label: 'Verification failed', icon: 'at-risk' },
};

/** SC-A07 review-decision affordances (release / inconclusive / decline-return). */
export const REVIEW_DECISION: Record<ReviewDecisionType, { label: string; icon: IconName }> = {
  release: { label: 'Release to client', icon: 'reviewed' },
  inconclusive: { label: 'Mark inconclusive', icon: 'info' },
  return: { label: 'Decline / return to queue', icon: 'blocked' },
};

/** SC-A03 matter source tag (platform-engaged vs imported own practice). */
export const MATTER_SOURCE: Record<'platform' | 'own', string> = {
  platform: 'Platform',
  own: 'Own practice',
};
