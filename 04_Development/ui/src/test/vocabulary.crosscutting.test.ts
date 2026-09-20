/**
 * B9 cross-cutting verification — vocabulary corpus gate (CR-16 / P4:§10.3 "banned marketing vocabulary").
 *
 * Scans the fixture-copy corpus across ALL FOUR surfaces (Client, Agent, Operations, Public) — every
 * exported scenario in src/fixtures/scenarios/* plus the display-label maps in src/screens/*labels* — and
 * fails if any banned marketing term appears. Until B9 this rule was enforced only ad hoc in a handful of
 * per-screen tests (marketplace / affordable / cheap / starting from / testimonial); this centralises it
 * over the whole corpus so a banned term cannot slip into any surface's copy.
 *
 * ── LEXICON AUTHORITY LIMITATION (explicit, per B9 mandate) ───────────────────────────────────────────
 * The COMPLETE authoritative CR-16 / P4:§10.3 banned/required lexicon is FROZEN GOVERNANCE that does not
 * live in this repository. Per the B9 instruction, this test does NOT invent or reconstruct that list and
 * does NOT declare a partial list authoritative. The terms below are a PROVISIONAL SEED, grounded only in
 * the banned terms already asserted by pre-existing per-screen tests. `LEXICON_IS_AUTHORITATIVE = false`
 * records this: the gate is a regression guard over grounded terms, NOT a complete CR-16 check. The lexicon
 * itself now lives in its own module — `./vocabulary.lexicon.ts`, the single swap-in point: paste the frozen
 * lexicon there and flip the flag to make this gate authoritative (audit M2).
 */
import { describe, it, expect } from 'vitest';
import { BANNED_SEED, LEXICON_IS_AUTHORITATIVE } from './vocabulary.lexicon';

import * as publicScenarios from '../fixtures/scenarios/public';
import * as homeScenarios from '../fixtures/scenarios/home';
import * as matterScenarios from '../fixtures/scenarios/matters';
import * as agentScenarios from '../fixtures/scenarios/agent';
import * as opsScenarios from '../fixtures/scenarios/ops';
import * as assessmentScenarios from '../fixtures/scenarios/assessment';
import * as portfolioScenarios from '../fixtures/scenarios/portfolio';
import * as vaultScenarios from '../fixtures/scenarios/vault';

import * as clientLabels from '../screens/labels';
import * as agentLabels from '../screens/agent-labels';
import * as opsLabels from '../screens/ops-labels';
import * as publicLabels from '../screens/public-labels';

// BANNED_SEED and LEXICON_IS_AUTHORITATIVE are imported from ./vocabulary.lexicon (the single swap-in point).

/** Recursively collect every string in a plain-data value; functions/symbols are skipped. */
function collectStrings(value: unknown, out: string[], seen = new Set<unknown>()): string[] {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const v of value) collectStrings(v, out, seen);
  } else if (value && typeof value === 'object') {
    if (seen.has(value)) return out;
    seen.add(value);
    for (const v of Object.values(value as Record<string, unknown>)) collectStrings(v, out, seen);
  }
  return out;
}

const CORPUS_BY_SURFACE: Record<string, unknown[]> = {
  Public: [publicScenarios, publicLabels],
  Client: [homeScenarios, matterScenarios, assessmentScenarios, portfolioScenarios, vaultScenarios, clientLabels],
  Agent: [agentScenarios, agentLabels],
  Operations: [opsScenarios, opsLabels],
};

describe('B9 vocabulary corpus (CR-16) — no banned marketing terms in any surface', () => {
  it('documents the lexicon-authority limitation (provisional seed, not authoritative)', () => {
    // This assertion is the machine-readable record of the limitation required by the B9 mandate.
    expect(LEXICON_IS_AUTHORITATIVE).toBe(false);
    expect(BANNED_SEED.length).toBeGreaterThan(0);
  });

  for (const [surface, modules] of Object.entries(CORPUS_BY_SURFACE)) {
    it(`${surface} surface fixture/label copy contains no grounded banned term`, () => {
      const corpus = collectStrings(modules, []).join('\n');
      for (const rx of BANNED_SEED) {
        expect(corpus, `${surface}: banned term ${rx} present`).not.toMatch(rx);
      }
    });
  }
});
