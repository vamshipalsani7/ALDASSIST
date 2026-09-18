import type { Meta, StoryObj } from '@storybook/react';
import { AgentVerificationScreen } from './AgentVerificationScreen';
import { agentVerificationScenarios } from '../../fixtures/scenarios/ops';

const meta: Meta<typeof AgentVerificationScreen> = { title: 'Screens/SC-O02 Agent Verification', component: AgentVerificationScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentVerificationScreen>;
export const Ready: Story = { args: { loaded: agentVerificationScenarios['ready'] } };
export const Loading: Story = { args: { loaded: agentVerificationScenarios['loading'] } };
