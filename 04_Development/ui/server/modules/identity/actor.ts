/**
 * ALDASSIST Phase 9 — B2a: the SERVER-RESOLVED actor seam (T-1 / D-2026-025).
 *
 * The actor is resolved on the server and is NEVER client-asserted: `actorId` stands in for the
 * identity that the (deferred) live session/auth layer would establish — it is never read from a
 * request body, query parameter, or header by this seam. Callers obtain it from the session layer;
 * tests inject it directly (standing in for that layer).
 *
 * `live` mode is FAIL-CLOSED (B2 Option A): no session mechanism/lifetime/renewal/expiry/revocation
 * is decided yet, so the live path refuses rather than guessing. Actors are resolved only in the
 * `fixture` and `contract` modes in B2. Identity is Zone-1 confidential — resolution runs on the
 * Zone-1 credentialed pool (D-2026-003 / P9-ADR-08).
 */
import type { Kysely } from 'kysely';
import type { Database } from '../../db/types';
import type { Actor, PrincipalType, ServerRuntimeMode } from './types';

/** The server-side principal id. From the session layer in production; injected in fixture/contract. */
export interface ResolvedActorSource {
  actorId: string;
}

/** Uniform absence (T-3): an unknown/foreign actor is "not found" and carries nothing. */
export class ActorNotFoundError extends Error {
  constructor() {
    super('[ALDASSIST] actor not found');
    this.name = 'ActorNotFoundError';
  }
}

/** Fail-closed marker for the deferred live session path. */
export class LiveSessionUnavailableError extends Error {
  constructor() {
    super(
      '[ALDASSIST] live actor resolution is not available: no session mechanism is decided yet ' +
        '(session transport/lifetime deferred — fail-closed). B2 resolves actors in fixture/contract only.',
    );
    this.name = 'LiveSessionUnavailableError';
  }
}

export async function resolveActor(
  zone1Db: Kysely<Database>,
  mode: ServerRuntimeMode,
  source: ResolvedActorSource,
): Promise<Actor> {
  if (mode === 'live') {
    // No session mechanism exists yet; never fall back to a client-supplied or guessed identity.
    throw new LiveSessionUnavailableError();
  }
  const row = await zone1Db
    .selectFrom('identity.actor')
    .select(['id', 'principal_type', 'mfa_satisfied'])
    .where('id', '=', source.actorId)
    .executeTakeFirst();
  if (!row) throw new ActorNotFoundError();
  return {
    id: String(row.id),
    principalType: row.principal_type as PrincipalType,
    mfaSatisfied: row.mfa_satisfied,
  };
}
