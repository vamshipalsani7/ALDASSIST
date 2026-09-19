import type { Meta, StoryObj } from '@storybook/react';
import { AgentDirectoryScreen } from './AgentDirectoryScreen';
import { agentDirectoryScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof AgentDirectoryScreen> = { title: 'Screens/SC-P13 Agent Directory', component: AgentDirectoryScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentDirectoryScreen>;
export const S_Ready: Story = { args: { loaded: agentDirectoryScenarios['ready'] } };
export const S_Loading: Story = { args: { loaded: agentDirectoryScenarios['loading'] } };
