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

interface ScreenDef {
  id: string;
  label: string;
  standalone?: boolean; // rendered outside the Client shell (SC-C00 is pre-workspace)
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
      {screen.standalone ? body : <ClientShell>{body}</ClientShell>}
    </>
  );
}
