/**
 * CR-16 vocabulary lexicon — the SINGLE swap-in point (Phase-8 audit M2).
 *
 * SOURCE AUTHORITY (recognized under D-2026-038, D-2026-041): the six platform-wide banned-marketing
 * groups are Phase 4 §10.3 ("Terms banned platform-wide", 02_Product/Phase-4-Information Architecture
 * v1.0.md), complementary to the Strategy Glossary (01_Strategy/Glossary.md, canonical terminology,
 * D-2026-011). This file transcribes the §10.3 platform-wide bans only; it does NOT implement the
 * register-specific §10.2 "Never use" terms.
 *
 * MATCHING POLICY (D-2026-041): literal term matching for five groups. Group 3 — "Instant" / "in seconds"
 * (of assessment) — uses five assessment-specific literal phrases, NOT a bare /instant/i matcher, so the
 * frozen Agent fixture phrase "instant deadline safety" (fixtures/scenarios/agent.ts) is not flagged.
 * Group 6 — "Simply" / "just" / "easy" — uses six register-anchored literal matchers (not the bare words),
 * because bare /\bjust\b/i matches the frozen Public R0 fixture label "Just an idea"
 * (fixtures/scenarios/public.ts:138) — a confirmed false positive (a process-stage answer, not a
 * patronizing claim). The fixture is preserved unchanged. No generalized contextual/proximity matching,
 * exceptions, allowlists, or synonyms outside §10.3 are added (D1 = 1A, groups 3 and 6 register-refined).
 *
 * KNOWN LIMITATIONS: literal matching under-covers paraphrase — interposed words, word-order variants,
 * term variants ("guarantees", "AI powered", "easier", "with ease"), and register synonyms outside
 * §10.3's listed words (effortless, seamless, one-click, hassle-free). The §10.2 qualifiers on groups 2
 * and 5 are not encoded. `LEXICON_IS_AUTHORITATIVE` remains `false` (D2 = 2A): the existing harness
 * enforces the §10.3 terms below, but this gate is NOT a complete authoritative CR-16 check, and the
 * limitation documentation in `vocabulary.crosscutting.test.ts` is intentionally left unchanged. The
 * authority-flag half of M2 remains open.
 */

/** Remains `false` under D-2026-041 (D2 = 2A). Do not flip without separate owner authorization. */
export const LEXICON_IS_AUTHORITATIVE = false;

/**
 * §10.3 platform-wide banned-marketing matchers (literal; groups 3 & 6 register-refined per D-2026-041).
 * The provisional seed terms marketplace / starting from / testimonial were removed under owner choice 3A
 * (none is a §10.3 term; the Marketplace terminology conflict remains deferred/unresolved under D-2026-040).
 */
export const BANNED_SEED: RegExp[] = [
  /success rate/i,                     // §10.3 — "Success rate"
  /\bguaranteed\b/i,                   // §10.3 — "Guaranteed" (of any outcome)
  /instant assessment/i,               // §10.3 group 3 — assessment-specific (not bare "instant")
  /assessment in seconds/i,            // §10.3 group 3
  /instant patentability opinion/i,    // §10.3 group 3 — assessment term of art
  /assessed in seconds/i,              // §10.3 group 3
  /patentability opinion in seconds/i, // §10.3 group 3 — assessment term of art
  /\baffordable\b/i,                   // §10.3 — "Affordable"
  /\bcheap\b/i,                        // §10.3 — "cheap"
  /ai-powered/i,                       // §10.3 — "AI-powered" (as a standalone claim)
  // §10.3 group 6 — "Simply / just / easy": register-anchored (numeric quantity included, e.g. "just 3 steps")
  /\bjust\s+(?:(?:a few|a couple|\d{1,2})\s+)?(?:a moment|a minute|a second|minutes?|seconds?|clicks?|steps?|taps?|questions?)\b/i,
  /\bjust (click|tap|fill|enter|type|upload|sign|answer|tell us|add|select|choose|pick|submit|send|complete|follow|register|start)\b/i,
  /\bsimply (click|tap|fill|enter|type|upload|sign|answer|tell us|add|select|choose|pick|submit|send|complete|follow|register|start|file|do|use)\b/i,
  /\bit['’]?s that (simple|easy)\b/i,
  /\b(quick and easy|super easy|so easy|really easy|easy steps|made easy|makes it easy|it['’]?s easy|easy to (use|file|start|apply|register|understand))\b/i,
  /\beasily (file|apply|register|start|track|manage|submit|complete)\b/i,
];
