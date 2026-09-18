/**
 * ALDASSIST Phase 8 — fixtures: Agent-surface FixtureProviders (B6). Each implements a contract port with
 * static scenario data. Phase 9 replaces each with an ApiProvider behind the IDENTICAL interface; the UI
 * is unchanged. Object-scoped providers return `not-found` for a cross-tenant / out-of-grant object (CR-5).
 */
import type {
  Loaded, AgentOnboardingProvider, AgentOnboardingVM, AgentTodayProvider, AgentTodayVM,
  AgentDocketProvider, AgentDocketVM, AgentMattersProvider, AgentMattersIndexVM,
  MatterImportProvider, MatterImportVM, AgentMatterDetailProvider, AgentMatterDetailVM,
  ReviewsQueueProvider, ReviewsQueueVM, ReviewWorkspaceProvider, ReviewWorkspaceVM,
  OpportunitiesProvider, OpportunitiesVM, PracticeProvider, PracticeVM,
  AgentSettingsProvider, AgentSettingsVM, AgentNotificationsProvider, AgentNotificationsVM,
} from '../../contract';
import {
  agentOnboardingScenarios, agentTodayScenarios, agentDocketScenarios, agentMattersScenarios,
  matterImportScenarios, agentMatterDetailScenarios, reviewsQueueScenarios, reviewWorkspaceScenarios,
  opportunitiesScenarios, practiceScenarios, agentSettingsScenarios, agentNotificationsScenarios,
} from '../scenarios/agent';

type Key<M> = keyof M;

export class FixtureAgentOnboardingProvider implements AgentOnboardingProvider {
  constructor(private readonly scenario: Key<typeof agentOnboardingScenarios> = 'pending') {}
  async get(): Promise<Loaded<AgentOnboardingVM>> { return agentOnboardingScenarios[this.scenario]; }
}
export class FixtureAgentTodayProvider implements AgentTodayProvider {
  constructor(private readonly scenario: Key<typeof agentTodayScenarios> = 'ready') {}
  async get(): Promise<Loaded<AgentTodayVM>> { return agentTodayScenarios[this.scenario]; }
}
export class FixtureAgentDocketProvider implements AgentDocketProvider {
  constructor(private readonly scenario: Key<typeof agentDocketScenarios> = 'ready') {}
  async get(): Promise<Loaded<AgentDocketVM>> { return agentDocketScenarios[this.scenario]; }
}
export class FixtureAgentMattersProvider implements AgentMattersProvider {
  constructor(private readonly scenario: Key<typeof agentMattersScenarios> = 'ready') {}
  async list(): Promise<Loaded<AgentMattersIndexVM>> { return agentMattersScenarios[this.scenario]; }
}
export class FixtureMatterImportProvider implements MatterImportProvider {
  constructor(private readonly scenario: Key<typeof matterImportScenarios> = 'ready') {}
  async get(): Promise<Loaded<MatterImportVM>> { return matterImportScenarios[this.scenario]; }
}
export class FixtureAgentMatterDetailProvider implements AgentMatterDetailProvider {
  constructor(private readonly scenario: Key<typeof agentMatterDetailScenarios> = 'ready') {}
  async get(_matterId: string): Promise<Loaded<AgentMatterDetailVM>> { return agentMatterDetailScenarios[this.scenario]; }
}
export class FixtureReviewsQueueProvider implements ReviewsQueueProvider {
  constructor(private readonly scenario: Key<typeof reviewsQueueScenarios> = 'ready') {}
  async list(): Promise<Loaded<ReviewsQueueVM>> { return reviewsQueueScenarios[this.scenario]; }
}
export class FixtureReviewWorkspaceProvider implements ReviewWorkspaceProvider {
  constructor(private readonly scenario: Key<typeof reviewWorkspaceScenarios> = 'ready') {}
  async get(_reviewId: string): Promise<Loaded<ReviewWorkspaceVM>> { return reviewWorkspaceScenarios[this.scenario]; }
}
export class FixtureOpportunitiesProvider implements OpportunitiesProvider {
  constructor(private readonly scenario: Key<typeof opportunitiesScenarios> = 'ready') {}
  async list(): Promise<Loaded<OpportunitiesVM>> { return opportunitiesScenarios[this.scenario]; }
}
export class FixturePracticeProvider implements PracticeProvider {
  constructor(private readonly scenario: Key<typeof practiceScenarios> = 'ready') {}
  async get(): Promise<Loaded<PracticeVM>> { return practiceScenarios[this.scenario]; }
}
export class FixtureAgentSettingsProvider implements AgentSettingsProvider {
  constructor(private readonly scenario: Key<typeof agentSettingsScenarios> = 'ready') {}
  async get(): Promise<Loaded<AgentSettingsVM>> { return agentSettingsScenarios[this.scenario]; }
}
export class FixtureAgentNotificationsProvider implements AgentNotificationsProvider {
  constructor(private readonly scenario: Key<typeof agentNotificationsScenarios> = 'ready') {}
  async list(): Promise<Loaded<AgentNotificationsVM>> { return agentNotificationsScenarios[this.scenario]; }
}
