/**
 * ALDASSIST Phase 9 — B5 engine-mechanism slice: the TA-8 rules escape-hatch mechanism.
 *
 * Governed strictly by D-2026-043 (G-4 resolution):
 *  - APPROVAL: each use requires an explicit Rule Governance / Ops approver who is SEPARATE from the rule
 *    author (never self-approved).
 *  - AUDIT: each use is recorded in the immutable Event Log (M0.10) with author, approver, exception/rule,
 *    and justification; and an escape-hatch marker is carried in the value's computation trace.
 *  - DISCIPLINE: the hatch is a rare, approval-gated, non-default exception; it NEVER permits hardcoded
 *    jurisdiction business logic (AP-02 / D-2026-002 remain in force).
 *
 * This is the mechanism only; it authorizes no authoritative rule authoring and introduces no real data.
 */
import type { Kysely } from 'kysely';
import type { Database } from '../../db/types';
import { appendEvent } from '../eventlog/eventlog';
import type { EscapeHatchRequest, EscapeHatchResult } from './types';

/**
 * Apply an (already-decided) escape-hatch use: enforce approver≠author, write the immutable audit record,
 * and return the audit id + the trace marker. Throws if the approval discipline is violated.
 */
export async function applyEscapeHatch(
  db: Kysely<Database>,
  req: EscapeHatchRequest,
): Promise<EscapeHatchResult> {
  if (!req.approver || !req.author) {
    throw new Error('[rules.escapeHatch] both author and approver are required (D-2026-043)');
  }
  if (req.approver === req.author) {
    throw new Error(
      '[rules.escapeHatch] the approver must be separate from the rule author — no self-approval (D-2026-043)',
    );
  }
  const { id } = await appendEvent(db, {
    type: 'rules.escape_hatch.used',
    payload: {
      ruleId: req.ruleId,
      author: req.author,
      approver: req.approver,
      exception: req.exception,
      justification: req.justification,
    },
  });
  return { auditEventId: id, traceMarker: `escape-hatch:${id}` };
}
