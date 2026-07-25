# Decision Log

This document records all major product, architecture, and business decisions.

**Structure standardized:** 25 July 2026, under Decision H2.

---

## Template

Every entry uses these fields:

| Field | Meaning |
|---|---|
| **Decision** | What was decided |
| **Status** | Accepted · Open · Proposed |
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

# Open Decisions

## O-2026-001 — Pricing presentation (L1)

| Field | Value |
|---|---|
| **Decision** | Not yet taken. |
| **Status** | Open — Working Assumption Accepted; pending Final Legal Review |
| **Date** | Not recorded |
| **Question** | Whether customers see one bundled price, or Platform Fee + Professional Fee + Official Fee. |
| **Options** | One bundled price · Platform Fee + Professional Fee + Official Fee |
| **Resolution** | Working Assumption: proceed with the configurable pricing model until the legal review is completed. |
| **Impact** | Checkout · Pricing · Marketplace · Payment Flow |
| **References** | Phase 3 §26.1 L1; `06_Legal/L1 Register.md` (all 21 affected surfaces) |
| **Owner** | Not recorded |

---

## O-2026-002 — Minimum sample size for published agent outcome statistics

| Field | Value |
|---|---|
| **Decision** | Not yet taken. |
| **Status** | Open — recorded retrospectively |
| **Date** | Recorded 25 Jul 2026 under Decision M. |
| **Question** | What minimum sample size must be met before an agent's outcome statistics are published to clients? |
| **Options** | Phase 3 M2.4 proposes 20 matters in a category. No alternatives recorded. |
| **Resolution** | Not resolved. Phase 3 §26.3 P5 requires confirmation and no repository document records that confirmation. |
| **Impact** | M2.4 Agent Profile & Outcome Record · Marketplace · Phase 3 §26.1 L3 (advertising rules may constrain publication) |
| **References** | Phase 3 M2.4, §26.3 P5, BR-17 |
| **Owner** | Not recorded |

**Backfill note (recorded conflict).** The Repository Audit Decision Register cites "publication sample size" as an example of a decision to backfill as accepted. The repository records it only as a **proposal** (Phase 3 M2.4: "proposed: 20 matters in a category") with confirmation still outstanding (Phase 3 §26.3 P5). It is therefore recorded here as **Open**, not Accepted. Recording it as accepted would invent a business decision. **This conflict is recorded, not resolved.**

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
