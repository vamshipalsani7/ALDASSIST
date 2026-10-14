import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../api/app';
import { destroyZonePools } from '../db/pools';
import { R0_PAGES } from '../modules/public/staticSite';

/**
 * B12 R0 — the single Fastify deployable serves the eight prerendered R0 pages via plain routes, and
 * does NOT serve any excluded Public route (they are never promoted into the R0 SSG surface). Uses
 * dummy prerendered files so the serve/route/exclusion mechanics are asserted deterministically and
 * independently of a prior build; render-content fidelity is covered by the client prerender test.
 * (SC-P10 Glossary added to the R0 set per D-2026-042.)
 */
let app: FastifyInstance;
let dir: string;

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), 'alda-r0-'));
  for (const page of R0_PAGES) {
    writeFileSync(join(dir, page.file), `<!doctype html><title>${page.file}</title>MARKER:${page.file}`, 'utf8');
  }
  app = buildApp({ publicSsgDir: dir });
  await app.ready();
});

afterAll(async () => {
  if (app) await app.close();
  await destroyZonePools();
});

describe('B12 R0 — Fastify serves all eight R0 paths', () => {
  for (const page of R0_PAGES) {
    it(`GET ${page.path} → 200 text/html (${page.file})`, async () => {
      const res = await app.inject({ method: 'GET', url: page.path });
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toMatch(/text\/html/);
      expect(res.body).toContain(`MARKER:${page.file}`);
    });
  }
  it('the R0 allow-list is exactly the eight authorized paths', () => {
    expect(R0_PAGES.map((p) => p.path).sort()).toEqual(
      ['/', '/find-your-path', '/glossary', '/guides', '/jurisdiction', '/reports', '/segment', '/stage'].sort(),
    );
  });
});

describe('B12 R0 — excluded Public routes are NOT promoted into the SSG surface', () => {
  const EXCLUDED = ['/search', '/patent', '/pricing', '/cost-planner', '/trust', '/company'];
  for (const path of EXCLUDED) {
    it(`GET ${path} → 404 (not served)`, async () => {
      const res = await app.inject({ method: 'GET', url: path });
      expect(res.statusCode).toBe(404);
    });
  }
  it('the internal API is unaffected (GET /internal/v1/health → 200)', async () => {
    const res = await app.inject({ method: 'GET', url: '/internal/v1/health' });
    expect(res.statusCode).toBe(200);
  });
});
