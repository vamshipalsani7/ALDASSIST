# Phase 6 — WP-4: Edge Cases, Responsive Behaviour & Design-System Foundations

**FROZEN — PHASE 6 BASELINE (v0.1) · 1 SEPTEMBER 2026 · REPOSITORY OWNER (VAMSHI)**

> **Freeze notice — Phase 6 (UX & Interaction Design), 1 September 2026.** This document is part of the Phase 6 baseline, declared **frozen on 1 September 2026 by the repository owner (Vamshi)**; recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-020). Frozen at version v0.1. **DR-01 and DR-02 remain explicitly deferred** (see `Phase-6-Deferred-Decision-Register-v0.1.md`). As with every frozen document, it is not modified without an explicit architectural decision; where superseded, a historical notice is added rather than the content rewritten. This notice records the freeze and changes no design substance. *(Supersedes the working-document status noted below.)*

**Phase:** 6 — UX & Interaction Design · **Work package:** WP-4
**Type:** Working document (not frozen). Version v0.1.
**Date:** 1 September 2026
**Inputs:** WP-1 (journeys/nav/IA) · WP-2 (screen inventory) · WP-3 (interaction design) · Interaction Pattern Catalogue (IP-01…IP-22) · Deferred Decision Register (DR-01, DR-02).
**Frozen baseline (authoritative, unmodified):** Phase 3 PRD · Phase 4 IA · Phase 5 User Flows · Assessment Lifecycle ADR · Decision Log · Architecture Principles.

> **Scope.** Edge-case design, responsive-web behaviour, and **information-hierarchy-level** design-system foundations, plus interaction-level accessibility. **Not** visual branding, colours, fonts, logos, a final visual system, frontend code, framework, hosting, or IA redesign. **No** invented business rule, permission, state, threshold, SLA, statistic, pricing value, legal text, or retention period. **Native mobile is V2** — this is responsive web only.

> **Verification (pre-authoring gate).** WP-1, WP-2, WP-3, the Pattern Catalogue and the Deferred Decision Register were re-checked against the frozen baseline and each other before authoring WP-4: **consistent, no contradiction found.** WP-4 introduces no new state, permission, or decision. **DR-01 and DR-02 remain deferred** (WP-4 did not force either — see §F).

---

## 0. Conventions

**Three-way tag** applied to every design element (per the brief):
- **[BASELINE]** — a requirement the frozen baseline establishes (cited).
- **[P6-PROPOSAL]** — a Phase-6 interaction/foundation choice within existing rules (not a frozen requirement).
- **[SLOT]** — a value/content still undefined; a marked placeholder, never a guessed value.

**Trace vocabulary** as in WP-1/2/3: `[P5:Fn]` `[P5:Xn]` `[P5:§…]` `[P4:§…]` `[P3:§…]` `[P3:BR-…]` `[P3:FR-…]` `[ADR:§…]` `[DL:D-…]` `[AP-…]`; plus `[IP-nn]` (pattern), `[WP2:SC-…]`.

**Standing rules carried from WP-3 §1** (not restated per element): trust>convenience; provenance-or-not-shown; mandatory review gate; no client↔reviewer channel; two-axis status always visible; cross-tenant invisibility; deadlines computed+human-confirmed; whose-turn explicit; no fake urgency/invented certainty; Responding status-only; "Agent Matching / Engagement" not "Marketplace"; ALDASSIST wordmark.

---

# PART A — Edge-case design

## A.0 Method

Every WP-2 screen carries loading/empty/error fields and every WP-3 interaction carries error/recovery. Part A consolidates them into **edge-case families**, adds the Phase 5 §8 exceptional flows, and for each case states **[BASELINE] / [P6-PROPOSAL] / [SLOT]** distinctly. Presentation patterns are reused from the catalogue (IP-15 permission-denied, IP-16 cross-tenant 404, IP-17 Rules Engine unavailable, IP-18 stale data, IP-14 silence, IP-08 provenance failure) rather than re-drawn.

## A.1 Empty & first-run states
Every empty state teaches one thing and offers one action `[BASELINE: P4:§19]`.

| Case | [BASELINE] | [P6-PROPOSAL] | [SLOT] | Trace |
|---|---|---|---|---|
| Client Home first login | one-line lifecycle + "Record your first invention" | region-ordering emphasis (Needs you first) | — | `[P4:§19.1/§18.1]` |
| Inventions empty | "what an Invention is; why record early" → Record | copy tone (calm, plain) | — | `[P4:§19.1]` |
| Portfolio empty | "why empty (nothing filed); relation to Inventions" → Go to Inventions | cross-link placement | — | `[P4:§19.1/§5.1]` |
| Deadlines empty | "deadlines appear once something is filed" | — | — | `[P4:§19.1]` |
| Agent first login | value prop → **Import your matters** | import CTA prominence across 3 entry points | — | `[P4:§19.1/§6.1]` |
| Agent matters empty | import prominent; opportunities secondary | — | — | `[P4:§19.1]` |
| Review queue empty | (no baseline copy) | honest "no items in your domains right now" (not urgency) | — | `[P6-PROPOSAL]` per `[P5:§12.6]` rhythm |
| Assessment pre-release (In review) | never a partial/unreviewed verdict `[BR-01]` | show lifecycle + whose-turn + expected turnaround | expected turnaround `[SLOT]` | `[P5:X1]`/`[ADR:§9]` |
| Zero search results | what searched · why · one adjustment · one alternate path | phrasing | — | `[P4:§19.2]` |

## A.2 Loading & waiting states
| Case | [BASELINE] | [P6-PROPOSAL] | [SLOT] | Trace |
|---|---|---|---|---|
| Assessment async (two-stage) | async; no on-screen wait; analysis distinct from review | IP-05 staged waiting UI; optional "watch progress" | committed turnaround `[SLOT]` | `[ADR:§4/§9]`/`[P3:D5/FR-A10]` |
| Corpus/document page | rendered on first request then cached | skeletons per section | — | `[P4:§4.2]` |
| Price/fee load | fees from Rules Engine, never hardcoded | IP-21 skeleton on the price component | L1 rendering `[SLOT]` | `[BR-14]`/`[DL:O-2026-001]` |
| Conflict check at matching | runs **before any agent shown** | IP: show "checking availability" before list | — | `[BR-10]` |
| Import progress | deadlines computed on import | per-matter progress + streamed results | — | `[P5:F22]` |
| Review workspace load | grant scoped to one Disclosure version + analysis | two-pane loads only granted material | — | `[ADR:§6]` |

## A.3 Error & failure states
| Case | [BASELINE] | [P6-PROPOSAL] | [SLOT] | Trace |
|---|---|---|---|---|
| Attachment upload fails (disclosure) | text disclosure unaffected & saved; retry | inline "attachment failed, disclosure safe" affordance | — | `[P5:F4 failure]` |
| Assessment job fails | plain explanation; what retained; retry; escalation | IP: hold in *Requested*, "queued not lost" | — | `[P4:§19.3]`/`[P5:F5 failure]` |
| Payment fails at engagement | Matter NOT created; nothing at risk; **no deadline exists**; retry | IP-10 error copy stating nothing filed | L1 wording `[SLOT: L1-06/20]` | `[P5:§8-K]`/`[P4:§19.3]` |
| Filing to office fails | Application **not** marked *Filed*; no deadline off a non-filing; notify; retry | agent+client failure surface | — | `[P5:F16 failure]`/`[P3:§20.4]` |
| Office non-confirmation | provisional Event; "awaiting office confirmation"; discrepancy → Docket Ops | honest provisional badge | — | `[P3:§20.3]` |
| Message push fails | in-app persistence; message never lost | delivery-state indicator (non-critical) | — | `[P5:F17 failure]` |

## A.4 Timeout & unavailable-service
| Case | [BASELINE] | [P6-PROPOSAL] | [SLOT] | Trace |
|---|---|---|---|---|
| Register/office source unavailable | cached data + explicit staleness stamp; **never an error page** | IP-18 staleness affordance per field | — | `[P3:NFR-A05]`/`[P4:§19.3]` |
| Rules Engine unavailable | official fees never hardcoded | IP-17 last-known + freshness, or honest "temporarily unavailable" | — | `[BR-14]` |
| Reviewer capacity saturation | widen pool → honest updated wait → **never skip review** | IP-05/06 honest-wait surface; client stays *In review* | turnaround `[SLOT]` | `[ADR:§9]`/`[P5:§8-E]` |
| Reviewer unavailable mid-review (timeout) | grant expires; requeue; client sees *In review*, not error/reset | IP-06 reassignment; idle handling | review-grant/session timeouts `[SLOT]` | `[P5:§8-D]` |
| Edit-session idle (disclosure) | one editor at a time (A3) | **[P6-PROPOSAL]** automatic idle release of the soft-lock | idle timeout `[SLOT]` | `[IP-03]`/`[DL:D-2026-015 A3]` |

## A.5 Permission-denied & cross-tenant
| Case | [BASELINE] | [P6-PROPOSAL] | [SLOT] | Trace |
|---|---|---|---|---|
| Same-tenancy lacking permission | visible-but-locked with reason + who to ask; **no silent escalation** | IP-15 presentation; Member file-intent → request Owner action | — | `[P4:§17.1]`/`[P5:X13]` |
| Cross-tenancy object | **invisible — 404 "does not exist"; no stub/count/placeholder** | IP-16 uniform 404 | — | `[P4:IA-5/§19.3]`/`[P5:X7]` |
| Reviewer boundary-violation attempt | denied + audited; nothing else in the Workspace exists to them | IP-16; audit note | — | `[P5:§8-J]`/`[ADR:§6]` |
| Not-file Decision actor | (undetermined — DR-01) | interaction **permission-agnostic**; asserts no role | role `[SLOT via DR-01, deferred]` | `[P5:F10]`/DR-01 |

## A.6 Stale-data / external-source
Covered by **IP-18** across public search/document (SC-P02/03), application tracking (SC-C11), alerts (F13). [BASELINE] alerts fire on detected change, staleness disclosed on the underlying page `[P5:F13/F19]`. [P6-PROPOSAL] a consistent freshness-stamp component reused wherever external data appears.

## A.7 Partial / failed import
[BASELINE] incomplete data → tell the agent exactly what's missing per matter; deliver value for complete matters; nothing silently mis-computed `[P5:F22 failure]`. [P6-PROPOSAL] a per-matter status list (complete / needs fields / failed) with inline correction and re-run. **[SLOT/FLAG]** duplicate handling between imported and later platform matters is **not** specified by the baseline → **DR-02 (deferred)**; WP-4 designs no de-duplication behaviour `[P5:F22]`/DR-02.

## A.8 Deadline edge cases
| Case | [BASELINE] | [P6-PROPOSAL] | [SLOT] | Trace |
|---|---|---|---|---|
| Approaching/Due | alert ladder active; prominent on Home | IP-11/IP-12 surfacing | ladder timings `[SLOT — from rules, not invented]` | `[P4:§11.5]` |
| Critical unconfirmed | requires system + **human confirmation** before advance | IP-11 confirm affordance (agent/ops) | — | `[BR-03]`/`[P5:X9]` |
| Superseded (recomputed) | recomputed; diff available; history not silently modified | show "recomputed" with prior→new | — | `[P4:§11.5]`/`[AP-07]` |
| Source/computation conflict | routes to Docket Ops; client sees human-checked position, no auto-flip | discrepancy badge; Docket Health queue | — | `[P3:§20.3]` |
| Missed | escalate; incident; client notified immediately with options; RCA mandatory | IP: client-first surface with options | restoration provisions `[SLOT — rule-modelled]` | `[P5:§8-G]`/`[NFR-C01]` |

## A.9 Notification edge cases
| Case | [BASELINE] | [P6-PROPOSAL] | [SLOT] | Trace |
|---|---|---|---|---|
| Undeliverable Critical (all channels) | Docket Health Console + Docket Ops paged; human contact trail | IP-13 escalation surface | — | `[P3:§16.5]`/`[P5:§8-F]` |
| Attempt to mute Critical | **cannot be muted**, stated at onboarding | disabled control with explanation | — | `[P4:§18.2]` |
| Dismiss Critical without action | cannot dismiss without acknowledgement/action | IP-13 acknowledgement gate | — | `[P4:§18.2]` |
| Quiet period (no events) | proactive-reassurance even when nothing happened | IP-14 silence view + Progress cadence | expected-next range `[SLOT]`; cadence `[SLOT]` | `[P3:§16.3]`/`[P4:§19.4]` |

## A.10 Assessment edge cases
| Case | [BASELINE] | [P6-PROPOSAL] | [SLOT] | Trace |
|---|---|---|---|---|
| Abandoned request / user disappears mid-analysis | analysis+review not user-blocking; verdict waits in *Released*; notify | IP-05 async; return-and-find | — | `[P5:§8-A]` |
| Disclosure incomplete at request | blocked with reason; routed back to finish | inline block + jump to gap | — | `[P5:F5 alt]` |
| Reviewer disagrees with AI | normal operation; reviewer edits/releases or *Inconclusive*; **no unreviewed draft reaches client** | IP-19 diff capture | — | `[P5:§8-C]`/`[BR-01]` |
| Inconclusive verdict | states what's missing + how to supply; route = **new** assessment (no diff view) | IP-09/IP-05 re-request | — | `[P5:F9/§9-C]` |

## A.11 Review edge cases
Covered by IP-06/IP-16/IP-19: decline-after-open → requeue; timeout → grant expires, reassignment `[P5:§8-D]`; boundary-violation → denied+audited `[P5:§8-J]`; inconclusive release with what's missing `[P4:§11.6]`. All **[BASELINE]**; presentation is **[P6-PROPOSAL]**. **No new reviewer permission model** `[ADR:§6]`.

## A.12 Provenance edge cases
[BASELINE] a citation that fails to resolve → the assertion is **not shown as verified** (IP-08); provenance-integrity event recorded `[P3:§25]`; in review, the reviewer is alerted to resolve/drop before release. **Absolute** `[AP-04/BR-02/P5:X2]`. [P6-PROPOSAL] how the withheld/unverifiable assertion is visually marked (text, not colour-only) — no value invented.

## A.13 Payment edge cases
See A.3 (payment fail at engagement, §8-K) and IP-21. [BASELINE] Matter not created; nothing at risk; no deadline exists; retry `[P5:§8-K]`. Rendering via the configurable price component (component primary, both modes) `[DL:O-2026-001]`; legal wording `[SLOT: L1-06/20]`.

## A.14 Access-revocation (post-engagement)
[BASELINE] matter-scoped access is revoked **on a schedule, not instantly**; the agent retains access for record-keeping for a defined window `[P5:§8-I]`. [P6-PROPOSAL] a "access ends [date]" affordance in the agent's own record view. **[SLOT]** the window length = L6 legal dependency, pending `[P3:§26.1 L6]`. No retention period invented.

## A.15 Cross-tenant existence (universal)
[BASELINE] existence across a tenancy boundary is itself confidential (IP-16) `[P4:IA-5]`/`[P5:X7]`. Applies to every list, count, search, and notification: a non-entitled actor experiences the object as non-existent. [P6-PROPOSAL] a single 404 pattern reused everywhere so no surface leaks a stub/count.

## A.16 Coverage map — Phase 5 §8 exceptional flows → WP-4
| §8 | Covered in | §8 | Covered in |
|---|---|---|---|
| 8-A abandoned assessment | A.10 | 8-G deadline at risk/missed | A.8 |
| 8-B abandoned disclosure | A.1/A.4 | 8-H conflict at matching | A.3/§B matching |
| 8-C reviewer disagrees | A.10 | 8-I access revocation | A.14 |
| 8-D reviewer reassignment | A.4/A.11 | 8-J review-grant violation | A.5/A.11 |
| 8-E reviewer saturation | A.4 | 8-K payment failure | A.3/A.13 |
| 8-F undeliverable critical | A.9 | | |

---

# PART B — Responsive behaviour (web only; native mobile is V2)

## B.0 Principles
- **Preserve information hierarchy and critical actions across sizes — do not merely shrink the desktop layout** `[P6-PROPOSAL derived from P4:§20.2]`.
- **Two-axis status is never truncated or collapsed** at any size `[BASELINE: P4:§20.2/AP-14]`.
- **Nothing critical exists only in a hover state** — serves mobile and accessibility together `[BASELINE: P3:§7.5]`/`[P4:§20.2]`.
- **The single next action is always reachable** (sticky on small screens) `[BASELINE: P4:§20.2/IA-2]`.
- **Native mobile is V2**; WP-4 specifies responsive web only `[BASELINE: P5:§10]`/`[P3:TA-10]`.

## B.1 Breakpoint tiers
Three conceptual tiers — **desktop / tablet / mobile** `[P6-PROPOSAL]`. Exact breakpoint pixel values = **`[SLOT: breakpoint widths]`** (not invented). Tiers are defined by behaviour, not device.

## B.2 Surface mobile priority (fixed by baseline)
`[BASELINE: P4:§20.1]` — High: public search & document pages; cost planner, guides, glossary; client action queue & deadlines; agent docket. Medium: client assessment reading; disclosure capture; institution consoles (V2). Low: agent drafting/prosecution (V2); operations consoles. WP-4 designs the High/Medium MVP surfaces; Low/V2 surfaces are desktop-optimal and out of MVP focus.

## B.3 Per-element adaptation
Rows tagged; most rules are **[BASELINE: P4:§20.2]**, presentation detail is **[P6-PROPOSAL]**.

| Element | Desktop | Tablet | Mobile | Tag | Trace |
|---|---|---|---|---|---|
| **Global navigation** | full top/side nav | condensed | **bottom bar for the 4 highest-frequency destinations; overflow in a sheet; never hamburger-only for primary** | [BASELINE] | `[P4:§20.2]` |
| **Client sidebar** | persistent sidebar (7 items + Settings) | collapsible | collapses to bottom bar | [BASELINE] | `[P4:§12.3/§20.2]` |
| **Agent nav** | Today·Docket·Matters·Reviews·Opportunities·Practice | condensed | bottom bar (highest-frequency: Today, Docket, Reviews) + overflow | [BASELINE nav]/[P6-PROPOSAL selection] | `[P4:§12.4/§20.2]` |
| **Object-detail tabs** | tab row | tab row | **horizontal scroll, active tab always visible; never a dropdown** | [BASELINE] | `[P4:§20.2]` |
| **Status pair (two-axis)** | inline in header | inline | **always visible; never truncated/collapsed** | [BASELINE] | `[P4:§20.2/AP-14]` |
| **Next action** | in header/context | in header | **sticky footer** | [BASELINE] | `[P4:§20.2]` |
| **Dense tables** (indexes, docket, ops) | full table with sortable columns | reduced columns | **card list; promote the two most decision-relevant fields** | [BASELINE] | `[P4:§20.2/§13]` |
| **Filter rails** | left rail | rail/drawer | **bottom sheet; applied filters as removable chips above results** | [BASELINE] | `[P4:§20.2/§13.3]` |
| **Matter workspace header (4 cells)** | 4 cells in a row (Where·What's next·Needs you·Cost) | 2×2 | **stacked, all 4 retained; Cost cell governed by IP-21** | [BASELINE cells]/[P6-PROPOSAL stacking] | `[P4:§15.4/§20.2]` |
| **Verdict / three-depth** | depths expand in place; citations inline | same | **depth 1 full-width; depth 2/3 expand; citation affordance stays a primary tap target; coverage statement reachable, never behind hover** | [BASELINE depth model]/[P6-PROPOSAL layout] | `[P4:§16/§15.2/§20.2]` |
| **Provenance / citation** | click opens exact passage | same | **tap opens passage in a full-screen sheet; back returns to the assertion** | [BASELINE affordance]/[P6-PROPOSAL sheet] | `[BR-02]`/`[P4:§20.2]` |
| **Review workspace (two-pane)** | source + work pane side by side | side by side / stacked | **stack with a pane switcher; source pane always accessible, never removed** | [BASELINE] | `[P4:§20.2/AT-5]` |
| **Forms / guided capture** | multi-field per step | per step | **one question group per step; labels always visible; save-and-resume across devices** | [BASELINE] | `[P4:§20.2/§22.3]`/`[IP-01]` |
| **Timelines (status/events)** | vertical timeline with source/freshness | same | **condensed vertical; source/freshness retained per entry; silence view full-width** | [BASELINE content]/[P6-PROPOSAL density] | `[P4:§15.3/§19.4]` |
| **Deadlines / calendar** | calendar + list toggle | list-first | **list-first; criticality shown icon+text+colour (never colour-only); confirm reachable (agent)** | [BASELINE] | `[P4:§11.5/§22.3]`/`[BR-03]` |
| **Notifications** | grouped-by-class centre | same | **class order preserved (Critical→Action→Progress→Informational); Critical acknowledgement gate intact** | [BASELINE] | `[P4:§18.2]` |
| **Drawers / modals** | side drawer / centered modal | drawer | **full-screen sheet; focus trapped; explicit close; destructive actions isolated** | [BASELINE focus]/[P6-PROPOSAL sheet] | `[P4:§22.3/§14.2]` |
| **Complex data (cost forecast, outcome stats)** | tables/figures | reduced | **progressive disclosure: headline figure first, breakdown on expand; stats keep sample size + confidence** | [BASELINE stats reqs]/[P6-PROPOSAL layout] | `[P4:§16.1]`/`[BR-17]`/`[DL:D-2026-019]` |

## B.4 Critical-action & hierarchy preservation
On every tier: the **one obvious next action** persists (sticky when needed); the **status pair** persists; **whose-turn** persists; **Critical notifications** and **deadline confirmation** remain fully operable (agent docket is High mobile priority) `[BASELINE: P4:§20.1/§20.2]`. No surface hides a rights-affecting control behind hover or an un-labelled icon `[P3:§7.5]`.

---

# PART C — Design-system foundations (information-hierarchy level only)

> **Boundary.** This defines **roles, hierarchy and behaviour**, not visual identity. **No brand colours, palettes, fonts, logos, marketing styling, or final visual system.** Every concrete value (type sizes, spacing units, container widths, colour hex, icon set) is a **`[SLOT]`** to be set in WP-5+ / visual design. All entries are **[P6-PROPOSAL]** unless a baseline tie is cited.

## C.1 Typography hierarchy
- **Roles (not sizes):** Page/Object title (h1, one per page `[BASELINE: P4:§22.2]`) · Section (h2) · Subsection (h3) · Body · Secondary/caption · Monospace (identifiers: application numbers, rule IDs, citations) · Legal/disclosure text slot.
- **Rules:** headings describe content not styling; **no level skipping** `[BASELINE: P4:§22.2]`; depth-1 verdict/state content targets general-audience readability, term-of-art density may rise at depths 2–3 `[BASELINE: P4:§22.4]`; AI-authored vs human-authored text must be typographically/structurally distinguishable `[BASELINE: P3:§12.3 r5]`.
- **Slots:** type scale, sizes, line-heights, font family = **`[SLOT]`**. **No font chosen.**

## C.2 Spacing
- **Role:** a single consistent spacing scale for rhythm and grouping; generous space is part of the calm design language `[BASELINE tie: Philosophy §5 "generous space"]`.
- **Rules:** related items grouped by proximity; one primary action given breathing room; no dense "urgency" packing.
- **Slots:** base unit and scale steps = **`[SLOT]`**.

## C.3 Layout / grid & C.4 Containers
- **Role:** a responsive grid; a max content width for readability; the object-page skeleton (Identity → status pair → next action → tabs → content + relationship rail) `[BASELINE: P4:§15]`.
- **Rules:** **max two navigation levels** `[BASELINE: P4:IA-6]`; index/detail/guided-flow/two-pane/calendar/report/console container types map to templates AT-1…AT-9 `[BASELINE: P4:§14]`.
- **Slots:** column count, gutters, max-width = **`[SLOT]`**.

## C.5 Forms
- **Role:** guided, low-friction capture (disclosure, onboarding, settings).
- **Rules `[BASELINE: P4:§22.3]`:** labels **always visible, never placeholder-only**; errors associated programmatically and shown inline; one question group per step in guided flows with progress announced; save-and-resume (IP-01); mandatory prior-disclosure section cannot be skipped `[BASELINE: FR-D03]`.
- **Slots:** field styling, input sizing = **`[SLOT]`**.

## C.6 Buttons / actions
- **Role hierarchy:** **one primary (the single next action) per screen** `[BASELINE: P4:IA-2/§18.1]` · secondary · tertiary/quiet · **destructive isolated** `[BASELINE: P4:§14.2]`.
- **Rules:** high-consequence actions use IP-10 confirmation; permission-gated actions route (IP-15), never silently escalate `[P5:X13]`; action verbs from the controlled lexicon (Record/Assess/Engage/File/Respond/Confirm/Decide/Release/Import) `[BASELINE: P4:§10.4]`.
- **Slots:** button visual styling, colour = **`[SLOT]`**.

## C.7 Cards
- **Role:** summarise an object in indexes and on Home; the mobile fallback for dense tables (promote two decision-relevant fields) `[BASELINE: P4:§20.2]`.
- **Rules:** every object card shows the **two-axis status pair** and whose-turn/next-action where applicable `[BASELINE: AP-14]`.
- **Slots:** card styling = **`[SLOT]`**.

## C.8 Tables
- **Role:** dense operational data (indexes, docket, ops consoles, cost lines).
- **Rules `[BASELINE: P4:§22.3/§20.2]`:** real `<table>` semantics with headers/scope (never layout tables); sortable/filterable per §13; standardised facets reflected in the URL; collapse to cards on mobile.
- **Slots:** density, row styling = **`[SLOT]`**.

## C.9 Status indicators (two-axis)
- **Role:** the product's core signalling — **Lifecycle state** and **Attention state**, always shown independently `[BASELINE: AP-14/P4:§11]`.
- **Rules `[BASELINE: P4:§22.3]`:** **never colour-only** — icon + text label + colour together; state names come from the taxonomy (no invented states) `[P5:X8]`; "Closed" never shown without its reason `[BASELINE: P4:§11.3]`.
- **Slots:** colour values, icon set = **`[SLOT]`** (semantic roles defined here; hues are not).

## C.10 Alerts / notifications
- **Role:** class-ordered signalling (Critical / Action required / Progress / Informational / Proactive-reassurance) `[BASELINE: P3:§16.2/§16.3]`.
- **Rules:** grouped by class not chronology `[P4:§18.2]`; **Critical cannot be muted and cannot be dismissed without acknowledgement/action** `[BASELINE: P4:§18.2]`; no fake urgency/countdown `[Philosophy §5]`.
- **Slots:** per-class default channels where §16.2 leaves unset = **`[SLOT]`**; alert styling = **`[SLOT]`**.

## C.11 Modals / drawers
- **Role:** focused sub-tasks (quote acceptance, confirmations, filters, citation passages).
- **Rules `[BASELINE: P4:§22.3/§14.2]`:** focus managed on open/close; explicit close; destructive actions isolated; on mobile → full-screen sheet (Part B). Avoid browser dialogs; nothing rights-affecting hidden in a transient layer.
- **Slots:** styling = **`[SLOT]`**.

## C.12 Navigation
- **Role:** global/local/contextual/supplemental/utility systems `[BASELINE: P4:§12.1]`.
- **Rules:** ≤ two levels `[IA-6]`; public 6 items/one dropdown; client 7 + Settings; agent 6 with Reviews top-level; **context switcher for multi-role, one context at a time** `[BASELINE: P4:§2.3/§12]`; the relationship rail makes every related object one click away `[P4:§12.5]`.
- **Slots:** nav styling = **`[SLOT]`**.

## C.13 Timelines
- **Role:** event history for Applications/Matters; conception-evidence trail for Disclosures.
- **Rules `[BASELINE: P4:§15.3/§19.4]`:** **source + freshness per entry**; append-only/immutable events `[BR-20/X15]`; the silence view replaces an empty timeline during quiet periods (IP-14).
- **Slots:** timeline styling = **`[SLOT]`**.

## C.14 Deadline indicators
- **Role:** communicate criticality and state safely `[BASELINE: AP-07]`.
- **Rules `[BASELINE: P4:§11.5/§22.3]`:** states Upcoming/Approaching/Due/Confirmed/Met/Missed/Superseded/N-A; **icon + text + colour, never colour-only**; the computation **trace** reachable at depth 3 `[BR-13]`; **critical deadlines require human confirmation** `[BR-03]`.
- **Slots:** colour mapping, iconography = **`[SLOT]`**; ladder timings from the Rules Engine, not invented = **`[SLOT]`**.

## C.15 Document / provenance views
- **Role:** the trust anchor — assertions, citations, source passages, coverage.
- **Rules `[BASELINE: P4:§15.2/§22.3, BR-02]`:** **citation affordance is a primary visual element, not a footnote marker**; citation links have descriptive accessible names (not "[1]"); AI vs human content distinguishable; coverage statement never collapsed by default on an unfavourable verdict; an unresolved citation is **not shown as verified** (IP-08).
- **Slots:** document-viewer styling = **`[SLOT]`**.

---

# PART D — Accessibility & interaction consistency

> Interaction-level accessibility that follows naturally from the design. **The baseline already establishes WCAG 2.2 AA** `[BASELINE: P3:NFR-X01/P4:§22]` — WP-4 references that level and introduces **no new compliance claim or level beyond it.**

- **Landmarks & headings** `[BASELINE: P4:§22.1/§22.2]`: banner/nav/main/complementary/contentinfo; one h1 per page; no level skipping; skip links to main, primary nav, and the action queue.
- **Keyboard & focus** `[BASELINE: P4:§22.3]`: focus order follows visual order; focus managed on route change and modal/sheet open/close; every interactive element keyboard-reachable; **nothing critical in hover-only** `[P3:§7.5]`.
- **Status not by colour alone** `[BASELINE: P4:§22.3]`: lifecycle/attention/deadline criticality conveyed by icon + text + colour; announced to assistive tech.
- **Error communication** `[BASELINE: P4:§22.3]`: errors associated programmatically, shown inline, in plain language; the provenance fail-safe and permission-denied patterns give a reason and a next step (IP-08/IP-15).
- **Confirmation patterns** `[P6-PROPOSAL grounded in P3:BR-09]`: high-consequence actions use a consistent IP-10 confirm-with-rationale; not-file/payment/filing/confirm-deadline share the pattern.
- **Touch targets & motion** `[BASELINE: P4:§22.3/§20]`: adequate target size on touch (exact size = **`[SLOT]`**); respects reduced-motion; no essential information conveyed by animation only.
- **Citations & tables** `[BASELINE: P4:§22.3]`: descriptive citation link names; real table semantics with headers/scope.
- **Plain language as cognitive accessibility** `[BASELINE: P4:§22.4/IA-3]`: dual-register (plain leads, term-of-art in the same view); depth-1 general-audience readability.

---

# PART E — Design slots surfaced in WP-4 (no value invented)

| # | Slot | Where | Authority for leaving open |
|---|---|---|---|
| W4-1 | Breakpoint pixel widths | B.1 | Phase-6 layout (not specified) |
| W4-2 | Type scale / sizes / line-height / font | C.1 | visual design (WP-5+); no font chosen |
| W4-3 | Spacing base unit & scale | C.2 | visual design |
| W4-4 | Grid columns / gutters / max-width | C.3/C.4 | visual design |
| W4-5 | Colour values (status, deadline, alert) & icon set | C.9/C.10/C.14 | **no brand colour invented** |
| W4-6 | Touch-target size | D | visual design |
| W4-7 | Edit-session idle timeout | A.4 | not specified (IP-03; Phase-6 proposal) |
| W4-8 | Committed review turnaround | A.1/A.2/A.4 | ADR §9 (configurable) |
| W4-9 | Expected-next-event range; reassurance cadence | A.9 | Rules Engine/field timelines |
| W4-10 | Deadline ladder timings / restoration provisions | A.8 | Rules Engine (BR-14/D1) — not invented |
| W4-11 | L1 pricing rendering & disclosure wording | A.13/C.15 | O-2026-001 / L1 (legal) |
| W4-12 | L6 access-revocation window | A.14 | Phase 3 §26.1 L6 (legal) |
| W4-13 | Per-class default notification channels | A.9/C.10 | Phase 3 §16.2 |
| W4-14 | Confidence & agent-stat representations | B.3/C.15 | AP-08 / D-2026-019 (scale not defined) |

No slot is filled with a guessed value. Legal content remains `[LEGAL CONTENT SLOT: Lx]`.

---

# PART F — Flags & deferred decisions (status after WP-4)

- **DR-01 (not-file Decision role):** **remains deferred.** WP-4 did not force it — every edge case involving it is handled permission-agnostically (A.5). Not resolved.
- **DR-02 (docket-import duplicate handling):** **remains deferred.** Surfaced again at A.7 (partial import); WP-4 designs no de-duplication behaviour. Not resolved.
- **No new decision surfaced by WP-4.** All other unknowns are design slots (Part E) or already-decided constraints. WP-4 created no ADR and no new product decision.

---

# PART G — Traceability summary (WP-4 → baseline)

| WP-4 area | P5 | P4 | P3/ADR/DL |
|---|---|---|---|
| Empty/first-run (A.1) | F4/F20/F22 | §19.1/§19.2/§18.1 | — |
| Loading/waiting (A.2) | F5/F6/F14/F22 | §4.2 | ADR §4/§9, D5, FR-A10, BR-10/BR-14 |
| Errors/timeouts (A.3/A.4) | F4/F5/F15/F16/§8-D/§8-E | §19.3 | NFR-A05, §20.3/20.4, ADR §9, BR-14 |
| Permission/cross-tenant (A.5/A.15) | X7/X13/§8-J | IA-5/§17.1/§19.3 | ADR §6 |
| Import (A.7) | F22 | §6.1 | M2.1, D1; **DR-02** |
| Deadlines (A.8) | F16/F19/§8-G | §11.5 | BR-03/BR-13, §20.3, NFR-C01, AP-07 |
| Notifications (A.9) | F18/§8-F | §18.2/§18.3/§19.4 | §16.2/16.3/16.5 |
| Assessment/review/provenance (A.10–A.12) | F6/F9/F23/§8-A/8-C/8-D/8-J/§9-C | §11.6/§15.2/§16 | BR-01/BR-02, ADR §5/§6, §12.5, §25, FR-A08 |
| Payment/access-revocation (A.13/A.14) | §8-K/§8-I | §19.3 | BR-06, §26.1 L6, O-2026-001 |
| Responsive (Part B) | §10 | §20.1/§20.2/§12/§15.4/§16 | TA-10, §7.5 |
| Foundations (Part C) | — | §10/§11/§12/§14/§15/§16/§18/§19/§22 | BR-01/02/03/13/17/20, AP-07/08/14, §12.3; O-2026-001, D-2026-019 |
| Accessibility (Part D) | — | §22 | NFR-X01, §7.5 |

---

## Self-review (embedded)

1. **Could any WP-4 element read as a frozen requirement?** Every non-baseline element carries **[P6-PROPOSAL]**; every value is a **[SLOT]**; baseline ties are cited. The three-way tagging (§0) is applied throughout Parts A–D.
2. **New decisions?** None. DR-01 and DR-02 stay deferred (Part F); no ADR or product decision created.
3. **Scope:** additions confined to `03_Design/`; no frozen document, ADR, Decision Log, Roadmap, Assumptions, or Metrics touched; no WP-1/WP-2/WP-3 change required by WP-4.
4. **Guardrails held:** Responding status-only (A.14/Part B keep it a status surface); review gate mandatory (A.10/A.11); provenance-or-not-shown (A.12/C.15); cross-tenant invisibility (A.5/A.15); two-axis status (C.9/Part B); "Agent Matching / Engagement" not "Marketplace"; ALDASSIST wordmark; no V2 features (native mobile, drafting/prosecution, renewals, monitoring all excluded); no invented SLA/threshold/pricing/legal/retention/permission.

---

*End of Phase 6 — WP-4 v0.1. WORKING DOCUMENT — owner review required. Do not proceed to WP-5, visual UI, frontend, or aldassist.com without approval.*


