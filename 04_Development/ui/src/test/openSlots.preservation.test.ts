/**
 * Cross-cutting verification — open-slot preservation (B9; coverage expanded per Phase-8 audit M1).
 *
 * Guards the frozen OPEN decisions/slots against accidental resolution across ALL surfaces (Client, Agent,
 * Operations¹, Public). Every batch before Phase 9 must leave these UNRESOLVED — no invented value may stand
 * in for them. The test asserts the fixtures still model each as a container (`pending-slot` / `pending-legal`),
 * never a fabricated value. If any ever reads `status:'resolved'` with a concrete value, THIS test fails —
 * the signal that an open decision was silently closed.
 *
 * Slots guarded (by id):
 *   • O-2026-001 — pricing RENDERING MODE stays pending in every PRODUCT surface; fee amounts never a number.
 *   • L1 / L1-04 — platform/professional fee LEGAL wording stays pending-legal; L1 settlement presentation.
 *   • L3        — agent-publication go-live gate stays pending-legal.
 *   • L4        — trust-page legal wording stays pending-legal.
 *   • L7        — data-residency stays pending.
 *   • S-1 / S-2 — review turnaround / reviewer-confidence representation stay pending.
 *   • S-3       — agent-stat CONFIDENCE stays pending (n may publish, confidence may not); below-floor shows
 *                 a note and CANNOT carry a statistic.
 *   • S-5       — expected-next-event range stays pending.
 *   • S-7       — per-class default channel stays pending.
 *   • S-10 / MFA — client MFA policy stays pending (BOTH the auth slot and the settings/S-10 slot).
 *   • Rules-Engine — find-your-path cost range / official fees / jurisdiction fee structure stay pending.
 *
 * ¹ Operations metric TARGETS (ops.ts `val()`) are legitimately `status:'resolved'`/config — canonical
 *   Metrics.md definitions, NOT frozen-open decisions (their measured VALUES stay pending). They are therefore
 *   deliberately NOT swept here; a blanket "no resolved value anywhere" check would false-positive on them.
 *   Traceability for those targets is recorded in Phase-8-External-Source-Traceability.md (audit M3).
 *
 * NOTE (audit L1, not actioned here): `priceDisplayScenarios.component/bundled` (fixtures/scenarios/matters.ts)
 *   resolve O-2026-001's MODE — deliberately, as the Storybook/test-only demo of the two PriceDisplay layouts.
 *   They are consumed only by stories/tests, never a product surface, and are intentionally excluded below.
 */
import { describe, it, expect } from 'vitest';
import {
  pricingScenarios,
  costPlannerScenarios,
  findYourPathScenarios,
  jurisdictionScenarios,
  agentProfileScenarios,
  authScenarios,
  trustScenarios,
} from '../fixtures/scenarios/public';
import {
  mattersScenarios,
  matterWorkspaceScenarios,
  costsScenarios,
  quoteScenarios,
  matchingScenarios,
} from '../fixtures/scenarios/matters';
import {
  practiceScenarios,
  reviewsQueueScenarios,
  reviewWorkspaceScenarios,
  agentSettingsScenarios,
} from '../fixtures/scenarios/agent';
import { settingsScenarios } from '../fixtures/scenarios/home';
import { applicationDetailScenarios } from '../fixtures/scenarios/portfolio';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

function ready<T = Any>(loaded: { state: string }): T {
  expect(loaded.state).toBe('ready');
  return (loaded as Any).data as T;
}

/** Every SlotValue nested anywhere under the given object must NOT be 'resolved' (no invented figure). */
function assertNoResolvedSlot(value: unknown, path = 'root'): void {
  if (Array.isArray(value)) {
    value.forEach((v, i) => assertNoResolvedSlot(v, `${path}[${i}]`));
  } else if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (obj.status === 'resolved' && 'value' in obj) {
      throw new Error(`open slot resolved to a concrete value at ${path}: ${JSON.stringify(obj)}`);
    }
    for (const [k, v] of Object.entries(obj)) assertNoResolvedSlot(v, `${path}.${k}`);
  }
}

/** A published agent-stat may carry n; a below-floor one must carry neither n nor confidence (a statistic). */
function assertBelowFloorHasNoStatistic(stats: Any, where: string): void {
  expect(stats.status, `${where}: below-floor status`).toBe('below-floor');
  expect('n' in stats, `${where}: below-floor must not carry a sample size`).toBe(false);
  expect('confidence' in stats, `${where}: below-floor must not carry a confidence`).toBe(false);
}

/* ─────────────────────────── Public surface (original coverage) ─────────────────────────── */
describe('open-slot preservation — Public', () => {
  it('O-2026-001: pricing rendering mode is a pending slot and no fee amount is resolved', () => {
    const pricing = ready(pricingScenarios.ready);
    for (const entry of pricing.catalogue) {
      expect(entry.price.renderingMode.status).toBe('pending-slot');
      for (const line of entry.price.lines) {
        expect(line.amount.status).toBe('pending-slot'); // never a fabricated number
        expect(line.disclosure.status).toBe('pending-legal'); // L1 / L1-04 legal container
      }
      expect(entry.price.bundledTotal.status).toBe('pending-slot');
    }
    assertNoResolvedSlot(pricing.catalogue, 'pricing.catalogue');
  });

  it('O-2026-001 / Rules-Engine: cost-planner and jurisdiction fee structures stay unresolved', () => {
    const costPlanner = ready(costPlannerScenarios.ready);
    const jurisdiction = ready(jurisdictionScenarios.india);
    expect(jurisdiction.feeStructure.renderingMode.status).toBe('pending-slot');
    assertNoResolvedSlot(costPlanner, 'costPlanner');
    assertNoResolvedSlot(jurisdiction.feeStructure, 'jurisdiction.feeStructure');
  });

  it('Rules-Engine: find-your-path cost range stays a pending slot', () => {
    const fyp = ready(findYourPathScenarios.ready);
    expect(fyp.costRange.status).toBe('pending-slot');
  });

  it('S-3: public agent-stat confidence stays a pending slot; below-floor shows no statistic', () => {
    const profile = ready(agentProfileScenarios.ready);
    expect(profile.stats.status).toBe('published');
    expect(profile.stats.confidence.status).toBe('pending-slot');
    expect(String(profile.stats.confidence.slotId)).toMatch(/S-3/);
    assertBelowFloorHasNoStatistic(ready(agentProfileScenarios['below-floor']).stats, 'public profile below-floor');
  });

  it('L1-04 / L3: profile professional-fee and publication gate stay pending-legal', () => {
    const profile = ready(agentProfileScenarios.ready);
    expect(profile.professionalFee.status).toBe('pending-legal'); // L1-04
    expect(profile.publicationGate.status).toBe('pending-legal'); // L3 go-live gate
  });

  it('L4: trust-page legal wording stays pending-legal', () => {
    for (const key of ['ai', 'limitations'] as const) {
      expect(ready(trustScenarios[key]).legalWording.status, `trust.${key}`).toBe('pending-legal');
    }
  });

  it('MFA (auth): client MFA policy stays a pending slot', () => {
    expect(ready(authScenarios['sign-up']).mfa.status).toBe('pending-slot');
  });
});

/* ─────────────────────────── Client surface ─────────────────────────── */
describe('open-slot preservation — Client', () => {
  it('O-2026-001: PRODUCT price displays keep the rendering mode pending (matters / workspace / costs / quote)', () => {
    // Matters index rows
    for (const row of ready(mattersScenarios.ready).rows) {
      if (row.cost?.kind === 'price') {
        expect(row.cost.price.renderingMode.status, `matter ${row.id}`).toBe('pending-slot');
      }
    }
    // Matter workspace header cost
    expect(ready(matterWorkspaceScenarios.ready).header.cost.price.renderingMode.status).toBe('pending-slot');
    // Costs (spend/committed/forecast)
    const costs = ready(costsScenarios.ready);
    for (const k of ['spendToDate', 'committed', 'forecast'] as const) {
      expect(costs[k].renderingMode.status, `costs.${k}`).toBe('pending-slot');
    }
    // Quote
    const quote = ready(quoteScenarios.ready);
    expect(quote.quote.renderingMode.status).toBe('pending-slot');
    expect(quote.contractingParties.status).toBe('pending-legal'); // L1-06 legal container
  });

  it('S-3: matching agent stats keep confidence pending / below-floor carries no statistic', () => {
    const matching = ready(matchingScenarios.ready);
    for (const m of matching.matches) {
      if (m.stats.status === 'published') expect(m.stats.confidence.status, `match ${m.id}`).toBe('pending-slot');
      else assertBelowFloorHasNoStatistic(m.stats, `match ${m.id}`);
    }
  });

  it('S-10 / L7: settings MFA policy and data residency stay pending; S-7 channel default pending', () => {
    const s = ready(settingsScenarios.owner);
    expect(s.security.mfaPolicy.status).toBe('pending-slot'); // S-10 (the second MFA slot the audit flagged)
    expect(s.data.residency.status).toBe('pending-slot'); // L7
  });

  it('S-5: expected-next-event range stays a pending slot', () => {
    expect(ready(applicationDetailScenarios['quiet-silence']).expectedNextEvent.status).toBe('pending-slot');
  });
});

/* ─────────────────────────── Agent surface ─────────────────────────── */
describe('open-slot preservation — Agent', () => {
  it('S-3 / L3 / L1: practice outcomes confidence, publication gate, settlement presentation stay containers', () => {
    const p = ready(practiceScenarios.ready);
    expect(p.outcomes.stats.status).toBe('published');
    expect(p.outcomes.stats.confidence.status).toBe('pending-slot'); // S-3
    expect(p.outcomes.publicationGate.status).toBe('pending-legal'); // L3
    expect(p.earnings.settlementPresentation.status).toBe('pending-legal'); // L1 settlement
    expect(p.earnings.settlement.renderingMode.status).toBe('pending-slot'); // O-2026-001 (agent earnings)
  });

  it('S-3: below-floor practice outcomes show a note and carry no statistic', () => {
    assertBelowFloorHasNoStatistic(ready(practiceScenarios['below-floor']).outcomes.stats, 'practice below-floor');
  });

  it('S-1 / S-2: review turnaround and reviewer-confidence representation stay pending', () => {
    for (const item of ready(reviewsQueueScenarios.ready).items) {
      expect(item.expectedTurnaround.status, `review ${item.id}`).toBe('pending-slot'); // S-1
    }
    expect(ready(reviewWorkspaceScenarios.ready).work.confidence.scale.status).toBe('pending-slot'); // S-2
  });

  it('S-7: agent per-class default channel stays a pending slot', () => {
    expect(ready(agentSettingsScenarios.ready).notifications.channelDefault.status).toBe('pending-slot');
  });
});
