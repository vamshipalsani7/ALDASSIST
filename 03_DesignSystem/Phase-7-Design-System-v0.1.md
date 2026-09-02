# Phase 7 — Design System

**FROZEN — PHASE 7 BASELINE (v0.1) · 2 SEPTEMBER 2026 · REPOSITORY OWNER (VAMSHI)**

> **Freeze notice — Phase 7 (Design System), 2 September 2026.** This document is part of the Phase 7 baseline, declared **frozen on 2 September 2026 by the repository owner (Vamshi)**; recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-021). Frozen at version v0.1. The owner **approved the Phase 7 visual design proposals** — the **Calm Institutional** direction, **Inter** (UI/body), **IBM Plex Mono** (monospace), **Lucide** (icon set), the semantic **colour system**, the **spacing / grid / layout** system, the **breakpoints**, and the **≥44×44px** touch-target design target — which are now owner-approved design decisions. Every Phase 6 constraint (CR-1…CR-21) and UX principle (UXP-1…UXP-10) is preserved; **DR-01, DR-02 and O-2026-001 remain deferred / open**, all V2 boundaries are unchanged, and all remaining `[SLOT]` / `[LEGAL CONTENT SLOT]` values stay open as specified. As with every frozen document, it is not modified without an explicit architectural decision; where superseded, a historical notice is added rather than the content rewritten. This freeze changes no design substance. *(Supersedes the working-document status noted below.)*

> **Post-freeze status notice — current authority (added after the freeze).** **Phase 7 is FROZEN as of 2 September 2026 under D-2026-021**, and the owner has **approved** every `[P7-PROPOSAL]` brand-defining value (Calm Institutional, Inter, IBM Plex Mono, Lucide, the semantic colour system, spacing/grid/layout, breakpoints, ≥44×44px). Consequently, any wording elsewhere in this document that describes Phase 7 as a *working document*, as *awaiting owner review / approval*, or the `[P7-PROPOSAL]` values as *awaiting owner sign-off* — including the `**Type:** Working document` line below, any STEP-15 stopping-gate language, and the end-of-document footer — reflects the **pre-freeze working state** and is retained for **historical traceability only**, superseded by the freeze notice above and by D-2026-021. No design, token, component, accessibility, traceability, or constraint content is affected by this notice.

**Phase:** 7 — Design System · **Document:** 1 of 4 (Design System)
**Type:** Working document (not frozen). Version v0.1.
**Date:** 2 September 2026
**Owner:** Vamshi (repository owner; final decision-maker)
**Companion documents:** `Phase-7-Design-Tokens-v0.1.md` · `Phase-7-Component-Catalogue-v0.1.md` · `Phase-7-Design-Governance-v0.1.md`

**Frozen baseline (authoritative, unmodified):** Phase 3 PRD · Phase 4 IA · Phase 5 User Flows · Assessment Lifecycle ADR · Decision Log · Architecture Principles · **Phase 6 (WP-1…WP-5, Interaction Pattern Catalogue, Deferred Decision Register), frozen 1 Sep 2026 (D-2026-020); DR-01 and DR-02 explicitly deferred.**

> **Scope.** Phase 7 converts the Phase 6 **information-hierarchy design-system foundations** (WP-4 Part C) into a concrete visual design system: colour, typography, spacing, layout, elevation, iconography, motion, and the visual language. **This is design-system specification only.** No website, no `aldassist.com`, no framework (React/Next/Vue), no frontend code, no components-in-code, no packages, no deployment, no production assets, no UI screens (Phase 8), no build (Phase 9). This document defines *how ALDASSIST looks and how its visual language is systematised*, for a future UI designer/developer to implement.

> **Authority boundary.** Every Phase 6 constraint (WP-5 Part B, CR-1…CR-21) and UX principle (WP-5 Part A, UXP-1…UXP-10) is preserved intact. Phase 7 fills only the visual `[SLOT]`s that Phase 6 left open (WP-4 Part E; WP-5 Part D.1). Phase 7 resolves **no** product, business, permission, or legal decision, and does **not** resolve DR-01 or DR-02.

---

## 0. Governance labels used in this document

Per the Phase 7 brief (STEP 14):

- **[BASELINE]** — a requirement the frozen baseline (Phases 1–6, ADR, Decision Log, Architecture Principles) establishes. Cited. Implemented, never changed.
- **[P7-DESIGN-DECISION]** — a visual / design-system choice authorised by Phase 7 (WP-5 §E.3). It is a design decision, **not** a new product/business/permission/legal decision.
- **[P7-PROPOSAL]** — a specific brand-defining value (an exact hue, a chosen typeface) offered for owner sign-off at the STEP 15 gate. The *system* around it is a [P7-DESIGN-DECISION]; only the concrete value is held as a proposal.
- **[SLOT]** — a value still requiring calibration or testing before it can be fixed (e.g. a confidence-representation scale that depends on AP-08 and measurement design).
- **[LEGAL CONTENT SLOT: Lx]** — text owned by counsel; Phase 7 provides only the container.
- **[OWNER DECISION]** — a matter outside Phase 7 authority (DR-01, DR-02, O-2026-001). Not resolved here.

**Trace vocabulary** as in Phase 6: `[AP-…]` `[P3:…]` `[P4:§…]` `[P5:…]` `[ADR:§…]` `[DL:D-…]` `[IP-nn]` `[CR-nn]` `[UXP-n]` `[WP4:…]`.

**Reading convention.** Concrete numeric values in this document (hex codes, px, ms) are the machine-readable authority of `Phase-7-Design-Tokens-v0.1.md`. This document defines *roles, relationships and rules*; the token document is the single source of the *values*.

---

# PART A — Design-system philosophy (STEP 2.1)

## A.1 The governing sentence

**The visual system is an instrument of trust, not of persuasion.** Everything below is derived from one frozen commitment — *"Calm is the design language"* `[Philosophy §5]` — read together with the brand attributes *honest · precise · calm · technical · warm at the edges* `[Philosophy §5.3]` and the ten Phase 6 UX principles `[WP5 Part A]`. The chosen visual direction, confirmed by the owner, is **Calm Institutional** `[P7-DESIGN-DECISION]`: restrained, document-like, credible; a system that recedes so the Record, the verdict and the deadline can be read clearly.

## A.2 The seven design-system tenets

Each tenet forecloses a class of visual decision — the test of a real principle `[Philosophy §3]`.

1. **Trust over decoration.** No visual treatment exists to impress; it exists to make status, provenance and consequence legible `[AP-Final]`/`[UXP-4]`. *Forecloses:* gradients-for-mood, hero imagery over data, ornamental illustration on decision surfaces.
2. **Calm is quiet.** Generous space, one primary action per screen, low elevation, restrained colour `[Philosophy §5]`/`[UXP-2]`. *Forecloses:* countdown timers, pulsing/looping motion, scarcity or urgency styling, red used to frighten.
3. **The Record is the object.** The visual language treats persistent objects (Invention, Application, Matter) as first-class documents with a consistent object-page skeleton `[P4:§15]`/`[UXP-1]`. *Forecloses:* transaction-first framing, dashboards that bury the object.
4. **Provenance is visible.** The citation affordance is a designed, primary visual element with its own token identity — never a footnote marker `[BR-02]`/`[P4:§15.2]`/`[UXP-4]`. *Forecloses:* superscript `[1]`, hover-only sources, unverified assertions styled as fact.
5. **Status is never a colour alone.** Every state is icon **shape** + text label + colour, together `[AP-14]`/`[P4:§22.3]`/`[CR-4]`. *Forecloses:* colour-only badges, red/green as the sole signal.
6. **Human and AI are distinguishable.** AI-authored and human-authored content carry a consistent structural + typographic distinction, preserved in exports `[P3:§12.3 r5]`/`[UXP-6]`. *Forecloses:* AI output styled identically to a reviewer's released verdict.
7. **One system, two rhythms.** A single design system and vocabulary serve both the **client (calm, plain-language)** and the **agent/ops (operational, term-of-art)** surfaces through density and tone, never by branching into two visual languages `[P5:§12.7]`/`[WP3 §6]`. *Forecloses:* a separate "agent skin"; blended contexts.

## A.3 What "Calm Institutional" means concretely `[P7-DESIGN-DECISION]`

- A **cool neutral grey** foundation with a slight blue undertone — reads as precise and document-like.
- A **single confident primary** (a deep ink-blue) reserved for the one primary action, links, focus and selection — used sparingly so it always means "act here."
- **Semantic status colours used at low saturation**, always paired with an icon shape and a text label; red is reserved for genuine risk and is calm, not alarmist `[Philosophy §5]`.
- A **dedicated provenance/evidence hue** (a muted slate-teal), distinct from the primary and from every status colour, so "verifiable source" has a visual identity of its own `[UXP-4]`.
- A **neutral, highly legible sans-serif** for the interface, a **monospace** for identifiers and computed data, generous line-height on reading surfaces.
- **Low elevation, modest radii, hairline borders** — structure over float.

---

# PART B — The ALDASSIST-specific visual language (STEP 3)

> This is what makes the system recognisably ALDASSIST rather than a generic SaaS kit. Each trust-critical concept from Phase 6 is given a **fixed visual treatment**. These treatments are `[P7-DESIGN-DECISION]`s whose *rules* are binding; specific values live in the tokens document and the component catalogue.

## B.1 The two-axis status system (the product's signature) `[BASELINE: AP-14/CR-4]`

Every significant object shows **two independent axes, always together, never merged** `[P4:§11.1]`:

- **Lifecycle axis** — where the object stands. Rendered as a **labelled state chip** using the object's own taxonomy (never invented) `[P4:§11.2–11.6]`.
- **Attention axis** — whether it needs the user. Rendered as a distinct **attention marker** with three fixed values: **On track · Action needed · At risk** `[P4:§11.1]`.

**Visual rules `[P7-DESIGN-DECISION]`:**
- The two axes are visually **separated** (distinct components, distinct positions in the object header) so they can never read as one merged status.
- Each carries **icon shape + text + colour**; colour is confirmatory, never sole `[CR-4]`.
- Attention markers use **shape and weight**, not colour, as the primary signal: *On track* = quiet (a calm neutral/positive dot, low weight); *Action needed* = a filled attention marker (a dot/flag) in the accent role; *At risk* = a triangle-alert form in the danger role. A monochrome rendering must still distinguish all three.
- **"Closed" never renders without its reason** appended `[P4:§11.3]`/`[CR-4]`.
- Neither axis is ever truncated or collapsed at any breakpoint `[WP4 B.3/B.4]`.

## B.2 Whose-turn presentation (the anti-silence backbone) `[BASELINE: IP-12/UXP-3]`

Every waiting state names **who is acting and roughly when** `[P5:principle 4]`. The visual language gives "whose turn" a consistent surface:

- A **whose-turn line** pairs the attention marker with a plain-language actor label — *"With the reviewer,"* *"Awaiting the office,"* *"Needs you,"* *"Nothing needed"* `[P4:§11.4/§18.1]`.
- On Home the split **Needs you** vs **Waiting on others** is expressed as two visually distinct regions `[P4:§18.1]`.
- Where an estimate exists it is shown quietly (secondary text), **never as a countdown** `[UXP-2]`. The estimate value itself is a `[SLOT]` from the Rules Engine / ADR §9 — the component renders it, Phase 7 does not set it.

## B.3 The three-depth disclosure surface `[BASELINE: §16/UXP-5]`

Conclusion first, reasoning one interaction away, evidence two — **identical across every object type** (Assessment, Deadline, Cost, Agent recommendation) `[P4:§16]`. The visual language:

- **Depth 1 (State)** is always visible on load, set in the reading-optimised type role, general-audience readable `[P4:§22.4]`.
- **Depth 2 (Reasoning)** and **Depth 3 (Evidence)** are progressive-disclosure regions with a consistent expand affordance and a consistent visual "you are at depth N" cue.
- Depth 3 is **never removed, only nested** `[§16]`. On an **unfavourable** verdict the coverage statement (depth 3) is **never collapsed by default** — a fixed exception in the disclosure component `[P4:§15.2]`/`[CR-6]`.
- Term-of-art density is permitted to rise at depths 2–3 `[P4:§22.4]`.

## B.4 Provenance & evidence presentation (the trust anchor) `[BASELINE: BR-02/UXP-4]`

- The **citation affordance** is a **primary, first-class visual element** with its own dedicated token colour (the provenance slate-teal) and a persistent, tappable form — **never a superscript footnote marker** `[P4:§15.2]`.
- Activating it opens the **exact cited passage** in the source (a citation/evidence panel — see the component catalogue) `[BR-02]`.
- Citation links carry **descriptive accessible names** ("Cited passage in US 9,876,543, ¶42"), never "[1]" `[P4:§22.3]`.
- **Fail-safe (IP-08):** an assertion whose citation cannot resolve is **not shown as verified** — it is withheld or marked unverifiable with a distinct, non-status treatment (a muted "unverified" mark + text), never styled as established fact `[AP-04]`/`[CR-6]`. This is absolute.
- **Source freshness** on external data (register, office) is shown as a per-field freshness stamp, and stale data is rendered with cached-value + staleness treatment, **never as an error page** `[NFR-A05]`/`[IP-18]`.

## B.5 AI-authored vs human-authored distinction `[BASELINE: P3:§12.3 r5/UXP-6]`

A structural + typographic convention, not colour-only, preserved in exports:

- **AI-authored content** (analysis text, plain-language summaries) carries a consistent **"AI-generated" label** and a subtle structural marker (a neutral left rule / container treatment). It is neutral, not status-coloured.
- **Human-authored / reviewer-released content** (the released verdict, reviewer notes) carries a **reviewer attribution** ("Reviewed and released by [name], [date]") and the **human-review indicator** (B.6). The released verdict is visually the authoritative layer over the AI draft `[P5:§8-C]`.
- The distinction survives export/print `[P3:§12.3 r5]`.

## B.6 Human-review indicator `[BASELINE: BR-01/CR-2/UXP-6]`

A dedicated visual mark asserting the mandatory review gate was met:

- A **reviewed-and-released seal/indicator** naming the Verified Agent reviewer and release date, in a calm "verified" treatment (uses the reviewed/success-quiet role, with a seal or person-check icon shape) `[FR-A07/BR-01]`.
- It appears **only** on *Released* assessments; a pre-release (*In review*) state shows the lifecycle state + whose-turn + expected turnaround, **never a partial or unreviewed verdict** `[BR-01]`/`[IP-05]`.
- It is not a decorative "trust badge"; it is the visual proof of BR-01.

## B.7 Assessment-confidence presentation `[BASELINE basis: AP-08/§12.3.4] · [SLOT: representation scale]`

- Confidence is shown **with its basis**, never as a bare number and **never by colour alone** `[P4:§22.3]`/`[AP-08]`.
- The **scale/threshold representation is a `[SLOT]`** — the baseline requires the basis but does not define the scale `[WP3 S-2]`. Phase 7 specifies the *presentation contract* (a labelled confidence element that always states its basis, rendered as text + a non-colour-only visual, distinct from status colours so confidence is never mistaken for a verdict), and leaves the concrete scale to calibration `[SLOT]`.
- **No visual treatment may make an AI confidence reading look like a legal determination** `[Phase 7 brief STEP 3]`/`[AP-05]`. Confidence uses a neutral, measured visual, never the authoritative reviewer-released treatment.

## B.8 Lifecycle-state presentation across object types `[BASELINE: P4:§11]`

Each object type has a fixed set of state chips drawn from its taxonomy — **no invented states** `[P5:X8]`:

- **Invention:** Drafting · Recorded · Assessing · Assessed · Filing · Protected · Not pursued · Lapsed `[P4:§11.2]`.
- **Assessment:** Requested · Analysing · In review · Released · (Decided) `[ADR:§4]`.
- **Application:** Filed · Published · Awaiting examination · Under examination · Responding · Granted · Closed(+reason) `[P4:§11.3]`.
- **Matter:** Quoted · Engaged · In progress · Awaiting you · Awaiting the office · Complete · Closed `[P4:§11.4]`.
- **Deadline:** Upcoming · Approaching · Due · Confirmed · Met · Missed · Superseded · Not applicable `[P4:§11.5]`.

The **state-chip component** (catalogue) maps each state to a semantic role + icon shape. *Not pursued* and *Lapsed* are dignified, complete states — **never greyed-out husks** `[P4:§15.1]`/`[UXP-1/UXP-7]`.

## B.9 Deadline & deadline-safety presentation `[BASELINE: AP-07/BR-03/CR-13]`

- Criticality is **icon shape + text + colour, never colour-only** `[P4:§22.3]`.
- A **critical deadline requires human confirmation** before advance; the confirmation affordance is a deliberate, labelled action (agent/ops only), and confirmation moves the chip to *Confirmed* `[BR-03]`.
- The **computation trace** (rule ID, version, statutory citation, calendar adjustment, extensions) is reachable at depth 3 `[BR-13]`.
- **No countdown timers**; approaching/due are shown by state and quiet emphasis, not by a ticking clock `[UXP-2]`.
- A **miss is never silent** — the *Missed* state is prominent, client-first, with options `[NFR-C01]`/`[IP-13]`.

## B.10 Silence / waiting presentation (the signature emotional surface) `[BASELINE: IP-14/UXP-2]`

The **silence view** replaces an empty timeline during quiet periods `[P4:§19.4]`:

- Calm, reassuring layout: *"Nothing has happened — and that's expected,"* the last known event with source/freshness, an honest expected-next-event range (`[SLOT]` from Rules Engine), an explicit *"nothing is required from you,"* *"we're monitoring daily,"* and two explainer links.
- Uses generous space and the calm neutral palette; **no urgency, no blank screen** `[P4:IA-9]`.

## B.11 Not-pursued / terminal-state presentation `[BASELINE: UXP-7/P4:§15.1]`

- A terminal state is a **complete, dignified page**, not a degraded one; forward actions (re-assess, proceed later) remain at full visual weight `[P5:F10]`.
- On an unfavourable verdict the **four alternatives** (design around · trade secret · defensive publication · defer & re-assess) are shown at **equal visual weight** — options, not consolation `[P4:§11.6]`/`[UXP-7]`.

## B.12 Responding (status-only) presentation `[BASELINE: D-2026-016/CR-17]`

- The *Responding* state shows status + the examination-response deadline + honest copy that the agent handles drafting/prosecution **off-platform** + an upload affordance for the filed response `[IP-20]`.
- **No prosecution-workspace visual affordances** — no authoring surface, no draft editor `[CR-17]`. The visual language must not drift toward prosecution tooling (V2).

## B.13 Cross-tenant invisibility presentation `[BASELINE: IP-16/CR-5]`

- An object outside the actor's tenancy or grant renders as a **uniform 404 "does not exist"** — no stub, no count, no locked placeholder `[P4:IA-5]`. A single 404 pattern is reused everywhere so no surface leaks existence.
- Distinct from **same-tenancy permission-denied** (IP-15), which is **visible-but-locked** with a reason and who to ask — never a silent escalation `[P5:X13]`/`[CR-12]`.

## B.14 Pricing presentation `[BASELINE: IP-21/CR-15] · [OWNER DECISION: O-2026-001 stays OPEN]`

- All money renders through **one `PriceDisplay` component**, in one of **two configured modes** — component (Platform · Professional · Official, separately identified) or bundled `[P4:§21.1]`. Both modes are designed; switching modes changes **only rendering**, never route/template/nav/hierarchy `[L1 Register §3]`.
- **Official fees are always separately identifiable** at depth 1 or 2, in both modes, and derive from the Rules Engine `[BR-14]`.
- Each component carries a jurisdiction/entity-type basis and a **disclosure content slot** = `[LEGAL CONTENT SLOT: L1]`.
- Phase 7 **does not close O-2026-001** and designs no per-screen price logic.

## B.15 Client-calm vs agent-operational rhythm `[BASELINE: P5:§12.7/WP3 §6]`

One system, expressed through **density and tone**, never two visual languages:

| Dimension | Client rhythm | Agent / Ops rhythm |
|---|---|---|
| Density | **Comfortable** (default) — generous spacing | **Compact** permitted (docket, queues, ops tables) |
| Language | Plain-language leads; term-of-art bound in the same view `[P4:§10.1]` | Professional term-of-art (FR/docket) `[P4:§10.2]` |
| Emotional job | Calm, anti-anxiety (silence view, whose-turn) | Operational throughput (Today, docket, review queue) |
| Colour temperature | Same palette; more whitespace | Same palette; denser tables, same tokens |

The two never merge; a multi-role actor switches via the **context switcher** (IP-22), one context at a time `[P4:§2.3]`.

---

# PART C — Visual hierarchy (STEP 2.2)

## C.1 The hierarchy of emphasis `[P7-DESIGN-DECISION]`

Emphasis is achieved, in priority order, by: **(1) placement & space → (2) type size/weight → (3) the one accent (primary) → (4) status colour (with icon+text) → (5) elevation.** Colour is late in the order deliberately — the system reads correctly in monochrome, which is what makes it accessible and calm `[UXP-2]`/`[P4:§22.3]`.

## C.2 The object-page skeleton (inherited by every object screen) `[BASELINE: P4:§15]`

Fixed vertical order:

```
Identity  (title · domain · key dates · IDs)
   ↓
Status pair  (Lifecycle chip  |  Attention marker)      ← always both, never merged [AP-14]
   ↓
Single next action  (one primary; "Nothing needed" is valid)   [P4:IA-2/§18.1]
   ↓
Tabs  (object sections; ≤2 nav levels)                  [P4:IA-6]
   ↓
Section content   +   Relationship rail  (related objects, one click away)  [P4:§12.5]
```

## C.3 One primary action per screen `[BASELINE: P4:IA-2/§18.1]`

Exactly one primary button per screen — the single next action. All else is secondary/tertiary/quiet. "Nothing needed" is a valid, calm resolution of the next-action slot `[P4:§15.4]`. Destructive actions are isolated `[P4:§14.2]`.

---

# PART D — Typography system (STEPS 2.3, 2.4, 2.5, 5)

> WP-4 C.1 rule: *"Do not over-design typography."* One UI family + one monospace, a modest role set, a calm scale. ALDASSIST type should read as **precise, calm, credible, professional, human, technical without being intimidating** `[Phase 7 brief STEP 5]`.

## D.1 Font-family direction `[P7-DESIGN-DECISION for roles] · [P7-PROPOSAL for the specific families]`

- **UI / body family — neutral sans-serif.** [P7-PROPOSAL] **Inter** — a neutral, highly legible neo-grotesque sans-serif. Rationale: exceptional legibility at small sizes for dense agent tables *and* at reading sizes for long-form verdicts; neutral, credible, calm.
- **Monospace family — identifiers & computed data.** [P7-PROPOSAL] **IBM Plex Mono**. Used for application numbers, rule IDs, citations, and tabular figures — the "monospace (identifiers)" role WP-4 C.1 requires.
- **Display** uses the UI family at large size/weight — no separate display face `[P7-DESIGN-DECISION]`.
- **No decorative or brand-bespoke typeface** is introduced; calm reads as restraint `[Philosophy §5]`.

## D.2 Fallback strategy `[P7-DESIGN-DECISION]`

Every face declares a resilient stack ending in the platform default, so the system degrades gracefully if a web font fails to load:
- Sans: `Inter, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
- Mono: `"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace`.
Tabular figures (`font-variant-numeric: tabular-nums`) are on for all data, deadlines, prices and identifiers so columns align `[P7-DESIGN-DECISION]`.

## D.3 Text hierarchy — roles `[BASELINE roles: WP4 C.1/P4:§22.2] · [P7-DESIGN-DECISION scale]`

Roles, not sizes, are the contract. **Headings describe content, not styling; no level skipping; exactly one `h1` per page** `[P4:§22.2]`.

| Role | Use | Element |
|---|---|---|
| **Display** | Public hero only (rare) | — |
| **Page/Object title** | The object's identity or page title; one per page | `h1` |
| **Section** | Major section within a page | `h2` |
| **Subsection** | Subsection | `h3` |
| **Minor heading** | Group label inside a section | `h4` |
| **Body-reading** | Long-form verdict/depth-1 reading (general-audience readable) | `p` |
| **Body** | Default UI body | `p` |
| **Body-secondary** | Supporting/secondary text | `p`/`span` |
| **Label** | Form labels, control labels (always visible) | `label` |
| **Caption / metadata** | Timestamps, dates, counts, source/freshness | `span` |
| **Data / numeric** | Application numbers, prices, deadlines, IDs (monospace, tabular) | `span`/`code` |
| **Legal / disclaimer** | Legal and disclosure text | `p`/`small` |
| **Provenance citation** | Citation affordance text (primary element) | `a`/`button` |

## D.4 Type scale `[P7-DESIGN-DECISION]`

A calm modular scale on a **16px (1rem) base**, with generous line-height on reading roles. Concrete sizes/line-heights/weights are in the tokens document (`type.*`). Guiding relationships:

- Depth-1 verdict/reading content uses the **Body-reading** role (≈18px / 1.6 line-height) for general-audience readability `[P4:§22.4]`.
- Body default ≈16px / 1.6. Secondary ≈14px. Caption ≈13px. Legal ≈12px (never below 12px for legal, for legibility).
- Titles use weight 600; body 400; labels 500. No ultra-light or ultra-bold weights (calm, not fashion) `[P7-DESIGN-DECISION]`.
- Line length on reading surfaces is capped to a comfortable measure (≈66–75 characters) via the container system (Part F) `[P7-DESIGN-DECISION]`.

## D.5 Typographic rules bound to the baseline

- **AI vs human distinction** is partly typographic (B.5): AI-authored blocks may carry a distinct structural container; reviewer-released content carries attribution `[P3:§12.3 r5]`.
- **Dual-register:** plain-language term leads, term-of-art bound in the same view, once, on first use `[P4:§10.1]`. The type system supports an inline "term-of-art" treatment (e.g. the parenthetical/secondary style) `[P7-DESIGN-DECISION]`.
- **Banned language** never appears in type specimens or placeholder copy: no "success rate," "guaranteed," "instant/in seconds," "affordable/cheap," "AI-powered" as a standalone claim, "simply/just/easy" `[P4:§10.3]`.

---

# PART E — Colour system (STEP 4 summary; full spec in Part-4 tokens & STEP 4 doc section)

> The complete semantic colour system — every role with purpose, allowed/forbidden usage, contrast requirement, and whether it may appear alone — is specified in **`Phase-7-Design-Tokens-v0.1.md` Part C (Colour)**. This section states the *architecture and the binding rules*; the tokens document holds the *values and the per-role usage table* required by STEP 4.

## E.1 Palette architecture `[P7-DESIGN-DECISION]`

- **Neutral scale** (12 steps, cool grey with a slight blue undertone) — the foundation: surfaces, borders, text.
- **Primary** (deep ink-blue, ~6 steps) — the single accent: primary action, links, focus, selection.
- **Secondary / provenance** (muted slate-teal) — provenance/evidence identity and rare supportive accents; deliberately distinct from primary and from all status colours.
- **Status families** (Success, Warning, Danger, Info), each a small ramp at low saturation.
- **Attention roles** (On track / Action needed / At risk) — semantic roles that *reference* the status/neutral ramps but are named for the attention axis so components bind to intent, not to a raw hue.

## E.2 The binding colour rule `[BASELINE: CR-4/P4:§22.3]`

**Status must never depend on colour alone.** Every status/attention/deadline signal is **icon shape + text label + colour**, and every such colour meets the contrast requirement for its use. A colour may appear "alone" only for non-semantic surface/decoration; any colour carrying meaning must have text/icon reinforcement. This rule is enforced at the token level (semantic status tokens are always consumed by components that also render an icon shape and a label).

## E.3 Contrast `[BASELINE: NFR-X01/WCAG 2.2 AA]`

- Body text and essential UI text meet **≥4.5:1**; large text and the essential non-text elements that must carry meaning — **status icons and the focus indicator** — meet **≥3:1** `[P4:§22]`. Neutral divider lines and resting card/input borders are **decorative** (a control is identified by its label, fill and focus indicator, not by a neutral hairline), so they are not held to the 3:1 non-text threshold; where a resting control boundary is a control's *only* identifier, meeting ≥3:1 is a **Phase-8 verification requirement**. Exact per-pair ratios are recorded in the tokens document and are a **verification gate** for Phase 8, not a new compliance claim beyond the baseline's WCAG 2.2 AA `[WP4 Part D]`.

---

# PART F — Spacing, layout, grid & containers (STEPS 2.6, 2.7, 2.8)

## F.1 Spacing system `[P7-DESIGN-DECISION]`

- A **single 4px base** spacing scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96), consumed only through named tokens (`space.*`).
- **Generous space is part of the calm design language** `[Philosophy §5]`/`[WP4 C.2]`: related items grouped by proximity; the one primary action given breathing room; **no dense "urgency" packing** on client surfaces.
- Two **density modes** (F.4) select the applicable rhythm.

## F.2 Layout / grid `[P7-DESIGN-DECISION]`

- A **12-column responsive grid** with token-defined gutters (wider on desktop, tighter on smaller tiers).
- **Maximum two navigation levels** `[P4:IA-6]`.
- Screen types map to the frozen template set **AT-1…AT-9 / PT-1…PT-12** `[P4:§14]`: index, object-detail, guided-flow, two-pane, calendar, report, console. The grid + container tokens realise these templates without redesigning the IA.

## F.3 Containers & content widths `[P7-DESIGN-DECISION]`

- **Reading container** (verdict long-form, guides): capped to a comfortable measure (~720px / ~66–75ch) for readability.
- **App container** (object pages, indexes): a standard max width (~1200px) with the relationship rail.
- **Wide container** (ops consoles, dense docket tables): a wider max (~1440px) with internal horizontal scroll rather than page-level horizontal scroll `[WP4 B.3]`.
- The **object-page skeleton** (C.2) is the canonical composition inside the app container.

## F.4 Data density `[P7-DESIGN-DECISION]` — realises B.15

Two density modes, both from the same tokens:
- **Comfortable** (default; all client surfaces) — larger row heights, more padding.
- **Compact** (agent docket, review queue, ops consoles) — reduced row heights and padding for operational scanning, **without** truncating the status pair or hiding anything critical `[WP4 B.4]`.
Density is a surface-level setting, not a per-user preference in MVP `[P7-DESIGN-DECISION]`; the client rhythm is always comfortable.

---

# PART G — Border, radius & elevation (STEP 2.9)

## G.1 Principles `[P7-DESIGN-DECISION]`

- **Structure over float.** Calm Institutional prefers hairline borders and low, soft elevation to heavy shadows.
- **Radius** is modest: none (0) for structural dividers; small (4px) for inputs/chips; medium (8px) for cards/buttons; large (12px) for modals/sheets; full for pills/avatars. No playful large radii.
- **Borders**: a hairline (subtle) and a default border from the neutral ramp; a stronger border for emphasis and for the compact tables where separation must carry more of the load.
- **Elevation** is a small, ordered set (0–4): flat/border-only → card-on-scroll → dropdown/popover → modal/drawer → toast. Shadows are soft and low-contrast; **no elevation is used to create urgency**. Values in the tokens document (`elevation.*`).

---

# PART H — Iconography (STEP 2.10)

## H.1 Principles `[P7-DESIGN-DECISION]`

- **One line/stroke icon set**, consistent stroke width, on a 24px base grid, geometric and neutral to match the type — `[P7-PROPOSAL]` **Lucide** (an open line-icon set in this style). No set is imported or coded here; the *principles and the shape-mapping* are the deliverable.
- **Icons never carry meaning by themselves.** Status/attention/deadline icons always accompany a text label `[CR-4]`.
- **Distinct shapes for distinct meanings**, so signals survive greyscale and colour-blindness: check (success/met), triangle-alert (at risk/warning), octagon or circle-slash (error/blocked), circle-i (info), clock (approaching/waiting), dot (on track/neutral), seal/person-check (human-reviewed), quote/link (provenance citation), lock (permission-denied same-tenancy).
- **Icon-only buttons** must carry an accessible name and a tooltip; nothing rights-affecting is icon-only without a label `[P4:§20.2]`/`[P3:§7.5]`.

---

# PART I — States: interactive, focus, disabled, read-only (STEPS 2.18, 2.19, 2.20)

## I.1 Interactive-state set `[P7-DESIGN-DECISION]`

Every interactive element defines: **default · hover · active/pressed · focus-visible · disabled · selected · read-only**. Each is a token-driven treatment (see `state.*` tokens). Loading is handled per-component (Part J).

## I.2 Focus `[BASELINE: P4:§22.3]`

- A **visible focus ring** (2px primary + 2px offset) on every interactive element; focus is **never suppressed**.
- Focus order follows visual order; focus is managed explicitly on route change and on modal/sheet open/close `[P4:§22.3]`.
- Nothing critical exists only in a hover state `[P3:§7.5]`.

## I.3 Disabled vs read-only (a required distinction) `[BASELINE: WP4 Part D]`

- **Disabled** — a control that cannot currently be used; suppressed treatment; **must convey why** (a reason nearby or on focus), never a silent dead control. Used, e.g., for a *Critical* notification's mute control (disabled with an explanation) `[P4:§18.2]`.
- **Read-only** — a value shown as **text**, not as a greyed control; used for values the current role may see but not edit, and for the read-only Disclosure view when another member holds the edit session (IP-03). Read-only and disabled are **visually distinct** so a user never confuses "not yours to edit" with "temporarily off."

---

# PART J — Loading, empty & error states (STEPS 2.42–2.46 summary; details in the catalogue)

These are specified fully as components in `Phase-7-Component-Catalogue-v0.1.md` (Feedback group and High-Stakes patterns). The visual-language rules:

- **Loading** — skeletons that preserve the eventual layout; the section's most decision-relevant region (e.g. *Needs you*, verdict depth 1) loads first `[WP2 loading fields]`. No spinner-only full-screen blocks on primary surfaces. Async assessment shows **staged waiting** (Analysing → In review) with whose-turn, never a false "almost done" `[IP-05]`.
- **Empty** — every empty state **teaches one thing and offers one action** `[P4:§19.1]`; honest, calm copy (e.g. review queue empty = "no items in your domains right now," not urgency) `[WP4 A.1]`.
- **Error** — plain-language, associated programmatically, inline, with a reason and a next step `[P4:§22.3]`. External-source failure degrades to cached + staleness, never an error page `[NFR-A05]`.
- **Permission-denied (same tenancy)** — visible-but-locked with reason + who to ask (IP-15) `[CR-12]`.
- **Cross-tenant 404** — uniform "does not exist" (IP-16) `[CR-5]`.

---

# PART K — Notification & alert presentation (STEPS 2.16, 2.17, 2.47)

`[BASELINE: P3:§16.2/16.3 · P4:§18.2]`

- **Five fixed classes, grouped by class (not chronology):** Critical · Action required · Progress · Informational · Proactive-reassurance `[P4:§18.2]`.
- **Severity is shown by shape + label + colour**, never colour-only. Critical is calm-but-unmistakable; **no fake urgency** `[UXP-2]`.
- **Critical cannot be muted and cannot be dismissed without acknowledgement/action** — the mute control renders **disabled with an explanation** (I.3) `[P4:§18.2]`.
- **Success / warning / error / info semantics** (STEP 2.17) map to the status roles (Part E); each has a defined inline-alert and toast treatment in the catalogue.
- **Proactive-reassurance** notifications carry silence-view content and fire even when nothing happened `[P3:§16.3]`.

---

# PART L — Accessibility (STEP 9)

> The baseline already establishes **WCAG 2.2 AA** `[P3:NFR-X01/P4:§22]`. Phase 7 supports that level and **introduces no new compliance claim** `[WP4 Part D]`. Accessibility tokens/patterns:

- **Contrast** — text and essential UI text meet **≥4.5:1**; essential non-text elements that must carry meaning (status icons, the focus indicator) meet **≥3:1**; **decorative divider and resting card/input borders are not held to 3:1** (a control is identified by its label, fill and focus indicator), with ≥3:1 required only where a resting boundary is a control's sole identifier — a **Phase-8 verification requirement** (Part E.3). Ratios are recorded per-pair in the tokens document (Part I) as a Phase-8 verification gate; no new compliance claim beyond the baseline WCAG 2.2 AA.
- **Focus** — visible 2px+offset ring, never suppressed; managed on route/modal change (Part I.2) `[P4:§22.3]`.
- **Keyboard** — every interactive element reachable; focus order = visual order; nothing critical hover-only `[P3:§7.5]`.
- **Text resizing** — rem-based type and spacing; layouts reflow to 200% zoom without loss of content or function `[P7-DESIGN-DECISION, AA]`.
- **Reduced motion** — a reduced-motion token set removes non-essential motion; **no essential information conveyed by animation alone** `[P4:§22.3]`.
- **Status not by colour alone** — enforced by icon-shape + text (Parts B.1, E.2, H) `[P4:§22.3]`.
- **Error communication** — programmatically associated, inline, plain language (Part J) `[P4:§22.3]`.
- **Disabled vs read-only** distinct and both conveyed non-visually (Part I.3).
- **Touch targets** — a minimum touch-target size token; the **proposed ALDASSIST design target is ≥44×44px** [P7-PROPOSAL] — exact value in tokens `[WP4 W4-6]`.
- **Screen-reader semantics** — landmarks (banner/nav/main/complementary/contentinfo), one `h1`, no level skipping, skip links to main / primary nav / action queue; live-region announcements for status changes and save state `[P4:§22.1/§22.2/§22.3]`.
- **Descriptive citation names** and **real table semantics** (headers/scope) `[P4:§22.3]`.

---

# PART M — Responsive system (STEP 10)

> Phase 6 defined responsive behaviour (WP-4 Part B); Phase 7 converts it into design-system rules with token-backed breakpoints. **Native mobile is V2** — this is responsive web only `[P5:§10]`/`[TA-10]`.

## M.1 Breakpoint strategy `[P7-DESIGN-DECISION]` — fills `[SLOT W4-1]`

Four token breakpoints (values in `breakpoint.*`): **mobile** (<640) · **tablet** (640–1023) · **desktop** (≥1024) · **wide** (≥1440). Tiers are defined by behaviour, not device `[WP4 B.1]`.

## M.2 Container & grid behaviour `[BASELINE: WP4 B.0/B.3]`

Containers narrow by tier; the 12-column grid collapses to fewer columns; **wide content (tables, diagrams) scrolls within its own container**, never the page body `[WP4 B.3]`.

## M.3 Typography & spacing scaling `[P7-DESIGN-DECISION]`

Type scales down modestly at smaller tiers (titles reduce; body stays ≥16px for readability); spacing steps reduce one notch on mobile while preserving grouping. The **status pair is never truncated** at any tier `[WP4 B.3/AP-14]`.

## M.4 Per-pattern transformation (from WP-4 B.3, carried as design-system rules) `[BASELINE]`

| Pattern | Mobile behaviour |
|---|---|
| Global navigation | Bottom bar (4 highest-frequency destinations) + overflow sheet; **never hamburger-only for primary** |
| Object-detail tabs | Horizontal scroll, active tab always visible; **never a dropdown** |
| Status pair | Always visible; never truncated/collapsed |
| Next action | Sticky footer |
| Dense tables (docket, ops, indexes) | Card list; promote the two most decision-relevant fields |
| Filter rails | Bottom sheet; applied filters as removable chips above results |
| Matter workspace header (4 cells) | Stacked, all four retained (Cost cell via PriceDisplay) |
| Verdict / three-depth | Depth 1 full-width; depths expand; **citation stays a primary tap target; coverage never behind hover** |
| Provenance / citation | Tap opens the passage in a full-screen sheet; back returns to the assertion |
| Review workspace (two-pane) | Stack with a pane switcher; **source pane always accessible, never removed** |
| Forms / guided capture | One question group per step; labels always visible; save-and-resume across devices |
| Timelines | Condensed vertical; source/freshness retained per entry |
| Deadlines / calendar | List-first; criticality icon+text+colour; confirm reachable (agent) |
| Notifications | Class order preserved; Critical acknowledgement gate intact |
| Drawers / modals | Full-screen sheet; focus trapped; explicit close; destructive actions isolated |

---

# PART N — Design slots surfaced/filled in this document

| Slot | Status in Phase 7 | Authority |
|---|---|---|
| Breakpoint pixel widths (W4-1) | **Filled** as `[P7-DESIGN-DECISION]` (M.1) | Phase-6 left open |
| Type scale / sizes / line-height (W4-2) | **Filled** `[P7-DESIGN-DECISION]`; font family `[P7-PROPOSAL]` | visual design |
| Spacing base & scale (W4-3) | **Filled** `[P7-DESIGN-DECISION]` (F.1) | visual design |
| Grid / gutters / max-width (W4-4) | **Filled** `[P7-DESIGN-DECISION]` (F.2/F.3) | visual design |
| Colour values & icon set (W4-5) | **Filled** `[P7-DESIGN-DECISION]` roles; specific hues/icon set `[P7-PROPOSAL]` | no brand previously chosen |
| Touch-target size (W4-6) | **Filled** `[P7-PROPOSAL: ≥44px]` (Part L) | visual design |
| Confidence & agent-stat representation (W4-14) | **Contract defined; scale remains `[SLOT]`** (B.7) | AP-08 / D-2026-019 |
| L1 pricing rendering & disclosure wording (W4-11) | **Component contract designed; O-2026-001 stays OPEN; wording `[LEGAL CONTENT SLOT: L1]`** | O-2026-001 / L1 |
| L6 access-revocation window (W4-12) | **Untouched `[LEGAL/OWNER]`** | Phase 3 §26.1 L6 |
| Committed turnaround, ladder timings, channel defaults, idle timeout (W4-8/9/10/13) | **Untouched `[SLOT]` — component renders, value not set** | Rules Engine / ADR §9 / §16.2 |

---

*End of Phase 7 — Design System (Document 1 of 4), v0.1. WORKING DOCUMENT — owner review required. No UI, framework, code, hosting, or `aldassist.com` work is performed or authorised by this document.*
