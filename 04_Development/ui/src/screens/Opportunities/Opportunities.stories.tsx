import type { Meta, StoryObj } from '@storybook/react';
import { OpportunitiesScreen } from './OpportunitiesScreen';
import { opportunitiesScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof OpportunitiesScreen> = { title: 'Screens/SC-A08 Opportunities', component: OpportunitiesScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof OpportunitiesScreen>;
export const Ready: Story = { args: { loaded: opportunitiesScenarios['ready'] } };
export const Empty: Story = { args: { loaded: opportunitiesScenarios['empty'] } };
export const Loading: Story = { args: { loaded: opportunitiesScenarios['loading'] } };
