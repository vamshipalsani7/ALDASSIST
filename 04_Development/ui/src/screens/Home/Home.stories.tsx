import type { Meta, StoryObj } from '@storybook/react';
import { HomeScreen } from './HomeScreen';
import { homeScenarios } from '../../fixtures/scenarios/home';

const meta: Meta<typeof HomeScreen> = {
  title: 'Screens/SC-C01 Home',
  component: HomeScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof HomeScreen>;

export const Ready: Story = { args: { loaded: homeScenarios['ready'] } };
export const StaleRegion: Story = { args: { loaded: homeScenarios['stale-region'] } };
export const Empty: Story = { args: { loaded: homeScenarios['empty'] } };
export const Loading: Story = { args: { loaded: homeScenarios['loading'] } };
export const ErrorState: Story = { args: { loaded: homeScenarios['error'] } };
