/**
 * SC-C10 governance: opaque internal ids (P4:§9.2), "'Closed' never without its reason" (P4:§11.3),
 * and the two-axis status pair (lifecycle chip + attention marker as separate elements, CR-4).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PortfolioIndexScreen } from './PortfolioIndexScreen';
import { portfolioScenarios } from '../../fixtures/scenarios/portfolio';

describe('SC-C10 portfolio index', () => {
  it('shows official application numbers but not internal opaque ids', () => {
    const { container } = render(<PortfolioIndexScreen loaded={portfolioScenarios['ready']} />);
    expect(container.textContent).toContain('2026/DEL/000123'); // official number shown
    for (const opaque of ['APP-11A2', 'APP-4C7D', 'APP-90E1']) {
      expect(container.innerHTML).not.toContain(opaque); // internal ids stay opaque/hidden
    }
  });

  it("renders a Closed application WITH its reason (P4:§11.3)", () => {
    const { container } = render(<PortfolioIndexScreen loaded={portfolioScenarios['ready']} />);
    expect(container.textContent).toMatch(/Closed —/);
    expect(container.textContent).toContain('Withdrawn by the applicant before publication');
  });

  it('renders the two-axis pair as separate elements (CR-4)', () => {
    const { container } = render(<PortfolioIndexScreen loaded={portfolioScenarios['ready']} />);
    expect(container.querySelector('.state-chip')).not.toBeNull();
    expect(container.querySelector('.attention')).not.toBeNull();
  });

  it('first-run empty routes to Inventions (B1 dependency)', () => {
    const { getByRole } = render(<PortfolioIndexScreen loaded={portfolioScenarios['empty']} />);
    expect(getByRole('button', { name: /Go to Inventions/i })).toBeTruthy();
  });
});
