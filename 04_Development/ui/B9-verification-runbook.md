# B9 — Cross-cutting Hardening & Verification: runbook

B9 is the final implementation batch before the independent Phase 8 audit. It adds no new product surface,
screen, route, or contract. It removes cross-surface divergence in trust-critical rendering and adds the
automated verification the audit inherits. This runbook is the single deterministic entry point and its
expected baseline signature.

## One command

```
npm run verify          # full: typecheck, tests, tokens, raw-values, vocabulary, open-slots, build, Storybook
npm run verify:fast     # same, minus the slow build + Storybook gates
```

`scripts/verify.mjs` prints one table and — critically — **distinguishes a passing gate from an intentional
inherited baseline**. It does **not** report the run clean merely because a sub-command exited. The token
checker exits `1` by design (Gate A carries inherited deferred debt); the orchestrator treats that as PASS
**only** while `Gate A == 209` and `Gate B == 0`, and FAILS the moment Gate A grows (new debt). *(Baseline
history: 211 pre-B9; −2 from the approved B9 AssessmentVerdict→ScreenState refactor removing two inline
`var(--color-text-muted)` refs; current floor 209 — audit L5.)*

## Individual gates

```
npm run typecheck        # tsc --noEmit
npm test                 # full Vitest suite (incl. the B9 cross-cutting specs)
npm run check:tokens     # token hierarchy (Gate A/B, anti-leak, harness) — exits 1 by design
npm run check:raw        # raw design-value scanner vs committed baseline — exits 0 when no NEW raw values
npm run check:vocab      # cross-surface banned-vocabulary corpus (CR-16)
npm run check:raw:update # regenerate the raw-value baseline (deliberate/Decision-Log only; never in verify)
```

## Expected baseline signature (a clean B9 run)

| Gate | Expected | Meaning |
|------|----------|---------|
| typecheck | exit 0 | no type errors |
| tests | all passing | full suite incl. B9 specs |
| token Gate A | **209 inherited / 0 new** | zero new component-style debt (floor 209; was 211 pre-B9, −2 from the B9 ScreenState refactor — audit L5) |
| token Gate B | 0 | definition chain intact |
| token anti-leak | 0 | five-family allowance never leaks into Gate A |
| token harness | 0 | demo harness stays contained |
| raw-value | inherited baseline / **0 new** | no new raw px/hex/rgba beyond `scripts/raw-value-baseline.json` |
| vocabulary (CR-16) | 0 violations | no banned marketing terms in any surface's fixture/label copy |
| open-slot preservation | all UNRESOLVED | O-2026-001, L1, L1-04, S-3, MFA, Rules-Engine remain slots |
| build (vite) | exit 0 | production build succeeds |
| Storybook build | exit 0 | Storybook static build succeeds |

## What B9 deliberately does NOT do

- It does **not** remediate the inherited Gate-A (209; 211 pre-B9) or raw-value baselines, and introduces
  **no new tokens** — whether those structural literals should become tokens is a design decision left to the audit.
- It does **not** resolve any open decision/slot (SSR/SSG, O-2026-001, L1/L3/L4, Rules-Engine values, S-3
  confidence representation, MFA, …). The open-slot preservation test guards this.

## Known verification limitation — vocabulary lexicon authority

The complete authoritative **CR-16 / P4:§10.3 banned/required lexicon is frozen governance that does not
live in this repository.** Per the B9 mandate this was **not invented or reconstructed**. The vocabulary
gate (`src/test/vocabulary.crosscutting.test.ts`) runs on a **provisional seed** grounded only in the banned
terms already asserted by pre-existing per-screen tests (`marketplace`, `affordable`, `cheap`,
`starting from`, `testimonial`). The lexicon now lives in its own module, **`src/test/vocabulary.lexicon.ts`
— the single swap-in point** (audit M2), which records this explicitly via `LEXICON_IS_AUTHORITATIVE = false`.
It is a regression guard over grounded terms, **not** a complete CR-16 check. When the frozen lexicon is
supplied, replace `BANNED_SEED` in that module with it and set the flag `true`.
