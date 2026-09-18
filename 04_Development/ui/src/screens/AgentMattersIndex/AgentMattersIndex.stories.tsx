import type { Meta, StoryObj } from '@storybook/react';
import { AgentMattersIndexScreen } from './AgentMattersIndexScreen';
import { agentMattersScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof AgentMattersIndexScreen> = { title: 'Screens/SC-A03 Agent Matters', component: AgentMattersIndexScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentMattersIndexScreen>;
export const Ready: Story = { args: { loaded: agentMattersScenarios['ready'] } };
export const Empty: Story = { args: { loaded: agentMattersScenarios['empty'] } };
export const Loading: Story = { args: { loaded: agentMattersScenarios['loading'] } };
