/**
 * SC-P02 governance: the public register search is Zone-2 (labelled, distinct from the app); a
 * confidentiality notice + own-invention warning route a suspected own invention to the Vault (FR-S11);
 * register data carries source/freshness; save is account-gated; zero results teach honestly.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PatentSearchScreen } from './PatentSearchScreen';
import { patentSearchScenarios } from '../../fixtures/scenarios/public';

describe('SC-P02 patent search', () => {
  it('labels the search as the public register (Zone-2) and shows source/freshness', () => {
    const { container } = render(<PatentSearchScreen loaded={patentSearchScenarios['ready']} />);
    expect(container.textContent).toMatch(/public register/i);
    expect(container.textContent).toMatch(/Zone 2/);
    expect(container.textContent).toMatch(/source:/i);
  });

  it('shows the confidentiality notice and routes an own invention to the Vault (FR-S11)', () => {
    const { container } = render(<PatentSearchScreen loaded={patentSearchScenarios['ready']} />);
    expect(container.textContent).toMatch(/do not describe it here/i);
    expect(container.textContent).toMatch(/Vault/);
  });

  it('save search is account-gated', () => {
    const { container } = render(<PatentSearchScreen loaded={patentSearchScenarios['ready']} />);
    expect(container.textContent).toMatch(/needs a free account/i);
  });

  it('zero results teach honestly (searched / why / adjustment / alternate path)', () => {
    const { container } = render(<PatentSearchScreen loaded={patentSearchScenarios['empty']} />);
    expect(container.textContent).toMatch(/No results/i);
    expect(container.textContent).toMatch(/record it privately in the Vault/i);
  });
});
