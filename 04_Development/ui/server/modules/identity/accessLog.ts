/**
 * ALDASSIST Phase 9 — B2a: access decision logging (T-5, M0.10).
 *
 * "Deny is logged as loudly as grant." Both a granted and a denied access decision append an
 * immutable Event-Log entry. The payload carries only the actor id, the action, and a short reason —
 * NEVER any Zone-1 content (NFR-S06). The Event Log's append-only/immutability guarantee is enforced
 * by the database (B1b: REVOKE + trigger).
 */
import type { Kysely } from 'kysely';
import type { Database } from '../../db/types';
import { appendEvent } from '../eventlog/eventlog';

export type AccessDecision = 'granted' | 'denied';

export interface AccessLogInput {
  decision: AccessDecision;
  actorId: string;
  action: string;
  reason?: string;
}

export async function logAccess(db: Kysely<Database>, input: AccessLogInput): Promise<{ id: string }> {
  return appendEvent(db, {
    type: `access.${input.decision}`,
    payload: { actorId: input.actorId, action: input.action, reason: input.reason ?? null },
  });
}
