/**
 * ALDASSIST Phase 8 — fixtures: Portfolio / Deadlines FixtureProviders (B0 §6.1) for B3.
 * Each implements a contract port with static scenario data. Phase 9 replaces each with an ApiProvider
 * behind the IDENTICAL interface (deadline dates then come from the real Rules Engine); the UI is unchanged.
 */
import type {
  Loaded, PortfolioProvider, PortfolioIndexVM, ApplicationDetailProvider, ApplicationDetailVM,
  DeadlinesProvider, DeadlinesIndexVM, DeadlineDetailProvider, DeadlineDetailVM,
} from '../../contract';
import {
  portfolioScenarios, applicationDetailScenarios, deadlinesScenarios, deadlineDetailScenarios,
} from '../scenarios/portfolio';

type Key<M> = keyof M;

export class FixturePortfolioProvider implements PortfolioProvider {
  constructor(private readonly scenario: Key<typeof portfolioScenarios> = 'ready') {}
  async list(): Promise<Loaded<PortfolioIndexVM>> { return portfolioScenarios[this.scenario]; }
}
export class FixtureApplicationDetailProvider implements ApplicationDetailProvider {
  constructor(private readonly scenario: Key<typeof applicationDetailScenarios> = 'active') {}
  async get(): Promise<Loaded<ApplicationDetailVM>> { return applicationDetailScenarios[this.scenario]; }
}
export class FixtureDeadlinesProvider implements DeadlinesProvider {
  constructor(private readonly scenario: Key<typeof deadlinesScenarios> = 'ready') {}
  async list(): Promise<Loaded<DeadlinesIndexVM>> { return deadlinesScenarios[this.scenario]; }
}
export class FixtureDeadlineDetailProvider implements DeadlineDetailProvider {
  constructor(private readonly scenario: Key<typeof deadlineDetailScenarios> = 'ready') {}
  async get(): Promise<Loaded<DeadlineDetailVM>> { return deadlineDetailScenarios[this.scenario]; }
}
