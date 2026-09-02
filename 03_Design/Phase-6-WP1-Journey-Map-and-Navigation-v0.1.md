# Phase 6 — WP-1: MVP Journey Map & Global Navigation / Information Hierarchy

**Phase:** 6 — UX & Interaction Design
**Work package:** WP-1
**Type:** Phase 6 baseline document — **FROZEN** v0.1 (1 September 2026).
**Status:** **FROZEN** — Phase 6 (UX & Interaction Design), declared frozen 1 September 2026 by the repository owner (Vamshi); recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-020). **DR-01 and DR-02 remain explicitly deferred** (see the Deferred Decision Register). Not modified without an explicit architectural decision; this freeze changes no design substance in this file.
**Date:** 1 September 2026
**Governing baseline (frozen):** Phase 3 PRD · Phase 4 IA · Phase 5 User Flows · Assessment Lifecycle ADR · plus post-freeze Decision Log entries D-2026-014 … D-2026-019.

> **Rule of engagement (unchanged from WP-0).** DERIVE what the baseline already decides · DESIGN what Phase 6 owns · FLAG what is genuinely missing · ASK only when a real new decision is unavoidable. This document invents no state, business rule, legal wording, pricing value, SLA value, confidence threshold, statistical threshold or permission. Unspecified values are shown as **`[DESIGN SLOT: …]`**. Genuine gaps are shown as **`[FLAG: …]`**.

---

## 0. How to read this document

**Trace tags** appear inline so every design element points back to its authority:

- `[P5:Fn]` — Phase 5 flow · `[P5:§8-x]` — Phase 5 exceptional flow · `[P5:Xn]` — Phase 5 cross-flow rule
- `[P4:§n]` — Phase 4 IA section · `[P3:§n]` / `[P3:Mn]` / `[P3:BR-n]` / `[P3:FR-x]` — Phase 3 PRD
- `[ADR:§n]` — Assessment Lifecycle ADR · `[DL:D-…]` — Decision Log · `[AP-n]` — Architecture Principle

**Actors** (Phase 3 §4.1): Anonymous · Registered (Free) · Workspace Owner · Workspace Admin · Workspace Member · Workspace Viewer · Named Inventor · Verified Agent (filing) · Verified Agent (reviewer) · Agent Org Admin · Docket Ops (internal). Institution roles are V2.

**Zones** (`[AP-03]`/`[P3:§13.1]`): Z1 confidential client content · Z2 public patent corpus · Z3 outcome metadata.

**Two-axis status** (`[AP-14]`/`[P4:§11.1]`): every object carries a **Lifecycle state** and an independent **Attention state** (On track / Action needed / At risk). Both always shown; never merged.

---

## 1. Scope of WP-1

**In scope:** the complete MVP end-to-end journey (demand side, anonymous → Responding), the supply-side agent journey, the points at which exceptional paths attach, global navigation for each MVP surface, and the information hierarchy that all screens inherit.

**Out of scope here (later WPs):** per-screen 15-field specs (WP-2); interaction/micro-interaction design (WP-3); edge-case screen design, responsive behaviour, design-system foundations (WP-4); UX principles, constraint register, traceability matrix (WP-5).

**Surfaces in MVP:** Public (`/`), Client (`/app`), Agent (`/agent`), and the internal Operations subset the MVP flows depend on (`/ops/docket` and the consoles that gate agent verification, rules and quality). **Institution (`/institution`) is V2** `[P4:§7]`/`[DL:D-2026-010 context]` and is represented only as a navigational seam, never designed here.

---

## 2. The MVP lifecycle spine (derived, not redesigned)

All authenticated structure is an expression of one sequence `[P4:§2.2]`:

```
IDEA ─► RECORDED ─► ASSESSED ─► DECIDED ─► FILED ─► EXAMINED ─► (RESPONDING, status-only) ─► GRANTED ─► MAINTAINED(V2)
                        │
                        └─► NOT PURSUED   (first-class destination, not a dead end)
```

**Object state machines** `[P5:§7]` / `[P4:§11]` / `[ADR:§4]` — reproduced verbatim, invented nowhere:

```
INVENTION:   Drafting → Recorded → Assessing → Assessed → (Not pursued | Filing → Protected → Lapsed)
ASSESSMENT:  Requested → Analysing → In review → Released → (Decided)
             In review ↺ In review  (saturation: holds, honest wait, never skipped [ADR:§9])
             In review ↺ In review  (reviewer unavailable: reassigned [P5:§8-D])
MATTER:      Quoted[L1] → Engaged → In progress → (Awaiting you | Awaiting the office) → Complete → Closed
APPLICATION: Filed → Published → Awaiting examination → Under examination → Responding → (Granted | Closed)
             (MVP drives to Filed and tracks onward; Responding is STATUS-ONLY per [DL:D-2026-016])
```

**The relationship that governs the whole IA** `[P3:§14.3]`/`[AP-01]`: **Invention (1) → Application (n).** Every Assessment, Application, Matter and Decision hangs off an Invention that persists independently — including in *Not pursued* and *Lapsed* `[P5:X3]`.

---

## 3. Master journey map — demand side (client)

Each stage lists: **Actor · Surface/route · Lifecycle before→after · Whose turn · Zone · Primary flow · Gates/notes.** Routes are from the authoritative IA sitemaps `[P4:§4,§5]`.

### J-A · Anonymous discovery `[P5:F1]`
- **Actor:** Anonymous → (optionally) Registered · **Route:** `/`, `/search`, `/patents/{jur}/{number}`, `/tools/cost-planner`, `/solutions/*`, `/for/*`, `/find-your-path`, `/learn/*` · **State:** none (no Invention yet) · **Whose turn:** the visitor · **Zone:** Z2 only.
- Full register search, full documents, status timelines, the Cost Planner and the path finder are **ungated** `[P4:IA-8]`/`[P3:FR-S01,FR-C01]`. The account gate appears only at *ongoing value* (save a search, set an alert, start a Disclosure).
- **Confidentiality guard:** if the query pattern suggests the visitor is searching their own unpublished invention, surface the FR-S11 warning and route toward the Vault — **public search is Z2; their invention is Z1** `[P5:F1 alt]`/`[P4:§13.1]`.
- **Exit:** left as an anonymous visitor who got value, **or** → J-B at the account gate.

### J-B · Account creation `[P5:F2]` / `[DL:D-2026-015 A1]`
- **Actor:** Anonymous → Registered · **Route:** sign-up + email verification · **State:** account exists; **no Workspace yet** · **Whose turn:** the user, then the system (verification) · **Zone:** Z1 (account identity).
- Minimal registration — email + verification; **no phone, no sales contact** `[P3:J1]`. On success the user is returned to *the action they were attempting*, not a generic home.
- **A1 constraint (derive, do not reopen):** account and Workspace are distinct; a verified account can set alerts and use tools with **no Workspace** `[DL:D-2026-015]`.
- **Exit:** verified account at its intended next step. If that intent was "start a Disclosure" → J-C.

### J-C · Workspace creation `[P5:F3]`
- **Actor:** Registered → Workspace Owner · **Route:** interstitial on first Disclosure (not a standalone destination) · **State:** Workspace created · **Whose turn:** the user · **Zone:** Z1.
- A Workspace is created **on the first Disclosure**; the creator becomes **Workspace Owner**; minimal setup (a name) `[P5:F3]`. Invitees join with the inviter's assigned role (Admin/Member/Viewer) and do **not** become Owner. A Named Inventor attached without membership gets **no** Workspace, only visibility of the Invention(s) they are named on `[P4:IA-5]`/`[P3:§4.1]`.
- **Exit:** an appropriate context exists; proceed to J-D.

### J-D · Disclosure capture `[P5:F4]`
- **Actor:** Owner/Admin/Member (not Viewer) · **Route:** `/app/inventions/new` → guided capture (`/disclosure/edit`) · **State (Invention):** *Drafting* → *Recorded* on completion · **Whose turn:** the user · **Zone:** **Z1 from the first keystroke** `[P3:D2]`.
- Guided structured capture `[P3:M1.2]`: problem → prior approaches → the invention → how it works → variants → advantages. **Mandatory prior-disclosure interrogation** cannot be skipped `[P3:FR-D03]`. Every save = an immutable, timestamped version `[P3:FR-D02]`/`[P5:X4]`. Save-and-resume throughout. Completeness check is **Tier-1 AI only — it may structure and prompt, never assess patentability** `[P3:§12.1]`.
- **Multi-inventor (A3, derive):** one editing owner at a time; additional Named Inventors view; **sequential, not concurrent** `[DL:D-2026-015 A3]`. Phase 6 designs a **soft edit-session lock** over the *existing* Workspace edit roles (see §8.4). No concurrent editing, no takeover-while-active, no new designated-editor role, no consent model.
- **Exit:** Invention *Recorded* with a complete immutable Disclosure version; next action surfaced: **Request assessment**.

### J-E · Assessment request `[P5:F5]` / `[ADR:§7]`
- **Actor:** Owner/Admin/Member · **Route:** action on the Invention/Disclosure · **State (Invention):** *Recorded* → *Assessing*; **(Assessment):** created *Requested* → *Analysing* · **Whose turn:** the system · **Zone:** Z1 input driving Z2 retrieval `[P4:§13.1 row 4]`.
- Selects jurisdiction(s) — **MVP: India and/or PCT** `[P3:§12.4]` — and assessment type. **The assessment is free; no payment, no Engagement** `[ADR:§7]`/`[P5:X5]`. The user is shown an honest expectation: an automated **analysis** stage, then a **human review** stage with a **committed turnaround** `[ADR:§9]`. The retired "hours/seconds" language is not used `[P4:§10.3 banned]`. Turnaround value = **`[DESIGN SLOT: committed review turnaround — configurable, value not fixed by baseline (ADR §9)]`**.
- **No-gate (derive):** no eligibility/quota/rate-limit gate on the free assessment `[DL:D-2026-017]`.
- **Exit:** Assessment *Analysing*; user told they'll be notified — no on-screen waiting `[P3:D5]`.

### J-F · Assessment lifecycle to release `[P5:F6,F7,F8]` (agent side J-S3 / `[P5:F23]`)
- **Actor:** platform (analysis) → Verified Agent (reviewer) · **State (Assessment):** *Analysing* → *In review* → *Released*; **(Invention):** *Assessing* → *Assessed* · **Whose turn:** the platform / the reviewer (never the client) · **Zone:** Z1 (scoped, audited read).
- Analysis pipeline `[P3:M1.3]`: multi-strategy retrieval → element comparison → statutory-exclusion analysis → **assertion assembly, every assertion bound to a resolvable citation** `[P3:BR-02]`/`[P5:X2]`. Progress/intermediate findings visible if the user chooses to watch `[P3:FR-A10]`.
- On completion → *In review*: item enters the **domain-matched review queue** `[ADR:§5]`; a **review grant** gives the reviewer scoped access to exactly one Disclosure version + the analysis `[ADR:§6]`/`[P5:X6]`. Reviewer reviews, edits (captured as diffs `[P3:FR-A08]`), records a `ReviewDecision`, releases. On release the reviewer is **named on the output** `[P3:FR-A07]`/`[BR-01]` and the assessed Disclosure version becomes **immutable** `[P3:BR-20]`.
- **The gate is absolute:** no *In review* → *Released* without a `ReviewDecision` by a Verified Agent `[P5:X1]`/`[BR-01]`. **No payment, Engagement or Matter exists anywhere in J-F** `[P5:X5]`.
- **Whose-turn copy** must always answer "the reviewer is reviewing; expected by `[DESIGN SLOT: turnaround]`" `[P5:principle 4]`.
- **Exit:** Assessment *Released* with a named reviewer, verdict, provenance-linked reasoning; Invention *Assessed* → J-G.

### J-G · Viewing the verdict `[P5:F9]` — the highest-stakes screen `[P5:§12.2]`
- **Actor:** any role with permission on the Invention · **Route:** `/app/inventions/{id}/assessments/{aid}` · **State:** Assessment *Released* · **Whose turn:** the client (to understand, then decide) · **Zone:** Z1.
- **Three fixed depths** `[P4:§16]`/`[P4:§15.2]`:
  - **Depth 1 — Verdict:** *Looks protectable* / *Protectable with changes* / *Unlikely to be protectable* / *Not enough to assess* `[P4:§11.6]`, with confidence + its basis (representation = **`[DESIGN SLOT: confidence representation — scale/threshold not defined by baseline (AP-08, §12.3.4)]`**), plain-language meaning, recommended next steps.
  - **Depth 2 — Reasoning:** element-by-element comparison; each blocking/relevant reference and why; statutory-exclusion analysis (India: s.3(k)/s.3(d) called out).
  - **Depth 3 — Evidence:** **every assertion clickable to its exact source passage** `[P3:BR-02]`; full reference list; coverage statement (what was/wasn't searched); the 18-month blind-spot notice `[P3:§12.5]`. Coverage statement is **never collapsed by default on an unfavourable verdict** `[P4:§15.2]`.
  - **Persistent:** reviewer name + notes, assessment date, assessed Disclosure version `[BR-01]`.
- **Provenance fail-safe:** a citation that fails to resolve is **not shown as verified** `[P5:X2]`/`[P5:F9 failure]`.
- **Branches:** *Inconclusive* → "supply what's missing → **new** assessment" (no diff view — that is V2) `[P5:§9-C]`. Favourable/qualified → J-I. Any verdict → the client may still decline → J-H.
- **Exit:** the client is at a decision.

### J-H · Decision not to file `[P5:F10]` — first-class, designed with equal care `[P5:principle 2]`
- **Actor:** client · **State (Invention):** *Assessed* → *Not pursued* · **Whose turn:** closed (a completion, not an abandonment) · **Zone:** Z1.
- A **Decision** entity is created with actor + rationale `[P3:BR-09]`. **No money, no Engagement, no Matter** `[ADR:§7]`. Four alternatives with **equal visual weight** `[P4:§11.6]`: design around · trade secret · defensive publication · defer & re-assess. The Invention **persists in the Vault**, monitored, re-assessable `[AP-01]`. The Not-pursued page is complete and dignified, **not a greyed-out husk** `[P4:§15.1]`.
- **Exit:** Invention *Not pursued*; forward actions remain (re-assess / proceed later).

### J-I · Decision to file `[P5:F11]`
- **Actor:** **Workspace Owner only** (the sole role that can engage/pay) `[P4:§17.2]` · **State (Invention):** *Assessed* (unchanged until engagement) · **Whose turn:** the client · **Zone:** Z1.
- Choose jurisdiction(s) + route; Cost Planner updates for the choice `[P3:J3]`. A **Member** who wants to file is routed to **request Owner action** — no silent permission escalation `[P5:X13]`. Qualified verdict shows the recommended changes and their cost before matching `[P5:F11 alt]`.
- **Exit:** → J-J with a defined scope (invention, jurisdiction, route). **Still no Engagement or payment.**

### J-J · Agent Matching / Engagement — matching `[P5:F14]` / `[P3:M1.5]`
- **Actor:** Workspace Owner · **Route:** `/app/find-an-agent` → `/results` → `/{agentId}/quote` · **State (Matter):** *Quoted*`[L1]` at quote view · **Whose turn:** the client · **Zone:** Z1 (client scope) + Z3 (agent outcome stats).
- **Conflict check runs before any agent is shown** `[P3:BR-10]`/`[P5:§8-H]`; conflicted agents are silently excluded (internal record). Matched agents shown with **rationale** and **fixed, published prices before engagement** `[P3:FR-M01,FR-M03,BR-06]`. Profiles surface verified credentials, background, jurisdiction, languages, and outcome statistics **only at/above the n≥20 floor, always with sample size + a confidence indicator; below the floor show "not enough data yet"** `[DL:D-2026-019]`/`[P3:BR-17]`; publication go-live is L3-gated. Confidence-indicator representation = **`[DESIGN SLOT: confidence indicator representation — scale not defined; D-2026-019]`**.
- Pricing rendered by the **configurable price component** `[P4:§21]`/`[P5:X12]`; **component pricing is the probable primary direction, both modes designed** `[DL:O-2026-001]`. Official fees always separately identifiable.
- **No agent available** → honest message + notify-me; Invention/Assessment persist; no fabricated matches `[P5:F14 alt]`. The reviewer of this Assessment may appear among matches — permitted, no forced continuity `[ADR:§5]`.
- **Exit:** an agent selected, a fixed-price quote in view → J-K. **No Engagement/payment yet.**

### J-K · Engagement & Matter creation `[P5:F15]`
- **Actor:** Workspace Owner · **State (Invention):** *Assessed* → *Filing*; **(Matter):** *Quoted* → *Engaged* · **Whose turn:** client then agent · **Zone:** Z1.
- Client accepts scope + quote; payment per the **L1-configured model** (official fees always separable) `[P4:§21]` — value/rendering = **`[DESIGN SLOT: L1 pricing rendering — component primary, both modes required; legally OPEN per O-2026-001]`**. On acceptance an **Engagement** is created → creates a **Matter** + a **matter-scoped access grant** to the selected agent `[P3:P6/D4]`. The assessment + Disclosure travel with the Invention and become visible to the agent **within matter scope** `[ADR:§11]`.
- **Scope change requires a new quote** `[P3:BR-06]`. **Payment failure:** Matter **not** created; Invention holds in *Assessed*; copy states **nothing is at risk and no deadline exists** (nothing filed) `[P5:§8-K]`/`[P4:§19.3]`.
- **Exit:** Engagement + Matter exist; Invention *Filing* → J-L.

### J-L · Filing journey to submission `[P5:F16]`
- **Actor:** Verified Agent (filing) + client (approval) · **Route (client):** `/app/matters/{id}`; **(agent):** `/agent/matters/{id}` · **State (Matter):** *Engaged* → *In progress* → *Awaiting you*/*Awaiting the office*; **(Application):** created *Filed*; **(Invention):** *Filing* → *Protected* · **Whose turn:** alternates, always shown `[P4:§11.4]` · **Zone:** Z1.
- The agent opens the matter **brief** (Disclosure + released Assessment + client context) `[P4:§6]`. **In MVP the drafting workspace does not exist (V2)** — the agent prepares the application with their own tools and **uploads** it into the matter `[P5:F16 step2]`/`[P5:§9-A]`. Structured clarification loop within the Matter workspace `[P5:F17]`. **The client reviews the application document (claims + specification) before filing** — a decision point `[P3:J3 step9]`. On client approval, the **agent files with the office** — a human action; **the platform never files autonomously** `[P3:BR-09,T3]`. An **Application** is created (child of the Invention); the filing **Event** is recorded (immutable) `[P3:M0.10]`. **The Deadline Engine computes the full deadline set** from versioned rules `[P3:D1,§18]`/`[P5:X9]`.
- **Failure paths:** filing to office fails → Application **not** marked *Filed*, no deadline computed off a non-filing `[P5:F16 failure]`; office non-confirmation → provisional Event, honest "awaiting office confirmation," discrepancies to Docket Ops `[P3:§20.3]`.
- **Exit:** Application *Filed* with a computed, human-confirmable deadline set; Invention *Protected* → J-M. **MVP ends at filed-and-tracked** `[P5:§1.2,§9-A]`.

### J-M · Application tracking & the silence state `[P5:F19]`
- **Actor:** client · **Route:** `/app/portfolio/{appId}` (+ `/status`, `/deadlines`) · **State (Application):** *Filed* → *Published* → *Awaiting examination* → *Under examination* → … · **Whose turn:** usually no one ("nothing needed") · **Zone:** Z1 + Z2 (register).
- Detail shows the **lifecycle + attention pair** `[P4:§15.3]`, the event timeline with **source and freshness per entry**, and the single most important next action (or "nothing needed"). The Integration Hub polls the register; on a detected change an **Event** is recorded, **deadlines recompute** `[P3:D1]`, the client is notified `[P5:F18]`.
- **The silence view** `[P4:§19.4]`/`[P4:IA-9]` — the signature anti-anxiety surface `[P5:§12.3]`: "Nothing has happened — and that's expected," last known event, an honest expected range for the next event (range = **`[DESIGN SLOT: expected-next-event range — derived from Rules Engine/field timelines, not authored]`**), explicit "nothing is required from you," and "we're monitoring daily."
- **Register unavailable** → last-known status + explicit staleness stamp, never an error `[P3:NFR-A05]`. Source/computation conflict → routes to Docket Ops; client sees the honest human-checked position `[P3:§20.3]`.
- **Exit:** the client always knows where the application stands, whether anything is needed, and when to expect the next thing — including "nothing, for a while."

### J-N · Responding — STATUS-ONLY `[DL:D-2026-016]` / `[P5:§9-A]`
- **Actor:** client (view) + agent (off-platform work + upload) · **Route:** `/app/portfolio/{appId}/status` (+ `/deadlines`, `/documents`) · **State (Application):** *Responding* · **Whose turn:** the agent (off-platform), tracked in-product · **Zone:** Z1.
- MVP shows: the **Responding status in-product**; the **examination-response deadline tracked by the Deadline Engine** `[AP-07]`; **honest copy that the agent is handling drafting/prosecution off-platform**; the ability to **upload the filed response artifact**; and **no in-product prosecution workspace** `[DL:D-2026-016]`/`[P5:§9-A]`. This must not drift into prosecution tooling (V2) `[P5:§10]`.
- **Exit:** on the office's next action, the Application advances (*Granted*/*Closed*) via J-M polling. In-product examination-response *authoring* is V2 `[P5:§10]`.

**Terminal branches** `[P4:§11.3]`: *Granted* (grant number/date; renewals V2) and *Closed* — **"Closed" never appears without its reason** (abandoned · refused · withdrawn · lapsed · opposed-and-revoked).

---

## 4. Cross-cutting journeys (span every stage)

### C-1 · Communication within a matter `[P5:F17]` / `[DL:D-2026-015 A2]`
Client↔agent communication is **confined to active matters** — a recorded, in-context thread, not email `[P3:M1.6]`. **No general client↔agent messaging; no client↔reviewer channel** `[ADR:§6]`/`[P5:A2]`. Agent clarification requests surface as client actions ("Needs you") `[P4:§18.1]`. The client's status view updates from the agent's actual work state — this is how "silence" is solved structurally `[P3:J7]`. Communication **never crosses matter or tenancy boundaries** `[P5:X6,X7]`.

### C-2 · Notifications `[P5:F18]` / `[P3:§16]`
Five classes: **Critical** (rights at risk — in-app+email+SMS/WhatsApp, receipt tracking, escalation ladder, **cannot be muted**, stated at onboarding) · **Action required** · **Progress** · **Informational** (digest) · **Proactive reassurance** (periodic status *even when nothing has happened*, phase-adaptive — the anti-silence mechanism) `[P3:§16.2,§16.3]`. **Undeliverable Critical** → Docket Health Console, Docket Ops paged `[P3:§16.5]`/`[P5:§8-F,X10]`. Channel-preference defaults = **`[DESIGN SLOT: per-class default channel preferences where §16.2 leaves them unset]`** (the class→channel mapping itself is fixed by §16.2 and is not a slot).

### C-3 · Returning user `[P5:F20]`
Client → **Home = the action queue** (*Needs you* → *Waiting on others* → *Recently changed* → *portfolio glance*) `[P4:§18.1]`. Agent → **Today** (risk-ranked queue incl. review-queue items) `[P4:§6]`. Multi-role users use the **context switcher**, one context at a time `[P4:§2.3]`. Abandoned *Drafting* Disclosures reappear with a resume affordance `[P5:§8-B]`.

### C-4 · Exceptional-path attachment points `[P5:§8-A…8-K]`
| Exceptional path | Attaches at | Handling authority |
|---|---|---|
| 8-A abandoned assessment request | J-E/J-F | verdict waits in *Released*; nothing lost |
| 8-B abandoned disclosure | J-D | persists in *Drafting*; resumable indefinitely |
| 8-C reviewer disagrees with AI | J-F | normal operation; reviewer's judgement governs; never bypasses gate |
| 8-D reviewer reassignment | J-F | grant expires; requeue; client still sees *In review* |
| 8-E reviewer capacity saturation | J-F | ADR §9 order: widen pool → honest wait → never skip |
| 8-F undeliverable critical notification | C-2 | Docket Ops paged; human contact trail |
| 8-G deadline at risk / missed | J-M/J-N | alert ladder → Docket Ops → incident, client-first, RCA `[P3:NFR-C01]` |
| 8-H conflict at matching | J-J | conflict check before display; non-specific re-match if found later |
| 8-I access revocation post-engagement | after J-L close | scheduled, not instant; window = **`[DESIGN SLOT: L6 retention window length — legal dependency, pending]`** |
| 8-J review-grant boundary violation | J-F | denied + audited; cross-tenant invisibility holds |
| 8-K payment failure at engagement | J-K | Matter not created; nothing at risk; no deadline |

---

## 5. Master journey map — supply side (agent)

### J-S1 · Agent onboarding & verification `[P5:F21]`
- **Actor:** prospective agent · **Route:** public `/for/patent-agents` → registration → verification · **Whose turn:** agent, then Marketplace Ops · **Zone:** agent identity (Z1-equivalent tenancy); **no client Z1 until verified**.
- Value proposition: **your docket first, matters second** `[P3:J6]`. Submits credentials (registration number, qualification evidence, identity). **Verification** against the official register `[P3:§26 D6]` + manual review by Marketplace Ops `[P3:M4.3]`. On verification → **Verified Agent**; declares **technical domains** (drive review-queue routing `[ADR:§5]`), specializations, **conflicts**; sets capacity; opts into filing opportunities and/or the review queue. Verification-pending = limited account, **no client material** `[P5:F21 alt]`.

### J-S2 · Docket import — the adoption unlock `[P5:F22]` / `[P4:§6.1]`
- **Route:** `/agent/matters/import` (a **primary** destination, reachable from empty state, onboarding, matters index) · **Zone:** agent's own tenancy (**not** marketplace matters).
- Agent imports existing matters `[P3:M2.1]`; the **Deadline Engine computes deadlines** from versioned rules `[P3:D1]` — standalone value, a docket that can't fail `[P3:ICP-2]`. Incomplete data → told exactly what's missing per matter; partial value for complete matters; nothing silently mis-computed `[P5:F22 failure]`.

### J-S3 · Reviewer workflow `[P5:F23]` — throughput-critical `[P5:§12.6]`
- **Route:** `/agent/reviews` (domain-filtered queue) → `/agent/reviews/{id}` (two-pane review workspace) · **Whose turn:** the reviewer · **Zone:** Z1 under a **review grant** only.
- Take item → receive review grant `[ADR:§6]` → review the AI analysis (check assertions against cited sources, **specifically hunt false negatives** `[P3:§12.5]`, verify statutory-exclusion analysis, edit where wrong) → record `ReviewDecision` → release `[BR-01]`; edits captured as diffs `[P3:FR-A08]`. Decline/abandon → grant expires, requeue, reassignment `[P5:§8-D]`; inconclusive → release *Inconclusive* with what's missing. **No ongoing client relationship** `[ADR:§6]`.
- **This is a distinct rhythm from the docket** (short, frequent, queue-based) and must not be blended with `/agent/matters` `[P4:§6.1]`/`[P5:§12.7]`.

### J-S4 · Filing opportunity & delivery (agent side of J-J…J-L)
- **Route:** `/agent/opportunities` → `/{id}` (scope, fee, conflict status, accept/decline) `[L1]` `[P4:§6]`/`[P5:F14 agent-side]`. On acceptance the client-side J-K creates the Engagement/Matter; the agent then works the matter (brief → upload prepared application → clarification loop → client approval → file) `[P5:F16]`. At *Responding* the agent works off-platform and **uploads** the filed response `[DL:D-2026-016]`.

---

## 6. Whose-turn map (the anti-silence backbone)

Every waiting state names who is acting and roughly when `[P5:principle 4]`/`[P2 via Philosophy §5]`. Summary of turn-ownership by state:

| State | Whose turn | Where it is surfaced |
|---|---|---|
| Disclosure *Drafting* | Client | Inventions index · *Recently changed* · resume prompt |
| Assessment *Analysing* | Platform | Invention/Assessment progress; async, off-screen |
| Assessment *In review* | Reviewer | "In review · expected by `[SLOT: turnaround]`" |
| Assessment *Released* | Client (decide) | Home *Needs you* · Invention next-action |
| Matter *Awaiting you* | Client | Matter header cell · Home *Needs you* |
| Matter *Awaiting the office* | Office | Matter header cell · Home *Waiting on others* |
| Application quiet periods | No one | **Silence view** + *Waiting on others* |
| Application *Responding* | Agent (off-platform) | Status view + response deadline `[DL:D-2026-016]` |

---

## 7. Global navigation & information hierarchy

### 7.1 Surface separation `[P4:§2.3]`
Five surfaces, one design system + one vocabulary, switched explicitly (never blended) `[P4:§2.3]`/`[AP-03/P6]`:

| Surface | Root | MVP status | Auth |
|---|---|---|---|
| Public | `/` | MVP | None / Free |
| Client | `/app` | MVP | Required |
| Agent | `/agent` | MVP | Required + MFA |
| Operations | `/ops` | MVP (subset — §7.5) | Required + MFA + justification |
| Institution | `/institution` | **V2 — not designed in Phase 6 MVP** | — |

### 7.2 Public global navigation `[P4:§12.2]`
```
ALDASSIST   Search   Solutions ▾   Pricing   Learn   For Agents        [Sign in]  [Start free]
```
- Six items max; **Search is first and a destination, not a dropdown**. One dropdown only (Solutions), ≤8 items, no third level `[P4:IA-6]`.
- **Pricing is top-level with real numbers** `[L1]` — a differentiator by itself `[P4:§12.2]`.
- **"For Agents" is top-level** (supply side is first-class) `[AP-06]`.
- **"Trust" lives in the footer**, linked from every page `[P4:§12.2]`.
- Wordmark is **ALDASSIST** (never `[Mark]`/`[Platform]`) `[DL:D-2026-014]`.

### 7.3 Client global navigation `[P4:§12.3]`
```
ALDASSIST   [⌕ global search]                       [context ▾]  [⚑ n]  [avatar]
────────────
Home                     ← action queue
Inventions               ← the Vault (pre-filing spine)
Portfolio                ← filed Applications (post-filing spine)
Deadlines
Matters
Costs            [L1]
Documents
────────────
Settings
```
- Seven primary items; Settings visually separated. The **attention badge `⚑`** = count in *Needs you*, one click from every screen `[P4:IA-2]`. Global search spans Inventions/Applications/Matters/Documents/public register with scoped groups `[P4:§13.2]`. Context switcher only for multi-role users.
- **Inventions ≠ Portfolio by design** `[P4:§5.1]`: Inventions = things I have (incl. *Not pursued*); Portfolio = things I've protected. Each links to the other on every detail page.
- **Agent Matching entry (`/app/find-an-agent`) is a contextual destination reached from a decision-to-file (J-I)** `[P4:§5]`, **not** a primary nav item — it does not add an eighth item.

### 7.4 Agent global navigation `[P4:§6, §12.4 — authoritative]`
```
Today · Docket · Matters · Reviews · Opportunities · Practice        [⚑] [avatar]
```
- Six items. **Today** is the default landing `[P3:J7]`. **Reviews is a top-level destination** (the BR-01 gate), deliberately separate from Matters `[P4:§6.1]`. (Note: the IA §3 overview omits `/agent/reviews`; §6/§12.4 are authoritative and govern — recorded consistency notice, not reopened `[P4:§3 notice]`.)
- `/agent/matters/import` is a **primary** destination within Matters, not a settings action `[P4:§6.1]`.

### 7.5 Operations navigation (internal, MVP subset) `[P4:§8]`
Default landing `/ops/docket` — the **Docket Health Console** `[P3:M4.1]`, the most important internal screen. MVP-required consoles the customer flows depend on: `/ops/docket` (+ `/unconfirmed`, `/discrepancies`, `/undelivered`, `/escalations`); `/ops/marketplace/verification` (gates J-S1); `/ops/rules` Rule Authoring `[P3:M4.4]` (seeds the Deadline Engine); `/ops/quality` `[P3:M4.2]`; `/ops/business` (the headline metrics). Full ops UX depth is scheduled with later WPs; WP-2 specifies the Docket Health Console and the flow-critical consoles.

### 7.6 Information hierarchy (inherited by every screen)
1. **Lifecycle spine** (§2) organises all authenticated structure `[P4:§2.2]`.
2. **Object page skeleton** `[P4:§15]`: Identity → **Status pair** (lifecycle + attention) → **Next action** → Tabs → Section content + **Relationship rail**.
3. **Three-depth progressive disclosure** everywhere `[P4:§16]`: State → Reasoning → Evidence; depth 1 understandable alone, depth 3 always reachable.
4. **The relationship graph** `[P4:§12.5]`: from any object, every directly related object is one click away.
5. **Matter workspace header answers four questions in every state** `[P4:§15.4]`: *Where · What's next · Needs you · Cost `[L1]`* — "Nothing needed" is a valid value.
6. **Home = action queue** `[P4:§18.1]`: *Needs you* → *Waiting on others* → *Recently changed* → *Portfolio at a glance*.
7. **Two navigation levels maximum** `[P4:IA-6]`; **one price component, two modes** `[P4:IA-7]`; **labels only from the controlled vocabulary** `[P4:§10]`/`[P4:IA-10]`.

### 7.7 Cross-surface & context-switching rules
- One context at a time via the context switcher; no blended contexts `[P4:§2.3]`/`[P5:§3]`.
- **Cross-tenancy invisibility** everywhere: objects outside an actor's tenancy or grant are invisible — no stubs, no counts, no placeholders `[P4:IA-5]`/`[P5:X7]`.
- Permission variance is by role on the same object `[P4:§17.2]`; permissions never silently escalate `[P5:X13]`.

---

## 8. Design decisions taken in WP-1 (within Phase 6 authority)

### 8.1 Workspace creation is an interstitial, not a destination
Derived from A1 + F3: because a Workspace is created *on first Disclosure*, workspace creation is a lightweight step inside J-C/J-D, not a top-level nav destination `[P5:F3]`/`[DL:D-2026-015]`.

### 8.2 Agent Matching entry is contextual, not primary nav
Keeps the client nav at seven items `[P4:IA-6/§12.3]` while `/app/find-an-agent` is reached from the decision-to-file `[P4:§5]`.

### 8.3 Responding is a status overlay on the Application detail, not a new surface
D-2026-016 status-only view is realised as the *Responding* state of the Application detail (`/status`, `/deadlines`, `/documents` upload), reusing existing templates — no prosecution workspace `[DL:D-2026-016]`/`[P5:§9-A]`.

### 8.4 Sequential multi-editor = soft edit-session lock (A3-faithful)
Design pattern (no new decision): the Disclosure carries a **soft edit-session lock** layered over the *existing* Workspace edit roles (Owner/Admin/Member edit; Viewer and non-member Named Inventors are view-only `[P3:§4.1]`/`[P4:§17.2]`). One holder edits; others see "being edited by X — you'll be able to edit when they're done." The lock releases when the holder saves-and-leaves or the session goes idle (idle duration = **`[DESIGN SLOT: edit-session idle timeout]`**). Every save is an immutable version `[P3:FR-D02]`/`[BR-20]`, so nothing is lost. **No concurrent editing, no takeover-while-active, no new designated-editor role, no consent model** `[DL:D-2026-015 A3]`.
- **`[FLAG: A3 handoff — the soft-lock above is derivable and non-inventing. A NEW decision is required ONLY if you intend edit access restricted to a single designated editor (rather than serialized across all edit-capable members), which would change the §4.1 permission model. Not decided here.]`**

---

## 9. Design slots surfaced in WP-1 (values the baseline leaves open)

| Slot | Where | Baseline authority for leaving it open |
|---|---|---|
| Committed review turnaround value | J-E, J-F, whose-turn copy | ADR §9 (configurable, not fixed) |
| Assessment confidence representation | J-G depth 1 | AP-08, §12.3.4 (basis required; scale not defined) |
| Agent-stat confidence-indicator representation | J-J | D-2026-019 (indicator required; scale not defined) |
| L1 pricing rendering (component primary; both modes) | J-J, J-K | O-2026-001 (legally OPEN) |
| Expected-next-event range (silence view) | J-M | derived from Rules Engine/field timelines, not authored |
| L6 post-engagement retention window | §8-I | Phase 3 §26.1 L6 (pending legal) |
| Per-class default channel preferences (where §16.2 unset) | C-2 | Phase 3 §16.2 |
| Edit-session idle timeout | §8.4 | not specified by baseline |
| Legal content (UPL/privilege/residency/advertising wording) | throughout | L2/L3/L4/L7 (counsel) |

**No slot is filled with an invented value.** Each is a marked placeholder to be resolved by the owner, counsel, or the Rules Engine.

---

## 10. Flags surfaced in WP-1 (genuine questions, not decided)

1. **A3 handoff semantics** — §8.4: soft-lock is derivable; a decision is needed *only* if a single-designated-editor restriction is intended. Carried to WP-2, escalated to the Deferred/Requires-Decision register only if it proves material.

No other WP-1 flag rises to a required decision. All other unknowns are design slots (§9) or already-decided constraints.

---

## 11. Traceability — journey stage → baseline

| Stage | Phase 5 | Phase 4 IA | ADR / Phase 3 | Decision Log | Key constraint |
|---|---|---|---|---|---|
| J-A discovery | F1 | §4, IA-8, §13.1 | FR-S01, FR-C01, FR-S11 | — | Z1/Z2 boundary legible |
| J-B account | F2 | §5 | J1 | D-2026-015 (A1) | account≠workspace |
| J-C workspace | F3 | §5, IA-5 | §4.1 | D-2026-015 (A1) | workspace on first disclosure |
| J-D disclosure | F4 | §5, §15.1 | M1.2, FR-D02/03, §12.1, D2 | D-2026-015 (A3) | Z1 from keystroke; sequential edit |
| J-E request | F5 | §13.1 | ADR §7, §9; §12.4 | D-2026-017 (no gate) | free; committed turnaround |
| J-F lifecycle | F6/F7/F8/F23 | §16, §17.2 | ADR §4/5/6/9, BR-01/02/20, M1.3 | — | review gate; provenance; review grant |
| J-G verdict | F9 | §16, §15.2, §11.6 | BR-02, §12.5 | — | three depths; provenance fail-safe |
| J-H not file | F10 | §11.2, §15.1 | ADR §7, BR-09 | — | first-class; alternatives equal weight |
| J-I decide file | F11 | §17.2 | — | — | Owner-only; no escalation |
| J-J matching | F14 | §21, §11.4 | BR-06/10/17, M1.5 | D-2026-019, O-2026-001 | conflict-first; n≥20; price component |
| J-K engagement | F15 | §21 | P6/D4, BR-06, ADR §11 | O-2026-001 | payment after free assessment |
| J-L filing | F16 | §6, §11.3/11.4 | D1, §18, BR-09/T3, M0.10 | D-2026-016 (boundary) | agent files; deadlines computed |
| J-M tracking | F19 | §15.3, §19.4, IA-9 | D1, §20.3, NFR-A05 | — | silence view; staleness honesty |
| J-N responding | §9-A | §11.3 | AP-07, §18 (deadline) | D-2026-016 | status-only; agent off-platform |
| C-1 comms | F17 | §18.1 | M1.6, ADR §6 | D-2026-015 (A2) | matter-confined; no reviewer channel |
| C-2 notifications | F18 | §18.2/18.3 | §16.2/16.3/16.5 | — | classes fixed; Critical unmutable |
| C-3 returning | F20 | §18.1, §6, §2.3 | J7 | — | action queue; Today; context switch |
| J-S1 onboarding | F21 | §6 | M4.3, §26 D6, ADR §5 | — | verify before Z1 access |
| J-S2 import | F22 | §6.1 | M2.1, D1, ICP-2 | — | docket first |
| J-S3 review | F23 | §6.1 | BR-01, §12.5, FR-A08, ADR §6 | — | throughput-critical; distinct rhythm |
| J-S4 opportunity | F14/F16 | §6 | M1.5, BR-10 | O-2026-001 | conflict-checked; fee display [L1] |

---

*End of Phase 6 — WP-1 (v0.1). Working document. Awaiting owner review before WP-3.*
