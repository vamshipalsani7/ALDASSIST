# Phase 6 — Deferred / Requires-Decision Register

**FROZEN — PHASE 6 BASELINE (v0.1) · 1 SEPTEMBER 2026 · REPOSITORY OWNER (VAMSHI)**

> **Freeze notice — Phase 6 (UX & Interaction Design), 1 September 2026.** This document is part of the Phase 6 baseline, declared **frozen on 1 September 2026 by the repository owner (Vamshi)**; recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-020). Frozen at version v0.1. **DR-01 and DR-02 are frozen as explicitly deferred, open owner decisions** — the freeze locks their *deferred* status, not a resolution; they remain open for the owner to resolve (recorded in the Decision Log when made). This notice records the freeze and changes no design substance. *(Supersedes the working-document status noted below.)*

**Phase:** 6 — UX & Interaction Design · **Companion to:** WP-3 Interaction Design v0.1
**Type:** Working document (not frozen). Version v0.1.
**Date:** 1 September 2026

> **Purpose.** Record **only** questions that genuinely require a future owner (or legal/architecture) decision because the frozen baseline does not determine them and Phase 6 has no authority to invent them. This register does **not** hold already-decided matters, nor unspecified *values* that are legitimately design slots (those live in the WP-3 §7 slots table). Each entry states the question, why it is undetermined, the options, a recommended default (non-binding), and how WP-3 proceeds in the meantime — **without deciding**.
>
> Nothing here modifies a frozen document. Resolving an entry is an **owner decision**, to be recorded in the Decision Log (an ADR extension where it refines the ADR), not in this file.

**Trace vocabulary** as in WP-1/WP-2/WP-3.

---

## DR-01 · Which role may record a *not-file* Decision (F-2)

- **Question.** When a client decides **not to file** on a *Released* Assessment, a **Decision** entity is created (actor + rationale, BR-09) and the Invention moves to *Not pursued*. Which Workspace role(s) may record that not-file Decision?
- **Why it is undetermined.**
  - Phase 5 F10 attributes it generically to "the client," without a role `[P5:F10]`.
  - Phase 4 §17.2 gives **Member** "everything except costs and billing," which would *include* a not-file Decision (it is neither costs/billing nor engage/pay) `[P4:§17.2]`.
  - But the Phase 3 §4.3 capability matrix maps the analogous consequential act — **Abandon an Application** — to **Owner (with confirm)** `[P3:§4.3]`, and is **silent** on the pre-filing not-file Decision.
  - So two defensible readings exist; the baseline does not state which governs. This is a **permission decision**, which Phase 6 must not invent.
- **Options.**
  - (a) **Any edit-capable role (Owner/Admin/Member)** may record a not-file Decision; engage/pay stays Owner-only. *(Consistent with §17.2; lowest friction.)*
  - (b) **Owner (with confirm) only**, by analogy to Application abandonment. *(Consistent with §4.3's treatment of consequential "stop" actions.)*
  - (c) **Owner/Admin only** (a middle position).
- **Recommended default (non-binding).** Option (a), because §17.2 already grants Member everything except costs/billing and a not-file Decision is neither, and because it is fully reversible (the Invention persists and can proceed to file later) `[P5:F10 alt]`. This is a recommendation for your decision, not a Phase 6 determination.
- **How WP-3 proceeds meanwhile.** IX-1.13 is designed **permission-agnostic** — it asserts no specific role for the not-file Decision. The confirmation and Decision-entity interaction (IP-10) is identical under any option, so resolving DR-01 sets only *which role sees the affordance*, not the interaction design. No rework of the flow is implied by any resolution.
- **Impact if changed.** Only the permission gate on IX-1.13 / SC-C09; no state, flow, or other screen changes.
- **Owner:** Vamshi. **Status:** Open — awaiting owner decision.
- **Trace:** `[P5:F10]` · `[P4:§17.2]` · `[P3:§4.3, BR-09]` · WP-2 F-2 · WP-3 IX-1.13.

---

## DR-02 · Duplicate handling on docket import (F-3)

- **Question.** When a Verified Agent imports existing practice matters (SC-A04 / F22), and one of those matters later also arrives as a platform (Agent-Matching) matter — or the same matter is imported twice — is there a de-duplication rule, and what does the agent see?
- **Why it is undetermined.** Phase 5 F22 and Phase 3 M2.1 specify import and per-matter completeness handling, and note imported matters are the agent's own tenancy (**not** marketplace matters) `[P5:F22]`. Neither the baseline nor WP-2 specifies **de-duplication** between an imported own-practice matter and a subsequent platform matter for the same underlying filing, nor duplicate-on-re-import behaviour. This could be a data/behaviour rule (product), not merely a UX detail.
- **Options.**
  - (a) **No de-duplication** — imported and platform matters are distinct records; the agent reconciles manually.
  - (b) **Detect-and-suggest** — the system flags a probable duplicate and offers to link/merge, agent decides (a human decision, consistent with BR-09-style human control).
  - (c) **Automatic linking** on a deterministic key (e.g. official application number) with an audit trail.
- **Recommended default (non-binding).** Option (b) detect-and-suggest, because it keeps a human in control of a record-level merge and avoids silent automatic changes to the docket (consistent with deadline-safety/auditability principles `[AP-07]`). Recommendation only — not a Phase 6 determination.
- **How WP-3 proceeds meanwhile.** IX-2.2 designs import progress, partial/failed handling, and per-matter completeness **without** asserting any de-duplication behaviour, and flags this entry. No de-duplication interaction is invented.
- **Impact if changed.** Adds (or not) a duplicate-detection step and a link/merge interaction in IX-2.2 / SC-A04; does not affect the deadline-computation or review interactions.
- **Owner:** Vamshi. **Status:** Open — awaiting owner (product) decision.
- **Trace:** `[P5:F22]` · `[P3:M2.1]` · WP-3 IX-2.2 (F-3).

---

## Not in this register (recorded for clarity)

- **F-1 (sequential-edit handoff).** **Not a deferred decision.** It is designed within Phase 6 authority as an IP-03 soft-lock over existing edit roles, per your explicit authorization. It becomes a decision **only if** you intend to restrict editing to a *single designated editor* (a change to the §4.1 permission model); until you say so, there is nothing to decide, and WP-3 designs the authorized model.
- **Design slots (WP-3 §7 / WP-2 §9).** Unspecified *values* — committed review turnaround (configurable per ADR §9), confidence representations, L1 pricing rendering (O-2026-001), expected-next-event range, L6 window, channel defaults, idle timeout, verification turnaround, client MFA policy, legal content — are **not** register entries. They are already-decided-as-configurable or counsel-owned, tracked as slots. Filling them is configuration/legal input, not a new product decision.

---

*End of Deferred / Requires-Decision Register v0.1. WORKING DOCUMENT — owner review required. Resolutions are owner decisions recorded in the Decision Log, not here.*
