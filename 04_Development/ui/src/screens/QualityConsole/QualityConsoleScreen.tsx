/**
 * ALDASSIST Phase 8 — SC-O04 Quality & Review Console (B7). Where OP-6 is measured. The OP-6 target,
 * must-hold threshold and the three-clause "material" definition are displayed EXACTLY as sourced from
 * Metrics.md / D-2026-018 — never invented. The VALIDATION STEP ("validated against real diffs during
 * measurement design") remains a pending SLOT. Current metric values are pending (Phase 9 measurement);
 * sparse data is honest. No silent capability drift: a T2 change needs an eval + a recorded approval.
 */
import type { Loaded, QualityConsoleVM, SlotValue } from '../../contract';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

function value(s: SlotValue<string>): string {
  if (s.status === 'resolved') return s.value;
  if (s.status === 'pending-slot') return 'not yet measured';
  return 'temporarily unavailable';
}

export function QualityConsoleScreen({ loaded }: { loaded: Loaded<QualityConsoleVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const op6 = vm.op6;

  return (
    <>
      <Breadcrumbs trail={['Quality']} />
      <h1>Quality &amp; Review</h1>

      <section>
        <h2 className="section-heading">OP-6 — {op6.metricName}</h2>
        <dl className="detail-grid">
          <div className="kv"><dt className="kv__label">Formula</dt><dd className="kv__value">{op6.formula}</dd></div>
          <div className="kv"><dt className="kv__label">Target</dt><dd className="kv__value">{op6.target}</dd></div>
          <div className="kv"><dt className="kv__label">Must-hold threshold</dt><dd className="kv__value">{op6.mustHoldThreshold}</dd></div>
        </dl>
        <h3 className="section-heading">A "material" edit is one that…</h3>
        <ul>
          {op6.materialClauses.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
        <p className="text-muted">{op6.nonMaterialNote}</p>
        <p className="text-muted">{op6.provenanceRule}</p>
        <p className="lock-banner" role="note">
          Validation: {op6.validation.status === 'resolved'
            ? op6.validation.value
            : 'the material-diff validation step is not yet defined — it will appear here once set (D-2026-018).'}
        </p>
      </section>

      <section>
        <h2 className="section-heading">Quality metrics</h2>
        <dl className="detail-grid">
          {vm.metrics.map((m) => (
            <div className="kv" key={m.key}>
              <dt className="kv__label">{m.label}</dt>
              <dd className="kv__value">{value(m.value)} <span className="text-muted">— {m.definitionNote}</span></dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="section-heading">Review sampling queue</h2>
        <ul className="version-list">
          {vm.samplingQueue.map((s) => (
            <li className="version" key={s.id}><span className="version__id">{s.label}</span><span className="text-muted">{s.note}</span></li>
          ))}
          {vm.samplingQueue.length === 0 && <li className="text-muted">No samples queued.</li>}
        </ul>
      </section>

      <p className="lock-banner" role="status">{vm.capabilityDriftNote}</p>
    </>
  );
}
