# Phase 5 — User Flows
## ALDASSIST

**Baseline (frozen):** Phase 1 · Phase 2 · Phase 3 (PRD) · Phase 4 (IA) · Assessment Lifecycle ADR.
**Rule of engagement:** flows are derived from the baseline, never redesigning it. Where a required flow appears to conflict with a preserved principle, the conflict is reported in §9, not silently resolved.
**Preserved principles:** Invention-as-root · mandatory human review (BR-01) · provenance (BR-02) · rules-as-data (D1) · three-zone separation (D2) · Assessment Lifecycle ADR · configurable legal behaviour (L1) · plain-language vocabulary (Phase 4 §10) · cross-tenant isolation (IA-5).
**Date:** 24 July 2026

---

## 1. Scope

### 1.1 Included (MVP capabilities, per Phase 2 §13 and the ADR)

First visit · account creation · workspace creation · disclosure capture · assessment request · the assessment lifecycle through release · viewing a verdict · decision not to file · decision to file · agent matching · engagement and matter creation · the filing journey to submission · client–agent communication · notifications · status tracking · the silence state · returning-user entry · the free public register path · the agent supply-side path (onboarding, docket import, review queue). Plus the exceptional and cross-cutting flows in §8 and §7.

### 1.2 Excluded

**Out of MVP scope entirely** (deferred to §10 as V2+): drafting workspace, prosecution workspace, renewals, portfolio monitoring, institutional flows, licensing marketplace, multi-currency, native mobile.

**Out of *this document's* scope** (governed elsewhere, referenced not redrawn): the assessment's internal AI pipeline (Phase 3 M1.3); deadline computation mechanics (Phase 3 §18); pricing amounts and settlement mechanics (L1); visual and interaction design (Phase 6); anything implementation-level.

**A note on the filing journey boundary.** The MVP filing journey runs to *submission of the application by the agent*. Examination, office-action response and grant (Phase 3 J4) depend on the drafting and prosecution workspaces, which are V2. MVP therefore *files and then tracks status*, but does not yet provide the in-product tooling to *respond* to examination. This boundary is stated so Phase 6 does not assume prosecution screens exist. See §9-A for the consistency note this raises.

---

## 2. Design principles

Concise, because the substance is in the flows.

1. **One obvious next action per state.** Every screen a flow passes through answers "what now?" with a single primary action (Phase 4 IA-2).
2. **The verdict is earned, not sold.** No flow pressures a user toward filing. The "don't file" path is designed with the same care as the "file" path (Phase 2 §3.3).
3. **Never a dead end.** Every terminal state offers a forward action or a dignified persistence (Phase 4 §19).
4. **Whose turn is it, always answered.** Every waiting state names who is acting and roughly when (Phase 2 §7.2).
5. **Friction only where it protects the user.** Gates exist at confidentiality boundaries, irreversible decisions, and the review gate — nowhere else (Phase 4 IA-8).
6. **The flow shows state; it never invents it.** Every state a flow references exists in the Phase 4 taxonomy (§11). No flow creates a new status.

---

## 3. User personas — flow-relevant behaviour only

Drawn from Phase 2 §9. Only behaviour that changes a flow is listed.

| Persona | Flow-relevant behaviour |
|---|---|
| **Inventor (ICP-5, Tier 0)** | Enters via the free register or a guide. Low patent literacy; needs plain language and the cost truth before committing. May never pay. Language may not be English. |
| **Startup Founder (ICP-1, Tier 1a)** | The primary paying actor. Arrives with an idea and investor pressure. Comfortable self-serve. Wants an honest patentability answer and a total cost before engaging. Decision-maker and payer. |
| **Corporate/IP User (ICP-4, Tier 2b)** | Arrives with an existing portfolio. In MVP, behaves as a Workspace Owner managing multiple Inventions and Applications; the portfolio-specific tooling is V2. Values status visibility and cost control. |
| **Named Inventor** | Attached to an Invention they do not own (e.g. a co-inventor, or a university researcher). Sees only their own Invention, never the workspace or portfolio (IA-5, Phase 4 §17.2). |
| **Patent Professional — filing agent (ICP-2)** | Chosen by a client through Agent Matching for a filing engagement. Also uses the platform for their own practice docket. Selects which opportunities to accept. Holds matter-scoped access. |
| **Patent Professional — reviewer** | A Verified Agent acting in the review role. Takes domain-matched items from the review queue; reviews, edits, releases. Holds a *review grant*, not an engagement (ADR §6). May or may not be the same person as the filing agent (ADR §5). |
| **Administrator — Workspace Owner** | Manages workspace, members, billing, deletion. Only role that can pay and engage. |
| **Administrator — internal (Docket Ops)** | Not a customer. Enters flows only at escalation and capacity-saturation points (Phase 3 M4.1; ADR §9). |

**Context-switching:** an actor holding roles on multiple surfaces (e.g. an agent who is also an inventor) operates one context at a time via the Phase 4 §2.3 context switcher. No flow blends contexts.

---

## 4. Primary user flows

Each flow: **Trigger · Preconditions · Main path · Alternate paths · Failure paths · Exit state.** State names are from Phase 4 §11.

---

### F1 — First visit (anonymous)

- **Trigger:** arrival via organic search (often a patent number or technical query), a guide, or referral.
- **Preconditions:** none. No account.
- **Main path:**
  1. Lands on a public surface — most often a patent document page (Phase 4 §4.2), the search page, or a guide.
  2. Uses the register search freely — full results, full documents, status timelines — **no account required** (IA-8, FR-S01).
  3. May run the Cost Planner, ungated, and see a real twenty-year figure (FR-C01).
  4. May explore `/solutions` (by stage) or `/for` (by who they are), or the path finder.
  5. Encounters the account gate only at the point of *ongoing value*: saving a search, setting a status alert, or starting a Disclosure.
- **Alternate paths:**
  - *Can't self-place* → path finder returns a recommendation and a cost range without an email (Phase 4 §2.1).
  - *Searching their own unpublished invention* → contextual confidentiality warning surfaces and routes them toward the Vault (FR-S11). **This matters: the public search is Zone 2; their invention is Zone 1.** The warning prevents a user from typing a confidential invention into a non-confidential box.
- **Failure paths:**
  - *Upstream register source unavailable* → cached data with an explicit staleness stamp, never an error page (NFR-A05).
  - *No search results* → what was searched, why nothing matched, one adjustment, one alternate path (Phase 4 §19.2).
- **Exit state:** either (a) left as an anonymous visitor having gotten value, or (b) proceeded to F2 at the account gate.

---

### F2 — Account creation

- **Trigger:** the user attempts an action requiring an account (save search, set alert, start a Disclosure).
- **Preconditions:** none beyond intent.
- **Main path:**
  1. Minimal registration — email + verification. **No phone required, no sales contact** (Phase 3 J1).
  2. Email verified.
  3. The user is returned *to the action they were attempting*, not dumped on a generic home screen. Context is preserved across the gate.
- **Alternate paths:**
  - *Registering specifically to set an alert* (F13) → on verification, the alert is configured and the user lands on the watched item.
  - *Registering to start a Disclosure* → proceeds directly into F3 → F4.
- **Failure paths:**
  - *Verification not completed* → the intended action is held; the account is inert until verified; a re-send path is offered.
  - *Email already registered* → routed to sign-in, with the attempted action preserved.
- **Exit state:** a verified account exists. The user is at their intended next step. **No Workspace exists yet** — that is created at F3 only when needed.

**Assumption A1:** account and Workspace are distinct. A verified account can set alerts and use tools without a Workspace; a Workspace is created only when the user first needs to hold an Invention (F3). *Rationale: an inventor who only wants alerts should not be forced through workspace setup. Consistent with Phase 4 §5 where Inventions live under a Workspace but tools/alerts do not.*

---

### F3 — Workspace creation

- **Trigger:** the user starts their first Disclosure, or is invited to an existing Workspace.
- **Preconditions:** verified account.
- **Main path (new workspace):**
  1. On starting a first Disclosure, a Workspace is created. The user becomes its **Workspace Owner**.
  2. Minimal setup — a workspace name; everything else deferred to Settings.
  3. Proceeds into F4.
- **Alternate paths:**
  - *Invited to an existing Workspace* → accepts the invitation; joins with the role the inviter assigned (Admin / Member / Viewer, per Phase 4 §4.1); does **not** become Owner.
  - *Attached as a Named Inventor without membership* → no Workspace is created for them; they gain visibility of exactly the Invention(s) they are named on (IA-5).
- **Failure paths:**
  - *Invitation expired/invalid* → clear message; path to request a fresh invitation.
- **Exit state:** the user has an appropriate context (Owner of a new Workspace, or a member/viewer/named-inventor of an existing one). Ready to hold or view Inventions.

---

### F4 — Disclosure creation

- **Trigger:** user chooses to record an invention.
- **Preconditions:** verified account; a Workspace context (own or joined) with create permission (Owner/Admin/Member — not Viewer).
- **Main path:**
  1. A new **Invention** is created (the root entity, P5). Its initial state is **Drafting** (Phase 4 §11.2).
  2. Guided, structured capture (Phase 3 M1.2): problem → prior approaches → the invention → how it works → variants → advantages.
  3. **Mandatory prior-disclosure interrogation** — has this been published, presented, sold, demonstrated, or discussed under NDA? Dates and evidence (FR-D03). This section cannot be skipped.
  4. Optional attachments (drawings, files). Optional additional Named Inventors.
  5. **Every save creates an immutable, timestamped version** (FR-D02) — this is Zone 1 from the first keystroke (D2).
  6. Save-and-resume throughout; the user may leave and return.
  7. On completion, a completeness check runs (Tier-1 AI only — it may structure and prompt, never assess patentability, ADR/Phase 3 §12.1). Gaps are surfaced with specific guidance.
  8. The user marks the Disclosure complete. Invention state → **Recorded**.
- **Alternate paths:**
  - *Multiple inventors collaborating* → see §9-B (consistency note: co-editing consent is under-specified in the baseline; a working assumption is stated there).
  - *Institution-owned invention (researcher is Named Inventor, institution is owner)* → V2 flow (§10). In MVP, if a researcher records within a Workspace, ownership is a Party_Invention_Role attribute, but the institutional approval wrapper does not exist yet.
- **Failure paths:**
  - *User abandons mid-capture* → the Invention persists in **Drafting** with all saved versions intact; it appears in their Inventions index; a gentle resume prompt may follow via notification. Nothing is lost.
  - *Attachment fails to upload* → the text disclosure is unaffected and saved; the attachment can be retried; the user is told the disclosure itself is safe.
- **Exit state:** an Invention in **Recorded** state, with a complete, immutable, timestamped Disclosure version, ready to assess. Next action surfaced: **Request assessment.**

---

### F5 — Assessment request

- **Trigger:** user requests an assessment on a Recorded Disclosure.
- **Preconditions:** an Invention in **Recorded** state with a complete Disclosure version (ADR §4). Requester has permission (Owner/Admin/Member).
- **Main path:**
  1. User selects target jurisdiction(s) — MVP: India and/or PCT (Phase 3 §12.4) — and assessment type (Phase 3 M1.3).
  2. **The assessment is free and requires no payment and no Engagement** (ADR §7). The user is not asked for money and no agent relationship is created.
  3. The user is shown an honest expectation: an automated analysis stage, followed by a **human review stage with a committed turnaround** (ADR §9). The retired "hours/seconds" language is not used.
  4. The Assessment is created in state **Requested**, then transitions to **Analysing**. Invention state → **Assessing**.
- **Alternate paths:**
  - *Disclosure not yet complete* → the request is blocked with a clear reason; the user is routed back to finish F4. (An Assessment cannot run on an incomplete Disclosure, ADR §4.)
- **Failure paths:**
  - *Analysis cannot start (system)* → the Assessment holds in **Requested**; the user is told it's queued, not lost; retry/escalation available.
- **Exit state:** an Assessment in **Analysing**; the Invention in **Assessing**. The user is told they'll be notified — no need to wait on screen (async, Phase 3 D5).

---

### F6 — Assessment lifecycle (through release)

*This is the spine flow. It is drawn exactly per the ADR §4 state machine.*

- **Trigger:** an Assessment enters **Analysing** (from F5).
- **Preconditions:** as F5.
- **Main path:**
  1. **Analysing** — the AI pipeline runs (Phase 3 M1.3): multi-strategy retrieval → element comparison → statutory-exclusion analysis → **assertion assembly, every assertion bound to a resolvable citation** (BR-02). Progress and intermediate findings are visible if the user chooses to watch (FR-A10).
  2. On analysis completion, the Assessment transitions to **In review**. This transition requires that a reviewer can be assigned (F7) and granted access (F8).
  3. **Reviewer assignment (F7)** places the item in the domain-matched review queue.
  4. **Review grant (F8)** gives the assigned reviewer scoped access to exactly this one Disclosure version and the analysis.
  5. The **reviewer reviews, edits as needed, and records a `ReviewDecision`** (BR-01). Edits are captured as structured diffs (FR-A08).
  6. On release, the Assessment transitions to **Released**, the reviewer is named on the output (FR-A07), and the assessed Disclosure version becomes **immutable** (BR-20).
  7. The client is notified that the verdict is ready (F12 notification).
- **Alternate paths:**
  - *Reviewer edits materially change the AI's conclusion* → the released verdict reflects the reviewer's judgement, not the AI's draft; the diff is retained internally for quality metrics (Phase 3 M4.2). The client sees the reviewed verdict, with the reviewer named.
  - *Reviewer finds the analysis insufficient to conclude* → verdict = **Inconclusive** (Phase 4 §11.6); the released output states what is missing and how to supply it. This is a valid, designed outcome, not a failure.
- **Failure paths:**
  - *No reviewer available within the committed turnaround (capacity saturation)* → ADR §9 policy applies **in order**: widen the eligible reviewer pool for the domain; then, if still saturated, the client is shown an **honest updated wait estimate**; **review is never skipped** (BR-01). The Assessment remains in **In review**. This is an exceptional flow, detailed in §8-E.
  - *Reviewer starts then becomes unavailable* → reassignment (§8-D); the review grant to the first reviewer expires; a new reviewer is assigned; the client sees continued "in review," not an error.
- **Exit state:** Assessment **Released** with a named reviewer, a verdict, provenance-linked reasoning, and an immutable assessed Disclosure version. Invention state → **Assessed**. The client is directed to F9 (view verdict).

**This flow preserves:** BR-01 (mandatory review, no skip path), BR-02 (provenance), BR-20 (immutability on release), D2 (Zone 1 throughout), ADR §5/§6/§7/§9. No payment, no Engagement, no Matter exists at any point in F6.

---

### F7 — Reviewer assignment (agent-side view of the same event)

- **Trigger:** an Assessment reaches **In review** and enters the review queue (from F6 step 2).
- **Preconditions:** at least one Verified Agent whose declared technical domains match and who holds no declared conflict on this item (ADR §5).
- **Main path:**
  1. The item appears in the **domain-filtered review queue** at `/agent/reviews` (Phase 4 §6) for eligible reviewers.
  2. A reviewer takes the item (or the system routes it to an available domain-matched reviewer — either satisfies ADR §5).
  3. The reviewer receives a **review grant** (F8) and proceeds to review.
- **Alternate paths:**
  - *Reviewer holds a conflict* → the item never appears in that reviewer's queue (ADR §5; conflict basis per Phase 3 §4.2).
- **Failure paths:**
  - *No eligible reviewer* → §8-E saturation policy.
- **Exit state:** one reviewer assigned, holding a review grant, reviewing. Reviewer capacity pool decremented and monitored (ADR §9).

---

### F8 — Review access (the review grant in action)

- **Trigger:** a reviewer is assigned to an Assessment (F7).
- **Preconditions:** assignment made; reviewer is a Verified Agent.
- **Main path:**
  1. A **review grant** is issued: scoped to exactly **one Disclosure version and its attachments, plus the analysis under review**, for the purpose of producing **one `ReviewDecision`** (ADR §6).
  2. The reviewer accesses the material within Zone 1 — a scoped, audited read (D2; every access audited per Phase 3 §15).
  3. The grant **creates no Engagement, no Matter, no client–agent relationship** (ADR §6).
  4. On release or reassignment, the grant expires.
- **Alternate paths:** none material.
- **Failure paths:**
  - *Reviewer attempts to access anything beyond the grant* → denied and audited. The reviewer cannot see the client's other Inventions, portfolio, matters, or any aggregate view (IA-5, ADR §6). To a reviewer, nothing else in that Workspace exists.
- **Exit state:** the reviewer has exactly the access needed, for exactly as long as needed, and no more.

**This preserves cross-tenant isolation and the confidentiality guarantee: the reviewer's reach is strictly *narrower* than an engaged agent's, so no isolation guarantee weakens.**

---

### F9 — Viewing the verdict

- **Trigger:** the client opens a **Released** Assessment.
- **Preconditions:** Assessment in **Released** state; viewer has permission on the Invention.
- **Main path (three-depth disclosure, Phase 4 §16):**
  1. **Depth 1 — Verdict:** one of *Looks protectable* / *Protectable with changes* / *Unlikely to be protectable* / *Not enough to assess* (Phase 4 §11.6), with confidence and its basis, plain-language meaning, and recommended next steps.
  2. **Depth 2 — Reasoning:** element-by-element comparison; each blocking/relevant reference and why it matters; statutory-exclusion analysis (for India, s.3(k)/s.3(d) called out).
  3. **Depth 3 — Evidence:** **every assertion clickable to its exact source passage** (BR-02); full reference list; the coverage statement (what was and wasn't searched); the 18-month blind-spot notice (Phase 3 §12.5).
  4. Persistently visible: the **reviewer's name and notes** (BR-01), the assessment date, and the assessed Disclosure version.
- **Alternate paths:** the verdict routes to F10 (not file) or F11 (file) — see those flows. **Inconclusive** routes back toward supplying what's missing (a fresh Disclosure version → re-assessment, which in MVP means a new assessment on an updated Disclosure; note re-assessment tooling depth is V2 per Phase 3 FR-A11).
- **Failure paths:**
  - *Citation fails to resolve* → this is a provenance integrity event; the affected assertion cannot be shown as verified (BR-02). Per the principle, if it can't be linked, it isn't displayed as fact. (Reported as a standing risk in Phase 3 §25; the flow must fail safe, not show an unverifiable claim.)
- **Exit state:** the client has understood the verdict and its basis, and is at a decision: file or not.

---

### F10 — Decision not to file

*Designed with the same care as F11 (Phase 2 §3.3). This is a first-class outcome.*

- **Trigger:** from a verdict (typically *Unlikely to be protectable*, but a client may decline after any verdict), the client decides not to proceed.
- **Preconditions:** a **Released** Assessment.
- **Main path:**
  1. The client records the decision. A **Decision** entity is created with actor and rationale (BR-09).
  2. The Invention transitions to **Not pursued** (Phase 4 §11.2).
  3. **No money changes hands. No Engagement, no Matter** (ADR §7).
  4. The client is shown genuine alternatives with equal visual weight (Phase 4 §11.6, §15.1): design around · keep as a trade secret · publish defensively · defer and re-assess later.
  5. The Invention **persists in the Vault**, monitored, re-assessable if it evolves or if the art changes (P5; Phase 4 §11.2).
- **Alternate paths:**
  - *Client chooses "defer"* → Invention stays effectively parked; may re-enter assessment later via a new Disclosure version.
  - *Client changes their mind later* → the Invention is still there; they can proceed to F11 at any time.
- **Failure paths:** none material — this path creates nothing that can fail.
- **Exit state:** Invention in **Not pursued**, with a recorded decision, alternatives presented, and a dignified, complete Invention page (not a greyed-out husk, Phase 4 §15.1). **This is a successful completion, not an abandonment.**

---

### F11 — Decision to file

- **Trigger:** from a favourable or qualified verdict (or a reconsidered decision), the client chooses to file.
- **Preconditions:** a **Released** Assessment; the actor is the **Workspace Owner** (only role that can engage and pay, Phase 4 §17.2).
- **Main path:**
  1. The client chooses jurisdiction(s) and route. The Cost Planner updates for the specific choice (Phase 3 J3).
  2. Proceeds to **Agent Matching (F14)**.
- **Alternate paths:**
  - *A non-Owner (Member) wants to file* → they cannot engage/pay; the flow routes to request Owner action (permission boundary, Phase 4 §17.2). No silent escalation of their permissions.
  - *Qualified verdict ("Protectable with changes")* → the recommended changes and their cost are shown before matching, so the client engages with eyes open.
- **Failure paths:** none at this step; failures occur downstream in matching/engagement.
- **Exit state:** the client enters Agent Matching with a defined scope (invention, jurisdiction, route). **Still no Engagement or payment yet** — those occur at F15.

---

### F12 — (reserved: see F18 Notifications — kept together for coherence)

*Notifications are cross-cutting; the full flow is F18. Referenced here so the numbering matches the "communication/notifications/status" grouping in the brief.*

---

### F13 — Status alert setup (free path)

- **Trigger:** an anonymous or free user wants to watch a public application's status.
- **Preconditions:** for setup, a verified account (the single conversion gate, F2).
- **Main path:**
  1. From a patent document page, the user chooses to be alerted on status change (FR-S08).
  2. If not signed in → F2, then returned here.
  3. Alert configured; channel/digest preferences set (Phase 3 §16).
- **Alternate paths:** *saved search alert* (FR-S07) follows the same pattern on a query rather than a single application.
- **Failure paths:** *upstream status source stale* → alerts fire on detected change; staleness is disclosed on the underlying page (NFR-A05).
- **Exit state:** an active alert. This is a primary acquisition mechanism (Phase 3 J1) — the user now has a reason to return.

---

### F14 — Agent matching

- **Trigger:** the client chooses to file (F11).
- **Preconditions:** a defined scope (invention, jurisdiction, route); actor is Workspace Owner.
- **Main path:**
  1. **Conflict check runs before any agent is shown** (BR-10). Conflicted agents are silently excluded from the client's view, with an internal record.
  2. Matched agents are presented with **rationale** (e.g. "14 matters in signal processing · 3 with this examiner's art unit · available in 3 days") and **fixed, published prices before engagement** (FR-M01, FR-M03, BR-06).
  3. Agent profiles surface verified credentials, technical background, jurisdiction, languages, and — where available and above the minimum sample size — outcome statistics *with their n and domain context* (BR-17).
  4. Pricing is rendered by the configurable price component in the L1-configured mode (Phase 4 §21) — the client sees a coherent price whether the model is bundled or itemised. **`[L1]`**
  5. The client selects an agent and reviews the scope and quote.
- **Alternate paths:**
  - *No agent available in the technical domain/jurisdiction* → the client is told honestly, offered to be notified when capacity exists, and the Invention/Assessment persist. No fabricated matches.
  - *The reviewer of this Assessment is among the matches* → permitted. The reviewer and filing agent may be the same or different (ADR §5). No special handling required, but also no forced continuity.
- **Failure paths:**
  - *Conflict check cannot complete* → matching does not proceed; the client is told it's a temporary hold, not a rejection. (A conflict gate that can't run must fail closed, BR-10.)
- **Exit state:** the client has selected an agent and is looking at a fixed-price quote, ready to engage (F15). **No Engagement or payment yet.**

---

### F15 — Engagement & matter creation

- **Trigger:** the client accepts a fixed-price quote (from F14).
- **Preconditions:** an accepted quote; actor is Workspace Owner; conflict check passed.
- **Main path:**
  1. The client accepts scope and quote. Payment is handled per the **L1-configured model** — bundled or itemised, with official fees always separately identifiable (Phase 4 §21). **`[L1]`**
  2. On acceptance, an **Engagement** is created (Phase 3 M1.5).
  3. The Engagement creates a **Matter** (Phase 3 §14) and a **matter-scoped access grant** to the selected agent (P6/D4).
  4. The assessment and Disclosure travel with the Invention and become visible to the engaged agent *within the matter scope* (ADR §11).
  5. Invention state → **Filing** (Phase 4 §11.2). Matter state → **Engaged**.
- **Alternate paths:**
  - *Client wants to change scope after seeing the matter* → a scope change requires a **new quote** (BR-06); no silent scope creep.
- **Failure paths:**
  - *Payment fails* **`[L1]`** → the Matter is **not** created; the client is told what failed, that nothing is at risk, and offered retry. Crucially, **no deadline is implied yet** because nothing is filed — the failure copy states this explicitly (Phase 4 §19.3).
  - *Agent becomes unavailable between quote and acceptance* → the client is returned to matching (F14) with the scope preserved.
- **Exit state:** an **Engagement** and **Matter** exist; the agent has matter-scoped access; the Invention is in **Filing**. The client enters F16.

**This preserves:** the ADR boundary (Engagement/Matter/payment appear *here*, after the free assessment, never before); P6 (matter-scoped access, not portfolio-wide); L1 configurability; BR-06 (fixed pricing).

---

### F16 — Filing journey (to submission)

- **Trigger:** a Matter is created (F15).
- **Preconditions:** Engaged matter; agent holds matter-scoped access.
- **Main path:**
  1. The agent opens the matter **brief** (Phase 4 §6): the Disclosure, the released Assessment (with its provenance-linked reasoning), and client context.
  2. The agent prepares the application document. **In MVP the drafting workspace does not exist** (V2); the agent works with their own tools and uploads the prepared document into the matter. *(See §9-A.)*
  3. **Structured clarification loop:** the agent may ask the client questions within the Matter workspace (F17 communication); the client answers; exchanges are recorded.
  4. The client **reviews the application document** — in particular the claims and specification — before filing (Phase 3 J3 step 9). This is a decision point: the client approves or requests changes.
  5. On client approval, the **agent files with the office** (BR-09/T3 — filing is a human, agent-performed action; the platform never files autonomously).
  6. An **Application** entity is created (child of the Invention, P5); the filing **Event** is recorded (immutable, Phase 3 M0.10).
  7. **The Deadline Engine computes the full deadline set** for that jurisdiction and route from versioned rules (D1, Phase 3 §18). Deadlines appear for both client and agent.
  8. Matter state → **In progress**; the Application enters **Filed** (Phase 4 §11.3).
- **Alternate paths:**
  - *Client requests changes to the draft* → the matter returns to the agent; the loop repeats; the client re-reviews. Matter state reflects **Awaiting the office** vs **Awaiting you** correctly at each turn (Phase 4 §11.4).
  - *Multiple jurisdictions chosen* → one Application per jurisdiction is created from the one Invention (P5); each gets its own computed deadline set.
- **Failure paths:**
  - *Filing submission to the office fails* → the Application is **not** marked Filed; the agent and client are notified; the matter holds; retry/escalation. No false "Filed" state, and no deadline computed off a filing that didn't happen (Phase 3 §20.4 — filing is agent-authorised and verified).
  - *Office register doesn't confirm the filing* → the Event is provisional until confirmed via the Integration Hub; discrepancies route to Docket Ops (Phase 3 §20.3). The client sees an honest "awaiting office confirmation," not a false certainty.
- **Exit state:** an **Application** in **Filed**, with a computed, human-confirmable deadline set, under the parent Invention. The Invention is **Protected** (≥1 live Application, Phase 4 §11.2). The client moves into status tracking (F19).

**MVP boundary restated:** the journey ends at *filed and tracked*. Examination response is V2 (§10, §9-A).

---

### F17 — Communication (client ↔ agent, within a matter)

- **Trigger:** either party needs to exchange information within an engaged matter.
- **Preconditions:** an active Matter; participants have matter-scoped access.
- **Main path:**
  1. Communication occurs **within the Matter workspace** (Phase 3 M1.6), scoped to the matter. Not email; a recorded, in-context thread.
  2. Structured clarification requests from the agent surface as **client actions** ("Needs you", Phase 4 §18.1).
  3. The client's **status view updates from the agent's actual work state**, so routine progress needs no manual status message (Phase 3 J7 — this is how the "silence" problem is solved structurally).
- **Alternate paths:**
  - *A message requires a decision* (e.g. approve the draft) → it appears as a decision action, and the decision is recorded (BR-09).
- **Failure paths:**
  - *Notification of a new message fails to deliver* → for non-critical class, best-effort with in-app persistence; the message is never lost, only the push may be delayed (Phase 3 §16).
- **Exit state:** information exchanged, in context, on the record, scoped to the matter. **Communication never crosses matter or tenancy boundaries** (P6, IA-5).

**Assumption A2:** MVP client↔agent communication is confined to active matters. There is **no** general messaging between a client and an agent they have not engaged, and **no** client↔reviewer channel (the reviewer relationship is not an engagement, ADR §6). *Rationale: prevents an unengaged professional relationship forming outside the model, and keeps the reviewer role clean.*

---

### F18 — Notifications (cross-cutting)

- **Trigger:** any domain event, deadline trigger, or proactive-reassurance cadence (Phase 3 §16).
- **Preconditions:** an account; channel preferences (defaults applied if unset).
- **Main path (by class, Phase 3 §16.2):**
  - **Critical** (rights at risk) → in-app + email + SMS/WhatsApp, at-least-once with receipt tracking, escalation ladder. **Cannot be muted** (stated at onboarding).
  - **Action required** → in-app + email, reminder ladder.
  - **Progress** → in-app + digest.
  - **Informational** → digest only.
  - **Proactive reassurance** → periodic status communication *even when nothing has happened* (Phase 3 §16.3), phase-adaptive cadence. This is the anti-silence mechanism.
- **Alternate paths:**
  - *User customises per-matter/per-class preferences* → respected, except Critical cannot be disabled.
- **Failure paths:**
  - *Critical notification fails on all channels* → raised on the Docket Health Console; **Docket Ops paged** (Phase 3 §16.5). The user is never left silently uninformed of a rights-affecting event — see §8-F.
- **Exit state:** the right message reached the user on the right channel, or — for critical events that couldn't be delivered — a human is actively intervening.

---

### F19 — Status tracking & the silence state

- **Trigger:** the client opens an Application, or receives a status-change notification.
- **Preconditions:** a filed Application under their Workspace (or a watched public application, F13).
- **Main path:**
  1. The Application detail shows the **lifecycle state + attention state** pair (Phase 4 §11.1, §15.3), the event timeline with **source and freshness per entry**, and the single most important next action (or "nothing needed").
  2. The Integration Hub polls the office register; on a detected change, an **Event** is recorded, **deadlines recompute** (D1), and the client is notified (F18).
- **Alternate paths:**
  - *Nothing has happened for a long time* → the **silence view** (Phase 4 §19.4): "Nothing has happened — and that's expected," the last known event, an honest expected range for the next event, an explicit "nothing is required from you," and a statement that the platform is monitoring daily. **This is the signature anti-anxiety flow** (Phase 2 §7.2).
- **Failure paths:**
  - *Register source unavailable* → last-known status with an explicit staleness stamp; no error (NFR-A05).
  - *Source reports a change that conflicts with our computation* → the discrepancy routes to Docket Ops (Phase 3 §20.3); the client sees the honest, human-checked position rather than an automatic flip.
- **Exit state:** the client knows exactly where their application stands, whether anything is needed, and when to expect the next thing — including, and especially, when the answer is "nothing, for a while."

---

### F20 — Returning user

- **Trigger:** an existing user signs in.
- **Preconditions:** a verified account.
- **Main path:**
  1. **Client** → lands on **Home = the action queue** (Phase 4 §18.1): *Needs you* → *Waiting on others* → *Recently changed* → *portfolio glance*. The single most important thing is at the top.
  2. **Agent** → lands on **Today** (Phase 4 §6): the risk-ranked queue, including any **review-queue** items and matter actions.
- **Alternate paths:**
  - *Multi-role user* → the context switcher selects surface; one context at a time (Phase 4 §2.3).
  - *User with an abandoned Drafting Disclosure* → it appears in *Recently changed*/Inventions with a resume affordance (from F4 abandonment).
- **Failure paths:**
  - *Session expired* → re-authentication (MFA for agents/internal), returned to the intended destination.
- **Exit state:** the user is oriented to what needs them, with no re-reading required (Phase 4 IA-2).

---

### F21 — Agent onboarding (supply-side)

*Included because agent capacity is the business's ceiling (Phase 2 §8); the supply side is a first-class MVP flow.*

- **Trigger:** an agent arrives via "For Agents" or referral.
- **Preconditions:** none to start; verification required to act.
- **Main path:**
  1. The agent sees the value proposition: **your docket first, matters second** (Phase 3 J6).
  2. Registers; submits credentials (registration number, qualification evidence, identity).
  3. **Verification** against the official register `[Phase 3 §26 D6 dependency]` plus manual review (Marketplace Ops, Phase 3 M4.3).
  4. On verification → the agent becomes a **Verified Agent** and can **import their own existing matters** (F22).
  5. Completes profile; declares **technical domains** (which drive review-queue routing, ADR §5) and **specializations**; declares **conflicts**.
  6. Sets capacity; opts into filing opportunities and/or the review queue.
- **Alternate paths:**
  - *Verification pending* → the agent has a limited account; cannot review, be matched, or access client material until verified.
- **Failure paths:**
  - *Verification fails* → clear reason; remediation path; no access to any client Zone 1 material in the interim.
- **Exit state:** a Verified Agent, with declared domains and conflicts, able to import their practice, receive review-queue items (F7), and accept filing opportunities.

---

### F22 — Agent docket import (the adoption unlock)

- **Trigger:** a Verified Agent imports existing, non-platform matters.
- **Preconditions:** verified agent.
- **Main path:**
  1. The agent brings in their existing matters (Phase 3 M2.1). These are **theirs, in their tenancy** — not marketplace matters.
  2. The **Deadline Engine computes deadlines** for the imported matters from versioned rules (D1). The agent immediately gets standalone value — a docket that can't fail (Phase 3 ICP-2).
- **Alternate paths:** none material for MVP.
- **Failure paths:**
  - *Imported data is incomplete for deadline computation* → the agent is told exactly what's missing per matter; partial value is delivered for complete matters; nothing is silently mis-computed.
- **Exit state:** the agent's own practice is on the platform, deadlines computed and alerting. This is the acquisition mechanism that seeds supply before demand exists (Phase 2 §17.3).

---

### F23 — Reviewer workflow (agent acting as reviewer)

- **Trigger:** a review-queue item is available to a Verified Agent in their domain (F7).
- **Preconditions:** verified agent; declared domain matches; no conflict.
- **Main path:**
  1. The agent opens `/agent/reviews` and sees the domain-filtered queue (Phase 4 §6).
  2. Takes an item → receives a **review grant** (F8).
  3. Reviews the AI analysis: checks the assertions against their cited sources, **specifically looking for false negatives** (Phase 3 §12.5), verifies the statutory-exclusion analysis, edits where the AI is wrong.
  4. Records a **`ReviewDecision`** and **releases** (BR-01). Edits captured as diffs (FR-A08).
- **Alternate paths:**
  - *Agent declines the item after opening* → it returns to the queue; the review grant expires; reassignment (§8-D). No penalty; the item is not lost.
  - *Agent judges the analysis inconclusive* → releases an **Inconclusive** verdict with what's missing.
- **Failure paths:**
  - *Agent starts but abandons* → the grant expires on timeout; the item is reassigned (§8-D); the client continues to see "in review."
- **Exit state:** the Assessment is **Released** with this agent named as reviewer. The reviewer holds no ongoing relationship to the client (ADR §6).

---

## 5. Cross-flow rules

Rules that hold across every flow above. Stated once here rather than repeated per flow.

| # | Rule | Source | Applies in |
|---|---|---|---|
| **X1** | **Mandatory human review before any verdict release.** No flow may present an assessment verdict to a client without a `ReviewDecision` by a Verified Agent. | BR-01 / ADR | F6, F9, F23 |
| **X2** | **Provenance or it isn't shown.** No assertion is displayed as fact without a resolvable citation; if a citation fails to resolve, the assertion fails safe (not shown as verified). | BR-02 | F6, F9 |
| **X3** | **Invention is the root.** Every Assessment, Application, Matter and Decision hangs off an Invention that persists independently — including in Not pursued and Lapsed states. | P5 | F4, F6, F10, F11, F16 |
| **X4** | **Immutable artifacts.** A Disclosure version referenced by a released Assessment or a filed Application is immutable. Events are append-only. Corrections are new records, never edits. | BR-20, Phase 3 M0.10 | F4, F6, F16, F19 |
| **X5** | **Payment and Engagement never precede a free assessment.** No flow introduces payment, Engagement or Matter before or during the assessment. They appear only on a decision to file. | ADR §7 | F5, F6, F11, F15 |
| **X6** | **Access is scoped and audited.** Reviewers hold review grants (one Disclosure version, one ReviewDecision); engaged agents hold matter-scoped grants; neither ever sees a client's broader holdings. Every access is audited. | ADR §6, P6, Phase 3 §15 | F8, F15, F16, F17, F23 |
| **X7** | **Cross-tenant invisibility.** Objects outside an actor's tenancy or grant are invisible — no stubs, no counts, no locked placeholders. A non-entitled actor experiences them as non-existent. | IA-5 | all |
| **X8** | **State comes from the taxonomy.** No flow invents a state. Every state referenced exists in Phase 4 §11. | Phase 4 §11 | all |
| **X9** | **Deadlines are computed, never authored, from versioned rules; critical deadlines require human confirmation.** | D1, BR-03 | F16, F19 |
| **X10** | **Rights-affecting communication is guaranteed; a critical notification that can't be delivered escalates to a human.** | Phase 3 §16.5 | F18, §8-F |
| **X11** | **Zones never cross.** Zone 1 content stays in Zone 1 throughout every flow; it never enters the public index or the outcome-data pipeline. | D2, BR-15 | F4, F6, F8, F19 |
| **X12** | **Money is rendered by the configurable price component, in the L1-configured mode, official fees always separable.** No flow composes its own price logic. | Phase 4 §21 / L1 | F5(no charge), F14, F15 |
| **X13** | **Permission boundaries never silently escalate.** A Member who needs an Owner action is routed to request it, never auto-granted. | Phase 4 §17.2 | F11, F15 |
| **X14** | **Plain language leads; the term of art appears in the same view, never replacing it.** No flow renames a concept the user meets in official correspondence. | Phase 4 §10 | all client-facing |

---

## 6. (Cross-flow rules continued — audit)

**X15 — Everything material is on the record.** Every decision (BR-09), every access grant, every state transition, every reviewer edit, and every filing action produces an immutable event. No flow performs a consequential action that leaves no trace. This underpins dispute resolution, quality metrics, and trust, and it is assumed by — not restated in — each flow above.

---

## 7. State transition summary

The canonical transitions the flows drive. (States: Phase 4 §11; assessment states: ADR §4.)

```
INVENTION:
  Drafting ──(disclosure complete, F4)──► Recorded
  Recorded ──(assessment requested, F5)──► Assessing
  Assessing ──(verdict released, F6)──► Assessed
  Assessed ──(decide not to file, F10)──► Not pursued
  Assessed ──(decide to file + engage + file, F11–F16)──► Protected
  Protected ──(all applications closed, later)──► Lapsed
  Not pursued ──(re-assess / proceed later)──► Assessing / Filing

ASSESSMENT (ADR §4):
  Requested ─► Analysing ─► In review ─► Released ─► (Decided)
  In review ──(no reviewer / saturation)──► In review (holds; honest wait; never skipped)
  In review ──(reviewer unavailable)──► In review (reassigned)

MATTER:
  (created at engagement, F15) Engaged ─► In progress ─► Awaiting you / Awaiting the office ─► Complete ─► Closed

APPLICATION:
  Filed ─► Published ─► Awaiting examination ─► Under examination ─► Responding ─► Granted / Closed
  (MVP flows drive to Filed and track onward; response tooling is V2)
```

---

## 8. Exceptional flows

---

### 8-A — Abandoned assessment request

- **Situation:** a user requests an assessment (F5) but the Disclosure was actually incomplete, or the user disappears mid-analysis.
- **Handling:** an incomplete Disclosure blocks the request at F5 (never reaches Analysing). If the user disappears *during* Analysing/In review, the Assessment completes anyway (analysis and review are not user-blocking) and the verdict waits in **Released** for the user's return; a notification informs them. Nothing is lost; the Invention holds in **Assessing** then **Assessed**.
- **Exit:** verdict available whenever the user returns.

### 8-B — Abandoned disclosure

- **Situation:** user starts F4, never completes.
- **Handling:** Invention persists in **Drafting** with all immutable saved versions; appears in the Inventions index and *Recently changed*; a gentle resume notification may follow. No assessment can run until completion.
- **Exit:** resumable indefinitely.

### 8-C — Rejected review / reviewer disagrees with the AI

- **Situation:** the reviewer judges the AI analysis wrong or insufficient.
- **Handling:** this is *normal operation, not an exception to the gate*. The reviewer edits (diffs captured) and releases the corrected verdict, or releases **Inconclusive** if it can't be concluded. The client always sees the reviewed position with the reviewer named. There is no path where a "rejected" AI draft reaches the client unreviewed.
- **Exit:** **Released** with the reviewer's judgement governing.

### 8-D — Reviewer reassignment

- **Situation:** an assigned reviewer becomes unavailable, declines after opening, or times out.
- **Handling:** the first reviewer's **review grant expires** (F8); the item returns to the domain queue; a new reviewer is assigned (F7). The client continues to see **In review** — not an error, not a reset. The committed turnaround clock is managed per ADR §9 (if reassignment threatens the turnaround, the saturation policy's honest-wait step applies).
- **Exit:** a new reviewer completes the review; **Released**.

### 8-E — Reviewer capacity saturation

- **Situation:** no eligible domain-matched reviewer is available within the committed turnaround.
- **Handling (ADR §9, strict order):** (1) widen the eligible reviewer pool for the affected domain; (2) if still saturated, show the client an **honest, updated wait estimate**; (3) **never skip or shortcut review** (BR-01). Docket Ops / Marketplace Ops monitor the reviewer pool and act on saturation (Phase 3 M4.1/M4.3).
- **Exit:** review completes, possibly later than the default turnaround, always honestly communicated, always human-reviewed.

### 8-F — Undeliverable critical notification

- **Situation:** a rights-affecting (Critical) notification fails on all channels (F18).
- **Handling:** raised on the **Docket Health Console**; **Docket Ops paged** (Phase 3 §16.5, M4.1). A human attempts direct contact and records every attempt. The user is never left silently uninformed of a rights-affecting event.
- **Exit:** the user is reached, or a documented human-intervention trail exists; if a deadline is genuinely at risk, §8-G applies.

### 8-G — Deadline at risk / missed

- **Situation:** a critical deadline enters its window without acknowledgement, or is missed.
- **Handling (Phase 3 J9):** the alert ladder escalates across channels, then to Docket Ops paging. If it passes without action, an **incident is recorded, the client is notified immediately with options, and a root-cause analysis is mandatory** (NFR-C01). Restoration provisions (modelled as rules, D1) are assessed.
- **Exit:** never silent. Even in the worst case, the client learns from us first, immediately, with options. (A platform-attributable miss is a Sev-1, Phase 3 NFR-C01.)

### 8-H — Conflict detected at matching

- **Situation:** an agent holds a conflict with the client/adverse party (F14).
- **Handling:** the conflict check runs **before** any agent is shown (BR-10); conflicted agents are excluded from the client's view with an internal record. If a conflict is discovered *after* matching but before engagement, the match is withdrawn and the client is re-matched, with an honest, non-specific explanation (the conflict details are not the client's to see).
- **Exit:** the client engages only a conflict-clear agent.

### 8-I — Access revocation (post-engagement)

- **Situation:** a Matter closes, or an engagement ends.
- **Handling:** matter-scoped access is revoked **on a schedule, not instantly** — the agent retains access for their own professional record-keeping for a defined window `[Phase 3 §26 L6 legal dependency — window length pending]`. After the window, access is revoked; the agent retains only what their professional obligations require, per the L6 answer.
- **Exit:** access aligns with the (legally-determined) retention window; nothing beyond it.

### 8-J — Review grant boundary violation attempt

- **Situation:** a reviewer attempts to access anything beyond their review grant (F8).
- **Handling:** denied and audited (X6, X7). The reviewer cannot enumerate or view the client's other Inventions, portfolio, or matters — to the reviewer, they don't exist (IA-5).
- **Exit:** the boundary holds; the attempt is on the record.

### 8-K — Payment failure at engagement `[L1]`

- **Situation:** payment fails at F15.
- **Handling:** the Matter is **not** created; the Invention holds in **Assessed** (not Filing); the client is told what failed, that **nothing is at risk and no deadline exists** (because nothing is filed), and offered retry. Rendered per the L1-configured model.
- **Exit:** either successful retry (→ F15 completes) or the Invention remains assessed and unengaged, losing nothing.

---

## 9. Consistency review — conflicts reported, not silently resolved

Per the instruction, I ran every flow against the frozen baseline and the ADR. I found **no contradictions with the preserved principles.** I did find **three points where the flows expose a boundary or under-specification in the baseline.** Per the rule of engagement, I report them rather than changing the architecture. None blocks Phase 6; each needs a noted decision or a stated assumption.

### 9-A — The MVP filing journey outruns the MVP toolset (boundary, not contradiction)

- **What the flows expose:** F16 files an application, and F19 tracks it into examination states (**Awaiting examination**, **Under examination**, **Responding**). But the **drafting and prosecution workspaces are V2** (Phase 3; confirmed). So in MVP, the agent prepares the application *outside* the platform and uploads it (F16 step 2), and when an examination report eventually issues, **there is no in-product tooling to respond** — the "Responding" state can be *displayed* but not *worked* inside ALDASSIST at MVP.
- **Is this a contradiction?** No. Phase 3 explicitly defers those workspaces. But the flows make the seam visible: **MVP can file and track, but cannot yet prosecute in-product.**
- **What I did:** stated the boundary explicitly (§1.2, F16) rather than inventing MVP prosecution screens (which would expand scope) or pretending the states don't appear (they do, because the office moves the application regardless of our tooling).
- **Decision needed (Phase 6 / product):** for MVP, when an application reaches **Responding**, does the client experience (a) an in-product status view plus off-platform agent handling, or (b) a minimal "your agent is handling this off-platform" bridge? Either is faithful; the choice affects Phase 6 screens. *Not a Phase 5 redesign — a noted downstream decision.*

### 9-B — Multi-inventor collaborative disclosure editing is under-specified (baseline gap, already flagged)

- **What the flows expose:** F4 supports multiple Named Inventors, and the entity model (Phase 3 §14, Party_Invention_Role) supports co-ownership. But **no baseline text specifies the mechanics when two inventors edit one Disclosure**, or consent when they disagree, or the university case where the institution takes ownership while the researcher keeps editing.
- **Is this a contradiction?** No — it's the gap the Stage Gate Review already flagged (§2.3). It surfaces naturally here.
- **Working assumption (A3) to proceed:** in MVP, **one Disclosure has one editing owner at a time** (the Workspace Owner or a designated Member); additional Named Inventors are recorded and can *view* but co-editing is sequential, not concurrent. Institutional ownership wrappers are V2. *Rationale: avoids inventing a concurrent-editing/consent model (scope expansion) while keeping the multi-inventor record faithful. Flagged for explicit product confirmation.*

### 9-C — "Inconclusive → supply what's missing" implies re-assessment, whose tooling is V2 (sequencing note)

- **What the flows expose:** F9/F6 produce an **Inconclusive** verdict that tells the user what's missing. Acting on it means updating the Disclosure and re-assessing. But **re-assessment with diff (FR-A11) is V2.**
- **Is this a contradiction?** No. In MVP the user can create an updated Disclosure version and request a *new* assessment (F5 again) — the capability exists; only the *diff-against-prior* convenience is V2.
- **What I did:** F9 routes Inconclusive to "supply what's missing → new assessment," not to a V2 diff view. Faithful to MVP scope. Noted so Phase 6 doesn't build the diff view prematurely.

**Summary:** zero violations of the nine preserved principles. Three boundary/scoping observations, each handled by stating a boundary or a working assumption rather than altering the architecture. Assumptions A1, A2, A3 are consolidated in §11.

---

## 10. Future flows (V2+ — do not build in MVP)

Kept strictly separate, per the brief. These are named so Phase 6 knows the seams to leave room for, not to design now.

| Flow | Depends on | Phase |
|---|---|---|
| **Drafting workspace journey** (AI-assisted, agent-owned, diffable) | M2.2 | V2 |
| **Prosecution journey** (office-action extraction → response → amendment) | M2.3 | V2 |
| **Examination response, in-product** (closes the §9-A seam) | M2.3 | V2 |
| **Renewals & abandon/renew decision** (with reasoning, escalation, never passive lapse) | M1.8 | V2 |
| **Portfolio monitoring** (competitor/citation alerts overlay) | M1.7 ext | V2 |
| **Re-assessment with diff** against a prior assessment | FR-A11 | V2 |
| **Institutional flows** — disclosure intake, publication-conflict detection, ownership/approval routing, budget | Layer 3 | V2 |
| **Multi-currency and outbound-corridor client flows** | Billing ext | V2 |
| **Public API / developer flows** | Layer 5 | V3 |
| **Licensing marketplace** (the "Marketplace" reserved term) | Phase 3 §23 | V4+ |

**Explicitly not in any near-term flow:** trademarks/designs/copyright; autonomous drafting or filing; valuation-as-a-service; community forum. (Phase 2 §15 Won't-Have.)

---

## 11. Assumptions (consolidated)

Every assumption this document introduced, in one place, for explicit confirmation.

| ID | Assumption | Rationale | Confirm with |
|---|---|---|---|
| **A1** | Account and Workspace are distinct; a verified account can use tools/alerts without a Workspace; a Workspace is created on first Disclosure. | An alerts-only inventor shouldn't be forced through workspace setup. Consistent with Phase 4 §5. | Product |
| **A2** | MVP client↔agent communication is confined to active matters; no general client↔agent messaging and no client↔reviewer channel. | Prevents an unengaged professional relationship outside the model; keeps the reviewer role clean (ADR §6). | Product / Legal (adjacent to L2) |
| **A3** | One Disclosure has one editing owner at a time; additional Named Inventors view but co-edit sequentially; institutional ownership wrappers are V2. | Avoids inventing a concurrent-edit/consent model (scope expansion) while keeping the multi-inventor record faithful. | Product (the §9-B gap) |

None of these expands product scope; each narrows an ambiguity conservatively. If any is rejected, the affected flow (F2/F3 for A1, F17 for A2, F4 for A3) is revised — not the architecture.

---

## 12. Handoff notes — what Phase 6 (UX & Interaction Design) receives

Phase 6 should design interaction and visual detail on top of these flows without re-opening flow logic. Specifically:

1. **Every flow's state set and transitions are fixed** (§7, §8, Phase 4 §11). Phase 6 designs how transitions *feel*, not what they *are*.
2. **The three-depth verdict interaction (F9) is the highest-stakes screen in the product.** Phase 6 must make depth-1 comprehensible alone, depth-3 citations visibly and easily clickable (provenance is the trust anchor), and the coverage statement legible on unfavourable verdicts. Design the *unfavourable* verdict (F10) at least as carefully as the favourable one.
3. **The silence view (F19) is the signature emotional moment.** It needs interaction design that conveys calm and monitoring, not emptiness. This is where Phase 2's central emotional job is won or lost.
4. **The matter workspace header (F16/F17) must always answer the four questions** — where · what's next · needs you · cost `[L1]` — in every state, including "nothing needed."
5. **The action queue (F20) is the most-visited authenticated screen.** *Needs you* vs *Waiting on others* is the core distinction; design it to be scannable in seconds.
6. **The review workflow (F23) is throughput-critical.** It must be fast — reviewing a queue item should feel like minutes, because the whole client experience waits behind it (BR-01) and reviewer capacity is the ceiling.
7. **Two agent surfaces, distinct rhythms:** the docket (F22, operational, deadline-driven) and the review queue (F23, short, frequent). Phase 6 should not blend them.
8. **The `[L1]` price component has two rendering modes** (Phase 4 §21). Phase 6 designs both; neither changes any flow, only the price surface's presentation.
9. **Assumptions A1–A3 (§11) should be confirmed before Phase 6 finalises** the affected flows (registration/workspace, matter communication, multi-inventor disclosure).
10. **The §9-A boundary** (MVP files and tracks but doesn't prosecute in-product) must be reflected honestly in Phase 6's Application status screens — decide the §9-A option before designing the **Responding** state.

**What Phase 6 must not do:** introduce a new state, add a flow step that bypasses the review gate, compose price logic outside the component, create any cross-tenant or cross-matter visibility, or add an MVP feature from the §10 V2 list.

---

## 13. Closing consistency statement

All twenty-three primary flows, fifteen cross-flow rules, and eleven exceptional flows were checked against the nine preserved principles and the Assessment Lifecycle ADR. **No flow violates a preserved principle.** The three points where a flow met the edge of the frozen architecture (§9-A, 9-B, 9-C) are reported as boundaries/assumptions, not resolved by altering the baseline. Three conservative assumptions (A1–A3) are declared for confirmation. This document is internally consistent and ready to serve as the canonical User Flow specification for Phase 6.

---

*End of Phase 5 — User Flows — ALDASSIST.*
