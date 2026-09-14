/**
 * ALDASSIST Phase 8 — fixtures: Vault-path FixtureProviders (B0 §6.1) for B2.
 * Each implements a contract port with static scenario data, selected by a scenario key.
 * Phase 9 replaces each with an ApiProvider behind the IDENTICAL interface; the UI is unchanged.
 */
import type {
  Loaded, WorkspaceSetupProvider, WorkspaceSetupVM, InventionsProvider, InventionsIndexVM,
  DisclosureCaptureProvider, DisclosureCaptureVM, InventionDetailProvider, InventionDetailVM,
  DisclosureVersionsProvider, DisclosureVersionsVM, AssessmentRequestProvider, AssessmentRequestVM,
  AssessmentsListProvider, AssessmentsListVM, DecisionProvider, DecisionVM,
} from '../../contract';
import {
  workspaceSetupScenarios, inventionsIndexScenarios, disclosureCaptureScenarios,
  inventionDetailScenarios, disclosureVersionsScenarios, assessmentRequestScenarios,
  assessmentsListScenarios, decisionScenarios,
} from '../scenarios/vault';

type Key<M> = keyof M;

export class FixtureWorkspaceSetupProvider implements WorkspaceSetupProvider {
  constructor(private readonly scenario: Key<typeof workspaceSetupScenarios> = 'create') {}
  async get(): Promise<Loaded<WorkspaceSetupVM>> { return workspaceSetupScenarios[this.scenario]; }
}
export class FixtureInventionsProvider implements InventionsProvider {
  constructor(private readonly scenario: Key<typeof inventionsIndexScenarios> = 'ready') {}
  async list(): Promise<Loaded<InventionsIndexVM>> { return inventionsIndexScenarios[this.scenario]; }
}
export class FixtureDisclosureCaptureProvider implements DisclosureCaptureProvider {
  constructor(private readonly scenario: Key<typeof disclosureCaptureScenarios> = 'ready') {}
  async get(): Promise<Loaded<DisclosureCaptureVM>> { return disclosureCaptureScenarios[this.scenario]; }
}
export class FixtureInventionDetailProvider implements InventionDetailProvider {
  constructor(private readonly scenario: Key<typeof inventionDetailScenarios> = 'ready') {}
  async get(): Promise<Loaded<InventionDetailVM>> { return inventionDetailScenarios[this.scenario]; }
}
export class FixtureDisclosureVersionsProvider implements DisclosureVersionsProvider {
  constructor(private readonly scenario: Key<typeof disclosureVersionsScenarios> = 'ready') {}
  async get(): Promise<Loaded<DisclosureVersionsVM>> { return disclosureVersionsScenarios[this.scenario]; }
}
export class FixtureAssessmentRequestProvider implements AssessmentRequestProvider {
  constructor(private readonly scenario: Key<typeof assessmentRequestScenarios> = 'ready') {}
  async get(): Promise<Loaded<AssessmentRequestVM>> { return assessmentRequestScenarios[this.scenario]; }
}
export class FixtureAssessmentsListProvider implements AssessmentsListProvider {
  constructor(private readonly scenario: Key<typeof assessmentsListScenarios> = 'ready') {}
  async list(): Promise<Loaded<AssessmentsListVM>> { return assessmentsListScenarios[this.scenario]; }
}
export class FixtureDecisionProvider implements DecisionProvider {
  constructor(private readonly scenario: Key<typeof decisionScenarios> = 'ready') {}
  async get(): Promise<Loaded<DecisionVM>> { return decisionScenarios[this.scenario]; }
}
