/**
 * ALDASSIST Phase 9 — B1b: internal API skeleton (P9-ADR-05 / Phase 3 §21.2, inherited).
 * REST, versioned by URL path (/internal/v1), idempotency-key aware on mutations, zone-aware.
 * This skeleton serves exactly ONE trivial non-product resource (GET /internal/v1/ping); NO product
 * port is wired to real data. It also serves the B12 R0 Public pages as build-time-generated static
 * HTML (D-2026-036 / M3 — SSG, served via plain routes; runtime per-request SSR remains deferred) from
 * the single deployable (D-2026-028).
 */
import Fastify, { type FastifyInstance } from 'fastify';
import { loggerOptions } from '../logging/logger';
import { getZonePools, type ZonePools } from '../db/pools';
import { readPing } from '../modules/platform/ping';
import { registerPublicStatic } from '../modules/public/staticSite';

export interface BuildAppOptions {
  pools?: ZonePools;
  /** Directory holding the prerendered B12 R0 Public HTML (default env ALDA_PUBLIC_SSG_DIR or dist-public). */
  publicSsgDir?: string;
}

export function buildApp(opts: BuildAppOptions = {}): FastifyInstance {
  const app = Fastify({ logger: loggerOptions });
  const pools = opts.pools ?? getZonePools();

  // Idempotency-key acknowledgement stub (Phase 3 §21.2). No mutating product endpoint exists in B1b;
  // this records the header so the convention is present for later command batches.
  app.addHook('onRequest', async (req) => {
    const key = req.headers['idempotency-key'];
    if (typeof key === 'string') (req as { idempotencyKey?: string }).idempotencyKey = key;
  });

  const v1 = '/internal/v1';

  app.get(`${v1}/health`, async () => ({ status: 'ok' }));

  // The single trivial NON-PRODUCT resource, end-to-end through a zone pool + the Event Log.
  app.get(`${v1}/ping`, async () => {
    return readPing(pools);
  });

  // B12 R0: serve the prerendered Public content pages (build-time SSG; D-2026-036). Only the seven
  // authorized R0 paths are registered — excluded Public routes are never promoted into this surface.
  registerPublicStatic(app, {
    dir: opts.publicSsgDir ?? process.env.ALDA_PUBLIC_SSG_DIR ?? 'dist-public',
  });

  return app;
}
