/**
 * ALDASSIST Phase 8 — SC-P11 Jurisdiction guide (B8). MVP: India + PCT only. Process / timelines / fee
 * structure (from the Rules Engine — pending here via PriceDisplay) / common pitfalls. Figures derive from
 * the Rules Engine, not hand-authored (P4:§24.2).
 */
import type { Loaded, JurisdictionGuideVM } from '../../contract';
import { PriceDisplay } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function JurisdictionGuideScreen({ loaded }: { loaded: Loaded<JurisdictionGuideVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['Learn', 'Jurisdictions', vm.jurisdiction]} />
      <h1>{vm.jurisdiction}</h1>
      <h2 className="section-heading">Process</h2>
      <p>{vm.processOverview}</p>
      <h2 className="section-heading">Timelines</h2>
      <ul className="version-list">
        {vm.timelines.map((t) => <li className="version" key={t.label}><span className="version__id">{t.label}</span><span className="text-muted">{t.note}</span></li>)}
      </ul>
      <h2 className="section-heading">Fee structure</h2>
      <PriceDisplay price={vm.feeStructure} />
      <h2 className="section-heading">Common pitfalls</h2>
      <ul>{vm.pitfalls.map((p, i) => <li key={i}>{p}</li>)}</ul>
    </>
  );
}
