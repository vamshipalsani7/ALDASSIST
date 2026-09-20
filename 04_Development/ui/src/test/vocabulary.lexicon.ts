/**
 * CR-16 vocabulary lexicon — the SINGLE swap-in point (Phase-8 audit M2).
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *  STATUS: PROVISIONAL. `LEXICON_IS_AUTHORITATIVE = false`.
 * ─────────────────────────────────────────────────────────────────────────────────────────────
 *
 * The COMPLETE authoritative CR-16 / P4:§10.3 banned/required marketing lexicon is FROZEN GOVERNANCE that
 * does not live in this repository. Per the audit mandate it was **not invented or reconstructed here**:
 * `BANNED_SEED` below is a provisional seed grounded ONLY in the banned terms already asserted by
 * pre-existing per-screen tests. The cross-cutting vocabulary gate
 * (`vocabulary.crosscutting.test.ts`) is therefore a REGRESSION GUARD over grounded terms, NOT a complete
 * CR-16 check.
 *
 * TO MAKE IT AUTHORITATIVE (governance action):
 *   1. Replace `BANNED_SEED` with the frozen CR-16 / P4:§10.3 list (add `REQUIRED_TERMS` if that spec
 *      defines any). Do not paraphrase — transcribe.
 *   2. Set `LEXICON_IS_AUTHORITATIVE = true`.
 *   3. Re-run `npm run check:vocab`.
 * Until then the gate remains provisional and this file is the only place to change.
 */

/** Flip to `true` ONLY when `BANNED_SEED` holds the complete frozen CR-16/P4:§10.3 lexicon (see header). */
export const LEXICON_IS_AUTHORITATIVE = false;

/**
 * PROVISIONAL banned-term matchers — grounded seed only (terms already asserted by pre-existing tests:
 * publicHome/pricing/costs/etc.). NOT the authoritative frozen lexicon. No terms were invented.
 */
export const BANNED_SEED: RegExp[] = [
  /marketplace/i,
  /\baffordable\b/i,
  /\bcheap\b/i,
  /starting from/i,
  /\btestimonial/i,
];
