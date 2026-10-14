/**
 * ALDASSIST Phase 9 — B5 engine-mechanism slice tests (deadline/rules engine only; representative data).
 *
 * Covers: deterministic computation + reproducibility; trace assembly; the TA-8 escape-hatch mechanism
 * (approver≠author enforcement + immutable Event-Log audit + trace marker, per D-2026-043); and the ONE
 * representative consumer (DeadlineDetail) honouring the guardrail — a representative rule NEVER surfaces
 * as a resolved authoritative deadline. No authoritative Indian data; no golden suites; no B5 completion.
 * Rules-as-data is read via the Zone-2 role (public-data boundary). Deterministic engine cases need no DB.
 */
import { describe, it, expect, afterAll } from 'vitest';
import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from '../db/types';
import type { Actor } from '../modules/identity/types';
import { computeDeadline } from '../modules/rules/engine';
import { applyEscapeHatch } from '../modules/rules/escapeHatch';
import { readRule } from '../modules/rules/ruleData';
import { loadDeadlineDetail } from '../modules/rules/service';
import type { DeadlineRule, TriggerEvent } from '../modules/rules/types';

const base = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? '5433'),
  database: process.env.DB_NAME ?? 'alda_b1b',
};
const { Pool } = pg;
// Zone-2 role: rules-as-data lives on the public-data boundary; eventlog append is granted to Zone 2.
const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool: new Pool({ ...base, user: process.env.DB_ZONE2_USER ?? 'alda_zone2', max: 3 }) }),
});
const actor: Actor = { id: '22222222-2222-2222-2222-222222222222', principalType: 'internal', mfaSatisfied: true };

afterAll(async () => {
  await db.destroy();
});

const REP_RULE: DeadlineRule = {
  ruleId: 'REP-TEST', ruleVersion: 'rep-0', jurisdiction: 'IN',
  triggerType: 'application.examination_report.issued', windowDays: 90,
  statutoryCitation: 'REPRESENTATIVE — not authoritative', calendarAdjustment: 'none (representative)',
  extensions: '', authoritative: false,
};
const TRIGGER: TriggerEvent = { type: 'application.examination_report.issued', occurredAt: '2026-01-01' };

describe('B5 engine — deterministic computation & reproducibility', () => {
  it('computes a deterministic date from (trigger, rule) — 2026-01-01 + 90d = 2026-04-01', () => {
    const r = computeDeadline(TRIGGER, REP_RULE);
    expect(r.date).toBe('2026-04-01');
  });
  it('is reproducible — identical inputs yield an identical date and trace', () => {
    const a = computeDeadline(TRIGGER, REP_RULE);
    const b = computeDeadline(TRIGGER, REP_RULE);
    expect(b).toEqual(a);
  });
  it('a different window yields a different date (no hidden state)', () => {
    const r = computeDeadline(TRIGGER, { ...REP_RULE, windowDays: 365 });
    expect(r.date).toBe('2027-01-01');
  });
  it('assembles the computation trace from the rule (the trace is the product)', () => {
    const r = computeDeadline(TRIGGER, REP_RULE);
    expect(r.trace.ruleId).toBe('REP-TEST');
    expect(r.trace.ruleVersion).toBe('rep-0');
    expect(r.trace.statutoryCitation).toContain('REPRESENTATIVE');
  });
});

describe('B5 TA-8 escape-hatch (D-2026-043) — approval discipline + immutable audit', () => {
  it('rejects self-approval (approver must be separate from the author)', async () => {
    await expect(
      applyEscapeHatch(db, { ruleId: 'REP-TEST', author: 'u-1', approver: 'u-1', exception: 'x', justification: 'y' }),
    ).rejects.toThrow(/separate from the rule author|self-approval/i);
  });
  it('records an approved use in the immutable Event Log and returns a trace marker', async () => {
    const before = await db
      .selectFrom('eventlog.event').select((eb) => eb.fn.countAll<string>().as('n'))
      .where('type', '=', 'rules.escape_hatch.used').executeTakeFirstOrThrow();
    const res = await applyEscapeHatch(db, {
      ruleId: 'REP-TEST', author: 'author-1', approver: 'ops-approver-2', exception: 'inexpressible leap rule', justification: 'genuine exception',
    });
    expect(res.auditEventId).toBeTruthy();
    expect(res.traceMarker).toBe(`escape-hatch:${res.auditEventId}`);
    const after = await db
      .selectFrom('eventlog.event').select((eb) => eb.fn.countAll<string>().as('n'))
      .where('type', '=', 'rules.escape_hatch.used').executeTakeFirstOrThrow();
    expect(Number(after.n)).toBe(Number(before.n) + 1);
  });
  it('carries the escape marker into the computation trace extensions (no frozen field added)', () => {
    const r = computeDeadline(TRIGGER, REP_RULE, { auditEventId: '42', traceMarker: 'escape-hatch:42' });
    expect(r.trace.extensions).toContain('escape-hatch:42');
  });
});

describe('B5 DeadlineDetail consumer — guardrail: representative data never surfaces as authoritative', () => {
  it('a representative (non-authoritative) rule yields an honest pending state, NOT a resolved deadline', async () => {
    const r = await loadDeadlineDetail(db, actor, 'REP-IN-FER-RESPONSE');
    expect(r.state).toBe('empty');
    // never a ready VM, so no representative date can surface
    expect(r.state).not.toBe('ready');
    if (r.state === 'empty') expect(r.empty.teaches).toMatch(/not yet published|authoritative rule data/i);
  });
  it('seeded representative rules are non-authoritative (authoritative = false)', async () => {
    const rule = await readRule(db, 'REP-IN-FER-RESPONSE');
    expect(rule).not.toBeNull();
    expect(rule?.authoritative).toBe(false);
  });
  it('an absent deadline/rule is not-found (CR-5 neutral)', async () => {
    const r = await loadDeadlineDetail(db, actor, 'does-not-exist');
    expect(r.state).toBe('not-found');
  });
});
