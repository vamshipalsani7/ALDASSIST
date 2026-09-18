/**
 * ALDASSIST Phase 8 — SC-A01 Agent Today (B6). "What must I do today" — a risk-ranked queue spanning the
 * three DISTINCT rhythms (docket · matter · review), surfaced without blending (P4:§6.1). Two-axis on every
 * item (CR-4); object references are real links; a stale queue never shows a false "all clear". First-run
 * empty teaches → Import your matters.
 */
import type { Loaded, AgentTodayVM } from '../../contract';
import { StateChip, AttentionMarker, WhoseTurn, Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { ObjectLink } from '../../shell/ObjectLink';

const RHYTHM_LABEL: Record<'docket' | 'matter' | 'review', string> = {
  docket: 'Docket', matter: 'Matter', review: 'Review',
};

export function AgentTodayScreen({ loaded }: { loaded: Loaded<AgentTodayVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Today']} />
      <h1>Today</h1>
      {vm.staleness?.stale && (
        <p className="lock-banner" role="status">
          <Icon name="info" /> Some information is showing its last-known value from {vm.staleness.source} and may be out of date. Nothing here is marked "all clear" that we could not confirm.
        </p>
      )}
      <ul className="plain-list">
        {vm.items.map((it, i) => (
          <li className="notpursued" key={i}>
            <div className="status-pair">
              <strong>{it.what}</strong>
              <StateChip label={RHYTHM_LABEL[it.rhythm]} />
              <StateChip label={it.status.lifecycle} />
              <AttentionMarker attention={it.status.attention} />
            </div>
            <p className="text-muted">{it.why}{it.byWhen ? ` · by ${it.byWhen}` : ''} · <ObjectLink object={it.object} /></p>
            <div className="status-pair"><WhoseTurn whoseTurn={it.whoseTurn} /></div>
            <div className="next-action-row"><Button variant={it.action.emphasis}>{it.action.label}</Button></div>
          </li>
        ))}
        {vm.items.length === 0 && <li className="text-muted">Nothing needs you right now.</li>}
      </ul>
    </>
  );
}
