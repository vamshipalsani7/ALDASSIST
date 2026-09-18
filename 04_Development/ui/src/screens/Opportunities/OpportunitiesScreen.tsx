/**
 * ALDASSIST Phase 8 — SC-A08 Opportunities (B6). Available Agent Matching / Engagement filing
 * opportunities — never "Marketplace" (CR-16). Only conflict-clear, domain-relevant opportunities are
 * shown (the conflict check gates the offer, BR-10). Fees render via PriceDisplay only (fixed published
 * price before engagement, BR-06; amounts are slots — never invented). Accepting triggers the client-side
 * Engagement / Matter (SC-C19). Empty is honest ("none available"), not fabricated urgency.
 */
import type { Loaded, OpportunitiesVM } from '../../contract';
import { PriceDisplay, Button, StateChip } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function OpportunitiesScreen({ loaded }: { loaded: Loaded<OpportunitiesVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Opportunities']} />
      <h1>Opportunities</h1>
      <p className="text-muted">{vm.matchingNote}</p>
      <ul className="plain-list">
        {vm.items.map((o) => (
          <li className="notpursued" key={o.id}>
            <div className="status-pair">
              <strong>{o.scope}</strong>
              <StateChip label={o.conflictStatus} icon="success" />
            </div>
            <p className="text-muted">{o.clientContext}</p>
            <PriceDisplay price={o.fee} />
            <div className="next-action-row">
              <Button variant={o.accept.emphasis}>{o.accept.label}</Button>
              <Button variant={o.decline.emphasis}>{o.decline.label}</Button>
            </div>
          </li>
        ))}
        {vm.items.length === 0 && <li className="text-muted">No opportunities in your domains right now.</li>}
      </ul>
    </>
  );
}
