# ALDASSIST

> A patent ecosystem for inventors, patent professionals, law firms, and innovation teams.

---

# Vision

ALDASSIST is designed to simplify the complete patent journey—from invention capture to portfolio management—through an architecture that emphasizes trust, clarity, and long-term maintainability.

---

# Repository Structure

```
ALDASSIST
│
├── 01_Strategy
├── 02_Product
├── 03_Design
├── 04_Development
├── 05_Research
├── 06_Legal
├── 07_Marketing
├── 08_Meetings
├── 09_Governance
└── 99_Archive
```

---

# Repository Contents

**Current project status and phase progress are recorded in `01_Strategy/Roadmap.md`**, the canonical status source. This section lists contents only.

## 01_Strategy

- Phase 1 – Competitive Landscape
- Phase 2 – Business Strategy
- Architecture Principles *(canonical principles)*
- Product Vision
- Product Philosophy
- Assumptions
- Decision Log
- Glossary *(canonical terminology)*
- Metrics *(canonical metric definitions)*
- Roadmap *(canonical project status)*

---

## 02_Product

- Phase 3 – Product Architecture
- Phase 4 – Information Architecture
- Phase 5 – User Flows
- Assessment Lifecycle (ADR)

---

## 03_Design

Design assets, prototypes, design tokens, icons and visual resources.

---

## 04_Development

Source code, APIs, database schema, infrastructure and implementation.

---

## 05_Research

Research notes, competitive analysis, user interviews and technical investigations.

---

## 06_Legal

Legal documents, policies, agreements and compliance materials.

---

## 07_Marketing

Branding, launch strategy, SEO, content and marketing assets.

---

## 08_Meetings

Meeting notes, planning sessions and architecture discussions.

---

## 09_Governance

Documents that govern the repository itself rather than the product — repository audits, reviews and governance procedures.

---

## 99_Archive

Deprecated or historical documents retained for reference.

---

# Core Principles

The canonical principles document is `01_Strategy/Architecture Principles.md`. The list below is a purpose-specific subset; where it conflicts with the canonical document, the canonical document governs.

| Principle | Accepted source |
|---|---|
| Invention is the root entity. | AP-01 |
| Trust over convenience. | Final Principle ("improves trust") · AP-10 |
| Rules as data. | AP-02 |
| Three-zone data separation. | AP-03 |
| Cross-tenancy invisibility. | Phase 3 P6 · Phase 4 IA-5 · Phase 5 X7 |
| Plain language first. | AP-13 |
| Marketplace-first regulatory model. | D-2026-006 (Accepted) — see note |
| Long-term maintainability. | Final Principle ("improves maintainability") · AP-12 |

**Note on "Marketplace".** This entry uses D-2026-006's own wording. The previous wording, "Marketplace-first architecture", is supported by no repository source. ADR §13.8 reserves "Marketplace" for the future licensing surface and names the MVP concept "Agent Matching / Engagement"; D-2026-006 uses the term in a different, business-structure sense. The recorded conflict is documented in `01_Strategy/Glossary.md` under *Marketplace*.

---

# Documentation Workflow

Every major architectural change follows:

1. Research
2. Proposal
3. Review
4. Decision
5. Documentation
6. Freeze

Frozen documents are never modified without an explicit architectural decision.

## Traceability

Frozen documents require traceable governance.

Every frozen document must have:

- a recorded freeze point — which version was frozen
- a recorded version
- a recorded freezing authority
- an auditable history of any change made after freeze

The architectural requirement is traceability, not any particular tool. Version control (Git) is the recommended implementation.

Current position: the repository is not under version control. No frozen document records a freeze date or freezing authority. The frozen baseline is enumerated in `01_Strategy/Roadmap.md`.

---

# Repository Conventions

- Numbered folders represent major domains.
- ADRs document permanent architectural decisions.
- Decision Log records accepted repository decisions.
- Completed phases become part of the permanent baseline.

---

# AI Workflow

This repository is maintained with AI assistance.

- Claude Code is used for repository editing and document generation.
- ChatGPT is used for independent architecture review and critical analysis.
- Final decisions are made by the repository owner.

---

# Status

Current project status is recorded in **`01_Strategy/Roadmap.md`**, the canonical status source (Decision L).

Status is not restated here, to avoid two versions of the same fact.