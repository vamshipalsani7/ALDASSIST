/**
 * ALDASSIST Phase 9 — B1a composition root (D-2026-026 / ADR-02).
 *
 * Replaces the Phase-8 demo harness: instead of importing scenario maps directly, App now resolves the
 * runtime mode ONCE, builds the ProviderRegistry for that mode, injects it through RegistryProvider, and
 * renders the routing shell. Every one of the 56 frozen screens renders through this injection seam
 * against the Fixture* providers — no screen imports a scenario map any more.
 *
 * Modes (FA-4): `fixture` (default) and `contract` build the fixture registry; a `live` build fails
 * closed (buildRegistry throws) so it can never silently fall back to fixtures. No back end exists yet.
 * The review nav lives in the shell and reuses harness.css (a non-product demo aid).
 */
import { useMemo } from 'react';
import { resolveMode } from './runtime/mode';
import { buildRegistry } from './runtime/buildRegistry';
import { RegistryProvider } from './runtime/RegistryContext';
import { RouterShell } from './runtime/RouterShell';
import './styles/harness.css';

export function App() {
  const mode = useMemo(() => resolveMode(), []);
  const registry = useMemo(() => buildRegistry(mode), [mode]);

  return (
    <RegistryProvider registry={registry}>
      <RouterShell mode={mode} />
    </RegistryProvider>
  );
}
