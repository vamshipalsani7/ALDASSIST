/**
 * ALDASSIST Phase 9 — B1b: the `contract`-mode trivial-resource transport.
 *
 * Proves the wire format end-to-end (FA-4 "contract" mode: real transport, trivial payload) WITHOUT
 * wiring any of the 56 frozen product ports — those remain fixture-backed until later batches. This is
 * a standalone probe against the internal API's trivial resource; buildRegistry() is unchanged, so the
 * fixture/contract/live provider-mode boundary is intact and no product port touches real data.
 */
export interface TrivialResource {
  resource: 'ping';
  note: string;
  at: string;
}

export async function fetchTrivialResource(baseUrl: string): Promise<TrivialResource> {
  const res = await fetch(`${baseUrl}/internal/v1/ping`);
  if (!res.ok) throw new Error(`[ALDASSIST] contract-mode trivial resource failed: HTTP ${res.status}`);
  const body = (await res.json()) as TrivialResource;
  return body;
}
