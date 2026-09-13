# Phase 8 — UI Kickoff Audit

**Type:** Analysis / readiness audit (not a frozen document, not an implementation)
**Prepared:** 3 September 2026
**Baseline audited:** GitHub commit `e0f8caf — Freeze Phase 6 and Phase 7 design baselines`
**Workflow position:** DISCUSS → **DECIDE** → DOCUMENT → VERIFY → IMPLEMENT → REVIEW → COMMIT — this audit sits at DISCUSS/DECIDE. No UI code is written. No file in the repository is modified. Nothing is committed.

> **Scope note.** This document is an audit and a set of recommendations for owner decision. It invents no architectural decision, resolves no deferred/open item, and treats every frozen Phase 6 / Phase 7 statement as authoritative and unmodifiable. Where it recommends, it presents options and trade-offs and marks the choice as **[OWNER DECISION — Phase 8]**, per the repository's decision-making discipline.

---

## 0. Baseline verification

The working tree was audited at the clean baseline requested. The reflog (`.git/logs/HEAD`) shows exactly three substantive commits, with `HEAD` currently at the requested freeze point:

| # | Commit | Message |
|---|---|---|
| 1 | `271036b` | Repository governance baseline v1.0 |
| 2 | `5878218` | Finalize Phase 5 governance and freeze |
| 3 | **`e0f8caf`** | **Freeze Phase 6 and Phase 7 design baselines** ← HEAD |

Working-tree file modification times all predate or match the freeze commit; no evidence of post-freeze drift in the audited documents. The baseline is treated as clean. (A live `git status` could not be run from this session; verification is by reflog + file inventory. The one residual item to confirm on-device is that `git status` reports a clean tree — see §6.)

---

## 1. Current repository structure and implementation readiness

### 1.1 What the repository is today

ALDASSIST is, at `e0f8caf`, a **documentation and design repository** — strategy, product architecture, UX, and a design system. It contains **no application code, no framework, no build tooling, no `04_Development/` content** (that folder holds only a README). This is expected and correct: Phase 8 (UI) has not started, and the frozen Phase 6/7 documents explicitly forbid having started it.

```
ALDASSIST/
├── 01_Strategy/        Architecture Principles (canonical), Decision Log, Roadmap (canonical status),
│                       Glossary (canonical vocab), Metrics, Assumptions, Phase 1–2, Product Vision/Philosophy
├── 02_Product/         Phase 3 PRD, Phase 4 IA, Phase 5 User Flows, Assessment-Lifecycle ADR
├── 03_Design/          Phase 6 (FROZEN v0.1): WP-1…WP-5, Interaction Pattern Catalogue, Deferred Decision Register
├── 03_DesignSystem/    Phase 7 (FROZEN v0.1): Design System, Design Tokens, Component Catalogue, Design Governance
├── 04_Development/      (README only — empty; this is where Phase 8/9 would land)
├── 05_Research/ 06_Legal/ (L1 Register) 07_Marketing/ 08_Meetings/ 09_Governance/ (audits) 99_Archive/
├── alda/               Non-canonical recovery copies (marked _NON-CANONICAL-RECOVERY.md)
├── AGENTS.md / CLAUDE.md   Operating instructions (identical content)
├── PROJECT_CONTEXT.md  Orientation / authority map
└── README.md           Structure, conventions, workflow
```

### 1.2 Readiness posture

| Dimension | State | Readiness for Phase 8 |
|---|---|---|
| Strategy / principles | Complete, canonical (AP-01…AP-14 + Final Principle) | Ready — governs all UI |
| Product architecture (Phase 3), IA (Phase 4), Flows (Phase 5), ADR | Complete, frozen baseline | Ready — full behavioural spec |
| Phase 6 UX & Interaction | **Frozen v0.1** (1 Sep 2026, D-2026-020) | Ready — 62 screens, journeys, edge cases, responsive, foundations |
| Phase 7 Design System | **Frozen v0.1** (2 Sep 2026, D-2026-021); visual proposals **approved** | Ready — tokens, components, governance all owner-approved |
| Development scaffolding (`04_Development/`) | Empty | Expected empty — Phase 8 will create it |
| Legal content (L1–L7) | Open dependencies (counsel) | Not blocking structure; blocks final copy of some surfaces |
| Deferred owner decisions (DR-01, DR-02, O-2026-001) | Explicitly open | Not blocking — designed agnostically (see §5) |

**Bottom line:** the repository is a complete, internally consistent specification with zero code. Everything a UI phase needs to begin is present and frozen; the empty `04_Development/` folder is the correct blank slate.

### 1.3 Recorded, unresolved conflicts inherited (not to be silently fixed)

Three pre-existing conflicts are recorded in the baseline and are carried forward untouched (per CLAUDE.md: report, do not silently fix):

1. **"Marketplace" term** — D-2026-006 uses it for the business/regulatory model; ADR §13.8 reserves it for the future V2 licensing surface and names the MVP concept *Agent Matching / Engagement*. Both accepted; neither supersedes the other; recorded in the Glossary. **UI consequence:** the UI must use "Agent Matching / Engagement," never "Marketplace" (CR-16) — so for UI purposes this conflict is already operationally resolved in the design layer.
2. **Roadmap Milestone M1** still reads `Next: Phase 5` (historical point-in-time record, governed by Decision L; left unmodified).
3. **Phase 4 §3 vs §6/§12.4** — the IA §3 overview omits `/agent/reviews`; §6/§12.4 are authoritative and govern. **UI consequence:** Reviews is a top-level agent destination.

None of these blocks Phase 8; all are already handled in the frozen design layer.

---

## 2. Phase 8 scope and explicit exclusions

### 2.1 What Phase 8 IS (per the frozen handoff — WP-5 Part E.3, Phase 7 STEP-15 §9)

Phase 8 = **UI**: turn the frozen Phase 6 UX/interaction specification and the frozen Phase 7 design system into an actual, running user interface. Concretely, in scope:

- A front-end application implementing the **62 MVP screens** (§3) across four surfaces (Public, Client, Agent, Ops subset).
- A **component library** implementing the Phase 7 Component Catalogue (40+ base components + 15 high-stakes patterns), consuming the token system.
- A **token implementation** (foundation → semantic → component) mapped from `Phase-7-Design-Tokens-v0.1.md`.
- **Responsive-web** behaviour per WP-4 Part B / Phase 7 Part M (four breakpoints; bottom-bar nav; two-pane→pane-switcher; etc.).
- **Accessibility to WCAG 2.2 AA** as a build-and-verify target (the baseline level; Phase 8 is where the contrast/focus/keyboard verification gate is actually run — Tokens Part I, System Part E.3).
- Wiring screens to **states** (loading/empty/error/permission-denied/cross-tenant-404/silence) as specified per screen and in the Feedback/High-Stakes components.
- Rendering everything against the two-axis status model, provenance affordances, whose-turn, PriceDisplay (both modes), etc.

### 2.2 What Phase 8 is NOT — explicit exclusions

| Excluded from Phase 8 | Why / authority |
|---|---|
| **Phase 9 Development** — real back end, Rules Engine, Deadline Engine, AI analysis pipeline, register integration, auth, payments, persistence | Phase 9 is a separate, not-started phase (Roadmap). Phase 8 is UI. UI consumes these via interfaces/mocks; it does not build them. |
| **Production deployment, hosting, domain / `aldassist.com`** | Explicit hard constraint; Phase 6/7 repeatedly forbid touching `aldassist.com` or hosting until owner approval beyond this gate. |
| **Resolving DR-01, DR-02, O-2026-001** | Owner decisions; must remain open (§5). UI is built permission-/dedup-/pricing-mode-agnostic. |
| **Inventing Rules-Engine / legal / content values** | CR-19. Fees, deadlines, turnaround, confidence scale, legal copy stay `[SLOT]`/`[LEGAL CONTENT SLOT]`; UI renders placeholders/containers, never invented values. |
| **Any V2 feature** (CR-18) | Drafting workspace, prosecution workspace, in-product examination-response authoring, renewals, portfolio monitoring, institution surface (`/institution/*`), licensing marketplace, multi-currency, native mobile, re-assessment-with-diff. UI must leave navigational seams only. |
| **Committing to the repository** | Hard constraint for this task. |
| **Modifying any frozen Phase 6/7 (or Phase 1–5/ADR) document** | Frozen-document rule; change only new Phase 8 work. |
| **Dark theme** | `[SLOT]` — structure is theme-ready; values not authored; not required by baseline. Light is the MVP theme. |

### 2.3 Two boundary clarifications worth the owner's attention

- **Ops surface depth.** WP-1 §7.5 and the Component Catalogue coverage note state that the five Ops consoles (Docket Health, Agent Verification, Rule Authoring, Quality, Business) have their **purpose/states/constraints fixed** but their **full screen-level UX depth was deliberately deferred to Phase 8** ("scheduled with later WPs"). So Phase 8 owns more original UX design for Ops than for Client/Agent, where screens are fully specified. This is a scope nuance, not a gap.
- **UI vs Development seam.** Because Phase 9 is not started, Phase 8 has no real data source. Phase 8 must therefore define a **presentation-data contract** (view-models the screens consume) and drive the UI from **fixtures/mocks**. That contract is legitimate Phase 8 work; implementing the services behind it is Phase 9.

---

## 3. Phase 6 screen & journey requirements the UI must implement

Phase 6 is frozen and complete. The UI must implement all of the following. (Full 15-field specs live in WP-2; this is the consolidated obligation index.)

### 3.1 The MVP journey spine (WP-1 §2) — the organising backbone

```
IDEA → RECORDED → ASSESSED → DECIDED → FILED → EXAMINED → (RESPONDING, status-only) → GRANTED → MAINTAINED(V2)
                    │
                    └→ NOT PURSUED   (first-class destination, designed with equal care)
```

Object state machines the UI must render (verbatim, no invented states — CR-4/P5:X8):

- **Invention:** Drafting · Recorded · Assessing · Assessed · Filing · Protected · Not pursued · Lapsed
- **Assessment:** Requested · Analysing · In review · Released · (Decided)
- **Application:** Filed · Published · Awaiting examination · Under examination · Responding · Granted · Closed(+reason)
- **Matter:** Quoted · Engaged · In progress · Awaiting you · Awaiting the office · Complete · Closed
- **Deadline:** Upcoming · Approaching · Due · Confirmed · Met · Missed · Superseded · Not applicable

### 3.2 The 62 MVP screens (WP-2 §8 screen index)

**Public (`/`) — 16 screens (SC-P01…P16):** Home; Patent search; Patent document page ★; Stage landings; Segment landings; Pricing `[L1]`; Cost Planner `[L1]`; Find-your-path; Learn/guides; Glossary; Jurisdiction guide; Reports; Agent directory + profile `[L1]`; Trust pages; Company + Legal; Account creation & sign-in.

**Client (`/app`) — 22 screens (SC-C00…C21):** Workspace interstitial; Home/action queue ★; Inventions index; Disclosure capture ★; Invention detail ★; Disclosure & versions; Assessment request; Assessments list; **Assessment detail / verdict ★★**; Decision record; Portfolio index; Application detail (+silence/Responding) ★; Deadlines index; Deadline detail (trace); Matters index; Matter workspace ★; Costs `[L1]`; Documents index; Find an agent — matching; Quote & engagement / checkout ★ `[L1]`; Settings; Notification centre.

**Agent (`/agent`) — 15 screens (SC-A00…A14):** Onboarding & verification; Today; Docket + deadline detail; Matters index; Matter import ★; Agent matter detail (brief + work); Reviews queue ★; **Review workspace ★★** (two-pane); Opportunities; Practice (profile/outcomes/capacity/earnings, grouped A09–A12); Agent settings; Notifications + context switcher.

**Operations (`/ops`) — 5 screens (SC-O01…O05):** Docket Health Console ★; Agent verification; Rule Authoring Console ★; Quality & Review Console; Business metrics dashboard.

★ = high-visibility / high-stakes; ★★ = the two trust-critical screens (verdict; reviewer workspace).

### 3.3 Cross-cutting UI elements every screen inherits (WP-2 §5, WP-1 §7.6)

Global app search (fixed result grouping, Z1/Z2-distinct); attention badge `⚑`; relationship rail; breadcrumbs; PriceDisplay (only money renderer, two modes); contextual help/tooltips from the shared glossary record; the object-page skeleton (Identity → status pair → next action → tabs → content + relationship rail).

### 3.4 The behavioural invariants (Phase 6 UX Principles UXP-1…UXP-10)

The Record is the product; calm over noise (silence is a designed state); transparent whose-turn (two-axis, always); provenance is the trust anchor; explainability before intelligence (three fixed depths); clear human-vs-platform responsibility; no dead ends; deadline safety; assessment ≠ engagement; clear tenancy boundaries.

### 3.5 Global states mandatory on every screen (WP-2 §0)

WCAG 2.2 AA landmarks/focus/skip-links; status never colour-only; nothing critical in hover-only; cross-tenancy denials render as a uniform 404 "does not exist"; external-source failure = cached + staleness stamp, never an error page.

---

## 4. Phase 7 design-system requirements the UI must consume

Phase 7 is frozen and its brand-defining values are **owner-approved** (D-2026-021). The UI must consume — not re-decide — the following.

### 4.1 Approved brand-defining decisions (no longer proposals)

- **Direction:** Calm Institutional (restrained, document-like, credible).
- **Type:** **Inter** (UI/body), **IBM Plex Mono** (identifiers/computed data), with resilient fallback stacks; tabular numerals on data.
- **Icons:** **Lucide** (one line/stroke set; distinct shapes per meaning; never colour-only).
- **Colour system:** cool neutral (12 steps) + single deep ink-blue primary + dedicated provenance slate-teal + low-saturation Success/Warning/Danger/Info ramps + named Attention roles.
- **Spacing/grid/layout:** 4px base scale; 12-column grid; reading (~720px) / app (~1200px) / wide (~1440px) containers.
- **Breakpoints:** mobile <640 · tablet 640–1023 · desktop ≥1024 · wide ≥1440.
- **Touch target:** ≥44×44px design target.

### 4.2 The token architecture (binding) — `Phase-7-Design-Tokens-v0.1.md`

Three tiers, and the **binding rule the UI must honour:** components read **component tokens → semantic tokens → foundation tokens**; a component may **never** reference a raw/foundation value directly. This is what makes theming and any future owner colour change propagate without editing components (AP-12 maintainability). The token document is the single source of concrete values (hex, px, ms); implement it as CSS variables / a JSON token file / design-tool tokens — framework-neutral by design.

Concrete token sets the UI must implement: colour ramps (neutral/primary/provenance/success/warning/danger/info); semantic colour roles with the STEP-4 usage rules (allowed/forbidden/contrast/alone?); type primitives + semantic type roles; 4px space scale + semantic spacing; radius; border widths; elevation (0–4, soft); motion (with **no countdown / no looping**); breakpoints; z-index; control sizing; state & focus tokens (visible 2px focus ring, never suppressed; disabled ≠ read-only).

### 4.3 The component set (binding) — `Phase-7-Component-Catalogue-v0.1.md`

40+ base components across Navigation, Actions, Data, **Trust**, Status, Forms, Feedback, Overlays; plus 15 high-stakes patterns (§9.1–§9.15) that compose them: verdict presentation, unfavourable/inconclusive verdicts, human-review indicator, assessment-waiting, silence view, matter header, whose-turn, deadlines, action queue, review workspace, agent matching, PriceDisplay, Responding status-only. Each carries fixed anatomy/variants/states/content/accessibility/responsive/do-not-use rules the UI must not violate.

The **trust-anchor components** carry the strongest rules: provenance citation is a **primary visual element** (never a superscript, never hover-only, never colour-only); human-review indicator appears **only on Released**; confidence indicator must state its basis and never look like a legal determination; the citation/evidence panel opens the exact source passage in ≤2 interactions.

### 4.4 Design-system governance the UI phase must follow — `Phase-7-Design-Governance-v0.1.md`

- Token/component naming conventions; controlled-vocabulary UI labels only (new concept ⇒ lexicon entry first); "Agent Matching / Engagement" not "Marketplace"; ALDASSIST wordmark.
- **The change gate (primary governance rule):** any proposed component/token change is checked against the Constraint Register (CR-1…CR-21) and UX Principles (UXP-1…UXP-10) **before** acceptance; a change that weakens a constraint is rejected. "A future component must not bypass a Phase 6 constraint merely because it is visually convenient."
- Semantic versioning of the system (patch/minor/major); the system is currently **v0.1**.
- Accessibility is binding on every component; a component that cannot meet it is redesigned, not shipped (AP-Final).

### 4.5 The Phase 6 Constraint Register (CR-1…CR-21) — the "must not violate" set

The UI inherits all 21 constraints. The ones most likely to be violated by convenient UI shortcuts, called out for Phase 8 vigilance: **CR-2** mandatory review gate (never render a verdict pre-release); **CR-4** two-axis status never merged/colour-only/truncated; **CR-5** cross-tenant invisibility (uniform 404, no stubs/counts); **CR-6** provenance-or-not-shown; **CR-13** deadline safety; **CR-15** one PriceDisplay, official fees always separable, O-2026-001 stays open; **CR-16** vocabulary; **CR-17** Responding status-only; **CR-18** no V2; **CR-19** no invented values; **CR-21** agent stats only at n≥20 with sample size + confidence.

---

## 5. Dependencies and items that must remain unresolved

### 5.1 The three that must NOT be resolved in Phase 8 (hard constraint)

| ID | What it is | How the UI handles it (frozen design) | If resolved later, what changes |
|---|---|---|---|
| **DR-01** | Which Workspace role may record a *not-file* Decision (F-2) | Confirmation dialog / decision flow designed **permission-agnostic**; asserts no role (SC-C09; Catalogue 8.3) | Only *which role sees the affordance* — a permission gate. No flow/state/component redesign. |
| **DR-02** | Docket-import duplicate handling (F-3) | Matter import designed with **no de-duplication behaviour**; agnostic (SC-A04) | Adds an optional duplicate-detect/link-merge step in import. No effect on deadline computation. |
| **O-2026-001** | Pricing presentation (L1): bundled vs component | **PriceDisplay implements both modes**; component mode is the recorded probable direction; official fees always separately identifiable | Only the default rendering mode — a config value. No route/template/nav/hierarchy change (L1 Register §3). |

Phase 8 must build these three **agnostically** and leave them open. Building them agnostically is not a workaround — it is the specified design.

### 5.2 Open `[SLOT]` values — UI renders the container, never invents the value

| Slot | Surfaces | Owned by |
|---|---|---|
| Committed review turnaround | Assessment request/detail, review queue, waiting states | Owner/ops (ADR §9, configurable) |
| Assessment confidence representation (scale/threshold) | Verdict (SC-C08) | Visual/measurement design (AP-08) — *presentation contract defined; scale not fixed* |
| Agent-stat confidence-indicator representation | Agent directory/profile, matching, Practice | Visual design (D-2026-019) |
| Expected-next-event range + reassurance cadence | Silence view (SC-C11) | Rules Engine / field timelines |
| Deadline ladder timings / restoration provisions | Deadlines | Rules Engine (BR-14/D1) |
| Per-class default notification channels (where §16.2 unset) | Settings, notifications | Owner/ops (§16.2) |
| Edit-session idle timeout | Disclosure capture | Owner (P6 proposal) |
| Agent-verification turnaround; match-availability trigger | Agent onboarding; matching | Owner/ops |
| Client MFA policy (agent/internal MFA is fixed) | Sign-in, Settings | Owner (P4 §2.3) |
| OP-6 "material"-diff validation step | Quality console | D-2026-018 (definition fixed; validation pending) |
| Dark-theme values | (theme) | Not required by baseline; structure ready |

### 5.3 Open legal dependencies `[LEGAL CONTENT SLOT]` — counsel-owned copy

| Dep | Affects (UI containers) |
|---|---|
| **L1** (pricing/contracting wording; L1-06, L1-20) | Pricing, Cost Planner, quote & engagement, Costs, agent fee/earnings displays |
| **L2** (UPL) | Assessment/agent-facing copy |
| **L3** (advertising rules) | **Gates go-live of published agent outcome statistics** — UI shows the stat surface, but publication is L3-gated |
| **L4** (privilege/disclaimer) | Trust pages, legal pages |
| **L6** (post-engagement retention window) | Access-revocation affordance in agent record view |
| **L7** (data residency) | Settings (residency control not active) |

The UI provides the **containers/slots**; final wording is inserted by counsel. Phase 8 must not author legal text.

### 5.4 Product decisions recorded as unresolved in Phase 3 §26.3

**P2 and P3** are noted in `Assumptions.md §5` as *not recorded as resolved in any repository document*. Their exact content is inside the frozen Phase 3 PRD (not re-opened here). Phase 6/7 did **not** treat them as UI blockers (they were not surfaced as DR-/O- items). **Recommended owner action:** confirm P2/P3 are not UI-affecting before build; if either touches a screen, surface it as a Phase 8 owner decision. Flagged, not assumed away.

### 5.5 Assumptions the UI operates under (do not silently reopen)

A1 (account ≠ workspace; workspace on first Disclosure), A2 (comms confined to active matters; no client↔reviewer channel), A3 (sequential single-editor; concurrent multi-inventor editing is V2) — all confirmed by D-2026-015. TA-10 (responsive web sufficient; native mobile V2) governs the responsive-only scope.

---

## 6. Implementation blockers and ambiguities

**There are no hard blockers to *beginning* Phase 8.** The frozen baseline is a complete, self-consistent UI specification, and every open item is designed to be built around. The items below are things to confirm or decide, ranked by when they bite.

### 6.1 Must decide before writing code (they shape the scaffold)

1. **Framework / stack choice** — Phase 7 deliberately did **not** choose one (it is a Phase 8 owner decision). This is the single gating decision. Recommendation in §7; **[OWNER DECISION — Phase 8]**.
2. **Presentation-data contract & mock strategy** — because Phase 9 doesn't exist, the team must agree the UI is fixture-driven behind a typed view-model layer. Low-risk, but decide the shape up front so screens aren't wired to a moving target.

### 6.2 Must resolve before the *affected surface* ships (not before start)

3. **Legal copy (L1–L7)** — screens can be built with placeholder containers, but Pricing, checkout, Trust/Legal, and published agent statistics cannot **go live** until L1/L3/L4 land. Build order should let these surfaces be finished last.
4. **Confidence-representation scale (SLOT)** — the verdict screen (SC-C08 ★★) can be built to the presentation contract, but the exact scale needs calibration before the verdict is considered done. Not a start blocker; is a "definition of done" gap for that one screen.

### 6.3 Verify (housekeeping, not design gaps)

5. **Confirm a clean working tree on-device** (`git status`) — this audit verified HEAD via reflog only.
6. **`alda/` recovery copies** — non-canonical duplicates of Phase 1–5 exist under `alda/` (clearly marked `_NON-CANONICAL-RECOVERY.md`). Ensure Phase 8 tooling and any future `04_Development/` references point at the canonical `02_Product/` copies, not these. No action needed now; a note for whoever scaffolds.

### 6.4 Genuine ambiguities (small, and already contained by the design)

- **Ops console UX depth** (§2.3) — Phase 8 does original UX design for the five Ops consoles within their fixed purpose/states/constraints. Not a blocker; just more design work than the fully-specified Client/Agent screens.
- **P2/P3 product decisions** (§5.4) — content unknown at this layer; recommended to confirm as non-UI-affecting.

None of these prevents starting. Items 1–2 are the only true prerequisites, and both are decisions the owner can take now.

---

## 7. Recommended UI application architecture and stack (recommendation only — not created)

> Presented as options with trade-offs per the repository's decision discipline. **Nothing here is built. The stack is an [OWNER DECISION — Phase 8].** The recommendation is chosen to honour AP-02 (rules as data), AP-09/TA-6 (modular monolith), AP-11 (global by design), AP-12 (maintainability), TA-10 (responsive web only), and the framework-neutral token architecture.

### 7.1 What the architecture must satisfy (derived from the baseline)

- **Token-first, framework-neutral styling** — the three-tier token chain must be the single styling source; components bind to component tokens only.
- **A component library mirroring the Phase 7 catalogue 1:1**, with the trust components (provenance, review indicator, two-axis status, PriceDisplay, deadline) as first-class, reusable primitives.
- **Presentation-data contract** — typed view-models the screens consume, fed by fixtures now and by Phase 9 services later; the UI never assumes a concrete backend.
- **Config-driven open values** — turnaround, pricing mode (O-2026-001), channel defaults, idle timeout, etc. are runtime/config inputs, never literals (CR-19).
- **Responsive-web, WCAG 2.2 AA**, light theme, theme-ready structure.
- **Localisation-ready** (AP-11 global by design; controlled vocabulary as the string source).
- **Modular monolith** front end — one app, cleanly separated surface modules (Public/Client/Agent/Ops), not premature micro-frontends (AP-09).

### 7.2 Recommended option (for owner approval)

**Option A — React + TypeScript + Vite, design tokens as CSS custom properties, headless/unstyled component primitives styled entirely from tokens, Storybook for the component catalogue, fixture-driven view-models.**

| Layer | Recommendation | Rationale |
|---|---|---|
| Language | **TypeScript** | Type-safe view-models enforce the presentation-data contract; catches vocabulary/state drift at compile time. |
| Framework | **React** | Largest ecosystem for accessible headless primitives; Lucide ships first-class React icons; strongest hiring pool for India-based team (B2). |
| Build/dev | **Vite** | Fast local dev; no hosting/deploy implied (respects the no-deploy constraint). |
| Styling | **CSS custom properties generated from the token file** (optionally via a tokens tool like Style Dictionary) | Honours the framework-neutral token mandate and the binding chain literally; theming = re-point variables. |
| Components | **Headless/unstyled primitives** (e.g. Radix-style) styled 100% from tokens | Accessibility (focus, ARIA, keyboard) comes built-in; visual identity comes only from tokens — no competing design opinion. |
| Catalogue | **Storybook** | Renders the Component Catalogue as a living reference; the natural home for the change-gate review (Phase 7 Governance B.11). |
| Data | **Typed view-models + fixtures / MSW mocks** | UI runs with no backend; Phase 9 later swaps fixtures for services behind the same contract. |
| Routing | Surface-scoped routes (`/`, `/app`, `/agent`, `/ops`) with a context switcher, one context at a time (CR-5) | Mirrors the frozen surface separation. |

**Trade-off honesty:** React is a mainstream, low-risk choice, not the only valid one.

### 7.3 Alternatives (with trade-offs)

- **Option B — SvelteKit + TypeScript.** Less boilerplate, excellent performance, smaller bundles; but a smaller accessible-primitive ecosystem means more custom a11y work on the trust components, and a smaller hiring pool. Viable; higher key-person risk.
- **Option C — Vue 3 + TypeScript.** Strong middle ground, good ecosystem; slightly fewer headless-a11y libraries than React. Viable.
- **Not recommended for MVP — Next.js / any SSR-first meta-framework *now*.** SSR/SEO matters greatly for the Public surface (SC-P03 is the "SEO crown jewel"), which argues for it later — but adopting an SSR framework now edges toward hosting/deployment concerns that are explicitly out of scope for this phase. **Recommended treatment:** keep the Public surface's rendering strategy (SSR/SSG for SEO) as a **deferred, explicitly-flagged Phase 8/9 decision**, and start with the app surfaces (Client/Agent/Ops) which are authenticated SPAs where SSR is not needed. This avoids smuggling a hosting decision into the UI kickoff.

**Recommendation:** approve **Option A** for the authenticated surfaces and the design-system core; hold the Public-surface rendering strategy as a separate flagged decision so no hosting/domain work is implied now.

---

## 8. Recommended first implementation slice

The first slice should prove the token→component→screen chain end-to-end on the **trust-critical path**, because that is where the product's whole thesis lives and where a wrong foundation is most expensive to unwind.

**Recommended first slice — "the design-system spine + the verdict path":**

1. **Token layer** — implement `Phase-7-Design-Tokens` as CSS variables (foundation → semantic → component), light theme, with the contrast-verification gate run against the token pairs (Tokens Part I). *Deliverable: a token package + a passing contrast report.*
2. **Foundational components** — the two-axis **Lifecycle state chip** + **Attention marker**, **Whose-turn indicator**, **Primary button**, **Provenance citation** + **Citation/evidence panel**, **Human-review indicator**, **Confidence indicator** (to the presentation contract, scale as a slot). *These are the trust primitives; everything else reuses them.*
3. **One screen, fully:** **Assessment detail / verdict (SC-C08 ★★)** — the highest-stakes screen — driven by fixtures, including all three depths, the released/in-review/unfavourable/inconclusive variants, provenance fail-safe (IP-08), and the "never a verdict before release" gate.
4. **The shell it sits in:** the Client surface app shell (header, sidebar/bottom-bar nav, object-page skeleton, relationship rail, breadcrumbs) so the screen renders in its real frame.

**Why this slice:** it exercises the token binding rule, the responsive rules (two-pane/verdict on mobile), accessibility (focus, status-not-colour-only, descriptive citation names), and the three hardest constraints (CR-2 review gate, CR-4 two-axis, CR-6 provenance) on the one screen where they matter most. If the spine holds here, the remaining 61 screens are largely composition. It also produces the Storybook catalogue entries the rest of the phase reuses, and it needs **no** legal copy and **no** resolved DR-/O- item — so it can start immediately.

*(Reasonable alternative first slice: the Public surface Home + Search + Document page, if validating SEO/marketing surfaces earlier is the priority. It's lower-risk but proves less of the trust thesis. Recommended only if the Public launch is the nearer business milestone.)*

---

## 9. Phase 8 implementation plan — controlled batches

Sequenced so each batch is independently reviewable, builds on approved foundations, and never gets ahead of an owner decision or a legal dependency. Each batch ends at a review gate before the next begins (DISCUSS→…→REVIEW per batch).

| Batch | Name | Contents | Depends on | Blocked-by (open items) |
|---|---|---|---|---|
| **B0** | Scaffold & decisions | Confirm stack (§7); set up repo scaffold in `04_Development/` (no deploy); token pipeline; Storybook; fixture/view-model contract; a11y test harness | Owner approves stack | — |
| **B1** | Token + trust-primitive spine + verdict (the §8 first slice) | Tokens → foundational trust components → SC-C08 verdict → Client shell | B0 | — |
| **B2** | Client Vault path | SC-C00 workspace interstitial, SC-C02 inventions index, SC-C03 disclosure capture ★, SC-C04 invention detail ★, SC-C05 versions, SC-C06 assessment request, SC-C07 list, SC-C09 decision (DR-01-agnostic) | B1 | DR-01 stays agnostic |
| **B3** | Client Portfolio / Deadlines | SC-C10 portfolio, SC-C11 application detail ★ (silence + Responding status-only), SC-C12 deadlines, SC-C13 deadline detail (trace) | B1 | Deadline/range slots rendered, not set |
| **B4** | Client Matter / Costs / Matching + PriceDisplay | SC-C14 matters, SC-C15 matter workspace ★, SC-C16 costs, SC-C18 matching, SC-C19 quote & engagement ★; **PriceDisplay (both modes)** | B1 | O-2026-001 agnostic; L1 copy container |
| **B5** | Client Home, Documents, Settings, Notifications | SC-C01 action queue ★, SC-C17 documents, SC-C20 settings, SC-C21 notifications | B2–B4 (links to their objects) | Channel-default/MFA slots |
| **B6** | Agent surface | SC-A00…A14: Today, docket, matters, **import ★**, matter detail, **reviews queue ★ + review workspace ★★**, opportunities, practice, settings, notifications/context switcher | B1 (reuses trust primitives); B4 (matter/pricing) | DR-02 agnostic; n≥20 stat rules |
| **B7** | Operations subset | SC-O01 Docket Health ★, SC-O02 verification, SC-O03 Rule Authoring ★, SC-O04 Quality, SC-O05 Business — **original UX depth designed here** | B1, B6 | OP-6 material-validation slot |
| **B8** | Public surface | SC-P01…P16, incl. SEO-critical document page (SC-P03 ★) + Pricing/Cost Planner + Trust/Legal | B1, B4 (PriceDisplay); **rendering-strategy decision** | L1/L3/L4 legal copy; Public SSR/SSG decision |
| **B9** | Cross-cutting hardening & verification | Responsive pass (all breakpoints), full WCAG 2.2 AA verification gate, empty/loading/error/404/permission-denied audit across all screens, greyscale/colour-blind check, reduced-motion, print/export (AI-vs-human distinction survives) | B1–B8 | — |

**Sequencing rationale:** B1 proves the spine; B2–B5 complete the demand side (the primary funnel); B6 completes the supply side (reusing the same primitives); B7 handles Ops (the most original Phase-8 UX); B8 does Public last because it carries the most legal-copy and rendering-strategy dependencies and can be finished/launched independently; B9 is the standing verification gate. Legal-dependent surfaces (Pricing, checkout, published agent stats, Trust/Legal) are structurally buildable earlier but **go live** only after L1/L3/L4 land.

**Per-batch review gate (every batch):** consistency review against CR-1…CR-21 and UXP-1…UXP-10 (the Phase 7 change gate); confirm no invented value, no V2 leak, no frozen-document change, DR-01/DR-02/O-2026-001 still agnostic; a11y check; then owner sign-off before the next batch.

---

## VERDICT

# ✅ PHASE 8 READY

The frozen `e0f8caf` baseline is a **complete, internally consistent, owner-approved UI specification with an empty development slate**. Phase 6 (frozen, D-2026-020) supplies the full journey/screen/interaction/edge-case/responsive specification (62 screens, 21 constraints, 10 UX principles). Phase 7 (frozen, D-2026-021) supplies an owner-approved, token-based visual design system with a full component catalogue and governance. Every open item — DR-01, DR-02, O-2026-001, all `[SLOT]`s, all `[LEGAL CONTENT SLOT]`s — is designed to be built around, and the design layer already handles each agnostically. There are **no hard blockers to beginning Phase 8**. The only true prerequisites are two decisions the owner can take now (stack; presentation-data contract), and both are legitimately Phase 8's to make.

**Readiness is conditional only on the owner decisions below being taken before / at the start of implementation — none of which blocks planning, and only the stack choice blocks the first line of code.**

## Owner decisions required before implementation

**Decide before code (gating):**
1. **Approve the UI stack** (§7). Recommendation: Option A (React + TypeScript + Vite, tokens as CSS variables, headless primitives, Storybook, fixture-driven view-models) for authenticated surfaces + design-system core. **[OWNER DECISION]**
2. **Approve the presentation-data contract + fixture strategy** (UI is mock-driven; Phase 9 builds the real services). **[OWNER DECISION]**
3. **Approve the first slice** (§8: token spine + trust primitives + verdict screen SC-C08) and the batch plan (§9). **[OWNER DECISION]**

**Decide before the affected surface *ships* (not before start):**
4. **Hold the Public-surface rendering strategy** (SSR/SSG for SEO vs SPA) as a separate flagged decision, so no hosting/domain work is implied at kickoff (§7.3, B8).
5. **Confirm P2 and P3** (Phase 3 §26.3, recorded unresolved) are not UI-affecting; if either is, surface it as a Phase 8 decision (§5.4).

**Explicitly keep open (do not resolve):** DR-01, DR-02, O-2026-001, and every `[SLOT]` / `[LEGAL CONTENT SLOT]`. The UI is built agnostic to all of them.

**Housekeeping:** confirm a clean `git status` on-device (§6.3); ensure Phase 8 references canonical `02_Product/` docs, not the `alda/` non-canonical recovery copies.

---

*End of Phase 8 — UI Kickoff Audit. Analysis only. No frozen document modified; no UI built; no framework chosen; nothing committed. Phase 8 begins on owner approval of the decisions above.*
