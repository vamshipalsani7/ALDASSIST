/**
 * ALDASSIST Phase 8 — AssertionView (CR-6 fail-closed). Renders a single evidence assertion.
 * A `verified` assertion is presented as established ONLY after its citation has resolved through the
 * resolver port. While resolving it is shown neutrally (not established); if resolution fails it is shown
 * as UNVERIFIED. It never renders as established on the strength of an unresolved citation.
 */
import type { Assertion } from '../contract';
import { useResolvedCitation } from './useResolvedCitation';
import { ProvenanceCitation } from './ProvenanceCitation';
import { Icon } from './Icon';

export function AssertionView({ assertion }: { assertion: Assertion }) {
  const citation = assertion.kind === 'verified' ? assertion.citation : undefined;
  const resolution = useResolvedCitation(citation);

  // Unverified by contract, OR verified-but-unresolved → NOT established (fail-closed).
  if (assertion.kind === 'unverified' || resolution === null) {
    return (
      <p className="assertion assertion--unverified">
        {assertion.text}{' '}
        <span className="assertion__unverified-mark">
          <Icon name="blocked" size={14} /> Unverified — not shown as an established fact
        </span>
      </p>
    );
  }

  // Resolution in flight — do not present as verified yet.
  if (resolution === 'pending') {
    return (
      <p className="assertion">
        {assertion.text} <span className="assertion__pending">Verifying source…</span>
      </p>
    );
  }

  // Resolved — present as established, with the primary citation affordance.
  return (
    <p className="assertion">
      {assertion.text} <ProvenanceCitation citation={assertion.citation} resolved={resolution} />
    </p>
  );
}
