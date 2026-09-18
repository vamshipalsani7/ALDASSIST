/**
 * ALDASSIST Phase 8 — SC-A06 Reviews queue ★ (B6). The BR-01 gate: domain-matched assessment reviews,
 * throughput-critical. Items carry NO client identity beyond what the review grant permits (ADR:§6); a
 * review grant is issued only on TAKING an item. Conflicted items never appear (absent by construction,
 * ADR:§5). Expected turnaround is a SLOT (never invented). Empty is honest, not urgency.
 */
import type { Loaded, ReviewsQueueVM } from '../../contract';
import { Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

function turnaround(s: ReviewsQueueVM['items'][number]['expectedTurnaround']): string {
  if (s.status === 'resolved') return `expected ${s.value}`;
  if (s.status === 'pending-slot') return 'expected turnaround not yet set';
  return 'expected turnaround temporarily unavailable';
}

export function ReviewsQueueScreen({ loaded }: { loaded: Loaded<ReviewsQueueVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Reviews']} />
      <h1>Reviews</h1>
      <p className="text-muted">{vm.queueDepthNote}</p>
      <ul className="plain-list">
        {vm.items.map((it) => (
          <li className="notpursued" key={it.id}>
            <div className="status-pair"><strong>{it.summary}</strong></div>
            <p className="text-muted">{it.domain} · {it.age} · {turnaround(it.expectedTurnaround)}</p>
            <div className="next-action-row"><Button variant={it.take.emphasis}>{it.take.label}</Button></div>
          </li>
        ))}
        {vm.items.length === 0 && <li className="text-muted">No items in your domains right now.</li>}
      </ul>
    </>
  );
}
