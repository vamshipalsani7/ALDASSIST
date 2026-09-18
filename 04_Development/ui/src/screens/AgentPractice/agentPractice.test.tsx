/**
 * SC-A09–A12 governance: agent outcome statistics obey the n≥20 floor with sample size + confidence;
 * below the floor → "not enough data yet" (CR-21 / D-2026-019). Publishing outcome stats to clients is
 * L3-gated. The confidence representation is a SLOT (never a bare number). Earnings render via PriceDisplay.
 */
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { AgentPracticeScreen } from './AgentPracticeScreen';
import { practiceScenarios } from '../../fixtures/scenarios/agent';

function gotoOutcomes(view: ReturnType<typeof render>) {
  fireEvent.click(view.getByRole('button', { name: 'Outcomes' }));
}

describe('SC-A09–A12 practice', () => {
  it('published outcomes (n≥20) show the sample size and an L3 publication gate, confidence as a slot', () => {
    const view = render(<AgentPracticeScreen loaded={practiceScenarios['ready']} />);
    gotoOutcomes(view);
    expect(view.container.textContent).toMatch(/Sample size \(n\): 24/);
    expect(view.container.textContent).toMatch(/gated on legal review/i);
    expect(view.container.textContent).toMatch(/not yet calibrated/i); // confidence slot, not a number
  });

  it('below the floor, shows "not enough data yet" instead of a statistic', () => {
    const view = render(<AgentPracticeScreen loaded={practiceScenarios['below-floor']} />);
    gotoOutcomes(view);
    expect(view.container.textContent).toMatch(/not enough data yet/i);
    expect(view.container.textContent).not.toMatch(/Sample size \(n\): \d/);
  });

  it('earnings render through PriceDisplay with no invented figures', () => {
    const view = render(<AgentPracticeScreen loaded={practiceScenarios['ready']} />);
    fireEvent.click(view.getByRole('button', { name: 'Earnings' }));
    expect(view.container.querySelector('.price')).toBeTruthy();
    expect(view.container.textContent).toContain('amount not set');
    expect(view.container.textContent).not.toMatch(/[₹$€£]\s*\d/);
  });
});
