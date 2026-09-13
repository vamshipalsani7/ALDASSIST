/**
 * ALDASSIST Phase 8 — Provenance citation affordance (Catalogue 4.1). A PRIMARY, first-class element —
 * never a superscript, never hover-only, never colour-only (CR-6). Descriptive accessible name.
 *
 * Fail-closed usage: an assertion is only presented WITH this affordance once its passage has already
 * resolved (see AssertionView / useResolvedCitation). When the caller passes the already-`resolved`
 * passage, the panel shows it directly. A `resolved` is NOT required for the standalone component demo,
 * where it resolves on open as a convenience.
 */
import { useState } from 'react';
import type { Citation, ResolvedPassage } from '../contract';
import { Icon } from './Icon';
import { CitationPanel } from './CitationPanel';
import { useCitationResolver } from './CitationResolverContext';

export function ProvenanceCitation({ citation, resolved }: { citation: Citation; resolved?: ResolvedPassage }) {
  const resolver = useCitationResolver();
  const [open, setOpen] = useState(false);
  const [passage, setPassage] = useState<ResolvedPassage | null>(resolved ?? null);
  const [resolving, setResolving] = useState(false);

  async function openPanel() {
    setOpen(true);
    if (passage) return; // already have it (caller pre-resolved)
    setResolving(true);
    const p = await resolver.resolve(citation.passage);
    setPassage(p);
    setResolving(false);
  }

  return (
    <>
      <button className="citation" onClick={openPanel} aria-haspopup="dialog" aria-label={`Open ${citation.accessibleName}`}>
        <span className="citation__icon">
          <Icon name="provenance" size={14} />
        </span>
        <span>{citation.accessibleName}</span>
      </button>
      <CitationPanel open={open} onClose={() => setOpen(false)} title={citation.accessibleName}>
        {resolving && <p style={{ margin: 0 }}>Resolving the cited passage…</p>}
        {!resolving && !passage && (
          <div className="dialog__passage">
            <p className="assertion__unverified-mark" style={{ margin: 0 }}>
              <Icon name="blocked" size={14} /> This source could not be resolved and is not shown as verified.
            </p>
          </div>
        )}
        {passage && (
          <div className="dialog__passage">
            <p style={{ margin: 0 }}>
              Source: <span className="mono">{passage.documentId}</span> · {passage.locator} · {passage.sourceLabel}
            </p>
            <p style={{ marginTop: 'var(--space-3)', marginBottom: 0 }}>“{passage.excerpt}”</p>
            <p style={{ marginTop: 'var(--space-3)', marginBottom: 0, color: 'var(--color-text-muted)' }}>
              Demo fixture — synthetic passage; no register content is embedded.
            </p>
          </div>
        )}
      </CitationPanel>
    </>
  );
}
