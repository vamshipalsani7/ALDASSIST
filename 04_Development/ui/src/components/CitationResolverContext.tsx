/**
 * ALDASSIST Phase 8 — CitationResolver context. Provides the resolver the provenance components use to
 * fetch a cited passage (CR-6). Defaults to the fixture resolver so every surface resolves in B1; App,
 * Storybook and tests may override it, and Phase 9 injects a register/corpus-backed resolver here.
 */
import { createContext, useContext, type ReactNode } from 'react';
import type { CitationResolver } from '../contract';
import { FixtureCitationResolver } from '../fixtures/providers/FixtureCitationResolver';

const defaultResolver: CitationResolver = new FixtureCitationResolver();
const CitationResolverContext = createContext<CitationResolver>(defaultResolver);

export function CitationResolverProvider({ resolver, children }: { resolver: CitationResolver; children: ReactNode }) {
  return <CitationResolverContext.Provider value={resolver}>{children}</CitationResolverContext.Provider>;
}

export function useCitationResolver(): CitationResolver {
  return useContext(CitationResolverContext);
}
