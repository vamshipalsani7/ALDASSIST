/**
 * CR-5 — cross-tenant invisibility. A `not-found` response must reveal NOTHING about the protected
 * object, and must be distinct from same-tenancy `permission-denied`.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AssessmentVerdictScreen } from './AssessmentVerdictScreen';
import { assessmentScenarios } from '../../fixtures/scenarios/assessment';

// Every string that would identify the protected object in any other scenario.
const IDENTITY_LEAKS = [
  'INV-7F3A',
  'inv_7F3A',
  'asmt_DEMO_0001',
  'Assessment — Invention',
  'Disclosure v3',
  'doc_disc_v3',
  'A. Reviewer',
  'Signal processing',
  'Overview', // a tab label
  'Related', // relationship rail
  'Inventions', // breadcrumb
];

describe('CR-5 cross-tenant 404 hides object identity', () => {
  it('exposes no object identity on not-found', () => {
    const { container } = render(<AssessmentVerdictScreen loaded={assessmentScenarios['not-found']} />);
    const html = container.innerHTML;
    for (const leak of IDENTITY_LEAKS) {
      expect(html).not.toContain(leak);
    }
    expect(container.textContent).toContain('does not exist');
  });

  it('is distinct from same-tenancy permission-denied', () => {
    const notFound = render(<AssessmentVerdictScreen loaded={assessmentScenarios['not-found']} />);
    const denied = render(<AssessmentVerdictScreen loaded={assessmentScenarios['permission-denied']} />);
    // Different markup, and only permission-denied names who to ask.
    expect(notFound.container.innerHTML).not.toEqual(denied.container.innerHTML);
    expect(denied.container.textContent).toContain('Ask the Workspace Owner');
    expect(notFound.container.textContent).not.toContain('Ask the Workspace Owner');
  });

  it('cross-checks: the released scenario DOES contain identity (guards the leak list)', () => {
    const { container } = render(<AssessmentVerdictScreen loaded={assessmentScenarios['released-favourable']} />);
    expect(container.innerHTML).toContain('INV-7F3A');
  });
});
