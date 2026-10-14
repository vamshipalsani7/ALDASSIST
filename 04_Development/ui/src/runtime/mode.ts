/**
 * ALDASSIST Phase 9 — B1a runtime: mode resolution (FA-4, D-2026-026).
 *
 * One place resolves the runtime mode for the whole app. Three modes:
 *   - `fixture`  : the Phase-8 review harness — Fixture* providers, no back end.
 *   - `contract` : real transport shape against fixture responses (the wire-format proof).
 *                  B1a wires the SWITCH; the real transport lands in B1b. Until then `contract`
 *                  resolves the composition seam against fixture data.
 *   - `live`     : real ApiProviders. None exist before Phase 9 ≥ B7, so a live build must NOT
 *                  silently fall back to fixtures (fail-closed — see buildRegistry + CitationResolverContext).
 *
 * The mode is read once from the Vite env var VITE_ALDA_MODE (default `fixture`). No back end, no
 * external service, and no open decision is touched here.
 */
export type RuntimeMode = 'fixture' | 'contract' | 'live';

export const RUNTIME_MODES: readonly RuntimeMode[] = ['fixture', 'contract', 'live'];

interface ViteEnvLike {
  VITE_ALDA_MODE?: string;
}

function readEnvMode(): string | undefined {
  // Accessed defensively so this compiles without vite/client types and is safe under any bundler/test.
  const meta = import.meta as unknown as { env?: ViteEnvLike };
  return meta.env?.VITE_ALDA_MODE;
}

/** Resolve the runtime mode once. Unknown values fail fast rather than defaulting silently. */
export function resolveMode(): RuntimeMode {
  const raw = readEnvMode();
  if (raw == null || raw === '') return 'fixture';
  if ((RUNTIME_MODES as readonly string[]).includes(raw)) return raw as RuntimeMode;
  throw new Error(
    `[ALDASSIST] Unknown runtime mode "${raw}". Expected one of: ${RUNTIME_MODES.join(', ')}.`,
  );
}

/**
 * Fixtures may be constructed in every mode EXCEPT `live`. A live build must never reach a fixture —
 * this is the guard behind the composition root and the CitationResolver default.
 */
export function fixturesPermitted(mode: RuntimeMode = resolveMode()): boolean {
  return mode !== 'live';
}
