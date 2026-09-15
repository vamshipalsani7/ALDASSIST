import type { Meta, StoryObj } from '@storybook/react';
import { CostsScreen } from './CostsScreen';
import { costsScenarios } from '../../fixtures/scenarios/matters';

const meta: Meta<typeof CostsScreen> = {
  title: 'Screens/SC-C16 Costs',
  component: CostsScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof CostsScreen>;

export const Ready: Story = { args: { loaded: costsScenarios['ready'] } };
export const PermissionDenied: Story = { args: { loaded: costsScenarios['permission-denied'] } };
export const Loading: Story = { args: { loaded: costsScenarios['loading'] } };
export const ErrorState: Story = { args: { loaded: costsScenarios['error'] } };
