/**
 * ALDASSIST Phase 8 — fixtures: Matter / Costs / Matching FixtureProviders (B0 §6.1) for B4.
 * Each implements a contract port with static scenario data (PriceDisplay containers only — no price
 * logic, no invented amounts). Phase 9 replaces each with an ApiProvider behind the IDENTICAL interface.
 */
import type {
  Loaded, MattersProvider, MattersIndexVM, MatterWorkspaceProvider, MatterWorkspaceVM,
  CostsProvider, CostsVM, MatchingProvider, MatchingVM, QuoteEngagementProvider, QuoteEngagementVM,
} from '../../contract';
import {
  mattersScenarios, matterWorkspaceScenarios, costsScenarios, matchingScenarios, quoteScenarios,
} from '../scenarios/matters';

type Key<M> = keyof M;

export class FixtureMattersProvider implements MattersProvider {
  constructor(private readonly scenario: Key<typeof mattersScenarios> = 'ready') {}
  async list(): Promise<Loaded<MattersIndexVM>> { return mattersScenarios[this.scenario]; }
}
export class FixtureMatterWorkspaceProvider implements MatterWorkspaceProvider {
  constructor(private readonly scenario: Key<typeof matterWorkspaceScenarios> = 'ready') {}
  async get(): Promise<Loaded<MatterWorkspaceVM>> { return matterWorkspaceScenarios[this.scenario]; }
}
export class FixtureCostsProvider implements CostsProvider {
  constructor(private readonly scenario: Key<typeof costsScenarios> = 'ready') {}
  async get(): Promise<Loaded<CostsVM>> { return costsScenarios[this.scenario]; }
}
export class FixtureMatchingProvider implements MatchingProvider {
  constructor(private readonly scenario: Key<typeof matchingScenarios> = 'ready') {}
  async get(): Promise<Loaded<MatchingVM>> { return matchingScenarios[this.scenario]; }
}
export class FixtureQuoteEngagementProvider implements QuoteEngagementProvider {
  constructor(private readonly scenario: Key<typeof quoteScenarios> = 'ready') {}
  async get(): Promise<Loaded<QuoteEngagementVM>> { return quoteScenarios[this.scenario]; }
}
