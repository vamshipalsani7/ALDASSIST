# ALDASSIST Architecture Principles

> These principles are permanent design constraints.
> Every feature, module, screen and line of code must respect them.
> If a future implementation conflicts with one of these principles,
> the implementation should be redesigned instead of weakening the principle.

---

# Canonical Status

Recorded under Decision B.

This is the **canonical principles document** for ALDASSIST.

`CLAUDE.md` and `README.md` carry purpose-specific subsets of these principles. Those subsets must not conflict with this document. Where a conflict arises, this document governs.

Subsets may cite other accepted repository sources — an accepted Decision Log entry, or a principle in a frozen phase document — where a principle is established there rather than here. Each entry in a subset must be traceable to an accepted source.

No principle is added, renumbered or reworded by this designation. AP-01 through AP-14 and the Final Principle are unchanged.

---

# AP-01
## Invention First

The Invention is the primary entity of the platform.

Applications, filings, examinations, grants and renewals are all
lifecycle events of an Invention.

### Why

An invention exists before filing.

The platform should provide value before a patent application exists.

### Therefore

- "Don't File" is a valid outcome.
- Every invention has a permanent Record.
- Filing creates an Application.
- Filing never creates the Invention.

---

# AP-02
## Rules Are Data

Jurisdiction-specific behaviour must never be hardcoded.

Every jurisdiction should be defined through:

- Rules
- Calendars
- Fee schedules
- Forms
- Procedures

### Why

New jurisdictions should be added without changing application logic.

---

# AP-03
## Confidentiality First

Client invention content is the most valuable asset.

Protect it by design.

### Three Zones

Zone 1
Confidential client information

Zone 2
Public patent corpus

Zone 3
Outcome metadata

No component that processes Zone 3 may directly access Zone 1.

---

# AP-04
## Provenance Is Mandatory

Every AI-generated statement must be traceable.

Assertions cannot exist without supporting citations.

### Therefore

Every assertion must contain

- Citation
- Source
- Evidence
- Retrieval information

No unsupported AI output enters the product.

---

# AP-05
## Humans Make Legal Decisions

AI assists.

Professionals decide.

### Therefore

AI may

- Search
- Compare
- Summarize
- Suggest

AI may never

- File autonomously
- Replace professional review
- Make legal decisions

---

# AP-06
## Layer 1 = Layer 2

Clients and Patent Agents receive equal design attention.

A marketplace succeeds only when both sides receive value.

### Therefore

Agent tooling is not secondary.

Agent adoption begins before marketplace adoption.

---

# AP-07
## Deadline Safety

Deadlines are safety-critical.

Treat them with the same seriousness as financial transactions.

### Therefore

- Audit everything
- Verify everything
- Never silently modify deadlines
- Never delete deadline history

---

# AP-08
## Explainability Before Intelligence

Users should understand why the system produced an answer.

A slightly less intelligent system with perfect explanations is preferable to an opaque system.

---

# AP-09
## Modular Growth

Build as a modular monolith.

Extract services only when justified.

Never introduce complexity without measurable benefit.

---

# AP-10
## Honest Product

The platform should tell users what they need to hear,
not what maximizes revenue.

Examples

- Recommend abandoning weak patents.
- Recommend "Don't File" when appropriate.
- Show the complete twenty-year cost.
- Separate facts from confidence.

Trust is a long-term business asset.

---

# AP-11
## Global By Design

Launch in India.

Architect for the world.

Every major component should support future expansion without redesign.

---

# AP-12
## Documentation Is Part Of The Product

Documentation is not an afterthought.

Every important decision must be recorded.

Every architectural change must have a reason.

The product should remain understandable years after it is built.

---

# AP-13

## Language Builds Trust

Plain language leads.

Official terminology follows.

Never hide or replace terminology users will encounter in official patent office communications.

---

# AP-14
## Status Is Two-Dimensional

Every significant object communicates:

• Lifecycle state

• Attention state

These must always be displayed independently.

---


# Final Principle

Whenever two possible implementations exist,

choose the one that

- improves trust
- improves maintainability
- protects user data
- simplifies future expansion
- preserves architectural consistency

even if it requires more work today.