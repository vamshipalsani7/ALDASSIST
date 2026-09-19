import type { Meta, StoryObj } from '@storybook/react';
import { AgentPublicProfileScreen } from './AgentPublicProfileScreen';
import { agentProfileScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof AgentPublicProfileScreen> = { title: 'Screens/SC-P13 Agent Profile', component: AgentPublicProfileScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentPublicProfileScreen>;
export const S_Ready: Story = { args: { loaded: agentProfileScenarios['ready'] } };
export const S_Belowfloor: Story = { args: { loaded: agentProfileScenarios['below-floor'] } };
export const S_Loading: Story = { args: { loaded: agentProfileScenarios['loading'] } };
