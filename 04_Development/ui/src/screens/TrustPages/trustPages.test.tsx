/**
 * SC-P14 governance: model providers are named publicly (AI page); the limitations page states the
 * 18-month blind spot honestly; legal wording is a counsel container (L4), never authored here.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TrustPagesScreen } from './TrustPagesScreen';
import { trustScenarios } from '../../fixtures/scenarios/public';

describe('SC-P14 trust pages', () => {
  it('names model providers on the AI page and defers legal wording to counsel', () => {
    const { container } = render(<TrustPagesScreen loaded={trustScenarios['ai']} />);
    expect(container.textContent).toMatch(/Model providers/i);
    expect(container.textContent).toMatch(/follows counsel review/i);
  });

  it('states the 18-month blind spot on the limitations page', () => {
    const { container } = render(<TrustPagesScreen loaded={trustScenarios['limitations']} />);
    expect(container.textContent).toMatch(/18 months/i);
  });
});
