/**
 * ALDASSIST Phase 8 — SC-P13 Public agent directory (B8). Public, SEO-relevant agent profiles. Outcome
 * statistics only at n≥20 with sample size + confidence; below the floor → "not enough data yet"
 * (D-2026-019). Represented structurally by AgentStatsVM, so a below-floor agent cannot show a statistic.
 */
import type { Loaded, AgentDirectoryVM, AgentStatsVM } from '../../contract';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function Stats({ stats }: { stats: AgentStatsVM }) {
  if (stats.status === 'below-floor') return <span className="text-muted">{stats.note}</span>;
  return (
    <span className="text-muted">
      n = {stats.n} · {stats.confidence.status === 'pending-slot'
        ? 'confidence representation not yet set'
        : stats.confidence.status === 'resolved' ? `confidence: ${stats.confidence.value}` : 'confidence unavailable'}
    </span>
  );
}

export function AgentDirectoryScreen({ loaded }: { loaded: Loaded<AgentDirectoryVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['Agents']} />
      <h1>Find an agent</h1>
      <div className="facets" aria-label="Filters">
        {vm.filters.map((f) => <span className="facet" key={f.id}>{f.label}</span>)}
      </div>
      <ul className="version-list">
        {vm.agents.map((a) => (
          <li className="version" key={a.slug}>
            <span className="version__id">{a.name}</span>
            <span className="text-muted">{a.specializations.join(', ')} · {a.jurisdiction}</span>
            <Stats stats={a.stats} />
          </li>
        ))}
      </ul>
    </>
  );
}
