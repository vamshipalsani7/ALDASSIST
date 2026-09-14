import type { Meta, StoryObj } from '@storybook/react';
import { InventionsIndexScreen } from './InventionsIndexScreen';
import { inventionsIndexScenarios } from '../../fixtures/scenarios/vault';

const meta: Meta<typeof InventionsIndexScreen> = {
  title: 'Screens/SC-C02 Inventions Index',
  component: InventionsIndexScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof InventionsIndexScreen>;

export const Ready: Story = { args: { loaded: inventionsIndexScenarios['ready'] } };
export const EmptyFirstRun: Story = { args: { loaded: inventionsIndexScenarios['empty'] } };
export const Loading: Story = { args: { loaded: inventionsIndexScenarios['loading'] } };
export const ErrorState: Story = { args: { loaded: inventionsIndexScenarios['error'] } };
