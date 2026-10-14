/**
 * ALDASSIST Phase 9 — B1a runtime: the provider-injection seam (D-2026-026 / ADR-02).
 *
 * RegistryProvider supplies the ProviderRegistry through one React context at the app root and, in the
 * same place, injects the registry's CitationResolver so every screen resolves provenance through the
 * SAME injected implementation (never the module default). Phase-8 screens keep their pure `{ loaded }`
 * props; thin containers (ProviderScreen) read the registry here and pass Loaded<T> down.
 */
import { createContext, useContext, type ReactNode } from 'react';
import type { ProviderRegistry } from './registry';
import { CitationResolverProvider } from '../components/CitationResolverContext';

const RegistryContext = createContext<ProviderRegistry | null>(null);

export function RegistryProvider({ registry, children }: { registry: ProviderRegistry; children: ReactNode }) {
  return (
    <RegistryContext.Provider value={registry}>
      <CitationResolverProvider resolver={registry.citationResolver}>{children}</CitationResolverProvider>
    </RegistryContext.Provider>
  );
}

export function useRegistry(): ProviderRegistry {
  const registry = useContext(RegistryContext);
  if (!registry) {
    throw new Error('[ALDASSIST] useRegistry must be used within a <RegistryProvider>.');
  }
  return registry;
}
