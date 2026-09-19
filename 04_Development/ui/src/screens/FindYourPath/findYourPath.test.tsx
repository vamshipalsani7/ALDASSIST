/**
 * SC-P08 governance: no email required; the cost range is a SLOT — when unavailable the recommendation is
 * shown WITHOUT a fabricated figure (CR-19).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { FindYourPathScreen } from './FindYourPathScreen';
import { findYourPathScenarios } from '../../fixtures/scenarios/public';

describe('SC-P08 find-your-path', () => {
  it('requires no email', () => {
    const { container } = render(<FindYourPathScreen loaded={findYourPathScenarios['ready']} />);
    expect(container.textContent).toMatch(/No email required/i);
  });

  it('shows the recommendation without a fabricated cost figure when the range is a pending slot', () => {
    const { container } = render(<FindYourPathScreen loaded={findYourPathScenarios['ready']} />);
    expect(container.textContent).toMatch(/the recommendation stands/i);
    expect(container.textContent).not.toMatch(/[₹$€£]\s*\d/);
  });
});
