/**
 * ALDASSIST Phase 8 — SC-O01 Docket Health Console ★ (B7). The operational spine of deadline safety. Four
 * fixed queues (WP-2 §SC-O01 / WP-3 §IX-3.5): unconfirmed critical deadlines · source discrepancies ·
 * undelivered critical notifications · escalations, each with an inline action. Critical-deadline
 * confirmation is a HUMAN act (BR-03). Empty is a GOOD state, honestly shown ("no open items"). Internal,
 * audited/justified; Disclosure BODIES are consent-gated and never rendered here — metadata only (BR-16).
 * Register-source stale → last-known + freshness, never an error page.
 */
import type { Loaded, DocketHealthVM, DocketHealthQueueVM } from '../../contract';
import { StateChip, AttentionMarker, Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { ObjectLink } from '../../shell/ObjectLink';
import { DEADLINE_STATE_CHIP } from '../labels';

function Queue({ queue }: { queue: DocketHealthQueueVM }) {
  return (
    <section>
      <h2 className="section-heading">{queue.label} <span className="facet__count">({queue.items.length})</span></h2>
      {queue.items.length === 0
        ? <p className="text-muted">No open items.</p>
        : (
          <ul className="plain-list">
            {queue.items.map((it) => (
              <li className="notpursued" key={it.id}>
                <div className="status-pair">
                  <strong>{it.title}</strong>
                  {it.state && <StateChip label={DEADLINE_STATE_CHIP[it.state].label} icon={DEADLINE_STATE_CHIP[it.state].icon} />}
                  {it.criticality && <StateChip label={it.criticality.label} icon={it.criticality.elevated ? 'at-risk' : 'info'} />}
                  <AttentionMarker attention={it.attention} />
                </div>
                <p className="text-muted">{it.detail}{it.date ? ` · ${it.date}` : ''} · <ObjectLink object={it.objectRef} /></p>
                <div className="next-action-row"><Button variant={it.action.emphasis}>{it.action.label}</Button></div>
              </li>
            ))}
          </ul>
        )}
    </section>
  );
}

export function DocketHealthScreen({ loaded }: { loaded: Loaded<DocketHealthVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const total = vm.queues.reduce((n, q) => n + q.items.length, 0);

  return (
    <>
      <Breadcrumbs trail={['Docket Health']} />
      <h1>Docket Health</h1>
      <p className="lock-banner" role="note"><Icon name="locked" /> {vm.accessNote}</p>
      {vm.staleness?.stale && (
        <p className="lock-banner" role="status">
          <Icon name="info" /> Showing the last-known value from {vm.staleness.source}. Deadlines are never silently changed.
        </p>
      )}
      {total === 0 && <div className="state-panel" role="status"><p>No open items — the docket is healthy.</p></div>}
      {vm.queues.map((q) => <Queue queue={q} key={q.key} />)}
    </>
  );
}
