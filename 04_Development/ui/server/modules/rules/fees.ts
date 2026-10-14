/**
 * ALDASSIST Phase 9 — B5a: minimal pure fee helpers (owner authorization D5-M / D5-M-A).
 *
 * Fee DATA lives in Zone-2 `rules.fee_schedule` (see ruleData.readFee). These helpers compute only the
 * excess-claim / excess-page count and the resulting excess fee for the authorized B3 scope — deterministic,
 * jurisdiction-agnostic, and driven entirely by the authoritative fee datum's `basis`. No pricing, no
 * Rule-138 fee, no tiering logic beyond what the caller selects (tier is chosen upstream).
 */
import type { FeeItem } from './types';

/** The §First-Schedule excess threshold implied by a per-unit fee basis (10 claims / 30 pages). */
export function thresholdForBasis(basis: FeeItem['basis']): number {
  if (basis === 'per_claim_over_10') return 10;
  if (basis === 'per_page_over_30') return 30;
  return 0; // 'flat' / 'per_month' have no count threshold
}

/** Count of units beyond the threshold (never negative). */
export function excessOverThreshold(count: number, threshold: number): number {
  return Math.max(0, Math.trunc(count) - threshold);
}

/** Excess fee (INR) for a per-claim/per-page fee datum given an actual count. Deterministic. */
export function excessFeeForItem(fee: FeeItem, count: number): number {
  const threshold = thresholdForBasis(fee.basis);
  if (threshold === 0) return 0;
  return excessOverThreshold(count, threshold) * fee.amountInr;
}
