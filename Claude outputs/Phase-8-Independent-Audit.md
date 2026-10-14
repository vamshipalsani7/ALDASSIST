# ALDASSIST — Phase 8 Comprehensive Independent Audit (B1–B9)

**Scope:** Batches B1–B9 of the Phase 8 UI, reviewed against the approved batch scope, the frozen
Phase 6/7 decisions, and the Phase 8 governance CRs / open-slot regime.
**Mode:** Read-only. No implementation, no Git operations were performed.
**Method:** Whole-repository static review + independent re-run of the full validation suite, corroborated
by three parallel evidence passes (open-slot/invented-value, governance CRs, cross-surface/a11y/scope).

---

## 1. Verdict

**PASS with findings.** The Phase 8 UI is governance-conformant by construction across all four surfaces
(Client, Agent, Operations, Public). No open decision or slot is resolved in any product surface; no invented
prices, legal copy, statistics, timelines, or confidence values were found in product output. All CRs examined
(CR-2, 4, 5, 6, 12, 13, 15, 16, 17, 19, 21) conform at the enforcement level, largely via discriminated-union
types and shared components (`ScreenState`, `AiAuthorshipMarker`, `PriceDisplay`, the trust primitives).

The findings below are **accuracy, traceability, and test-coverage gaps** — none is a governance breach in
product output — plus one documentation drift. Four warrant an accuracy fix before Phase 9 (M1–M3, L5); the
rest are optional hardening.

**Independence caveat:** this session authored B8 and B9. This audit is therefore not fully independent for
those two batches; findings touching them (M1 open-slot test scope, M2 vocabulary lexicon, L5 Gate-A drift)
are self-identified and should be confirmed by a reviewer with no authorship stake. B1–B7 were authored in
prior sessions.

---

## 2. Validation baseline (independently re-run this session)

| Gate | Result | Notes |
|------|--------|-------|
| typecheck (`tsc --noEmit`) | **exit 0** | clean |
| tests (`vitest run`) | **178 passed / 48 files** | incl. B9 cross-cutting specs |
| token Gate A | **209** disallowed refs | inherited deferred debt; **0 new** (see L5 re: baseline drift) |
| token Gate B | **0** hard-fails | definition chain intact |
| token anti-leak | **0** | five-family allowance never leaks into Gate A |
| token harness | **0** | demo harness contained |
| sanctioned component→foundation defs | **7** | unchanged (D-2026-023 §B.14) |
| raw-value scanner | **20 inherited / 0 new** | structural px/em only; not remediated (by mandate) |
| vocabulary (CR-16) | **0 violations** | provisional seed — see M2 |
| build (`vite build`) | **exit 0** | built in ~2.5s |
| Storybook (`build-storybook`) | **exit 0** | preview built |

Commit chain verified on disk: B3 `0d09edb` → B4 `9b85cbd` → B5 `67eac0a` → B6 `72c8937` → B7 `f3b1c27` →
B8 `723c6d0` → **B9 `c1fa2de`** (HEAD == origin/main).

---

## 3. Scope conformance (B1–B9)

Conforms. No scope creep or unrelated redesign detected.

- Every one of the 56 screen components is imported and wired into the harness `src/App.tsx`; no orphan.
- No `TODO` / `FIXME` / `HACK` / `console.*` anywhere in `src/`.
- No dead files: `DepthDisclosure`, `useResolvedCitation`, `assessment.cr2-typecheck.ts` (a deliberate
  compile-only guard, excluded from the test glob) and all shell helpers are referenced.
- Barrels complete: `contract/index.ts` re-exports all 11 contract modules; `components/index.ts` exports the
  15 public components + `IconName`. No duplicate/missing exports. (Low: the citation exports are a
  deliberately broad public surface reserved as the Phase-9 resolver seam — not dead code.)
- B9 added zero new product CSS/tokens; the four surface shells reuse existing classes.

---

## 4. Open decisions / slots — CONFIRMED UNRESOLVED

Every frozen-open item remains a container in all **product** surfaces. Verified pending across the fixtures:

| Item | State | Evidence (representative) |
|------|-------|---------------------------|
| **O-2026-001** pricing rendering mode | `pending-slot` | `public.ts:17`, `home.ts:16`, `agent.ts:20`, `matters.ts:22` (open `price()`); amounts + bundled total all pending |
| **L1 / L1-04** fee legal wording | `pending-legal` | `public.ts:20-25`; disclosures throughout |
| **L3** publication go-live gate | `pending-legal` / gated | `public.ts:204`, `agent.ts:202`; AgentPublicProfile renders "gated on legal review" |
| **L4** trust-page legal wording | `pending-legal` | `public.ts:214,220` |
| **Rules-Engine** official fees / cost range / jurisdiction fees / next-event | `pending-slot` | `public.ts:22,142,178`; `portfolio.ts:90`; `home.ts:38` |
| **S-3** agent-stat confidence | `pending-slot` (n publishes, confidence does not) | `public.ts:195,202`; `agent.ts:200`; structurally via `AgentStatsVM` |
| **MFA** client policy | `pending-slot` | `public.ts:235` (auth) **and** `home.ts:78` (settings / S-10) |
| **SSR/SSG** rendering strategy | not represented | correctly untouched |

No `LegalContentSlot` anywhere is `status:'provided'`. No hardcoded currency exists in `src` (no ₹/Rs/INR/$/€
+ digits). The below-floor agent-stats path returns "not enough data yet" and never a statistic, enforced by
the union type and by per-screen tests. `PriceDisplay` renders pending amounts as "amount not set" and keeps
the official fee separately identifiable in both modes; when the mode slot is unfilled it renders the
component layout **and states O-2026-001 is open** rather than deciding it.

**The only resolved open-slot instance is a demo/test fixture — see finding L1.**

---

## 5. Governance CR conformance

| CR | Verdict | Basis |
|----|---------|-------|
| **CR-2** human review gate | CONFORMS | `AssessmentVM` union: only `released` carries `verdict`; showing a verdict pre-release is unrepresentable. `@ts-expect-error` compile proof in `assessment.cr2-typecheck.ts`. Pre-release renders `PreReleasePanel`, never a partial verdict. |
| **CR-4** two-axis status | CONFORMS | `TwoAxisStatus<L>` keeps lifecycle/attention separate; `ObjectHeader` renders `StateChip` + `AttentionMarker` as distinct siblings; attention distinguished by icon **shape** + text, colour confirmatory only. |
| **CR-5** cross-tenant 404 | CONFORMS | Only representation is `not-found`; `ScreenState` renders a uniform "This page does not exist." leaking nothing. All 56 screens delegate; guard-ordering (return before object context) verified on every object-detail screen. *(Test-coverage unevenness → L4.)* |
| **CR-6** provenance / freshness / AI label | CONFORMS | (a) `Assertion` is binary verified\|unverified, fail-closed to "unverified" when a citation can't resolve; (b) AI content labelled via shared `AiAuthorshipMarker` at all 5 AI-authored surfaces; (c) `FreshnessStamp.stale` actually rendered (ApplicationDetail "may be out of date" banner). *(Marker straggler → L3.)* |
| **CR-12** permission-denied | CONFORMS | Distinct visible-but-locked branch with reason + who-can-act, separate from 404; asserted different from 404 in tests. |
| **CR-13** deadline safety | CONFORMS | `HumanReadableRange` typed "never a countdown"; no `countdown/daysLeft/timeRemaining/setInterval/Date.now` in render; deadlines show static date + text window; unavailable trace → "we do not show a basis we cannot verify". |
| **CR-15 / O-2026-001** price display | CONFORMS | Official fees always separately identifiable in both modes; amounts never invented; mode stays open. |
| **CR-16** vocabulary | CONFORMS on inspection; **automated coverage provisional → M2** | "Marketplace"/banned terms appear only in comments, internal route paths, and negative tests — never in rendered copy. Wordmark "ALDASSIST" consistent. |
| **CR-17** responding status-only | CONFORMS | `ApplicationDetailVM.responding` variant carries only status/deadline/off-platform-note + an uploaded-response *reference*; no authoring/content field exists on the variant. |
| **CR-19** no invented values | CONFORMS | No fabricated money/legal/statistics/timelines in product output (see §4). |
| **CR-21 / D-2026-019** agent stats | CONFORMS; **soft floor → L2** | `AgentStatsVM` structurally forbids a below-floor statistic; published shows sample-size + confidence-slot; publication L3-gated. |

Frozen Phase 6/7 decisions and the D-2026-023 token hierarchy (Gate A/B, §B.14 five-family allowance, the
anti-leak invariant) are intact; the anti-leak self-test passes and is unit-tested.

---

## 6. Findings register (severity-ranked)

### MEDIUM — accuracy / traceability (fix before Phase 9)

**M1 — Open-slot preservation test under-covers the frozen slots (and misses the one resolved instance).**
`src/test/openSlots.preservation.test.ts` imports only `scenarios/public`. Its (sound) recursive
`assertNoResolvedSlot` helper is applied only to `pricing.catalogue`, `costPlanner`, and
`jurisdiction.feeStructure`. Consequences: (a) the single place that resolves O-2026-001 —
`priceDisplayScenarios.component/bundled` in `matters.ts:122-123` — is never imported, so the test cannot see
it; (b) L3 (`agent.ts:202`), L4 (trustScenarios, `public.ts`), the agent-surface S-3/S-1 slots, and the
settings/S-10 MFA slot (`home.ts:78`) are unguarded. The test docstring claims broader coverage than it
delivers. **Accuracy fix:** run `assertNoResolvedSlot` over the full exported scenario trees of `matters`,
`agent`, `home`, `portfolio`, `ops`, add explicit L3/L4/second-MFA assertions — or narrow the docstring to
what it actually guards.

**M2 — CR-16 automated vocabulary enforcement is provisional, not authoritative.**
`vocabulary.crosscutting.test.ts` runs on a grounded **seed** (`marketplace/affordable/cheap/starting
from/testimonial`) and self-declares `LEXICON_IS_AUTHORITATIVE = false`; the complete frozen CR-16 / P4:§10.3
banned/required lexicon is not in the repository. Manual inspection found no banned terms in rendered copy
(so CR-16 conforms in practice), but the automated *guarantee* is a regression guard over a partial list,
not a complete CR-16 check. **Accuracy fix:** supply the authoritative lexicon and flip the flag; until then
record CR-16 as "conforms on inspection; automated coverage provisional."

**M3 — Displayed governance values cite canonical sources absent from the repository (traceability).**
The Business-dashboard metric **targets** in `ops.ts` (`>25%`, `−40% within 18 months`, `>40% by Year 3`,
`<15% (falling toward)`, the OP-5 zero-bar wording) are `status:'resolved'`/`config`, annotated "transcribed
from the canonical Metrics.md". `Metrics.md` is **not present in the repo**, so their fidelity cannot be
verified within the audited artifact. These are legitimate config-owned targets (all *measured* values stay
`pending`; OP-3 even flags its baseline is undefined) — not fabrications — but the transcription is
unverifiable here. Same class as M2. **Accuracy fix:** include or link the canonical source (Metrics.md and
the token-hierarchy traceability doc) so the numbers are checkable against a source of truth.

### LOW — hardening / consistency (optional)

**L1 — O-2026-001 mode resolved in a demo fixture.** `priceDisplayScenarios.component/bundled`
(`matters.ts:122-123`) set `renderingMode:{resolved,config}`. Consumed **only** by `PriceDisplay.stories.tsx`
and `priceDisplay.test.tsx` — never by any product screen/provider (all product prices use the open
`price()`), and documented at `matters.ts:4-6`. It legitimately exercises the resolved-mode render path for
Phase-9 readiness. Not a product violation, but it is an exported fixture that closes an open slot and sits
outside the preservation test's view (ties to M1). *Optional:* isolate it as demo-only or drive both layouts
from a test-local override.

**L2 — CR-21 n≥20 floor is comment-only.** `AgentStatsVM` published branch is `{ n: number; confidence }`
with the floor as a `// n ≥ 20` comment (`contract/matters.ts:109`). The union guarantees below-floor carries
no statistic and published carries sample-size + confidence, but nothing structurally forbids `published`
with n<20 — enforcement relies on providers/fixtures. Low risk; worth a note for Phase-9 provider design.

**L3 — DisclosureCapture reuses the `.ai-marker` structural class outside the shared component.**
`DisclosureCaptureScreen.tsx:52-53` hand-rolls `.ai-marker`/`.ai-marker__label` for the Tier-1 "completeness
check" banner (label omits "AI"). Documented as intentionally out of scope for `AiAuthorshipMarker`
(component doc:16-19). It is the one place reusing the AI-marker structural class outside the component — a
minor consistency ambiguity, not a defect. *Optional:* give the completeness banner its own class to remove
the structural overlap with the AI-authorship marker.

**L4 — Uneven CR-5 regression test coverage.** The code path is uniform and correct (all 56 screens delegate
to `ScreenState`; guard-ordering verified), but only ~8 screens assert the not-found path and only 2
dedicated `crossTenant.test.tsx` exist. Object-detail screens with a `CrossTenant404` story but **no**
not-found assertion: `AssessmentsList`, `DecisionRecord`, `AssessmentRequest`, `DisclosureVersions`,
`DisclosureCapture`, `QuoteEngagement`. Behavior is correct; the regression net is uneven.

**L5 — Documentation drift: Gate-A baseline 211 vs actual 209.** B9's approved AssessmentVerdict→`ScreenState`
refactor removed two inline `var(--color-text-muted)` references, reducing Gate A from 211→209.
`scripts/verify.mjs` (`INHERITED_GATE_A_BASELINE = 211`) and `B9-verification-runbook.md` still state 211. The
gate still reports correctly (new debt 0, since 209 ≤ 211) and `verify` prints "current 209", so this is
cosmetic — but the *documented* baseline is stale. **Accuracy fix:** update the constant/doc to 209 with the
−2 provenance, or keep 211 with an explicit "current 209 (−2, B9 ScreenState refactor)" note.

### INFORMATIONAL — positively verified, no action

- No hardcoded currency anywhere; all fees pending; official fee separable in both PriceDisplay modes.
- Below-floor agent stats → "not enough data yet", never a statistic (structural + per-screen tests).
- CR-2 verdict-before-release is *unrepresentable* (union + compile-time `@ts-expect-error` guard).
- Freshness `stale` flag is actually rendered, not just modeled.
- The "roughly the last 18 months" publication-blackout statements are factual limitation notes, not
  countdowns (CR-13 safe); window headings ("Next 90 days") are filter labels, not per-object timelines.
- Four shells consistent: skip-link, single `<main id="main">`, labelled nav landmark, banner header; the
  Public header/footer difference is intentional (anonymous surface).
- Icons `aria-hidden`; every status chip pairs icon + text; no colour-only status indicator.
- Providers are presentation-only `Loaded<T>` lookups with no business logic.

---

## 7. Required accuracy fixes (actionable subset)

1. **M1** — extend the open-slot preservation test to the full scenario tree (or narrow its docstring); it
   currently does not guard the one fixture that resolves O-2026-001, nor L3/L4/agent-surface/second-MFA slots.
2. **M2** — obtain the authoritative CR-16/P4:§10.3 lexicon; until supplied, the vocabulary gate is a
   provisional regression guard, not a complete CR-16 check (already self-declared, but must be surfaced to
   the audit sign-off).
3. **M3** — provide/link the canonical `Metrics.md` (and token-hierarchy traceability doc) so the displayed
   metric targets are verifiable against a source of truth.
4. **L5** — reconcile the Gate-A baseline documentation (211) with the actual count (209).

L1–L4 are optional hardening and carry no correctness risk in current product output.

---

## 8. Attestation & limitations

- **Read-only:** no files were modified and no Git operations were run during this audit.
- **Coverage:** whole-`src/` static review + full validation re-run + three corroborating evidence passes.
- **Limits:** (a) the audit is bounded by the repository — canonical sources referenced but absent
  (`Metrics.md`, the frozen CR-16 lexicon, the P4/D-decision documents) could not be checked, hence M2/M3;
  (b) fixtures are synthetic by design (Phase 9 wires real data/providers), so runtime behaviour against live
  data is out of scope; (c) this session authored B8/B9, so B8/B9 findings are self-identified and merit
  confirmation by an unconflicted reviewer.

*End of Phase 8 independent audit.*
