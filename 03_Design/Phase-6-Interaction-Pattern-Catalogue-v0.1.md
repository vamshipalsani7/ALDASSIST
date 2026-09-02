# Phase 6 — Interaction Pattern Catalogue

**FROZEN — PHASE 6 BASELINE (v0.1) · 1 SEPTEMBER 2026 · REPOSITORY OWNER (VAMSHI)**

> **Freeze notice — Phase 6 (UX & Interaction Design), 1 September 2026.** This document is part of the Phase 6 baseline, declared **frozen on 1 September 2026 by the repository owner (Vamshi)**; recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-020). Frozen at version v0.1. **DR-01 and DR-02 remain explicitly deferred** (see `Phase-6-Deferred-Decision-Register-v0.1.md`). As with every frozen document, it is not modified without an explicit architectural decision; where superseded, a historical notice is added rather than the content rewritten. This notice records the freeze and changes no design substance. *(Supersedes the working-document status noted below.)*

**Phase:** 6 — UX & Interaction Design · **Companion to:** WP-3 Interaction Design v0.1
**Type:** Working document (not frozen). Version v0.1.
**Date:** 1 September 2026
**Inputs:** WP-1 (journeys/nav/IA) · WP-2 (screen inventory) · frozen baseline (Phase 3 PRD, Phase 4 IA, Phase 5 User Flows, ADR, Decision Log, Architecture Principles).

> **Purpose.** Reusable interaction patterns referenced by the WP-3 interaction specs so shared behaviour is defined once. Each pattern is either derived from the baseline or is a legitimate Phase-6 interaction-design choice within existing rules. **No product state, permission, legal wording, pricing/SLA/statistical/confidence value is invented.** Unspecified values are **`[DESIGN SLOT: …]`**; legal text is **`[LEGAL CONTENT SLOT: Lx]`**.

**Trace vocabulary:** `[P5:Fn]` `[P5:Xn]` `[P5:§…]` `[P4:§…]` `[P3:§…]` `[P3:BR-…]` `[P3:FR-…]` `[ADR:§…]` `[DL:D-…]` `[AP-…]` `[WP1:§…]` `[WP2:SC-…]`.

**How WP-3 uses these:** a spec field may read "Waiting: **IP-05**" instead of repeating the pattern. A pattern governs; a screen may add screen-specific behaviour but may not contradict the pattern.

---

## Index

| ID | Pattern | Primary authority |
|---|---|---|
| IP-01 | Save-and-resume | P5:F4 · P3:M1.2 |
| IP-02 | Immutable-version creation | P3:FR-D02 · BR-20 · P5:X4 |
| IP-03 | Sequential edit lock (soft-lock) | DL:D-2026-015(A3) · P3:§4.1 · P4:§17.2 |
| IP-04 | Account gate / return-to-intent | P5:F2 · P4:IA-8 |
| IP-05 | Async assessment waiting | ADR:§4/§9 · P3:D5 · P5:F6 |
| IP-06 | Review queue assignment | ADR:§5 · P5:F7 |
| IP-07 | Provenance drill-down | P3:BR-02 · P4:§16 · P5:X2 |
| IP-08 | Provenance failure (fail-safe) | P3:BR-02 · P5:F9/X2 |
| IP-09 | Three-depth progressive disclosure | P4:§16 · AP-08 |
| IP-10 | Decision confirmation (high-consequence) | P3:BR-09 · P5:X13 |
| IP-11 | Deadline confirmation | P3:BR-03/BR-13 · P5:X9 |
| IP-12 | Whose-turn indicator | P5:principle 4 · P4:§11.1/§18.1 |
| IP-13 | Notification acknowledgement | P3:§16 · P4:§18.2 |
| IP-14 | Silence / expected-next-event | P4:§19.4/IA-9 · P5:F19 |
| IP-15 | Permission-denied (same tenancy) | P4:§17.1/§19.3 · P5:X13 |
| IP-16 | Cross-tenancy 404 | P4:IA-5/§19.3 · P5:X7 |
| IP-17 | Rules Engine unavailable | P3:BR-14 · P4:§19.3 |
| IP-18 | External-source stale data | P3:NFR-A05 · P5:F1/F19 |
| IP-19 | Agent review diff / edit | P3:FR-A08 · M4.2 · ADR:§4 |
| IP-20 | Filed-response upload (Responding) | DL:D-2026-016 · P5:§9-A |
| IP-21 | Pricing component rendering | P4:§21 · IA-7 · DL:O-2026-001 |
| IP-22 | Context switching | P4:§2.3 · P5:§3 |

---

## IP-01 · Save-and-resume
- **Goal:** the user can leave any long capture and return with nothing lost.
- **Applies:** Disclosure capture (SC-C03), guided flows (AT-4), onboarding (SC-A00).
- **Trigger:** navigation away, session end, or explicit "save & exit."
- **Behaviour:** every field group autosaves on blur/step-advance; an explicit "Saved · HH:MM" affordance is always visible; leaving surfaces a non-blocking "saved — resume anytime" note; the object appears in *Recently changed* and its index with a **Resume** affordance `[P5:§8-B]`; a gentle resume notification may follow (Progress class, never Critical) `[P5:F4]`.
- **States:** object holds in *Drafting* (Invention) or equivalent in-progress state; no state is invented for "paused."
- **Error/recovery:** save failure → retain local unsaved input, show "not yet saved — retry," never discard silently.
- **Accessibility:** save status announced politely to AT; resume affordance keyboard-reachable.
- **Constraints:** pairs with IP-02 (each save = immutable version). Never blocks exit.
- **Trace:** `[P5:F4]` `[P5:§8-B]` `[P3:M1.2]` `[WP2:SC-C03]`.

## IP-02 · Immutable-version creation
- **Goal:** make the record trustworthy — every meaningful save is a permanent, timestamped version.
- **Applies:** Disclosure (SC-C03/05); events across the record.
- **Trigger:** a save that changes Disclosure content.
- **Behaviour:** each save writes a new immutable, timestamped version `[P3:FR-D02]`; the version list is viewable (SC-C05); a version **referenced by a released Assessment or a filed Application becomes locked** and is marked immutable `[BR-20]`; corrections are new versions, never edits `[P5:X4]`.
- **Empty:** none.
- **Error/recovery:** version-write failure → treat as save failure (IP-01), do not present unsaved content as versioned.
- **Accessibility:** version timestamps are real text, not colour/badge-only.
- **Constraints:** never mutate or delete a prior version; Zone 1 throughout `[P3:D2]`/`[P5:X11]`.
- **Trace:** `[P3:FR-D02]` `[P3:BR-20]` `[P5:X4]` `[WP2:SC-C03/C05]`.

## IP-03 · Sequential edit lock (soft-lock)  — F-1 authorized model
- **Goal:** honour A3 (one editing owner at a time, sequential, not concurrent) without inventing concurrency, takeover, a designated-editor role, or a consent model `[DL:D-2026-015 A3]`.
- **Applies:** Disclosure editing (SC-C03/05) where >1 edit-capable member exists.
- **Actors:** existing edit-capable Workspace roles — Owner/Admin/Member `[P3:§4.1]`/`[P4:§17.2]`. Viewer and non-member Named Inventors are view-only.
- **Trigger:** an edit-capable member opens a Disclosure for editing.
- **Behaviour:**
  1. If no active edit session exists, the opener acquires the **edit session** and edits normally (IP-01/IP-02).
  2. If another member holds an active session, the opener sees a **read-only view** with a clear notice: "Being edited by [name] · started [time]. You'll be able to edit when they finish." **No takeover control is offered while the session is active.**
  3. The session releases when the holder saves-and-leaves or explicitly ends editing. **[Phase-6 proposed interaction — not a baseline requirement]** the session *may also* be released automatically after the holder has been idle for **`[DESIGN SLOT: edit-session idle timeout]`**; both the automatic-idle-release behaviour and its timeout are a Phase-6 proposal for owner confirmation, not an established system requirement. On release, the object is editable by the next member who opens it.
  4. On release after idle, the released holder's already-saved content persists as versions (IP-02); only the live session ends.
- **States:** no new object state; "being edited" is a transient session property, not an Invention/Disclosure lifecycle state `[P5:X8]`.
- **Empty:** first editor ever → straight to editing.
- **Error/recovery:** if the holder's connection drops, the idle timer governs release; the returning holder resumes if still within the window, else re-acquires if free.
- **Whose-turn:** the read-only notice names who holds the session.
- **Accessibility:** the "being edited by" status is text (not colour), announced on load; the read-only state is programmatically conveyed.
- **Constraints:** **no concurrent editing; no takeover while active; no new designated-editor role; no consent model** `[DL:D-2026-015 A3]`. **`[FLAG F-1: if any implementation detail requires restricting edit to a single designated editor beyond §4.1 roles, that is a permission change — STOP and flag, do not design it here.]`**
- **Trace:** `[DL:D-2026-015 A3]` `[P5:§9-B/F4]` `[P3:§4.1]` `[P4:§17.2]` `[WP1:§8.4]` `[WP2:SC-C03]`.

## IP-04 · Account gate / return-to-intent
- **Goal:** gate only at ongoing value, and never lose the user's intent.
- **Applies:** save search/alert, start Disclosure (SC-P02/03/16).
- **Trigger:** an action requiring an account.
- **Behaviour:** capture the intended action; present minimal sign-up (email + verify; **no phone/sales**) `[P3:J1]`; on verification, **return the user to the exact action** `[P5:F2]`; email-already-registered → route to sign-in preserving intent; **no Workspace is created here** (A1) `[DL:D-2026-015]`.
- **Empty/Error:** verification incomplete → action held; account inert until verified; resend offered `[P5:F2 failure]`.
- **Accessibility:** focus moves to the resumed action on return; verification status announced.
- **Constraints:** free surfaces stay ungated `[P4:IA-8]`.
- **Trace:** `[P5:F2]` `[P4:IA-8]` `[DL:D-2026-015 A1]` `[WP2:SC-P16]`.

## IP-05 · Async assessment waiting
- **Goal:** honest, off-screen waiting through two distinct stages (automated analysis, then human review) with no false immediacy.
- **Applies:** Assessment request/lifecycle (SC-C06/C08), Home queue.
- **Trigger:** assessment requested → *Analysing*.
- **Behaviour:**
  1. Tell the user they'll be notified; **no on-screen wait required** `[P3:D5]`.
  2. Show two clearly separated stages: **Analysing** (automated) and **In review** (human, with a **committed turnaround**) — never conflated `[ADR:§9]`. Optional "watch progress" reveals intermediate analysis findings `[P3:FR-A10]`.
  3. Whose-turn = platform (Analysing) then reviewer (In review) — never the client (IP-12).
  4. Expected time for the review stage = **`[DESIGN SLOT: committed review turnaround]`**; the retired "hours/seconds" language is banned `[P4:§10.3]`.
  5. On saturation, show an **honest updated wait estimate**; review is never skipped `[ADR:§9]`/`[P5:§8-E]`.
- **States:** Assessment *Requested → Analysing → In review*; Invention *Assessing* `[ADR:§4]`.
- **Empty:** the Assessment screen (SC-C08) shows lifecycle + whose-turn + expected turnaround, never a blank or a partial verdict.
- **Error/recovery:** analysis can't start → holds in *Requested*, "queued, not lost," retry `[P5:F5 failure]`; reviewer unavailable → reassignment (IP-06), client still sees *In review* `[P5:§8-D]`.
- **Notification:** release fires a verdict-ready notification (IP-13).
- **Constraints:** **no verdict shown before human release** `[BR-01]`/`[P5:X1]`; no invented turnaround.
- **Trace:** `[ADR:§4/§9]` `[P3:D5/FR-A10]` `[P5:F5/F6/§8-E]` `[WP2:SC-C08]`.

## IP-06 · Review queue assignment / reassignment
- **Goal:** route a completed analysis to a domain-matched, conflict-free reviewer, and recover cleanly if a reviewer drops.
- **Applies:** agent Reviews (SC-A06/07), assessment lifecycle.
- **Trigger:** analysis completes → *In review*.
- **Behaviour:** item enters the **domain-filtered** queue `[ADR:§5]`; a conflicted agent never sees it `[ADR:§5]`; a reviewer takes it (or the system routes it) and receives a **review grant** (IP-07 access is scoped); decline/timeout/unavailability → **grant expires, item requeues, new reviewer assigned**, and the client continues to see *In review* — not an error, not a reset `[P5:§8-D]`.
- **States:** Assessment stays *In review* across reassignment `[P5:§7]`.
- **Whose-turn:** reviewer (never client).
- **Constraints:** **no new reviewer permission model**; queue is the source of truth `[ADR:§5]`; reviewer capacity is a distinct monitored pool `[ADR:§9]`.
- **Trace:** `[ADR:§5/§9]` `[P5:F7/§8-D]` `[WP2:SC-A06/A07]`.

## IP-07 · Provenance drill-down
- **Goal:** make every AI-derived assertion traceable to its exact source in ≤ two interactions.
- **Applies:** Assessment detail (SC-C08), review workspace (SC-A07), any AI-derived content.
- **Trigger:** user reaches depth 2 (reasoning) or depth 3 (evidence) (IP-09).
- **Behaviour:** every assertion carries a **visible, primary citation affordance** (not a footnote marker) `[P4:§15.2]`; activating it opens the **exact cited passage** in the source document `[P3:BR-02]`; the full reference list and the coverage statement are reachable at depth 3; AI-authored vs human-authored content is visually and structurally distinguishable, including in exports `[P3:§12.3 r5]`.
- **Accessibility:** citation links have descriptive names ("Cited passage in US 9,876,543, ¶42"), not "[1]" `[P4:§22.3]`.
- **Constraints:** if a citation cannot resolve → IP-08 (never shown as verified).
- **Trace:** `[P3:BR-02]` `[P4:§16/§15.2]` `[AP-04/AP-08]` `[WP2:SC-C08/A07]`.

## IP-08 · Provenance failure (fail-safe)
- **Goal:** never present an unverifiable claim as fact.
- **Applies:** anywhere IP-07 applies.
- **Trigger:** a citation fails to resolve at render/review time.
- **Behaviour:** the affected assertion is **not displayed as verified**; it is withheld or clearly marked unverifiable, never shown as established fact `[P5:X2]`/`[P5:F9 failure]`; a provenance-integrity event is recorded for ops `[P3:§25]`; in the review workspace the reviewer is alerted so they can resolve or drop the assertion before release.
- **Constraints:** **absolute** — "if it can't be linked, it isn't displayed as fact" `[AP-04]`. No fallback to model parametric knowledge `[P3:§12.3 r2]`.
- **Trace:** `[P3:BR-02]` `[P5:X2/F9]` `[AP-04]` `[WP2:SC-C08]`.

## IP-09 · Three-depth progressive disclosure
- **Goal:** conclusion first, reasoning on one interaction, evidence on two — identical across object types `[P4:§16]`.
- **Applies:** Assessment, Deadline, Cost, Agent recommendation, Renewal (V2).
- **Behaviour:** **Depth 1 (State)** visible on load and understandable alone; **Depth 2 (Reasoning)** one interaction away; **Depth 3 (Evidence)** two interactions away, **always reachable, only nested** `[P4:§16]`. Depth 1 never requires depth 2 to be understood; depth 3 is never removed.
- **Empty:** a depth with no content states why (e.g. "no blocking references").
- **Constraints:** on an **unfavourable** verdict the coverage statement (depth 3) is **never collapsed by default** `[P4:§15.2]`; depth is available, never imposed `[P4:IA-4]`.
- **Trace:** `[P4:§16/IA-4]` `[AP-08]` `[WP2:SC-C08/C11/C13]`.

## IP-10 · Decision confirmation (high-consequence)
- **Goal:** every legally/financially consequential action is a deliberate, recorded human choice.
- **Applies:** decide to file, decide not to file (SC-C09), engage/pay (SC-C19), abandon (V2), filing (agent).
- **Trigger:** user initiates a consequential action.
- **Behaviour:** present what will happen, what it costs (via IP-21 where money is involved), and what is reversible; require explicit confirmation; write a **Decision entity with actor + rationale** `[P3:BR-09]`; **no AI output is the sole basis** `[BR-09]`; permission boundaries route, never auto-escalate `[P5:X13]`.
- **Recovery:** not-file is reversible later (the Invention persists and can proceed to file) `[P5:F10 alt]`; pre-filing actions state that no deadline exists yet where true `[P4:§19.3]`.
- **Constraints:** engage/pay = Owner only `[P4:§17.2]`; the **role permitted to record a not-file Decision is governed by DR-01 (deferred)** — the not-file interaction is designed **permission-agnostic** and asserts no specific role until DR-01 is resolved (see the Deferred Decision Register).
- **Trace:** `[P3:BR-09]` `[P5:F10/F11/X13]` `[P4:§17.2]` `[WP2:SC-C09/C19]`.

## IP-11 · Deadline confirmation
- **Goal:** treat deadlines as safety-critical; a critical deadline advances only with system + human confirmation.
- **Applies:** agent docket (SC-A02), deadline detail (SC-C13), ops (SC-O01).
- **Behaviour:** the Deadline Engine computes the date from versioned rules and exposes its **trace** (rule, version, trigger, calendar adjustment, extensions) `[BR-13]`; a **critical deadline requires human confirmation before the Matter advances past it** `[BR-03]`/`[P5:X9]`; confirmation is recorded (state → *Confirmed*) `[P4:§11.5]`; history is never silently modified or deleted `[AP-07]`.
- **Whose-turn:** the confirming actor (agent/ops), shown explicitly.
- **Error/recovery:** source/computation conflict → routes to Docket Ops; client sees the honest human-checked position, not an auto-flip `[P3:§20.3]`.
- **Constraints:** **no invented durations** — all from the Rules Engine `[D1]`; criticality shown with icon+text+colour, never colour-only `[P4:§22.3]`.
- **Trace:** `[BR-03/BR-13]` `[P5:X9]` `[AP-07]` `[WP2:SC-A02/C13/O01]`.

## IP-12 · Whose-turn indicator
- **Goal:** every waiting state names who is acting and roughly when — the anti-silence backbone.
- **Applies:** everywhere a state implies waiting (assessment, matter, application, deadlines).
- **Behaviour:** show the **attention axis independently of the lifecycle axis** `[AP-14]`; label the actor ("with the reviewer," "awaiting the office," "needs you," "nothing needed") `[P4:§11.4/§18.1]`; on Home, *Needs you* vs *Waiting on others* is the core split `[P4:§18.1]`; where an estimate exists it is shown honestly (slot, never invented).
- **Constraints:** two-axis status always visible, never merged `[AP-14]`; no fake urgency `[Philosophy §5]`.
- **Trace:** `[AP-14]` `[P4:§11.1/§18.1]` `[P5:principle 4]` `[WP2:SC-C01/C11/C15]`.

## IP-13 · Notification acknowledgement
- **Goal:** the right message on the right channel; Critical always reaches a human or escalates.
- **Applies:** all surfaces; notification centre (SC-C21/A14).
- **Behaviour:** classes are fixed — Critical / Action required / Progress / Informational / Proactive-reassurance `[P3:§16.2/16.3]`; grouped by class, not chronologically `[P4:§18.2]`; **Critical cannot be dismissed without acknowledgement/action and cannot be muted** (stated at onboarding) `[P4:§18.2]`; per-class default channels where §16.2 leaves them unset = **`[DESIGN SLOT]`**.
- **Error/recovery:** **Critical undeliverable on all channels → Docket Health Console + Docket Ops paged**; human contact trail `[P3:§16.5]`/`[P5:§8-F]`/`[P5:X10]`.
- **Constraints:** proactive-reassurance fires even when nothing happened `[P3:§16.3]`.
- **Trace:** `[P3:§16]` `[P4:§18.2]` `[P5:F18/§8-F/X10]` `[WP2:SC-C21]`.

## IP-14 · Silence / expected-next-event
- **Goal:** turn quiet periods into clarity, not anxiety — the signature emotional surface.
- **Applies:** Application detail status tab (SC-C11); Home *Waiting on others*.
- **Behaviour:** render the **silence view** `[P4:§19.4]`: "Nothing has happened — and that's expected," the last known event with source/freshness, an **honest expected range for the next event** (= **`[DESIGN SLOT: expected-next-event range, derived from Rules Engine/field timelines]`**), an explicit "nothing is required from you," "we're monitoring daily," and two explainer links.
- **Constraints:** silence is a **designed** state, never a blank screen `[P4:IA-9]`; no fake urgency or countdown `[Philosophy §5]`.
- **Trace:** `[P4:§19.4/IA-9]` `[P5:F19]` `[WP2:SC-C11]`.

## IP-15 · Permission-denied (same tenancy)
- **Goal:** within a tenancy, a lacking permission is explained, never silently hidden.
- **Applies:** Members hitting costs/billing/engage; Viewers editing.
- **Behaviour:** show **visible-but-locked** with the reason and who can grant/act `[P4:§17.1]`; route a Member's file intent to **request Owner action** — **never auto-escalate** `[P5:X13]`.
- **Constraints:** distinct from cross-tenancy (IP-16); no silent escalation.
- **Trace:** `[P4:§17.1/§19.3]` `[P5:X13]` `[WP2:SC-C09/C16/C19]`.

## IP-16 · Cross-tenancy 404 (invisibility)
- **Goal:** existence across a tenancy boundary is itself confidential.
- **Applies:** all surfaces; reviewer boundary (SC-A07), agent matters.
- **Behaviour:** an object outside the actor's tenancy or grant is **invisible — 404 "does not exist," no stub, no count, no locked placeholder** `[P4:IA-5/§19.3]`/`[P5:X7]`; a review-grant boundary-violation attempt is **denied and audited** `[P5:§8-J]`.
- **Constraints:** absolute; applies to reviewers (narrower than engaged agents) `[ADR:§6]`.
- **Trace:** `[P4:IA-5]` `[P5:X7/§8-J]` `[WP2:SC-A07]`.

## IP-17 · Rules Engine unavailable
- **Goal:** never show a fabricated fee/date if the Rules Engine is unreachable.
- **Applies:** Pricing (SC-P06), Cost Planner (SC-P07), Costs (SC-C16), deadlines.
- **Behaviour:** show **last-known value with a freshness stamp**, or an honest "temporarily unavailable"; **never a hard-coded fallback fee** `[BR-14]`; official fees always separately identifiable when shown `[P4:§21.1]`.
- **Constraints:** official fees derive from the Rules Engine only `[BR-14]`.
- **Trace:** `[P3:BR-14]` `[P4:§19.3/§21.1]` `[WP2:SC-P06/07/C16]`.

## IP-18 · External-source stale data
- **Goal:** register/office unavailability degrades gracefully, never to an error page.
- **Applies:** public search/document (SC-P02/03), application tracking (SC-C11), alerts.
- **Behaviour:** show **cached data with an explicit staleness stamp** `[P3:NFR-A05]`; alerts fire on detected change; staleness disclosed on the underlying page `[P5:F13/F19]`.
- **Trace:** `[P3:NFR-A05]` `[P5:F1/F19]` `[WP2:SC-P02/C11]`.

## IP-19 · Agent review diff / edit
- **Goal:** capture reviewer edits as structured diffs feeding quality metrics, without weakening the gate.
- **Applies:** review workspace (SC-A07).
- **Behaviour:** the reviewer edits assertions in the work pane; edits are captured as **structured diffs** `[P3:FR-A08]` used for OP-6 (materiality per `[DL:D-2026-018]`, not re-defined here); the released verdict reflects the reviewer's judgement, not the AI draft `[P5:§8-C]`; the reviewer may mark **Inconclusive** with what's missing `[P4:§11.6]`.
- **Constraints:** provenance preserved on edited assertions (IP-07/08); **hunt false negatives** `[P3:§12.5]`; no bypass `[BR-01]`.
- **Trace:** `[P3:FR-A08/M4.2/§12.5]` `[ADR:§4]` `[DL:D-2026-018]` `[WP2:SC-A07]`.

## IP-20 · Filed-response upload (Responding, status-only)
- **Goal:** let the agent record the off-platform filed response without building prosecution tooling.
- **Applies:** Application detail at *Responding* (SC-C11), agent matter (SC-A05).
- **Behaviour:** the *Responding* status is displayed with the **examination-response deadline tracked by the Deadline Engine** `[AP-07]`; copy honestly states the **agent is handling drafting/prosecution off-platform** `[DL:D-2026-016]`; the agent **uploads the filed response artifact** into the matter/application (document management, IP-nothing-new); on office action, tracking advances via IP-18 polling.
- **Constraints:** **STATUS-ONLY — no in-product prosecution workspace, no response authoring** `[DL:D-2026-016]`/`[P5:§9-A/§10]`.
- **Trace:** `[DL:D-2026-016]` `[P5:§9-A]` `[AP-07]` `[WP2:SC-C11/A05]`.

## IP-21 · Pricing component rendering
- **Goal:** one price component renders every price in one of two configured modes; official fees always separable.
- **Applies:** every surface showing money `[P4:IA-7]`.
- **Behaviour:** render via **PriceDisplay** in **component mode (primary direction) or bundled mode**; both supported; switching modes changes **no route/template/nav/hierarchy — only rendering** `[P4:§21.1]`/`[DL:O-2026-001]`; **official fees always separately identifiable** at depth 1 or 2 `[P4:§21.1]`; each component carries a jurisdiction/entity-type basis and a disclosure content slot = **`[LEGAL CONTENT SLOT: L1]`**.
- **Constraints:** legally OPEN — do not close O-2026-001; no screen composes its own price logic `[P5:X12]`; official fees from the Rules Engine `[BR-14]`.
- **Trace:** `[P4:§21/IA-7]` `[DL:O-2026-001]` `[P5:X12]` `[WP2:SC-P06/C16/C19]`.

## IP-22 · Context switching
- **Goal:** a multi-role actor works one context at a time; contexts never blend.
- **Applies:** users holding roles on >1 surface (e.g. agent who is also an inventor).
- **Behaviour:** an explicit **context switcher** selects the surface; only one context is active `[P4:§2.3]`; no data or navigation bleeds across contexts `[P5:§3]`; the switcher appears only for multi-role users.
- **Constraints:** context isolation is a **confidentiality requirement (P6), not a preference** `[P4:§2.3]`.
- **Trace:** `[P4:§2.3]` `[P5:§3]` `[WP2:SC-A14]`.

---

*End of Interaction Pattern Catalogue v0.1. Working document — owner review required.*
