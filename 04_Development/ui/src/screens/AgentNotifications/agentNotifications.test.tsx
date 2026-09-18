/**
 * SC-A14 governance: notifications grouped by class in the fixed order; a Critical notification offers only
 * Acknowledge & act (no mute / no bare dismiss / no mark-read). The context switcher appears only for
 * multi-role users and never blends contexts (CR-5) — a single-role user sees no switcher.
 */
import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { AgentNotificationsScreen } from './AgentNotificationsScreen';
import { agentNotificationsScenarios } from '../../fixtures/scenarios/agent';

describe('SC-A14 agent notifications + context switcher', () => {
  it('shows the context switcher for a multi-role user', () => {
    const { getByRole } = render(<AgentNotificationsScreen loaded={agentNotificationsScenarios['ready']} />);
    const group = getByRole('group', { name: /Switch context/i });
    expect(within(group).getByText(/Agent \(current\)/)).toBeTruthy();
  });

  it('hides the context switcher for a single-role user (no blended contexts)', () => {
    const { queryByRole } = render(<AgentNotificationsScreen loaded={agentNotificationsScenarios['single-role']} />);
    expect(queryByRole('group', { name: /Switch context/i })).toBeNull();
  });

  it('a Critical notification offers only Acknowledge & act — no mute / dismiss / mark-read', () => {
    const { getByRole } = render(<AgentNotificationsScreen loaded={agentNotificationsScenarios['ready']} />);
    const critical = getByRole('heading', { name: /Critical/ }).closest('section')!;
    expect(within(critical).getByRole('button', { name: /Acknowledge & act/i })).toBeTruthy();
    expect(within(critical).queryByRole('button', { name: /mute|dismiss|mark read/i })).toBeNull();
  });
});
