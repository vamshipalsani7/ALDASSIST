/**
 * ALDASSIST Phase 8 — token-hierarchy enforcement (Phase 7 Tokens §A.1 binding rule).
 *
 * §A.1 (frozen): "a component reads component tokens; component tokens resolve to SEMANTIC tokens;
 * semantic tokens resolve to foundation tokens. Components never reference a foundation token directly."
 * Part G intro repeats: "Component tokens resolve to semantic tokens only."
 *
 * CONSUMPTION rule (component styles) — enforced as HARD FAIL:
 *   • component style → foundation      = HARD FAIL
 *   • component style → semantic        = HARD FAIL
 *   • component style → component token = ALLOWED
 *
 * DEFINITION chain (token defs) — validated, NOT reinterpreted:
 *   • component token → semantic  = OK
 *   • component token → component = HARD FAIL (no lateral refs)
 *   • component token → literal   = HARD FAIL (must reference a token)
 *   • component token → FOUNDATION = **SPECIFICATION CONFLICT (review-required)** — §A.1 says component
 *       tokens resolve to semantic ONLY, yet Phase 7 Part G itself defines such cases (card.elevation →
 *       elevation.0/1, statechip.radius → radius.pill, table.*.row.height → size.control.*). This checker
 *       does NOT invent an exception and does NOT silently pass them; it reports them for owner review.
 *   • semantic → foundation = OK; semantic → literal = OK; semantic → semantic/component = HARD FAIL.
 *
 * Tiers come from the AUTHORITATIVE token definitions in build-tokens.mjs (foundation/semantic/component
 * maps) — not a hardcoded Part-G allow-list. The component tier grows as component tokens are materialized.
 *
 * SCOPE: product component styles only — components.css + component/shell/screen .tsx (excl. *.stories/*.test).
 * The demo harness (harness.css) is excluded ONLY after proving it is non-product (see harness checks below).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, relative } from 'node:path';
import { foundation, semantic, component, cssName } from './build-tokens.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FOUNDATION = new Set(Object.keys(foundation).map(cssName));
const SEMANTIC = new Set(Object.keys(semantic).map(cssName));
const COMPONENT = new Set(Object.keys(component).map(cssName));
const tierOf = (v) => (COMPONENT.has(v) ? 'component' : SEMANTIC.has(v) ? 'semantic' : FOUNDATION.has(v) ? 'foundation' : 'unknown');

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}
const productTsx = [...walk(join(root, 'src/components')), ...walk(join(root, 'src/shell')), ...walk(join(root, 'src/screens'))]
  .filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx') && !f.endsWith('.test.tsx'));

// ---- 1) CONSUMPTION -------------------------------------------------------------------------------
const productFiles = [join(root, 'src/styles/components.css'), ...productTsx];
const VAR_RE = /var\(\s*(--[a-z0-9-]+)/g;
const consumption = { 'component→foundation': [], 'component→semantic': [], 'component→unknown': [] };
for (const file of productFiles) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    let m; VAR_RE.lastIndex = 0;
    while ((m = VAR_RE.exec(line)) !== null) {
      const t = tierOf(m[1]);
      if (t === 'component') continue;
      consumption[t === 'foundation' ? 'component→foundation' : t === 'semantic' ? 'component→semantic' : 'component→unknown']
        .push({ file: relative(root, file), line: i + 1, token: m[1] });
    }
  });
}

// ---- 2) DEFINITION CHAIN --------------------------------------------------------------------------
const chainHardFail = [];
const specConflicts = []; // component token → foundation (§A.1 vs Part G)
const refTarget = (val) => (val && typeof val === 'object' && val.__ref ? cssName(val.__ref) : null);
for (const [k, val] of Object.entries(component)) {
  const name = cssName(k);
  const target = refTarget(val);
  if (!target) { chainHardFail.push(`${name}: must reference a token, not a literal`); continue; }
  const t = tierOf(target);
  if (t === 'semantic') continue;
  else if (t === 'component') chainHardFail.push(`${name} → ${target}: component token must not resolve to another component token`);
  else if (t === 'unknown') chainHardFail.push(`${name} → ${target}: unresolved target`);
  else if (t === 'foundation') specConflicts.push(`${name} → ${target}: §A.1 requires component→semantic, but this resolves to a FOUNDATION token (matches Phase 7 Part G's own examples) — REVIEW REQUIRED`);
}
for (const [k, val] of Object.entries(semantic)) {
  const target = refTarget(val);
  if (!target) continue; // literal (layout maxes, focus offset, grid columns) — allowed
  if (tierOf(target) !== 'foundation') chainHardFail.push(`${cssName(k)} → ${target}: semantic token must resolve to a FOUNDATION token`);
}

// ---- 3) HARNESS CONTAINMENT (prove the exclusion is honest) ---------------------------------------
const harnessFindings = [];
const harnessPath = join(root, 'src/styles/harness.css');
if (existsSync(harnessPath)) {
  // (a) harness.css may contain ONLY `.scenario-bar` selectors — no product styles hidden here.
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
// (b) no product file imports harness.css; (c) no product code/style uses the .scenario-bar namespace.
for (const file of [join(root, 'src/styles/components.css'), ...productTsx]) {
  const text = readFileSync(file, 'utf8');
  // Match an actual import statement referencing harness.css (not a prose comment mentioning the filename).
  if (/(?:@import|import)\b[^\n;]*harness\.css/.test(text)) harnessFindings.push(`${relative(root, file)}: product file imports harness.css`);
  if (/scenario-bar/.test(text)) harnessFindings.push(`${relative(root, file)}: product file references the .scenario-bar harness namespace`);
}

// ---- Report --------------------------------------------------------------------------------------
const totalConsumption = Object.values(consumption).reduce((n, a) => n + a.length, 0);
const clean = totalConsumption === 0 && chainHardFail.length === 0 && specConflicts.length === 0 && harnessFindings.length === 0;
if (clean) { console.log('token-hierarchy: OK — component styles consume only component tokens; chain intact; no spec conflicts; harness contained.'); process.exit(0); }

console.error(`token-hierarchy: FAIL — ${totalConsumption} disallowed component-style ref(s); ${chainHardFail.length} chain hard-fail(s); ${specConflicts.length} spec-conflict(s) (review-required); ${harnessFindings.length} harness finding(s).`);
for (const kind of ['component→foundation', 'component→semantic', 'component→unknown']) {
  const items = consumption[kind]; if (!items.length) continue;
  const uniq = [...new Set(items.map((x) => x.token))].sort();
  console.error(`\n${kind} (HARD FAIL) — ${items.length} ref(s), ${uniq.length} token(s):`);
  uniq.forEach((t) => console.error(`  ${t}  ×${items.filter((x) => x.token === t).length}`));
}
if (chainHardFail.length) { console.error(`\nDefinition-chain HARD FAIL:`); chainHardFail.forEach((c) => console.error(`  ${c}`)); }
if (specConflicts.length) { console.error(`\nSPECIFICATION CONFLICTS — §A.1 vs Part G (REVIEW REQUIRED, not silently passed):`); specConflicts.forEach((c) => console.error(`  ${c}`)); }
if (harnessFindings.length) { console.error(`\nHARNESS CONTAINMENT FAIL:`); harnessFindings.forEach((c) => console.error(`  ${c}`)); }
else console.error(`\nHarness containment: OK — harness.css holds only .scenario-bar selectors; no product file imports it or uses the namespace.`);
process.exit(1);
