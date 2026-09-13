# Phase 8 — B1 Token-Hierarchy Traceability Analysis (v2.1 — audit-integrity corrections)

**Type:** Analysis for independent review. Not an implementation. **Original pre-D-2026-023 scope (now partly superseded — see the resolution update below and §9):** no Bucket-1 materialization, no Bucket-2 rerouting, no new token values, no semantic aliases, no frozen-document edits, no Phase 7 reconciliation, no commit. *(The "no frozen-document edits / no Phase 7 reconciliation" portion was superseded when D-2026-023 was owner-authorised and amended the frozen Phase 7 documents; the remaining scope items still hold.)*
**Date:** 3 September 2026
**Supersedes:** the v1 conclusion ("~53 missing Phase 7 tokens", withdrawn) and the v1.5 "no-semantic-tier exception" (withdrawn — conflicts are surfaced for owner review, not reconciled). **v2.1 adds two audit-integrity corrections:** (§1.1) the executable checker's conflict count is reconciled against the authoritative frozen Part-G inventory, and (§6.1) the checker's raw-value enforcement boundary is documented.
**Frozen sources re-opened (unmodified):** Phase 7 Design Tokens / Component Catalogue / Design System / Design Governance (D-2026-021).

> **RESOLUTION UPDATE — D-2026-023 (2026-09-13, Option B).** The §A.1 ↔ Part-G specification conflict analysed below is **RESOLVED**. Under D-2026-023 §B.14, a **component token** may resolve **directly to a foundation token** for the five families for which Phase 7 establishes no semantic tier — `radius`, `elevation`, `sizing`, `motion`, `z-index`. Consequently the four conflict tokens (`card.elevation`, `statechip.radius`, `table.compact.row.height`, `table.comfortable.row.height`) are **reclassified from Class B (review-required conflict) to Class A — sanctioned** (see §3.1 / §3.2), and a new terminal-chain category is recorded (§2). `border-width` (semantic tier `focus.ring.width` exists) and `breakpoint` remain **without** a component→foundation path. The pre-amendment analysis below is retained as history; the superseding notes are inline. *(Note: the Amendment-FINAL plan's prose referred to the pre-amendment class of these tokens as "Class D"; the actual label in this document is **Class B** — the reclassification target, Class A / sanctioned, is unchanged.)* The component-**style** consumption rule (Gate A) is unchanged — component styles still consume component tokens only.

---

## 1. The confirmed specification conflict (§A.1 vs Part G) — RESOLVED by D-2026-023

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

> **Resolved by D-2026-023.** For `radius`, `elevation`, `sizing`, `motion`, `z-index`, §B.14 now provides a compliant path: the component token resolves **directly to foundation** (sanctioned). `border-width` is **excluded** — it *does* have a semantic tier (`focus.ring.width → border.width.focus`), so its component tokens resolve through that semantic role, not to foundation. `breakpoint` has no semantic tier but is never a component-token target and is not on the permitted list. This sentence's premise ("no compliant resolution path") therefore no longer holds for the five permitted families.

### 1.1 Conflict-count reconciliation (audit correction)

The **authoritative frozen inventory** of Part-G component→foundation conflicts is **4** (the Part-G table above). The **executable checker detects only 3**, because `card.elevation` is defined in Part G but is **not materialized** in the generator, and the checker can only detect a conflict for a materialized token. The checker now reports both explicitly and **does not present the 3 detected as the complete inventory**:

| # | Part-G component token | Resolves to (foundation) | In frozen Part G? | Materialized in generator? | Executably detected? |
|---|---|---|---|---|---|
| 1 | `card.elevation` | `elevation.0/1` | **Yes** | No | **No** (not detectable — the limitation) |
| 2 | `statechip.radius` | `radius.pill` | Yes | Yes | Yes |
| 3 | `table.compact.row.height` | `size.control.sm` | Yes | Yes | Yes |
| 4 | `table.comfortable.row.height` | `size.control.md` | Yes | Yes | Yes |

**Stated limitation:** the executable checker's spec-conflict detection is bounded by what the generator materializes; the frozen Part-G table (4) is the authoritative count. The 3 detections are a *subset*. This is now printed by the checker (`spec-conflicts: 4 in frozen Part G / 3 executably detected`) with the full inventory and the `NOT materialized → NOT executable-detectable: --card-elevation` line. The generator is **not** treated as the complete specification inventory.

---

## 2. Classification scheme

- **A — Explicitly supported:** an authoritative Phase 7 source defines the component role and its resolution target is a **semantic** token (the `component → semantic → foundation` chain holds). Includes Part G semantic-resolving entries and Catalogue/DS-specified roles whose target is an existing semantic token (Part G delegates: "the catalogue defines the rest"). Component-token *names* follow the §A.2 naming convention; only tokens whose role **and** semantic target are specified qualify.
- **A-sanctioned (new terminal-chain category, D-2026-023 §B.14) — `component token → foundation`, permitted family:** the role is specified and its target is a **foundation** primitive in one of the five families for which Phase 7 establishes no semantic tier (`radius`, `elevation`, `sizing`, `motion`, `z-index`). Under D-2026-023 this is a **compliant, sanctioned** terminal chain — a valid Bucket-1 endpoint that needs **no** invented intermediate semantic token. (Previously such tokens were Class B.)
- **B — Catalogue/Part-G specified but resolution conflicting (now only non-permitted families):** the role is specified, but the only available target is a **foundation** primitive **outside** the five permitted families (e.g. `border-width`, colour, typography, spacing, layout, state, focus), which conflicts with §A.1 and is **not** sanctioned by §B.14. **Review-required / prohibited** (fail-closed). *(Post-D-2026-023, the four original Class-B tokens are no longer here — they are A-sanctioned.)*
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

### 3.2 Class B → reclassified under D-2026-023 §B.14

The four Part-G conflict tokens are **reclassified to A-sanctioned** per D-2026-023 (owner instruction, this execution). The remaining rows are annotated with their post-amendment status by family: `radius`/`elevation`/`sizing` rows are **A-sanctioned when materialized** (their materialization is deferred Bucket-1 work, not performed here); `tab.active.border-width` **remains Class B** because `border-width` is the validation-excluded family (it has the semantic tier `focus.ring.width`, which its component token must route through — not to foundation).

| Component token | Intended target | Authoritative source | Class (post-D-2026-023) |
|---|---|---|---|
| `statechip.radius` | `radius.pill` (foundation) | **Part G (explicit)** | **A-sanctioned** (radius) — was B; materialized & checker-confirmed |
| `card.elevation` | `elevation.0/1` (foundation) | **Part G (explicit)** | **A-sanctioned** (elevation) — was B; not yet materialized in generator |
| `table.compact.row.height` | `size.control.sm` (foundation) | **Part G (explicit)** | **A-sanctioned** (sizing) — was B; materialized & checker-confirmed |
| `table.comfortable.row.height` | `size.control.md` (foundation) | **Part G (explicit)** | **A-sanctioned** (sizing) — was B; materialized & checker-confirmed |
| `card.radius` | `radius.md` (foundation) | Catalogue 3.3; DS G.1 | A-sanctioned when materialized (radius) — Bucket-1 deferred |
| `modal.radius` | `radius.lg` (foundation) | Catalogue 8.1 | A-sanctioned when materialized (radius) — Bucket-1 deferred |
| `modal.elevation` | `elevation.3` (foundation) | Catalogue 8.1 | A-sanctioned when materialized (elevation) — Bucket-1 deferred |
| `input.radius` | `radius.sm` (foundation) | DS G.1 | A-sanctioned when materialized (radius) — Bucket-1 deferred |
| `button.min-target` | `size.touch.min` (foundation) | Catalogue 2.1/2.5; DS L | A-sanctioned when materialized (sizing) — Bucket-1 deferred |
| `tab.active.border-width` | `border.width.focus` (foundation) | Catalogue 1.5 ("2px") | **B — remains conflict** (border-width EXCLUDED; route via semantic `focus.ring.width`) |
| `header.scrolled.elevation` | `elevation.1` (foundation) | Catalogue 1.1 States | A-sanctioned when materialized (elevation) — Bucket-1 deferred |

**Post-D-2026-023 implication.** The four Part-G tokens are now compliant (A-sanctioned) and the checker confirms the three materialized ones (`statechip.radius`, `table.compact.row.height`, `table.comfortable.row.height`) as sanctioned; `card.elevation` remains unmaterialized (materialization is deferred Bucket-1 work). The radius/elevation/sizing Catalogue rows would resolve compliantly the same way once materialized. **`tab.active.border-width` is the one row that does NOT reclassify** — border-width has a semantic tier, so its component token must resolve to `focus.ring.width`, not to foundation. **No Bucket-1 materialization is performed in this execution.**

---

## 4. Class C — direct implementation violations (to remediate later, not this pass)

Product component styles currently consume semantic/foundation tokens directly — the corrected gate reports **211** such references:

- **component→foundation (142 refs, 24 tokens):** `--space-1..8`, `--radius-sm/md/lg`, `--border-width-*`, `--font-size-*`, `--font-weight-*`, `--line-height-relaxed`, `--elevation-3`, `--size-touch-min`.
- **component→semantic (69 refs, 28 tokens):** `--color-text-*`, `--color-bg-*`, `--color-border-*`, `--color-provenance-*`, the six `--color-attention-*`, `--color-status-*`, `--color-review-released-accent`, `--color-ai-marker`, `--color-unverified-fg`, `--color-action-primary`, `--state-*`, `--layout-container-*`.

Remediation (a later pass — the deferred Bucket-1/2 work, not performed here): materialize the Class-A and A-sanctioned component tokens and rebind these styles to them. The §A.1↔Part-G conflict decision is **no longer outstanding** — D-2026-023 resolved it, so the radius/elevation/sizing/motion/z-index component tokens now have a sanctioned direct-to-foundation path (Gate B). The one exception remains `border-width` (e.g. `tab.active.border-width`), which must resolve through the semantic `focus.ring.width`, not foundation.

---

## 5. Class D — genuine unspecified gaps

| Item | Why unspecified | Class |
|---|---|---|
| Scrim / modal backdrop token | No anatomy, no token, no value anywhere in Phase 7 | D (already flagged; backdrop left transparent) |
| Global-nav layout dimensions (header height, sidebar/rail widths) | Phase 7 defines no token for nav pixel dimensions (they are raw px, not token refs) | D (not token-governed) |

---

## 6. Checker semantics and trustworthiness

The `check-token-hierarchy.mjs` checker enforces **two independent gates** (updated for D-2026-023 §B.14):

- **Gate A — STYLE CONSUMPTION (unchanged, absolute):** HARD FAILS `component style → foundation` **and** `component style → semantic`; allows only `component style → component token`. **The five-family allowance does NOT apply to Gate A** — `classifyConsumptionRef()` never consults the permitted set, and an in-checker anti-leak self-test (plus `src/tokens/tokenHierarchy.antileak.test.ts`) asserts that a permitted-family foundation token used in a component style STILL hard-fails.
- **Gate B — TOKEN DEFINITION (amended):** `component → semantic` = OK; **`component → foundation` = ALLOWED (sanctioned) only when the target family ∈ {radius, elevation, sizing, motion, z-index}** per D-2026-023 §B.14, else HARD FAIL; `component → component` / literal = HARD FAIL. (This replaces the prior "SPECIFICATION CONFLICT / review-required" treatment — the conflict is now resolved, not merely surfaced.)
- **Semantic chain:** `semantic → foundation` (or an allowed literal) required.
- **Authoritative-source-driven:** tiers and the foundation *family* come from the `foundation`/`semantic`/`component` maps in `build-tokens.mjs`; the five-family allow-condition is a governed family test, not a hand-maintained token inventory. The prior hardcoded `PART_G_FOUNDATION_RESOLVING` 4-token inventory is removed.
- **Fail-closed:** any `component → foundation` binding to a family outside the five (colour, typography, spacing, layout, state, focus, **border-width**, **breakpoint**, …) is a HARD FAIL.
- **Harness containment (see §7).**

Current run (post-D-2026-023): `Gate A: 211 disallowed component-style ref(s); Gate B: 0 definition hard-fail(s); 0 anti-leak violation(s); 0 harness finding(s); sanctioned component→foundation defs: 3` → exit 1 (the exit-1 is entirely Gate A; Gate B is clean).

**Is the checker trustworthy now?** Yes, for what it claims to check — with two honest, documented limitations (§6.1, §6.2). It correctly (a) blocks all direct foundation/semantic consumption by components (Gate A), (b) validates the definition chain (Gate B), (c) treats the five-family direct component-token→foundation path as **sanctioned** per D-2026-023 §B.14 (the §A.1↔Part-G conflict is now resolved, not merely surfaced) and hard-fails any other family, (d) proves the anti-leak invariant that the five-family allowance never loosens Gate A, and (e) proves the harness is non-product.

### 6.1 Raw-value enforcement boundary (audit correction)

**Determination: raw literal design values are NOT enforced by this checker.** The consumption pass scans `var(--…)` references and classifies their *tier*; it performs **no** detection of raw literals such as `px` spacing, raw border widths, raw radii, raw typography values, raw shadows/elevation, or other primitives embedded directly in styles.

Phase 7 **does** state the principle that components must not bind to raw values — Tokens §A.1 ("components never bind to raw values"), STEP 8 ("forbids tying every component directly to raw values"), DS F.1 ("consumed only through named tokens"). So raw-value avoidance is a genuine Phase 7 requirement in principle. But enforcing it is **not implemented here and not implemented this pass** (audit-only). Classification: **an unresolved Phase-8 verification requirement** (not "enforced"; deliberately outside the current checker's stated scope, which is token-*reference* hierarchy).

**Current raw-value exposure (audit scan of product component styles):**
- Raw colour (`#hex` / `rgba()`): **0** — colours are fully tokenised.
- Raw `px` literals in `components.css`: ~8 (nav dimensions `56px` header height, `232px` sidebar, `240px` relationship rail; skeleton `14px`/`28px`; dialog `560px`; responsive `1023px` inside an `@media` query — CSS media queries cannot consume CSS custom properties, a known platform limitation).
- Raw relative units (`%`, `vh`, `em`): a handful — skeleton widths `40%`/`80%`, `100%`/`100vh`/`80vh` layout, letter-spacing `0.02em`/`0.04em`.
- Product `.tsx` inline styles: ~1 raw `px`.

These are **not** flagged by `check:tokens` today. Whether they should be tokenised/enforced is a Phase-8 verification decision for the owner; this pass only documents the gap.

### 6.2 What passing this gate would (and would not) prove

Passing `check:tokens` proves **token-reference hierarchy compliance** — that every `var(--…)` a component style uses is a component-tier token (Gate A), and the token definition chain is intact including the five-family sanctioned foundation path (Gate B). It does **not** prove **complete token/design-value compliance**: raw literal values (§6.1) remain out of scope and an unresolved Phase-8 verification requirement. The §A.1↔Part-G specification conflict (§1) is **resolved** by D-2026-023 (no longer an open decision); `check:tokens` nonetheless still exits 1 because of the deferred Gate-A component-style violations, not because of any unresolved conflict. The checker is therefore trustworthy *as a token-reference-hierarchy gate*, and is explicitly **not** represented as a complete design-system-compliance gate.

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
| `npm run check:tokens` | **FAIL by design (exit 1)** — 142 component→foundation + 69 component→semantic (Class C); **spec-conflicts: 4 in frozen Part G / 3 executably detected** (Class B, review-required); harness contained; raw-value boundary noted |

Remaining hard failures = the Class-C direct violations (deliberately un-remediated). Specification-conflict inventory = **4** (frozen Part G), of which **3** are executably detected (`card.elevation` is specified but unmaterialized, hence not detectable — §1.1). Raw literal values are out of scope (§6.1). No claim of "passed" is made for any check that did not execute successfully, and no claim of *complete* compliance is made for the reference-hierarchy gate (§6.2).

### 8.1 D-2026-023 execution verification (2026-09-13)

Re-run after the checker was updated to the two-gate model (§B.14). The table above is the pre-amendment record; this is the post-amendment result.

| Command | Result |
|---|---|
| `npm run build:tokens` | **pass** — 189 tokens |
| `npm run typecheck` (tsc --noEmit) | **pass** — exit 0 |
| `npm test` (vitest run) | **pass** — 20/20 (incl. 7 new anti-leak tests; CR-6 fail-closed unchanged) |
| `npm run build` (tsc + vite) | **pass** — exit 0 |
| `npm run check:tokens` | **FAIL by design (exit 1)** — **Gate B: 0 definition hard-fails; 3 sanctioned `component→foundation` defs** (`statechip.radius`, `table.compact.row.height`, `table.comfortable.row.height`); **anti-leak: 0 violations; harness: contained**. Remaining exit-1 is **Gate A**: 211 component-STYLE refs (142→foundation, 69→semantic) — the deferred Bucket-1/2 component-style remediation, **not** performed here. |

**Interpretation.** D-2026-023 resolved exactly what it was scoped to resolve: the Gate B `component-token→foundation` specification conflict is gone (0 hard-fails; the 3 materialized Part-G tokens are sanctioned; `card.elevation` remains unmaterialized). The checker still exits 1 solely because of Gate A — the component styles still consume foundation/semantic tokens directly, which is the Bucket-1/2 remediation the owner explicitly deferred. The anti-leak test proves the five-family allowance did not leak into Gate A.

---

## 9. Strict scope (this pass)

No Bucket-1 materialization · no Bucket-2 CSS rerouting · no new token values · no semantic aliases · no `git commit`. CR-6 fail-closed unchanged.

**D-2026-023 execution (2026-09-13):** the §A.1↔Part-G conflict is now **resolved by an owner-authorised architectural decision** (Option B), so the earlier "no frozen-document edits / no Phase 7 reconciliation" scope no longer applies — the three frozen Phase 7 amendments were applied per D-2026-023 (Design Tokens §A.1 + Part G intro; Design Governance B.1 + new §B.14), plus the Decision Log and Roadmap. Files changed in this execution: `03_DesignSystem/Phase-7-Design-Tokens-v0.1.md`, `03_DesignSystem/Phase-7-Design-Governance-v0.1.md`, `01_Strategy/Decision Log.md`, `01_Strategy/Roadmap.md`, `04_Development/ui/scripts/check-token-hierarchy.mjs`, `04_Development/ui/scripts/check-token-hierarchy.d.mts` (new), `04_Development/ui/src/tokens/tokenHierarchy.antileak.test.ts` (new), and this analysis document. **No `git commit`** — working-tree changes only, for independent review.

---

*Returned for independent review: the §A.1↔Part-G conflict is now **resolved** by D-2026-023 (Option B) — Gate B treats the five-family (`radius`, `elevation`, `sizing`, `motion`, `z-index`) direct component-token→foundation path as sanctioned (0 definition hard-fails; 3 materialized tokens confirmed sanctioned; `card.elevation` unmaterialized), while `border-width` and `breakpoint` stay excluded. Every candidate is classified with an authoritative source; the checker is authoritative-source-driven and trustworthy across its two independent gates; and the harness exclusion is demonstrated. Gate A remains independently failing on the 211 deferred component-style references (Bucket-1/2 remediation, not performed here), so `check:tokens` remains exit 1 by design; the raw-value boundary (§6.1) remains outside this checker.*
