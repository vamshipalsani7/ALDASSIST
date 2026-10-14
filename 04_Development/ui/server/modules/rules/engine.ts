/**
 * ALDASSIST Phase 9 — B5 engine-mechanism slice: the deterministic Deadline & Rules Engine core.
 *
 * AP-02 / D-2026-002 (rules are data): this engine computes from a declarative rule + a trigger event; it
 * contains NO jurisdiction-specific business logic. The computation is pure and deterministic — the same
 * (trigger, rule) always yields the same date and trace (reproducible from the Event Log, §18.5/TS-3).
 * No authoritative data is embedded here; rules are supplied by the caller (representative in this slice).
 */
import type { DeadlineTraceDetailVM } from '../../../src/contract/portfolio';
import type { DeadlineRule, TriggerEvent, ComputedDeadline, EscapeHatchResult } from './types';

const DAY_MS = 86_400_000;

/** Add whole days to an ISO date (UTC), returning an ISO date. Deterministic; no locale/zone drift. */
function addDays(isoDate: string, days: number): string {
  const base = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(base.getTime())) throw new Error(`[rules.engine] invalid trigger date: ${isoDate}`);
  return new Date(base.getTime() + days * DAY_MS).toISOString().slice(0, 10);
}

/**
 * Add whole CALENDAR months to an ISO date (UTC), returning an ISO date. TRUE calendar-month arithmetic —
 * NOT a day approximation (no "month = 30 days", no "6 months = 180 days").
 *
 * MONTH-END SEMANTICS (deterministic, documented — owner authorization D5-M/D5-M-A): the target is the same
 * day-of-month in the month `months` later; if that day does not exist in the target month, it CLAMPS to the
 * last day of the target month. Examples: 2026-01-31 +1m → 2026-02-28; 2026-08-31 +6m → 2027-02-28;
 * 2024-02-29 +12m → 2025-02-28. No holiday/weekend/working-day adjustment is applied — the result is the
 * PLAIN statutory calendar date (Q4 calendar treatment is EXCLUDED from this MVP).
 */
function addMonths(isoDate: string, months: number): string {
  const base = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(base.getTime())) throw new Error(`[rules.engine] invalid anchor date: ${isoDate}`);
  const y = base.getUTCFullYear();
  const m = base.getUTCMonth();
  const d = base.getUTCDate();
  const targetIndex = m + months;
  const targetYear = y + Math.floor(targetIndex / 12);
  const targetMonth = ((targetIndex % 12) + 12) % 12;
  // Day 0 of the following month = the last day of the target month (clamp source).
  const lastDayOfTarget = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
  const day = Math.min(d, lastDayOfTarget);
  return new Date(Date.UTC(targetYear, targetMonth, day)).toISOString().slice(0, 10);
}

/** Resolve the offset for a rule: the §18.2 offset/unit path (days|months) when present, else the legacy
 *  representative windowDays (days) path. Deterministic; months use true calendar arithmetic. */
function applyOffset(anchorIsoDate: string, rule: DeadlineRule): string {
  if (rule.offsetUnit != null && rule.offsetValue != null) {
    if (rule.offsetUnit === 'months') return addMonths(anchorIsoDate, rule.offsetValue);
    if (rule.offsetUnit === 'days') return addDays(anchorIsoDate, rule.offsetValue);
    throw new Error(`[rules.engine] unsupported offset unit: ${rule.offsetUnit}`);
  }
  if (rule.windowDays != null) return addDays(anchorIsoDate, rule.windowDays);
  throw new Error(`[rules.engine] rule ${rule.ruleId} has neither an offset (value+unit) nor windowDays`);
}

/**
 * Compute a deadline deterministically from a declarative rule + a trigger event.
 * An optional TA-8 escape-hatch result (already approved + audited per D-2026-043) contributes ONLY a
 * marker into the trace's `extensions` string — the frozen `DeadlineTraceDetailVM` shape is unchanged.
 */
export function computeDeadline(
  trigger: TriggerEvent,
  rule: DeadlineRule,
  escape?: EscapeHatchResult,
): ComputedDeadline {
  const date = applyOffset(trigger.occurredAt, rule);
  const extensions = escape ? `${rule.extensions} [${escape.traceMarker}]`.trim() : rule.extensions;
  const trace: DeadlineTraceDetailVM = {
    ruleId: rule.ruleId,
    ruleVersion: rule.ruleVersion,
    statutoryCitation: rule.statutoryCitation,
    calendarAdjustment: rule.calendarAdjustment,
    extensions,
  };
  return { date, trace };
}
