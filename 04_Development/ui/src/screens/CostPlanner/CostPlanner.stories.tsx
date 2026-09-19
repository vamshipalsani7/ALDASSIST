import type { Meta, StoryObj } from '@storybook/react';
import { CostPlannerScreen } from './CostPlannerScreen';
import { costPlannerScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof CostPlannerScreen> = { title: 'Screens/SC-P07 Cost Planner', component: CostPlannerScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof CostPlannerScreen>;
export const S_Ready: Story = { args: { loaded: costPlannerScenarios['ready'] } };
export const S_Loading: Story = { args: { loaded: costPlannerScenarios['loading'] } };
