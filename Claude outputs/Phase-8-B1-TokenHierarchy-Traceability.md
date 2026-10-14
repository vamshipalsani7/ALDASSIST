# Phase 8 — B1 Token-Hierarchy Traceability Analysis (v2 — specification-conflict classification)

**Type:** Analysis for independent review. Not an implementation. No Bucket-1 materialization, no Bucket-2 rerouting, no new token values, no semantic aliases, no frozen-document edits, no Phase 7 reconciliation, no commit.
**Date:** 3 September 2026
**Supersedes:** the v1 conclusion ("~53 missing Phase 7 tokens", already withdrawn) and refines the v1.5 "no-semantic-tier exception" — which is **withdrawn**: the component-token→foundation cases are surfaced as a **specification conflict for owner review**, not reconciled.
**Frozen sources re-opened (unmodified):** Phase 7 Design Tokens / Component Catalogue / Design System / Design Governance (D-2026-021).

---

## 1. The confirmed specification conflict (§A.1 vs Part G)

Phase 7 Tokens **§A.1** states the binding rule three times, unambiguously:

- diagram: *"SEMANTIC tokens … referenced only by ↓ COMPONENT tokens … per-component values **bound to semantic tokens**."*
- binding rule: *"a component reads component tokens; **component tokens resolve to semantic tokens**; semantic tokens resolve to foundation tokens. **Components never reference a foundation token directly.**"*
- Part G intro: *"**Component tokens resolve to semantic tokens only.**"*

Yet **Part G's own table** defines component tokens that resolve **directly to foundation** primitives:

| Part G component token | Resolves to | Tier of target |
|---|---|---|
| `card.elevation` | `elevation.0/1` | **foundation** (Tokens B.6) |
| `statechip.radius` | `radius.pill` | **foundation** (Tokens B.4) |
| `table.compact.row.height` | `size.control.sm` | **foundation** (Tokens B.10) |
| `table.comfortable.row.height` | `size.control.md` | **foundation** (Tokens B.10) |

This is a genuine **internal contradiction in the frozen Phase 7 specification**: the binding rule forbids what Part G's examples do. It is **not** something this pass may reconcile (Phase 7 is frozen; reconciliation is an owner decision). The corrected checker therefore **reports** these as review-required specification conflicts and does **not** silently pass them (my earlier "no-semantic-tier exception" did, and is withdrawn).

There is no semantic tier in Phase 7 for radius, border-width, elevation, sizing, motion, breakpoint, or z-index — so any component token for those roles has **no compliant §A.1 resolution path**. That is the crux of the conflict, and it must be resolved by the owner before those component tokens can be materialized §A.1-compliantly.

---

## 2. Classification scheme

- **A — Explicitly supported:** an authoritative Phase 7 source defines the component role and its resolution target is a **semantic** token (the `component → semantic → foundation` chain holds). Includes Part G semantic-resolving entries and Catalogue/DS-specified roles whose target is an existing semantic token (Part G delegates: "the catalogue defines the rest"). Component-token *names* follow the §A.2 naming convention; only tokens whose role **and** semantic target are specified qualify.
- **B — Catalogue/Part-G specified but resolution conflicting:** the role is specified, but the only available target is a **foundation** primitive, conflicting with §A.1. **Review-required.**
- **C — Direct implementation violation:** product CSS/TSX directly consumes semantic/foundation tokens; must be remediated later by consuming component tokens.
- **D — Genuine unspecified gap:** neither the token spec nor the Catalogue provides sufficient authority.

Authority is taken from Phase 7 sources only — **not** inferred because a token name appears in implementation code.

---

## 3. Bucket-1 candidates — `component token → intended target → authoritative source → class`

### 3.1 Class A (resolution to a semantic token; chain holds)
| Component token | Intended target | Authoritative source | Class |
|---|---|---|---|
| `button.primary.bg` / `.bg.hover` / `.fg` | `color.action.primary` / `.hover` / `color.text.on-primary` | Tokens Part G | A |
| `button.secondary.border` / `.fg` | `color.border.default` / `color.text.link` | Tokens Part G | A |
| `button.destructive.fg` | `color.status.danger.fg` | Tokens Part G; Catalogue 2.4 | A |
| `input.border` / `input.focus.ring` / `input.label.color` | `color.border.default` / `focus.ring.color` / `color.text.body` | Tokens Part G; Catalogue 6.1 | A |
| `card.bg` / `card.border` | `color.bg.raised` / `color.border.subtle` | Part G; Catalogue 3.3 | A |
| `statechip.{success\|warning\|danger\|info}.icon` | `color.status.<s>.icon` | Part G + variant convention; Catalogue 5.1 | A |
| `citation.fg` / `citation.icon` | `color.provenance.fg` / `color.provenance.accent` | Part G; Catalogue 4.1 | A |
| `citation.bg` / `evidence.bg` | `color.provenance.bg` | Catalogue 4.1/4.2/8.4; DS B.4 | A |
| `reviewseal.fg` | `color.review.released.fg` | Part G; Catalogue 4.3 | A |
| `reviewseal.accent` | `color.review.released.accent` | Catalogue 4.3; DS B.6; Tokens C.8 | A |
| `reviewseal.bg` | `color.status.success.bg` | DS B.6 | A |
| `attention.{on-track\|action-needed\|at-risk}.fg` | `color.attention.<a>.fg` | Tokens C.6; Catalogue 5.2 | A |
| `attention.{on-track\|action-needed\|at-risk}.icon` | `color.attention.<a>.icon` | Tokens C.6; Catalogue 5.2 | A |
| `ai-marker.rule` | `color.ai.marker` | DS B.5; Tokens C.8 | A |
| `unverified.fg` | `color.unverified.fg` | DS B.4; Tokens C.8 | A |
| `tab.active.indicator` | `color.action.primary` | Catalogue 1.5 | A |
| `button.disabled.surface` / `.fg` | `state.disabled.surface` / `state.disabled.fg` | DS I.3; Tokens Part F | A |
| `card.padding` | `space.inset.card` | Tokens Part E ("card padding"); Catalogue 3.3 | A |
| `stat.value` / `metadata.value` / `deadline.date` | `type.data` | Catalogue 3.4 / 3.5 / 5.4 | A |
| `metadata.label` | `type.caption` | Catalogue 3.5 | A |
| `whose-turn.estimate` | `type.secondary` | Catalogue 5.3 | A |
| `verdict.reading` | `type.reading` | Catalogue 9.1; DS D.3 | A |

### 3.2 Class B (resolution to a foundation primitive → §A.1 conflict; REVIEW REQUIRED)
| Component token | Intended target | Authoritative source | Class |
|---|---|---|---|
| `statechip.radius` | `radius.pill` (foundation) | **Part G (explicit)** vs §A.1 | B — checker-flagged conflict |
| `card.elevation` | `elevation.0/1` (foundation) | **Part G (explicit)** vs §A.1 | B — conflict (not yet in generator) |
| `table.compact.row.height` | `size.control.sm` (foundation) | **Part G (explicit)** vs §A.1 | B — checker-flagged conflict |
| `table.comfortable.row.height` | `size.control.md` (foundation) | **Part G (explicit)** vs §A.1 | B — checker-flagged conflict |
| `card.radius` | `radius.md` (foundation) | Catalogue 3.3; DS G.1 | B — no semantic tier |
| `modal.radius` | `radius.lg` (foundation) | Catalogue 8.1 | B — no semantic tier |
| `modal.elevation` | `elevation.3` (foundation) | Catalogue 8.1 | B — no semantic tier |
| `input.radius` | `radius.sm` (foundation) | DS G.1 | B — no semantic tier |
| `button.min-target` | `size.touch.min` (foundation) | Catalogue 2.1/2.5; DS L | B — no semantic tier |
| `tab.active.border-width` | `border.width.focus` (foundation) | Catalogue 1.5 ("2px") | B — no semantic tier |
| `header.scrolled.elevation` | `elevation.1` (foundation) | Catalogue 1.1 States | B — no semantic tier |

**Class-B implication:** none of these can be materialized §A.1-compliantly, because Phase 7 provides no semantic tier for their families. The owner must resolve the §A.1↔Part-G conflict first (e.g. amend §A.1 to permit component→foundation where no semantic tier exists, or add semantic radius/size/elevation tiers). **This pass does not choose.**

---

## 4. Class C — direct implementation violations (to remediate later, not this pass)

Product component styles currently consume semantic/foundation tokens directly — the corrected gate reports **211** such references:

- **component→foundation (142 refs, 24 tokens):** `--space-1..8`, `--radius-sm/md/lg`, `--border-width-*`, `--font-size-*`, `--font-weight-*`, `--line-height-relaxed`, `--elevation-3`, `--size-touch-min`.
- **component→semantic (69 refs, 28 tokens):** `--color-text-*`, `--color-bg-*`, `--color-border-*`, `--color-provenance-*`, the six `--color-attention-*`, `--color-status-*`, `--color-review-released-accent`, `--color-ai-marker`, `--color-unverified-fg`, `--color-action-primary`, `--state-*`, `--layout-container-*`.

Remediation (a later pass, pending your rulings): materialize the Class-A component tokens and rebind these styles to them; Class-B awaits the §A.1 conflict decision.

---

## 5. Class D — genuine unspecified gaps

| Item | Why unspecified | Class |
|---|---|---|
| Scrim / modal backdrop token | No anatomy, no token, no value anywhere in Phase 7 | D (already flagged; backdrop left transparent) |
| Global-nav layout dimensions (header height, sidebar/rail widths) | Phase 7 defines no token for nav pixel dimensions (they are raw px, not token refs) | D (not token-governed) |

---

## 6. Checker semantics and trustworthiness

The corrected `check-token-hierarchy.mjs`:

- **Consumption:** HARD FAILS `component style → foundation` **and** `component style → semantic`; allows only `component style → component token`. (Semantic-direct consumption is *not* treated as compliant.)
- **Definition chain:** `component → semantic` = OK; `component → component` / literal = HARD FAIL; **`component → foundation` = SPECIFICATION CONFLICT (review-required)** — surfaced, never silently passed and never hard-failed as if it were an implementation bug (it matches Part G).
- **Semantic chain:** `semantic → foundation` (or an allowed literal) required.
- **Authoritative-source-driven:** tiers come from the `foundation`/`semantic`/`component` maps in `build-tokens.mjs`; the component tier grows as tokens are materialized. It **no longer** uses the representative Part-G object as an allow-list to reject legitimate component tokens.
- **Harness containment (see §7).**

Current run: `211 disallowed component-style ref(s); 0 chain hard-fail(s); 3 spec-conflict(s); 0 harness finding(s)` → exit 1.

**Is the checker trustworthy now?** Yes, with one honest caveat: it correctly (a) blocks all direct foundation/semantic consumption by components, (b) validates the definition chain, (c) surfaces the §A.1↔Part-G conflict for review instead of hiding it, and (d) proves the harness is non-product. Caveat: it can only recognise component tokens that exist in the authoritative maps; that is by design (the tier grows with materialization) and does not cause false "not-approved" rejections, because the consumption rule keys on *tier*, not on a fixed name list.

---

## 7. Harness separation — demonstrated, not assumed

The scenario-switcher demo styles were moved to `src/styles/harness.css`. The checker now *proves* the exclusion is honest and fails if it is abused:

- `harness.css` may contain **only** `.scenario-bar`-namespaced selectors (checker asserts this; any other selector = FAIL).
- **No** product file (`components.css`, or any `component/shell/screen` `.tsx`) may `@import`/`import` `harness.css` (checker asserts; it is imported only by the demo `App.tsx`).
- **No** product file may reference the `.scenario-bar` namespace (checker asserts).

Current result: **Harness containment OK.** So the harness is genuinely non-product and cannot smuggle product styles past enforcement.

---

## 8. Verification results (clean install, this turn)

| Command | Result |
|---|---|
| `npm ci --prefer-offline` | **pass** — 269 packages (~10s) |
| `npm run build:tokens` | **pass** — 189 tokens |
| `npx tsc --noEmit` | **pass** — exit 0 |
| `npx vitest run` | **pass** — 13/13 (CR-6 fail-closed unchanged) |
| `npm run build` (tsc + vite) | **pass** — exit 0 |
| `npm run build-storybook` | **pass** — exit 0 |
| `npm run check:tokens` | **FAIL by design (exit 1)** — 142 component→foundation + 69 component→semantic (Class C); 3 spec-conflicts (Class B, review-required); harness contained |

Remaining hard failures = the Class-C direct violations (deliberately un-remediated). Specification-conflict cases = the 3 Part-G foundation-resolving component tokens (Class B). No claim of "passed" is made for any check that did not execute successfully.

---

## 9. Strict scope (this pass)

No Bucket-1 materialization · no Bucket-2 CSS rerouting · no new token values · no semantic aliases · no frozen-document edits · no Phase 7 reconciliation · no `git commit`. CR-6 fail-closed unchanged. Files changed this turn: `scripts/check-token-hierarchy.mjs` (checker) and this analysis document.

---

*Returned for independent review: the §A.1↔Part-G conflict is now surfaced (not reconciled), every candidate is classified A/B/C/D with an authoritative source, the checker is authoritative-source-driven and trustworthy, and the harness exclusion is demonstrated. The Class-B specification conflict needs an owner decision before those component tokens can be materialized.*
