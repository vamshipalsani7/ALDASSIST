/**
 * SC-P01 governance: proof is verifiable artifacts (not testimonial carousels); no banned marketing terms.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PublicHomeScreen } from './PublicHomeScreen';
import { publicHomeScenarios } from '../../fixtures/scenarios/public';

describe('SC-P01 public home', () => {
  it('shows proof, not testimonials, and no banned marketing terms', () => {
    const { container } = render(<PublicHomeScreen loaded={publicHomeScenarios['ready']} />);
    expect(container.textContent).toMatch(/Proof, not promises/i);
    expect(container.textContent).not.toMatch(/testimonial/i);
    expect(container.textContent).not.toMatch(/\baffordable\b|\bcheap\b|starting from/i);
  });
});
