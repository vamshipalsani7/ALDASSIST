/**
 * ALDASSIST Phase 8 — token-hierarchy enforcement (Phase 7 Tokens §A.1, amended by D-2026-023).
 *
 * §A.1 (frozen) states: "component tokens resolve to SEMANTIC tokens; components never reference a
 * foundation token directly." D-2026-023 (Option B, 2026-09-13) amends this into TWO explicit rules
 * that apply to different subjects and MUST NOT be conflated. This checker enforces both as two
 * INDEPENDENT gates:
 *
 * ── GATE A — STYLE CONSUMPTION (component styles) — unchanged, absolute, NO exception ─────────────
 *   A component STYLE (components.css + component/shell/screen .tsx) references COMPONENT TOKENS ONLY.
 *     • component style → component token = ALLOWED
 *     • component style → semantic        = HARD FAIL
 *     • component style → foundation      = HARD FAIL  ← the five-family allowance does NOT apply here
 *     • component style → unknown         = HARD FAIL
 *   The D-2026-023 five-family allowance is a TOKEN-DEFINITION rule (Gate B) only. It is a hard error
 *   for it to leak into Gate A; classifyConsumptionRef() therefore never consults the permitted set,
 *   and the self-test below asserts a permitted-family foundation token in a component style STILL
 *   hard-fails Gate A.
 *
 * ── GATE B — TOKEN DEFINITION (component-token defs) — amended by D-2026-023 §B.14 ────────────────
 *     • component token → semantic   = ALLOWED
 *     • component token → foundation = ALLOWED **only** when the target foundation family is one of the
 *         five for which Phase 7 establishes no semantic tier: radius, elevation, sizing (size.*),
 *         motion, z-index (z.*)  [Design Governance §B.14; Decision Log D-2026-023]
 *     • component token → foundation OUTSIDE those five families (colour, typography, spacing, layout,
 *         state, focus, border-width, breakpoint, …) = HARD FAIL  (fail-closed: not-listed ⇒ prohibited)
 *     • component token → component  = HARD FAIL (no lateral refs)
 *     • component token → literal    = HARD FAIL (must reference a token)
 *   Definition chain for semantic: semantic → foundation = OK; semantic → literal = OK;
 *     semantic → semantic/component = HARD FAIL.
 *
 * Tiers come from the AUTHORITATIVE token definitions in build-tokens.mjs (foundation/semantic/component
 * maps) — not a hardcoded allow-list. The foundation FAMILY is the first dotted segment of the token key.
 *
 * SCOPE: product component styles only — components.css + component/shell/screen .tsx (excl. *.stories/*.test).
 * The demo harness (harness.css) is excluded ONLY after proving it is non-product (see harness checks below).
 *
 * BOUNDARY (what this checker does NOT do): it validates token-REFERENCE hierarchy — i.e. the tier of each
 * `var(--…)` reference — ONLY. It does NOT detect raw literal design values (px, hex, rgba, shadows, etc.)
 * embedded directly in styles. Raw-value avoidance is a Phase 7 PRINCIPLE (§A.1 "components never bind to
 * raw values"; STEP 8; DS F.1 "consumed only through named tokens"), but it is NOT enforced here — it is an
 * unresolved Phase-8 verification requirement. Passing this gate proves token-reference hierarchy
 * compliance, NOT complete token/design-value compliance.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join, relative } from 'node:path';
import { foundation, semantic, component, cssName } from './build-tokens.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FOUNDATION = new Set(Object.keys(foundation).map(cssName));
const SEMANTIC = new Set(Object.keys(semantic).map(cssName));
const COMPONENT = new Set(Object.keys(component).map(cssName));

export const tierOf = (v) => (COMPONENT.has(v) ? 'component' : SEMANTIC.has(v) ? 'semantic' : FOUNDATION.has(v) ? 'foundation' : 'unknown');

// D-2026-023 §B.14 — the CLOSED, exhaustive list of foundation families a COMPONENT TOKEN may resolve to
// directly. Expressed by the first dotted segment of the foundation token key: sizing ≡ `size.*`,
// z-index ≡ `z.*`. Any family not in this set is prohibited (fail-closed). border-width and breakpoint are
// deliberately NOT here (border-width has the semantic tier `focus.ring.width`; breakpoint is never a
// component-token target). Adding a family requires a new Decision Log entry, not an implementation edit.
export const PERMITTED_FOUNDATION_FAMILIES = new Set(['radius', 'elevation', 'size', 'motion', 'z']);

// Map each foundation CSS name (e.g. "--radius-pill") back to its family (first dotted segment, e.g. "radius").
const FOUNDATION_FAMILY = Object.fromEntries(Object.keys(foundation).map((k) => [cssName(k), k.split('.')[0]]));
export const foundationFamilyOf = (name) => FOUNDATION_FAMILY[name];

/**
 * GATE A classifier (pure). Given a token referenced BY A COMPONENT STYLE, return its verdict bucket.
 * MUST NOT consult PERMITTED_FOUNDATION_FAMILIES — the five-family allowance is Gate B only.
 */
export function classifyConsumptionRef(name) {
  const t = tierOf(name);
  if (t === 'component') return 'ok';
  if (t === 'foundation') return 'component→foundation'; // HARD FAIL — no five-family exception here
  if (t === 'semantic') return 'component→semantic'; // HARD FAIL
  return 'component→unknown'; // HARD FAIL
}

/**
 * GATE B classifier (pure). Given the token a COMPONENT-TOKEN DEFINITION resolves to, return the verdict.
 * foundation target ⇒ allowed ONLY when its family ∈ PERMITTED_FOUNDATION_FAMILIES (D-2026-023 §B.14).
 */
export function classifyDefinition(target) {
  if (!target) return { verdict: 'hardfail', reason: 'must reference a token, not a literal' };
  const t = tierOf(target);
  if (t === 'semantic') return { verdict: 'allowed', kind: 'semantic' };
  if (t === 'component') return { verdict: 'hardfail', reason: 'component token must not resolve to another component token' };
  if (t === 'unknown') return { verdict: 'hardfail', reason: `unresolved target ${target}` };
  const fam = foundationFamilyOf(target); // t === 'foundation'
  if (PERMITTED_FOUNDATION_FAMILIES.has(fam)) return { verdict: 'allowed', kind: 'foundation-sanctioned', family: fam };
  return {
    verdict: 'hardfail',
    family: fam,
    reason: `component-token→foundation to non-permitted family '${fam || '?'}' — allowed only for radius/elevation/sizing/motion/z-index (D-2026-023 §B.14)`,
  };
}

const refTarget = (val) => (val && typeof val === 'object' && val.__ref ? cssName(val.__ref) : null);

// ---- ANTI-LEAK SELF-TEST (D-2026-023 §B.14 invariant) --------------------------------------------
// Runs on every invocation AND is unit-tested (see src/tokens/tokenHierarchy.antileak.test.ts). Asserts
// the five-family allowance NEVER leaks from Gate B into Gate A: a permitted-family FOUNDATION token used
// in a component STYLE must still be a HARD FAIL under Gate A.
export function antiLeakSelfTest() {
  const failures = [];
  // Pick a real permitted-family foundation token to probe with.
  const probe = Object.keys(foundation).map(cssName).find((n) => PERMITTED_FOUNDATION_FAMILIES.has(foundationFamilyOf(n)));
  if (!probe) {
    failures.push('no permitted-family foundation token exists to probe (generator materialises none of radius/elevation/size/motion/z)');
    return failures;
  }
  // (1) It is genuinely a foundation token of a permitted family.
  if (tierOf(probe) !== 'foundation') failures.push(`probe ${probe} is not classified 'foundation'`);
  if (classifyDefinition(probe).verdict !== 'allowed') failures.push(`Gate B should ALLOW a component token → ${probe} (permitted family)`);
  // (2) THE INVARIANT: the same token, consumed by a component STYLE, must still HARD FAIL Gate A.
  if (classifyConsumptionRef(probe) !== 'component→foundation') {
    failures.push(`ANTI-LEAK VIOLATION: component style → ${probe} must be 'component→foundation' (HARD FAIL); the five-family allowance leaked into Gate A`);
  }
  // (3) A non-permitted foundation family stays a Gate B hard-fail (e.g. palette / border / font / space).
  const nonPermittedProbe = Object.keys(foundation).map(cssName).find((n) => !PERMITTED_FOUNDATION_FAMILIES.has(foundationFamilyOf(n)));
  if (nonPermittedProbe && classifyDefinition(nonPermittedProbe).verdict !== 'hardfail') {
    failures.push(`Gate B should HARD FAIL a component token → ${nonPermittedProbe} (non-permitted family '${foundationFamilyOf(nonPermittedProbe)}')`);
  }
  return failures;
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

function run() {
  const productTsx = [...walk(join(root, 'src/components')), ...walk(join(root, 'src/shell')), ...walk(join(root, 'src/screens'))]
    .filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx') && !f.endsWith('.test.tsx'));

  // ---- GATE A: CONSUMPTION (component styles → component tokens only) ------------------------------
  const productFiles = [join(root, 'src/styles/components.css'), ...productTsx];
  const VAR_RE = /var\(\s*(--[a-z0-9-]+)/g;
  const consumption = { 'component→foundation': [], 'component→semantic': [], 'component→unknown': [] };
  for (const file of productFiles) {
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      let m; VAR_RE.lastIndex = 0;
      while ((m = VAR_RE.exec(line)) !== null) {
        const bucket = classifyConsumptionRef(m[1]);
        if (bucket === 'ok') continue;
        consumption[bucket].push({ file: relative(root, file), line: i + 1, token: m[1] });
      }
    });
  }

  // ---- GATE B: DEFINITION CHAIN (component-token defs; semantic defs) ------------------------------
  const chainHardFail = [];
  const sanctionedFoundation = []; // component token → foundation, permitted family (D-2026-023 §B.14) — ALLOWED
  for (const [k, val] of Object.entries(component)) {
    const name = cssName(k);
    const target = refTarget(val);
    const r = classifyDefinition(target);
    if (r.verdict === 'allowed' && r.kind === 'foundation-sanctioned') sanctionedFoundation.push({ name, target, family: r.family });
    else if (r.verdict === 'hardfail') chainHardFail.push(`${name}${target ? ` → ${target}` : ''}: ${r.reason}`);
  }
  for (const [k, val] of Object.entries(semantic)) {
    const target = refTarget(val);
    if (!target) continue; // literal (layout maxes, focus offset, grid columns) — allowed
    if (tierOf(target) !== 'foundation') chainHardFail.push(`${cssName(k)} → ${target}: semantic token must resolve to a FOUNDATION token`);
  }

  // ---- ANTI-LEAK invariant (Gate B must not leak into Gate A) --------------------------------------
  const antiLeak = antiLeakSelfTest();

  // ---- HARNESS CONTAINMENT (prove the exclusion is honest) ----------------------------------------
  const harnessFindings = [];
  const harnessPath = join(root, 'src/styles/harness.css');
  if (existsSync(harnessPath)) {
    readFileSync(harnessPath, 'utf8').split('\n').forEach((line, i) => {
      const idx = line.indexOf('{');
      if (idx === -1) return;
      const selector = line.slice(0, idx).trim();
      if (!selector || selector.startsWith('@') || selector.startsWith('/*')) return;
      for (const part of selector.split(',')) {
        const s = part.trim();
        if (s && !s.startsWith('.scenario-bar')) harnessFindings.push(`harness.css:${i + 1}: non-harness selector "${s}" (product styles must not live in the harness)`);
      }
    });
  }
  for (const file of [join(root, 'src/styles/components.css'), ...productTsx]) {
    const text = readFileSync(file, 'utf8');
    if (/(?:@import|import)\b[^\n;]*harness\.css/.test(text)) harnessFindings.push(`${relative(root, file)}: product file imports harness.css`);
    if (/scenario-bar/.test(text)) harnessFindings.push(`${relative(root, file)}: product file references the .scenario-bar harness namespace`);
  }

  // ---- Report -------------------------------------------------------------------------------------
  const totalConsumption = Object.values(consumption).reduce((n, a) => n + a.length, 0);
  const clean = totalConsumption === 0 && chainHardFail.length === 0 && antiLeak.length === 0 && harnessFindings.length === 0;
  if (clean) {
    console.log(`token-hierarchy: OK — Gate A: component styles consume only component tokens (${sanctionedFoundation.length} sanctioned component→foundation def(s) per D-2026-023 §B.14); Gate B: definition chain intact; anti-leak invariant holds; harness contained.`);
    return 0;
  }

  console.error(`token-hierarchy: FAIL — Gate A: ${totalConsumption} disallowed component-style ref(s); Gate B: ${chainHardFail.length} definition hard-fail(s); ${antiLeak.length} anti-leak violation(s); ${harnessFindings.length} harness finding(s). [sanctioned component→foundation defs: ${sanctionedFoundation.length}]`);

  for (const kind of ['component→foundation', 'component→semantic', 'component→unknown']) {
    const items = consumption[kind]; if (!items.length) continue;
    const uniq = [...new Set(items.map((x) => x.token))].sort();
    console.error(`\nGATE A ${kind} (HARD FAIL — five-family allowance does NOT apply to component styles) — ${items.length} ref(s), ${uniq.length} token(s):`);
    uniq.forEach((t) => console.error(`  ${t}  ×${items.filter((x) => x.token === t).length}`));
  }
  if (chainHardFail.length) { console.error(`\nGATE B definition HARD FAIL:`); chainHardFail.forEach((c) => console.error(`  ${c}`)); }
  if (antiLeak.length) { console.error(`\nANTI-LEAK INVARIANT VIOLATION (D-2026-023 §B.14 — Gate B must never loosen Gate A):`); antiLeak.forEach((c) => console.error(`  ${c}`)); }

  console.error(`\nSANCTIONED component→foundation definitions (D-2026-023 §B.14 — ALLOWED; permitted families radius/elevation/sizing/motion/z-index) — ${sanctionedFoundation.length}:`);
  sanctionedFoundation.forEach((s) => console.error(`  ${s.name} → ${s.target}  [family: ${s.family}]`));

  if (harnessFindings.length) { console.error(`\nHARNESS CONTAINMENT FAIL:`); harnessFindings.forEach((c) => console.error(`  ${c}`)); }
  else console.error(`\nHarness containment: OK — harness.css holds only .scenario-bar selectors; no product file imports it or uses the namespace.`);

  console.error(`\nSCOPE BOUNDARY: this gate validates token-REFERENCE hierarchy (the tier of each var(--…)) only. It does NOT detect raw literal design values (px/hex/rgba/shadow/etc.). Raw-value avoidance is a Phase 7 principle (§A.1/STEP 8/DS F.1) but is UNENFORCED here — an unresolved Phase-8 verification requirement. Passing this gate proves token-reference hierarchy compliance, NOT complete design-value compliance.`);
  return 1;
}

// Main-guard: only scan files / exit when invoked as a script (so tests can import the pure helpers above).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(run());
}
