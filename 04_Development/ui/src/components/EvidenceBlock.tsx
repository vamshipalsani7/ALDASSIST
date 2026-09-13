/**
 * ALDASSIST Phase 8 — Evidence block (Catalogue 4.2, depth 3). Cited passages, reference list, coverage.
 * Each assertion is rendered through AssertionView, which is CR-6 fail-closed: a `verified` assertion is
 * presented as established only after its citation resolves; otherwise it renders as unverified. The
 * coverage statement is always visible (never collapsed by default on an unfavourable verdict).
 */
import type { EvidenceVM } from '../contract';
import { AssertionView } from './AssertionView';

export function EvidenceBlock({ evidence }: { evidence: EvidenceVM }) {
  return (
    <div className="evidence-block">
      <h4>Evidence</h4>
      {evidence.assertions.map((a, i) => (
        <AssertionView key={i} assertion={a} />
      ))}

      <div>
        <h4 style={{ marginTop: 'var(--space-4)' }}>References</h4>
        <ul style={{ margin: 0, paddingLeft: 'var(--space-6)' }}>
          {evidence.referenceList.map((r) => (
            <li key={r.id}>
              <span className="mono">{r.id}</span> — {r.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Coverage statement — always visible (never collapsed by default). */}
      <div className="evidence-block__coverage">
        <strong>Coverage.</strong> {evidence.coverageStatement}
        <p style={{ marginTop: 'var(--space-3)', marginBottom: 0 }}>{evidence.blindSpotNotice}</p>
      </div>
    </div>
  );
}
