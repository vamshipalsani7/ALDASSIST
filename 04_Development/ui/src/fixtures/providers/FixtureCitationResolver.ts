/**
 * ALDASSIST Phase 8 — fixtures: FixtureCitationResolver. Implements the CitationResolver port against
 * the synthetic passage store. Phase 9 replaces this with a register/corpus-backed resolver behind the
 * identical interface.
 */
import type { CitationResolver, SourcePassageRef, ResolvedPassage } from '../../contract';
import { resolvePassage } from '../passages';

export class FixtureCitationResolver implements CitationResolver {
  async resolve(ref: SourcePassageRef): Promise<ResolvedPassage | null> {
    return resolvePassage(ref);
  }
}
