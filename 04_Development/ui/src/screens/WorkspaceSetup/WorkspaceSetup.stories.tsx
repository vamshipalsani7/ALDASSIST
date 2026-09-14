import type { Meta, StoryObj } from '@storybook/react';
import { WorkspaceSetupScreen } from './WorkspaceSetupScreen';
import { workspaceSetupScenarios } from '../../fixtures/scenarios/vault';

const meta: Meta<typeof WorkspaceSetupScreen> = {
  title: 'Screens/SC-C00 Workspace Setup',
  component: WorkspaceSetupScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof WorkspaceSetupScreen>;

export const Create: Story = { args: { loaded: workspaceSetupScenarios['create'] } };
export const AcceptInvitation: Story = { args: { loaded: workspaceSetupScenarios['accept-invitation'] } };
export const Loading: Story = { args: { loaded: workspaceSetupScenarios['loading'] } };
export const InvitationInvalid: Story = { args: { loaded: workspaceSetupScenarios['error'] } };
