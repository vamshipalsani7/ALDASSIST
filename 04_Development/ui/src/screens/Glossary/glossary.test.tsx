/**
 * SC-P10 governance: dual-register (plain-language + term-of-art) and the shared-record note (the public
 * glossary cannot diverge from the in-product tooltip record).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GlossaryScreen } from './GlossaryScreen';
import { glossaryScenarios } from '../../fixtures/scenarios/public';

describe('SC-P10 glossary', () => {
  it('shows both plain-language and term-of-art, and the shared-record note', () => {
    const { container } = render(<GlossaryScreen loaded={glossaryScenarios['term']} />);
    expect(container.textContent).toMatch(/In plain language/i);
    expect(container.textContent).toMatch(/Term of art/i);
    expect(container.textContent).toMatch(/same record as the in-product tooltip/i);
  });
});
