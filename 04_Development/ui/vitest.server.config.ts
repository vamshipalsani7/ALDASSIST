import { defineConfig } from 'vitest/config';

// Server tests run in a Node environment (no jsdom). Separate from the client vitest.config.ts so the
// existing client suite is unchanged. DB-backed tests require a reachable PostgreSQL (env-configured).
export default defineConfig({
  test: {
    environment: 'node',
    include: ['server/**/*.test.ts'],
    hookTimeout: 30000,
    testTimeout: 30000,
    // Server tests share ONE PostgreSQL database, and several assert on before/after Event-Log counts.
    // From B3 on, more than one suite appends access events, so files must run sequentially for those
    // deltas to be deterministic. (This serialises files only; it does not change any Floor gate.)
    fileParallelism: false,
  },
});
