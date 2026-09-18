/**
 * SC-O05 governance: metric definitions/targets are transcribed from Metrics.md; OP-2's target stays
 * UNCALIBRATED (pending); OP-5 keeps its platform-attributable vs total split; current values are pending
 * (no fabricated figures, no charts, CR-19).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BusinessDashboardScreen } from './BusinessDashboardScreen';
import { businessScenarios } from '../../fixtures/scenarios/ops';

describe('SC-O05 business metrics', () => {
  it('shows OP-1 target >25% and keeps OP-2 target uncalibrated', () => {
    const { container } = render(<BusinessDashboardScreen loaded={businessScenarios['ready']} />);
    expect(container.textContent).toContain('>25%');
    expect(container.textContent).toMatch(/uncalibrated — not yet set/i);
  });

  it('keeps the OP-5 platform-attributable vs total split', () => {
    const { container } = render(<BusinessDashboardScreen loaded={businessScenarios['ready']} />);
    expect(container.textContent).toMatch(/platform-attributable/i);
    expect(container.textContent).toMatch(/total operational/i);
    expect(container.textContent).toMatch(/Sev-1/);
    expect(container.textContent).toMatch(/No zero bar/i);
  });

  it('shows current values as pending and invents no figures or currency', () => {
    const { container } = render(<BusinessDashboardScreen loaded={businessScenarios['ready']} />);
    expect(container.textContent).toMatch(/not yet measured/i);
    expect(container.textContent).not.toMatch(/[₹$€£]\s*\d/);
    expect(container.textContent).not.toMatch(/marketplace/i);
  });
});
