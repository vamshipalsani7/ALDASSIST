# Glossary

**Type:** Living document
**Status:** Canonical terminology reference (D-2026-011; Decision D)
**Restructured:** 25 July 2026, under Decision D

---

## How to use this document

This is the canonical terminology source for ALDASSIST. Living documents use the **Preferred Term**. Frozen documents retain their original wording; where that wording is superseded, a historical notice in the frozen document points here or to the governing authority.

Every entry carries:

- **Definition** — sourced from a repository document
- **Preferred Term** — the term living documents use
- **Historical Terms** — superseded wording retained in frozen documents, where applicable
- **Synonyms** — terms not to be used interchangeably, or approved alternates
- **Related Terms** — other glossary entries
- **Source** — where the definition comes from

No term appears here without a repository source. Product UI labelling — the client-facing and agent-facing label for each concept — is governed by the Phase 4 §10.2 lexicon, which this glossary does not replace.

**Scope note (Decision D).** Non-domain UI and IA concepts are documented where they are defined, not here. *Silence View* (Phase 4 §19.4), *Context Switcher* (Phase 4 §2.3) and *Information Architecture* (Phase 4) were listed in the previous version of this glossary and have been removed on that basis. They remain defined in Phase 4.

---

## Invention

**Definition.** The root entity of the platform. The durable concept of what was invented. An Invention persists independently of any Application and is never deleted by an Application's lifecycle.

**Preferred Term:** Invention
**Historical Terms:** —
**Synonyms:** None. Do not use "idea" once recorded, "IP", or "asset".
**Related Terms:** [Disclosure](#disclosure) · [Application](#application) · [Vault](#vault) · [Record](#record)
**Source:** Phase 3 §14.2, P5, BR-12; D-2026-001; AP-01; Phase 4 §10.2

---

## Application

**Definition.** A filing in one jurisdiction. Applications are jurisdictional manifestations of a persistent Invention; one Invention may have many Applications.

**Preferred Term:** Application
**Historical Terms:** —
**Synonyms:** None. Do not use "the patent" before grant.
**Related Terms:** [Invention](#invention) · [Matter](#matter) · [Lifecycle State](#lifecycle-state)
**Source:** Phase 3 §14.2, P5; Phase 4 §10.2, §11.3

---

## Disclosure

**Definition.** A versioned capture of an Invention. Zone 1 from the first keystroke. Every save creates an immutable, timestamped version. A Disclosure version referenced by a released Assessment or a filed Application becomes immutable.

**Preferred Term:** Disclosure
**Historical Terms:** —
**Synonyms:** Term of art — *invention disclosure*. Do not use "form" or "submission".
**Related Terms:** [Invention](#invention) · [Assessment](#assessment) · [Three-Zone Data](#three-zone-data)
**Source:** Phase 3 §14.2, M1.2, BR-20; Phase 4 §10.2

---

## Assessment

**Definition.** Analysis of a Disclosure answering whether an invention is worth protecting, with source-linked evidence and an honest verdict. Free to the client, and preceding any payment or Engagement. Cannot be released without a `ReviewDecision` by a Verified Agent.

**Preferred Term:** Assessment
**Historical Terms:** —
**Synonyms:** Term of art — *patentability opinion*. Do not use "report", "analysis", or "search" alone.
**Related Terms:** [Disclosure](#disclosure) · [Review Grant](#review-grant) · [Engagement](#engagement)
**Source:** Phase 3 §14.2, M1.3, BR-01; Assessment Lifecycle ADR §4, §7; Phase 4 §10.2, §11.6

---

## Matter

**Definition.** A unit of professional work and billing. Created by an Engagement. Cannot be closed while it has open critical Deadlines.

**Preferred Term:** Matter
**Historical Terms:** —
**Synonyms:** None. Do not use "case", "job", "project", or "ticket".
**Related Terms:** [Engagement](#engagement) · [Application](#application) · [Cross-tenancy](#cross-tenancy)
**Source:** Phase 3 §14.2, BR-08; Phase 4 §10.2, §11.4

---

## Engagement

**Definition.** A contracted professional relationship between a client and a Verified Agent. Creates a Matter and grants matter-scoped, time-bounded access to that agent.

**Preferred Term:** Engagement
**Historical Terms:** —
**Synonyms:** —
**Related Terms:** [Matter](#matter) · [Agent Matching](#agent-matching) · [Review Grant](#review-grant)
**Source:** Phase 3 §14.2, P6, D4; Assessment Lifecycle ADR §11

---

## Review Grant

**Definition.** A narrow access grant permitting a reviewer to access confidential material without an Engagement. Scoped to exactly one Disclosure version and its attachments plus the analysis under review, for the purpose of producing exactly one `ReviewDecision`. Expires on release or reassignment. Creates no Engagement, no Matter and no client–agent relationship.

**Preferred Term:** Review Grant
**Historical Terms:** —
**Synonyms:** —
**Related Terms:** [Assessment](#assessment) · [Engagement](#engagement) · [Cross-tenancy](#cross-tenancy)
**Source:** Assessment Lifecycle ADR §6; D-2026-013

---

## Agent Matching

**Definition.** The MVP capability by which a client is matched to a Verified Agent for a filing engagement, on published fixed prices, with conflict checking run before any agent is shown.

**Preferred Term:** Agent Matching
**Historical Terms:** *Marketplace* — used for this concept in Phase 3 M1.5 and Phase 4, before ADR §13.8 reserved that term.
**Synonyms:** Agent Matching / Engagement
**Related Terms:** [Marketplace](#marketplace) · [Engagement](#engagement) · [Matter](#matter)
**Source:** Assessment Lifecycle ADR §13.8; Phase 3 M1.5; Phase 4 §5

---

## Marketplace

**Definition.** Reserved for the future licensing surface — the V4+ capability through which patents in custody find licensees, buyers and partners. It is **not** the MVP agent-matching concept.

**Preferred Term:** Marketplace (future licensing surface only)
**Historical Terms:** Used in Phase 3 M1.5, Phase 3 §7, Phase 4 §3 and Phase 4 §8 to mean the MVP agent-matching capability. Those usages predate ADR §13.8 and are retained in those frozen documents.
**Synonyms:** —
**Related Terms:** [Agent Matching](#agent-matching)
**Source:** Assessment Lifecycle ADR §12, §13.8; Phase 2 §14; Phase 3 §23

**Recorded conflict.** D-2026-006 is titled *Marketplace-first regulatory model* and uses "Marketplace" to denote the business/regulatory structure — a platform operating alongside independent registered agents — rather than a product surface. ADR §13.8 governs product vocabulary. Both are accepted; neither supersedes the other; the repository does not state whether the reservation extends beyond product vocabulary. **This conflict is recorded, not resolved.**

---

## Workspace

**Definition.** The client tenancy boundary. Owns Inventions. Carries owner, plan, data residency and retention policy.

**Preferred Term:** Workspace
**Historical Terms:** —
**Synonyms:** —
**Related Terms:** [Invention](#invention) · [Cross-tenancy](#cross-tenancy) · [Vault](#vault)
**Source:** Phase 3 §14.2

---

## Vault

**Definition.** The client surface holding Inventions and their Disclosures — the pre-filing spine. An Invention persists in the Vault whether or not it is ever filed, including in the "Not pursued" state.

**Preferred Term:** Vault
**Historical Terms:** —
**Synonyms:** Invention Vault
**Related Terms:** [Invention](#invention) · [Disclosure](#disclosure) · [Record](#record)
**Source:** Phase 3 M1.2; Phase 4 §5, §11.2

---

## Record

**Definition.** The permanent, compounding account of what someone invented — disclosure capture, document vault, docket, deadline engine and portfolio view. The custody layer and the switching cost.

**Preferred Term:** Record
**Historical Terms:** —
**Synonyms:** —
**Related Terms:** [Invention](#invention) · [Vault](#vault) · [Deadline Engine](#deadline-engine)
**Source:** Phase 2 §4, §3

---

## Rule Set

**Definition.** Jurisdiction-specific behaviour expressed as versioned data — rules, calendars, fee schedules, forms and procedures — interpreted by a generic engine. Never application code.

**Preferred Term:** Rule Set
**Historical Terms:** —
**Synonyms:** Rules-as-data
**Related Terms:** [Deadline Engine](#deadline-engine)
**Source:** Phase 3 P1, D1, §18.2; D-2026-002; AP-02

---

## Deadline Engine

**Definition.** The module that computes, maintains, verifies and explains every date in the system, for any jurisdiction, from versioned rule data. Deadlines are derived state, never authored state.

**Preferred Term:** Deadline Engine
**Historical Terms:** —
**Synonyms:** Client-facing label is *Deadlines*; agent-facing label is *Docket* (Phase 4 §10.2)
**Related Terms:** [Rule Set](#rule-set) · [Lifecycle State](#lifecycle-state)
**Source:** Phase 3 M0.2, §18; AP-07

---

## Three-Zone Data

**Definition.** The separation of data into Zone 1 (confidential client information), Zone 2 (public patent corpus) and Zone 3 (outcome metadata). No component that processes Zone 3 may directly access Zone 1.

**Preferred Term:** Three-Zone Data
**Historical Terms:** —
**Synonyms:** Three-zone separation
**Related Terms:** [Outcome Metadata](#outcome-metadata) · [Disclosure](#disclosure) · [Cross-tenancy](#cross-tenancy)
**Source:** Phase 3 §13.1, D2, BR-15; D-2026-003; AP-03

---

## Outcome Metadata

**Definition.** Zone 3 data — objection types and counts, allowance rates, timings, claim-scope deltas, agent assignment metadata, reviewer edit statistics, examiner and art-unit patterns. Derived from Zone 2 public prosecution records and Event Log metadata, never from Zone 1 content.

**Preferred Term:** Outcome Metadata
**Historical Terms:** —
**Synonyms:** —
**Related Terms:** [Three-Zone Data](#three-zone-data)
**Source:** Phase 3 §13.1, M0.11, BR-15; Phase 2 §16.2

---

## Lifecycle State

**Definition.** Where an object stands in the process. One of the two independent status axes every significant object carries.

**Preferred Term:** Lifecycle State
**Historical Terms:** —
**Synonyms:** —
**Related Terms:** [Attention State](#attention-state)
**Source:** Phase 4 §11.1; D-2026-012; AP-14

---

## Attention State

**Definition.** Whether an object requires action. The second of the two independent status axes, always displayed alongside Lifecycle State and never merged with it.

**Preferred Term:** Attention State
**Historical Terms:** —
**Synonyms:** —
**Related Terms:** [Lifecycle State](#lifecycle-state)
**Source:** Phase 4 §11.1; D-2026-012; AP-14

---

## Cross-tenancy

**Definition.** The boundary between tenancies. Existence across a tenancy boundary is itself confidential: objects outside an actor's tenancy or grant are invisible — no stubs, no counts, no locked placeholders.

**Preferred Term:** Cross-tenancy invisibility
**Historical Terms:** —
**Synonyms:** —
**Related Terms:** [Workspace](#workspace) · [Matter](#matter) · [Review Grant](#review-grant)
**Source:** Phase 4 IA-5, §17.1; Phase 3 P6; Phase 5 X7

---

## Controlled Vocabulary

**Definition.** The governed set of terms from which all UI labels, glossary terms, documentation and help content are drawn. One governed vocabulary, one source of truth.

**Preferred Term:** Controlled Vocabulary
**Historical Terms:** —
**Synonyms:** —
**Related Terms:** All entries in this glossary
**Source:** D-2026-011; Phase 4 §10, IA-10

---

## Maintenance

New terms require a repository source before they appear here. Terms are not removed once a living document depends on them; superseded terms move to the **Historical Terms** field of the entry that replaces them, so frozen documents remain readable.
