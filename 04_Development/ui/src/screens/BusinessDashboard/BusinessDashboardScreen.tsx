/**
 * ALDASSIST Phase 8 — SC-O05 Business metrics dashboard (B7). The headline metrics, with definitions,
 * formulas, targets and thresholds transcribed EXACTLY from Metrics.md (canonical). Current VALUES are
 * pending (measurement is Phase 9) — sparse data is shown honestly, never fabricated (CR-19); there are no
 * invented figures and no fabricated charts. OP-2's target stays UNCALIBRATED (pending). OP-5 keeps its
 * required split: platform-attributable (target zero; each a Sev-1 incident) vs total operational (no zero
 * bar). Money, where shown elsewhere, renders only through PriceDisplay; O-2026-001 stays open.
 */
import type { Loaded, BusinessDashboardVM, BusinessMetricVM, SlotValue } from '../../contract';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

function slot(s: SlotValue<string>, pendingText: string): string {
  if (s.status === 'resolved') return s.value;
  if (s.status === 'pending-slot') return pendingText;
  return 'temporarily unavailable';
}

function Metric({ m }: { m: BusinessMetricVM }) {
  return (
    <div className="four-cell__cell">
      <span className="four-cell__label">{m.id}</span>
      <strong>{m.name}</strong>
      <span className="text-muted">{m.formula}</span>
      <span>Current: {slot(m.value, 'not yet measured')}</span>
      <span>Target: {slot(m.target, 'uncalibrated — not yet set')}</span>
      {m.threshold && <span className="text-muted">Threshold: {m.threshold}</span>}
      {m.note && <span className="text-muted">{m.note}</span>}
    </div>
  );
}

export function BusinessDashboardScreen({ loaded }: { loaded: Loaded<BusinessDashboardVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Business']} />
      <h1>Business metrics</h1>
      <p className="text-muted">{vm.definitionsNote}</p>

      <h2 className="section-heading">Headline</h2>
      <div className="four-cell">
        {vm.headline.map((m) => <Metric m={m} key={m.id} />)}
      </div>

      <h2 className="section-heading">OP-5 — Missed deadlines (split)</h2>
      <div className="four-cell">
        <Metric m={vm.op5.platformAttributable} />
        <Metric m={vm.op5.totalOperational} />
      </div>

      <h2 className="section-heading">Additional</h2>
      <div className="four-cell">
        {vm.additional.map((m) => <Metric m={m} key={m.id} />)}
      </div>
    </>
  );
}
