/**
 * SC-A08 governance: "Agent Matching / Engagement", never "Marketplace" (CR-16); fees render through
 * PriceDisplay only, with the official fee separately identifiable and amounts as unfilled slots — never
 * invented (CR-15/CR-19); only conflict-clear opportunities appear.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OpportunitiesScreen } from './OpportunitiesScreen';
import { opportunitiesScenarios } from '../../fixtures/scenarios/agent';

describe('SC-A08 opportunities', () => {
  it('uses Agent Matching / Engagement wording, never "Marketplace"', () => {
    const { container } = render(<OpportunitiesScreen loaded={opportunitiesScenarios['ready']} />);
    expect(container.textContent).toMatch(/Agent Matching \/ Engagement/);
    expect(container.textContent).not.toMatch(/marketplace/i);
  });

  it('renders fees through PriceDisplay with official fee separable and no invented figures', () => {
    const { container } = render(<OpportunitiesScreen loaded={opportunitiesScenarios['ready']} />);
    expect(container.querySelector('.price')).toBeTruthy();
    expect(container.textContent).toContain('Official fee');
    expect(container.textContent).toContain('amount not set');
    expect(container.textContent).not.toMatch(/[₹$€£]\s*\d/);
  });

  it('shows a conflict-clear marker on offered opportunities', () => {
    const { container } = render(<OpportunitiesScreen loaded={opportunitiesScenarios['ready']} />);
    expect(container.textContent).toMatch(/Conflict-clear/i);
  });
});
