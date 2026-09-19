/**
 * B9 — raw-value scanner behaviour (scripts/check-raw-values.mjs). Proves the gate actually bites: a NEW
 * raw value beyond the inherited baseline is flagged, while equal-or-fewer occurrences pass. Imports the
 * pure `diff` helper (no filesystem side effects; the module's scan/exit is main-guarded).
 */
import { describe, it, expect } from 'vitest';
// @ts-expect-error — .mjs script module without types; only the pure helper is exercised.
import { diff } from '../../scripts/check-raw-values.mjs';

describe('raw-value scanner diff', () => {
  const baseline = { 'src/styles/components.css': { '56px': 2, '1px': 3 } };

  it('passes when current ⊆ baseline (no new raw values; reductions allowed)', () => {
    expect(diff({ 'src/styles/components.css': { '56px': 2, '1px': 1 } }, baseline)).toEqual([]);
  });

  it('flags MORE occurrences of an existing raw value', () => {
    const v = diff({ 'src/styles/components.css': { '56px': 3 } }, baseline);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ value: '56px', baseline: 2, current: 3, new: 1 });
  });

  it('flags a brand-new raw value not in the baseline', () => {
    const v = diff({ 'src/screens/Foo/FooScreen.tsx': { '13px': 1 } }, baseline);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ file: 'src/screens/Foo/FooScreen.tsx', value: '13px', baseline: 0, new: 1 });
  });
});
