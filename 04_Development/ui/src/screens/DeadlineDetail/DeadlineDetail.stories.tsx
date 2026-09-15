import type { Meta, StoryObj } from '@storybook/react';
import { DeadlineDetailScreen } from './DeadlineDetailScreen';
import { deadlineDetailScenarios } from '../../fixtures/scenarios/portfolio';

const meta: Meta<typeof DeadlineDetailScreen> = {
  title: 'Screens/SC-C13 Deadline Detail (trace)',
  component: DeadlineDetailScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DeadlineDetailScreen>;

export const Ready: Story = { args: { loaded: deadlineDetailScenarios['ready'] } };
export const TraceUnavailable: Story = { args: { loaded: deadlineDetailScenarios['trace-unavailable'] } };
export const Loading: Story = { args: { loaded: deadlineDetailScenarios['loading'] } };
export const CrossTenant404: Story = { args: { loaded: deadlineDetailScenarios['not-found'] } };
