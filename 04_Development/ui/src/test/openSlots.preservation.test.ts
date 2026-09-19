/**
 * B9 cross-cutting verification — open-slot preservation.
 *
 * Guards the frozen OPEN decisions/slots against accidental resolution. B9 (and every batch before the
 * Phase 8 audit) must leave these UNRESOLVED — no invented value may stand in for them. This test asserts
 * the fixtures still model each as a container (`pending-slot` / `pending-legal`), never a fabricated value:
 *   • O-2026-001  — pricing RENDERING MODE stays a pending slot; fee amounts are never resolved to a number.
 *   • L1 / L1-04  — platform/professional fee LEGAL wording stays a pending-legal container.
 *   • S-3         — agent-stat CONFIDENCE representation stays a pending slot (stats may publish n, not confidence).
 *   • MFA         — client MFA policy stays a pending slot.
 *   • Rules-Engine — find-your-path cost range / official fee stay pending slots (no computed figure).
 *
 * If any of these ever reads `status: 'resolved'` with a concrete value, THIS test must fail — that is the
 * signal that an open decision was silently closed.
 */
import { describe, it, expect } from 'vitest';
import {
  pricingScenarios,
  costPlannerScenarios,
  findYourPathScenarios,
  jurisdictionScenarios,
  agentProfileScenarios,
  authScenarios,
} from '../fixtures/scenarios/public';

function ready<T>(loaded: { state: string }): T {
  expect(loaded.state).toBe('ready');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (loaded as any).data as T;
}

/** Every SlotValue nested anywhere under a price/fee/slot object must NOT be 'resolved' (no invented figure). */
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

describe('B9 open-slot preservation', () => {
  it('O-2026-001: pricing rendering mode is a pending slot and no fee amount is resolved', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pricing = ready<any>(pricingScenarios.ready);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const costPlanner = ready<any>(costPlannerScenarios.ready);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jurisdiction = ready<any>(jurisdictionScenarios.india);
    expect(jurisdiction.feeStructure.renderingMode.status).toBe('pending-slot');
    assertNoResolvedSlot(costPlanner, 'costPlanner');
    assertNoResolvedSlot(jurisdiction.feeStructure, 'jurisdiction.feeStructure');
  });

  it('Rules-Engine: find-your-path cost range stays a pending slot', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fyp = ready<any>(findYourPathScenarios.ready);
    expect(fyp.costRange.status).toBe('pending-slot');
  });

  it('S-3: agent-stat confidence representation stays a pending slot (n may publish, confidence may not)', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profile = ready<any>(agentProfileScenarios.ready);
    expect(profile.stats.status).toBe('published');
    expect(profile.stats.confidence.status).toBe('pending-slot');
    expect(String(profile.stats.confidence.slotId)).toMatch(/S-3/);
  });

  it('MFA: client MFA policy stays a pending slot', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const auth = ready<any>(authScenarios['sign-up']);
    expect(auth.mfa.status).toBe('pending-slot');
  });
});
