import type { Meta, StoryObj } from '@storybook/react';
import { AgentPracticeScreen } from './AgentPracticeScreen';
import { practiceScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof AgentPracticeScreen> = { title: 'Screens/SC-A09–A12 Practice', component: AgentPracticeScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AgentPracticeScreen>;
export const Ready: Story = { args: { loaded: practiceScenarios['ready'] } };
export const BelowFloor: Story = { args: { loaded: practiceScenarios['below-floor'] } };
export const Loading: Story = { args: { loaded: practiceScenarios['loading'] } };
