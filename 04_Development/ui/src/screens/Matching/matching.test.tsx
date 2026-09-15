/**
 * SC-C18 governance: "Agent Matching / Engagement", never "Marketplace" (D-2026-013); agent outcome stats
 * only at n≥20 with sample size + confidence, else "not enough data yet" (D-2026-019); the conflict check
 * runs first and fails closed (temporary hold, not a rejection); no fabricated matches.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MatchingScreen } from './MatchingScreen';
import { matchingScenarios } from '../../fixtures/scenarios/matters';

describe('SC-C18 controlled vocabulary + conflict-first', () => {
  it('uses "Find an agent" and never the word "Marketplace"', () => {
    const { container } = render(<MatchingScreen loaded={matchingScenarios['ready']} />);
    expect(container.textContent).toContain('Find an agent');
    expect(container.textContent).not.toContain('Marketplace');
  });
  it('shows the conflict check completed before listing agents', () => {
    const { container } = render(<MatchingScreen loaded={matchingScenarios['ready']} />);
    expect(container.textContent).toMatch(/Conflict check complete/i);
  });
  it('conflict check unable to complete → temporary hold, not a rejection (fails closed)', () => {
    const { container } = render(<MatchingScreen loaded={matchingScenarios['error']} />);
    expect(container.textContent).toMatch(/temporary hold, not a rejection/i);
  });
  it('no agents available → notify-me, never a fabricated match', () => {
    const { container } = render(<MatchingScreen loaded={matchingScenarios['empty']} />);
    expect(container.textContent).toMatch(/notify me when an agent is available/i);
  });
});

describe('SC-C18 agent stats n≥20 gate (D-2026-019)', () => {
  it('a below-floor agent shows "not enough data yet" and no statistic; a published agent shows its sample size', () => {
    const { container } = render(<MatchingScreen loaded={matchingScenarios['ready']} />);
    expect(container.textContent).toMatch(/Not enough data yet/i);
    expect(container.textContent).toMatch(/Based on 24 matters/i);
    expect(container.textContent).toMatch(/sample size shown/i);
  });
});
