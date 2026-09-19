/**
 * SC-P13 governance: outcome statistics only at n≥20 with sample size + confidence, below floor → "not
 * enough data yet" (D-2026-019); publication go-live is L3-gated; professional-fee display is an L1-04
 * container; Engage is account-gated; confidence representation stays a slot.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AgentPublicProfileScreen } from './AgentPublicProfileScreen';
import { agentProfileScenarios } from '../../fixtures/scenarios/public';

describe('SC-P13 public agent profile', () => {
  it('published stats show sample size with confidence as a slot, and an L3 publication gate', () => {
    const { container } = render(<AgentPublicProfileScreen loaded={agentProfileScenarios['ready']} />);
    expect(container.textContent).toMatch(/n = 24/);
    expect(container.textContent).toMatch(/confidence representation not yet set/i);
    expect(container.textContent).toMatch(/gated on legal review/i);
  });

  it('below-floor shows "not enough data yet", never a statistic', () => {
    const { container } = render(<AgentPublicProfileScreen loaded={agentProfileScenarios['below-floor']} />);
    expect(container.textContent).toMatch(/not enough data yet/i);
    expect(container.textContent).not.toMatch(/n = \d/);
  });

  it('professional fee is an L1 container and Engage needs an account', () => {
    const { container } = render(<AgentPublicProfileScreen loaded={agentProfileScenarios['ready']} />);
    expect(container.textContent).toMatch(/follows legal review/i);
    expect(container.textContent).toMatch(/needs an account/i);
  });
});
