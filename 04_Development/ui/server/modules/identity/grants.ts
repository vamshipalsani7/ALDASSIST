/**
 * ALDASSIST Phase 9 — B2b: the four distinct grant shapes and server-side CR-5 authorization
 * semantics (§8 T-2/T-3; D-2026-025).
 *
 * The four shapes are NOT interchangeable:
 *   1. Workspace membership — Client Owner/Admin/Member/Viewer, one tenancy, roled.
 *   2. Engagement grant     — an engaged agent, scoped to ONE matter, never the portfolio.
 *   3. Review grant         — exactly one Disclosure version + its analysis, for exactly one
 *                             ReviewDecision; narrower than an engagement, and creates no
 *                             client–agent relationship.
 *   4. Ops access           — internal roles; cross-tenant METADATA only; MFA + justification;
 *                             NO grant on Disclosure bodies (BR-16).
 *
 * CR-5 (T-3): outside the tenancy/grant → `not-found`, carrying nothing. Inside the tenancy but above
 * role → `permission-denied` with a reason and who-can-act. The two are NEVER conflated in either
 * direction. Authorization is server-authoritative; the actor is server-resolved (never client-asserted).
 *
 * This module decides authorization only. It wires no product port to real data, implements no Ops
 * cross-tenant aggregation (that is B11), and performs no logging itself (deny/grant logging is B2a's
 * logAccess, called by the caller). Identity/grant data is Zone-1 and is read via the Zone-1 pool.
 */
import type { Kysely } from 'kysely';
import type { Database } from '../../db/types';
import type { Actor } from './types';
import { checkMfaPolicy } from './mfa';

export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer';
const ROLE_RANK: Record<WorkspaceRole, number> = { owner: 4, admin: 3, member: 2, viewer: 1 };

export type AccessResult =
  | { decision: 'granted' }
  | { decision: 'not-found' }
  | { decision: 'permission-denied'; reason: string; whoCanAct: string };

const GRANTED: AccessResult = { decision: 'granted' };
const NOT_FOUND: AccessResult = { decision: 'not-found' };
function denied(reason: string, whoCanAct: string): AccessResult {
  return { decision: 'permission-denied', reason, whoCanAct };
}
function rolesAtOrAbove(required: WorkspaceRole): string {
  return (Object.keys(ROLE_RANK) as WorkspaceRole[])
    .filter((r) => ROLE_RANK[r] >= ROLE_RANK[required])
    .join(', ');
}

/**
 * Shape 1 — Workspace membership. No membership in the target workspace → not-found (the actor is
 * outside this tenancy and must learn nothing). A member below the required role → permission-denied.
 */
export async function authorizeWorkspace(
  zone1Db: Kysely<Database>,
  actor: Actor,
  target: { workspaceId: string; requiredRole: WorkspaceRole },
): Promise<AccessResult> {
  const row = await zone1Db
    .selectFrom('identity.membership')
    .select(['role'])
    .where('actor_id', '=', actor.id)
    .where('workspace_id', '=', target.workspaceId)
    .executeTakeFirst();
  if (!row) return NOT_FOUND;
  const role = row.role as WorkspaceRole;
  if ((ROLE_RANK[role] ?? 0) < ROLE_RANK[target.requiredRole]) {
    return denied(
      `role '${role}' is below the required '${target.requiredRole}'`,
      rolesAtOrAbove(target.requiredRole),
    );
  }
  return GRANTED;
}

/**
 * Shape 2 — Engagement grant. Scoped to exactly one matter; there is no portfolio-wide form. An agent
 * without an active engagement on this matter → not-found (no relationship carries nothing).
 */
export async function authorizeEngagement(
  zone1Db: Kysely<Database>,
  actor: Actor,
  target: { matterId: string },
): Promise<AccessResult> {
  const row = await zone1Db
    .selectFrom('identity.engagement_grant')
    .select(['id'])
    .where('actor_id', '=', actor.id)
    .where('matter_id', '=', target.matterId)
    .where('active', '=', true)
    .executeTakeFirst();
  return row ? GRANTED : NOT_FOUND;
}

/**
 * Shape 3 — Review grant. Exactly one Disclosure version + its analysis, for exactly one
 * ReviewDecision. A wrong version or a wrong decision → not-found. Narrower than an engagement grant.
 */
export async function authorizeReview(
  zone1Db: Kysely<Database>,
  actor: Actor,
  target: { disclosureVersionId: string; reviewDecisionId: string },
): Promise<AccessResult> {
  const row = await zone1Db
    .selectFrom('identity.review_grant')
    .select(['id'])
    .where('actor_id', '=', actor.id)
    .where('disclosure_version_id', '=', target.disclosureVersionId)
    .where('review_decision_id', '=', target.reviewDecisionId)
    .where('active', '=', true)
    .executeTakeFirst();
  return row ? GRANTED : NOT_FOUND;
}

/**
 * Shape 4 — Ops access. Internal roles only; cross-tenant METADATA only; MFA + justification required;
 * NO grant on Disclosure bodies (BR-16). A non-internal actor → not-found (no ops relationship). An
 * internal actor missing MFA/justification, or reaching for a body, → permission-denied. This decides
 * the ops-access SHAPE only; it performs no cross-tenant aggregation (that is B11).
 */
export type OpsScope = 'metadata' | 'disclosure_body';
export function authorizeOps(
  actor: Actor,
  target: { scope: OpsScope; justification?: string },
): AccessResult {
  if (actor.principalType !== 'internal') return NOT_FOUND;
  if (!checkMfaPolicy(actor).satisfied) {
    return denied('MFA required for internal Ops access', 'an internal role with satisfied MFA');
  }
  if (!target.justification || target.justification.trim() === '') {
    return denied('Ops access requires a recorded justification', 'an internal role providing a justification');
  }
  if (target.scope !== 'metadata') {
    return denied(
      'the Ops path grants cross-tenant metadata only; it holds no grant on Disclosure bodies (BR-16)',
      'no one via the Ops path — a Disclosure body requires client consent (BR-16)',
    );
  }
  return GRANTED;
}
