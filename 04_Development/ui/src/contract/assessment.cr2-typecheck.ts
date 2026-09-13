/**
 * CR-2 — compile-time guard (validated by `tsc --noEmit`, not run by Vitest; the file name intentionally
 * does not match the test glob). Proves the `released` AssessmentVM branch cannot carry a header whose
 * lifecycle contradicts `released` — the review gate is enforced by the type, not only at runtime.
 */
import type { AssessmentVM, ObjectHeaderVM, VerdictVM, PostReleaseLifecycle } from './index';

declare const releasedHeader: ObjectHeaderVM<'released'>;
declare const analysingHeader: ObjectHeaderVM<'analysing'>;
declare const verdict: VerdictVM;

// Valid: a released assessment with a released-lifecycle header.
const ok: Extract<AssessmentVM, { status: 'released' }> = {
  status: 'released',
  header: releasedHeader,
  releasedAt: '2026-01-01T00:00:00Z',
  verdict,
};

// The released branch's header type rejects a pre-release lifecycle:
// @ts-expect-error CR-2: a released assessment's header lifecycle cannot be 'analysing'.
const badHeader: ObjectHeaderVM<PostReleaseLifecycle> = analysingHeader;

export const __cr2_typecheck = [ok, badHeader];
