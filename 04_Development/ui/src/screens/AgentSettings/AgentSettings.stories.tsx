import type { Meta, StoryObj } from '@storybook/react';
import { AgentSettingsScreen } from './AgentSettingsScreen';
import { agentSettingsScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof AgentSettingsScreen> = { title: 'Screens/SC-A13 Agent Settings', component: AgentSettingsScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentSettingsScreen>;
export const Ready: Story = { args: { loaded: agentSettingsScenarios['ready'] } };
export const Loading: Story = { args: { loaded: agentSettingsScenarios['loading'] } };
