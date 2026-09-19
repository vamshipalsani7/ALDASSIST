/**
 * SC-P06 governance: money renders ONLY through PriceDisplay; official fees are separately identifiable;
 * amounts are pending (Rules Engine) — never invented; O-2026-001 stays open; no banned marketing terms.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PricingScreen } from './PricingScreen';
import { pricingScenarios } from '../../fixtures/scenarios/public';

describe('SC-P06 pricing', () => {
  it('renders via PriceDisplay with the official fee separately identifiable and amounts unset', () => {
    const { container } = render(<PricingScreen loaded={pricingScenarios['ready']} />);
    expect(container.querySelector('.price')).toBeTruthy();
    expect(container.textContent).toContain('Official fee');
    expect(container.textContent).toContain('amount not set');
    expect(container.textContent).not.toMatch(/[₹$€£]\s*\d/);
  });

  it('uses no banned marketing terms', () => {
    const { container } = render(<PricingScreen loaded={pricingScenarios['ready']} />);
    expect(container.textContent).not.toMatch(/\baffordable\b/i);
    expect(container.textContent).not.toMatch(/\bcheap\b/i);
    expect(container.textContent).not.toMatch(/starting from/i);
  });
});
