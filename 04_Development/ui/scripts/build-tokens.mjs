/**
 * ALDASSIST Phase 8 — Token pipeline.
 * Realises Phase 7 `Phase-7-Design-Tokens-v0.1.md` (frozen, D-2026-021) as CSS custom properties.
 *
 * Three-tier chain (binding rule, Tokens A.1):
 *   FOUNDATION (raw primitives)  ← referenced only by SEMANTIC ← referenced only by COMPONENT.
 * Components consume component/semantic vars ONLY; never a raw foundation value.
 *
 * This script emits src/tokens/tokens.generated.css. Values are transcribed from the frozen
 * token document; no value is invented here. Dotted token names → --hyphenated CSS custom props.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../src/tokens/tokens.generated.css');

const ref = (name) => ({ __ref: name });

// ---------------------------------------------------------------------------
// FOUNDATION (literal primitives) — Phase 7 Tokens Part B
// ---------------------------------------------------------------------------
const foundation = {
  // Neutral (cool grey) B.1
  'palette.neutral.0': '#FFFFFF',
  'palette.neutral.25': '#F8FAFC',
  'palette.neutral.50': '#F1F4F8',
  'palette.neutral.100': '#E4E9F0',
  'palette.neutral.200': '#CDD5E0',
  'palette.neutral.300': '#AEB9C9',
  'palette.neutral.400': '#8A96A8',
  'palette.neutral.500': '#626D7B',
  'palette.neutral.600': '#515D6E',
  'palette.neutral.700': '#3A4453',
  'palette.neutral.800': '#262E3A',
  'palette.neutral.900': '#151B24',
  // Primary (deep ink-blue)
  'palette.primary.50': '#EBF1FA',
  'palette.primary.100': '#D0DEF2',
  'palette.primary.200': '#A6C0E5',
  'palette.primary.300': '#6E97D3',
  'palette.primary.400': '#3F6DBA',
  'palette.primary.500': '#2A5296',
  'palette.primary.600': '#21447D',
  'palette.primary.700': '#1A3765',
  'palette.primary.800': '#142A4E',
  // Provenance / secondary (muted slate-teal)
  'palette.prov.50': '#E8F1F1',
  'palette.prov.100': '#CBE0E1',
  'palette.prov.300': '#6FA6A9',
  'palette.prov.500': '#3C7A80',
  'palette.prov.600': '#2F6167',
  'palette.prov.700': '#244C51',
  // Success
  'palette.success.50': '#E7F3EC',
  'palette.success.100': '#C6E3D1',
  'palette.success.500': '#2E7D52',
  'palette.success.600': '#246343',
  'palette.success.700': '#1C4E35',
  // Warning
  'palette.warning.50': '#FBF1DC',
  'palette.warning.100': '#F5DFB0',
  'palette.warning.500': '#B87503',
  'palette.warning.600': '#8F5B02',
  'palette.warning.700': '#6E4602',
  // Danger
  'palette.danger.50': '#FBEAE7',
  'palette.danger.100': '#F4C9C2',
  'palette.danger.500': '#C0392B',
  'palette.danger.600': '#9E2A20',
  'palette.danger.700': '#7E211A',
  // Info
  'palette.info.50': '#EAF0F6',
  'palette.info.100': '#CCDCEA',
  'palette.info.500': '#3F6488',
  'palette.info.600': '#32506E',
  'palette.info.700': '#274056',
  // Type primitives B.2
  'font.family.sans': "Inter, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  'font.family.mono': "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  'font.weight.regular': '400',
  'font.weight.medium': '500',
  'font.weight.semibold': '600',
  'font.size.900': '2.5rem',
  'font.size.800': '1.875rem',
  'font.size.700': '1.5rem',
  'font.size.600': '1.25rem',
  'font.size.500': '1.0625rem',
  'font.size.450': '1.125rem',
  'font.size.400': '1rem',
  'font.size.300': '0.875rem',
  'font.size.200': '0.8125rem',
  'font.size.100': '0.75rem',
  'line.height.tight': '1.2',
  'line.height.snug': '1.35',
  'line.height.normal': '1.5',
  'line.height.relaxed': '1.6',
  // Space scale (4px base) B.3
  'space.0': '0', 'space.1': '2px', 'space.2': '4px', 'space.3': '8px',
  'space.4': '12px', 'space.5': '16px', 'space.6': '24px', 'space.7': '32px',
  'space.8': '40px', 'space.9': '48px', 'space.10': '64px', 'space.11': '80px', 'space.12': '96px',
  // Radius B.4
  'radius.none': '0', 'radius.sm': '4px', 'radius.md': '8px', 'radius.lg': '12px', 'radius.pill': '999px',
  // Border B.5
  'border.width.hairline': '1px', 'border.width.strong': '1.5px', 'border.width.focus': '2px',
  // Elevation B.6
  'elevation.0': 'none',
  'elevation.1': '0 1px 2px rgba(21,27,36,.06), 0 1px 1px rgba(21,27,36,.04)',
  'elevation.2': '0 4px 12px rgba(21,27,36,.10)',
  'elevation.3': '0 12px 32px rgba(21,27,36,.16)',
  'elevation.4': '0 6px 20px rgba(21,27,36,.14)',
  // Motion B.7
  'motion.duration.instant': '0ms', 'motion.duration.fast': '120ms',
  'motion.duration.base': '200ms', 'motion.duration.slow': '320ms',
  'motion.easing.standard': 'cubic-bezier(.2,0,0,1)', 'motion.easing.exit': 'cubic-bezier(.4,0,1,1)',
  // Sizing B.10
  'size.control.sm': '32px', 'size.control.md': '40px', 'size.control.lg': '48px',
  'size.touch.min': '44px', 'size.icon.sm': '16px', 'size.icon.md': '20px', 'size.icon.lg': '24px',
};

// ---------------------------------------------------------------------------
// SEMANTIC (role/intent → foundation) — Phase 7 Tokens Parts C, D, E, F
// ---------------------------------------------------------------------------
const semantic = {
  // Surface & structure C.1
  'color.bg.page': ref('palette.neutral.0'),
  'color.bg.canvas': ref('palette.neutral.25'),
  'color.bg.subtle': ref('palette.neutral.50'),
  'color.bg.raised': ref('palette.neutral.0'),
  'color.border.subtle': ref('palette.neutral.100'),
  'color.border.default': ref('palette.neutral.200'),
  'color.border.strong': ref('palette.neutral.300'),
  // Text C.2
  'color.text.title': ref('palette.neutral.900'),
  'color.text.heading': ref('palette.neutral.800'),
  'color.text.body': ref('palette.neutral.700'),
  'color.text.secondary': ref('palette.neutral.600'),
  'color.text.muted': ref('palette.neutral.500'),
  'color.text.disabled': ref('palette.neutral.400'),
  'color.text.on-primary': ref('palette.neutral.0'),
  'color.text.link': ref('palette.primary.700'),
  // Primary C.3
  'color.action.primary': ref('palette.primary.500'),
  'color.action.primary.hover': ref('palette.primary.600'),
  'color.focus.ring': ref('palette.primary.500'),
  // Provenance C.4
  'color.provenance.fg': ref('palette.prov.700'),
  'color.provenance.accent': ref('palette.prov.500'),
  'color.provenance.bg': ref('palette.prov.50'),
  // Status C.5
  'color.status.success.fg': ref('palette.success.600'),
  'color.status.success.icon': ref('palette.success.500'),
  'color.status.success.bg': ref('palette.success.50'),
  'color.status.warning.fg': ref('palette.warning.700'),
  'color.status.warning.icon': ref('palette.warning.500'),
  'color.status.warning.bg': ref('palette.warning.50'),
  'color.status.danger.fg': ref('palette.danger.600'),
  'color.status.danger.icon': ref('palette.danger.500'),
  'color.status.danger.bg': ref('palette.danger.50'),
  'color.status.info.fg': ref('palette.info.600'),
  'color.status.info.icon': ref('palette.info.500'),
  'color.status.info.bg': ref('palette.info.50'),
  // Attention C.6
  'color.attention.on-track.icon': ref('palette.success.500'),
  'color.attention.on-track.fg': ref('palette.neutral.700'),
  'color.attention.action-needed.icon': ref('palette.primary.500'),
  'color.attention.action-needed.fg': ref('palette.neutral.800'),
  'color.attention.at-risk.icon': ref('palette.danger.500'),
  'color.attention.at-risk.fg': ref('palette.danger.700'),
  // Human-review / AI / unverified C.8
  'color.review.released.fg': ref('palette.success.700'),
  'color.review.released.accent': ref('palette.success.500'),
  'color.ai.marker': ref('palette.neutral.400'),
  'color.unverified.fg': ref('palette.neutral.500'),
  // Semantic spacing/layout Part E
  'space.inset.control': ref('space.4'),
  'space.inset.card': ref('space.6'),
  'space.inset.card.compact': ref('space.4'),
  'space.stack.tight': ref('space.3'),
  'space.stack.default': ref('space.5'),
  'space.section-gap': ref('space.8'),
  'space.primary-action-breathing': ref('space.7'),
  'layout.container.reading.max': '720px',
  'layout.container.app.max': '1200px',
  'layout.container.wide.max': '1440px',
  // State & focus Part F
  'state.hover.surface': ref('palette.neutral.50'),
  'state.active.surface': ref('palette.neutral.100'),
  'state.selected.surface': ref('palette.primary.50'),
  'state.selected.border': ref('palette.primary.500'),
  'focus.ring.color': ref('palette.primary.500'),
  'focus.ring.width': ref('border.width.focus'),
  'focus.ring.offset': '2px',
  'state.disabled.fg': ref('palette.neutral.400'),
  'state.disabled.surface': ref('palette.neutral.50'),
  'state.readonly.fg': ref('palette.neutral.700'),
};

// ---------------------------------------------------------------------------
// COMPONENT (per-component → semantic) — Phase 7 Tokens Part G (representative)
// ---------------------------------------------------------------------------
const component = {
  'button.primary.bg': ref('color.action.primary'),
  'button.primary.bg.hover': ref('color.action.primary.hover'),
  'button.primary.fg': ref('color.text.on-primary'),
  'button.secondary.border': ref('color.border.default'),
  'button.secondary.fg': ref('color.text.link'),
  'button.destructive.fg': ref('color.status.danger.fg'),
  'input.border': ref('color.border.default'),
  'input.focus.ring': ref('focus.ring.color'),
  'input.label.color': ref('color.text.body'),
  'card.bg': ref('color.bg.raised'),
  'card.border': ref('color.border.subtle'),
  'statechip.radius': ref('radius.pill'),
  'statechip.success.icon': ref('color.status.success.icon'),
  'statechip.warning.icon': ref('color.status.warning.icon'),
  'statechip.danger.icon': ref('color.status.danger.icon'),
  'statechip.info.icon': ref('color.status.info.icon'),
  'citation.fg': ref('color.provenance.fg'),
  'citation.icon': ref('color.provenance.accent'),
  'reviewseal.fg': ref('color.review.released.fg'),
  'table.compact.row.height': ref('size.control.sm'),
  'table.comfortable.row.height': ref('size.control.md'),

  // ---- B2 (Client Vault path) component tokens -----------------------------
  // Component-tier tokens for the B2 screens. Each resolves to a SEMANTIC token (colour / spacing role /
  // layout / state) or — per D-2026-023 §B.14 — directly to a foundation token in a permitted family
  // (radius, sizing). No new token family; no frozen-definition change. Component styles consume ONLY
  // these (Gate A), keeping B2 off the deferred Bucket-1/2 direct-reference debt.
  // Colours → semantic
  'vault.text.body': ref('color.text.body'),
  'vault.text.secondary': ref('color.text.secondary'),
  'vault.text.muted': ref('color.text.muted'),
  'vault.link.fg': ref('color.text.link'),
  'vault.required.fg': ref('color.attention.action-needed.fg'),
  'vault.surface.raised': ref('color.bg.raised'),
  'vault.surface.subtle': ref('color.bg.subtle'),
  'vault.selected.surface': ref('state.selected.surface'),
  // Spacing → semantic spacing roles (Part E)
  'vault.gap.tight': ref('space.stack.tight'),
  'vault.gap.default': ref('space.stack.default'),
  'vault.inset.control': ref('space.inset.control'),
  'vault.inset.card': ref('space.inset.card'),
  'vault.section.gap': ref('space.section-gap'),
  // Radius / sizing → foundation, permitted families only (D-2026-023 §B.14)
  'vault.radius.control': ref('radius.sm'),
  'vault.radius.card': ref('radius.md'),
  'vault.radius.panel': ref('radius.lg'),
  'vault.touch.min': ref('size.touch.min'),
  // Layout → semantic
  'vault.reading.max': ref('layout.container.reading.max'),
};

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------
const cssName = (dotted) => '--' + dotted.replace(/\./g, '-');
const emitVal = (v) => (v && typeof v === 'object' && v.__ref) ? `var(${cssName(v.__ref)})` : String(v);

function block(title, obj) {
  const lines = Object.entries(obj).map(([k, v]) => `  ${cssName(k)}: ${emitVal(v)};`);
  return `  /* ${title} */\n${lines.join('\n')}`;
}

const css = `/* AUTO-GENERATED by scripts/build-tokens.mjs — do not edit by hand.
 * Source of truth: Phase 7 Design Tokens (frozen, D-2026-021). Regenerate with \`npm run build:tokens\`.
 * Light is the MVP theme (Tokens Part H). Dark theme is a [SLOT] — not authored (structure is theme-ready). */
:root {
${block('FOUNDATION', foundation)}

${block('SEMANTIC', semantic)}

${block('COMPONENT', component)}
}
`;

// Only WRITE when run directly (so tools can import the token maps without regenerating).
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMain) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, css, 'utf8');
  console.log(`build-tokens: wrote ${Object.keys(foundation).length + Object.keys(semantic).length + Object.keys(component).length} tokens → ${out}`);
}

// The authoritative token tiers + name helper, for the hierarchy checker and any tooling.
export { foundation, semantic, component, cssName };
