# Roadmap

**Type:** Living document
**Status:** **Canonical source for current project status** (Decision L)
**Established as canonical:** 25 July 2026

Current project status is recorded in this document only. Other documents link here rather than restating it.

---

# Current Status

| Field | Value |
|---|---|
| **Current status** | Active Development |
| **Current focus** | Product Architecture & Design |
| **Repository version** | Pre-MVP |
| **Current phase** | Phase 5 — User Flows complete; Phase 6 not started |
| **Architecture** | Frozen — see Frozen Baseline below |

Values transcribed from `README.md`, where they were previously recorded, and removed there under Decision L to avoid duplication.

---

# Milestone History

> **Historical notice (Decisions G and L).**
> The Milestone M1 block below is a **point-in-time record** of the milestone as it stood when written. It is preserved unaltered as historical accuracy requires.
> Its `Next: Phase 5 — User Flows` line was accurate when recorded and is **no longer current** — Phase 5 v1.0 is complete. Current status is in **Current Status** above; the current phase list is in **Phase Sequence** below.
> Its `✓ Stage Gate Review` line refers to a review that was never committed to the repository. Per approved Decision A1, historical Stage Gate Review documents are not reconstructed; the authoritative records of its outcome are the **Assessment Lifecycle ADR** and **D-2026-013**.

Milestone M1 — Architecture Baseline Established

Completed:
✓ Strategy
✓ Product Architecture
✓ Information Architecture
✓ Assessment Lifecycle ADR
✓ Stage Gate Review

Status:
Architecture Frozen

Next:
Phase 5 — User Flows

---

# Frozen Baseline

Recorded under Decision N. This enumerates which documents the repository treats as frozen.

| Document | Freeze evidence | Version | Freeze date |
|---|---|---|---|
| Phase 1 — Competitive Landscape | Phase 5 header baseline | v1.0 (filename) | Not recorded |
| Phase 2 — Business Strategy | Phase 5 header baseline | v1.0 (filename) | Not recorded |
| Phase 3 — Product Architecture PRD | Phase 4 header ("Phase 3 is frozen"); Phase 5 header baseline | v1.0 (filename) | Not recorded |
| Phase 4 — Information Architecture | Phase 5 header baseline | v1.0 (filename) | Not recorded |
| Assessment Lifecycle ADR | Phase 5 header baseline | Version 1.0 (in-document) | Not recorded |
| Phase 5 — User Flows | **Freeze not declared in any repository source** | v1.0 (filename) | Not recorded |

Before this record, the only enumeration of the frozen baseline in the repository was the header of Phase 5 — User Flows. Phase 5's own freeze status is not declared anywhere and is not assumed here.

Freeze dates and freezing authority are not recorded in any repository source. Traceability requirements for frozen documents are stated in `README.md`.

Living documents are not listed.

---

# Phase Sequence

Current phase names, standardised under Decision K.

| Phase | Name | Status |
|---|---|---|
| 1 | Competitive Landscape | Complete |
| 2 | Business Strategy | Complete |
| 3 | Product Architecture | Complete |
| 4 | Information Architecture | Complete |
| 5 | User Flows | Complete |
| 6 | UX & Interaction Design | Not started |
| 7 | Design System | Not started |
| 8 | UI | Not started |
| 9 | Development | Not started |

Phase 6 is named **UX & Interaction Design**, per Phase 5 §12 — the handoff that defines what Phase 6 receives. Earlier sources use "Wireframes" (`README.md`) and "UX Design" (Assessment Lifecycle ADR header). Those are historical usages in documents that predate Phase 5 or are frozen relative to it.

**Recorded conflict:** the Milestone M1 block above states `Next: Phase 5 — User Flows`, while Phase 5 v1.0 is complete. Status markers are governed by Decision L and are left unmodified in this batch.

---

# Roadmap Evolution

Phase 1 §8 proposed a ten-phase roadmap. The executed sequence diverged from it. Recorded under Decision K, which directs documenting evolution rather than restoring obsolete phases.

| Phase 1 §8 original | Current disposition |
|---|---|
| 1 — Competitive landscape | Executed as Phase 1 |
| 2 — Positioning, business & regulatory model | Executed as Phase 2 |
| 3 — Product architecture | Executed as Phase 3 |
| 4 — Information architecture and user journeys | Executed as Phase 4 (IA); journeys executed as Phase 5 |
| 5 — Design language & design system | Renumbered. Phase 5 became User Flows; Design System is Phase 7 |
| 6 — Key screen designs | Renumbered to Phase 8 (UI) |
| 7 — Technical architecture | Disposition not recorded |
| 8 — Pricing & packaging | Disposition not recorded |
| 9 — SEO, content & go-to-market | Disposition not recorded |
| 10 — Build roadmap | Disposition not recorded |

"Disposition not recorded" means no repository document states whether the phase was merged, renamed, postponed or removed.

Content of a related kind exists elsewhere — technical architecture material in Phase 3 §10, §13, §15 and §17–22; pricing material in Phase 2 §10 and the L1 Register; go-to-market material in Phase 2 §14 and §21; build-sequencing material in Phase 2 §14. This overlap is observed, not decided. No source records that these phases were absorbed.