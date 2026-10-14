/**
 * ALDASSIST Phase 9 — B12 (R0 slice): serve the prerendered R0 Public pages from the existing Fastify
 * single deployable (D-2026-036 / M3). Plain static-file routes — NO `@fastify/static`, no new
 * dependency. Only the eight authorized R0 paths are registered; every excluded Public route
 * (PatentSearch, PatentDocument, Pricing, CostPlanner, Trust, CompanyLegal, AgentDirectory,
 * AgentPublicProfile) is deliberately absent, so it is never promoted into the R0 SSG surface.
 * (SC-P10 Glossary was promoted into the R0 set per D-2026-042.)
 * Runtime per-request SSR remains deferred; these routes only read the build-time-generated HTML.
 */
import { readFile } from 'node:fs/promises';
import { join, normalize } from 'node:path';
import type { FastifyInstance } from 'fastify';

/** The eight authorized R0 paths → their generated filename. This list is the R0 allow-list. */
export const R0_PAGES: ReadonlyArray<{ path: string; file: string }> = [
  { path: '/', file: 'index.html' },
  { path: '/stage', file: 'stage.html' },
  { path: '/segment', file: 'segment.html' },
  { path: '/find-your-path', file: 'find-your-path.html' },
  { path: '/guides', file: 'guides.html' },
  { path: '/glossary', file: 'glossary.html' },
  { path: '/jurisdiction', file: 'jurisdiction.html' },
  { path: '/reports', file: 'reports.html' },
];

/** Register a plain GET route per R0 path that serves its prerendered HTML from `dir`. */
export function registerPublicStatic(app: FastifyInstance, opts: { dir: string }): void {
  const dir = normalize(opts.dir);
  for (const page of R0_PAGES) {
    app.get(page.path, async (_req, reply) => {
      try {
        const html = await readFile(join(dir, page.file), 'utf8');
        return await reply.type('text/html; charset=utf-8').send(html);
      } catch {
        return reply.code(404).type('text/plain; charset=utf-8').send('Not found');
      }
    });
  }
}
