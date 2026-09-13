# ALDASSIST UI — Phase 8 (B1 first slice)

Front-end for ALDASSIST, built on the frozen Phase 6 (D-2026-020) + Phase 7 (D-2026-021) baselines and the approved B0 presentation-data contract (D-2026-022). **Fixture-driven; no back end** — Phase 9 will implement the provider ports against real services behind the identical interfaces.

## What B1 contains

- **Design-token pipeline** — `scripts/build-tokens.mjs` transcribes the frozen Phase 7 tokens into a three-tier CSS-custom-property chain (`src/tokens/tokens.generated.css`). Foundation → semantic → component; components consume component/semantic vars only.
- **Presentation-data contract** — `src/contract/` realises B0 as TypeScript (primitives, assessment/verdict, invention header, provider ports).
- **FixtureProvider + scenarios** — `src/fixtures/` implements the `AssessmentProvider` port and the mandatory SC-C08 scenarios.
- **Trust primitives** — `src/components/` (StateChip, AttentionMarker, WhoseTurn, ProvenanceCitation, CitationPanel, HumanReviewIndicator, ConfidenceIndicator, EvidenceBlock, Button, Icon).
- **Client shell** — `src/shell/` (header, sidebar, breadcrumbs, tabs, object-page header, relationship rail).
- **SC-C08 Assessment Verdict** — `src/screens/AssessmentVerdict/` — the trust-critical ★★ screen.
- **Storybook** — the living Component Catalogue surface.

## Run it

```bash
npm install
npm run dev          # app with the SC-C08 scenario switcher (Vite)
npm run storybook    # component catalogue
npm run build        # tsc --noEmit && vite build
npm run typecheck
npm run build:tokens # regenerate tokens.generated.css
```

Requires Node ≥ 20.

## Scope discipline (carried from D-2026-022)

No back end, no auth, no hosting/deploy, no Public-surface rendering strategy. DR-01, DR-02, O-2026-001 are **not** resolved (modelled as capability / absent / config slots). Every open value is a typed `SlotValue` / `LegalContentSlot` — **no value is invented**. Light is the MVP theme; dark is a structural `[SLOT]`, not authored. Frozen Phase 1–7 documents are unmodified.

## What's next (not started)

B2 (Client Vault path) per the Phase 8 batch plan, on owner approval.
