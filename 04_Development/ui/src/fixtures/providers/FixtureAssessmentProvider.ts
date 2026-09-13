/**
 * ALDASSIST Phase 8 — fixtures: FixtureAssessmentProvider (B0 §6.1).
 * Implements the AssessmentProvider port with static scenario data. Phase 9 replaces this with an
 * ApiProvider behind the IDENTICAL interface; the UI is unchanged.
 */
import type { AssessmentProvider, Loaded, AssessmentVM } from '../../contract';
import { assessmentScenarios, type AssessmentScenarioId } from '../scenarios/assessment';

export class FixtureAssessmentProvider implements AssessmentProvider {
  constructor(private readonly scenario: AssessmentScenarioId) {}

  async get(_inventionId: string, _assessmentId: string): Promise<Loaded<AssessmentVM>> {
    return assessmentScenarios[this.scenario];
  }
}
