import type { Meta, StoryObj } from '@storybook/react';
import { DecisionRecordScreen } from './DecisionRecordScreen';
import { decisionScenarios } from '../../fixtures/scenarios/vault';

const meta: Meta<typeof DecisionRecordScreen> = {
  title: 'Screens/SC-C09 Record Decision',
  component: DecisionRecordScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DecisionRecordScreen>;

export const Ready: Story = { args: { loaded: decisionScenarios['ready'] } };
export const Loading: Story = { args: { loaded: decisionScenarios['loading'] } };
export const PermissionDenied: Story = { args: { loaded: decisionScenarios['permission-denied'] } };
export const CrossTenant404: Story = { args: { loaded: decisionScenarios['not-found'] } };
