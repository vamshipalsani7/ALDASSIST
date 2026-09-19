/**
 * SC-P16 governance: email only (no phone / no sales); creating an account creates NO Workspace (A1); the
 * client MFA policy is a SLOT; returns to the attempted action.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AuthScreen } from './AuthScreen';
import { authScenarios } from '../../fixtures/scenarios/public';

describe('SC-P16 account & sign-in', () => {
  it('states no phone / no sales contact and returns to the attempted action', () => {
    const { container } = render(<AuthScreen loaded={authScenarios['sign-up']} />);
    expect(container.textContent).toMatch(/No phone number and no sales contact/i);
    expect(container.textContent).toMatch(/you return to whatever you were doing/i);
  });

  it('creates NO workspace at sign-up (A1) and keeps client MFA a slot', () => {
    const { container } = render(<AuthScreen loaded={authScenarios['sign-up']} />);
    expect(container.textContent).toMatch(/does not create a workspace/i);
    expect(container.textContent).toMatch(/MFA policy is not yet configured/i);
  });
});
