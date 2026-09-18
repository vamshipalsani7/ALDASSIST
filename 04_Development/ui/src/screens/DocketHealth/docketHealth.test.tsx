/**
 * SC-O01 governance: the four fixed queues (unconfirmed / discrepancies / undelivered / escalations);
 * critical-deadline confirmation is a human act (BR-03); Disclosure bodies are consent-gated and never
 * shown — metadata only (BR-16); empty is a good state, honestly shown.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DocketHealthScreen } from './DocketHealthScreen';
import { docketHealthScenarios } from '../../fixtures/scenarios/ops';

describe('SC-O01 docket health', () => {
  it('renders the four fixed queues incl. undelivered critical notifications', () => {
    const { container } = render(<DocketHealthScreen loaded={docketHealthScenarios['ready']} />);
    expect(container.textContent).toContain('Unconfirmed critical deadlines');
    expect(container.textContent).toContain('Source discrepancies');
    expect(container.textContent).toContain('Undelivered critical notifications');
    expect(container.textContent).toContain('Escalations');
  });

  it('offers a human confirm action for an unconfirmed critical deadline (BR-03)', () => {
    const { getByRole } = render(<DocketHealthScreen loaded={docketHealthScenarios['ready']} />);
    expect(getByRole('button', { name: /Confirm deadline/i })).toBeTruthy();
  });

  it('states disclosure bodies are consent-gated / not shown (BR-16)', () => {
    const { container } = render(<DocketHealthScreen loaded={docketHealthScenarios['ready']} />);
    expect(container.textContent).toMatch(/consent-gated/i);
    expect(container.textContent).toMatch(/not shown here/i);
  });

  it('empty is a good state, honestly shown', () => {
    const { container } = render(<DocketHealthScreen loaded={docketHealthScenarios['clear']} />);
    expect(container.textContent).toMatch(/the docket is healthy/i);
  });
});
