/**
 * ALDASSIST Phase 9 — B12 (R0 slice): build-time Static Site Generation for the eight R0 Public
 * content pages (D-2026-036 / M3; SC-P10 Glossary added per D-2026-042). This is ADDITIVE build tooling: it imports the B1a runtime
 * (`ROUTES`, `createFixtureRegistry`, `RegistryProvider`) and the frozen Public screens UNCHANGED,
 * resolves each route's `load(fixtureRegistry)` to a ready `Loaded<VM>`, and renders `route.view(loaded)`
 * to static HTML via `react-dom/server`. It modifies no frozen screen/contract/fixture/token and adds no
 * dependency (React + Vite + react-dom/server already present; run via the existing `tsx`).
 *
 * Runtime per-request SSR remains deferred. Content is taken verbatim from the frozen fixtures — no copy
 * is authored or altered here, and pending `SlotValue`/SLOT states render exactly as the frozen screens
 * produce them (no invented values).
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';
import { ROUTES } from '../runtime/routes';
import { createFixtureRegistry } from '../runtime/fixtureRegistry';
import { RegistryProvider } from '../runtime/RegistryContext';

/** The eight authorized R0 content routes (B0 §3.8 R0; D-2026-036; SC-P10 added D-2026-042). Nothing else is prerendered here. */
export const R0_ROUTE_IDS: readonly string[] = ['SC-P01', 'SC-P04', 'SC-P05', 'SC-P08', 'SC-P09', 'SC-P10', 'SC-P11', 'SC-P12'];

/** Frozen CSS, inlined into each generated page (read-only; the source files are never modified). */
const CSS_FILES = ['src/tokens/tokens.generated.css', 'src/styles/global.css', 'src/styles/components.css'];
function readCss(root: string): string {
  return CSS_FILES.map((f) => {
    try { return readFileSync(join(root, f), 'utf8'); } catch { return ''; }
  }).join('\n');
}

/** Map an R0 route path to its generated filename ('/' → index.html). */
export function fileForPath(path: string): string {
  return path === '/' ? 'index.html' : `${path.replace(/^\//, '')}.html`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Render one R0 page to a full static HTML document. Refuses any route outside the R0 set. */
export async function renderPublicPageHtml(routeId: string, root: string = process.cwd()): Promise<string> {
  if (!R0_ROUTE_IDS.includes(routeId)) {
    throw new Error(`[ALDASSIST] prerenderPublic: '${routeId}' is not an authorized R0 route`);
  }
  const route = ROUTES.find((r) => r.id === routeId);
  if (!route) throw new Error(`[ALDASSIST] prerenderPublic: route '${routeId}' not found`);
  const registry = createFixtureRegistry();
  const loaded = await route.load(registry);
  const body = renderToStaticMarkup(
    <RegistryProvider registry={registry}>{route.view(loaded)}</RegistryProvider>,
  );
  const css = readCss(root);
  return (
    `<!doctype html>\n` +
    `<html lang="en" data-theme="light">\n` +
    `<head>\n` +
    `<meta charset="UTF-8" />\n` +
    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n` +
    `<title>ALDASSIST — ${escapeHtml(route.label)}</title>\n` +
    `<style>${css}</style>\n` +
    `</head>\n` +
    `<body>\n<div id="root">${body}</div>\n</body>\n</html>\n`
  );
}

/** Prerender all seven R0 pages into `outDir`. Returns the written filenames. */
export async function prerenderAll(outDir: string, root: string = process.cwd()): Promise<string[]> {
  mkdirSync(outDir, { recursive: true });
  const written: string[] = [];
  for (const id of R0_ROUTE_IDS) {
    const route = ROUTES.find((r) => r.id === id)!;
    const file = fileForPath(route.path);
    writeFileSync(join(outDir, file), await renderPublicPageHtml(id, root), 'utf8');
    written.push(file);
  }
  return written;
}

// CLI: `tsx src/ssg/prerenderPublic.tsx [--out <dir>]`
const isMain = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;
if (isMain) {
  const outIdx = process.argv.indexOf('--out');
  const outDir = outIdx >= 0 ? process.argv[outIdx + 1] : 'dist-public';
  prerenderAll(outDir)
    .then((files) => {
      // eslint-disable-next-line no-console
      console.log(`[prerenderPublic] wrote ${files.length} R0 pages to ${outDir}: ${files.join(', ')}`);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('[prerenderPublic] failed:', err);
      process.exit(1);
    });
}
