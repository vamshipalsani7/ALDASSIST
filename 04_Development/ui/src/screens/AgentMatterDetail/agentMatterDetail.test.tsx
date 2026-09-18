/**
 * SC-A05 governance: the agent files (human act, on client approval) and the platform never files
 * autonomously; there is NO drafting/prosecution surface — the agent uploads externally-prepared documents
 * (CR-17). Documents distinguish AI-generated from human-authored (IP-07). A not-assigned / cross-tenant
 * matter reveals nothing (CR-5). Billing crosses L1 via PriceDisplay.
 */
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { AgentMatterDetailScreen } from './AgentMatterDetailScreen';
import { agentMatterDetailScenarios } from '../../fixtures/scenarios/agent';

describe('SC-A05 agent matter detail', () => {
  it('offers File with the office and states there is no drafting/prosecution surface (CR-17)', () => {
    const { container } = render(<AgentMatterDetailScreen loaded={agentMatterDetailScenarios['ready']} />);
    expect(container.textContent).toMatch(/File with the office/i);
    expect(container.textContent).toMatch(/no drafting or prosecution workspace/i);
    expect(container.textContent).toMatch(/never files autonomously/i);
  });

  it('distinguishes AI-generated from human-authored documents (IP-07)', () => {
    const view = render(<AgentMatterDetailScreen loaded={agentMatterDetailScenarios['ready']} />);
    fireEvent.click(view.getByRole('button', { name: 'Documents' }));
    expect(view.container.textContent).toContain('AI-generated');
    expect(view.container.textContent).toMatch(/Human · You \(agent\)/);
  });

  it('a not-assigned / cross-tenant matter reveals nothing (CR-5)', () => {
    const { container } = render(<AgentMatterDetailScreen loaded={agentMatterDetailScenarios['not-found']} />);
    expect(container.textContent).toMatch(/does not exist/i);
    expect(container.textContent).not.toMatch(/File with the office|Brief|Billing/);
  });
});
