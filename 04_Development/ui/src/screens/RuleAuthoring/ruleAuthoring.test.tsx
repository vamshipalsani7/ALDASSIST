/**
 * SC-O03 governance: rules-as-data with a provenance-linked source, immutable version history, golden
 * cases, a pending pre-publication impact figure, and a publish that is GATED — present only when tests
 * pass, blocked (with a reason) otherwise; dual control is stated; official fees derive here.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { RuleAuthoringScreen } from './RuleAuthoringScreen';
import { ruleAuthoringScenarios } from '../../fixtures/scenarios/ops';

describe('SC-O03 rule authoring', () => {
  it('offers Publish when the gate is satisfied, and states dual control + fees-derive', () => {
    const { getByRole, container } = render(<RuleAuthoringScreen loaded={ruleAuthoringScenarios['ready']} />);
    expect(getByRole('button', { name: /Publish rule version/i })).toBeTruthy();
    expect(container.textContent).toMatch(/dual control/i);
    expect(container.textContent).toMatch(/Official fees derive/i);
  });

  it('blocks Publish when a golden case fails, with a reason', () => {
    const { queryByRole, container } = render(<RuleAuthoringScreen loaded={ruleAuthoringScenarios['gate-blocked']} />);
    expect(queryByRole('button', { name: /Publish/i })).toBeNull();
    expect(container.textContent).toMatch(/Publication is blocked/i);
    expect(container.textContent).toMatch(/Fail/);
  });

  it('shows immutable version history and a pending (uncomputed) impact figure', () => {
    const { container } = render(<RuleAuthoringScreen loaded={ruleAuthoringScenarios['ready']} />);
    expect(container.textContent).toMatch(/Published/);
    expect(container.textContent).toMatch(/not yet computed/i);
  });
});
