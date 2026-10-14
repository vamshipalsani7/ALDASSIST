/**
 * ALDASSIST Phase 9 — B2c: the frozen Auth (SC-P16) and WorkspaceSetup (SC-C00) screens render through
 * the approved provider seam (D-2026-026) — the generic ProviderScreen thin container binds each screen
 * to its contract port via the injected registry. This test asserts the wiring (data flows port →
 * Loaded<T> → frozen screen) WITHOUT modifying either frozen screen, and confirms the client-MFA slot
 * on Auth renders as an UNRESOLVED container (S-10 preserved — not resolved by B2).
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ROUTES } from './routes';
import { ProviderScreen } from './ProviderScreen';
import { RegistryProvider } from './RegistryContext';
import { createFixtureRegistry } from './fixtureRegistry';

function renderRoute(id: string) {
  const route = ROUTES.find((r) => r.id === id);
  if (!route) throw new Error(`[test] route ${id} not found`);
  render(
    <RegistryProvider registry={createFixtureRegistry()}>
      <ProviderScreen route={route} />
    </RegistryProvider>,
  );
}

describe('B2c — Auth & WorkspaceSetup render through the provider seam', () => {
  it('Auth (SC-P16) resolves its AuthProvider through the seam and renders', async () => {
    renderRoute('SC-P16');
    expect(await screen.findByRole('heading', { name: /create a free account/i })).toBeInTheDocument();
  });

  it('Auth shows the client-MFA policy as an unresolved container (S-10 preserved)', async () => {
    renderRoute('SC-P16');
    expect(await screen.findByText(/client MFA policy is not yet configured/i)).toBeInTheDocument();
  });

  it('WorkspaceSetup (SC-C00) resolves its WorkspaceSetupProvider through the seam and renders', async () => {
    renderRoute('SC-C00');
    expect(await screen.findByRole('heading', { name: /create your workspace/i })).toBeInTheDocument();
  });
});
