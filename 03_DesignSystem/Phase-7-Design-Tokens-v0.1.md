# Phase 7 — Design Tokens

**FROZEN — PHASE 7 BASELINE (v0.1) · 2 SEPTEMBER 2026 · REPOSITORY OWNER (VAMSHI)**

> **Freeze notice — Phase 7 (Design System), 2 September 2026.** This document is part of the Phase 7 baseline, declared **frozen on 2 September 2026 by the repository owner (Vamshi)**; recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-021). Frozen at version v0.1. The owner **approved the Phase 7 visual design proposals** — the **Calm Institutional** direction, **Inter** (UI/body), **IBM Plex Mono** (monospace), **Lucide** (icon set), the semantic **colour system**, the **spacing / grid / layout** system, the **breakpoints**, and the **≥44×44px** touch-target design target — which are now owner-approved design decisions. Every Phase 6 constraint (CR-1…CR-21) and UX principle (UXP-1…UXP-10) is preserved; **DR-01, DR-02 and O-2026-001 remain deferred / open**, all V2 boundaries are unchanged, and all remaining `[SLOT]` / `[LEGAL CONTENT SLOT]` values stay open as specified. As with every frozen document, it is not modified without an explicit architectural decision; where superseded, a historical notice is added rather than the content rewritten. This freeze changes no design substance. *(Supersedes the working-document status noted below.)*

> **Post-freeze status notice — current authority (added after the freeze).** **Phase 7 is FROZEN as of 2 September 2026 under D-2026-021**, and the owner has **approved** every `[P7-PROPOSAL]` brand-defining value (Calm Institutional, Inter, IBM Plex Mono, Lucide, the semantic colour system, spacing/grid/layout, breakpoints, ≥44×44px). Consequently, any wording elsewhere in this document that describes Phase 7 as a *working document*, as *awaiting owner review / approval*, or the `[P7-PROPOSAL]` values as *awaiting owner sign-off* / *proposed for owner sign-off* — including the `**Type:** Working document` line below, the governance-label note, the palette caption, the Part J slot row, and the end-of-document footer — reflects the **pre-freeze working state** and is retained for **historical traceability only**, superseded by the freeze notice above and by D-2026-021. No token value, colour, type, spacing, or other design content is affected by this notice.

**Phase:** 7 — Design System · **Document:** 2 of 4 (Design Tokens)
**Type:** Working document (not frozen). Version v0.1.
**Date:** 2 September 2026
**Owner:** Vamshi
**Companion documents:** `Phase-7-Design-System-v0.1.md` · `Phase-7-Component-Catalogue-v0.1.md` · `Phase-7-Design-Governance-v0.1.md`

> **Scope.** The token architecture and values for the ALDASSIST design system. **Specification only** — no code, no framework, no build. Values are expressed in a framework-neutral form (name → value) so any future implementation (Phase 8/9) can map them to CSS variables, a JSON token file, or a design tool, without this document assuming any of them.

> **Governance labels** (STEP 14): concrete brand-defining values — exact hues and the chosen typefaces — are **[P7-PROPOSAL]** for owner sign-off at the gate. The token *architecture*, *names*, *roles* and *relationships* are **[P7-DESIGN-DECISION]**. Values that need calibration/testing are **[SLOT]**. This document resolves no product/business/legal decision.

**Trace vocabulary** as in the companion documents.

---

# PART A — Token architecture (STEP 8)

## A.1 Three tiers `[P7-DESIGN-DECISION]`

Tokens are layered so components never bind to raw values, and a value can change in one place without touching components — the maintainability requirement `[AP-12]`/`[WP4 Part C boundary]`.

```
FOUNDATION tokens        raw, context-free primitives
   (palette ramps, type primitives, space scale, radii, shadows, durations, breakpoints)
        │  referenced only by ↓
SEMANTIC tokens          role/intent names bound to foundation tokens
   (color.text.primary, color.status.danger.fg, space.section-gap, focus.ring …)
        │  referenced only by ↓
COMPONENT tokens         per-component values bound to semantic tokens
   (button.primary.bg, statechip.danger.border, input.focus.ring …)
```

**Binding rule `[P7-DESIGN-DECISION]`:** a component reads **component tokens**; component tokens resolve to **semantic tokens**; semantic tokens resolve to **foundation tokens**. Components never reference a foundation token directly. This is what lets a theme (or an owner colour change) propagate without editing components — and it is why STEP 8 forbids tying every component directly to raw values.

## A.2 Naming convention `[P7-DESIGN-DECISION]`

`category.role[.variant][.state]`, lowercase, dot-separated, hyphenated words.
Examples: `color.text.primary`, `color.status.danger.fg`, `color.attention.at-risk.icon`, `space.4`, `button.primary.bg.hover`, `type.title.size`.
Governance rules for names live in `Phase-7-Design-Governance-v0.1.md` (naming section).

---

# PART B — Foundation tokens

## B.1 Colour ramps `[P7-DESIGN-DECISION architecture] · [P7-PROPOSAL values]`

Calm Institutional. Cool neutral with a slight blue undertone; a single deep ink-blue primary; a dedicated provenance slate-teal; low-saturation status ramps. Hex values are proposed for owner sign-off; the *ramp structure* is the design decision.

### Neutral (cool grey)
| Token | Value | Typical use |
|---|---|---|
| `palette.neutral.0` | `#FFFFFF` | base surface / page |
| `palette.neutral.25` | `#F8FAFC` | app canvas / subtle surface |
| `palette.neutral.50` | `#F1F4F8` | subtle fill / hover surface |
| `palette.neutral.100` | `#E4E9F0` | hairline border |
| `palette.neutral.200` | `#CDD5E0` | default border |
| `palette.neutral.300` | `#AEB9C9` | strong/emphasis border |
| `palette.neutral.400` | `#8A96A8` | disabled text (exempt) |
| `palette.neutral.500` | `#626D7B` | muted text / metadata |
| `palette.neutral.600` | `#515D6E` | secondary text |
| `palette.neutral.700` | `#3A4453` | body text |
| `palette.neutral.800` | `#262E3A` | headings |
| `palette.neutral.900` | `#151B24` | max ink / titles |

### Primary (deep ink-blue)
| Token | Value | Use |
|---|---|---|
| `palette.primary.50` | `#EBF1FA` | tint surface / selected-subtle |
| `palette.primary.100` | `#D0DEF2` | subtle fill |
| `palette.primary.200` | `#A6C0E5` | border-accent |
| `palette.primary.300` | `#6E97D3` | on-dark accent |
| `palette.primary.400` | `#3F6DBA` | — |
| `palette.primary.500` | `#2A5296` | **primary** (action/link/focus) |
| `palette.primary.600` | `#21447D` | hover / pressed |
| `palette.primary.700` | `#1A3765` | strong / accessible text-link on light |
| `palette.primary.800` | `#142A4E` | max |

### Provenance / secondary (muted slate-teal)
| Token | Value | Use |
|---|---|---|
| `palette.prov.50` | `#E8F1F1` | evidence-panel surface |
| `palette.prov.100` | `#CBE0E1` | subtle fill |
| `palette.prov.300` | `#6FA6A9` | decorative/on-tint accent (not for essential contrast; ~2.7:1 on white) |
| `palette.prov.500` | `#3C7A80` | provenance accent (icon/border) |
| `palette.prov.600` | `#2F6167` | provenance emphasis |
| `palette.prov.700` | `#244C51` | provenance text (≥4.5:1) |

### Status — Success (calm green)
| Token | Value |
|---|---|
| `palette.success.50` | `#E7F3EC` |
| `palette.success.100` | `#C6E3D1` |
| `palette.success.500` | `#2E7D52` (icon/border) |
| `palette.success.600` | `#246343` (text) |
| `palette.success.700` | `#1C4E35` (text-strong) |

### Status — Warning (amber)
| Token | Value |
|---|---|
| `palette.warning.50` | `#FBF1DC` |
| `palette.warning.100` | `#F5DFB0` |
| `palette.warning.500` | `#B87503` (icon/border) |
| `palette.warning.600` | `#8F5B02` (text) |
| `palette.warning.700` | `#6E4602` (text-strong) |

### Status — Danger (calm red; used with restraint)
| Token | Value |
|---|---|
| `palette.danger.50` | `#FBEAE7` |
| `palette.danger.100` | `#F4C9C2` |
| `palette.danger.500` | `#C0392B` (icon/border) |
| `palette.danger.600` | `#9E2A20` (text) |
| `palette.danger.700` | `#7E211A` (text-strong) |

### Status — Info (desaturated slate-blue, distinct from primary)
| Token | Value |
|---|---|
| `palette.info.50` | `#EAF0F6` |
| `palette.info.100` | `#CCDCEA` |
| `palette.info.500` | `#3F6488` (icon/border) |
| `palette.info.600` | `#32506E` (text) |
| `palette.info.700` | `#274056` (text-strong) |

## B.2 Type primitives `[P7-DESIGN-DECISION] · [P7-PROPOSAL for families]`

| Token | Value |
|---|---|
| `font.family.sans` | `Inter, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` [P7-PROPOSAL: Inter] |
| `font.family.mono` | `"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace` [P7-PROPOSAL: IBM Plex Mono] |
| `font.weight.regular` | 400 |
| `font.weight.medium` | 500 |
| `font.weight.semibold` | 600 |
| `font.size.900` (display) | 40px / 2.5rem |
| `font.size.800` (title h1) | 30px / 1.875rem |
| `font.size.700` (h2) | 24px / 1.5rem |
| `font.size.600` (h3) | 20px / 1.25rem |
| `font.size.500` (h4) | 17px / 1.0625rem |
| `font.size.450` (body-reading) | 18px / 1.125rem |
| `font.size.400` (body) | 16px / 1rem |
| `font.size.300` (secondary/label) | 14px / 0.875rem |
| `font.size.200` (caption) | 13px / 0.8125rem |
| `font.size.100` (legal) | 12px / 0.75rem |
| `line.height.tight` | 1.2 (titles) |
| `line.height.snug` | 1.35 (subheadings) |
| `line.height.normal` | 1.5 (UI body) |
| `line.height.relaxed` | 1.6 (reading) |
| `letter.spacing.tight` | -0.01em (large titles) |
| `letter.spacing.normal` | 0 |
| `numeric.tabular` | on (data/prices/deadlines/IDs) |

## B.3 Space scale (4px base) `[P7-DESIGN-DECISION]`

| Token | px | Token | px |
|---|---|---|---|
| `space.0` | 0 | `space.6` | 24 |
| `space.1` | 2 | `space.7` | 32 |
| `space.2` | 4 | `space.8` | 40 |
| `space.3` | 8 | `space.9` | 48 |
| `space.4` | 12 | `space.10` | 64 |
| `space.5` | 16 | `space.11` | 80 |
| | | `space.12` | 96 |

## B.4 Radius `[P7-DESIGN-DECISION]`

| Token | Value | Use |
|---|---|---|
| `radius.none` | 0 | dividers, structural |
| `radius.sm` | 4px | inputs, chips, small controls |
| `radius.md` | 8px | cards, buttons |
| `radius.lg` | 12px | modals, sheets, panels |
| `radius.pill` | 999px | pills, avatars, status chips |

## B.5 Border widths `[P7-DESIGN-DECISION]`

| Token | Value |
|---|---|
| `border.width.hairline` | 1px |
| `border.width.strong` | 1.5px (emphasis / compact-table separation) |
| `border.width.focus` | 2px |

## B.6 Elevation (soft, low) `[P7-DESIGN-DECISION]`

| Token | Role | Proposed shadow |
|---|---|---|
| `elevation.0` | flat / border-only | none |
| `elevation.1` | card on scroll | `0 1px 2px rgba(21,27,36,.06), 0 1px 1px rgba(21,27,36,.04)` |
| `elevation.2` | dropdown / popover | `0 4px 12px rgba(21,27,36,.10)` |
| `elevation.3` | modal / drawer | `0 12px 32px rgba(21,27,36,.16)` |
| `elevation.4` | toast | `0 6px 20px rgba(21,27,36,.14)` |

## B.7 Motion `[P7-DESIGN-DECISION]`

| Token | Value | Use |
|---|---|---|
| `motion.duration.instant` | 0ms | reduced-motion / immediate |
| `motion.duration.fast` | 120ms | hover, small state |
| `motion.duration.base` | 200ms | expand, reveal, enter |
| `motion.duration.slow` | 320ms | sheet/drawer/modal |
| `motion.easing.standard` | `cubic-bezier(.2,0,0,1)` | entrances |
| `motion.easing.exit` | `cubic-bezier(.4,0,1,1)` | exits |
| `motion.reduced` | disables non-essential motion | reduced-motion preference `[P4:§22.3]` |

**Rule:** no looping/pulsing/attention-seeking motion; **no countdown animation** `[UXP-2]`.

## B.8 Breakpoints `[P7-DESIGN-DECISION]` — fills `[SLOT W4-1]`

| Token | Value |
|---|---|
| `breakpoint.mobile` | < 640px |
| `breakpoint.tablet` | 640–1023px |
| `breakpoint.desktop` | ≥ 1024px |
| `breakpoint.wide` | ≥ 1440px |

## B.9 Z-index scale `[P7-DESIGN-DECISION]`

| Token | Value | Use |
|---|---|---|
| `z.base` | 0 | content |
| `z.sticky` | 100 | sticky headers/footers |
| `z.dropdown` | 200 | menus/popovers |
| `z.drawer` | 300 | side drawers |
| `z.modal` | 400 | modals / full-screen sheets |
| `z.toast` | 500 | toasts |
| `z.max` | 900 | critical system overlays |

## B.10 Sizing (controls) `[P7-DESIGN-DECISION]`

| Token | Value | Use |
|---|---|---|
| `size.control.sm` | 32px height | compact controls (agent/ops) |
| `size.control.md` | 40px height | default control |
| `size.control.lg` | 48px height | primary/mobile control |
| `size.touch.min` | 44px | minimum touch target [P7-PROPOSAL] `[WP4 W4-6]` |
| `size.icon.sm` | 16px | inline icon |
| `size.icon.md` | 20px | control icon |
| `size.icon.lg` | 24px | standalone/nav icon |

---

# PART C — Semantic colour tokens + STEP 4 usage system

> **STEP 4 requires, for every semantic colour:** purpose · allowed usage · forbidden usage · contrast requirement · whether it may appear alone or must have text/icon reinforcement. The table below is that specification. **Binding rule (CR-4/§22.3):** any token in the *status* or *attention* families is a "meaning-bearing" colour and may **never** appear alone — the consuming component must also render an icon shape and a text label.

## C.1 Surface & structure roles

| Semantic token | Bound to | Purpose | Allowed | Forbidden | Contrast | Alone? |
|---|---|---|---|---|---|---|
| `color.bg.page` | neutral.0 | Page base | Page background | — | n/a | Yes (non-semantic) |
| `color.bg.canvas` | neutral.25 | App canvas behind cards | App shell bg | — | n/a | Yes |
| `color.bg.subtle` | neutral.50 | Subtle fill, hover surface, table stripe | Fills, hovers | Carrying status meaning | n/a | Yes |
| `color.bg.raised` | neutral.0 | Card/panel surface | Cards, panels, modals | — | n/a | Yes |
| `color.border.subtle` | neutral.100 | Hairline dividers | Dividers, card edges | Sole status signal | Decorative — not the sole identifier of a control; not held to 3:1 (see note) | Yes |
| `color.border.default` | neutral.200 | Default control/card border | Inputs, cards | Being the sole identifier of a control's essential state | Decorative resting boundary — see note | Yes |
| `color.border.strong` | neutral.300 | Emphasis border, compact-table rules | Dense tables | — | Emphasis/separation — decorative; not held to 3:1 | Yes |

> **Border-contrast note `[P7-DESIGN-DECISION]`.** The neutral border ramp provides **structural dividers and non-essential boundaries**. WCAG 2.2 SC 1.4.11 (Non-text Contrast) applies to the visual information needed to identify a component and its states — here that burden is carried by the **always-visible label, the fill, and the ≥3:1 focus indicator** (`focus.ring`, measured 7.65:1), never by a neutral hairline alone. Consequently these borders are not held to 3:1. In the one case where a **resting** control boundary is a control's *only* identifier (e.g. a fill-less input at rest), meeting ≥3:1 for that boundary is a **Phase-8 verification requirement** — the exact resting-boundary value is a `[SLOT]` confirmed in verification, not asserted here. This corrects the earlier over-claim that the neutral borders themselves meet 3:1; no accessibility requirement is weakened — essential contrast still holds, it is simply carried by the focus indicator, labels and status icons rather than by decorative borders.

## C.2 Text roles

| Semantic token | Bound to | Purpose | Contrast | Alone? |
|---|---|---|---|---|
| `color.text.title` | neutral.900 | Titles/headings (h1) | ≥7:1 on page | Yes |
| `color.text.heading` | neutral.800 | Section headings | ≥7:1 | Yes |
| `color.text.body` | neutral.700 | Body text | ≥4.5:1 | Yes |
| `color.text.secondary` | neutral.600 | Supporting text | ≥4.5:1 | Yes |
| `color.text.muted` | neutral.500 | Metadata, captions, timestamps | ≥4.5:1 (met on page, canvas and subtle surfaces) | Yes |
| `color.text.disabled` | neutral.400 | Disabled control text | **Exempt** — disabled/inactive controls are outside WCAG SC 1.4.3; treated as a best-effort design target (~3:1 on the page surface). The *reason* for disablement is conveyed by adjacent enabled text (I.3), never by this colour | Yes, but must pair with a "why" (I.3) |
| `color.text.on-primary` | neutral.0 | Text on primary fill | ≥4.5:1 | Yes |
| `color.text.link` | primary.700 | Links | ≥4.5:1; underline or non-colour cue required | **No** — link needs underline/affordance, not colour alone |

## C.3 Primary (action / selection / focus)

| Semantic token | Bound to | Purpose | Allowed | Forbidden | Contrast | Alone? |
|---|---|---|---|---|---|---|
| `color.action.primary` | primary.500 | The single primary action; selected state | One primary button/screen `[IA-2]`; active tab; selected control | A second primary on the same screen; decorative fills | ≥4.5:1 text on it; ≥3:1 as a boundary | Yes as a fill; as a *state* it pairs with a label |
| `color.action.primary.hover` | primary.600 | Hover/pressed | Hover/active of primary | — | — | Yes |
| `color.focus.ring` | primary.500 | Focus indicator | Every focus-visible element | Being suppressed/removed | ≥3:1 vs adjacent | Yes (plus it is always on a focused control) |

## C.4 Provenance / evidence (the trust-anchor identity)

| Semantic token | Bound to | Purpose | Allowed | Forbidden | Contrast | Alone? |
|---|---|---|---|---|---|---|
| `color.provenance.fg` | prov.700 | Citation affordance text/label | Citation links, evidence markers `[BR-02]` | Being used as a status colour; as a footnote superscript | ≥4.5:1 | **No** — always with the citation icon + descriptive name `[P4:§22.3]` |
| `color.provenance.accent` | prov.500 | Citation icon / evidence border | Citation icon, evidence-panel accent | Status meaning | ≥3:1 | No |
| `color.provenance.bg` | prov.50 | Evidence/citation panel surface | Citation panel, source passage | — | n/a | Yes (surface) |

## C.5 Status roles (Success / Warning / Danger / Info) — STEP 2.17

**All four are meaning-bearing → never colour-alone; the component always renders an icon shape + a text label.** `[CR-4/§22.3]`

| Semantic token | Bound to | Purpose (semantics) | Allowed | Forbidden | Contrast | Alone? |
|---|---|---|---|---|---|---|
| `color.status.success.fg` | success.600 | Success / positive / "Met" | Confirmation text, success inline-alert | Marketing "success rate" `[P4:§10.3]` | ≥4.5:1 | No |
| `color.status.success.icon` | success.500 | Success icon/border | Check icon, alert border | — | ≥3:1 | No |
| `color.status.success.bg` | success.50 | Success surface | Inline-alert/toast bg | — | n/a | Yes (surface) |
| `color.status.warning.fg` | warning.700 | Caution / "Approaching" | Warning text | Fake urgency | ≥4.5:1 | No |
| `color.status.warning.icon` | warning.500 | Warning icon/border | Triangle icon | — | ≥3:1 | No |
| `color.status.warning.bg` | warning.50 | Warning surface | Inline-alert/toast bg | — | n/a | Yes |
| `color.status.danger.fg` | danger.600 | Error / risk / "Missed" / destructive | Error text, destructive action label | Frightening the user; overuse `[Philosophy §5]` | ≥4.5:1 | No |
| `color.status.danger.icon` | danger.500 | Danger icon/border | Octagon/triangle icon | — | ≥3:1 | No |
| `color.status.danger.bg` | danger.50 | Danger surface | Inline-alert/toast bg | Large fear-inducing fills | n/a | Yes (restrained) |
| `color.status.info.fg` | info.600 | Neutral informational | Info text | Being mistaken for a CTA (it is not primary) | ≥4.5:1 | No |
| `color.status.info.icon` | info.500 | Info icon/border | Circle-i icon | — | ≥3:1 | No |
| `color.status.info.bg` | info.50 | Info surface | Inline-alert/toast bg | — | n/a | Yes |

## C.6 Attention-axis roles (On track / Action needed / At risk) — STEP 2.14

The Attention axis is **semantically distinct** from status; it answers "does it need me?" `[AP-14]`. Bound to shared ramps but named for intent so components bind to meaning. **Never colour-alone; distinguished primarily by icon shape and weight so all three survive greyscale.**

| Semantic token | Bound to | Purpose | Icon shape | Alone? |
|---|---|---|---|---|
| `color.attention.on-track.icon` | success.500 | "On track" — quiet, nothing needed | small dot / subtle check | No |
| `color.attention.on-track.fg` | neutral.700 | "On track" label | — | No |
| `color.attention.action-needed.icon` | primary.500 | "Needs you" — act here | filled dot / flag | No |
| `color.attention.action-needed.fg` | neutral.800 | "Needs you" label | — | No |
| `color.attention.at-risk.icon` | danger.500 | "At risk" | triangle-alert | No |
| `color.attention.at-risk.fg` | danger.700 | "At risk" label | — | No |

> **Design note `[P7-DESIGN-DECISION]`:** *Action needed* shares the primary hue with the primary button by intent — both mean "you act" — and is disambiguated by **form** (a small marker vs a button), never left to colour. *On track* is deliberately quiet (a calm dot), not celebratory, so calm surfaces stay calm `[UXP-2]`.

## C.7 Deadline-criticality roles (STEP 2.36) — bound to the deadline state taxonomy `[P4:§11.5]`

Always icon + text + colour `[BR-03/§22.3]`. State → role mapping:

| Deadline state | Role token | Bound to | Visual weight |
|---|---|---|---|
| Upcoming | `color.deadline.upcoming` | neutral.500 | low |
| Approaching | `color.deadline.approaching` | warning.500/700 | medium |
| Due | `color.deadline.due` | danger.500/700 | high |
| Confirmed | `color.deadline.confirmed` | success.500/600 | neutral-positive |
| Met | `color.deadline.met` | neutral.500 | low (historical) |
| Missed | `color.deadline.missed` | danger.600/700 | critical |
| Superseded | `color.deadline.superseded` | neutral.400 | low (with recompute note) |
| Not applicable | `color.deadline.na` | neutral.300 | hidden by default |

## C.8 Human-review / AI-authored roles (STEP 2.38–2.40)

| Semantic token | Bound to | Purpose | Alone? |
|---|---|---|---|
| `color.review.released.fg` | success.700 | "Reviewed & released by [name]" indicator | No — always with seal icon + reviewer name + date `[BR-01]` |
| `color.review.released.accent` | success.500 | Review seal icon | No |
| `color.ai.marker` | neutral.400 | AI-authored container marker (neutral, non-status) | No — always with "AI-generated" label `[P3:§12.3 r5]` |
| `color.unverified.fg` | neutral.500 | "Unverified" mark on a fail-safe assertion (IP-08) | No — always with text; never styled as fact `[CR-6]` |

---

# PART D — Semantic typography tokens

| Semantic token | Size / line-height / weight | Family | Role |
|---|---|---|---|
| `type.display` | 900 / tight / semibold | sans | public hero (rare) |
| `type.title` | 800 / tight / semibold | sans | page/object title (h1) |
| `type.section` | 700 / snug / semibold | sans | h2 |
| `type.subsection` | 600 / snug / semibold | sans | h3 |
| `type.minor` | 500 / snug / semibold | sans | h4 |
| `type.reading` | 450 / relaxed / regular | sans | depth-1 verdict / long-form |
| `type.body` | 400 / relaxed / regular | sans | UI body |
| `type.secondary` | 300 / normal / regular | sans | supporting |
| `type.label` | 300 / normal / medium | sans | form/control labels |
| `type.caption` | 200 / normal / regular | sans | metadata/timestamps |
| `type.legal` | 100 / normal / regular | sans | legal/disclaimer |
| `type.data` | 300 / normal / regular, tabular | **mono** | application numbers, rule IDs, prices, deadlines |
| `type.citation` | 300 / normal / medium | sans | provenance citation affordance |

Rules: exactly one `type.title`/`h1` per page; no heading level skipping; headings describe content `[P4:§22.2]`.

---

# PART E — Semantic spacing / layout tokens

| Semantic token | Bound to | Use |
|---|---|---|
| `space.inset.control` | space.4 (12) | control padding |
| `space.inset.card` | space.6 (24) | card padding (comfortable) |
| `space.inset.card.compact` | space.4 (12) | card padding (compact density) |
| `space.stack.tight` | space.3 (8) | related items |
| `space.stack.default` | space.5 (16) | default vertical rhythm |
| `space.section-gap` | space.8 (40) | between page sections |
| `space.primary-action-breathing` | space.7 (32) | space around the single primary action `[Philosophy §5]` |
| `layout.container.reading.max` | 720px | reading measure (~66–75ch) |
| `layout.container.app.max` | 1200px | object pages / indexes |
| `layout.container.wide.max` | 1440px | ops / dense docket (internal scroll) |
| `layout.grid.columns` | 12 | responsive grid |
| `layout.grid.gutter.desktop` | space.6 (24) | desktop gutter |
| `layout.grid.gutter.mobile` | space.5 (16) | mobile gutter |
| `layout.nav.levels.max` | 2 | max navigation depth `[P4:IA-6]` |

---

# PART F — State & focus tokens

| Semantic token | Bound to | Use |
|---|---|---|
| `state.hover.surface` | neutral.50 | hover fill |
| `state.active.surface` | neutral.100 | pressed fill |
| `state.selected.surface` | primary.50 | selected/active-subtle |
| `state.selected.border` | primary.500 | selected boundary |
| `focus.ring.color` | primary.500 | focus ring |
| `focus.ring.width` | border.width.focus (2px) | focus ring width |
| `focus.ring.offset` | 2px | focus ring offset |
| `state.disabled.fg` | neutral.400 | disabled content (requires a "why") |
| `state.disabled.surface` | neutral.50 | disabled control fill |
| `state.readonly.fg` | neutral.700 | read-only value shown as text (not greyed) |

**Focus is never suppressed** `[P4:§22.3]`. **Disabled ≠ read-only** (Design System I.3).

---

# PART G — Component tokens (representative; full anatomy in the Component Catalogue)

Component tokens resolve to semantic tokens only. A representative set (the catalogue defines the rest):

| Component token | Resolves to |
|---|---|
| `button.primary.bg` | color.action.primary |
| `button.primary.bg.hover` | color.action.primary.hover |
| `button.primary.fg` | color.text.on-primary |
| `button.secondary.border` | color.border.default |
| `button.secondary.fg` | color.text.link |
| `button.destructive.fg` | color.status.danger.fg |
| `input.border` | color.border.default |
| `input.focus.ring` | focus.ring.color |
| `input.label.color` | color.text.body |
| `card.bg` | color.bg.raised |
| `card.border` | color.border.subtle |
| `card.elevation` | elevation.0/1 |
| `statechip.radius` | radius.pill |
| `statechip.danger.icon` | color.status.danger.icon |
| `citation.fg` | color.provenance.fg |
| `citation.icon` | color.provenance.accent |
| `reviewseal.fg` | color.review.released.fg |
| `table.compact.row.height` | size.control.sm (32) |
| `table.comfortable.row.height` | size.control.md (40) |

> **Variant-segment convention `[P7-DESIGN-DECISION]`.** Where a component token carries a status/attention variant (e.g. `statechip.danger.icon`), the variant segment is one of the fixed role names — `success | warning | danger | info` (status) or `on-track | action-needed | at-risk` (attention) — each resolving to the matching `color.status.*` / `color.attention.*` semantic token. Token names use only literal role names; no placeholder syntax.

---

# PART H — Theming `[P7-DESIGN-DECISION]`

- **Light is the MVP theme.** The token architecture (A.1) is theme-ready: components bind to semantic tokens, so a future theme only re-points semantic tokens to different foundation values — no component edits.
- A **dark theme is not authored here** — it is a `[SLOT]` (and not required by the Phase 6 baseline). Authoring dark values now would invent brand values beyond what is needed; the structure permits it later.
- **High-contrast** support rides on the same mechanism if required, as a Phase 8 verification concern.

---

# PART I — Contrast verification (STEP 9 / STEP 4 contrast requirement)

Key foreground/background pairs and their **target** ratios (WCAG 2.2 AA; the baseline level `[P3:NFR-X01]`). Exact measured ratios are a **Phase 8 verification gate**, not a new claim — this table records the intended pairs to test.

| Pair | Target |
|---|---|
| `text.body` (neutral.700) on `bg.page` (neutral.0) | ≥ 4.5:1 |
| `text.muted` (neutral.500) on `bg.page` | ≥ 4.5:1 |
| `text.on-primary` (neutral.0) on `action.primary` (primary.500) | ≥ 4.5:1 |
| `text.link` (primary.700) on `bg.page` | ≥ 4.5:1 (plus underline) |
| `provenance.fg` (prov.700) on `provenance.bg` (prov.50) | ≥ 4.5:1 |
| `status.*.fg` on `status.*.bg` | ≥ 4.5:1 |
| `status.*.icon` on adjacent surface (essential non-text) | ≥ 3:1 |
| `focus.ring` (primary.500) vs adjacent surface | ≥ 3:1 (measured 7.65:1) |
| Neutral `border.*` (subtle/default/strong) | **Decorative — not held to 3:1** (see the Border-contrast note in Part C.1); essential control contrast is carried by the focus ring, fill and labels |

**Non-colour reinforcement is mandatory for every status/attention/deadline signal** (icon shape + text) `[CR-4]`, so the system remains legible below any contrast edge case and in greyscale.

---

# PART J — Slots & non-Phase-7 dependencies

| Item | Status | Authority |
|---|---|---|
| Exact hues, chosen typefaces, icon set | `[P7-PROPOSAL]` — owner sign-off at the gate | Phase 7 authorised; owner is final |
| Confidence-representation scale | `[SLOT]` — presentation contract defined, scale not fixed | AP-08 / §12.3.4 |
| Agent-stat confidence-indicator scale | `[SLOT]` | D-2026-019 |
| L1 pricing rendering mode default | `[OWNER DECISION: O-2026-001 OPEN]` — both modes tokenised | O-2026-001 |
| L1 disclosure wording | `[LEGAL CONTENT SLOT: L1]` | counsel |
| Dark theme values | `[SLOT]` — structure ready, values not authored | not required by baseline |
| Turnaround / ladder timings / channel defaults / idle timeout | `[SLOT]` — rendered, not set | Rules Engine / ADR §9 / §16.2 |

---

*End of Phase 7 — Design Tokens (Document 2 of 4), v0.1. WORKING DOCUMENT — owner review required. Values are a specification; no code, framework, or build is produced or authorised.*
