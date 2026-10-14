/**
 * ALDASSIST Phase 9 — B1a runtime: the routing/URL model shell (D-2026-028).
 *
 * Single deployable. Public routes are marked `ssr` and authenticated routes `spa`; B1a renders both
 * client-side (the SSR pass for `ssr` routes is B12). This is a SHELL: a dependency-free path→route
 * resolver over the frozen surfaces, enough to prove the topology and the injection seam. It also carries
 * a small review nav (harness-styled) that replaces the old scenario switcher — every screen is now
 * reachable by URL and rendered from its provider, not a hand-picked fixture.
 *
 * `initialPath` lets a server (later) supply the path; it defaults to the browser location.
 */
import { useEffect, useState, type ReactNode } from 'react';
import type { RuntimeMode } from './mode';
import { ROUTES, type ScreenRoute, type Surface } from './routes';
import { ProviderScreen } from './ProviderScreen';
import { ClientShell } from '../shell/ClientShell';
import { AgentShell } from '../shell/AgentShell';
import { OpsShell } from '../shell/OpsShell';
import { PublicShell } from '../shell/PublicShell';

const SURFACE_LABEL: Record<Surface, string> = {
  client: 'Client', agent: 'Agent', ops: 'Ops', public: 'Public', standalone: 'Setup',
};

function currentLocationPath(fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return window.location.pathname || fallback;
}

function withSurface(surface: Surface, node: ReactNode): ReactNode {
  switch (surface) {
    case 'agent': return <AgentShell>{node}</AgentShell>;
    case 'ops': return <OpsShell>{node}</OpsShell>;
    case 'public': return <PublicShell>{node}</PublicShell>;
    case 'client': return <ClientShell>{node}</ClientShell>;
    case 'standalone': return <>{node}</>;
    default: return <>{node}</>;
  }
}

/** The shell landing / fallback: every route as a navigable link, grouped by surface. */
function RouteIndex({ onNavigate }: { onNavigate: (path: string) => void }) {
  const surfaces: Surface[] = ['public', 'client', 'agent', 'ops', 'standalone'];
  return (
    <div className="detail-grid">
      <div>
        <div className="index-head"><h1>ALDASSIST — surfaces</h1></div>
        <p className="text-muted">Composition-root shell. Pick a screen; it loads from its provider.</p>
        {surfaces.map((s) => (
          <section key={s}>
            <h2>{SURFACE_LABEL[s]}</h2>
            <ul>
              {ROUTES.filter((r) => r.surface === s).map((r) => (
                <li key={r.id}>
                  <a className="rel-rail__item" href={r.path} onClick={(e) => { e.preventDefault(); onNavigate(r.path); }}>
                    {r.label} <span className="text-muted">· {r.path} · {r.rendering}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function RouterShell({ mode, initialPath }: { mode: RuntimeMode; initialPath?: string }) {
  const [path, setPath] = useState<string>(initialPath ?? currentLocationPath('/'));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onPop = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  function navigate(next: string) {
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({}, '', next);
    }
    setPath(next);
  }

  const match: ScreenRoute | undefined = ROUTES.find((r) => r.path === path);

  return (
    <>
      <div className="scenario-bar">
        <label htmlFor="route">Screen</label>
        <select id="route" value={match ? match.path : ''} onChange={(e) => navigate(e.target.value)}>
          <option value="">— surfaces index —</option>
          {ROUTES.map((r) => (
            <option key={r.id} value={r.path}>{SURFACE_LABEL[r.surface]} · {r.label}</option>
          ))}
        </select>
        <span className="scenario-bar__note">
          B1a composition root · mode: {mode} · {match ? `${match.id} · ${match.rendering}` : 'index'} · not a product surface
        </span>
      </div>
      {match
        ? withSurface(match.surface, <ProviderScreen route={match} />)
        : <PublicShell><RouteIndex onNavigate={navigate} /></PublicShell>}
    </>
  );
}
