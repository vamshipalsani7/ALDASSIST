/**
 * SC-C19 governance: engage/pay is Owner-only (non-Owner → visible-but-locked, routed to the Owner, never
 * auto-escalated — IP-15); money/engagement appear only here, after the free assessment (P5:X5/ADR:§7);
 * contracting-parties wording is an L1 container (never invented); the quote is a PriceDisplay container.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { QuoteEngagementScreen } from './QuoteEngagementScreen';
import { quoteScenarios } from '../../fixtures/scenarios/matters';

describe('SC-C19 engage/pay Owner-only (IP-15)', () => {
  it('a non-Owner sees a locked reason and who can act — routed to the Owner, not auto-escalated', () => {
    const { container } = render(<QuoteEngagementScreen loaded={quoteScenarios['permission-denied']} />);
    expect(container.textContent).toContain('limited to the Workspace Owner');
    expect(container.textContent).toMatch(/sent to the Workspace Owner/i);
    // the engage action itself is not offered to a non-Owner
    expect(container.querySelector('button')).toBeNull();
  });
});

describe('SC-C19 trust boundary + L1 container', () => {
  it('states money/engagement appear only here after the free assessment', () => {
    const { container } = render(<QuoteEngagementScreen loaded={quoteScenarios['ready']} />);
    expect(container.textContent).toMatch(/first point where money and engagement appear/i);
    expect(container.textContent).toMatch(/free, with no payment and no engagement/i);
  });
  it('renders contracting parties as an L1 container, never invented terms', () => {
    const { container } = render(<QuoteEngagementScreen loaded={quoteScenarios['ready']} />);
    expect(container.textContent).toMatch(/contracting parties and fee terms will appear here once provided/i);
  });
  it('engagement failure states nothing is at risk (no matter created)', () => {
    const { container } = render(<QuoteEngagementScreen loaded={quoteScenarios['error']} />);
    expect(container.textContent).toMatch(/nothing is at risk/i);
  });
});
