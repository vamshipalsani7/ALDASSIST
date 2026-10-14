/**
 * ALDASSIST Phase 9 — B5 / B5a: the representative consumer DeadlineDetail (SC-C13) + the AUTHORITATIVE
 * ready path (owner authorization D5-M / D5-M-A).
 *
 * GUARDRAIL (unchanged from the accepted B5 slice): a REPRESENTATIVE (authoritative=false) rule MUST NEVER
 * surface as a resolved deadline — it returns an honest "pending" empty state and never a date. B5a adds the
 * authoritative ready path, built ONLY for authoritative=true rules, computing the date + trace via the
 * deterministic engine. The non-rule presentation fields come from a caller-supplied `DeadlinePresentationContext`
 * (the Portfolio/tenancy layer that resolves which trigger + application a deadline belongs to is a later
 * batch, out of scope); the rules module invents no portfolio presentation. No holiday adjustment is applied
 * (plain statutory calendar date). Existing B5 behaviour and tests are preserved verbatim.
 */
import type { Kysely } from 'kysely';
import type { Database } from '../../db/types';
import type { Actor } from '../identity/types';
import type { Loaded } from '../../../src/contract/primitives';
import type { DeadlineDetailVM, DeadlineState } from '../../../src/contract/portfolio';
import { readRule } from './ruleData';
import { computeDeadline } from './engine';
import type { DeadlineRule, TriggerEvent, DeadlinePresentationContext } from './types';

/** The honest "authoritative rule data pending (D5)" empty state for a representative rule. */
function pendingAuthoritativeEmpty(): Loaded<DeadlineDetailVM> {
  return {
    state: 'empty',
    empty: {
      teaches:
        'The deadline engine is in place, but authoritative rule data for this jurisdiction is not yet published.',
      action: { verb: 'Record', label: 'Nothing needed yet', emphasis: 'secondary', nothingNeeded: true },
    },
  };
}

/** The honest "authoritative rule present, but trigger/portfolio context not yet wired" empty state. The
 *  per-deadline trigger↔application resolution is a later Portfolio batch; we NEVER fabricate a date here. */
function awaitingTriggerEmpty(): Loaded<DeadlineDetailVM> {
  return {
    state: 'empty',
    empty: {
      teaches:
        'This deadline rule is authoritative, but its trigger event and application context are not yet wired (a later step).',
      action: { verb: 'Record', label: 'Nothing needed yet', emphasis: 'secondary', nothingNeeded: true },
    },
  };
}

/**
 * B5a authoritative ready path: build a resolved DeadlineDetailVM from an AUTHORITATIVE rule + a trigger +
 * caller presentation context. Computes the date + trace via the deterministic engine. Guardrail: THROWS if
 * the rule is non-authoritative, so a representative value can never be built into a ready VM.
 */
export function buildReadyDeadlineDetail(
  rule: DeadlineRule,
  trigger: TriggerEvent,
  ctx: DeadlinePresentationContext,
): Loaded<DeadlineDetailVM> {
  if (!rule.authoritative) {
    throw new Error(
      `[rules.service] refusing to build a ready deadline from a non-authoritative rule (${rule.ruleId}) — guardrail`,
    );
  }
  const computed = computeDeadline(trigger, rule);
  const detail: DeadlineDetailVM = {
    id: ctx.id,
    title: ctx.title,
    date: computed.date, // computed, rendered, never authored (X9/D1)
    state: ctx.state as DeadlineState,
    criticality: { label: ctx.criticalityLabel, elevated: ctx.criticalityElevated },
    applicationRef: ctx.applicationRef,
    why: { trigger: ctx.whyTrigger, window: ctx.whyWindow },
    trace: { status: 'available', detail: computed.trace },
    // The client only ACKNOWLEDGES — confirmation of a critical deadline is an agent/ops act (BR-03). Never 'Confirm'.
    clientAction: { verb: 'Review', label: ctx.clientActionLabel, emphasis: 'secondary' },
    confirmationNote: ctx.confirmationNote,
  };
  return { state: 'ready', data: detail };
}

/**
 * SC-C13 — DeadlineDetail. Preserved B5 behaviour:
 *   - absent rule → not-found (CR-5 neutral);
 *   - representative (authoritative=false) rule → honest pending-empty (never a date — guardrail).
 * B5a: for an AUTHORITATIVE rule, when a trigger + presentation context are supplied, returns the computed
 * ready VM; without them (trigger/portfolio wiring deferred) returns an honest awaiting-trigger empty — never
 * a fabricated date. Existing 3-argument callers are unaffected.
 */
export async function loadDeadlineDetail(
  db: Kysely<Database>,
  _actor: Actor, // reserved: deadline↔application tenancy wiring is a later Portfolio batch (out of scope)
  deadlineId: string,
  opts?: { trigger?: TriggerEvent; ctx?: DeadlinePresentationContext },
): Promise<Loaded<DeadlineDetailVM>> {
  const rule = await readRule(db, deadlineId);
  if (!rule) return { state: 'not-found' };

  if (!rule.authoritative) {
    // D5 gate (unchanged): representative data never surfaces as a resolved authoritative deadline.
    return pendingAuthoritativeEmpty();
  }

  // Authoritative (B5a): compute + present only when the trigger and presentation context are available.
  if (opts?.trigger && opts?.ctx) {
    return buildReadyDeadlineDetail(rule, opts.trigger, opts.ctx);
  }
  return awaitingTriggerEmpty();
}
