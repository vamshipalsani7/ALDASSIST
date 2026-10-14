/**
 * ALDASSIST Phase 9 — B5 engine-mechanism slice: rules-as-data access (Zone 2).
 *
 * Reads declarative deadline rules from the Zone-2 `rules.rule_set` table (owner-decision placement on the
 * existing public-data boundary; see the migration header). EVERY row returned here is REPRESENTATIVE and
 * non-authoritative (`authoritative = false`) until the external D5 dependency supplies authoritative
 * Indian rule/fee sources. This module performs NO computation and asserts NO authoritative value.
 */
import type { Kysely } from 'kysely';
import type { Database } from '../../db/types';
import type { DeadlineRule, FeeItem } from './types';

/** Load one declarative rule by id from Zone-2 rules-as-data, or null if absent. Returns the §18.2 offset
 *  model (offsetValue/offsetUnit) for authoritative rows and the legacy windowDays for representative rows. */
export async function readRule(db: Kysely<Database>, ruleId: string): Promise<DeadlineRule | null> {
  const row = await db
    .selectFrom('rules.rule_set')
    .select([
      'rule_id',
      'rule_version',
      'jurisdiction',
      'trigger_type',
      'window_days',
      'offset_value',
      'offset_unit',
      'from_anchor',
      'statutory_citation',
      'source_provision',
      'calendar_adjustment',
      'extensions',
      'effective_date',
      'provenance',
      'authoritative',
    ])
    .where('rule_id', '=', ruleId)
    .executeTakeFirst();
  if (!row) return null;
  const unit = row.offset_unit === 'days' || row.offset_unit === 'months' ? row.offset_unit : null;
  return {
    ruleId: row.rule_id,
    ruleVersion: row.rule_version,
    jurisdiction: row.jurisdiction,
    triggerType: row.trigger_type,
    windowDays: row.window_days == null ? null : Number(row.window_days),
    offsetValue: row.offset_value == null ? null : Number(row.offset_value),
    offsetUnit: unit,
    fromAnchor: row.from_anchor ?? null,
    statutoryCitation: row.statutory_citation,
    sourceProvision: row.source_provision ?? null,
    calendarAdjustment: row.calendar_adjustment,
    extensions: row.extensions,
    effectiveDate: row.effective_date ?? null,
    provenance: row.provenance ?? null,
    authoritative: row.authoritative,
  };
}

/** Load one authoritative fee datum by id from the Zone-2 fee schedule, or null if absent (B5a). */
export async function readFee(db: Kysely<Database>, feeId: string): Promise<FeeItem | null> {
  const row = await db
    .selectFrom('rules.fee_schedule')
    .select([
      'fee_id', 'jurisdiction', 'entry_ref', 'applies_to', 'tier', 'mode', 'basis',
      'amount_inr', 'source_provision', 'source_citation', 'effective_date', 'provenance', 'authoritative',
    ])
    .where('fee_id', '=', feeId)
    .executeTakeFirst();
  if (!row) return null;
  return {
    feeId: row.fee_id,
    jurisdiction: row.jurisdiction,
    entryRef: row.entry_ref,
    appliesTo: row.applies_to,
    tier: row.tier === 'other' ? 'other' : 'low',
    mode: row.mode === 'physical' ? 'physical' : 'efiling',
    basis: row.basis as FeeItem['basis'],
    amountInr: Number(row.amount_inr),
    sourceProvision: row.source_provision,
    sourceCitation: row.source_citation,
    effectiveDate: String(row.effective_date),
    provenance: row.provenance,
    authoritative: row.authoritative,
  };
}
