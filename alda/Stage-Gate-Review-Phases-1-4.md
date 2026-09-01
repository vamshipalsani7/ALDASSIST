# Stage Gate Review — Phases 1–4

**Reviewer stance:** Principal Product Architect, pre-implementation design review. Critical by default.
**Scope reviewed:** Phase 1 (Competitive Landscape), Phase 2 (Business Strategy), Phase 3 (Product Architecture/PRD), Phase 4 (Information Architecture), evaluated as one system.
**Method:** re-read the source documents and cross-checked load-bearing decisions against each other rather than reviewing from memory.
**Date:** 24 July 2026

---

## Verdict up front

**Make specific corrections before Phase 5.**

Not "proceed" — there is one genuine contradiction and one genuine gap that will propagate into the flows and cost rework if carried forward. Not "pause for major work" — the architecture is sound, internally consistent on the things that matter most, and the corrections are small and well-contained. They can be resolved in a focused session, not a phase.

The corrections are **C1** (assessment/review/payment sequencing — a real contradiction between Phase 2 and Phase 3) and **C2** (the economics and assignment of the review gate — a genuine hole). Everything else is either fine, or a known dependency already correctly flagged. Details below, with the evidence.

---

## 1. Internal consistency

### 1.1 What holds — and I checked, not assumed

I traced the five decisions that everything else hangs on. All five are consistent across every phase that touches them:

| Decision | P2 | P3 | P4 | Consistent? |
|---|---|---|---|---|
| Invention-as-root (not Application) | implied by "Record is the product" | P5, §14.3, entity model | IA-1, spine of §5, §15.1 | ✓ Fully |
| Mandatory human review before release | §3.4, §21.4 | BR-01, FR-A07, T8, state-machine enforcement | `/agent/reviews` as distinct destination, §15.2, §26.1 | ✓ Fully |
| Provenance as a hard constraint | §3.1, §6.4 | P2, BR-02, M0.4, §17.3 span addressing | IA-4, depth-3 citations, §26.1 | ✓ Fully |
| Three-zone data separation | §16.2 (moat on metadata not content) | D2, BR-15, §13.1, DB-level enforcement | §13.1 search boundary, §17 permissions | ✓ Fully |
| Rules-as-data / jurisdiction-agnostic | §12.4 | D1, P1, §18, BR-14 | U8, §25.1 | ✓ Fully |

This is the important result. The spine of the system is coherent. The mandatory review gate in particular is enforced identically in all three later phases — as a state-machine constraint in P3, as a distinct navigation destination in P4, and as an explicit "do not change" in both handoffs. That is exactly the kind of decision that usually drifts, and it didn't.

Terminology is also largely disciplined. Phase 4 §10 built a controlled vocabulary specifically to prevent drift, and the banned-terms list ("success rate," "instant," "prosecution" in client UI) is honoured in the earlier documents rather than contradicted by them.

### 1.2 The one real contradiction — C1: assessment/payment/review sequencing

This is the finding that matters. The documents disagree about **when the client pays and what the review gate is attached to**, and the disagreement is load-bearing because the entire MVP thesis depends on it.

**The evidence:**

- **Phase 2 §13.4** sets the MVP success criterion as *"≥25% of completed assessments convert to a paid engagement."* This sentence only makes sense if **the assessment happens before payment** — you cannot measure conversion from assessment to paid engagement if the assessment is already inside the paid engagement.
- **Phase 2 §18.1** flywheel: *"disclosure → assessment → filing → the Record,"* with "~25% convert" placed **between assessment and filing**. Again: assessment precedes the paid step.
- **Phase 3 J2** (the assessment journey) ends at the verdict. **J3** (*"Decision to file → engagement"*) is where the client *"accepts a fixed-price quote → Engagement created → Matter created."* So in Phase 3's flows, **the Matter — and therefore payment — comes after the assessment.** Consistent with Phase 2 so far.
- **But** Phase 3 M1.3 lists the Assessment's dependency as *"Marketplace (reviewer assignment),"* and the Reviewer role (§4.1) is *"a Verified Agent acting in the review role on an Assessment."* And BR-01 requires a Verified Agent to review before release.

**The unresolved question this exposes:** if the assessment happens *before* the client has engaged or paid for anything (which Phase 2 requires for the conversion metric to exist), then **a Verified Agent is doing paid professional review work on an assessment for a client who has not yet paid.** Who compensates that agent? How is that reviewer assigned when no Matter and no Engagement yet exist? The data model makes access flow *through* Engagements (P6, D4) — but the reviewer needs access to the Disclosure *before* an Engagement exists.

This is not a wording nit. It is a genuine architectural fork with three possible resolutions, and the documents silently assume different ones in different places:

| Resolution | Implication |
|---|---|
| **A. Assessment is a free/platform-funded product**, reviewed by an agent whom the *platform* compensates (or by the captive practice later), independent of any client engagement | Clean conversion metric; but this is a real COGS line Phase 2's unit economics (§10.3) never accounts for, and it needs a reviewer-assignment mechanism that does not depend on an Engagement |
| **B. Assessment is a paid product** the client buys before the filing engagement | Conversion metric changes meaning (search→assessment purchase, then assessment→filing); pre-filing money flow appears, which touches L1; contradicts the "free where it compounds" framing for the top of the funnel |
| **C. Assessment is AI-only pre-payment (no human review), and human review is folded into the filing engagement** | **Directly violates BR-01.** Not viable without abandoning the core trust promise. |

**Why this must be resolved before Phase 5:** Phase 5's very first recommended flow (Phase 4 §26.2) is *disclosure → assessment → verdict*. That flow cannot be drawn without knowing whether a payment step, a reviewer-assignment step, and an Engagement creation sit inside it or after it. Draw it wrong and every subsequent flow inherits the error.

**My recommendation:** Resolution **A**. The assessment is the conversion engine; putting a paywall in front of it would blunt the single sharpest wedge in the strategy. But A has two consequences that must be written down now, not discovered later:

1. **Reviewer assignment needs a path that does not run through an Engagement.** The data model (P3 §14) currently only grants agent access via Engagement/Matter. Assessment review needs a distinct, narrower grant type: *review-scoped access to one Disclosure version, for the purpose of one ReviewDecision, without a Matter.* This is a genuine addition to §4.2 and §14, and it is small but real.
2. **Reviewer compensation for pre-engagement assessments is a COGS line** absent from Phase 2 §10.3. It also interacts with L1 (is the reviewer paid a platform fee? a professional fee? does that distinction matter legally when there is no client engagement?). It should join the L1 register.

This is the single highest-value output of this entire review. It is cheap to fix now and expensive to fix after Phase 5.

### 1.3 A terminology collision — minor but should be fixed now: "Marketplace"

The word "Marketplace" is used for two distinct concepts:

- **The agent-matching marketplace** (M1.5, MVP) — matching inventors to Verified Agents
- **The licensing/monetization marketplace** (Phase 2 §17.2, §18; Phase 3 §23) — matching patents to licensees, explicitly Year 4+ and out of scope

Phase 3 §205 even lists "licensing marketplace" in the *excluded* set while M1.5 "Marketplace & Engagement" is a *core MVP module*. A reader who greps for "marketplace" gets both. This is exactly the kind of collision Phase 4's vocabulary discipline exists to prevent, and it slipped because the vocabulary governs *client-facing labels* but not *internal architecture terms*.

**Fix (trivial):** rename the MVP concept to **"Agent Matching"** or **"Engagement"** as the internal term, and reserve "Marketplace" for the future licensing surface. Phase 4 §10 already uses "Engage" as the standardized verb, so "Engagement" is the natural internal name and it's already half-adopted. One find-and-replace across P3/P4, and add both to the vocabulary as distinct entries.

### 1.4 Hidden assumptions worth surfacing

Not contradictions, but assumptions embedded deep enough that they should be explicit before they harden:

1. **The reviewer and the drafter may be different agents — and the docs never say whether that's allowed or intended.** In Resolution A above, the assessment reviewer is assigned by the platform. In J3, the *drafting* agent is chosen by the client from the marketplace. So a given invention may be reviewed by Agent X (platform-assigned) and drafted by Agent Y (client-chosen). Is that the intent? It has real consequences: continuity, conflict-checking (must X be conflict-checked too?), and the client's trust experience ("who is my agent?"). I believe separate is correct and even desirable — but it must be stated, because Phase 5 has to show it in the flow.
2. **Phase 2 §10.3 unit economics assume the agent takes a 55% share of a filing** — but if the assessment is separately reviewed by a *different* platform-compensated agent (Resolution A), there are now two agent-cost lines per converted invention, not one. The margin math needs a second look. This is a founder-facing financial note, not a Phase 5 blocker, but flagging it because §1.2 exposes it.
3. **"Agent" conflates two roles the market treats differently: the reviewer and the doer.** Worth a vocabulary note so Phase 5 can label them distinctly where they appear together.

---

## 2. Architectural completeness

Is anything essential missing that will force redesign later? I found **one gap that is architectural (G1)** and several that are **correctly deferred** (not gaps — decisions Phase 5/6 or implementation should make, and the current docs are right not to pre-empt them).

### 2.1 G1 — The review-gate operating model is under-specified *(architectural — decide now)*

This is the completeness-side statement of the C1/C2 finding, and it's the one genuine architectural hole.

Phase 3 specifies *that* review happens (BR-01), *who* can do it (Reviewer role), and *what it produces* (ReviewDecision). It does **not** specify:

- **Assignment:** how is a reviewer selected for an assessment? By technical domain (like matching)? By availability? Round-robin? Self-selection from a queue? Phase 4 built `/agent/reviews` as a **queue**, which implies self-selection or push-assignment — but Phase 3 M1.3 says "Marketplace (reviewer assignment)," which implies matching. **These are different mechanisms and the docs assume both.**
- **SLA:** the assessment is async and the client is told "hours, not seconds" (J2 step 7). But if review is queue-based and depends on agent availability, the *review* step has unbounded latency. What is the committed turnaround, and what happens when the queue backs up? This directly determines whether the "hours" promise is keepable.
- **Capacity coupling:** Phase 2's central risk (§19.1) is that agent capacity is the ceiling. If every assessment consumes scarce reviewer capacity *before* any revenue, then **free assessments compete with paid filings for the same bottleneck resource.** That is a serious operational coupling the documents never examine. At scale it could mean the free wedge starves the paid engine — the exact opposite of the flywheel's intent.

**Why architectural, not implementation-detail:** the answer changes the data model (assignment mechanism), the agent navigation (queue vs matched), the capacity model, and possibly the MVP's viability. This is a "decide now" item.

**Recommended resolution to write down:**
- Assessment review is **queue-based with domain-routing** (agents see a queue filtered to their declared technical domains), not full matching. Lighter than the filing match, appropriate for a shorter task.
- A **committed review SLA** (propose: 2 business days) becomes the client-facing promise instead of "hours" — which was probably always too optimistic given human review.
- Reviewer capacity is **monitored as a distinct pool** on the Docket Health / Marketplace Health consoles, with an explicit policy for what happens when it saturates (e.g. temporarily widen the reviewer pool, or queue with an honest wait estimate to the client — never skip review).

### 2.2 Things that look like gaps but are correctly deferred

I want to be explicit about these so we don't manufacture work. None of these blocks Phase 5:

| Apparent gap | Why it's fine to defer |
|---|---|
| No visual/brand design | That's Phase 5 (styling notes) and the design-system phase. Correctly absent. |
| No detailed wireframes | That's Phase 6. §14 template inventory is the right level for now. |
| No API endpoint specification | Internal-first API is a *principle* (P3 §21.1); endpoints are an implementation artifact. Premature to specify. |
| No database schema DDL | §14 entity model is the correct altitude. Schema is implementation. |
| No specific technology/vendor choices | P3 §2.1 deliberately names *classes* ("PostgreSQL-class"), not products. Correct — those are build-time decisions. |
| No detailed error-copy | Phase 5/6. §19 sets the state inventory, which is enough. |
| Onboarding flows not fully drawn | That's Phase 5. §19.1 first-run inventory is the right input. |
| Conflict-check algorithm unspecified | Legal-dependent (L3-adjacent) and implementation-level. §4.2 rule 2 sets the requirement. Fine. |

### 2.3 Two smaller completeness notes — resolve during Phase 5, not before

Neither blocks the gate; both should be answered as Phase 5 draws the relevant flow:

1. **Multi-inventor / co-owner disclosure editing.** The entity model supports multiple Named Inventors (P3 §14, Party_Invention_Role), and Phase 4 §17.2 shows Named Inventor *viewing*. But no flow covers **two inventors collaboratively editing one Disclosure**, or the consent mechanics when inventors disagree, or how the university case (institution owns, researcher is inventor) handles the researcher editing after the institution takes ownership. This surfaces naturally when Phase 5 draws the disclosure and institution flows. Flagging so it isn't forgotten.
2. **Assessment re-run and its interaction with immutability.** BR-20 locks a Disclosure version once referenced by a released Assessment. FR-A11 (V2) allows re-assessing an evolved Disclosure. The mechanic — new version, new assessment, diff against prior — is implied but never drawn. Fine for MVP (re-assessment is V2), but the Phase 5 assessment flow should at least not preclude it.

---

## 3. Open decisions — classified

Every open item across the four phases, classified per your scheme. I've folded in the Phase 3 §26 dependency register and added what this review surfaced.

### 3.1 Blocks Phase 5 (must resolve before starting flows)

| ID | Decision | Source | Resolution path |
|---|---|---|---|
| **C1** | Assessment/payment/review sequencing — is assessment pre-payment (Resolution A/B/C)? | This review §1.2 | **Founder decision**, but I recommend A. One session. |
| **G1** | Review-gate operating model — assignment mechanism, SLA, capacity policy | This review §2.1 | **Founder + architect decision.** Recommend queue-based domain-routed, 2-day SLA. Same session as C1. |

**Only these two block Phase 5.** Both are resolvable in a single working session and I've given recommended answers for both. Neither requires waiting on anyone external.

### 3.2 Requires founder decision (but does NOT block Phase 5 — proceed under the stated assumption)

| ID | Decision | Working assumption to proceed under |
|---|---|---|
| Reviewer/drafter separation | §1.4(1) | Assume separate (platform-assigned reviewer, client-chosen drafter). State it in the flow. |
| "Marketplace" rename | §1.3 | Rename MVP concept to "Agent Matching"/"Engagement"; reserve "Marketplace" for licensing. |
| Drafting Workspace timing | Already decided | Confirmed V2. Closed. |
| Institution modules timing | P3 §26.3 P3 | Assume V2 as documented; Phase 5 designs client + agent flows first regardless. |
| Minimum-n for public agent stats | P3 §26.3 P5 | Assume n≥20; does not affect flow structure, only later display. |
| Brand/product naming | P3 §26.3 P4 | Use "[Platform]" placeholder through Phase 5; naming affects labels, not flows. |

### 3.3 Requires legal review (correctly flagged; does NOT block Phase 5 under the L1 working assumption)

All of these are already in the Phase 3 §26.1 register and the Phase 4 §21.2 L1 register. The L1 working assumption you provided (configurable price component, three internal fee types, nothing hardcoded) is exactly what lets Phase 5 proceed without waiting on them.

| ID | Item | Status |
|---|---|---|
| L1 | Fee-sharing / settlement structure | Working assumption in force; 20 surfaces registered; **now also touches assessment-reviewer compensation (§1.2)** — add that to the register |
| L2 | UPL boundaries (what output is "advice") | Assume current T1/T2 split; may shift specific outputs later |
| L3 | Advertising rules re: agent outcome stats | Assume stats publishable with n≥20; Phase 5 designs the surface, legal gates the go-live |
| L4 | Privilege disclaimer wording | Assume disclaimer present (content TBD); placement already in IA |
| L5 | Confidentiality of third-party model processing of Zone 1 | Assume enterprise/no-training tiers suffice (TA-9); architecture already isolates Zone 1 |
| L6 | Agent post-engagement retention window | Assume a defined window exists; §17.1 already has the placeholder |
| L7 | Data residency requirements | Architecture already residency-ready; activation timing only |

**Important:** none of L1–L7 blocks Phase 5, because Phase 5 designs *structure and sequence*, and the L1 assumption makes the money-affected parts configurable. The one addition this review makes: **the assessment-reviewer compensation question (§1.2) joins L1.**

### 3.4 Requires data/technical validation (does NOT block Phase 5; blocks build)

Already in P3 §26.2. These are build-time validations, not flow-design blockers:

D1 (IP India access), D2 (EPO/USPTO/WIPO API terms), D3 (open-source assessment quality), D4 (model provider no-training terms), D5 (Indian fee schedules for rule seeding), D6 (agent credential verification method).

**One I'd elevate in priority:** **D3 (whether MVP assessment quality is achievable on open sources alone)** is quietly the biggest technical risk in the whole plan. If the answer is no, the assessment — the entire differentiation — is weaker than promised, and the honest-coverage-disclosure principle (which I strongly endorse) becomes a disclosure of *serious* gaps rather than minor ones. This doesn't block Phase 5, but it should be validated *in parallel* with Phase 5, not after, because a bad answer changes the value proposition the flows are selling.

---

## 4. Documentation quality — is it enough for Phase 5?

**Yes, with the two corrections.** I am deliberately not recommending new documents for their own sake. Assessed against "would this materially reduce risk or improve quality," here is the verdict:

| Candidate document | Recommend? | Why / why not |
|---|---|---|
| **A short "Assessment & Review Operating Model" note** (resolving C1 + G1) | **Yes — this is the one document worth writing** | It resolves the only real contradiction and the only real gap in one place. ~2 pages. Not a phase; a decision record. Everything else in Phase 5 depends on it. |
| Vocabulary addendum (Marketplace/Agent-Matching split + reviewer/drafter terms) | **Minor — fold into the note above or into Phase 4 §10** | One paragraph, not a document. |
| Formal PRD-per-module | **No** | P3 §5 already specifies every module at purpose/users/inputs/outputs/dependencies. More detail now is speculative. |
| Separate API spec | **No** | Premature. Internal-first principle is enough until implementation. |
| Separate data dictionary / schema | **No** | §14 is the right altitude for pre-implementation. |
| Separate security/threat-model doc | **No** | P3 §15 covers threat model, controls, and trust surface adequately for this stage. Revisit at SOC 2 time. |
| Design system doc | **Not yet** | That's the phase after Phase 5. Correctly sequenced already. |
| Test strategy / QA plan | **No, not now** | Belongs with implementation. The correctness NFRs (§10.1) and golden-test requirement (§18.5) are enough direction for now. |
| Risk register as a living doc | **Optional, low value now** | P2 §19 and P3 §25 already enumerate risks well. A separate register adds process overhead without new insight at this stage. |

**Conclusion:** write **one** short decision note (Assessment & Review Operating Model). Add **one** vocabulary paragraph. Create nothing else. The existing four documents are sufficient to drive Phase 5 once C1/G1 are resolved.

The documentation is, if anything, *more* than sufficient in depth — the risk in this project is not under-documentation, it's that the volume of well-reasoned prose could mask the two specific holes this review exists to catch. It doesn't need more pages; it needs those two decisions.

---

## 5. Implementation readiness — what would experienced engineers still be missing?

If a strong team started tomorrow, the architecture (P3) gives them an unusually clear starting point — the module boundaries, entity model, zone separation, deadline-engine design, and provenance constraint are all specified at the right altitude. But they would hit these unknowns, in rough order of how soon they'd hit them:

### 5.1 They'd be blocked immediately on

1. **The assessment/review sequence and economics (C1/G1).** The first real feature anyone builds is disclosure → assessment. They cannot build it without knowing whether payment, reviewer-assignment, and Engagement-creation are inside or outside that flow. *This is the gate correction.*
2. **Whether open-source data is good enough (D3).** The team building the assessment engine needs to know on day one whether they're building against IP India + EPO OPS + USPTO alone, or whether licensed data is coming. This determines the entire retrieval architecture's quality ceiling.

### 5.2 They'd be slowed within the first weeks by

3. **The rule DSL's exact expressiveness (TA-8).** P3 §18.2 gives the rule *shape*, but the first non-trivial Indian rule (e.g. the interaction of examination-request timing with publication and the various extension provisions) will test whether the declarative model holds or needs the "escape hatch." That escape mechanism is mentioned (TA-8) but not designed. The team needs to design it early, because the first hard rule will demand it.
4. **Span-addressing implementation specifics (P3 §17.3).** "Content-hash-based chunk identity" is the right instruction, but the exact chunking strategy that keeps citations stable across re-ingestion of messy IP India OCR is genuinely hard and under-specified. This is foundational (P2 depends on it) and easy to get subtly wrong.
5. **IP India integration reality (D1).** "No documented public API; polling + mirroring" (P3 §20.2) is honest but thin. The team needs to know what's actually scrapeable, at what rate, with what reliability, and whether the terms of use permit it. This is both a technical and a legal-adjacent unknown.

### 5.3 They'd want, but could reasonably derive

6. **Notification channel specifics** (which WhatsApp/SMS provider, deliverability in India) — derivable, vendor choice.
7. **Concrete SLA numbers** beyond the review SLA — the NFRs give targets; ops can tune.
8. **The exact conflict-check data model** — requirement is clear (§4.2), schema is derivable once L3 is understood.

**The honest summary:** items 1 and 2 are the gate. Items 3–5 are real and should be tackled in the first sprint, but they're implementation depth, not architectural gaps — the architecture correctly points at them (TA-8, §17.3, §20.2) and says "here be dragons" in the right places. That's the appropriate level for pre-implementation documentation. I would *not* try to fully specify 3–5 now; they're better solved against real data with real engineers than in prose.

---

## 6. Final recommendation

### Make specific corrections before Phase 5.

**Two corrections, one session, recommended answers provided:**

**C1 — Resolve assessment/payment/review sequencing.**
Adopt Resolution A: the assessment is a platform-funded, human-reviewed product that sits *before* the paid filing engagement. Consequences to write down: (a) add a review-scoped access grant type to the model that does not depend on an Engagement; (b) add reviewer compensation for pre-engagement assessments as a COGS line and to the L1 register.

**G1 — Specify the review-gate operating model.**
Queue-based, domain-routed reviewer assignment; a committed review SLA (recommend 2 business days) replacing the "hours" language; reviewer capacity monitored as a distinct pool with an explicit saturation policy that never skips review.

**Plus two trivial hygiene fixes** (do them in the same pass, not as a blocker):
- Rename the MVP "Marketplace" to "Agent Matching"/"Engagement"; reserve "Marketplace" for the future licensing surface. Add both to the Phase 4 vocabulary.
- State explicitly that the assessment reviewer and the filing drafter may be different agents.

**Deliverable:** one ~2-page **Assessment & Review Operating Model** decision note capturing C1, G1, and the two hygiene fixes. Not a phase. Not a redesign. A decision record that unblocks the flows.

**Run in parallel, not as a blocker:** begin validating **D3** (open-source assessment quality) now, because a bad answer changes what Phase 5's flows are selling.

### What I explicitly did *not* flag, and why that matters

I did not invent missing documents, did not demand schema/API/test specs the stage doesn't need, and did not treat deferred decisions as gaps. The four phases are genuinely coherent on the decisions that are expensive to get wrong — the Invention-as-root spine, the review gate, provenance, zone separation, and rules-as-data all hold consistently across every phase. This review found exactly two things worth stopping for, both concentrated at the same seam (what happens around the assessment), both cheap to fix now and expensive to fix after Phase 5 has drawn flows on top of the ambiguity.

Resolve C1 and G1, and Phase 5 can proceed with confidence.

---

*End of Stage Gate Review.*
