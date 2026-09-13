# Phase 8 — Owner-Decision Brief: Resolving the §A.1 ↔ Part-G Token-Hierarchy Conflict

**Type:** Owner-decision brief. Analysis only — **no recommendation, no choice made.** No frozen Phase 7 document edited, no token added, no component CSS modified, no Bucket-1/2 remediation.
**Date:** 3 September 2026
**Sources used:** frozen Phase 7 only (`Phase-7-Design-Tokens-v0.1.md`, `Phase-7-Component-Catalogue-v0.1.md`, `Phase-7-Design-System-v0.1.md`, `Phase-7-Design-Governance-v0.1.md`) + the current Phase-8 audit evidence (`Phase-8-B1-TokenHierarchy-Traceability.md`, `ui/scripts/check-token-hierarchy.mjs`).

---

## 0. The conflict (restated from the frozen sources)

Tokens **§A.1** states the binding rule categorically: the tier diagram says *"COMPONENT tokens … per-component values **bound to semantic tokens**"*, the prose says *"component tokens resolve to **semantic tokens**; semantic tokens resolve to foundation tokens. **Components never reference a foundation token directly**,"* and the **Part G** intro repeats *"**Component tokens resolve to semantic tokens only.**"*

Yet **Part G's own table** resolves four component tokens **directly to foundation** primitives, for token families that have **no semantic tier**:

| Part-G component token | Resolves to | Foundation family (Tokens §B) |
|---|---|---|
| `card.elevation` | `elevation.0/1` | elevation (B.6) |
| `statechip.radius` | `radius.pill` | radius (B.4) |
| `table.compact.row.height` | `size.control.sm` | sizing (B.10) |
| `table.comfortable.row.height` | `size.control.md` | sizing (B.10) |

This is an **internal contradiction within frozen Phase 7**. Two mutually exclusive repairs are on the table (A and B). This brief analyses both; it does not select one.

### 0.1 Families with vs without a semantic tier (from frozen Tokens)

Semantic tier **present** (Tokens Parts C–F): **colour** (`color.*`), **typography** (`type.*`), **spacing** (`space.inset.*`, `space.stack.*`, `space.section-gap`, `space.primary-action-breathing`), **layout** (`layout.container.*`, `layout.grid.*`), **state/focus** (`state.*`, `focus.ring.*`).

Semantic tier **absent** (only a foundation tier exists): **radius** (B.4), **elevation** (B.6), **sizing** (`size.control.*`, `size.icon.*`, `size.touch.min`; B.10), general **border-width** (`border.width.hairline`/`strong`; B.5 — note `border.width.focus` is wrapped by the semantic `focus.ring.width`), **motion** (B.7), **breakpoint** (B.8), **z-index** (B.9).

The conflict lives entirely in the **semantic-tier-absent** families.

---

## Option A — Preserve §A.1; introduce semantic-tier tokens for the affected families

Keep the binding rule exactly as written and make it true everywhere by adding a semantic tier for each affected family, so every component token resolves to a semantic token that resolves to foundation.

### A.1 Exact affected tokens
- **Existing Part-G entries re-pointed** (their *values* unchanged, but routed via a new semantic token): `card.elevation`, `statechip.radius`, `table.compact.row.height`, `table.comfortable.row.height`.
- **New semantic tokens required** (one or more per family), e.g. (names illustrative, values from frozen foundation):
  - radius: `radius.control`→`radius.sm`, `radius.surface`→`radius.md`, `radius.overlay`→`radius.lg`, `radius.pill`→(foundation `radius.pill`).
  - elevation: `elevation.card`→`elevation.0/1`, `elevation.overlay`→`elevation.3`, `elevation.scrolled`→`elevation.1`.
  - sizing: `size.row.compact`→`size.control.sm`, `size.row.comfortable`→`size.control.md`, `size.touch.min` (semantic)→(foundation).
  - border-width: `border.width.emphasis`→`border.width.strong`, a general hairline semantic role, etc.
  - (motion / breakpoint / z-index would need equivalents if/when components consume them.)
- **Future Bucket-1 tokens** (`card.radius`, `modal.radius`, `modal.elevation`, `input.radius`, `button.min-target`, `tab.active.border-width`, `header.scrolled.elevation`) would each resolve to one of the new semantic tokens.

### A.2 Architectural consequences
- The three-tier chain becomes **uniform**: `component → semantic → foundation` for every family, with no exceptions. §A.1 is literally satisfied.
- Adds an intermediary tier for structural primitives. For several cases the semantic token is a **near-1:1 pass-through** of a foundation value (e.g. `radius.control → radius.sm`), i.e. indirection without added semantic "intent."
- Token count grows (a semantic layer per affected family).

### A.3 Consistency with Component Catalogue / Design System
- **Requires re-expressing** Catalogue/DS anatomy that currently names foundation targets: Catalogue 3.3 (`radius.md`, `elevation.0/1`), 8.1 (`radius.lg`, `elevation.3`), 1.1 (scrolled `elevation.1`), 5.1 (`radius.pill`), 6.1 (inputs `radius.sm`), 2.5/Part L (`size.touch.min`), and DS G.1 (radius/elevation prose maps roles → foundation values). These would be updated to name the new semantic roles.
- After the change, DS/Catalogue would describe a single consistent consumption model (components → component tokens → semantic tokens) with no structural exception — arguably cleaner to teach.

### A.4 Impact on the token-hierarchy checker
- The checker's `component-token → semantic` rule would hold **universally**; the whole **SPECIFICATION CONFLICT category disappears** (no component token resolves to foundation).
- The frozen Part-G foundation-resolving inventory (currently 4) drops to **0** once those entries are re-pointed.
- `extraDetected` (unsanctioned component→foundation) remains the guard and would then catch *any* component→foundation as a hard fail — a stronger, simpler invariant.
- No "no-semantic-tier" concept is needed anywhere.

### A.5 Impact on future Bucket-1 materialization
- Every Bucket-1 token gets a semantic target; materialization proceeds with a fully consistent chain.
- **More** tokens to define and name (the new semantic tier), and Bucket-1 work is **blocked** until the new semantic tokens are authored and the affected Part-G/Catalogue entries re-pointed.

### A.6 Risks / trade-offs
- **Token proliferation / thin abstraction:** semantic tokens that merely alias a foundation primitive add maintenance surface without added meaning; risk of over-abstraction for values that rarely vary by intent.
- **Theming benefit is weak here:** the three-tier model exists for theme/owner propagation (AP-12; Tokens Part H). A dark theme re-points *colour* semantics; radius/elevation/size are **unlikely to vary by theme**, so a semantic tier for them yields little of the benefit that motivates §A.1 — this is the plausible reason Part G mapped them straight to foundation in the first place.
- **Larger frozen change** and more review surface than Option B.
- **Upside:** maximal internal consistency; §A.1 preserved verbatim; one uniform rule to enforce and explain.

### A.7 Frozen documentation that would change, if approved
- `Phase-7-Design-Tokens-v0.1.md`: **add** the new semantic tokens (new rows in Parts C–F equivalents for radius/elevation/size/border/motion/breakpoint/z); **re-point** the four Part-G entries (`card.elevation`, `statechip.radius`, `table.*.row.height`) to the new semantic tokens; update Part G examples. §A.1 text unchanged.
- `Phase-7-Component-Catalogue-v0.1.md`: update anatomy lines that name foundation targets (3.3, 8.1, 1.1, 5.1, 6.1, 2.5) to name the new semantic roles.
- `Phase-7-Design-System-v0.1.md`: update DS G (border/radius/elevation) prose to reference semantic roles.
- `Phase-7-Design-Governance-v0.1.md`: naming section may need the new semantic-token families recorded.

---

## Option B — Amend §A.1 to permit component→foundation where no semantic tier exists

Keep the token set as-is and make the rule match reality: component tokens resolve to semantic tokens **where a semantic tier exists**, and may resolve **directly to foundation** for the enumerated families that have no semantic tier.

### B.1 Exact affected tokens
- **No token values change.** The four existing Part-G conflict entries (`card.elevation`, `statechip.radius`, `table.compact.row.height`, `table.comfortable.row.height`) become **sanctioned**, not conflicting.
- **Future Bucket-1 tokens** in the semantic-tier-absent families resolve directly to foundation, legitimately: `card.radius`→`radius.md`, `modal.radius`→`radius.lg`, `modal.elevation`→`elevation.3`, `input.radius`→`radius.sm`, `button.min-target`→`size.touch.min`, `tab.active.border-width`→`border.width.focus`, `header.scrolled.elevation`→`elevation.1`.
- The permitted-family list would be enumerated in the amended §A.1 (e.g. radius, border-width, elevation, sizing, motion, breakpoint, z-index).

### B.2 Architectural consequences
- The model becomes **explicitly two-shaped**: `component → semantic → foundation` for colour/type/space/state/layout; `component → foundation` (two-tier) for the enumerated structural families.
- No new tokens; the existing Part G and DS G mappings are ratified as-is.
- §A.1 changes from an absolute invariant to a **conditional rule** — more nuanced to state and enforce.

### B.3 Consistency with Component Catalogue / Design System
- **Fully consistent already.** Part G's table, DS G.1's radius/elevation/border prose, and every Catalogue anatomy line naming a foundation target (3.3, 8.1, 1.1, 5.1, 6.1, 2.5) remain correct with **no rewrites**.
- The amendment simply reconciles §A.1's wording with what the Catalogue/DS/Part G already do.

### B.4 Impact on the token-hierarchy checker
- The current checker's "no-semantic-tier" behaviour (which this project **withdrew as an invented exception**) would become **authorised by the amended §A.1** — no longer invented, but spec-backed.
- The **SPECIFICATION CONFLICT category is retired**; those four become sanctioned `component→foundation` for permitted families.
- `extraDetected` would be **redefined** to mean "component→foundation for a family **outside** the enumerated permitted list" (still a hard fail). The consumption rule (component style → foundation/semantic both hard-fail) is unaffected.

### B.5 Impact on future Bucket-1 materialization
- **Unblocked immediately** for the structural families: component tokens bind straight to foundation as Part G already demonstrates.
- **Fewer** tokens; the simplest path from the current state; no new semantic layer to author.

### B.6 Risks / trade-offs
- **Weakens the single-source guarantee** for the permitted families: a future desire to vary, say, all overlay radii "by intent" would have no semantic seam to turn (though a foundation-value change still propagates to all consumers).
- **Precedent risk:** sanctioning component→foundation could be over-used if the "no semantic tier" boundary is not rigorously enumerated and governed; the enumerated-family list becomes a governance-critical artifact.
- **Rule complexity:** §A.1 is no longer a clean one-line invariant; onboarding/enforcement must carry the exception list.
- **Upside:** smallest, lowest-risk documentation change; preserves all current tokens, Catalogue, DS, and Bucket-1 analysis unchanged; ratifies what Phase 7 already did.

### B.7 Frozen documentation that would change, if approved
- `Phase-7-Design-Tokens-v0.1.md`: amend the **§A.1 binding rule** and the **Part G intro sentence** ("resolve to semantic tokens only") to state the exception and enumerate the permitted foundation-resolving families. No token rows change.
- `Phase-7-Design-Governance-v0.1.md`: record the exception + the enumerated-family list in the naming/change-control section (so the boundary is governed).
- `Phase-7-Component-Catalogue-v0.1.md`, `Phase-7-Design-System-v0.1.md`: **no change required** (already consistent).

---

## Considerations that cut across both options (neutral)

- **Why §A.1 exists (AP-12 / Tokens Part H):** the three-tier chain buys theme/owner-change propagation *without editing components*. That benefit is **strongest for colour** (dark theme is a live `[SLOT]`) and **weakest for radius/elevation/size** (unlikely to vary by theme). Option A pays a uniform structural cost to preserve a benefit that is thin for the affected families; Option B accepts a conditional rule to avoid that cost. Neither is "more correct" a priori — it depends on how much the owner values a single uniform invariant vs. minimal change.
- **Scope of the fix vs. current work:** Option A invalidates parts of the current Bucket-1 trace table (foundation targets would become semantic) and requires new authoring before materialization; Option B leaves the current audit, trace table, checker structure, and Bucket-1 targets intact.
- **Governance surface:** Option A removes an exception (simpler rule, more tokens); Option B adds an exception (fewer tokens, an enumerated list to govern).
- **The four conflict tokens are identical in both worlds by value** — only their *resolution path* (via a semantic token vs. direct) differs.
- **`card.elevation` note:** it is specified in Part G but not yet materialized in the generator, so it is part of the frozen conflict inventory (4) under either option, independent of implementation state.

---

## What this brief does not do

It does **not** recommend or choose an option, does not edit any frozen Phase 7 document, does not add or re-point any token, does not modify component CSS or the checker, and does not perform Bucket-1/2 remediation. The choice between Option A and Option B — and any consequent frozen-document amendment — is the owner's decision.

*End of owner-decision brief. Stopping for owner review.*
