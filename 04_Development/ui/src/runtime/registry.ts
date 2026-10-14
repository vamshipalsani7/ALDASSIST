/**
 * ALDASSIST Phase 9 — B1a runtime: the typed provider registry (D-2026-026 / ADR-02).
 *
 * One field per frozen contract port (ports.ts), typed to the port INTERFACE — never to a concrete
 * a concrete Fixture or Api class. The composition root builds this once per run; screens reach it through the
 * RegistryProvider seam. Phase 9 later swaps the fixture implementations for ApiProviders behind these
 * identical interfaces without touching this shape or any screen.
 *
 * This is additive runtime wiring: it imports contract TYPES only and modifies no frozen contract file.
 */
import type {
  AssessmentProvider, CitationResolver,
  WorkspaceSetupProvider, InventionsProvider, InventionDetailProvider, DisclosureCaptureProvider,
  DisclosureVersionsProvider, AssessmentRequestProvider, AssessmentsListProvider, DecisionProvider,
  PortfolioProvider, ApplicationDetailProvider, DeadlinesProvider, DeadlineDetailProvider,
  MattersProvider, MatterWorkspaceProvider, CostsProvider, MatchingProvider, QuoteEngagementProvider,
  HomeProvider, DocumentsProvider, SettingsProvider, NotificationsProvider,
  AgentOnboardingProvider, AgentTodayProvider, AgentDocketProvider, AgentMattersProvider,
  MatterImportProvider, AgentMatterDetailProvider, ReviewsQueueProvider, ReviewWorkspaceProvider,
  OpportunitiesProvider, PracticeProvider, AgentSettingsProvider, AgentNotificationsProvider,
  DocketHealthProvider, AgentVerificationProvider, RuleAuthoringProvider, QualityConsoleProvider,
  BusinessDashboardProvider,
  PublicHomeProvider, PatentSearchProvider, PatentDocumentProvider, StageLandingProvider,
  SegmentLandingProvider, PricingProvider, CostPlannerProvider, FindYourPathProvider, GuidesProvider,
  GlossaryProvider, JurisdictionGuideProvider, ReportsProvider, AgentDirectoryProvider,
  AgentPublicProfileProvider, TrustProvider, CompanyLegalProvider, AuthProvider,
} from '../contract';

export interface ProviderRegistry {
  // Cross-cutting
  assessment: AssessmentProvider;
  citationResolver: CitationResolver;
  // B2 · Client Vault
  workspaceSetup: WorkspaceSetupProvider;
  inventions: InventionsProvider;
  inventionDetail: InventionDetailProvider;
  disclosureCapture: DisclosureCaptureProvider;
  disclosureVersions: DisclosureVersionsProvider;
  assessmentRequest: AssessmentRequestProvider;
  assessmentsList: AssessmentsListProvider;
  decision: DecisionProvider;
  // B3 · Portfolio / Deadlines
  portfolio: PortfolioProvider;
  applicationDetail: ApplicationDetailProvider;
  deadlines: DeadlinesProvider;
  deadlineDetail: DeadlineDetailProvider;
  // B4 · Matters / Costs / Matching
  matters: MattersProvider;
  matterWorkspace: MatterWorkspaceProvider;
  costs: CostsProvider;
  matching: MatchingProvider;
  quoteEngagement: QuoteEngagementProvider;
  // B5 · Home / Documents / Settings / Notifications
  home: HomeProvider;
  documents: DocumentsProvider;
  settings: SettingsProvider;
  notifications: NotificationsProvider;
  // B6 · Agent surface
  agentOnboarding: AgentOnboardingProvider;
  agentToday: AgentTodayProvider;
  agentDocket: AgentDocketProvider;
  agentMatters: AgentMattersProvider;
  matterImport: MatterImportProvider;
  agentMatterDetail: AgentMatterDetailProvider;
  reviewsQueue: ReviewsQueueProvider;
  reviewWorkspace: ReviewWorkspaceProvider;
  opportunities: OpportunitiesProvider;
  practice: PracticeProvider;
  agentSettings: AgentSettingsProvider;
  agentNotifications: AgentNotificationsProvider;
  // B7 · Operations surface
  docketHealth: DocketHealthProvider;
  agentVerification: AgentVerificationProvider;
  ruleAuthoring: RuleAuthoringProvider;
  qualityConsole: QualityConsoleProvider;
  businessDashboard: BusinessDashboardProvider;
  // B8 · Public surface
  publicHome: PublicHomeProvider;
  patentSearch: PatentSearchProvider;
  patentDocument: PatentDocumentProvider;
  stageLanding: StageLandingProvider;
  segmentLanding: SegmentLandingProvider;
  pricing: PricingProvider;
  costPlanner: CostPlannerProvider;
  findYourPath: FindYourPathProvider;
  guides: GuidesProvider;
  glossary: GlossaryProvider;
  jurisdictionGuide: JurisdictionGuideProvider;
  reports: ReportsProvider;
  agentDirectory: AgentDirectoryProvider;
  agentPublicProfile: AgentPublicProfileProvider;
  trust: TrustProvider;
  companyLegal: CompanyLegalProvider;
  auth: AuthProvider;
}
