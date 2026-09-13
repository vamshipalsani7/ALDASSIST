/**
 * ALDASSIST Phase 8 — ReferenceView (CR-6 fail-closed for depth-2 evidentiary references).
 * A depth-2 reference offered WITH a citation is presented as supported only after that citation resolves;
 * if it fails to resolve it is marked Unverified. A reference with no citation is plain AI-analysis and
 * makes no verified claim.
 */
import type { ReasoningElement } from '../contract';
import { useResolvedCitation } from './useResolvedCitation';
import { ProvenanceCitation } from './ProvenanceCitation';
import { Icon } from './Icon';

type Reference = ReasoningElement['references'][number];

export function ReferenceView({ reference }: { reference: Reference }) {
  const resolution = useResolvedCitation(reference.citation);
  return (
    <li>
      <span className="mono">{reference.label}</span> — {reference.why}
      {reference.citation && resolution === 'pending' && <span className="assertion__pending"> · Verifying source…</span>}
      {reference.citation && resolution === null && (
        <span className="assertion__unverified-mark">
          {' '}
          <Icon name="blocked" size={14} /> Unverified
        </span>
      )}
      {reference.citation && resolution !== 'pending' && resolution !== null && (
        <>
          {' '}
          <ProvenanceCitation citation={reference.citation} resolved={resolution} />
        </>
      )}
    </li>
  );
}
