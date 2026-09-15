/**
 * ALDASSIST Phase 8 — SC-C14 Matters index — the client's professional engagements (B4).
 * Rows show the matter state (Quoted/Engaged/In progress/Awaiting you/Awaiting the office/Complete/Closed,
 * P4:§11.4) + attention as a two-axis pair (CR-4), agent, invention, and a cost cell. The cost cell is a
 * PriceDisplay container (the only money renderer) or is hidden for roles without cost access (Members no
 * costs, P4:§17.2 / IP-15). "Closed" carries its reason. Empty: engagements appear when you engage an agent.
 */
import type { Loaded, MattersIndexVM, CostCellVM } from '../../contract';
import { StateChip, AttentionMarker, PriceDisplay } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { MATTER_CHIP } from '../labels';

function Cost({ cell }: { cell: CostCellVM }) {
  if (cell.kind === 'hidden') return <span className="text-muted">{cell.reason}</span>;
  return <PriceDisplay price={cell.price} />;
}

export function MattersIndexScreen({ loaded }: { loaded: Loaded<MattersIndexVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Matters']} />
      <div className="index-head"><h1>Matters</h1></div>

      <div className="facets" aria-label="Filters">
        {vm.facets.map((f) => <span className="facet" key={f.id}>{f.label} <span className="facet__count">({f.count})</span></span>)}
      </div>

      <table className="index-table">
        <caption className="sr-only">Your professional engagements</caption>
        <thead>
          <tr>
            <th scope="col">Matter</th>
            <th scope="col">Status</th>
            <th scope="col">Agent</th>
            <th scope="col">Invention</th>
            <th scope="col">Cost</th>
          </tr>
        </thead>
        <tbody>
          {vm.rows.map((r) => {
            const chip = MATTER_CHIP[r.status.lifecycle];
            return (
              <tr key={r.id}>
                <td>{r.ref}</td>
                <td>
                  <span className="status-pair">
                    <StateChip label={chip.label} icon={chip.icon} />
                    <AttentionMarker attention={r.status.attention} />
                  </span>
                  {r.status.closedReason && <div className="text-muted">Closed — {r.status.closedReason}</div>}
                </td>
                <td>{r.agent}</td>
                <td className="mono">{r.invention}</td>
                <td><Cost cell={r.cost} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
