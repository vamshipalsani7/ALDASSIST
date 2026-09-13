/**
 * ALDASSIST Phase 8 — B1 demo harness. Drives SC-C08 through the AssessmentProvider PORT with a scenario
 * switcher, so every mandated state is demonstrable. The switcher is a B1 review aid, NOT a product surface.
 */
import { useEffect, useState } from 'react';
import './styles/harness.css'; // demo scenario-switcher styles (not a product component)
import type { Loaded, AssessmentVM } from './contract';
import { ClientShell } from './shell/ClientShell';
import { AssessmentVerdictScreen } from './screens/AssessmentVerdict';
import { FixtureAssessmentProvider } from './fixtures/providers/FixtureAssessmentProvider';
import { assessmentScenarioGroups, defaultScenario } from './fixtures/scenarioRegistry';
import type { AssessmentScenarioId } from './fixtures/scenarios/assessment';

export function App() {
  const [scenario, setScenario] = useState<AssessmentScenarioId>(defaultScenario);
  const [loaded, setLoaded] = useState<Loaded<AssessmentVM>>({ state: 'loading' });

  useEffect(() => {
    let live = true;
    setLoaded({ state: 'loading' });
    const provider = new FixtureAssessmentProvider(scenario);
    provider.get('inv_7F3A', 'asmt_DEMO_0001').then((r) => {
      if (live) setLoaded(r);
    });
    return () => {
      live = false;
    };
  }, [scenario]);

  return (
    <>
      <div className="scenario-bar">
        <label htmlFor="scenario">Scenario</label>
        <select id="scenario" value={scenario} onChange={(e) => setScenario(e.target.value as AssessmentScenarioId)}>
          {assessmentScenarioGroups.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.ids.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="scenario-bar__note">B1 review harness — demonstrates SC-C08 states. Not a product surface.</span>
      </div>
      <ClientShell>
        <AssessmentVerdictScreen loaded={loaded} />
      </ClientShell>
    </>
  );
}
