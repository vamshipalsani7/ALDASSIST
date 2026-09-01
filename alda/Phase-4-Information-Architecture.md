# Phase 4 — Information Architecture

**Baseline:** Phase 3 is frozen. Every structure below traces to a Phase 3 module, entity, role or business rule.
**L1 assumption in force:** unified customer experience; three internally independent fee components (platform · professional · official); commercial model configurable, never hardcoded. Every affected surface is tagged **`[L1]`** and registered in §21.
**Confirmed:** Drafting Workspace (M2.2) is V2.
**Date:** 24 July 2026

---

## Contents

| § | Section |
|---|---|
| 1 | IA principles |
| 2 | The organizing model |
| 3 | Global sitemap overview |
| 4 | Public surface — sitemap |
| 5 | Client application — sitemap |
| 6 | Professional (agent) application — sitemap |
| 7 | Institutional application — sitemap |
| 8 | Internal operations — sitemap |
| 9 | URL architecture |
| 10 | Controlled vocabulary & labelling system |
| 11 | Status taxonomy |
| 12 | Navigation systems |
| 13 | Findability & search IA |
| 14 | Template inventory |
| 15 | Object page architecture |
| 16 | Progressive disclosure model |
| 17 | Permissions-aware IA |
| 18 | Action queue & notification IA |
| 19 | Empty, first-run & error states |
| 20 | Responsive & mobile IA |
| 21 | Pricing IA and the L1 dependency register |
| 22 | Accessibility IA |
| 23 | SEO IA |
| 24 | Content model & metadata |
| 25 | IA governance & extensibility |
| 26 | What Phase 5 inherits |

---

## 1. IA principles

Derived from Phase 3 constraints. Each forecloses a design option.

| # | Principle | Forbids |
|---|---|---|
| **IA-1** | **The Invention is the spine.** Every client-facing structure organizes around Inventions, with Applications as their jurisdictional children. | An application-first navigation, which would make the pre-filing stage a second-class citizen. |
| **IA-2** | **Two questions, always answered, on every object screen: where is this, and what does it need from me?** | Screens that show state without obligation, or obligation without context. |
| **IA-3** | **Plain language leads; official language follows in the same view — never replaces it.** | Renaming a concept the user will meet in official correspondence. If IP India's letter says "First Examination Report," that phrase appears on the screen that discusses it. |
| **IA-4** | **Depth is available, never imposed.** Three fixed depths (§16): status → reasoning → evidence. | Burying the verdict under methodology; also, hiding methodology entirely. |
| **IA-5** | **Existence across a tenancy boundary is itself confidential.** | Redacted stubs, hidden counts, "3 items you can't see." Show nothing. |
| **IA-6** | **Maximum two levels of navigation depth.** | Megamenus. (Phase 1 §4.1 — the Questel/Anaqua failure.) |
| **IA-7** | **Every price is rendered by one component in one of two configured modes.** | Any screen composing a price from its own logic. `[L1]` |
| **IA-8** | **Free surfaces require no account; the account gate sits at ongoing value, not at first value.** | Gating search, the cost planner, or any read of the public register. |
| **IA-9** | **Silence is a state that must be represented.** "Nothing has happened, here is what that means, here is when to expect the next thing" is a designed view, not an empty one. | Blank screens during multi-year quiet periods. |
| **IA-10** | **Labels come from the controlled vocabulary (§10). No screen invents terminology.** | Synonyms drifting across surfaces ("matter" here, "case" there, "job" elsewhere). |

---

## 2. The organizing model

### 2.1 Two axes, two contexts

Phase 1 concluded the answer is **segment × lifecycle**. These do not apply equally in both contexts:

| Context | Primary axis | Why |
|---|---|---|
| **Unauthenticated** | **Segment** (who are you?), with lifecycle as a secondary entry | A stranger cannot place themselves on a lifecycle they don't understand. They can identify as a startup founder. |
| **Authenticated** | **Lifecycle** (where is my thing?) | Once inside, the user has a specific object in a specific state and a specific next action. Segment is already known. |

A **router** (`/find-your-path`) serves people who can place themselves on neither axis. This is the Dennemeyer "IP Solution Finder" pattern from Phase 1, corrected: it returns a real recommendation and a real cost range, and it does not require an email to do so.

### 2.2 The lifecycle spine

Every authenticated structure is an expression of this sequence:

```
IDEA ─► RECORDED ─► ASSESSED ─► DECIDED ─► FILED ─► EXAMINED ─► GRANTED ─► MAINTAINED
                                    │
                                    └─► NOT PURSUED  (a real, designed destination — not a dead end)
```

**"Not pursued" is a first-class state with its own screens.** The Invention persists in the Vault, remains monitored, and can re-enter the flow when it evolves or when the art changes. Phase 2 §3.3 requires that honest verdicts be a good experience, and IA is where that promise is either kept or broken.

### 2.3 Surface separation

Five distinct surfaces, each with its own IA, sharing a design system and a vocabulary:

| Surface | Root | Audience | Auth |
|---|---|---|---|
| **Public** | `/` | Anonymous, Free, prospects, search traffic | None or Free |
| **Client app** | `/app` | Workspace roles, Named Inventors | Required |
| **Agent app** | `/agent` | Verified Agent, Agent Org Admin | Required + MFA |
| **Institution app** | `/institution` | TTO Officer, Institution Admin, Approver | Required + MFA |
| **Operations** | `/ops` | Internal roles | Required + MFA + justification |

A user holding multiple roles switches surfaces through an explicit **context switcher**, never through implicit blending. An agent who is also an inventor has two contexts and sees one at a time. This is a confidentiality requirement (P6), not a preference.

---

## 3. Global sitemap overview

```
PUBLIC  /
├── Search                    ← the wedge; top-level, not under "Tools"
├── Solutions                 ← two-axis: by stage / by who you are
├── Pricing                   ← real numbers  [L1]
├── Learn                     ← guides, glossary, reports
├── For Agents                ← supply side is first-class
├── Tools                     ← cost planner, path finder
├── Trust                     ← security, AI policy, limits, disclaimers
└── Company

CLIENT  /app
├── Home            (action queue)
├── Inventions      (the Vault — pre-filing spine)
├── Portfolio       (filed applications — post-filing spine)
├── Deadlines
├── Matters
├── Costs                     [L1]
├── Documents
└── Settings

AGENT  /agent
├── Today
├── Docket
├── Matters         (platform + own practice)
├── Opportunities
├── Practice        (profile, outcomes, earnings, capacity)
└── Settings

INSTITUTION  /institution
├── Overview
├── Disclosures     (intake pipeline)
├── Approvals
├── Portfolio
├── Budget                    [L1]
├── Policy          (ownership rules, IP policy)
└── Settings

OPERATIONS  /ops
├── Docket Health   ★
├── Quality
├── Marketplace
├── Rules
├── Trust & Incidents
└── Business
```

Seven or fewer top-level items per surface. No surface exceeds two levels of navigation depth (IA-6).

---

## 4. Public surface — sitemap

```
/                                    Home
│
├── /search                          Patent search  ← M1.1
│   ├── /search?q=…                  Results
│   └── /patents/{jur}/{number}      Document page  ← SEO crown jewel
│       ├── #overview                 Bibliographic, abstract, plain-language summary
│       ├── #claims                   Claims, structured
│       ├── #description              Full text
│       ├── #status                   Legal status timeline + source + freshness
│       ├── #family                   Related filings across jurisdictions
│       ├── #citations                Cited / cited-by
│       └── #documents                Retrievable official documents
│
├── /solutions
│   ├── /solutions/idea-stage             "I have an idea"
│   ├── /solutions/ready-to-file          "I want to file"
│   ├── /solutions/application-pending    "I've already filed"
│   └── /solutions/patent-portfolio       "I own patents"
│
├── /for
│   ├── /for/startups
│   ├── /for/universities
│   ├── /for/companies
│   ├── /for/researchers
│   ├── /for/inventors
│   └── /for/patent-agents           → also reachable from top-level "For Agents"
│
├── /pricing                         [L1]
│   ├── #services                    Fixed-price service catalogue
│   ├── #official-fees               Government fees, by entity type
│   └── #what-affects-price          Honest explanation of variance
│
├── /tools
│   ├── /tools/cost-planner          M1.4 — ungated, no email gate
│   └── /find-your-path              The router
│
├── /learn
│   ├── /learn/guides/{slug}         Pillar guides
│   ├── /learn/glossary              Index
│   ├── /learn/glossary/{term}       Individual term  ← vocabulary + SEO
│   ├── /learn/jurisdictions/{jur}   Jurisdiction guides
│   └── /learn/reports/{slug}        Original research (Phase 2 §21: build for citation, not ranking)
│
├── /agents                          Public directory of Verified Agents
│   └── /agents/{slug}               Public agent profile  ← M2.4
│
├── /trust
│   ├── /trust/security
│   ├── /trust/ai                    Model providers named; no-training pledge
│   ├── /trust/limitations           What we can and cannot do
│   ├── /trust/subprocessors
│   └── /trust/status
│
├── /company  · /company/about · /company/careers · /company/contact
│
└── /legal    · /legal/terms · /legal/privacy · /legal/disclaimer
```

### 4.1 Explicit exclusions

| Not building | Reason |
|---|---|
| Location permutation pages (`/patent-registration-in-{city}` × 40) | Phase 1 §3.1 identified these as a thin-content liability and a premium-brand killer |
| Gated tools | IA-8; Phase 1 identified gating as the mistake that destroys a calculator's trust value |
| A blog separate from `/learn` | Fragments authority; one content hub |
| Testimonial carousels as a page type | Phase 2 §5.3 — replaced by verifiable artifacts (outcome data, named reviewers, published benchmarks) |

### 4.2 The document page is the SEO strategy

`/patents/{jur}/{number}` will be the highest-volume page type by orders of magnitude. It must earn its indexation:

- **Genuine added value over the official register:** structured claims, legal-status timeline, family view, citation graph, retrievable documents, and a clearly-labelled plain-language summary (Tier 0 AI on published documents — permitted under Phase 3 §12.1).
- **Generated on first request and cached**, not pre-generated across the entire corpus. This avoids publishing millions of thin pages before anyone has asked for them.
- **Source and freshness stamped** on every field (FR-S05).
- **The confidentiality warning** (FR-S11) appears contextually: if a user's query pattern suggests they are searching their own unpublished invention, surface the warning and route them to the Vault.

---

## 5. Client application — sitemap

```
/app                                 Home — action queue
│
├── /app/inventions                  Index: all Inventions
│   ├── /app/inventions/new          Create
│   └── /app/inventions/{id}         ★ Invention detail (§15.1)
│       ├── /disclosure              Current disclosure
│       ├── /disclosure/versions     Version history (evidence of conception)
│       ├── /disclosure/edit         Guided capture flow
│       ├── /assessments             All assessments for this Invention
│       ├── /assessments/{aid}       ★ Assessment detail (§15.2)
│       ├── /applications            Applications derived from this Invention
│       ├── /decisions               Recorded decisions and rationale
│       └── /documents
│
├── /app/portfolio                   Index: all Applications
│   ├── ?view=list|family|timeline|map
│   └── /app/portfolio/{appId}       ★ Application detail (§15.3)
│       ├── /status                  Timeline of events
│       ├── /deadlines
│       ├── /documents
│       ├── /costs                   [L1]
│       ├── /renewals                (V2)
│       └── /invention               → back to the parent Invention
│
├── /app/deadlines                   ?view=calendar|list  ·  ?range=  ·  ?criticality=
│   └── /app/deadlines/{id}          Detail + computation trace (§16 depth 3)
│
├── /app/matters                     Index: professional engagements
│   └── /app/matters/{id}            ★ Matter workspace (§15.4)
│       ├── /activity                Timeline + messages
│       ├── /documents
│       ├── /decisions               Decisions requested of the client
│       └── /costs                   [L1]
│
├── /app/costs                       [L1]
│   ├── /app/costs/summary           Spend to date, committed, forecast
│   ├── /app/costs/invoices          [L1]
│   └── /app/costs/forecast          20-year projection across the portfolio
│
├── /app/documents                   All documents, searchable, filterable
│
├── /app/find-an-agent               Marketplace entry  ← M1.5
│   ├── /app/find-an-agent/results
│   └── /app/find-an-agent/{agentId}/quote     [L1]
│
└── /app/settings
    ├── /profile · /workspace · /members · /notifications
    ├── /billing                     [L1]
    ├── /security                    (MFA, sessions, access log)
    └── /data                        (export, retention, deletion)
```

### 5.1 Why Inventions and Portfolio are separate top-level items

They are the same spine at two lifecycle phases, and separating them is deliberate:

- **Inventions** = things I have, some of which are protected. The pre-filing and decision surface. Contains "not pursued" items that have no Application and never will.
- **Portfolio** = things I have protected. The post-filing operational surface, organized by jurisdiction and deadline.

Merging them would force a first-time inventor (one idea, no filings) and an IP head (forty grants, three disclosures) into the same view, which serves neither. Each links to the other on every detail page (§15).

---

## 6. Professional (agent) application — sitemap

```
/agent                               Today — risk-ranked queue
│
├── /agent/docket                    ?view=calendar|list  ·  all matters, all sources
│   └── /agent/docket/{deadlineId}   Detail + confirmation action
│
├── /agent/matters                   ?source=platform|own  ·  ?state=
│   ├── /agent/matters/import        Bring existing practice matters in  ← the adoption unlock
│   └── /agent/matters/{id}
│       ├── /brief                   Disclosure + assessment + client context
│       ├── /draft                   Drafting Workspace  (V2 — M2.2)
│       ├── /prosecution             Prosecution Workspace (V2 — M2.3)
│       ├── /deadlines
│       ├── /documents
│       ├── /client                  Communication thread
│       └── /billing                 [L1]
│
├── /agent/reviews                   Assessment review queue  ← BR-01 gate
│   └── /agent/reviews/{id}          Review, edit, release
│
├── /agent/opportunities             Available marketplace matters
│   └── /agent/opportunities/{id}    Scope, fee, conflict status, accept/decline  [L1]
│
├── /agent/practice
│   ├── /profile                     Public-facing profile  ← M2.4
│   ├── /outcomes                     Own statistics, with n, before clients see them
│   ├── /capacity                    Availability, specializations, limits
│   └── /earnings                    [L1]
│
└── /agent/settings
```

### 6.1 The two structural decisions here

**1. `/agent/matters/import` is a primary destination, not a settings action.**
Phase 3 J6 established that agents adopt the docket for their own 45 matters before they take a marketplace matter. Import must be reachable from the empty state, the onboarding flow, and the matters index — not buried.

**2. `/agent/reviews` is a separate destination from `/agent/matters`.**
Assessment review (BR-01) is a distinct work type with distinct rhythm: short, frequent, queue-based, often on matters the agent is not otherwise engaged on. Mixing it into the matter list would bury it, and BR-01 makes it the throughput-critical gate for the entire client experience.

---

## 7. Institutional application — sitemap (V2)

```
/institution                         Overview
│
├── /institution/disclosures         Intake pipeline  ← M3.1
│   ├── ?stage=submitted|triage|assessment|approval|filing
│   ├── ?unit=   ?risk=publication-conflict
│   └── /institution/disclosures/{id}
│       ├── /review                  TTO triage
│       ├── /ownership               Determination  ← M3.2
│       ├── /publication-risk        ★ Conflict detection — the differentiating view
│       └── /assessment
│
├── /institution/approvals           Routed approval queue
│   └── /institution/approvals/{id}  Decision + budget context  [L1]
│
├── /institution/portfolio           Institutional applications
│   └── ?unit=  ?inventor=  ?funder=
│
├── /institution/budget              [L1]
│   ├── /allocation                  By unit
│   ├── /commitments
│   └── /forecast
│
├── /institution/policy
│   ├── /ownership-rules             Encoded institutional IP policy
│   ├── /funders                     Funding-agency terms
│   └── /approval-routing
│
├── /institution/people              Researchers, units, roles
│
└── /institution/settings
```

### 7.1 Researcher access is not a sixth surface

A faculty researcher (ICP-3) uses the **client app** (`/app`) scoped to their own Inventions, with the Institution as owner. They see their own work; they never see `/institution`. This is the Party_Invention_Role model from Phase 3 §14 expressed in IA: *inventor* and *owner* are different roles on the same object, and they get different surfaces.

`/institution/publication-risk` is the view that justifies the whole module. It should be reachable in one click from the Overview.

---

## 8. Internal operations — sitemap

```
/ops
├── /ops/docket                      ★ Docket Health Console — the most important internal screen
│   ├── /unconfirmed                 Critical deadlines awaiting confirmation
│   ├── /discrepancies               Source conflicts requiring human resolution
│   ├── /undelivered                 Failed critical notifications
│   └── /escalations
│
├── /ops/quality
│   ├── /ai                          Edit rate, severity, eval results, regressions
│   ├── /agents                      Outcome quality
│   └── /samples                     Review sampling queue
│
├── /ops/marketplace
│   ├── /verification                Agent credential review
│   ├── /supply                      Capacity by domain
│   ├── /conflicts
│   └── /disputes
│
├── /ops/rules                       ★ Rule Authoring Console
│   ├── /{jurisdiction}
│   ├── /{jurisdiction}/{ruleId}     Editor + source citation + version history
│   ├── /tests                       Golden case suites
│   └── /impact                      Pre-publication impact report across live portfolio
│
├── /ops/trust
│   ├── /incidents · /access-requests · /data-requests
│
└── /ops/business                    The four Phase 2 headline metrics
```

`/ops/docket` is the default landing page for the Operations surface. Nothing else competes for that position.

---

## 9. URL architecture

### 9.1 Rules

| # | Rule |
|---|---|
| U1 | Lowercase, hyphenated, no trailing slash |
| U2 | Nouns for collections, identifiers for members: `/app/inventions/{id}` |
| U3 | Public content URLs are permanent; changes require 301s and are logged |
| U4 | Application URLs are stable and deep-linkable — every view has an address |
| U5 | View state that a user would share or bookmark lives in query params, not in client state |
| U6 | Never place identifying or confidential data in a URL (Phase 3 NFR-S06) |
| U7 | App URL structure mirrors API resource structure (Phase 3 §21.1, internal-first) |
| U8 | Jurisdiction is a path segment, never a subdomain or a query param — supports the jurisdiction-agnostic model (D1) |

### 9.2 Identifier strategy

| Object | URL form | Rationale |
|---|---|---|
| Invention | Opaque ID | Titles are confidential; slugs would leak |
| Application | Opaque internal ID in `/app`; official number in `/patents` | Internal vs public separation |
| Public patent document | `/patents/{jurisdiction}/{official-number}` | Canonical, guessable, citable, stable |
| Matter | Opaque ID | Confidential |
| Agent public profile | `/agents/{slug}` | Public, SEO-relevant, person-chosen |
| Guide / glossary | `/learn/guides/{slug}` · `/learn/glossary/{term}` | SEO |

### 9.3 Query parameter conventions

Standardized across all index views so filters behave identically everywhere:

`?view=` · `?q=` · `?status=` · `?jurisdiction=` · `?range=` · `?sort=` · `?page=` · `?unit=` · `?criticality=` · `?source=`

---

## 10. Controlled vocabulary & labelling system

This is the highest-leverage artifact in Phase 4. The domain is a jargon minefield, and inconsistent labelling is the fastest way to make a premium product feel amateur.

### 10.1 The dual-register rule (IA-3)

**Plain language leads. The term of art appears in the same view, once, bound to the plain term.** We never rename a concept the user will encounter in official correspondence, because the moment IP India's letter arrives using a word our product has hidden, we have created confusion instead of clarity.

Pattern: **"Examination report (First Examination Report / FER)"** on first use per screen, then "examination report" thereafter.

### 10.2 The lexicon

| Concept | Client UI label | Agent UI label | Term of art shown | Never use |
|---|---|---|---|---|
| Existing published work | **Existing publications** → then *prior art* | Prior art | prior art | "competition", "similar patents" |
| The application document | **Application document** | Specification | complete specification / provisional specification | "the patent" (before grant) |
| Claims | **Claims** | Claims | — | Do not rename; explain instead |
| Examination correspondence | **Examination report** | FER / office action | First Examination Report (FER) | Bare "FER" without expansion |
| The examination process | **Examination** | Prosecution | — | **"Prosecution" in client UI** — reads as criminal to laypeople |
| Filing abroad | **Filing in other countries** | National phase entry | national phase | "going global" |
| Priority date | **Priority date** | Priority date | — | Do not rename; core concept, teach it |
| Novelty | **Is it new?** → then *novelty* | Novelty | novelty | "originality" |
| Inventive step | **Is it an obvious step?** → then *inventive step* | Inventive step | inventive step / non-obviousness | "uniqueness" |
| Owner | **Owner** | Applicant / Assignee | applicant, assignee | Mixing the three loosely |
| Deadline set | **Deadlines** | Docket | docket | **"Docket" in client UI** |
| Renewal fee | **Renewal fee** | Annuity | annuity, renewal fee | "subscription" |
| Ceasing maintenance | **Stop maintaining** → outcome: *lapsed* | Abandonment / lapse | abandonment | "cancel" — implies reversibility |
| Freedom to operate | **Can I launch this?** → then *FTO* | FTO | freedom to operate | — |
| Statutory exclusion | **Not patentable in this country** | s.3(k) / s.3(d) exclusion | the section reference | Hiding the section reference from agents |
| Professional engagement | **Matter** | Matter | — | "case", "job", "project", "ticket" |
| Invention record | **Invention** | Invention | — | "idea" (after recording), "IP", "asset" |
| Disclosure document | **Disclosure** | Disclosure | invention disclosure | "form", "submission" |
| Assessment | **Assessment** | Assessment | patentability opinion | "report", "analysis", "search" alone |

### 10.3 Terms banned platform-wide

| Banned | Why |
|---|---|
| "Success rate" | Unverifiable; Phase 1 identified it as the defining credibility failure of the Indian cluster |
| "Guaranteed" (of any outcome) | We cannot guarantee grant; using it anywhere poisons the terms we can stand behind |
| "Instant" / "in seconds" (of assessment) | Phase 3 §12 requires human review; the claim would be false |
| "Affordable" / "cheap" | Phase 2 §5.3 — price-anchoring positions us as the low tier |
| "AI-powered" as a standalone claim | Phase 2 §21 — publish benchmarks, not adjectives |
| "Simply" / "just" / "easy" | Patronizing in a domain where the user's uncertainty is rational |

### 10.4 Action verb standardization

One verb per action, everywhere:

**Record** (a disclosure) · **Assess** (an invention) · **Engage** (an agent) · **File** (an application) · **Respond** (to an examination report) · **Confirm** (a deadline) · **Decide** (renew / stop) · **Release** (an assessment, agent-side) · **Import** (existing matters)

### 10.5 Vocabulary governance

The lexicon is a versioned artifact owned jointly by product and content. New concepts require an entry before they appear in any interface. Every glossary term at `/learn/glossary/{term}` is generated from the same source, so the public glossary and the in-product tooltips can never disagree.

---

## 11. Status taxonomy

### 11.1 The two-axis principle

Users conflate two different questions: *where is this in the process* and *does it need me*. The IA separates them into orthogonal axes displayed together.

```
                    ATTENTION AXIS
                    ─────────────────────────────────────
    LIFECYCLE       On track  │  Action needed  │  At risk
    AXIS            ──────────┼─────────────────┼──────────
    Filed              ✓      │       ●         │    ▲
    Published          ✓      │       ●         │    ▲
    Under exam         ✓      │       ●         │    ▲
    …
```

Every object carries one lifecycle state and one attention state. Filters operate on each independently.

### 11.2 Invention states

| State | Meaning | Next action surfaced |
|---|---|---|
| **Drafting** | Disclosure started, incomplete | Continue recording |
| **Recorded** | Disclosure complete and timestamped | Request assessment |
| **Assessing** | Assessment running or in review | — (progress shown) |
| **Assessed** | Verdict released | Decide |
| **Filing** | Engagement active, not yet filed | Track matter |
| **Protected** | ≥1 live Application | View portfolio |
| **Not pursued** | Decided against filing | Re-assess / revisit |
| **Lapsed** | All Applications closed | Archive / re-file if possible |

### 11.3 Application states — user-facing over official

The official Indian status vocabulary is fragmented and inconsistent. We present **seven user-facing states** with the official sub-status always visible beneath (IA-3), never replaced.

| User-facing state | Covers | Official sub-status shown |
|---|---|---|
| **Filed** | Submitted, formalities pending | *As recorded by the office* |
| **Published** | Now public | Publication date, journal reference |
| **Awaiting examination** | RFE due or filed, queued | RFE status, queue position where available |
| **Under examination** | With the examiner | — |
| **Responding** | Examination report issued, response due or in progress | FER date, response deadline |
| **Granted** | Patent granted | Grant number, date, renewals active |
| **Closed** | Ended | **Reason mandatory:** abandoned · refused · withdrawn · lapsed · opposed-and-revoked |

**"Closed" never appears without its reason.** A user must never see a terminal state without knowing why, and whether anything can be done.

### 11.4 Matter states

**Quoted** `[L1]` → **Engaged** → **In progress** → **Awaiting you** → **Awaiting the office** → **Complete** → **Closed**

"Awaiting you" and "Awaiting the office" are deliberately distinct — the single most common client question is *whose turn is it?*

### 11.5 Deadline states

| State | Visual weight | Behaviour |
|---|---|---|
| **Upcoming** | Low | Listed |
| **Approaching** | Medium | Alert ladder active |
| **Due** | High | Prominent on Home |
| **Confirmed** | Neutral | Human confirmation recorded (BR-03) |
| **Met** | Low | Historical |
| **Missed** | Critical | Escalated; incident record; client notified |
| **Superseded** | Low | Recomputed; diff available |
| **Not applicable** | Hidden by default | Rule ceased to apply |

### 11.6 Assessment verdicts

| Verdict | Label | IA requirement |
|---|---|---|
| Favourable | **Looks protectable** | Confidence + basis + next steps |
| Qualified | **Protectable with changes** | The specific changes, and what they cost |
| Unfavourable | **Unlikely to be protectable** | ★ Blocking references shown; **alternatives given equal visual weight** |
| Inconclusive | **Not enough to assess** | What's missing, how to supply it |

The unfavourable verdict is the most carefully designed screen in the product (Phase 2 §3.3, §6.2). It gets the blocking references, the reasoning, and four alternatives — design around · keep as a trade secret · publish defensively · defer and re-assess — presented as options, not consolation.

---

## 12. Navigation systems

### 12.1 The five systems

| System | Purpose | Where |
|---|---|---|
| **Global** | Move between top-level areas | Persistent, all surfaces |
| **Local** | Move within an area | Sidebar or tabs, context-dependent |
| **Contextual** | Move between related objects | Inline within content (§12.5) |
| **Supplemental** | Recover position and history | Breadcrumbs, recently viewed |
| **Utility** | Account, context switch, help, search | Persistent, right-aligned |

### 12.2 Public global navigation

```
[Mark]   Search   Solutions ▾   Pricing   Learn   For Agents        [Sign in]  [Start free]
```

- **Six items maximum.** Search is first and is a destination, not a dropdown.
- **One dropdown only** (Solutions), two columns, maximum eight items total, no third level (IA-6).
- **Pricing is top-level with real numbers behind it** — Phase 1 found almost nobody in this industry does this; it is a differentiator by itself. `[L1]`
- **"For Agents" is top-level** because the supply side is a first-class audience (Phase 2 §8).
- **"Trust" lives in the footer, not the header** — it must exist and be linked from every page, but a headline link to it invites suspicion rather than allaying it.

### 12.3 Client application navigation

```
┌─────────────────────────────────────────────────────────────┐
│ [Mark]   [⌕ global search]        [context ▾] [⚑ 3] [avatar]│
├──────────┬──────────────────────────────────────────────────┤
│ Home     │                                                   │
│ Inventions│                                                   │
│ Portfolio │              content                              │
│ Deadlines │                                                   │
│ Matters   │                                                   │
│ Costs     │                                                   │
│ Documents │                                                   │
│ ─────────│                                                   │
│ Settings  │                                                   │
└──────────┴──────────────────────────────────────────────────┘
```

- Seven primary items. Settings visually separated.
- **The attention badge `⚑`** shows the count of items in "Needs you" (§18) and is reachable from every screen in one click (IA-2).
- **Global search** reaches Inventions, Applications, Matters, Documents and the public register from one input, with scoped result groups (§13.2).
- **Context switcher** appears only for users holding roles on multiple surfaces.

### 12.4 Agent application navigation

```
Today · Docket · Matters · Reviews · Opportunities · Practice        [⚑] [avatar]
```

Six items. **Today** is the default landing page — Phase 3 J7 establishes that an agent's session begins with "what must I do today," not with browsing.

### 12.5 Contextual navigation — the relationship graph

The most under-designed navigation layer in competitor products. Every object detail page exposes its relationships as first-class navigation:

| From | Always links to |
|---|---|
| **Invention** | Its Disclosure versions · its Assessments · its Applications · its Matters · its Documents |
| **Application** | Its parent Invention · its Family siblings · its Deadlines · its Matter · its Documents · its Costs `[L1]` |
| **Assessment** | Its Invention · its Disclosure version · every cited Document · its Reviewer · resulting Decisions |
| **Matter** | Its Invention · its Application(s) · its Agent · its Deadlines · its Documents · its Costs `[L1]` |
| **Deadline** | Its Application · its Matter · its computation trace · the governing Rule (agents and ops only) |
| **Document** | Every object that references it · its version history · its access log |

**The rule:** from any object, every directly related object is reachable in one click. This is what makes the Record navigable rather than merely stored, and it is the IA expression of Phase 3's "the integration is the product."

### 12.6 Breadcrumbs

Present on all detail pages, reflecting the object hierarchy rather than click history:

`Inventions › Adaptive Signal Filter › Assessment · 14 Mar 2026`
`Portfolio › IN 202441012345 › Deadlines › Response to examination report`

---

## 13. Findability & search IA

*Phase 3 §17 covers retrieval mechanics. This covers how users find things.*

### 13.1 Four distinct search contexts

| Context | Scope | Entry | Zone |
|---|---|---|---|
| **Public register search** | Zone 2 corpus | `/search` | 2 |
| **Global app search** | User's own objects | Header input, `⌘K` | 1 |
| **Scoped search** | Within one index or object | In-page input | 1 |
| **Assessment retrieval** | Zone 2, driven by Zone 1 input | Not user-facing; runs inside M1.3 | 1→2 |

**The confidentiality boundary must be legible in the UI, not merely enforced in the backend** (Phase 3 §17.5). The public search input and the app search input are visually and behaviourally distinct, and the public one carries the FR-S11 warning. A user must never be able to type their unpublished invention into a box they believe is private but isn't.

### 13.2 Global app search result grouping

Fixed order, because consistent ordering is what makes a search box learnable:

```
Inventions   →  Applications  →  Matters  →  Documents  →  Deadlines  →  Public register
```

Each group capped at five with "see all." The public register group is always last and always labelled as external to the workspace.

### 13.3 Filtering and faceting

Standardized facets across every index view:

| Index | Facets |
|---|---|
| Inventions | State · technical domain · date recorded · has applications |
| Portfolio | Lifecycle state · attention state · jurisdiction · family · agent · renewal due |
| Deadlines | Criticality · state · date range · jurisdiction · application |
| Matters | State · agent · invention · date |
| Documents | Type · matter · application · date · source |
| Public search | Jurisdiction · date · applicant · inventor · classification · legal status |

**Rules:** facets reflect in the URL (U5) · counts shown per facet value · zero-result facet values hidden, not shown as disabled · applied filters always visible as removable chips with a single "clear all."

### 13.4 Sort defaults

| Index | Default sort | Rationale |
|---|---|---|
| Home action queue | Deadline proximity, then criticality | Urgency governs |
| Inventions | Last modified | Work in progress first |
| Portfolio | Next deadline | The operational question |
| Deadlines | Due date | — |
| Matters | Last activity | — |
| Public search | Relevance | — |

---

## 14. Template inventory

Every screen in the product is an instance of one of these. Phase 5 flows and Phase 6 wireframes work from this list.

### 14.1 Public templates

| # | Template | Regions | Primary action |
|---|---|---|---|
| PT-1 | **Home** | Hero · what we do (three layers) · proof · path finder entry · footer | Start free / Search |
| PT-2 | **Segment landing** (`/for/*`) | Segment framing · relevant capabilities · pricing pointer `[L1]` · path finder | Start free |
| PT-3 | **Stage landing** (`/solutions/*`) | Stage framing · what happens here · what it costs `[L1]` · next step | Contextual to stage |
| PT-4 | **Search** | Query input · facet rail · results · confidentiality notice | Open document |
| PT-5 | **Patent document** ★ | Bibliographic header · tabbed sections · family · citations · documents · freshness stamp | Save / alert |
| PT-6 | **Pricing** `[L1]` | Service catalogue · official fees · what affects price · calculator entry | Start / calculate |
| PT-7 | **Tool** | Input · live output · export · no gate (IA-8) | Use output |
| PT-8 | **Guide article** | Article · TOC · related · glossary inline links | Related action |
| PT-9 | **Glossary term** | Definition · plain + term of art · usage · related terms | — |
| PT-10 | **Agent public profile** | Credentials · background · specializations · outcomes with n · availability | Engage `[L1]` |
| PT-11 | **Trust page** | Structured disclosure content | — |
| PT-12 | **Path finder** | Question sequence · recommendation · cost range `[L1]` | Recommended action |

### 14.2 Application templates

| # | Template | Regions | Notes |
|---|---|---|---|
| AT-1 | **Action queue home** | Needs you · waiting on others · recent changes · portfolio glance | The most-visited authenticated screen |
| AT-2 | **Object index** | Filter rail · view switcher · list/grid/calendar · bulk actions · empty state | One template, six instances |
| AT-3 | **Object detail** ★ | Identity header · status pair · next action · tabbed sections · relationship rail | §15 |
| AT-4 | **Guided flow** | Progress · one question group per step · save-and-resume · review | Disclosure capture, path finder, onboarding |
| AT-5 | **Two-pane workspace** | Source pane · work pane · shared toolbar | Assessment review, drafting (V2), prosecution (V2) |
| AT-6 | **Calendar** | Month/quarter/list · criticality colouring · filter rail | Deadlines, renewals |
| AT-7 | **Report view** | Structured read-only output · export · provenance links | Assessment output, cost projection |
| AT-8 | **Settings** | Section nav · form groups · destructive actions isolated | — |
| AT-9 | **Console** (ops) | Dense table · saved views · inline actions · escalation | Internal only |

### 14.3 Template governance

New templates require justification against this list. If a screen cannot be expressed as an instance of an existing template, either the template list is incomplete or the screen is doing too much — and it is usually the latter.

---

## 15. Object page architecture

Three object pages carry most of the product. Each follows the same skeleton:

```
┌────────────────────────────────────────────────────────────┐
│  IDENTITY      title · identifier · owner                  │
│  STATUS PAIR   [lifecycle state]  [attention state]        │  ← IA-2
│  NEXT ACTION   the single most important thing to do now   │
├────────────────────────────────────────────────────────────┤
│  TABS          section navigation                          │
├──────────────────────────────────────┬─────────────────────┤
│                                       │  RELATIONSHIP RAIL │
│           SECTION CONTENT             │  every directly     │
│                                       │  related object,    │
│                                       │  one click (§12.5)  │
└──────────────────────────────────────┴─────────────────────┘
```

### 15.1 Invention detail — `/app/inventions/{id}`

| Region | Content |
|---|---|
| Identity | Title · technical domain · recorded date · inventors |
| Status pair | Invention state (§11.2) + attention |
| Next action | Contextual: *Continue recording* · *Request assessment* · *Decide* · *Find an agent* · *View applications* |
| **Tabs** | Overview · Disclosure · Assessments · Applications · Decisions · Documents |
| Overview | Plain-language summary · timeline of the invention's own history · protection status across jurisdictions |
| Disclosure | Current version, with version history and the conception-evidence trail |
| Assessments | All assessments, newest first, with verdict and reviewer |
| Applications | Every filing derived from this Invention, by jurisdiction |
| Decisions | Every recorded decision with rationale and actor (BR-09) |
| Relationship rail | Applications · Matters · Assessments · Documents |

**The critical requirement:** an Invention in "Not pursued" state has a complete, dignified page — history, reasoning, alternatives, and a clear "re-assess" action. It is not a greyed-out husk.

### 15.2 Assessment detail — `/app/inventions/{id}/assessments/{aid}`

The screen where the trust promise is kept or broken. Structured strictly by §16 depth:

| Depth | Content |
|---|---|
| **1 — Verdict** | The verdict (§11.6) · confidence with its basis · what this means · recommended next steps |
| **2 — Reasoning** | Element-by-element comparison · each blocking or relevant reference with why it matters · statutory exclusion analysis (India: s.3(k), s.3(d) called out explicitly) |
| **3 — Evidence** | Every citation resolving to the exact source passage (P2) · full reference list · coverage statement — what was searched and what was not · the 18-month blind-spot notice (Phase 3 §12.5) |
| Persistent | **Reviewer identity and their notes** (BR-01) · assessment date · disclosure version assessed · re-assess action |

Two non-negotiables:
- **Every assertion is visibly clickable to its source.** Citation affordance is a primary visual element, not a footnote marker.
- **The coverage statement is at depth 3 but is never optional and never collapsed by default on an unfavourable verdict** — a user told "no" deserves to see the limits of the search that told them.

### 15.3 Application detail — `/app/portfolio/{appId}`

| Region | Content |
|---|---|
| Identity | Official number · title · jurisdiction · filing date · priority date |
| Status pair | Application state (§11.3) with official sub-status + attention |
| Next action | Contextual: *Confirm deadline* · *Review response* · *Decide renewal* · *Nothing needed — next expected event ~[date]* |
| **Tabs** | Status · Deadlines · Documents · Costs `[L1]` · Renewals (V2) · Family |
| Status | Event timeline with source and freshness per entry · **the silence view** (§19.4) when nothing is happening |
| Deadlines | All deadlines with criticality, state and access to computation trace |
| Family | Sibling applications across jurisdictions, from the same Invention |
| Relationship rail | Parent Invention · Matter · Agent · Family |

### 15.4 Matter workspace — `/app/matters/{id}`

Phase 3 M1.6 requires four questions always answered. The IA hard-wires them into the header:

```
┌──────────────────────────────────────────────────────────────┐
│  Matter · Drafting and filing — India                        │
│  ┌────────────┬─────────────┬──────────────┬──────────────┐ │
│  │ WHERE      │ WHAT'S NEXT │ NEEDS YOU    │ COST     [L1]│ │
│  │ In progress│ Draft review│ 1 item       │ ₹— of ₹—     │ │
│  │            │ ~3 days     │              │              │ │
│  └────────────┴─────────────┴──────────────┴──────────────┘ │
├──────────────────────────────────────────────────────────────┤
│  Activity · Documents · Decisions · Deadlines · Costs [L1]   │
└──────────────────────────────────────────────────────────────┘
```

These four cells are always populated, on every matter, in every state. "Nothing needed from you" is a valid and important value for the third cell.

---

## 16. Progressive disclosure model

Three fixed depths, applied identically across every object type. Consistency is what makes depth learnable rather than confusing.

| Depth | Question answered | Interaction cost | Always present |
|---|---|---|---|
| **1 — State** | What is this and what does it need? | Zero — visible on load | Yes |
| **2 — Reasoning** | Why is it in this state? | One interaction | Yes |
| **3 — Evidence** | What is the underlying proof? | Two interactions | Yes — never removed, only nested |

### 16.1 Worked examples

| Object | Depth 1 | Depth 2 | Depth 3 |
|---|---|---|---|
| **Deadline** | "Response due 14 Mar 2028" | "Because the examination report issued 14 Sep 2027 and the response window is 6 months" | Full computation trace: rule ID, version, statutory citation, calendar adjustment, available extensions (BR-13) |
| **Assessment** | "Unlikely to be protectable" | Element-by-element reasoning; the two blocking references | The exact cited passages; coverage statement; blind-spot notice |
| **Renewal recommendation** | "Recommend: stop maintaining" | Cumulative spend, remaining term, no recorded commercial use, no competitor citations | Full cost history, citation data, comparable decisions |
| **Cost figure** `[L1]` | Total | Component breakdown (platform · professional · official) | Fee schedule reference, rule version, entity-type basis |
| **Agent recommendation** | "Recommended agent" | "14 matters in signal processing · available in 3 days" | Full outcome statistics with sample sizes and domain context |

**The governing rule:** depth 1 must be understandable without depth 2, and depth 3 must always be reachable. We never show a conclusion the user cannot trace, and we never force them to traverse the trace to get the conclusion.

---

## 17. Permissions-aware IA

### 17.1 Absence vs denial (IA-5)

| Situation | Presentation |
|---|---|
| Object in a different tenancy | **Invisible.** No stub, no count, no trace. Existence is confidential. |
| Object in the same tenancy, role lacks permission | **Visible but locked**, with the reason and who to ask |
| Object within an assigned matter, restricted class | **Visible but locked**, with the reason |
| Expired access (post-engagement) | **Visible in the agent's own record**, content restricted per the §26 L6 retention answer |
| Feature not in the current plan | **Visible with an upgrade path** |
| Feature not yet released | **Absent.** No coming-soon placeholders. |

### 17.2 What each role sees on a shared object

**Application `IN 202441012345`:**

| Role | Sees |
|---|---|
| Workspace Owner | Everything |
| Workspace Member | Everything except costs and billing `[L1]` |
| Workspace Viewer | Read-only, no costs |
| Named Inventor (not a member) | This application only, if named on its Invention — status, deadlines, documents. **Not the workspace, not other applications.** |
| Assigned Agent | Everything within the matter scope. **No other matter, no other application, no aggregate portfolio view, no other agent's work.** |
| Non-assigned Agent | Nothing. The application does not appear to exist. |
| TTO Officer | Everything, if institution-owned |
| Docket Ops | Metadata, deadlines, events, status. **Disclosure bodies and draft specifications are consent-gated** (BR-16). |
| Support | Nothing without a justified, time-boxed, user-visible grant |

### 17.3 The agent's portfolio view is matter-bounded

An agent's `/agent/matters` shows only assigned matters. There is no screen anywhere in the agent surface that aggregates a single client's holdings across matters the agent is not engaged on. This is P6 expressed in IA, and it is the structural reason a client can safely use multiple agents through one platform.

---

## 18. Action queue & notification IA

### 18.1 Home is the action queue

`/app` is not a summary dashboard. It is a work surface with four fixed regions in fixed order:

```
┌─────────────────────────────────────────────────────┐
│  NEEDS YOU                                      (3) │
│  Ordered by deadline proximity, then criticality.   │
│  Each item: what · why · by when · one action.      │
├─────────────────────────────────────────────────────┤
│  WAITING ON OTHERS                              (2) │
│  Transparency, no action. Who, what, expected when. │
├─────────────────────────────────────────────────────┤
│  RECENTLY CHANGED                          (last 7d)│
├─────────────────────────────────────────────────────┤
│  YOUR PORTFOLIO AT A GLANCE                         │
│  Counts by state · next 90 days · spend      [L1]   │
└─────────────────────────────────────────────────────┘
```

**"Waiting on others" is the anti-silence region.** It exists specifically to answer *whose turn is it* without the user having to ask (Phase 2 §7.2). No competitor surfaces this.

### 18.2 Notification centre

Grouped by class (Phase 3 §16.2), not chronologically:

**Critical** → **Action required** → **Progress** → **Informational**

Critical notifications cannot be dismissed without either acknowledgement or an explicit action. Critical class cannot be muted, and this is stated at onboarding rather than discovered.

### 18.3 The proactive-reassurance surface

Phase 3 §16.3 requires periodic status communication *when nothing has happened*. In the IA this materialises in two places:

1. **The application "Status" tab** carries a persistent silence view (§19.4) rather than an empty timeline
2. **Progress-class notifications** carry the same content on a phase-adaptive cadence

---

## 19. Empty, first-run & error states

Every empty state teaches one thing and offers one action. Empty is a designed state, not an unstyled one.

### 19.1 First-run

| Screen | Content | Single action |
|---|---|---|
| `/app` first login | What this workspace is for; the lifecycle in one line | Record your first invention |
| `/app/inventions` empty | What an Invention is; why recording it early matters | Record an invention |
| `/app/portfolio` empty | Why this is empty (nothing filed yet); the relationship to Inventions | Go to Inventions |
| `/app/deadlines` empty | Deadlines appear once something is filed | — |
| `/agent` first login | Value proposition: your docket first, matters second | **Import your matters** |
| `/agent/matters` empty | Import path prominent; opportunities secondary | Import matters |
| `/institution/disclosures` empty | How researchers submit; the invitation flow | Invite researchers |

### 19.2 Zero-result states

Never a dead end. Always: what was searched · why nothing matched · one adjustment to try · one alternate path.

### 19.3 Error states

| Error | Presentation |
|---|---|
| External source unavailable | **Cached data with an explicit staleness stamp** — never an error page (Phase 3 NFR-A05) |
| Assessment job failed | Plain explanation, what was retained, one retry action, escalation path |
| Permission denied (same tenancy) | What is restricted, why, who can grant it |
| Permission denied (cross-tenancy) | 404. The object does not exist to this user (IA-5). |
| Payment failed `[L1]` | What failed, what is unaffected, **explicit statement that no deadline is at risk** |

### 19.4 The silence view ★

The single most distinctive empty state in the product, and the direct IA answer to Phase 2's central emotional job.

When an Application has had no events for an extended period:

```
┌──────────────────────────────────────────────────────────┐
│  Nothing has happened — and that's expected.             │
│                                                           │
│  Your application is in the examination queue.           │
│  Last event: Request for examination filed · 4 Mar 2026  │
│                                                           │
│  Based on current timelines for this technical field,    │
│  the examination report is expected between              │
│  [month year] and [month year].                          │
│                                                           │
│  Nothing is required from you.                           │
│  We're monitoring daily. You'll hear from us the moment  │
│  anything changes.                                        │
│                                                           │
│  [What happens next]  [Why does it take this long]       │
└──────────────────────────────────────────────────────────┘
```

Every element is load-bearing: the reassurance, the last known fact, the honest range, the explicit "nothing required," the statement that we are watching, and two links that turn anxiety into understanding.

---

## 20. Responsive & mobile IA

### 20.1 Surface priorities by device

| Surface | Mobile priority | Rationale |
|---|---|---|
| Public search & document pages | **High** | Organic traffic is mobile-majority |
| Cost planner, guides, glossary | **High** | Research and evaluation happen on mobile |
| Client action queue and deadlines | **High** | Checking, deciding, approving |
| Client assessment reading | **Medium** | Long-form; readable but desktop-optimal |
| Disclosure capture | **Medium** | Must work; save-and-resume across devices is essential |
| Agent docket | **High** | Phase 3 ICP-2 checks deadlines away from the desk |
| Agent drafting/prosecution (V2) | **Low** | Desktop work |
| Institution consoles | **Medium** | |
| Operations consoles | **Low** | Desktop |

### 20.2 Adaptation rules

| Element | Mobile |
|---|---|
| Global navigation | Bottom bar for the four highest-frequency destinations; overflow in a sheet |
| Sidebar navigation | Collapses to the bottom bar; never a hamburger-only pattern for primary destinations (IA-6, accessibility) |
| Filter rails | Bottom sheet, applied filters shown as chips above results |
| Two-pane workspaces | Stack with a pane switcher; source pane accessible, never removed |
| Object detail tabs | Horizontal scroll with the active tab always visible; never a dropdown |
| Dense tables | Card list with the two most decision-relevant fields promoted |
| Status pair | Always visible; never truncated or collapsed |
| Next action | Sticky footer |

**Nothing critical exists only in a hover state** (Phase 3 §7.5) — a requirement that serves mobile and accessibility simultaneously.

---

## 21. Pricing IA and the L1 dependency register

### 21.1 The configurable price component

Per your instruction, the commercial model is not hardcoded. One component renders every price on the platform, in one of two configured modes:

```
PriceDisplay
  mode:  "bundled"  |  "itemized"          ← configuration, not code
  components:
     platform_fee      { amount, currency, label, disclosure_slot }
     professional_fee  { amount, currency, label, disclosure_slot, payee }
     official_fee      { amount, currency, label, source_rule_version }
  total: derived
  jurisdiction: <code>
  entity_type: <natural_person | startup | small | large>
  disclosures: [ jurisdiction-specific content slots ]
```

| Mode | Presentation |
|---|---|
| **Bundled** | One total. Depth 2 (§16) reveals the component breakdown for transparency without making it the primary frame. |
| **Itemized** | Three named lines with their own labels and disclosures. Total shown as a sum. |

**Requirements that hold in both modes:**
- **Official fees are always separately identifiable**, in both modes, at depth 1 or depth 2. They are the government's money, not ours, and Phase 2 §3.3 requires we never blur that.
- Official fees derive from the Rules Engine, never a hardcoded table (BR-14).
- Every price carries its jurisdiction and entity-type basis.
- Each component has a **content slot** for jurisdiction-specific disclosure text, so legal wording can be added per market without layout change.
- Switching modes changes no route, no template, no navigation — only the component's rendering.

### 21.2 L1 dependency register

Every surface affected by the fee-sharing and settlement structure. **Each requires legal confirmation before implementation.**

| # | Surface | What L1 determines | Phase 3 ref |
|---|---|---|---|
| L1-01 | `/pricing` | Whether the public catalogue shows bundled or component pricing | M0.8 |
| L1-02 | `/tools/cost-planner` | Component labelling in the 20-year projection | M1.4 |
| L1-03 | `/solutions/*`, `/for/*` price references | How indicative pricing is framed | — |
| L1-04 | `/agents/{slug}` public profile | Whether an agent's professional fee is displayed at all | M2.4 |
| L1-05 | `/app/find-an-agent/{id}/quote` | Quote structure — one price or three | M1.5 |
| L1-06 | Engagement acceptance | What the client is contracting for, and with whom | M1.5 |
| L1-07 | `/app/matters/{id}/costs` | Cost presentation within a matter | M1.6 |
| L1-08 | Matter header cost cell | Whether it shows a total or a component | §15.4 |
| L1-09 | `/app/costs/*` | Portfolio-level cost aggregation and categorization | M1.7 |
| L1-10 | `/app/costs/invoices` | Invoice structure — single or multiple issuers | M0.8 |
| L1-11 | `/app/settings/billing` | Payment methods, payees, authorizations | M0.8 |
| L1-12 | Checkout / payment | Payment flow, and whether funds split at collection | M0.8 |
| L1-13 | Renewal payment authorization | Official fee handling and standing authority | M1.8 |
| L1-14 | `/agent/opportunities/{id}` | Fee display to the agent when accepting | M1.5 |
| L1-15 | `/agent/matters/{id}/billing` | Agent-side billing and time records | M2.1 |
| L1-16 | `/agent/practice/earnings` | Settlement presentation and timing | M2.4 |
| L1-17 | `/institution/budget/*` | Budget categorization and commitment tracking | M3.3 |
| L1-18 | `/institution/approvals/{id}` | Cost basis shown to an approver | M3.2 |
| L1-19 | Every notification containing an amount | Wording and issuer attribution | M0.7 |
| L1-20 | `/legal/terms` | Contracting parties and fee terms | — |

**IA consequence:** none of the twenty surfaces above changes its *route, template, navigation position or information hierarchy* based on the L1 outcome. Only the rendering mode of the price component changes. That is what "configurable, not redesigned" means structurally, and it is why the register is a list of components rather than a list of screens to rebuild.

---

## 22. Accessibility IA

Phase 3 NFR-X01 sets WCAG 2.2 AA. Phase 1 found accessibility unaddressed across all thirty competitors — this is free differentiation and it matters to institutional buyers.

### 22.1 Landmark structure

Every page:

```
<header role="banner">        global navigation, utility
<nav role="navigation">        local navigation (labelled)
<main role="main">             one per page, skip-link target
<aside role="complementary">   relationship rail, filter rail (labelled)
<footer role="contentinfo">
```

### 22.2 Heading hierarchy

- Exactly one `h1` per page — the object's identity or the page title
- No level skipping
- Object detail: `h1` object identity → `h2` section → `h3` subsection
- Index pages: `h1` collection name → `h2` result groups
- Headings describe content, never styling

### 22.3 Structural requirements

| Requirement | Detail |
|---|---|
| Skip links | To main content, to primary navigation, to the action queue |
| Focus order | Follows visual order; managed explicitly on route change and modal open |
| Status announcements | Lifecycle and attention states announced to assistive tech, not conveyed by colour alone (NFR-X04) |
| Deadline criticality | Never colour-only — icon, text label and colour together |
| Citation links | Descriptive accessible names, not "[1]" — e.g. "Cited passage in US 9,876,543, paragraph 42" |
| Tables | Real `<table>` with headers and scope for tabular data; never layout tables |
| Guided flows | Progress announced; step context available to screen readers on every step |
| Forms | Labels always visible, never placeholder-only; errors associated programmatically |
| Motion | Respects reduced-motion; no essential information conveyed by animation |

### 22.4 The plain-language commitment as an accessibility feature

The dual-register vocabulary (§10.1) is a cognitive accessibility measure, not only a usability one. Target reading level for depth-1 content is comparable to general-audience journalism; term-of-art density is permitted to rise at depths 2 and 3, where the user has explicitly asked for detail.

---

## 23. SEO IA

### 23.1 The three-tier content strategy

| Tier | Pages | Role | Volume |
|---|---|---|---|
| **1 — Corpus** | `/patents/{jur}/{number}` | Long-tail volume; demonstrates competence | Millions (rendered on demand) |
| **2 — Authority** | `/learn/guides/*`, `/learn/reports/*`, `/learn/jurisdictions/*` | Citation-earning original work | Tens |
| **3 — Commercial** | `/for/*`, `/solutions/*`, `/pricing`, `/tools/*` | Conversion | Dozens |

Phase 2 §21 established the principle: **build for citation, not for ranking.** Tier 2 is where the durable value sits — original research is the only content strategy that survives AI answer engines, because answer engines cite primary sources.

### 23.2 Corpus page indexation policy

The risk with millions of generated pages is thin-content penalties and crawl-budget waste. Controls:

- Rendered and cached **on first request**, not pre-generated across the corpus
- Indexable only when the page carries genuine added value (structured claims, status timeline, family, citations) — pages with sparse upstream data are `noindex` until enriched
- Canonical URLs; no parameter-generated duplicates
- Sitemaps segmented by jurisdiction and generated from pages that actually have content
- Plain-language summaries clearly labelled as AI-generated (Phase 3 §12.3 rule 5)

### 23.3 Internal linking

- Glossary terms auto-link on first occurrence within guides
- Every guide links to the relevant tool and the relevant `/solutions` stage
- Every corpus page links to the glossary terms it uses and to the relevant jurisdiction guide
- Tools link to the guides that explain their output
- **No footer link farms** (Phase 1 §3.1)

### 23.4 Structured data

| Page type | Schema |
|---|---|
| Guide | `Article` + `BreadcrumbList` |
| Glossary term | `DefinedTerm` within a `DefinedTermSet` |
| Corpus document | `CreativeWork` with patent-specific properties `[verify current best practice]` |
| Agent profile | `Person` + `Organization` affiliation |
| Pricing | `Offer` where a fixed price genuinely applies `[L1]` |
| Common questions within guides | `FAQPage` — only where the questions are real |

### 23.5 What we do not do

Location permutation pages · keyword-stuffed titles · doorway pages · unverifiable statistics as headline content · AI-generated bulk articles. Every one of these was observed in Phase 1 and every one is incompatible with the brand position in Phase 2 §5.3.

---

## 24. Content model & metadata

### 24.1 Managed content types

| Type | Fields | Where surfaced |
|---|---|---|
| **Guide** | title, slug, summary, body, stage, segment, jurisdiction, related terms, related tools, updated | `/learn/guides`, contextual help |
| **Glossary term** | term, plain-language definition, term-of-art definition, usage note, related terms, jurisdiction | `/learn/glossary`, in-product tooltips |
| **Jurisdiction guide** | jurisdiction, process overview, timelines, fee structure, common pitfalls | `/learn/jurisdictions`, contextual in flows |
| **Report** | title, methodology, data, findings, publication date | `/learn/reports` |
| **Legal / trust content** | type, body, effective date, version | `/trust/*`, `/legal/*` |
| **Disclosure slot content** `[L1]` | jurisdiction, component, body, effective date | Rendered inside PriceDisplay |
| **Help content** | context key, body, related guide | Contextual help throughout |

### 24.2 Single-source rules

- **The glossary is the only source of definitions.** In-product tooltips and `/learn/glossary/{term}` render from the same record. They cannot diverge.
- **The lexicon (§10) is the only source of labels.** Interface strings resolve against it.
- **Jurisdiction guides derive their fee and timeline figures from the Rules Engine**, not from hand-authored copy, so published content cannot go stale relative to the product (BR-14).

### 24.3 Object metadata

| Object | Metadata carried for IA purposes |
|---|---|
| Invention | technical domain, jurisdictions of interest, inventor set, recorded date, state |
| Application | jurisdiction, route, official number, dates, state + sub-status, family, agent |
| Assessment | type, jurisdictions, verdict, confidence, reviewer, disclosure version, coverage |
| Matter | type, state, agent, invention, applications, scope |
| Deadline | criticality, state, rule version, trigger event, jurisdiction |
| Document | class, zone, version, source, matter, application, access log |

---

## 25. IA governance & extensibility

### 25.1 Extension points designed in

| Future change (Phase 3 §23) | IA accommodation | What would break it |
|---|---|---|
| New jurisdiction | Jurisdiction is a path segment and a facet everywhere (U8); no jurisdiction-specific routes | Hardcoding `/india/...` anywhere |
| Other IP types | `/app/inventions` generalizes to a Rights spine; Application becomes one Right type | Naming routes or labels "patent" where the concept is general |
| Captive practice | Appears as one more Agent Org; no new surface | Assuming all agents are external in navigation labels |
| Licensing marketplace | New top-level under `/app` and a new public tier | Treating Portfolio as terminal in the lifecycle spine |
| Public API | App routes already mirror API resources (U7) | UI-specific route shapes that diverge from resources |
| Vernacular UI | All labels resolve through the lexicon; no hardcoded strings | Copy embedded in components |
| Enterprise deployment | Data residency is a workspace attribute, not a route | Region-in-URL patterns |

### 25.2 Governance rules

1. **New top-level navigation items require removing one.** Seven is the ceiling per surface.
2. **New terminology requires a lexicon entry before it appears anywhere.**
3. **New templates require justification against §14.**
4. **New object detail pages follow the §15 skeleton.** Deviation requires a documented reason.
5. **Any screen displaying money uses PriceDisplay.** No exceptions. `[L1]`
6. **Any AI-derived content follows the §16 three-depth model** with citations at depth 3.
7. **Public URL changes require 301s** and are logged.

---

## 26. What Phase 5 inherits

Phase 5 (User Flows) can now proceed from:

| Artifact | Section |
|---|---|
| Complete sitemaps for five surfaces | §4–8 |
| URL and routing scheme | §9 |
| Controlled vocabulary — every label, fixed | §10 |
| Status taxonomy — every state a screen can express | §11 |
| Navigation systems and the relationship graph | §12 |
| Template inventory — every screen is an instance | §14 |
| Object page skeletons for the three primary objects | §15 |
| Progressive disclosure depths | §16 |
| Permission-driven view variance | §17 |
| Empty, first-run and error state inventory | §19 |
| L1 dependency register | §21.2 |

### 26.1 The seven structures Phase 5 must not change

Architectural rather than presentational — altering them contradicts Phase 3:

1. **Invention as the client spine**, Applications as its children (IA-1 / P5)
2. **Two-axis status** — lifecycle and attention are separate and both always present (IA-2)
3. **Three-depth progressive disclosure**, uniform across object types (IA-4)
4. **Cross-tenancy invisibility** — no stubs, no counts, no traces (IA-5)
5. **The mandatory review gate** as a distinct destination in the agent surface (BR-01)
6. **Citations reachable at depth 3 on every AI-derived assertion** (BR-02)
7. **One price component in two modes**, never per-screen price logic (IA-7) `[L1]`

### 26.2 The three flows Phase 5 should design first

Ranked by how much downstream design they unlock:

1. **Disclosure capture → assessment → verdict (both branches).** It exercises the guided-flow template, the two-pane review workspace, the assessment object page, all four verdict states, the depth model and the provenance interaction. The unfavourable branch is the harder and more important of the two.
2. **Agent import → docket → first review.** It exercises the supply-side cold start, the review gate, deadline confirmation and the matter workspace — and it is the flow the business's capacity ceiling depends on.
3. **Deadline approaching → notification → confirmation → escalation.** It exercises the notification ladder, the confirmation gate, the computation trace and the escalation path into `/ops/docket` — the operational spine of the entire product.

---

*End of Phase 4.*
