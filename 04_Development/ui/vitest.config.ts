import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Test config only — does not affect `vite build` (Vite ignores this file).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@contract': fileURLToPath(new URL('./src/contract', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@shell': fileURLToPath(new URL('./src/shell', import.meta.url)),
      '@fixtures': fileURLToPath(new URL('./src/fixtures', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
