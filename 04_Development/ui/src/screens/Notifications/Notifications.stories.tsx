import type { Meta, StoryObj } from '@storybook/react';
import { NotificationsScreen } from './NotificationsScreen';
import { notificationsScenarios } from '../../fixtures/scenarios/home';

const meta: Meta<typeof NotificationsScreen> = {
  title: 'Screens/SC-C21 Notifications',
  component: NotificationsScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof NotificationsScreen>;

export const Ready: Story = { args: { loaded: notificationsScenarios['ready'] } };
export const Empty: Story = { args: { loaded: notificationsScenarios['empty'] } };
export const Loading: Story = { args: { loaded: notificationsScenarios['loading'] } };
