# Phase 7 — Component Catalogue

**FROZEN — PHASE 7 BASELINE (v0.1) · 2 SEPTEMBER 2026 · REPOSITORY OWNER (VAMSHI)**

> **Freeze notice — Phase 7 (Design System), 2 September 2026.** This document is part of the Phase 7 baseline, declared **frozen on 2 September 2026 by the repository owner (Vamshi)**; recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-021). Frozen at version v0.1. The owner **approved the Phase 7 visual design proposals** — the **Calm Institutional** direction, **Inter** (UI/body), **IBM Plex Mono** (monospace), **Lucide** (icon set), the semantic **colour system**, the **spacing / grid / layout** system, the **breakpoints**, and the **≥44×44px** touch-target design target — which are now owner-approved design decisions. Every Phase 6 constraint (CR-1…CR-21) and UX principle (UXP-1…UXP-10) is preserved; **DR-01, DR-02 and O-2026-001 remain deferred / open**, all V2 boundaries are unchanged, and all remaining `[SLOT]` / `[LEGAL CONTENT SLOT]` values stay open as specified. As with every frozen document, it is not modified without an explicit architectural decision; where superseded, a historical notice is added rather than the content rewritten. This freeze changes no design substance. *(Supersedes the working-document status noted below.)*

> **Post-freeze status notice — current authority (added after the freeze).** **Phase 7 is FROZEN as of 2 September 2026 under D-2026-021**, and the owner has **approved** every `[P7-PROPOSAL]` brand-defining value (Calm Institutional, Inter, IBM Plex Mono, Lucide, the semantic colour system, spacing/grid/layout, breakpoints, ≥44×44px). Consequently, any wording elsewhere in this document that describes Phase 7 as a *working document*, as *awaiting owner review / approval*, or the `[P7-PROPOSAL]` values as *awaiting owner sign-off* — including the `**Type:** Working document` line below and the end-of-document footer — reflects the **pre-freeze working state** and is retained for **historical traceability only**, superseded by the freeze notice above and by D-2026-021. No component anatomy, behaviour, accessibility, responsive, or traceability content is affected by this notice.

**Phase:** 7 — Design System · **Document:** 3 of 4 (Component Catalogue)
**Type:** Working document (not frozen). Version v0.1.
**Date:** 2 September 2026
**Owner:** Vamshi
**Companion documents:** `Phase-7-Design-System-v0.1.md` · `Phase-7-Design-Tokens-v0.1.md` · `Phase-7-Design-Governance-v0.1.md`

> **Scope.** A **design-system component specification** — anatomy, variants, states, rules and traceability for each component. **Not** components-in-code, not a framework choice, not UI screens (Phase 8), not a build (Phase 9). Every component consumes **component tokens → semantic tokens** (never raw values) per `Phase-7-Design-Tokens-v0.1.md`.

> **Per-component fields (STEP 6):** Purpose · Anatomy · Variants · States · Content rules · Interaction rules · Accessibility · Responsive · Do-not-use · Phase-6 traceability. High-stakes components (STEP 7) additionally state how they earn trust without inventing certainty.

> **Governance labels:** component *behaviour* is almost entirely **[BASELINE]** (Phase 6 defined it); component *visual treatment* is **[P7-DESIGN-DECISION]**; unset values remain **[SLOT]** / **[LEGAL CONTENT SLOT]**. No product/permission/legal decision is made here; **DR-01/DR-02 stay agnostic**.

**Trace vocabulary** as in the companion documents.

---

## Catalogue index

- **1. Navigation** — Header · Sidebar · Context switcher · Breadcrumbs · Tabs
- **2. Actions** — Primary button · Secondary button · Tertiary action · Destructive action · Icon button
- **3. Data** — Table · Data row · Card · Stat · Metadata block · Timeline · Activity/event row
- **4. Trust** — Provenance citation · Evidence block · Human-review indicator · Confidence indicator · Source-freshness indicator
- **5. Status** — Lifecycle state chip · Attention marker · Whose-turn indicator · Deadline indicator · Notification status · Matter status
- **6. Forms** — Text input · Textarea · Select · Checkbox · Radio · File upload · Search · Stepper · Validation
- **7. Feedback** — Alert · Inline validation · Toast · Empty state · Loading skeleton · Error state · Permission-denied · Cross-tenant 404
- **8. Overlays** — Modal · Drawer · Confirmation dialog · Citation/evidence panel
- **9. High-stakes patterns (STEP 7)**

---

# 1. Navigation

## 1.1 Header (global) `[BASELINE: P4:§12.1/§12.2/§12.3/§12.4]`
- **Purpose.** Global navigation + utility for a surface (Public/Client/Agent/Ops), one per page.
- **Anatomy.** Wordmark (**ALDASSIST** `[DL:D-2026-014]`) · primary nav items · global app search (authenticated) · context switcher (multi-role) · attention badge `⚑` · avatar/utility.
- **Variants.** Public (6 items, one dropdown, Search first) · Client (7 items + Settings) · Agent (Today·Docket·Matters·Reviews·Opportunities·Practice) · Ops.
- **States.** Default · scrolled (elevation.1) · item active (selected) · badge count>0.
- **Content rules.** Labels from the controlled vocabulary only `[P4:§10]`; **"Agent Matching / Engagement," never "Marketplace"** `[CR-16]`; **≤2 nav levels** `[IA-6]`; Reviews is top-level for agents `[P4:§6.1]`.
- **Interaction.** Attention badge = count in *Needs you*, one click from every screen `[IA-2]`; search spans scoped groups `[P4:§13.2]`.
- **Accessibility.** `role="banner"`; labelled nav landmark; skip links to main/nav/action-queue `[P4:§22.1/§22.3]`.
- **Responsive.** Collapses to a **bottom bar** (4 highest-frequency destinations) + overflow sheet; never hamburger-only for primary `[WP4 B.3]`.
- **Do-not-use.** Never a third nav level; never blend two surfaces' navs (context switch instead) `[P4:§2.3]`.
- **Trace.** `[P4:§12]` `[WP1 §7]` `[CR-16]`.

## 1.2 Sidebar (local nav) `[BASELINE: P4:§12.3]`
- **Purpose.** Within-surface local navigation (client 7 items + Settings).
- **Anatomy.** Primary destinations list · Settings visually separated · attention affordances.
- **Variants.** Persistent (desktop) · collapsible (tablet) · bottom-bar (mobile).
- **States.** Item default/hover/active(selected); collapsed/expanded.
- **Content rules.** Inventions ≠ Portfolio kept distinct `[P4:§5.1]`; Agent-Matching entry is contextual, not a nav item `[WP1 §8.2]`.
- **Accessibility.** Labelled `nav`; current item `aria-current`.
- **Responsive.** Collapses to bottom bar `[WP4 B.3]`.
- **Do-not-use.** Don't add an 8th client primary item.
- **Trace.** `[P4:§12.3]` `[WP1 §7.3]`.

## 1.3 Context switcher `[BASELINE: IP-22/P4:§2.3]`
- **Purpose.** Switch surfaces for a multi-role actor; **one context at a time**; contexts never blend.
- **Anatomy.** Current-context label + menu of available contexts.
- **Variants.** Appears **only** for multi-role users.
- **States.** Default · open · switching.
- **Content/Interaction.** Selecting a context replaces the surface; **no data/nav bleeds across contexts** `[P5:§3]`.
- **Accessibility.** Menu semantics; the switch is announced.
- **Do-not-use.** Never show two contexts simultaneously — **context isolation is a confidentiality requirement, not a preference** `[P4:§2.3]`/`[CR-5]`.
- **Trace.** `[IP-22]` `[CR-5]`.

## 1.4 Breadcrumbs `[BASELINE: P4:§12.6]`
- **Purpose.** Object-hierarchy location + recovery on detail pages.
- **Anatomy.** Ancestor links → current object (non-link).
- **Content rules.** Reflect object hierarchy (Invention → Application, etc.); opaque IDs where titles are confidential `[P4:§9.2]`.
- **Accessibility.** `nav` labelled "Breadcrumb"; current = `aria-current="page"`.
- **Responsive.** Collapse middle with an overflow affordance; current always visible.
- **Do-not-use.** Not a substitute for the relationship rail.
- **Trace.** `[P4:§12.6]`.

## 1.5 Tabs (object sections) `[BASELINE: P4:§15/§20.2]`
- **Purpose.** Sections within an object page (≤2 nav levels).
- **Anatomy.** Tab row; active indicator (2px primary underline); panel.
- **States.** Default/hover/active(selected)/focus.
- **Accessibility.** `role="tablist"`; arrow-key navigation; panel association.
- **Responsive.** **Horizontal scroll, active tab always visible; never a dropdown** `[WP4 B.3]`.
- **Do-not-use.** Never hide the active tab; never nest tabs beyond one level.
- **Trace.** `[P4:§15]` `[WP4 B.3]`.

---

# 2. Actions

## 2.1 Primary button `[BASELINE: P4:IA-2/§18.1]`
- **Purpose.** The **single** next action per screen.
- **Anatomy.** Filled `action.primary`; label (controlled action verb: Record/Assess/Engage/File/Respond/Confirm/Decide/Release/Import) `[P4:§10.4]`; optional leading icon.
- **Variants.** md (default) · lg (mobile/primary emphasis).
- **States.** default/hover/active/focus/disabled/loading.
- **Content rules.** **One primary per screen** `[IA-2]`; verb from the lexicon; no banned language `[P4:§10.3]`.
- **Interaction.** High-consequence actions route through confirmation (IP-10); disabled states convey **why** `[I.3]`.
- **Accessibility.** ≥44px target; visible focus; loading announced (`aria-busy`).
- **Responsive.** Sticky footer on mobile `[WP4 B.3]`.
- **Do-not-use.** Never two primaries on one screen; never a primary for a destructive action (use destructive).
- **Trace.** `[P4:IA-2/§18.1/§10.4]`.

## 2.2 Secondary button `[BASELINE]`
- **Purpose.** Alternative/parallel actions.
- **Anatomy.** Outlined (`border.default`, `text.link`).
- **States.** As primary (no "primary" emphasis).
- **Do-not-use.** Not for the single next action.
- **Trace.** `[P4:§14.2]`.

## 2.3 Tertiary / quiet action `[BASELINE]`
- **Purpose.** Low-emphasis inline actions (e.g. "view versions").
- **Anatomy.** Text-only, `text.link`, underline-on-hover.
- **Do-not-use.** Not for consequential actions.
- **Trace.** `[P4:§14.2]`.

## 2.4 Destructive action `[BASELINE: P4:§14.2]`
- **Purpose.** Isolated, consequential removal/stop actions.
- **Anatomy.** `status.danger.fg` label/outline; **visually isolated** from routine actions.
- **Interaction.** Always confirmed (IP-10); states what is reversible; no accidental proximity to primary.
- **Content.** Uses honest verbs; "Stop maintaining" not "cancel" `[P4:§10.2]`.
- **Do-not-use.** Never place adjacent to the primary; never as the default focus.
- **Trace.** `[P4:§14.2]` `[IP-10]`.

## 2.5 Icon button `[BASELINE: P3:§7.5/P4:§20.2]`
- **Purpose.** Compact affordances (e.g. filter, more).
- **Anatomy.** Icon (24px) + hit area ≥44px + accessible name + tooltip.
- **Do-not-use.** **Nothing rights-affecting behind an unlabelled icon**; nothing critical hover-only `[P3:§7.5]`.
- **Trace.** `[P4:§20.2]`.

---

# 3. Data

## 3.1 Table `[BASELINE: P4:§13/§22.3/§20.2]`
- **Purpose.** Dense operational data (indexes, docket, ops, cost lines).
- **Anatomy.** Real `<table>` semantics; header row (scope); sortable/filterable columns; standardised facets reflected in the URL `[P4:U5]`.
- **Variants.** Comfortable (client) · compact (agent/ops density).
- **States.** Row default/hover/selected; column sorted; loading (skeleton rows); empty.
- **Content rules.** Every object row carries the **two-axis status pair**; opaque IDs where confidential `[P4:§9.2]`.
- **Accessibility.** Headers + scope; **never layout tables** `[P4:§22.3]`; sortable state announced.
- **Responsive.** Collapse to **card list**, promoting the two most decision-relevant fields; wide tables scroll inside their own container, never the page `[WP4 B.3]`.
- **Do-not-use.** Never truncate the status pair to fit; never colour-only status cells.
- **Trace.** `[P4:§13/§22.3]` `[WP4 C.8/B.3]`.

## 3.2 Data row `[BASELINE]`
- **Purpose.** One object in an index/table/card list.
- **Anatomy.** Identity · lifecycle chip · attention marker · whose-turn/next-action · key metadata (date, domain, next deadline).
- **Content rules.** Two-axis status always present `[AP-14]`.
- **Responsive.** Becomes a card (3.3) on mobile.
- **Trace.** `[AP-14]` `[WP4 C.7]`.

## 3.3 Card `[BASELINE: P4:§20.2]`
- **Purpose.** Object summary on Home/indexes; the mobile fallback for dense tables.
- **Anatomy.** Surface (`bg.raised`, `border.subtle`, radius.md, elevation.0/1) · identity · status pair · next action/whose-turn · promoted fields.
- **States.** default/hover/selected/loading(skeleton).
- **Content rules.** Every object card shows the two-axis status pair and whose-turn where applicable `[AP-14]`.
- **Do-not-use.** Not for long-form reading (use the reading container).
- **Trace.** `[WP4 C.7]` `[AP-14]`.

## 3.4 Stat `[BASELINE basis]`
- **Purpose.** A single figure with context (e.g. portfolio counts, agent outcome stat).
- **Anatomy.** Value (`type.data`, tabular) · label · optional basis/sample-size.
- **Content rules.** **Agent outcome stats only at n≥20 with sample size + confidence indicator; below floor "not enough data yet"** `[D-2026-019]`; **no "success rate," no unverifiable statistic** `[P4:§10.3/§23.5]`.
- **Do-not-use.** Never a headline statistic without sample size where required `[BR-17]`.
- **Trace.** `[D-2026-019]` `[BR-17]` `[CR-21]`.

## 3.5 Metadata block `[BASELINE]`
- **Purpose.** Timestamps, dates, IDs, source/freshness.
- **Anatomy.** Label + value (`type.caption`/`type.data`); source/freshness where external.
- **Content.** Identifiers in monospace; dates in a fixed format; **source + freshness per external field** `[NFR-A05]`.
- **Trace.** `[P4:§15.3]` `[NFR-A05]`.

## 3.6 Timeline `[BASELINE: P4:§15.3/§19.4]`
- **Purpose.** Event history (Applications/Matters); conception-evidence trail (Disclosures).
- **Anatomy.** Vertical entries; each with event, timestamp, **source + freshness**; append-only/immutable `[BR-20/X15]`.
- **States.** Default · quiet period → **replaced by the silence view (IP-14)**, never an empty timeline.
- **Accessibility.** Ordered list semantics; timestamps real text.
- **Responsive.** Condensed vertical; source/freshness retained per entry.
- **Do-not-use.** Never mutate/delete a prior entry `[AP-07]`.
- **Trace.** `[P4:§15.3/§19.4]` `[IP-14]`.

## 3.7 Activity / event row `[BASELINE]`
- **Purpose.** One entry in a timeline/activity feed (incl. in-matter messages).
- **Anatomy.** Actor/source · action · timestamp · optional attachment.
- **Content.** In-matter messages are confined to the active matter `[A2]`; never cross matter/tenancy `[X6/X7]`.
- **Trace.** `[P3:M1.6]` `[CR-11]`.

---

# 4. Trust (STEP 2.37–2.40; anchors UXP-4/UXP-6)

## 4.1 Provenance citation `[BASELINE: BR-02/P4:§15.2] ★`
- **Purpose.** Make every AI-derived assertion traceable to its exact source — the trust anchor.
- **Anatomy.** A **primary, first-class affordance** (not a footnote marker): provenance-teal icon + descriptive text label ("Cited passage in US 9,876,543, ¶42"); opens the citation/evidence panel (8.4).
- **Variants.** Inline (within an assertion) · list (reference list at depth 3).
- **States.** default/hover/focus · **unresolved → fail-safe (4.x / IP-08): the assertion is not shown as verified.**
- **Content rules.** Descriptive accessible names, never "[1]" `[P4:§22.3]`; every displayed assertion carries a resolvable citation or it is withheld `[AP-04]`.
- **Interaction.** Activate → exact cited passage (IP-07), ≤2 interactions to source.
- **Accessibility.** Link/button with a full descriptive name; keyboard-reachable.
- **Responsive.** Tap opens the passage in a full-screen sheet; back returns to the assertion `[WP4 B.3]`.
- **Do-not-use.** **Never a superscript `[1]`; never hover-only; never colour-only.**
- **Trace.** `[BR-02]` `[P4:§15.2]` `[IP-07/IP-08]` `[UXP-4]` `[CR-6]`.

## 4.2 Evidence block `[BASELINE]`
- **Purpose.** The evidence layer (depth 3): cited passages, full reference list, coverage statement.
- **Anatomy.** `provenance.bg` surface; source passage(s); reference list; **coverage statement** (what was/wasn't searched) + 18-month blind-spot notice `[P3:§12.5]`.
- **Content rules.** On an **unfavourable** verdict the **coverage statement is never collapsed by default** `[P4:§15.2]`.
- **Trace.** `[P4:§15.2/§12.5]` `[CR-6]`.

## 4.3 Human-review indicator `[BASELINE: BR-01/FR-A07] ★`
- **Purpose.** Visual proof the mandatory review gate was met.
- **Anatomy.** Review seal/mark (`review.released`) + **reviewer name** + release date.
- **States.** Present only on *Released*; absent (with lifecycle+whose-turn) while *In review* — **never a partial/unreviewed verdict** `[BR-01]`.
- **Content rules.** Names the accountable Verified Agent `[FR-A07]`.
- **Do-not-use.** Never a decorative "trust badge"; never shown before release.
- **Trace.** `[BR-01/FR-A07]` `[UXP-6]` `[CR-2]`.

## 4.4 Confidence indicator `[BASELINE basis: AP-08] · [SLOT: scale]`
- **Purpose.** Communicate assessment/agent-stat confidence with its basis.
- **Anatomy.** A labelled confidence element **that always states its basis**; rendered as text + a non-colour-only visual (e.g. a discrete labelled scale), **distinct from status colours and from the reviewer-released treatment** so confidence is never mistaken for a verdict or a legal determination `[STEP 3]`.
- **States/Content.** **Scale/threshold = `[SLOT]`** (not defined by baseline); below the agent-stat floor → "not enough data yet" `[D-2026-019]`.
- **Do-not-use.** **Never colour-only; never styled to look like a legal determination; never a bare number without basis** `[AP-08/AP-05]`.
- **Trace.** `[AP-08/§12.3.4]` `[D-2026-019]` `[UXP-5]`.

## 4.5 Source-freshness indicator `[BASELINE: NFR-A05/IP-18]`
- **Purpose.** Disclose the recency of external (register/office) data.
- **Anatomy.** Per-field freshness stamp; stale → cached value + explicit staleness treatment.
- **Content rules.** **Never an error page** on upstream failure; alerts fire on detected change `[IP-18]`.
- **Trace.** `[NFR-A05]` `[IP-18]`.

---

# 5. Status (STEP 2.15, 2.35, 2.41)

## 5.1 Lifecycle state chip `[BASELINE: AP-14/P4:§11] ★`
- **Purpose.** The Lifecycle axis — where an object stands.
- **Anatomy.** Pill (radius.pill) · icon shape · text label from the object taxonomy · semantic colour.
- **Variants.** Per object type (Invention/Assessment/Application/Matter/Deadline), states per `[P4:§11.2–11.6]`.
- **Content rules.** **State names only from the taxonomy — none invented** `[P5:X8]`; **"Closed" never without its reason** `[P4:§11.3]`; *Not pursued*/*Lapsed* are dignified, not degraded `[P4:§15.1]`.
- **Accessibility.** **Icon + text + colour, never colour-only**; announced to AT `[P4:§22.3]`.
- **Responsive.** Never truncated/collapsed `[WP4 B.3]`.
- **Do-not-use.** Never merge with the attention marker.
- **Trace.** `[AP-14]` `[P4:§11]` `[CR-4]`.

## 5.2 Attention marker `[BASELINE: AP-14] ★`
- **Purpose.** The Attention axis — On track / Action needed / At risk.
- **Anatomy.** Icon shape (dot/flag/triangle) + text + colour; three fixed values.
- **Content rules.** Shown **independently** of the lifecycle chip, always `[AP-14]`; distinguishable in greyscale (shape/weight).
- **Do-not-use.** Never merged with lifecycle; never colour-only; no fourth value invented.
- **Trace.** `[AP-14]` `[P4:§11.1]` `[CR-4]`.

## 5.3 Whose-turn indicator `[BASELINE: IP-12/UXP-3] ★`
- **Purpose.** Name who is acting and roughly when.
- **Anatomy.** Attention marker + actor label ("With the reviewer," "Awaiting the office," "Needs you," "Nothing needed") + optional honest estimate (secondary text; **never a countdown**).
- **Content rules.** Estimate value is a `[SLOT]` (ADR §9 / Rules Engine); Home splits *Needs you* vs *Waiting on others* `[P4:§18.1]`.
- **Do-not-use.** Never fabricate a time; never fake urgency.
- **Trace.** `[IP-12]` `[P4:§11.4/§18.1]` `[UXP-3]`.

## 5.4 Deadline indicator `[BASELINE: AP-07/BR-03] ★`
- **Purpose.** Communicate deadline criticality and state safely.
- **Anatomy.** State chip (Upcoming…Not-applicable) · icon + text + colour · date (`type.data`) · confirm affordance (agent/ops, critical only).
- **Content rules.** **Criticality never colour-only**; computed from versioned rules (no invented durations); **critical requires human confirmation before advance** `[BR-03]`; computation trace reachable at depth 3 `[BR-13]`.
- **Do-not-use.** No countdown; never silently modify/delete history `[AP-07]`.
- **Trace.** `[AP-07/BR-03/BR-13]` `[P4:§11.5]` `[CR-13]`.

## 5.5 Notification status `[BASELINE: P3:§16/P4:§18.2]`
- **Purpose.** Present a notification by class with delivery/acknowledgement state.
- **Anatomy.** Class marker (Critical/Action/Progress/Informational/Proactive) + object link + whose-turn; Critical shows internal delivery/receipt state.
- **Content rules.** Grouped by class, not chronology; **Critical cannot be muted / cannot be dismissed without acknowledgement or action** `[P4:§18.2]`; undeliverable Critical → escalation (IP-13).
- **Do-not-use.** No fake urgency; the mute control on Critical is **disabled with an explanation**, never hidden.
- **Trace.** `[P3:§16]` `[P4:§18.2]` `[IP-13]`.

## 5.6 Matter status `[BASELINE: P4:§11.4]`
- **Purpose.** Matter lifecycle (Quoted…Closed) with whose-turn (*Awaiting you* / *Awaiting the office*).
- **Content rules.** Two-axis; cost cell via PriceDisplay `[L1]`.
- **Trace.** `[P4:§11.4/§15.4]`.

---

# 6. Forms `[BASELINE: P4:§22.3]`

## 6.1 Text input · 6.2 Textarea
- **Purpose.** Single-line / multi-line capture.
- **Anatomy.** **Visible label (never placeholder-only)** · field · helper/error slot.
- **States.** default/hover/focus/filled/disabled/read-only/error.
- **Accessibility.** Label programmatically associated; errors associated + inline; focus ring visible `[P4:§22.3]`.
- **Do-not-use.** Placeholder-as-label; colour-only error.
- **Trace.** `[P4:§22.3]` `[WP4 C.5]`.

## 6.3 Select · 6.4 Checkbox · 6.5 Radio
- **Purpose.** Constrained choice.
- **Anatomy.** Visible label; native-semantics control; group legend for radios/checkes.
- **Accessibility.** Keyboard-operable; state announced; focus visible.
- **Do-not-use.** Custom controls that drop keyboard semantics.
- **Trace.** `[P4:§22.3]`.

## 6.6 File upload `[BASELINE: P5:F4 failure]`
- **Purpose.** Attach artifacts (disclosure attachments; agent filed-response upload).
- **States.** idle/dragging/uploading/success/error.
- **Content rules.** **Attachment failure must not lose the text disclosure** — "attachment failed, disclosure safe" `[P5:F4 failure]`; the Responding upload is status-only (no authoring) `[CR-17]`.
- **Trace.** `[P5:F4]` `[IP-20]`.

## 6.7 Search `[BASELINE: P4:§13.1/§13.2]`
- **Purpose.** Public Z2 register search and authenticated app search.
- **Content rules.** **Public search (Z2) is visually/behaviourally distinct from app search (Z1)** `[P4:§13.1]`; app-search result grouping fixed (Inventions→Applications→Matters→Documents→Deadlines→Public register, capped, external last); FR-S11 own-invention warning routes to the Vault `[P4:§4.2]`.
- **Do-not-use.** Never blend Z1 and Z2 result surfaces.
- **Trace.** `[P4:§13]` `[CR-3]`.

## 6.8 Stepper (guided flow) `[BASELINE: P4:§22.3/IP-01]`
- **Purpose.** One question group per step (disclosure capture, onboarding).
- **Anatomy.** Step progress (announced) · one group per step · save-and-resume affordance ("Saved · HH:MM").
- **Content rules.** **Mandatory prior-disclosure section cannot be skipped** `[FR-D03]`; **save-and-resume across devices** (IP-01); each save = immutable version (IP-02).
- **Accessibility.** Progress + step context announced on every step `[P4:§22.3]`.
- **Trace.** `[P4:§22.3]` `[IP-01/IP-02]`.

## 6.9 Validation `[BASELINE: P4:§22.3]`
- **Purpose.** Inline, programmatic, plain-language validation.
- **Content rules.** Errors associated programmatically, shown inline, plain language; never colour-only.
- **Trace.** `[P4:§22.3]`.

---

# 7. Feedback (STEP 2.16, 2.43–2.46)

## 7.1 Alert (inline) `[BASELINE: P3:§16.2]`
- **Purpose.** In-context success/warning/error/info message.
- **Anatomy.** Status surface + **icon shape + text**; optional action.
- **Variants.** success/warning/danger/info (semantic tokens).
- **Do-not-use.** Colour-only; fear-inducing large danger fills `[UXP-2]`.
- **Trace.** `[P3:§16.2]` `[CR-4]`.

## 7.2 Inline validation → see 6.9.

## 7.3 Toast `[BASELINE]`
- **Purpose.** Transient, non-blocking confirmation (Progress/Informational).
- **Content rules.** **Never used for Critical** (Critical requires acknowledgement, not a transient) `[P4:§18.2]`; auto-dismiss non-critical only.
- **Accessibility.** Polite live region; dismissible; not the sole channel for anything rights-affecting.
- **Trace.** `[P4:§18.2]`.

## 7.4 Empty state `[BASELINE: P4:§19.1]`
- **Purpose.** Teach one thing, offer one action.
- **Content rules.** Honest, calm copy (e.g. review queue "no items in your domains right now," not urgency `[WP4 A.1]`); first-run screens per `[P4:§19.1]`.
- **Do-not-use.** No urgency theatre; no blank screen.
- **Trace.** `[P4:§19.1]` `[UXP-2]`.

## 7.5 Loading skeleton `[BASELINE: WP2 loading fields]`
- **Purpose.** Preserve layout during load; most decision-relevant region first.
- **Content rules.** *Needs you* / verdict depth-1 loads first; async assessment uses **staged waiting (IP-05)**, never false immediacy.
- **Do-not-use.** No full-screen spinner on primary surfaces; **no "almost done" fiction**.
- **Trace.** `[IP-05]` `[WP4 A.2]`.

## 7.6 Error state `[BASELINE: P4:§19.3/§22.3]`
- **Purpose.** Plain-language failure with a reason and a next step.
- **Content rules.** External-source failure → cached + staleness, never an error page `[NFR-A05]`; assessment/job failures state what was retained + retry `[P4:§19.3]`.
- **Trace.** `[P4:§19.3]` `[NFR-A05]`.

## 7.7 Permission-denied (same tenancy) `[BASELINE: IP-15/CR-12]`
- **Purpose.** Explain a lacking permission within a tenancy.
- **Anatomy.** **Visible-but-locked** (lock icon + reason + who can grant/act).
- **Content rules.** Route a Member's file intent to **request Owner action** — **never auto-escalate** `[P5:X13]`.
- **Do-not-use.** Never silently hide; never a cross-tenant 404 here (distinct).
- **Trace.** `[IP-15]` `[P4:§17.1]` `[CR-12]`.

## 7.8 Cross-tenant 404 `[BASELINE: IP-16/CR-5]`
- **Purpose.** Existence across a tenancy boundary is confidential.
- **Anatomy.** A **uniform "does not exist"** page — **no stub, no count, no locked placeholder**.
- **Content rules.** One 404 pattern reused everywhere; boundary-violation attempts denied + audited `[P5:§8-J]`.
- **Do-not-use.** Never reveal existence, counts, or a differentiated message.
- **Trace.** `[IP-16]` `[P4:IA-5]` `[CR-5]`.

---

# 8. Overlays

## 8.1 Modal `[BASELINE: P4:§22.3/§14.2]`
- **Purpose.** Focused sub-task (confirmations, quote acceptance).
- **Anatomy.** Surface (elevation.3, radius.lg) · title (h2) · content · actions (primary/secondary; destructive isolated).
- **Interaction.** Focus trapped; explicit close; focus restored on close.
- **Accessibility.** `role="dialog"` `aria-modal`; labelled; **avoid browser dialogs**; nothing rights-affecting hidden in a transient layer.
- **Responsive.** Full-screen sheet on mobile `[WP4 B.3]`.
- **Trace.** `[P4:§22.3/§14.2]`.

## 8.2 Drawer `[BASELINE]`
- **Purpose.** Side panel for filters/detail without leaving context.
- **Responsive.** Full-screen sheet on mobile; source content never removed.
- **Trace.** `[P4:§14.2]` `[WP4 B.3]`.

## 8.3 Confirmation dialog `[BASELINE: IP-10] ★`
- **Purpose.** High-consequence confirmation (decide file/not-file, engage/pay, filing, confirm deadline).
- **Anatomy.** What will happen · what it costs (via PriceDisplay where money) · what is reversible · explicit confirm.
- **Content rules.** Writes a **Decision entity (actor + rationale)** `[BR-09]`; **no AI output is the sole basis** `[BR-09]`; pre-filing states "no deadline exists yet" where true `[P4:§19.3]`; **engage/pay = Owner only** `[P4:§17.2]`; the **not-file role is DR-01 — the dialog is permission-agnostic** (shown to whichever role DR-01 authorises), asserting no role.
- **Do-not-use.** Never a one-tap consequential action without this pattern.
- **Trace.** `[IP-10]` `[BR-09]` `[CR-7]` · **DR-01 agnostic**.

## 8.4 Citation / evidence panel `[BASELINE: BR-02/IP-07] ★`
- **Purpose.** Show the exact cited source passage on demand.
- **Anatomy.** `provenance.bg` panel · the exact passage highlighted · source identity · back-to-assertion.
- **Interaction.** Opens from a citation affordance (4.1) in ≤2 interactions; on mobile a full-screen sheet with back.
- **Content rules.** Unresolved citation → **IP-08 fail-safe** (not shown as verified).
- **Trace.** `[BR-02]` `[IP-07/IP-08]` `[UXP-4]`.

---

# 9. High-stakes patterns (STEP 7)

> These compose the base components above into the product's trust-critical surfaces. Each must **feel trustworthy without introducing fake certainty** `[STEP 7]`. Behaviour is [BASELINE]; visual composition is [P7-DESIGN-DECISION].

## 9.1 Verdict presentation (SC-C08) ★★ `[BASELINE: P4:§15.2/§16/§11.6]`
- **Composition.** Object header (Invention identity · status pair) → **three-depth disclosure** (9.x) → human-review indicator (4.3) → decision actions (9.10).
- **Depth 1.** Verdict label from the four `[P4:§11.6]` + **confidence with basis** (4.4) + plain-language meaning (reading role) + recommended next steps.
- **Depth 2.** Element-by-element reasoning; each blocking/relevant reference and why; statutory-exclusion analysis (India s.3(k)/s.3(d)).
- **Depth 3.** Evidence block (4.2): clickable citations to exact passages, full reference list, coverage statement, 18-month blind-spot notice.
- **Trust without false certainty.** Confidence never colour-only and never styled as a legal determination `[AP-05]`; AI-authored analysis is distinguished from the reviewer-released verdict (B.5); every assertion is provenance-linked or withheld (IP-08).
- **Do-not-use.** Never show a verdict before human release `[BR-01]`; never collapse coverage on an unfavourable verdict.
- **Trace.** `[P4:§15.2/§16]` `[BR-01/BR-02]` `[UXP-4/5/6]` `[CR-2/6]`.

## 9.2 Provenance (spine-wide) ★ — see 4.1/4.2/8.4. The citation affordance is a **primary visual element everywhere AI-derived content appears** `[BR-02]`.

## 9.3 Unfavourable verdict ("Unlikely to be protectable") ★ `[BASELINE: P4:§11.6/§15.2]`
- **Composition.** Same depth model as favourable — **not degraded** `[P5:§12.2]`. D1 plain "unlikely, and why in one line" + confidence-with-basis; D2 blocking references + why; D3 exact passages + coverage (**never collapsed by default**) + blind-spot.
- **Alternatives.** Four alternatives (design around · trade secret · defensive publication · defer & re-assess) at **equal visual weight** — options, not consolation `[P4:§11.6]`.
- **Trust.** A "no" must rest on verifiable art — provenance maximal; any unresolved blocking-reference citation → IP-08.
- **Do-not-use.** No negative colour-coding of the outcome; no visual softening/hiding of the "no."
- **Trace.** `[P4:§11.6/§15.2]` `[UXP-7]` `[Philosophy §3]`.

## 9.4 Inconclusive verdict ("Not enough to assess") `[BASELINE: P4:§11.6]`
- **Composition.** States what is missing and how to supply it; route = **update Disclosure (new immutable version) → request a new assessment** — **no diff-against-prior view (V2)** `[P5:§9-C]`.
- **Trust.** A valid designed outcome, not a failure `[P5:F6 alt]`.
- **Trace.** `[P4:§11.6]` `[IP-09/IP-05]`.

## 9.5 Human review (indicator) ★ — see 4.3. Composition rule: released verdict is the authoritative layer over the AI draft; reviewer named `[BR-01]`.

## 9.6 Assessment lifecycle (waiting) `[BASELINE: IP-05]`
- **Composition.** Two clearly separated stages — **Analysing** (platform) then **In review** (reviewer, with expected turnaround `[SLOT]`) — with whose-turn (5.3); optional "watch progress." Never a blank; **never a partial/unreviewed verdict** `[BR-01]`.
- **Trace.** `[IP-05]` `[ADR:§4/§9]`.

## 9.7 Silence view (SC-C11) ★ `[BASELINE: IP-14/UXP-2]`
- **Composition.** "Nothing has happened — and that's expected" · last event (source/freshness) · honest expected-next range (`[SLOT]`) · "nothing is required from you" · "monitoring daily" · two explainer links. Calm layout, generous space.
- **Do-not-use.** Never a blank timeline; no urgency/countdown.
- **Trace.** `[IP-14]` `[P4:§19.4]`.

## 9.8 Matter header (SC-C15) ★ `[BASELINE: P4:§15.4]`
- **Composition.** Four cells always populated — **Where · What's next · Needs you · Cost `[L1]`** ("Nothing needed" valid). Whose-turn via *Awaiting you*/*Awaiting the office*.
- **Responsive.** Stacks; all four retained; Cost cell via PriceDisplay (9.14).
- **Trace.** `[P4:§15.4]` `[WP4 B.3]`.

## 9.9 Whose-turn ★ — see 5.3 (the anti-silence backbone).

## 9.10 Deadlines ★ — deadline indicator (5.4) + confirmation dialog (8.3) + escalation (below). Critical requires human confirmation `[BR-03]`; a miss is never silent, client-first with options `[NFR-C01]`.

## 9.11 Action queue (Home, SC-C01) ★ `[BASELINE: P4:§18.1]`
- **Composition.** Four fixed regions in order — **Needs you** (what·why·by when·one action) → **Waiting on others** → **Recently changed (7d)** → **Portfolio at a glance**; sort by deadline proximity then criticality `[P4:§13.4]`.
- **Trust.** Never a false "all clear" when data is stale (staleness shown).
- **Trace.** `[P4:§18.1]` `[UXP-3]`.

## 9.12 Agent review workspace (SC-A07) ★★ `[BASELINE: ADR:§6/BR-01]`
- **Composition.** **Two-pane** (AT-5): source pane (the **one** granted Disclosure version + AI analysis + cited passages) · work pane (assertions, edits, ReviewDecision). Provenance on every assertion (4.1/IP-07); mark Inconclusive with what's missing.
- **Scope.** **Review grant only** — exactly one Disclosure version + analysis; everything else invisible (IP-16); boundary-violation denied + audited `[P5:§8-J]`; **no client↔reviewer channel** `[A2]`.
- **Responsive.** Stacks with a pane switcher; **source pane never removed** `[WP4 B.3]`.
- **Trust.** Mandatory review, no bypass `[BR-01]`; edits captured as diffs (materiality per D-2026-018, not redefined).
- **Trace.** `[ADR:§5/§6]` `[BR-01/BR-02/FR-A08]` `[CR-2/6/8]`.

## 9.13 Agent matching (SC-C18) `[BASELINE: BR-06/BR-10/D-2026-019]`
- **Composition.** **Conflict check runs before any agent is shown** (loading = "checking availability") `[BR-10]`; conflicted agents silently excluded; matched agents with **rationale** + **fixed published prices before engagement** (PriceDisplay); outcome stats only at **n≥20 + sample size + confidence** (3.4/4.4).
- **Content.** **"Agent Matching / Engagement," never "Marketplace"** `[CR-16]`; no fabricated matches — honest "none available" + notify-me `[P5:F14 alt]`.
- **Trace.** `[BR-06/BR-10/BR-17]` `[D-2026-019]` `[CR-15/16/21]`.

## 9.14 Pricing component (PriceDisplay) ★ `[BASELINE: IP-21/CR-15] · [OWNER DECISION: O-2026-001 OPEN]`
- **Composition.** One component; **two modes** — component (Platform · Professional · Official) or bundled; **official fees always separately identifiable** at depth 1/2 and derived from the Rules Engine `[BR-14]`; each component carries jurisdiction/entity-type basis + a **disclosure content slot** `[LEGAL CONTENT SLOT: L1]`.
- **Rule.** Switching modes changes **only rendering** — no route/template/nav/hierarchy `[L1 Register §3]`; **no per-screen price logic**; **O-2026-001 stays OPEN** (Phase 7 designs both modes, closes nothing).
- **Error.** Rules Engine unavailable → last-known + freshness, **never a hardcoded fee** (IP-17).
- **Trace.** `[IP-21]` `[P4:§21]` `[O-2026-001]` `[CR-15]`.

## 9.15 Responding status-only view `[BASELINE: D-2026-016/CR-17]`
- **Composition.** *Responding* status + examination-response deadline (Deadline Engine) + honest copy that the **agent handles drafting/prosecution off-platform** + filed-response **upload** (6.6). **No prosecution workspace, no authoring surface** `[CR-17]`.
- **Do-not-use.** Must not drift toward prosecution tooling (V2).
- **Trace.** `[D-2026-016]` `[IP-20]` `[CR-17]`.

---

## Coverage note

Every component the STEP 6 inventory names is specified above; the STEP 7 high-stakes list maps 1:1 to §9.1–§9.15. Ops-console components (Docket Health, Rule Authoring, Quality, Business, Verification) reuse the Data/Status/Feedback components at **compact** density under the operational rhythm (B.15); their screen-level UX depth is scheduled for Phase 8 per `[WP1 §7.5]`.

---

*End of Phase 7 — Component Catalogue (Document 3 of 4), v0.1. WORKING DOCUMENT — owner review required. Specification only; no components-in-code, framework, UI screens, or build are produced or authorised.*
