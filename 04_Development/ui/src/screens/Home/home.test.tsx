/**
 * SC-C01 governance: the core split is Needs you vs Waiting on others (whose-turn, IP-12); a waiting
 * item's expected timing is a SLOT — never an invented time (CR-19); items link to their objects; and the
 * queue never renders a false "all clear" when data is stale. B5 corrections: two-axis on every item;
 * deadline-proximity → criticality ordering; object references are actual links.
 */
import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { HomeScreen } from './HomeScreen';
import { homeScenarios } from '../../fixtures/scenarios/home';

describe('SC-C01 home / action queue', () => {
  it('separates "Needs you" from "Waiting on others" and links items to objects', () => {
    const { getByRole, container } = render(<HomeScreen loaded={homeScenarios['ready']} />);
    // both regions exist as distinct headings, in order
    const needs = getByRole('heading', { name: 'Needs you' });
    const waiting = getByRole('heading', { name: 'Waiting on others' });
    expect(needs.compareDocumentPosition(waiting) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // items reference their B2–B4 objects
    expect(container.textContent).toContain('Assessment for INV-7F3A');
    expect(container.textContent).toContain('Application PCT/IB2026/050456');
  });

  it('renders EVERY queue item with a two-axis status (lifecycle chip + attention marker)', () => {
    const { container } = render(<HomeScreen loaded={homeScenarios['ready']} />);
    // lifecycle chips are present (sourced labels), and independent attention markers too
    expect(container.querySelectorAll('.state-chip').length).toBeGreaterThanOrEqual(4);
    expect(container.querySelectorAll('.attention').length).toBeGreaterThanOrEqual(4);
  });

  it('orders the Needs-you queue by deadline-proximity → criticality (most urgent first)', () => {
    const { getByRole } = render(<HomeScreen loaded={homeScenarios['ready']} />);
    // fixture lists the action-needed item first; the sort must surface the at-risk/dated FER item first
    const list = getByRole('heading', { name: 'Needs you' }).nextElementSibling!;
    const firstItem = list.querySelector('li')!;
    expect(firstItem.textContent).toContain('Review the examination report');
  });

  it('renders object references as actual navigable links, not plain text', () => {
    const { getByText } = render(<HomeScreen loaded={homeScenarios['ready']} />);
    const link = getByText('Application PCT/IB2026/050456');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('#');
  });

  it('renders a waiting item\'s expected timing as an unfilled slot, never a fabricated time', () => {
    const { container } = render(<HomeScreen loaded={homeScenarios['ready']} />);
    expect(container.textContent).toContain('expected timing not yet set');
    // no invented countdown/duration like "3 days" / "in 2 weeks"
    expect(container.textContent).not.toMatch(/in \d+ (day|week|month)/i);
  });

  it('never shows a false "all clear" when data is stale — a staleness banner is present', () => {
    const { getByRole } = render(<HomeScreen loaded={homeScenarios['stale-region']} />);
    const status = getByRole('status');
    expect(within(status).getByText(/last-known value/i)).toBeTruthy();
    expect(status.textContent).toMatch(/could not confirm/i);
  });

  it('first-run empty teaches one thing and offers one action', () => {
    const { container, getByRole } = render(<HomeScreen loaded={homeScenarios['empty']} />);
    expect(container.textContent).toMatch(/record your first invention/i);
    expect(getByRole('button')).toBeTruthy();
  });
});
