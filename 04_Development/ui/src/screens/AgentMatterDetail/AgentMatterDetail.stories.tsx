import type { Meta, StoryObj } from '@storybook/react';
import { AgentMatterDetailScreen } from './AgentMatterDetailScreen';
import { agentMatterDetailScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof AgentMatterDetailScreen> = { title: 'Screens/SC-A05 Agent Matter Detail', component: AgentMatterDetailScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentMatterDetailScreen>;
export const Ready: Story = { args: { loaded: agentMatterDetailScenarios['ready'] } };
export const NotFound: Story = { args: { loaded: agentMatterDetailScenarios['not-found'] } };
export const Loading: Story = { args: { loaded: agentMatterDetailScenarios['loading'] } };
