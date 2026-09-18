/**
 * SC-A01 governance: the three rhythms (docket / matter / review) are surfaced without blending; two-axis
 * on every item (CR-4); object references are real links; a stale queue never shows a false "all clear".
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AgentTodayScreen } from './AgentTodayScreen';
import { agentTodayScenarios } from '../../fixtures/scenarios/agent';

describe('SC-A01 agent Today', () => {
  it('renders two-axis (lifecycle chip + attention) on every item', () => {
    const { container } = render(<AgentTodayScreen loaded={agentTodayScenarios['ready']} />);
    // one rhythm chip + one lifecycle chip per item (2 chips × 3 items) and one attention marker each
    expect(container.querySelectorAll('.state-chip').length).toBeGreaterThanOrEqual(6);
    expect(container.querySelectorAll('.attention').length).toBeGreaterThanOrEqual(3);
  });

  it('surfaces the three rhythms without blending', () => {
    const { container } = render(<AgentTodayScreen loaded={agentTodayScenarios['ready']} />);
    expect(container.textContent).toContain('Docket');
    expect(container.textContent).toContain('Review');
    expect(container.textContent).toContain('Matter');
  });

  it('renders object references as real links', () => {
    const { getByText } = render(<AgentTodayScreen loaded={agentTodayScenarios['ready']} />);
    expect(getByText('Matter M-2026-0042').tagName).toBe('A');
  });

  it('never shows a false "all clear" when data is stale', () => {
    const { getByRole } = render(<AgentTodayScreen loaded={agentTodayScenarios['stale']} />);
    expect(getByRole('status').textContent).toMatch(/could not confirm/i);
  });
});
