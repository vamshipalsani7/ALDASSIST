/**
 * SC-O02 governance: an unavailable register check is a HOLD — no approve affordance (never auto-approve);
 * a passed check offers approve. Verification precedes any client Zone-1 access. The console is
 * "Agent Verification" — never "Marketplace" (CR-16).
 */
import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { AgentVerificationScreen } from './AgentVerificationScreen';
import { agentVerificationScenarios } from '../../fixtures/scenarios/ops';

describe('SC-O02 agent verification', () => {
  it('never uses "Marketplace"; the heading is Agent Verification', () => {
    const { container, getByRole } = render(<AgentVerificationScreen loaded={agentVerificationScenarios['ready']} />);
    expect(getByRole('heading', { level: 1 }).textContent).toBe('Agent Verification');
    expect(container.textContent).not.toMatch(/marketplace/i);
  });

  it('a passed register check offers Approve; an unavailable one is a HOLD with no Approve', () => {
    const { getByText } = render(<AgentVerificationScreen loaded={agentVerificationScenarios['ready']} />);
    const passed = getByText('A. Candidate (demo)').closest('li')!;
    expect(within(passed).getByRole('button', { name: /Approve verification/i })).toBeTruthy();

    const held = getByText('B. Candidate (demo)').closest('li')!;
    expect(within(held).queryByRole('button', { name: /Approve/i })).toBeNull();
    expect(held.textContent).toMatch(/On hold — cannot approve/i);
  });

  it('states verification precedes client Zone-1 access', () => {
    const { container } = render(<AgentVerificationScreen loaded={agentVerificationScenarios['ready']} />);
    expect(container.textContent).toMatch(/precedes any client \(Zone-1\) access/i);
  });
});
