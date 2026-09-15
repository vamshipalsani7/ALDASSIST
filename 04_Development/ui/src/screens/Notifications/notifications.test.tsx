/**
 * SC-C21 governance: notifications are grouped by CLASS in a fixed order (enforced by the screen, not the
 * data); a Critical notification is unmutable and cannot be dismissed without acknowledgement/action —
 * so it offers ONLY an "Acknowledge & act" affordance (no mute, no bare dismiss); other classes offer a
 * calm "Mark read"; empty is the honest "You're all caught up"; no fabricated urgency (CR-19).
 */
import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { NotificationsScreen } from './NotificationsScreen';
import { notificationsScenarios } from '../../fixtures/scenarios/home';

describe('SC-C21 notification centre', () => {
  it('groups by class in the fixed order', () => {
    const { getAllByRole } = render(<NotificationsScreen loaded={notificationsScenarios['ready']} />);
    const headings = getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(headings).toEqual([
      expect.stringContaining('Critical'),
      expect.stringContaining('Action required'),
      expect.stringContaining('Progress'),
      expect.stringContaining('Informational'),
      expect.stringContaining('Reassurance'),
    ]);
  });

  it('a Critical notification is unmutable / undismissable — only an acknowledge-and-act affordance', () => {
    const { getByRole } = render(<NotificationsScreen loaded={notificationsScenarios['ready']} />);
    const critical = getByRole('heading', { name: /Critical/ }).closest('section')!;
    expect(within(critical).getByRole('button', { name: /Acknowledge & act/i })).toBeTruthy();
    expect(within(critical).queryByRole('button', { name: /mute/i })).toBeNull();
    expect(within(critical).queryByRole('button', { name: /dismiss/i })).toBeNull();
    expect(within(critical).queryByRole('button', { name: /mark read/i })).toBeNull();
  });

  it('non-critical classes offer a calm "Mark read"', () => {
    const { getByRole } = render(<NotificationsScreen loaded={notificationsScenarios['ready']} />);
    const progress = getByRole('heading', { name: /Progress/ }).closest('section')!;
    expect(within(progress).getByRole('button', { name: /Mark read/i })).toBeTruthy();
  });

  it('empty is a positive, honest state', () => {
    const { container } = render(<NotificationsScreen loaded={notificationsScenarios['empty']} />);
    expect(container.textContent).toMatch(/all caught up/i);
  });
});
