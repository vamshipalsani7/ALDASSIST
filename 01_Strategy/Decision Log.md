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
