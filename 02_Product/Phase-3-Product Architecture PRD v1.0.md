# Phase 3 — Product Architecture & Product Requirements Document

**Master blueprint.** Phases 4 (Information Architecture), 5 (User Flows), 6 (Wireframes) and all subsequent design and development work should be derived from this document without redefining the product.

**Builds on:** Phase 1 (Competitive Landscape) · Phase 2 (Positioning, Business Model & Product Strategy)
**Confirmed constraints:** Marketplace-first regulatory model · India launch, jurisdiction-agnostic architecture · Patents only · AI assists, humans decide · Provenance non-negotiable
**Date:** 23 July 2026

---

> **Historical notice (Decision G).**
> This is a **frozen historical document**, preserved unaltered. Its terminology is historical and retained deliberately; current terminology is governed by `01_Strategy/Glossary.md`. In particular, this document uses **"Marketplace"** for the MVP agent-matching capability; ADR §13.8 reserves that term for the future licensing surface and names the MVP concept **"Agent Matching / Engagement"**.
> **The Assessment Lifecycle ADR supersedes or extends this document** on: reviewer scope (§4.1), agent access (BR-05), reviewer assignment (M1.3), and assessment turnaround (J2 step 7). Each carries its own notice at the point of use.
> The **L1 Register**, formerly at Phase 4 §21.2, is now maintained at `06_Legal/L1 Register.md`.
> Where this document conflicts with the ADR or a living document, those govern.

---

## Table of contents

| § | Section |
|---|---|
| 1 | Architectural principles & the five decisions that shape everything |
| 2 | Product architecture |
| 3 | Complete ecosystem overview |
| 4 | User roles and permissions |
| 5 | Module catalogue (Layers 0–5) |
| 6 | Dashboards |
| 7 | Navigation structure |
| 8 | User journeys |
| 9 | Functional requirements |
| 10 | Non-functional requirements |
| 11 | Business rules |
| 12 | AI boundaries |
| 13 | Data architecture |
| 14 | Core entities and relationships |
| 15 | Security architecture |
| 16 | Notification architecture |
| 17 | Search architecture |
| 18 | Deadline engine architecture |
| 19 | Document management architecture |
| 20 | Integration architecture |
| 21 | API strategy |
| 22 | Scalability considerations |
| 23 | Future extensibility |
| 24 | Technical assumptions |
| 25 | Risks and architectural trade-offs |
| 26 | Open dependencies |

---

## 1. Architectural principles & the five decisions that shape everything

### 1.1 Principles

These are enforced constraints, not aspirations. Each one rules out designs that would otherwise be tempting.

| # | Principle | What it forbids |
|---|---|---|
| **P1** | **Rules are data, never code.** Every jurisdictional deadline, fee, form and procedural requirement is a versioned data record interpreted by a generic engine. | Hard-coding "India = 31 months from priority" anywhere in the codebase. |
| **P2** | **Provenance is a type constraint.** An assertion object cannot be persisted or rendered without at least one resolvable citation. | Any AI output path that can emit unsourced text into the product. |
| **P3** | **Confidential invention content never leaves its zone.** Pre-filing disclosure text is architecturally isolated from the public corpus, from analytics, and from any third party without a no-training, no-retention contract. | Sending disclosure text to a public search API. Training on client content. Logging disclosure bodies to shared observability. |
| **P4** | **Deadline correctness is safety-critical.** Treated with the rigour normally reserved for payments: immutable audit, independent verification, redundant alerting, mandatory human confirmation on critical dates. | Silent deadline recomputation. Single-channel alerting. Any code path that can delete a deadline without an audit record. |
| **P5** | **The Invention is the root entity, not the Application.** Applications are jurisdictional manifestations of a persistent Invention. | An application-centric data model (i.e. every competitor docketing system, which is why none of them can serve the front of the funnel). |
| **P6** | **Access is matter-scoped, not workspace-scoped, for external professionals.** | Giving a marketplace agent visibility of a client's whole portfolio because they were engaged on one matter. |
| **P7** | **Every legally significant output has a named accountable human.** | Auto-release of any Tier 2 AI output. |
| **P8** | **Degrade, never block.** No external source failure may prevent a deadline being computed, shown, or alerted on. | Synchronous dependency on IP India availability in any critical path. |

### 1.2 The five decisions that shape everything downstream

**D1 — Rules-as-data with a generic temporal engine.**
This is the single most consequential decision in the document. It is more work in month three and the difference between a 3-week and a 9-month jurisdiction addition in year two. *Consequence:* we need a Rule authoring and QA discipline (§18.5) that most teams underestimate.

**D2 — Three-zone data separation** (Confidential / Public Corpus / Outcome Metadata).
Implements the Phase 2 commitment that the moat is built on outcome metadata, never on client invention content. *Consequence:* some analytically attractive queries become impossible by design. That is the point.

**D3 — Modular monolith first, extract services later.**
A small team building a domain this interconnected should not start with microservices. Enforce module boundaries in code (separate schemas, explicit interfaces, no cross-module table access) so extraction is mechanical when needed. *Consequence:* deliberate discipline required to keep boundaries honest without network calls forcing them.

**D4 — Two-sided tenancy with matter-scoped grants.**
Clients own Workspaces; Agents belong to Agent Organizations; access flows through Engagements, which grant time-bounded, matter-scoped permissions. *Consequence:* the permission model is more complex than a standard SaaS RBAC, and this complexity is non-negotiable for confidentiality.

**D5 — Async-first AI orchestration.**
Assessments are long-running jobs (minutes), not request-response. Everything AI runs as an observable, resumable, auditable job with intermediate state visible to the user. *Consequence:* we need real job infrastructure from day one, and the UI must be designed for progressive disclosure of results.

---

## 2. Product architecture

### 2.1 Layered view

```
┌──────────────────────────────────────────────────────────────────────────┐
│  LAYER 5 — EXTERNAL SURFACE                                              │
│  Public API · Webhooks · Developer Portal · Embeds        (V3)           │
└──────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────┐
│  LAYER 4 — INTERNAL OPERATIONS                                           │
│  Docket Health · Quality & QA · Marketplace Ops · Trust & Incident       │
│  Rule Authoring · Business Analytics                                     │
└──────────────────────────────────────────────────────────────────────────┘
┌───────────────────────┬──────────────────────┬───────────────────────────┐
│ LAYER 1               │ LAYER 2              │ LAYER 3                   │
│ CLIENT EXPERIENCE     │ PROFESSIONAL         │ INSTITUTIONAL             │
│                       │ EXPERIENCE           │ EXPERIENCE      (V2)      │
│ Public Register       │ Agent Console        │ Disclosure Intake         │
│ Invention Vault       │ Drafting Workspace   │ Ownership & Approvals     │
│ Assessment            │ Prosecution Wkspc    │ Budget & Compliance       │
│ Strategy & Cost       │ Agent Docket         │ Institutional Portfolio   │
│ Marketplace           │ Profile & Outcomes   │                           │
│ Matter Workspace      │                      │                           │
│ Portfolio & Docket    │                      │                           │
│ Renewals              │                      │                           │
│ Guidance              │                      │                           │
└───────────────────────┴──────────────────────┴───────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────┐
│  LAYER 0 — PLATFORM SERVICES  (shared, no UI of their own)               │
│                                                                          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│  │ Identity,  │ │ DEADLINE & │ │ Search &   │ │ Provenance │            │
│  │ Tenancy &  │ │ RULES      │ │ Retrieval  │ │ & Evidence │            │
│  │ Access     │ │ ENGINE ★   │ │            │ │ ★          │            │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│  │ Document   │ │ AI         │ │ Notifi-    │ │ Billing &  │            │
│  │ Management │ │ Orchestr.  │ │ cation     │ │ Payments   │            │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                           │
│  │ Integration│ │ Event Log  │ │ Outcome    │                           │
│  │ Hub        │ │ (immutable)│ │ Data       │                           │
│  └────────────┘ └────────────┘ └────────────┘                           │
└──────────────────────────────────────────────────────────────────────────┘

★ = the two modules that must be correct above all others
```

### 2.2 Runtime shape (MVP)

| Component | Choice | Rationale |
|---|---|---|
| Application | Modular monolith, one deployable | D3 |
| Async work | Durable job queue with retries, DLQ, idempotency keys | D5; AI jobs and integration polling |
| Scheduler | Distributed cron with leader election | Deadline recomputation, renewal sweeps, source polling |
| Operational DB | Relational (PostgreSQL-class), one schema per module | Transactional integrity for money and dates |
| Event log | Append-only table, immutable, separate from operational tables | P4, audit, outcome data derivation |
| Search | Hybrid engine — inverted index + vector index | §17 |
| Object storage | Encrypted blob store with versioning and object-lock | §19 |
| Analytics | Separate warehouse, populated only from Zone 3 | D2 |
| AI | Provider-abstracted gateway, multi-model | §12.6 |

**Explicit non-choice:** we do not adopt microservices, event-sourcing-as-primary-persistence, or a service mesh in the MVP. Each of those solves a problem we do not have and costs velocity we cannot spare.

---

## 3. Complete ecosystem overview

### 3.1 The participants

| Participant | Relationship | Value in | Value out |
|---|---|---|---|
| **Inventor / Client** | Owns Inventions | Disclosure, decisions, fees | Protection, clarity, custody |
| **Verified Agent** | Performs regulated work | Professional judgement, signature | Matters, tooling, reputation |
| **Agent Organization** | Employs/represents agents | Capacity, conflict management | Revenue, practice management |
| **Institution** | Owns Inventions of its members | Volume, budget | Compliance, pipeline visibility |
| **Platform (TechCo)** | Operates everything except regulated work | Software, AI, data, custody, brand | Platform and software fees |
| **Patent Offices** | External authorities | Register data, status, examination | Filings, fees |
| **Data Sources** | External | Corpus, legal status | — |
| **Model Providers** | External | Inference | — |

### 3.2 The value flow

```
  INVENTION EXISTS
        │
        ▼
  [Invention Vault]  ──── disclosure captured, timestamped, encrypted (Zone 1)
        │
        ▼
  [Assessment]  ──── AI retrieval + analysis → Assertions + Citations
        │              ↓
        │        [Human Review]  ← Verified Agent reviews, edits, signs
        │              ↓
        ▼
  DECISION: file / don't file / defer / redesign
        │
        ├── "don't file" → Invention stays in Vault, monitored, re-assessable
        │
        └── "file" ──► [Marketplace] → Engagement → Matter
                              │
                              ▼
                        [Drafting Workspace]  (Agent, AI-assisted)
                              │
                              ▼
                        [Filing]  → Application created (jurisdiction N)
                              │
                              ▼
                    ┌── [DEADLINE ENGINE] ──┐   ← recomputes on every Event
                    │                        │
                    ▼                        ▼
              [Prosecution]            [Notifications]
                    │                        │
                    ▼                        ▼
                 GRANT ──────────► [Renewals] (20 years, recurring)
                    │
                    ▼
              [Outcome Data] (Zone 3 — metadata only)
                    │
                    └──► better matching · better AI · published benchmarks
```

### 3.3 What is deliberately outside the ecosystem (MVP)

Trademarks · designs · copyright · litigation support · patent landscaping · valuation · licensing marketplace · chemical/biosequence search. Each is architecturally *anticipated* (§23) but not built.

---

## 4. User roles and permissions

### 4.1 Role catalogue

| Role | Scope | Description |
|---|---|---|
| **Anonymous** | Global | Unauthenticated visitor. Public register search only. |
| **Registered (Free)** | Global | Saved searches, alerts, cost model, guidance. No Vault. |
| **Workspace Owner** | Workspace | Full control incl. billing, member management, deletion |
| **Workspace Admin** | Workspace | All except billing and deletion |
| **Workspace Member** | Workspace | Create/edit Inventions and Disclosures; cannot engage or pay |
| **Workspace Viewer** | Workspace | Read-only |
| **Named Inventor** | Invention | May be attached to an Invention without Workspace membership (universities, contractors). Sees only their own Inventions. |
| **Verified Agent** | Matter | Regulated professional. Matter-scoped access only (P6). |
| **Agent Org Admin** | Agent Org | Manages agents, capacity, conflicts, billing for the org |
| **Reviewer** | Matter | A Verified Agent acting in the review role on an Assessment |
| **Institution Admin** | Institution | Manages units, policies, budgets, users |
| **TTO Officer** | Institution | Triages disclosures, manages ownership, approves filings |
| **Institution Approver** | Institution | Budget/legal sign-off on specific decisions |
| **Docket Ops** | Platform | Internal. Confirms critical deadlines, resolves source conflicts. |
| **Quality Reviewer** | Platform | Internal. Audits AI output and agent work quality. |
| **Support** | Platform | Internal. Time-bounded, audited, consent-gated impersonation. |
| **Trust & Safety** | Platform | Internal. Incident handling, conflict escalation, data requests. |
| **Rule Author** | Platform | Internal. Authors and versions jurisdiction rules. |
| **Platform Admin** | Platform | Internal. Break-glass, fully audited, dual-control. |
| **Service Account** | Scoped | API consumer (V3) |

> **Extension notice — Reviewer scope (Decision F).**
> The **Reviewer** row above records scope as *Matter*. This predates the Assessment Lifecycle ADR, which establishes that assessment review occurs with **no Engagement and no Matter in existence** (ADR §4).
> A Reviewer's scope is the **review grant** (ADR §6): exactly one Disclosure version and its attachments, plus the analysis under review, for the purpose of producing exactly one `ReviewDecision`, expiring on release or reassignment.
> The review grant **expands** authorization; it does not replace Matter access. The Engagement grant defined in §4.2 is unchanged.
> See ADR §6 and Phase 5 F8 / X6.

### 4.2 Permission model

**RBAC for capability, ABAC for reach.** A role grants *what you can do*; attributes decide *what you can do it to*.

```
CAN(actor, action, resource) =
      role_grants(actor.role, action)
  AND scope_matches(actor, resource)          // workspace / matter / institution
  AND relationship_active(actor, resource)    // engagement live, not expired
  AND confidentiality_tier_permits(actor, resource)
  AND NOT conflict_flagged(actor, resource)
```

**The four non-obvious rules:**

1. **Agents receive matter-scoped grants that expire.** An Engagement grants access to exactly the Documents, Disclosure versions and Deadlines within that Matter, for the Engagement's duration plus a defined retention window. Closing a Matter revokes access on a schedule, not instantly (agents need record-keeping access for their own professional obligations — the exact window is a §26 legal dependency).

2. **Conflict checking gates assignment, not access.** Before an Agent can be offered or assigned a Matter, the system runs a conflict check against that Agent Org's declared client and adverse-party list. A flagged conflict blocks assignment and requires Trust & Safety resolution. *This is a legal requirement, not a nicety.*

3. **Named Inventors are first-class but narrow.** A university researcher may be a Named Inventor on an Invention owned by the Institution, seeing their own Invention's status without seeing the Institution's portfolio. This dual-visibility requirement is why the Invention↔Party relationship is many-to-many with role qualifiers (§14).

4. **Internal access requires justification.** Support impersonation requires a stated reason, is time-boxed, is visible to the Workspace Owner in their audit log, and never grants access to unfiled Disclosure bodies without explicit user consent captured in-session.

### 4.3 Capability matrix (abridged — full matrix is a Phase 4 artifact)

| Capability | Anon | Free | Member | Owner | Agent | TTO | Docket Ops |
|---|---|---|---|---|---|---|---|
| Search public register | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Save searches / alerts | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create Invention | — | — | ✓ | ✓ | — | ✓ | — |
| View Disclosure body | — | — | ✓ | ✓ | Matter-scoped | Institution-scoped | **✗ (consent-gated)** |
| Request Assessment | — | — | ✓ | ✓ | — | ✓ | — |
| **Release Assessment** | — | — | — | — | **✓ (Reviewer)** | — | — |
| Engage an Agent | — | — | — | ✓ | — | ✓ (w/ approval) | — |
| Pay / manage billing | — | — | — | ✓ | — | ✓ | — |
| File with an office | — | — | — | — | ✓ | — | — |
| **Confirm critical deadline** | — | — | — | — | ✓ | — | **✓** |
| Abandon an Application | — | — | — | ✓ (w/ confirm) | — | ✓ (w/ approval) | — |
| Author jurisdiction Rules | — | — | — | — | — | — | — |

---

## 5. Module catalogue

Every module specified as: **Purpose · Primary users · Inputs · Outputs · Dependencies · Future extensions.**

---

## LAYER 0 — PLATFORM SERVICES

---

### M0.1 — Identity, Tenancy & Access

| | |
|---|---|
| **Purpose** | Authenticate every actor; model the two-sided tenancy; evaluate every authorization decision; maintain the audit trail of who saw what. |
| **Primary users** | All (invisible); Platform Admin, Trust & Safety |
| **Inputs** | Credentials, OAuth/OIDC assertions, MFA factors, Engagement records, conflict declarations, institution membership |
| **Outputs** | Sessions, scoped access tokens, authorization decisions, immutable access log |
| **Dependencies** | Event Log; Notification (security alerts) |
| **Future extensions** | SAML/SCIM for enterprise (V3) · delegated access for outside counsel · granular data-residency binding per Workspace |

**Key requirements:** MFA mandatory for Agents, Institution Admins and all internal roles. Session binding to device fingerprint for internal roles. Every authorization *denial* is logged, not just grants — denial patterns are the earliest signal of a compromised account.

---

### M0.2 — Deadline & Rules Engine ★

*Full architecture in §18. This is the module that must never be wrong.*

| | |
|---|---|
| **Purpose** | Compute, maintain, verify and explain every date in the system, for any jurisdiction, from versioned rule data. |
| **Primary users** | All (via other modules); Docket Ops; Rule Author |
| **Inputs** | Events (filing, publication, office action issued, grant, payment), Rule sets (versioned), jurisdiction calendars, Application state |
| **Outputs** | Deadline records with computation traces, criticality classification, recomputation diffs, escalation triggers |
| **Dependencies** | Event Log, Integration Hub (official date confirmation), Notification |
| **Future extensions** | New jurisdictions as data-only additions · rule-change simulation ("what if the Rules amend?") · predicted vs actual date analytics · client-configurable internal buffer periods |

---

### M0.3 — Search & Retrieval

*Full architecture in §17.*

| | |
|---|---|
| **Purpose** | One retrieval service serving both the free public register and the Assessment engine, over a normalized multi-jurisdiction corpus. |
| **Primary users** | Anonymous, Free, Client, Agent (via other modules) |
| **Inputs** | Corpus documents (patents, applications, NPL where licensed), queries (natural language, boolean, structured, claim-element), filters |
| **Outputs** | Ranked result sets with passage-level spans, retrieval traces, saved-search definitions |
| **Dependencies** | Integration Hub (corpus ingestion), Provenance (span addressing) |
| **Future extensions** | NPL and scholarly linkage (the Lens.org insight) · image/drawing similarity · chemical structure (V4) · sequence search (V4) · citation-graph traversal |

---

### M0.4 — Provenance & Evidence ★

| | |
|---|---|
| **Purpose** | Make P2 structurally enforceable. Owns the Assertion and Citation types, resolves citations to addressable source passages, and guarantees that displayed AI output is traceable. |
| **Primary users** | All (invisible); Quality Reviewer |
| **Inputs** | Retrieval results, AI-generated assertions, source document spans, retrieval timestamps |
| **Outputs** | Validated Assertion objects, resolvable citation links, evidence bundles for export, provenance audit records |
| **Dependencies** | Search, Document Management, AI Orchestration |
| **Future extensions** | Citation freshness re-verification (has the cited document's status changed?) · confidence calibration from Reviewer edit data · exportable evidence packs for third parties |

**The enforcement mechanism:** `Assertion` is a persisted type with a `NOT NULL` relationship to at least one `Citation`, and `Citation` requires a resolvable `(document_id, span_start, span_end, retrieved_at, retrieval_method)`. There is no code path that constructs a displayable assertion without one. Prompt instructions are a *supplement* to this, never the mechanism.

---

### M0.5 — Document Management

*Full architecture in §19.*

| | |
|---|---|
| **Purpose** | Store, version, classify, secure and serve every document, with strict zone separation between confidential and public content. |
| **Primary users** | All |
| **Inputs** | Uploads, generated documents, office correspondence, filing receipts, corpus documents |
| **Outputs** | Versioned documents, signed access URLs, extracted text and structure, classification labels, audit trail |
| **Dependencies** | Identity (access), Event Log, Integration Hub |
| **Future extensions** | E-signature integration · redaction workflows · client-managed encryption keys (V3) · WORM retention for regulated clients |

---

### M0.6 — AI Orchestration

| | |
|---|---|
| **Purpose** | Run every AI workload as an observable, resumable, auditable job. Abstract model providers. Enforce the tiering in §12. |
| **Primary users** | All (invisible); Quality Reviewer |
| **Inputs** | Task definitions, input documents, retrieval context, model routing policy, tier classification |
| **Outputs** | Structured task outputs (never free text into the product), token and cost telemetry, full job traces, model attribution |
| **Dependencies** | Search, Provenance, Document Management, Event Log |
| **Future extensions** | Fine-tuned models on Zone 3 metadata (never Zone 1) · on-prem/VPC deployment for enterprise · A/B routing and automated eval harness · cost-aware model selection |

**Key requirements:** every job records the model, version, prompt template version, retrieval set, and output — so any assessment can be reconstructed and explained months later. Provider abstraction is a hard requirement (§25 trade-off T6).

---

### M0.7 — Notification

*Full architecture in §16.*

| | |
|---|---|
| **Purpose** | Deliver the right message on the right channel with guaranteed delivery for critical events, and solve the "silence" problem identified as the central emotional job in Phase 2. |
| **Primary users** | All |
| **Inputs** | Domain events, deadline triggers, user preferences, channel availability |
| **Outputs** | Emails, in-app notifications, WhatsApp/SMS, digests, escalations, delivery receipts |
| **Dependencies** | Event Log, Identity, Deadline Engine |
| **Future extensions** | Slack/Teams (V3) · webhook delivery to client systems (V3) · localized templates per language · quiet hours and per-matter preferences |

---

### M0.8 — Billing & Payments

| | |
|---|---|
| **Purpose** | Quote, invoice, collect, and disburse — including the agent settlement flow whose legal structure is a §26 dependency. |
| **Primary users** | Workspace Owner, Agent Org Admin, Institution Admin, Platform Ops |
| **Inputs** | Price book, Engagement scope, official fee schedules (from Rules), payment events, agent settlement terms |
| **Outputs** | Quotes, invoices, receipts, official fee payment records, agent statements, revenue recognition data |
| **Dependencies** | Rules Engine (official fees), Integration Hub (payment gateway), Identity |
| **Future extensions** | Multi-currency (day one in the model, activated at V2) · purchase orders and institutional procurement · escrow for milestone work · annuity prepayment plans |

**Architectural note:** the split between *platform fee*, *professional fee* and *official fee* must be modelled as three distinct line-item types from day one, even in the MVP where only one settlement structure exists. The legal answer in §26.1 will determine which flows through the platform and which is billed directly by the Agent — and the data model must support either without migration.

---

### M0.9 — Integration Hub

*Full architecture in §20.*

| | |
|---|---|
| **Purpose** | Connect to every patent office and data source through a uniform adapter pattern, normalize to canonical entities, and degrade gracefully when sources fail (P8). |
| **Primary users** | Platform (invisible); Docket Ops (conflict resolution) |
| **Inputs** | Office register data, status changes, published documents, official fee schedules, payment confirmations |
| **Outputs** | Canonical Events, normalized documents, source reliability telemetry, discrepancy alerts |
| **Dependencies** | Event Log, Document Management, Deadline Engine |
| **Future extensions** | Direct e-filing where APIs permit · additional jurisdictions as adapters · outbound integrations to client systems |

---

### M0.10 — Event Log

| | |
|---|---|
| **Purpose** | Immutable, append-only record of everything that happened. The source of truth for deadline computation, audit, dispute resolution and outcome data derivation. |
| **Primary users** | Platform (invisible); Docket Ops; Quality Reviewer; Trust & Safety |
| **Inputs** | Domain events from every module |
| **Outputs** | Ordered event streams per entity, audit exports, replay capability |
| **Dependencies** | None (foundational) |
| **Future extensions** | Cryptographic chaining for tamper evidence · client-visible audit export · regulatory reporting |

**Requirement:** events are never updated or deleted. Corrections are new events that supersede prior ones, with explicit linkage. Deadline computation reads only from this log, which is what makes historical recomputation reproducible (P4).

---

### M0.11 — Outcome Data Platform

| | |
|---|---|
| **Purpose** | Build the Phase 2 moat: derive, store and serve outcome *metadata* — strictly Zone 3, never Zone 1 content. |
| **Primary users** | Platform (internal analytics); Marketplace matching; Quality Reviewer |
| **Inputs** | Public prosecution records, Event Log metadata, Reviewer edit statistics, timing data, agent assignment records |
| **Outputs** | Agent outcome scorecards, examiner/art-unit patterns, objection statistics, matching signals, published benchmarks |
| **Dependencies** | Event Log, Integration Hub |
| **Future extensions** | Predictive prosecution models · published industry benchmark reports · claim-language risk scoring |

**Hard constraint (D2):** the ingestion pipeline for this module has *no read access* to Zone 1 disclosure content. It reads structured metadata and public records only. This is enforced at the database permission level, not by convention.

---

## LAYER 1 — CLIENT EXPERIENCE

---

### M1.1 — Public Register (the free wedge)

| | |
|---|---|
| **Purpose** | A materially better Indian patent search and status experience than the official portal, free and ungated. The acquisition engine, the SEO asset, and the public proof of competence. |
| **Primary users** | Anonymous, Free, and every other role |
| **Inputs** | Search queries (natural language, boolean, structured, application number), filters (jurisdiction, date, applicant, inventor, classification, status) |
| **Outputs** | Ranked results, full document views, family views, legal status timelines, downloadable documents, saved searches, status alerts |
| **Dependencies** | Search, Integration Hub, Document Management, Notification |
| **Future extensions** | Multi-jurisdiction unified search (V2) · citation graph visualization · scholarly literature linkage · public API access (V3) |

**Requirements that make this the wedge and not just another search box:**
- Search works with **no account**. Alerts require an account. That is the conversion mechanism.
- **Application status tracking** with change alerts — the single most-wanted, worst-served function in Indian IP.
- Documents retrievable and readable in-browser without downloading a poorly-scanned PDF.
- Every result shows **data freshness and source** ("Status as of 21 Jul 2026, from IP India register") — honesty as a feature, and it protects us when the upstream source is stale.
- **Confidentiality boundary:** queries typed here are ordinary web queries. Anything a user types into the *Vault* never touches this path (P3). The UI must make this distinction visible, because a user searching their own unfiled invention here is a real risk we should actively warn about.

---

### M1.2 — Invention Vault & Disclosure Capture

| | |
|---|---|
| **Purpose** | Capture an invention in structured, confidential, timestamped form. The entry point to the Record and the origin of every downstream artifact. |
| **Primary users** | Workspace Member/Owner, Named Inventor, Researcher (via Institution) |
| **Inputs** | Guided structured input (problem, prior approaches, the invention, how it works, variants, advantages), drawings, files, inventor details, disclosure-history declarations |
| **Outputs** | Versioned Disclosure, immutable timestamp record, structured claim-element candidates, completeness score, readiness assessment |
| **Dependencies** | Document Management, Identity, Event Log, AI Orchestration (Tier 1 assistance only) |
| **Future extensions** | Voice and vernacular capture · lab-notebook and repository ingestion · collaborative multi-inventor drafting · trade-secret alternative pathway (V4) |

**Design requirements:**
- Target completion: **20–30 minutes** for a first-time user. Save and resume is mandatory.
- **Prior disclosure interrogation is a required section**, not optional: has this been published, presented, sold, demonstrated, or discussed under NDA? Dates and evidence. *This single section prevents the most common way inventions are lost.*
- AI assistance here is **Tier 1 only** — it may prompt, structure, and ask clarifying questions. It may never assess patentability inside this module.
- Every save creates an immutable version with a timestamp. The version history is itself evidence of conception and diligence.
- **Zone 1 from the first keystroke.** Encrypted, isolated, never indexed, never logged in plain text, never sent to a provider without a no-training contract.

---

### M1.3 — Assessment

| | |
|---|---|
| **Purpose** | Answer "is this worth protecting?" with source-linked evidence and an honest verdict — including "no." The core differentiation. |
| **Primary users** | Client (requests, reads); Verified Agent (reviews, releases) |
| **Inputs** | A Disclosure version, target jurisdictions, assessment type (novelty / patentability / FTO-lite) |
| **Outputs** | Assessment report — verdict with confidence, ranked prior art with per-reference relevance, claim-element mapping, statutory-exclusion analysis, recommended next actions, reviewer's name and notes, full citation set |
| **Dependencies** | Search, Provenance, AI Orchestration, Document Management, Marketplace (reviewer assignment) |
| **⚠ Dependencies — superseded** | *(Decision G.)* The "Marketplace (reviewer assignment)" dependency above is **superseded**. Reviewer assignment is **queue-based with domain routing**, not the marketplace match (ADR §5, §12). Each Verified Agent sees the subset of the review queue matching their declared technical domains. |
| **Future extensions** | Full FTO with claim-chart output (V3) · invalidity assessment · design-around suggestions · continuous re-assessment as new art publishes |

**The pipeline (async, D5):**

```
1. Decompose disclosure → candidate claim elements + technical concepts
2. Multi-strategy retrieval:
      a. semantic (dense) over full corpus
      b. lexical (boolean/BM25) over expanded terminology
      c. classification-guided (CPC/IPC neighbourhoods)
      d. citation-graph expansion from top hits
      e. applicant/competitor-directed
3. Rerank + deduplicate into a candidate set
4. Element-by-element comparison against each candidate
5. Statutory exclusion analysis (jurisdiction-specific — for India,
   s.3(k) computer-program-per-se and s.3(d) known-substance are the
   two highest-frequency failure modes and get dedicated treatment)
6. Assertion assembly — every claim bound to citations (P2)
7. Confidence scoring with explicit coverage caveats
        │
        ▼
8. HUMAN REVIEW GATE ── Verified Agent reviews, edits, annotates
        │                 Edits are recorded (feeds §20 quality metrics)
        ▼
9. Release to client, with reviewer named
```

**Non-negotiable requirements:**
- **No release without human review** (P7, BR-1). No exceptions, no "express mode."
- **Coverage honesty:** the report states which jurisdictions and document types were searched and which were not. A search that didn't cover Japanese-language art says so.
- **The "don't file" verdict must be a first-class, well-designed outcome** — not a failure state. It should be as carefully presented as a positive one, with clear reasoning and alternatives (design around, trade secret, defensive publication, defer).
- **Reviewer edits are captured as structured diffs**, feeding the AI-quality metric from Phase 2 §20.

---

### M1.4 — Strategy & Cost Planner

| | |
|---|---|
| **Purpose** | Make the twenty-year truth visible before commitment. The honesty proof from Phase 2 §3.3, and free/ungated. |
| **Primary users** | Anonymous, Free, Client, Institution |
| **Inputs** | Jurisdictions, entity type (natural person / startup / small / large), filing route (direct / PCT / Paris), timing choices, claim count assumptions |
| **Outputs** | Twenty-year cost projection with official + professional fees separated, cash-flow timeline, decision-point markers (PCT national phase, examination request, renewal escalation), comparative route analysis, exportable plan |
| **Dependencies** | Rules Engine (official fee schedules), Billing (price book) |
| **Future extensions** | Portfolio-level budget forecasting (V2) · scenario comparison · integration with actual spend for variance analysis · currency and inflation modelling |

**Requirements:**
- **Ungated. No email capture before the number.** (Phase 1 identified IPFlair's gating as the mistake that destroys the tool's trust value.)
- Official fees come from the **Rules Engine**, not a hard-coded table, so they're jurisdiction-agnostic and version-correct.
- The projection **explicitly marks the point at which most owners should consider abandonment**, with the reasoning. This is the feature no competitor will copy because it reduces their revenue.

---

### M1.5 — Marketplace & Engagement

| | |
|---|---|
| **Purpose** | Match an Invention to the right Verified Agent, on published fixed prices, with the quality signal visible. Solves the lemons problem at the point of purchase. |
| **Primary users** | Workspace Owner, TTO Officer; Verified Agent, Agent Org Admin |
| **Inputs** | Invention technical domain, jurisdictions, urgency, budget, client preferences; agent profiles, capacity, credentials, outcome data, conflict declarations |
| **Outputs** | Ranked agent recommendations with rationale, fixed-price quotes, Engagement records, scope definitions, conflict-check results |
| **Dependencies** | Identity, Outcome Data, Billing, Document Management |
| **Future extensions** | Agent bidding for complex matters · specialization certification · multi-agent matters (drafting vs prosecution) · international agent network for foreign filing |

**Requirements:**
- **Conflict check runs before any agent is shown or offered** a matter (BR-10). A flagged conflict removes the agent from consideration silently to the client, with an internal record.
- Agent profiles surface: technical degree and field, registration number and jurisdiction, years in practice, languages, matters handled in this technical area, and — once we have enough volume — outcome statistics with explicit sample sizes. **Never show a statistic without its n.**
- **Prices are fixed and published before engagement.** Scope changes require a new quote; no surprise invoices (BR-6).
- Matching rationale is shown to the client: *"Recommended because: 14 matters in signal processing, 3 with this examiner's art unit, available within 3 days."*

---

### M1.6 — Matter Workspace (client view)

| | |
|---|---|
| **Purpose** | The shared surface for a single piece of professional work. Where the client sees what's happening — the direct answer to the "silence" problem. |
| **Primary users** | Client roles, assigned Agent |
| **Inputs** | Matter state, tasks, documents, messages, deadlines, decisions requested |
| **Outputs** | Status view, action queue, document exchange, decision records, message thread, timeline |
| **Dependencies** | Deadline Engine, Document Management, Notification, Identity |
| **Future extensions** | Video/async review sessions · structured decision templates · client-side approval workflows |

**The single most important design requirement in this module:** at any moment, the client can see **(a) what state the matter is in, (b) what happens next and approximately when, (c) what is required from them, and (d) what has been spent and what is committed.** Four questions, always answered, never requiring an email.

---

### M1.7 — Portfolio & Docket (client view)

| | |
|---|---|
| **Purpose** | The Record made visible. Every Invention, Application, deadline, document and cost in one place, across jurisdictions and agents. |
| **Primary users** | Workspace Owner/Admin, Institution roles, ICP-4 (corporate IP head) |
| **Inputs** | Applications, Deadlines, Documents, Costs, Events, Renewal schedules |
| **Outputs** | Portfolio views (list, family tree, timeline, jurisdiction map), deadline calendar, cost dashboard, export |
| **Dependencies** | Deadline Engine, Billing, Document Management, Search |
| **Future extensions** | Competitor monitoring overlay (V2) · portfolio health scoring · annual review workflow · board-ready reporting |

---

### M1.8 — Renewals & Annuities

| | |
|---|---|
| **Purpose** | Track, decide, and pay renewals for twenty years. The highest-margin recurring revenue in the business (Phase 2 §10.1) and the module with the most severe consequences if it fails. |
| **Primary users** | Workspace Owner, Institution Admin, ICP-4; Docket Ops |
| **Inputs** | Grant events, jurisdiction annuity schedules (from Rules), payment authorizations, portfolio value signals |
| **Outputs** | Renewal calendar, cost forecasts, renew/abandon recommendations with reasoning, payment execution records, confirmation receipts |
| **Dependencies** | Deadline Engine, Rules Engine, Billing, Integration Hub, Notification |
| **Future extensions** | Automated payment with standing authority · portfolio pruning workflows · renewal decisions informed by monitoring data · grace-period and restoration handling |

**Requirements:**
- **Escalating alert schedule** with a defined ladder (e.g. 180/90/30/14/7/3/1 days) across multiple channels, escalating to phone contact for high-value assets.
- **Abandonment must be an explicit, confirmed, recorded decision** — never a passive lapse from non-response. If the owner does not respond, the system escalates rather than defaults. (BR-11)
- **Renew/abandon recommendations must show reasoning**, not a score. This is the F6 job from Phase 2 that literally nobody serves.

---

### M1.9 — Guidance & Learning

| | |
|---|---|
| **Purpose** | Make every user more capable, not more dependent. SEO asset, trust builder, support-cost reducer. |
| **Primary users** | Anonymous, Free, all client roles |
| **Inputs** | Editorial content, contextual triggers, user state |
| **Outputs** | Explainers, jurisdiction guides, glossary, contextual help, decision aids |
| **Dependencies** | None (mostly content); contextual surfacing from other modules |
| **Future extensions** | Indian-language content (V2) · interactive courses · institutional curriculum · certification for agents |

---

## LAYER 2 — PROFESSIONAL EXPERIENCE

> **Phase 2 §8 established that agent capacity is the hard ceiling on the business.** Layer 2 is not a secondary surface. It should be built with the same care as Layer 1, and parts of it should be built *first*, because agents adopt tooling before they adopt a marketplace.

---

### M2.1 — Agent Console & Docket

| | |
|---|---|
| **Purpose** | Replace the Excel-sheet-and-Google-Calendar reality of ICP-2 with a docket that cannot fail. The standalone value that acquires agents before we have demand to offer them. |
| **Primary users** | Verified Agent, Agent Org Admin |
| **Inputs** | Assigned matters, deadlines, tasks, client communications, capacity settings, own-practice matters (imported, not from the marketplace) |
| **Outputs** | Prioritized work queue, docket calendar, deadline confirmations, capacity view, time and fee records |
| **Dependencies** | Deadline Engine, Notification, Identity, Document Management |
| **Future extensions** | Full practice management · trust accounting · own-client portal white-labelling (V2) · staff delegation and supervision workflows |

**Critical requirement:** an agent must be able to bring their **existing non-platform matters** into the docket. This is the adoption unlock — Priya (ICP-2) will adopt for her own 45 matters long before she takes a marketplace matter. Those matters are hers, in her tenancy, and the platform earns trust by protecting them.

---

### M2.2 — Drafting Workspace

| | |
|---|---|
| **Purpose** | Compress drafting hours without compromising claim quality. The core of the "agent-hours per matter −40%" metric. |
| **Primary users** | Verified Agent |
| **Inputs** | Disclosure, Assessment, prior art set, jurisdiction requirements, firm/agent style preferences, precedent library |
| **Outputs** | Specification drafts, claim sets with dependency structure, drawings references, filing-ready documents, version history with attribution of AI vs human contribution |
| **Dependencies** | AI Orchestration, Provenance, Rules Engine (formal requirements), Document Management |
| **Future extensions** | Claim-scope analysis and breadth warnings · statutory-exclusion pre-check before filing · multi-jurisdiction claim adaptation · office-action-history-informed drafting |

**Boundaries (from §12):**
- AI generates **first drafts and suggestions**; the agent edits and owns the output.
- **Every AI suggestion is attributed and diffable.** The agent can always see what the AI proposed vs what they wrote. This matters for professional accountability and for our quality metrics.
- **Claim-scope warnings, not claim-scope decisions.** The system may flag that a limitation appears unnecessarily narrowing; it may not remove it.
- No autonomous filing. Ever. (BR-9)

---

### M2.3 — Prosecution Workspace

| | |
|---|---|
| **Purpose** | Handle examination reports and office actions — the highest-frequency recurring professional work after filing. |
| **Primary users** | Verified Agent |
| **Inputs** | Office action / FER document, cited references, application history, claim set, jurisdiction response rules |
| **Outputs** | Structured objection breakdown, cited-reference analysis, response strategy options, response drafts, amendment tracking, filing package |
| **Dependencies** | AI Orchestration, Provenance, Search, Deadline Engine, Document Management |
| **Future extensions** | Examiner-pattern intelligence from Outcome Data · interview preparation · appeal support · opposition handling |

**High-value requirement:** automatic extraction of objections from an FER into a structured checklist, each mapped to the cited reference and the affected claims, with response status tracked. This alone removes hours of manual work per response and is a strong agent-acquisition feature.

---

### M2.4 — Agent Profile & Outcome Record

| | |
|---|---|
| **Purpose** | Make quality visible (Phase 2 §6.2). The agent's professional identity on the platform and the trust signal for clients. |
| **Primary users** | Verified Agent (manages); Client (reads); Marketplace (consumes) |
| **Inputs** | Credentials and verification evidence, technical background, self-declared specialization, derived outcome metadata |
| **Outputs** | Public profile, outcome statistics with sample sizes, capacity and availability, verification badges |
| **Dependencies** | Identity, Outcome Data, Marketplace |
| **Future extensions** | Peer review · specialization certification · portable reputation · earnings and utilization analytics for the agent |

**Ethical requirements, which are also product requirements:**
- **No statistic without its sample size.** "First-action allowance 62% (n=34)" not "62%."
- Agents see their own statistics **before** clients do, with a defined correction/dispute process.
- Outcome statistics only appear publicly above a minimum n (proposed: 20 matters in a category). Below that, credentials and background only.
- Statistics are **contextualized by technology area** — allowance rates in mechanical vs software are not comparable, and presenting them as though they were would be actively misleading.

---

## LAYER 3 — INSTITUTIONAL EXPERIENCE (V2)

---

### M3.1 — Institutional Disclosure Intake & Triage

| | |
|---|---|
| **Purpose** | Solve ICP-3's problem: capture inventions from a research population before they're destroyed by publication. |
| **Primary users** | Researcher/Faculty, TTO Officer, Institution Admin |
| **Inputs** | Researcher disclosures, publication calendars, funding-agency identifiers, department/unit assignment |
| **Outputs** | Triaged disclosure pipeline, priority scoring, assignment to TTO officers, conflict-with-publication alerts |
| **Dependencies** | Invention Vault, Assessment, Notification, Identity |
| **Future extensions** | Research-system integration (repositories, grant systems, ORCID) · student-invention workflows · industry-collaboration IP terms |

**The differentiating feature:** **publication-conflict detection.** A researcher records an upcoming paper, conference or thesis submission; the system flags the novelty risk and the filing deadline it creates. This is the single most valuable thing we can do for a university and nobody offers it.

---

### M3.2 — Ownership, Approvals & Compliance

| | |
|---|---|
| **Purpose** | Answer "who owns this?" and route the approvals that follow — the confusion that paralyses institutional filing. |
| **Primary users** | TTO Officer, Institution Approver, Institution Admin |
| **Inputs** | Institutional IP policy, employment/studentship status, funding-agency terms, collaboration agreements, inventorship declarations |
| **Outputs** | Ownership determination records, inventorship records, approval workflows, compliance reports, assignment documents |
| **Dependencies** | Identity, Document Management, Event Log |
| **Future extensions** | Automated revenue-sharing calculation · multi-institution collaboration handling · government funding reporting |

---

### M3.3 — Institutional Portfolio & Budget

| | |
|---|---|
| **Purpose** | The institution's view of its own IP estate, spend and pipeline. |
| **Primary users** | Institution Admin, TTO Officer, Approver |
| **Inputs** | Institutional applications, deadlines, costs, budget allocations, disclosure pipeline |
| **Outputs** | Portfolio dashboard, budget vs actual, pipeline forecast, unit/department breakdown, reporting exports |
| **Dependencies** | Portfolio module, Billing, Deadline Engine |
| **Future extensions** | Technology-transfer and licensing pipeline · impact reporting · benchmarking against peer institutions |

---

## LAYER 4 — INTERNAL OPERATIONS

---

### M4.1 — Docket Health Console ★

| | |
|---|---|
| **Purpose** | The single most important internal surface. Ensures no deadline is ever missed (P4). |
| **Primary users** | Docket Ops, Platform Admin |
| **Inputs** | All deadlines, confirmation states, source discrepancies, alert delivery receipts, escalation states |
| **Outputs** | Risk-ranked deadline queue, unconfirmed critical dates, source-conflict queue, undelivered-alert queue, escalation actions |
| **Dependencies** | Deadline Engine, Notification, Integration Hub |
| **Future extensions** | Predictive risk scoring · automated escalation policies · client-facing reliability reporting |

**Operating requirement:** this console is monitored during business hours with a defined on-call rotation outside them. A critical deadline within 14 days that is unconfirmed, or an alert that failed delivery on all channels, is a **paging event**, not a queue item.

---

### M4.2 — Quality & Review Console

| | |
|---|---|
| **Purpose** | Measure and improve AI and professional output quality. Generates the Phase 2 §20 quality metrics. |
| **Primary users** | Quality Reviewer, Platform Admin |
| **Inputs** | Reviewer edit diffs, assessment outputs, prosecution outcomes, client feedback, sampling policy |
| **Outputs** | AI quality metrics (edit rate, edit severity), agent quality metrics, eval results, model regression alerts, published benchmark inputs |
| **Dependencies** | AI Orchestration, Outcome Data, Provenance |
| **Future extensions** | Automated eval harness on golden datasets · model comparison · public benchmark publication (the PatSnap PatentBench move from Phase 1) |

---

### M4.3 — Marketplace Operations

| | |
|---|---|
| **Purpose** | Agent verification, onboarding, capacity management, conflict resolution, dispute handling. |
| **Primary users** | Marketplace Ops, Trust & Safety |
| **Inputs** | Agent applications, credential evidence, capacity signals, demand forecasts, conflicts, disputes |
| **Outputs** | Verification decisions, capacity alerts, supply/demand balance, dispute resolutions, agent standing |
| **Dependencies** | Identity, Outcome Data, Marketplace |
| **Future extensions** | Automated credential verification against official registers · capacity forecasting · agent development programmes |

---

### M4.4 — Rule Authoring Console ★

| | |
|---|---|
| **Purpose** | Author, test, version and publish jurisdiction rules. The operational counterpart to D1 — this is how new jurisdictions get added. |
| **Primary users** | Rule Author (internal, with external jurisdiction counsel input) |
| **Inputs** | Statutory provisions, patent rules, official fee schedules, calendars, procedural practice notes |
| **Outputs** | Versioned rule sets with effective dates, test results against golden cases, publication records, impact analysis |
| **Dependencies** | Deadline Engine, Event Log |
| **Future extensions** | Jurisdiction-expert contribution workflow · automated monitoring of official rule-change publications · rule-change simulation across the live portfolio |

**Mandatory workflow:** no rule reaches production without (a) passing a golden test suite of known-correct historical cases for that jurisdiction, (b) a documented source citation to the statutory provision, and (c) a second-person review. Rule changes trigger an **impact report** showing every affected live deadline before publication.

---

### M4.5 — Trust, Incident & Support Console

| | |
|---|---|
| **Purpose** | Handle security incidents, data requests, error disclosure, and consent-gated support access. |
| **Primary users** | Trust & Safety, Support, Platform Admin |
| **Inputs** | Incident reports, access requests, deletion requests, complaint records, security alerts |
| **Outputs** | Incident records and timelines, disclosure communications, access grants with justification, resolution records |
| **Dependencies** | Identity, Event Log, Notification |
| **Future extensions** | Automated breach-notification workflows · regulatory reporting · public status and transparency page |

---

## LAYER 5 — EXTERNAL SURFACE (V3)

---

### M5.1 — Public API & Developer Platform

*Strategy in §21.*

| | |
|---|---|
| **Purpose** | Turn the platform into infrastructure others build on. |
| **Primary users** | Service Accounts, partner developers, enterprise client systems |
| **Inputs** | Authenticated API requests, webhook subscriptions |
| **Outputs** | Resource representations, event webhooks, usage telemetry, developer documentation |
| **Dependencies** | Every module (read paths), Identity |
| **Future extensions** | Marketplace of third-party integrations · MCP server for AI agent access · embeddable widgets |

---

## 6. Dashboards

A dashboard that does not support a specific recurring decision is decoration. Each below is specified by the decision it enables.

| Dashboard | Primary user | Decision it supports | Key elements |
|---|---|---|---|
| **Client Portfolio** | Workspace Owner, ICP-4 | *Where does my IP stand and what needs attention?* | Assets by status and jurisdiction · next 90 days of deadlines · spend to date and committed · items awaiting my decision · family tree view |
| **Matter** | Client + Agent | *What's happening and what do I need to do?* | Current state · next milestone with date · my open actions · document exchange · cost position · message thread |
| **Cost & Budget** | Workspace Owner, Institution Admin | *What will this cost and can I afford it?* | 20-year projection · committed vs forecast · upcoming decision points · variance to plan · per-asset cost |
| **Renewal Decisions** | Workspace Owner, ICP-4 | *Which assets do I keep?* | Renewals due in 12 months with cost · recommendation with reasoning · cumulative spend per asset · abandon impact |
| **Agent Docket** | Verified Agent | *What must I do today, and what could bite me?* | Risk-ranked deadlines · unconfirmed critical dates · matters awaiting my action · capacity vs commitment |
| **Agent Performance** | Verified Agent | *How am I doing and where can I improve?* | Outcome statistics with n · turnaround times · client feedback · earnings and utilization · peer benchmark (anonymized) |
| **Institution Pipeline** | TTO Officer | *What's in the funnel and what's at risk?* | Disclosures by stage · publication-conflict alerts · awaiting approval · time-in-stage · by department |
| **Institution Portfolio & Budget** | Institution Admin | *Is the IP programme performing and on budget?* | Portfolio composition · budget vs actual by unit · filing volume trend · pipeline forecast |
| **Docket Health ★** | Docket Ops | *Is any deadline at risk right now?* | Unconfirmed critical dates · alert delivery failures · source discrepancies · escalations open · **days since last missed deadline** |
| **Quality** | Quality Reviewer | *Is the AI working and is agent work good?* | AI edit rate trend by task type · edit severity distribution · eval scores · outcome quality by agent · regression alerts |
| **Marketplace Health** | Marketplace Ops | *Do we have the right supply?* | Supply/demand by technical domain · agent utilization · time-to-match · conflict rate · agent churn |
| **Business** | Leadership | *Are the four numbers moving?* | Disclosure→filing conversion · agent-hours per matter · recurring revenue share · **missed deadlines (target zero)** |

---

## 7. Navigation structure

*Phase 4 owns the detail. This is the skeleton it should elaborate.*

### 7.1 The organizing principle

Phase 1 identified four IA models and concluded the answer is **two-axis: segment × lifecycle stage**, with an intelligent router for people who can't self-place. That resolves into:

- **Unauthenticated:** segment-first (who are you?) + a router (the solution finder)
- **Authenticated:** lifecycle-first (where is my invention?), because once you're in, you have a specific thing you're trying to do

### 7.2 Unauthenticated top level

```
[Logo]   Search   Solutions ▾   Pricing   Learn   For Agents        [Sign in] [Start free]

Solutions ▾
├── By stage        I have an idea · I want to file · I've filed · I own patents
├── By who you are  Startups · Universities · Companies · Patent Agents · Inventors
└── Tools           Patent search · Cost calculator · Solution finder
```

**Requirements:**
- **Search is a top-level destination, not buried under Tools.** It is the wedge; it gets the most prominent placement.
- **Pricing is a top-level item with real numbers behind it.** (Phase 1: almost nobody in this industry does this. It is a differentiator by itself.)
- **"For Agents" is top-level**, because the supply side is a first-class audience (Phase 2 §8).
- No megamenu. Maximum two levels. (Phase 1 §4.1 — the Questel/Anaqua failure mode.)

### 7.3 Authenticated client navigation

```
├── Home            Action queue · what changed · next deadlines
├── Inventions      The Vault — disclosures, assessments, decisions
├── Portfolio       Filed applications, families, status, documents
├── Deadlines       Calendar and list, all jurisdictions
├── Matters         Active professional work
├── Costs           Spend, forecasts, invoices
└── Documents       Everything, searchable
```

Seven items. Persistent global search. A single, always-visible "what needs my attention" count.

### 7.4 Authenticated agent navigation

```
├── Today           Risk-ranked work queue
├── Docket          All deadlines across all matters
├── Matters         Platform matters + own-practice matters
├── Workspace       Drafting · Prosecution
├── Opportunities   Available marketplace matters
└── Practice        Profile, outcomes, earnings, capacity
```

### 7.5 Navigation rules

1. Maximum two levels of nesting anywhere.
2. Every screen answers "where am I, what can I do, what's next."
3. The action queue is reachable in one click from everywhere.
4. Global search reaches Inventions, Applications, Documents, Matters and the public register from a single input, with scoped results.
5. Nothing critical lives only inside a hover menu (accessibility + mobile).

---

## 8. User journeys

Specified as step sequences with system responsibilities. Phase 5 expands these into full flows with error and edge paths.

---

### J1 — Anonymous searcher → registered free user
1. Arrives via organic search on a patent number or technical query
2. **Searches without an account** — full results, full documents
3. Views an application's status timeline
4. Attempts to set a status alert → **account required** (the single conversion gate)
5. Registers (email + verification, no phone, no sales contact)
6. Alert configured; digest preferences set
**System:** zero friction before value; one clean gate at the point of ongoing value; no dark patterns; no sales follow-up.

---

### J2 — First-time inventor → disclosure → honest verdict

> **Superseded notice (Decision G).**
> **Step 7's** "an honest time estimate (hours, not seconds)" is **retired** (ADR §12). It was never compatible with mandatory human review (BR-01).
> The client is shown a **committed, configurable review turnaround** for the review stage, distinct from the faster automated analysis stage (ADR §9). The turnaround value is a configuration, not a fixed commitment.
> Also relevant to this journey: the assessment is **free to the client** and precedes any payment or Engagement (ADR §7). The steps below are otherwise unchanged.

1. Arrives with an idea, no patent knowledge
2. Runs the **Cost Planner** ungated — sees a real twenty-year number
3. Reads guidance; understands the process
4. Creates a Workspace and starts a **Disclosure**
5. Guided capture, including mandatory prior-disclosure interrogation
6. Saves progress; returns later; completes
7. Requests an **Assessment**; sees an honest time estimate (hours, not seconds)
8. Assessment runs async with visible progress and intermediate findings
9. **Human review gate** — a named agent reviews and releases
10. Client receives a verdict with confidence, ranked prior art, clickable citations, statutory-exclusion analysis, and recommended actions
11. **Branch A — favourable:** proceed to J3
12. **Branch B — unfavourable:** clear reasoning, the blocking references shown, and genuine alternatives (design around · trade secret · defensive publication · defer). Invention stays in the Vault and can be re-assessed as it evolves.
**System:** Branch B must be as well-designed as Branch A. It is the proof of §3.3 and the reason the brand is credible.

---

### J3 — Decision to file → engagement → filed
1. From a favourable Assessment, client chooses jurisdictions and route
2. Cost Planner updates with the specific choice
3. **Marketplace** proposes matched agents with rationale and fixed prices
4. Conflict check runs before agents are shown
5. Client selects; reviews scope; accepts a fixed-price quote
6. **Engagement** created → **Matter** created → matter-scoped access granted to the agent
7. Agent reviews Disclosure and Assessment in the **Drafting Workspace**
8. Agent may request clarification via structured questions in the Matter Workspace
9. Draft produced (AI-assisted, agent-owned); client reviews the specification and claims
10. Client approves; agent files with the office
11. **Application** entity created; filing Event recorded
12. **Deadline Engine recomputes** the full deadline set for that jurisdiction and route
13. Client sees confirmed deadlines and the twenty-year timeline populate
**System:** step 12 is the moment the Record becomes valuable and the switching cost begins.

---

### J4 — Filed → examination → grant
1. Integration Hub polls the office register; detects status change
2. Event recorded → deadlines recomputed → client and agent notified
3. Examination report issues; document ingested and attached
4. **Prosecution Workspace** extracts objections into a structured checklist
5. Response deadline computed and classified critical; **dual confirmation required**
6. Agent drafts response (AI-assisted); client reviews any claim amendments
7. Response filed; Event recorded; deadlines recomputed
8. Repeat as required; each cycle recorded
9. Grant Event → renewal schedule generated → Renewals module activates
10. **Outcome metadata written to Zone 3** — objections, timings, claim-scope delta
**System:** step 10 is where the moat compounds. It happens automatically, on metadata only.

---

### J5 — Renewal decision
1. Renewal due in 180 days → first notification
2. Portfolio dashboard surfaces the decision with a **recommendation and its reasoning** — commercial use, competitive relevance, cumulative spend, remaining term, jurisdiction value
3. Client reviews; may consult their agent within the Matter
4. Decision recorded explicitly: **renew** or **abandon**
5a. Renew → payment authorized → paid → receipt → next renewal scheduled
5b. Abandon → **explicit confirmation with consequences stated** → decision recorded → asset marked lapsed
6. **No response → escalating alerts, never a passive lapse.** Escalation reaches phone contact before the final window.
**System:** BR-11. Passive lapse is a product failure, not a user choice.

---

### J6 — Agent onboarding
1. Agent arrives via "For Agents" or referral
2. Sees the value proposition: **free docket first, matters second**
3. Registers; submits credentials (registration number, qualification evidence, identity)
4. Verification against the official register `[§26.4 dependency]` + manual review
5. Verified → **imports their own existing matters** into the docket
6. Deadline Engine computes their deadlines; agent immediately gets standalone value
7. Profile completed; specializations declared; conflict list declared
8. Capacity set; opts into marketplace opportunities
9. First matter offered with full context and a fixed fee
**System:** steps 5–6 are the adoption unlock. The agent gets value before the platform asks for anything.

---

### J7 — Agent daily workflow
1. Opens **Today** — risk-ranked queue
2. Confirms critical deadlines requiring confirmation
3. Works matters in priority order across Drafting and Prosecution workspaces
4. Client questions answered in Matter threads
5. Time and progress recorded; client status auto-updates from state changes, not manual updates
**System:** the client's status view updates from the agent's actual work, so nobody has to write a status email. This is how the "silence" problem gets solved structurally rather than by discipline.

---

### J8 — University disclosure
1. Researcher receives a departmental prompt or arrives via their TTO
2. Completes a Disclosure through the institution's workspace
3. **Declares upcoming publications** → system flags any novelty conflict and the deadline it creates
4. TTO Officer triages; ownership determination runs against institutional policy and funding terms
5. Assessment requested; reviewed; released
6. Approval workflow routed to the Approver with cost and recommendation
7. Approved → Marketplace → J3, with institutional billing
8. Researcher retains visibility of their own Invention throughout without seeing the institutional portfolio
**System:** step 3 is the killer feature. Step 8 is why the Party↔Invention model needs role qualifiers (§14).

---

### J9 — Deadline at risk (the exception path that matters most)
1. Critical deadline enters the alert window
2. Notification issued to client and agent across configured channels
3. **No acknowledgement** → escalation ladder advances (channel escalation, then frequency escalation)
4. Still unacknowledged at the internal threshold → **Docket Health Console flags it; Docket Ops is paged**
5. Docket Ops attempts direct contact; records every attempt
6. Deadline passes without action → **incident recorded, client notified immediately, root cause analysis mandatory, restoration options assessed**
**System:** the outcome is never silent. Even in the worst case, the client learns from us first, immediately, with options.

---

## 9. Functional requirements

Grouped by capability. `M` = MVP, `2` = V2, `3` = V3.

### 9.1 Search & Register

| ID | Requirement | Rel |
|---|---|---|
| FR-S01 | Full-text search across Indian patents and applications without authentication | M |
| FR-S02 | Natural-language, boolean and structured (field-scoped) query modes | M |
| FR-S03 | Filter by jurisdiction, date range, applicant, inventor, classification, legal status | M |
| FR-S04 | Application status timeline with every recorded event and its source | M |
| FR-S05 | Every result displays data freshness and source attribution | M |
| FR-S06 | Retrieve and view associated documents in-browser | M |
| FR-S07 | Save searches and receive alerts on new results (account required) | M |
| FR-S08 | Alert on status change for a watched application | M |
| FR-S09 | Patent family view across jurisdictions | 2 |
| FR-S10 | Multi-jurisdiction unified search | 2 |
| FR-S11 | Warn users against searching their own unpublished invention in the public tool | M |

### 9.2 Invention & Disclosure

| ID | Requirement | Rel |
|---|---|---|
| FR-D01 | Guided structured disclosure capture with save/resume | M |
| FR-D02 | Immutable versioning with timestamp on every save | M |
| FR-D03 | Mandatory prior-disclosure declaration section | M |
| FR-D04 | Attachment of drawings, documents and supporting files | M |
| FR-D05 | Multiple named inventors, with roles, on a single Invention | M |
| FR-D06 | Completeness scoring with specific guidance on gaps | M |
| FR-D07 | Tier-1 AI assistance for structuring and clarifying questions only | M |
| FR-D08 | Full version history visible and exportable as evidence of conception | M |
| FR-D09 | Invention persists independently of any Application | M |
| FR-D10 | Voice and vernacular-language capture | 3 |

### 9.3 Assessment

| ID | Requirement | Rel |
|---|---|---|
| FR-A01 | Multi-strategy retrieval (semantic, lexical, classification-guided, citation-expanded) | M |
| FR-A02 | Element-by-element comparison against each candidate reference | M |
| FR-A03 | Every assertion bound to ≥1 resolvable citation with passage span | M |
| FR-A04 | Jurisdiction-specific statutory exclusion analysis (India: s.3(k), s.3(d) at minimum) | M |
| FR-A05 | Explicit coverage statement — what was and was not searched | M |
| FR-A06 | Confidence scoring with stated basis | M |
| FR-A07 | Mandatory human review before release; reviewer named on the output | M |
| FR-A08 | Reviewer edits captured as structured diffs | M |
| FR-A09 | "Do not file" as a fully-designed first-class outcome with alternatives | M |
| FR-A10 | Async execution with visible progress and intermediate findings | M |
| FR-A11 | Re-assessment of an evolved Disclosure with diff against the prior assessment | 2 |
| FR-A12 | Continuous monitoring for newly-published relevant art | 2 |
| FR-A13 | Full FTO with claim-chart output | 3 |

### 9.4 Cost & Strategy

| ID | Requirement | Rel |
|---|---|---|
| FR-C01 | Twenty-year cost projection, ungated, no email capture | M |
| FR-C02 | Official and professional fees itemized separately | M |
| FR-C03 | Official fees sourced from the versioned Rules Engine | M |
| FR-C04 | Entity-type-aware fee calculation (natural person / startup / small / large) | M |
| FR-C05 | Route comparison (direct vs PCT vs Paris Convention) | M |
| FR-C06 | Decision points marked on the timeline | M |
| FR-C07 | Explicit abandonment-consideration guidance on the projection | M |
| FR-C08 | Portfolio-level budget forecasting | 2 |
| FR-C09 | Multi-currency | 2 |

### 9.5 Marketplace & Engagement

| ID | Requirement | Rel |
|---|---|---|
| FR-M01 | Agent matching with visible rationale | M |
| FR-M02 | Conflict check before an agent is offered or shown | M |
| FR-M03 | Fixed published prices before engagement | M |
| FR-M04 | Explicit scope definition; changes require a new quote | M |
| FR-M05 | Agent profiles with verified credentials and technical background | M |
| FR-M06 | Outcome statistics with sample sizes, above a minimum n, contextualized by domain | 2 |
| FR-M07 | Matter-scoped, time-bounded access grants on engagement | M |
| FR-M08 | Access revocation on schedule after matter closure | M |

### 9.6 Deadlines

| ID | Requirement | Rel |
|---|---|---|
| FR-T01 | Deadlines computed from Events via versioned Rules; never hard-coded | M |
| FR-T02 | Every deadline exposes a human-readable computation trace | M |
| FR-T03 | Criticality classification (critical / important / informational) | M |
| FR-T04 | Critical deadlines require dual confirmation before the matter advances | M |
| FR-T05 | Recomputation on every relevant Event, with a visible diff | M |
| FR-T06 | Verification against official register dates where available | M |
| FR-T07 | Escalating multi-channel alerts on a configurable ladder | M |
| FR-T08 | Extension and restoration provisions modelled as rules | M |
| FR-T09 | Jurisdiction calendars including office closures and holidays | M |
| FR-T10 | Client-configurable internal buffer before official dates | 2 |

### 9.7 Professional workspace

| ID | Requirement | Rel |
|---|---|---|
| FR-P01 | Unified docket across platform and own-practice matters | M |
| FR-P02 | Import of an agent's existing matters | M |
| FR-P03 | Risk-ranked daily work queue | M |
| FR-P04 | AI-assisted drafting with attributed, diffable suggestions | 2 |
| FR-P05 | Formal requirements checking against jurisdiction rules | 2 |
| FR-P06 | Automatic objection extraction from office actions into a structured checklist | 2 |
| FR-P07 | Response drafting assistance with cited-reference analysis | 2 |
| FR-P08 | Claim-scope warnings (advisory, never automatic amendment) | 2 |
| FR-P09 | Filing package assembly | 2 |

### 9.8 Portfolio, renewals & documents

| ID | Requirement | Rel |
|---|---|---|
| FR-R01 | Unified portfolio view across jurisdictions and agents | M |
| FR-R02 | Renewal calendar with cost forecasts | 2 |
| FR-R03 | Renew/abandon recommendation with stated reasoning | 2 |
| FR-R04 | Abandonment requires explicit confirmation; passive lapse prohibited | 2 |
| FR-R05 | Payment execution with confirmation receipts | 2 |
| FR-R06 | Versioned document storage with classification | M |
| FR-R07 | Full-text search across a workspace's own documents | M |
| FR-R08 | Complete access audit trail per document | M |
| FR-R09 | Full data export in open formats | M |

---

## 10. Non-functional requirements

### 10.1 Correctness (highest priority — this is a reliability product)

| ID | Requirement |
|---|---|
| NFR-C01 | **Missed deadlines attributable to platform error: zero.** Any occurrence is a Sev-1 incident with mandatory post-mortem and client disclosure within 24 hours. |
| NFR-C02 | Every deadline computation is reproducible from the Event Log and the rule version in force |
| NFR-C03 | Rule changes never silently alter existing deadlines; changes produce an impact report and an explicit diff |
| NFR-C04 | Financial calculations use exact decimal arithmetic; no floating-point currency |
| NFR-C05 | All dates stored in UTC with the jurisdiction's governing timezone recorded separately; date arithmetic performed in the jurisdiction's local calendar |

### 10.2 Availability & reliability

| ID | Requirement |
|---|---|
| NFR-A01 | Core platform availability target 99.9% |
| NFR-A02 | Deadline computation and alerting must survive any single external source failure (P8) |
| NFR-A03 | RPO ≤ 5 minutes; RTO ≤ 4 hours |
| NFR-A04 | Notification delivery for critical events is at-least-once with receipt tracking and cross-channel fallback |
| NFR-A05 | Public register search degrades to cached data rather than erroring when upstream sources are unavailable |

### 10.3 Performance

| ID | Requirement |
|---|---|
| NFR-P01 | Public search results p95 < 800ms |
| NFR-P02 | Authenticated page interactive p95 < 2.0s on a mid-range mobile device over 4G |
| NFR-P03 | Assessment jobs: progress visible within 10s; intermediate findings within 2 minutes; completion target < 30 minutes |
| NFR-P04 | Document retrieval p95 < 1.5s |
| NFR-P05 | Performance budget: initial JS payload ≤ 200KB compressed for public pages |

### 10.4 Security & privacy

| ID | Requirement |
|---|---|
| NFR-S01 | TLS 1.3 in transit; AES-256 at rest |
| NFR-S02 | Zone 1 (confidential disclosure) encrypted with separate key material from Zone 2 |
| NFR-S03 | MFA mandatory for Agents, Institution Admins, all internal roles |
| NFR-S04 | Complete access audit trail, immutable, retained per policy |
| NFR-S05 | No Zone 1 content transmitted to any third party without a contractual no-training, no-retention guarantee |
| NFR-S06 | Zone 1 content never written to shared logs, error traces or observability systems |
| NFR-S07 | Annual third-party penetration test; SOC 2 Type 1 by V2 |
| NFR-S08 | Data residency configurable per Workspace (architecture ready at MVP, activated V3) |

### 10.5 Accessibility

| ID | Requirement |
|---|---|
| NFR-X01 | **WCAG 2.2 Level AA across all client-facing surfaces.** Phase 1 found accessibility unaddressed across all 30 competitors — this is free differentiation and matters to institutional buyers. |
| NFR-X02 | Full keyboard navigability; no keyboard traps; visible focus indicators |
| NFR-X03 | Screen-reader tested on primary journeys |
| NFR-X04 | Minimum 4.5:1 contrast for body text; no information conveyed by colour alone |
| NFR-X05 | Respects reduced-motion preferences |

### 10.6 Internationalization

| ID | Requirement |
|---|---|
| NFR-I01 | All user-facing strings externalized from day one; no hard-coded copy |
| NFR-I02 | Locale-aware date, number and currency formatting |
| NFR-I03 | Unicode throughout; correct handling of Indic scripts and CJK in the corpus |
| NFR-I04 | RTL-capable layout structure (not styled at MVP, not architecturally precluded) |
| NFR-I05 | Content translatable independently of UI |

### 10.7 Observability & operability

| ID | Requirement |
|---|---|
| NFR-O01 | Distributed tracing across all AI job pipelines |
| NFR-O02 | Every AI job records model, version, prompt template version, retrieval set, cost |
| NFR-O03 | Business-metric instrumentation for all four Phase 2 headline metrics |
| NFR-O04 | Source reliability telemetry per integration |
| NFR-O05 | Alerting on deadline-engine anomalies (unexpected recomputation volume, rule test failures) |

---

## 11. Business rules

Invariants the system enforces regardless of user role or interface.

| ID | Rule | Enforcement |
|---|---|---|
| **BR-01** | An Assessment cannot be released to a client until a Verified Agent has reviewed it and recorded a decision | State machine; no bypass path |
| **BR-02** | No Assertion may be persisted or displayed without ≥1 resolvable Citation | Type constraint + DB constraint |
| **BR-03** | A critical Deadline must be confirmed by both the system and a human before the Matter advances past it | Workflow gate |
| **BR-04** | Zone 1 content is never transmitted to a third party lacking a no-training, no-retention contract | Network egress policy + code review gate |
| **BR-05** | An Agent may access only Documents, Disclosure versions and Deadlines within Matters explicitly assigned to them | Authorization evaluation on every access |
| **BR-06** | Prices are fixed at engagement; scope changes require a new accepted quote | Billing state machine |
| **BR-07** | Deadline rules are versioned; historical computations remain reproducible against the rule version in force at the time | Immutable rule versions; computation records the version used |
| **BR-08** | A Matter cannot be closed while it has open critical Deadlines | Closure precondition |
| **BR-09** | No AI output may be the sole basis for a filing, abandonment or amendment decision; a human decision record must exist | Decision entity requires an actor of a human role |
| **BR-10** | Conflict check must pass before an Agent is offered or assigned a Matter | Pre-assignment gate |
| **BR-11** | Abandonment requires explicit confirmed decision; passive non-response escalates rather than lapsing | Renewal workflow; escalation ladder |
| **BR-12** | An Invention persists independently of any Application and is never deleted by an Application's lifecycle | Referential design |
| **BR-13** | Every Deadline exposes the rule, trigger event and calculation that produced it | Computation trace stored with the deadline |
| **BR-14** | Official fees displayed anywhere derive from the Rules Engine, never from a hard-coded value | Single source; lint rule |
| **BR-15** | Outcome Data ingestion has no read access to Zone 1 | Database-level permission |
| **BR-16** | Support access to a Workspace requires stated justification, is time-boxed, and is visible in the Workspace's audit log | Access grant workflow |
| **BR-17** | A published outcome statistic must include its sample size and technology-domain context | Rendering constraint |
| **BR-18** | Documents associated with a filed Application are retained per jurisdiction requirements regardless of account status | Retention policy override |
| **BR-19** | Every Application must have exactly one accountable Verified Agent at any time | State invariant |
| **BR-20** | A Disclosure version referenced by a released Assessment or a filed Application becomes immutable | Version locking |

> **Extension notice — BR-05 (Decision F).**
> BR-05 as written — *"An Agent may access only Documents, Disclosure versions and Deadlines within Matters explicitly assigned to them"* — would deny a Reviewer all access, because no Matter exists at the time an Assessment is reviewed (ADR §4).
> BR-05 is **extended, not replaced.** Two authorization paths exist:
> 1. the **Engagement grant** — matter-scoped, unchanged by this notice; and
> 2. the **review grant** (ADR §6) — strictly narrower, covering exactly one Disclosure version and the analysis under review, for exactly one `ReviewDecision`, expiring on release or reassignment.
> A reviewer holding a review grant cannot see the client's other Inventions, portfolio, matters or any aggregate view. The confidentiality guarantee in BR-05 is not weakened; the reviewer's reach is smaller than an engaged agent's, not larger.
> Implementers evaluating authorization from BR-05 alone will incorrectly block the assessment review gate (BR-01). See ADR §6 and Phase 5 F8 / X6.

---

## 12. AI boundaries

### 12.1 The tiering model

| Tier | Definition | Human involvement | Examples |
|---|---|---|---|
| **T0** | Mechanical operations on public data; no legal significance | None | Search ranking, translation of published documents, text extraction, classification suggestion, formatting, deduplication |
| **T1** | Assistive, reversible, no legal conclusion | User-directed | Disclosure structuring prompts, clarifying questions, search strategy suggestions, document summarization of published art, draft internal messages |
| **T2** | Legally significant; forms the basis of a decision | **Mandatory review by a named Verified Agent before release** | Novelty and patentability assessment, statutory exclusion analysis, FTO, claim charts, claim drafting, specification drafting, office action response drafting, renew/abandon recommendation |
| **T3** | Prohibited to AI entirely | Human only | Filing decisions, legal advice to a client, signing any document, confirming a critical deadline, authorizing a payment, clearing a conflict, determining ownership or inventorship |

### 12.2 Enforcement

Tier is a property of the **task definition** in AI Orchestration, not of the calling code. A T2 task cannot be released through any path without a `ReviewDecision` record referencing a Verified Agent. This is a state machine constraint, not a policy document.

### 12.3 Universal AI constraints

1. **Provenance** — every factual assertion carries a resolvable citation (P2, BR-02).
2. **Grounding** — assertions about a document's content must derive from retrieved passages of that document, not from model parametric knowledge. *This is the IamIP "Claim Clarifier" insight from Phase 1: define claim terms from the patent's own description, not from what the model thinks the term means.*
3. **Coverage honesty** — outputs state what was searched and what was not.
4. **Calibration** — confidence is expressed and its basis stated; no unqualified certainty.
5. **Attribution** — AI-generated content is always visually and structurally distinguishable from human-authored content, in every surface, including exports.
6. **No silent capability drift** — model or prompt changes affecting T2 tasks require an eval run and a recorded approval.
7. **Refusal is a valid output** — "insufficient information to assess" is preferable to a low-confidence conclusion, and the UI must present it as a legitimate result rather than an error.

### 12.4 Specifically prohibited AI behaviours

- Generating a citation to a document not present in the retrieval set
- Asserting patentability or non-patentability without human review
- Amending claim scope automatically
- Filling gaps in a disclosure with invented technical content
- Producing jurisdiction-specific legal conclusions for a jurisdiction whose rules are not loaded
- Any output presented to a client without either human review (T2) or clear AI attribution (T0/T1)

### 12.5 The false-negative problem

Phase 2 §19.4 identified this as the most dangerous AI failure: **we say it's novel, and it isn't.** The client files, spends, and loses. Architectural mitigations:

- **Recall over precision** in retrieval — over-retrieve, then filter, rather than under-retrieve
- **Multiple independent retrieval strategies** whose union forms the candidate set; disagreement between strategies raises rather than lowers the candidate count
- **Explicit coverage gaps surfaced** — non-English art, non-patent literature, unpublished applications within the 18-month window
- **The 18-month blind spot is stated prominently in every assessment.** Unpublished applications cannot be searched. This is a property of the patent system, not of our product, and saying so plainly is both honest and protective.
- **Human review is calibrated to look for false negatives specifically**, not just to validate what the AI found

### 12.6 Model provider policy

- Multi-provider abstraction; no single-provider dependency
- Enterprise/private deployment tiers only for any task touching Zone 1
- Contractual no-training, no-retention for all providers handling Zone 1
- **Providers named publicly** (the IP8 pattern from Phase 1 — it converts a fear into a trust signal)
- Model and version recorded on every output for reproducibility

---

## 13. Data architecture

### 13.1 The three zones (D2)

```
┌──────────────────────────────────────────────────────────────────────┐
│  ZONE 1 — CONFIDENTIAL                                               │
│  Unpublished Disclosures · draft specifications · client documents · │
│  privileged communications · pre-filing strategy                     │
│                                                                       │
│  · Separate key material · tenant-isolated                           │
│  · Never indexed in the public search cluster                        │
│  · Never written to shared logs or traces                            │
│  · Never accessible to the Outcome Data pipeline (BR-15)             │
│  · Third-party transmission only under no-training contract (BR-04)  │
│  · Access always matter-scoped and audited                           │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  ZONE 2 — PUBLIC CORPUS                                              │
│  Published patents & applications · legal status · official fee      │
│  schedules · classification data · citation graphs · NPL (licensed)  │
│                                                                       │
│  · Fully indexed · cacheable · servable to anonymous users           │
│  · Source-attributed and freshness-stamped                           │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  ZONE 3 — OUTCOME METADATA                                           │
│  Objection types & counts · allowance rates · timings · claim-scope  │
│  deltas · agent assignment metadata · reviewer edit statistics ·     │
│  examiner and art-unit patterns                                      │
│                                                                       │
│  · Derived from Zone 2 (public prosecution records) and from         │
│    Event Log metadata — NEVER from Zone 1 content                    │
│  · Aggregated; k-anonymity thresholds before any external publication│
│  · The moat (Phase 2 §16.2)                                          │
└──────────────────────────────────────────────────────────────────────┘
```

**The boundary that must never be crossed:** Zone 1 → Zone 3. Enforced at the database permission level (the Zone 3 pipeline's credentials have no grant on Zone 1 tables), not by application convention. This is the architectural expression of the Phase 2 promise that we never train on or monetize client invention content.

### 13.2 Stores

| Store | Contents | Zone |
|---|---|---|
| Operational relational DB | All entities, one schema per module | 1 + 2 metadata |
| Event Log (append-only) | Every domain event, immutable | 1 + 2 |
| Object store | Documents, encrypted, versioned, object-locked | 1 + 2 (separate buckets, separate keys) |
| Search cluster | Inverted + vector indexes over the public corpus | **2 only** |
| Confidential index | Per-tenant document search, tenant-isolated | **1 only, never co-mingled** |
| Analytics warehouse | Outcome metadata, aggregates | **3 only** |
| Cache | Ephemeral, no Zone 1 content | 2 |

### 13.3 Data lifecycle

| Stage | Policy |
|---|---|
| Creation | Zone assigned at creation; immutable thereafter |
| Retention | Zone 1 retained per client contract and jurisdiction requirements; documents relating to filed applications retained regardless of account status (BR-18) |
| Deletion | Client-initiated deletion honours regulatory retention obligations; deletion is recorded as an event |
| Export | Full export in open formats at any time (FR-R09) — no lock-in by data hostage |
| Anonymization | Zone 3 aggregates only, with minimum-n thresholds |

---

## 14. Core entities and relationships

### 14.1 Entity model

```
                        ┌──────────────┐
                        │    PARTY     │  person or organization
                        └──────┬───────┘
                               │
        ┌──────────────────────┼───────────────────────┐
        │                      │                       │
  ┌─────▼──────┐        ┌──────▼──────┐        ┌──────▼───────┐
  │ WORKSPACE  │        │  AGENT ORG  │        │ INSTITUTION  │
  │ (tenant)   │        │  (tenant)   │        │  (tenant)    │
  └─────┬──────┘        └──────┬──────┘        └──────┬───────┘
        │                      │                       │
        │ owns                 │ employs               │ owns
        │                      │                       │
  ┌─────▼────────────────┐  ┌──▼──────────┐            │
  │     INVENTION        │  │VERIFIED     │            │
  │  (root entity, P5)   │◄─┤AGENT        │            │
  │  persists forever    │  └─────────────┘            │
  └─────┬────────────────┘◄──────────────────────────── │
        │                                                
        │ 1..n                    ┌────────────────────────────┐
        │                         │  PARTY_INVENTION_ROLE      │
  ┌─────▼────────┐                │  (inventor / applicant /   │
  │  DISCLOSURE  │                │   owner / assignee)        │
  │  (versioned, │                └────────────────────────────┘
  │  immutable   │
  │  once used)  │
  └─────┬────────┘
        │
        │ 0..n
  ┌─────▼────────┐        ┌──────────────┐        ┌──────────────┐
  │  ASSESSMENT  │───────►│  ASSERTION   │───────►│   CITATION   │
  │              │  1..n  │              │  1..n  │  (span-      │
  │  requires    │        │  cannot exist│        │   addressed) │
  │  ReviewDecis.│        │  w/o citation│        └──────┬───────┘
  └──────────────┘        └──────────────┘               │
                                                          │ resolves to
        │ decision to file                        ┌──────▼───────┐
        ▼                                         │   DOCUMENT   │
  ┌──────────────┐                                └──────────────┘
  │  ENGAGEMENT  │──── grants matter-scoped access
  └──────┬───────┘
         │
  ┌──────▼───────┐        ┌──────────────┐
  │    MATTER    │───────►│     TASK     │
  │ (unit of     │        └──────────────┘
  │  work &      │
  │  billing)    │
  └──────┬───────┘
         │
  ┌──────▼─────────────┐         ┌──────────────┐
  │   APPLICATION      │────────►│    FAMILY    │
  │ (one per          │         │  (legal +    │
  │  jurisdiction)    │         │   internal)  │
  └──────┬─────────────┘         └──────────────┘
         │
    ┌────┴─────┬──────────────┬───────────────┐
    │          │              │               │
┌───▼────┐ ┌───▼──────┐  ┌────▼─────┐   ┌────▼──────┐
│ EVENT  │ │ DEADLINE │  │ DOCUMENT │   │  RENEWAL  │
│(immut.)│ │(computed)│  └──────────┘   └───────────┘
└───┬────┘ └────▲─────┘
    │           │
    │      ┌────┴──────┐
    └─────►│   RULE    │  versioned, jurisdiction-scoped
           │  (data)   │
           └───────────┘
```

### 14.2 Entity definitions

| Entity | Definition | Key attributes | Notes |
|---|---|---|---|
| **Party** | Any person or organization | type, identity, verification status | Polymorphic; a Party can hold multiple roles simultaneously |
| **Workspace** | Client tenancy boundary | owner, plan, data residency, retention policy | |
| **Agent Org** | Professional tenancy | registration details, conflict list, capacity | |
| **Institution** | Institutional tenancy | units, IP policy, budget structure | |
| **Invention** | **Root entity.** The durable concept | title, technical domain, status, created_at | *Persists independently of Applications (BR-12). This is the entity nobody else models and it is why we can serve the front of the funnel.* |
| **Disclosure** | A versioned capture of an Invention | version, content (Zone 1), completeness, timestamp | Immutable once referenced by a released Assessment or filed Application (BR-20) |
| **Party_Invention_Role** | Many-to-many with qualifier | role (inventor/applicant/owner/assignee), share, effective dates | Enables the university case: researcher is inventor, institution is owner |
| **Assessment** | Analysis of a Disclosure | type, jurisdictions, verdict, confidence, coverage statement, review decision | Cannot be released without ReviewDecision (BR-01) |
| **Assertion** | A single claim made by an Assessment | statement, type, confidence | Requires ≥1 Citation (BR-02) |
| **Citation** | Pointer to evidence | document_id, span, retrieved_at, method | Must resolve |
| **Engagement** | Contracted professional relationship | scope, price, term, access grant | Grants matter-scoped access (P6) |
| **Matter** | A unit of professional work | type, state, accountable agent, budget | Cannot close with open critical deadlines (BR-08) |
| **Application** | A filing in one jurisdiction | jurisdiction, number, route, status, claims | Derived from an Invention; many per Invention |
| **Family** | Grouping of related Applications | legal family id, internal grouping | Both INPADOC-style and our own Invention-derived grouping |
| **Event** | Something that happened | type, occurred_at, recorded_at, source, actor | **Immutable.** Corrections are new superseding events |
| **Rule** | A jurisdictional rule as data | jurisdiction, trigger, offset, calendar, extensions, fee, version, effective range | §18 |
| **Deadline** | A computed date | due_date, criticality, rule_version, computation_trace, confirmation state | Exposes its trace (BR-13) |
| **Renewal** | An annuity obligation | year, due_date, amount, decision, payment record | Passive lapse prohibited (BR-11) |
| **Document** | A file | classification, version, zone, retention, access log | §19 |
| **Decision** | A recorded human choice | type, actor, rationale, timestamp | Required for T3 actions (BR-09) |
| **ReviewDecision** | A reviewer's disposition of a T2 output | reviewer, decision, edits, notes | Feeds quality metrics |
| **Outcome Record** | Zone 3 metadata | derived statistics | No Zone 1 lineage (BR-15) |

### 14.3 The relationship that matters most

**Invention (1) → Application (n).** Every competitor docketing system treats the Application as the root, because they were built for people who already have filed patents. Making the Invention the root is what allows:

- an Invention to exist with no Application (the "don't file" case, still in the Vault, still monitored)
- one Invention to spawn Applications in many jurisdictions with shared lineage
- an Invention to be re-assessed as it evolves, with a version trail
- outcome data to be attributed to the invention, not just the filing
- the twenty-year Record to be about the *thing that was invented*, not the paperwork

This single modelling decision is the architectural expression of "the Record is the product."

---

## 15. Security architecture

### 15.1 Threat model — what we're actually defending

| Asset | Threat | Impact |
|---|---|---|
| **Unpublished disclosures** | Exfiltration, insider access, third-party leakage | **Catastrophic and irreversible** — novelty destroyed, invention lost, unrecoverable |
| Deadline data | Tampering, corruption | Catastrophic — rights lost |
| Client documents | Unauthorized access | Severe — confidentiality breach |
| Agent credentials | Account takeover | Severe — fraudulent filings possible |
| Outcome data | Scraping | Moderate — moat erosion |
| Payment data | Theft | Severe — handled by PCI-compliant processor, never stored |

**The defining characteristic of this threat model:** disclosure exposure is *irreversible*. You cannot rotate a destroyed novelty. Every other security decision follows from that asymmetry.

### 15.2 Controls

**Identity:** MFA mandatory for privileged and professional roles · session binding for internal roles · anomalous-login detection · no shared accounts.

**Authorization:** every access evaluated against the §4.2 predicate · denials logged · matter-scoped grants with expiry · dual control for break-glass · time-boxed, justified, user-visible support access (BR-16).

**Data:** zone-separated key material · encryption at rest and in transit · tenant isolation for confidential indexes · no Zone 1 in logs, traces, caches or analytics (NFR-S06).

**Application:** input validation · parameterized queries · CSP · dependency scanning · secrets in a managed vault, never in code or environment files committed anywhere.

**Third parties:** no-training, no-retention contracts for any provider touching Zone 1 · vendor security review before integration · named public disclosure of model providers · egress allowlisting from Zone 1 processing paths.

**Operations:** annual penetration test · quarterly access review · documented incident response with named owners · SOC 2 Type 1 by V2 · immutable audit trail.

### 15.3 The public trust surface

Following the IP8 pattern identified in Phase 1 as best-in-class, we publish — as product, not marketing:

- Security posture and certifications
- **Named model providers and the contractual terms governing them**
- The no-training pledge, stated plainly
- Data handling by zone, in plain language
- Explicit capability limitations
- **The privilege disclaimer** — that use of the platform does not create an attorney-client relationship and does not extend privilege
- Subprocessor list
- Incident history

This costs almost nothing and, per Phase 1 §4.7, is the single largest available trust differentiator in the Indian market.

---

## 16. Notification architecture

### 16.1 The design problem

Phase 2 identified the multi-year silence between filing and examination as the **central emotional job** in this industry. Notification is therefore not plumbing — it is a core product surface. The architecture must solve two opposing problems simultaneously: *guarantee* delivery of critical messages, and *avoid* the alert fatigue that makes people stop reading.

### 16.2 Classification

| Class | Definition | Channels | Delivery guarantee | Escalation |
|---|---|---|---|---|
| **Critical** | Rights are at risk | In-app + email + SMS/WhatsApp + (high-value) phone | At-least-once with receipt confirmation | Yes — ladder to Docket Ops |
| **Action required** | User decision needed, not yet critical | In-app + email | At-least-once | Reminder ladder |
| **Progress** | Something happened; no action needed | In-app + digest | Best effort | No |
| **Informational** | Awareness | Digest only | Best effort | No |

### 16.3 The proactive-reassurance requirement

**Unique to this product:** we send messages when *nothing* has happened, because silence is the pain.

Every active Application generates a periodic status communication even in the absence of events: *"Your application is in the examination queue. No action required. Based on current IP India timelines for this technical field, examination is expected between [range]. We're watching it — you'll hear from us the moment anything changes."*

Cadence adapts to the phase (more frequent near decision points, quarterly during long quiet phases). **No competitor does this**, and it directly addresses the job every competitor testimonial in Phase 1 was implicitly praising.

### 16.4 Anti-fatigue design

- Digests by default for Progress and Informational classes
- Per-matter and per-class preferences
- Quiet hours respected for non-critical classes
- Deduplication and coalescing across related events
- **Critical class cannot be disabled** — this is stated at onboarding

### 16.5 Delivery reliability

Every critical notification records dispatch, delivery receipt and acknowledgement. Failure on all channels for a critical notification raises an alert on the Docket Health Console. Undelivered critical notifications are a paging event, not a metric.

---

## 17. Search architecture

### 17.1 One service, two consumers

The same retrieval service powers the free public register (M1.1) and the Assessment engine (M1.3). They differ in *orchestration*, not in index. This avoids maintaining two corpora and means every improvement to retrieval quality benefits both.

### 17.2 Pipeline

```
INGESTION
  Sources (§20) → normalize to canonical document model
                → language detection → translation (published docs only)
                → structural parsing (claims, description, abstract, drawings refs)
                → classification extraction (CPC/IPC)
                → citation extraction
                → chunking with stable span addressing   ← critical for P2
                → embedding generation
                → dual index write (lexical + vector)

QUERY (public)
  Query → intent classification (number lookup / boolean / natural language)
        → hybrid retrieval (BM25 + dense) → fusion → rerank
        → filter application → result assembly with freshness stamps

QUERY (assessment)
  Disclosure → element decomposition
             → multi-strategy retrieval:
                  · dense semantic over full corpus
                  · lexical with terminology expansion (synonyms, industry terms)
                  · classification-guided (CPC neighbourhoods of top hits)
                  · citation-graph expansion (forward and backward)
                  · applicant-directed (known competitors)
             → union → dedupe → rerank
             → high recall candidate set (deliberately over-inclusive, §12.5)
             → element-level comparison
             → assertion assembly with span citations
```

### 17.3 Span addressing — the requirement that makes provenance possible

Every chunk carries a **stable, versioned span address** `(document_id, document_version, section, char_start, char_end)`. A citation created today must still resolve to the same passage in two years, even if the source document is re-ingested. This requires content-hash-based chunk identity rather than positional identity.

**If span addressing is not stable, P2 is unenforceable.** This is a foundational requirement, easy to get wrong, and expensive to retrofit.

### 17.4 Corpus scope

| Phase | Coverage |
|---|---|
| MVP | India (full text, all statuses), PCT publications, US grants and pre-grant publications, EP publications — via open sources (§20) |
| V2 | Expanded EP national collections, machine translation quality improvements, non-patent literature where licensable |
| V3 | Scholarly literature linkage, additional jurisdictions, licensed enhanced data if the enterprise segment requires it |

**Coverage is stated in the product, always** (FR-A05, FR-S05). Honest limitation is a feature.

### 17.5 The confidentiality boundary in search

The public search path and the confidential search path are **physically separate indexes with separate credentials**. A query containing Zone 1 content can never reach the public index. The Assessment pipeline retrieves *from* the public corpus *using* Zone 1 content as input — that direction is safe; the reverse is prohibited.

---

## 18. Deadline engine architecture ★

*The most important module in the system. Phase 2 §21.7: this is the actual business.*

### 18.1 Model

```
EVENT (immutable fact)  +  RULE (versioned data)  →  DEADLINE (computed, traced)
```

Deadlines are **derived state**, never authored state. Nobody types in a due date. Every date is the output of a rule applied to an event, and can be re-derived at any time from the Event Log.

### 18.2 Rule structure

```yaml
rule:
  id: <stable identifier>
  jurisdiction: <ISO code or office code>
  applies_to: { route: [...], application_type: [...], entity_type: [...] }
  trigger:
    event_type: <e.g. priority_established | office_action_issued | grant>
    qualifier: <optional discriminator>
  computation:
    offset: { value: <n>, unit: months|days|years }
    from: trigger_date | end_of_month | anniversary
    calendar: <jurisdiction calendar id>
    weekend_holiday_rule: next_working_day | previous | none
  criticality: critical | important | informational
  extensions:
    - { type:, max_duration:, fee_ref:, conditions: }
  restoration:
    - { available:, window:, conditions:, fee_ref: }
  fee_ref: <official fee schedule reference>
  source_citation: <statutory provision or rule number>   # mandatory
  version: <semver>
  effective_from: <date>
  effective_to: <date | null>
  supersedes: <rule version | null>
```

**Every rule cites its statutory source.** This is how a computed date becomes explainable to a client, defensible to a regulator, and auditable by us.

### 18.3 Computation and traceability

Every Deadline stores a **computation trace**:

> *Due 14 March 2028. Rule IN-NP-001 v2.1 (Patents Rules, Rule 20(4)(i)). Trigger: priority established 14 September 2025. Offset: +31 months. Falls on a working day; no adjustment. Extension available: 3 months on payment of prescribed fee.*

The user sees this in plain language. Docket Ops sees the full structured trace. **A date the system cannot explain is a bug.**

### 18.4 Recomputation

Triggered by: a new Event, a rule version change, or a correction to an existing Event.

Recomputation **never silently changes a date.** It produces a diff. Material changes to critical deadlines require Docket Ops acknowledgement and generate a client notification explaining what changed and why.

Rule version changes generate an **impact report** across the entire live portfolio *before* publication (§M4.4).

### 18.5 Verification — defence in depth

Four independent layers, because one is not enough for a safety-critical property:

1. **Rule test suite** — golden historical cases per jurisdiction, run on every rule change; no rule publishes without passing
2. **Cross-check against official register data** where the office publishes computed dates; discrepancies raise a Docket Ops alert rather than silently trusting either source
3. **Human confirmation gate** on all critical deadlines (BR-03)
4. **Anomaly detection** — unexpected recomputation volume, unusual date distributions, deadlines computed outside plausible ranges

### 18.6 Criticality and the alert ladder

| Criticality | Definition | Alert ladder (days before) | Escalation |
|---|---|---|---|
| **Critical** | Missing it forfeits rights, possibly irrecoverably | 180 / 90 / 60 / 30 / 14 / 7 / 3 / 1 | Multi-channel → Docket Ops paging |
| **Important** | Missing it causes cost or delay but is recoverable | 60 / 30 / 14 / 3 | Multi-channel |
| **Informational** | Awareness only | 30 / 7 | Digest |

Ladders are configurable per jurisdiction and per client (buffer preferences, FR-T10).

### 18.7 Jurisdiction-agnostic proof

Adding a new jurisdiction requires: a calendar definition, a rule set, a fee schedule, an integration adapter, and a golden test suite. **Zero application code changes.** If adding a jurisdiction requires touching computation logic, D1 has been violated and it must be corrected rather than worked around.

---

## 19. Document management architecture

### 19.1 Requirements

| Requirement | Rationale |
|---|---|
| Immutable versioning | Evidence of conception; audit; BR-20 |
| Zone-aware storage with separate keys | §13.1 |
| Classification (type, jurisdiction, matter, confidentiality) | Access control and retrieval |
| Text and structure extraction | Search, AI input, span addressing |
| Complete access audit trail | NFR-S04 |
| Retention policy per jurisdiction and per document class | BR-18 |
| Full export in open formats | FR-R09 |

### 19.2 Document classes

| Class | Zone | Retention | Access |
|---|---|---|---|
| Disclosure version | 1 | Client contract + regulatory | Workspace + assigned Matter |
| Draft specification | 1 | Matter + retention window | Workspace + assigned Agent |
| Filed application | 1→2 on publication | Permanent | Workspace + Agent; public after publication |
| Office correspondence | 1 | Permanent | Workspace + Agent |
| Filing receipt / official record | 1 | Permanent | Workspace + Agent |
| Assessment report | 1 | Client contract | Workspace + reviewer |
| Corpus document | 2 | Permanent | Public |
| Invoice / financial | 1 | Statutory (typically 7–8 years) | Workspace Owner |

**Note the zone transition:** a filed application moves from Zone 1 to Zone 2 at publication. This transition must be event-driven and verified against the official register, never assumed from a computed date.

### 19.3 Storage

Content-addressed object storage; encryption per zone; versioning enabled; object-lock for permanent-retention classes; signed short-lived URLs for access; no direct bucket access from application code paths that handle user input.

---

## 20. Integration architecture

### 20.1 The adapter pattern

Every external source is wrapped in an adapter with a uniform contract:

```
Adapter:
  · fetch(entity, params) → raw payload
  · normalize(raw) → canonical Event / Document / Status
  · reliability_signal() → freshness, error rate, latency
  · capabilities() → what this source can and cannot provide
```

The core system knows only canonical entities. Adding a jurisdiction means adding an adapter, not modifying core logic.

### 20.2 Sources

| Source | Access `[verify current state]` | Reliability | Strategy |
|---|---|---|---|
| **IP India** | No documented public API; register accessible via web portal | **Low** — the known weak point | Polling with change detection; local mirroring; aggressive caching; explicit staleness display; manual reconciliation queue |
| **EPO OPS** | Documented API, rate-limited, free and paid tiers | High | Primary source for EP and family/legal-status data |
| **USPTO** | Public data APIs and bulk data products | High | Primary source for US |
| **WIPO PATENTSCOPE** | Limited programmatic access; bulk data available | Medium | PCT publications and international-phase status |
| **Payment gateway** | Standard API | High | PCI-compliant, no card data stored |
| **E-signature** | Standard API | High | V2 |
| **Model providers** | Standard APIs | High | Multi-provider abstraction (§12.6) |
| **Messaging (email/SMS/WhatsApp)** | Standard APIs | Medium-High | Multi-provider for critical class |

### 20.3 Source reliability and graceful degradation (P8)

Every source carries a live reliability signal. The system's behaviour when a source degrades:

1. **Serve cached data with an explicit staleness stamp** — never an error page
2. **Never block deadline computation** on external availability — deadlines derive from our Event Log, which is ours
3. **Raise a Docket Ops alert** when a source has been unavailable beyond threshold
4. **Never silently accept a source's date over our computation** — discrepancies go to a human queue

**The IP India dependency is the single largest external technical risk in the platform** (§25, T4). Mitigation is architectural: mirror aggressively, compute independently, display honestly.

### 20.4 Filing integration

E-filing where office APIs permit; assisted manual filing with structured package generation elsewhere. **In all cases the filing action is performed or authorized by the Verified Agent** (BR-09, T3). The platform prepares; the professional files.

---

## 21. API strategy

### 21.1 Sequence

| Stage | Scope | Timing |
|---|---|---|
| **Internal-first** | Every product surface consumes the same internal API. No UI reaches the database directly. | MVP |
| **Partner** | Scoped access for institutional clients and agent firm systems | V2 |
| **Public** | Documented, versioned, self-serve developer platform | V3 |

**Internal-first is not a formality.** If our own product is the first API consumer, the public API is a permissioning change rather than a rewrite. This is the Dennemeyer/PatSnap move from Phase 1 (both expose APIs and treat data as a platform), and it is only cheap if designed for from the start.

### 21.2 Design

- **REST** for resources (the domain maps cleanly to entities); **webhooks** for events
- Versioned by URL path; additive changes only within a version; deprecation policy published with minimum notice periods
- Idempotency keys on all mutations
- Cursor-based pagination
- Rate limits by tier
- **Zone-aware:** Zone 2 (public corpus) is broadly accessible; Zone 1 requires explicit scoped grants and full audit; Zone 3 is aggregate-only with minimum-n enforcement

### 21.3 Webhook events (illustrative)

`application.status_changed` · `deadline.created` · `deadline.approaching` · `deadline.confirmed` · `assessment.released` · `matter.state_changed` · `document.added` · `renewal.due` · `renewal.paid`

### 21.4 Future

Embeddable search widget · MCP server for AI-agent access to public corpus and (with grants) portfolio data · partner integration marketplace.

---

## 22. Scalability considerations

### 22.1 An honest assessment of where the scale actually is

This is **not** a high-QPS business. At realistic scale — hundreds of thousands of free-tier users, tens of thousands of paying clients, thousands of agents — concurrent request volume is modest. Over-engineering for throughput we will never see is the most common way teams in this position waste a year.

**The real scaling challenges, in order:**

| # | Challenge | Nature | Response |
|---|---|---|---|
| **1** | **Corpus size** — 100M+ documents, embeddings, multi-language | Data volume | Tiered storage (hot/warm/cold by recency and access), quantized vector indexes, sharding by jurisdiction, incremental re-embedding rather than full rebuilds |
| **2** | **AI job orchestration** — long-running, expensive, bursty | Compute + cost | Durable queues with priority, resumable checkpointed jobs, cost budgets per job class, aggressive caching of retrieval results, batch scheduling for non-urgent work |
| **3** | **Deadline recomputation** — a rule change can touch every live application | Batch compute | Incremental recomputation, partitioning by jurisdiction, off-peak scheduling, impact preview before execution |
| **4** | **Document storage growth** | Storage cost | Lifecycle policies, deduplication by content hash, cold-tier archival with retrieval SLA |
| **5** | **Integration polling** at portfolio scale | External rate limits | Change-detection rather than full polling, adaptive frequency by application activity, respect of source rate limits, bulk endpoints where available |

### 22.2 Scaling sequence

| Stage | Approach |
|---|---|
| **0 → 10k users** | Single deployable, managed database with read replica, managed search cluster. Nothing exotic. |
| **10k → 100k** | Horizontal application scaling, read replicas, search cluster expansion, CDN for public content, separate job workers |
| **100k → 1M** | Extract Search and AI Orchestration as independent services (the boundaries are already enforced per D3), partition the operational database, regional deployment for residency |
| **Beyond** | Full service extraction as the domain and team structure demand it — not before |

### 22.3 Cost scaling

AI inference cost is the variable most likely to surprise. Controls from day one: per-job cost telemetry, cost budgets per task class, cached retrieval reuse across assessments of the same technical domain, model routing by task complexity (cheap models for T0/T1, capable models for T2), and batch processing where latency is not user-facing.

---

## 23. Future extensibility

The architecture must accommodate these without rework. Each is *anticipated*, not built.

| Extension | Enabled by | What must not preclude it |
|---|---|---|
| **New jurisdictions** | D1 (rules-as-data) | Any hard-coded jurisdiction logic |
| **Other IP types** (trademarks, designs) | Generic Right entity above Application; Invention→Right abstraction | Naming everything "patent" in the schema |
| **Captive patent practice** | Agent Org is already a tenancy type; a captive practice is one more Agent Org with different economics | Assuming all Agent Orgs are external |
| **Licensing marketplace** | Party, Right, and Family entities already exist; adds Listing, Offer, Transaction | Modelling ownership as a single scalar field rather than a role-qualified relationship |
| **Enterprise deployment** | Data residency binding per Workspace; provider abstraction in AI layer | Single-region assumptions; hard-coded provider endpoints |
| **Trade secrets pathway** | Invention exists independently of Application (P5) | Requiring an Application for an Invention to have a lifecycle |
| **Predictive prosecution models** | Zone 3 outcome data | Failing to record structured outcome metadata from day one |
| **Public API** | Internal-first API design | UI reaching the database directly |
| **Vernacular product** | i18n from day one (NFR-I01) | Hard-coded strings |
| **Defensive publication** | Document + Event model | — |

**The two decisions that most protect future optionality** are P5 (Invention as root, not Application) and D1 (rules as data). Almost every extension above depends on one or both.

---

## 24. Technical assumptions

Stated so they can be challenged rather than silently inherited.

| # | Assumption | Risk if wrong |
|---|---|---|
| TA-1 | Open sources (IP India, EPO OPS, USPTO, WIPO) provide sufficient corpus coverage for MVP assessment quality | Assessment quality suffers; may require licensed data earlier than planned, at significant cost |
| TA-2 | IP India register data is obtainable at acceptable reliability through polling and mirroring | Core value proposition of M1.1 is compromised; requires alternative sourcing or manual operations |
| TA-3 | Frontier model capability is sufficient for T2 tasks with human review | If not, the human review burden negates the efficiency thesis and unit economics break |
| TA-4 | AI inference cost remains a small fraction of transaction value (~2–5%) | Margin compression; requires model routing and caching optimization |
| TA-5 | Registered agents will adopt platform tooling for their own practice before taking marketplace matters | The supply-side cold start fails; this is the highest-probability business risk (Phase 2 §19.1) |
| TA-6 | A modular monolith is sufficient through 100k users | Premature extraction cost, or late extraction pain |
| TA-7 | Span-stable chunking can be maintained across corpus re-ingestion | Provenance links break; P2 becomes unenforceable |
| TA-8 | Jurisdiction rules can be expressed declaratively without escape hatches into code | D1 compromised; the jurisdiction-agnostic promise weakens |
| TA-9 | Third-party model providers will contract for no-training, no-retention on enterprise tiers | Zone 1 processing must move to self-hosted models, with cost and capability implications |
| TA-10 | Web (responsive) is sufficient; no native app required through V2 | Mobile engagement suffers for agents doing docket checks |

**TA-8 deserves particular scrutiny.** Every rules engine in every domain eventually meets a rule that resists declarative expression. The design must include a defined, audited, tested extension mechanism for genuine exceptions — and a policy that using it requires explicit approval, so it doesn't become the default.

---

## 25. Risks and architectural trade-offs

### 25.1 Trade-offs consciously accepted

| # | Trade-off | Chose | Cost accepted | Why |
|---|---|---|---|---|
| **T1** | Rules-as-data vs rules-as-code | **Data** | Significant upfront complexity; a rule authoring discipline most teams underestimate | Jurisdiction-agnostic is a confirmed constraint; retrofitting is a rewrite |
| **T2** | Three-zone separation vs unified data | **Separated** | Some analytically valuable queries become impossible; operational complexity | It is the architectural expression of a public promise; violating it later would be brand-fatal |
| **T3** | Modular monolith vs microservices | **Monolith** | Extraction work later; discipline required to keep boundaries honest | Small team, highly interconnected domain; velocity matters more than premature distribution |
| **T4** | Open data vs licensed data | **Open, for 24 months** | Coverage gaps, especially non-English and legal status | Phase 2 §10.2 — differentiation is judgement and workflow, not corpus completeness. Must be honestly disclosed in-product. |
| **T5** | Matter-scoped vs workspace-scoped agent access | **Matter-scoped** | More complex permission model; more support burden | Confidentiality is existential; a marketplace agent seeing a client's whole portfolio is unacceptable |
| **T6** | Multi-provider AI vs single provider | **Multi-provider** | Lowest-common-denominator capability; abstraction overhead | Avoids single-vendor dependency on a business-critical path; enables cost routing |
| **T7** | Async assessment vs synchronous | **Async** | More complex UX; requires job infrastructure at MVP | Quality requires multi-strategy retrieval and human review; pretending it's instant would force quality compromises |
| **T8** | Human review on every T2 output vs sampling | **Every output** | Caps throughput; agent capacity becomes the bottleneck | Regulatory necessity and the core trust promise. The efficiency thesis is about making review fast, not about skipping it. |

### 25.2 Architectural risks

| Risk | Severity | Mitigation |
|---|---|---|
| **Deadline engine produces a wrong date** | **Existential** | Four-layer verification (§18.5); immutable derivation; human confirmation gate; golden test suites |
| **Zone 1 leakage into Zone 2 or Zone 3** | **Existential** | DB-level permission separation; egress allowlisting; no Zone 1 in logs; code review gate on any cross-zone path |
| **Span addressing instability breaks provenance** | High | Content-hash chunk identity; citation resolution monitoring; re-ingestion regression tests |
| **IP India source unreliability** | High | Mirroring, change detection, staleness display, independent computation (P8) |
| **AI false negative in novelty** | High | Recall-first retrieval, multi-strategy union, explicit coverage gaps, review calibrated for false negatives (§12.5) |
| **Rules engine meets an inexpressible rule** | Medium | Defined, audited, approval-gated escape mechanism (TA-8) |
| **Agent tooling under-invested; supply fails** | High | Layer 2 treated as co-equal priority, not secondary |
| **AI cost scaling faster than revenue** | Medium | Per-job telemetry, budgets, caching, model routing |
| **Modular boundaries erode into a true monolith** | Medium | Schema separation, interface enforcement, architectural fitness tests in CI |

---

## 26. Open dependencies

Blocking or shaping items that must be resolved before or during Phase 4. Legal items require specialist counsel — this document deliberately makes no legal determinations.

### 26.1 Legal — blocking

| # | Dependency | Blocks | Why it matters architecturally |
|---|---|---|---|
| **L1** | **Fee-sharing / revenue structure** between TechCo and Verified Agents | Billing module design; Marketplace commercial flows; pricing display | Determines whether the platform charges the client a technology fee, takes a share of the professional fee, or licenses software to the agent. Three different data models and three different UIs. **Highest-priority dependency.** |
| **L2** | **UPL boundaries** — precisely what platform-generated output constitutes legal advice in each target jurisdiction | AI tiering (§12); Assessment presentation; guidance content | May shift specific outputs between T1 and T2, changing throughput and cost |
| **L3** | **Advertising and solicitation rules** applying to Verified Agents associated with a marketed platform | Agent profiles; outcome statistics publication; marketplace presentation | May constrain publishing agent-level outcome statistics — which is a core moat mechanism |
| **L4** | **Privilege position** and required disclosure language | Onboarding; trust page; document classification | Confirmed as required; exact wording and placement need counsel |
| **L5** | **Confidentiality obligations** on pre-filing disclosure processing, including whether third-party model processing raises disclosure concerns | Zone 1 architecture; provider selection; possible self-hosting requirement | If third-party processing is problematic, TA-9 fails and Zone 1 inference must be self-hosted |
| **L6** | **Agent record-retention obligations** post-engagement | Access revocation schedule (§4.2 rule 1) | Determines how long a former agent retains matter access |
| **L7** | **Data residency and cross-border transfer** requirements for Indian client data | Storage architecture; provider regions | Architecture is residency-ready; requirements determine activation timing |

### 26.2 Data & technical

| # | Dependency | Blocks |
|---|---|---|
| **D1** | Confirm IP India programmatic access options, terms of use, and rate limits | M1.1 feasibility and design; TA-2 |
| **D2** | Confirm EPO OPS, USPTO and WIPO current API terms, quotas and coverage | Corpus scope; TA-1 |
| **D3** | Evaluate whether MVP assessment quality is achievable on open sources alone | T4 trade-off; possible earlier licensing spend |
| **D4** | Confirm model provider enterprise terms for no-training/no-retention | TA-9; L5 |
| **D5** | Obtain authoritative Indian fee schedules and rule sources for initial rule authoring | Rules Engine seeding; Cost Planner accuracy |
| **D6** | Confirm official register verification method for agent credentials | J6 step 4 |

### 26.3 Product decisions needed from you

| # | Decision | Affects |
|---|---|---|
| **P1** | Confirm the MVP scope in §5 Layers 0–2 — specifically whether M2.2 (Drafting Workspace) is V2 as proposed, or needed earlier | Roadmap; engineering sequencing |
| **P2** | Confirm the agent value proposition: free docket tooling first, marketplace matters second | J6; go-to-market; Layer 2 priority |
| **P3** | Confirm whether Institution modules (Layer 3) are V2 or can slip to V3 | Team sizing; entity model detail on Institution |
| **P4** | Confirm brand and product naming, since it affects IA labelling in Phase 4 | Phase 4 |
| **P5** | Confirm the minimum sample size threshold for publishing agent outcome statistics | M2.4; L3 interaction |

---

## Phase 3 complete — what Phase 4 inherits

Phase 4 (Information Architecture) can now proceed from:

- **§5** — the complete module catalogue, with every module's purpose, users, inputs, outputs and dependencies
- **§4** — the role and permission model that determines what each user can see
- **§6** — the dashboard inventory, each tied to a specific decision
- **§7** — the navigation skeleton and its governing rules
- **§8** — the ten primary user journeys to be expanded into full flows in Phase 5
- **§9** — the functional requirement inventory with release assignments
- **§14** — the entity model that determines what objects the IA must represent

**The five things Phase 4 must not change**, because they are architectural rather than presentational: the Invention-as-root model (P5), matter-scoped agent access (P6), the mandatory human review gate (BR-01), the provenance constraint (BR-02), and the two-level navigation depth limit (§7.5).

**The one dependency that should be resolved before Phase 4 begins** is **L1 (fee-sharing structure)**, because it determines the commercial flows the IA has to express — specifically whether the client sees one price or three, and whether the agent is presented as a platform-provided professional or an independently-engaged one. That distinction changes the primary CTA and the marketplace screens materially.

---

*End of Phase 3.*
