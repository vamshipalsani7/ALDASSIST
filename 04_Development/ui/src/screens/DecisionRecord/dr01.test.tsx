/**
 * SC-C09 — DR-01 agnosticism + governance for the decision screen.
 *
 * DR-01 (which role may record a not-file Decision) is DEFERRED. The screen must presuppose no role:
 * the capability is a pending owner-decision slot, and the not-file interaction is offered
 * permission-agnostically. The four alternatives are shown at equal weight (options, not consolation).
 * The ONLY baseline-fixed permission is that filing (engage/pay) is Owner-only.
 */
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { DecisionRecordScreen } from './DecisionRecordScreen';
import { decisionScenarios } from '../../fixtures/scenarios/vault';

const ready = decisionScenarios.ready;
const vm = ready.state === 'ready' ? ready.data : null;

describe('SC-C09 DR-01 agnostic', () => {
  it('the not-file-decision capability is a pending DR-01 slot — no hard-coded role', () => {
    expect(vm).not.toBeNull();
    expect(vm!.capability.mayRecordNotFileDecision.status).toBe('pending-slot');
    expect(vm!.capability.mayRecordNotFileDecision.slotId).toBe('DR-01');
    expect(vm!.capability.mayRecordNotFileDecision.source).toBe('owner-decision');
  });

  it('requires a human actor and treats engage/pay as the only Owner-only fixed permission', () => {
    expect(vm!.requiresHumanActor).toBe(true);
    expect(vm!.engagePayOwnerOnly).toBe(true);
  });

  it('presents the not-file path permission-agnostically (no role gate on recording)', () => {
    const { container, getByLabelText, getByRole } = render(<DecisionRecordScreen loaded={ready} />);
    fireEvent.click(getByLabelText(/Decide not to file/i));
    // Record control is offered — not gated by a hard-coded role.
    expect(getByRole('button', { name: 'Record decision' })).toBeTruthy();
    // The authority is explicitly deferred, not asserted as a specific role.
    expect(container.textContent).toMatch(/workspace policy that isn't configured yet/i);
    // The Owner-only wording belongs ONLY to the filing path, never to recording a not-file decision.
    expect(container.textContent).not.toContain('limited to the Workspace Owner');
  });

  it('shows the four alternatives at equal weight (options, not consolation)', () => {
    const { getByText } = render(<DecisionRecordScreen loaded={ready} />);
    fireEvent.click(getByText(/Decide not to file/i));
    for (const h of ['Design around', 'Trade secret', 'Defensive publication', 'Defer & re-assess']) {
      expect(getByText(h)).toBeTruthy();
    }
  });

  it('the filing path (and only it) states the Owner-only fixed permission', () => {
    const { container, getByLabelText } = render(<DecisionRecordScreen loaded={ready} />);
    fireEvent.click(getByLabelText(/File this invention/i));
    expect(container.textContent).toContain('limited to the Workspace Owner');
  });
});
