/**
 * D-2026-023 §B.14 anti-leak regression test.
 *
 * The five-family component-token→foundation allowance (radius, elevation, sizing, motion, z-index) is a
 * TOKEN-DEFINITION rule (Gate B) ONLY. It must NEVER loosen the component-STYLE consumption rule (Gate A):
 * a component style directly consuming a permitted-family foundation token must STILL hard-fail.
 *
 * These tests import the checker's pure classifiers (the checker is main-guarded, so importing it does not
 * run the file scan or exit the runner).
 */
import {
  tierOf,
  classifyConsumptionRef,
  classifyDefinition,
  foundationFamilyOf,
  antiLeakSelfTest,
  PERMITTED_FOUNDATION_FAMILIES,
} from '../../scripts/check-token-hierarchy.mjs';
import { describe, it, expect } from 'vitest';

describe('D-2026-023 §B.14 — two independent gates', () => {
  it('the in-checker anti-leak self-test reports no failures', () => {
    expect(antiLeakSelfTest()).toEqual([]);
  });

  it('Gate A: a permitted-family FOUNDATION token in a component STYLE still HARD-FAILS', () => {
    // radius is a permitted family (Gate B), yet a component style using it must be a foundation consumption.
    expect(tierOf('--radius-pill')).toBe('foundation');
    expect(foundationFamilyOf('--radius-pill')).toBe('radius');
    expect(PERMITTED_FOUNDATION_FAMILIES.has('radius')).toBe(true);
    // THE INVARIANT — Gate A does not consult the five-family allowance:
    expect(classifyConsumptionRef('--radius-pill')).toBe('component→foundation');
  });

  it('Gate A: a component style consuming a semantic token HARD-FAILS', () => {
    expect(classifyConsumptionRef('--color-text-body')).toBe('component→semantic');
  });

  it('Gate A: a component style consuming a component token is allowed', () => {
    expect(classifyConsumptionRef('--statechip-radius')).toBe('ok');
  });

  it('Gate B: component token → foundation is ALLOWED for the permitted families that are materialized', () => {
    // radius/elevation/sizing/motion are materialized in the generator; z-index is permitted but not yet materialized.
    for (const target of ['--radius-pill', '--elevation-1', '--size-control-sm', '--motion-duration-fast']) {
      const r = classifyDefinition(target);
      expect(r.verdict, `${target} should be allowed`).toBe('allowed');
      expect(r.kind).toBe('foundation-sanctioned');
    }
  });

  it('Gate B: component token → foundation HARD-FAILS for non-permitted families', () => {
    // Real materialized foundation tokens in non-permitted families: palette (colour ramp), border-width, font.
    // border-width is the validation-critical exclusion (it has the semantic tier focus.ring.width).
    for (const target of ['--palette-neutral-0', '--border-width-focus', '--font-weight-regular']) {
      const r = classifyDefinition(target);
      expect(r.verdict, `${target} should hard-fail`).toBe('hardfail');
    }
    // border-width family is explicitly the excluded one:
    expect(foundationFamilyOf('--border-width-focus')).toBe('border');
    expect(PERMITTED_FOUNDATION_FAMILIES.has('border')).toBe(false);
  });

  it('Gate B: → literal and → component both hard-fail', () => {
    expect(classifyDefinition(null).verdict).toBe('hardfail'); // literal
    expect(classifyDefinition('--statechip-radius').verdict).toBe('hardfail'); // component → component
  });
});
