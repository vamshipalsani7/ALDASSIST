/**
 * ALDASSIST Phase 8 — fixtures: synthetic cited-passage store (CR-6 resolution).
 * Maps a documentId + locator to its exact cited text. SYNTHETIC demo content only — no real
 * register data, no PII. A `verified` Citation must resolve here; anything not in the store is
 * unresolvable and the caller applies the IP-08 fail-safe.
 */
import type { Citation, SourcePassageRef, ResolvedPassage } from '../contract';

interface Doc {
  sourceLabel: string;
  locators: Record<string, string>; // locator -> exact cited text
}

export const passageStore: Record<string, Doc> = {
  'REF-ALPHA': {
    sourceLabel: 'REF-α — synthetic prior-art record',
    locators: {
      '¶17': 'A threshold value is configured once at manufacture and remains fixed throughout operation.',
    },
  },
  'REF-BETA': {
    sourceLabel: 'REF-β — synthetic prior-art record',
    locators: {
      '¶9': 'A recalibration routine is described in an unrelated acoustic-sensing context.',
    },
  },
  'SEARCH-REC': {
    sourceLabel: 'Search record — synthetic',
    locators: {
      '§2': 'No located reference teaches recalibrating the threshold from operational feedback in combination.',
    },
  },
};

/** Build a Citation whose passage is guaranteed present in the store (keeps fixtures self-consistent). */
export function makeCitation(documentId: string, locator: string): Citation {
  const doc = passageStore[documentId];
  const label = doc ? doc.sourceLabel : documentId;
  return {
    accessibleName: `Cited passage in ${label}, ${locator}`,
    passage: { documentId, locator },
    source: 'ai-derived',
  };
}

/** Pure lookup used by the FixtureCitationResolver (and directly by tests). */
export function resolvePassage(ref: SourcePassageRef): ResolvedPassage | null {
  const doc = passageStore[ref.documentId];
  if (!doc) return null;
  const excerpt = doc.locators[ref.locator];
  if (excerpt === undefined) return null;
  return { documentId: ref.documentId, locator: ref.locator, sourceLabel: doc.sourceLabel, excerpt };
}
