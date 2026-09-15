/**
 * SC-C16 governance: Owner/Admin only (Member/Viewer → visible-but-locked with who-can-act, IP-15);
 * official fees separately identifiable; no invented figures.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CostsScreen } from './CostsScreen';
import { costsScenarios } from '../../fixtures/scenarios/matters';

describe('SC-C16 costs access + fee separability', () => {
  it('Member/Viewer is locked out with a reason and who can act', () => {
    const { container } = render(<CostsScreen loaded={costsScenarios['permission-denied']} />);
    expect(container.textContent).toContain('Costs are visible to the Owner and Admins');
    expect(container.textContent).toMatch(/Ask the Workspace Owner/i);
  });
  it('Owner view shows official fees separately and invents no figures', () => {
    const { container } = render(<CostsScreen loaded={costsScenarios['ready']} />);
    expect(container.textContent).toContain('Official fee');
    expect(container.textContent).toContain('amount not set');
    expect(container.textContent).not.toMatch(/[₹$€£]\s*\d/);
  });
});
