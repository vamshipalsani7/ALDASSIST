# Decision Log

This document records all major product, architecture, and business decisions.

**Structure standardized:** 25 July 2026, under Decision H2.

---

## Template

Every entry uses these fields:

| Field | Meaning |
|---|---|
| **Decision** | What was decided |
| **Status** | Accepted · Open · Proposed · Resolved |
| **Date** | When recorded |
| **Question** | The question the decision answers |
| **Options** | Alternatives considered |
| **Resolution** | The reasoning that resolved it |
| **Impact** | Documents and areas affected |
| **References** | Related decisions and authorities |
| **Owner** | Accountable person |

**Field mapping for entries D-2026-001 to D-2026-013.** These predate the template. On 25 July 2026: the historical decisions were preserved, presentation was standardized to the template above, and minimal structural normalization occurred only where required to fit the template — for example, inferring a `Status` of Accepted for an entry that had none but sat under "Accepted Decisions," or merging a two-field status/pending pair into a single `Status` value. No decision entry was reworded, and no decision's substance was changed. Historical fields map as follows:

- `Decision` → **Decision**
- `Status` → **Status**
- `Date` → **Date**
- `Alternatives Considered` → **Options**
- `Reason` → **Resolution**
- `Affected Documents` → **Impact**
- `Owner` → **Owner**

**Question** was not captured by the original format. It is recorded as *Not recorded* rather than reconstructed.

Repository-governance decisions (A1–N) are recorded in `Repository-Audit/Repository Audit Decision Register.md`, which remains their authoritative source. They are not duplicated here.

---

# Accepted Decisions

## D-2026-001 — Invention as root entity

| Field | Value |
|---|---|
| **Decision** | Invention is the root entity instead of the Application. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Application-centric model (traditional docketing systems) |
| **Resolution** | Supports pre-filing workflows, allows "Don't File" to be a valid product outcome, and makes the Record persist throughout the invention lifecycle instead of beginning only after filing. |
| **Impact** | Phase 3 – Product Architecture · Database Design · Information Architecture · User Flows |
| **References** | AP-01 |
| **Owner** | Vamshi |

---

## D-2026-002 — Rules are data

| Field | Value |
|---|---|
| **Decision** | Rules are data, never application code. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Hardcoded jurisdiction logic |
| **Resolution** | Every jurisdiction should be added by creating rule sets, calendars, fee schedules, adapters and tests—not by modifying business logic. |
| **Impact** | Phase 3 · Deadline Engine · Backend Architecture · Future International Expansion |
| **References** | AP-02 |
| **Owner** | Vamshi |

---

## D-2026-003 — Three-Zone Data Separation

| Field | Value |
|---|---|
| **Decision** | Three-Zone Data Separation. Zones: Zone 1 — Confidential Client Data · Zone 2 — Public Patent Corpus · Zone 3 — Outcome Metadata |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Single shared database |
| **Resolution** | The competitive moat is built from metadata, never confidential invention content. The Outcome Data platform must never have permission to access Zone 1. |
| **Impact** | Product Architecture · Database Design · AI Architecture · Security Architecture |
| **References** | AP-03 |
| **Owner** | Vamshi |

---

## D-2026-004 — Provenance as a system constraint

| Field | Value |
|---|---|
| **Decision** | Provenance is enforced as a system constraint. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Prompt-based citation generation |
| **Resolution** | Every Assertion must contain at least one valid Citation. No AI output can exist inside the product without traceable evidence. |
| **Impact** | Search Architecture · AI · Evidence System · Assessment Module |
| **References** | AP-04 |
| **Owner** | Vamshi |

---

## D-2026-005 — Layer 2 equal to Layer 1

| Field | Value |
|---|---|
| **Decision** | Layer 2 (Professional Experience) is equal in importance to Layer 1 (Client Experience). |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Client-first only |
| **Resolution** | Marketplace businesses fail without supply. Patent Agents must adopt the platform for their own work before they receive marketplace matters. |
| **Impact** | Product Architecture · Agent Console · Marketplace · Roadmap |
| **References** | AP-06 |
| **Owner** | Vamshi |

---

## D-2026-006 — Marketplace-first regulatory model

| Field | Value |
|---|---|
| **Decision** | Marketplace-first regulatory model. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Not recorded |
| **Resolution** | The platform operates as technology infrastructure while regulated patent work is performed by verified patent agents. A captive patent practice may be added later. |
| **Impact** | Business Strategy · Product Architecture · Marketplace |
| **References** | Glossary — *Marketplace* (recorded conflict with ADR §13.8 on the scope of the term) |
| **Owner** | Vamshi |

---

## D-2026-007 — India as launch market

| Field | Value |
|---|---|
| **Decision** | India is the launch market. Architecture remains jurisdiction agnostic. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Not recorded |
| **Resolution** | Validate the product in India while designing for future expansion to: PCT · USA · Europe · UK · Other jurisdictions |
| **Impact** | Business Strategy · Product Architecture · Rules Engine |
| **References** | AP-11 |
| **Owner** | Vamshi |

---

## D-2026-008 — AI assists, humans decide

| Field | Value |
|---|---|
| **Decision** | AI assists professionals. AI never replaces professional judgement. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Not recorded |
| **Resolution** | Every legally significant output requires human review. AI improves productivity but does not make legal decisions. |
| **Impact** | AI Architecture · Assessment · Drafting Workspace · Product Strategy |
| **References** | AP-05 |
| **Owner** | Vamshi |

---

## D-2026-009 — Patents only for Version 1

| Field | Value |
|---|---|
| **Decision** | Patents only for Version 1. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Not recorded |
| **Resolution** | Avoid expanding into trademarks, copyright, designs and litigation until the patent platform reaches maturity. |
| **Impact** | Business Strategy · Product Scope · Roadmap |
| **References** | — |
| **Owner** | Vamshi |

---

## D-2026-010 — Drafting Workspace deferred to V2

| Field | Value |
|---|---|
| **Decision** | Drafting Workspace will be introduced in Version 2 instead of MVP. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Not recorded |
| **Resolution** | The MVP should validate the marketplace, assessment workflow and agent adoption before investing in advanced AI drafting. |
| **Impact** | Product Roadmap · Layer 2 · MVP Scope |
| **References** | Phase 3 §26.3 P1; confirmed in Phase 4 header |
| **Owner** | Vamshi |

---

## D-2026-011 — Controlled Vocabulary as single source of truth

| Field | Value |
|---|---|
| **Decision** | Controlled Vocabulary is the single source of truth. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Not recorded |
| **Resolution** | All UI labels, glossary terms, documentation and help content must use one governed vocabulary. |
| **Impact** | Phase 4 · Glossary · Design System |
| **References** | Glossary (canonical reference under Decision D) |
| **Owner** | Not recorded |

---

## D-2026-012 — Two-axis status model

| Field | Value |
|---|---|
| **Decision** | Every major object exposes two independent status axes: Lifecycle State and Attention State. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Not recorded |
| **Resolution** | Users need to understand both progress and whether action is required. |
| **Impact** | Phase 4 · Phase 5 · Design System |
| **References** | AP-14 |
| **Owner** | Not recorded |

---

## D-2026-013 — Assessment Lifecycle ADR adopted

| Field | Value |
|---|---|
| **Decision** | Assessment Lifecycle ADR adopted. Resolved Stage Gate Review findings C1 and G1. Introduced the Review Grant concept. Established Assessment as a free, human-reviewed pre-engagement capability. |
| **Status** | Accepted |
| **Date** | 24 Jul 2026 |
| **Question** | Not recorded |
| **Options** | Not recorded |
| **Resolution** | Not recorded separately from the Decision statement. |
| **Impact** | Assessment Lifecycle ADR · Phase 2 · Phase 3 · Phase 4 |
| **References** | Assessment Lifecycle ADR; Glossary — *Review Grant*, *Agent Matching*, *Marketplace* |
| **Owner** | Not recorded |

---

## D-2026-014 — Product name: ALDASSIST

| Field | Value |
|---|---|
| **Decision** | The product and repository are named **ALDASSIST**. |
| **Status** | Accepted — recorded retrospectively |
| **Date** | Decision date not recorded. Backfilled 25 Jul 2026 under Decision M. |
| **Question** | Phase 3 §26.3 P4 required confirmation of brand and product naming, because it affects IA labelling in Phase 4. |
| **Options** | Not recorded |
| **Resolution** | Not recorded. The name is in force across the repository: it titles `README.md`, `CLAUDE.md`, `01_Strategy/Architecture Principles.md` and `02_Product/Phase-5-User-Flows v1.0.md`, and it names the repository itself. |
| **Impact** | All documents · IA labelling · Phase 4 |
| **References** | Phase 3 §26.3 P4 |
| **Owner** | Not recorded |

**Backfill note.** Phases 2, 3 and 4 use the placeholders `[Platform]` and `[Mark]` throughout; Phase 5 uses ALDASSIST in its title and body. The point at which the name was adopted is not recorded in any repository document and has not been reconstructed.

---

## D-2026-015 — Phase 5 flow assumptions A1–A3 confirmed

| Field | Value |
|---|---|
| **Decision** | Phase 5 §11 flow assumptions A1, A2 and A3 are confirmed as written for MVP. **A1:** Account and Workspace are distinct; a verified account can use tools and alerts without a Workspace; a Workspace is created on first Disclosure. **A2:** MVP client↔agent communication is confined to active matters; no general client↔agent messaging and no client↔reviewer channel. **A3:** one Disclosure has one editing owner at a time; additional Named Inventors view but co-edit sequentially; institutional ownership wrappers are V2. |
| **Status** | Accepted |
| **Date** | 1 Sep 2026 |
| **Question** | Phase 5 §11 recorded A1–A3 as conservative narrowings awaiting explicit product confirmation before Phase 6 finalises the affected flows. |
| **Options** | Confirm as written · reject/replace each (Workspace-upfront for A1; a reviewer→client clarification channel for A2; concurrent multi-inventor editing for A3) |
| **Resolution** | Each confirmed as the lower-friction, architecture-consistent option. **A3 is confirmed only as an MVP narrowing:** concurrent multi-inventor editing and the co-inventor consent model remain an explicitly deferred gap (Phase 5 §9-B), to be revisited in V2 alongside the institutional flows. |
| **Impact** | Assumptions §3 (A1–A3 now confirmed) · Phase 5 flows F2/F3 (A1), F17 (A2), F4 (A3) · Phase 6 UX |
| **References** | Phase 5 §11; Phase 5 §9-B (canonical record of the A3 multi-inventor gap — Phase 5 §9-B itself attributes the gap to the Stage Gate Review, a non-canonical recovered document that is not cited here as a source); Assessment Lifecycle ADR §6 (A2); Phase 4 §5 (A1) |
| **Owner** | Vamshi |

---

## D-2026-016 — Responding-state handling in MVP (§9-A)

| Field | Value |
|---|---|
| **Decision** | When an Application reaches the **Responding** state in MVP, the client sees an **in-product status view** (option a): the Responding status and the examination-response deadline are displayed and tracked by the Deadline Engine, while the agent prepares and files the response off-platform and uploads the filed response. |
| **Status** | Accepted |
| **Date** | 1 Sep 2026 |
| **Question** | Phase 5 §9-A: MVP files and tracks but has no in-product prosecution tooling (drafting/prosecution workspaces are V2); what does the client experience at Responding — an in-product status view (a) or an off-platform bridge (b)? |
| **Options** | (a) In-product status view + off-platform agent handling · (b) explicit "handled off-platform" bridge |
| **Resolution** | Option (a) preserves custody and deadline safety (AP-07) through a high-anxiety moment and stays within the calm design language, provided the status copy is honest that drafting is the agent's off-platform work. It is a modest surface (status display + response deadline + agent upload), not prosecution tooling, and does not reopen the V2 boundary. |
| **Impact** | Phase 6 Application status screens (Responding) · Deadline Engine (India examination-response deadline) · agent upload surface |
| **References** | Phase 5 §9-A, §1.2; Phase 3 J4 (V2 boundary); AP-07 |
| **Owner** | Vamshi |

---

## D-2026-017 — Free-assessment capacity gate deferred

| Field | Value |
|---|---|
| **Decision** | No eligibility, quota or rate-limit gate is placed on the free, human-reviewed assessment at this time. The standing working assumption is **"no gate"** (ADR §7 "universally free" preserved). The structural decision is **deferred** pending a reviewer cost-per-assessment and Tier-0 volume (COGS/capacity) sizing model. |
| **Status** | Accepted (deferral with a working assumption) |
| **Date** | 1 Sep 2026 |
| **Question** | Repository Audit (2026-07-25) item J: a universally-free, platform-reviewed assessment consumes human-service capacity from the exact cohort Phase 2 §8 said must not exceed ~5% of it. Is there a gate on free assessments, or none? |
| **Options** | No gate (ADR intact) · per-Invention throttle + queue prioritization · Tier-0 AI-only eligibility gate · defer pending sizing |
| **Resolution** | The choice trades funnel width against COGS/capacity and depends on figures the repository does not quantify. "No gate" is held as the working assumption so the ADR is untouched and Phase 6 designs the default no-gate assessment flow; the decision is revisited once the sizing model exists. **Any future gate refines ADR §7 and requires an ADR extension.** Follow-up required: a COGS/capacity sizing analysis (reviewer cost-per-assessment × expected Tier-0 volume). |
| **Impact** | Reviewer capacity planning · COGS model (ADR §8) · Phase 6 assessment flow (F5/F6) — no structural change · ADR §7, §9.4 |
| **References** | Repository Audit 2026-07-25 item J; ADR §7, §8, §9.4; Phase 2 §8 |
| **Owner** | Vamshi |

---

## D-2026-018 — Metric conflicts resolved (Metrics §4.1, §4.2, §4.3)

| Field | Value |
|---|---|
| **Decision** | The three recorded metric conflicts are resolved. **§4.1:** OP-1 (Disclosure→Filing) retains target >25% / failure ~15%; OP-2 (Released Assessment→Paid Filing) is a distinct, higher metric whose target is **calibrated from early released-assessment cohort data** rather than fixed now. **§4.2:** the headline OP-5 counts **platform-attributable** missed deadlines only (target zero; each a Sev-1 incident per NFR-C01); **total** missed deadlines are tracked as a separate operational measure with no zero bar. **§4.3:** OP-6 target is **<15%** ("falling toward") with a **must-hold threshold of <20%**; a reviewer edit is **"material"** if it changes the verdict outcome, adds/removes/changes a citation (provenance), or changes a substantive client-relied-on conclusion — stylistic, clarity, formatting and reordering edits are non-material; the definition is validated against real reviewer edit diffs during measurement design. |
| **Status** | Accepted |
| **Date** | 1 Sep 2026 |
| **Question** | Metrics §4 recorded three conflicts (identical OP-1/OP-2 targets on different denominators; OP-5 scope; OP-6 dual threshold + undefined "material") as recorded-not-resolved, each requiring an approved Decision Log entry to resolve (Metrics §6). |
| **Options** | Per conflict — see Metrics §4.1–§4.3 |
| **Resolution** | OP-1 ≤ OP-2 by construction, so they cannot share a target; OP-1 stays anchored and OP-2 is calibrated from data. OP-5 is split so the company-incident bar applies only to platform-attributable misses while user-inaction misses are still monitored. OP-6 reconciles the two figures as target/threshold (mirroring OP-1's own structure) and adopts a computable, provenance-anchored definition of "material". |
| **Impact** | Metrics §4.1/§4.2/§4.3 and the OP-1, OP-2, OP-5, OP-6 entries · Phase 3 §6 / Phase 4 §8 `/ops/business` dashboard · NFR-C01 |
| **References** | Metrics §3, §4, §6; Phase 2 §20; ADR §12; Phase 3 NFR-C01, M4.2 |
| **Owner** | Vamshi |

---

## D-2026-019 — Minimum sample size for published agent outcome statistics

| Field | Value |
|---|---|
| **Decision** | An agent's outcome statistics are published to clients only once at least **20 matters** exist in the relevant category (n≥20 floor, per category). Every published statistic additionally displays its **sample size and a confidence indicator**; below the floor the surface shows "not enough data yet". Go-live remains gated by the L3 advertising-rules legal review. |
| **Status** | Accepted |
| **Date** | 1 Sep 2026 |
| **Question** | Phase 3 §26.3 P5 / M2.4: what minimum sample size must be met before an agent's outcome statistics are published to clients? (Previously tracked as O-2026-002.) |
| **Options** | n≥20 as proposed · a different floor · n≥20 with mandatory sample-size + confidence display · defer to L3 |
| **Resolution** | Adopts the proposed n≥20 floor (no new number invented). Below the floor, the surface shows "not enough data yet" and publishes no statistic; at or above the floor, every published statistic displays its sample size and a confidence indicator. This satisfies AP-10 (honest product) and AP-08 (explainability) and materially de-risks the L3 review, without publishing any statistic below the n≥20 floor. Affects display only; no Phase 6 flow-structure change. Resolves O-2026-002 and its recorded conflict. |
| **Impact** | M2.4 Agent Profile & Outcome Record · Agent Matching profile surface · Phase 3 §26.1 L3 (go-live gate) · Phase 6 display |
| **References** | Phase 3 M2.4, §26.3 P5, BR-17; O-2026-002; §26.1 L3; AP-08, AP-10 |
| **Owner** | Vamshi |

---

## D-2026-020 — Phase 6 (UX & Interaction Design) frozen; DR-01 and DR-02 deferred

| Field | Value |
|---|---|
| **Decision** | **Phase 6 — UX & Interaction Design is declared frozen** at version v0.1, comprising the working documents in `03_Design/`: WP-1 (Journey Map & Navigation), WP-2 (Screen Inventory), WP-3 (Interaction Design), WP-4 (Edge Cases, Responsive & Design-System Foundations), WP-5 (Design-Governance & Consolidation), the Interaction Pattern Catalogue, and the Deferred Decision Register. Two Phase-6 owner decisions are **explicitly deferred, not resolved**: **DR-01** (which Workspace role may record a *not-file* Decision) and **DR-02** (docket-import duplicate handling). |
| **Status** | Accepted |
| **Date** | 1 Sep 2026 |
| **Question** | Is Phase 6 complete and frozen as the baseline entering Phase 7 (Design System), and what is the status of the two open Phase-6 interaction/permission questions surfaced during design? |
| **Options** | Freeze with DR-01/DR-02 resolved now · **Freeze with DR-01/DR-02 explicitly deferred** · defer the freeze until DR-01/DR-02 are resolved |
| **Resolution** | Frozen with both deferred. Neither DR-01 nor DR-02 is determined by the frozen baseline, and Phase 6 does not resolve owner decisions. The frozen interaction design handles DR-01 **permission-agnostically** (the not-file Decision asserts no specific role) and designs **no de-duplication behaviour** for DR-02, so resolving either later changes only a permission gate / an added import step, with no rework of Phase-6 flows or states. Both remain owner decisions, to be recorded here (an ADR extension where they refine the ADR) when made. Freezing Phase 6 introduced **no change to design substance** and modified no Phase 1–5 document, the ADR, Assumptions, or Metrics. |
| **Impact** | `01_Strategy/Roadmap.md` (Frozen Baseline; Phase Sequence; Current phase) · `03_Design/` Phase 6 documents (freeze notices) · Phase 7 (Design System) inherits the frozen Phase 6 baseline and the two deferred items |
| **References** | `03_Design/Phase-6-WP5-Design-Governance-Consolidation-v0.1.md` (Constraint Register, master traceability, Parts D–E) · `03_Design/Phase-6-Deferred-Decision-Register-v0.1.md` (DR-01, DR-02) · Roadmap Frozen Baseline; README traceability requirements |
| **Owner** | Vamshi |

---

## D-2026-021 — Phase 7 (Design System) frozen; visual design proposals approved

| Field | Value |
|---|---|
| **Decision** | **Phase 7 — Design System is declared frozen** at version v0.1, comprising the working documents in `03_DesignSystem/`: Design System, Design Tokens, Component Catalogue, and Design Governance. The owner **approves the Phase 7 visual design proposals**: the **Calm Institutional** direction, **Inter** (UI/body family), **IBM Plex Mono** (monospace), **Lucide** (icon set), the proposed semantic **colour system**, the **spacing / grid / layout** system, the **breakpoints**, and the **≥44×44px** touch-target design target. These `[P7-PROPOSAL]` values are now owner-approved design decisions. Phase 7 converts the Phase 6 information-hierarchy foundations (WP-4 Part C) into a concrete visual design system, filling only the visual `[SLOT]`s Phase 6 left open and preserving every Phase 6 constraint. |
| **Status** | Accepted |
| **Date** | 2 Sep 2026 |
| **Question** | Is Phase 7 (Design System) complete and frozen as the baseline entering Phase 8 (UI), and are the `[P7-PROPOSAL]` brand-defining values approved by the owner? |
| **Options** | Freeze with the proposals approved · defer the freeze pending changes to the proposals · freeze while holding specific proposals open |
| **Resolution** | Frozen with all listed proposals approved. Phase 7 makes **visual-system decisions only**; it introduces no product, business, permission, or legal decision. All Phase 6 Constraint-Register items (CR-1…CR-21) and UX principles (UXP-1…UXP-10) are preserved — the two-axis status model, provenance as trust anchor, the mandatory review gate, cross-tenant invisibility, the controlled vocabulary ("Agent Matching / Engagement," never "Marketplace"), Responding status-only, and every V2 fence remain intact. **DR-01, DR-02 and O-2026-001 remain deferred / open** and are not resolved; the design system handles them agnostically. Remaining `[SLOT]` values (confidence-representation scale, committed review turnaround, deadline-ladder timings, notification-channel defaults, edit-session idle timeout, dark-theme values, and the like), `[LEGAL CONTENT SLOT]` items (L1 wording, L6, L1-21, L2/L3/L4/L7), and the L3-gated publication of agent outcome statistics stay open exactly as specified. Freezing Phase 7 introduced **no change to design substance** and modified no Phase 1–6 document, the ADR, Assumptions, or Metrics. **Phase 8 (UI) is not begun in this operation.** |
| **Impact** | `01_Strategy/Roadmap.md` (Frozen Baseline; Phase Sequence; Current phase) · `03_DesignSystem/` Phase 7 documents (freeze notices) · Phase 8 (UI) inherits the frozen Phase 7 design system and the still-open `[SLOT]` / `[OWNER DECISION]` / `[LEGAL CONTENT SLOT]` items |
| **References** | `03_DesignSystem/Phase-7-Design-System-v0.1.md`, `Phase-7-Design-Tokens-v0.1.md`, `Phase-7-Component-Catalogue-v0.1.md`, `Phase-7-Design-Governance-v0.1.md`; D-2026-020 (Phase 6 freeze); Roadmap Frozen Baseline; README traceability requirements |
| **Owner** | Vamshi |

---

## D-2026-022 — Phase 8 (UI) kickoff decisions approved; implementation not yet begun

| Field | Value |
|---|---|
| **Decision** | The owner **approves the Phase 8 (UI) kickoff decisions** recorded in `04_Development/Phase-8-Kickoff-Audit.md` (audited at the frozen baseline `e0f8caf`). Specifically: **(1) UI stack** — React + TypeScript + Vite, design tokens implemented as CSS custom properties (foundation → semantic → component chain), headless/unstyled accessible primitives styled entirely from tokens, Storybook as the component-catalogue surface, and a fixture-driven typed view-model layer, for the authenticated surfaces (Client/Agent/Ops) and the design-system core; **(2) the presentation-data contract** — the UI is mock/fixture-driven behind typed view-models, with Phase 9 later supplying the real services behind the same contract; **(3) the first implementation slice** — the design-system token spine + trust primitives + the Assessment-detail/verdict screen (SC-C08) in its Client shell; **(4) the controlled batch plan** — B0 (scaffold & decisions) → B1 (first slice) → B2–B5 (Client) → B6 (Agent) → B7 (Ops) → B8 (Public) → B9 (verification), each ending at a constraint-gated review. **Phase 8 is cleared to begin; no UI code has been written and none is authorised by this entry — implementation begins on the owner's explicit go.** |
| **Status** | Accepted |
| **Date** | 3 Sep 2026 |
| **Question** | Is the frozen `e0f8caf` baseline ready to enter Phase 8 (UI), and are the UI stack, data-contract approach, first slice and batch plan approved? |
| **Options** | Per the Kickoff Audit §7 — Option A (React + TS + Vite) · Option B (SvelteKit) · Option C (Vue 3); begin with the trust-spine/verdict slice vs. the Public-surface slice; approve now vs. defer. |
| **Resolution** | Option A adopted for the authenticated surfaces and the design-system core (mainstream accessible-primitive ecosystem, first-class Lucide/React support, largest hiring pool for an India-based team, and a token-first styling model that honours the framework-neutral token architecture and AP-12 maintainability). The trust-spine/verdict first slice is chosen because it exercises the hardest constraints (CR-2 review gate, CR-4 two-axis status, CR-6 provenance) on the highest-stakes screen and needs no resolved DR-/O- item and no legal copy. **The Public-surface rendering strategy (SSR/SSG vs SPA) is deliberately held as a separate, later decision so no hosting/domain work is implied at kickoff.** DR-01, DR-02 and O-2026-001 remain **open** and the UI is built agnostic to all three; every `[SLOT]` / `[LEGAL CONTENT SLOT]` stays open and is rendered as a container, never an invented value; no V2 feature enters MVP; no frozen Phase 1–7 document is modified. |
| **Impact** | `04_Development/` (Phase 8 UI work begins here) · `01_Strategy/Roadmap.md` (Phase 8 status: kickoff approved, implementation not begun) · inherits the frozen Phase 6 (D-2026-020) and Phase 7 (D-2026-021) baselines and every open `[SLOT]` / `[OWNER DECISION]` / `[LEGAL CONTENT SLOT]` |
| **References** | `04_Development/Phase-8-Kickoff-Audit.md`; D-2026-020 (Phase 6 freeze); D-2026-021 (Phase 7 freeze); Roadmap Frozen Baseline & Phase Sequence; AP-02/AP-09/AP-11/AP-12/TA-6/TA-10; O-2026-001, DR-01, DR-02 (remain open) |
| **Owner** | Vamshi |

**Follow-up (owner, not resolved here):** confirm that Phase 3 §26.3 product decisions **P2 and P3** are not UI-affecting (Assumptions §5); decide the Public-surface rendering strategy before that surface ships; the legal-dependent surfaces (Pricing, checkout, published agent statistics, Trust/Legal) remain buildable now but go **live** only after L1/L3/L4 land.

---

## D-2026-023 — Phase 7 §A.1 amended (Option B): closed five-family component-token→foundation allowance

| Field | Value |
|---|---|
| **Decision** | **Phase 7 §A.1 (and its restatements in Design Tokens Part G and Design Governance) is amended under Option B** to permit a **component token** to resolve **directly to a foundation token** when — and only when — its target belongs to one of five **families for which Phase 7 establishes no semantic tier**: `radius`, `elevation`, `sizing`, `motion`, `z-index`. This resolves the internal §A.1 ↔ Part G specification conflict, in which Part G already resolves `card.elevation → elevation.0/1`, `statechip.radius → radius.pill`, `table.compact.row.height → size.control.sm`, and `table.comfortable.row.height → size.control.md` directly to foundation. The allowance is a **closed list** and **fail-closed**: any family not named is prohibited. The rule governing **component styles** is unchanged and absolute — a component style references component tokens only and never a semantic, foundation, or raw value. `border-width` is **excluded** (the semantic token `focus.ring.width` establishes a semantic tier over it); `breakpoint` is **not** included (never consumed as a component token). No token is added, renamed, or revalued; no component CSS is changed. |
| **Status** | Accepted |
| **Date** | 13 Sep 2026 |
| **Question** | How should the §A.1 binding rule ("component tokens resolve to semantic tokens only; components never reference foundation directly") be reconciled with Part G, which itself resolves four component tokens directly to foundation? |
| **Options** | Option A — preserve §A.1 and introduce semantic-tier tokens for the affected roles · **Option B — amend §A.1 to permit component-token→foundation for a closed list of families for which Phase 7 establishes no semantic tier** · leave the conflict open |
| **Resolution** | **Option B**, scoped to the closed five-family list validated against all four frozen Phase 7 sources (each family is foundation-only in Design Tokens Part B, with no semantic token in Parts C–F). The component-style consumption rule is preserved unchanged and stated separately from the component-token-definition rule to remove ambiguity. The amendment is **major** per the Design Governance versioning rule (B.11 — it touches a cross-cutting binding rule); the exact resulting design-system version is determined from the currently recorded Phase 7 design-system version at implementation time (no version number is invented here), applying the repository's existing versioning convention, and the increment is recorded when the amendment is implemented. This is a **design-system architecture decision only** — it introduces no product, business, permission, or legal decision, and resolves none of DR-01, DR-02, O-2026-001, or any `[SLOT]` / `[LEGAL CONTENT SLOT]`. All Phase 6 constraints (CR-1…CR-21) and UX principles (UXP-1…UXP-10) remain intact. |
| **Impact** | `03_DesignSystem/Phase-7-Design-Tokens-v0.1.md` (§A.1 binding-rule amendment note; Part G intro amendment note) · `03_DesignSystem/Phase-7-Design-Governance-v0.1.md` (B.1 amendment note; new §B.14) · `01_Strategy/Roadmap.md` (Frozen Baseline amendment note; design-system version classified major, number deferred) · `04_Development/ui/scripts/check-token-hierarchy.mjs` (allow-condition: five-family test — separate implementation step) · `04_Development/Phase-8-B1-TokenHierarchy-Traceability.md` (four tokens reclassified Class D→A; new sanctioned endpoint category) |
| **References** | `04_Development/Phase-8-B1-A1-Amendment-FINAL.md` (this amendment's exact wording); `Phase-8-B1-A1-Conflict-Options-Brief.md` (Option A vs B analysis); `Phase-8-B1-TokenHierarchy-Traceability.md`; D-2026-021 (Phase 7 freeze); D-2026-022 (Phase 8 kickoff); README traceability requirements |
| **Owner** | Vamshi |

---

## D-2026-024 — Phase 9 (Development) kickoff: P9-B0 wiring/architecture/sequencing baseline approved

| Field | Value |
|---|---|
| **Decision** | The owner **approves the P9-B0 specification** (`04_Development/Phase-9-B0-Specification-v0.2.md`) as the **Phase 9 wiring, architecture and sequencing baseline**. Specifically approved: **(1)** the readiness classification (R0–R4); **(2)** the three-level Port → backing-capability/service → transport-representation mapping for all 57 frozen Phase 8 ports (no endpoint is fixed by this approval); **(3)** the four strategies — fixture-adapter (fixtures retained permanently as the conformance oracle), tenancy/authorisation boundary model, failure/freshness semantics, and testing strategy including **"The Floor"** (the frozen Phase 8 suite — 188 tests / 48 files + eight static gates — as a mandatory regression gate on every Phase 9 batch); **(4)** the **Contract-Change Candidates Register** (CC-1…CC-5) as the master list of proposed contract additions, every one of which remains a *candidate* gated by G-1 or by an owner decision and none of which is authorised to be written by this approval; **(5)** the **dependency-readiness** sequencing principle (over surface parity) and the batch plan **B1a → B1b → B2 … → B14**, adopted as the Phase 9 **plan only**. **No implementation is authorised by this entry: no code is written, no sibling contract module is created, `04_Development/ui/src` is not modified, and Phase 8 remains frozen at `0ddf8bb`.** |
| **Status** | Accepted |
| **Date** | 20 Sep 2026 |
| **Question** | Is the P9-B0 specification approved as the Phase 9 baseline — its readiness model, port→capability→transport mapping, strategies, contract-change candidate register, and dependency-readiness batch sequence — as a plan, without authorising implementation or resolving any open item? |
| **Options** | Approve P9-B0 v0.2 as the baseline (plan only) · request further revision · defer. |
| **Resolution** | Approved as the plan. Dependency-readiness governs sequencing because Phase 9's dominant gate is the absent back end (27 of 57 ports are R1), not integration; surface parity is explicitly rejected as a sequencing criterion (hence Home/Agent-Today sequence late as fan-in aggregators, and the Public surface splits across B12/B13). The **inherited** architecture ADRs are carried **by reference, not re-decided here**: ADR-05 internal-first REST (Phase 3 §21), ADR-07 core rules-as-data boundary (AP-02 · D-2026-002 · Phase 3 §18), ADR-08 zone enforcement at the database-permission level (D-2026-003 · Phase 3 §13.1). The two **interpretation** ADRs established by this approval are recorded separately as **D-2026-025** (authorisation is server-authoritative) and **D-2026-026** (composition root & provider injection). **The following remain explicitly OPEN and are NOT resolved by this approval:** governance gate **G-1** (whether a new sibling `src/contract/*` module counts as modifying the frozen artifact — gates CC-1…CC-4a and blocks P9-B3), **ADR-01** (application topology & Public rendering strategy — the deferred D-2026-022 item), **ADR-03** (command/write surface), the **ADR-06 placement** sub-question, **G-2** (Phase 9 tree/package boundary), **G-3** (freshness/cache envelope form), **G-4** (TA-8 rules escape-hatch approval mechanism), **M2** (authoritative CR-16 lexicon), and every product/legal/slot item — **DR-01, DR-02, O-2026-001, L1–L7, S-1/S-2/S-3/S-5/S-7/S-10, P2, P3, GATE**. Each stays exactly as the Phase 8 freeze report §8/§9 records it; the open-slot preservation test (extended to real adapters, FA-6) is the mechanical guarantee that Phase 9 wiring resolves none of them silently. **Audit finding M3 is recorded as evidence-resolved** — see the M3 note below. |
| **Impact** | `04_Development/Phase-9-B0-Specification-v0.2.md` (the approved baseline artifact) · Phase 9 (Development) work is governed by this baseline · **inherits** the frozen Phase 6 (D-2026-020), Phase 7 (D-2026-021, as amended by D-2026-023) and **Phase 8 (`0ddf8bb`)** baselines and every open `[SLOT]` / `[OWNER DECISION]` / `[LEGAL CONTENT SLOT]` · `01_Strategy/Roadmap.md` — a Phase 8-frozen / Phase 9-active **status update is a pending owner action (G-6 / P9-B0 §14.1 C-1) and is NOT made by this entry** · establishes **D-2026-025** and **D-2026-026** |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md`; `Claude outputs/Phase-8-Closure-Freeze-Report.md` (freeze tip `0ddf8bb`); D-2026-022 (Phase 8 kickoff); D-2026-020, D-2026-021, D-2026-023 (frozen baselines); AP-02/AP-09/AP-11/AP-12; Phase 3 §13.1, §18, §20.3, §21, §26; Assessment Lifecycle ADR §6 |
| **Owner** | Vamshi |

**M3 note (evidence-resolved).** A read-only verification recorded in P9-B0 §6.4 checked the seven SC-O05 metric targets transcribed in `04_Development/ui/src/fixtures/scenarios/ops.ts` against `01_Strategy/Metrics.md` (canonical under Decision I): all seven are faithful (five exact, two faithful compressions of the OP-5 target + escalation), and every measured value remains a pending slot. The canonical source **is present in the repository**; audit finding **M3 is therefore evidence-resolved** and is no longer carried as an open Phase 9 dependency. The two Phase-8-frozen notes that state "Metrics.md is not in this repository" (`Claude outputs/Phase-8-Closure-Freeze-Report.md` §9(2) and `04_Development/ui/Phase-8-External-Source-Traceability.md`) are **left unchanged** — they are frozen Phase 8 text; correcting them is a documentation-hygiene owner action, not part of this approval.

---

## D-2026-025 — Phase 9 authorisation is server-authoritative (P9-ADR-04)

| Field | Value |
|---|---|
| **Decision** | In Phase 9, **authorisation and tenancy are resolved on the server; the actor is never client-asserted.** Cross-tenant invisibility (CR-5) is enforced server-side: a cross-tenant object is returned as `not-found` carrying nothing, and the client never receives it — client-side filtering of Zone 1 is prohibited, because any client-side filter implies the object was transmitted, which is the exact breach CR-5 exists to prevent. `permission-denied` (same tenancy, above role — CR-12/IP-15) remains distinct from `not-found` and is never conflated with it in either direction. The one legitimate cross-tenant read — `DocketHealthProvider` (SC-O01) — is a **separately-credentialed operations path** returning metadata/refs/status only, audited and justified, holding no grant on Disclosure bodies (BR-16). |
| **Status** | Accepted |
| **Date** | 20 Sep 2026 |
| **Question** | Is CR-5 / CR-12 enforced by the server, the client, or both, given that the frozen Phase 8 ports carry no actor argument? |
| **Options** | Option A — server-authoritative only · Option B — client also filters (defence in depth). |
| **Resolution** | Option A, unconditionally. Phase 3 §15.1 records disclosure exposure as *irreversible*; client-side filtering of Zone 1 is the vulnerability, not defence in depth. This is an **interpretation** of accepted constraints (CR-5; Phase 3 §15.1), confirmed by the P9-B0 approval; it resolves no open DR-/O-/L-/S-/P-/G- item and invents no new architecture. It constrains Phase 9 batch P9-B2 (Identity, tenancy & access) and is exercised by the authorisation-matrix tests (TS-5). |
| **Impact** | Phase 9 P9-B2; internal API design (actor from session, never a request field); `DocketHealthProvider` implementation (separate credentials) · realises the frozen tenancy model in Phase 8's `ScreenState` (uniform `not-found`) with no change to any Phase 8 file |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §4 (P9-ADR-04), §8; CR-5, CR-12; Phase 3 §4.2, §15.1; Assessment Lifecycle ADR §6; D-2026-024 |
| **Owner** | Vamshi |

---

## D-2026-026 — Phase 9 composition root & provider injection (P9-ADR-02)

| Field | Value |
|---|---|
| **Decision** | Phase 9 introduces a **single composition root** that supplies a **typed provider registry through one React context** at the application root, mirroring the existing `CitationResolverContext`. Phase 8 screens keep their pure `({ loaded })` props; thin container components call the port and pass `Loaded<T>` down, so **no frozen Phase 8 screen is modified in shape**. Runtime mode (`fixture` / `contract` / `live` — fixture-adapter strategy FA-4) is resolved **once**, at this root. **The `CitationResolverContext` fixture default is inverted in Phase 9: a `live` build must hard-fail if any fixture provider is reachable**, never silently fall back to fixtures. |
| **Status** | Accepted |
| **Date** | 20 Sep 2026 |
| **Question** | Where are providers constructed and how do the frozen, fetch-free screens reach them, given that `App.tsx` currently imports scenario maps directly and no composition root exists? |
| **Options** | Option A — one typed provider registry via a single root context · Option B — per-screen hooks calling ports directly · Option C — a data-fetching library as the seam. |
| **Resolution** | Option A, with any caching handled inside provider implementations rather than at the component layer (preserving the pure-props property the frozen screens depend on, and the single `Loaded<T>` state model). This is a **mechanism interpretation** consistent with the frozen contract; it resolves no open item. It defines the completion boundary of Phase 9 batch **P9-B1a** (every frozen screen renders through the injection seam against the `Fixture*` providers, with no back end). It does **not** authorise writing any provider, composition-root, or contract code — that is P9-B1a implementation work, begun only on the owner's explicit go. |
| **Impact** | Phase 9 P9-B1a (runtime & composition foundation) · fixture-adapter strategy (FA-1/FA-4) · inverts the `CitationResolverContext` default in Phase 9 code (no change to any Phase 8 file) |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §4 (P9-ADR-02), §7, §11; `04_Development/ui/src/components/CitationResolverContext.tsx` (the mirrored seam); D-2026-024 |
| **Owner** | Vamshi |

---

## D-2026-027 — G-1 resolved: additive sibling contract modules permitted while frozen Phase 8 contract files stay unchanged

| Field | Value |
|---|---|
| **Decision** | **Governance gate G-1 is resolved: YES.** Adding a **new sibling module** under `04_Development/ui/src/contract/*` (e.g. `commands.ts`, `queries.ts`, or any future companion) is treated as an **addition**, not a modification of the frozen Phase 8 artifact — **provided every frozen Phase 8 contract file remains byte-for-byte unchanged.** This resolves G-1 as recorded open in the P9-B0 baseline (§4.3) and **permits the planned `commands.ts` (command/write surface — CC-1) and `queries.ts` (query/pagination types — CC-2) additions**, and settles the P9-ADR-06 *placement* sub-question in favour of **Option B** (a sibling `queries.ts`, with the frozen zero-argument `list()` forms preserved as "first page, default view"). **No such module is authored or created by this entry; the additions are permitted only when their authorised batches arrive (the command surface in P9-B3; query types alongside).** No `src/contract/*` frozen file, no `04_Development/ui/src` file, and no Phase 8 artifact is modified. |
| **Status** | Accepted |
| **Date** | 20 Sep 2026 |
| **Question** | Does adding a new sibling module to `src/contract/*` count as *modifying* the Phase-8-frozen contract artifact, or as an *addition* that leaves every frozen file unchanged? |
| **Options** | YES — additions permitted, frozen files unchanged · NO — the contract surface is frozen whole (any addition needs a versioned successor contract or an owner-authorised unfreeze). |
| **Resolution** | YES. The frozen unit is the set of Phase 8 contract **files**; a new file adjacent to them adds to the surface without altering any frozen byte, and the barrel/consumption pattern already anticipates sibling modules. This clears the governance blocker for the Contract-Change Candidates Register's additive candidates — CC-1 (`commands.ts`), CC-2 (`queries.ts`), CC-3 in its companion-port form, and CC-4 option (a) — and confirms the *form* of P9-ADR-03 (Option A: a parallel `commands.ts`, read ports unchanged). It does **not** by itself author or finalise the command-surface operation set or result types; that design and its implementation remain P9-B3 work, begun only on the owner's explicit go. CC-5 (DR-01) is untouched — it is a product decision, not a contract-form question — and remains blocked on DR-01. No open DR-/O-/L-/S-/P- item and no other governance gate (G-2, G-3, G-4, M2) is resolved here. |
| **Impact** | Unblocks the governance form of Phase 9 batch **P9-B3** (command surface) and the sibling-module additions in the Contract-Change Candidates Register (P9-B0 §6) · settles the P9-ADR-06 placement sub-question (Option B) · `04_Development/Phase-9-B0-Specification-v0.2.md` records G-1 as open — that baseline artifact is **not modified**; this Decision Log entry is the authoritative resolution |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §4.3 (G-1), §4 (P9-ADR-03, P9-ADR-06), §6 (CC-1/CC-2/CC-3/CC-4/CC-5), §11 (P9-B3); D-2026-024 (P9-B0 approval); D-2026-020/D-2026-021/D-2026-023 (frozen baselines) |
| **Owner** | Vamshi |

---

## D-2026-028 — P9-ADR-01 resolved (Option B): single-deployable topology — Public surface server-rendered, authenticated application as SPA

| Field | Value |
|---|---|
| **Decision** | **P9-ADR-01 is resolved as Option B.** Phase 9 adopts a **single-deployable topology**: the **Public surface is server-rendered** (SSR/SSG), and the **authenticated application (Client / Agent / Operations) is a single-page application within the same deployable.** Nothing is extracted into a separate deployable. This resolves the application-topology and Public-rendering-strategy question recorded open in the P9-B0 baseline (§4, P9-ADR-01) and closes the **Public-surface rendering strategy** that D-2026-022 deliberately held as a separate later decision. |
| **Status** | Accepted |
| **Date** | 20 Sep 2026 |
| **Question** | One deployable or two, and does the Public surface render server-side, given that the free public register is the stated acquisition wedge and AP-09 mandates a modular monolith? |
| **Options** | Option A — one deployable, SPA throughout · **Option B — one deployable, Public server-rendered, authenticated surfaces SPA** · Option C — a separate public site deployable. |
| **Resolution** | Option B. It is the only option that serves the organic-discovery/acquisition thesis (the free register wedge, Phase 2 §14 / M1.1) with a server-rendered Public surface, while honouring the modular-monolith decision (AP-09 · D3 · T3 · TA-6) because nothing is extracted — one deployable, one internal API, with an added rendering tier for the Public routes only. This is the **new architectural decision** the P9-B0 baseline flagged as owner-required and the deferred item from D-2026-022's follow-up. It shapes the P9-B1a routing/URL shell and the P9-B12 Public rendering work; it authorises **no implementation** — those batches begin only on the owner's explicit go. It resolves no legal, product, or slot item: L1/L3/L4-gated Public surfaces still go live only when their legal dependencies land, and no `[SLOT]`/`[LEGAL CONTENT SLOT]` is resolved. |
| **Impact** | Phase 9 P9-B1a (routing/URL model shell), P9-B12 (Public surface rendering) · closes the D-2026-022 follow-up "decide the Public-surface rendering strategy before that surface ships" · `04_Development/Phase-9-B0-Specification-v0.2.md` records P9-ADR-01 as open — that baseline artifact is **not modified**; this entry is the authoritative resolution |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §4 (P9-ADR-01), §3.8, §11 (P9-B1a, P9-B12); D-2026-022 (Phase 8 kickoff — Public rendering strategy deferred) and its follow-up; D-2026-024 (P9-B0 approval); AP-09, AP-11; Phase 3 §21, §22 |
| **Owner** | Vamshi |

---

## D-2026-029 — G-2 resolved: Phase 9 backend/platform work extends the existing `04_Development/ui/` project (Option A)

| Field | Value |
|---|---|
| **Decision** | **Governance gate G-2 is resolved: Option A.** Phase 9 backend/platform work **extends the existing `04_Development/ui/` project** rather than creating a separate `server/` or `api/` project or a new top-level tree. The frozen presentation contract (`src/contract/*`) stays in place and continues to be consumed within the same project. **This decision fixes only the source-tree location of Phase 9 platform work.** It is distinct from, and does not change, D-2026-028 (P9-ADR-01): the overall system remains a **single deployable**, with the **Public surface server-rendered (SSR/SSG)** and the authenticated **Client / Agent / Operations** application as an **SPA** — a topology decision, not a source-layout decision. **No framework, database, ORM/driver, API framework, migration tooling, or deployment detail is decided or implied by this entry.** |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | Is `04_Development/ui` the Phase 9 application, or does Phase 9 start a new tree consuming the frozen contract as a package? (recorded open as **G-2** in D-2026-024 and P9-B0 §12.3) |
| **Options** | **Option A — extend the existing `04_Development/ui/` project** · Option B — start a new tree/package that consumes the frozen contract as a dependency. |
| **Resolution** | Option A, by owner decision. Phase 9 platform/backend code is added within `04_Development/ui/`, keeping the frozen contract and the existing verification gates in one tree; consequently The Floor's gates (token Gate A inherited baseline 209, raw-value baseline 20) continue to apply to this single project as Phase 9 proceeds. This entry resolves **only** the location question (G-2). It authorises **no implementation** and settles **no** technical-stack item beyond the backend runtime recorded separately in D-2026-030; framework, database, ORM/driver, API implementation, migration tooling and deployment configuration remain open. **P9-B1b is not authorised by this entry.** |
| **Impact** | Resolves G-2 (was open in D-2026-024 / D-2026-027 / P9-B0 §12.3) · Phase 9 P9-B1b (platform & backend foundation) will be laid down **inside `04_Development/ui/`** · The Floor's gates continue against the single tree · **no change** to the single-deployable topology (D-2026-028) · no framework/DB/ORM/API/migration/deployment decided |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §12.3 (G-2), §11 (P9-B1b); D-2026-024 (records G-2 open); D-2026-028 (single-deployable topology — distinct concern); D-2026-030 (backend runtime); AP-09 (modular monolith) |
| **Owner** | Vamshi |

---

## D-2026-030 — Backend runtime: Node.js

| Field | Value |
|---|---|
| **Decision** | **The Phase 9 backend runtime is Node.js.** This entry records the **runtime only.** Node.js does **not** by itself decide the backend **framework**, the **database**, the **ORM/driver**, the **migration tooling**, the **API implementation details**, or the **deployment configuration** — each of those remains **open** for subsequent technical decisions/proposals. |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | What runtime executes the Phase 9 backend/platform code? (the backend-runtime half of the "backend technology stack undecided" blocker recorded in P9-B0 §9) |
| **Options** | **Node.js** · other runtimes (not recorded). |
| **Resolution** | Node.js, by owner decision. Scope is deliberately narrow: the runtime is fixed; nothing else in the backend stack is. The backend **framework**, **database** engine, **ORM/driver**, **migration tooling**, **API implementation** specifics, and **deployment** configuration are **not** decided here and are carried forward as open technical decisions to be proposed and approved separately. No recommendation is converted into a decision by this entry, and **P9-B1b implementation is not authorised.** |
| **Impact** | Fixes the backend runtime for Phase 9 P9-B1b (which will run under `04_Development/ui/` per D-2026-029) · partially closes the P9-B0 §9 "backend technology stack undecided" blocker (runtime only; framework/DB/ORM/migration/API/deployment remain open) · consistent with the existing Node-based UI toolchain (D-2026-022: React + TypeScript + Vite) · authorises no code |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §9 (blockers), §11 (P9-B1b); D-2026-029 (backend location); D-2026-022 (UI stack — Node-based toolchain); Phase 3 §2.2 (architecture shape: modular monolith, PostgreSQL-class DB, Event Log, durable queue — engine/tooling not fixed here) |
| **Owner** | Vamshi |

---

## D-2026-031 — Phase 9 backend stack (framework, database, access layer, migrations, structure, testing/CI)

| Field | Value |
|---|---|
| **Decision** | The owner approves the concrete Phase 9 backend stack, on the previously accepted Node.js runtime (D-2026-030) and within the existing `04_Development/ui/` project (D-2026-029). The six selections are: **(1) Framework — Fastify.** **(2) Database — PostgreSQL.** **(3) Access layer — Kysely + `pg`, with one connection pool and credential per data zone**, subject to the approved zone-separation architecture (D-2026-003 / P9-ADR-08). **(4) Migration tooling — node-pg-migrate; schema, roles, and per-zone GRANTs must remain explicit, reviewable migrations.** **(5) Project structure — backend code under `04_Development/ui/server/`**, the same existing UI project required by D-2026-029; **no separate `server/` or `api/` project or tree is created.** **(6) Testing / CI / environment — a Vitest node project + a disposable Docker PostgreSQL + TS-2 fitness gates integrated into `scripts/verify.mjs`; the existing Phase-8 verification Floor remains the floor and must not be weakened.** **Deployment / orchestration remains OPEN** (no production hosting, orchestration, scaling, process-management, or deployment-platform decision is made or implied here). **Per-screen view-model endpoints remain OPEN / deferred** — they are not an ADR-05 inherited requirement and are not a B1b decision. **Recording these choices authorises no product port to connect to real backend data, and does NOT authorise B1b implementation.** |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | Which concrete backend stack does Phase 9 adopt — framework, database, database access layer, migration tooling, backend project structure, and testing/CI approach — on the accepted Node.js runtime and within the existing `04_Development/ui/` project? |
| **Options** | Framework: **Fastify** · Express · NestJS. Database: **PostgreSQL** · MySQL/MariaDB · SQLite. Access layer: **Kysely + `pg`** · Drizzle · raw `pg` · Prisma. Migrations: **node-pg-migrate** · Kysely migrations · drizzle-kit · Sqitch/Flyway. Structure: **`04_Development/ui/server/` (sibling to `src/`, same project)** · `src/server/` · npm workspaces / new package. Testing/CI: **Vitest node project + Docker PostgreSQL + TS-2 gates in `verify.mjs`** · separate runner · shared external test DB. (Bold = selected; non-selected alternatives are recorded as considered, not approved.) |
| **Resolution** | Accepted exactly as the owner provided the six choices; no alternative is approved and no additional technical detail is inferred. **Inherited requirements this stack must honour** (binding, unchanged): modular monolith / one deployable and PostgreSQL-class relational DB with one schema per module (Phase 3 §2.2); append-only immutable Event Log (§2.2 / M0.10); zone separation enforced at the database-permission level, Zone 1 ↛ Zone 3 (D-2026-003 / Phase 3 §13.1 / P9-ADR-08); internal-first REST with URL-path versioning, idempotency keys, cursor pagination, rate-limits-by-tier and zone-awareness (Phase 3 §21.2 / P9-ADR-05); secrets in a managed vault, never in code (§15.2); no service computes dates/fees/costs (AP-02 / P9-ADR-07). **Previously accepted decisions carried in:** D-2026-030 (Node.js runtime), D-2026-029 (location = `04_Development/ui/`), D-2026-028 (single deployable; Public SSR/SSG + authenticated SPA). **Newly approved owner choices:** the six selections above. **Remaining open:** deployment/orchestration; per-screen view-model endpoints; and (unchanged) DR-01, DR-02, O-2026-001, the Rules Engine (D5), G-3, G-4, and the legal/slot items — none of which this entry touches. This decision fixes the stack only; it authorises no code. |
| **Impact** | Defines the stack for Phase 9 **P9-B1b** (platform & backend foundation) under `04_Development/ui/server/` · `scripts/verify.mjs` will gain TS-2 fitness gates while every Phase-8 gate remains the floor (token Gate A 209 / raw-value 20 / tests / build / storybook unchanged and not weakened) · **no frozen `src/contract/*` file is modified** (backend imports contract types only; `commands.ts`/`queries.ts` remain B3+, permitted by D-2026-027 but not authored here) · **no product port is wired to real data**; DR-01/DR-02/O-2026-001 and the Rules Engine stay untouched · deployment and per-screen VM endpoints remain open · **B1b implementation is not authorised by this entry** |
| **References** | D-2026-030 (Node.js runtime); D-2026-029 (G-2 = extend `04_Development/ui/`); D-2026-028 (single-deployable topology); D-2026-022 (UI stack — React + TS + Vite); `04_Development/Phase-9-B0-Specification-v0.2.md` §11 (P9-B1b gate & acceptance), §10 (TS-2), §4 (P9-ADR-05/07/08); Phase 3 §2.2, §13.1, §21.2, §15.2; D-2026-003 (three-zone separation); AP-02, AP-08, AP-09 |
| **Owner** | Vamshi |

---

## D-2026-032 — P9-B1b (platform & backend foundation) accepted, with two documented non-blocking limitations

| Field | Value |
|---|---|
| **Decision** | P9-B1b is accepted as meeting its P9-B0 §11 completion boundary: relational schema (one schema per module) with per-zone database roles/credentials in place; TS-2 architectural-fitness gates green; an append-only, immutable Event Log enforced at the database level; one trivial **non-product** resource served end-to-end in `contract` mode; **no product port wired to real data**; and The Floor green with two new server gates added additively. Accepted with two documented, non-blocking limitations: (1) the disposable-Docker provisioning path remains **execution-unverified** (the equivalent reachable-`DATABASE_URL_ADMIN` path is fully green; the Docker branch is correct on code review but no container was pulled/run — registry egress blocked); (2) the Zone-1 log-redaction fitness check remains **structural-only** until real Zone-1 data flows exist. |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | Does P9-B1b satisfy its P9-B0 §11 completion boundary and D-2026-031 stack constraints well enough to accept, given the two limitations surfaced by the independent audit? |
| **Options** | Accept · Accept-with-documented-limitations · Reject/rework. |
| **Resolution** | Accept-with-documented-limitations, by owner decision. Verified evidence: full Floor PASS on a brand-new database (197 client tests; token Gate A 209/0-new; Gate B/anti-leak/harness 0; raw-value 20/0-new; vocabulary; open-slot preservation; build; storybook; server typecheck; server DB suite 13/13); migration reproducible from zero roles; cross-zone reads denied by real PostgreSQL permissions (Zone-1↛Zone-3); Event-Log UPDATE/DELETE/TRUNCATE rejected even for a superuser (trigger, not a missing grant); all 56 product ports remain fixture-backed (`buildRegistry` returns the fixture registry in `contract` mode; the contract probe is imported only by the E2E test). Audit findings M-1, L-1, L-2, L-3 remediated and re-verified in the on-device source. The two limitations are non-blocking: (1) closes with one owner-side `npm run verify` on a Docker-enabled machine; (2) closes with a behavioural redaction test in a later batch when Zone-1 paths exist. No open DR-/O-/L-/S-/G- item is resolved by this acceptance. |
| **Impact** | P9-B1b accepted; its platform foundation (internal API skeleton, Event Log, per-module schema, per-zone credentials, TS-2 gates, `contract`-mode trivial resource) is the base for P9-B2 · `scripts/verify.mjs` carries the two additive server gates with every Phase-8 gate unweakened · **no commit/push** — all Phase-9 work remains accumulated in the working tree at baseline `0ddf8bb` · unblocks the start gate of **P9-B2** (Identity, tenancy & access) · does not authorise B2 implementation. |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §11 (P9-B1b gate/boundary), §10 (TS-2); D-2026-031/030/029/028; D-2026-003 / P9-ADR-08; Phase 3 §2.2/§13.1/§21.2/§15.2; the B1b independent-audit, remediation, and acceptance-verification reports (this session). |
| **Owner** | Vamshi |

---

## D-2026-033 — P9-B2 (Identity, tenancy & access) accepted

| Field | Value |
|---|---|
| **Decision** | P9-B2 is accepted as meeting its P9-B0 §11 completion boundary (**TS-5 green; CR-5 enforced server-side; The Floor green**), implemented in three sub-batches: **B2a** — the Zone-1 `identity.actor` table, the server-resolved actor seam (`live` fail-closed), mandatory-MFA policy for Agents/Institution-Admins/internal roles, and deny/grant Event-Log integration; **B2b** — the four distinct grant shapes (workspace membership, engagement grant, review grant, Ops-access boundary) and server-side CR-5 authorization semantics (`not-found` vs `permission-denied`, never conflated); **B2c** — confirmation that the frozen `Auth` and `WorkspaceSetup` screens render through the B1a provider seam (no new client wiring required), plus the TS-5 authorisation-matrix and TS-1 per-object-type cross-tenant `not-found` suites. Authorisation is server-authoritative and the actor is server-resolved; no product port is wired to real data. |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | Does P9-B2 satisfy its P9-B0 §11 completion boundary (identity/tenancy, the four grant shapes, server-side CR-5, TS-5) while preserving the frozen baseline and all open slots? |
| **Options** | Accept · Accept-with-limitations · Reject/rework. |
| **Resolution** | Accepted by owner decision after per-sub-batch verification. Verified evidence: full Floor PASS on a brand-new database with roles recreated from zero (client tests 200; token Gate A 209/0-new; Gate B/anti-leak/harness 0; raw-value 20/0-new; vocabulary; open-slot preservation all UNRESOLVED incl. MFA; server typecheck; **server DB suite 59** — 13 B1b + 10 B2a + 17 B2b + 14 TS-5 + 5 TS-1; build; storybook); all three migrations (b1b → b2a → b2b) reproducible from zero; real PostgreSQL zone separation extended to the new Zone-1 identity/grant tables (Zone-3 denied); the actor seam fail-closed in `live`; the frozen `Auth`/`WorkspaceSetup` screen files byte-for-byte unchanged. **Deferred / unresolved, preserved exactly:** live session transport & persistence (fail-closed — B2 Option A); S-10 client MFA; L6 engagement-grant expiry; break-glass dual control; full Ops cross-tenant aggregation (B11); `commands.ts` (B3). No DR-/O-/L-/S-/G- item is resolved by this acceptance. |
| **Impact** | P9-B2 accepted; the identity/tenancy/authorization layer is the base for P9-B3 (command surface) · frozen Phase-8, B1a, and `src/contract/*` files unchanged; only the B1b `server/db/types.ts` was extended additively across B2a/B2b · **no commit/push** — all Phase-9 work remains accumulated in the working tree at baseline `0ddf8bb` · unblocks the start gate of **P9-B3** (command surface; G-1 already resolved YES in D-2026-027) · does not authorise B3 implementation. |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §8 (T-1…T-6), §10 (TS-1/TS-5), §11 (P9-B2); D-2026-025 (server-authoritative authorisation), D-2026-026 (provider seam), D-2026-032 (B1b acceptance); D-2026-003 / P9-ADR-08 (zone enforcement); the B2a/B2b/B2c implementation reports (this session). |
| **Owner** | Vamshi |

---

## D-2026-034 — P9-B3 (command surface) accepted

| Field | Value |
|---|---|
| **Decision** | P9-B3 is accepted as meeting its P9-B0 §11 completion boundary (command-surface conformance + authorization tests; The Floor green). It adds the additive shared command contract **`src/contract/commands.ts`** (P9-ADR-03 Option A, permitted by G-1 = YES / D-2026-027) as a sibling to the frozen `ports.ts` — every frozen contract file, including the barrel `index.ts`, byte-for-byte unchanged — with the ten controlled-lexicon verb operations, the discriminated result union `accepted | rejected | permission-denied | conflict`, and idempotency-keyed envelopes (P9-ADR-05); and a server-side dispatch under `server/` (G-2 / D-2026-031) that binds the server-resolved actor, routes every command through the B2 identity/grant authorization layer (never bypassing it), enforces idempotency via a Zone-1 `commands` store, records deny and grant to the immutable Event Log, and maps authorization outcomes onto the ADR-03 union in a CR-5-preserving way (`not-found → neutral rejected`; `permission-denied` only in-tenancy). Commands are kept separate from queries; no product data is wired. |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | Does P9-B3 deliver the ADR-03 command surface (ten verbs, discriminated results, idempotency) at the approved `src/contract/commands.ts` location, routed through the B2 authorization layer and CR-5-preserving, while leaving the frozen contract and all open slots intact? |
| **Options** | Accept · Accept-with-limitations · Reject/rework. |
| **Resolution** | Accepted by owner decision. Verified evidence: full Floor PASS on a brand-new database with roles recreated from zero **and** on a re-run against a persisted database (client tests 200; token Gate A 209/0-new; Gate B/anti-leak/harness 0; raw-value 20/0-new; vocabulary; open-slot preservation all UNRESOLVED incl. MFA; server typecheck; **server DB suite 71** — +12 B3; build; storybook); all four migrations (b1b → b2a → b2b → b3) reproducible from zero; frozen contract byte-for-byte unchanged (barrel untouched; consumed by direct import). **Interpretations recorded (within scope, no new decision):** the CR-5 mapping onto the fixed ADR-03 union (`not-found → neutral rejected`); a representative per-verb → grant-shape mapping (definitive per-verb policy is later-batch product work); no HTTP command routes (transport deferred, live fail-closed — dispatch tested directly); `vitest.server.config.ts` set to run server test files sequentially (a second Event-Log writer made cross-file count assertions non-deterministic — no Floor gate changed); B3 tests use per-run-unique idempotency keys for persisted-DB re-run safety. **Deferred / unresolved, preserved exactly:** live session persistence; S-10 client MFA; L6; break-glass; `queries.ts`; product-data wiring; B4–B12. No DR-/O-/L-/S-/G- item is resolved by this acceptance. |
| **Impact** | P9-B3 accepted; the command surface is the base for later write flows · frozen Phase-8 and `src/contract/*` files unchanged (new sibling `commands.ts` added; barrel untouched); B1a/B2 implementation unchanged except the additive `server/db/types.ts` and the necessary `vitest.server.config.ts` sequencing · **no commit/push** — all Phase-9 work remains accumulated in the working tree at baseline `0ddf8bb` · unblocks the start gate of **P9-B4** (Vault, Zone 1) · does not authorise B4 implementation. |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §4 (P9-ADR-03/05), §11 (P9-B3); D-2026-027 (G-1 = YES), D-2026-029 (G-2), D-2026-031 (stack), D-2026-025 (server-authoritative), D-2026-033 (B2 acceptance); the B3 implementation report (this session). |
| **Owner** | Vamshi |

---

## D-2026-035 — P9-B4 (Vault, Zone 1) accepted

| Field | Value |
|---|---|
| **Decision** | P9-B4 is accepted as meeting its P9-B0 §11 completion boundary (zone fitness tests green; The Floor green), implemented per the owner-confirmed **Option A** (server-side Zone-1 Vault data services + zone fitness; the client product ports remain fixture-backed, the app is not flipped to `live`, no client ApiProviders, no session). It adds a Zone-1 `vault` schema (M1.2 + M0.5 + M0.10) — `invention`, `disclosure`, and an append-only, DB-immutable `disclosure_version` (BR-20 enforced by REVOKE + trigger) — GRANTed to the Zone-1 role only; and four read services (inventions index, invention detail, disclosure versions, disclosure capture) that return the frozen `Loaded<VM>` from real Zone-1 data, with tenancy enforced through the B2 grant layer (server-resolved actor; cross-tenant/absent → `not-found`, CR-5 server-side) and confidential titles never placed in the index VM. |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | Does P9-B4 deliver the Zone-1 Vault read services with real data, tenancy/CR-5 server-side, version immutability (BR-20) and zone fitness, while preserving the frozen contract and all open slots — under the Option A scope (server-side services; no live wiring)? |
| **Options** | Accept · Accept-with-limitations · Reject/rework. |
| **Resolution** | Accepted by owner decision. Verified evidence: full Floor PASS on a brand-new database with roles recreated from zero **and** on a re-run against a persisted database (client tests 200; token Gate A 209/0-new; Gate B/anti-leak/harness 0; raw-value 20/0-new; vocabulary; open-slot preservation all UNRESOLVED incl. MFA; server typecheck; **server DB suite 87** — +16 B4; build; storybook); all five migrations (b1b → b2a → b2b → b3 → b4) reproducible from zero; frozen contract `vault.ts`/barrel byte-for-byte unchanged; cross-tenant/non-member/absent → `not-found`; `disclosure_version` UPDATE/DELETE/TRUNCATE rejected even for a superuser (BR-20); the S-8 idle-timeout slot preserved (`pending-slot`); Zone-3 cannot read `vault.invention`. **Scope confirmations:** `DecisionProvider` excluded (DR-01 unresolved); `AssessmentRequest`/`AssessmentsList` (M1.3) deferred to B7; the CC-3 document-access companion port not required by B4 and left unresolved (owner call on form). **Interpretations (within scope):** VM fields not held in Zone-1 storage (attention marker, `nextAction`, `whoseTurn`, tab content) are representative until later batches; Option A means server-side services only, no live app. **Inherited limitations (unchanged):** Docker path execution-unverified (verified via reachable-DB path); Zone-1 log-redaction fitness structural-only. **Deferred / unresolved, preserved exactly:** live session persistence; S-10; L6; break-glass; DR-01; D5; B5–B12. No DR-/O-/L-/S-/G- item is resolved by this acceptance. |
| **Impact** | P9-B4 accepted; the Zone-1 Vault services are the base for later Vault-consuming flows · frozen Phase-8, `src/contract/*` (incl. `vault.ts`), screens and fixtures unchanged; B1a/B2/B3 implementation unchanged except the additive `server/db/types.ts` · **no commit/push** — all Phase-9 work remains accumulated in the working tree at baseline `0ddf8bb` · unblocks the start gate of **P9-B5** (Rules & Deadline Engine), which is additionally gated by the external **D5** rule-data dependency · does not authorise B5 implementation. |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §3.2 (Vault path), §6 (CC-3/CC-5), §11 (P9-B4); D-2026-025 (server-authoritative), D-2026-003 / P9-ADR-08 (zone enforcement), D-2026-034 (B3 acceptance); the B4 preflight + implementation reports (this session). |
| **Owner** | Vamshi |

---

## D-2026-036 — Public rendering mechanism: build-time SSG now, runtime SSR deferred (M3)

| Field | Value |
|---|---|
| **Decision** | The concrete mechanism for the Public surface's server-rendered/static-generated tier (within the already-fixed topology of D-2026-028) is **M3 — build-time Static Site Generation (SSG) now, runtime per-request SSR deferred**. Specifically: (1) the R0 Public content pages are **prerendered at build time** using the existing React + Vite stack and `react-dom/server`; (2) the generated static HTML is served from the **existing Fastify single deployable** via a **plain Fastify static-file route** — **`@fastify/static` is NOT adopted**, and **no new dependency** is introduced unless implementation reveals an existing approved dependency is insufficient; (3) the authenticated Client/Agent/Ops **SPA is unchanged**; (4) **runtime per-request SSR is deferred** until a Public page actually requires dynamic/per-request/external data; (5) **no meta-framework** (Next.js/Remix/Astro) is adopted. This does **not** reopen ADR-01/D-2026-028, and **production deployment/hosting remains OPEN** under D-2026-031 (not resolved here). |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | Given D-2026-028 (single deployable; Public SSR/SSG; authenticated SPA) and D-2026-031 (Node + Fastify; React + TS + Vite), what is the minimum concrete rendering mechanism to implement the seven R0-only Public content pages without a new framework, without touching the SPA, and without a deployment decision now? |
| **Options** | M1 build-time SSG · M2 runtime per-request SSR · **M3 hybrid: SSG now, runtime SSR deferred** · (excluded: adopt a meta-framework). |
| **Resolution** | Accepted by owner decision after a read-only mechanism analysis. M3 is the minimum that fits the resolved architecture: the seven R0 pages are static content (no per-request data), so build-time SSG via `react-dom/server` + the existing Vite build suffices; the generated HTML is served by the existing Fastify deployable through a plain static-file route (no `@fastify/static`, no new dependency); the authenticated SPA is untouched; the runtime-SSR path is deferred to the batch that first needs dynamic Public rendering (e.g., register search — B6/D1-D2; pricing — B13, both currently blocked). This fixes the mechanism only; it authorises no code. **No open item is resolved by this entry** — D5, G-4, M2, D1/D2, D3/D4, D6, L1/L3/L4, O-2026-001, DR-01, deployment/hosting, and all other slots remain exactly as they were. |
| **Impact** | Enables the P9-B12 **R0 content slice** (`PublicHome`, `StageLanding`, `SegmentLanding`, `FindYourPath`, `Guides`, `JurisdictionGuide`, `Reports`) to be implemented as build-time SSG served by the existing Fastify deployable · no change to ADR-01/D-2026-028 topology · SPA unchanged · no new dependency/framework · deployment/hosting stays OPEN (D-2026-031) · `Glossary` remains deferred (coupled to the unresolved M2 lexicon); `CostPlanner`/`Pricing`/`Trust`/`CompanyLegal`/`AgentDirectory`/`AgentPublicProfile`/`PatentSearch`/`PatentDocument` remain blocked on their own gates · **B12 implementation is NOT authorised by this entry**. |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §3.8 (Public surface), §11 (P9-B12); D-2026-028 (P9-ADR-01 topology: single deployable, Public SSR/SSG, auth SPA), D-2026-031 (backend stack: Fastify; React+TS+Vite), D-2026-022 (UI stack); the SSR/SSG mechanism analysis (this session). |
| **Owner** | Vamshi |

---

## D-2026-037 — P9-B12 R0 Public content slice accepted (build-time SSG)

| Field | Value |
|---|---|
| **Decision** | The P9-B12 **R0-only** slice is accepted: build-time Static Site Generation (D-2026-036 / M3) for exactly the seven R0 static Public content pages — `PublicHome` (`/`), `StageLanding` (`/stage`), `SegmentLanding` (`/segment`), `FindYourPath` (`/find-your-path`), `Guides` (`/guides`), `JurisdictionGuide` (`/jurisdiction`), `Reports` (`/reports`). The pages are prerendered from the frozen fixtures via `react-dom/server` (existing React/Vite/`tsx`; **no new framework or dependency**) and served from the existing Fastify single deployable through **plain static-file routes** (no `@fastify/static`). The frozen Public screens, contracts, fixtures, and tokens are unchanged; content is rendered faithfully with all demo labels and pending `SlotValue`/SLOT states preserved (no invented fee, deadline, or metric values). Runtime per-request SSR remains deferred; the authenticated SPA is unchanged. |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | Does the B12 R0 slice deliver build-time SSG for the seven authorized static Public pages per D-2026-036, faithfully rendering the frozen content and preserving all SLOTs, without touching frozen artifacts, adding a dependency, or promoting any excluded route? |
| **Options** | Accept · Accept-with-limitations · Reject/rework. |
| **Resolution** | Accepted by owner decision. Verified evidence: full Floor PASS (client tests 214 = 200 + 14 render; token Gate A 209/0-new; Gate B/anti-leak/harness 0; raw-value 20/0-new; vocabulary 0; open-slot preservation all UNRESOLVED incl. MFA; server typecheck; **server DB suite 103** — +16 B12 serve; build; storybook); all seven pages prerendered; each contains its verbatim frozen content; pending/SLOT containers preserved (fees "amount not set", deadline "Statutory window (per the governing rule)", Reports "sample (demo)") — no invented values; Fastify serves all seven paths (real-content end-to-end, 200 `text/html`); excluded routes (`/search`, `/patent`, `/pricing`, `/cost-planner`, `/glossary`, `/trust`, `/company`) → 404; prerender reproducible (two builds byte-identical). Only additive/non-frozen files changed: new `src/ssg/prerenderPublic.tsx`(+test), `server/modules/public/staticSite.ts`(+test), and additive edits to `server/api/app.ts`, `package.json`, `.gitignore`; the generated `dist-public/` is git-ignored. **No open item is resolved by this entry.** |
| **Impact** | B12 R0 accepted · the single Fastify deployable now serves the seven static Public pages · frozen Phase-8 artifacts (incl. `index.html`, `vite.config.ts`, the seven Public screens, `src/contract/*`, fixtures, tokens) and B1a–B4 implementation unchanged (only the additive `app.ts` registration) · **no commit/push** — all Phase-9 work remains accumulated in the working tree at baseline `0ddf8bb` · **out of scope and unchanged:** dynamic Public pages, B6-dependent register pages (`PatentSearch`/`PatentDocument`), B13/legal-gated content (`Pricing`/`Trust`/`CompanyLegal`/`AgentDirectory`/`AgentPublicProfile`), `Glossary` (M2), `CostPlanner` (D5/O-2026-001) · runtime SSR still deferred. |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §3.8 (R0 content), §11 (P9-B12); D-2026-036 (SSG mechanism), D-2026-028 (topology), D-2026-031 (stack); the B12 R0 preflight + implementation reports (this session). |
| **Owner** | Vamshi |

---

## D-2026-038 — CR-16 authoritative vocabulary basis recognized (Phase 4 §10.2/§10.3 + Glossary.md)

| Field | Value |
|---|---|
| **Decision** | The authoritative CR-16 vocabulary basis is recognized as already present in-repo: Phase 4 §10.2 (the lexicon) and §10.3 (terms banned platform-wide) for UI labels and bans, and `01_Strategy/Glossary.md` for canonical definitions. The two are complementary — §10.2/§10.3 govern product-UI labelling and bans; Glossary.md is the canonical terminology reference — per the Phase 4 §10 superseded notice and D-2026-011. |
| **Status** | Accepted |
| **Date** | 29 Sep 2026 |
| **Question** | Does an authoritative CR-16 lexicon exist in the repository, resolving the Phase-8 audit M2 premise ("authoritative lexicon absent")? |
| **Options** | A1 recognize Phase 4 §10.2/§10.3 and Glossary.md as complementary authoritative sources; A2 recognize Glossary.md only (contradicts the §10 superseded notice); A3 decline and keep M2 "absent" (contradicts the present source). |
| **Resolution** | A1. The M2 "authoritative lexicon absent" premise is corrected: the source is present. Evidence: `02_Product/Phase-4-Information Architecture v1.0.md` §10.2 (lexicon — 12 concepts × Client/Agent label · term of art · "Never use"), §10.3 (six platform-wide bans), and the §10 superseded notice ("the canonical terminology reference is now `01_Strategy/Glossary.md` … §10.2/§10.3 … remain in force … The Glossary does not replace them"); `01_Strategy/Glossary.md` (canonical terminology source; each domain term cites Phase 4 §10.2); D-2026-011 (Controlled Vocabulary as single source of truth). This entry recognizes existing documentary authority only; it authorizes no file change. |
| **Impact** | M2 downgraded from "unresolved / source absent" to "recognized; reconciliation pending" · Phase 4 · Glossary · Glossary page SC-P10 · Design System · enables D-2026-039 (enforcement reconciliation) and the Glossary-page content path. |
| **References** | `02_Product/Phase-4-Information Architecture v1.0.md` §10.1–§10.5 (esp. §10.2, §10.3, superseded notice); `01_Strategy/Glossary.md`; D-2026-011; `Claude outputs/Phase-8-Closure-Freeze-Report.md` (M2); the M2 investigation + governance proposal (this session). |
| **Owner** | Vamshi |

---

## D-2026-039 — Bounded reopen of frozen `vocabulary.lexicon.ts` for CR-16 reconciliation authorized (scope-limited)

| Field | Value |
|---|---|
| **Decision** | A bounded, single-file reopen of the Phase-8-frozen `04_Development/ui/src/test/vocabulary.lexicon.ts` is authorized to reconcile it with D-2026-038. Scope is limited to: (1) replacing `BANNED_SEED` with a verbatim transcription of Phase 4 §10.3 (terms banned platform-wide) — transcribe, do not paraphrase; (2) correcting the header comment that states the authoritative lexicon "does not live in this repository"; (3) setting `LEXICON_IS_AUTHORITATIVE = true` only after a read-only pre-check confirms no frozen screen violates the expanded list. Phase 4 §10.2 register-conditional "Never use" enforcement is deferred to a separate future decision (a flat global matcher cannot encode client-vs-agent register). The Phase-8 freeze remains in force on every other file. |
| **Status** | Accepted — authorization only; not yet implemented |
| **Date** | 29 Sep 2026 |
| **Question** | Should the frozen enforcement artifact be reopened, and at what exact scope, without breaching the freeze elsewhere? |
| **Options** | B1 narrow (§10.3 platform-wide bans only; defer register-scoped §10.2 "Never use"); B2 full (§10.2 + §10.3 now, register-aware); B3 defer (recognize authority but keep the artifact provisional/frozen). |
| **Resolution** | B1. §10.3 bans are platform-wide and safe to enforce as global matchers; §10.2 "Never use" is register-conditional (e.g. "prosecution"/"docket"/"applicant" are correct on agent surfaces, banned only on client surfaces) and is NOT flattened into global regexes. A read-only pre-check must precede the `LEXICON_IS_AUTHORITATIVE` flip to protect The Floor (`verify.mjs`), because promoting the regression guard to an authoritative check could fail against frozen content. Implementation requires separate explicit authorization; no code is changed by this entry. |
| **Impact** | M2 enforcement half · `04_Development/ui/src/test/vocabulary.lexicon.ts` (the sole file this authorization reopens) · `vocabulary.crosscutting.test.ts` gate · The Floor (`verify.mjs`) · Phase-8 freeze preserved on all other files · the read-only pre-check is a prerequisite, not a follow-up. |
| **References** | `04_Development/ui/src/test/vocabulary.lexicon.ts`; `04_Development/ui/src/test/vocabulary.crosscutting.test.ts`; Phase 4 §10.3 (and §10.2 "Never use", deferred); D-2026-038; `Claude outputs/Phase-8-Closure-Freeze-Report.md` (M2). |
| **Owner** | Vamshi |

---

## D-2026-040 — Marketplace scope conflict explicitly deferred (recorded-not-resolved affirmed)

| Field | Value |
|---|---|
| **Decision** | The Marketplace scope conflict (D-2026-006 "Marketplace-first regulatory model" vs Assessment Lifecycle ADR §13.8 product vocabulary) is explicitly deferred. The existing "recorded, not resolved" status carried in `01_Strategy/Glossary.md` (Marketplace entry) is affirmed as sufficient for the Glossary page (SC-P10), which renders that recorded state faithfully. This entry does not resolve the conflict or choose a scope for the term. |
| **Status** | Accepted — explicit deferral (conflict remains open) |
| **Date** | 29 Sep 2026 |
| **Question** | Should the Marketplace product-vs-regulatory scope conflict be resolved now, or explicitly deferred? |
| **Options** | C1 resolve now (owner supplies the scope resolution text); C2 explicitly defer and affirm the recorded state; C3 defer and additionally gate the Glossary "Marketplace" term behind future resolution. |
| **Resolution** | C2. The conflict is not resolved on the owner's behalf. The Glossary page can render the Marketplace term faithfully using the existing recorded-conflict framing, so C2 imposes no blocker on SC-P10 and adds no new term gate (C3 not chosen). The Marketplace scope question remains open for a future decision. |
| **Impact** | Glossary — *Marketplace* term · D-2026-006 (unchanged; still Accepted, scope conflict still recorded) · Assessment Lifecycle ADR §13.8 · Glossary page SC-P10 (unblocked for the recorded-state rendering) · Marketplace scope remains an open item. |
| **References** | `01_Strategy/Glossary.md` (Marketplace entry — "recorded, not resolved"); D-2026-006; Assessment Lifecycle ADR §12/§13.8; the M2 governance proposal (this session). |
| **Owner** | Vamshi |

---

## D-2026-041 — M2 CR-16 §10.3 reconciliation implemented: literal matching, groups 3 & 6 register-refined (bounded to `vocabulary.lexicon.ts`)

| Field | Value |
|---|---|
| **Decision** | The provisional CR-16 vocabulary seed in `04_Development/ui/src/test/vocabulary.lexicon.ts` is reconciled to Phase 4 §10.3 ("Terms banned platform-wide"), recognized under D-2026-038 as complementary to the Strategy Glossary (`01_Strategy/Glossary.md`, canonical terminology per D-2026-011): §10.3 governs platform-wide marketing bans; the Glossary is the canonical terminology reference. Matching is literal (D1 = 1A) for the plain groups, with **group 3** and **group 6** register-refined so that legitimate frozen copy is not flagged. `LEXICON_IS_AUTHORITATIVE` remains **false** (D2 = 2A); the three provisional matchers are removed (3A). Scope is exactly the one lexicon file plus this expressly authorized Decision Log append. No other file — including `vocabulary.crosscutting.test.ts`, fixtures, screens, contracts, tokens, or scripts — was changed. |
| **Status** | Accepted — implemented (bounded, uncommitted in the working tree) |
| **Date** | 30 Sep 2026 |
| **Question** | How should the six §10.3 platform-wide bans be transcribed into the provisional lexicon under literal matching without flagging frozen fixtures (`agent.ts:33` "instant deadline safety"; `public.ts:138` "Just an idea") and without generalized context-aware logic? |
| **Options** | D1: 1A literal / 1B context-qualified. Group 3 under 1A: bare `instant` (flags frozen fixture — rejected) vs. assessment-specific phrases (chosen). Group 6 under 1A: bare `just`/`simply`/`easy` (bare `just` flags "Just an idea" — rejected) vs. register-anchored phrases (chosen). D3: remove / retain provisional matchers. |
| **Resolution** | Implemented as follows. **Five §10.3 groups literal:** `/success rate/i`, `/\bguaranteed\b/i`, `/\baffordable\b/i`, `/\bcheap\b/i`, `/ai-powered/i`. **Group 3 (five assessment-scoped phrases):** `instant assessment`, `assessment in seconds`, `instant patentability opinion`, `assessed in seconds`, `patentability opinion in seconds` — not a bare `/instant/i`, so the frozen Agent fixture "instant deadline safety" (`fixtures/scenarios/agent.ts:33`) is not flagged. **Group 6 (six register-anchored matchers):** a "just + quantity" matcher that includes a bounded numeric quantity (so "just 3 steps" is caught, correcting the earlier example/matcher mismatch) plus "a few / a couple / a moment / a minute / a second / minutes / seconds / clicks / steps / taps / questions"; "just + action verb"; "simply + action verb"; "it's that simple/easy"; a curated "easy" phrase set ("quick and easy", "easy to file/use/…", etc.); and "easily + action". Bare `just`/`simply`/`easy` are **not** used, because bare `/\bjust\b/i` matches the frozen Public R0 fixture label "Just an idea" (`fixtures/scenarios/public.ts:138`) — a confirmed **false positive** (a process-stage answer, not a patronizing marketing claim); the fixture is **preserved unchanged** by owner decision. The three provisional seed matchers `marketplace`, `starting from`, `testimonial` are removed (3A; none is a §10.3 term). **Independently reproduced read-only collision result:** all 16 matchers applied to the exact gate corpus (all four surfaces — Public/Client/Agent/Operations — with transitive imports resolved via the harness `collectStrings`) yield **0 hits**; positive controls confirm "just 3 steps" and "just a few clicks" match group 6 while "Just an idea" matches none. The actual gate (`vitest run vocabulary.crosscutting.test.ts`) passes 5/5 and project `tsc --noEmit` passes with 0 errors. **`LEXICON_IS_AUTHORITATIVE = false`** is preserved (value and type); the sibling limitation documentation in `vocabulary.crosscutting.test.ts` is intentionally left unchanged, so **this gate is NOT a complete authoritative CR-16 check** and the authority-flag half of M2 remains open. **Known coverage limitations:** literal matching under-covers paraphrase — "just/simply" forms outside the enumerated tokens, "easy/easily" variants ("easier", "with ease", "easy filing"), the §10.2 qualifiers on groups 2 and 5, and register synonyms outside §10.3's listed words (effortless, seamless, one-click, hassle-free) are not detected. The **Marketplace terminology conflict remains deferred and unresolved under D-2026-040**; removing the `marketplace` matcher is an enforcement-coverage change only and takes no terminology side. |
| **Impact** | M2 content reconciled to §10.3; the gate now enforces the §10.3 terms via the existing harness · `marketplace`/`starting from`/`testimonial` no longer gate-enforced · flag stays `false`, so M2's authoritative-enforcement half is formally open · scope limited to `vocabulary.lexicon.ts` (+ this Decision Log append); Phase-8 freeze preserved everywhere else · **no commit/push** — the change accumulates in the working tree at baseline `0ddf8bb`. |
| **References** | Phase 4 §10.3 (`02_Product/Phase-4-Information Architecture v1.0.md` L513–522); `01_Strategy/Glossary.md` (D-2026-011); D-2026-038 (source recognized), D-2026-039 (bounded reopen), D-2026-040 (Marketplace deferred); the M2 pre-check, decision package, group-6 amendment proposal, and this implementation (this session); `04_Development/ui/src/test/vocabulary.lexicon.ts`. |
| **Owner** | Vamshi |

---

## D-2026-042 — P9-B12 Glossary (SC-P10) added to the R0 build-time SSG set (bounded additive slice)

| Field | Value |
|---|---|
| **Decision** | The Public Glossary page **SC-P10** (`/glossary`) is added to the B12 R0 build-time SSG set (D-2026-036 / M3), bringing the R0 set from seven to **eight** pages. The page is prerendered from the existing frozen `GlossaryVM`/fixture and the frozen `GlossaryScreen`, served by the existing Fastify deployable through the same plain static-file route mechanism as the other R0 pages. The M2 → Glossary content-path gate is treated as **satisfied by D-2026-038** (which recognized Phase 4 §10.2/§10.3 + `01_Strategy/Glossary.md` as authoritative and explicitly "enables the Glossary-page content path"); the Glossary page does not consume the vocabulary enforcement flag, which remains `LEXICON_IS_AUTHORITATIVE = false` (M2's authority-flag half stays separately open). Scope is exactly five files. |
| **Status** | Accepted — implemented and verified (bounded, uncommitted in the working tree) |
| **Date** | 5 Oct 2026 |
| **Question** | Is SC-P10 now R0-authorizable given D-2026-038, and can it be added to the SSG set additively without reopening any frozen artifact or resolving M2's authority flag? |
| **Options** | Add SC-P10 to R0 SSG now (chosen) · keep excluded pending full M2 closure (rejected — no governing document conditions the Glossary page on `LEXICON_IS_AUTHORITATIVE=true`, and D-2026-038 enables the content path). |
| **Resolution** | Implemented per the SC-P10 preflight. **Exact five-file boundary:** (1) `src/ssg/prerenderPublic.tsx` — `'SC-P10'` added to `R0_ROUTE_IDS` (generic render mechanism unchanged); (2) `server/modules/public/staticSite.ts` — `{ path: '/glossary', file: 'glossary.html' }` added to the `R0_PAGES` allow-list; (3) `src/ssg/prerenderPublic.test.tsx` — route-set assertion updated seven→eight plus a Glossary content case (`Glossary` / `Invention` / `Disclosure`); (4) `server/test/b12-public-serve.test.ts` — `/glossary` moved from the excluded set into the served set and the allow-list assertion updated to eight; (5) this Decision Log entry. **The frozen `GlossaryVM` (`src/contract/public.ts`), the Glossary fixture (`src/fixtures/scenarios/public.ts`), `GlossaryScreen.tsx`, `routes.tsx`, tokens, the contract barrel, and `vocabulary.lexicon.ts`/`vocabulary.crosscutting.test.ts` were NOT modified.** Glossary content remains exactly the frozen **Invention + Disclosure** index (no invented content, no slots on this page). **Marketplace terminology was not added to the Glossary and not resolved; D-2026-040 remains deferred** (the term does not appear in the fixture, so no terminology side is taken). **The eight-route R0 set** is SC-P01, SC-P04, SC-P05, SC-P08, SC-P09, **SC-P10**, SC-P11, SC-P12. **Verification (all green):** `build:public` emitted 8 pages incl. `dist-public/glossary.html` containing "Glossary"/"Invention"/"Disclosure", byte-reproducible across two builds; client prerender tests 15 passed; `GET /glossary → 200 text/html` and the six excluded routes (`/search`, `/patent`, `/pricing`, `/cost-planner`, `/trust`, `/company`) → 404 with `/internal/v1/health` → 200 (server serve test 16 passed); full Floor `npm run verify` **PASS** — typecheck clean, tests **215**, token Gate A 209/0-new, Gate B/anti-leak/harness 0, raw-value 20/0-new, vocabulary 0 (authority still NOT authoritative), open-slot preservation all UNRESOLVED, server typecheck clean, server DB suite **103**, vite build 0, storybook 0. **D-2026-037's record of Glossary as out-of-scope / `/glossary` → 404 is superseded by this accepted additive slice.** **No frozen Phase-8 artifact was reopened.** |
| **Impact** | B12 R0 set = eight static Public pages; `/glossary` now served from the single Fastify deployable · M2's authoritative-enforcement half remains open (`LEXICON_IS_AUTHORITATIVE=false`), untouched here · frozen Phase-8 artifacts, B1a–B4, and the M2 lexicon unchanged; only the four additive B12 files changed · D-2026-040 Marketplace conflict still deferred/unresolved · **no commit/push** — all Phase-9 work remains accumulated in the working tree at baseline `0ddf8bb`. |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §3.8 (R0), §11 (P9-B12); D-2026-036 (SSG mechanism), D-2026-037 (B12 R0 seven-page slice, superseded re: Glossary), D-2026-038 (Glossary content path enabled), D-2026-040 (Marketplace deferred), D-2026-041 (M2 §10.3 reconciliation); the SC-P10 preflight and this implementation (this session). |
| **Owner** | Vamshi |

---

## D-2026-043 — G-4 resolved: TA-8 rules escape-hatch approval & audit mechanism defined (governance only)

| Field | Value |
|---|---|
| **Decision** | Governance gate **G-4 is resolved.** The TA-8 rules escape-hatch — the defined, audited, tested extension mechanism for a genuine jurisdiction rule that resists declarative expression (Phase 3 §24; §25.2) — is governed as follows: **(1) Approval authority** — each escape-hatch use requires explicit approval by a designated **Rule Governance / Ops human approver who is separate from the rule author** (never self-approved). **(2) Audit** — each use is recorded in the **immutable Event Log** (M0.10) capturing the author, the approver, the exception/rule, and the justification; and an **escape-hatch marker is carried in the value's `SlotValue` computation trace** (P9-ADR-07). **(3) Required properties** — the mechanism must remain **defined, tested, approval-gated, and non-default**, and **must never permit hardcoded jurisdiction-specific business logic** (AP-02 / D-2026-002 / T1 remain in force; the escape hatch is a rare governed exception, never a routine path). This satisfies the §24 / P9-ADR-07 requirement that the mechanism be named **before any rule authoring (B5) begins**. |
| **Status** | Accepted — governance decision; no implementation authorized |
| **Date** | 5 Oct 2026 |
| **Question** | Who approves a TA-8 rules escape-hatch use, and what is the audit record? (B0 §12.3 G-4; §24 requires the mechanism defined before it is needed.) |
| **Options** | Source (§24/§25.2) fixes the required properties (defined/audited/tested/approval-gated/non-default); the two open parameters — approval authority and audit record — were the owner's to set from repo-grounded substrates (Ops/RuleAuthoring SC-O03 governance role; immutable Event Log M0.10 + `SlotValue` computation trace). |
| **Resolution** | As the owner decided: Rule Governance/Ops human approver separate from the author; Event-Log record (author · approver · exception/rule · justification) plus an escape-hatch marker in the computation trace; mechanism defined/tested/approval-gated/non-default; no hardcoded jurisdiction logic. **TA-8/G-4 is orthogonal to D5** — it governs rules that resist declarative expression even with authoritative data in hand, not data availability (data-not-yet-available remains the `pending-slot` path). **This decision does NOT lift the B5 HOLD, does NOT resolve or reduce the external D5 dependency, and authorizes no implementation.** |
| **Impact** | Clears the G-4 governance prerequisite that §24 / P9-ADR-07 require before rule authoring · makes the Rules & Deadline Engine *mechanism* (incl. the TA-8 extension point, its approval/audit representation, and tests) governance-eligible to build **against representative/fixture data only** — but this remains **un-authorized** and **HELD** until the owner lifts the B5 HOLD and issues explicit implementation authorization · **B5 completion (four-layer golden verification, §18.5) still requires authoritative Indian rule data (D5), which is external and unresolved** · supersedes the B0 §12.3 "G-4 Unresolved" status without modifying the frozen spec baseline (pattern per D-2026-027) · **no commit/push** — all Phase-9 work remains accumulated in the working tree at `0ddf8bb`. |
| **References** | Phase 3 PRD §24 (TA-8, L1954/L1958), §25.1 T1 (L1968), §25.2 (L1986); `01_Strategy/Architecture Principles.md` AP-02; D-2026-002 (Rules are data); `04_Development/Phase-9-B0-Specification-v0.2.md` §4 P9-ADR-07 (L247–249), §12.3 G-4 (L477), §11 (P9-B5), §18.5; D-2026-031 (Event Log / M0.10); the G-4 decision-preparation analysis (this session). |
| **Owner** | Vamshi |

---

## D-2026-044 — P9-B5 engine-mechanism slice accepted (deadline/rules engine; representative data only; B5 overall INCOMPLETE / D5-blocked)

| Field | Value |
|---|---|
| **Decision** | The narrowly-scoped **B5 engine-mechanism slice** is accepted for its authorized scope: the deterministic Deadline & Rules Engine *mechanism* with one representative consumer (DeadlineDetail, SC-C13), built against representative/fixture data only. This acceptance does NOT complete B5. |
| **Status** | Accepted — engine-mechanism slice only; **B5 overall remains INCOMPLETE and D5-blocked** |
| **Date** | 5 Oct 2026 |
| **Question** | Does the implemented engine-mechanism slice meet its authorized scope (engine core + one representative consumer, representative data, TA-8 per D-2026-043, Zone-2 placement, frozen artifacts untouched) with the Floor green? |
| **Options** | Accept the slice as scoped · reject/rework. |
| **Resolution** | Accepted. **Nine-file implementation boundary:** `server/modules/rules/{types,engine,ruleData,escapeHatch,service}.ts`, `server/migrations/1728100000000_b5-rules.cjs`, `server/test/b5-rules.test.ts`, the additive `server/db/types.ts`, and the re-scoped `server/test/fitness.static.test.ts`. **Accepted properties:** (1) the deterministic Rules Engine mechanism (recompute from an Event-Log trigger + a declarative rule; AP-02 / D-2026-002 — no jurisdiction logic in application code); (2) rules-as-data placed on the **Zone-2 public-data boundary**, accepted as the owner-decision extension already established this session (NOT a fourth zone/role/pool, NOT a pre-existing architectural naming); (3) the **TA-8 escape-hatch mechanism per D-2026-043** (approver-≠-author enforced; immutable Event-Log audit of author·approver·exception·justification; escape marker in the computation trace); (4) the **TS-2 foundation fitness-gate reconciliation** — the "no product-date computation" invariant narrowed to the platform foundation and exempting only `server/modules/rules/` (ADR-07: the engine is the sole date producer), invariant neither weakened nor disabled. **Representative data remains non-authoritative (`authoritative=false`) and cannot surface as a resolved deadline** — the consumer returns an honest `empty`/`not-found`, and open-slot preservation (Rules-Engine) stays UNRESOLVED. **Verification:** full Floor `npm run verify` **PASS** (typecheck clean; client tests 215; token Gate A 209/0-new; Gate B/anti-leak/harness 0; raw-value 20/0-new; vocabulary 0 — authority still NOT authoritative; open-slot preservation all UNRESOLVED incl. Rules-Engine; build; storybook); **server suite 113/113**; **B5 tests 10/10**; **migration-from-zero (b1b→…→b5) reproducible**. **HEAD remains `0ddf8bbdc4adbe4afe87e46ed4bf2b98f6741f06`; no Git commit/push authorized or performed.** |
| **Impact** | The "Engine yes" half of B0 §5 (deadline path) is in place and accepted · **Explicitly OUT of this accepted slice and still blocked:** authoritative Indian rules/calendars/fees, RuleAuthoring publish (M4.4), TS-3 golden suites, the four-layer §18.5 verification (= B5 completion boundary), and the other two R3 consumers (AgentDocket, RuleAuthoring); `fee_schedule` remains deferred to the Costs/CostPlanner slice · **B5 completion remains gated solely by the external D5 dependency** (authoritative Indian fee schedules & rule sources), which is unresolved and NOT resolved here · G-4 (D-2026-043) is the only governance gate and is already cleared · **no commit/push** — all Phase-9 work remains accumulated in the working tree at `0ddf8bb`. |
| **References** | `04_Development/Phase-9-B0-Specification-v0.2.md` §5 (D5 "Engine yes, rule data no"), §11 (P9-B5), §18.5, §4 P9-ADR-07; D-2026-035 (B4 acceptance / B5 start gate), D-2026-043 (G-4 / TA-8), D-2026-002 (rules-as-data), D-2026-003 / P9-ADR-08 (zones); the B5 preflight, scope decision, zone-placement (Candidate A), implementation, the 9th-file fitness reconciliation, and this acceptance (this session). |
| **Owner** | Vamshi |

---

## D-2026-045 — P9-D5-E2 MVP deadline/rule scope classification (B-1…B-5; repository-only; no legal mapping, no implementation)

| Field | Value |
|---|---|
| **Decision** | The MVP scope of the five candidate deadline/rule concepts (B-1…B-5) is classified strictly from the frozen Phase-8 repository (no external legal knowledge). **Committed MVP (3):** **B-1 FER response** and **B-3 PCT→India national-phase entry** as computed statutory-window deadlines, and **B-4 Filing (India)** as an action/milestone (not a computed window). **Product-decision-required / unresolved (1):** **B-2 Request for examination (RFE)**. **Explicitly out-of-scope (1):** **B-5 Renewal/annuity**. |
| **Status** | Accepted — scope classification only; no legal mapping, no rule data, no implementation authorized |
| **Date** | 5 Oct 2026 |
| **Question** | Which of B-1…B-5 are committed to the ALDASSIST MVP by the existing frozen/approved specifications, read strictly from the repository? |
| **Options** | Per candidate: EXPLICIT MVP · STRONGLY IMPLIED · INFORMATIONAL · PRODUCT-DECISION-REQUIRED · NOT MVP. |
| **Resolution** | As the owner decided, from frozen repo evidence: **B-1 FER response = EXPLICIT MVP** (computed statutory window; instantiated as a computed docket deadline with detail trace across agent/portfolio/home AND the worked rule-authoring reference case `ruleId IN-FER-RESP` with golden cases in `ops.ts`). **B-3 national-phase entry = EXPLICIT MVP** (computed statutory window; instantiated as a committed *computed* deadline — `source:'Computed (Deadline Engine, demo)'`, Critical — across agent `dl_a_2`, portfolio `dl_nat_1`, home; **its authoring rule and golden suite are NOT yet in the repo** — a D5 build item). **B-4 Filing (India) = EXPLICIT MVP** as an **action/milestone**, NOT a computed statutory window (matters scope "prepare and file … one examination response (demo scope)"; `NextActionVM` verb `File`; `filingDate` is a recorded past date; official filing-fee presentation is the deferred pricing slot O-2026-001). **B-2 RFE = PRODUCT-DECISION-REQUIRED / UNRESOLVED** — named as a statutory window "per the governing rule" in frozen public content (`public.ts` timelines + the "examination-request window" pitfall) and tracked as a register event, but NOT instantiated as a live forward computed docket deadline; **not promoted into the committed MVP set**. **B-5 Renewal/annuity = NOT MVP** — settled by the frozen **SC-P04** boundary comment "MVP portfolio tracking only — no monitoring/renewals CTAs"; the sole annuity fixture (`portfolio.ts` `dl_old_1 'Annuity (superseded)'`) is a `superseded`-DeadlineState lifecycle fixture only and is **not** a feature commitment. |
| **Impact** | Fixes the committed-MVP deadline/rule set for downstream D5 work: **committed = B-1, B-3, B-4** (B-1/B-3 computed-deadline, B-4 action/milestone); **unresolved = B-2**; **out-of-scope = B-5**. **This decision resolves NO legal question** — statutory citation, exact window, calendar authority (still UNRESOLVED), D1 register reconciliation, extensions/restoration, fees (First Schedule / deferred `fee_schedule`), and golden suites all remain D5 legal-mapping work and are NOT touched here. It authorizes **no authoritative rule data and no implementation** — the **D-2026-044 guardrail holds**: representative rule data stays `authoritative=false` and cannot surface as a resolved deadline. B-2 remains an owner product decision (computed-and-docketed RFE deadline vs educational-only). **No commit/push** — all Phase-9 work remains accumulated in the working tree at `0ddf8bb`. |
| **References** | Frozen fixtures `04_Development/ui/src/fixtures/scenarios/{home,agent,ops,portfolio,public,matters}.ts`; frozen screen `04_Development/ui/src/screens/StageLanding/StageLandingScreen.tsx` (SC-P04 boundary); contract `NextActionVM` verb `File`; D-2026-044 (B5 engine-mechanism slice / `authoritative=false` guardrail), D-2026-043 (G-4 / TA-8), D-2026-002 (rules-as-data); the D5-E2 repository-only scope assessment (this session). |
| **Owner** | Vamshi |

---

## D-2026-046 — P9-D5 authoritative MVP rules implemented (B5a additive §18.2 offset/unit extension; calendar-month engine; authoritative rules + fees)

| Field | Value |
|---|---|
| **Decision** | The authorized D5 MVP (D5-M / D5-M-A) is **implemented**: the three authoritative computed-deadline rules **IN-FER-RESP-BASE** (r.24B(5), +6 months from FER issuance), **IN-FER-RESP-EXT** (r.24B(6), +3 months, Form 4 + fee), **IN-NP-ENTRY** (r.20(4)(i), +31 months from priority), plus the previously-deferred **`rules.fee_schedule`** carrying the verified First-Schedule fees. To express calendar-month rules without day-approximation, the accepted B5 engine was extended **additively** to the already-approved **§18.2 offset/unit model** (units `days`\|`months`). |
| **Status** | Implemented and verified — authoritative MVP rules/fees authored; **HEAD unchanged `0ddf8bbdc4adbe4afe87e46ed4bf2b98f6741f06`**; no commit/push (working-tree accumulation) |
| **Date** | 6 Oct 2026 |
| **Question** | How to implement the owner-authorized D5 MVP (B1 FER base+extension, B3 national-phase, B4 milestone; fees) on the accepted B5 engine, which was days-only and could not represent calendar months? |
| **Options** | (a) STOP (days-only architecture cannot carry calendar months — reported at the D5-M pre-change gate); (b) additive §18.2 offset/unit extension + calendar-month engine (owner-authorized at D5-M-A). |
| **Resolution** | As authorized at **D5-M-A**: **why necessary** — the accepted B5 slice (D-2026-044) modelled windows only in days (`window_days`, `addDays`), which cannot represent 6/3/31 calendar months without the forbidden day-approximation; **this implements the already-approved §18.2 architecture** (`offset: {value, unit: months\|days}` + `from`), not a new pattern. **Change set (additive):** new migration `1728200000000_b5a-authoritative-mvp.cjs` (does NOT modify the frozen b5 migration) adding nullable `offset_value`/`offset_unit`/`from_anchor` + provenance (`effective_date`/`source_provision`/`provenance`) to `rules.rule_set`, dropping `window_days` NOT NULL, creating Zone-2 `rules.fee_schedule` (GRANT `alda_zone2` only), and seeding the 3 authoritative rules + their `rule_version` rows + the verified fees; a unit-aware engine with **true calendar-month arithmetic** (documented **month-end clamp**: day clamps to the last valid day of the target month — 2026-01-31+1m→2026-02-28, 2024-01-31+1m→2024-02-29, 2026-08-31+6m→2027-02-28; **no** holiday/weekend/working-day/GCA-§10 adjustment — the result is the **plain statutory calendar date**); `ruleData`/`service`/`fees`/`db.types` extended; the authoritative `ready` DeadlineDetail path built **only** for `authoritative=true` rules. **Existing B5 representative behaviour preserved exactly** (days path intact; `authoritative=false` rows still return the honest empty state; guardrail strengthened — the ready-builder THROWS on a non-authoritative rule). **Excluded (unchanged):** Rule 138 extension/condonation + its fees (UNRESOLVED, D5-I); holiday/calendar treatment (Q4); Art.19/34 page-count edge (Q5); B2 RFE; B5 renewal. **Provenance** retained on every authoritative rule/fee (jurisdiction, source provision, source citation, effective date, provenance, authority-status). **Verification:** full Floor `npm run verify` **PASS** — typecheck clean; client tests 215; token Gate A 209/0-new; Gate B/anti-leak/harness 0; raw-value 20/0-new; vocabulary 0 (lexicon authority still NOT authoritative); open-slot preservation (incl. Rules-Engine representative slot) all UNRESOLVED; **server typecheck clean; server suite 137/137** (new `b5a-d5-authoritative` 24, existing `b5-rules` 10 preserved, `fitness.static` 4); migration-from-zero reproducible; build + storybook pass. |
| **Impact** | B1 FER (base + 3-month extension) and B3 national-phase entry are now AUTHORITATIVE computed deadlines (calendar-month, plain statutory date) with verified First-Schedule fees; the Deadline & Rules Engine now implements the §18.2 offset/unit model it was always specified to carry · B4 remains an action/milestone (no computed deadline) · the representative Rules-Engine slot and all other open slots remain UNRESOLVED · **B5 completion (four-layer §18.5 verification, register/D1 cross-check, the other R3 consumers) is NOT claimed** — this is the authorized MVP rule set only · the four §18.2-excluded legal items (Rule 138 ×2, calendar/Q4, page-edge/Q5) remain for the D5 human-legal-review gate (D5-K) · **no commit/push** — HEAD frozen at `0ddf8bb`; all work accumulates uncommitted in the working tree. |
| **References** | `04_Development/ui/server/migrations/1728200000000_b5a-authoritative-mvp.cjs`; `server/modules/rules/{engine,types,ruleData,service,fees}.ts`; `server/db/types.ts`; `server/test/b5a-d5-authoritative.test.ts`; Phase-3 PRD §18.2 (offset/unit model) / §18.3; D-2026-044 (B5 engine-mechanism slice), D-2026-043 (G-4/TA-8), D-2026-002 (rules-as-data), D-2026-003/P9-ADR-08 (zones); D5-F/F1/F2 (Rule 138 UNRESOLVED), D5-G3 (current First Schedule fees), D5-H (counting basis), D5-L/D5-M/D5-M-A (authorization) — this session. |
| **Owner** | Vamshi |
## D-2026-047 — Physical national-phase filing fee corrected (INR 1,760 to INR 1,750); b5a edited in place; R-2 superseded on a premise-dependent basis

| Field | Value |
|---|---|
| **Decision** | The fee literal for **IN-NP-FILING-LOW-PHYSICAL** in `1728200000000_b5a-authoritative-mvp.cjs` (line 117) is corrected from **1760** to **1750**, and that row's provenance comment is replaced with the **D5-P** legal basis (Patents Rules 2003 First Schedule, Entry 1, physical filing) in place of the earlier ten-percent-uplift derivation (D5-M-A). No other row, file or value is changed; **IN-NP-FILING-OTHER-PHYSICAL** (8800) retains its figure, which D5-P verified as correct. |
| **Status** | **Accepted 16 Oct 2026**; edit applied to the working tree the same day (one literal, one comment); commit performed by the owner. **Migration and server suite reported run 16 Oct 2026** — owner-run terminal output observed in session: `node-pg-migrate` applied the `server/migrations` set to a disposable Docker PostgreSQL (`postgres:16-alpine`, per `scripts/run-server-tests.mjs`), and the server suite reported 138 passed / 0 failed, including assertions on this row (1750) and on `IN-NP-FILING-OTHER-PHYSICAL` (8800). **Fast verification reported PASS 19 Oct 2026** — `npm run verify:fast` (`node scripts/verify.mjs --fast`): `VERIFY: PASS`, ten gates passed, three skipped. **Full `npm run verify` has NOT been run**: `--fast` skips gates 8, 9 and 10 (DB-backed server suite, Vite build, Storybook build), so the full floor remains unverified. **All run results above are owner-reported terminal output, not repository-resident evidence** — no run log or CI artifact is committed, and the client gate's reported count depends on a `NO_COLOR` change in `scripts/verify.mjs` whose commit status is unverified. |
| **Date** | 16 Oct 2026 |
| **Question** | The D5-P legal-basis audit verified 11 of the 12 authoritative First-Schedule fees and found INR 1,760 unsupported: the comment derives it as e-filing (1600) plus a ten-percent uplift, a method two official sources contradict, where the First Schedule gives 1750. How should it be corrected, given that R-2 had assumed b5a's `rules.rule_version` rows were already applied and therefore immutable under the BR-07 append-only trigger? |
| **Options** | (A) Edit b5a in place — one literal plus one comment; correct on a fresh database, **premise-dependent**, and silently wrong on any database that already applied b5a. (B) Retain R-2 and build the b5b/b5c corrective migrations with the R-4 fail-closed pre-state checks — **premise-independent**, correct in both cases, materially more work and governance. |
| **Resolution** | **Option A**, selected by the owner on 16 Oct 2026 after the two D-2026-047 prerequisites were evidenced. **P1 (single-site figure) SATISFIED:** `git grep -n 1760` returned exactly one hit, this line; `git ls-files --others --exclude-standard` returned nothing. **P2 (no persisted environment holding the old value) SATISFIED BY OWNER ATTESTATION** of 16 Oct 2026, resting on two tool-verified negatives on machine `ritz` (no service matching `postgresql*`; no TCP listener on port 5432; 15 Oct 2026) and two owner-observed absences (no `C:\Program Files\PostgreSQL`; no `%LOCALAPPDATA%\Docker`; 16 Oct 2026), together with the attestation that `ritz` is the only machine that has ever run ALDASSIST tests or migrations. **Recovery risk NIL** within that attested scope: nothing ever applied b5a, so there is no state to roll back and audit finding N-2 is moot for this correction. **R-2 is superseded on a premise-dependent basis** — R-2 was correct on its premise; the prerequisite evidence changed the premise. The b5b/b5c sibling migrations and the **R-4 fail-closed pre-state checks are consequently not required**. |
| **Limitations recorded** | P1's scope is tracked working-tree content and untracked non-ignored content on `main`; **ignored files, other branches and git history were not searched**. P2 is **owner attestation, not independent technical verification**. Three possibilities remain **NOT CHECKED** and no absence is inferred from any of them: a Docker `dataFolder` configured outside `%LOCALAPPDATA%\Docker`; Docker data under another Windows user profile on `ritz`; a native PostgreSQL installation outside the default directory. "Recovery risk NIL" is a conclusion under those assumptions, **not verified absence of persisted database state**. Whether `node-pg-migrate` checksums migration files in this configuration is **unverified**, so a file-versus-database divergence cannot be assumed to announce itself. |
| **Contingency** | If any environment is later found to have applied b5a, that database **must be dropped and re-migrated, or a corrective migration written, before it is used** — the in-place edit will not reach it, and the stale INR 1,760 row would persist undetected. |
| **Impact** | The authoritative fee schedule now carries the primary-source figure for low-entity physical national-phase filing · the misleading uplift derivation is removed from that row's provenance · b5b/b5c and the R-4 pre-state checks are withdrawn as unnecessary · **audit finding N-2 (b5a `down` issuing `DELETE FROM rules.rule_version`, blocked by the BR-07 trigger) remains OPEN** and outside this decision · D-2026-048 (engine integrity) remains approved in principle but unrecorded (A-6 unmet) · Decision A deferred and Decision B open, both excluded from b5c, which is itself now withdrawn · the B5a post-implementation audit draft remains unrecorded with its Decision ID unallocated. |
| **References** | `04_Development/ui/server/migrations/1728200000000_b5a-authoritative-mvp.cjs` line 117; D-2026-046 (authoritative MVP rules and fees); D5-P (post-commit legal-basis verification audit); D5-Q (bounded correction proposal, R-1/R-2/R-4); Patents Rules 2003 First Schedule, Entry 1; D-2026-027 (frozen Phase 8 contracts — not engaged, b5a is a Phase 9 file); BR-07 (rules.rule_version append-only trigger). |
| **Owner** | Vamshi |


## D-2026-049 — BR-07 append-only binds all actors including migrations; b5a declared irreversible; audit finding N-2 closed (ruling extended to BR-20)

| Field | Value |
|---|---|
| **Decision** | BR-07's append-only guarantee binds **all database actors, including schema migrations running as table owner or superuser**. There is no privileged migration exception and none may be introduced. The same ruling **extends to BR-20** (`vault.disclosure_version`). Consequently `rules.rule_version` rows — and, through the foreign key, the `rules.rule_set` rows they reference — are irreversible once applied; `1728200000000_b5a-authoritative-mvp.cjs` is an **irreversible migration**, and its `down` is rewritten to fail fast with a stated reason and recovery instruction in place of the `DELETE` the trigger blocks. Audit finding **N-2 is CLOSED** by this entry. |
| **Status** | **Accepted 26 Oct 2026**, by the owner in session on the recommendation recorded below. Changes applied to the working tree the same day: the migration's `down` block, and a Floor-resident regression test (see References). **Verified by execution on `ritz` 26 Oct 2026, two full runs.** **Run 1**, before the regression test existed: **VERIFY_EXIT=0, VERIFY: PASS**, all thirteen gates green, gate 8 **138 passed** — the first recorded full-floor PASS, superseding D-2026-047's note that gates 8, 9 and 10 had never been run. **Run 2**, with the regression test in place: **VERIFY_EXIT=0, VERIFY: PASS**, all thirteen gates green, gate 8 **139 passed**. The regression test was separately confirmed to have executed and passed **by name** under Vitest v2.1.8 (`REGRESSION_EXIT=0`, verbose reporter, 5 of 5 in the file, 507 ms, **with no database provisioned** — confirming that file is genuinely DB-free). Caveat retained: **the migration file itself is untypechecked** (`tsconfig.server.json` sets neither `allowJs` nor `checkJs`, so the `.cjs` is outside gate 7). **Targeted disposable-PostgreSQL check** (`postgres:16-alpine`, container torn down after the run): provisioning and `node-pg-migrate up` of all seven migrations **exit 0**; `node-pg-migrate down 1` **exit 1**, surfacing the intended `IRREVERSIBLE ... Ruled by D-2026-049` error with the stack at `...b5a-authoritative-mvp.cjs:186` then `Migration._apply` then `runner`. Post-failure state confirmed intact: `pgmigrations` retained all 7 rows including the b5a row, and `rules.rule_version` retained all 5 rows (3 authoritative, 2 representative). The `singleTransaction` rollback path is confirmed by the runner's `> Rolling back attempted migration ...` line. Raw logs were read directly from `04_Development/ui/` (`n2-verify.log`, `n2-down.log`, `n2-verify2.log`, `n2-regression.log`) — owner-executed, Claude-read artifacts, not owner-transcribed terminal output. **No commit and no push** — HEAD remains `09f0be8`. |
| **Date** | 26 Oct 2026 |
| **Question** | Does BR-07's append-only guarantee bind all actors including schema migrations, or only the application zones, with migrations privileged? The question was forced by audit finding N-2: b5a's `down` issues `DELETE FROM rules.rule_version`, which the BR-07 trigger blocks unconditionally, making the rollback inert. |
| **Options** | (A) BR-07 binds all actors, migrations included — b5a is correctly irreversible and the defect is that its `down` claims a reversibility it cannot deliver; the fix is to make `down` honest. (B) BR-07 binds application zones only — add a sanctioned migration bypass (`ALTER TABLE ... DISABLE TRIGGER`, or a session-GUC guard inside `rules.prevent_version_mutation()`) and the existing `down` works as written. |
| **Resolution** | **Option A**, selected by the owner on 26 Oct 2026. Three grounds, in descending weight. **(1) The two-layer construction is the strongest structural evidence in the repository.** `1728100000000_b5-rules.cjs` line 60 (`REVOKE UPDATE, DELETE, TRUNCATE ON rules.rule_version FROM PUBLIC`) already stops every application role; the triggers at lines 54-59 add nothing over that **except** binding the owner and superuser, which is the only path a migration uses. Under Option B the trigger layer becomes decorative — a control retained in source that stops only what was already stopped. **(2) The one categorical statement in accepted documentation admits no actor carve-out.** Phase-5 User Flows X4 (line 490): "Immutable artifacts... Events are append-only. Corrections are new records, never edits." Phase-3 PRD M0.10 (line 450) is identical in form: "events are never updated or deleted. Corrections are new events that supersede prior ones." **(3) Precedent cost.** BR-20 (`1728000000000_b4-vault.cjs` lines 53-64) is a byte-for-byte parallel construction over Zone-1 confidential disclosure history; a migration-bypass ruling would reach it by analogy, and AP-03 with the Phase-3 §15.1 irreversibility finding make a standing bypass there unacceptable. The owner elected to **extend the ruling to BR-20 explicitly** rather than leave it to inference. **Reinforcing technical finding (new, recorded here):** irreversibility does not rest on the trigger alone. `rules.rule_version.rule_id` carries `REFERENCES rules.rule_set(rule_id)` with **no `ON DELETE` clause** (b5-rules line 41; `grep` confirms no `ON DELETE` anywhere in the migration set), so the default `NO ACTION` applies and the parent `rule_set` row cannot be deleted while a version row references it. b5a's second `DELETE` is therefore unreachable even if the first were removed — **no partial rollback of b5a exists**, and the irreversibility is total rather than an artifact of the trigger alone. |
| **Limitations recorded** | The ruling was taken from repository evidence; its consequences are now confirmed by execution (see Status). Three limitations previously recorded here are **RESOLVED**: the `singleTransaction` rollback path; the no-SQL-emitted / bookkeeping-intact behaviour of a throwing `down`; and the absence of committed coverage — a Floor-resident regression test now exists and passes at gate 8. What remains. **The migration file is still untypechecked**: `tsconfig.server.json` sets neither `allowJs` nor `checkJs`, so the `.cjs` is outside gate 7. **The regression test asserts behaviour, not the database outcome** — it confirms that `down()` is exported as a function and throws naming BR-07, which is the regression most likely to be introduced (node-pg-migrate aliases `down` to `up` when `down` is undefined). **The database invariants it relies on are now separately covered**: `server/test/ruleVersionImmutability.test.ts` asserts at gate 8 that the BR-07 trigger blocks UPDATE/DELETE/TRUNCATE for a privileged writer and that the NO ACTION foreign key pins the parent `rule_set` row — confirmed 27 Oct 2026 by a named Vitest run (2 of 2 passed, `NAMED_EXIT=0`) against a disposable PostgreSQL whose database name, seven applied migrations, seeded `IN-FER-RESP-BASE` row and both BR-07 triggers were asserted before the run; the full suite moved 139 → 141. **What remains uncovered is the end-to-end path**: no Floor gate runs `node-pg-migrate down` against a database, so that behaviour still rests solely on the targeted check recorded in Status, which ran against a **disposable container that was destroyed**. **The zone-grant layer on `rules.rule_version` is also untested** — the new test covers the owner path the trigger binds, not the REVOKE that binds application roles. **The regression test does not run under `verify:fast`**, which skips gate 8; only a full `npm run verify` reaches it. **D-2026-047's P2 premise is now historically inaccurate**: this work applied b5a to a database for the first time within that attestation's scope, carrying the corrected INR 1750 figure and not the superseded 1760. No state persisted, because the container was torn down, so D-2026-047's contingency is not triggered; it continues to stand for any other environment. The ruling is confined to append-only triggers (BR-07, BR-20); it decides no other migration-privilege question. |
| **Impact** | Audit finding **N-2 is CLOSED** · `1728200000000_b5a-authoritative-mvp.cjs` is now a **declared-irreversible** migration whose `down` raises with a stated reason and recovery instruction · **BR-20 is covered by the same ruling**, and `1728000000000_b4-vault.cjs` needs **no change** — its `down` is `DROP SCHEMA vault CASCADE`, DDL that never reaches the trigger · any future migration seeding `rules.rule_version` or `vault.disclosure_version` is likewise irreversible and must declare itself so · corrections to seeded rule data are **forward-only** — a superseding version row, never an edit or a delete — on any database that has applied the migration · **D-2026-047's Impact field records N-2 as OPEN; that statement was accurate on 16 Oct 2026 and is superseded by this entry. D-2026-047 is left unedited as the historical record** · D-2026-048 (engine integrity) remains allocated-but-unrecorded (A-6 unmet) and is untouched by this decision · the B5a post-implementation audit, the source of finding N-2, **remains unrecorded as a whole with its Decision ID unallocated**, and N-2 has no entry in `Repository-Audit/Repository Audit Decision Register.md`; a scoped **draft** covering finding N-2 alone now exists at `04_Development/Phase-9-B5a-N-2-Irreversible-Down-Audit-v0.1.md`, **not accepted and allocating no Decision ID**, so this entry remains N-2's only **accepted** repository-resident disposition · no frozen document is modified — b5a is a Phase 9 file and D-2026-027 is not engaged. |
| **References** | `04_Development/ui/server/migrations/1728200000000_b5a-authoritative-mvp.cjs` (the `down` rewritten by this decision); `04_Development/ui/server/test/fitness.static.test.ts` (the BR-07 irreversible-down regression test added under this decision); `04_Development/ui/server/migrations/1728100000000_b5-rules.cjs` lines 38-60 (BR-07 table, trigger function, triggers, REVOKE) and line 41 (the foreign key); `04_Development/ui/server/migrations/1728000000000_b4-vault.cjs` lines 53-64 (the BR-20 parallel) and its `down`; `02_Product/Phase-3-Product Architecture PRD v1.0.md` line 1294 (BR-07) and line 450 (M0.10 requirement); `02_Product/Phase-5-User-Flows v1.0.md` line 490 (X4); `04_Development/ui/scripts/run-server-tests.mjs` line 101 (migrations run against a superuser/owner connection); `04_Development/ui/server/db/types.ts` line 146; D-2026-047 (superseded on the N-2 status only, not otherwise); D-2026-046 (b5a authoritative MVP rules and fees); D-2026-044 (B5 engine-mechanism slice); D-2026-003 / P9-ADR-08 (zones); AP-03 (confidentiality first); AP-10 and the Final Principle (trust over convenience). |
| **Owner** | Vamshi |


# Open Decisions

## O-2026-001 — Pricing presentation (L1)

| Field | Value |
|---|---|
| **Decision** | Not yet taken. |
| **Status** | Open — Working Assumption Accepted; probable direction recorded 1 Sep 2026; pending Final Legal Review |
| **Date** | Not recorded (opened); direction recorded 1 Sep 2026 |
| **Question** | Whether customers see one bundled price, or Platform Fee + Professional Fee + Official Fee. |
| **Options** | One bundled price · Platform Fee + Professional Fee + Official Fee |
| **Resolution** | Working Assumption: proceed with the configurable pricing model until the legal review is completed. The decision remains **Open**. |
| **Impact** | Checkout · Pricing · Marketplace · Payment Flow |
| **References** | Phase 3 §26.1 L1; `06_Legal/L1 Register.md` (all 21 affected surfaces) |
| **Owner** | Not recorded |

**Recorded direction (1 Sep 2026).** Probable primary rendering mode for Phase 6 to design first: **component pricing** — Platform Fee + Professional Fee + Official Fee, separately identified. Rationale: the honest-product brand rule (AP-10; Product Philosophy §1, "no hidden fees") and marketplace-first / UPL legal caution (D-2026-006 — the platform is technology infrastructure, the professional fee is the independent agent's) both point to separately-identified components. **Both rendering modes remain in scope** per `06_Legal/L1 Register.md` §3 (no route, template, navigation or hierarchy changes with the outcome — only the price component's rendering mode). This is a design-first direction only; the final characterisation awaits the L1 legal review and the decision stays Open.

---

# Resolved Decisions

Decisions previously tracked under Open Decisions that have since been resolved. Their original identifiers, decision text and history are retained; each cross-references the resolving decision.

## O-2026-002 — Minimum sample size for published agent outcome statistics

| Field | Value |
|---|---|
| **Decision** | **Resolved by D-2026-019 (1 Sep 2026):** n≥20 per category floor, plus mandatory sample-size + confidence display; go-live gated by L3. |
| **Status** | **Resolved — see D-2026-019** (was Open) |
| **Date** | Recorded 25 Jul 2026 under Decision M; resolved 1 Sep 2026. |
| **Question** | What minimum sample size must be met before an agent's outcome statistics are published to clients? |
| **Options** | Phase 3 M2.4 proposes 20 matters in a category. No alternatives recorded. |
| **Resolution** | Resolved by an explicit owner decision in session — see D-2026-019 (Accepted). This entry is retained as the record of the original open question. |
| **Impact** | M2.4 Agent Profile & Outcome Record · Marketplace · Phase 3 §26.1 L3 (advertising rules may constrain publication) |
| **References** | Phase 3 M2.4, §26.3 P5, BR-17; D-2026-019 |
| **Owner** | Vamshi |

**Backfill note (recorded conflict — now resolved).** The Repository Audit Decision Register cited "publication sample size" as an example of a decision to backfill as accepted. At 25 Jul 2026 the repository recorded it only as a **proposal** (Phase 3 M2.4) with confirmation outstanding (Phase 3 §26.3 P5), so it was correctly held **Open** rather than backfilled — backfilling would have invented a business decision. **On 1 Sep 2026 the owner made the decision explicitly in session (D-2026-019), so it is now genuinely Accepted rather than backfilled, and the conflict is resolved.**

---

# Future Decisions

Reserved for future architectural and business decisions.

Examples:

- API Strategy
- Enterprise Pricing
- International Launch Order
- AI Model Selection
- White-label Platform
- Mobile Apps
- Public API
