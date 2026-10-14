# Phase 9 — B0: Wiring, Architecture & Sequencing Specification

**Version:** v0.2 — **PROPOSED, NOT ACCEPTED** (revision of v0.1; single pre-acceptance revision per owner instruction)
**Type:** Decisions & specification batch (P9-B0). No code. No Phase 8 modification. No Git.
**Date:** 20 September 2026
**Baseline read:** Phase 8 frozen at `0ddf8bb` (per `Claude outputs/Phase-8-Closure-Freeze-Report.md`); frozen Phases 1–7 per `01_Strategy/Roadmap.md` § Frozen Baseline.
**Governing sequencing principle (owner-approved):** **dependency-readiness**, not surface parity.

**Standing rule for this document — nothing here resolves an open item.** Every DR-, O-, L-, S-, P-, G- and M- item enumerated in the Phase 8 freeze report §8/§9 remains in exactly the state it was frozen in. This revision *classifies*, *maps* and *sequences*; it does not decide. The one exception is a **read-only evidence check** of dependency M3 (§6.4 / §14.3), which changes M3's *status* by producing evidence, not by making a decision — and which modifies no file.

**Authority of this document:** not canonical. Every ADR in §4 is tagged with its decision class (§4.0). Only the owner converts a "new decision required" ADR into a Decision Log entry; "inherited" and "interpretation" ADRs record or read accepted material and still await confirmation that the reading is correct.

**Constraints honoured in producing this revision:** read-only. No implementation file was written, no Phase 8 artifact was modified, no Git command was run. Contradictions found in the repository are **reported in §14**, split into documentation-only and implementation-affecting, and none is fixed.

**What changed from v0.1 → v0.2** (all nine owner-requested revisions):
1. Each ADR now carries an explicit decision class — inherited / interpretation / new-decision-required (§4.0, §4).
2. G-1 is kept unresolved and is now named as the single governance gate for **all** sibling contract additions (§4.3, §6, §13.3).
3. New **Contract-Change Candidates Register** (§6) covering commands, queries/pagination, document access, freshness/cache, and DR-01.
4. The port mapping is reframed as **Port → backing capability/service → transport representation** — no concrete endpoint is fixed here (§3).
5. **M3 read-only verification performed** against `01_Strategy/Metrics.md`; M3 reported **evidence-resolved** (§6.4, §14.3).
6. The consistency review separates **documentation contradictions** (not Phase 9 blockers) from **implementation-affecting findings** (§14.1 vs §14.2).
7. B1 is split into **B1a (runtime/composition foundation)** and **B1b (platform/backend foundation)**, each with explicit completion boundaries (§11).
8. The Phase 8 regression suite is named **The Floor** and made a mandatory gate on every batch (§10 TS-0, §11, §15).
9. Every unresolved DR/O/L/S/P/G item stays unresolved (standing rule above; §12, §15).

---

## 1. What Phase 8 actually handed over

Phase 8 froze a **presentation-only surface** over a typed presentation-data contract. Precisely:

| Frozen asset | Shape | Phase 9 consequence |
|---|---|---|
| `src/contract/ports.ts` | **57 interfaces** — 56 `*Provider` + `CitationResolver` | The wiring surface. §3 maps each. |
| `src/contract/*` (10 further modules) | View-models, `Loaded<T>`, `SlotValue<T>`, `FreshnessStamp`, `TwoAxisStatus`, `Assertion`/`Citation` | The data shape Phase 9 must produce, unchanged. |
| `src/screens/*` (56 screens) | `({ loaded }: { loaded: Loaded<VM> })` — pure props, no fetching | Screens need a **caller**; none exists. |
| `src/fixtures/providers/*` (9 modules) | Classes implementing the ports from static scenario maps | The reference adapters. §7. |
| `src/App.tsx` | Demo harness importing **scenario maps directly**, not providers | There is **no composition root**. §4 ADR-02. |

### 1.1 Three structural facts that shape all of Phase 9

These are observations about the frozen artifact, not criticisms of it — Phase 8's scope was explicitly presentation-only (D-2026-022).

**F-1 — The frozen port surface is read-only.** All 57 interfaces expose only `get` / `list` / `search`. There is **no command, mutation, or write port anywhere in the contract.** Yet `NextActionVM.verb` already enumerates ten actions the product must perform — `Record · Assess · Engage · File · Respond · Confirm · Decide · Release · Import · Review` — and the Assessment Lifecycle ADR §4 defines state transitions (`Requested → Analysing → In review → Released → Decided`) that only a write path can effect. **Phase 9 must extend the contract with a command surface.** That is an addition to a frozen artifact's shape, not a wiring exercise, and it is gated by governance question G-1 (§4.3, §6.1).

**F-2 — Ports carry no actor.** No port takes a caller, session, tenancy, or role argument. Tenancy is *ambient*: `CostsProvider.get()` is documented as "Owner/Admin only → `permission-denied`", but nothing in the signature says who is asking. Where the actor is resolved determines whether cross-tenancy invisibility (CR-5 / P3 P6 / P4 IA-5 / P5 X7) is enforced by the server or merely rendered by the client. This is the single highest-stakes Phase 9 decision (ADR-04).

**F-3 — Lists are unbounded and unparameterised.** Every `list()` takes no cursor, filter, sort, or page. `DocketHealthProvider` aggregates *across tenants*; `PortfolioProvider`, `DeadlinesProvider`, `NotificationsProvider`, `ReviewsQueueProvider` are all open-ended. Real services cannot return these whole (ADR-06, §6.2).

---

## 2. How this document classifies readiness

Every port and work item below carries one readiness class. The batch sequence in §11 is derived **mechanically** from these classes — that is what "dependency-readiness over surface parity" means in practice.

| Class | Meaning | Gate |
|---|---|---|
| **R0** | Buildable now against in-repo material only | none |
| **R1** | Needs an internal platform service that Phase 9 itself builds | internal, sequenced |
| **R2** | Needs a confirmed **external data source** | D1 / D2 / D6 (Phase 3 §26.2) |
| **R3** | Needs **Rules-Engine rule data** authored from authoritative sources | D5 |
| **R4** | Blocked on a **human decision** — product, legal, or governance | §12 register |

A port may carry several classes; the highest-numbered gate governs scheduling. **R4 never blocks the structural work** — the frozen artifact already renders every unresolved item as a container, so Phase 9 can wire the container and leave the slot pending. R4 blocks only **go-live** of the affected surface, exactly as D-2026-022's follow-up records for L1/L3/L4.

---

## 3. Port → backing capability/service → transport representation

**This is deliberately a three-level mapping, not a port→endpoint table.** A frozen port names a *need*; it does not name a route. Phase 9 resolves each need in two further steps, and **neither is fixed by this document**:

- **Level 1 — Backing capability / service.** Which Phase 3 §5 module(s) own the data and behaviour. Stable; derived from the frozen architecture.
- **Level 2 — Transport representation.** *How* the port's `Loaded<VM>` is delivered over the internal API. This is an ADR-05 consequence (§4), **not an endpoint specification.** A port may end up served by a REST resource route, a per-screen view-model route, or an adapter-backed route — the choice is made in P9-B1b, per port, and may change without touching the port interface. The representation archetypes used below are defined once here:

| Code | Transport representation | Typical ports |
|---|---|---|
| **VM-R** | Server composes one screen's view-model in one call | most object/detail reads |
| **VM-A** | Server **aggregates across services** into one view-model (fan-in on the server, never the browser) | `Home`, `AgentToday`, `Notifications` |
| **RES** | Maps to a REST resource collection/item (Phase 3 §21.2) | index/list reads |
| **EXT** | Resource read whose data and freshness arrive through an Integration-Hub adapter (Phase 3 §20.1) | register / portfolio / import |
| **CMD†** | Read port with **no write counterpart in the frozen contract** — needs a command companion (F-1, §6.1) before its screen's actions work | any screen with a `NextActionVM` |

**No endpoint, path, verb, or payload is specified in this section.** Assigning them is P9-B1b work, bounded by ADR-05 (which is itself an inherited decision — Phase 3 §21). Zone and external-source columns remain because they drive readiness; the representation column replaces any implication of a fixed endpoint.

Module references are to `02_Product/Phase-3-Product Architecture PRD v1.0.md` §5. Zone references are AP-03 / D-2026-003 / Phase 3 §13.1.

### 3.1 Cross-cutting (B1 seam)

| Port | Backing capability / service | Zone | Repr. | Readiness | Notes (external source · constraint) |
|---|---|---|---|---|---|
| `AssessmentProvider` | M1.3 Assessment · M0.4 Provenance · M0.6 AI Orchestration | 1 (reads 2) | VM-R · CMD† | R1 · R4(S-1,S-2) | model providers. CR-2 gate: no verdict pre-release. Reviewer confidence stays a slot. |
| `CitationResolver` | M0.4 Provenance · M0.3 Search · M0.5 Documents | 2 | RES | R2 | corpus (§20.2). **Requires span-stable addressing (§17.3, TA-7)** or AP-04/BR-02 is unenforceable. Highest technical risk in the port set. |

### 3.2 Client Vault path (Phase 8 B2)

| Port | Backing capability / service | Zone | Repr. | Readiness | Notes |
|---|---|---|---|---|---|
| `WorkspaceSetupProvider` | M0.1 Identity & Tenancy | 1 | VM-R · CMD† | R1 | **Tenancy is born here** (A1, D-2026-015). Foundational — §11. |
| `InventionsProvider` | M1.2 Invention Vault | 1 | RES | R1 · F-3 | |
| `InventionDetailProvider` | M1.2 | 1 | VM-R | R1 | CR-5 `not-found` must be server-side (ADR-04). |
| `DisclosureCaptureProvider` | M1.2 | 1 | VM-R · CMD† | R1 | |
| `DisclosureVersionsProvider` | M1.2 · M0.5 · M0.10 Event Log | 1 | VM-R | R1 | Immutability on release (BR-20) is an Event-Log property. |
| `AssessmentRequestProvider` | M1.3 | 1 | VM-R · CMD† | R1 · R4(GATE) | Free-assessment no-gate is a *working* assumption (D-2026-017). |
| `AssessmentsListProvider` | M1.3 | 1 | RES | R1 | |
| `DecisionProvider` | M1.2 · M0.1 | 1 | VM-R · CMD† | **R4 (DR-01)** | `mayRecordNotFileDecision` is hard-typed `pending-slot / DR-01` (`vault.ts:168`). **Wiring requires resolving DR-01 or widening a frozen type** — §6.5, §14.2 C-4. |

### 3.3 Client Portfolio & Deadlines (B3)

| Port | Backing capability / service | Zone | Repr. | Readiness | Notes |
|---|---|---|---|---|---|
| `PortfolioProvider` | M1.7 · M0.9 Integration Hub | 1+2 | EXT | R2 · F-3 | IP India, EPO OPS, USPTO, WIPO |
| `ApplicationDetailProvider` | M1.7 · M0.9 | 1+2 | EXT | R2 | 3 modes incl. `responding-status-only` (CR-17 / D-2026-016). |
| `DeadlinesProvider` | **M0.2 Deadline & Rules Engine ★** | 1 | RES | R3 | derived from Event Log; §20.3: deadlines **never** block on external availability. |
| `DeadlineDetailProvider` | **M0.2 ★** · M0.10 | 1 | VM-R | R3 | Carries the **computation trace** (§18.3). The trace is the product (AP-08). |

### 3.4 Client Matters, Costs, Matching (B4)

| Port | Backing capability / service | Zone | Repr. | Readiness | Notes |
|---|---|---|---|---|---|
| `MattersProvider` | M1.6 | 1 | RES | R1 · F-3 | |
| `MatterWorkspaceProvider` | M1.6 · M0.5 | 1 | VM-R · CMD† | R1 | |
| `CostsProvider` | M0.8 Billing · M0.2 (official fees) | 1 | VM-R | R3 · **R4 (L1, O-2026-001)** | fee schedules (D5). Role-gated → `permission-denied` (CR-12/IP-15). |
| `MatchingProvider` | M1.5 · M0.11 Outcome Data | 3 | VM-R · CMD† | R1 · R4(S-3) | `error` = conflict check could not complete → **fails closed**. |
| `QuoteEngagementProvider` | M0.8 · M1.5 | 1+3 | VM-R · CMD† | R2 · **R4 (L1)** | payment gateway. L1 is the "highest-priority dependency" (§26.1). |

### 3.5 Client Home, Documents, Settings, Notifications (B5)

| Port | Backing capability / service | Zone | Repr. | Readiness | Notes |
|---|---|---|---|---|---|
| `HomeProvider` | aggregates M1.2/1.6/1.7 · M0.2 · M0.7 | 1 | **VM-A** | R1 (fan-in) | Depends on every B2–B4 service. Cannot precede them. |
| `DocumentsProvider` | M0.5 | 1 | RES | R1 · F-3 | Signed short-lived URLs (§19.3) — **the VM has no URL field today** (§6.3, §14.2 C-6). |
| `SettingsProvider` | M0.1 | 1 | VM-R · CMD† | R1 · R4(S-10, L7, S-7) | |
| `NotificationsProvider` | M0.7 Notification | 1 | VM-A | R1 · F-3 | Delivery receipts are a service concern, not a read model. |

### 3.6 Agent surface (B6)

| Port | Backing capability / service | Zone | Repr. | Readiness | Notes |
|---|---|---|---|---|---|
| `AgentOnboardingProvider` | M0.1 · M2.4 | 1 | VM-R · CMD† | R2 | agent register (D6) |
| `AgentTodayProvider` | aggregates docket+matters+reviews | 1 | **VM-A** | R1 (fan-in) | Risk-ranked; ranking Rules-Engine-derived, never invented (CR-19). |
| `AgentDocketProvider` | M2.1 · M0.2 ★ | 1 | RES | R3 | |
| `AgentMattersProvider` | M2.1 · M1.5 | 1 | RES | R1 · F-3 | |
| `MatterImportProvider` | M2.1 · M0.9 | 1+2 | EXT · CMD† | R2 · **R4 (DR-02)** | Contract is DR-02-agnostic: **no de-duplication designed** (§6, §14.2). |
| `AgentMatterDetailProvider` | M2.1 | 1 | VM-R · CMD† | R1 | Matter-scoped grant (T5/P6). |
| `ReviewsQueueProvider` | M1.3 · ADR §5 | 1 | RES | R1 | Domain-routed; conflicted items **never appear** — exclusion server-side. |
| `ReviewWorkspaceProvider` | M1.3 · M0.1 | 1 | VM-R · CMD† | R1 | **The CR-2 / BR-01 gate.** Enforces the *review grant* (§8 T-2). |
| `OpportunitiesProvider` | M1.5 | 1+3 | RES | R1 | |
| `PracticeProvider` | M2.4 · M0.11 | 3 | VM-R | R1 · **R4 (L3, S-3)** | n≥20 floor (D-2026-019) comment-only today — audit L2. |
| `AgentSettingsProvider` | M0.1 | 1 | VM-R · CMD† | R1 · R4(S-7) | MFA mandatory for agents (M0.1). |
| `AgentNotificationsProvider` | M0.7 | 1 | VM-A | R1 · F-3 | |

### 3.7 Operations surface (B7)

| Port | Backing capability / service | Zone | Repr. | Readiness | Notes |
|---|---|---|---|---|---|
| `DocketHealthProvider` | M4.1 ★ · M0.9 · M0.2 | 1(meta)+2 | VM-A | R2 · F-3 | **Cross-tenant by design** — the one legitimate CR-5 exception; must be explicit (ADR-04, §8 T-4). Disclosure bodies consent-gated (BR-16). |
| `AgentVerificationProvider` | M4.3 · M0.1 | 1 | VM-R · CMD† | R2 | agent register (D6). Unavailable → **hold**, never auto-approve (§9). |
| `RuleAuthoringProvider` | **M4.4 ★ · M0.2 ★** | — | VM-R · CMD† | R3 | authoritative rule sources (D5). Publish gated by tests + impact + dual control. **AP-02's enforcement point.** |
| `QualityConsoleProvider` | M4.2 · M0.6 | 3 | VM-R | R1 · R4(OP-6) | |
| `BusinessDashboardProvider` | M4.x · M0.11 | 3 | VM-R | R1 · R4(OP-2 target) | Targets are `config` — **verified against `Metrics.md` (§6.4)**; measured values stay `pending`. |

### 3.8 Public surface (B8)

All Public ports are Zone-2/anonymous unless noted. The **SSR/SSG rendering strategy is unresolved** (D-2026-022, held deliberately) and gates this group — ADR-01.

| Port | Backing capability / service | Zone | Repr. | Readiness | Notes |
|---|---|---|---|---|---|
| `PatentSearchProvider` | **M1.1 · M0.3 Search** | 2 | EXT | **R2 (D1, D2)** | The free wedge. TA-1/TA-2 — the largest external technical risk (T4). |
| `PatentDocumentProvider` | M1.1 · M0.3 · M0.5 | 2 | EXT | R2 | |
| `AgentDirectoryProvider` · `AgentPublicProfileProvider` | M2.4 · M0.11 | 3 | RES | **R4 (L3, S-3)** | Publication go-live is L3-gated. |
| `PricingProvider` | M0.8 | — | VM-R | **R4 (L1, O-2026-001)** | |
| `CostPlannerProvider` | M1.4 · M0.2 | — | VM-R | R3 · R4(O-2026-001) | fee schedules (D5). Ungated by design. |
| `PublicHomeProvider` · `StageLandingProvider` · `SegmentLandingProvider` · `FindYourPathProvider` · `GuidesProvider` · `GlossaryProvider` · `JurisdictionGuideProvider` · `ReportsProvider` | content | — | RES | **R0** | `GlossaryProvider` shares the in-product tooltip record — **the CR-16 / D-2026-011 vocabulary surface**, coupled to the M2 lexicon dependency. |
| `TrustProvider` · `CompanyLegalProvider` | — | — | VM-R | **R4 (L4)** | `pending-legal` containers. §15.3 makes the trust surface *product*, not marketing. |
| `AuthProvider` | M0.1 | — | VM-R · CMD† | R1 · R4(S-10) | **Creates no Workspace** (A1). |

### 3.9 Matrix summary

The five readiness classes **partition all 57 ports** by their governing (highest) gate:

| Governing gate | Ports | Note |
|---|---|---|
| R0 (buildable now) | 8 | content ports |
| R1 (internal services) | 27 | the dominant class — Phase 9 is mostly the absent back end |
| R2 (external source) | 10 | D1/D2/D6 |
| R3 (rule data) | 6 | D5 |
| R4 (blocks go-live) as the **sole** gate | 6 | L1 · L3 · L4 · DR-01 · O-2026-001 |

A further **13** ports carry R4 as an *additional* gate on top of R1–R3, so **19 of 57 ports touch an open decision** — but only 6 have no other work to do first, and only **1** (`DecisionProvider`) is blocked in its **type** (C-4). Separately, **17 ports carry a `CMD†` flag** — they front a screen whose actions have no frozen write port, which is why the command surface (§6.1) is the largest single contract gap.

---

## 4. Architecture ADRs — PROPOSED

### 4.0 Decision-class legend (applied to every ADR)

| Class | Meaning | What the owner does |
|---|---|---|
| **[INHERITED]** | Already accepted in a frozen document or the Decision Log. The ADR *records* it so Phase 9 cannot drift; it introduces no new choice. | Confirm the ADR states the inherited decision correctly. |
| **[INTERPRETATION]** | A reading of accepted material, or a mechanism choice that resolves no open governance/product/legal item. Not a new decision, but the reading should be confirmed. | Confirm the reading; no Decision Log entry required unless the owner wants one. |
| **[NEW — APPROVAL REQUIRED]** | A genuinely open choice not settled by any accepted source. | Approve an option → it becomes a Decision Log entry. |

### P9-ADR-01 — Application topology and rendering strategy
**Class: [NEW — APPROVAL REQUIRED]** for the rendering strategy (this is the deferred D-2026-022 item); **[INHERITED]** for the modular-monolith constraint (AP-09 / D3 / T3 / TA-6).
**Question.** One deployable or two? And does the Public surface render server-side?
- **Option A — one deployable, SPA throughout.** Simplest; contradicts nothing accepted. Cost: the Public surface (the free SEO wedge, §14/M1.1) renders client-side — the weakest posture for the stated acquisition engine.
- **Option B — one deployable, Public server-rendered, authenticated surfaces SPA.** Keeps one artifact and one internal API; adds a rendering tier; extracts nothing (honours AP-09).
- **Option C — separate public site deployable.** Best SEO/caching isolation; two deployables at MVP, contrary to D3/T3 and premature under AP-09.

**Recommendation: Option B.** Only option serving the acquisition thesis without violating the monolith decision. **This is the deferred D-2026-022 decision and must be owner-approved — this batch may not settle it.**

### P9-ADR-02 — Composition root and provider injection
**Class: [INTERPRETATION]** — a mechanism choice consistent with the frozen contract; resolves no open item. Confirm the convention.
**Question.** Where are providers constructed and how do screens reach them?
- **Option A — one typed provider registry via a single React context at the app root**, mirroring the existing `CitationResolverContext`. Screens keep pure `{ loaded }` props; thin containers call the port and pass `Loaded<T>` down. **Phase 8 screens unchanged.**
- **Option B — per-screen hooks calling ports directly.** Fewer files; breaks the pure-props property the frozen screens rely on.
- **Option C — a data-fetching library (TanStack Query etc.).** Free caching/retry/staleness; adds a dependency and hides the `Loaded<T>` envelope behind a second state model.

**Recommendation: Option A**, with Option C's caching handled inside provider implementations, not the component layer. **The defaulting behaviour of `CitationResolverContext` must be inverted in Phase 9: a production build must fail if no real resolver is injected**, never silently fall back to fixtures.

### P9-ADR-03 — The command (write) surface
**Class: [NEW — APPROVAL REQUIRED]**, gated by **G-1** (§4.3). This is the largest gap between the frozen contract and a working product (F-1).
- **Option A — `contract/commands.ts`: a parallel command-port module symmetrical with `ports.ts`,** one interface per mutating operation, each returning a discriminated result (`accepted | rejected(reason) | permission-denied | conflict`). Read ports stay frozen in shape.
- **Option B — add mutating methods to the existing provider interfaces.** Fewer files; **changes the shape of a frozen artifact.**
- **Option C — a single generic command bus.** Flexible; loses the type-per-operation safety that is the whole value of the contract.

**Recommendation: Option A**, subject to G-1. Tracked in the Contract-Change Register (§6.1).

### P9-ADR-04 — Where authorisation is decided
**Class: [INTERPRETATION]** of accepted constraints (CR-5; Phase 3 §15.1 "disclosure exposure is irreversible"). Confirm.
- **Option A — server-authoritative only.** The session establishes the actor; the server returns `not-found` and the client never receives a cross-tenant object.
- **Option B — client also filters.** Any client-side filter implies the object **was transmitted** — precisely the breach CR-5 exists to prevent.

**Recommendation: Option A, unconditionally.** Client-side filtering of Zone 1 is the vulnerability, not defence in depth. Corollary: `DocketHealthProvider`'s legitimate cross-tenant aggregation is a **separately-credentialed ops path**, not the same service with a wider filter (§8 T-4).

### P9-ADR-05 — Internal API style between UI and services
**Class: [INHERITED]** — Phase 3 §21.1 already decides internal-first REST + webhooks, URL-path versioning, idempotency keys on mutations, cursor pagination, zone-aware. The ADR records it.
**Consequence, not decision:** view-model shaping belongs on the server (one round trip per screen — the VM-A ports in §3.5), or the aggregating ports become browser-side N+1 fan-outs. Recommend the internal API expose **both** resource endpoints (§21.2) **and** per-screen view-model endpoints; providers call the latter. Flagged as an inference from §21 (§13 A-2), not a statement in it.

### P9-ADR-06 — List parameterisation
**Class: [INHERITED]** for the mechanism (cursor pagination — Phase 3 §21.2); **[NEW — APPROVAL REQUIRED]** for its *placement in the contract*, gated by **G-1**.
- **Option A — add optional cursor/filter params to the frozen port signatures.** Minimal; **modifies a frozen file.**
- **Option B — a sibling `contract/queries.ts` with parameter/page types and parameterised port variants; the zero-arg forms remain "first page, default view."** No frozen file changes.

**Recommendation: Option B**, subject to G-1. Tracked in §6.2.

### P9-ADR-07 — Rules-Engine boundary
**Class: [INHERITED]** — AP-02 / D-2026-002 / T1 / Phase 3 §18. The ADR records it. The **TA-8 escape-hatch design is [NEW — APPROVAL REQUIRED]** (G-4).
**Recommendation.** The Deadline & Rules Engine is the **only** producer of dates, official fees and cost ranges; no provider or screen computes one. Every such value reaches the UI as an engine-resolved `SlotValue` with its computation trace, or as `pending-slot`. This is already how the frozen contract is built; the ADR keeps Phase 9 from drifting. The TA-8 escape mechanism must be named **before** any rule authoring begins (§24 requires it defined before it is needed).

### P9-ADR-08 — Zone enforcement mechanism
**Class: [INHERITED]** — D-2026-003 / Phase 3 §13.1 fix the Zone 1 → Zone 3 boundary "at the database permission level, not by application convention." The **CI fitness test that asserts it is [NEW]** work (not a new decision — §25.2 already names it as the mitigation).
**Recommendation.** Carry it literally: separate credentials per zone, the Zone 3 pipeline holding no grant on Zone 1 tables, separate search clusters with separate credentials (§17.5), no Zone 1 in logs/traces/caches (NFR-S06). Non-negotiable.

**ADR class tally:** 2 New-approval (ADR-01 rendering, ADR-03) + 2 New sub-items (ADR-06 placement, ADR-07 escape hatch) · 2 Interpretation (ADR-02, ADR-04) · 3 Inherited (ADR-05, ADR-07 core, ADR-08).

### 4.3 G-1 — the governance gate for all sibling contract additions (UNRESOLVED)

**G-1 is not resolved by this document and must not be resolved by an implementer.** It is the single gate controlling **every** proposed addition to the frozen `src/contract/*` surface:

> **Does adding a *new sibling module* to `src/contract/*` (e.g. `commands.ts`, `queries.ts`, or any future companion) count as *modifying* the Phase-8-frozen artifact, or as an *addition* that leaves every frozen file byte-for-byte unchanged?**

- If G-1 resolves **"addition is permitted"** → ADR-03 Option A, ADR-06 Option B, and the document-access and freshness candidates (§6) all proceed by adding sibling modules; no frozen file changes.
- If G-1 resolves **"the contract surface is frozen whole"** → every candidate in §6 needs a different mechanism (a versioned successor contract, or an owner-authorised unfreeze), and the batch plan §11 changes materially.

**This document's *reading* (not decision):** `ports.ts` and its siblings are frozen as *files*; a new file is an addition. But that is a governance call. Until the owner answers G-1, **no sibling contract module is written**, and every §6 candidate stays a candidate. G-1 blocks P9-B3 (command surface) and constrains P9-B1b.

---

## 5. Dependency & blocker matrix

| ID | Dependency | Source | Type | Blocks | Class | Start without it? |
|---|---|---|---|---|---|---|
| **D1** | IP India programmatic access, terms, rate limits | P3 §26.2 | External | `PatentSearch`, `PatentDocument`, `Portfolio`, `ApplicationDetail`, `MatterImport`, `DocketHealth` | R2 | Yes — behind the adapter. **TA-2 is the largest external risk.** |
| **D2** | EPO OPS / USPTO / WIPO terms, quotas, coverage | P3 §26.2 | External | corpus scope; same ports | R2 | Yes — same adapter |
| **D5** | Authoritative Indian fee schedules & rule sources | P3 §26.2 | External | Rules Engine seeding, `Deadlines*`, `Costs`, `CostPlanner` | R3 | **Engine yes, rule data no** (AP-02) |
| **D6** | Official register verification for agent credentials | P3 §26.2 | External | `AgentVerification`, `AgentOnboarding` | R2 | Yes — hold-on-unavailable is designed |
| **D3/D4** | Assessment quality on open sources; model no-training terms | P3 §26.2 | External | `Assessment`, AI orchestration | R2 | Yes — **D4 failing makes TA-9 fail → self-hosted Zone 1 inference (L5)** |
| **L1** | Fee-sharing / revenue structure | P3 §26.1 | **Legal** | Billing, `Costs`, `Quote`, `Pricing`, settlement | R4 | **Structure yes, go-live no.** 3 line-item types from day one (M0.8) |
| **L2** | UPL boundaries | P3 §26.1 | **Legal** | AI tiering §12, assessment presentation | R4 | Yes — may move outputs T1/T2 |
| **L3** | Advertising/solicitation rules | P3 §26.1 | **Legal** | `AgentDirectory`, `AgentPublicProfile`, `Practice` publication | R4 | Build yes, publish no |
| **L4** | Privilege position & wording | P3 §26.1 | **Legal** | `Trust`, `CompanyLegal`, onboarding | R4 | Containers exist; copy is counsel's |
| **L5** | Third-party processing of pre-filing disclosures | P3 §26.1 | **Legal** | Zone 1 architecture, provider selection | **R4 — architectural** | **Partly no** — if barred, Zone 1 inference self-hosted. The one legal item with a structural consequence. |
| **L6** | Agent record-retention post-engagement | P3 §26.1 | **Legal** | access revocation schedule | R4 | Yes — parameterise expiry |
| **L7** | Data residency | P3 §26.1 | **Legal** | storage architecture, provider regions | R4 | Yes — residency-ready; timing only |
| **DR-01** | Who may record a *not-file* Decision | P6 register, D-2026-020 | **Product** | `DecisionProvider` | **R4 — typed** | **No** — hard-typed at `vault.ts:168` (§6.5, §14.2 C-4) |
| **DR-02** | Docket-import duplicate handling | P6 register, D-2026-020 | **Product** | `MatterImportProvider` | R4 | Import yes, de-duplication no |
| **O-2026-001** | Pricing presentation | Decision Log, Open | **Product/Legal** | every `PriceDisplay` surface | R4 | Yes — mode is a slot |
| **M2** | Authoritative CR-16 vocabulary lexicon | P8 audit M2 | **Governance** | vocabulary gate, `Glossary` | R4 | Gate runs provisionally (`LEXICON_IS_AUTHORITATIVE=false`) |
| **M3** | `Metrics.md` linked/verifiable as the metric-target source | P8 audit M3 | **Governance** | `BusinessDashboard` target verification | ~~R4~~ **EVIDENCE-RESOLVED** | **Verified this revision (§6.4 / §14.3).** Residual is documentation hygiene on two frozen notes. |
| **S-1/2/3/5/7/10** | Turnaround, reviewer/agent-stat confidence, next-event range, channel default, MFA policy | P8 frozen slots | **Product** | assorted | R4 | Yes — all containers |
| **P2 / P3** | Agent value proposition; Layer-3 timing | P3 §26.3 | **Product** | Layer-2 priority; entity detail | R4 | Yes — D-2026-022 follow-up |

---

## 6. Contract-Change Candidates Register

**Purpose.** Every place where a *working* Phase 9 product appears to need something the frozen `src/contract/*` surface does not yet express. Each is a **candidate, not a change** — the frozen artifact is not modified by this document, and no candidate proceeds until its gate clears. This register is the master list behind ADR-03, ADR-06 and consistency findings C-4/C-5/C-6.

**Every additive candidate is gated by G-1 (§4.3).** A candidate that would *widen a frozen type* (rather than add a sibling file) is a heavier governance action than G-1 and is flagged separately.

| # | Candidate | Why a working product needs it | Frozen-artifact impact | Gate | Recommended form | Status |
|---|---|---|---|---|---|---|
| **CC-1** | **Command / write surface** (`contract/commands.ts`) | F-1: 17 `CMD†` ports front screens whose `NextActionVM` verbs and the Assessment-ADR §4 state transitions have no write path | **Additive** — new sibling file; frozen read ports unchanged (ADR-03 Opt A) | **G-1** | Sibling module, one typed command per operation, discriminated result | **Candidate — blocked on G-1** |
| **CC-2** | **Query / pagination types** (`contract/queries.ts`) | F-3: every `list()` is unbounded; real services need cursor/filter/sort (mechanism already inherited, §21.2) | **Additive** — sibling file; zero-arg port forms preserved as "first page" (ADR-06 Opt B) | **G-1** | Sibling module; parameterised variants alongside the frozen zero-arg forms | **Candidate — blocked on G-1** |
| **CC-3** | **Document access affordance** | §19.3 requires signed short-lived URLs; `DocumentsIndexVM` and matter/application doc lists carry metadata but **no access token/URL field** (C-6) | **Widens a frozen VM** *or* adds a companion access port — TBD | **G-1** (if sibling) / **heavier** (if VM widened) | Prefer a companion access-grant port over widening the VM, to keep the frozen VM intact | **Candidate — needs owner call on form** |
| **CC-4** | **Freshness / cache envelope semantics** | §20.3 requires an explicit staleness stamp on cached-during-outage data; `FreshnessStamp` is *optional* on several externally-sourced VMs, and `Loaded<T>` has no "served-from-cache during outage" marker (C-5) | **Option (a)** adds a marker to the frozen `Loaded<T>` (**widens a frozen type**); **Option (b)** mandates a required `FreshnessStamp` on every external VM field **in the adapters only** (no frozen change) | **G-1** not triggered by (b); (a) is heavier | **Option (b)** — enforce at the adapter layer; change no frozen type (§9 FS-2/FS-3) | **Candidate — (b) recommended, no frozen change** |
| **CC-5** | **DR-01 capability representation** | `DecisionProvider` cannot be wired: `mayRecordNotFileDecision` is the literal type `{ status:'pending-slot'; slotId:'DR-01'; source:'owner-decision' }` at `vault.ts:168` — a real provider cannot satisfy it without either resolving DR-01 or widening the type (C-4) | **Resolving DR-01** needs no code change (the slot resolves); **widening the type** modifies a frozen file | **Owner (DR-01)** — *not* G-1; a product decision, not a contract-form call | Resolve DR-01 → the existing slot mechanism carries it. **Do not widen the type to dodge the decision.** | **Candidate — blocked on DR-01 (owner)** |

**Reading of the register:** four of five candidates (CC-1, CC-2, CC-3, CC-4-option-a) are *contract-shape* questions that G-1 governs; CC-4-option-b avoids the question entirely and is recommended; CC-5 is **not** a contract-form question at all — it is the DR-01 product decision wearing a type. None proceeds in this batch.

### 6.4 M3 — read-only verification result (evidence-resolved)

**Action performed (read-only, no file modified):** the seven externally-sourced targets that SC-O05 displays via `src/fixtures/scenarios/ops.ts` were checked line-by-line against `01_Strategy/Metrics.md` (the repository's canonical metrics source under Decision I). `Metrics.md` **is present in the repository** — the freeze report §9(2) and `Phase-8-External-Source-Traceability.md` both state it is "not in repo," which is true only of the `04_Development/ui` **source tree**, not of the repository.

| Metric | ops.ts displays | Metrics.md canonical | Verdict |
|---|---|---|---|
| OP-1 | target `>25%`; threshold `~15%` (ln 125) | Target `>25%`; Failure threshold `~15%` | **Exact** |
| OP-2 | target `pending` (uncalibrated); threshold `<15%` (ln 134) | "calibrated from cohort data … not fixed"; Failure threshold `<15%` | **Exact** — target correctly left pending (D-2026-018) |
| OP-3 | `−40% within 18 months` + baseline-undefined note (ln 126) | Target `−40% within 18 months`; Baseline "Not defined in the repository" | **Exact** |
| OP-4 | `>40% by Year 3` (ln 127) | Target `>40% by Year 3` | **Exact** |
| OP-5 (platform) | `Zero — each a Sev-1 incident (24h client disclosure, NFR-C01)` (ln 130) | Target "Zero platform-attributable"; Escalation "Sev-1 … client disclosure within 24 hours (NFR-C01)" | **Faithful** (compresses target + escalation) |
| OP-5 (total) | `No zero bar — monitored as a separate operational measure` (ln 131) | "tracked as a separate operational measure with no zero bar" | **Faithful** |
| OP-6 | target `<15% (falling toward)`; threshold `<20% (must-hold)` (ln 135) | Target `<15%` ("falling toward"); must-hold `<20%` | **Exact** |

Every **measured value** in the fixture is a `pending` slot; OP-2's **target** is `pending`; the OP-6 validation step is `pending`. No invented value exists. **Conclusion: M3 is evidence-resolved** — the canonical source exists in-repo and all seven transcriptions are faithful (five exact, two faithful compressions). The residual is **documentation hygiene**: two frozen notes claim the source is absent. Those notes are in Phase-8-frozen text, so **this batch does not edit them**; the correction is an owner/governance action (§14.1). M3 should no longer be carried as an open Phase 9 dependency.

---

## 7. Fixture-adapter strategy

**Principle.** Fixtures are not scaffolding to delete. They are the **conformance oracle** for every real adapter and must outlive Phase 9.

**FA-1 — Two implementations per port for the life of the product:** `Fixture*` and `Api*`, identical interface (as `ports.ts` states). Neither imports the other.
**FA-2 — Promote the scenario maps to a shared port conformance suite.** Phase 8's maps already enumerate the mandated states (`loading · empty · error · permission-denied · not-found`, plus per-screen states). Phase 9 turns these into a per-port test every implementation must pass. Today they are exercised only through screens.
**FA-3 — The fixture is the contract-drift detector.** If a real adapter needs a field the fixture cannot produce, the **contract** changed — that surfaces as a §6 candidate under G-1, never an ad-hoc field on one adapter.
**FA-4 — Three runtime modes, one build:** `fixture` (the preserved Phase 8 harness), `contract` (real transport, fixture responses — proves the wire format), `live`. Mode resolved **once**, at the composition root (ADR-02). **A `live` build must hard-fail if any fixture provider is reachable** — replacing the current silent fixture default in `CitationResolverContext`.
**FA-5 — Fixture values stay synthetic, forever.** `ResolvedPassage.excerpt` is "never real register content." No real register content enters fixtures at any point (Zone-2 licensing + provenance integrity).
**FA-6 — The open-slot preservation test moves up, not out.** `openSlots.preservation.test.ts` (15 assertions) must in Phase 9 guard **the real adapters too**: an API adapter that resolves DR-01, O-2026-001, or any `pending-legal` slot fails the build. This is the mechanical guarantee that wiring real services does not quietly resolve an owner's open decision (§12, standing rule).

---

## 8. Tenancy & authorisation boundary model

Derived from Phase 3 §4.2, §15, §13.1; Phase 4 §2.3/§9.2; Assessment ADR §6; CR-5/CR-12; AP-03.

**T-1 — The actor is server-resolved, never client-asserted** (ADR-04 Option A). No port parameter, header or body field may name a tenancy.

**T-2 — Four distinct access shapes, not interchangeable:**

| Shape | Who | Scope | Expiry | Source |
|---|---|---|---|---|
| **Workspace membership** | Client Owner/Admin/Member/Viewer | one tenancy | account lifetime | P3 §4.1 |
| **Engagement grant** (matter-scoped) | engaged Agent | **one matter**, never the portfolio | engagement + L6 retention | P3 T5/P6 |
| **Review grant** | assigned reviewing Agent | **exactly one Disclosure version + its analysis, for exactly one `ReviewDecision`** | on release or reassignment | ADR §6 |
| **Ops access** | internal roles | cross-tenant **metadata**; Disclosure bodies consent-gated (BR-16) | per session, MFA + justification | P3 §4.2, P4 §2.3 |

The **review grant** is the concept most easily lost in implementation — narrower than an engagement grant, existing *before* any Engagement, creating no client–agent relationship. `ReviewWorkspaceProvider` is its only read surface.

**T-3 — Absence is uniform.** Outside tenancy/grant → `not-found`, carrying nothing (CR-5). Inside tenancy but above role → `permission-denied` with reason + who-can-act (CR-12/IP-15), never a silent escalation. Never conflate the two in either direction.
**T-4 — Ops cross-tenancy is an explicit, separately-credentialed path.** `DocketHealthProvider` is the only port permitted to aggregate across tenancies; metadata/refs/status only; audited; credentials hold no grant on Disclosure bodies.
**T-5 — Deny is logged as loudly as grant** (M0.1).
**T-6 — MFA mandatory for Agents, Institution Admins, all internal roles** (M0.1). Client MFA policy is **S-10, unresolved** — settings keeps it a container.

**Open for decision (§12):** session mechanism and lifetime; whether break-glass dual control is MVP or V2; L6's effect on engagement-grant expiry.

---

## 9. Failure & freshness semantics

Phase 3 §20.3 (P8) fixes behaviour; Phase 8 fixes the *shape*; Phase 9 connects them (see CC-4).

**FS-1 — Degradation ladder (§20.3):** (1) serve **cached data + explicit staleness stamp**, never an error page; (2) **never block deadline computation** on external availability — deadlines derive from our Event Log; (3) raise a **Docket Ops alert** past threshold; (4) **never silently accept a source's date over our computation** — discrepancies to a human queue.
**FS-2 — `FreshnessStamp` mandatory on every externally-sourced value** (`source`, `retrievedAt`, `stale`). Phase 8 applies it per-field on register surfaces; Phase 9 makes it required wherever the value is external (CC-4 Option b) — optionality invites omission, and an omitted stamp reads as fresh.
**FS-3 — `Loaded<T>.error` is for *our* failure, not a source's.** A degraded upstream still returns `ready` + stale data + stamp. An `error` on a register screen means the platform failed, not the register.
**FS-4 — Fail-closed cases, enumerated and preserved exactly:**

| Case | Behaviour | Source |
|---|---|---|
| Conflict check cannot complete | `MatchingProvider` → `error`; never proceed | `ports.ts` B4 |
| Citation cannot resolve | assertion renders **unverified**, never as fact (IP-08) | `primitives.ts`, `useResolvedCitation` |
| Agent register unavailable | **hold**; never auto-approve | `ports.ts` B7 |
| Verdict not yet released | **no verdict representable** (CR-2/BR-01) | Assessment ADR §4 |
| Below the n≥20 floor | **no statistic at all**, not a hedged one | D-2026-019 |

**FS-5 — Anti-silence.** `WhoseTurn` is the backbone; a waiting item's timing is a `SlotValue`, never a countdown or fabricated time. Home must not show a false "all clear" when data is stale.

---

## 10. Testing strategy

**TS-0 — The Floor (mandatory, every batch).** The Phase 8 baseline — **188 tests / 48 files** plus eight static gates (typecheck; token Gate A = 209 inherited / 0 new; Gate B = 0; anti-leak = 0; harness = 0; raw-value = 20 inherited / 0 new; vocabulary = 0; open-slot preservation = all UNRESOLVED; build; Storybook), all green at `0ddf8bb` — is a **regression floor, not a starting point.** Every Phase 9 batch must leave The Floor green. Regression of any gate is a batch failure, full stop. The Floor is restated as a completion gate on every row of §11 and as a boundary in §15.

Phase 9 adds five layers on top of The Floor:

**TS-1 — Port conformance suites (new).** One suite per port, run against **every** implementation (FA-2): state reachability, `Loaded<T>` shape, and cross-tenant fixture → `not-found` and nothing else.
**TS-2 — Architectural fitness tests (new, CI-gated)** — §25.2's named mitigation for two *existential* risks: Zone-1→Zone-3 credential separation holds; no Zone 1 in logs/traces/caches (NFR-S06); no cross-module schema access; no screen/provider computes a date, fee or cost range (AP-02/ADR-07).
**TS-3 — Golden suites for the Deadline Engine (new, non-negotiable)** — §18.5/§25.2 four-layer verification; per-jurisdiction golden cases from authoritative sources (D5); recomputation reproducibility from the Event Log. **Sequencing consequence: D5 gates the engine *and* its test suite.**
**TS-4 — Provenance regression (new)** — span-stable addressing across corpus re-ingestion (TA-7, §17.3). Cheap now, expensive to retrofit; keeps AP-04 enforceable.
**TS-5 — Authorisation matrix tests (new)** — every (actor shape × object × operation) triple from §8: `not-found` vs `permission-denied` vs success. Closes audit L4 by construction.
**TS-6 — Contract-mode integration (new)** — FA-4's `contract` mode exercises the real transport against fixture responses, catching wire-format drift without a back end.

**Carried Phase 8 items:** L2 (n≥20 as a *type* constraint, not a comment) and L4 (even CR-5 coverage) — TS-1 and TS-5 absorb both; recommend accepting them as in-scope rather than optional.

---

## 11. Proposed Phase 9 batch sequence

Derived from §2 readiness and §5 dependencies. **Rule applied: a batch may start only when everything it reads from exists.** Surface parity is explicitly not a criterion.

**B1 is split** into a frontend-only foundation (no back end, no external deps) and a backend foundation, with explicit completion boundaries, so the two do not entangle:

| Batch | Name | Content | Gate to start | Completion boundary (all include: **The Floor green**) |
|---|---|---|---|---|
| **P9-B0** | *this document* | Decisions & specification | — | **owner approval** |
| **P9-B1a** | **Runtime & composition foundation** *(frontend only — no back end, no D1–D6)* | Composition root + typed provider registry (ADR-02); three runtime modes (FA-4); provider-injection seam replacing the direct scenario-map imports in `App.tsx`; invert the `CitationResolverContext` fixture default; routing/URL model shell (pending ADR-01) | B0 approved | **Every one of the 56 frozen screens renders through the injection seam against the `Fixture*` providers** (not direct scenario-map imports); `fixture` and `contract` modes switch at the root; a `live` build hard-fails if a fixture is reachable; **no back end exists yet.** The Floor green. |
| **P9-B1b** | **Platform & backend foundation** *(back end; still no external deps)* | Internal API skeleton (ADR-05, inherited); Event Log; relational schema (one schema/module); **zone credential separation + TS-2 fitness tests**; the transport-representation decision per §3 (VM-R/VM-A/RES/EXT); **G-1 must be resolved here or the command/query siblings cannot be authored** | B1a · **G-1 answered** | **Schema + per-zone credentials in place; TS-2 green; one trivial resource served end-to-end in `contract` mode.** No product port wired to real data yet. The Floor green. |
| **P9-B2** | Identity, tenancy & access | M0.1; the four grant shapes (§8); TS-5; `Auth`, `WorkspaceSetup` | B1b | TS-5 green; CR-5 server-side. Floor green. |
| **P9-B3** | Command surface | ADR-03 `commands.ts` (**requires G-1 = "addition permitted"**); idempotency; the ten `NextActionVM` verbs | B2 · **G-1 permits additions** | conformance + authz tests. Floor green. |
| **P9-B4** | Vault (Zone 1) | M1.2 + M0.5 + M0.10; B2-path read ports **except `DecisionProvider`** | B3 | zone fitness tests green. Floor green. |
| **P9-B5** | Rules & Deadline Engine ★ | M0.2 + M4.4 authoring; TS-3 golden suites; `Deadlines*`, `AgentDocket`, `RuleAuthoring` | B4 · **D5 for rule data** | four-layer verification (§18.5). Floor green. |
| **P9-B6** | Integration Hub & Zone 2 corpus | M0.9 adapters, M0.3 search, **span-stable addressing (TA-7)**; `PatentSearch`, `PatentDocument`, `Portfolio`, `ApplicationDetail` | B5 · **D1/D2** | TS-4 provenance regression green. Floor green. |
| **P9-B7** | Provenance, AI orchestration & Assessment | M0.4 + M0.6 + M1.3; `CitationResolver` live; `Assessment`, `AssessmentRequest/List` | B6 · D3/D4 | IP-08 fail-safe verified. Floor green. |
| **P9-B8** | Review path & Agent core | review grant; `ReviewsQueue`, `ReviewWorkspace`, `AgentMatterDetail`, `AgentMatters`, `AgentToday` | B7 | CR-2/BR-01 gate verified. Floor green. |
| **P9-B9** | Matters, Billing & Matching | M1.5, M1.6, M0.8 (three line-item types from day one); `Matters*`, `Costs`, `Matching`, `Quote` | B8 · **L1 for go-live** | slots still pending (FA-6). Floor green. |
| **P9-B10** | Notification & aggregation | M0.7; `Home`, `Notifications`, `Agent*Notifications`, `Documents`, `Settings` | B9 — **fan in from everything above** | anti-silence (FS-5) verified. Floor green. |
| **P9-B11** | Outcome Data & Operations | M0.11 (Zone 3), M4.1/M4.2; `DocketHealth`, `QualityConsole`, `BusinessDashboard`, `AgentVerification` | B10 · D6 | Zone-1→3 isolation re-verified. Floor green. |
| **P9-B12** | Public surface & content | R0 content ports, `CostPlanner`, `Glossary`; rendering per ADR-01 | R0 pages any time after B1a; register pages after B6 | rendering acceptance. Floor green. |
| **P9-B13** | Legal-gated go-live | `Pricing`, `Trust`, `CompanyLegal`, `AgentDirectory`, `AgentPublicProfile`, `Practice` publication | **L1 · L3 · L4 landed** | no slot resolved without a Decision Log entry. Floor green. |
| **P9-B14** | Verification & closure | full-suite hardening, independent audit, closure report | B13 | freeze |

**Sequencing consequences worth stating plainly:**
1. **`DecisionProvider` (SC-C09) has no batch.** It is typed to an unresolved decision (CC-5); scheduled the moment DR-01 resolves, not before.
2. **`HomeProvider` / `AgentTodayProvider` are late (B10/B8), not early**, despite Home being "the most-visited screen." They aggregate (VM-A); they cannot precede their sources. Under surface parity they would come early — the clearest illustration of the approved principle.
3. **The Public surface is split** across B12/B13: R0 content lands after B1a, register pages after the corpus (B6), legal pages after L4.
4. **B1a needs nothing external and no back end** — it can start the instant B0 is approved, in parallel with opening the D1/D5 conversations, and it de-risks everything downstream by making the frozen surface swappable before any service exists.

---

## 12. Items requiring a human decision

**Nothing here may be resolved by an implementer** (standing rule, top of document). Each item is listed with its owner and what it blocks. **All remain unresolved.**

### 12.1 Owner / product

| ID | Decision | Blocks | Notes |
|---|---|---|---|
| **DR-01** | Which role may record a *not-file* Decision | `DecisionProvider`, SC-C09 | Deferred at Phase 6 freeze (D-2026-020). **Typed into the contract** — CC-5 / C-4 |
| **DR-02** | Docket-import duplicate handling | `MatterImportProvider` | Deferred; no de-duplication designed anywhere |
| **O-2026-001** | Pricing presentation (bundled vs component) | every price surface | Open; probable direction 1 Sep 2026; awaiting L1 |
| **P2** | Agent value proposition (free docket tooling first) | Layer-2 priority, `AgentOnboarding` | Not recorded resolved (Assumptions §5) |
| **P3** | Layer 3 (Institution) V2 or V3 | entity-model detail | Not recorded resolved |
| **S-1 / S-2** | Review turnaround & reviewer-confidence representation | `Assessment`, `ReviewWorkspace` | ADR §9 records a *working* 2-business-day figure, not a commitment |
| **S-3** | Agent-stat confidence representation | `Practice`, `Matching`, public profiles | n may publish; confidence may not |
| **S-5 / S-7 / S-10** | Next-event range · per-class default channel · client MFA policy | `ApplicationDetail`, `AgentSettings`, `Settings`, `Auth` | |
| **GATE** | Free-assessment capacity gate | `AssessmentRequest` | D-2026-017: deferred pending a COGS/capacity model |

### 12.2 Legal (specialist counsel — this document makes no legal determination)

| ID | Decision | Architectural consequence if unfavourable |
|---|---|---|
| **L1** | Fee-sharing / revenue structure | Three billing data models; **highest-priority dependency** (§26.1) |
| **L2** | UPL boundaries | Moves outputs between AI tiers; changes review throughput/economics |
| **L3** | Advertising / solicitation rules | May bar publishing agent statistics — **a core moat mechanism** |
| **L4** | Privilege position & wording | Trust pages, onboarding, document classification |
| **L5** | Third-party processing of pre-filing disclosures | **The one legal item with a structural consequence: if barred, TA-9 fails and Zone 1 inference must be self-hosted.** Impacts P9-B7 |
| **L6** | Agent record retention post-engagement | Engagement-grant expiry schedule |
| **L7** | Data residency | Storage architecture and provider regions |

### 12.3 Governance

| ID | Question | Why it must be decided before the relevant batch | Status |
|---|---|---|---|
| **G-1** | Does a **new sibling contract module** (`commands.ts`, `queries.ts`, any companion) count as modifying the frozen artifact, or as an addition leaving frozen files unchanged? | Gates **all** of §6 (CC-1…CC-4a); blocks P9-B3; constrains P9-B1b | **UNRESOLVED — §4.3** |
| **G-2** | Is `04_Development/ui` the Phase 9 application, or does Phase 9 start a new tree consuming the frozen contract as a package? | Determines whether The Floor's gates (Gate A=209, raw-value=20) carry forward as-is | Unresolved |
| **G-3** | May `Loaded<T>` gain a cache/staleness marker (CC-4a), or must freshness stay per-field (CC-4b)? | §9 FS-3; recommendation is CC-4b (no frozen change) | Unresolved |
| **G-4** | Who approves a TA-8 rules escape-hatch use, and what is the audit record? | §24 requires the mechanism defined *before* it is needed | Unresolved |
| **M2** | Supply the authoritative CR-16 vocabulary lexicon | Gate runs provisionally today (`LEXICON_IS_AUTHORITATIVE=false`) | Unresolved |
| **M3** | Link/verify `Metrics.md` as the metric-target source | **Evidence-resolved this revision (§6.4).** Residual: correct two frozen "not in repo" notes | **Evidence-resolved; documentation-hygiene residual** |
| **G-5** | Independent (unconflicted) confirmation of the Phase 8 B8/B9 audit findings | Advisory at freeze; carried forward | Unresolved |
| **G-6** | Update the Roadmap to record Phase 8 as frozen (C-1) | The canonical status document contradicts the freeze report | Unresolved |

### 12.4 External parties (not decisions, but not in the team's control)

D1 (IP India), D2 (EPO/USPTO/WIPO), D3 (assessment quality on open sources), D4 (model no-training terms), D5 (fee schedules & rule sources), D6 (agent-register verification). **Open these in parallel with P9-B1a** — D1 and D5 have the longest lead times and gate B5/B6.

---

## 13. (reserved)

*Section intentionally merged into §14; retained as a number placeholder so §14–16 cross-references from v0.1 readers resolve.*

---

## 14. Consistency review — findings, separated by kind

Per the workflow instruction, findings are reported, not fixed — and are now split so a documentation contradiction is not mistaken for a build blocker.

### 14.1 Documentation contradictions — NOT Phase 9 implementation blockers

These are true inconsistencies in the repository's records. **None blocks a single Phase 9 batch.** Each is an owner/governance housekeeping item.

**C-1 — The Roadmap contradicts the Phase 8 freeze.** `01_Strategy/Roadmap.md` ("Canonical source for current project status," Decision L) records Phase 8 as *"Active Development … not complete"* and Phase 9 *"Not started,"* while `Claude outputs/Phase-8-Closure-Freeze-Report.md` records Phase 8 **closed and frozen at `0ddf8bb`** through B9, independently audited. Both cannot be current. **Owner action (G-6):** update the canonical status document, or explain why the freeze report is not yet canonical. *Does not block Phase 9 — the freeze tip is unambiguous regardless of which status line is canonical.*

**C-2 — Phase 8's closure evidence sits outside the document structure, and one artifact exists in two copies.** `Phase-8-Closure-Freeze-Report.md` and `Phase-8-Independent-Audit.md` live only in a working `Claude outputs/` folder, not `04_Development/` or `09_Governance/`. `Phase-8-B1-TokenHierarchy-Traceability.md` exists **twice** at different sizes/dates: `04_Development/` (~26 KB, later) and `Claude outputs/` (~13 KB, earlier). **Owner action:** confirm which copy is authoritative and where closure evidence belongs. *Documentation only; no code impact.*

**C-7 — The "Marketplace" term conflict remains open, by design.** `CLAUDE.md` and `Glossary.md` record that D-2026-006 uses *Marketplace* for the business/regulatory structure while Assessment ADR §13.8 reserves it for the future licensing surface (MVP concept: *Agent Matching / Engagement*). Both accepted; neither supersedes the other. **Phase 9 code and docs must use "Agent Matching / Engagement" for the MVP concept**, matching the frozen Phase 8 comments. *Naming discipline, not a blocker.*

**C-8 — Phase 1 §8's "Technical architecture" phase has no recorded disposition.** Phase 9 needs that material; it exists scattered across Phase 3 §10/§13/§15/§17–22. This document treats Phase 3 as the technical-architecture source of truth (assumption A-1). *If that is wrong, ADRs 01–08 rest on the wrong base — but this is a documentation gap to confirm, not a build blocker.*

### 14.2 Implementation-affecting findings — tracked in the Contract-Change Register (§6)

These do affect Phase 9 construction and are carried as candidates, not fixes.

**C-4 — An open owner decision is encoded in a frozen type.** `contract/vault.ts:168` types `mayRecordNotFileDecision` as a *literal* `pending-slot / DR-01`, not a `SlotValue`. Excellent Phase-8 discipline; a genuine Phase-9 blocker — `DecisionProvider` cannot be wired without resolving DR-01 or widening a frozen file. **→ Register CC-5; blocked on DR-01 (owner), not G-1.**

**C-5 — Freshness optionality is inconsistent across the contract.** `PatentSearchVM.freshness` is required; `HomeVM.staleness?` / `AgentTodayVM.staleness?` are optional; some external VMs carry none. §20.3 requires an explicit stamp on cached data; the frozen type permits an external value with no stamp. **→ Register CC-4; recommended fix is adapter-layer enforcement (Option b), no frozen change.**

**C-6 — Document access has no representation.** §19.3 requires signed short-lived URLs; `DocumentsIndexVM` and the matter/application document lists carry metadata but no access affordance. **→ Register CC-3; prefer a companion access port over widening the frozen VM; owner call on form.**

### 14.3 Resolved in this revision

**C-3 → RESOLVED (evidence).** v0.1 flagged that `Metrics.md` is stated absent but is present. This revision performed the read-only verification (§6.4): `01_Strategy/Metrics.md` exists, is canonical under Decision I, and all seven SC-O05 target transcriptions are faithful. **M3 is evidence-resolved**; the only residual is correcting two frozen "not in repo" notes, which is owner/governance housekeeping (this batch edits no frozen file). C-3 is no longer an open finding.

---

## 15. Assumptions made in producing this document

Stated so they can be challenged (the repository's own convention).

| # | Assumption | If wrong |
|---|---|---|
| **A-1** | Phase 3 §2, §13, §15, §17–22 is the canonical technical architecture for Phase 9 | §4 ADRs rest on the wrong base (C-8) |
| **A-2** | Phase 3 §21's internal-first REST decision governs the UI↔service boundary, and per-screen view-model endpoints are compatible with it | ADR-05 becomes a decision rather than a consequence |
| **A-3** | "Frozen" prohibits *modifying* Phase 8 files but the status of *adding* sibling modules is exactly what G-1 must decide | this document does not assume the answer — it defers to G-1 (§4.3) |
| **A-4** | The Phase 8 freeze report is authoritative over the Roadmap's Phase-8 status | §11's starting point shifts (C-1) |
| **A-5** | Phase 9 continues in `04_Development/ui`, inheriting The Floor's gates and baselines | §10 TS-0 and the batch gates need restating (G-2) |
| **A-6** | `AssessmentProvider`'s absence from B2–B8 groupings places it in the B1 cross-cutting slice | one matrix row moves |
| **A-7** | Fixture providers remain in the tree permanently as the conformance oracle | §7 FA-1…FA-6 need rework |

**Not assumed, deliberately:** no service named, no vendor selected, no schema designed, no estimate given, and **no open slot resolved** (§6.4 changed M3's *status via evidence*, not by a decision).

---

## 16. Architectural boundaries this batch must not cross

1. **Phase 8 is frozen at `0ddf8bb`.** No file under `04_Development/ui/src` is modified by this batch or its approval — including the two stale M3 notes (§6.4), which the owner corrects, not this batch.
2. **No open decision is resolved here.** Every DR-/O-/L-/S-/P-/G- item stays exactly as the freeze report §8/§9 records it. M3 is *evidence-resolved by a read-only check*, which produces evidence, not a decision.
3. **No permanent architectural decision is invented.** §4 presents options and classes; approval is the owner's. Inherited/interpretation ADRs still await confirmation.
4. **No sibling contract module is written** until G-1 is answered (§4.3, §6).
5. **The Floor stays green** (§10 TS-0) in every batch; a regressed Phase 8 gate is a batch failure.
6. **No V2 functionality enters MVP** — Drafting Workspace (D-2026-010), Layer 3 (P3), Public API (V3), NPL/chemical/sequence search (V4) are out of scope for every §11 batch.
7. **No legal determination is made** (§12.2 names dependencies; it does not answer them).
8. **Zone 1 never crosses to Zone 3** (ADR-08), enforced at the database-permission level, asserted by CI (TS-2).
9. **Nothing renders an invented value** — CR-19 holds through Phase 9: a service that cannot supply a value returns a container, not a plausible number.

---

## 17. Handoff notes

**What P9-B0 v0.2 delivers:** a three-level wiring map for all 57 frozen ports (§3), eight class-tagged ADRs (§4), a dependency matrix (§5), a **Contract-Change Candidates Register** (§6), four strategies (§7–10), a dependency-readiness batch sequence with **B1 split into B1a/B1b** (§11), a human-decision register (§12), and a consistency review that separates documentation contradictions from implementation-affecting findings (§14). It also records a **read-only verification that resolves M3 on the evidence** (§6.4).

**What approval would establish:** the readiness classification (§2), the wiring map (§3), the four strategies (§7–10), the Contract-Change Register as the master list (§6), and the batch sequence (§11). New-approval ADRs (ADR-01 rendering, ADR-03) would become Decision Log entries (D-2026-024 onward, owner's numbering); interpretation/inherited ADRs would be confirmed as correct readings.

**What approval would *not* establish:** any open DR-/O-/L-/S-/P- item; **G-1** or any governance item; any vendor, schema, or estimate; the Roadmap's status (C-1/G-6 needs its own act).

**Decide these first — everything queues behind them:**
1. **G-1** — may Phase 9 add sibling contract modules? *Blocks the entire Contract-Change Register (§6) and P9-B3; without a command surface, Phase 9 builds a read-only product.*
2. **ADR-01** — rendering strategy and topology. *The deferred D-2026-022 item; it shapes P9-B1a's routing shell.*
3. **D1 and D5** — open the external conversations now. *They gate P9-B5/B6 and have the longest lead times.*

**The one item that will be forgotten if it is not scheduled:** **span-stable chunk addressing (TA-7, §17.3).** Invisible until a citation fails to resolve years from now, at which point AP-04/BR-02 are unenforceable and the fix is a full re-ingestion. It belongs in P9-B6 with its regression test (TS-4) and must not slip.

**Note on the DR-01 trap (CC-5).** When DR-01 is eventually resolved, resolve it by **letting the existing slot mechanism carry the answer** — do not widen the frozen `vault.ts:168` type as a shortcut. Widening the type to dodge the decision would defeat the very preservation guarantee (FA-6) that keeps a wired service from silently resolving an owner's open decision.

---

*End of P9-B0 v0.2. Nothing here is canonical. M3 is evidence-resolved by a read-only check; every other open item remains open. Awaiting owner approval.*
