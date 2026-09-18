/**
 * ALDASSIST Phase 8 — SC-A03 Agent matters index (B6). All matters the agent works — engaged platform
 * matters and imported own-practice matters, each with a SOURCE tag. Two-axis status (CR-4) + whose-turn.
 * Matter-scoped only: no aggregation of a client's holdings across matters the agent isn't engaged on
 * (P4:§17.3). Empty → Import path prominent.
 */
import type { Loaded, AgentMattersIndexVM } from '../../contract';
import { StateChip, AttentionMarker, WhoseTurn, Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { MATTER_CHIP } from '../labels';
import { MATTER_SOURCE } from '../agent-labels';

export function AgentMattersIndexScreen({ loaded }: { loaded: Loaded<AgentMattersIndexVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Matters']} />
      <div className="index-head">
        <h1>Matters</h1>
        <Button variant={vm.importAction.emphasis}>{vm.importAction.label}</Button>
      </div>
      <div className="facets" aria-label="Filters">
        {vm.facets.map((f) => <span className="facet" key={f.id}>{f.label} <span className="facet__count">({f.count})</span></span>)}
      </div>

      <table className="index-table">
        <caption className="sr-only">Matters (platform and own practice)</caption>
        <thead>
          <tr><th scope="col">Matter</th><th scope="col">Source</th><th scope="col">Status</th><th scope="col">Attention</th><th scope="col">Invention / application</th><th scope="col">Client</th><th scope="col">Whose turn</th><th scope="col">Next deadline</th></tr>
        </thead>
        <tbody>
          {vm.rows.map((r) => (
            <tr key={r.id}>
              <td className="mono">{r.ref}</td>
              <td>{MATTER_SOURCE[r.source]}</td>
              <td><StateChip label={MATTER_CHIP[r.status.lifecycle].label} icon={MATTER_CHIP[r.status.lifecycle].icon} /></td>
              <td><AttentionMarker attention={r.status.attention} /></td>
              <td className="mono">{r.invention}</td>
              <td>{r.client}</td>
              <td><WhoseTurn whoseTurn={r.whoseTurn} /></td>
              <td>{r.nextDeadline ? <span className="mono">{r.nextDeadline.label}: {r.nextDeadline.date}</span> : <span className="text-muted">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
