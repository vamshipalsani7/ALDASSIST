/**
 * ALDASSIST Phase 8 — shared AI-authorship marker (B9 cross-cutting hardening).
 *
 * Centralises the single most trust-critical label — the "AI-generated" marker (CR-6 / IP-07) — so it
 * renders identically across every surface (Client / Agent / Operations / Public) instead of being
 * duplicated inline. Its human-authored counterpart is already centralised as `HumanReviewIndicator`;
 * this closes the gap on the AI side.
 *
 * Faithful to the existing markup — reuses the existing `.ai-marker` / `.ai-marker__label` classes and
 * adds NO new CSS or tokens:
 *   • inline (default): the labelled badge span alone — for an authorship cell in a list/table.
 *   • block: the bordered `.ai-marker` container wrapping AI-authored content + the badge.
 *
 * The `label` is a per-context descriptor (e.g. "AI-generated", "AI-generated analysis"). B9 preserves
 * each call site's existing wording verbatim — the copy is a prop, never normalised for uniformity.
 *
 * NOTE (governance): a "Tier-1 completeness check" banner is NOT an authorship marker and is intentionally
 * out of scope for this component (it stays as authored on DisclosureCapture).
 */
import type { ReactNode } from 'react';

export function AiAuthorshipMarker({
  label = 'AI-generated',
  block = false,
  children,
}: {
  /** Per-context descriptor; existing wording is preserved, never changed for uniformity. */
  label?: string;
  /** true → bordered `.ai-marker` container wrapping AI content; false → the inline badge alone. */
  block?: boolean;
  children?: ReactNode;
}) {
  const badge = <span className="ai-marker__label">{label}</span>;
  if (!block) return badge;
  return (
    <div className="ai-marker">
      {badge}
      {children}
    </div>
  );
}
