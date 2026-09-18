import type { Meta, StoryObj } from '@storybook/react';
import { AgentDocketScreen } from './AgentDocketScreen';
import { agentDocketScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof AgentDocketScreen> = { title: 'Screens/SC-A02 Agent Docket', component: AgentDocketScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentDocketScreen>;
export const Ready: Story = { args: { loaded: agentDocketScenarios['ready'] } };
export const Empty: Story = { args: { loaded: agentDocketScenarios['empty'] } };
export const Loading: Story = { args: { loaded: agentDocketScenarios['loading'] } };
