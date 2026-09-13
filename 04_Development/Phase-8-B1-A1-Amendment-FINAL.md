# Phase 8 — B1 · FINAL Amendment Text / Patch Plan (Option B, owner-approved)

**Amend Phase 7 §A.1 and Design Governance to permit `component-token → foundation` resolution for a closed list of five families for which Phase 7 establishes no semantic tier**

| | |
|---|---|
| **Document type** | Final amendment text / patch plan — **for independent review before application** |
| **Status** | **ACCEPTED DECISION — EXECUTION NOT YET APPLIED.** The architectural decision (D-2026-023, Option B, five-family scope) is **owner-approved and Accepted**; this document is the execution-ready amendment text awaiting the owner's authorisation **to apply** the edits. Nothing has been applied: no frozen Phase 7 document, token, generator, or component CSS has been edited. No Bucket-1/2 remediation. No git commit. |
| **Date** | 2026-09-13 |
| **Supersedes** | `Phase-8-B1-A1-Amendment-Plan.md` (DRAFT, 2026-09-08). This FINAL version applies the owner's decisions below **and** the four independent-review corrections (terminology → "families for which Phase 7 establishes no semantic tier"; decision-status/execution-authorisation consistency; no invented version number; explicit two-gate checker acceptance criteria) plus the §B.12 eligibility-criterion tightening. |
| **Owner decisions applied** | (1) Option B approved. (2) Permitted list = **exactly** `radius`, `elevation`, `sizing`, `motion`, `z-index`. (3) `breakpoint` **removed** from the list. (4) `border-width` **remains excluded** (semantic tier `focus.ring.width` exists). (5) STYLE-vs-TOKEN distinction made **completely unambiguous** in §A.1 and Design Governance. (6) Closed-list / fail-closed model kept. (7) No tokens added, no CSS modified. (8) No Bucket-1/2 remediation. |
| **Decision Log entry** | **D-2026-023 — Accepted** (owner-approved architectural decision). Exact text provided in §5. What remains is the owner's authorisation **to execute/apply** the already-accepted decision — not authorisation of the decision itself. |
| **Scope guardrails preserved** | DR-01, DR-02, O-2026-001, P2/P3, and all `[SLOT]` / `[LEGAL CONTENT SLOT]` values remain unresolved. No design values invented. |

---

## 1. The validated closed permitted-family list (final)

> **PERMITTED (closed list of five):** `radius`, `elevation`, `sizing` (`size.control.*`, `size.touch.*`, `size.icon.*`), `motion` (`motion.duration.*`, `motion.easing.*`, `motion.reduced`), `z-index` (`z.*`).
>
> **REMOVED per owner decision:** `breakpoint` — Phase 7 establishes no semantic tier over it, but it is never consumed as a component token via `var()` (CSS custom properties cannot appear in `@media` conditions); the owner elected to omit it. Its removal is safe: no component token binds to it, so no binding is orphaned.
>
> **EXCLUDED by validation:** `border-width` — the semantic token `focus.ring.width → border.width.focus (2px)` (Design Tokens Part F, line 406) establishes a semantic tier over the family; component tokens needing the focus-ring width resolve to `focus.ring.width`, not to the foundation primitive.
>
> **EXCLUDED (have a semantic tier):** colour (Part C), typography (Part D), spacing and layout (Part E), state and focus (Part F), and every family not named above.

Each of the five permitted families was re-confirmed against all four frozen sources: **Phase 7 establishes no semantic tier over any of them** — each is defined only in Design Tokens **Part B (Foundation)**, with **no** matching token in the semantic Parts C–F.

| Family | Foundation locus | Semantic token over it? | Verdict |
|---|---|---|---|
| `radius` | Part B, lines 174–178 | None | **PERMITTED** |
| `elevation` | Part B, lines 192–196 | None | **PERMITTED** |
| `sizing` | Part B, lines 237–243 | None | **PERMITTED** |
| `motion` | Part B, lines 202–208 | None | **PERMITTED** |
| `z-index` | Part B, lines 225–231 | None | **PERMITTED** |
| `breakpoint` | Part B, lines 216–219 | None (but never `var()`-consumed) | **REMOVED (owner)** |
| `border-width` | Part B, lines 184–186 | **`focus.ring.width`** (Part F, l.406) | **EXCLUDED** |

---

## 2. The two rules, stated separately and unambiguously (owner decision 5)

The amendment turns on keeping two distinct rules from ever blurring. They apply to **different subjects** and must never be conflated:

- **RULE 1 — Component STYLE consumption (unchanged, absolute).**
  A *component style* (anything in `components.css` or a component/shell/screen `.tsx` — the CSS or markup a component actually renders) may reference **component tokens ONLY**. A component style referencing a **semantic** token, a **foundation** token, or a raw literal is a **HARD FAILURE**, with **no exception** — the five-family allowance below does **not** apply to component styles.

- **RULE 2 — Component TOKEN definition resolution (amended).**
  A *component token definition* (a `component.*` entry that resolves to another token) resolves to a **semantic** token, **except** that it MAY resolve **directly to a foundation** token when — and only when — its target belongs to one of the five permitted families in §1. Every other component-token definition MUST resolve to a semantic token; a direct foundation reference outside the five families is a **HARD FAILURE**.

**One-line mnemonic to carry into both documents:** *A component **style** never touches foundation. A component **token** may touch foundation, but only for `radius`, `elevation`, `sizing`, `motion`, `z-index`.*

---

## 3. Exact wording changes (three frozen locations)

Each edit follows the Phase 7 freeze convention: the original sentence is **retained**; new normative text and a dated amendment note are **appended/inserted** — nothing is silently rewritten. All three carry the governing reference `[D-2026-023]`.

### 3.1 Design Tokens §A.1 — binding rule (`Phase-7-Design-Tokens-v0.1.md`, line 40)

**Current (frozen):**
> **Binding rule `[P7-DESIGN-DECISION]`:** a component reads **component tokens**; component tokens resolve to **semantic tokens**; semantic tokens resolve to **foundation tokens**. Components never reference a foundation token directly. This is what lets a theme (or an owner colour change) propagate without editing components — and it is why STEP 8 forbids tying every component directly to raw values.

**Proposed replacement (original first sentence kept verbatim; two clearly-labelled rules added; amendment note appended):**
> **Binding rule `[P7-DESIGN-DECISION]`:** a component reads **component tokens**; component tokens resolve to **semantic tokens**; semantic tokens resolve to **foundation tokens**. This is what lets a theme (or an owner colour change) propagate without editing components — and it is why STEP 8 forbids tying every component directly to raw values.
>
> This binding rule has **two parts**, which apply to different subjects and must not be conflated:
>
> **(1) Component styles — foundation is never referenced.** What a component *renders* (its CSS / markup) references **component tokens only**. A component style that references a semantic token, a foundation token, or a raw value is prohibited. **This part has no exceptions.**
>
> **(2) Component-token definitions — semantic, with a closed foundation allowance.** A *component token* resolves to a **semantic token**, *except* that it may resolve **directly to a foundation token** when its target belongs to one of the five **families for which Phase 7 establishes no semantic tier** — `radius`, `elevation`, `sizing`, `motion`, `z-index` (the closed list governed in Design Governance §B.12). For **every other family** — including any family that has a semantic tier (colour, typography, spacing, layout, state, focus) and **`border-width`** (which has the semantic role `focus.ring.width`) — a component token **must** resolve to a semantic token; a direct foundation reference is prohibited. The list is **closed**: any family not named is prohibited, and adding one is an architectural decision, not an implementation choice.
>
> *Amendment note `[D-2026-023]` (2026-09-13): part (2)'s direct component→foundation allowance for the five-family closed list was added under Option B to resolve the §A.1 ↔ Part G specification conflict, where Part G already resolves `card.elevation`, `statechip.radius`, and the two `table.*.row.height` tokens directly to foundation. Part (1) is unchanged from the original rule. See Design Governance §B.12 and the Decision Log.*

### 3.2 Part G intro (`Phase-7-Design-Tokens-v0.1.md`, line 418)

**Current (frozen):**
> Component tokens resolve to semantic tokens only. A representative set (the catalogue defines the rest):

**Proposed replacement:**
> Component tokens resolve to semantic tokens only, **except** for the five families for which Phase 7 establishes no semantic tier (Design Governance §B.12) — `radius`, `elevation`, `sizing`, `motion`, `z-index` — which resolve **directly to foundation**, as the rows below for `card.elevation`, `statechip.radius`, `table.compact.row.height`, and `table.comfortable.row.height` do. (This is the token-definition rule; a component's rendered *style* still consumes component tokens only.) A representative set (the catalogue defines the rest):

*(No table row values change. The four existing direct-to-foundation rows are now consistent with §A.1.)*

### 3.3 Design Governance — binding-rule line + new §B.12 (`Phase-7-Design-Governance-v0.1.md`, line 41 and a new sub-section)

**Current (frozen), line 41:**
> Tokens: `category.role[.variant][.state]`, lowercase, dot-separated, hyphenated words (`Phase-7-Design-Tokens` A.2). Components bind to **component tokens → semantic tokens → foundation tokens**; a component may **never** reference a raw/foundation value.

**Proposed replacement, line 41:**
> Tokens: `category.role[.variant][.state]`, lowercase, dot-separated, hyphenated words (`Phase-7-Design-Tokens` A.2). **Two distinct rules apply.** *(a) Component styles:* what a component renders references **component tokens only** and may **never** reference a semantic value, a raw value, or a foundation value — **no exception**. *(b) Component-token definitions:* a component token resolves to a **semantic token**, except that it may resolve **directly to a foundation token** for the five families for which Phase 7 establishes no semantic tier, listed in §B.12 (`radius`, `elevation`, `sizing`, `motion`, `z-index`); for all other families a direct foundation reference is prohibited. `[D-2026-023]`

**New sub-section to add (with the token-hierarchy governance rules):**
> **§B.12 — Closed-family allowance for direct component-token→foundation resolution (five families with no semantic tier) `[D-2026-023]`.**
>
> 1. **Two rules, never conflated.** *(a)* A **component style** references **component tokens only** — never a semantic, foundation, or raw value; this has **no exception**. *(b)* A **component-token definition** resolves to a **semantic token**, with the single closed exception in clause 2. §B.12 governs only rule *(b)*; it does not loosen rule *(a)*.
> 2. **The closed list (exactly five).** A component-token definition may resolve **directly to a foundation token** only when its target family is one of: **`radius`, `elevation`, `sizing`** (`size.control.*`, `size.touch.*`, `size.icon.*`), **`motion`** (`motion.duration.*`, `motion.easing.*`, `motion.reduced`), **`z-index`** (`z.*`). **The authoritative eligibility criterion is that Phase 7 establishes no semantic tier over the target family** — confirmed for each of the five against all four frozen Phase 7 sources. (Explanatory rationale, non-normative: for these families a semantic token would be a pass-through alias adding no theming value; this rationale does not itself decide eligibility — the closed list in this clause is authoritative and exhaustive.) **No other family** is permitted.
> 3. **Fail-closed default.** Any component-token→foundation binding whose target family is **not** in clause 2 is a **specification violation** and MUST fail the token-hierarchy gate. Absence from the list means prohibited; the list is exhaustive.
> 4. **Excluded by validation.** `border-width` is **excluded** — the semantic token `focus.ring.width` (Design Tokens Part F) establishes a semantic tier over it, so component tokens needing the focus-ring width resolve to `focus.ring.width`, not to `border.width.focus`. `breakpoint` is **not** on the list — although Phase 7 establishes no semantic tier over it, it is never consumed as a component token (CSS custom properties cannot appear in `@media` conditions).
> 5. **Adding a family is an architectural decision.** Extending the list requires a new Decision Log entry and the same source-grounded validation (foundation-only, with **no** semantic token over **any** of the family's roles). Implementation may not add a family.
> 6. **Change-control class.** This touches a cross-cutting binding rule → a **major** design-system change per this document's versioning rule ("major = a change touching a foundation token or a cross-cutting rule"). **The exact resulting design-system version shall be determined from the currently recorded Phase 7 design-system version at implementation time; no version number is invented in this plan.** The major-version increment is applied only when the amendment is actually implemented, preserving the repository's existing versioning convention.

---

## 4. Effects (described — not applied)

### 4.1 The four current conflict tokens — all resolve, no value change

| Component token | Resolves to | Family | Before | After |
|---|---|---|---|---|
| `card.elevation` | `elevation.0/1` | elevation | §A.1 conflict (review-required) | **Compliant** |
| `statechip.radius` | `radius.pill` | radius | §A.1 conflict (review-required) | **Compliant** |
| `table.compact.row.height` | `size.control.sm` | sizing | §A.1 conflict (review-required) | **Compliant** |
| `table.comfortable.row.height` | `size.control.md` | sizing | §A.1 conflict (review-required) | **Compliant** |

All four fall inside `{elevation, radius, sizing}` ⊂ the five permitted families. **4 of 4 resolved**, none needs an invented semantic token, none changes value.

### 4.2 `extraDetected` (checker guard) — allow-condition changes; fail-closed strength unchanged

- **Now:** `extraDetected` = a generator component→foundation binding **not** in the hardcoded four-token `PART_G_FOUNDATION_RESOLVING` inventory → HARD FAIL; and `frozenConflictNames.length === 4` is baked into the `clean` condition, so `check:tokens` **can never pass** while the conflict stands.
- **After (implemented as a later, separately-reviewed step):** the allow-condition becomes *"target foundation family ∈ {radius, elevation, sizing, motion, z-index}"*. A component→foundation binding to a permitted family is **allowed** (no longer a conflict, no longer forces exit 1); a binding to any other family — colour, typography, spacing, layout, state, focus, **border-width**, or **breakpoint** — remains a **HARD FAIL**. Net: identical fail-closed strength, principled family test instead of a hand-maintained 4-token list, and the gate can legitimately reach green once all other rules pass.

> **Not applied here.** `check-token-hierarchy.mjs` is unchanged on disk.

#### 4.2.1 Acceptance criteria for the later checker implementation (two independent gates)

The checker update, when implemented, **MUST preserve two independent gates**. The five-family allowance applies to **Gate B only** and MUST NOT leak into Gate A. Both must be present and both must be able to fail independently.

- **Gate A — STYLE CONSUMPTION GATE (unchanged, absolute).**
  A **component style** (`components.css` + component/shell/screen `.tsx`, excluding `*.stories.tsx` / `*.test.tsx`) may reference **component tokens ONLY**. A component style that directly consumes a **semantic** token, a **foundation** token, or a **raw literal** is a **HARD FAILURE**. **The five-family allowance does NOT apply to Gate A** — there is no family under which a component style may reference foundation.

- **Gate B — TOKEN-DEFINITION GATE (amended).**
  A **component-token definition** may resolve:
  - `component token → semantic` — **allowed**;
  - `component token → foundation` — **allowed ONLY** when the target family is one of `radius`, `elevation`, `sizing`, `motion`, `z-index`;
  - `component token → foundation` outside those five families (including colour, typography, spacing, layout, state, focus, **`border-width`**, **`breakpoint`**) — **HARD FAILURE**;
  - `component token → component` or `→ literal` — **HARD FAILURE** (unchanged).

- **Explicit anti-leak criterion.** The implementation MUST NOT realise the five-family exception as a general CSS/component-style exception. A regression test MUST assert that a component **style** referencing a permitted-family **foundation** token (e.g. a component style using `var(--radius-pill)` directly) still **HARD-FAILS** under Gate A, even though the same foundation family is permitted as a *component-token definition* target under Gate B.

> **Not applied here.** These are acceptance criteria for a later, separately-reviewed checker change; no checker code is modified by this plan.

### 4.3 Bucket-1 traceability classification

- The four tokens **reclassify Class D → Class A** (compliant / fully traceable) in `Phase-8-B1-TokenHierarchy-Traceability.md`.
- A **new terminal-chain category** is recorded: *"component token → foundation (sanctioned, permitted family with no semantic tier)"* as a valid Bucket-1 endpoint — so permitted-family component tokens need **no invented intermediate semantic token** (removing the earlier, withdrawn "~53 new semantic tokens" pressure for these families).
- The §A.1 ↔ Part G conflict entry moves from *"open — owner decision required"* to *"resolved by D-2026-023 (Option B)"*, retained as history.
- **No change** to any Bucket-2 item, to the raw-value boundary finding (§6.1, still an unresolved Phase-8 verification requirement), or to any non-permitted family.

> **Not applied here.** The traceability document is unchanged on disk.

---

## 5. Exact Decision Log entry (D-2026-023, Accepted)

D-2026-023 records an **already-accepted, owner-approved** architectural decision. To be inserted in `01_Strategy/Decision Log.md` immediately after **D-2026-022** when execution is authorised, matching the existing entry format:

```markdown
## D-2026-023 — Phase 7 §A.1 amended (Option B): closed five-family component-token→foundation allowance

| Field | Value |
|---|---|
| **Decision** | **Phase 7 §A.1 (and its restatements in Design Tokens Part G and Design Governance) is amended under Option B** to permit a **component token** to resolve **directly to a foundation token** when — and only when — its target belongs to one of five **families for which Phase 7 establishes no semantic tier**: `radius`, `elevation`, `sizing`, `motion`, `z-index`. This resolves the internal §A.1 ↔ Part G specification conflict, in which Part G already resolves `card.elevation → elevation.0/1`, `statechip.radius → radius.pill`, `table.compact.row.height → size.control.sm`, and `table.comfortable.row.height → size.control.md` directly to foundation. The allowance is a **closed list** and **fail-closed**: any family not named is prohibited. The rule governing **component styles** is unchanged and absolute — a component style references component tokens only and never a semantic, foundation, or raw value. `border-width` is **excluded** (the semantic token `focus.ring.width` establishes a semantic tier over it); `breakpoint` is **not** included (never consumed as a component token). No token is added, renamed, or revalued; no component CSS is changed. |
| **Status** | Accepted |
| **Date** | 13 Sep 2026 |
| **Question** | How should the §A.1 binding rule ("component tokens resolve to semantic tokens only; components never reference foundation directly") be reconciled with Part G, which itself resolves four component tokens directly to foundation? |
| **Options** | Option A — preserve §A.1 and introduce semantic-tier tokens for the affected roles · **Option B — amend §A.1 to permit component-token→foundation for a closed list of families for which Phase 7 establishes no semantic tier** · leave the conflict open |
| **Resolution** | **Option B**, scoped to the closed five-family list validated against all four frozen Phase 7 sources (each family is foundation-only in Design Tokens Part B, with no semantic token in Parts C–F). The component-style consumption rule is preserved unchanged and stated separately from the component-token-definition rule to remove ambiguity. The amendment is **major** per the Design Governance versioning rule (it touches a cross-cutting binding rule); the exact resulting design-system version is determined from the currently recorded Phase 7 design-system version at implementation time (no version number is invented here), and the increment is applied only when the amendment is implemented. This is a **design-system architecture decision only** — it introduces no product, business, permission, or legal decision, and resolves none of DR-01, DR-02, O-2026-001, or any `[SLOT]` / `[LEGAL CONTENT SLOT]`. All Phase 6 constraints (CR-1…CR-21) and UX principles (UXP-1…UXP-10) remain intact. |
| **Impact** | `03_DesignSystem/Phase-7-Design-Tokens-v0.1.md` (§A.1 binding rule; Part G intro) · `03_DesignSystem/Phase-7-Design-Governance-v0.1.md` (binding-rule line; new §B.12) · `01_Strategy/Roadmap.md` (Frozen Baseline amendment note; design-system major-version bump) · `04_Development/ui/scripts/check-token-hierarchy.mjs` (allow-condition: five-family test) · `04_Development/Phase-8-B1-TokenHierarchy-Traceability.md` (four tokens Class D→A; new sanctioned endpoint category) |
| **References** | `04_Development/Phase-8-B1-A1-Amendment-FINAL.md` (this amendment's exact wording); `Phase-8-B1-A1-Conflict-Options-Brief.md` (Option A vs B analysis); `Phase-8-B1-TokenHierarchy-Traceability.md`; D-2026-021 (Phase 7 freeze); D-2026-022 (Phase 8 kickoff); README traceability requirements |
| **Owner** | Vamshi |
```

---

## 6. Edit inventory (what would change, once execution of D-2026-023 is authorised)

| # | File | Location | Nature | Frozen? |
|---|---|---|---|---|
| 1 | `Phase-7-Design-Tokens-v0.1.md` | §A.1 (line 40) | Replace per §3.1 | **Frozen** — needs D-2026-023 execution auth |
| 2 | `Phase-7-Design-Tokens-v0.1.md` | Part G intro (line 418) | Replace per §3.2 | **Frozen** — needs D-2026-023 execution auth |
| 3 | `Phase-7-Design-Governance-v0.1.md` | Line 41 + new §B.12 | Replace + insert per §3.3 | **Frozen** — needs D-2026-023 execution auth |
| 4 | `01_Strategy/Decision Log.md` | After D-2026-022 | Insert D-2026-023 (§5 text) | Not frozen (log) |
| 5 | `01_Strategy/Roadmap.md` | Frozen-baseline note | Record Phase 7 amended (major) under D-2026-023 | Not frozen (log) |
| 6 | `ui/scripts/check-token-hierarchy.mjs` | allow-condition / `clean` / `extraDetected` | Five-family test (§4.2) | Not frozen (implementation) |
| 7 | `Phase-8-B1-TokenHierarchy-Traceability.md` | 4 tokens Class D→A; new endpoint category | Reclassify + record resolution | Not frozen (analysis) |

**Nothing in this table has been executed.**

---

## 7. What this plan deliberately does NOT do

- Does **not** edit any frozen Phase 7 document, the Decision Log, the Roadmap, the token generator, the checker, the traceability doc, or any component CSS/TSX.
- Does **not** add, rename, or revalue any token; does **not** modify CSS.
- Does **not** perform Bucket-1 or Bucket-2 remediation.
- Does **not** resolve DR-01, DR-02, O-2026-001, P2/P3, or any `[SLOT]` / `[LEGAL CONTENT SLOT]`.
- Does **not** commit.

---

## 8. On execution authorisation

D-2026-023 is **Accepted** (the architectural decision is made). When the owner authorises **execution** — i.e. authorises applying the amendment — the edits in §6 items 1–3 would be applied **exactly** as worded in §3, the Decision Log entry from §5 inserted, and the Roadmap note added — each as a separately reviewable step, followed by the checker (§4.2, subject to the acceptance criteria in §4.2.1) and traceability (§4.3) updates. **Until execution is authorised, nothing is changed.**

*Prepared under the Phase 8 governance sequence (DISCUSS → DECIDE → DOCUMENT → VERIFY → IMPLEMENT → REVIEW → COMMIT). DISCUSS/DECIDE are complete (Option B, owner-approved; D-2026-023 Accepted) and independent review has been incorporated. This is the execution-ready DOCUMENT artefact; it stops before IMPLEMENT, awaiting the owner's authorisation to apply.*
