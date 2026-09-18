/**
 * SC-O04 governance: OP-6's target, must-hold threshold and three-clause "material" definition are shown
 * EXACTLY as sourced (Metrics.md / D-2026-018); the validation step stays a pending SLOT; current metric
 * values are pending (never invented).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { QualityConsoleScreen } from './QualityConsoleScreen';
import { qualityScenarios } from '../../fixtures/scenarios/ops';

describe('SC-O04 quality & review', () => {
  it('displays OP-6 target <15% and must-hold threshold <20% exactly', () => {
    const { container } = render(<QualityConsoleScreen loaded={qualityScenarios['ready']} />);
    expect(container.textContent).toContain('<15% (falling toward)');
    expect(container.textContent).toContain('<20%');
  });

  it('displays the three-clause "material" definition and the provenance rule', () => {
    const { container } = render(<QualityConsoleScreen loaded={qualityScenarios['ready']} />);
    expect(container.textContent).toMatch(/Changes the verdict outcome/i);
    expect(container.textContent).toMatch(/Adds, removes or changes a citation \(provenance\)/i);
    expect(container.textContent).toMatch(/substantive conclusion the client would rely on/i);
    expect(container.textContent).toMatch(/Any provenance change is material by rule/i);
    expect(container.textContent).toMatch(/Stylistic, clarity, formatting and reordering edits are non-material/i);
  });

  it('keeps the material-diff validation step a pending slot and metric values unmeasured', () => {
    const { container } = render(<QualityConsoleScreen loaded={qualityScenarios['ready']} />);
    expect(container.textContent).toMatch(/validation step is not yet defined/i);
    expect(container.textContent).toMatch(/not yet measured/i);
  });
});
