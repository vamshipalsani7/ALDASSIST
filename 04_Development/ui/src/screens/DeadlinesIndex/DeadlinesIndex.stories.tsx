import type { Meta, StoryObj } from '@storybook/react';
import { DeadlinesIndexScreen } from './DeadlinesIndexScreen';
import { deadlinesScenarios } from '../../fixtures/scenarios/portfolio';

const meta: Meta<typeof DeadlinesIndexScreen> = {
  title: 'Screens/SC-C12 Deadlines Index',
  component: DeadlinesIndexScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DeadlinesIndexScreen>;

export const Ready: Story = { args: { loaded: deadlinesScenarios['ready'] } };
export const Empty: Story = { args: { loaded: deadlinesScenarios['empty'] } };
export const Loading: Story = { args: { loaded: deadlinesScenarios['loading'] } };
export const ErrorState: Story = { args: { loaded: deadlinesScenarios['error'] } };
