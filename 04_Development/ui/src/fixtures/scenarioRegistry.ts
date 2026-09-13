/**
 * ALDASSIST Phase 8 — fixtures: scenario registry for the B1 demo scenario switcher.
 * Lets the running app (and Storybook) demonstrate every mandated state of SC-C08.
 */
import type { AssessmentScenarioId } from './scenarios/assessment';

export interface ScenarioGroup {
  label: string;
  ids: { id: AssessmentScenarioId; label: string }[];
}

export const assessmentScenarioGroups: ScenarioGroup[] = [
  {
    label: 'Pre-release (no verdict is representable — CR-2)',
    ids: [
      { id: 'analysing', label: 'Analysing (platform)' },
      { id: 'in-review', label: 'In review (reviewer)' },
    ],
  },
  {
    label: 'Released verdicts',
    ids: [
      { id: 'released-favourable', label: 'Looks protectable' },
      { id: 'released-qualified', label: 'Protectable with changes' },
      { id: 'released-unfavourable', label: 'Unlikely to be protectable' },
      { id: 'inconclusive', label: 'Not enough to assess' },
      { id: 'provenance-unresolved', label: 'Released — a citation could not resolve (fail-safe)' },
    ],
  },
  {
    label: 'Availability states',
    ids: [
      { id: 'loading', label: 'Loading' },
      { id: 'empty', label: 'Empty' },
      { id: 'error', label: 'Error' },
      { id: 'permission-denied', label: 'Permission denied (same tenancy)' },
      { id: 'not-found', label: 'Not found (cross-tenant 404)' },
    ],
  },
];

export const defaultScenario: AssessmentScenarioId = 'released-unfavourable';
