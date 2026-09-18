import type { Meta, StoryObj } from '@storybook/react';
import { AgentOnboardingScreen } from './AgentOnboardingScreen';
import { agentOnboardingScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof AgentOnboardingScreen> = { title: 'Screens/SC-A00 Agent Onboarding', component: AgentOnboardingScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentOnboardingScreen>;
export const Pending: Story = { args: { loaded: agentOnboardingScenarios['pending'] } };
export const Failed: Story = { args: { loaded: agentOnboardingScenarios['failed'] } };
export const Loading: Story = { args: { loaded: agentOnboardingScenarios['loading'] } };
