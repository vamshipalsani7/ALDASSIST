/**
 * ALDASSIST Phase 9 — B3: server-side command dispatch (P9-ADR-03; under `server/` per G-2 / D-031).
 *
 * `createCommandPort` binds the SERVER-RESOLVED actor (T-1 / D-2026-025) and returns the shared
 * `CommandPort` (from `src/contract/commands.ts`, direct import — the frozen barrel is untouched). Every
 * command:
 *   1. is idempotent (ADR-05): a repeated key replays the recorded status; a key reused for a different
 *      verb is a `conflict`;
 *   2. routes through the B2 authorization layer — it NEVER bypasses the identity/grant checks;
 *   3. records its outcome to the immutable Event Log (deny logged as loudly as grant — T-5);
 *   4. maps the authorization outcome onto the ADR-03 union in a CR-5-preserving way: `granted →
 *      accepted`; `permission-denied → permission-denied` (in-tenancy, safe to reveal); `not-found →
 *      rejected` with a neutral reason (outside the tenancy — reveals nothing).
 *
 * B3 wires NO product data: the per-verb → grant-shape mapping below is REPRESENTATIVE (the definitive
 * per-verb actor/authorization policy is later-batch product work). The dispatcher runs on the Zone-1
 * pool (its authorization reads and the idempotency store are Zone-1).
 */
import type { Kysely } from 'kysely';
import type { Database } from '../../db/types';
import type { Actor } from '../identity/types';
import {
  authorizeWorkspace,
  authorizeEngagement,
  authorizeReview,
  type AccessResult,
} from '../identity/grants';
import { logAccess } from '../identity/accessLog';
import type { CommandPort, CommandResult, CommandVerb } from '../../../src/contract/commands';

const NEUTRAL_REJECT = 'the command target is not available'; // CR-5: reveals nothing about existence

function mapAuthzToResult(a: AccessResult, commandId: string): CommandResult {
  switch (a.decision) {
    case 'granted':
      return { status: 'accepted', commandId };
    case 'permission-denied':
      return { status: 'permission-denied', reason: a.reason, whoCanAct: a.whoCanAct };
    case 'not-found':
      return { status: 'rejected', reason: NEUTRAL_REJECT };
  }
}

function replay(status: string, commandId: string): CommandResult {
  if (status === 'accepted') return { status: 'accepted', commandId };
  if (status === 'permission-denied')
    return { status: 'permission-denied', reason: '(replay) previously denied', whoCanAct: '(see original)' };
  return { status: 'rejected', reason: '(replay) previously rejected' };
}

/**
 * Core runner: idempotency → (validation) → authorization → record + log → result. `validate` returns a
 * rejection reason when the params are invalid, else null. `authorize` is the B2 grant check for the verb.
 */
async function runCommand(
  db: Kysely<Database>,
  actor: Actor,
  verb: CommandVerb,
  key: string,
  validate: () => string | null,
  authorize: () => Promise<AccessResult>,
): Promise<CommandResult> {
  if (!key || key.trim() === '') return { status: 'rejected', reason: 'an idempotency key is required' };

  const existing = await db
    .selectFrom('commands.idempotency')
    .select(['verb', 'result_status'])
    .where('key', '=', key)
    .executeTakeFirst();
  if (existing) {
    if (existing.verb !== verb) {
      return { status: 'conflict', reason: 'idempotency key was already used for a different command' };
    }
    return replay(existing.result_status, key); // idempotent replay — no double-apply, no re-log
  }

  const invalid = validate();
  const result: CommandResult = invalid
    ? { status: 'rejected', reason: invalid }
    : mapAuthzToResult(await authorize(), key);

  await db
    .insertInto('commands.idempotency')
    .values({ key, verb, actor_id: actor.id, result_status: result.status })
    .execute();

  await logAccess(db, {
    decision: result.status === 'accepted' ? 'granted' : 'denied',
    actorId: actor.id,
    action: `command.${verb}`,
    reason: result.status === 'accepted' ? undefined : result.status,
  });

  return result;
}

export function createCommandPort(db: Kysely<Database>, actor: Actor): CommandPort {
  const workspace = (verb: CommandVerb, key: string, workspaceId: string, requiredRole: 'admin' | 'member', validate: () => string | null = () => null) =>
    runCommand(db, actor, verb, key, validate, () => authorizeWorkspace(db, actor, { workspaceId, requiredRole }));
  const engagement = (verb: CommandVerb, key: string, matterId: string, validate: () => string | null = () => null) =>
    runCommand(db, actor, verb, key, validate, () => authorizeEngagement(db, actor, { matterId }));
  const review = (verb: CommandVerb, key: string, disclosureVersionId: string, reviewDecisionId: string) =>
    runCommand(db, actor, verb, key, () => null, () => authorizeReview(db, actor, { disclosureVersionId, reviewDecisionId }));

  return {
    record: (cmd) =>
      workspace('Record', cmd.idempotencyKey, cmd.params.workspaceId, 'member',
        () => (cmd.params.title && cmd.params.title.trim() !== '' ? null : 'a title is required')),
    import: (cmd) => workspace('Import', cmd.idempotencyKey, cmd.params.workspaceId, 'admin'),
    assess: (cmd) => engagement('Assess', cmd.idempotencyKey, cmd.params.matterId),
    engage: (cmd) => engagement('Engage', cmd.idempotencyKey, cmd.params.matterId),
    file: (cmd) => engagement('File', cmd.idempotencyKey, cmd.params.matterId),
    respond: (cmd) =>
      engagement('Respond', cmd.idempotencyKey, cmd.params.matterId,
        () => (cmd.params.message && cmd.params.message.trim() !== '' ? null : 'a message is required')),
    confirm: (cmd) => engagement('Confirm', cmd.idempotencyKey, cmd.params.matterId),
    decide: (cmd) => review('Decide', cmd.idempotencyKey, cmd.params.disclosureVersionId, cmd.params.reviewDecisionId),
    release: (cmd) => review('Release', cmd.idempotencyKey, cmd.params.disclosureVersionId, cmd.params.reviewDecisionId),
    review: (cmd) => review('Review', cmd.idempotencyKey, cmd.params.disclosureVersionId, cmd.params.reviewDecisionId),
  };
}
