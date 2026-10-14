# Phase 9 — B0: Wiring, Architecture & Sequencing Specification

**Version:** v0.1 — **PROPOSED, NOT ACCEPTED**
**Type:** Decisions & specification batch (P9-B0). No code. No Phase 8 modification. No Git.
**Date:** 20 September 2026
**Baseline read:** Phase 8 frozen at `0ddf8bb` (per `Claude outputs/Phase-8-Closure-Freeze-Report.md`); frozen Phases 1–7 per `01_Strategy/Roadmap.md` § Frozen Baseline.
**Governing sequencing principle (owner-approved):** **dependency-readiness**, not surface parity.
**Authority of this document:** nothing here is canonical. Every ADR below is a proposal with options and a recommendation, per `CLAUDE.md` § Decision Making. Approval converts them to Decision Log entries; until then Phase 9 has no accepted architecture.

**Constraints honoured in producing this document:** read-only. No implementation file was written, no Phase 8 artifact was modified, no Git command was run. Contradictions found in the repository are **reported in §12**, not fixed.

---

## 1. What Phase 8 actually handed over

Phase 8 froze a **presentation-only surface** over a typed presentation-data contract. Precisely:

| Frozen asset | Shape | Phase 9 consequence |
|---|---|---|
| `src/contract/ports.ts` | **57 interfaces** — 56 `*Provider` + `CitationResolver` | The wiring surface. §3 maps each. |
| `src/contract/*` (10 further modules) | View-models, `Loaded<T>`, `SlotValue<T>`, `FreshnessStamp`, `TwoAxisStatus`, `Assertion`/`Citation` | The data shape Phase 9 must produce, unchanged. |
| `src/screens/*` (56 screens) | `({ loaded }: { loaded: Loaded<VM> })` — pure props, no fetching | Screens need a **caller**; none exists. |
| `src/fixtures/providers/*` (9 modules) | Classes implementing the ports from static scenario maps | The reference adapters. §6. |
| `src/App.tsx` | Demo harness importing **scenario maps directly**, not providers | There is **no composition root**. §4 ADR-02. |

### 1.1 Three structural facts that shape all of Phase 9

These are observations about the frozen artifact, not criticisms of it — Phase 8's scope was explicitly presentation-only (D-2026-022).

**F-1 — The frozen port surface is read-only.** All 57 interfaces expose only `get` / `list` / `search`. There is **no command, mutation, or write port anywhere in the contract.** Yet `NextActionVM.verb` already enumerates ten actions the product must perform — `Record · Assess · Engage · File · Respond · Confirm · Decide · Release · Import · Review` — and the Assessment Lifecycle ADR §4 defines state transitions (`Requested → Analysing → In review → Released → Decided`) that only a write path can effect. **Phase 9 must extend the contract with a command surface.** That is an addition to a frozen artifact's shape, not a wiring exercise, and it needs an accepted decision before any batch touches it (ADR-03).

**F-2 — Ports carry no actor.** No port takes a caller, session, tenancy, or role argument. Tenancy is *ambient*: `CostsProvider.get()` is documented as "Owner/Admin only → `permission-denied`", but nothing in the signature says who is asking. Where the actor is resolved determines whether cross-tenancy invisibility (CR-5 / P3 P6 / P4 IA-5 / P5 X7) is enforced by the server or merely rendered by the client. This is the single highest-stakes Phase 9 decision (ADR-04).

**F-3 — Lists are unbounded and unparameterised.** Every `list()` takes no cursor, filter, sort, or page. `DocketHealthProvider` aggregates *across tenants*; `PortfolioProvider`, `DeadlinesProvider`, `NotificationsProvider`, `ReviewsQueueProvider` are all open-ended. Real services cannot return these whole (ADR-06).

---

## 2. How this document classifies readiness

Every port and every work item below carries one readiness class. The Phase 9 batch sequence in §10 is derived **mechanically** from these classes — that is what "dependency-readiness over surface parity" means in practice.

| Class | Meaning | Gate |
|---|---|---|
| **R0** | Buildable now against in-repo material only | none |
| **R1** | Needs an internal platform service that Phase 9 itself builds | internal, sequenced |
| **R2** | Needs a confirmed **external data source** | D1 / D2 / D6 (Phase 3 §26.2) |
| **R3** | Needs **Rules-Engine rule data** authored from authoritative sources | D5 |
| **R4** | Blocked on a **human decision** — product, legal, or governance | §11 register |

A port may carry several classes; the highest-numbered gate governs its scheduling. **R4 never blocks the structural work** — the frozen artifact already renders every unresolved item as a container, so Phase 9 can wire the container and leave the slot pending. R4 blocks only **go-live** of the affected surface, exactly as D-2026-022's follow-up records for L1/L3/L4.

---

## 3. Port → real-service wiring matrix

Module references are to `02_Product/Phase-3-Product Architecture PRD v1.0.md` §5. Zone references are to AP-03 / D-2026-003 / Phase 3 §13.1.

### 3.1 Cross-cutting (B1 seam)

| Port | Backing module(s) | Zone | External source | Readiness | Notes |
|---|---|---|---|---|---|
| `AssessmentProvider` | M1.3 Assessment · M0.4 Provenance · M0.6 AI Orchestration | 1 (reads 2) | model providers | R1 · R4(S-1,S-2) | The CR-2 gate: no verdict representable pre-release. Reviewer confidence stays a slot. |
| `CitationResolver` | M0.4 Provenance · M0.3 Search · M0.5 Documents | 2 | corpus (§20.2) | R2 | **Requires span-stable addressing (Phase 3 §17.3, TA-7).** If this is not stable, AP-04/BR-02 is unenforceable. Highest technical risk in the whole port set. |

### 3.2 Client Vault path (Phase 8 B2)

| Port | Backing module(s) | Zone | External source | Readiness | Notes |
|---|---|---|---|---|---|
| `WorkspaceSetupProvider` | M0.1 Identity & Tenancy | 1 | — | R1 | **Tenancy is born here** (Assumption A1, D-2026-015). Foundational — see §10. |
| `InventionsProvider` | M1.2 Invention Vault | 1 | — | R1 · F-3 | |
| `InventionDetailProvider` | M1.2 | 1 | — | R1 | CR-5 `not-found` must be server-side (ADR-04). |
| `DisclosureCaptureProvider` | M1.2 | 1 | — | R1 | |
| `DisclosureVersionsProvider` | M1.2 · M0.5 · M0.10 Event Log | 1 | — | R1 | Immutability on release (BR-20) is an Event-Log property. |
| `AssessmentRequestProvider` | M1.3 | 1 | — | R1 · R4(GATE) | Free-assessment no-gate is a *working* assumption (D-2026-017). |
| `AssessmentsListProvider` | M1.3 | 1 | — | R1 | |
| `DecisionProvider` | M1.2 · M0.1 | 1 | — | **R4 (DR-01)** | `mayRecordNotFileDecision` is hard-typed `pending-slot / DR-01` in `vault.ts:168`. **Wiring it requires resolving DR-01 or changing the type.** See §12 C-4. |

### 3.3 Client Portfolio & Deadlines (B3)

| Port | Backing module(s) | Zone | External source | Readiness | Notes |
|---|---|---|---|---|---|
| `PortfolioProvider` | M1.7 · M0.9 Integration Hub | 1+2 | IP India, EPO OPS, USPTO, WIPO | R2 · F-3 | |
| `ApplicationDetailProvider` | M1.7 · M0.9 | 1+2 | same | R2 | Three modes incl. `responding-status-only` (CR-17 / D-2026-016). |
| `DeadlinesProvider` | **M0.2 Deadline & Rules Engine ★** | 1 | — (derived from Event Log) | R3 | Phase 3 §20.3: deadlines **never** block on external availability. |
| `DeadlineDetailProvider` | **M0.2 ★** · M0.10 | 1 | — | R3 | Carries the **computation trace** (§18.3). The trace is the product (AP-08). |

### 3.4 Client Matters, Costs, Matching (B4)

| Port | Backing module(s) | Zone | External source | Readiness | Notes |
|---|---|---|---|---|---|
| `MattersProvider` | M1.6 | 1 | — | R1 · F-3 | |
| `MatterWorkspaceProvider` | M1.6 · M0.5 | 1 | — | R1 | |
| `CostsProvider` | M0.8 Billing · M0.2 (official fees) | 1 | fee schedules (D5) | R3 · **R4 (L1, O-2026-001)** | Role-gated → `permission-denied` (CR-12/IP-15). |
| `MatchingProvider` | M1.5 · M0.11 Outcome Data | 3 | — | R1 · R4(S-3) | `error` = conflict check could not complete → **fails closed**. |
| `QuoteEngagementProvider` | M0.8 · M1.5 | 1+3 | payment gateway | R2 · **R4 (L1)** | L1 is the "highest-priority dependency" (Phase 3 §26.1). |

### 3.5 Client Home, Documents, Settings, Notifications (B5)

| Port | Backing module(s) | Zone | External source | Readiness | Notes |
|---|---|---|---|---|---|
| `HomeProvider` | aggregates M1.2/1.6/1.7 · M0.2 · M0.7 | 1 | — | R1 (fan-in) | **Aggregating port** — depends on every B2–B4 service. Cannot precede them. |
| `DocumentsProvider` | M0.5 | 1 | — | R1 · F-3 | Signed short-lived URLs (§19.3) — the VM has no URL field today. See §12 C-6. |
| `SettingsProvider` | M0.1 | 1 | — | R1 · R4(S-10, L7, S-7) | |
| `NotificationsProvider` | M0.7 Notification | 1 | email/SMS/WhatsApp | R1 · F-3 | Delivery receipts are a Notification-service concern, not a read model. |

### 3.6 Agent surface (B6)

| Port | Backing module(s) | Zone | External source | Readiness | Notes |
|---|---|---|---|---|---|
| `AgentOnboardingProvider` | M0.1 · M2.4 | 1 | agent register (D6) | R2 | |
| `AgentTodayProvider` | aggregates docket+matters+reviews | 1 | — | R1 (fan-in) | Risk-ranked; ranking is Rules-Engine-derived, never invented (CR-19). |
| `AgentDocketProvider` | M2.1 · M0.2 ★ | 1 | — | R3 | |
| `AgentMattersProvider` | M2.1 · M1.5 | 1 | — | R1 · F-3 | |
| `MatterImportProvider` | M2.1 · M0.9 | 1+2 | office registers | R2 · **R4 (DR-02)** | Contract is DR-02-agnostic: **no de-duplication is designed.** Wiring an importer forces the question. |
| `AgentMatterDetailProvider` | M2.1 | 1 | — | R1 | Matter-scoped grant (T5/P6). |
| `ReviewsQueueProvider` | M1.3 · ADR §5 | 1 | — | R1 | Domain-routed; conflicted items **never appear** (ADR §5). Exclusion must be server-side. |
| `ReviewWorkspaceProvider` | M1.3 · M0.1 | 1 | — | R1 | **The CR-2 / BR-01 gate.** Enforces the *review grant* (ADR §6): exactly one Disclosure version, expires on release. |
| `OpportunitiesProvider` | M1.5 | 1+3 | — | R1 | |
| `PracticeProvider` | M2.4 · M0.11 | 3 | — | R1 · **R4 (L3, S-3)** | n≥20 floor (D-2026-019) is comment-only today — audit L2. |
| `AgentSettingsProvider` | M0.1 | 1 | — | R1 · R4(S-7) | MFA mandatory for agents (M0.1). |
| `AgentNotificationsProvider` | M0.7 | 1 | — | R1 · F-3 | |

### 3.7 Operations surface (B7)

| Port | Backing module(s) | Zone | External source | Readiness | Notes |
|---|---|---|---|---|---|
| `DocketHealthProvider` | M4.1 ★ · M0.9 · M0.2 | 1(meta)+2 | office registers | R2 · F-3 | **Cross-tenant by design** — the one legitimate exception to CR-5, and it must be explicit (ADR-04). Disclosure bodies stay consent-gated (BR-16). |
| `AgentVerificationProvider` | M4.3 · M0.1 | 1 | agent register (D6) | R2 | Register unavailable → **hold**, never auto-approve. A freshness/failure rule, §8. |
| `RuleAuthoringProvider` | **M4.4 ★ · M0.2 ★** | — | authoritative rule sources (D5) | R3 | Publish gated by tests + impact + dual control. **AP-02's enforcement point.** |
| `QualityConsoleProvider` | M4.2 · M0.6 | 3 | — | R1 · R4(OP-6) | |
| `BusinessDashboardProvider` | M4.x · M0.11 | 3 | — | R1 · R4(OP-2) | Targets are `config`; **measured values must stay `pending` until measurement exists.** See §12 C-3. |

### 3.8 Public surface (B8)

All Public ports are Zone-2/anonymous unless noted. The **SSR/SSG rendering strategy is unresolved** (D-2026-022, held deliberately) and gates the whole group — see ADR-01.

| Port | Backing module(s) | Zone | External source | Readiness | Notes |
|---|---|---|---|---|---|
| `PatentSearchProvider` | **M1.1 · M0.3 Search** | 2 | IP India, EPO OPS, USPTO, WIPO | **R2 (D1, D2)** | The free wedge. Gated by TA-1/TA-2 — the largest external technical risk (T4). |
| `PatentDocumentProvider` | M1.1 · M0.3 · M0.5 | 2 | same | R2 | |
| `AgentDirectoryProvider` · `AgentPublicProfileProvider` | M2.4 · M0.11 | 3 | — | **R4 (L3, S-3)** | Publication go-live is L3-gated. |
| `PricingProvider` | M0.8 | — | — | **R4 (L1, O-2026-001)** | |
| `CostPlannerProvider` | M1.4 · M0.2 | — | fee schedules (D5) | R3 · R4(O-2026-001) | Ungated by design. |
| `PublicHomeProvider` · `StageLandingProvider` · `SegmentLandingProvider` · `FindYourPathProvider` · `GuidesProvider` · `GlossaryProvider` · `JurisdictionGuideProvider` · `ReportsProvider` | content | — | — | **R0** | Content-backed. `GlossaryProvider` shares the in-product tooltip record — **it is the CR-16 / D-2026-011 controlled-vocabulary surface**, so it couples to the M2 lexicon dependency. |
| `TrustProvider` · `CompanyLegalProvider` | — | — | — | **R4 (L4)** | `pending-legal` containers. Phase 3 §15.3 makes the trust surface *product*, not marketing. |
| `AuthProvider` | M0.1 | — | — | R1 · R4(S-10) | **Creates no Workspace** (A1). |

### 3.9 Matrix summary

| Readiness | Count of ports | Of which the sole gate |
|---|---|---|
| R0 (buildable now) | 8 | — |
| R1 (internal services) | 27 | — |
| R2 (external source) | 10 | D1 / D2 / D6 |
| R3 (rule data) | 6 | D5 |
| R4 (blocks go-live) | **6 as sole gate** | L1 · L3 · L4 · DR-01 · O-2026-001 |

*(The five classes above partition all 57 ports. A further **13** ports carry R4 as an* additional *gate on top of R1–R3, so **19 of 57 ports touch an open decision** — but only 6 have no other work to do first.)*

**The shape of the work:** the dominant gate is R1 — Phase 9 is mostly the *absent back end*, not integration. Only 10 ports genuinely wait on an outside party, and only 1 port (`DecisionProvider`) is hard-blocked in its **type** by an open decision.

---

## 4. Architecture ADRs — PROPOSED

Each records options, trade-offs and a recommendation. **None is canonical until the owner approves it.**

### P9-ADR-01 — Application topology and rendering strategy
**Question.** One deployable or two? And does the Public surface render server-side?
**Context.** AP-09 and D3/T3 fix a *modular monolith* (TA-6: sufficient to 100k users). D-2026-022 deliberately held the Public SSR/SSG choice as a separate later decision. Phase 8 built all four surfaces as one SPA with no router.
- **Option A — one deployable, SPA throughout.** Simplest; contradicts nothing accepted. Cost: the Public surface (the free SEO wedge, Phase 2 §14 / Phase 3 M1.1) renders client-side, which is the weakest posture for organic discovery — the stated acquisition engine.
- **Option B — one deployable, Public surface server-rendered, authenticated surfaces SPA.** Keeps one artifact and one internal API; adds a rendering tier. Honours AP-09 ("extract only when justified") because nothing is extracted.
- **Option C — separate public site deployable.** Best SEO/caching isolation. Cost: two deployables at MVP, contrary to D3/T3 and premature under AP-09.

**Recommendation: Option B.** It is the only option that serves the acquisition thesis without violating the monolith decision. **This is a product-strategy decision as much as a technical one and must be owner-approved** — it is the deferred D-2026-022 item, not something this batch may settle.

### P9-ADR-02 — Composition root and provider injection
**Question.** Where are providers constructed and how do screens reach them?
**Context.** F-1/F-2: `App.tsx` bypasses the providers entirely; `CitationResolverContext` is the only existing injection seam, and it *defaults to the fixture resolver*.
- **Option A — one typed provider registry supplied through a single React context at the app root**, mirroring `CitationResolverContext`. Screens keep their pure `{ loaded }` props; thin container components call the port and pass `Loaded<T>` down. **Phase 8 screens are unchanged.**
- **Option B — per-screen hooks that call ports directly.** Fewer files; couples every screen to fetching and breaks the pure-props property the frozen screens rely on.
- **Option C — a data-fetching library (TanStack Query or equivalent) as the seam.** Gets caching/retry/staleness free; adds a dependency the frozen stack does not have and hides the `Loaded<T>` envelope behind a second state model.

**Recommendation: Option A**, with the caching concerns of Option C addressed inside provider implementations rather than at the component layer. Note the defaulting behaviour of `CitationResolverContext` must be inverted in Phase 9 — **a production build must fail if no real resolver is injected**, never silently fall back to fixtures.

### P9-ADR-03 — The command (write) surface
**Question.** How do the ten `NextActionVM` verbs become real operations?
**Context.** F-1 — there is no write port. This is the largest single gap between the frozen contract and a working product.
- **Option A — `contract/commands.ts`: a parallel command-port module, symmetrical with `ports.ts`,** one interface per mutating operation, each returning a discriminated result (`accepted | rejected(reason) | permission-denied | conflict`). Read ports stay untouched and frozen in shape.
- **Option B — add mutating methods to the existing provider interfaces.** Fewer files; **changes the shape of a frozen artifact** and mixes read and write lifetimes/caching in one object.
- **Option C — a single generic command bus.** Maximally flexible; loses the type-per-operation safety that is the entire value of the Phase 8 contract.

**Recommendation: Option A.** It preserves the frozen read contract exactly and keeps the Phase 8 property that "the UI depends only on these interfaces." **Approval needed:** whether adding a sibling module counts as extending the frozen artifact. This document's reading is that `ports.ts` is frozen and a *new* file is an addition, not a modification — but that is a governance call, not mine (§11 G-1).

### P9-ADR-04 — Where authorisation is decided
**Question.** Is CR-5 / CR-12 enforced by the server, the client, or both?
**Context.** F-2 — ports take no actor. `ScreenState` already renders a uniform "does not exist" page that leaks nothing, so the *presentation* is correct. The question is whether the data ever leaves the server.
- **Option A — server-authoritative only.** The session establishes the actor; the server returns `not-found` and the client never receives a cross-tenant object at all. The client renders whatever it is handed.
- **Option B — client also filters.** Defence in depth; but any client-side filter implies the object **was transmitted**, which is precisely the breach CR-5 exists to prevent.

**Recommendation: Option A, unconditionally.** Phase 3 §15.1 records disclosure exposure as *irreversible*. Client-side filtering of Zone 1 is not defence in depth — it is the vulnerability. The corollary is that `DocketHealthProvider`'s legitimate cross-tenant aggregation must be a **separately-credentialed ops path**, not the same service with a wider filter.

### P9-ADR-05 — Internal API style between UI and services
**Context.** Phase 3 §21.1 already decides **internal-first REST + webhooks, versioned by URL path, idempotency keys on all mutations, cursor pagination, zone-aware**. This is **accepted, not open.**
**Consequence, not decision:** Phase 9 providers are thin adapters from REST resources to view-models. **The view-model shaping belongs on the server** (one round trip per screen, per the aggregating ports in §3.5), or the aggregating ports become N+1 fan-outs from the browser. Recommend: the internal API exposes both resource endpoints (Phase 3 §21.2, unchanged) **and** per-screen view-model endpoints; providers call the latter. Flagged because it is an inference from §21, not a statement in it (§13 A-2).

### P9-ADR-06 — List parameterisation
**Question.** How do unbounded `list()` ports become bounded?
- **Option A — add optional cursor/filter params to the frozen port signatures.** Minimal; **modifies a frozen file.**
- **Option B — a sibling `contract/queries.ts` defining parameter and page types, with parameterised variants of the affected ports; the zero-argument forms remain as "first page, default view."** No frozen file changes.

**Recommendation: Option B**, for the same governance reason as ADR-03. Phase 3 §21.2 already fixes *cursor-based* pagination, so the mechanism is settled — only its place in the contract is open.

### P9-ADR-07 — Rules-Engine boundary
**Context.** AP-02/D-2026-002/T1: rules are data. Phase 3 §18 and TA-8 require a **defined, audited, approval-gated escape mechanism** for inexpressible rules.
**Recommendation.** The Deadline & Rules Engine is the **only** producer of dates, official fees and cost ranges; no provider and no screen ever computes one. Every such value reaches the UI as a `SlotValue` resolved by the engine with its computation trace, or as `pending-slot`. **This is already how the frozen contract is built** — the ADR records it so Phase 9 cannot drift from it. The TA-8 escape hatch needs a named design before any rule authoring begins (§11 G-4).

### P9-ADR-08 — Zone enforcement mechanism
**Context.** D-2026-003 / Phase 3 §13.1: the Zone 1 → Zone 3 boundary is enforced **at the database permission level, not by application convention.**
**Recommendation.** Phase 9 carries this literally: separate credentials per zone, the Zone 3 pipeline holding no grant on Zone 1 tables, separate search clusters with separate credentials (§17.5), no Zone 1 in logs/traces/caches (NFR-S06). **An architectural fitness test in CI must assert the credential separation** (Phase 3 §25.2 names exactly this mitigation). Non-negotiable; recorded to make it testable rather than aspirational.

---

## 5. Dependency & blocker matrix

| ID | Dependency | Source | Type | Blocks | Class | Can Phase 9 start without it? |
|---|---|---|---|---|---|---|
| **D1** | IP India programmatic access, terms, rate limits | P3 §26.2 | External | `PatentSearch`, `PatentDocument`, `Portfolio`, `ApplicationDetail`, `MatterImport`, `DocketHealth` | R2 | Yes — behind the adapter (P3 §20.1). **TA-2 is the largest single external risk.** |
| **D2** | EPO OPS / USPTO / WIPO terms, quotas, coverage | P3 §26.2 | External | corpus scope; same ports | R2 | Yes — same adapter |
| **D5** | Authoritative Indian fee schedules & rule sources | P3 §26.2 | External | Rules Engine seeding, `Deadlines*`, `Costs`, `CostPlanner` | R3 | **Engine yes, rule data no.** Engine is mechanism; rules are data (AP-02) |
| **D6** | Official register verification for agent credentials | P3 §26.2 | External | `AgentVerification`, `AgentOnboarding` | R2 | Yes — hold-on-unavailable is the designed behaviour |
| **D3/D4** | Assessment quality on open sources; model no-training terms | P3 §26.2 | External | `Assessment`, AI orchestration | R2 | Yes — **but D4 failing makes TA-9 fail and forces self-hosted Zone 1 inference (L5)** |
| **L1** | Fee-sharing / revenue structure | P3 §26.1 | **Legal** | Billing, `Costs`, `Quote`, `Pricing`, agent settlement | R4 | **Structure yes, go-live no.** Three line-item types modelled from day one (M0.8) |
| **L2** | UPL boundaries | P3 §26.1 | **Legal** | AI tiering §12, assessment presentation | R4 | Yes — may move outputs between T1/T2 |
| **L3** | Advertising/solicitation rules | P3 §26.1 | **Legal** | `AgentDirectory`, `AgentPublicProfile`, `Practice` publication | R4 | Build yes, publish no |
| **L4** | Privilege position & disclosure wording | P3 §26.1 | **Legal** | `Trust`, `CompanyLegal`, onboarding | R4 | Containers exist; copy is counsel's |
| **L5** | Third-party processing of pre-filing disclosures | P3 §26.1 | **Legal** | Zone 1 architecture, provider selection | **R4 — architectural** | **Partly no.** If third-party processing is barred, Zone 1 inference must be self-hosted. This is the one legal item with a **structural** consequence. |
| **L6** | Agent record-retention post-engagement | P3 §26.1 | **Legal** | access revocation schedule | R4 | Yes — parameterise the expiry |
| **L7** | Data residency | P3 §26.1 | **Legal** | storage architecture, provider regions | R4 | Yes — "residency-ready", activation timing only |
| **DR-01** | Who may record a *not-file* Decision | P6 register, D-2026-020 | **Product** | `DecisionProvider` | **R4 — typed** | **No.** Hard-typed `pending-slot` at `vault.ts:168`. See §12 C-4 |
| **DR-02** | Docket-import duplicate handling | P6 register, D-2026-020 | **Product** | `MatterImportProvider` | R4 | Import yes, de-duplication no — none is designed |
| **O-2026-001** | Pricing presentation | Decision Log, Open | **Product/Legal** | every `PriceDisplay` surface | R4 | Yes — mode is a slot; both modes in scope (L1 Register §3) |
| **M2** | Authoritative CR-16 vocabulary lexicon | P8 audit M2 | **Governance** | vocabulary gate, `Glossary` | R4 | Gate runs provisionally (`LEXICON_IS_AUTHORITATIVE = false`) |
| **M3** | `Metrics.md` as a linked canonical source | P8 audit M3 | **Governance** | `BusinessDashboard` target verification | R4 | **See §12 C-3 — this dependency appears to be already satisfiable** |
| **S-1/2/3/5/7/10** | Turnaround, reviewer confidence, agent-stat confidence, next-event range, channel default, MFA policy | P8 frozen slots | **Product** | assorted | R4 | Yes — all are containers |
| **P2 / P3** | Agent value proposition; Layer-3 timing | P3 §26.3 | **Product** | Layer-2 priority; entity detail | R4 | Yes — D-2026-022 follow-up records both as unconfirmed |

---

## 6. Fixture-adapter strategy

**Principle.** Fixtures are not scaffolding to be deleted. They are the **conformance oracle** for every real adapter, and they must outlive Phase 9.

**FA-1 — Every port gets exactly two implementations for the life of the product: `Fixture*` and `Api*`.** Identical interface, as `ports.ts` already states. The fixture never imports anything from the API adapter and vice versa.

**FA-2 — Promote the scenario maps to a shared conformance suite.** Phase 8's scenario maps already enumerate the mandated states (`loading · empty · error · permission-denied · not-found`, plus per-screen states like `analysing · in-review · released-* · inconclusive · provenance-unresolved`). Phase 9 turns these into a **port conformance test** every implementation must pass: *for each port, each mandated `Loaded<T>` state must be reachable and correctly shaped.* Today those states are only exercised through screens.

**FA-3 — The fixture is the contract-drift detector.** If a real adapter needs a field the fixture cannot produce, the **contract** changed — that must surface as an explicit, approved change, never as an ad-hoc field added to one adapter.

**FA-4 — Three runtime modes, one build.** `fixture` (no back end — the Phase 8 harness, preserved), `contract` (real transport, fixture service responses — proves the wire format), `live`. The mode is resolved **once**, at the composition root (ADR-02). **A `live` build must hard-fail if any fixture provider is reachable from it** — this replaces the current silent fixture default in `CitationResolverContext`.

**FA-5 — Fixture values stay synthetic, forever.** `ResolvedPassage.excerpt` is documented as "never real register content". Real register content must not be pasted into fixtures at any point in Phase 9 (Zone-2 licensing and provenance-integrity reasons both apply).

**FA-6 — The open-slot preservation test moves up, not out.** `openSlots.preservation.test.ts` (15 assertions) currently guards fixtures. In Phase 9 it must guard **the real adapters too**: an API adapter that resolves DR-01, O-2026-001, or any `pending-legal` slot fails the build. This is the mechanical guarantee that wiring real services does not quietly resolve an owner's open decision.

---

## 7. Tenancy & authorisation boundary model

Derived from Phase 3 §4.2, §15, §13.1; Phase 4 §2.3 / §9.2; the Assessment Lifecycle ADR §6; CR-5/CR-12; AP-03.

**T-1 — The actor is server-resolved, never client-asserted.** A request carries a session; the server derives actor, tenancy, roles and grants. No port parameter, header or body field may name a tenancy (ADR-04 Option A).

**T-2 — Four distinct access shapes exist, and they are not interchangeable:**

| Shape | Who | Scope | Expiry | Source |
|---|---|---|---|---|
| **Workspace membership** | Client Owner/Admin/Member/Viewer | one tenancy | account lifetime | P3 §4.1 |
| **Engagement grant** (matter-scoped) | engaged Agent | **one matter**, never the portfolio | engagement + L6 retention | P3 T5/P6 |
| **Review grant** | assigned reviewing Agent | **exactly one Disclosure version + its analysis, for exactly one `ReviewDecision`** | on release or reassignment | ADR §6 |
| **Ops access** | internal roles | cross-tenant **metadata**; Disclosure bodies consent-gated (BR-16) | per session, MFA + justification | P3 §4.2, P4 §2.3 |

The **review grant is the concept most easily lost in implementation** — it is narrower than an engagement grant, it exists *before* any Engagement, and it creates no client–agent relationship (ADR §6). `ReviewWorkspaceProvider` is its only read surface.

**T-3 — Absence is uniform.** Outside the actor's tenancy or grant → `not-found`, carrying nothing (CR-5). Inside the tenancy but above the actor's role → `permission-denied` with reason + who-can-act (CR-12/IP-15), **never a silent escalation**. The two must never be conflated in either direction: a `permission-denied` for a cross-tenant object confirms the object exists.

**T-4 — Ops cross-tenancy is an explicit, separately-credentialed path.** `DocketHealthProvider` is the only port permitted to aggregate across tenancies, it returns metadata/refs/status only, every access is audited and justified, and it runs on credentials that hold no grant on Disclosure bodies.

**T-5 — Deny is logged as loudly as grant.** M0.1: "every authorization *denial* is logged, not just grants — denial patterns are the earliest signal of a compromised account."

**T-6 — MFA is mandatory for Agents, Institution Admins and all internal roles** (M0.1). Client MFA policy is **S-10, unresolved** — the settings surface must keep it a container.

**Open for decision (§11):** session mechanism and lifetime; whether break-glass dual control is MVP or V2; L6's effect on the engagement-grant expiry schedule.

---

## 8. Failure & freshness semantics

Phase 3 §20.3 (P8) fixes the behaviour; Phase 8 fixes the *shape*. Phase 9 must connect them. Today that connection is incomplete — see C-5.

**FS-1 — Degradation ladder, in order (P3 §20.3):**
1. Serve **cached data with an explicit staleness stamp** — never an error page.
2. **Never block deadline computation** on external availability. Deadlines derive from the Event Log, which is ours.
3. Raise a **Docket Ops alert** past threshold.
4. **Never silently accept a source's date over our computation** — discrepancies go to a human queue.

**FS-2 — `FreshnessStamp` is mandatory on every externally-sourced value**, carrying `source`, `retrievedAt`, `stale`. Phase 8 already applies it per-field on the register surfaces (`PatentSearchVM.freshness` is required; `staleness?` is optional elsewhere). **Phase 9 must make it required wherever the value is external** — optionality invites omission, and an omitted stamp reads as fresh.

**FS-3 — `Loaded<T>.error` is for *our* failure, not a source's.** A degraded upstream source must still return `ready` + stale data + stamp. An `error` state on a register screen means the platform failed, not the register. This distinction is stated in the Phase 8 contract comments and must survive into the adapters.

**FS-4 — Fail-closed cases, enumerated.** These deliberately reverse FS-1 and must be preserved exactly:

| Case | Behaviour | Source |
|---|---|---|
| Conflict check cannot complete | `MatchingProvider` → `error`; **never proceed** | `ports.ts` B4 |
| Citation cannot resolve | assertion renders **unverified**, never as fact (IP-08) | `primitives.ts`, `useResolvedCitation` |
| Agent register unavailable | **hold**; never auto-approve | `ports.ts` B7 |
| Verdict not yet released | **no verdict is representable** (CR-2/BR-01) | Assessment ADR §4 |
| Below the n≥20 floor | **no statistic at all**, not a hedged one | D-2026-019 |

**FS-5 — Anti-silence.** `WhoseTurn` is the backbone; a waiting item's timing is a `SlotValue`, never a countdown and never a fabricated time. Home must not show a false "all clear" when data is stale.

**Recommended addition (needs approval, §11 G-3):** the `Loaded<T>` envelope has **no way to say "this is a cached answer served during an outage."** Freshness is expressed per-field inside VMs, inconsistently and often optionally. Either (a) add a `servedFromCache` marker to the envelope — which modifies a frozen type — or (b) mandate a required `FreshnessStamp` on every externally-sourced VM field in the Phase 9 adapters. **Option (b) is recommended** as it changes no frozen file.

---

## 9. Testing strategy

Phase 8 froze **188 tests / 48 files** plus eight static gates, all passing at `0ddf8bb`. Phase 9 inherits that baseline and adds five layers.

**TS-0 — The Phase 8 baseline is a floor, not a starting point.** Every existing gate (typecheck, tests, token Gate A=209/Gate B=0, anti-leak, harness, raw-value 20, vocabulary, open-slot preservation, build, Storybook) must stay green in every Phase 9 batch. Regression of a gate is a batch failure.

**TS-1 — Port conformance suites (new).** One suite per port, run against **every** implementation (FA-2). Asserts state reachability, `Loaded<T>` shape, and that a cross-tenant fixture yields `not-found` and nothing else.

**TS-2 — Architectural fitness tests (new, CI-gated).** Phase 3 §25.2 names these as the mitigation for two *existential* risks:
- Zone-1→Zone-3 credential separation holds (the Zone 3 pipeline has no grant on Zone 1 tables).
- No Zone 1 in logs, traces, caches, or analytics (NFR-S06).
- Modular boundaries: no cross-module schema access.
- No screen or provider computes a date, official fee, or cost range (AP-02 / ADR-07).

**TS-3 — Golden test suites for the Deadline Engine (new, non-negotiable).** Phase 3 §18.5/§25.2 requires four-layer verification for the one module whose failure is *existential*. Golden cases per jurisdiction, from authoritative sources (D5), with recomputation reproducibility from the Event Log. **Sequencing consequence: rule data (D5) gates not just the engine but its test suite.**

**TS-4 — Provenance regression (new).** Span-stable addressing across corpus re-ingestion (TA-7, §17.3): a citation created today still resolves after re-ingest. This is the test that keeps AP-04 enforceable, and it is cheap now and expensive to retrofit.

**TS-5 — Authorisation matrix tests (new).** Every (actor shape × object × operation) triple from §7, asserting `not-found` vs `permission-denied` vs success. Closes audit finding L4 (uneven CR-5 coverage) by construction.

**TS-6 — Contract-mode integration (new).** FA-4's `contract` mode exercises the real transport against fixture responses, catching wire-format drift without a running back end.

**Carried Phase 8 items:** L2 (n≥20 as a *type* constraint, not a comment) and L4 (even CR-5 coverage) were explicitly carried to Phase 9 as optional hardening — TS-1 and TS-5 absorb both. Recommend accepting them as in-scope rather than optional.

---

## 10. Proposed Phase 9 batch sequence

Derived from §2 readiness and §5 dependencies. **Sequencing rule applied: a batch may start only when everything it reads from exists.** Surface parity is explicitly *not* a criterion — this is why the Public surface, which was last in Phase 8, is split and partly early here, and why the Client surface is not rebuilt in its Phase 8 order.

| Batch | Name | Content | Gate to start | Gate to finish |
|---|---|---|---|---|
| **P9-B0** | *this document* | Decisions & specification | — | **owner approval** |
| **P9-B1** | Foundation | Composition root (ADR-02), runtime modes (FA-4), internal API skeleton (ADR-05), Event Log, relational schema, zone credential separation + fitness tests (TS-2), routing/URL model (ADR-01) | B0 approved | TS-0 + TS-2 green |
| **P9-B2** | Identity, tenancy & access | M0.1; the four grant shapes (§7); authorisation matrix tests (TS-5); `Auth`, `WorkspaceSetup` ports | B1 | TS-5 green; CR-5 server-side |
| **P9-B3** | Command surface | ADR-03 command ports; idempotency; the ten `NextActionVM` verbs as operations | B2 | conformance + authz tests |
| **P9-B4** | Vault (Zone 1) | M1.2 + M0.5 + M0.10; B2-path read ports **except `DecisionProvider`** | B3 | zone fitness tests green |
| **P9-B5** | Rules & Deadline Engine ★ | M0.2 + M4.4 authoring console; golden suites (TS-3); `Deadlines*`, `AgentDocket`, `RuleAuthoring` | B4 · **D5 for rule data** | four-layer verification (§18.5) |
| **P9-B6** | Integration Hub & Zone 2 corpus | M0.9 adapters, M0.3 search, **span-stable addressing (TA-7)**; `PatentSearch`, `PatentDocument`, `Portfolio`, `ApplicationDetail` | B5 · **D1/D2** | TS-4 provenance regression green |
| **P9-B7** | Provenance, AI orchestration & Assessment | M0.4 + M0.6 + M1.3; `CitationResolver` live; `Assessment`, `AssessmentRequest/List` | B6 (needs a real corpus) · D3/D4 | IP-08 fail-safe verified |
| **P9-B8** | Review path & Agent core | review grant; `ReviewsQueue`, `ReviewWorkspace`, `AgentMatterDetail`, `AgentMatters`, `AgentToday` | B7 (nothing to review before it) | CR-2/BR-01 gate verified |
| **P9-B9** | Matters, Billing & Matching | M1.5, M1.6, M0.8 (three line-item types from day one); `Matters*`, `Costs`, `Matching`, `Quote` | B8 · **L1 for go-live** | slots still pending (FA-6) |
| **P9-B10** | Notification & aggregation | M0.7; `Home`, `Notifications`, `Agent*Notifications`, `Documents`, `Settings` | B9 — **these fan in from everything above** | anti-silence (FS-5) verified |
| **P9-B11** | Outcome Data & Operations | M0.11 (Zone 3), M4.1/M4.2; `DocketHealth`, `QualityConsole`, `BusinessDashboard`, `AgentVerification` | B10 · D6 | Zone-1→3 isolation re-verified |
| **P9-B12** | Public surface & content | R0 content ports, `CostPlanner`, `Glossary`; rendering strategy from ADR-01 | B6 for register pages; R0 pages any time after B1 | SEO/rendering acceptance |
| **P9-B13** | Legal-gated go-live | `Pricing`, `Trust`, `CompanyLegal`, `AgentDirectory`, `AgentPublicProfile`, `Practice` publication | **L1 · L3 · L4 landed** | no slot resolved without a Decision Log entry |
| **P9-B14** | Verification & closure | full-suite hardening, independent audit, closure report | B13 | freeze |

**Three sequencing consequences worth stating plainly:**

1. **`DecisionProvider` (SC-C09) has no batch.** It is typed to an unresolved decision. It is scheduled the moment DR-01 is resolved, and not before (§12 C-4).
2. **`HomeProvider` and `AgentTodayProvider` are late, not early**, despite Home being "the most-visited screen". They aggregate; they cannot precede their sources. Under surface parity they would have come early — this is the clearest illustration of the approved principle.
3. **The Public surface is split.** Its R0 content pages can land any time after B1; its register pages cannot precede the corpus (B6); its legal pages cannot go live before L4. Treating "Public" as one batch, as Phase 8 reasonably did, would stall eight ready ports behind two blocked ones.

---

## 11. Items requiring a human decision

**Nothing in this section may be resolved by an implementer.** Each is listed with who owns it and what it blocks.

### 11.1 Owner / product

| ID | Decision | Blocks | Notes |
|---|---|---|---|
| **DR-01** | Which role may record a *not-file* Decision | `DecisionProvider`, SC-C09 | Deferred at Phase 6 freeze (D-2026-020). **Typed into the contract** — see C-4 |
| **DR-02** | Docket-import duplicate handling | `MatterImportProvider` | Deferred at Phase 6 freeze. No de-duplication is designed anywhere |
| **O-2026-001** | Pricing presentation (bundled vs component) | every price surface | Open; probable direction recorded 1 Sep 2026; awaiting L1 |
| **P2** | Agent value proposition (free docket tooling first) | Layer-2 priority, `AgentOnboarding` | Not recorded as resolved (Assumptions §5) |
| **P3** | Layer 3 (Institution) V2 or V3 | entity-model detail | Not recorded as resolved |
| **S-1 / S-2** | Review turnaround & reviewer-confidence representation | `Assessment`, `ReviewWorkspace` | ADR §9 records a *working* two-business-day figure, explicitly not a commitment |
| **S-3** | Agent-stat confidence representation | `Practice`, `Matching`, public profiles | n may publish; confidence may not |
| **S-5 / S-7 / S-10** | Next-event range · per-class default channel · client MFA policy | `ApplicationDetail`, `AgentSettings`, `Settings`, `Auth` | |
| **GATE** | Free-assessment capacity gate | `AssessmentRequest` | D-2026-017: deferred pending a COGS/capacity model |

### 11.2 Legal (specialist counsel — this document makes no legal determination)

| ID | Decision | Architectural consequence if unfavourable |
|---|---|---|
| **L1** | Fee-sharing / revenue structure | Three billing data models; **highest-priority dependency** (P3 §26.1) |
| **L2** | UPL boundaries | Moves outputs between AI tiers T1/T2; changes review throughput and unit economics |
| **L3** | Advertising / solicitation rules | May bar publishing agent outcome statistics — **a core moat mechanism** |
| **L4** | Privilege position & wording | Trust pages, onboarding, document classification |
| **L5** | Third-party processing of pre-filing disclosures | **The only legal item with a structural consequence: if barred, TA-9 fails and Zone 1 inference must be self-hosted.** Sequencing impact on P9-B7 |
| **L6** | Agent record retention post-engagement | Engagement-grant expiry schedule |
| **L7** | Data residency | Storage architecture and provider regions; activation timing |

### 11.3 Governance

| ID | Question | Why it must be decided before the relevant batch |
|---|---|---|
| **G-1** | Does adding a sibling contract module (`commands.ts`, `queries.ts`) count as modifying the frozen Phase 8 artifact? | ADR-03 and ADR-06 both depend on the answer. If it does, both need a different mechanism |
| **G-2** | Is the `04_Development/ui` tree the Phase 9 application, or does Phase 9 start a new tree that consumes the frozen contract as a package? | Determines whether Phase 8's gates (token Gate A=209, raw-value=20) carry forward as-is |
| **G-3** | May `Loaded<T>` gain a cache/staleness marker, or must freshness stay per-field? | §8 FS-3; recommendation is to keep the frozen type unchanged |
| **G-4** | Who approves a TA-8 rules escape-hatch use, and what is the audit record? | P3 §24 requires the mechanism be defined *before* it is needed, not after |
| **M2** | Supply the authoritative CR-16 vocabulary lexicon | The gate runs provisionally today (`LEXICON_IS_AUTHORITATIVE = false`) |
| **M3** | Resolve the `Metrics.md` traceability status | **See C-3 — this may already be closable** |
| **G-5** | Independent (unconflicted) confirmation of the Phase 8 B8/B9 audit findings | Advisory at freeze; carried forward |
| **G-6** | Update the Roadmap to record Phase 8 as frozen | **See C-1** — the canonical status document contradicts the freeze report |

### 11.4 External parties (not decisions, but not in the team's control)

D1 (IP India access), D2 (EPO/USPTO/WIPO terms), D3 (assessment quality on open sources), D4 (model no-training terms), D5 (authoritative fee schedules and rule sources), D6 (agent register verification method). **These should be opened in parallel with P9-B1, not when their batch arrives** — D1 and D5 in particular have long lead times and gate B5/B6.

---

## 12. Consistency review — contradictions found

Per `CLAUDE.md` ("If a contradiction exists, report it instead of silently fixing previous work"), these are **reported, not resolved**.

**C-1 — The Roadmap contradicts the Phase 8 freeze.** `01_Strategy/Roadmap.md` is designated "**Canonical source for current project status**" (Decision L). It records Phase 8 as *"Active Development … B1 implementation in progress (not complete)"* and Phase 9 as *"Not started."* `Claude outputs/Phase-8-Closure-Freeze-Report.md` records Phase 8 as **closed and frozen at `0ddf8bb`** through B9 with an independent audit. Both cannot be current. **Owner action:** update the canonical status document, or explain why the freeze report is not yet canonical. *This batch does not modify the Roadmap.*

**C-2 — Phase 8's closure evidence sits outside the repository's document structure, and one artifact exists in two divergent copies.** `Phase-8-Closure-Freeze-Report.md` and `Phase-8-Independent-Audit.md` — the authority for the frozen tip and its audit — live only in a working `Claude outputs/` folder, not in `04_Development/` or `09_Governance/`. Separately, `Phase-8-B1-TokenHierarchy-Traceability.md` exists **twice**, at different sizes and dates: `04_Development/` (~26 KB, later) and `Claude outputs/` (~13 KB, earlier). `Phase-8-External-Source-Traceability.md` §3 describes this document as living "under the working `Claude outputs` area, not in the source tree," which is true of the older copy but misses the newer one. **Owner action:** confirm which copy is authoritative and where the closure evidence belongs. *This batch moves and merges nothing.*

**C-3 — `Metrics.md` is stated as absent from the repository, but it is present.** Both the freeze report §9(2) and `Phase-8-External-Source-Traceability.md` record the Business-dashboard metric targets as *"source not in repo — governance to link"*. `01_Strategy/Metrics.md` **exists** (11,916 bytes), is designated the *"Canonical source for metric definitions"* under Decision I, and contains OP-1…OP-6 with the D-2026-018 conflict resolutions. The most likely reading is that M3 meant "not in the `04_Development/ui` source tree," but that is not what either document says. **If the file is the intended source, dependency M3 is closable by verifying the seven transcriptions against `01_Strategy/Metrics.md` — a read-only check, not a code change.** *This batch did not perform that verification, because doing so would edit the frozen manifest's status column.*

**C-4 — An open owner decision is encoded in a frozen type.** `contract/vault.ts:168` declares `mayRecordNotFileDecision: { status: 'pending-slot'; slotId: 'DR-01'; source: 'owner-decision' }` — a *literal* type, not a `SlotValue`. This is excellent discipline at Phase 8 (no real provider can accidentally resolve DR-01), and it is a genuine blocker at Phase 9: **`DecisionProvider` cannot be wired to a real service without either resolving DR-01 or widening that type in a frozen file.** Recorded as a structural consequence, not a defect.

**C-5 — Freshness optionality is inconsistent across the contract.** `PatentSearchVM.freshness` is required; `HomeVM.staleness?` and `AgentTodayVM.staleness?` are optional; several externally-sourced VMs carry none. Phase 3 §20.3 requires an explicit staleness stamp on cached data. The frozen contract permits an externally-sourced value to be rendered with no stamp at all. Addressed by FS-2 at the adapter layer; flagged because the *type* does not enforce it.

**C-6 — Document access has no representation.** Phase 3 §19.3 requires "signed short-lived URLs for access; no direct bucket access." `DocumentsIndexVM` and the matter/application document lists carry metadata but no access-token or URL affordance. Phase 9 must add one — and per G-1, where it is added is a governance question.

**C-7 — The "Marketplace" term conflict remains open, by design.** `CLAUDE.md` and `01_Strategy/Glossary.md` record that D-2026-006 uses *Marketplace* for the business/regulatory structure while Assessment Lifecycle ADR §13.8 reserves it for the future licensing surface (MVP concept: *Agent Matching / Engagement*). Both are accepted; neither supersedes the other. **Phase 9 code and documents must use "Agent Matching / Engagement" for the MVP concept**, matching the frozen Phase 8 comments. Not a defect — restated so the resolution is not attempted by drift.

**C-8 — Phase 1 §8's "Phase 7 — Technical architecture" has no recorded disposition.** The Roadmap records this explicitly. Phase 9 is where that material is needed, and it exists scattered across Phase 3 §10/§13/§15/§17–22. This document treats Phase 3 as the technical-architecture source of truth. **If that is wrong, ADRs 01–08 rest on the wrong base.**

---

## 13. Assumptions made in producing this document

Stated so they can be challenged rather than silently inherited (the repository's own convention).

| # | Assumption | If wrong |
|---|---|---|
| **A-1** | Phase 3 §2, §13, §15, §17–22 is the canonical technical architecture for Phase 9 | §4 ADRs rest on the wrong base (see C-8) |
| **A-2** | Phase 3 §21's internal-first REST decision governs the UI↔service boundary, and per-screen view-model endpoints are compatible with it | ADR-05 becomes a decision rather than a consequence |
| **A-3** | "Frozen" prohibits *modifying* Phase 8 files but does not prohibit *adding* sibling modules that import from them | ADR-03 and ADR-06 need different mechanisms (this is G-1) |
| **A-4** | The Phase 8 freeze report is authoritative over the Roadmap's Phase-8 status | §10's starting point is wrong (this is C-1) |
| **A-5** | Phase 9 continues in `04_Development/ui`, inheriting its gates and baselines | §9 TS-0 and the batch gates need restating (this is G-2) |
| **A-6** | `AssessmentProvider`'s absence from the B2–B8 groupings means it belongs to the B1 cross-cutting slice | minor: one matrix row moves |
| **A-7** | Fixture providers remain in the tree permanently as the conformance oracle | §6 FA-1…FA-6 need rework |

**Not assumed, deliberately:** no service is named, no vendor selected, no schema designed, no estimate given, and no open slot resolved.

---

## 14. Architectural boundaries this batch must not cross

1. **Phase 8 is frozen at `0ddf8bb`.** No file under `04_Development/ui/src` is modified by this batch or by its approval.
2. **No open decision is resolved here.** Every DR-, O-, L-, S- and P- item stays exactly as the freeze report §8 records it.
3. **No permanent architectural decision is invented.** §4 presents options and recommendations; approval is the owner's.
4. **No V2 functionality enters MVP.** Drafting Workspace (D-2026-010), Layer 3 (P3), Public API (V3), NPL/chemical/sequence search (V4) are all out of scope for every batch in §10.
5. **No legal determination is made.** §11.2 names dependencies; it does not answer them.
6. **Zone 1 never crosses to Zone 3**, and no Phase 9 convenience overrides the database-level enforcement (ADR-08).
7. **Nothing renders an invented value.** CR-19 holds through Phase 9: a real service that cannot supply a value returns a container, not a plausible number.

---

## 15. Handoff notes

**What P9-B0 delivers:** a wiring map for all 57 frozen ports, eight proposed ADRs, a dependency matrix, four strategies (fixture-adapter, tenancy/auth, failure/freshness, testing), a batch sequence (B1–B14) derived from dependency-readiness, and a register of every item that needs a human.

**What approval of this document would establish:** the readiness classification (§2), the wiring map (§3), the four strategies (§6–9), and the batch sequence (§10). ADRs 01–08 would each become Decision Log entries (D-2026-024 onward, numbering at the owner's discretion).

**What approval would *not* establish:** any open DR-/O-/L-/S-/P- item; any vendor, schema, or estimate; the Roadmap's status (C-1 needs its own act).

**The three things to decide first, because everything queues behind them:**
1. **G-1** — may Phase 9 add sibling contract modules? *Without this, ADR-03 (the command surface) cannot proceed, and without a command surface Phase 9 builds a read-only product.*
2. **ADR-01** — rendering strategy and topology. *The deferred D-2026-022 item; it shapes P9-B1's first file.*
3. **D1 and D5** — open the external conversations now. *They gate P9-B5 and P9-B6 and have the longest lead times of anything in §5.*

**The one item that will be forgotten if it is not scheduled:** **span-stable chunk addressing (TA-7, Phase 3 §17.3).** It is invisible until a citation fails to resolve two years from now, at which point AP-04 and BR-02 are unenforceable and the fix is a re-ingestion of the entire corpus. It belongs in P9-B6, with its regression test (TS-4), and it should not be allowed to slip.

---

*End of P9-B0 specification. Nothing here is canonical. Awaiting owner approval.*
