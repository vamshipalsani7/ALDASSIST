/**
 * ALDASSIST Phase 8 — B1+B2 demo harness. A review aid, NOT a product surface: it lets a reviewer drive
 * every mandated state of the built screens through a screen + scenario switcher. Screens are rendered
 * from the fixture scenario maps (the same Loaded<T> values the FixtureProviders return). The switcher
 * chrome lives in harness.css (.scenario-bar) and is outside token-hierarchy enforcement.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { ClientShell } from './shell/ClientShell';

// B1
import { AssessmentVerdictScreen } from './screens/AssessmentVerdict';
import { assessmentScenarios, type AssessmentScenarioId } from './fixtures/scenarios/assessment';
// B2
import { WorkspaceSetupScreen } from './screens/WorkspaceSetup';
import { InventionsIndexScreen } from './screens/InventionsIndex';
import { DisclosureCaptureScreen } from './screens/DisclosureCapture';
import { InventionDetailScreen } from './screens/InventionDetail';
import { DisclosureVersionsScreen } from './screens/DisclosureVersions';
import { AssessmentRequestScreen } from './screens/AssessmentRequest';
import { AssessmentsListScreen } from './screens/AssessmentsList';
import { DecisionRecordScreen } from './screens/DecisionRecord';
import {
  workspaceSetupScenarios, inventionsIndexScenarios, disclosureCaptureScenarios,
  inventionDetailScenarios, disclosureVersionsScenarios, assessmentRequestScenarios,
  assessmentsListScenarios, decisionScenarios,
} from './fixtures/scenarios/vault';
// B3
import { PortfolioIndexScreen } from './screens/PortfolioIndex';
import { ApplicationDetailScreen } from './screens/ApplicationDetail';
import { DeadlinesIndexScreen } from './screens/DeadlinesIndex';
import { DeadlineDetailScreen } from './screens/DeadlineDetail';
import {
  portfolioScenarios, applicationDetailScenarios, deadlinesScenarios, deadlineDetailScenarios,
} from './fixtures/scenarios/portfolio';
// B4
import { MattersIndexScreen } from './screens/MattersIndex';
import { MatterWorkspaceScreen } from './screens/MatterWorkspace';
import { CostsScreen } from './screens/Costs';
import { MatchingScreen } from './screens/Matching';
import { QuoteEngagementScreen } from './screens/QuoteEngagement';
import {
  mattersScenarios, matterWorkspaceScenarios, costsScenarios, matchingScenarios, quoteScenarios,
} from './fixtures/scenarios/matters';
// B5
import { HomeScreen } from './screens/Home';
import { DocumentsScreen } from './screens/Documents';
import { SettingsScreen } from './screens/Settings';
import { NotificationsScreen } from './screens/Notifications';
import {
  homeScenarios, documentsScenarios, settingsScenarios, notificationsScenarios,
} from './fixtures/scenarios/home';
// B6 — Agent surface
import { AgentOnboardingScreen } from './screens/AgentOnboarding';
import { AgentTodayScreen } from './screens/AgentToday';
import { AgentDocketScreen } from './screens/AgentDocket';
import { AgentMattersIndexScreen } from './screens/AgentMattersIndex';
import { MatterImportScreen } from './screens/MatterImport';
import { AgentMatterDetailScreen } from './screens/AgentMatterDetail';
import { ReviewsQueueScreen } from './screens/ReviewsQueue';
import { ReviewWorkspaceScreen } from './screens/ReviewWorkspace';
import { OpportunitiesScreen } from './screens/Opportunities';
import { AgentPracticeScreen } from './screens/AgentPractice';
import { AgentSettingsScreen } from './screens/AgentSettings';
import { AgentNotificationsScreen } from './screens/AgentNotifications';
import { AgentShell } from './shell/AgentShell';
import {
  agentOnboardingScenarios, agentTodayScenarios, agentDocketScenarios, agentMattersScenarios,
  matterImportScenarios, agentMatterDetailScenarios, reviewsQueueScenarios, reviewWorkspaceScenarios,
  opportunitiesScenarios, practiceScenarios, agentSettingsScenarios, agentNotificationsScenarios,
} from './fixtures/scenarios/agent';
// B7 — Operations surface
import { DocketHealthScreen } from './screens/DocketHealth';
import { AgentVerificationScreen } from './screens/AgentVerification';
import { RuleAuthoringScreen } from './screens/RuleAuthoring';
import { QualityConsoleScreen } from './screens/QualityConsole';
import { BusinessDashboardScreen } from './screens/BusinessDashboard';
import { OpsShell } from './shell/OpsShell';
import {
  docketHealthScenarios, agentVerificationScenarios, ruleAuthoringScenarios, qualityScenarios,
  businessScenarios,
} from './fixtures/scenarios/ops';
// B8 — Public surface
import { PublicHomeScreen } from './screens/PublicHome';
import { PatentSearchScreen } from './screens/PatentSearch';
import { PatentDocumentScreen } from './screens/PatentDocument';
import { StageLandingScreen } from './screens/StageLanding';
import { SegmentLandingScreen } from './screens/SegmentLanding';
import { PricingScreen } from './screens/Pricing';
import { CostPlannerScreen } from './screens/CostPlanner';
import { FindYourPathScreen } from './screens/FindYourPath';
import { GuidesScreen } from './screens/Guides';
import { GlossaryScreen } from './screens/Glossary';
import { JurisdictionGuideScreen } from './screens/JurisdictionGuide';
import { ReportsScreen } from './screens/Reports';
import { AgentDirectoryScreen } from './screens/AgentDirectory';
import { AgentPublicProfileScreen } from './screens/AgentPublicProfile';
import { TrustPagesScreen } from './screens/TrustPages';
import { CompanyLegalScreen } from './screens/CompanyLegal';
import { AuthScreen } from './screens/Auth';
import { PublicShell } from './shell/PublicShell';
import {
  publicHomeScenarios, patentSearchScenarios, patentDocumentScenarios, stageLandingScenarios,
  segmentLandingScenarios, pricingScenarios, costPlannerScenarios, findYourPathScenarios, guidesScenarios,
  glossaryScenarios, jurisdictionScenarios, reportsScenarios, agentDirectoryScenarios, agentProfileScenarios,
  trustScenarios, companyLegalScenarios, authScenarios,
} from './fixtures/scenarios/public';

interface ScreenDef {
  id: string;
  label: string;
  standalone?: boolean; // rendered outside the Client shell (SC-C00 is pre-workspace)
  surface?: 'agent' | 'ops' | 'public'; // Agent (B6) / Ops (B7) / Public (B8) shell; default is Client
  scenarios: { id: string; label: string }[];
  render: (scenarioId: string) => ReactNode;
}

const keys = (o: object) => Object.keys(o).map((id) => ({ id, label: id }));

const SCREENS: ScreenDef[] = [
  {
    id: 'SC-C00', label: 'SC-C00 · Workspace setup', standalone: true,
    scenarios: keys(workspaceSetupScenarios),
    render: (s) => <WorkspaceSetupScreen loaded={(workspaceSetupScenarios as never)[s]} />,
  },
  {
    id: 'SC-C01', label: 'SC-C01 · Home / action queue ★',
    scenarios: keys(homeScenarios),
    render: (s) => <HomeScreen loaded={(homeScenarios as never)[s]} />,
  },
  {
    id: 'SC-C02', label: 'SC-C02 · Inventions index',
    scenarios: keys(inventionsIndexScenarios),
    render: (s) => <InventionsIndexScreen loaded={(inventionsIndexScenarios as never)[s]} />,
  },
  {
    id: 'SC-C03', label: 'SC-C03 · Disclosure capture',
    scenarios: keys(disclosureCaptureScenarios),
    render: (s) => <DisclosureCaptureScreen loaded={(disclosureCaptureScenarios as never)[s]} />,
  },
  {
    id: 'SC-C04', label: 'SC-C04 · Invention detail',
    scenarios: keys(inventionDetailScenarios),
    render: (s) => <InventionDetailScreen loaded={(inventionDetailScenarios as never)[s]} />,
  },
  {
    id: 'SC-C05', label: 'SC-C05 · Disclosure versions',
    scenarios: keys(disclosureVersionsScenarios),
    render: (s) => <DisclosureVersionsScreen loaded={(disclosureVersionsScenarios as never)[s]} />,
  },
  {
    id: 'SC-C06', label: 'SC-C06 · Request assessment',
    scenarios: keys(assessmentRequestScenarios),
    render: (s) => <AssessmentRequestScreen loaded={(assessmentRequestScenarios as never)[s]} />,
  },
  {
    id: 'SC-C07', label: 'SC-C07 · Assessments list',
    scenarios: keys(assessmentsListScenarios),
    render: (s) => <AssessmentsListScreen loaded={(assessmentsListScenarios as never)[s]} />,
  },
  {
    id: 'SC-C08', label: 'SC-C08 · Assessment verdict (B1)',
    scenarios: keys(assessmentScenarios),
    render: (s) => <AssessmentVerdictScreen loaded={assessmentScenarios[s as AssessmentScenarioId]} />,
  },
  {
    id: 'SC-C09', label: 'SC-C09 · Record decision',
    scenarios: keys(decisionScenarios),
    render: (s) => <DecisionRecordScreen loaded={(decisionScenarios as never)[s]} />,
  },
  {
    id: 'SC-C10', label: 'SC-C10 · Portfolio index',
    scenarios: keys(portfolioScenarios),
    render: (s) => <PortfolioIndexScreen loaded={(portfolioScenarios as never)[s]} />,
  },
  {
    id: 'SC-C11', label: 'SC-C11 · Application detail',
    scenarios: keys(applicationDetailScenarios),
    render: (s) => <ApplicationDetailScreen loaded={(applicationDetailScenarios as never)[s]} />,
  },
  {
    id: 'SC-C12', label: 'SC-C12 · Deadlines index',
    scenarios: keys(deadlinesScenarios),
    render: (s) => <DeadlinesIndexScreen loaded={(deadlinesScenarios as never)[s]} />,
  },
  {
    id: 'SC-C13', label: 'SC-C13 · Deadline detail (trace)',
    scenarios: keys(deadlineDetailScenarios),
    render: (s) => <DeadlineDetailScreen loaded={(deadlineDetailScenarios as never)[s]} />,
  },
  {
    id: 'SC-C14', label: 'SC-C14 · Matters index',
    scenarios: keys(mattersScenarios),
    render: (s) => <MattersIndexScreen loaded={(mattersScenarios as never)[s]} />,
  },
  {
    id: 'SC-C15', label: 'SC-C15 · Matter workspace',
    scenarios: keys(matterWorkspaceScenarios),
    render: (s) => <MatterWorkspaceScreen loaded={(matterWorkspaceScenarios as never)[s]} />,
  },
  {
    id: 'SC-C16', label: 'SC-C16 · Costs',
    scenarios: keys(costsScenarios),
    render: (s) => <CostsScreen loaded={(costsScenarios as never)[s]} />,
  },
  {
    id: 'SC-C18', label: 'SC-C18 · Agent matching',
    scenarios: keys(matchingScenarios),
    render: (s) => <MatchingScreen loaded={(matchingScenarios as never)[s]} />,
  },
  {
    id: 'SC-C17', label: 'SC-C17 · Documents',
    scenarios: keys(documentsScenarios),
    render: (s) => <DocumentsScreen loaded={(documentsScenarios as never)[s]} />,
  },
  {
    id: 'SC-C19', label: 'SC-C19 · Quote & engagement',
    scenarios: keys(quoteScenarios),
    render: (s) => <QuoteEngagementScreen loaded={(quoteScenarios as never)[s]} />,
  },
  {
    id: 'SC-C20', label: 'SC-C20 · Settings',
    scenarios: keys(settingsScenarios),
    render: (s) => <SettingsScreen loaded={(settingsScenarios as never)[s]} />,
  },
  {
    id: 'SC-C21', label: 'SC-C21 · Notifications',
    scenarios: keys(notificationsScenarios),
    render: (s) => <NotificationsScreen loaded={(notificationsScenarios as never)[s]} />,
  },
  // ── B6 · Agent surface (rendered in the Agent shell) ──
  {
    id: 'SC-A00', label: 'SC-A00 · Agent onboarding & verification', surface: 'agent',
    scenarios: keys(agentOnboardingScenarios),
    render: (s) => <AgentOnboardingScreen loaded={(agentOnboardingScenarios as never)[s]} />,
  },
  {
    id: 'SC-A01', label: 'SC-A01 · Today', surface: 'agent',
    scenarios: keys(agentTodayScenarios),
    render: (s) => <AgentTodayScreen loaded={(agentTodayScenarios as never)[s]} />,
  },
  {
    id: 'SC-A02', label: 'SC-A02 · Docket + deadline detail', surface: 'agent',
    scenarios: keys(agentDocketScenarios),
    render: (s) => <AgentDocketScreen loaded={(agentDocketScenarios as never)[s]} />,
  },
  {
    id: 'SC-A03', label: 'SC-A03 · Matters index', surface: 'agent',
    scenarios: keys(agentMattersScenarios),
    render: (s) => <AgentMattersIndexScreen loaded={(agentMattersScenarios as never)[s]} />,
  },
  {
    id: 'SC-A04', label: 'SC-A04 · Matter import ★', surface: 'agent',
    scenarios: keys(matterImportScenarios),
    render: (s) => <MatterImportScreen loaded={(matterImportScenarios as never)[s]} />,
  },
  {
    id: 'SC-A05', label: 'SC-A05 · Agent matter detail', surface: 'agent',
    scenarios: keys(agentMatterDetailScenarios),
    render: (s) => <AgentMatterDetailScreen loaded={(agentMatterDetailScenarios as never)[s]} />,
  },
  {
    id: 'SC-A06', label: 'SC-A06 · Reviews queue ★', surface: 'agent',
    scenarios: keys(reviewsQueueScenarios),
    render: (s) => <ReviewsQueueScreen loaded={(reviewsQueueScenarios as never)[s]} />,
  },
  {
    id: 'SC-A07', label: 'SC-A07 · Review workspace ★★', surface: 'agent',
    scenarios: keys(reviewWorkspaceScenarios),
    render: (s) => <ReviewWorkspaceScreen loaded={(reviewWorkspaceScenarios as never)[s]} />,
  },
  {
    id: 'SC-A08', label: 'SC-A08 · Opportunities', surface: 'agent',
    scenarios: keys(opportunitiesScenarios),
    render: (s) => <OpportunitiesScreen loaded={(opportunitiesScenarios as never)[s]} />,
  },
  {
    id: 'SC-A09', label: 'SC-A09–A12 · Practice', surface: 'agent',
    scenarios: keys(practiceScenarios),
    render: (s) => <AgentPracticeScreen loaded={(practiceScenarios as never)[s]} />,
  },
  {
    id: 'SC-A13', label: 'SC-A13 · Agent settings', surface: 'agent',
    scenarios: keys(agentSettingsScenarios),
    render: (s) => <AgentSettingsScreen loaded={(agentSettingsScenarios as never)[s]} />,
  },
  {
    id: 'SC-A14', label: 'SC-A14 · Notifications + context switcher', surface: 'agent',
    scenarios: keys(agentNotificationsScenarios),
    render: (s) => <AgentNotificationsScreen loaded={(agentNotificationsScenarios as never)[s]} />,
  },
  // ── B7 · Operations surface (rendered in the Ops shell) ──
  {
    id: 'SC-O01', label: 'SC-O01 · Docket Health ★', surface: 'ops',
    scenarios: keys(docketHealthScenarios),
    render: (s) => <DocketHealthScreen loaded={(docketHealthScenarios as never)[s]} />,
  },
  {
    id: 'SC-O02', label: 'SC-O02 · Agent Verification', surface: 'ops',
    scenarios: keys(agentVerificationScenarios),
    render: (s) => <AgentVerificationScreen loaded={(agentVerificationScenarios as never)[s]} />,
  },
  {
    id: 'SC-O03', label: 'SC-O03 · Rule Authoring ★', surface: 'ops',
    scenarios: keys(ruleAuthoringScenarios),
    render: (s) => <RuleAuthoringScreen loaded={(ruleAuthoringScenarios as never)[s]} />,
  },
  {
    id: 'SC-O04', label: 'SC-O04 · Quality & Review', surface: 'ops',
    scenarios: keys(qualityScenarios),
    render: (s) => <QualityConsoleScreen loaded={(qualityScenarios as never)[s]} />,
  },
  {
    id: 'SC-O05', label: 'SC-O05 · Business metrics', surface: 'ops',
    scenarios: keys(businessScenarios),
    render: (s) => <BusinessDashboardScreen loaded={(businessScenarios as never)[s]} />,
  },
  // ── B8 · Public surface (rendered in the Public shell) ──
  { id: 'SC-P01', label: 'SC-P01 · Public Home', surface: 'public', scenarios: keys(publicHomeScenarios), render: (s) => <PublicHomeScreen loaded={(publicHomeScenarios as never)[s]} /> },
  { id: 'SC-P02', label: 'SC-P02 · Patent Search', surface: 'public', scenarios: keys(patentSearchScenarios), render: (s) => <PatentSearchScreen loaded={(patentSearchScenarios as never)[s]} /> },
  { id: 'SC-P03', label: 'SC-P03 · Patent Document ★', surface: 'public', scenarios: keys(patentDocumentScenarios), render: (s) => <PatentDocumentScreen loaded={(patentDocumentScenarios as never)[s]} /> },
  { id: 'SC-P04', label: 'SC-P04 · Stage landing', surface: 'public', scenarios: keys(stageLandingScenarios), render: (s) => <StageLandingScreen loaded={(stageLandingScenarios as never)[s]} /> },
  { id: 'SC-P05', label: 'SC-P05 · Segment landing', surface: 'public', scenarios: keys(segmentLandingScenarios), render: (s) => <SegmentLandingScreen loaded={(segmentLandingScenarios as never)[s]} /> },
  { id: 'SC-P06', label: 'SC-P06 · Pricing', surface: 'public', scenarios: keys(pricingScenarios), render: (s) => <PricingScreen loaded={(pricingScenarios as never)[s]} /> },
  { id: 'SC-P07', label: 'SC-P07 · Cost Planner', surface: 'public', scenarios: keys(costPlannerScenarios), render: (s) => <CostPlannerScreen loaded={(costPlannerScenarios as never)[s]} /> },
  { id: 'SC-P08', label: 'SC-P08 · Find-your-path', surface: 'public', scenarios: keys(findYourPathScenarios), render: (s) => <FindYourPathScreen loaded={(findYourPathScenarios as never)[s]} /> },
  { id: 'SC-P09', label: 'SC-P09 · Guides', surface: 'public', scenarios: keys(guidesScenarios), render: (s) => <GuidesScreen loaded={(guidesScenarios as never)[s]} /> },
  { id: 'SC-P10', label: 'SC-P10 · Glossary', surface: 'public', scenarios: keys(glossaryScenarios), render: (s) => <GlossaryScreen loaded={(glossaryScenarios as never)[s]} /> },
  { id: 'SC-P11', label: 'SC-P11 · Jurisdiction guide', surface: 'public', scenarios: keys(jurisdictionScenarios), render: (s) => <JurisdictionGuideScreen loaded={(jurisdictionScenarios as never)[s]} /> },
  { id: 'SC-P12', label: 'SC-P12 · Reports', surface: 'public', scenarios: keys(reportsScenarios), render: (s) => <ReportsScreen loaded={(reportsScenarios as never)[s]} /> },
  { id: 'SC-P13a', label: 'SC-P13 · Agent directory', surface: 'public', scenarios: keys(agentDirectoryScenarios), render: (s) => <AgentDirectoryScreen loaded={(agentDirectoryScenarios as never)[s]} /> },
  { id: 'SC-P13b', label: 'SC-P13 · Agent profile', surface: 'public', scenarios: keys(agentProfileScenarios), render: (s) => <AgentPublicProfileScreen loaded={(agentProfileScenarios as never)[s]} /> },
  { id: 'SC-P14', label: 'SC-P14 · Trust pages', surface: 'public', scenarios: keys(trustScenarios), render: (s) => <TrustPagesScreen loaded={(trustScenarios as never)[s]} /> },
  { id: 'SC-P15', label: 'SC-P15 · Company + Legal', surface: 'public', scenarios: keys(companyLegalScenarios), render: (s) => <CompanyLegalScreen loaded={(companyLegalScenarios as never)[s]} /> },
  { id: 'SC-P16', label: 'SC-P16 · Account & sign-in', surface: 'public', scenarios: keys(authScenarios), render: (s) => <AuthScreen loaded={(authScenarios as never)[s]} /> },
];

export function App() {
  const [screenId, setScreenId] = useState(SCREENS[1].id); // default: inventions index
  const screen = useMemo(() => SCREENS.find((s) => s.id === screenId)!, [screenId]);
  const [scenarioId, setScenarioId] = useState(screen.scenarios[0].id);

  function pickScreen(id: string) {
    const next = SCREENS.find((s) => s.id === id)!;
    setScreenId(id);
    setScenarioId(next.scenarios[0].id);
  }

  const body = screen.render(scenarioId);

  return (
    <>
      <div className="scenario-bar">
        <label htmlFor="screen">Screen</label>
        <select id="screen" value={screenId} onChange={(e) => pickScreen(e.target.value)}>
          {SCREENS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <label htmlFor="scenario">Scenario</label>
        <select id="scenario" value={scenarioId} onChange={(e) => setScenarioId(e.target.value)}>
          {screen.scenarios.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <span className="scenario-bar__note">B1+B2 review harness — not a product surface.</span>
      </div>
      {screen.standalone
        ? body
        : screen.surface === 'agent'
          ? <AgentShell>{body}</AgentShell>
          : screen.surface === 'ops'
            ? <OpsShell>{body}</OpsShell>
            : screen.surface === 'public'
              ? <PublicShell>{body}</PublicShell>
              : <ClientShell>{body}</ClientShell>}
    </>
  );
}
