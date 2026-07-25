# L1 Register

**Type:** Living document
**Status:** Authoritative. Supersedes the copy at Phase 4 §21.2, which is retained as the historical record.
**Established:** 25 July 2026, under Decision H1
**Governs:** every surface affected by the L1 legal dependency

---

## 1. What L1 is

**L1** is the fee-sharing / revenue-structure dependency between TechCo and Verified Agents, defined in Phase 3 §26.1 as the highest-priority legal dependency.

It determines whether the platform charges the client a technology fee, takes a share of the professional fee, or licenses software to the agent. Each answer implies a different data model and a different presentation.

**Note on the identifier.** "L1" carries two meanings in the repository:

- **L1, the legal dependency** — Phase 3 §26.1, one of seven (L1–L7)
- **the L1 Register** — this document: the register of product surfaces affected by that dependency

Only L1 has a register. L2–L7 are tracked in Phase 3 §26.1 and have no equivalent here.

---

## 2. Standing working assumption

Decision Log **O-2026-001** records the open decision and its working assumption:

> Proceed with the configurable pricing model until the legal review is completed.

Phase 4 §4 states the assumption in force as: unified customer experience; three internally independent fee components (platform · professional · official); commercial model configurable, never hardcoded.

---

## 3. IA consequence

Recorded at Phase 4 §21.2 and preserved here unchanged:

> None of the surfaces below changes its **route, template, navigation position or information hierarchy** based on the L1 outcome. Only the rendering mode of the price component changes.

That is what "configurable, not redesigned" means structurally, and it is why this is a register of components rather than a list of screens to rebuild.

Both rendering modes must satisfy:

- Official fees are **always separately identifiable**, in both modes, at depth 1 or depth 2
- Official fees derive from the Rules Engine, never a hardcoded table (BR-14)
- Every price carries its jurisdiction and entity-type basis
- Each component has a content slot for jurisdiction-specific disclosure text
- Switching modes changes no route, template or navigation — only rendering

---

## 4. Register

Entries L1-01 … L1-20 are a faithful transcription of Phase 4 §21.2, with the minimal contextual clarification required for standalone use outside that document (for example, resolving a bare section reference such as "§15.4" to "Phase 4 §15.4"). No entry's substance was changed.

**Each entry requires legal confirmation before implementation.**

| # | Surface | What L1 determines | Ref |
|---|---|---|---|
| L1-01 | `/pricing` | Whether the public catalogue shows bundled or component pricing | M0.8 |
| L1-02 | `/tools/cost-planner` | Component labelling in the 20-year projection | M1.4 |
| L1-03 | `/solutions/*`, `/for/*` price references | How indicative pricing is framed | — |
| L1-04 | `/agents/{slug}` public profile | Whether an agent's professional fee is displayed at all | M2.4 |
| L1-05 | `/app/find-an-agent/{id}/quote` | Quote structure — one price or three | M1.5 |
| L1-06 | Engagement acceptance | What the client is contracting for, and with whom | M1.5 |
| L1-07 | `/app/matters/{id}/costs` | Cost presentation within a matter | M1.6 |
| L1-08 | Matter header cost cell | Whether it shows a total or a component | Phase 4 §15.4 |
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
| **L1-21** | **Platform-to-reviewer compensation for pre-engagement assessment review** | **Whether platform-borne compensation for review is characterised as a professional fee, a service fee, or otherwise; and the mechanism and rate** | **ADR §8** |

---

## 5. L1-21 — provenance

L1-21 is not new scope. Assessment Lifecycle ADR §8 records that reviewers are compensated by the platform for pre-engagement assessment reviews, that the mechanism and rate are configurable and not fixed by the ADR, and that this interacts with the L1 legal dependency. ADR §8 and §14 both state that it **is added to the L1 register**.

That instruction could not be executed at the time, because Phase 4 — which then contained the register — was already frozen. Establishing this living document executes the standing instruction.

ADR §8 also records the economic consequence: each assessment carries a human-review cost independent of whether the client ever pays for a filing, so assessment review is a platform-borne COGS line.

---

## 6. Maintenance

This is a living document. New entries are added when a new surface is identified as L1-affected. Existing identifiers are never reused or renumbered.

Phase 4 §21.2 carries a relocation notice pointing here. The frozen table there remains the historical record of the register as it stood at Phase 4's freeze; where the two differ, this document governs.
