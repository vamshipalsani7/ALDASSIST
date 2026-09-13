import type { StorybookConfig } from '@storybook/react-vite';

// ALDASSIST Phase 8 — Storybook is the living Component Catalogue surface (Phase 7 Governance B.11).
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: { name: '@storybook/react-vite', options: {} },
  core: { disableTelemetry: true },
};
export default config;
