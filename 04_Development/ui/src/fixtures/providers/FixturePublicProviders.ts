/**
 * ALDASSIST Phase 8 — fixtures: Public-surface FixtureProviders (B8). Each implements a contract port with
 * static scenario data. Phase 9 replaces each with an ApiProvider behind the IDENTICAL interface; the UI
 * is unchanged. Register data carries source + freshness; upstream failure surfaces as cached + staleness.
 */
import type {
  Loaded, PublicHomeProvider, PublicHomeVM, PatentSearchProvider, PatentSearchVM,
  PatentDocumentProvider, PatentDocumentVM, StageLandingProvider, StageLandingVM,
  SegmentLandingProvider, SegmentLandingVM, PricingProvider, PricingVM, CostPlannerProvider, CostPlannerVM,
  FindYourPathProvider, FindYourPathVM, GuidesProvider, GuidesVM, GlossaryProvider, GlossaryVM,
  JurisdictionGuideProvider, JurisdictionGuideVM, ReportsProvider, ReportsVM, AgentDirectoryProvider,
  AgentDirectoryVM, AgentPublicProfileProvider, AgentPublicProfileVM, TrustProvider, TrustPageVM,
  CompanyLegalProvider, CompanyLegalVM, AuthProvider, AuthVM,
} from '../../contract';
import {
  publicHomeScenarios, patentSearchScenarios, patentDocumentScenarios, stageLandingScenarios,
  segmentLandingScenarios, pricingScenarios, costPlannerScenarios, findYourPathScenarios, guidesScenarios,
  glossaryScenarios, jurisdictionScenarios, reportsScenarios, agentDirectoryScenarios, agentProfileScenarios,
  trustScenarios, companyLegalScenarios, authScenarios,
} from '../scenarios/public';

type Key<M> = keyof M;

export class FixturePublicHomeProvider implements PublicHomeProvider {
  constructor(private readonly s: Key<typeof publicHomeScenarios> = 'ready') {}
  async get(): Promise<Loaded<PublicHomeVM>> { return publicHomeScenarios[this.s]; }
}
export class FixturePatentSearchProvider implements PatentSearchProvider {
  constructor(private readonly s: Key<typeof patentSearchScenarios> = 'ready') {}
  async search(_q: string): Promise<Loaded<PatentSearchVM>> { return patentSearchScenarios[this.s]; }
}
export class FixturePatentDocumentProvider implements PatentDocumentProvider {
  constructor(private readonly s: Key<typeof patentDocumentScenarios> = 'ready') {}
  async get(_j: string, _n: string): Promise<Loaded<PatentDocumentVM>> { return patentDocumentScenarios[this.s]; }
}
export class FixtureStageLandingProvider implements StageLandingProvider {
  constructor(private readonly s: Key<typeof stageLandingScenarios> = 'ready') {}
  async get(_stage: string): Promise<Loaded<StageLandingVM>> { return stageLandingScenarios[this.s]; }
}
export class FixtureSegmentLandingProvider implements SegmentLandingProvider {
  constructor(private readonly s: Key<typeof segmentLandingScenarios> = 'universities') {}
  async get(_segment: string): Promise<Loaded<SegmentLandingVM>> { return segmentLandingScenarios[this.s]; }
}
export class FixturePricingProvider implements PricingProvider {
  constructor(private readonly s: Key<typeof pricingScenarios> = 'ready') {}
  async get(): Promise<Loaded<PricingVM>> { return pricingScenarios[this.s]; }
}
export class FixtureCostPlannerProvider implements CostPlannerProvider {
  constructor(private readonly s: Key<typeof costPlannerScenarios> = 'ready') {}
  async get(): Promise<Loaded<CostPlannerVM>> { return costPlannerScenarios[this.s]; }
}
export class FixtureFindYourPathProvider implements FindYourPathProvider {
  constructor(private readonly s: Key<typeof findYourPathScenarios> = 'ready') {}
  async get(): Promise<Loaded<FindYourPathVM>> { return findYourPathScenarios[this.s]; }
}
export class FixtureGuidesProvider implements GuidesProvider {
  constructor(private readonly s: Key<typeof guidesScenarios> = 'index') {}
  async get(_slug?: string): Promise<Loaded<GuidesVM>> { return guidesScenarios[this.s]; }
}
export class FixtureGlossaryProvider implements GlossaryProvider {
  constructor(private readonly s: Key<typeof glossaryScenarios> = 'index') {}
  async get(_term?: string): Promise<Loaded<GlossaryVM>> { return glossaryScenarios[this.s]; }
}
export class FixtureJurisdictionGuideProvider implements JurisdictionGuideProvider {
  constructor(private readonly s: Key<typeof jurisdictionScenarios> = 'india') {}
  async get(_j: string): Promise<Loaded<JurisdictionGuideVM>> { return jurisdictionScenarios[this.s]; }
}
export class FixtureReportsProvider implements ReportsProvider {
  constructor(private readonly s: Key<typeof reportsScenarios> = 'ready') {}
  async get(_slug: string): Promise<Loaded<ReportsVM>> { return reportsScenarios[this.s]; }
}
export class FixtureAgentDirectoryProvider implements AgentDirectoryProvider {
  constructor(private readonly s: Key<typeof agentDirectoryScenarios> = 'ready') {}
  async list(): Promise<Loaded<AgentDirectoryVM>> { return agentDirectoryScenarios[this.s]; }
}
export class FixtureAgentPublicProfileProvider implements AgentPublicProfileProvider {
  constructor(private readonly s: Key<typeof agentProfileScenarios> = 'ready') {}
  async get(_slug: string): Promise<Loaded<AgentPublicProfileVM>> { return agentProfileScenarios[this.s]; }
}
export class FixtureTrustProvider implements TrustProvider {
  constructor(private readonly s: Key<typeof trustScenarios> = 'ai') {}
  async get(_page: string): Promise<Loaded<TrustPageVM>> { return trustScenarios[this.s]; }
}
export class FixtureCompanyLegalProvider implements CompanyLegalProvider {
  constructor(private readonly s: Key<typeof companyLegalScenarios> = 'terms') {}
  async get(_page: string): Promise<Loaded<CompanyLegalVM>> { return companyLegalScenarios[this.s]; }
}
export class FixtureAuthProvider implements AuthProvider {
  constructor(private readonly s: Key<typeof authScenarios> = 'sign-up') {}
  async get(_mode: string): Promise<Loaded<AuthVM>> { return authScenarios[this.s]; }
}
