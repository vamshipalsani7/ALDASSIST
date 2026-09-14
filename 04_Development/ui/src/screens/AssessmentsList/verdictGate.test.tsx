/**
 * SC-C07 — CR-2 verdict gate on the assessments list. A verdict label may appear ONLY on a released
 * row; pre-release rows (Analysing / In review) never show a verdict.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AssessmentsListScreen } from './AssessmentsListScreen';
import { assessmentsListScenarios } from '../../fixtures/scenarios/vault';
import type { Loaded, AssessmentsListVM } from '../../contract';

describe('SC-C07 no verdict before release (CR-2)', () => {
  it('shows a verdict for the released row and none for the in-review row', () => {
    const { container, getAllByRole } = render(<AssessmentsListScreen loaded={assessmentsListScenarios.ready} />);
    // released row carries its verdict label...
    expect(container.textContent).toContain('Protectable with changes');
    // ...and the pre-release row is shown as not released, never with a verdict.
    expect(container.textContent).toContain('Not released yet');

    const rows = getAllByRole('row').slice(1); // drop header
    const inReviewRow = rows.find((r) => r.textContent?.includes('In review'));
    expect(inReviewRow).toBeTruthy();
    // No verdict wording leaks into the in-review row.
    for (const verdict of ['Looks protectable', 'Protectable with changes', 'Unlikely to be protectable', 'Not enough to assess']) {
      expect(inReviewRow!.textContent).not.toContain(verdict);
    }
  });

  it('a verdict on a NON-released row is never exposed (the lifecycle is the gate)', () => {
    // Adversarial VM: an in-review row that wrongly carries a verdict label. The screen must gate on
    // status.lifecycle === "released" and therefore MUST NOT render the verdict.
    const tampered: Loaded<AssessmentsListVM> = {
      state: 'ready',
      data: {
        inventionId: 'INV-7F3A',
        rows: [
          {
            id: 'asmt_TAMPER',
            status: { lifecycle: 'in-review', attention: 'on-track' },
            requestedDate: '2026-09-01',
            assessedVersion: 'v2',
            reviewerName: 'A. Reviewer, Verified Agent (demo)',
            verdictLabel: 'looks-protectable', // must NOT be shown while in-review (CR-2)
          },
        ],
      },
    };
    const { container } = render(<AssessmentsListScreen loaded={tampered} />);
    expect(container.textContent).toContain('In review');
    expect(container.textContent).toContain('Not released yet');
    expect(container.textContent).not.toContain('Looks protectable');
  });
});
