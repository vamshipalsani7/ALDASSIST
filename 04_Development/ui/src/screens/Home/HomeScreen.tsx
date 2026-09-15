/**
 * ALDASSIST Phase 8 — SC-C01 Home / action queue ★ (B5). The most-visited screen: "what needs me?".
 * Four fixed regions in order (P4:§18.1): Needs you → Waiting on others → Recently changed (7d) →
 * Portfolio at a glance. The core split is Needs you vs Waiting on others (whose-turn, IP-12).
 *
 * B5 corrections applied:
 *  - TWO-AXIS on every queue item (CR-4): a lifecycle StateChip + an independent AttentionMarker, never
 *    merged — on both Needs-you and Waiting items.
 *  - Deadline-proximity → criticality ordering of the Needs-you queue: most-urgent attention first, then
 *    soonest `byWhen`. The ordering is derived from existing fields only — no invented time (CR-19).
 *  - Object references are ACTUAL navigable links (ObjectLink), one click from the B2–B4 object — not text.
 *  - A waiting item's expected timing stays a SLOT (WhoseTurn); the queue never shows a false "all clear"
 *    when data is stale; first-run empty teaches.
 */
import type { Loaded, HomeVM, NeedsYouItemVM, AttentionState } from '../../contract';
import { AttentionMarker, WhoseTurn, StateChip, PriceDisplay, Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { ObjectLink } from '../../shell/ObjectLink';
import { DEADLINE_STATE_CHIP } from '../labels';

// Deadline-proximity → criticality: most-urgent attention first, then soonest computed date. Derived
// only from fields the Rules Engine supplies (attention + byWhen) — nothing invented (CR-19).
const ATTENTION_RANK: Record<AttentionState, number> = { 'at-risk': 0, 'action-needed': 1, 'on-track': 2 };
function byCriticality(a: NeedsYouItemVM, b: NeedsYouItemVM): number {
  const ra = ATTENTION_RANK[a.status.attention];
  const rb = ATTENTION_RANK[b.status.attention];
  if (ra !== rb) return ra - rb;
  if (a.byWhen && b.byWhen) return a.byWhen < b.byWhen ? -1 : a.byWhen > b.byWhen ? 1 : 0;
  if (a.byWhen) return -1; // a dated item is nearer than an undated one
  if (b.byWhen) return 1;
  return 0;
}

export function HomeScreen({ loaded }: { loaded: Loaded<HomeVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const needsYou = [...vm.needsYou].sort(byCriticality);

  return (
    <>
      <Breadcrumbs trail={['Home']} />
      <h1>Home</h1>
      {vm.staleness?.stale && (
        <p className="lock-banner" role="status">
          <Icon name="info" /> Some information is showing its last-known value from {vm.staleness.source} and may be out of date. Nothing here is marked "all clear" that we could not confirm.
        </p>
      )}

      {/* Region 1 — Needs you (ordered by deadline-proximity → criticality) */}
      <h2 className="section-heading">Needs you</h2>
      <ul className="plain-list">
        {needsYou.map((it, i) => (
          <li className="notpursued" key={i}>
            <div className="status-pair">
              <strong>{it.what}</strong>
              {/* two-axis: lifecycle chip + independent attention marker (CR-4) */}
              <StateChip label={it.status.lifecycle} />
              <AttentionMarker attention={it.status.attention} />
            </div>
            <p className="text-muted">{it.why}{it.byWhen ? ` · by ${it.byWhen}` : ''} · <ObjectLink object={it.object} /></p>
            <div className="next-action-row"><Button variant={it.action.emphasis}>{it.action.label}</Button></div>
          </li>
        ))}
        {needsYou.length === 0 && <li className="text-muted">Nothing needs you right now.</li>}
      </ul>

      {/* Region 2 — Waiting on others */}
      <h2 className="section-heading">Waiting on others</h2>
      <ul className="version-list">
        {vm.waitingOnOthers.map((it, i) => (
          <li className="version" key={i}>
            <span className="version__id">{it.what}</span>
            <span className="status-pair">
              <StateChip label={it.status.lifecycle} />
              <AttentionMarker attention={it.status.attention} />
            </span>
            <span className="text-muted">waiting on {it.who} · <ObjectLink object={it.object} /></span>
            <WhoseTurn whoseTurn={it.whoseTurn} />
          </li>
        ))}
      </ul>

      {/* Region 3 — Recently changed (7d) */}
      <h2 className="section-heading">Recently changed (7 days)</h2>
      <ul className="version-list">
        {vm.recentlyChanged.map((it, i) => (
          <li className="version" key={i}>
            <span className="version__id">{it.change}</span>
            <span className="text-muted"><ObjectLink object={it.object} /></span>
            <span className="version__time">{it.date}</span>
          </li>
        ))}
      </ul>

      {/* Region 4 — Portfolio at a glance */}
      <h2 className="section-heading">Portfolio at a glance</h2>
      <div className="facets">
        {vm.glance.countsByState.map((c) => <span className="facet" key={c.label}>{c.label} <span className="facet__count">({c.count})</span></span>)}
      </div>
      <h3 className="section-heading">Next 90 days</h3>
      <ul className="version-list">
        {vm.glance.next90Days.map((d, i) => (
          <li className="version" key={i}>
            <span className="version__id">{d.label}</span>
            <span className="version__time">{d.date}</span>
            <StateChip label={DEADLINE_STATE_CHIP[d.state].label} icon={DEADLINE_STATE_CHIP[d.state].icon} />
          </li>
        ))}
      </ul>
      <h3 className="section-heading">Spend</h3>
      <PriceDisplay price={vm.glance.spend} />
    </>
  );
}
