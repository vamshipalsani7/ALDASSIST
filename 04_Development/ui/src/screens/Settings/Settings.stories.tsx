import type { Meta, StoryObj } from '@storybook/react';
import { SettingsScreen } from './SettingsScreen';
import { settingsScenarios } from '../../fixtures/scenarios/home';

const meta: Meta<typeof SettingsScreen> = {
  title: 'Screens/SC-C20 Settings',
  component: SettingsScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof SettingsScreen>;

export const Owner: Story = { args: { loaded: settingsScenarios['owner'] } };
export const AdminLocked: Story = { args: { loaded: settingsScenarios['admin-locked'] } };
export const MemberLocked: Story = { args: { loaded: settingsScenarios['member-locked'] } };
export const Loading: Story = { args: { loaded: settingsScenarios['loading'] } };
