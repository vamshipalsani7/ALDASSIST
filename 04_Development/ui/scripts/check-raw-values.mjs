/**
 * ALDASSIST Phase 8 — raw design-value scanner (B9 cross-cutting verification).
 *
 * WHY THIS EXISTS (grounding): the token-hierarchy checker (scripts/check-token-hierarchy.mjs) validates
 * the TIER of every `var(--…)` reference, but its own SCOPE BOUNDARY note states it does NOT detect raw
 * literal design values (px/hex/rgba/…) embedded directly in styles — leaving raw-value avoidance (a
 * Phase 7 principle: §A.1 "components never bind to raw values", STEP 8, DS F.1) an UNRESOLVED Phase-8
 * verification requirement. B9 closes that verification gap WITHOUT resolving any open decision: it does
 * NOT invent tokens and does NOT remediate the inherited baseline (whether those structural literals
 * should become tokens is a design decision left for the independent audit).
 *
 * STANDALONE by mandate — this is a SEPARATE gate and is deliberately NOT folded into
 * check-token-hierarchy.mjs (which stays exactly as frozen).
 *
 * SCOPE — mirrors the token checker's product-style scope EXACTLY:
 *   src/styles/components.css  +  product .tsx under src/{components,shell,screens} (excl. *.stories/*.test).
 *   Excluded (same rationale as the token checker): src/styles/global.css & tokens.generated.css (the
 *   foundation tier LEGITIMATELY holds raw primitives), src/styles/harness.css (non-product demo harness),
 *   and src/App.tsx (the fixture/demo harness entry — outside components/shell/screens).
 *
 * MODEL — a monotonic baseline gate (the standard lint-baseline pattern):
 *   • The inherited raw-value baseline is committed at scripts/raw-value-baseline.json as a per-file
 *     multiset { file: { value: count } } — line-independent, so unrelated edits never churn it.
 *   • PASS (exit 0) when every (file,value) occurrence count is ≤ its baseline count — i.e. NO NEW raw
 *     values were introduced (remediation that REDUCES counts also passes).
 *   • FAIL (exit 1) on any NEW raw value, or MORE occurrences of an existing one, or a raw value in a file
 *     not covered by the baseline.
 *   • `--update-baseline` rewrites the baseline from the current tree. It is NOT run by `verify`; changing
 *     the inherited baseline is a deliberate, reviewable act (a Decision-Log matter), never automatic.
 *
 * DETECTORS (raw design values only): hex colours (#rgb…#rrggbbaa), colour functions (rgb/rgba/hsl/hsla),
 * and lengths carrying a physical unit (px/rem/em/pt). Deliberately NOT flagged: unitless 0/integers,
 * percentages, viewport units (vh/vw), grid fr, unitless line-heights — these are structural/layout values,
 * not raw design primitives, and flagging them would be noise. Matches inside a var(--…) or url(…) are ignored.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join, relative } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE_PATH = join(root, 'scripts/raw-value-baseline.json');

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

/** The product-style scan set — identical scoping to check-token-hierarchy.mjs. */
export function scanFiles() {
  const productTsx = [
    ...walk(join(root, 'src/components')),
    ...walk(join(root, 'src/shell')),
    ...walk(join(root, 'src/screens')),
  ].filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx') && !f.endsWith('.test.tsx'));
  return [join(root, 'src/styles/components.css'), ...productTsx];
}

const HEX = /#[0-9a-fA-F]{3,8}\b/g;
const FUNC = /\b(?:rgba?|hsla?)\s*\(/g;
// length with a physical unit; the lookbehind avoids matching hex digits (…#abcdef) and identifier fragments.
const LEN = /(?<![\w#.])\d*\.?\d+(?:px|rem|em|pt)\b/g;

/** Strip spans we must not scan (a var(--…) reference and url(…) payloads) before detecting raw values. */
function maskIgnored(line) {
  return line.replace(/var\([^)]*\)/g, ' ').replace(/url\([^)]*\)/g, ' ');
}

/** Build the current per-file multiset of raw values, line-independent. */
export function collect() {
  const acc = {}; // { relFile: { value: count } }
  for (const file of scanFiles()) {
    const rel = relative(root, file).replace(/\\/g, '/');
    const text = readFileSync(file, 'utf8');
    for (const raw of text.split('\n')) {
      const line = maskIgnored(raw);
      for (const re of [HEX, FUNC, LEN]) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(line)) !== null) {
          const value = m[0].toLowerCase().replace(/\s+/g, '');
          (acc[rel] ||= {});
          acc[rel][value] = (acc[rel][value] || 0) + 1;
        }
      }
    }
  }
  return acc;
}

function totalOccurrences(ms) {
  return Object.values(ms).reduce((n, byVal) => n + Object.values(byVal).reduce((a, b) => a + b, 0), 0);
}

/** Compare current against baseline; return NEW violations (current count exceeding baseline). */
export function diff(current, baseline) {
  const violations = [];
  for (const [file, byVal] of Object.entries(current)) {
    for (const [value, count] of Object.entries(byVal)) {
      const base = (baseline[file] && baseline[file][value]) || 0;
      if (count > base) violations.push({ file, value, baseline: base, current: count, new: count - base });
    }
  }
  return violations;
}

function run() {
  const current = collect();

  if (process.argv.includes('--update-baseline')) {
    const meta = {
      _note: 'INHERITED raw design-value baseline (B9). Per-file multiset of raw literals in the product-style '
        + 'scope that predate B9. NOT a clean state — these are structural literals the token system does not '
        + 'yet name. B9 neither invents tokens nor remediates them (a decision deferred to the Phase 8 audit). '
        + 'Regenerate ONLY by deliberate review (Decision-Log matter); `verify` never updates it.',
      _generatedBy: 'scripts/check-raw-values.mjs --update-baseline',
    };
    writeFileSync(BASELINE_PATH, JSON.stringify({ ...meta, baseline: current }, null, 2) + '\n');
    console.log(`raw-values: baseline written → ${relative(root, BASELINE_PATH)} (${totalOccurrences(current)} inherited occurrence(s) across ${Object.keys(current).length} file(s)).`);
    return 0;
  }

  if (!existsSync(BASELINE_PATH)) {
    console.error(`raw-values: FAIL — no baseline at ${relative(root, BASELINE_PATH)}. Generate it once with:  node scripts/check-raw-values.mjs --update-baseline`);
    return 1;
  }

  const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8')).baseline || {};
  const inherited = totalOccurrences(baseline);
  const violations = diff(current, baseline);

  if (violations.length === 0) {
    console.log(`raw-values: OK — no NEW raw design values. Inherited baseline: ${inherited} occurrence(s) across ${Object.keys(baseline).length} file(s) (unchanged; not remediated in B9 by mandate).`);
    return 0;
  }

  console.error(`raw-values: FAIL — ${violations.length} NEW raw design-value violation(s) beyond the inherited baseline (${inherited} occurrence(s)). New raw values are prohibited (Phase 7 §A.1/STEP 8/DS F.1); introduce a token, do not hardcode:`);
  for (const v of violations) {
    console.error(`  ${v.file}: "${v.value}"  baseline×${v.baseline} → now×${v.current}  (+${v.new} new)`);
  }
  return 1;
}

// Main-guard: only scan / exit when invoked as a script (so tests can import the pure helpers above).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(run());
}
