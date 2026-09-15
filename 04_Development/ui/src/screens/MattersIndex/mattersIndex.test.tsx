/**
 * SC-C14 governance: two-axis matter status (lifecycle chip + attention marker as separate elements, CR-4);
 * Members have no cost access (cost cell hidden, never a number); "Closed" carries its reason.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MattersIndexScreen } from './MattersIndexScreen';
import { mattersScenarios } from '../../fixtures/scenarios/matters';

describe('SC-C14 matters index', () => {
  it('renders the two-axis pair as separate elements (CR-4)', () => {
    const { container } = render(<MattersIndexScreen loaded={mattersScenarios['ready']} />);
    expect(container.querySelector('.state-chip')).not.toBeNull();
    expect(container.querySelector('.attention')).not.toBeNull();
  });
  it('renders a Closed matter with its reason', () => {
    const { container } = render(<MattersIndexScreen loaded={mattersScenarios['ready']} />);
    expect(container.textContent).toMatch(/Closed —/);
  });
  it('Member view hides the cost cell (no number), showing who can see costs', () => {
    const { container } = render(<MattersIndexScreen loaded={mattersScenarios['member-no-costs']} />);
    expect(container.textContent).toContain('Costs are visible to the Owner and Admins');
    expect(container.textContent).not.toMatch(/[₹$€£]\s*\d/);
  });
});
