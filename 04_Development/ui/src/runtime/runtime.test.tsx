/**
 * ALDASSIST Phase 9 — B1a runtime foundation tests.
 * Verifies the composition seam, the three-mode switch with the live fail-closed guard, and that ALL 56
 * frozen screens load through the injected registry (the B1a completion boundary).
 */
import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { resolveMode, fixturesPermitted } from './mode';
import { createFixtureRegistry } from './fixtureRegistry';
import { buildRegistry } from './buildRegistry';
import { ROUTES } from './routes';
import { RegistryProvider } from './RegistryContext';
import { RouterShell } from './RouterShell';

describe('B1a — runtime mode', () => {
  it('defaults to fixture mode', () => {
    expect(resolveMode()).toBe('fixture');
  });
  it('permits fixtures in every mode except live', () => {
    expect(fixturesPermitted('fixture')).toBe(true);
    expect(fixturesPermitted('contract')).toBe(true);
    expect(fixturesPermitted('live')).toBe(false);
  });
});

describe('B1a — registry construction', () => {
  it('builds a fixture registry for fixture and contract modes', () => {
    expect(() => buildRegistry('fixture')).not.toThrow();
    expect(() => buildRegistry('contract')).not.toThrow();
  });
  it('fails closed for live mode (never falls back to fixtures)', () => {
    expect(() => buildRegistry('live')).toThrow(/live/i);
  });
  it('exposes a citation resolver on the registry', () => {
    expect(createFixtureRegistry().citationResolver).toBeTruthy();
  });
});

describe('B1a — injection seam covers every frozen screen', () => {
  it('has exactly 56 screen routes with unique ids and paths', () => {
    expect(ROUTES.length).toBe(56);
    expect(new Set(ROUTES.map((r) => r.id)).size).toBe(56);
    expect(new Set(ROUTES.map((r) => r.path)).size).toBe(56);
  });

  it('every route loads a valid Loaded<T> through the injected registry', async () => {
    const registry = createFixtureRegistry();
    const loadedAll = await Promise.all(ROUTES.map((r) => r.load(registry)));
    const valid = new Set(['loading', 'ready', 'empty', 'error', 'permission-denied', 'not-found']);
    for (let i = 0; i < ROUTES.length; i++) {
      const loaded = loadedAll[i] as { state?: string };
      expect(loaded, `${ROUTES[i].id} returned nothing`).toBeTruthy();
      expect(valid.has(String(loaded.state)), `${ROUTES[i].id} → ${loaded.state}`).toBe(true);
    }
  });

  it('marks the Public surface ssr and the authenticated surfaces spa (D-2026-028)', () => {
    for (const r of ROUTES) {
      if (r.surface === 'public') expect(r.rendering).toBe('ssr');
      if (r.surface === 'agent' || r.surface === 'ops' || r.surface === 'client') expect(r.rendering).toBe('spa');
    }
  });
});

describe('B1a — composition root renders a route through the seam', () => {
  it('renders a client route inside the shell without a scenario map', async () => {
    const registry = createFixtureRegistry();
    const { container } = render(
      <RegistryProvider registry={registry}>
        <RouterShell mode="fixture" initialPath="/app" />
      </RegistryProvider>,
    );
    await waitFor(() => expect(container.textContent && container.textContent.length).toBeTruthy());
  });
});
