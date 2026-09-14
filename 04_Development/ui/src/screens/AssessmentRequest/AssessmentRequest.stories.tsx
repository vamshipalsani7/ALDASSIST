import type { Meta, StoryObj } from '@storybook/react';
import { AssessmentRequestScreen } from './AssessmentRequestScreen';
import { assessmentRequestScenarios } from '../../fixtures/scenarios/vault';

const meta: Meta<typeof AssessmentRequestScreen> = {
  title: 'Screens/SC-C06 Assessment Request',
  component: AssessmentRequestScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof AssessmentRequestScreen>;

export const Ready: Story = { args: { loaded: assessmentRequestScenarios['ready'] } };
export const BlockedDisclosureIncomplete: Story = { args: { loaded: assessmentRequestScenarios['blocked-incomplete'] } };
export const Loading: Story = { args: { loaded: assessmentRequestScenarios['loading'] } };
export const CrossTenant404: Story = { args: { loaded: assessmentRequestScenarios['not-found'] } };
