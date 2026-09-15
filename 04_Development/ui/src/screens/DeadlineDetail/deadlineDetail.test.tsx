/**
 * SC-C13 governance: CR-5 cross-tenant invisibility; the trace fail-safe (unavailable → the date stands,
 * NO fabricated basis); and "the client cannot confirm a critical deadline" — the client acknowledges only,
 * confirmation is an agent/ops act (BR-03).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DeadlineDetailScreen } from './DeadlineDetailScreen';
import { deadlineDetailScenarios } from '../../fixtures/scenarios/portfolio';

describe('SC-C13 CR-5 cross-tenant 404', () => {
  it('exposes no deadline identity on not-found', () => {
    const { container } = render(<DeadlineDetailScreen loaded={{ state: 'not-found' }} />);
    for (const leak of ['FER response', '2026/DEL/000123', 'IN-FER-RESPONSE', 'Deadlines']) {
      expect(container.innerHTML).not.toContain(leak);
    }
    expect(container.textContent).toContain('does not exist');
  });
});

describe('SC-C13 trace fail-safe (no fabricated basis)', () => {
  it('available: shows the full computation trace', () => {
    const { container } = render(<DeadlineDetailScreen loaded={deadlineDetailScenarios['ready']} />);
    expect(container.textContent).toContain('IN-FER-RESPONSE');
    expect(container.textContent).toMatch(/Statutory basis/);
  });
  it('unavailable: shows the date + honest "unavailable", and NO fabricated trace fields', () => {
    const { container } = render(<DeadlineDetailScreen loaded={deadlineDetailScenarios['trace-unavailable']} />);
    expect(container.textContent).toContain('2026-10-15'); // the date still stands
    expect(container.textContent).toContain('trace is temporarily unavailable');
    expect(container.textContent).toContain('we do not show a basis we cannot verify');
    // none of the trace detail is fabricated when unavailable
    expect(container.textContent).not.toContain('IN-FER-RESPONSE');
    expect(container.textContent).not.toMatch(/Statutory basis/);
  });
});

describe('SC-C13 client acknowledges — cannot confirm (BR-03)', () => {
  it('offers an Acknowledge action, not a Confirm control, and states confirmation is agent/ops', () => {
    const { container, getByRole } = render(<DeadlineDetailScreen loaded={deadlineDetailScenarios['ready']} />);
    expect(getByRole('button', { name: /Acknowledge/i })).toBeTruthy();
    // no client-facing "Confirm" control on this screen
    const buttons = Array.from(container.querySelectorAll('button')).map((b) => b.textContent ?? '');
    expect(buttons.some((t) => /^Confirm\b/i.test(t.trim()))).toBe(false);
    expect(container.textContent).toContain('confirmed by your Verified Agent or Docket Ops');
  });
});
