import type { Meta, StoryObj } from '@storybook/react';
import { InventionDetailScreen } from './InventionDetailScreen';
import { inventionDetailScenarios } from '../../fixtures/scenarios/vault';

const meta: Meta<typeof InventionDetailScreen> = {
  title: 'Screens/SC-C04 Invention Detail',
  component: InventionDetailScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof InventionDetailScreen>;

export const Ready: Story = { args: { loaded: inventionDetailScenarios['ready'] } };
export const NotPursued: Story = { args: { loaded: inventionDetailScenarios['not-pursued'] } };
export const Loading: Story = { args: { loaded: inventionDetailScenarios['loading'] } };
export const PermissionDenied: Story = { args: { loaded: inventionDetailScenarios['permission-denied'] } };
export const CrossTenant404: Story = { args: { loaded: inventionDetailScenarios['not-found'] } };
