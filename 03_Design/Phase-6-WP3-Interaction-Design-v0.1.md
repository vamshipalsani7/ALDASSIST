# Phase 6 — WP-3: Interaction Design

**FROZEN — PHASE 6 BASELINE (v0.1) · 1 SEPTEMBER 2026 · REPOSITORY OWNER (VAMSHI)**

> **Freeze notice — Phase 6 (UX & Interaction Design), 1 September 2026.** This document is part of the Phase 6 baseline, declared **frozen on 1 September 2026 by the repository owner (Vamshi)**; recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-020). Frozen at version v0.1. **DR-01 and DR-02 remain explicitly deferred** (see `Phase-6-Deferred-Decision-Register-v0.1.md`). As with every frozen document, it is not modified without an explicit architectural decision; where superseded, a historical notice is added rather than the content rewritten. This notice records the freeze and changes no design substance. *(Supersedes the working-document status noted below.)*

**Phase:** 6 — UX & Interaction Design · **Work package:** WP-3
**Type:** Working document (not frozen). Version v0.1.
**Date:** 1 September 2026
**Inputs:** `Phase-6-WP1-Journey-Map-and-Navigation-v0.1.md` · `Phase-6-WP2-Screen-Inventory-v0.1.md` · `Phase-6-Interaction-Pattern-Catalogue-v0.1.md`.
**Frozen baseline (authoritative, unmodified):** Phase 3 PRD · Phase 4 IA · Phase 5 User Flows · Assessment Lifecycle ADR · Decision Log · Architecture Principles.

> **Scope.** UX/interaction specification only. **No** visual branding, colours, fonts, logos, frontend code, framework choice, hosting, or IA redesign. **No** invented product state, permission, legal wording, pricing/SLA/statistical/confidence value. Unspecified values are **`[DESIGN SLOT: …]`**; legal text is **`[LEGAL CONTENT SLOT: Lx]`**.

> **Verification (WP-3 §1 gate).** WP-1 and WP-2 were checked against the frozen baseline and against each other: **consistent, no contradiction found.** F-2 (role for a not-file Decision) is genuinely undetermined by the baseline and is recorded in `Phase-6-Deferred-Decision-Register-v0.1.md`, not decided here.

---

## 0. How to read this document

**Spec format.** Each major interaction uses the 26-field format. Per the brief, fields that are genuinely identical across interactions are handled by reference to the **Interaction Pattern Catalogue** (IP-01…IP-22) rather than repeated. Marquee interactions (verdict states, review workspace, deadline confirmation/escalation) are written in full; others use a compact block plus pattern references.

**26 fields:** 1 Name · 2 User goal · 3 Actor/role · 4 Entry condition · 5 Starting state · 6 Trigger · 7 Primary interaction · 8 System response · 9 Resulting state · 10 Secondary actions · 11 Loading/waiting · 12 Empty · 13 Error · 14 Recovery · 15 Permission · 16 Whose-turn · 17 Notification · 18 Provenance · 19 Deadline · 20 Accessibility · 21 Responsive · 22 Constraints · 23 P5 trace · 24 P4 trace · 25 P3/ADR/DL trace · 26 V2 exclusion.

**Trace vocabulary** as in WP-1/WP-2. Interaction IDs: `IX-<priority>.<n>` for the three priorities; `IX-O.<n>` for other domains.

---

## 1. Global interaction principles (non-negotiable)

These govern every interaction below and override any convenience `[AP-Final]`:

1. **Trust over convenience** `[AP-Final]`. 2. **Provenance before intelligence; no provenance → never present as verified** (IP-08) `[AP-04/BR-02]`. 3. **Human review before any verdict release; no bypass** `[BR-01/P5:X1]`. 4. **Client never communicates with the reviewer** `[ADR:§6/DL:D-2026-015 A2]`. 5. **Three-depth verdict hierarchy intact; unfavourable never degraded** `[P4:§16/§15.2]`. 6. **No silent permission escalation** `[P5:X13]`. 7. **Two-axis status always visible** `[AP-14]`. 8. **Deadlines computed and human-confirmed** `[BR-03/BR-13]`. 9. **Whose-turn always explicit** (IP-12) `[P5:principle 4]`. 10. **Silence produces clarity, not anxiety** (IP-14). 11. **No fake urgency, no invented certainty/SLA/statistics** `[Philosophy §5/§12.3]`. 12. **No "AI-powered" marketing language to explain function** `[P4:§10.3]`. 13. **Responding is status-only; agent uploads off-platform response; ALDASSIST is not a prosecution workspace** `[DL:D-2026-016]`. 14. **Cross-tenant existence invisible** (IP-16) `[P5:X7]`. 15. **Client rhythm = plain-language/calm; Agent rhythm = operational; never merged** `[P5:§12.7]`.

---

## 2. PRIORITY 1 — Disclosure → Assessment → Verdict

The spine, and the highest-stakes surface set `[P4:§26.2]`/`[P5:§12.2]`. The **unfavourable** and **inconclusive** verdicts are specified at the same depth as favourable/qualified.

### IX-1.1 · Disclosure creation & guided capture
1. **Name:** Record a disclosure (guided).
2. **Goal:** capture an invention as a structured, trustworthy, immutable record.
3. **Actor:** Owner/Admin/Member holding the edit session (IP-03); not Viewer.
4. **Entry:** "Record an invention" (creates Workspace on first, IP-04→SC-C00) or resume from *Drafting*.
5. **Starting state:** Invention *Drafting* (new) `[P4:§11.2]`.
6. **Trigger:** user begins/continues capture.
7. **Primary interaction:** step through question groups (problem → prior approaches → invention → how it works → variants → advantages) `[P3:M1.2]`; one question group per step (AT-4).
8. **System response:** autosave per step (IP-01); each save writes an immutable version (IP-02); Tier-1 AI may *structure/prompt only* — **never assess patentability** `[P3:§12.1]`.
9. **Resulting state:** *Drafting* until marked complete → *Recorded*.
10. **Secondary:** add attachments; add Named Inventors; view versions (SC-C05); leave (auto-saved).
11. **Loading/waiting:** per-step save indicator; completeness-check running state (IX-1.3).
12. **Empty:** fresh guided flow at step 1.
13. **Error:** attachment upload fails → **text disclosure unaffected & saved**, retry offered `[P5:F4 failure]`.
14. **Recovery:** abandon → persists in *Drafting*, versions intact, resume affordance (IP-01/§8-B).
15. **Permission:** edit roles only; **IP-03 soft-lock** serializes multi-member editing (F-1) `[DL:D-2026-015 A3]`. *(Automatic idle release of the edit session is a Phase-6 proposed interaction, not a baseline requirement — see IP-03.)*
16. **Whose-turn:** the user (author); if another holds the session, read-only "being edited by X" (IP-03).
17. **Notification:** optional Progress-class resume nudge (never Critical).
18. **Provenance:** n/a at capture (no AI assertions produced).
19. **Deadline:** none created at capture.
20. **Accessibility:** labels always visible (not placeholder-only); step progress announced `[P4:§22.3]`.
21. **Responsive:** disclosure capture is Medium priority; must work with save-and-resume across devices `[P4:§20.1]`.
22. **Constraints:** **Zone 1 from first keystroke** `[P3:D2/X11]`; immutable versions `[BR-20]`; no AI patentability at capture `[P3:§12.1]`.
23. **P5:** F3, F4. 24. **P4:** §5, §15.1, §11.2. 25. **P3/ADR/DL:** M1.2, FR-D02, §12.1, D2; D-2026-015(A3). 26. **V2 exclusion:** no concurrent editing/consent model; no institutional intake `[P5:§10]`.

### IX-1.2 · Mandatory prior-disclosure interrogation
- **Goal/Trigger:** force an honest record of prior public disclosure before assessment is possible `[P3:FR-D03]`.
- **Primary interaction:** a dedicated capture section asks whether the invention was published, presented, sold, demonstrated, or discussed under NDA, with dates and evidence; **this section cannot be skipped** `[P3:FR-D03/P5:F4 step3]`.
- **System response/resulting state:** answers are versioned (IP-02); the Disclosure cannot be **marked complete** until this section is resolved.
- **Error/recovery:** attempting to mark complete with the section unfilled → blocked inline (IX-1.3), pointed to the missing items.
- **Accessibility:** each prompt has a visible label; date inputs keyboard-accessible.
- **Constraints/traces:** cannot be skipped `[P3:FR-D03]`; Zone 1 `[D2]`; `[P5:F4]` `[P4:§5]`. **V2:** none.

### IX-1.3 · Completeness prompts & mark-complete
- **Goal:** surface gaps before assessment without the AI making any patentability judgement.
- **Primary interaction:** on request to complete, a **Tier-1** completeness check runs and surfaces specific gap guidance (structure/clarity only) `[P3:§12.1]`; user resolves gaps or proceeds where allowed; user marks complete.
- **System response/resulting state:** Invention *Recorded*; next action "Request assessment" surfaced `[P4:§11.2]`.
- **Loading:** "checking completeness" state.
- **Error:** cannot mark complete while prior-disclosure section unresolved (IX-1.2).
- **Constraints:** completeness AI **never assesses patentability** `[P3:§12.1]`; every save versioned `[BR-20]`. `[P5:F4]` `[P4:§11.2]`. **V2:** none.

### IX-1.4 · Assessment request
- **Goal:** start the free, human-reviewed assessment `[ADR:§7]`.
- **Actor/permission:** Owner/Admin/Member; not Viewer `[P4:§17.2]`.
- **Entry/starting state:** Invention *Recorded* with a complete Disclosure `[ADR:§4]`.
- **Primary interaction:** choose jurisdiction(s) — **India and/or PCT only** `[P3:§12.4]` — and assessment type; confirm.
- **System response:** Assessment created *Requested* → *Analysing*; Invention → *Assessing*; **no payment, no Engagement** `[ADR:§7/P5:X5]`; **no gate** `[DL:D-2026-017]`; honest expectation set — analysis then human review with a **committed turnaround** = `[DESIGN SLOT: committed review turnaround]` (IP-05).
- **Empty/Error:** disclosure incomplete → blocked with reason, routed back (IX-1.3) `[P5:F5 alt]`; analysis can't start → holds *Requested*, "queued not lost," retry `[P5:F5 failure]`.
- **Whose-turn:** platform (IP-12).
- **Constraints:** retired "hours/seconds" banned `[P4:§10.3]`; MVP jurisdictions India/PCT `[P3:§12.4]`. `[P5:F5]` `[P4:§13.1]` `[ADR:§7/§9]`; `[DL:D-2026-017]`. **V2:** no paid/expedited tier; no eligibility gate `[DL:D-2026-017]`.

### IX-1.5 · Analysis & human-review waiting
- **Goal:** honest two-stage async wait; the client is never asked to sit and watch, and never sees a pre-release verdict.
- **Interaction/system response:** **IP-05** governs. The Assessment screen (SC-C08) shows the lifecycle state + whose-turn + expected turnaround, and an optional "watch progress" for intermediate analysis findings `[P3:FR-A10]`. Transition *Analysing → In review* only when a reviewer can be assigned + granted (IP-06) `[P5:F6 step2]`.
- **Resulting state:** *In review* (reviewer's turn).
- **Empty:** never blank; never a partial verdict `[BR-01]`.
- **Error/recovery:** saturation → honest updated wait, review never skipped `[ADR:§9/§8-E]`; reviewer unavailable → reassignment (IP-06), client still sees *In review* `[§8-D]`.
- **Whose-turn:** platform then reviewer, explicit (IP-12).
- **Constraints:** **no verdict before human release** `[BR-01/X1]`; no invented turnaround. `[P5:F6/§8-E]` `[P4:§16]` `[ADR:§4/§9]`. **V2:** none.

### IX-1.6 · Release & verdict-ready notification
- **Goal:** deliver a reviewed verdict and hand the turn back to the client.
- **Trigger:** reviewer records `ReviewDecision` and releases (agent side IX-2.6).
- **System response:** Assessment → *Released*; reviewer **named on the output** `[FR-A07/BR-01]`; assessed Disclosure version **locked immutable** `[BR-20]`; Invention → *Assessed*; **verdict-ready notification** fires (Action-required class, IP-13); item appears in Home *Needs you* (IP-12).
- **Whose-turn:** client (decide).
- **Provenance:** all displayed assertions carry resolvable citations (IP-07); any unresolved → IP-08.
- **Constraints:** release is the only path to a client-visible verdict `[BR-01/X1]`. `[P5:F6]` `[P4:§15.2]` `[ADR:§4]`. **V2:** none.

### IX-1.7 · Verdict exploration — three-depth (favourable)
1. **Name:** Explore a favourable verdict ("Looks protectable").
2. **Goal:** understand the verdict, its basis, and the next step — conclusion first, evidence reachable.
3. **Actor:** any role with permission on the Invention.
4. **Entry:** open a *Released* Assessment (SC-C08) from *Needs you*/notification/Invention.
5. **Starting state:** Assessment *Released*, verdict favourable `[P4:§11.6]`.
6. **Trigger:** user opens the assessment / expands depths.
7. **Primary interaction:** **IP-09** three-depth: D1 verdict + confidence-with-basis + plain-language meaning + recommended next steps; D2 element-by-element reasoning; D3 evidence with clickable citations (IP-07).
8. **System response:** each depth reveals on one interaction; citations open exact passages (IP-07).
9. **Resulting state:** unchanged (reading); routes to decision (IX-1.12/1.13).
10. **Secondary:** view reviewer notes/name; view assessed Disclosure version; re-assess.
11. **Loading:** D1 first; deeper content lazy-loads.
12. **Empty:** a depth with no content states why (e.g. "no blocking references found").
13. **Error:** citation unresolved → **IP-08** (assertion not shown as verified).
14. **Recovery:** n/a (read).
15. **Permission:** view per Invention permission; **only Owner can proceed to engage/pay** `[P4:§17.2]`.
16. **Whose-turn:** client (decide) (IP-12).
17. **Notification:** none on read.
18. **Provenance:** **primary** — citation affordance is a first-class visual element (IP-07) `[P4:§15.2]`.
19. **Deadline:** none.
20. **Accessibility:** confidence not conveyed by colour alone; citation links descriptively named `[P4:§22.3]`.
21. **Responsive:** assessment reading is Medium priority; long-form readable on mobile, depth interactions retained `[P4:§20.1]`.
22. **Constraints:** confidence representation = **`[DESIGN SLOT: assessment confidence representation]`**; AI vs human content distinguishable `[P3:§12.3 r5]`.
23. **P5:** F9. 24. **P4:** §15.2, §16, §11.6. 25. **P3/ADR/DL:** BR-02, §12.3; ADR §4. 26. **V2:** no drafting from the verdict; no re-assessment diff.

### IX-1.8 · Verdict exploration — qualified ("Protectable with changes")
- **Delta from IX-1.7:** D1 additionally presents **the specific recommended changes and their cost** *before* the client proceeds to matching, so they engage with eyes open `[P5:F11 alt]`/`[P4:§11.6]`. Cost shown via **IP-21** (component primary; official fees separable). Routes to IX-1.12 (file) or IX-1.13 (not file).
- **Constraints/traces:** changes + cost shown pre-matching `[P5:F11 alt]`; `[P4:§16.1]`; IP-21. **V2:** none.

### IX-1.9 · Verdict exploration — UNFAVOURABLE ("Unlikely to be protectable")  ★ full depth
1. **Name:** Explore an unfavourable verdict.
2. **Goal:** deliver a "no" that is honest, complete, and dignified — a good experience, not a dead end `[P5:principle 2]`/`[Philosophy §3]`.
3. **Actor:** any role with permission.
4. **Entry:** open a *Released* Assessment with an unfavourable verdict.
5. **Starting state:** Assessment *Released*, verdict unfavourable.
6. **Trigger:** user opens the assessment / expands depths.
7. **Primary interaction:** **IP-09** three-depth, with unfavourable-specific emphasis: D1 plain-language "unlikely, and why in one line" + confidence-with-basis; **D2 shows the blocking references and why each blocks**; **D3 shows the exact cited passages, the full reference list, the coverage statement, and the 18-month blind-spot notice** — the **coverage statement is never collapsed by default here** `[P4:§15.2/§12.5]`.
8. **System response:** the four **alternatives are presented with equal visual weight** — design around · keep as a trade secret · publish defensively · defer & re-assess `[P4:§11.6]` — as options, not consolation.
9. **Resulting state:** routes to IX-1.13 (not file) or, if the client still chooses, IX-1.12; the Invention can persist in the Vault.
10. **Secondary:** reviewer name/notes; re-assess; explore each alternative.
11. **Loading:** D1 first; blocking references prioritised in D2 load.
12. **Empty:** n/a (an unfavourable verdict always has blocking references at D2/D3).
13. **Error:** any blocking-reference citation that won't resolve → **IP-08** (not shown as verified) — critical here, because a "no" must rest on verifiable art.
14. **Recovery:** the client may act on an alternative, defer, or supply more and re-assess (IX-1.10).
15. **Permission:** view per Invention permission; recording a not-file Decision → IX-1.13 (role governed by **F-2**, deferred).
16. **Whose-turn:** client (decide) (IP-12).
17. **Notification:** verdict-ready (Action-required), same class as any verdict — **no softening or hiding of a "no."**
18. **Provenance:** **maximal** — a negative verdict must be fully traceable to blocking art (IP-07/08) `[P3:§12.5]`.
19. **Deadline:** none.
20. **Accessibility:** the "no" and its alternatives are text-first, not colour-coded to feel negative; alternatives equal in the reading/focus order.
21. **Responsive:** alternatives remain equally weighted on small screens; coverage statement remains reachable, not buried behind a hover `[P4:§20.2]`.
22. **Constraints:** **must not be visually or interactionally degraded relative to favourable** `[P5:§12.2]`; alternatives equal weight `[P4:§11.6]`; coverage never collapsed by default `[P4:§15.2]`; honest arithmetic `[AP-10]`.
23. **P5:** F9, F10. 24. **P4:** §15.2, §11.6, §16. 25. **P3/ADR/DL:** BR-02, §12.5, AP-10. 26. **V2:** no automated defensive-publication service; no re-assessment diff.

### IX-1.10 · Verdict — INCONCLUSIVE ("Not enough to assess") & re-assessment
- **Goal:** tell the user what's missing and route them to supply it — via a *new* assessment, not a V2 diff view.
- **Primary interaction:** D1 states the verdict; the released output states **what is missing and how to supply it** `[P4:§11.6]`; the route is "supply what's missing → **update the Disclosure (new immutable version, IP-02) → request a new assessment** (IX-1.4)" `[P5:§9-C/F9]`.
- **System response/resulting state:** creating an updated Disclosure version and requesting again starts a fresh Assessment lifecycle (IP-05); the prior assessment remains on the Invention (assessments travel with the Invention) `[ADR:§11]`.
- **Provenance:** as IP-07/08 for whatever assertions exist.
- **Constraints:** **no diff-against-prior view (V2, FR-A11)** `[P5:§9-C]`; a valid designed outcome, not a failure `[P5:F6 alt]`. `[P5:F9/§9-C]` `[P4:§11.6]` `[ADR:§11]`. **V2:** re-assessment-with-diff.

### IX-1.11 · Provenance interaction & failure (spine-wide)
- **Interaction:** **IP-07** drill-down on every AI-derived assertion; **IP-08** fail-safe when a citation cannot resolve. Applies in the verdict (SC-C08) and the review workspace (SC-A07).
- **Constraints/traces:** absolute — no assertion shown as fact without a resolvable citation `[BR-02/X2/AP-04]`. **V2:** none.

### IX-1.12 · Decision to file
- **Goal:** convert a favourable/qualified verdict into a scoped filing intent.
- **Actor/permission:** **Workspace Owner only** (engage/pay) `[P4:§17.2]`; a Member's intent is **routed to request Owner action — no silent escalation** (IP-15/X13).
- **Interaction/system response:** **IP-10** confirmation; choose jurisdiction(s)+route; Cost Planner updates (IP-21) `[P3:J3]`; proceed to Agent Matching (IX-O.5). **No Engagement/payment yet** `[P5:X5]`.
- **Resulting state:** Invention still *Assessed*; enters matching with a defined scope `[P5:F11]`.
- **Constraints:** Owner-only; no payment yet. `[P5:F11]` `[P4:§17.2]` `[ADR:§7]`. **V2:** none.

### IX-1.13 · Decision not to file (first-class)
1. **Name:** Record a decision not to file.
2. **Goal:** make "no" a complete, dignified, reversible outcome `[P5:F10]`.
3. **Actor:** the client role permitted to record a *not-file* Decision — **governed by DR-01 (deferred); not determined in Phase 6.** The interaction is designed **permission-agnostic**: it is presented to whichever role DR-01 authorises, and asserts no specific role here. The only baseline-fixed permission in this area is that **engage/pay remains Owner-only** `[P4:§17.2]`.
4. **Entry:** from any verdict (typically unfavourable) or later reconsideration.
5. **Starting state:** Assessment *Released*.
6. **Trigger:** user chooses "don't pursue / decide."
7. **Primary interaction:** **IP-10** confirmation capturing **actor + rationale** → a **Decision entity** `[BR-09]`.
8. **System response:** Invention → **Not pursued** `[P4:§11.2]`; **four alternatives with equal weight** shown (IX-1.9); **no money, no Engagement, no Matter** `[ADR:§7]`; a complete, dignified Invention page (not a husk) `[P4:§15.1]`.
9. **Resulting state:** *Not pursued*; persists in the Vault, monitored, re-assessable.
10. **Secondary:** explore alternatives; defer; proceed to file later (fully reversible).
11–14. **Loading/Empty/Error/Recovery:** submit transition; n/a; **none material — this path creates nothing that can fail** `[P5:F10]`; reversible later.
15. **Permission:** role for the not-file Decision **governed by DR-01 (deferred)**; interaction is permission-agnostic. Engage/pay Owner-only `[P4:§17.2]` is the only baseline-fixed permission here.
16. **Whose-turn:** closed (a completion) (IP-12).
17. **Notification:** none required; optional Progress confirmation.
18. **Provenance:** n/a (client decision).
19. **Deadline:** none — a not-file Decision creates no Application and no deadline `[P5:F10]`.
20. **Accessibility:** alternatives equal in focus order; no negative colour-coding of the outcome.
21. **Responsive:** alternatives equally weighted on mobile.
22. **Constraints:** Decision requires a human actor `[BR-09]`; Invention persists `[AP-01]`; alternatives are options `[P4:§11.6]`.
23. **P5:** F10. 24. **P4:** §11.2, §15.1, §11.6. 25. **P3/ADR/DL:** BR-09, ADR §7; **DR-01/F-2 deferred**. 26. **V2:** no automated defensive publication; no abandon/renew tooling.

---

## 3. PRIORITY 2 — Agent import → docket → first review

The supply-side cold start and the throughput-critical review gate `[P4:§26.2]`/`[P5:§12.6]`. **No new reviewer permission model is created** — the review grant (ADR §6) governs.

### IX-2.1 · Agent onboarding & verification states
- **Goal:** convert a prospective agent into a Verified Agent; gate all client Zone-1 access behind verification `[P5:F21]`.
- **Actor/entry:** prospective agent from `/for/patent-agents` → SC-A00.
- **Primary interaction:** submit credentials (registration number, qualification evidence, identity); declare **technical domains** (drive review routing `[ADR:§5]`), specializations, **conflicts**; set capacity; opt into review queue and/or opportunities.
- **System response / states:** account moves through **Unverified → Pending verification → Verified** (or **Verification failed**). Pending = **limited account: no review, no match, no client material** `[P5:F21 alt]`. Verification = official-register check `[P3:§26 D6]` + manual Marketplace-Ops review (SC-O02) `[P3:M4.3]`.
- **Loading/waiting:** "submitted · in review" pending state; honest, no invented SLA (`[DESIGN SLOT: verification turnaround]`).
- **Error/recovery:** verification fails → clear reason + remediation; **no client Zone 1 access in the interim** `[P5:F21 failure]`.
- **Whose-turn:** Marketplace Ops during pending (IP-12).
- **Notification:** verification-result notification (Action-required).
- **Permission:** **verification precedes any Zone 1 access** `[P5:F21]`; MFA required for agents `[P4:§2.3]`.
- **Constraints/traces:** declared domains drive review routing `[ADR:§5]`; conflicts feed BR-10. `[P5:F21]` `[P4:§6]` `[P3:M4.3/§26 D6]`. **V2:** no captive-practice/in-house reviewer wrapper `[ADR:§8]`.

### IX-2.2 · Docket import (the adoption unlock)
1. **Name:** Import practice matters.
2. **Goal:** deliver standalone value even when some imported matters are incomplete or fail — before any marketplace work `[P3:ICP-2]`.
3. **Actor:** Verified Agent; Agent Org Admin.
4. **Entry:** empty state, onboarding, or matters index — **all three routes** `[P4:§6.1]` → SC-A04.
5. **Starting state:** verified agent, own tenancy.
6. **Trigger:** start import.
7. **Primary interaction:** bring in existing matters; map/confirm the fields the Deadline Engine needs; review a computed-deadline preview before committing.
8. **System response:** the **Deadline Engine computes deadlines from versioned rules** `[D1]`; imported matters are the agent's own (**not** marketplace matters) `[P5:F22]`.
9. **Resulting state:** matters in the docket with computed, alerting deadlines.
10. **Secondary:** re-map fields; retry per-matter.
11. **Loading/waiting:** **import progress** with per-matter status; large imports stream results.
12. **Empty:** guided first import; import path is prominent `[P4:§19.1]`.
13. **Error — partial/failed/incomplete:** **incomplete data → tell the agent exactly what's missing per matter; deliver partial value for complete matters; nothing silently mis-computed** `[P5:F22 failure]`. Failed matters are listed for correction, not dropped.
14. **Recovery:** correct missing fields per matter and re-run; complete matters remain valid.
15. **Permission:** agent's own tenancy only; cross-tenancy invisible (IP-16).
16. **Whose-turn:** the agent (supply the missing fields).
17. **Notification:** import-complete summary; per-matter deadline alerts thereafter (IP-13).
18. **Provenance:** n/a (agent-supplied data), but deadlines carry their computation trace (IP-11 deadline).
19. **Deadline:** computed on import (IP-11).
20. **Accessibility:** per-matter status is text, not colour-only; error list navigable.
21. **Responsive:** agent docket is High mobile priority `[P4:§20.1]`; import itself is desktop-optimal.
22. **Constraints:** rules-as-data computation `[D1/AP-02]`; deadline safety `[AP-07]`. **`[FLAG: duplicate handling on import — WP-2/baseline do not specify de-duplication of imported vs later platform matters. Not inventing behaviour; recorded in the Deferred Decision Register if it needs a rule.]`**
23. **P5:** F22. 24. **P4:** §6.1, §19.1. 25. **P3/ADR/DL:** M2.1, D1, ICP-2. 26. **V2:** none.

### IX-2.3 · Docket health & confirmation (agent)
- **Goal:** an agent starts the day at "what must I do," and confirms critical deadlines deliberately.
- **Interaction:** **Today** surfaces the risk-ranked queue (deadlines + matter actions + **review items**), distinct rhythms not blended `[P4:§6.1/§12.4]`; the **Docket** (SC-A02) lists all deadlines across all matters/sources; **deadline confirmation** uses **IP-11** (system + human) `[BR-03]`.
- **Whose-turn/deadline:** IP-11/IP-12; criticality never colour-only `[P4:§22.3]`.
- **Constraints/traces:** human confirmation of critical deadlines `[BR-03/X9]`; docket and review kept separate `[P5:§12.7]`. `[P5:F20/F22]` `[P4:§6/§12.4]`. **V2:** none.

### IX-2.4 · Review queue & assignment
- **Goal:** route a domain-matched, conflict-free item to a reviewer and issue a scoped grant.
- **Interaction/system response:** **IP-06**. `/agent/reviews` (SC-A06, a **top-level destination separate from Matters** `[P4:§6.1]`) shows the **domain-filtered** queue; conflicted items never appear `[ADR:§5]`; taking an item issues a **review grant** (scoped access, IX-2.5).
- **Empty:** "no items in your domains right now" (honest, not urgency).
- **Whose-turn:** reviewer.
- **Constraints/traces:** review is the BR-01 gate; the client experience waits behind it `[P5:§12.6]`; queue is source of truth `[ADR:§5]`. `[P5:F7/F23]` `[P4:§6.1]` `[ADR:§5]`. **V2:** none.

### IX-2.5 · Review workspace, scoped access & assertion evidence  ★ full depth
1. **Name:** Review an assessment (two-pane workspace).
2. **Goal:** let a Verified Agent verify, correct and release an assessment under the narrowest sufficient access.
3. **Actor:** assigned reviewer (Verified Agent) holding a **review grant** `[ADR:§6]`.
4. **Entry:** take an item from the queue (IX-2.4/SC-A07).
5. **Starting state:** Assessment *In review*.
6. **Trigger:** open the item.
7. **Primary interaction:** **two-pane** (AT-5) — source pane (the **one** granted Disclosure version + AI analysis + cited passages) and work pane (assertions, edits, decision); the reviewer checks each assertion against its cited source (**IP-07**), **hunting false negatives** `[P3:§12.5]`, and verifies statutory-exclusion analysis.
8. **System response:** access is **exactly one Disclosure version + the analysis, for exactly one `ReviewDecision`** `[ADR:§6]`; everything else in the Workspace is **invisible** (IP-16) `[P5:X6/X7]`; edits captured as diffs (IX-2.6).
9. **Resulting state:** on release → *Released* (IX-2.6); on decline/timeout → requeued (IX-2.7).
10. **Secondary:** edit an assertion (IP-19); mark **Inconclusive** with what's missing; decline/return the item.
11. **Loading/waiting:** panes load only the granted material.
12. **Empty:** n/a (always has the item).
13. **Error:** boundary-violation attempt → **denied and audited** (IP-16) `[P5:§8-J]`; a citation that won't resolve → **IP-08** surfaced to the reviewer to resolve or drop before release.
14. **Recovery:** reviewer unavailable/times out → grant expires, item reassigned (IX-2.7); client still sees *In review*.
15. **Permission:** **review grant only** — narrower than an engaged agent; **no new reviewer permission model** `[ADR:§6]`/`[P3:BR-05 Decision-F notice]`; **no client↔reviewer channel** `[A2]`.
16. **Whose-turn:** reviewer.
17. **Notification:** on release, client verdict-ready (IX-1.6).
18. **Provenance:** central — IP-07/08 on every assertion `[BR-02]`.
19. **Deadline:** none (pre-engagement).
20. **Accessibility:** two-pane has a pane switcher on small screens (never remove the source pane) `[P4:§20.2]`; citation links descriptively named.
21. **Responsive:** two-pane stacks with a pane switcher; source pane always accessible `[P4:§20.2]`.
22. **Constraints:** **mandatory review, no bypass** `[BR-01/X1]`; reviewer ≠ drafter `[ADR:§5]`; cross-tenancy invisibility `[X7]`; the review is throughput-critical — the interaction must feel like minutes `[P5:§12.6]`.
23. **P5:** F8, F23, §8-J. 24. **P4:** §6.1, §17.2 (Decision-F notice), AT-5. 25. **P3/ADR/DL:** BR-01/BR-02/BR-05(notice), ADR §5/§6, §12.5, FR-A08. 26. **V2:** no drafting from review; no ongoing client relationship `[ADR:§6]`.

### IX-2.6 · Reviewer edits, `ReviewDecision` & release
- **Goal:** capture the reviewer's judgement as the released verdict, with edits recorded for quality metrics — without ever bypassing the gate.
- **Interaction/system response:** **IP-19** — edits captured as structured diffs `[FR-A08]` (materiality per `[DL:D-2026-018]`, not re-defined); the reviewer records a **`ReviewDecision`** and **releases** `[BR-01]`; **the released verdict reflects the reviewer's judgement, not the AI draft** `[P5:§8-C]`; reviewer named on output `[FR-A07]`; assessed Disclosure version locked `[BR-20]`.
- **Resulting state:** *Released* → client (IX-1.6).
- **Provenance:** edited assertions must still satisfy IP-07/08.
- **Constraints/traces:** no path where an unreviewed/"rejected" AI draft reaches the client `[P5:§8-C/X1]`. `[P5:F23/§8-C]` `[P4:§15.2]` `[BR-01/FR-A08]`; `[DL:D-2026-018]`. **V2:** none.

### IX-2.7 · Reviewer reassignment
- **Interaction:** **IP-06** — decline after opening / timeout / unavailability → grant expires, item requeues, new reviewer assigned; **client continues to see *In review*, not an error/reset** `[P5:§8-D]`; if reassignment threatens the committed turnaround, the saturation honest-wait step applies `[ADR:§9]`.
- **Constraints/traces:** review never skipped `[BR-01]`. `[P5:§8-D]` `[ADR:§9]`. **V2:** none.

---

## 4. PRIORITY 3 — Deadline → notification → confirmation → escalation

The operational spine of the whole product `[P4:§26.2]`. **No deadline duration is invented** — every date derives from the versioned Rules Engine `[D1]`.

### IX-3.1 · Deadline computation & display
- **Goal:** show every date with its criticality, state, and a reachable computation trace.
- **Trigger:** a filing Event (IX-O.8), a register-detected change, or an import (IX-2.2) triggers computation.
- **Interaction/system response:** the **Deadline Engine computes** the deadline set from versioned rules `[D1/§18]`; each deadline carries **two-axis** presentation (criticality + state) `[P4:§11.5]`; **IP-09** three-depth exposes D1 date, D2 "because [trigger] + [window]," D3 **full computation trace** (rule ID, version, statutory citation, calendar adjustment, extensions) `[BR-13]`.
- **Resulting state:** deadline in *Upcoming/Approaching/Due* etc. `[P4:§11.5]`.
- **Empty:** client `/app/deadlines` first-run = "deadlines appear once something is filed" `[P4:§19.1]`.
- **Error:** register/source stale → IP-18; Rules Engine unavailable → IP-17 (no fabricated date).
- **Accessibility:** criticality shown with **icon + text + colour**, never colour-only `[P4:§22.3]`.
- **Constraints/traces:** **computed, never authored** `[X9/D1]`; never silently modify/delete history `[AP-07]`; durations = Rules Engine (no slot invented). `[P5:F16/F19]` `[P4:§11.5/§16.1]` `[BR-13/D1]`. **V2:** renewals calendar as active feature.

### IX-3.2 · Human confirmation of a critical deadline
1. **Name:** Confirm a critical deadline.
2. **Goal:** treat deadlines like financial transactions — a critical deadline advances only with system + human confirmation `[AP-07]`.
3. **Actor:** Verified Agent (assigned) or Docket Ops `[P3:§4.3]`.
4. **Entry:** agent Docket (SC-A02) or ops Docket Health (SC-O01); a deadline in *Approaching/Due*.
5. **Starting state:** deadline computed, unconfirmed.
6. **Trigger:** actor opens the deadline and confirms.
7. **Primary interaction:** **IP-11** — review the computation trace (IP-09/BR-13), then confirm; confirmation is a recorded, deliberate act.
8. **System response:** deadline state → **Confirmed** `[P4:§11.5]`; the Matter may advance past it `[BR-03]`; confirmation recorded as an immutable event `[X15]`.
9. **Resulting state:** *Confirmed*.
10. **Secondary:** open the governing Rule (agents/ops only) `[P4:§12.5]`; flag a discrepancy → Docket Ops (IX-3.5).
11. **Loading:** trace load; confirm transition.
12. **Empty:** n/a.
13. **Error:** source/computation conflict → **routes to Docket Ops; client sees the honest human-checked position, never an auto-flip** `[P3:§20.3]`.
14. **Recovery:** discrepancy resolution at SC-O01 (IX-3.5).
15. **Permission:** confirm = Agent/Docket Ops (capability matrix) `[P3:§4.3]`; clients see the trace but the Rule object is agent/ops-only `[P4:§12.5]`.
16. **Whose-turn:** the confirming actor (IP-12).
17. **Notification:** approaching/due drive the alert ladder (IX-3.3).
18. **Provenance:** the trace is the deadline's provenance (BR-13).
19. **Deadline:** this *is* the deadline interaction.
20. **Accessibility:** confirm is an explicit, labelled action; not colour-only.
21. **Responsive:** agent docket High mobile priority — confirm must be possible on mobile `[P4:§20.1]`.
22. **Constraints:** **critical deadline requires human confirmation before advance** `[BR-03/X9]`; history immutable `[AP-07]`.
23. **P5:** F16, F19, X9. 24. **P4:** §11.5, §12.5, §16.1. 25. **P3/ADR/DL:** BR-03/BR-13, §20.3, AP-07. 26. **V2:** none.

### IX-3.3 · Notification generation & delivery state
- **Goal:** the right class on the right channel, with delivery visible for Critical.
- **Interaction/system response:** **IP-13** — classes fixed (Critical / Action required / Progress / Informational / Proactive-reassurance) `[P3:§16.2/16.3]`; grouped by class in the centre (SC-C21/A14) `[P4:§18.2]`; Critical uses in-app+email+SMS/WhatsApp with **receipt tracking and an escalation ladder** `[P3:§16.2]`; per-class default channels where unset = **`[DESIGN SLOT]`**.
- **Delivery state:** Critical shows delivery/receipt status internally; **undeliverable Critical → Docket Health Console + Docket Ops paged** (IX-3.5) `[P3:§16.5/§8-F]`.
- **Constraints/traces:** Critical **cannot be muted**, stated at onboarding `[P4:§18.2]`; proactive-reassurance fires even when nothing happened `[P3:§16.3]`. `[P5:F18/§8-F]` `[P4:§18.2]` `[P3:§16]`. **V2:** none.

### IX-3.4 · Acknowledgement / confirmation of a notification
- **Interaction:** **IP-13** — a **Critical notification cannot be dismissed without acknowledgement or an explicit action** `[P4:§18.2]`; Action-required items persist in *Needs you* until acted on (IP-12); acknowledgement is recorded.
- **Constraints/traces:** no silent dismissal of rights-affecting notices `[P4:§18.2]`. `[P5:F18]` `[P4:§18.2]`. **V2:** none.

### IX-3.5 · At-risk / overdue presentation & escalation
1. **Name:** Deadline at risk / missed → escalation.
2. **Goal:** never a silent miss — the client learns from us first, immediately, with options `[P5:§8-G]`.
3. **Actor:** system → client/agent → Docket Ops → Trust & Safety.
4. **Entry:** a critical deadline enters its window unacknowledged, or is missed.
5. **Starting state:** deadline *Approaching/Due* → *Missed* on lapse `[P4:§11.5]`.
6. **Trigger:** window entry without action, or lapse.
7. **Primary interaction:** the **alert ladder escalates across channels, then pages Docket Ops** `[P3:J9/§16.5]`; SC-O01 surfaces unconfirmed/undelivered/discrepancies/escalations.
8. **System response:** on a miss, **an incident is recorded; the client is notified immediately with options; a root-cause analysis is mandatory**; restoration provisions (modelled as rules) are assessed `[NFR-C01/§8-G]`; a **platform-attributable** miss is a **Sev-1** `[Metrics OP-5]`.
9. **Resulting state:** deadline *Missed* with an incident record; client informed.
10. **Secondary:** view options/restoration; view incident status (ops).
11. **Loading:** escalation runs server-side; ops console updates live.
12. **Empty:** SC-O01 with no open items = a good state, honestly shown.
13. **Error:** **undeliverable Critical on all channels → Docket Ops paged; human contact trail** (IP-13/§8-F).
14. **Recovery:** human intervention; restoration provisions where rules allow.
15. **Permission:** ops/Trust & Safety internal, audited; client sees the honest position.
16. **Whose-turn:** escalating to a human when automated delivery fails (IP-12).
17. **Notification:** the escalation ladder itself; **never leaves the user silently uninformed** `[X10]`.
18. **Provenance:** the incident record and computation trace document what happened.
19. **Deadline:** the subject.
20. **Accessibility:** at-risk conveyed by icon+text, not colour-only; client options are explicit actions.
21. **Responsive:** at-risk items surface on Home and mobile; sticky next-action.
22. **Constraints:** **platform-attributable miss = Sev-1 with RCA + client disclosure within 24h** `[NFR-C01]`; total misses tracked separately (no zero-bar) `[Metrics OP-5/D-2026-018]`; never skip review/confirmation to clear a queue `[ADR:§9]`.
23. **P5:** §8-F, §8-G, X10. 24. **P4:** §11.5, §8. 25. **P3/ADR/DL:** J9, §16.5, NFR-C01; Metrics OP-5 / D-2026-018. 26. **V2:** none.

### IX-3.6 · Silence & expected-next-event
- **Interaction:** **IP-14** — the silence view on the Application status tab (SC-C11) and *Waiting on others* on Home: "nothing has happened — expected," last event + source/freshness, honest next-event range (`[DESIGN SLOT: expected-next-event range]`), "nothing required from you," "monitoring daily," explainer links.
- **Constraints/traces:** silence is a designed state, not a blank `[P4:IA-9/§19.4]`; no fake urgency. `[P5:F19]` `[P4:§19.4]`. **V2:** none.

### IX-3.7 · Agent vs client deadline differences
- **Client:** sees the deadline, its state/criticality, the computation **trace** (IP-09 depth 3), and whose-turn; **cannot confirm** a critical deadline (that is the agent/ops act) `[P3:§4.3]`; sees the silence view during quiet periods (IP-14).
- **Agent:** sees the full **Docket** across all matters/sources, the **governing Rule** object, and performs **confirmation** (IP-11) `[P4:§12.5]`; docket is High mobile priority `[P4:§20.1]`.
- **Constraints/traces:** confirmation is agent/ops only `[P3:§4.3/BR-03]`; client-facing label "Deadlines," agent-facing "Docket" `[P4:§10.2]`. `[P5:F19/F22]` `[P4:§10.2/§12.5]`. **V2:** none.

---

## 5. Other interaction domains

Compact specs; identical behaviour is carried by pattern reference. Full screen context is in WP-2.

### IX-O.1 · Account & sign-in
- **Interaction:** **IP-04** (account gate / return-to-intent). Minimal email+verify, **no phone/sales** `[P3:J1]`; return to intent; **no Workspace created here** (A1). Errors: verification incomplete → held/inert/resend; already-registered → sign-in preserving intent `[P5:F2]`. Client MFA policy = **`[DESIGN SLOT]`** (agent/internal MFA fixed `[P4:§2.3]`). `[WP2:SC-P16]`. **V2:** SSO/enterprise identity.

### IX-O.2 · Workspace creation & membership
- **Interaction:** interstitial on first Disclosure (SC-C00); creator → **Owner**; invitees join with the inviter's assigned role (Admin/Member/Viewer), **never Owner**; Named Inventor without membership gets **no Workspace**, only Invention visibility (IP-16 for everything else) `[P5:F3]`/`[P4:IA-5]`. Error: invitation expired → clear message + request-fresh path `[P5:F3 failure]`. `[WP2:SC-C00]`. **V2:** institutional ownership wrappers `[DL:D-2026-015 A3]`.

### IX-O.3 · Invention / Vault & sequential editing
- **Interaction:** Invention detail (SC-C04) is the object hub — status pair + contextual next action + relationship rail (one-click related objects) `[P4:§12.5/§15]`; **Not pursued is a complete, dignified page, not a husk** `[P4:§15.1]`. Disclosure editing uses **IP-03 (soft-lock, F-1)** and **IP-02 (immutable versions)**. Cross-tenancy invisibility throughout (IP-16). `[P5:F4/F10]` `[P4:§15.1]`. **V2:** re-assessment diff; monitoring.

### IX-O.4 · Assessment object & decisions
- **Interaction:** covered by IX-1.5–1.13 and IP-05/07/08/09/10; assessments list newest-first (SC-C07); assessments **travel with the Invention** `[ADR:§11]`; Decisions tab records actor+rationale `[BR-09]`. **V2:** re-assessment diff.

### IX-O.5 · Agent Matching / Engagement (matching)
1. **Name:** Match to a filing agent. 2. **Goal:** choose a conflict-free agent on published fixed prices. 3. **Actor:** **Workspace Owner** `[P4:§17.2]`. 4/5. **Entry/state:** decision-to-file (IX-1.12); Matter *Quoted* at quote view `[P4:§11.4]`. 6. **Trigger:** enter `/app/find-an-agent`. 7. **Primary interaction:** review matched agents with **rationale** + **fixed published prices before engagement** (IP-21) `[FR-M01/M03/BR-06]`; open profiles. 8. **System response:** **conflict check runs BEFORE any agent is shown** `[BR-10]`; conflicted agents silently excluded; outcome stats shown **only at n≥20 with sample size + confidence indicator; below floor "not enough data yet"** `[DL:D-2026-019]` (representation = `[DESIGN SLOT]`). 9. **Resulting state:** an agent selected → quote (IX-O.6). 10. **Secondary:** filter; compare; view public profile. 11. **Loading:** **conflict check first**, then match list. 12. **Empty:** no agent in domain/jurisdiction → honest message + notify-me; Invention/Assessment persist; **no fabricated matches** `[P5:F14 alt]`. 13. **Error:** conflict check can't complete → **fails closed**, "temporary hold, not a rejection" `[BR-10/§8-H]`. 14. **Recovery:** notify-me; retry. 15. **Permission:** Owner only. 16. **Whose-turn:** client. 17. **Notification:** the client may **opt in to be notified if a matching agent becomes available** (user-facing offer per `[P5:F14 alt]`); the conditions that trigger that notification are **`[DESIGN SLOT: match-availability notification trigger]`** — not specified here. 18. **Provenance:** stats carry n + domain `[BR-17]`. 19. **Deadline:** none yet. 20/21. **Accessibility/Responsive:** rationale is text; price component readable on mobile. 22. **Constraints:** **"Agent Matching / Engagement," never "Marketplace"** `[ADR:§13.8/DL:D-2026-013]`; conflict-first `[BR-10]`; fixed pricing `[BR-06]`; L3 gates stat publication `[DL:D-2026-019]`. 23. **P5:** F14, §8-H. 24. **P4:** §5, §21, §11.4. 25. **P3/ADR/DL:** M1.5, BR-06/10/17; D-2026-019, O-2026-001. 26. **V2:** licensing marketplace; forced reviewer continuity.

### IX-O.6 · Engagement & checkout
- **Interaction:** **IP-10** confirmation + **IP-21** pricing (component primary, both modes, **official fees separable**) `[P4:§21/DL:O-2026-001]`. Owner accepts scope+quote → **Engagement → Matter → matter-scoped grant** `[P6/D4]`; Invention → *Filing*, Matter → *Engaged* `[P5:F15]`. Scope change → **new quote** `[BR-06]`. **Error:** **payment fails → Matter NOT created; Invention holds *Assessed*; "nothing at risk, no deadline exists"; retry** `[§8-K/P4:§19.3]`; agent unavailable → back to matching, scope preserved `[P5:F15 alt]`. Legal wording = **`[LEGAL CONTENT SLOT: L1-06/L1-20]`**. **Constraint:** **Engagement/Matter/payment appear only here, after the free assessment** `[X5/ADR:§7]`. `[P5:F15]` `[P4:§21]` `[P6/D4/BR-06]`. **V2:** multi-currency.

### IX-O.7 · Matter workspace & communication
- **Interaction:** four-cell header **Where · What's next · Needs you · Cost `[L1]`** always populated (incl. "Nothing needed") `[P4:§15.4]`; whose-turn via *Awaiting you* / *Awaiting the office* (IP-12) `[P4:§11.4]`. Communication is an **in-context, recorded thread confined to the active matter** — **no general client↔agent messaging, no client↔reviewer channel** `[A2/ADR:§6]`; agent clarification requests surface as client **decision actions** `[BR-09]`; **client reviews the application document before filing** (IP-10 decision) `[P3:J3 step9]`. **Error:** message push fails → in-app persistence, never lost `[P5:F17 failure]`. **Constraint:** communication never crosses matter/tenancy boundaries (IP-16) `[X6/X7]`; **agent files, platform never** `[BR-09/T3]`. `[P5:F16/F17]` `[P4:§15.4]`. **V2:** **no drafting/prosecution workspace** — agent uploads externally-prepared documents `[§9-A/§10]`.

### IX-O.8 · Application tracking & Responding (status-only)
- **Interaction:** Application detail (SC-C11) shows the **lifecycle + attention pair with official sub-status** `[P4:§11.3]`, an event timeline with **source + freshness per entry**, and **IP-14 silence view** during quiet periods. Filing creates the Application + immutable Event; **deadlines compute** (IX-3.1). Register polling → Events → recompute → notify (IP-13/18). **Responding: IP-20** — status + response deadline + **agent-uploaded filed response** + honest "agent handling off-platform" copy; **no prosecution workspace** `[DL:D-2026-016]`. **"Closed" never without its reason** `[P4:§11.3]`. **Error:** register unavailable → IP-18; conflict → Docket Ops, honest human-checked position `[§20.3]`. `[P5:F16/F19/§9-A]` `[P4:§15.3/§19.4]` `[DL:D-2026-016]`. **V2:** in-product examination-response authoring; renewals; monitoring.

### IX-O.9 · Action queue (Home)
- **Interaction:** four fixed regions in order — **Needs you** (what·why·by when·one action) → **Waiting on others** → **Recently changed (7d)** → **Portfolio at a glance** `[P4:§18.1]`; sort by deadline proximity then criticality `[P4:§13.4]`; **IP-12** whose-turn is the core *Needs you* vs *Waiting on others* split. First-run empty → **Record your first invention** `[P4:§19.1]`. `[P5:F20]` `[P4:§18.1]`. **V2:** monitoring widgets.

### IX-O.10 · Notifications centre & Settings
- **Notifications:** **IP-13** (grouped by class; Critical unmutable/undismissable-without-action; proactive-reassurance). **Settings:** section-nav form groups; destructive actions isolated `[P4:§14.2]`; **Critical class unmutable, stated here** `[P4:§18.2]`; support impersonation visible in the access log `[BR-16]`; data export/retention/deletion. `[P5:F18]` `[P4:§18.2/§14.2]`. **V2:** enterprise SSO; residency selector (L7 `[LEGAL CONTENT SLOT]`).

### IX-O.11 · Public search & document
- **Interaction:** ungated Zone-2 search (SC-P02) visually/behaviourally distinct from app search `[P4:§13.1]`; **FR-S11 own-invention warning** routes to the Vault `[P4:§4.2]`; document page (SC-P03) with source/freshness per field, AI plain-language summary **labelled** `[P3:§12.3 r5]`, alert/save via **IP-04**. **Error:** IP-18 (cached + staleness), zero-results → what/why/one-adjustment/one-path `[P4:§19.2]`. `[P5:F1/F13]` `[P4:§4/§13]`. **V2:** monitoring overlays.

### IX-O.12 · Cost Planner & Pricing
- **Interaction:** ungated Cost Planner (SC-P07) — live 20-year projection via **IP-21**, **no email gate** `[IA-8/FR-C01]`; Pricing (SC-P06) real published numbers via IP-21. **Error:** IP-17 (Rules Engine unavailable → last-known + freshness, never a hardcoded fee). Official fees always separable `[P4:§21.1]`; banned price language `[P4:§10.3]`. `[P5:F1]` `[P4:§4/§21]`. **V2:** multi-currency.

### IX-O.13 · Context switching
- **Interaction:** **IP-22** — explicit switcher for multi-role actors; one context at a time; no blending (confidentiality, not preference) `[P4:§2.3/P6]`. `[P5:§3]`. **V2:** none.

---

## 6. Client vs Agent rhythm separation (kept distinct by design)

| Dimension | Client rhythm | Agent rhythm |
|---|---|---|
| Language | Plain-language leads; term-of-art in same view `[P4:§10.1/IA-3]` | Professional term-of-art (FR/office/docket) `[P4:§10.2]` |
| Emotional job | Calm, transparent, anti-anxiety (silence view, whose-turn) `[Philosophy §5]` | Operational throughput (Today, docket, review queue) `[P3:J7]` |
| Prosecution | **None in-product; Responding is status-only** `[DL:D-2026-016]` | Works off-platform, uploads (IP-20); drafting/prosecution workspaces are V2 |
| Deadlines | View + trace; cannot confirm criticals | Confirms criticals (IP-11); full docket + governing Rule |
| Review | Never sees the queue; never contacts the reviewer `[A2]` | Review queue is a distinct destination + rhythm (IX-2.4/2.5) |
| Home | Action queue (Needs you / Waiting on others) | Today (risk-ranked, incl. review items) |

The two are **never merged**; a multi-role actor switches via IP-22 `[P5:§12.7]`.

---

## 7. Design slots surfaced in WP-3 (no value invented)

| # | Slot | Interactions | Authority |
|---|---|---|---|
| S-1 | Committed review turnaround | IX-1.4/1.5, IP-05 | ADR §9 |
| S-2 | Assessment confidence representation | IX-1.7/1.9 | AP-08, §12.3.4 |
| S-3 | Agent-stat confidence-indicator representation | IX-O.5 | D-2026-019 |
| S-4 | L1 pricing rendering (component primary, both modes) | IX-O.6/O.12, IP-21 | O-2026-001 |
| S-5 | Expected-next-event range (silence) | IX-3.6, IP-14 | Rules Engine/field timelines |
| S-6 | L6 post-engagement retention window | (access revocation) | Phase 3 §26.1 L6 |
| S-7 | Per-class default channel preferences (where §16.2 unset) | IX-3.3, IP-13 | Phase 3 §16.2 |
| S-8 | Edit-session idle timeout | IX-1.1, IP-03 | not specified |
| S-9 | Agent verification turnaround | IX-2.1 | not specified (no invented SLA) |
| S-10 | Client MFA policy | IX-O.1 | Phase 4 §2.3 (agent/internal fixed) |
| S-11 | Legal content (UPL/privilege/residency/advertising/contracting) | IX-O.6/O.10/O.12, IP-21 | L1-06/20, L2/L3/L4/L7 |

No slot is filled with a guessed value.

---

## 8. Flags & deferred decisions surfaced in WP-3

| # | Item | Where | Disposition |
|---|---|---|---|
| F-1 | Sequential-edit handoff (soft-lock) designed per authorization; a single-designated-editor restriction would be a permission change | IX-1.1, IP-03 | Designed as authorized; escalate only if a designated-editor restriction is intended (not designed here) |
| F-2 / DR-01 | Role permitted to record a **not-file Decision** — baseline undetermined | IX-1.13, IP-10 | **Deferred Decision Register (DR-01)** — interaction designed **permission-agnostic**; no role asserted; not decided |
| F-3 | **Duplicate handling on docket import** — de-duplication of imported vs later platform matters is not specified by the baseline | IX-2.2 | **Deferred Decision Register** — not invented; recorded as a genuine question |

No other WP-3 item requires a new decision; all other unknowns are design slots (§7) or already-decided constraints.

---

## 9. Traceability summary (interaction → baseline)

| Interaction cluster | Patterns | P5 | P4 | P3/ADR/DL |
|---|---|---|---|---|
| P1 Disclosure capture (IX-1.1–1.3) | IP-01/02/03 | F3/F4 | §5/§15.1/§11.2 | M1.2, FR-D02/D03, §12.1, D2, BR-20; D-2026-015(A3) |
| P1 Assessment request/wait (IX-1.4/1.5) | IP-05 | F5/F6/§8-E | §13.1/§16 | ADR §4/§7/§9, D5, FR-A10; D-2026-017 |
| P1 Release & verdicts (IX-1.6–1.11) | IP-07/08/09 | F6/F9/F10/§9-C | §15.2/§16/§11.6 | BR-01/02/20, FR-A07, §12.5, AP-08/10 |
| P1 Decisions (IX-1.12/1.13) | IP-10/21 | F10/F11/X13 | §17.2 | BR-09, ADR §7; **F-2 deferred** |
| P2 Onboarding/import (IX-2.1/2.2) | IP-06 | F21/F22 | §6/§6.1/§19.1 | M2.1/M4.3, D1, ICP-2, §26 D6; **F-3** |
| P2 Review (IX-2.4–2.7) | IP-06/07/08/16/19 | F7/F8/F23/§8-C/§8-D/§8-J | §6.1/§17.2/AT-5 | BR-01/02/05(notice), ADR §5/§6/§9, §12.5, FR-A08; D-2026-018 |
| P3 Deadlines (IX-3.1/3.2) | IP-09/11 | F16/F19/X9 | §11.5/§12.5/§16.1 | BR-03/BR-13, §20.3, D1, AP-07 |
| P3 Notifications/escalation (IX-3.3–3.5) | IP-13 | F18/§8-F/§8-G/X10 | §18.2/§8 | §16, J9, NFR-C01; Metrics OP-5/D-2026-018 |
| P3 Silence (IX-3.6) | IP-14 | F19 | §19.4/IA-9 | — |
| Other: matching/engagement (IX-O.5/O.6) | IP-10/21 | F14/F15/§8-H/§8-K | §5/§21/§11.4 | M1.5, BR-06/10/17, P6/D4; D-2026-019, O-2026-001 |
| Other: matter/tracking/Responding (IX-O.7/O.8) | IP-12/14/16/20 | F16/F17/F19/§9-A | §15.4/§15.3/§11.3 | M1.6, BR-09/T3, ADR §11; D-2026-016 |
| Other: home/notifs/settings (IX-O.9/O.10) | IP-12/13 | F18/F20 | §18.1/§18.2/§14.2 | §16, BR-16 |
| Other: public/cost/pricing (IX-O.11/O.12) | IP-04/17/18/21 | F1/F13 | §4/§13/§21 | FR-S01/05/11, FR-C01, BR-14, §12.3 |
| Other: context switch (IX-O.13) | IP-22 | §3 | §2.3 | P6 |

---

*End of Phase 6 — WP-3 Interaction Design v0.1. WORKING DOCUMENT — owner review required. Do not proceed to WP-4 without approval.*



