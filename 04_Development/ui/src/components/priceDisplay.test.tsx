/**
 * PriceDisplay governance (CR-15 / CR-19 / O-2026-001):
 *  - Official fees are ALWAYS separately identifiable, in BOTH modes.
 *  - The rendering MODE is O-2026-001 (open): when the slot is pending, the component renders the
 *    probable-direction breakdown AND says the presentation is an open decision — it never decides.
 *  - Amounts are NEVER invented: unfilled amounts render as "amount not set", never a fabricated figure.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PriceDisplay } from './PriceDisplay';
import { priceDisplayScenarios } from '../fixtures/scenarios/matters';

describe('PriceDisplay — official fees always separately identifiable', () => {
  it('component mode itemises Platform + Professional + Official fees', () => {
    const { container } = render(<PriceDisplay price={priceDisplayScenarios['component']} />);
    expect(container.textContent).toContain('Platform fee');
    expect(container.textContent).toContain('Professional fee');
    expect(container.textContent).toContain('Official fee');
  });
  it('bundled mode still surfaces the official fee separately', () => {
    const { container } = render(<PriceDisplay price={priceDisplayScenarios['bundled']} />);
    expect(container.textContent).toContain('Total');
    expect(container.textContent).toMatch(/of which .*Official fee/i);
  });
});

describe('PriceDisplay — O-2026-001 open (mode is a slot, never decided)', () => {
  it('pending mode renders the itemised breakdown + an explicit open-decision note', () => {
    const { container } = render(<PriceDisplay price={priceDisplayScenarios['open-decision']} />);
    expect(container.textContent).toContain('Official fee');
    expect(container.textContent).toMatch(/open decision \(O-2026-001\)/i);
  });
});

describe('PriceDisplay — no invented prices (CR-19)', () => {
  it('renders unfilled amounts as a container, never a fabricated figure', () => {
    for (const key of ['open-decision', 'component', 'bundled'] as const) {
      const { container } = render(<PriceDisplay price={priceDisplayScenarios[key]} />);
      expect(container.textContent).toContain('amount not set');
      // no currency figure fabricated anywhere
      expect(container.textContent).not.toMatch(/[₹$€£]\s*\d/);
    }
  });
});
