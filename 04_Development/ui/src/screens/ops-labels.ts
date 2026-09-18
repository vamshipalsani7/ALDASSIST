/**
 * ALDASSIST Phase 8 — Operations-surface display-label maps (B7). Kept separate from client/agent label
 * files so no batch's label file churns another. Labels are sourced from the frozen WP-2 Ops specs /
 * taxonomy — none invented (P5:X8). Icons reinforce; the text label always carries the meaning (CR-4).
 */
import type { OpsVerificationStatus, DocketQueueKey } from '../contract';
import type { IconName } from '../components';

/** SC-O02 verification states (Unverified → Pending → Verified | Failed). */
export const VERIFICATION_STATUS: Record<OpsVerificationStatus, { label: string; icon: IconName }> = {
  pending: { label: 'Pending verification', icon: 'waiting' },
  verified: { label: 'Verified', icon: 'reviewed' },
  failed: { label: 'Verification failed', icon: 'at-risk' },
};

/** SC-O02 register-check outcomes (unavailable = hold, never auto-approve). */
export const REGISTER_CHECK: Record<'passed' | 'failed' | 'unavailable', { label: string; icon: IconName }> = {
  passed: { label: 'Register check passed', icon: 'success' },
  failed: { label: 'Register check failed', icon: 'at-risk' },
  unavailable: { label: 'Register check unavailable — on hold', icon: 'blocked' },
};

/** SC-O01 the four fixed Docket-Health queues (WP-2 §SC-O01). */
export const DOCKET_QUEUE: Record<DocketQueueKey, string> = {
  unconfirmed: 'Unconfirmed critical deadlines',
  discrepancies: 'Source discrepancies',
  undelivered: 'Undelivered critical notifications',
  escalations: 'Escalations',
};

/** SC-O03 golden-case / rule-version status. */
export const GOLDEN_RESULT: Record<'pass' | 'fail', { label: string; icon: IconName }> = {
  pass: { label: 'Pass', icon: 'success' },
  fail: { label: 'Fail', icon: 'at-risk' },
};
export const RULE_VERSION_STATUS: Record<'draft' | 'published', { label: string; icon: IconName }> = {
  draft: { label: 'Draft', icon: 'waiting' },
  published: { label: 'Published', icon: 'success' },
};
