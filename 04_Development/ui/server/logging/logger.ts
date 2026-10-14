/**
 * ALDASSIST Phase 9 — B1b: logging with Zone-1 redaction (NFR-S06 / P9-B0 TS-2).
 * No Zone-1 (confidential) content may reach logs/traces. The trivial B1b resource touches NO Zone-1
 * data; this redaction config is the standing guard for when confidential paths are added in later
 * batches, and is asserted by a fitness test.
 */
export const ZONE1_REDACT_PATHS: readonly string[] = [
  'req.body.disclosure',
  'req.body.specification',
  'disclosure',
  'specification',
  'inventionBody',
  'zone1',
  '*.disclosure',
  '*.specification',
];

export interface LoggerRedactConfig {
  paths: string[];
  censor: string;
}
export interface LoggerOptions {
  level: string;
  redact: LoggerRedactConfig;
}

export const loggerOptions: LoggerOptions = {
  level: process.env.LOG_LEVEL ?? 'info',
  redact: {
    paths: [...ZONE1_REDACT_PATHS],
    censor: '[zone1-redacted]',
  },
};
