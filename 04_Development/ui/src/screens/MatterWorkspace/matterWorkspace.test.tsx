/**
 * SC-C15 governance: the four questions are always answered (P4:§15.4); CR-5 cross-tenant invisibility;
 * messaging is matter-confined.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MatterWorkspaceScreen } from './MatterWorkspaceScreen';
import { matterWorkspaceScenarios } from '../../fixtures/scenarios/matters';

describe('SC-C15 matter workspace', () => {
  it('answers the four questions in the header', () => {
    const { container } = render(<MatterWorkspaceScreen loaded={matterWorkspaceScenarios['ready']} />);
    for (const label of ['Where', "What's next", 'Needs you', 'Cost']) {
      expect(container.textContent).toContain(label);
    }
  });
  it('confines messaging to the matter', () => {
    const { container } = render(<MatterWorkspaceScreen loaded={matterWorkspaceScenarios['ready']} />);
    expect(container.textContent).toMatch(/stay within this matter/i);
  });
  it('CR-5: not-found reveals nothing about the matter', () => {
    const { container } = render(<MatterWorkspaceScreen loaded={{ state: 'not-found' }} />);
    for (const leak of ['Matter M-2026-014', 'Engaged', 'Matters']) {
      expect(container.innerHTML).not.toContain(leak);
    }
    expect(container.textContent).toContain('does not exist');
  });
});
