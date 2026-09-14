import type { Meta, StoryObj } from '@storybook/react';
import { AssessmentsListScreen } from './AssessmentsListScreen';
import { assessmentsListScenarios } from '../../fixtures/scenarios/vault';

const meta: Meta<typeof AssessmentsListScreen> = {
  title: 'Screens/SC-C07 Assessments List',
  component: AssessmentsListScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof AssessmentsListScreen>;

export const Ready: Story = { args: { loaded: assessmentsListScenarios['ready'] } };
export const Empty: Story = { args: { loaded: assessmentsListScenarios['empty'] } };
export const Loading: Story = { args: { loaded: assessmentsListScenarios['loading'] } };
export const CrossTenant404: Story = { args: { loaded: assessmentsListScenarios['not-found'] } };
