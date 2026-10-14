/** ALDASSIST Phase 9 — B1b: backend barrel. */
export { buildApp } from './api/app';
export { getZonePools, destroyZonePools } from './db/pools';
export { appendEvent } from './modules/eventlog/eventlog';
export { readPing } from './modules/platform/ping';
export type { Database } from './db/types';
