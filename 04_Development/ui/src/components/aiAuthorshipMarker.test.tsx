/**
 * AiAuthorshipMarker (B9): the shared AI-authorship marker (CR-6 / IP-07).
 *  - Always renders the structural `.ai-marker__label` badge so AI-authored content is never shown as
 *    human-authored.
 *  - Inline vs block modes are faithful to the existing markup (badge alone / bordered container).
 *  - The descriptor is a prop — per-context wording is preserved, never normalised.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AiAuthorshipMarker } from './AiAuthorshipMarker';

describe('AiAuthorshipMarker', () => {
  it('inline mode renders the labelled badge alone (no bordered container)', () => {
    const { container } = render(<AiAuthorshipMarker />);
    const badge = container.querySelector('.ai-marker__label');
    expect(badge).not.toBeNull();
    expect(badge?.textContent).toBe('AI-generated');
    expect(container.querySelector('.ai-marker')).toBeNull();
  });

  it('block mode wraps children in the bordered container and keeps the badge', () => {
    const { container } = render(
      <AiAuthorshipMarker block label="AI-generated analysis">
        <p>reasoning</p>
      </AiAuthorshipMarker>,
    );
    expect(container.querySelector('.ai-marker')).not.toBeNull();
    expect(container.querySelector('.ai-marker__label')?.textContent).toBe('AI-generated analysis');
    expect(container.textContent).toContain('reasoning');
  });

  it('preserves the per-context descriptor verbatim', () => {
    const { container } = render(<AiAuthorshipMarker label="AI-generated analysis" />);
    expect(container.querySelector('.ai-marker__label')?.textContent).toBe('AI-generated analysis');
  });
});
