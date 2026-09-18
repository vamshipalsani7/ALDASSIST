import type { Meta, StoryObj } from '@storybook/react';
import { AgentNotificationsScreen } from './AgentNotificationsScreen';
import { agentNotificationsScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof AgentNotificationsScreen> = { title: 'Screens/SC-A14 Agent Notifications', component: AgentNotificationsScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentNotificationsScreen>;
export const Ready: Story = { args: { loaded: agentNotificationsScenarios['ready'] } };
export const SingleRole: Story = { args: { loaded: agentNotificationsScenarios['single-role'] } };
export const Loading: Story = { args: { loaded: agentNotificationsScenarios['loading'] } };
