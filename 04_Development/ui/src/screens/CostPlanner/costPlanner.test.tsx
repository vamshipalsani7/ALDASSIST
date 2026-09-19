/**
 * SC-P07 governance: the Cost Planner is ungated (no email required) and renders figures via PriceDisplay
 * with pending amounts (Rules Engine) — never invented.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CostPlannerScreen } from './CostPlannerScreen';
import { costPlannerScenarios } from '../../fixtures/scenarios/public';

describe('SC-P07 cost planner', () => {
  it('is ungated — states no email is required', () => {
    const { container } = render(<CostPlannerScreen loaded={costPlannerScenarios['ready']} />);
    expect(container.textContent).toMatch(/no email/i);
  });

  it('renders the projection via PriceDisplay with no invented figures', () => {
    const { container } = render(<CostPlannerScreen loaded={costPlannerScenarios['ready']} />);
    expect(container.querySelector('.price')).toBeTruthy();
    expect(container.textContent).toContain('amount not set');
    expect(container.textContent).not.toMatch(/[₹$€£]\s*\d/);
  });
});
