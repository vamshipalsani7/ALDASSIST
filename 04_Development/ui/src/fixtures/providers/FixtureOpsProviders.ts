/**
 * ALDASSIST Phase 8 — fixtures: Operations-surface FixtureProviders (B7). Each implements a contract port
 * with static scenario data. Phase 9 replaces each with an ApiProvider behind the IDENTICAL interface;
 * the UI is unchanged.
 */
import type {
  Loaded, DocketHealthProvider, DocketHealthVM, AgentVerificationProvider, AgentVerificationVM,
  RuleAuthoringProvider, RuleAuthoringVM, QualityConsoleProvider, QualityConsoleVM,
  BusinessDashboardProvider, BusinessDashboardVM,
} from '../../contract';
import {
  docketHealthScenarios, agentVerificationScenarios, ruleAuthoringScenarios, qualityScenarios,
  businessScenarios,
} from '../scenarios/ops';

type Key<M> = keyof M;

export class FixtureDocketHealthProvider implements DocketHealthProvider {
  constructor(private readonly scenario: Key<typeof docketHealthScenarios> = 'ready') {}
  async get(): Promise<Loaded<DocketHealthVM>> { return docketHealthScenarios[this.scenario]; }
}
export class FixtureAgentVerificationProvider implements AgentVerificationProvider {
  constructor(private readonly scenario: Key<typeof agentVerificationScenarios> = 'ready') {}
  async get(): Promise<Loaded<AgentVerificationVM>> { return agentVerificationScenarios[this.scenario]; }
}
export class FixtureRuleAuthoringProvider implements RuleAuthoringProvider {
  constructor(private readonly scenario: Key<typeof ruleAuthoringScenarios> = 'ready') {}
  async get(): Promise<Loaded<RuleAuthoringVM>> { return ruleAuthoringScenarios[this.scenario]; }
}
export class FixtureQualityConsoleProvider implements QualityConsoleProvider {
  constructor(private readonly scenario: Key<typeof qualityScenarios> = 'ready') {}
  async get(): Promise<Loaded<QualityConsoleVM>> { return qualityScenarios[this.scenario]; }
}
export class FixtureBusinessDashboardProvider implements BusinessDashboardProvider {
  constructor(private readonly scenario: Key<typeof businessScenarios> = 'ready') {}
  async get(): Promise<Loaded<BusinessDashboardVM>> { return businessScenarios[this.scenario]; }
}
