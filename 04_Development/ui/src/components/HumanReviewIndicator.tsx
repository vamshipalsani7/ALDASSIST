/**
 * ALDASSIST Phase 8 — Human-review indicator (Catalogue 4.3). Visual proof the mandatory review gate
 * was met (BR-01/CR-2). Appears ONLY on Released; names the accountable Verified Agent + release date.
 * Not a decorative trust badge.
 */
import { Icon } from './Icon';

export function HumanReviewIndicator({ reviewerName, releasedAt }: { reviewerName: string; releasedAt: string }) {
  const date = new Date(releasedAt);
  const formatted = isNaN(date.getTime()) ? releasedAt : date.toISOString().slice(0, 10);
  return (
    <span className="review-seal">
      <span className="review-seal__icon">
        <Icon name="reviewed" />
      </span>
      <span>
        Reviewed and released by {reviewerName} · <span className="mono">{formatted}</span>
      </span>
    </span>
  );
}
