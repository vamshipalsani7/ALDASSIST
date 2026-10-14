/**
 * ALDASSIST Phase 9 — B1a runtime: the route table (routing/URL model shell, D-2026-028).
 *
 * One entry per frozen screen (all 56), each bound to its contract port through the injected registry.
 * This is the injection seam that replaces App.tsx's direct scenario-map imports: every screen now
 * receives Loaded<T> produced by a provider, not a hand-picked fixture value.
 *
 * `rendering` encodes the topology decision (D-2026-028): the Public surface is server-rendered (`ssr`)
 * and the authenticated application is a single-page app (`spa`) within ONE deployable. B1a renders
 * everything client-side; the SSR pass for the `ssr` routes is Phase-9 B12 work. The `path` values are a
 * PROVISIONAL shell URL model — the definitive IA→URL mapping (frozen Phase 4/5) is applied later.
 *
 * No back end, no external service, and no open decision is resolved here. Detail screens are loaded with
 * a demo id; the fixtures are id-agnostic (a real id arrives with routing params in a later batch).
 */
import type { ReactNode } from 'react';
import type { Loaded } from '../contract';
import type { ProviderRegistry } from './registry';
import { AgentDirectoryScreen } from '../screens/AgentDirectory';
import { AgentDocketScreen } from '../screens/AgentDocket';
import { AgentMatterDetailScreen } from '../screens/AgentMatterDetail';
import { AgentMattersIndexScreen } from '../screens/AgentMattersIndex';
import { AgentNotificationsScreen } from '../screens/AgentNotifications';
import { AgentOnboardingScreen } from '../screens/AgentOnboarding';
import { AgentPracticeScreen } from '../screens/AgentPractice';
import { AgentPublicProfileScreen } from '../screens/AgentPublicProfile';
import { AgentSettingsScreen } from '../screens/AgentSettings';
import { AgentTodayScreen } from '../screens/AgentToday';
import { AgentVerificationScreen } from '../screens/AgentVerification';
import { ApplicationDetailScreen } from '../screens/ApplicationDetail';
import { AssessmentRequestScreen } from '../screens/AssessmentRequest';
import { AssessmentVerdictScreen } from '../screens/AssessmentVerdict';
import { AssessmentsListScreen } from '../screens/AssessmentsList';
import { AuthScreen } from '../screens/Auth';
import { BusinessDashboardScreen } from '../screens/BusinessDashboard';
import { CompanyLegalScreen } from '../screens/CompanyLegal';
import { CostPlannerScreen } from '../screens/CostPlanner';
import { CostsScreen } from '../screens/Costs';
import { DeadlineDetailScreen } from '../screens/DeadlineDetail';
import { DeadlinesIndexScreen } from '../screens/DeadlinesIndex';
import { DecisionRecordScreen } from '../screens/DecisionRecord';
import { DisclosureCaptureScreen } from '../screens/DisclosureCapture';
import { DisclosureVersionsScreen } from '../screens/DisclosureVersions';
import { DocketHealthScreen } from '../screens/DocketHealth';
import { DocumentsScreen } from '../screens/Documents';
import { FindYourPathScreen } from '../screens/FindYourPath';
import { GlossaryScreen } from '../screens/Glossary';
import { GuidesScreen } from '../screens/Guides';
import { HomeScreen } from '../screens/Home';
import { InventionDetailScreen } from '../screens/InventionDetail';
import { InventionsIndexScreen } from '../screens/InventionsIndex';
import { JurisdictionGuideScreen } from '../screens/JurisdictionGuide';
import { MatchingScreen } from '../screens/Matching';
import { MatterImportScreen } from '../screens/MatterImport';
import { MatterWorkspaceScreen } from '../screens/MatterWorkspace';
import { MattersIndexScreen } from '../screens/MattersIndex';
import { NotificationsScreen } from '../screens/Notifications';
import { OpportunitiesScreen } from '../screens/Opportunities';
import { PatentDocumentScreen } from '../screens/PatentDocument';
import { PatentSearchScreen } from '../screens/PatentSearch';
import { PortfolioIndexScreen } from '../screens/PortfolioIndex';
import { PricingScreen } from '../screens/Pricing';
import { PublicHomeScreen } from '../screens/PublicHome';
import { QualityConsoleScreen } from '../screens/QualityConsole';
import { QuoteEngagementScreen } from '../screens/QuoteEngagement';
import { ReportsScreen } from '../screens/Reports';
import { ReviewWorkspaceScreen } from '../screens/ReviewWorkspace';
import { ReviewsQueueScreen } from '../screens/ReviewsQueue';
import { RuleAuthoringScreen } from '../screens/RuleAuthoring';
import { SegmentLandingScreen } from '../screens/SegmentLanding';
import { SettingsScreen } from '../screens/Settings';
import { StageLandingScreen } from '../screens/StageLanding';
import { TrustPagesScreen } from '../screens/TrustPages';
import { WorkspaceSetupScreen } from '../screens/WorkspaceSetup';

export type Surface = 'client' | 'agent' | 'ops' | 'public' | 'standalone';
export type RouteRendering = 'ssr' | 'spa';

export interface ScreenRoute {
  id: string;
  path: string;
  label: string;
  surface: Surface;
  rendering: RouteRendering;
  load: (registry: ProviderRegistry) => Promise<Loaded<unknown>>;
  view: (loaded: Loaded<unknown>) => ReactNode;
}

interface RouteConfig<VM> {
  id: string;
  path: string;
  label: string;
  surface: Surface;
  rendering: RouteRendering;
  load: (registry: ProviderRegistry) => Promise<Loaded<VM>>;
  view: (loaded: Loaded<VM>) => ReactNode;
}

// Per-entry generic type-checking (load's VM must match view's VM), erased to the homogeneous ScreenRoute.
function route<VM>(config: RouteConfig<VM>): ScreenRoute {
  return config as unknown as ScreenRoute;
}

export const ROUTES: ScreenRoute[] = [
  route({
    id: 'SC-C00', path: '/workspace/setup', label: 'Workspace setup', surface: 'standalone', rendering: 'spa',
    load: (r) => r.workspaceSetup.get('create'),
    view: (loaded) => <WorkspaceSetupScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C01', path: '/app', label: 'Home', surface: 'client', rendering: 'spa',
    load: (r) => r.home.get(),
    view: (loaded) => <HomeScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C02', path: '/app/inventions', label: 'Inventions', surface: 'client', rendering: 'spa',
    load: (r) => r.inventions.list(),
    view: (loaded) => <InventionsIndexScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C03', path: '/app/inventions/capture', label: 'Disclosure capture', surface: 'client', rendering: 'spa',
    load: (r) => r.disclosureCapture.get('demo'),
    view: (loaded) => <DisclosureCaptureScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C04', path: '/app/inventions/detail', label: 'Invention detail', surface: 'client', rendering: 'spa',
    load: (r) => r.inventionDetail.get('demo'),
    view: (loaded) => <InventionDetailScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C05', path: '/app/inventions/versions', label: 'Disclosure versions', surface: 'client', rendering: 'spa',
    load: (r) => r.disclosureVersions.get('demo'),
    view: (loaded) => <DisclosureVersionsScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C06', path: '/app/assessments/request', label: 'Request assessment', surface: 'client', rendering: 'spa',
    load: (r) => r.assessmentRequest.get('demo'),
    view: (loaded) => <AssessmentRequestScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C07', path: '/app/assessments', label: 'Assessments', surface: 'client', rendering: 'spa',
    load: (r) => r.assessmentsList.list('demo'),
    view: (loaded) => <AssessmentsListScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C08', path: '/app/assessments/verdict', label: 'Assessment verdict', surface: 'client', rendering: 'spa',
    load: (r) => r.assessment.get('demo', 'demo'),
    view: (loaded) => <AssessmentVerdictScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C09', path: '/app/decisions/record', label: 'Record decision', surface: 'client', rendering: 'spa',
    load: (r) => r.decision.get('demo'),
    view: (loaded) => <DecisionRecordScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C10', path: '/app/portfolio', label: 'Portfolio', surface: 'client', rendering: 'spa',
    load: (r) => r.portfolio.list(),
    view: (loaded) => <PortfolioIndexScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C11', path: '/app/applications/detail', label: 'Application detail', surface: 'client', rendering: 'spa',
    load: (r) => r.applicationDetail.get('demo'),
    view: (loaded) => <ApplicationDetailScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C12', path: '/app/deadlines', label: 'Deadlines', surface: 'client', rendering: 'spa',
    load: (r) => r.deadlines.list(),
    view: (loaded) => <DeadlinesIndexScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C13', path: '/app/deadlines/detail', label: 'Deadline detail', surface: 'client', rendering: 'spa',
    load: (r) => r.deadlineDetail.get('demo'),
    view: (loaded) => <DeadlineDetailScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C14', path: '/app/matters', label: 'Matters', surface: 'client', rendering: 'spa',
    load: (r) => r.matters.list(),
    view: (loaded) => <MattersIndexScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C15', path: '/app/matters/workspace', label: 'Matter workspace', surface: 'client', rendering: 'spa',
    load: (r) => r.matterWorkspace.get('demo'),
    view: (loaded) => <MatterWorkspaceScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C16', path: '/app/costs', label: 'Costs', surface: 'client', rendering: 'spa',
    load: (r) => r.costs.get(),
    view: (loaded) => <CostsScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C17', path: '/app/documents', label: 'Documents', surface: 'client', rendering: 'spa',
    load: (r) => r.documents.list(),
    view: (loaded) => <DocumentsScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C18', path: '/app/matching', label: 'Agent matching', surface: 'client', rendering: 'spa',
    load: (r) => r.matching.get(),
    view: (loaded) => <MatchingScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C19', path: '/app/quote', label: 'Quote & engagement', surface: 'client', rendering: 'spa',
    load: (r) => r.quoteEngagement.get('demo'),
    view: (loaded) => <QuoteEngagementScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C20', path: '/app/settings', label: 'Settings', surface: 'client', rendering: 'spa',
    load: (r) => r.settings.get(),
    view: (loaded) => <SettingsScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-C21', path: '/app/notifications', label: 'Notifications', surface: 'client', rendering: 'spa',
    load: (r) => r.notifications.list(),
    view: (loaded) => <NotificationsScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A00', path: '/agent/onboarding', label: 'Onboarding', surface: 'agent', rendering: 'spa',
    load: (r) => r.agentOnboarding.get(),
    view: (loaded) => <AgentOnboardingScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A01', path: '/agent/today', label: 'Today', surface: 'agent', rendering: 'spa',
    load: (r) => r.agentToday.get(),
    view: (loaded) => <AgentTodayScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A02', path: '/agent/docket', label: 'Docket', surface: 'agent', rendering: 'spa',
    load: (r) => r.agentDocket.get(),
    view: (loaded) => <AgentDocketScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A03', path: '/agent/matters', label: 'Matters', surface: 'agent', rendering: 'spa',
    load: (r) => r.agentMatters.list(),
    view: (loaded) => <AgentMattersIndexScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A04', path: '/agent/matters/import', label: 'Matter import', surface: 'agent', rendering: 'spa',
    load: (r) => r.matterImport.get(),
    view: (loaded) => <MatterImportScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A05', path: '/agent/matters/detail', label: 'Matter detail', surface: 'agent', rendering: 'spa',
    load: (r) => r.agentMatterDetail.get('demo'),
    view: (loaded) => <AgentMatterDetailScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A06', path: '/agent/reviews', label: 'Reviews queue', surface: 'agent', rendering: 'spa',
    load: (r) => r.reviewsQueue.list(),
    view: (loaded) => <ReviewsQueueScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A07', path: '/agent/reviews/workspace', label: 'Review workspace', surface: 'agent', rendering: 'spa',
    load: (r) => r.reviewWorkspace.get('demo'),
    view: (loaded) => <ReviewWorkspaceScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A08', path: '/agent/opportunities', label: 'Opportunities', surface: 'agent', rendering: 'spa',
    load: (r) => r.opportunities.list(),
    view: (loaded) => <OpportunitiesScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A09', path: '/agent/practice', label: 'Practice', surface: 'agent', rendering: 'spa',
    load: (r) => r.practice.get(),
    view: (loaded) => <AgentPracticeScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A13', path: '/agent/settings', label: 'Agent settings', surface: 'agent', rendering: 'spa',
    load: (r) => r.agentSettings.get(),
    view: (loaded) => <AgentSettingsScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-A14', path: '/agent/notifications', label: 'Agent notifications', surface: 'agent', rendering: 'spa',
    load: (r) => r.agentNotifications.list(),
    view: (loaded) => <AgentNotificationsScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-O01', path: '/ops/docket-health', label: 'Docket health', surface: 'ops', rendering: 'spa',
    load: (r) => r.docketHealth.get(),
    view: (loaded) => <DocketHealthScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-O02', path: '/ops/agent-verification', label: 'Agent verification', surface: 'ops', rendering: 'spa',
    load: (r) => r.agentVerification.get(),
    view: (loaded) => <AgentVerificationScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-O03', path: '/ops/rule-authoring', label: 'Rule authoring', surface: 'ops', rendering: 'spa',
    load: (r) => r.ruleAuthoring.get(),
    view: (loaded) => <RuleAuthoringScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-O04', path: '/ops/quality', label: 'Quality & review', surface: 'ops', rendering: 'spa',
    load: (r) => r.qualityConsole.get(),
    view: (loaded) => <QualityConsoleScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-O05', path: '/ops/business', label: 'Business metrics', surface: 'ops', rendering: 'spa',
    load: (r) => r.businessDashboard.get(),
    view: (loaded) => <BusinessDashboardScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P01', path: '/', label: 'Public home', surface: 'public', rendering: 'ssr',
    load: (r) => r.publicHome.get(),
    view: (loaded) => <PublicHomeScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P02', path: '/search', label: 'Patent search', surface: 'public', rendering: 'ssr',
    load: (r) => r.patentSearch.search('demo'),
    view: (loaded) => <PatentSearchScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P03', path: '/patent', label: 'Patent document', surface: 'public', rendering: 'ssr',
    load: (r) => r.patentDocument.get('IN', '000000'),
    view: (loaded) => <PatentDocumentScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P04', path: '/stage', label: 'Stage landing', surface: 'public', rendering: 'ssr',
    load: (r) => r.stageLanding.get('demo'),
    view: (loaded) => <StageLandingScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P05', path: '/segment', label: 'Segment landing', surface: 'public', rendering: 'ssr',
    load: (r) => r.segmentLanding.get('demo'),
    view: (loaded) => <SegmentLandingScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P06', path: '/pricing', label: 'Pricing', surface: 'public', rendering: 'ssr',
    load: (r) => r.pricing.get(),
    view: (loaded) => <PricingScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P07', path: '/cost-planner', label: 'Cost planner', surface: 'public', rendering: 'ssr',
    load: (r) => r.costPlanner.get(),
    view: (loaded) => <CostPlannerScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P08', path: '/find-your-path', label: 'Find your path', surface: 'public', rendering: 'ssr',
    load: (r) => r.findYourPath.get(),
    view: (loaded) => <FindYourPathScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P09', path: '/guides', label: 'Guides', surface: 'public', rendering: 'ssr',
    load: (r) => r.guides.get(),
    view: (loaded) => <GuidesScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P10', path: '/glossary', label: 'Glossary', surface: 'public', rendering: 'ssr',
    load: (r) => r.glossary.get(),
    view: (loaded) => <GlossaryScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P11', path: '/jurisdiction', label: 'Jurisdiction guide', surface: 'public', rendering: 'ssr',
    load: (r) => r.jurisdictionGuide.get('IN'),
    view: (loaded) => <JurisdictionGuideScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P12', path: '/reports', label: 'Reports', surface: 'public', rendering: 'ssr',
    load: (r) => r.reports.get('demo'),
    view: (loaded) => <ReportsScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P13a', path: '/agents', label: 'Agent directory', surface: 'public', rendering: 'ssr',
    load: (r) => r.agentDirectory.list(),
    view: (loaded) => <AgentDirectoryScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P13b', path: '/agents/profile', label: 'Agent profile', surface: 'public', rendering: 'ssr',
    load: (r) => r.agentPublicProfile.get('demo'),
    view: (loaded) => <AgentPublicProfileScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P14', path: '/trust', label: 'Trust', surface: 'public', rendering: 'ssr',
    load: (r) => r.trust.get('demo'),
    view: (loaded) => <TrustPagesScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P15', path: '/company', label: 'Company & legal', surface: 'public', rendering: 'ssr',
    load: (r) => r.companyLegal.get('demo'),
    view: (loaded) => <CompanyLegalScreen loaded={loaded} />,
  }),
  route({
    id: 'SC-P16', path: '/auth', label: 'Sign in', surface: 'public', rendering: 'ssr',
    load: (r) => r.auth.get('sign-in'),
    view: (loaded) => <AuthScreen loaded={loaded} />,
  }),
];
