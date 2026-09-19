/**
 * ALDASSIST Phase 8 — SC-P06 Pricing (B8). Real, published numbers — a category differentiator. Rendered
 * by PriceDisplay ONLY (component mode primary, both modes supported; official fees always separately
 * identifiable) — O-2026-001 stays OPEN. Fees derive from the Rules Engine (pending here). No banned terms
 * ("affordable/cheap/starting from ₹X"). Rules Engine unavailable → last-known fees + freshness.
 */
import type { Loaded, PricingVM } from '../../contract';
import { PriceDisplay } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function PricingScreen({ loaded }: { loaded: Loaded<PricingVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['Pricing']} />
      <h1>Pricing</h1>
      <p className="text-muted">{vm.renderingNote}</p>
      {vm.catalogue.map((c) => (
        <section key={c.service}>
          <h2 className="section-heading">{c.service}</h2>
          <PriceDisplay price={c.price} />
        </section>
      ))}
      <h2 className="section-heading">What affects price</h2>
      <p className="text-muted">{vm.varianceNote}</p>
      <p className="text-muted">{vm.entityTypeNote}</p>
    </>
  );
}
