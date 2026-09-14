/**
 * CR-5 — cross-tenant invisibility for SC-C04. A `not-found` response must reveal NOTHING about the
 * protected invention, and must be distinct from same-tenancy `permission-denied` (CR-12).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { InventionDetailScreen } from './InventionDetailScreen';
import { inventionDetailScenarios } from '../../fixtures/scenarios/vault';

const IDENTITY_LEAKS = [
  'INV-7F3A',
  'Invention INV-7F3A',
  'Signal processing',
  'Disclosure v3',
  'Assessment (released)',
  'Overview', // a tab label
  'Applications', // a tab label
  'Inventions', // breadcrumb
];

describe('SC-C04 cross-tenant 404 hides invention identity (CR-5)', () => {
  it('exposes no object identity on not-found', () => {
    const { container } = render(<InventionDetailScreen loaded={{ state: 'not-found' }} />);
    for (const leak of IDENTITY_LEAKS) {
      expect(container.innerHTML).not.toContain(leak);
    }
    expect(container.textContent).toContain('does not exist');
    expect(container.querySelector('[role="tablist"]')).toBeNull();
  });

  it('is distinct from same-tenancy permission-denied', () => {
    const notFound = render(<InventionDetailScreen loaded={{ state: 'not-found' }} />);
    const denied = render(<InventionDetailScreen loaded={inventionDetailScenarios['permission-denied']} />);
    expect(notFound.container.innerHTML).not.toEqual(denied.container.innerHTML);
    expect(denied.container.textContent).toContain('Ask the Workspace Owner');
    expect(notFound.container.textContent).not.toContain('Ask the Workspace Owner');
  });

  it('cross-checks: the ready scenario DOES contain identity (guards the leak list)', () => {
    const { container } = render(<InventionDetailScreen loaded={inventionDetailScenarios.ready} />);
    expect(container.innerHTML).toContain('INV-7F3A');
    expect(container.querySelector('[role="tablist"]')).not.toBeNull();
  });
});
