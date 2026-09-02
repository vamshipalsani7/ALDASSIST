# Phase 6 — WP-5: Design-Governance & Consolidation Gate

**FROZEN — PHASE 6 BASELINE (v0.1) · 1 SEPTEMBER 2026 · REPOSITORY OWNER (VAMSHI)**

> **Freeze notice — Phase 6 (UX & Interaction Design), 1 September 2026.** This document is part of the Phase 6 baseline, declared **frozen on 1 September 2026 by the repository owner (Vamshi)**; recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-020). Frozen at version v0.1. **DR-01 and DR-02 remain explicitly deferred** (see `Phase-6-Deferred-Decision-Register-v0.1.md`). As with every frozen document, it is not modified without an explicit architectural decision; where superseded, a historical notice is added rather than the content rewritten. This notice records the freeze and changes no design substance. *(Supersedes the working-document status noted below.)*

**Phase:** 6 — UX & Interaction Design · **Work package:** WP-5 (final consolidation / governance gate)
**Type:** Working document (not frozen). Version v0.1.
**Date:** 1 September 2026
**Consolidates:** WP-1 (journeys/nav/IA) · WP-2 (screen inventory) · WP-3 (interaction design) · WP-4 (edge cases / responsive / foundations) · Interaction Pattern Catalogue (IP-01…IP-22) · Deferred Decision Register (DR-01, DR-02).
**Frozen baseline (authoritative, unmodified):** Phase 3 PRD · Phase 4 IA · Phase 5 User Flows · Assessment Lifecycle ADR · Decision Log · Architecture Principles.

> **Nature of this document.** WP-5 is a **governance and consolidation gate only.** It **introduces no new design, no new state, no new permission, and no new product decision.** It gathers what WP-1–WP-4 already produced into a single control surface: the ALDASSIST UX principles, the Phase-6 Constraint Register, the master traceability matrix, the consolidated design-slots and deferred-decisions registers, and a readiness/handoff statement. Everything here traces to an existing frozen source or to an already-recorded Phase-6 proposal/slot.

> **This gate does not build anything.** No website, no `aldassist.com`, no frontend framework, no React/Next.js/components/code. The boundary to the next phase (visual design / UI) is stated in Part E and is crossed only on owner approval.

> **Deferred decisions.** DR-01 and DR-02 were **not resolved** by the owner at this gate and are carried forward as **explicitly deferred** (Part D.2). WP-5 does not resolve them.

**Tags:** **[BASELINE]** frozen requirement (cited) · **[P6-PROPOSAL]** Phase-6 design choice · **[SLOT]** undefined value/content. **Trace vocabulary** as in WP-1–WP-4.

---

## 0. Verification at the gate

WP-1, WP-2, WP-3 (post-cleanup), WP-4, the Pattern Catalogue and the Deferred Decision Register were re-checked against the frozen baseline and each other: **consistent; no contradiction found.** File inventory in `03_Design/` at this gate: WP-1, WP-2, WP-3, WP-4, Interaction Pattern Catalogue, Deferred Decision Register, and this WP-5. No frozen document was modified in any work package.

---

# PART A — ALDASSIST UX Principles (Phase 6)

Ten principles the Phase-6 design must reinforce. Each states what it **requires**, what it **forbids**, its **source**, and **where it is enforced** in the Phase-6 documents. These are consolidations of frozen commitments, not new inventions.

### UXP-1 · The Record is the product
- **Requires:** every interaction leaves the permanent Invention record richer; the Invention persists independently of any Application, including *Not pursued* and *Lapsed*.
- **Forbids:** any feature that generates activity but adds nothing to the record; treating a filing/transaction as the root.
- **Source:** `[Philosophy §2]` · `[AP-01]` · `[P3:§14.3]` · `[P5:X3]`.
- **Enforced in:** WP-1 §2 spine; WP-2 SC-C04 (dignified *Not pursued* page); WP-3 IX-1.13; WP-4 A.1.

### UXP-2 · Calm over noise (silence is a designed state)
- **Requires:** one obvious next action per state; generous space; proactive reassurance even when nothing has happened; the silence view during quiet periods.
- **Forbids:** urgency theatre, countdown timers, scarcity, fake urgency; blank screens during multi-year quiet.
- **Source:** `[Philosophy §5]` · `[P4:IA-9/§19.4]` · `[P3:§16.3]`.
- **Enforced in:** IP-14; WP-3 IX-3.6; WP-4 A.9, C.2, C.10; WP-2 SC-C11.

### UXP-3 · Transparent status — whose turn, always answered
- **Requires:** two independent axes (lifecycle + attention) always shown; every waiting state names who is acting and roughly when; *Needs you* vs *Waiting on others*.
- **Forbids:** merging the two axes; status without obligation or obligation without context; a hidden "whose turn."
- **Source:** `[AP-14]` · `[P4:§11.1/§18.1]` · `[P5:principle 4]`.
- **Enforced in:** IP-12; WP-2 SC-C01/C15; WP-3 throughout; WP-4 C.9, B.4.

### UXP-4 · Provenance is the trust anchor
- **Requires:** every AI-derived assertion is traceable to its exact source; citation is a primary visual element.
- **Forbids:** showing any assertion as verified without a resolvable citation (fail-safe).
- **Source:** `[AP-04]` · `[BR-02]` · `[P5:X2]`.
- **Enforced in:** IP-07/IP-08; WP-3 IX-1.7/1.9/1.11; WP-4 A.12, C.15.

### UXP-5 · Explainability before intelligence
- **Requires:** three fixed depths (state → reasoning → evidence), uniform across object types; depth 1 understandable alone, depth 3 always reachable; confidence stated with its basis.
- **Forbids:** conclusions the user cannot trace; forcing the trace to get the conclusion; unqualified certainty.
- **Source:** `[AP-08]` · `[P4:§16/IA-4]`.
- **Enforced in:** IP-09; WP-2 SC-C08/C13; WP-3 IX-1.7–1.10; WP-4 C.1.

### UXP-6 · Clear human-vs-platform responsibility
- **Requires:** a verdict reaches a client only after a named human review; the reviewer is named; agents file, the platform never files autonomously; AI never the sole basis for a consequential decision.
- **Forbids:** any review-gate bypass; autonomous filing; presenting AI output as a human legal decision.
- **Source:** `[BR-01]` · `[AP-05]` · `[BR-09/T3]` · `[P5:X1]`.
- **Enforced in:** WP-3 IX-1.5/1.6, IX-2.5/2.6; WP-4 A.10/A.11; Constraint Register CR-2/CR-9.

### UXP-7 · No dead ends
- **Requires:** every terminal state offers a forward action or a dignified persistence; unfavourable/inconclusive verdicts designed with the same care as favourable, with alternatives at equal weight; zero-result and error states offer a next step.
- **Forbids:** greyed-out husks; a "no" that is visually or interactionally degraded.
- **Source:** `[P5:principle 3]` · `[P4:§11.6/§15.1/§19.2]` · `[Philosophy §3]`.
- **Enforced in:** WP-3 IX-1.9/1.10/1.13; WP-2 SC-C04; WP-4 A.1.

### UXP-8 · Deadline safety
- **Requires:** deadlines computed from versioned rules and human-confirmed for critical ones; criticality never colour-only; never silently modify/delete deadline history; a miss is never silent.
- **Forbids:** authored (non-computed) deadlines; advancing past a critical deadline without human confirmation; invented durations.
- **Source:** `[AP-07]` · `[BR-03/BR-13]` · `[P5:X9]` · `[NFR-C01]`.
- **Enforced in:** IP-11; WP-3 IX-3.1/3.2/3.5; WP-4 A.8, C.14.

### UXP-9 · Assessment ≠ engagement (clear separation)
- **Requires:** the assessment is free, human-reviewed, and precedes any payment/Engagement/Matter; payment and Engagement appear only on a decision to file; the reviewer is not the client's agent and there is no client↔reviewer channel.
- **Forbids:** any payment/Engagement before or during the free assessment; a general client↔agent or client↔reviewer messaging channel.
- **Source:** `[ADR:§4/§6/§7]` · `[P5:X5]` · `[DL:D-2026-015 A2]`.
- **Enforced in:** WP-1 J-E…J-K; WP-3 IX-1.4/O.5/O.6/O.7; Constraint Register CR-10/CR-11.

### UXP-10 · Clear tenancy boundaries
- **Requires:** existence across a tenancy boundary is itself confidential (invisible 404); scoped, audited access (review grant / matter-scoped grant); one context at a time.
- **Forbids:** stubs, counts, locked placeholders for cross-tenant objects; blended contexts; any cross-matter/portfolio aggregation an agent isn't engaged on.
- **Source:** `[P4:IA-5/§2.3/§17]` · `[P5:X6/X7]` · `[ADR:§6]`.
- **Enforced in:** IP-16/IP-22; WP-3 IX-2.5; WP-4 A.5/A.15; Constraint Register CR-4/CR-5.

---

# PART B — Phase 6 Constraint Register (MUST NOT be violated)

The consolidated list the eventual UI designer/developer must not violate. Each is a frozen requirement (or a governance boundary derived from one). "Enforced in" points to where Phase-6 already applies it.

## B.1 Architecture & data
| # | Constraint | Source | Enforced in |
|---|---|---|---|
| CR-1 | **Invention is the root**; Applications are its children; the Invention persists independently (incl. Not pursued/Lapsed). | AP-01, P3:§14.3, P5:X3 | WP-1 §2; WP-2 SC-C02/C04 |
| CR-3 | **Three-zone separation**; Zone 1 stays Zone 1; no Zone-3 pipeline reads Zone 1; Disclosure is Z1 from first keystroke. | AP-03, D2, BR-15, P5:X11 | WP-3 IX-1.1; WP-2 SC-C03 |
| CR-14 | **Rules are data**; deadlines/official fees computed from versioned rules, never hardcoded. | AP-02, D1, BR-14 | IP-11/IP-17; WP-4 A.8/C.14 |

## B.2 The trust gate & provenance
| # | Constraint | Source | Enforced in |
|---|---|---|---|
| CR-2 | **Mandatory human review before any verdict release; no bypass path.** | BR-01, P5:X1 | WP-3 IX-1.5/1.6, IX-2.5/2.6; WP-4 A.10 |
| CR-6 | **Provenance or it isn't shown** — no assertion displayed as verified without a resolvable citation; fail-safe on unresolved. | AP-04, BR-02, P5:X2 | IP-07/08; WP-3 IX-1.11; WP-4 A.12 |
| CR-7 | **AI never the sole basis** for a consequential decision; a human Decision record must exist; agents file, platform never files autonomously. | BR-09/T3, AP-05 | WP-3 IX-1.12/1.13, IX-O.7; WP-4 A.3 |
| CR-8 | **Reviewer ≠ drafter; review grant is the narrowest sufficient access; no new reviewer permission model; no client↔reviewer channel.** | ADR:§5/§6, DL:D-2026-015 A2 | WP-3 IX-2.4/2.5; WP-4 A.11 |

## B.3 Status, tenancy & access
| # | Constraint | Source | Enforced in |
|---|---|---|---|
| CR-4 | **Two-axis status always visible**, never merged/truncated; states only from the taxonomy (none invented); "Closed" never without its reason. | AP-14, P4:§11, P5:X8 | WP-2 status fields; WP-4 C.9/B.3 |
| CR-5 | **Cross-tenant invisibility** — invisible 404; no stubs/counts/placeholders; scoped+audited access; one context at a time. | P4:IA-5/§2.3, P5:X6/X7 | IP-16/22; WP-4 A.5/A.15 |
| CR-12 | **No silent permission escalation** — a lacking permission routes to request, never auto-grants. | P4:§17.2, P5:X13 | IP-15; WP-3 IX-1.12 |

## B.4 Sequencing, money & scope
| # | Constraint | Source | Enforced in |
|---|---|---|---|
| CR-10 | **Free assessment precedes payment/Engagement/Matter**; those appear only on a decision to file. | ADR:§7, P5:X5 | WP-1 J-E…J-K; WP-3 IX-1.4/O.6 |
| CR-11 | **Client↔agent communication confined to active matters**; no general messaging; no client↔reviewer channel. | DL:D-2026-015 A2, ADR:§6 | WP-3 IX-O.7 |
| CR-13 | **Deadline safety** — computed + human-confirmed criticals; never silently modify history; a miss is never silent. | AP-07, BR-03/BR-13, NFR-C01 | IP-11; WP-3 IX-3.x; WP-4 A.8 |
| CR-15 | **One price component, two modes** (component primary); official fees always separately identifiable; no per-screen price logic; **O-2026-001 stays legally OPEN**. | P4:§21/IA-7, P5:X12, DL:O-2026-001 | IP-21; WP-2 pricing screens; WP-4 A.13/C.15 |

## B.5 Terminology, boundaries & V2 fences
| # | Constraint | Source | Enforced in |
|---|---|---|---|
| CR-16 | **Controlled vocabulary only**; dual-register (plain leads, term-of-art in same view); banned-terms list; **"Agent Matching / Engagement," never "Marketplace"**; **ALDASSIST**, never `[Platform]`/`[Mark]`. | P4:§10, ADR:§13.8, DL:D-2026-014 | all WPs |
| CR-17 | **Responding is status-only** — status + response deadline + agent-uploaded filed response; **no in-product prosecution workspace/authoring**. | DL:D-2026-016, P5:§9-A | WP-3 IX-O.8/IP-20; WP-4 A.14/B |
| CR-18 | **No V2 features in MVP** — no drafting/prosecution workspace, renewals, portfolio monitoring, institutional flows, licensing marketplace, multi-currency, native mobile, re-assessment diff. | P5:§10, P4:§7 | WP-2 §7; WP-3/WP-4 V2 fields |
| CR-19 | **No invented values** — no SLA, confidence/statistical threshold, pricing value, legal wording, retention period, or permission rule invented; unknowns stay `[SLOT]`. | governance (WP-0/WP-3/WP-4) | Part D.1 |
| CR-20 | **Free-assessment no-gate** working assumption preserved; any future gate is an ADR §7 extension. | DL:D-2026-017 | WP-3 IX-1.4 |
| CR-21 | **Agent outcome statistics** shown only at n≥20 with sample size + confidence indicator; below floor "not enough data yet"; publication L3-gated. | DL:D-2026-019, BR-17 | WP-2 SC-P13; WP-3 IX-O.5 |

> **Note on numbering.** CR-# are WP-5 register identifiers grouped by theme (not contiguous by category); each maps to a cited frozen source. No new rule is created here.

---

# PART C — Master traceability matrix

Consolidated from WP-2 (per-screen), WP-3 (per-interaction) and WP-4 (edge/responsive/foundations). Per-field detail lives in those documents; this matrix is the single index. Columns: **Flow (P5) · IA (P4) · Rule (P3/ADR) · Decision/Constraint (DL / CR / legal-V2)**.

## C.1 Screen → baseline
| Screen | P5 | P4 | P3/ADR | DL / CR / legal·V2 |
|---|---|---|---|---|
| SC-P01 Home | F1 | §4/§12.2 | — | CR-16 |
| SC-P02 Search | F1/F13 | §4/§13.1 | FR-S01/S11 | CR-3 (Z1/Z2) |
| SC-P03 Document page ★ | F1/F13 | §4.2 | FR-S05, §12.1 | CR-16 |
| SC-P04 Stage landings | F1 | §2.1/PT-3 | — | CR-15 [L1] |
| SC-P05 Segment landings | F1/F21 | PT-2 | — | CR-18 (uni=client app) |
| SC-P06 Pricing | F1 | §4/§12.2 | BR-14 | CR-15, O-2026-001 |
| SC-P07 Cost Planner | F1 | IA-8/PT-7 | FR-C01, BR-14 | CR-14/CR-15 |
| SC-P08 Path finder | F1 | §2.1/PT-12 | — | CR-19 (cost range slot) |
| SC-P09 Guides | F1 | §23/§24 | BR-14 | CR-16 |
| SC-P10 Glossary | F1 | §24.2 | — | CR-16 |
| SC-P11 Jurisdiction guide | F1 | §24 | — | CR-18 (India/PCT only) |
| SC-P12 Reports | F1 | §23 | — | CR-16 (no unverifiable stats) |
| SC-P13 Agent directory/profile | F14 ctx | PT-10 | BR-17 | CR-21, D-2026-019, CR-15 |
| SC-P14 Trust | F1 | §4 | §12.6, §12.5 | L4 [LEGAL SLOT] |
| SC-P15 Company/Legal | F1 | §4 | — | L1-20/L4 [LEGAL SLOT] |
| SC-P16 Account/sign-in | F2 | IA-8 | J1 | D-2026-015 A1, CR-16 |
| SC-C00 Workspace interstitial | F3 | §5/IA-5 | §4.1 | D-2026-015 A1/A3 |
| SC-C01 Home action queue ★ | F20 | §18.1 | — | CR-4 |
| SC-C02 Inventions index | F4/F20 | §5.1 | — | CR-1 |
| SC-C03 Disclosure capture ★ | F4 | §5/§15.1 | M1.2, FR-D02/D03, §12.1, D2 | D-2026-015 A3, CR-3, IP-03 |
| SC-C04 Invention detail ★ | F4/F10/F11 | §15.1 | — | CR-1, UXP-1/7 |
| SC-C05 Disclosure/versions | F4 | §5 | FR-D02, BR-20 | CR-1 |
| SC-C06 Assessment request | F5 | §13.1 | ADR §7/§9, §12.4 | D-2026-017, CR-10/CR-20 |
| SC-C07 Assessments list | F6/F9 | §15.1 | ADR §11 | CR-1 |
| SC-C08 Assessment detail ★★ | F9 | §15.2/§16/§11.6 | BR-01/02, §12.5 | CR-2/CR-6, UXP-4/5/7 |
| SC-C09 Decision record | F10/F11 | §17.2 | BR-09, ADR §7 | **DR-01 deferred**, CR-7/CR-12 |
| SC-C10 Portfolio index | F16/F19 | §5.1 | — | CR-1 |
| SC-C11 Application detail ★ (silence/Responding) | F16/F19/§9-A | §15.3/§19.4/§11.3 | D1, §20.3, NFR-A05 | D-2026-016, CR-17/CR-13 |
| SC-C12 Deadlines index | F19 | §11.5 | D1 | CR-13/CR-14 |
| SC-C13 Deadline detail (trace) | F19/§8-G | §16.1/§12.5 | BR-03/BR-13 | CR-13 |
| SC-C14 Matters index | F15/F16/F17 | §11.4 | — | CR-11, CR-15 [L1] |
| SC-C15 Matter workspace ★ | F16/F17 | §15.4 | M1.6, BR-09 | CR-11/CR-17, D-2026-015 A2 |
| SC-C16 Costs | F15/F16 | §21/§5 | BR-14 | CR-15, O-2026-001 |
| SC-C17 Documents index | F16/F19 | §5 | §19, BR-18 | CR-3 |
| SC-C18 Find an agent (matching) | F14/§8-H | §5/§21/§11.4 | M1.5, BR-06/10/17 | D-2026-019, O-2026-001, CR-16 |
| SC-C19 Quote & engagement ★ | F15/§8-K | §21/§17.2 | P6/D4, BR-06, ADR §11 | CR-10/CR-15, O-2026-001 |
| SC-C20 Settings | F18 | §18.2/§14.2 | BR-16 | CR-19 (MFA slot), L7 |
| SC-C21 Notifications (client) | F18/§8-F | §18.2 | §16.2/16.5 | CR-13/UXP-2 |
| SC-A00 Onboarding/verification | F21 | §6 | M4.3, §26 D6, ADR §5 | CR-8 |
| SC-A01 Today | F20/F7/F23 | §6/§12.4 | J7 | CR-8 (rhythm) |
| SC-A02 Docket + confirm | F22/F16/§8-G | §6/§12.5 | BR-03/BR-13, D1 | CR-13 |
| SC-A03 Matters index (agent) | F16/F22 | §6/§17.3 | BR-05(notice) | CR-5 |
| SC-A04 Matter import ★ | F22 | §6.1 | M2.1, D1, ICP-2 | **DR-02 deferred** |
| SC-A05 Agent matter detail | F16/F17 | §6/§17.2 | BR-09/T3/BR-19, ADR §11 | CR-7/CR-17/CR-18 (no draft/prosec) |
| SC-A06 Reviews queue ★ | F7/F23 | §6.1 | ADR §5, BR-01 | CR-2/CR-8 |
| SC-A07 Review workspace ★★ | F8/F23/§8-J | §6.1/§17.2/AT-5 | BR-01/02/05(notice), ADR §5/§6, §12.5, FR-A08 | CR-2/CR-6/CR-8, D-2026-018 |
| SC-A08 Opportunities | F14/F15 | §6 | M1.5, BR-06/10 | CR-15 [L1], O-2026-001 |
| SC-A09–12 Practice | F21/F14 ctx | §6 | M2.4, BR-17 | CR-21, D-2026-019, CR-15 |
| SC-A13 Agent settings | F21/F18 | §18.2 | BR-10 | CR-13 |
| SC-A14 Notifs + context switch | F18/F20 | §18.2/§2.3 | — | CR-5 (context isolation) |
| SC-O01 Docket Health ★ | §8-D/F/G | §8 | M4.1, BR-03, NFR-C01, §16.5 | CR-13, OP-5/D-2026-018 |
| SC-O02 Agent verification | F21 | §8 | M4.3, §26 D6 | CR-8 |
| SC-O03 Rule Authoring ★ | (underpins F16/F19) | §8 | M4.4, D1, BR-07/14, AP-02 | CR-14 |
| SC-O04 Quality & Review | F6/F23 | §8 | M4.2, §12.3 | D-2026-018 (OP-6) |
| SC-O05 Business dashboard | — | §8/§6 | Metrics | D-2026-018, CR-19 (no OP-2 target) |

## C.2 Interaction → baseline (WP-3)
| Interaction | Patterns | P5 | P4 | Rule / Decision |
|---|---|---|---|---|
| IX-1.1–1.3 Capture/prior-disclosure/completeness | IP-01/02/03 | F3/F4 | §5/§15.1 | M1.2, FR-D02/D03, §12.1; D-2026-015 A3; CR-3 |
| IX-1.4/1.5 Request & waiting | IP-05 | F5/F6/§8-E | §13.1/§16 | ADR §4/7/9; D-2026-017; CR-10/CR-20 |
| IX-1.6 Release & notify | IP-07/13 | F6 | §15.2 | BR-01/02/20/FR-A07; CR-2 |
| IX-1.7–1.10 Verdicts (fav/qual/UNFAV/inconcl) | IP-07/08/09 | F9/F10/§9-C | §15.2/§16/§11.6 | BR-02, §12.5, AP-10; CR-6, UXP-7 |
| IX-1.11 Provenance & failure | IP-07/08 | F9 | §15.2 | BR-02; CR-6 |
| IX-1.12/1.13 Decide file/not-file | IP-10/21 | F10/F11/X13 | §17.2 | BR-09, ADR §7; **DR-01 deferred**; CR-7/CR-12 |
| IX-2.1/2.2 Onboarding/import | IP-06 | F21/F22 | §6/§6.1 | M2.1/M4.3, D1; **DR-02**; CR-8 |
| IX-2.3 Docket/confirm | IP-11/12 | F20/F22 | §6/§12.4 | BR-03; CR-13 |
| IX-2.4–2.7 Review queue/workspace/edits/reassign | IP-06/07/08/16/19 | F7/F8/F23/§8-C/D/J | §6.1/§17.2/AT-5 | BR-01/02/05(notice), ADR §5/6/9, FR-A08; CR-2/6/8; D-2026-018 |
| IX-3.1–3.7 Deadlines/notify/confirm/escalate/silence | IP-09/11/13/14 | F16/F19/§8-F/G | §11.5/§12.5/§16/§19.4/§8 | BR-03/13, §20.3, NFR-C01, D1, AP-07; CR-13 |
| IX-O.5/O.6 Matching/engagement | IP-10/21 | F14/F15/§8-H/K | §5/§21/§11.4 | M1.5, BR-06/10/17, P6/D4; D-2026-019, O-2026-001; CR-15 |
| IX-O.7/O.8 Matter/tracking/Responding | IP-12/14/16/20 | F16/F17/F19/§9-A | §15.4/§15.3/§11.3 | M1.6, BR-09/T3, ADR §11; D-2026-016; CR-11/17 |
| IX-O.9/O.10 Home/notifs/settings | IP-12/13 | F18/F20 | §18.1/§18.2/§14.2 | §16, BR-16; CR-4 |
| IX-O.11/O.12 Public/cost/pricing | IP-04/17/18/21 | F1/F13 | §4/§13/§21 | FR-S01/05/11, FR-C01, BR-14, §12.3; CR-15 |
| IX-O.13 Context switch | IP-22 | §3 | §2.3 | P6; CR-5 |

## C.3 Edge / responsive / foundations
Traced in WP-4 Part G (edge families A.1–A.16 → §8-A…8-K and screen fields; responsive Part B → P4 §20; foundations Part C → P4 §10/11/12/14/15/16/18/19/22 + AP-07/08/14 + BR-01/02/03/13/17/20). Not duplicated here.

---

# PART D — Consolidated registers

## D.1 Design-slots (all Phase-6 slots, deduplicated)
Every unspecified value across WP-1–WP-4, gathered. **None is filled with a guessed value.** Resolution owner in brackets.

| Slot | Where | Resolved by |
|---|---|---|
| Committed review turnaround | WP-1 J-E; WP-3 IX-1.4/1.5; WP-4 A.2/A.4 | Owner/ops (ADR §9 configurable) |
| Assessment confidence representation | WP-3 IX-1.7/1.9; WP-4 B.3/C.15 | Visual design (AP-08; scale not defined) |
| Agent-stat confidence-indicator representation | WP-2 SC-P13; WP-3 IX-O.5 | Visual design (D-2026-019) |
| L1 pricing rendering (component primary; both modes) + disclosure wording | WP-3 IX-O.6/O.12; WP-4 A.13/C.15 | **Legal (O-2026-001 OPEN)** |
| Expected-next-event range; proactive cadence | WP-3 IX-3.6; WP-4 A.9 | Rules Engine / field timelines |
| L6 post-engagement retention window | WP-1 §8-I; WP-4 A.14 | **Legal (L6)** |
| Per-class default notification channels (where §16.2 unset) | WP-3 IX-3.3; WP-4 C.10 | Owner/ops (§16.2) |
| Edit-session idle timeout (+ automatic idle release is a P6 proposal) | IP-03; WP-3 IX-1.1; WP-4 A.4 | Owner (P6 proposal) |
| Agent verification turnaround | WP-3 IX-2.1 | Owner/ops (no invented SLA) |
| Client MFA policy (agent/internal MFA fixed) | WP-3 IX-O.1; WP-4 C.5 | Owner (P4 §2.3) |
| Deadline ladder timings; restoration provisions | WP-4 A.8 | Rules Engine (BR-14/D1) |
| Match-availability notification trigger | WP-3 IX-O.5 | Owner/ops (P5:F14 alt) |
| Legal content (UPL/privilege/residency/advertising/contracting) | throughout | **Legal (L1-06/20, L2/L3/L4/L7)** |
| Visual values: breakpoints, type scale, spacing, grid, colours, icons, touch-target size | WP-4 Part B/C/D | **Visual design (WP-5+); no brand chosen** |

## D.2 Deferred decisions (owner) — status at this gate
| ID | Question | Status | Handling in Phase 6 |
|---|---|---|---|
| **DR-01** | Which role may record a *not-file* Decision (baseline undetermined: P4 §17.2 vs §4.3 analogy) | **Deferred — not resolved at this gate** | Interaction designed **permission-agnostic** (WP-3 IX-1.13; WP-4 A.5). Resolving sets only who sees the affordance; no flow rework. Recorded in the Deferred Decision Register. |
| **DR-02** | Docket-import duplicate handling (baseline silent) | **Deferred — not resolved at this gate** | No de-duplication behaviour designed (WP-3 IX-2.2; WP-4 A.7). Recorded in the Deferred Decision Register. |

Resolutions, when made, are **owner decisions recorded in the Decision Log** (an ADR extension where they refine the ADR) — not in any WP-5/Phase-6 working document. Phase 6 does not resolve them.

---

# PART E — Phase 6 readiness / handoff statement

## E.1 What Phase 6 has produced (all in `03_Design/`, working / not frozen)
1. WP-1 — Journey Map & Global Navigation / Information Hierarchy
2. WP-2 — MVP Screen Inventory (15-field specs)
3. WP-3 — Interaction Design (26-field specs; priorities 1–3 + domains)
4. Interaction Pattern Catalogue (IP-01…IP-22)
5. WP-4 — Edge Cases, Responsive Behaviour, Design-System Foundations
6. Deferred Decision Register (DR-01, DR-02)
7. WP-5 — this governance/consolidation gate (UX principles, Constraint Register, master traceability, consolidated registers)

## E.2 What is decided vs deferred
- **Decided / specified:** the complete MVP journey and screen set; interaction behaviour incl. all edge cases; responsive-web behaviour; information-hierarchy-level design foundations; accessibility at the baseline's existing WCAG 2.2 AA; the constraint set and UX principles.
- **Deferred (owner):** DR-01, DR-02.
- **Open by design (not Phase-6's to close):** O-2026-001 pricing (legal); L1-21/L2/L3/L4/L6/L7 legal dependencies; all visual values (Part D.1).

## E.3 The boundary to the next phase
Per the frozen Roadmap phase sequence: Phase 7 = **Design System**, Phase 8 = **UI**, Phase 9 = **Development**. Phase 6 hands the next phase a UX/interaction specification to implement. The next phase:
- **May** turn the Part C foundations into a concrete visual design system (colours, type, spacing, components) and resolve the visual `[SLOT]`s.
- **Must** honour every constraint in Part B and every UX principle in Part A, and keep DR-01/DR-02 permission-agnostic until the owner resolves them.
- **Must NOT** (at this time, and not started by Phase 6): build the website, touch `aldassist.com`, choose a frontend framework, create React/Next.js/components/code, or deploy — these begin only on explicit owner approval and are out of scope for this gate.

## E.4 Gate status
**Phase 6 (UX & Interaction Design) is internally complete and internally consistent, pending owner review of this gate and resolution of DR-01/DR-02.** No frozen document was modified across WP-1–WP-5. This document does not itself freeze anything; freezing Phase 6 is an owner action recorded in the Roadmap/Decision Log, as with prior phases.

---

# PART F — Governance self-review (this gate)

1. **No new design/state/permission/decision** introduced — WP-5 consolidates only; every entry cites an existing source or an already-recorded proposal/slot.
2. **DR-01 & DR-02 remain deferred** — not resolved here (owner did not resolve them at this gate).
3. **No frozen document touched** — no change to Phase 1–5, ADR, Decision Log, Roadmap, Assumptions, Metrics, Glossary, Architecture Principles, or the L1 Register; additions confined to `03_Design/`.
4. **No build actions** — no website, no `aldassist.com`, no framework, no code, no deployment.
5. **Guardrails restated and held** — review gate mandatory (CR-2); provenance-or-not-shown (CR-6); cross-tenant invisibility (CR-5); two-axis status (CR-4); Responding status-only (CR-17); Agent Matching not Marketplace / ALDASSIST wordmark (CR-16); no V2 (CR-18); no invented values (CR-19).
6. **Could anything read as a frozen decision?** No — Part A/B are consolidations of frozen sources with citations; Part D marks every slot and defers DR-01/DR-02; the readiness statement (E.4) explicitly says WP-5 freezes nothing.

---

*End of Phase 6 — WP-5 v0.1. WORKING DOCUMENT — owner review required. Phase 6 does not proceed to visual UI design, framework selection, frontend implementation, or aldassist.com integration. Those begin only on explicit owner approval.*

