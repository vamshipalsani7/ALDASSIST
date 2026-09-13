/**
 * ALDASSIST Phase 8 — Confidence indicator (Catalogue 4.4). Confidence is shown WITH its basis, never
 * as a bare number, never colour-only, and NEVER styled to look like a legal determination (AP-05/AP-08).
 * The scale/threshold is an unfilled SLOT (S-2) — the presentation contract is honoured; no scale invented.
 */
import type { ConfidenceVM } from '../contract';

export function ConfidenceIndicator({ confidence }: { confidence: ConfidenceVM }) {
  return (
    <div className="confidence">
      <span className="confidence__label">Confidence — with its basis</span>
      <span>{confidence.basisText}</span>
      {confidence.scale.status === 'pending-slot' && (
        <span className="confidence__slot">
          Confidence scale: not yet calibrated ({confidence.scale.slotId}). A measured representation appears here once set.
        </span>
      )}
      {confidence.scale.status === 'resolved' && (
        <span className="confidence__slot">
          {confidence.scale.value.level} of {confidence.scale.value.of}
        </span>
      )}
      {confidence.scale.status === 'unavailable' && (
        <span className="confidence__slot">Confidence scale temporarily unavailable.</span>
      )}
    </div>
  );
}
