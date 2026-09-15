import type { Meta, StoryObj } from '@storybook/react';
import { MattersIndexScreen } from './MattersIndexScreen';
import { mattersScenarios } from '../../fixtures/scenarios/matters';

const meta: Meta<typeof MattersIndexScreen> = {
  title: 'Screens/SC-C14 Matters Index',
  component: MattersIndexScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof MattersIndexScreen>;

export const Ready: Story = { args: { loaded: mattersScenarios['ready'] } };
export const MemberNoCosts: Story = { args: { loaded: mattersScenarios['member-no-costs'] } };
export const Empty: Story = { args: { loaded: mattersScenarios['empty'] } };
export const Loading: Story = { args: { loaded: mattersScenarios['loading'] } };
export const ErrorState: Story = { args: { loaded: mattersScenarios['error'] } };
