/**
 * ALDASSIST Phase 9 — B1b: Event Log append (module M0.10).
 * The Event Log is append-only and immutable — enforced in the database (REVOKE UPDATE/DELETE + an
 * immutability trigger, see migrations). This module offers ONLY an append; there is no update/delete API.
 */
import type { Kysely } from 'kysely';
import type { Database } from '../../db/types';

export interface AppendEventInput {
  type: string;
  payload: unknown;
}

export async function appendEvent(db: Kysely<Database>, input: AppendEventInput): Promise<{ id: string }> {
  const row = await db
    .insertInto('eventlog.event')
    .values({ type: input.type, payload: input.payload as never })
    .returning('id')
    .executeTakeFirstOrThrow();
  return { id: String(row.id) };
}
