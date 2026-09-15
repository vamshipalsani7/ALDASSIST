/**
 * SC-C12 governance: client-facing label is "Deadlines" (never the agent "Docket"); each row shows the
 * state axis AND a criticality axis as icon + text (never colour-only, CR-4 / P4:§22.3).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DeadlinesIndexScreen } from './DeadlinesIndexScreen';
import { deadlinesScenarios } from '../../fixtures/scenarios/portfolio';

describe('SC-C12 deadlines index', () => {
  it('uses the client label "Deadlines", never "Docket"', () => {
    const { getByRole, container } = render(<DeadlinesIndexScreen loaded={deadlinesScenarios['ready']} />);
    expect(getByRole('heading', { name: 'Deadlines' })).toBeTruthy();
    expect(container.textContent).not.toContain('Docket');
  });

  it('shows the state axis and the criticality axis with an icon (not colour-only)', () => {
    const { container } = render(<DeadlinesIndexScreen loaded={deadlinesScenarios['ready']} />);
    // state axis (enumerated P4:§11.5)
    expect(container.textContent).toContain('Approaching');
    // criticality axis: label text + an icon (svg), never colour alone
    expect(container.textContent).toContain('Critical (demo)');
    const critCell = Array.from(container.querySelectorAll('td')).find((td) => td.textContent?.includes('Critical (demo)'));
    expect(critCell?.querySelector('svg')).not.toBeNull();
  });
});
