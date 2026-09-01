# Assessment Lifecycle

**Type:** Architecture Decision Record — canonical reference
**Status:** Accepted. Supersedes any conflicting statement in Phases 2–4 on the matters below.
**Resolves:** Stage Gate Review findings **C1** (assessment/payment/review sequencing) and **G1** (review-gate operating model).
**Constraints preserved:** mandatory human review gate (BR-01) · Invention-as-root (P5) · rules-as-data (D1) · provenance (P2/BR-02) · three-zone separation (D2) · L1 configurability.
**Date:** 24 July 2026

---

## 1. Purpose

The Stage Gate Review found that Phases 2–4 silently assumed different answers to one question: **when does the client pay, and what is the mandatory human review attached to?** Phase 2's core metric ("25% of *completed assessments* convert to a paid engagement") requires the assessment to precede payment; Phase 3's access model routes all agent access through Engagements, which requires an Engagement to exist before an agent can review. These cannot both be true as written.

This document resolves that contradiction permanently and specifies the review-gate operating model that Phase 3 left under-defined. It is the single source of truth for how Assessment & Review works. Where it conflicts with earlier phase text, this document wins.

It deliberately decides *only* what is needed to remove the ambiguity. It introduces no new product scope.

---

## 2. Scope

**In scope:** the lifecycle of an Assessment from request to release; how a human reviewer is assigned; how that reviewer accesses confidential material; where payment and Engagement creation sit relative to the assessment; how reviewers are compensated; and the service-level *model* (not the values).

**Out of scope:** the filing, drafting, prosecution and renewal lifecycles (governed by Phase 3); the assessment's internal AI pipeline mechanics (Phase 3 M1.3, §17); pricing amounts, settlement mechanics and anything the L1 legal dependency governs; APIs, schema and other implementation detail.

---

## 3. Operating principles

These follow from the preserved constraints and govern every decision below.

1. **The assessment is the conversion engine, not a paid product.** Its job is to earn trust and move an inventor from uncertainty to a decision. Placing a paywall in front of it would blunt the sharpest wedge in the strategy. *(Resolves C1 in favour of a pre-payment assessment.)*
2. **Human review is never skipped, never sampled, never deferred into a later paid step.** BR-01 holds without exception. A verdict reaches a client only after a named Verified Agent has reviewed and released it.
3. **Review access is the narrowest grant that permits the task.** A reviewer sees exactly one Disclosure version for exactly one review, and nothing else of the client's. Confidentiality is preserved even though no Engagement exists.
4. **An assessment is not an engagement.** Reviewing an assessment creates no client–agent relationship, no matter, and no obligation on either party to proceed together.
5. **The reviewer and the eventual drafter may be different people, by design.** Assignment of a reviewer is a platform function; selection of a filing agent is a client choice. Continuity is not assumed.

---

## 4. Assessment lifecycle

An Assessment moves through the following states. This is the canonical sequence; Phase 5 draws its flow directly from it.

```
REQUESTED ─► ANALYSING ─► IN REVIEW ─► RELEASED ─► (DECIDED)
                                          │
                                          └─► client acts on the verdict;
                                              may proceed to a filing
                                              Engagement — a separate step
```

| State | Meaning | Entry condition | Human involvement |
|---|---|---|---|
| **Requested** | Client has asked to assess a completed Disclosure | A Disclosure version exists and is marked complete | None |
| **Analysing** | The AI pipeline is running (Phase 3 M1.3) | — | None |
| **In review** | Analysis complete; awaiting a reviewer's disposition | A reviewer has been assigned (§5) and granted review access (§6) | **Mandatory (BR-01)** |
| **Released** | Reviewer has reviewed, edited as needed, and released | A `ReviewDecision` by a Verified Agent exists | Reviewer named on the output |
| **Decided** | Client has recorded a decision on the verdict | Client action | Client only |

**Invariants:**
- No transition from *In review* to *Released* without a `ReviewDecision` referencing a Verified Agent (BR-01).
- The Disclosure version assessed becomes immutable on release (BR-20).
- Every assertion in the released output carries a resolvable citation (BR-02); this is a property of the pipeline, unchanged here.
- The assessment happens with **no Engagement and no Matter in existence.** Those may be created later, and only if the client chooses to file.

The four verdict outcomes (favourable / qualified / unfavourable / inconclusive) and their presentation are governed by Phase 4 §11.6 and §15.2 and are unchanged.

---

## 5. Reviewer assignment model

**Decision (resolves G1, assignment):** reviewer assignment is **queue-based with domain routing**, not the full marketplace match used for filing engagements.

- Completed analyses enter a **review queue**. Each Verified Agent sees the subset of the queue that matches their **declared technical domains** (Phase 4 `/agent/reviews`).
- An agent takes an item from their filtered queue, or the system routes an item to an available domain-matched agent. Either mechanism satisfies this model; the queue is the source of truth.
- This is deliberately lighter than filing-agent matching (Phase 3 M1.5). Review is a shorter, higher-frequency task; a full match would add latency the task does not warrant.

**Why not the marketplace match:** the marketplace exists to let a *client choose* a professional for a multi-week engagement. Review is a platform-internal quality gate on a short task. Conflating them would burden a fast gate with a slow mechanism and would wrongly imply the reviewer is "the client's agent."

**Conflict handling:** an agent may not review an assessment where they hold a declared conflict, evaluated on the same basis as engagement conflict-checking (Phase 3 §4.2). A conflicted agent's queue simply excludes the item.

**Capacity:** reviewer capacity is monitored as a **distinct pool**, separate from filing capacity, on the operations consoles (Phase 3 M4.1/M4.3). See §9 for the saturation policy.

---

## 6. Review access model

**Decision (resolves C1, access):** a new, narrow access-grant concept — the **review grant** — permits a reviewer to access confidential material *without an Engagement*.

This is the one genuinely new concept the resolution requires, and it is unavoidable: Phase 3's model grants agent access only through Engagements (P6/D4), yet review must occur before any Engagement exists.

Properties of a review grant:

| Property | Value |
|---|---|
| **Grants access to** | Exactly one Disclosure version and its attached artifacts, plus the AI analysis under review |
| **Grants access for** | The purpose of producing exactly one `ReviewDecision` |
| **Duration** | The review task; expires on release or on reassignment |
| **Does not grant** | The client's other Inventions, portfolio, matters, documents, or any aggregate view |
| **Creates** | No Engagement, no Matter, no client–agent relationship |
| **Audited** | Yes — as with every access grant (Phase 3 §4.2, §15) |

The review grant sits alongside, and does not replace, the matter-scoped Engagement grant. It is strictly narrower. It upholds every confidentiality guarantee in Phase 3 — the reviewer's reach is smaller than an engaged agent's, not larger.

**Zone handling is unchanged:** the Disclosure remains Zone 1 throughout. Review access is a scoped, audited read within Zone 1; nothing about review moves content across zones or exposes it to the outcome-data pipeline (BR-15).

---

## 7. Engagement & payment sequencing

**Decision (resolves C1, sequencing):** the assessment is **free to the client and precedes any payment or Engagement.** Payment and Engagement enter only if the client decides to file.

Canonical sequence:

```
Disclosure (complete)
      │
      ▼
Assessment  ──  free to client · human-reviewed · no Engagement, no Matter, no payment
      │
      ▼
Verdict released
      │
      ├─► client decides NOT to file → Invention persists in the Vault; no money changes hands
      │
      └─► client decides to file
                │
                ▼
          Agent Matching (Phase 3 M1.5) → fixed-price quote → client accepts
                │
                ▼
          Engagement created → Matter created → payment per the L1-configured model
                │
                ▼
          Filing lifecycle (Phase 3 J3 onward)
```

Consequences, stated so they are not rediscovered later:

- **Phase 2's conversion metric is now unambiguous:** it measures *released assessment → paid filing engagement*. The assessment is the top of the paid funnel's immediately-preceding step, not part of it.
- **A free, human-reviewed assessment is a real cost of goods** (see §8). This was absent from Phase 2's unit economics and is recorded here as a correction.
- **The "don't file" outcome costs the client nothing**, which is what makes the honesty principle (Phase 2 §3.3) credible in practice rather than only in copy.
- Nothing here changes the L1 configurability of the *filing* payment: whether the client sees a bundled price or itemized components remains a configured behaviour of the price component (Phase 4 §21).

---

## 8. Reviewer compensation model

**Decision:** reviewers are **compensated by the platform** for pre-engagement assessment reviews. Because no client Engagement exists at review time, this compensation cannot be a share of a client's professional fee; it is a **platform-borne cost**.

- The mechanism and rate are **configurable** and are **not fixed here** — they interact with the L1 legal dependency (whether platform-to-agent compensation for review is characterised as a professional fee, a service fee, or otherwise). **This is added to the L1 register.**
- The economic consequence is recorded plainly: **each assessment carries a human-review cost independent of whether the client ever pays for a filing.** Assessment volume therefore has a direct COGS impact, and the free-assessment funnel must be sized against reviewer capacity and cost, not treated as free to operate.
- Where a captive practice exists later (Phase 3 §11.2, deferred), review may be performed in-house; the model here does not require it and does not preclude it.

This section records *that* the platform bears the cost and *why*; it does not set the amount, which remains a configurable, legally-gated decision.

---

## 9. Service level expectations

Values are configurable and are **not hardcoded** here, consistent with the project's treatment of rules and pricing. What is fixed is the *model*.

1. **A committed review turnaround exists and is the client-facing promise.** The earlier "hours, not seconds" language (Phase 3 J2) is **retired** — it was never compatible with mandatory human review. The client is shown an honest expected turnaround for the *review* stage, distinct from the (faster, automated) analysis stage.
2. **The turnaround value is a configuration**, tunable as capacity and evidence dictate. (A first working assumption of two business days may be used for Phase 5 illustration; it is not a fixed commitment of this record.)
3. **Reviewer capacity is monitored as a distinct pool.** When it saturates, the policy is, in order: widen the eligible reviewer pool for the affected domain; then queue with an **honest wait estimate shown to the client**; **never** skip or shortcut review to clear the queue.
4. **Free assessments and paid filings draw on overlapping reviewer capacity.** This coupling is acknowledged as an operational reality: assessment demand can consume capacity the filing pipeline also needs. It is managed through monitoring and the saturation policy above, and is a standing input to capacity planning — not a condition to be assumed away.

---

## 10. Roles & responsibilities

| Role | Responsibility in this lifecycle |
|---|---|
| **Client (Workspace roles / Named Inventor)** | Completes the Disclosure; requests the assessment; reads the verdict; decides whether to file. Pays only on choosing to file. |
| **Reviewer (Verified Agent in the review role)** | Takes a domain-matched item from the review queue; reviews the AI analysis; edits as needed; records a `ReviewDecision`; is named on the released output. Accountable for the released verdict. Holds a review grant only. |
| **Filing agent (Verified Agent in the engagement role)** | A *separate* selection made by the client *after* a favourable/qualified verdict, through Agent Matching. May or may not be the same person as the reviewer. |
| **Platform** | Runs the analysis; operates the review queue and routing; issues review grants; compensates reviewers; monitors reviewer capacity; enforces BR-01 and the access boundary. |
| **Docket Ops / Marketplace Ops** | Monitor the reviewer capacity pool and apply the saturation policy (§9). |

**The reviewer/drafter distinction is now explicit** (Stage Gate hygiene fix): assignment of a reviewer is a platform function; choice of a filing drafter is a client decision. Phase 5 must show these as distinct.

---

## 11. Interaction with Engagements and Matters

- **Before release:** no Engagement, no Matter. The reviewer operates under a review grant (§6). The Invention and its Disclosure exist under the client's Workspace as normal (P5).
- **On a decision not to file:** nothing is created. The Invention remains in the Vault in the "Not pursued" state (Phase 4 §11.2), monitored and re-assessable. No money changes hands.
- **On a decision to file:** the client enters Agent Matching (Phase 3 M1.5). Acceptance of a quote creates the **Engagement**, which creates the **Matter** and the matter-scoped access grant (Phase 3 P6/D4). From here the filing lifecycle proceeds exactly as Phase 3 specifies.
- **The assessment travels with the Invention, not the Matter.** A released assessment is an artifact of the Invention (Phase 4 §15.1) and remains visible on the Invention regardless of whether any Matter is ever created, and regardless of which agent later drafts.

Nothing in this section alters the Engagement, Matter, or access models defined in Phase 3. It defines only what exists *before* them.

---

## 12. Impact on existing phases

| Phase | Statement affected | Resolution |
|---|---|---|
| **Phase 2 §13.4, §18.1** | Conversion metric ("completed assessments → paid engagement") | Now unambiguous: measures *released assessment → paid filing engagement*. Assessment is pre-payment. No change to the metric's intent. |
| **Phase 2 §10.3** | Unit economics omit assessment review cost | Corrected: assessment review is a platform-borne COGS line (§8). The margin model gains one cost line per assessment. |
| **Phase 3 M1.3** | "Dependencies: Marketplace (reviewer assignment)" | Superseded. Reviewer assignment is **queue-based domain routing** (§5), not the marketplace match. |
| **Phase 3 §4 / §14** | Agent access flows only through Engagements | Extended: a narrower **review grant** (§6) permits pre-engagement review access. The Engagement grant is unchanged. |
| **Phase 3 J2 step 7** | "an honest time estimate (hours, not seconds)" | Retired. Replaced by a configurable, committed **review turnaround** distinct from analysis time (§9). |
| **Phase 4 §10 (vocabulary)** | "Marketplace" overloaded | Hygiene fix: the MVP agent-matching concept is **Agent Matching / Engagement**; **"Marketplace"** is reserved for the future licensing surface. Both are distinct vocabulary entries. |
| **Phase 4 §26.2** | First Phase 5 flow (disclosure → assessment → verdict) | Now buildable: sequencing, assignment, access and SLA model are all specified. |

**Explicitly unchanged:** BR-01, P5, D1, P2/BR-02, D2, the four verdict outcomes and their presentation, the "Not pursued" state, and the L1 configurability of filing payment. This record adds precision at one seam; it disturbs nothing else.

---

## 13. Decisions recorded

1. **The assessment is free to the client and precedes payment and Engagement.** *(C1)*
2. **Human review remains mandatory before release, with no exception.** *(BR-01 preserved)*
3. **Reviewer assignment is queue-based with domain routing**, not the marketplace match. *(G1)*
4. **A review grant** — narrower than an Engagement grant — provides pre-engagement review access to exactly one Disclosure version for exactly one review. *(C1)*
5. **The reviewer and the filing drafter may be different agents;** reviewer assignment is a platform function, drafter selection is a client choice. *(hygiene)*
6. **Reviewers are compensated by the platform** for pre-engagement reviews; the mechanism is configurable and joins the L1 register. Assessment review is a platform-borne COGS line. *(C1 economics)*
7. **A committed, configurable review turnaround** replaces the retired "hours, not seconds" language; reviewer capacity is a distinct monitored pool with a never-skip-review saturation policy. *(G1)*
8. **"Marketplace" is reserved for the future licensing surface;** the MVP concept is "Agent Matching / Engagement." *(hygiene)*

---

## 14. Open items

Only those genuinely unavoidable and already tracked elsewhere:

- **L1 (extended):** the characterisation and mechanism of **platform-to-reviewer compensation** for pre-engagement assessment review requires legal confirmation, as part of the existing L1 dependency. Recorded in §8 and added to the L1 register. This does not block Phase 5, which designs structure and sequence under the standing L1 working assumption.

No other open items. The C1 and G1 findings are resolved.

---

*End of Assessment Lifecycle ADR. Phase 5 may proceed.*
