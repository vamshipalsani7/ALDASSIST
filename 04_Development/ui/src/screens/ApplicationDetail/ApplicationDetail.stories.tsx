import type { Meta, StoryObj } from '@storybook/react';
import { ApplicationDetailScreen } from './ApplicationDetailScreen';
import { applicationDetailScenarios } from '../../fixtures/scenarios/portfolio';

const meta: Meta<typeof ApplicationDetailScreen> = {
  title: 'Screens/SC-C11 Application Detail',
  component: ApplicationDetailScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof ApplicationDetailScreen>;

export const Active: Story = { args: { loaded: applicationDetailScenarios['active'] } };
export const SilenceView: Story = { args: { loaded: applicationDetailScenarios['quiet-silence'] } };
export const RespondingStatusOnly: Story = { args: { loaded: applicationDetailScenarios['responding-status-only'] } };
export const ClosedWithReason: Story = { args: { loaded: applicationDetailScenarios['closed-with-reason'] } };
export const StaleLastKnown: Story = { args: { loaded: applicationDetailScenarios['stale-last-known'] } };
export const Loading: Story = { args: { loaded: applicationDetailScenarios['loading'] } };
export const PermissionDenied: Story = { args: { loaded: applicationDetailScenarios['permission-denied'] } };
export const CrossTenant404: Story = { args: { loaded: applicationDetailScenarios['not-found'] } };
