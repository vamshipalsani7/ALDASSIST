# Phase 8 — B0: Presentation-Data Contract & Fixture Strategy

**Type:** Phase 8 working specification — **DRAFT v0.1, awaiting owner review.** Not frozen, not canonical.
**Date:** 3 September 2026
**Authority to exist:** D-2026-022 (Phase 8 kickoff decisions approved). This document specifies item (2) of that decision — the presentation-data contract and the fixture strategy — and nothing else.
**Baseline (frozen, authoritative, unmodified):** Phase 3 PRD · Phase 4 IA · Phase 5 User Flows · Assessment-Lifecycle ADR · Phase 6 (WP-1…WP-5, Pattern Catalogue, Deferred Decision Register; D-2026-020) · Phase 7 (Design System, Tokens, Component Catalogue, Governance; D-2026-021).

> **Scope of this document.** It **defines and documents** the seam between the UI (Phase 8) and future services (Phase 9): the typed view-models the screens/components consume, and the fixture strategy that feeds them today. It is a **specification** — the TypeScript shown is the formal expression of the contract, **not** shipped product code. **No product UI is written. No scaffold, token pipeline, Storybook, or app is built here.** Work stops at this document for review.

> **Discipline held.** This document **resolves no open decision** (DR-01, DR-02, O-2026-001 stay open) and **invents no value** (fees, review turnaround, confidence scale, deadline timings, legal wording, retention window remain unresolved). Where the baseline leaves a value open, the contract models it as an explicit, typed **absence with a reason** — never a guessed value (CR-19).

---

## 1. Purpose and the one governing idea

The UI must be buildable and reviewable **now**, before any back end exists (Phase 9 is not started). The presentation-data contract is the mechanism: every screen and component consumes **typed view-models** through a small set of **provider ports**. Today those ports are implemented by **fixtures**; in Phase 9 the same ports are implemented by real service adapters. Because the UI depends only on the ports and the view-model types — never on a concrete data source — nothing in the UI changes when fixtures are swapped for services.

```
        ┌─────────────────────────────────────────────┐
        │   UI (Phase 8): screens + components         │
        │   depends ONLY on view-model types + ports   │
        └───────────────▲─────────────────────────────┘
                        │  view-models (typed)
              ┌─────────┴──────────┐
              │   Provider ports    │   (interfaces — the contract)
              └───▲────────────▲───┘
       Phase 8 →  │            │  ← Phase 9 (later, not now)
        ┌─────────┴───┐   ┌────┴──────────────┐
        │ FixtureProv. │   │ ApiProvider       │
        │ (this phase) │   │ (real services)   │
        └──────────────┘   └───────────────────┘
```

**The governing rule:** the contract is *presentation-shaped*, not *storage-shaped*. It expresses exactly what the frozen Phase 6 screens and Phase 7 components need to render — the object-page skeleton, the two-axis status, whose-turn, provenance, PriceDisplay, the silence view — and it makes the baseline's hard constraints *unrepresentable to violate* wherever the type system can enforce them.

---

## 2. Design principles for the contract

1. **View-models are read projections for a screen or component**, not domain entities. One screen may compose several; one entity may appear in several view-models at different fidelities (e.g. an Invention row vs. the Invention detail).
2. **Constraints encoded in types where possible.** A verdict cannot be represented on an Assessment that is not `Released` (CR-2); an unresolved citation cannot be typed as verified (CR-6); a cross-tenant object cannot be represented at all — it is modelled as *not found* (CR-5); price is always component-separable with the official fee distinct (CR-15).
3. **Open values are typed absences.** Every value the baseline leaves open is a `SlotValue<T>` carrying *why* it is absent and *who* owns it — never a literal (CR-19).
4. **Presentation-agnostic to open decisions.** DR-01, DR-02 and O-2026-001 appear in the contract only as configuration inputs or unasserted fields, never as resolved logic.
5. **Framework-neutral data, React-rendered.** The view-model types are plain TypeScript with no React/DOM dependency, so they are equally consumable by fixtures, Storybook, tests, and (later) service adapters. Per D-2026-022 the *rendering* is React + TS + Vite; the *contract* is just types.
6. **No invented identifiers or PII.** Confidential titles are opaque (P4:§9.2); fixture people/registration numbers are obviously synthetic.

---

## 3. Shared trust-critical types (the spine)

These primitives are consumed by nearly every view-model and directly encode the constraints. Shown as specification.

### 3.1 Loading / availability envelope — encodes CR-5, and the per-screen loading/empty/error fields

```ts
// Every screen-level fetch returns one of these. 'not-found' is the ONLY
// representation of a cross-tenant object (CR-5): existence never leaks.
type Loaded<T> =
  | { state: 'loading' }
  | { state: 'ready'; data: T }
  | { state: 'empty'; empty: EmptyStateVM }          // teaches one thing, offers one action (P4:§19.1)
  | { state: 'error'; error: ErrorStateVM }           // plain-language + reason + next step (P4:§19.3)
  | { state: 'permission-denied'; denied: PermissionDeniedVM } // same-tenancy, visible-but-locked (IP-15/CR-12)
  | { state: 'not-found' };                           // cross-tenant → uniform 404 (IP-16/CR-5); carries NOTHING
```

`permission-denied` and `not-found` are deliberately different shapes: the first carries a reason and who-to-ask; the second carries nothing at all, so no surface can render a stub, count, or differentiated message.

### 3.2 SlotValue — encodes CR-19 (no invented values)

```ts
type SlotSource = 'rules-engine' | 'config' | 'legal' | 'owner-decision' | 'measurement';

// A value the frozen baseline does NOT fix. The UI renders a container/placeholder
// and knows why the value is absent; it never fabricates one.
type SlotValue<T> =
  | { status: 'resolved'; value: T; source: SlotSource }
  | { status: 'pending-slot'; slotId: string; source: SlotSource } // e.g. 'S-1 review turnaround'
  | { status: 'unavailable'; reason: 'source-unreachable'; lastKnown?: T; asOf?: IsoDateTime };

type LegalContentSlot = { slotId: string /* e.g. 'L1', 'L4' */; status: 'pending-legal' | 'provided'; text?: string };
```

The fixture layer supplies `pending-slot` / `pending-legal` for everything the baseline leaves open (see the slot registry, §7). `unavailable` models external-source failure (Rules Engine / register) with `lastKnown` + `asOf`, which is how the UI shows cached-value + staleness instead of an error page (NFR-A05).

### 3.3 Two-axis status — encodes CR-4 / AP-14

```ts
type AttentionState = 'on-track' | 'action-needed' | 'at-risk';   // exactly three; no fourth

// Lifecycle is a discriminated union per object type; names come ONLY from the
// frozen taxonomy (P5:X8). 'Closed' always carries its reason (P4:§11.3 / CR-4).
type InventionLifecycle =
  | 'drafting' | 'recorded' | 'assessing' | 'assessed'
  | 'filing' | 'protected' | 'not-pursued' | 'lapsed';
type ApplicationLifecycle =
  | 'filed' | 'published' | 'awaiting-examination' | 'under-examination'
  | 'responding' | 'granted'
  | { kind: 'closed'; reason: 'abandoned' | 'refused' | 'withdrawn' | 'lapsed' | 'opposed-and-revoked' };
// ...Assessment, Matter, Deadline lifecycles likewise, verbatim from Phase 7 B.8.

interface TwoAxisStatus<L> {
  lifecycle: L;          // renders as the lifecycle state chip
  attention: AttentionState; // renders as the independent attention marker — NEVER merged with lifecycle
}
```

The two axes are separate fields by construction, so no view-model can accidentally merge them.

### 3.4 Whose-turn — encodes UXP-3 / IP-12 (the anti-silence backbone)

```ts
interface WhoseTurn {
  actorLabel: 'needs-you' | 'with-the-reviewer' | 'awaiting-the-office'
            | 'analysing' | 'nothing-needed' | 'awaiting-you';
  estimate?: SlotValue<HumanReadableRange>; // e.g. review turnaround — a SLOT, never a countdown
}
```

`estimate` is a `SlotValue` because every "roughly when" figure (turnaround, expected-next-event range, deadline ladder) is open in the baseline. It is a range/label, never a ticking clock (UXP-2).

### 3.5 Provenance — encodes CR-6 / BR-02 (provenance-or-not-shown)

```ts
// An assertion is EITHER verified with a resolvable citation, OR withheld/unverified.
// There is no representable state "shown as fact without a resolvable citation".
type Assertion =
  | { kind: 'verified'; text: string; citation: Citation }
  | { kind: 'unverified'; text: string; note: 'citation-unresolved' }; // fail-safe (IP-08): never styled as fact

interface Citation {
  accessibleName: string;      // "Cited passage in US 9,876,543, ¶42" — never "[1]" (P4:§22.3)
  passageRef: SourcePassageRef; // resolves to the exact passage in the evidence panel
  source: 'ai-derived';
}
```

By making `verified` require a `Citation`, the type system prevents a verified assertion without a resolvable source. The verdict view-model (§5.3) consumes `Assertion[]`, so the fail-safe is structural, not a runtime check the UI could forget.

### 3.6 AI-vs-human authorship — encodes UXP-6 / P3:§12.3 r5

```ts
type Authorship =
  | { by: 'ai'; label: 'AI-generated' }
  | { by: 'reviewer'; reviewerName: string; releasedAt: IsoDateTime }; // human-review indicator (BR-01)
```

### 3.7 Price — encodes CR-15 / O-2026-001 (open) and PriceDisplay

```ts
// Money is ALWAYS decomposed; the official fee is ALWAYS separately identifiable.
// The rendering MODE is a config input (component | bundled) — O-2026-001 stays OPEN;
// switching modes changes only rendering, never structure (L1 Register §3).
interface PriceVM {
  components: { platform: MoneyAmount; professional: MoneyAmount; official: MoneyAmount };
  officialSeparable: true;                 // invariant, not a choice
  renderMode: SlotValue<'component' | 'bundled'>; // source: 'owner-decision' until O-2026-001 closes
  basis: { jurisdiction: JurisdictionCode; entityType: EntityType };
  disclosure: LegalContentSlot;            // L1 wording — pending-legal
  freshness: FreshnessStamp;               // fees from Rules Engine; on failure → SlotValue 'unavailable'
}
```

`renderMode` is a `SlotValue` sourced from `owner-decision`: the contract carries both modes and defers which is the default to O-2026-001, exactly as the freeze requires.

### 3.8 Freshness — encodes NFR-A05 / IP-18

```ts
interface FreshnessStamp { source: string; retrievedAt: IsoDateTime; stale: boolean; }
```

---

## 4. Provider ports (the interfaces that fixtures and, later, services implement)

One port per bounded area, mirroring the frozen surfaces/objects. Each returns `Loaded<T>` and never throws for a "does not exist" — it returns `not-found` (CR-5). Ports are read-shaped for MVP screens; command shapes (e.g. "record decision") are modelled as intents that return the next `Loaded` state, still without asserting anything the baseline leaves open.

```ts
interface InventionProvider {
  list(query: InventionQuery): Promise<Loaded<InventionListVM>>;
  get(id: OpaqueId): Promise<Loaded<InventionDetailVM>>;
  disclosureVersions(id: OpaqueId): Promise<Loaded<DisclosureVersionsVM>>;
}
interface AssessmentProvider {
  get(inventionId: OpaqueId, assessmentId: OpaqueId): Promise<Loaded<AssessmentVM>>;
  list(inventionId: OpaqueId): Promise<Loaded<AssessmentListVM>>;
}
interface DecisionProvider {
  // DR-01 is NOT resolved here: the intent asserts no role. Whether the current
  // actor may record a not-file Decision is a `capability` the provider reports,
  // sourced from an owner-decision slot — the UI shows/hides the affordance from that,
  // and never hard-codes a role.
  capabilities(inventionId: OpaqueId): Promise<Loaded<DecisionCapabilitiesVM>>;
}
interface ApplicationProvider { /* portfolio list, detail (+ silence, + Responding status-only) */ }
interface DeadlineProvider   { /* list, detail with computation trace at depth 3 */ }
interface MatterProvider     { /* index, workspace four-cell header, activity */ }
interface AgentMatchProvider {
  // Conflict check runs BEFORE any agent is returned (BR-10); a pre-check result
  // is its own state so the UI can render "checking availability" and fail closed.
  results(request: MatchRequest): Promise<Loaded<MatchResultsVM>>;
}
interface AgentImportProvider {
  // DR-02 is NOT resolved here: there is no dedup field. The VM is extensible so a
  // future 'duplicate-detected' per-matter state can be added without redesign.
  run(input: ImportInput): Promise<Loaded<ImportResultVM>>;
}
interface NotificationProvider { /* grouped by class; Critical carries acknowledgement state */ }
interface PublicSearchProvider { /* Z2 register — visually/behaviourally distinct from app (Z1) search */ }
// ...AgentReviewProvider, PriceProvider, CostProvider, DocumentProvider, OpsConsoleProviders.
```

**DR-01/DR-02/O-2026-001 discipline in the ports:** DR-01 becomes a reported `capability` (owner-decision slot), not a role check; DR-02 is simply absent (extensible); O-2026-001 is the `renderMode` slot. None is resolved; each is a seam.

---

## 5. Representative object view-models

Full per-screen view-models are enumerated in an appendix to be completed in B1 alongside the first slice; the trust-critical ones are specified here because they anchor the whole contract.

### 5.1 Object header (inherited by every object page) — the skeleton

```ts
interface ObjectHeaderVM<L> {
  identity: { title: OpaqueOrPlain; keyDates: KeyValue[]; ids: MonoIdentifier[] };
  status: TwoAxisStatus<L>;            // both axes, always
  nextAction: NextActionVM;            // exactly one primary; 'nothing-needed' is valid
  whoseTurn: WhoseTurn;
  tabs: TabRef[];                      // ≤ 2 nav levels
  relationshipRail: RelatedObjectRef[]; // every related object one click away
}
```

### 5.2 Invention detail — encodes CR-1, UXP-1/7

```ts
interface InventionDetailVM {
  header: ObjectHeaderVM<InventionLifecycle>;
  summary: { authorship: Authorship; text: string }; // plain-language, AI-labelled
  // 'not-pursued' / 'lapsed' are FULL, dignified view-models — no "husk" flag,
  // forward actions retained at full weight (UXP-7).
  protectionByJurisdiction: JurisdictionStatus[];
  relatedAssessments: RelatedObjectRef[]; relatedApplications: RelatedObjectRef[];
}
```

### 5.3 Assessment / verdict — encodes CR-2, CR-6, UXP-4/5/6 (the ★★ screen)

```ts
// The verdict is only representable when Released. Pre-release view-models CANNOT
// carry a verdict — the review gate is structural (CR-2 / BR-01).
type AssessmentVM =
  | { status: 'analysing'; header: ObjectHeaderVM<AssessmentLifecycle>; whoseTurn: WhoseTurn } // no verdict field
  | { status: 'in-review'; header: ObjectHeaderVM<AssessmentLifecycle>; whoseTurn: WhoseTurn; expected: SlotValue<HumanReadableRange> }
  | { status: 'released'; header: ObjectHeaderVM<AssessmentLifecycle>; verdict: VerdictVM };

interface VerdictVM {
  review: Extract<Authorship, { by: 'reviewer' }>; // named reviewer + release date (BR-01/FR-A07)
  depth1: {
    label: 'looks-protectable' | 'protectable-with-changes' | 'unlikely-to-be-protectable' | 'not-enough-to-assess';
    confidence: ConfidenceVM;           // states its basis; scale is a SLOT (§7)
    plainMeaning: string; nextSteps: NextActionVM[];
  };
  depth2: ReasoningVM;                   // element-by-element; statutory-exclusion analysis
  depth3: EvidenceVM;                    // assertions (§3.5), reference list, coverage statement, 18-month blind spot
  // On 'unlikely-to-be-protectable', coverageCollapsedByDefault is fixed false (CR-6 / P4:§15.2).
  alternatives?: FourAlternativesVM;     // equal visual weight on unfavourable (UXP-7)
}

interface ConfidenceVM { basisText: string; scale: SlotValue<ConfidenceScale>; } // never colour-only, never a bare number
```

### 5.4 Application detail — encodes CR-13, CR-17, silence view

```ts
interface ApplicationDetailVM {
  header: ObjectHeaderVM<ApplicationLifecycle>;
  timeline: TimelineEntry[];            // each with source + freshness; append-only
  quiet?: SilenceViewVM;                // when nothing is happening (IP-14): last event, expected-next RANGE (SlotValue),
                                        // "nothing required from you", "monitoring daily" — never a blank/countdown
  responding?: RespondingVM;            // status-only: response deadline + agent-off-platform copy + filed-response upload
                                        // NO prosecution/authoring surface (CR-17)
}
```

### 5.5 Deadline detail — encodes CR-13, BR-13

```ts
interface DeadlineDetailVM {
  state: DeadlineState;                 // Upcoming…Not-applicable; icon+text+colour, never colour-only
  date: IsoDate;
  computationTrace: SlotValue<ComputationTrace>; // rule id, version, statutory citation, calendar adj, extensions (depth 3)
  requiresHumanConfirmation: boolean;   // critical deadlines (BR-03); confirm affordance is agent/ops only
}
```

### 5.6 Agent outcome stat — encodes CR-21, D-2026-019

```ts
// Below the n≥20 floor the stat is NOT representable as a number.
type OutcomeStatVM =
  | { state: 'below-floor'; message: 'not-enough-data-yet' }             // no statistic exists to render
  | { state: 'published'; value: StatValue; sampleSize: number /* ≥20 */; confidence: ConfidenceVM; l3Gated: true };
```

### 5.7 Others (specified in the B1 appendix)

Matter workspace (four-cell header: Where · What's next · Needs you · Cost, "Nothing needed" valid), Cost/forecast, Documents, Search (Z1 app vs Z2 public), Notifications (five classes, Critical acknowledgement state), Agent review workspace (two-pane, review-grant scope), and the five Ops consoles at compact density.

---

## 6. Fixture strategy

### 6.1 Shape

- **`FixtureProvider` implements each port** with static, typed data — no network, no back end. It is the only Phase-8 implementation of the ports; Phase 9 adds `ApiProvider` behind the identical interfaces and the UI is unchanged.
- **Scenario-based, not single-happy-path.** Each screen names the states it must show (from its WP-2 15-field spec); the fixtures provide one dataset per state. A scenario selector (query param / Storybook control, wired in B1) picks the active scenario so every state is demonstrable and testable.
- **Latency + transition simulation.** Fixtures can emit `loading` → `ready`, and staged `analysing` → `in-review` → `released`, so skeletons, staged waiting (IP-05), and the "never a partial verdict" rule are exercised honestly.

### 6.2 Mandatory scenario coverage (per the frozen edge-case set)

Every screen's fixtures must include, where its spec calls for them: first-run **empty**, **loading**, **error**, **permission-denied** (same-tenancy), **cross-tenant not-found (404)**, and the domain edge states — e.g. Assessment: `analysing`, `in-review`, `released-favourable`, `released-qualified`, `released-unfavourable`, `inconclusive`, `provenance-unresolved`; Application: `active`, `silence`, `responding`, `register-stale`; Matching: `results`, `none-available`, `conflict-check-failed`; Import: `complete`, `needs-fields`, `failed`.

### 6.3 No-invented-values rule (CR-19) — binding on fixtures

- Fees, review turnaround, confidence scale, deadline ladder timings, expected-next-event range, retention window, channel defaults, idle timeout → represented as `SlotValue` in `pending-slot` (or `unavailable` with synthetic `lastKnown` clearly marked as demo data), **never** as plausible real numbers presented as fact.
- Legal copy → `LegalContentSlot` `pending-legal` placeholders (lorem-style, visibly non-final).
- Agent statistics → either `below-floor` or `published` with `sampleSize ≥ 20`; no sub-floor number ever appears.
- Pricing → both `renderMode` values demonstrable; official fee always a separate component; amounts obviously synthetic.

### 6.4 No real PII; opaque identifiers

Fixture inventions use opaque IDs and non-confidential placeholder titles (P4:§9.2); people, agents, registration numbers, application numbers are obviously synthetic. No real register data is embedded.

### 6.5 Proposed layout (specification only — not created in B0)

```
04_Development/                     ← Phase 8 lands here (created in B1, not now)
  contract/        view-model + port TYPES (this document, realised as .ts in B1)
  fixtures/
    scenarios/     one file per object area; one dataset per state
    providers/     FixtureProvider implementations of each port
  (app/, components/, tokens/, storybook/ — all deferred to B1+)
```

### 6.6 Phase 9 swap path

Phase 9 implements `ApiProvider` per port against real services (Rules Engine, Deadline Engine, register integration, assessment pipeline, auth, payments). The view-model types and ports are the contract both sides honour; a provider-selection seam (config) chooses fixtures vs. API. `SlotValue`s resolve from `pending-slot` to `resolved` as the Rules Engine / config / legal / owner decisions land — with no change to screens or components.

---

## 7. Open-value slot registry carried by the contract

The contract's `SlotValue`/`LegalContentSlot`/capability seams map 1:1 to the frozen slot registers (WP-2 §9, WP-4 Part E, WP-5 Part D.1, Phase 7 Part N/J). None is filled here.

| Slot / seam | Contract representation | Source | Frozen authority |
|---|---|---|---|
| Committed review turnaround | `SlotValue<HumanReadableRange>` (whose-turn, assessment) | config/ops | ADR §9 |
| Assessment confidence scale | `ConfidenceVM.scale: SlotValue` | measurement | AP-08 |
| Agent-stat confidence indicator | `ConfidenceVM` in `OutcomeStatVM` | measurement | D-2026-019 |
| L1 pricing render mode | `PriceVM.renderMode: SlotValue<'component'|'bundled'>` | owner-decision | **O-2026-001 (OPEN)** |
| L1/L2/L4/L6/L7 legal copy | `LegalContentSlot` | legal | L-register |
| Expected-next-event range | `SilenceViewVM` range `SlotValue` | rules-engine | P4:§19.4 |
| Deadline ladder timings / trace | `SlotValue<ComputationTrace>` | rules-engine | BR-13/D1 |
| Per-class channel defaults | notification prefs `SlotValue` | config | §16.2 |
| Edit-session idle timeout | `SlotValue` | owner | WP-4 A.4 |
| Not-file Decision role | `DecisionCapabilitiesVM` capability (no role asserted) | owner-decision | **DR-01 (OPEN)** |
| Docket-import dedup | absent, VM extensible | owner-decision | **DR-02 (OPEN)** |
| Client MFA policy | `SlotValue` | owner | P4:§2.3 |

---

## 8. Constraint conformance

| Constraint | How the contract honours it |
|---|---|
| CR-2 mandatory review gate | Verdict only representable on `status:'released'`; pre-release VMs have no verdict field |
| CR-4 two-axis status | `TwoAxisStatus<L>` — separate lifecycle/attention fields; lifecycle names from taxonomy; Closed carries reason |
| CR-5 cross-tenant invisibility | `not-found` state carries nothing; distinct from `permission-denied` |
| CR-6 provenance-or-not-shown | `Assertion` union: verified requires a `Citation`; unverified never typed as fact |
| CR-12 no silent escalation | `PermissionDeniedVM` = visible-but-locked + who-to-ask; capabilities reported, never inferred |
| CR-13 deadline safety | `requiresHumanConfirmation`; computation trace as `SlotValue`; states never colour-only (rendering) |
| CR-15 one price, two modes | `PriceVM` always component-separable; `renderMode` a SlotValue; official fee distinct |
| CR-16 vocabulary | Enum label sets are the controlled lexicon; no "Marketplace"; ALDASSIST wordmark (rendering) |
| CR-17 Responding status-only | `RespondingVM` = status + deadline + upload; no authoring surface representable |
| CR-18 no V2 | No view-model exists for drafting/prosecution/renewals/monitoring/institution/licensing/multi-currency |
| CR-19 no invented values | `SlotValue` / `LegalContentSlot` everywhere the baseline is open |
| CR-21 agent stats floor | `OutcomeStatVM` cannot represent a sub-floor number |
| DR-01 / DR-02 / O-2026-001 | Modelled as capability / absent-extensible / config slot — none resolved |

---

## 9. What this document deliberately does NOT do

- No product UI code, no components, no screens, no app, no scaffold, no token pipeline, no Storybook — those begin at **B1** on your go.
- No resolution of DR-01, DR-02, or O-2026-001.
- No invented fee, turnaround, confidence scale, deadline timing, retention window, channel default, or legal wording.
- No Public-surface rendering-strategy decision (held per D-2026-022).
- No change to any frozen Phase 1–7 document; no git commit.

---

## 10. Recommended next step (for review)

On approval of this contract, **B1** realises it: create `04_Development/` scaffold (React + TS + Vite per D-2026-022), express §3–§5 as `.ts` types, implement `FixtureProvider` + the §6.2 scenarios, stand up the token pipeline and Storybook, and build the first slice (trust primitives + the verdict screen SC-C08) against these fixtures. No B1 work is started here.

---

*End of Phase 8 — B0 Presentation-Data Contract & Fixture Strategy, DRAFT v0.1. Specification only; awaiting owner review. No UI built, no open decision resolved, no value invented, nothing committed.*
