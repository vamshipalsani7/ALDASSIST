/**
 * ALDASSIST Phase 8 — SC-P12 Reports (B8). Original research, built for citation. No unverifiable statistic
 * as a headline (P4:§23.5). Title · methodology · data · findings · publication date.
 */
import type { Loaded, ReportsVM } from '../../contract';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function ReportsScreen({ loaded }: { loaded: Loaded<ReportsVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['Learn', 'Reports', vm.title]} />
      <h1>{vm.title}</h1>
      <p className="text-muted">Published {vm.publicationDate}</p>
      <h2 className="section-heading">Methodology</h2>
      <p>{vm.methodology}</p>
      <h2 className="section-heading">Data</h2>
      <ul className="version-list">
        {vm.data.map((d) => <li className="version" key={d.label}><span className="version__id">{d.label}</span><span className="text-muted">{d.value}</span></li>)}
      </ul>
      <h2 className="section-heading">Findings</h2>
      <ul>{vm.findings.map((f, i) => <li key={i}>{f}</li>)}</ul>
    </>
  );
}
