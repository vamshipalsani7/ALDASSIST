/**
 * ALDASSIST Phase 8/9 — CitationResolver context. Provides the resolver the provenance components use to
 * fetch a cited passage (CR-6). The app injects the registry's resolver via RegistryProvider; this module
 * default is the convenience fallback for dev, Storybook and tests.
 *
 * B1a (D-2026-026 / FA-4): the default no longer UNCONDITIONALLY falls back to the fixture resolver. In
 * every mode except `live` the fixture resolver stays the default; in a `live` build the default is a
 * fail-closed stub, so a real resolver MUST be injected and a live build can never silently show fixture
 * provenance (CR-6). Phase 9 injects a register/corpus-backed resolver here.
 */
import { createContext, useContext, type ReactNode } from 'react';
import type { CitationResolver } from '../contract';
import { FixtureCitationResolver } from '../fixtures/providers/FixtureCitationResolver';
import { fixturesPermitted } from '../runtime/mode';

const liveFailClosed: CitationResolver = {
  async resolve() {
    throw new Error(
      '[ALDASSIST] No CitationResolver is injected in live mode. The fixture resolver is not used in a ' +
        'live build (fail-closed, CR-6). Provide a real resolver via CitationResolverProvider / the runtime registry.',
    );
  },
};

const defaultResolver: CitationResolver = fixturesPermitted() ? new FixtureCitationResolver() : liveFailClosed;
const CitationResolverContext = createContext<CitationResolver>(defaultResolver);

export function CitationResolverProvider({ resolver, children }: { resolver: CitationResolver; children: ReactNode }) {
  return <CitationResolverContext.Provider value={resolver}>{children}</CitationResolverContext.Provider>;
}

export function useCitationResolver(): CitationResolver {
  return useContext(CitationResolverContext);
}
