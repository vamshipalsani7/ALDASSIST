import type { Meta, StoryObj } from '@storybook/react';
import { AgentTodayScreen } from './AgentTodayScreen';
import { agentTodayScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof AgentTodayScreen> = { title: 'Screens/SC-A01 Agent Today', component: AgentTodayScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentTodayScreen>;
export const Ready: Story = { args: { loaded: agentTodayScenarios['ready'] } };
export const Stale: Story = { args: { loaded: agentTodayScenarios['stale'] } };
export const Empty: Story = { args: { loaded: agentTodayScenarios['empty'] } };
export const Loading: Story = { args: { loaded: agentTodayScenarios['loading'] } };
