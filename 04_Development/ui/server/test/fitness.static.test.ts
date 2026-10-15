import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import { ZONE1_REDACT_PATHS, loggerOptions } from '../logging/logger';

/**
 * TS-2 architecture fitness — static (no DB). These assert structural invariants of the B1b
 * platform foundation so they can never silently regress, and they run even when no database is
 * reachable.
 */

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (name === 'node_modules' || name === 'test') continue;
      walk(p, acc);
    } else if (/\.(ts|cjs|js)$/.test(name)) {
      acc.push(p);
    }
  }
  return acc;
}

const SERVER_DIR = join(process.cwd(), 'server');
const serverFiles = walk(SERVER_DIR);

describe('TS-2 fitness (static) — Zone-1 must never reach logs (NFR-S06)', () => {
  it('the logger redaction config covers Zone-1 confidential paths', () => {
    expect(loggerOptions.redact.censor).toBe('[zone1-redacted]');
    expect(loggerOptions.redact.paths.length).toBeGreaterThan(0);
    for (const p of ['disclosure', 'specification']) {
      expect(ZONE1_REDACT_PATHS).toContain(p);
    }
  });
});

describe('TS-2 fitness (static) — no product computation leaks into the platform foundation', () => {
  it('server source does not embed raw money/date/percent product literals in output strings', () => {
    // B1b implements NO product logic: no fees, costs, deadlines or computed dates belong in server/.
    // Guard against a stray hard-coded product value (raw-value discipline, mirroring the client Floor).
    const offenders: string[] = [];
    const money = /(?<![\w.])(?:USD|EUR|GBP|\$|€|£)\s?\d/;
    const percent = /\b\d{1,3}\s?%(?!\})/;
    for (const f of serverFiles) {
      const text = readFileSync(f, 'utf8');
      const lines = text.split('\n');
      lines.forEach((line, i) => {
        const code = line.replace(/\/\/.*$/, ''); // ignore line comments
        if (money.test(code) || percent.test(code)) {
          offenders.push(`${f.replace(process.cwd() + '/', '')}:${i + 1}: ${line.trim()}`);
        }
      });
    }
    expect(offenders, `unexpected product-value literals in server/:\n${offenders.join('\n')}`).toEqual([]);
  });

  it('no product-date computation (Date arithmetic) in the platform FOUNDATION (Rules Engine exempt)', () => {
    // The only timestamp B1b produces is an infra "at" instant (new Date().toISOString()); there must
    // be no computed product dates (e.g. adding days/months to a date) in the platform FOUNDATION.
    //
    // SCOPE NARROWING (B5 engine-mechanism slice): `server/modules/rules/` is the governed Deadline &
    // Rules Engine. ADR-07 establishes it as the ONLY producer of product dates (AP-02 rules-as-data),
    // and B5 authorizes it. The invariant is narrowed to its intended foundation boundary — it is NOT
    // weakened or disabled: product-date computation remains prohibited everywhere else under server/,
    // and the detection patterns are unchanged. Only this one governed engine directory is exempt.
    // `sep`, not '/': on Windows join() yields backslash paths, so a hard-coded '/' made this
    // exemption never match and the governed Rules Engine was reported as an offender.
    const RULES_DIR = join(SERVER_DIR, 'modules', 'rules') + sep;
    const offenders: string[] = [];
    const dateMath = /setDate|setMonth|setFullYear|addDays|addMonths|\+\s*\d+\s*\*\s*24\s*\*\s*60/;
    for (const f of serverFiles) {
      if (f.startsWith(RULES_DIR)) continue; // governed Rules Engine (ADR-07) — exempt per the note above
      const text = readFileSync(f, 'utf8');
      text.split('\n').forEach((line, i) => {
        const code = line.replace(/\/\/.*$/, '');
        if (dateMath.test(code)) offenders.push(`${f.replace(process.cwd() + '/', '')}:${i + 1}: ${line.trim()}`);
      });
    }
    expect(offenders, `unexpected date computation in server/ foundation:\n${offenders.join('\n')}`).toEqual([]);
  });
});

describe('TS-2 fitness (static) — migration declares zone separation at the DB level', () => {
  it('the foundation migration grants Zone-3 NO access to Zone-1 (identity)', () => {
    const mig = serverFiles.find((f) => f.includes('b1b-foundation'));
    expect(mig, 'foundation migration present').toBeTruthy();
    // Strip SQL line comments first — assert on actual DDL, not prose (a comment mentioning
    // "grant"/"identity" must not be read as a GRANT statement).
    const sql = readFileSync(mig as string, 'utf8')
      .split('\n')
      .map((l) => l.replace(/--.*$/, ''))
      .join('\n');
    // zone3 must never be granted on identity (Zone-1). Assert no GRANT ... identity ... TO alda_zone3.
    const zone3IdentityGrant = /GRANT[^;]*\bidentity\b[^;]*TO[^;]*alda_zone3/i;
    expect(zone3IdentityGrant.test(sql)).toBe(false);
    // and zone3 IS granted on outcome (positive control that the file really defines its grants).
    expect(/GRANT[^;]*\boutcome\b[^;]*TO[^;]*alda_zone3/i.test(sql)).toBe(true);
  });
});
