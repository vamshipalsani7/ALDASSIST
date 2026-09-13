# Phase 8 — B1 · Proposed Amendment Plan (Option B)

**Amend Phase 7 §A.1 to permit `component-token → foundation` resolution for a closed, governed list of structural families that have no semantic tier**

| | |
|---|---|
| **Document type** | Proposed amendment plan — **for independent review only** |
| **Status** | DRAFT — **nothing edited**. No frozen Phase 7 document, token, generator, or component CSS has been modified. No remediation performed. No git commit. |
| **Date** | 2026-09-08 |
| **Owner decision in force** | **Option B is selected** (owner instruction). This plan operationalises Option B; it does **not** re-open the A/B choice. |
| **Governance gate** | This plan **stops for independent review before any edit**, per the owner instruction. Editing frozen Phase 7 documents requires an explicit architectural decision (a new Deferred/Decision Register entry); this plan specifies exactly what that edit would be, so the reviewer/owner can authorise it before it is made. |
| **Scope guardrails preserved** | DR-01, DR-02, O-2026-001, P2/P3, and all `[SLOT]` / `[LEGAL CONTENT SLOT]` values remain unresolved. No design values are invented. No new tokens are added by this plan. |

---

## 0. What Option B changes, in one paragraph

Phase 7 §A.1 currently states an **absolute** rule: *"a component reads component tokens; component tokens resolve to semantic tokens; semantic tokens resolve to foundation tokens. Components never reference a foundation token directly."* Yet Phase 7 Part G's own component-token table resolves **four** component tokens **directly to foundation** (`card.elevation → elevation.0/1`, `statechip.radius → radius.pill`, `table.compact.row.height → size.control.sm`, `table.comfortable.row.height → size.control.md`). This is an **internal Phase 7 contradiction**, surfaced (not reconciled) by the B1 checker. Option B resolves it by amending §A.1 so that `component-token → foundation` is **permitted** — but **only** for a **closed, enumerated list of structural families for which Phase 7 establishes no semantic tier**, and for **no other case**. Every other `component → foundation` binding (colour, typography, spacing, and any family that does have a semantic tier) remains a **hard failure**. The rule stays **fail-closed**: anything not explicitly on the list is prohibited.

---

## 1. Source-grounded validation of the permitted-family list

The owner instruction is explicit: *"Do not assume the illustrative list in the owner brief is automatically approved."* Accordingly, **every** candidate family was tested against **all four** frozen Phase 7 sources. The test for eligibility is strict and has **two** conditions, both required:

- **(E1) The family exists only as a FOUNDATION tier** — its tokens are defined in Design Tokens **Part B (Foundation)**.
- **(E2) Phase 7 establishes NO semantic token anywhere (Design Tokens Parts C–F, or the Component Catalogue) that names a role over that family.** If even one semantic token wraps any role in the family, the family is **MIXED** and is **excluded** — because for that family a semantic tier *does* exist and components must route through it.

A family passes **only if E1 AND E2 hold**. The "no semantic tier" wording is therefore enforced at the family level, and any family with *partial* semantic coverage is excluded wholesale (not partially admitted), which keeps the family-level rule sound.

### 1.1 Validation table — every candidate family

| # | Family | Foundation definition (E1) | Any semantic token over this family? (E2) | Verdict |
|---|---|---|---|---|
| 1 | **radius** | Design Tokens **Part B**, lines 174–178: `radius.none / sm / md / lg / pill` | **None.** No `radius.*` token appears in Parts C–F (semantic). | **PERMITTED** |
| 2 | **elevation** | **Part B**, lines 192–196: `elevation.0…4` (+ shadow values) | **None.** No `elevation.*` / shadow semantic token in Parts C–F. | **PERMITTED** |
| 3 | **sizing** (`size.control.*`, `size.touch.*`, `size.icon.*`) | **Part B**, lines 237–243 | **None.** No `size.*` semantic token in Parts C–F. | **PERMITTED** |
| 4 | **motion** (`motion.duration.*`, `motion.easing.*`, `motion.reduced`) | **Part B**, lines 202–208 | **None.** No `motion.*` semantic token in Parts C–F. | **PERMITTED** |
| 5 | **z-index** (`z.*`) | **Part B**, lines 225–231: `z.base…max` | **None.** No `z.*` semantic token in Parts C–F. | **PERMITTED** |
| 6 | **breakpoint** (`breakpoint.*`) | **Part B**, lines 216–219 | **None.** No `breakpoint.*` semantic token in Parts C–F. | **PERMITTED — but practically inert** (see §1.3) |
| 7 | **border-width** (`border.width.*`) | **Part B**, lines 184–186: `hairline / strong / focus` | **YES — MIXED.** Design Tokens **Part F, line 406**: `focus.ring.width → border.width.focus (2px)` is a **semantic** token over this family. | **EXCLUDED** (see §1.2) |
| — | colour | Part B ramps | **YES** — entire semantic colour system, **Part C** | Excluded (has semantic tier) |
| — | typography | Part B type primitives | **YES** — semantic typography, **Part D** | Excluded |
| — | spacing (`space.*`) | Part B, lines 162–167 | **YES** — `space.inset.*`, `space.stack.*`, `space.section-gap`, …, **Part E**, lines 380–386 | Excluded |
| — | layout | (derived) | **YES** — `layout.container.*`, `layout.grid.*`, `layout.nav.*`, **Part E**, lines 387–393 | Excluded |
| — | state / focus | — | **YES** — `state.*`, `focus.ring.*`, **Part F** | Excluded |

### 1.2 Border-width is EXCLUDED — this is the decisive validation finding

The owner brief's illustrative list must **not** be adopted as-is precisely because of this family. Border-width **passes E1** (foundation primitives in Part B) but **fails E2**: Design Tokens **Part F line 406** defines the semantic token **`focus.ring.width` → `border.width.focus (2px)`**. Because a semantic role (`focus.ring.width`) *does* exist over border-width, Phase 7 **does** establish a semantic tier for at least one border-width role. Admitting border-width to the closed list would let a component token bypass `focus.ring.width` and bind straight to `border.width.focus`, defeating the theming guarantee for focus rings (the one border role the design system explicitly rides on for accessibility, `[P4:§22.3]`).

**Therefore border-width is excluded from the permitted list.** Component tokens needing the focus-ring width must resolve to the semantic `focus.ring.width`. (Component tokens needing `hairline`/`strong` border widths, which have no semantic wrapper, are **not** rescued by this exclusion — they remain a `component → foundation` **hard failure** under the amended rule, and would require either a new semantic token (Option-A-style, owner decision) or an explicit future family addition. This plan does **not** create one.)

> **Owner sub-decision flagged:** the permitted list **excludes** border-width. If the owner instead intends border-width to be admissible for its non-focus roles, that requires either (a) a separate semantic token for those roles, or (b) an explicit narrower carve-out — an owner decision this plan deliberately does **not** presume.

### 1.3 Breakpoint is permitted but practically inert

`breakpoint.*` has no semantic tier (passes E1+E2), so it is eligible. In practice CSS custom properties cannot be consumed inside `@media` query conditions, so a `component-token → breakpoint` binding does not occur in component styles. Including it keeps the list principled and complete (it is genuinely semantic-less) while creating no live binding. It is listed for completeness and to avoid a future false "unsanctioned" flag; the reviewer may elect to omit it as never-consumed. **Recommendation deferred to reviewer/owner** — either choice is defensible; this plan does not decide it.

### 1.4 Validated closed permitted-family list

> **PERMITTED (closed list):** `radius`, `elevation`, `sizing`, `motion`, `z-index`, `breakpoint`
> **EXCLUDED (mixed — semantic tier exists):** `border-width`
> **EXCLUDED (has semantic tier):** colour, typography, spacing, layout, state, focus, and every family not named above.

The list is **closed**: adding a family later is itself an architectural decision, not an implementation choice.

---

## 2. Exact wording changes (three frozen locations)

The binding rule is stated in **three** places across the frozen Phase 7 baseline; all three must be amended consistently or the contradiction merely moves. Each edit follows the Phase 7 freeze convention: **append an amendment/historical notice, do not silently rewrite**, and record the governing decision in the Decision Log.

### 2.1 Design Tokens §A.1 — binding rule (`Phase-7-Design-Tokens-v0.1.md`, line 40)

**Current (frozen) text:**
> **Binding rule `[P7-DESIGN-DECISION]`:** a component reads **component tokens**; component tokens resolve to **semantic tokens**; semantic tokens resolve to **foundation tokens**. Components never reference a foundation token directly. This is what lets a theme (or an owner colour change) propagate without editing components — and it is why STEP 8 forbids tying every component directly to raw values.

**Proposed amended text (add the italicised clause + amendment note; original sentence retained):**
> **Binding rule `[P7-DESIGN-DECISION]`:** a component reads **component tokens**; component tokens resolve to **semantic tokens**; semantic tokens resolve to **foundation tokens**. Components never reference a foundation token directly. **A component token may resolve *directly to a foundation token* only when its target belongs to a *structural family for which Phase 7 establishes no semantic tier*, and only for the families on the closed, governed list in Design Governance §[new] — currently `radius`, `elevation`, `sizing`, `motion`, `z-index`, `breakpoint`. In every other case — including any family that has a semantic tier (colour, typography, spacing, layout, state, focus) and `border-width` (which has the semantic role `focus.ring.width`) — a component token MUST resolve to a semantic token, and a direct foundation reference is prohibited.** This is what lets a theme (or an owner colour change) propagate without editing components — and it is why STEP 8 forbids tying every component directly to raw values.
>
> *Amendment note `[D-2026-0NN]` (2026-09-08): the direct component→foundation allowance for the closed structural-family list was added under Option B to resolve the §A.1 ↔ Part G specification conflict. See Design Governance §[new] and the Decision Log.*

### 2.2 Part G intro (`Phase-7-Design-Tokens-v0.1.md`, line 418)

**Current (frozen) text:**
> Component tokens resolve to semantic tokens only. A representative set (the catalogue defines the rest):

**Proposed amended text:**
> Component tokens resolve to semantic tokens only, **except** for the closed structural-family list in Design Governance §[new] (`radius`, `elevation`, `sizing`, `motion`, `z-index`, `breakpoint`), which have **no semantic tier** and therefore resolve **directly to foundation** — as the rows below for `card.elevation`, `statechip.radius`, `table.compact.row.height`, and `table.comfortable.row.height` already do. A representative set (the catalogue defines the rest):

*(No table row values change. The four existing rows are now consistent with §A.1 rather than in conflict with it.)*

### 2.3 Design Governance — token binding rule (`Phase-7-Design-Governance-v0.1.md`, line 41)

**Current (frozen) text:**
> Tokens: `category.role[.variant][.state]`, lowercase, dot-separated, hyphenated words (`Phase-7-Design-Tokens` A.2). Components bind to **component tokens → semantic tokens → foundation tokens**; a component may **never** reference a raw/foundation value.

**Proposed amended text:**
> Tokens: `category.role[.variant][.state]`, lowercase, dot-separated, hyphenated words (`Phase-7-Design-Tokens` A.2). Components bind to **component tokens → semantic tokens → foundation tokens**; a component may **never** reference a raw/foundation value. **A *component token* may bind directly to a foundation token only for the closed structural-family list in §[new] below (`radius`, `elevation`, `sizing`, `motion`, `z-index`, `breakpoint`), which Phase 7 leaves without a semantic tier; all other component tokens — and any component *style* — may never reference a foundation token directly.** *(Distinguish: a component **style** never references foundation; a component **token** may, only for the §[new] families.)*

---

## 3. Design Governance clause to govern the closed list (new sub-section)

The owner asked for the **exact Design Governance wording needed to govern the closed list**. Proposed new sub-section, to sit with the token-hierarchy rules in `Phase-7-Design-Governance-v0.1.md`:

> **§[new] — Closed structural-family allowance for direct component→foundation resolution `[D-2026-0NN]`.**
>
> 1. **Purpose.** Some structural token families (geometry and system scales) have no role-level abstraction in Phase 7 — there is nothing for a *semantic* token to name beyond the primitive itself. For these, an intermediate semantic token would be a pass-through alias adding no theming value. This clause permits a *component token* to resolve **directly to foundation** for those families, and **only** those families.
> 2. **The closed list.** `radius`, `elevation`, `sizing` (`size.control.*`, `size.touch.*`, `size.icon.*`), `motion` (`motion.duration.*`, `motion.easing.*`, `motion.reduced`), `z-index` (`z.*`), `breakpoint` (`breakpoint.*`). **No other family** is permitted.
> 3. **Fail-closed default.** Any `component token → foundation` binding whose target family is **not** on this list is a **specification violation** and MUST fail the token-hierarchy gate. The list is exhaustive; absence from it means prohibited.
> 4. **Excluded by validation.** `border-width` is **excluded**: the semantic token `focus.ring.width` (Design Tokens Part F) establishes a semantic tier over it. Component tokens needing the focus-ring width resolve to `focus.ring.width`, not to `border.width.focus`.
> 5. **Component styles are unaffected.** This clause governs *component-token definitions* only. A **component style** (CSS / TSX) still consumes **component tokens only** — it may never reference a semantic or foundation token directly. (The consumption rule is unchanged.)
> 6. **Adding a family is an architectural decision.** Extending this list requires a new Decision Log entry and the same source-grounded validation (family must be foundation-only with **no** semantic token over any of its roles). Implementation may not add a family.
> 7. **Change-control class.** Because this touches a cross-cutting binding rule, it is a **major** design-system change per this document's versioning rule ("major = a change touching a foundation token or a cross-cutting rule"). The design system version increments accordingly when the amendment is applied.

---

## 4. Effect on the four current conflict tokens

All four flip from **specification conflict (review-required)** to **compliant / sanctioned**, with **no value change**:

| Component token | Resolves to | Target family | Before amendment | After amendment |
|---|---|---|---|---|
| `card.elevation` | `elevation.0/1` | elevation | §A.1 conflict (review-required) | **Compliant** — permitted family |
| `statechip.radius` | `radius.pill` | radius | §A.1 conflict (review-required) | **Compliant** — permitted family |
| `table.compact.row.height` | `size.control.sm` | sizing | §A.1 conflict (review-required) | **Compliant** — permitted family |
| `table.comfortable.row.height` | `size.control.md` | sizing | §A.1 conflict (review-required) | **Compliant** — permitted family |

Every one of the four falls inside `{radius, elevation, sizing}` ⊂ permitted list. **The amendment resolves 4 of 4** with no residual conflict token. None requires an invented semantic token; none changes its resolved foundation value.

---

## 5. Effect on `extraDetected` (checker fail-closed guard)

**Current behaviour.** `extraDetected` = any generator `component-token → foundation` binding **not** in the hardcoded four-entry `PART_G_FOUNDATION_RESOLVING` inventory → **HARD FAIL**. The test is *membership in a fixed 4-token list*.

**After amendment (to be implemented in a *later* step, not now).** The test changes from *"is this one of the 4 frozen tokens?"* to *"is this binding's **target foundation family** on the closed permitted list?"*:

- `component-token → foundation` where **target family ∈ {radius, elevation, sizing, motion, z-index, breakpoint}** → **ALLOWED** (no longer a conflict; no longer forces exit 1).
- `component-token → foundation` where **target family ∉ permitted list** (e.g. colour, typography, spacing, layout, state, focus, **border-width**) → **HARD FAIL** (unchanged — still fail-closed).

**Net effect on the guard's safety:** unchanged in strength, improved in principle. It remains fail-closed (anything not explicitly permitted fails), but its allow-condition becomes the **governed family list** rather than a **hand-maintained 4-token inventory**. This also **removes the current permanent red state**: today `frozenConflictNames.length === 4` is hardcoded into the `clean` condition, so `check:tokens` **can never pass** while the conflict stands. After the amendment, the four permitted-family bindings stop counting as conflicts, so the gate can legitimately reach green once (and only once) all *other* rules pass.

> **Not done in this plan:** the checker edit above is described, not made. `PART_G_FOUNDATION_RESOLVING` and the `clean`/`extraDetected` logic are **unchanged** on disk. Implementing them is a subsequent, separately-reviewed step.

---

## 6. Effect on the Bucket-1 traceability classification

In `Phase-8-B1-TokenHierarchy-Traceability.md`, the A/B/C/D scheme currently classifies the four direct-to-foundation component tokens under the **specification-conflict / review-required** class (Class D — surfaced, not passed). After the amendment:

- The four tokens **reclassify to Class A (compliant / fully traceable)** — they now trace `component token → foundation (permitted family)` as an **explicitly sanctioned** chain under amended §A.1 + Design Governance §[new], rather than as an unresolved contradiction.
- The traceability document gains a **new terminal-chain category**: *"component token → foundation (sanctioned, permitted structural family)"* as a **valid** Bucket-1 endpoint. Bucket-1 component tokens that legitimately need a permitted-family primitive **no longer require an invented intermediate semantic token** to be traceable — removing the earlier (withdrawn) "~53 new semantic tokens" pressure for these families.
- The **§A.1 ↔ Part G conflict entry** in the traceability doc moves from *"open specification conflict — owner decision required"* to *"resolved by D-2026-0NN (Option B); see Amendment Plan"* — retained as historical record, not deleted.
- **No change** to any Bucket-2 item, to the raw-value boundary finding (§6.1 of the traceability doc — still an unresolved Phase-8 verification requirement, untouched by this amendment), or to any family **not** on the permitted list.

> **Not done in this plan:** the traceability document is **not** edited here. These are the effects the reviewer should expect when the amendment is applied.

---

## 7. Exact edit inventory (what would change, once authorised)

| # | File | Location | Nature | Frozen? |
|---|---|---|---|---|
| 1 | `03_DesignSystem/Phase-7-Design-Tokens-v0.1.md` | §A.1 binding rule (line 40) | Add allowance clause + amendment note | **Frozen** — needs decision authorisation |
| 2 | `03_DesignSystem/Phase-7-Design-Tokens-v0.1.md` | Part G intro (line 418) | Add "except closed list" clause | **Frozen** — needs decision authorisation |
| 3 | `03_DesignSystem/Phase-7-Design-Governance-v0.1.md` | Binding-rule line (line 41) + new §[new] | Add allowance clause + new governing sub-section | **Frozen** — needs decision authorisation |
| 4 | `01_Strategy/Decision Log.md` | New entry **D-2026-0NN** | Record the Option-B amendment decision | Not frozen (log) |
| 5 | `01_Strategy/Roadmap.md` (if it carries the frozen-baseline note) | Baseline amendment note | Record that Phase 7 baseline was amended (major) under D-2026-0NN | Not frozen (log) |
| 6 | `ui/scripts/check-token-hierarchy.mjs` | `extraDetected` / `clean` / conflict logic | Switch allow-condition from 4-token inventory to permitted-family test | Not frozen (implementation) |
| 7 | `04_Development/Phase-8-B1-TokenHierarchy-Traceability.md` | Class D→A for the 4 tokens; new sanctioned endpoint category | Reclassify + record resolution | Not frozen (analysis) |

**Nothing in this table has been executed.** The next `[D-…]` number is left as `0NN` for the owner to assign in the Decision Log.

---

## 8. What this plan deliberately does NOT do

- Does **not** edit any frozen Phase 7 document, the Decision Log, the Roadmap, the token generator, the checker, the traceability doc, or any component CSS/TSX.
- Does **not** add, rename, or revalue any token.
- Does **not** remediate Bucket 1 or Bucket 2.
- Does **not** assign the Decision Log number or presume owner authorisation of the edits.
- Does **not** resolve DR-01, DR-02, O-2026-001, P2/P3, or any `[SLOT]` / `[LEGAL CONTENT SLOT]`.
- Does **not** decide the two flagged sub-questions (border-width exclusion confirmation; whether to keep or drop inert `breakpoint`) — these are surfaced for the owner/reviewer.

---

## 9. Open items for the reviewer / owner

1. **Confirm border-width exclusion.** Validation excludes it because `focus.ring.width` gives the family a semantic tier. Confirm this is the intended treatment, or state the narrower intent.
2. **Keep or drop `breakpoint`.** Eligible (semantic-less) but never consumed as a component token via `var()`. Keep for completeness, or omit as never-consumed.
3. **Assign the Decision Log number** (`D-2026-0NN`) and authorise the three frozen-document edits (items 1–3 in §7).
4. **Confirm the major version bump** for the design system per the governance versioning rule.

**On authorisation, the edits in §7 would be applied exactly as worded in §2–§3, followed by the checker and traceability updates in §5–§6 — each as a separately reviewable step. Until then, nothing is changed.**

---

*Prepared under the Phase 8 governance sequence (DISCUSS → DECIDE → DOCUMENT → VERIFY → IMPLEMENT → REVIEW → COMMIT). This document is the DOCUMENT artefact for the Option-B amendment; it stops before IMPLEMENT for independent review, per the owner instruction.*
