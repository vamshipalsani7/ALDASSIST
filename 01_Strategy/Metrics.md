# Metrics

**Type:** Living document
**Status:** Canonical source for metric definitions
**Established:** 25 July 2026, under Decision I

---

## 1. Purpose and scope

Decision I requires a concise set of named metrics, each defining its formula, numerator, denominator, purpose and target, with North Star metrics distinguished from operational ones.

This document defines **eight metrics**: the two North Star metrics, and the six that other repository documents' requirements already depend on.

Phase 2 §20.2 lists a wider set of measures. Those remain in Phase 2 as strategy content and are not promoted here. Promotion requires an approved decision.

**Every value in this document is transcribed from a repository source.** Where a source does not state a formula, denominator or target, this document records that it is **not defined in the repository** rather than supplying one. Where sources conflict, the conflict is recorded rather than resolved.

---

## 2. North Star metrics

### NS-1 — Disclosures Converted to Filings

| Field | Value |
|---|---|
| **Class** | North Star, Years 1–3 |
| **Formula** | Count of Disclosures that resulted in a filing |
| **Numerator** | Disclosures that resulted in a filing |
| **Denominator** | None — absolute count |
| **Purpose** | "The single number that captures whether we are fixing the funnel. It requires acquisition (someone found us), trust (they disclosed), quality (the assessment was credible), and conversion (they paid). One number, whole funnel." |
| **Target** | Not defined in the repository |
| **Source** | Phase 2 §20.1 |

### NS-2 — Assets Under Custody

| Field | Value |
|---|---|
| **Class** | North Star, Years 4+ |
| **Formula** | Count of live IP assets whose record, deadlines and renewals run on the platform |
| **Numerator** | Live IP assets under platform custody |
| **Denominator** | None — absolute count |
| **Purpose** | "The number that determines enterprise value, because it's the recurring base and the marketplace supply." |
| **Target** | Not defined in the repository |
| **Source** | Phase 2 §20.1 |

**Explicitly not North Star metrics** (Phase 2 §20.1): revenue (lags and hides mix problems), users (vanity in a low-frequency category), patents granted (3–5 year lag makes it useless for steering).

---

## 3. Operational metrics

### OP-1 — Disclosure → Filing Conversion

| Field | Value |
|---|---|
| **Class** | Operational — headline |
| **Formula** | Disclosures that resulted in a filing ÷ Disclosures |
| **Numerator** | Disclosures that resulted in a filing |
| **Denominator** | **Disclosures** |
| **Purpose** | Whole-funnel conversion. Headline question: "is the thesis working?" |
| **Target** | >25% |
| **Failure threshold** | ~15% — "If disclosure → filing runs below ~15%, the free layer is an expensive charity" |
| **Source** | Phase 2 §20.2 (target), §18.4 (threshold), §20.3 (headline status) |
| **Consumed by** | Phase 2 §20.3 · Phase 3 §6 (Business dashboard), NFR-O03 · Phase 4 §8 (`/ops/business`) |
| **Conflict** | See §4.1 |

### OP-2 — Released Assessment → Paid Filing Engagement

| Field | Value |
|---|---|
| **Class** | Operational |
| **Formula** | Released Assessments converting to a paid filing engagement ÷ Released Assessments |
| **Numerator** | Released Assessments that converted to a paid filing engagement |
| **Denominator** | **Released Assessments** |
| **Purpose** | Conversion at the assessment-to-engagement seam. Measures whether a human-reviewed verdict earns a paid filing. |
| **Target** | ≥25% |
| **Failure threshold** | <15% — "If the conversion number lands below 15%, the thesis is wrong and we should re-examine whether the assessment layer is really the wedge before building further." |
| **Source** | Phase 2 §13.4, as clarified by ADR §12 |
| **Conflict** | See §4.1 |

**Definitional note.** Phase 2 §13.4 originally read "≥25% of *completed assessments* convert to a paid engagement." ADR §12 made this unambiguous: it measures **released assessment → paid filing engagement**. "Released" is the ADR §4 state reached only after a `ReviewDecision` by a Verified Agent (BR-01). The assessment is free and precedes payment and Engagement (ADR §7).

### OP-3 — Agent-Hours per Matter

| Field | Value |
|---|---|
| **Class** | Operational — headline |
| **Formula** | Agent hours ÷ Matters |
| **Numerator** | Agent hours worked |
| **Denominator** | Matters |
| **Purpose** | "This is the core AI thesis, quantified." Headline question: "is the AI creating leverage?" |
| **Target** | −40% within 18 months |
| **Baseline** | Not defined in the repository — the target is expressed as a relative reduction with no stated starting value |
| **Source** | Phase 2 §20.2, §20.3, §10.3 |

### OP-4 — Recurring Revenue Share

| Field | Value |
|---|---|
| **Class** | Operational — headline |
| **Formula** | Recurring revenue ÷ Total revenue |
| **Numerator** | Recurring revenue |
| **Denominator** | Total revenue |
| **Purpose** | Headline question: "are we becoming a compounding business or a services shop?" |
| **Target** | >40% by Year 3 |
| **Source** | Phase 2 §20.2, §20.3 |

### OP-5 — Missed Deadlines

| Field | Value |
|---|---|
| **Class** | Operational — headline |
| **Formula** | Count of missed deadlines |
| **Numerator** | Missed deadlines |
| **Denominator** | None — absolute count |
| **Purpose** | Headline question: "are we still trustworthy?" |
| **Target** | Zero. "Any non-zero value is a company-level incident." |
| **Escalation** | A platform-attributable miss is a Sev-1 incident with mandatory post-mortem and client disclosure within 24 hours (NFR-C01) |
| **Source** | Phase 2 §20.2, §20.3; Phase 3 NFR-C01 |
| **Conflict** | See §4.2 |

### OP-6 — Percentage of AI Output Materially Edited

| Field | Value |
|---|---|
| **Class** | Operational |
| **Formula** | AI outputs materially edited by the human reviewer ÷ AI outputs reviewed |
| **Numerator** | AI outputs materially edited by the reviewer |
| **Denominator** | AI outputs reviewed |
| **Purpose** | "The single best measure of whether the AI is actually working." Derived from reviewer edit diffs captured under FR-A08. |
| **Target** | **Two conflicting values in the repository — see §4.3** |
| **Source** | Phase 2 §13.4, §20.2; Phase 3 M4.2, M1.3 |
| **Conflict** | See §4.3 |

---

## 4. Recorded conflicts

Per Decision I and the instruction governing this batch, conflicting repository sources are recorded, not resolved. **None of the conflicts below has been resolved in this document.**

### 4.1 OP-1 and OP-2 carry identical targets on different denominators

OP-1 and OP-2 are **separate metrics** measuring different things across different denominators. Both originate in Phase 2, and both carry a 25% target and a 15% failure threshold.

| Metric | Denominator | Target | Threshold | Source |
|---|---|---|---|---|
| OP-1 | Disclosures | >25% | ~15% | Phase 2 §20.2, §18.4 |
| OP-2 | Released Assessments | ≥25% | <15% | Phase 2 §13.4, ADR §12 |

These cannot both hold at 25% unless every Disclosure produces a released Assessment. ADR §12 resolved the definition of OP-2's denominator but did not address OP-1, which is the metric the North Star, the headline four, and both Phase 3 and Phase 4 actually consume.

**No distinct target has been set for either metric.** The repository states 25% for both, and no source distinguishes them. Assigning distinct targets is a business decision and is not made here.

### 4.2 OP-5 scope differs between sources

| Source | Scope |
|---|---|
| Phase 2 §20.2 | "Missed deadlines: target zero" — unqualified |
| Phase 3 NFR-C01 | "Missed deadlines **attributable to platform error**: zero" |

Phase 2 counts all missed deadlines; Phase 3 counts only those attributable to platform error. The repository does not state which scope governs the headline metric.

### 4.3 OP-6 has two thresholds and no definition of "material"

| Source | Threshold |
|---|---|
| Phase 2 §13.4 | "<20% of AI assessments require *material* correction by the human reviewer" |
| Phase 2 §20.2 | "target: falling toward <15%" |

Both appear in Phase 2. Neither defines what makes an edit **material**, and Phase 3 M4.2 records edit severity as a measured dimension without setting a materiality boundary. Until "material" is defined, this metric cannot be computed unambiguously.

---

## 5. Relationship to other documents

- **Phase 2 §20** is the origin of most definitions and carries a notice pointing here. It remains frozen and unaltered.
- **Phase 3 NFR-O03** requires business-metric instrumentation for "all four Phase 2 headline metrics" — OP-1, OP-3, OP-4, OP-5.
- **Phase 3 §6** and **Phase 4 §8** (`/ops/business`) surface the same four.
- **ADR §12** governs OP-2's definition.

---

## 6. Maintenance

This is a living document and the canonical source for metric definitions. Identifiers are never reused or renumbered. Adding a metric to this set, changing a target, or resolving any conflict in §4 requires an approved decision recorded in the Decision Log.
