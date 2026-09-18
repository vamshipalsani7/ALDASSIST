/**
 * SC-A04 governance: DR-02 stays OPEN — import performs NO de-duplication and says so; incomplete data
 * states exactly what is missing per matter while complete matters still import; scope is the agent's own
 * tenancy, not marketplace matters.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MatterImportScreen } from './MatterImportScreen';
import { matterImportScenarios } from '../../fixtures/scenarios/agent';

describe('SC-A04 matter import', () => {
  it('DR-02 agnostic: states that no automatic de-duplication is performed', () => {
    const { container } = render(<MatterImportScreen loaded={matterImportScenarios['ready']} />);
    expect(container.textContent).toMatch(/no automatic de-duplication/i);
  });

  it('names exactly what is missing per incomplete matter, and keeps complete matters importable', () => {
    const { container } = render(<MatterImportScreen loaded={matterImportScenarios['ready']} />);
    expect(container.textContent).toMatch(/Missing: Filing date, Application number/);
    expect(container.textContent).toMatch(/complete matters above still import/i);
  });

  it('scopes import to own practice, not marketplace matters', () => {
    const { container } = render(<MatterImportScreen loaded={matterImportScenarios['ready']} />);
    expect(container.textContent).not.toMatch(/marketplace/i);
    expect(container.textContent).toMatch(/own-practice matters/i);
  });
});
