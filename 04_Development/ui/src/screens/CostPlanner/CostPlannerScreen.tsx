/**
 * ALDASSIST Phase 8 — SC-P07 Cost Planner (B8). Ungated 20-year lifetime-cost projection — honest
 * arithmetic. NEVER gated: no email required (P4:IA-8 / FR-C01). Official fees from the Rules Engine
 * (pending here) via PriceDisplay; entity-type + rule-version basis shown. Rules Engine unavailable →
 * last-known + freshness.
 */
import type { Loaded, CostPlannerVM } from '../../contract';
import { PriceDisplay, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function CostPlannerScreen({ loaded }: { loaded: Loaded<CostPlannerVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['Tools', 'Cost Planner']} />
      <h1>Cost Planner</h1>
      <p className="lock-banner" role="note"><Icon name="info" /> {vm.ungatedNote}</p>
      <h2 className="section-heading">Inputs</h2>
      <dl className="detail-grid">
        {vm.inputs.map((i) => <div className="kv" key={i.id}><dt className="kv__label">{i.label}</dt><dd className="kv__value">{i.note}</dd></div>)}
      </dl>
      <h2 className="section-heading">20-year projection</h2>
      <PriceDisplay price={vm.projection} />
      <p className="text-muted">{vm.entityTypeBasis}</p>
      <p className="text-muted">{vm.ruleVersionBasis}</p>
    </>
  );
}
