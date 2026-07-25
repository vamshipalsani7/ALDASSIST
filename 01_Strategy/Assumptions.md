# Assumptions

**Type:** Living document
**Status:** Populated 25 July 2026 under Decision A2, by extraction from existing repository sources only. No new content was created.
**Sources:** Phase 2 §0; Phase 3 §24; Phase 5 §11; Assessment Lifecycle ADR §9

**Purpose.** A single index of assumptions the repository is operating under. Each is recorded where it was made; this document collects them so they can be challenged rather than silently inherited.

---

## 1. Business assumptions

Phase 2 §0 records five assumptions made in the absence of answers to the Phase 1 questions.

| # | Assumption | Confidence | If wrong |
|---|---|---|---|
| B1 | The founder does **not** hold a registered patent agent licence, and no co-founder does | Medium | Phase 2 §11 collapses to a simpler answer; timeline accelerates ~12 months |
| B2 | The team is **India-based** and will be built in India | High | Phase 2 §12 entirely |
| B3 | Capital is **constrained** — bootstrapped or pre-seed | Medium | Phase 2 §13 and §14 sequencing |
| B4 | There is **no existing agent network, client base or filed matters** | Medium | Phase 2 §17 and §18 — an existing network would save 9–12 months |
| B5 | A **venture-scale outcome** is wanted, not a lifestyle services firm | High | Everything |

**Figures requiring verification.** Phase 2 §0 marks three numbers as drawn from general knowledge and requiring verification against current IP India data and the Patent Rules before anything financial is committed: Indian annual filing volume, official fee schedules, and the size of the registered patent agent register. Phase 2 §12.3's market-sizing figures carry the same caveat.

---

## 2. Technical assumptions

Phase 3 §24 records ten, stated so they can be challenged.

| # | Assumption | Risk if wrong |
|---|---|---|
| TA-1 | Open sources provide sufficient corpus coverage for MVP assessment quality | Assessment quality suffers; may require licensed data earlier, at significant cost |
| TA-2 | IP India register data is obtainable at acceptable reliability through polling and mirroring | Core value proposition of M1.1 is compromised |
| TA-3 | Frontier model capability is sufficient for T2 tasks with human review | Human review burden negates the efficiency thesis; unit economics break |
| TA-4 | AI inference cost remains ~2–5% of transaction value | Margin compression |
| TA-5 | Registered agents adopt platform tooling for their own practice before taking marketplace matters | Supply-side cold start fails — recorded as the highest-probability business risk |
| TA-6 | A modular monolith is sufficient through 100k users | Premature extraction cost, or late extraction pain |
| TA-7 | Span-stable chunking can be maintained across corpus re-ingestion | Provenance links break; P2 becomes unenforceable |
| TA-8 | Jurisdiction rules can be expressed declaratively without escape hatches into code | D1 compromised |
| TA-9 | Model providers will contract for no-training, no-retention on enterprise tiers | Zone 1 processing must move to self-hosted models |
| TA-10 | Responsive web is sufficient; no native app through V2 | Mobile engagement suffers for agents doing docket checks |

Phase 3 §24 singles out **TA-8** for particular scrutiny: every rules engine eventually meets a rule that resists declarative expression, so the design must include a defined, audited, approval-gated extension mechanism.

---

## 3. Flow assumptions

Phase 5 §11 records three assumptions introduced by the user flows, each narrowing an ambiguity conservatively rather than expanding scope. All three are **awaiting explicit confirmation**.

| # | Assumption | Rationale | Confirm with |
|---|---|---|---|
| A1 | Account and Workspace are distinct; a verified account can use tools and alerts without a Workspace; a Workspace is created on first Disclosure | An alerts-only inventor should not be forced through workspace setup | Product |
| A2 | MVP client↔agent communication is confined to active matters; no general client↔agent messaging and no client↔reviewer channel | Prevents an unengaged professional relationship forming outside the model; keeps the reviewer role clean | Product / Legal |
| A3 | One Disclosure has one editing owner at a time; additional Named Inventors view but co-edit sequentially; institutional ownership wrappers are V2 | Avoids inventing a concurrent-edit and consent model while keeping the multi-inventor record faithful | Product |

Phase 5 §11 records that if any is rejected, the affected flow is revised — not the architecture.

---

## 4. Standing working assumptions

| # | Assumption | Status |
|---|---|---|
| L1 | Proceed with the configurable pricing model until legal review is completed. Unified customer experience; three internally independent fee components (platform · professional · official); commercial model configurable, never hardcoded | Open — see Decision Log O-2026-001 and `06_Legal/L1 Register.md` |
| SLA | A first working assumption of two business days may be used for review turnaround in Phase 5 illustration; it is **not** a fixed commitment | Assessment Lifecycle ADR §9 |

---

## 5. Assumptions recorded elsewhere and not duplicated here

- **Open legal dependencies L1–L7** — Phase 3 §26.1
- **Open data and technical dependencies D1–D6** — Phase 3 §26.2
- **Open product decisions P1–P5** — Phase 3 §26.3. P1 is resolved (D-2026-010); P4 is resolved (D-2026-014); P5 remains open (O-2026-002). P2 and P3 are not recorded as resolved in any repository document.
- **Phase 5 §9 boundary observations** — 9-A (MVP files and tracks but does not prosecute in-product), 9-B (multi-inventor editing under-specified), 9-C (re-assessment tooling is V2)

---

## Placeholder

No repository source records assumptions beyond those collected above. Nothing has been added to fill gaps.
