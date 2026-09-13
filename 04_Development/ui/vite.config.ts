import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// ALDASSIST Phase 8 UI — B1. No hosting/deploy config here (out of scope, D-2026-022).
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
});
