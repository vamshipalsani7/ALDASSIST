# Project Context

**Type:** Living document
**Status:** Populated 25 July 2026 under Decision A2, by extraction from existing repository sources only. No new content was created.

**Purpose.** Orientation for anyone entering this repository. What ALDASSIST is, where authority lives, and what is frozen. This document points to canonical sources; it does not restate them.

---

## What ALDASSIST is

A patent ecosystem for inventors, patent professionals, law firms and innovation teams — positioned as **the operating layer between an invention and the patent system**, spanning three layers: the Record (custody), the Judgement (assessment), and the Work (professional services delivered by verified agents).

Full statement: `01_Strategy/Product Vision.md`.

---

## Where authority lives

Read in this order. Later documents derive from earlier ones and do not redefine them.

| Question | Canonical source |
|---|---|
| What are the permanent design constraints? | `01_Strategy/Architecture Principles.md` |
| What has been decided, and what is still open? | `01_Strategy/Decision Log.md` |
| What does a term mean? | `01_Strategy/Glossary.md` |
| How is a metric defined? | `01_Strategy/Metrics.md` |
| What is the current project status? | `01_Strategy/Roadmap.md` |
| What is assumed rather than decided? | `01_Strategy/Assumptions.md` |
| Which surfaces does the L1 legal dependency affect? | `06_Legal/L1 Register.md` |
| How does Assessment & Review work? | `02_Product/Assessment-Lifecycle.md` (ADR — supersedes conflicting text in Phases 2–4) |
| How does the repository govern itself? | `09_Governance/` · `Repository-Audit/Repository Audit Decision Register.md` |
| How should this repository be worked on? | `CLAUDE.md` |

---

## Document lineage

```
Phase 1  Competitive Landscape
   └─► Phase 2  Business Strategy
          └─► Phase 3  Product Architecture (master blueprint)
                 └─► Phase 4  Information Architecture
                        └─► Phase 5  User Flows
                 ▲
  Assessment Lifecycle ADR ──┘
```

The ADR resolves a contradiction between Phase 2 and Phase 3 on assessment, payment and review sequencing, and **supersedes any conflicting statement in Phases 2–4 on the matters it covers.**

---

## What is frozen

Phases 1–4 and the Assessment Lifecycle ADR are treated as frozen. Phase 5's freeze status is not declared in any repository source.

The authoritative record — including freeze evidence and what is not recorded — is the **Frozen Baseline** table in `01_Strategy/Roadmap.md`.

Frozen documents are never modified without an explicit architectural decision. Where frozen guidance has been superseded, a **historical notice** is added alongside it rather than the content being rewritten. Notices preserve the original text, explain what changed, and point to the current authority.

---

## Current status

Recorded in `01_Strategy/Roadmap.md`, the canonical status source. It is not restated here.

---

## How to work in this repository

`CLAUDE.md` holds the operating instructions. In summary: build on existing architecture, never modify frozen phases without explicit instruction, report contradictions rather than silently fixing them, and do not treat a decision as canonical before approval.

`README.md` holds the repository structure, conventions and documentation workflow.

---

## Placeholder

No repository source records project context beyond what is collected and pointed to above — for example, team composition, timeline commitments, or funding position. Nothing has been added to fill those gaps.
