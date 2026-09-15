import type { Meta, StoryObj } from '@storybook/react';
import { MatterWorkspaceScreen } from './MatterWorkspaceScreen';
import { matterWorkspaceScenarios } from '../../fixtures/scenarios/matters';

const meta: Meta<typeof MatterWorkspaceScreen> = {
  title: 'Screens/SC-C15 Matter Workspace',
  component: MatterWorkspaceScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof MatterWorkspaceScreen>;

export const Ready: Story = { args: { loaded: matterWorkspaceScenarios['ready'] } };
export const Loading: Story = { args: { loaded: matterWorkspaceScenarios['loading'] } };
export const PermissionDenied: Story = { args: { loaded: matterWorkspaceScenarios['permission-denied'] } };
export const CrossTenant404: Story = { args: { loaded: matterWorkspaceScenarios['not-found'] } };
