/**
 * ALDASSIST Phase 8 — SC-C10 Portfolio index — the post-filing operational spine (B3).
 * Filed applications (children of Inventions). Rows show lifecycle + official sub-status + attention
 * (two-axis, never merged — CR-4), jurisdiction, family, agent, and the next computed deadline. Internal
 * ids are opaque; the official application number is shown (P4:§9.2). "Closed" always carries its reason
 * (P4:§11.3). First-run empty routes to Inventions (applications originate there — B1 dependency).
 */
import type { Loaded, PortfolioIndexVM } from '../../contract';
import { StateChip, AttentionMarker } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { DEADLINE_STATE_CHIP } from '../labels';

export function PortfolioIndexScreen({ loaded }: { loaded: Loaded<PortfolioIndexVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Portfolio']} />
      <div className="index-head"><h1>Portfolio</h1></div>

      <div className="facets" aria-label="Filters">
        {vm.facets.map((f) => (
          <span className="facet" key={f.id}>{f.label} <span className="facet__count">({f.count})</span></span>
        ))}
      </div>

      <table className="index-table">
        <caption className="sr-only">Filed applications in this workspace</caption>
        <thead>
          <tr>
            <th scope="col">Application</th>
            <th scope="col">Status</th>
            <th scope="col">Jurisdiction</th>
            <th scope="col">Family</th>
            <th scope="col">Next deadline</th>
          </tr>
        </thead>
        <tbody>
          {vm.rows.map((r) => (
            <tr key={r.id}>
              <td className="mono">{r.officialNumber}</td>
              <td>
                {/* two-axis: lifecycle chip + attention marker are separate; official sub-status is its own line */}
                <span className="status-pair">
                  <StateChip label={r.status.lifecycle} />
                  <AttentionMarker attention={r.status.attention} />
                </span>
                <div className="text-muted">{r.status.officialSubStatus}</div>
                {r.status.closedReason && <div className="text-muted">Closed — {r.status.closedReason}</div>}
              </td>
              <td>{r.jurisdiction}</td>
              <td>{r.family}</td>
              <td>
                {r.nextDeadline
                  ? <span className="status-pair"><StateChip label={`${r.nextDeadline.label}: ${r.nextDeadline.date}`} icon={DEADLINE_STATE_CHIP[r.nextDeadline.state].icon} /></span>
                  : <span className="text-muted">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
