/**
 * ALDASSIST Phase 8 — useResolvedCitation. Resolves a citation's passage through the CitationResolver
 * port BEFORE the caller may present the assertion as verified (CR-6 fail-closed). Returns:
 *   'pending'  — resolution in flight (caller must NOT present as verified yet)
 *   Passage    — resolved (caller may present as verified)
 *   null       — no citation, or resolution failed (caller must present as unverified)
 */
import { useEffect, useState } from 'react';
import type { Citation, ResolvedPassage } from '../contract';
import { useCitationResolver } from './CitationResolverContext';

export type CitationResolution = 'pending' | ResolvedPassage | null;

export function useResolvedCitation(citation?: Citation): CitationResolution {
  const resolver = useCitationResolver();
  const [state, setState] = useState<CitationResolution>(citation ? 'pending' : null);

  useEffect(() => {
    let live = true;
    if (!citation) {
      setState(null);
      return;
    }
    setState('pending');
    resolver.resolve(citation.passage).then((p) => {
      if (live) setState(p ?? null);
    });
    return () => {
      live = false;
    };
  }, [citation, resolver]);

  return state;
}
