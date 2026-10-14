/**
 * ALDASSIST Phase 9 — B1a runtime: mode → registry (the fail-closed guard).
 *
 * `fixture` and `contract` build the fixture registry (B1a; the real `contract` transport is B1b).
 * `live` throws: no ApiProviders exist before Phase 9 ≥ B7, and a live build must NEVER fall back to
 * fixtures (fail-closed). This is the composition-time half of the guard; the CitationResolver default
 * is the render-time half.
 */
import type { ProviderRegistry } from './registry';
import { createFixtureRegistry } from './fixtureRegistry';
import type { RuntimeMode } from './mode';
import { resolveMode, fixturesPermitted } from './mode';

export function buildRegistry(mode: RuntimeMode = resolveMode()): ProviderRegistry {
  if (mode === 'live') {
    throw new Error(
      '[ALDASSIST] live runtime mode has no registered API providers yet (Phase 9 ≥ B7). ' +
        'Refusing to fall back to fixtures (fail-closed).',
    );
  }
  if (!fixturesPermitted(mode)) {
    // Defensive: any future non-fixture, non-live mode must register real providers before use.
    throw new Error(`[ALDASSIST] runtime mode "${mode}" has no provider registry.`);
  }
  return createFixtureRegistry();
}
