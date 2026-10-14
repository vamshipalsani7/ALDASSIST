/**
 * ALDASSIST Phase 9 — B1a runtime: the fixture ProviderRegistry (FA-1/FA-4).
 *
 * Constructs every Fixture* provider at its default scenario and the FixtureCitationResolver, behind the
 * frozen port interfaces. This is the `fixture` (and, for B1a, `contract`) registry. Phase 9 adds an
 * apiRegistry() behind the identical ProviderRegistry shape; nothing here or in any screen changes then.
 */
import type { ProviderRegistry } from './registry';
import { FixtureAssessmentProvider } from '../fixtures/providers/FixtureAssessmentProvider';
import { FixtureCitationResolver } from '../fixtures/providers/FixtureCitationResolver';
import {
  FixtureWorkspaceSetupProvider, FixtureInventionsProvider, FixtureDisclosureCaptureProvider,
  FixtureInventionDetailProvider, FixtureDisclosureVersionsProvider, FixtureAssessmentRequestProvider,
  FixtureAssessmentsListProvider, FixtureDecisionProvider,
} from '../fixtures/providers/FixtureVaultProviders';
import {
  FixturePortfolioProvider, FixtureApplicationDetailProvider, FixtureDeadlinesProvider,
  FixtureDeadlineDetailProvider,
} from '../fixtures/providers/FixturePortfolioProviders';
import {
  FixtureMattersProvider, FixtureMatterWorkspaceProvider, FixtureCostsProvider, FixtureMatchingProvider,
  FixtureQuoteEngagementProvider,
} from '../fixtures/providers/FixtureMattersProviders';
import {
  FixtureHomeProvider, FixtureDocumentsProvider, FixtureSettingsProvider, FixtureNotificationsProvider,
} from '../fixtures/providers/FixtureHomeProviders';
import {
  FixtureAgentOnboardingProvider, FixtureAgentTodayProvider, FixtureAgentDocketProvider,
  FixtureAgentMattersProvider, FixtureMatterImportProvider, FixtureAgentMatterDetailProvider,
  FixtureReviewsQueueProvider, FixtureReviewWorkspaceProvider, FixtureOpportunitiesProvider,
  FixturePracticeProvider, FixtureAgentSettingsProvider, FixtureAgentNotificationsProvider,
} from '../fixtures/providers/FixtureAgentProviders';
import {
  FixtureDocketHealthProvider, FixtureAgentVerificationProvider, FixtureRuleAuthoringProvider,
  FixtureQualityConsoleProvider, FixtureBusinessDashboardProvider,
} from '../fixtures/providers/FixtureOpsProviders';
import {
  FixturePublicHomeProvider, FixturePatentSearchProvider, FixturePatentDocumentProvider,
  FixtureStageLandingProvider, FixtureSegmentLandingProvider, FixturePricingProvider,
  FixtureCostPlannerProvider, FixtureFindYourPathProvider, FixtureGuidesProvider, FixtureGlossaryProvider,
  FixtureJurisdictionGuideProvider, FixtureReportsProvider, FixtureAgentDirectoryProvider,
  FixtureAgentPublicProfileProvider, FixtureTrustProvider, FixtureCompanyLegalProvider, FixtureAuthProvider,
} from '../fixtures/providers/FixturePublicProviders';

/** Build a registry backed entirely by the presentation-only fixtures. No back end, no network. */
export function createFixtureRegistry(): ProviderRegistry {
  return {
    assessment: new FixtureAssessmentProvider('released-unfavourable'),
    citationResolver: new FixtureCitationResolver(),
    workspaceSetup: new FixtureWorkspaceSetupProvider(),
    inventions: new FixtureInventionsProvider(),
    inventionDetail: new FixtureInventionDetailProvider(),
    disclosureCapture: new FixtureDisclosureCaptureProvider(),
    disclosureVersions: new FixtureDisclosureVersionsProvider(),
    assessmentRequest: new FixtureAssessmentRequestProvider(),
    assessmentsList: new FixtureAssessmentsListProvider(),
    decision: new FixtureDecisionProvider(),
    portfolio: new FixturePortfolioProvider(),
    applicationDetail: new FixtureApplicationDetailProvider(),
    deadlines: new FixtureDeadlinesProvider(),
    deadlineDetail: new FixtureDeadlineDetailProvider(),
    matters: new FixtureMattersProvider(),
    matterWorkspace: new FixtureMatterWorkspaceProvider(),
    costs: new FixtureCostsProvider(),
    matching: new FixtureMatchingProvider(),
    quoteEngagement: new FixtureQuoteEngagementProvider(),
    home: new FixtureHomeProvider(),
    documents: new FixtureDocumentsProvider(),
    settings: new FixtureSettingsProvider(),
    notifications: new FixtureNotificationsProvider(),
    agentOnboarding: new FixtureAgentOnboardingProvider(),
    agentToday: new FixtureAgentTodayProvider(),
    agentDocket: new FixtureAgentDocketProvider(),
    agentMatters: new FixtureAgentMattersProvider(),
    matterImport: new FixtureMatterImportProvider(),
    agentMatterDetail: new FixtureAgentMatterDetailProvider(),
    reviewsQueue: new FixtureReviewsQueueProvider(),
    reviewWorkspace: new FixtureReviewWorkspaceProvider(),
    opportunities: new FixtureOpportunitiesProvider(),
    practice: new FixturePracticeProvider(),
    agentSettings: new FixtureAgentSettingsProvider(),
    agentNotifications: new FixtureAgentNotificationsProvider(),
    docketHealth: new FixtureDocketHealthProvider(),
    agentVerification: new FixtureAgentVerificationProvider(),
    ruleAuthoring: new FixtureRuleAuthoringProvider(),
    qualityConsole: new FixtureQualityConsoleProvider(),
    businessDashboard: new FixtureBusinessDashboardProvider(),
    publicHome: new FixturePublicHomeProvider(),
    patentSearch: new FixturePatentSearchProvider(),
    patentDocument: new FixturePatentDocumentProvider(),
    stageLanding: new FixtureStageLandingProvider(),
    segmentLanding: new FixtureSegmentLandingProvider(),
    pricing: new FixturePricingProvider(),
    costPlanner: new FixtureCostPlannerProvider(),
    findYourPath: new FixtureFindYourPathProvider(),
    guides: new FixtureGuidesProvider(),
    glossary: new FixtureGlossaryProvider(),
    jurisdictionGuide: new FixtureJurisdictionGuideProvider(),
    reports: new FixtureReportsProvider(),
    agentDirectory: new FixtureAgentDirectoryProvider(),
    agentPublicProfile: new FixtureAgentPublicProfileProvider(),
    trust: new FixtureTrustProvider(),
    companyLegal: new FixtureCompanyLegalProvider(),
    auth: new FixtureAuthProvider(),
  };
}
