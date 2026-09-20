# ALDASSIST Phase 8 — External-Source Traceability Manifest

**Purpose (audit finding M3):** enumerate every value the UI *displays* that is transcribed from a **canonical
governance source outside this repository**, so each is checkable against a source of truth. This manifest is
built entirely from in-repo evidence; it **does not reproduce, paraphrase, or fabricate** any external source's
contents. Where a source is not present in the repo, that is recorded as the verification status — the value
is only as trustworthy as its (external) transcription until governance links the source here.

**Standing dependency:** include or link the canonical sources named below (chiefly `Metrics.md`) into the
repository so a future audit can verify the transcriptions directly. Until then these rows remain
**"source not in repo — governance to link."**

---

## 1. Business-dashboard metric TARGETS (`src/fixtures/scenarios/ops.ts`)

These are policy **targets/thresholds** rendered on SC-O05 (Business metrics dashboard). They are modeled as
`status:'resolved'` / `source:'config'` via the `val()` helper (`ops.ts:17`) because they are fixed policy
definitions, **not** frozen-open decisions. Every corresponding **measured value stays `pending`** (Phase-9
measurement) — nothing is computed or invented. Their fidelity depends on transcription from the cited source.

| Metric | Displayed target (as in fixture) | Fixture location | Cited canonical source | Verification status |
|--------|----------------------------------|------------------|------------------------|---------------------|
| OP-1 Disclosure→Filing Conversion | `>25%` (threshold `~15%`) | `ops.ts:123` | Metrics.md / D-2026-018 | source not in repo — governance to link |
| OP-2 Released Assessment→Paid Filing | target **pending** (uncalibrated); threshold `<15%` | `ops.ts:132` | Metrics.md / D-2026-018 | target deliberately unresolved (no transcription risk) |
| OP-3 Agent-Hours per Matter | `−40% within 18 months` (baseline undefined in repo, per its own note) | `ops.ts:124` | Metrics.md / D-2026-018 | source not in repo — governance to link |
| OP-4 Recurring Revenue Share | `>40% by Year 3` | `ops.ts:125` | Metrics.md / D-2026-018 | source not in repo — governance to link |
| OP-5 Missed Deadlines (platform-attributable) | `Zero — each a Sev-1 incident (24h client disclosure, NFR-C01)` | `ops.ts:128` | Metrics.md / D-2026-018 (+ NFR-C01) | source not in repo — governance to link |
| OP-5 Missed Deadlines (total operational) | `No zero bar — monitored as a separate operational measure` | `ops.ts:129` | Metrics.md / D-2026-018 | source not in repo — governance to link |
| OP-6 % AI Output Materially Edited | `<15% (falling toward)` (threshold `<20% (must-hold)`) | `ops.ts:133` | Metrics.md / D-2026-018 | source not in repo — governance to link |

Notes: the `ops.ts` header already states these are "transcribed EXACTLY from Metrics.md / D-2026-018" and
that all measured values are pending slots; OP-3 carries an in-fixture note that its baseline is undefined in
the repository. This manifest does not restate Metrics.md — it points to it.

## 2. CR-16 / P4:§10.3 vocabulary lexicon

The authoritative banned/required marketing lexicon is external governance not in the repo. It is handled
separately under audit **M2**: the provisional seed lives in `src/test/vocabulary.lexicon.ts`
(`LEXICON_IS_AUTHORITATIVE = false`), the single swap-in point. Verification status: **source not in repo —
governance to supply the frozen list.**

## 3. Token-hierarchy traceability

The D-2026-023 token-hierarchy rules are enforced in-repo by `scripts/check-token-hierarchy.mjs` (Gate A/B,
§B.14 five-family allowance, anti-leak self-test). The narrative traceability document
(`Phase-8-B1-TokenHierarchy-Traceability.md`) currently lives under the working `Claude outputs` area, not in
the source tree. Verification status: **enforcement present in repo; narrative doc external — governance to
link if it should ship with the source.**

---

*This manifest is descriptive only. It changes no fixture value, resolves no open slot, and reproduces no
external source. Update the verification-status column to "verified against <path>" once each canonical source
is linked into the repository.*
