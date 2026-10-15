/**
 * ALDASSIST Phase 9 — B5a authoritative D5 MVP tests (owner authorization D5-M / D5-M-A).
 *
 * Golden cases for the authorized scope ONLY: B1 base (6 months from FER issuance), B1 +3-month extension,
 * B1 extension fee (low/other), B3 national-phase (31 months from priority), B3 filing fee (low/other),
 * >10 excess claims, >30 excess pages, plus true calendar-month MONTH-END semantics. Also: the authoritative
 * ready path produces a resolved DeadlineDetailVM, and the guardrail still forbids a non-authoritative rule
 * from ever becoming a ready/dated value. NO holiday, Rule-138, B2, B5-renewal, or Art.19/34-edge cases.
 */
import { describe, it, expect, afterAll } from 'vitest';
import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from '../db/types';
import type { Actor } from '../modules/identity/types';
import { computeDeadline } from '../modules/rules/engine';
import { readRule, readFee } from '../modules/rules/ruleData';
import { excessFeeForItem, excessOverThreshold } from '../modules/rules/fees';
import { buildReadyDeadlineDetail, loadDeadlineDetail } from '../modules/rules/service';
import type { DeadlineRule, DeadlinePresentationContext } from '../modules/rules/types';

const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};
const { Pool } = pg;
const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool: new Pool({ ...base, user: process.env.DB_ZONE2_USER ?? 'alda_zone2', max: 3 }) }),
});
const actor: Actor = { id: '22222222-2222-2222-2222-222222222222', principalType: 'internal', mfaSatisfied: true };
afterAll(async () => { await db.destroy(); });

// Rule literals mirroring the seeded authoritative rows (unit-level, DB-independent determinism).
const R_B1_BASE: DeadlineRule = {
  ruleId: 'IN-FER-RESP-BASE', ruleVersion: 'v1', jurisdiction: 'IN',
  triggerType: 'application.examination_report.issued', offsetValue: 6, offsetUnit: 'months', fromAnchor: 'trigger_date',
  statutoryCitation: 'Patents Rules 2003, rule 24B(5); Patents Act 1970, s.21',
  calendarAdjustment: 'none (plain statutory calendar date)', extensions: '', authoritative: true,
};
const R_B1_EXT: DeadlineRule = {
  ruleId: 'IN-FER-RESP-EXT', ruleVersion: 'v1', jurisdiction: 'IN',
  triggerType: 'deadline.fer_response.base_computed', offsetValue: 3, offsetUnit: 'months', fromAnchor: 'prior_deadline',
  statutoryCitation: 'Patents Rules 2003, rule 24B(6)', calendarAdjustment: 'none', extensions: '', authoritative: true,
};
const R_B3_NP: DeadlineRule = {
  ruleId: 'IN-NP-ENTRY', ruleVersion: 'v1', jurisdiction: 'IN',
  triggerType: 'application.priority_established', offsetValue: 31, offsetUnit: 'months', fromAnchor: 'priority_date',
  statutoryCitation: 'Patents Rules 2003, rule 20(4)(i); PCT Article 2(xi)',
  calendarAdjustment: 'none (plain statutory calendar date)', extensions: '', authoritative: true,
};

describe('B5a engine — calendar-month deadlines (golden cases; plain statutory dates, no holiday adjustment)', () => {
  it('B1 base: FER issued 2026-01-15 + 6 months = 2026-07-15', () => {
    const r = computeDeadline({ type: R_B1_BASE.triggerType, occurredAt: '2026-01-15' }, R_B1_BASE);
    expect(r.date).toBe('2026-07-15');
  });
  it('B1 +3-month extension: base 2026-07-15 + 3 months = 2026-10-15', () => {
    const r = computeDeadline({ type: R_B1_EXT.triggerType, occurredAt: '2026-07-15' }, R_B1_EXT);
    expect(r.date).toBe('2026-10-15');
  });
  it('B3 national phase: priority 2024-01-15 + 31 months = 2026-08-15', () => {
    const r = computeDeadline({ type: R_B3_NP.triggerType, occurredAt: '2024-01-15' }, R_B3_NP);
    expect(r.date).toBe('2026-08-15');
  });
  it('is true calendar-month arithmetic — NOT day approximation (31 months ≠ 930 days)', () => {
    const r = computeDeadline({ type: R_B3_NP.triggerType, occurredAt: '2024-01-15' }, R_B3_NP);
    // 930-day approximation would land on 2026-08-03; calendar arithmetic lands on 2026-08-15.
    expect(r.date).toBe('2026-08-15');
    expect(r.date).not.toBe('2026-08-03');
  });
});

describe('B5a engine — month-end clamping semantics (documented, deterministic)', () => {
  const mk = (months: number): DeadlineRule => ({ ...R_B1_BASE, offsetValue: months, offsetUnit: 'months' });
  it('2026-01-31 + 1 month → 2026-02-28 (clamp to short month; 2026 non-leap)', () => {
    expect(computeDeadline({ type: 't', occurredAt: '2026-01-31' }, mk(1)).date).toBe('2026-02-28');
  });
  it('2024-01-31 + 1 month → 2024-02-29 (clamp to leap-year February)', () => {
    expect(computeDeadline({ type: 't', occurredAt: '2024-01-31' }, mk(1)).date).toBe('2024-02-29');
  });
  it('2026-08-31 + 6 months → 2027-02-28 (year rollover + clamp)', () => {
    expect(computeDeadline({ type: 't', occurredAt: '2026-08-31' }, mk(6)).date).toBe('2027-02-28');
  });
  it('2024-02-29 + 12 months → 2025-02-28 (leap-day anniversary clamp)', () => {
    expect(computeDeadline({ type: 't', occurredAt: '2024-02-29' }, mk(12)).date).toBe('2025-02-28');
  });
  it('mid-month add is exact (no clamp): 2026-03-15 + 6 months → 2026-09-15', () => {
    expect(computeDeadline({ type: 't', occurredAt: '2026-03-15' }, mk(6)).date).toBe('2026-09-15');
  });
});

describe('B5a engine — legacy representative days path is preserved (no regression)', () => {
  it('a windowDays-only rule still computes via day arithmetic: 2026-01-01 + 90d = 2026-04-01', () => {
    const rep: DeadlineRule = {
      ruleId: 'REP-TEST', ruleVersion: 'rep-0', jurisdiction: 'IN', triggerType: 't',
      windowDays: 90, statutoryCitation: 'REPRESENTATIVE', calendarAdjustment: 'none', extensions: '', authoritative: false,
    };
    expect(computeDeadline({ type: 't', occurredAt: '2026-01-01' }, rep).date).toBe('2026-04-01');
  });
});

describe('B5a authoritative ready path + guardrail', () => {
  const ctx: DeadlinePresentationContext = {
    id: 'dl-1', title: 'FER response', applicationRef: '2026/DEL/000123',
    criticalityLabel: 'Rights-affecting', criticalityElevated: true, state: 'upcoming',
    whyTrigger: 'First examination report issued', whyWindow: 'Statutory response window (6 months)',
    clientActionLabel: 'Review the deadline', confirmationNote: 'Critical deadlines are confirmed by your agent or Docket Ops.',
  };
  it('builds a ready DeadlineDetailVM with the computed date + available trace', () => {
    const r = buildReadyDeadlineDetail(R_B1_BASE, { type: R_B1_BASE.triggerType, occurredAt: '2026-01-15' }, ctx);
    expect(r.state).toBe('ready');
    if (r.state === 'ready') {
      expect(r.data.date).toBe('2026-07-15');
      expect(r.data.trace.status).toBe('available');
      if (r.data.trace.status === 'available') expect(r.data.trace.detail.ruleId).toBe('IN-FER-RESP-BASE');
      expect(r.data.clientAction.verb).not.toBe('Confirm'); // BR-03: client never confirms
    }
  });
  it('GUARDRAIL: refuses to build a ready deadline from a non-authoritative rule', () => {
    const rep: DeadlineRule = { ...R_B1_BASE, ruleId: 'REP-X', authoritative: false };
    expect(() => buildReadyDeadlineDetail(rep, { type: 't', occurredAt: '2026-01-15' }, ctx)).toThrow(/non-authoritative|guardrail/i);
  });
});

describe('B5a fees — excess count/fee computation (pure, deterministic)', () => {
  it('13 claims → 3 excess', () => expect(excessOverThreshold(13, 10)).toBe(3));
  it('34 pages → 4 excess', () => expect(excessOverThreshold(34, 30)).toBe(4));
  it('≤ threshold → 0 excess (no negative)', () => expect(excessOverThreshold(8, 10)).toBe(0));
});

describe('B5a authoritative data (DB, Zone-2) — rules + fees seeded with provenance', () => {
  it('R-B1-BASE is authoritative with a 6-month offset', async () => {
    const rule = await readRule(db, 'IN-FER-RESP-BASE');
    expect(rule?.authoritative).toBe(true);
    expect(rule?.offsetUnit).toBe('months');
    expect(rule?.offsetValue).toBe(6);
    expect(rule?.windowDays).toBeNull();
  });
  it('R-B3-NP is authoritative with a 31-month offset from the priority date', async () => {
    const rule = await readRule(db, 'IN-NP-ENTRY');
    expect(rule?.offsetUnit).toBe('months');
    expect(rule?.offsetValue).toBe(31);
    expect(rule?.statutoryCitation).toMatch(/20\(4\)\(i\)/);
  });
  it('B3 filing fee (Entry 1): low = 1600, other = 8000 (e-filing)', async () => {
    expect((await readFee(db, 'IN-NP-FILING-LOW-EFILING'))?.amountInr).toBe(1600);
    expect((await readFee(db, 'IN-NP-FILING-OTHER-EFILING'))?.amountInr).toBe(8000);
  });
  it('B3 filing fee (Entry 1): physical low = 1750, other = 8800 (D-2026-047)', async () => {
    const low = await readFee(db, 'IN-NP-FILING-LOW-PHYSICAL');
    const other = await readFee(db, 'IN-NP-FILING-OTHER-PHYSICAL');
    expect(low?.amountInr).toBe(1750);
    expect(other?.amountInr).toBe(8800);
    // D-2026-047 regression guard: the physical low figure is read from the First Schedule,
    // NOT derived as e-filing + a ten-percent uplift (a method two official sources contradict).
    expect(low?.provenance).not.toMatch(/ten-percent|uplift/i);
  });
  it('B1 extension fee (Entry 4, r.24B(6)): low = 1000, other = 4000 per month (e-filing)', async () => {
    const low = await readFee(db, 'IN-FER-EXT-LOW-EFILING');
    const other = await readFee(db, 'IN-FER-EXT-OTHER-EFILING');
    expect(low?.amountInr).toBe(1000);
    expect(low?.basis).toBe('per_month');
    expect(other?.amountInr).toBe(4000);
  });
  it('B3 excess: 13 claims (low) → 3 × 320 = 960; 34 pages (low) → 4 × 160 = 640', async () => {
    const claim = await readFee(db, 'IN-NP-EXCESS-CLAIM-LOW-EFILING');
    const page = await readFee(db, 'IN-NP-EXCESS-PAGE-LOW-EFILING');
    expect(claim && excessFeeForItem(claim, 13)).toBe(960);
    expect(page && excessFeeForItem(page, 34)).toBe(640);
  });
  it('every authoritative fee carries provenance + effective date', async () => {
    const f = await readFee(db, 'IN-NP-FILING-LOW-EFILING');
    expect(f?.authoritative).toBe(true);
    expect(f?.provenance).toBeTruthy();
    expect(f?.effectiveDate).toBeTruthy();
    expect(f?.sourceCitation).toMatch(/First Schedule/i);
  });
});

describe('B5a DeadlineDetail service — authoritative vs representative', () => {
  const ctx: DeadlinePresentationContext = {
    id: 'dl-np', title: 'National-phase entry', applicationRef: 'PCT/IB2024/050999',
    criticalityLabel: 'Critical', criticalityElevated: true, state: 'upcoming',
    whyTrigger: 'Priority established', whyWindow: '31-month statutory window',
    clientActionLabel: 'Review the deadline', confirmationNote: 'Confirmed by your agent or Docket Ops.',
  };
  it('authoritative rule + trigger + ctx → ready with computed date', async () => {
    const r = await loadDeadlineDetail(db, actor, 'IN-NP-ENTRY', {
      trigger: { type: 'application.priority_established', occurredAt: '2024-01-15' }, ctx,
    });
    expect(r.state).toBe('ready');
    if (r.state === 'ready') expect(r.data.date).toBe('2026-08-15');
  });
  it('authoritative rule WITHOUT trigger/ctx → honest empty (never a fabricated date)', async () => {
    const r = await loadDeadlineDetail(db, actor, 'IN-NP-ENTRY');
    expect(r.state).toBe('empty');
  });
  it('representative rule still never surfaces as a deadline (guardrail preserved)', async () => {
    const r = await loadDeadlineDetail(db, actor, 'REP-IN-FER-RESPONSE');
    expect(r.state).toBe('empty');
    expect(r.state).not.toBe('ready');
  });
});
