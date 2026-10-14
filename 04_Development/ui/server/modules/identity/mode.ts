/**
 * ALDASSIST Phase 9 — B2a: server runtime mode resolution for identity.
 * Mirrors the B1a client seam (fixture/contract/live). `live` means the real session/auth transport,
 * which is DEFERRED and fail-closed in B2 (Option A) — see resolveActor.
 */
import type { ServerRuntimeMode } from './types';

export function resolveServerMode(env: NodeJS.ProcessEnv = process.env): ServerRuntimeMode {
  const m = env.ALDA_SERVER_MODE;
  if (m === 'contract' || m === 'live' || m === 'fixture') return m;
  return 'fixture';
}
