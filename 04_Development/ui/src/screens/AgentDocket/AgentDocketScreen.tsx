/**
 * ALDASSIST Phase 8 — SC-A02 Agent docket + deadline detail (B6). All deadlines across all matters and
 * sources — the docket that can't fail (P3:ICP-2). Each row shows state + criticality (icon + text, never
 * colour-only, CR-4) and, for a critical deadline, the human CONFIRM affordance (BR-03 — an agent act).
 * Dates are computed by the Deadline Engine and only rendered (X9/D1). A selected deadline shows the
 * depth-3 computation trace incl. the governing Rule, or an honest "unavailable" (never a fabricated basis).
 * Register-source stale → last-known + freshness, never an error page.
 */
import type { Loaded, AgentDocketVM } from '../../contract';
import { StateChip, AttentionMarker, Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { DEADLINE_STATE_CHIP } from '../labels';

export function AgentDocketScreen({ loaded }: { loaded: Loaded<AgentDocketVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const d = vm.selectedDetail;

  return (
    <>
      <Breadcrumbs trail={['Docket']} />
      <div className="index-head"><h1>Docket</h1></div>
      {vm.staleness?.stale && (
        <p className="lock-banner" role="status">
          <Icon name="info" /> Showing the last-known value from {vm.staleness.source}. Deadlines are never silently changed.
        </p>
      )}
      <div className="facets" aria-label="Filters">
        {vm.facets.map((f) => <span className="facet" key={f.id}>{f.label} <span className="facet__count">({f.count})</span></span>)}
      </div>

      <table className="index-table">
        <caption className="sr-only">Deadlines across all matters and sources</caption>
        <thead>
          <tr><th scope="col">Deadline</th><th scope="col">Matter</th><th scope="col">Source</th><th scope="col">Date</th><th scope="col">State</th><th scope="col">Criticality</th><th scope="col">Attention</th><th scope="col">Action</th></tr>
        </thead>
        <tbody>
          {vm.rows.map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td className="mono">{r.matterRef}</td>
              <td>{r.source}</td>
              <td className="mono">{r.date}</td>
              <td><StateChip label={DEADLINE_STATE_CHIP[r.state].label} icon={DEADLINE_STATE_CHIP[r.state].icon} /></td>
              <td><StateChip label={r.criticality.label} icon={r.criticality.elevated ? 'at-risk' : 'info'} /></td>
              <td><AttentionMarker attention={r.attention} /></td>
              <td>{r.confirm ? <Button variant={r.confirm.emphasis}>{r.confirm.label}</Button> : <span className="text-muted">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {d && (
        <section className="detail-grid">
          <div>
            <h2 className="section-heading">{d.title} · {d.matterRef}</h2>
            <dl className="detail-grid">
              <div className="kv"><dt className="kv__label">Date</dt><dd className="kv__value mono">{d.date}</dd></div>
              <div className="kv"><dt className="kv__label">State</dt><dd><StateChip label={DEADLINE_STATE_CHIP[d.state].label} icon={DEADLINE_STATE_CHIP[d.state].icon} /></dd></div>
              <div className="kv"><dt className="kv__label">Criticality</dt><dd><StateChip label={d.criticality.label} icon={d.criticality.elevated ? 'at-risk' : 'info'} /></dd></div>
            </dl>
            <h3 className="section-heading">Why this date</h3>
            <p className="text-muted">{d.why.trigger} · {d.why.window}</p>
            <h3 className="section-heading">Computation trace</h3>
            {d.trace.status === 'available' ? (
              <dl className="detail-grid">
                <div className="kv"><dt className="kv__label">Governing Rule</dt><dd className="kv__value mono">{d.trace.detail.ruleId} · {d.trace.detail.ruleVersion}</dd></div>
                <div className="kv"><dt className="kv__label">Statutory basis</dt><dd className="kv__value">{d.trace.detail.statutoryCitation}</dd></div>
                <div className="kv"><dt className="kv__label">Calendar adjustment</dt><dd className="kv__value">{d.trace.detail.calendarAdjustment}</dd></div>
                <div className="kv"><dt className="kv__label">Extensions</dt><dd className="kv__value">{d.trace.detail.extensions}</dd></div>
              </dl>
            ) : (
              <p className="text-muted">The full computation trace is temporarily unavailable. The date stands; the basis will appear here again shortly — nothing is fabricated.</p>
            )}
            <div className="next-action-row"><Button variant={d.confirm.emphasis}>{d.confirm.label}</Button></div>
            <p className="text-muted">{d.confirmationNote}</p>
          </div>
        </section>
      )}
    </>
  );
}
