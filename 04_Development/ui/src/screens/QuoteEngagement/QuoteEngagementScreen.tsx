/**
 * ALDASSIST Phase 8 — SC-C19 Quote & engagement ★ (checkout) (B4).
 * Turns an accepted fixed-price quote into an Engagement + Matter. The quote is a PriceDisplay container
 * (official fees separable; mode is O-2026-001, open). Contracting-parties wording is a LegalContentSlot
 * container (L1-06) — never invented. This is the FIRST point money/engagement appear, after the free
 * assessment (P5:X5 / ADR:§7). engage/pay is Owner-only — a non-Owner is shown Loaded's `permission-denied`
 * (visible-but-locked, routed to the Owner, never auto-escalated). No live payment is performed here.
 */
import type { Loaded, QuoteEngagementVM, LegalContentSlot } from '../../contract';
import { PriceDisplay, Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

function Legal({ slot, label }: { slot: LegalContentSlot; label: string }) {
  if (slot.status === 'provided') return <p>{slot.text}</p>;
  return <p className="text-muted">{label} will appear here once provided.</p>;
}

export function QuoteEngagementScreen({ loaded }: { loaded: Loaded<QuoteEngagementVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Find an agent', vm.agentName, 'Quote']} />
      <h1>Quote &amp; engagement</h1>
      <p className="trust-copy">{vm.trustBoundaryNote}</p>

      <h2 className="section-heading">Scope</h2>
      <p>{vm.scope}</p>
      <p className="text-muted">{vm.scopeChangeNote}</p>

      <h2 className="section-heading">Fixed-price quote</h2>
      <PriceDisplay price={vm.quote} />

      <h2 className="section-heading">Who you are contracting with</h2>
      <Legal slot={vm.contractingParties} label="The contracting parties and fee terms" />

      <div className="next-action-row">
        <Button variant={vm.engageAction.emphasis}>{vm.engageAction.label}</Button>
      </div>
    </>
  );
}
