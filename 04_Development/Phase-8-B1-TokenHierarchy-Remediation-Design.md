# Phase 8 — B1 Token-Hierarchy: Corrected Checker Design + Bucket-1 Traceability

**Type:** Design + traceability for independent review. **Not** the Bucket-1/Bucket-2 remediation (not implemented this turn). No frozen document modified. No token materialized. No commit.
**Date:** 3 September 2026
**Implemented this turn:** the corrected `check-token-hierarchy.mjs` gate and the demo-harness scope separation only.
**Frozen sources (unmodified):** Phase 7 Design System / Design Tokens / Component Catalogue / Design Governance (D-2026-021).

---

## 1. Corrected checker design (implemented and run)

The gate now enforces the **full three-tier rule** — `component styles → component tokens → semantic tokens → foundation tokens`:

| Relationship | Verdict |
|---|---|
| component style → **foundation** | **HARD FAIL** (Phase 7 Tokens A.1: "Components never reference a foundation token directly") |
| component style → **semantic** | **HARD FAIL** (a component reads component tokens, not the semantic tier) |
| component style → **component token** | allowed |
| component token → **semantic** | required¹ |
| semantic → **foundation** | required (or a literal: layout maxes, focus offset, grid columns) |

**How tiers are determined.** The checker imports the authoritative `foundation` / `semantic` / `component` maps from `build-tokens.mjs` and classifies each referenced `var(--x)` by which tier it belongs to. It does **not** use the representative Part G object as a complete allow-list; the component tier is simply "whatever is defined at component level," and it **grows automatically** as Catalogue-specified component tokens are materialized (§2) — the gate will then pass for those with no further checker edits.

**Two enforcement passes:**
1. **Consumption** — scans product component styles and flags every reference that is not component-tier, categorised as `component→foundation`, `component→semantic`, or `component→unknown` (all HARD FAIL).
2. **Definition chain** — validates that each component token resolves to a semantic token (¹with the Phase-7 exception below), and each semantic token resolves to a foundation token or an allowed literal. No upward or lateral references; no component→component.

**Scope.** Product component styles only: `src/styles/components.css` + inline styles in shipped `component/shell/screen` `.tsx` (excluding `*.stories.tsx` / `*.test.tsx`). The base/theming layer `global.css` and the demo harness are out of scope. The **scenario-switcher** was moved from `components.css` into a new `src/styles/harness.css` (imported only by the demo `App`), so it is demonstrably a review harness and not a product component.

**¹ Important Phase-7 nuance (a refinement to the stated rule).** Phase 7 Tokens **Part G itself** defines component tokens that resolve **directly to foundation**, because those token families have **no semantic tier**: `statechip.radius → radius.pill`, `table.compact.row.height → size.control.sm`, `table.comfortable.row.height → size.control.md`. There is no semantic radius, border-width, elevation, sizing, motion, breakpoint, or z-index layer in Phase 7. So "component token → semantic = required" cannot hold universally without contradicting the frozen Part G. The checker therefore permits `component token → foundation` **only** for those no-semantic-tier families (`radius`, `border`, `elevation`, `size`, `motion`, `breakpoint`, `z`) and requires `component token → semantic` for every family that has a semantic tier (colour, spacing, typography, state, layout). **This is flagged for your ruling**; it does not weaken the consumption rule (component styles still may never touch foundation or semantic directly).

**Result of the corrected gate (run this turn):**

```
token-hierarchy: FAIL — 211 disallowed component-style reference(s); 0 definition-chain issue(s).
  component→foundation (HARD FAIL) — 142 references, 24 distinct tokens
  component→semantic   (HARD FAIL) —  69 references, 28 distinct tokens
```

**0 definition-chain issues** confirms the existing token definitions (including Phase 7's own Part-G tokens) are structurally sound; the failures are entirely the un-remediated component **styles**, which is exactly the surface the next pass will fix.

---

## 2. Complete Bucket-1 traceability table

These are the component tokens whose **role/anatomy is actually specified by Phase 7**. Format: `component token → specified semantic/foundation target → authoritative Phase 7 section`. Rows marked *(Part G)* already exist in the generator; the rest are to be **materialized** next pass (values transcribed from the cited section — not inferred or invented). Nothing here is materialized this turn.

### Surfaces / containers
| Component token | Target | Tier | Phase 7 source |
|---|---|---|---|
| `card.bg` | `color.bg.raised` | semantic | Catalogue 3.3 "Surface (`bg.raised`…)" *(Part G)* |
| `card.border` | `color.border.subtle` | semantic | Catalogue 3.3 "…`border.subtle`…" *(Part G)* |
| `card.radius` | `radius.md` | foundation¹ | Catalogue 3.3 "…`radius.md`…"; DS G.1 |
| `card.elevation` | `elevation.0/1` | foundation¹ | Catalogue 3.3 "…`elevation.0/1`" *(Part G)* |
| `card.padding` | `space.inset.card` | semantic | Tokens Part E ("`space.inset.card` … card padding") |
| `modal.radius` | `radius.lg` | foundation¹ | Catalogue 8.1 "Surface (`elevation.3, radius.lg`)" |
| `modal.elevation` | `elevation.3` | foundation¹ | Catalogue 8.1 |

### Navigation
| Component token | Target | Tier | Phase 7 source |
|---|---|---|---|
| `tab.active.indicator` | `color.action.primary` | semantic | Catalogue 1.5 "active indicator (2px primary underline)" |
| `tab.active.border-width` | `border.width.focus` (2px) | foundation¹ | Catalogue 1.5 "2px … underline"; Tokens B.5 |
| `header.scrolled.elevation` | `elevation.1` | foundation¹ | Catalogue 1.1 States "scrolled (elevation.1)" |

### Actions
| Component token | Target | Tier | Phase 7 source |
|---|---|---|---|
| `button.primary.bg` / `.bg.hover` / `.fg` | `color.action.primary` / `.hover` / `color.text.on-primary` | semantic | Catalogue 2.1; *(Part G)* |
| `button.secondary.border` / `.fg` | `color.border.default` / `color.text.link` | semantic | Catalogue 2.2; *(Part G)* |
| `button.destructive.fg` | `color.status.danger.fg` | semantic | Catalogue 2.4; *(Part G)* |
| `button.min-target` | `size.touch.min` (≥44px) | foundation¹ | Catalogue 2.1/2.5; DS Part L |
| `button.disabled.surface` | `state.disabled.surface` | semantic | Catalogue 2.1 States; DS I.3 |
| `button.disabled.fg` | `state.disabled.fg` | semantic | DS I.3; Tokens Part F |

### Forms
| Component token | Target | Tier | Phase 7 source |
|---|---|---|---|
| `input.border` / `input.focus.ring` / `input.label.color` | `color.border.default` / `focus.ring.color` / `color.text.body` | semantic | Catalogue 6.1; *(Part G)* |
| `input.radius` | `radius.sm` | foundation¹ | DS G.1 "small (4px) for inputs/chips" |

### Trust (provenance / review / status)
| Component token | Target | Tier | Phase 7 source |
|---|---|---|---|
| `citation.fg` | `color.provenance.fg` | semantic | Catalogue 4.1; *(Part G)* |
| `citation.icon` | `color.provenance.accent` | semantic | Catalogue 4.1; *(Part G)* |
| `citation.bg` | `color.provenance.bg` | semantic | Catalogue 4.1/4.2; DS B.4 (citation "own token identity") |
| `evidence.bg` | `color.provenance.bg` | semantic | Catalogue 4.2 "`provenance.bg` surface", 8.4 "`provenance.bg` panel" |
| `reviewseal.fg` | `color.review.released.fg` | semantic | Catalogue 4.3; *(Part G)* |
| `reviewseal.accent` | `color.review.released.accent` | semantic | Catalogue 4.3 "Review seal/mark (`review.released`)"; DS B.6 |
| `reviewseal.bg` | `color.status.success.bg` | semantic | DS B.6 "calm 'verified' treatment (reviewed/success-quiet role)" |
| `ai-marker.rule` | `color.ai.marker` | semantic | DS B.5; Tokens C.8 |
| `unverified.fg` | `color.unverified.fg` | semantic | DS B.4; Tokens C.8 |
| `statechip.radius` | `radius.pill` | foundation¹ | Catalogue 5.1 "Pill (`radius.pill`)"; *(Part G)* |
| `statechip.{success\|warning\|danger\|info}.icon` | `color.status.<s>.icon` | semantic | Catalogue 5.1; *(Part G)* |
| `attention.{on-track\|action-needed\|at-risk}.fg` | `color.attention.<a>.fg` | semantic | Catalogue 5.2; Tokens C.6 |
| `attention.{on-track\|action-needed\|at-risk}.icon` | `color.attention.<a>.icon` | semantic | Catalogue 5.2; Tokens C.6 |

### Data / typography roles named by component anatomy
| Component token | Target | Tier | Phase 7 source |
|---|---|---|---|
| `stat.value` / `metadata.value` / `deadline.date` | `type.data` | semantic | Catalogue 3.4, 3.5, 5.4 ("`type.data`") |
| `metadata.label` | `type.caption` | semantic | Catalogue 3.5 ("`type.caption`/`type.data`") |
| `whose-turn.estimate` | `type.secondary` | semantic | Catalogue 5.3 ("secondary text") |
| `verdict.reading` | `type.reading` | semantic | Catalogue 9.1; DS D.3 (`type.reading` = depth-1 verdict) |
| `table.compact.row.height` / `table.comfortable.row.height` | `size.control.sm` / `size.control.md` | foundation¹ | Tokens Part G *(Part G)* |

¹ resolves to foundation because Phase 7 defines no semantic tier for that family (see §1 note).

**Not Bucket-1 (Bucket-2):** generic internal properties for which Phase 7 specifies only a *semantic* token, not a per-component role — e.g. generic section gaps (`space.section-gap`), generic body/secondary/muted text (`color.text.*`), generic subtle surfaces/borders, `layout.container.*`, `state.selected.surface`. Next pass routes these through the appropriate layer by giving each consuming component a component token that resolves to the semantic token (component→semantic), so component styles consume component tokens only — **not** by declaring direct semantic usage compliant.

---

## 3. Confirmation: semantic-direct consumption will fail the gate

Yes. Under the corrected gate, **`component style → semantic` is a HARD FAIL**, shown explicitly in this turn's run: **69 references across 28 distinct semantic tokens** (e.g. `--color-text-muted ×12`, `--color-border-subtle ×8`, `--color-text-title ×5`, the six `--color-attention-*`, `--layout-container-*`, `--state-*`) are all reported under `component→semantic (HARD FAIL)`. The existence of a semantic token does **not** make direct semantic consumption compliant — it only means no new *value* is required; the component must still consume a **component token** that resolves to that semantic token. The gate will pass only once every product component style references component-tier tokens exclusively.

---

## 4. Verification results (clean install, this turn)

| Command | Result |
|---|---|
| `npm ci --prefer-offline` | **pass** — 269 packages (~5s); lock ↔ manifest consistent |
| `npm run build:tokens` | **pass** — 189 tokens |
| `npx tsc --noEmit` | **pass** — exit 0 |
| `npx vitest run` | **pass** — 13/13 (CR-6 fail-closed unchanged: verified+resolved→verified; verified+unresolved→unverified; depth-2 unresolved→not established) |
| `npx vite build` | **pass** — exit 0 |
| `npm run build-storybook` | **pass** — exit 0 |
| `npm run check:tokens` (corrected gate) | **FAIL by design (exit 1)** — 142 `component→foundation` + 69 `component→semantic`; 0 definition-chain issues. Acceptable while Bucket-1/2 remediation is pending your review. |

---

## 5. What changed this turn (no remediation, no frozen edits, no commit)

- `scripts/check-token-hierarchy.mjs` — rewritten to enforce the full three-tier rule (§1).
- `src/styles/harness.css` — **new**; the demo scenario-switcher moved out of `components.css`.
- `src/styles/components.css` — scenario-switcher rules removed (now in harness).
- `src/App.tsx` — imports `harness.css` (demo only).

No component token materialized, no component CSS rerouted, no frozen Phase 7 document touched, CR-6 unchanged, no `git commit`.

---

*Returned for independent review: (1) corrected checker design, (2) complete Bucket-1 traceability table, (3) confirmation that semantic-direct consumption fails the gate, (4) verification results — plus one flagged refinement to rule 4 (the Part-G no-semantic-tier exception). Awaiting your decision before implementing the Bucket-1/Bucket-2 remediation.*
