import type { Meta, StoryObj } from '@storybook/react';
import { DisclosureVersionsScreen } from './DisclosureVersionsScreen';
import { disclosureVersionsScenarios } from '../../fixtures/scenarios/vault';

const meta: Meta<typeof DisclosureVersionsScreen> = {
  title: 'Screens/SC-C05 Disclosure Versions',
  component: DisclosureVersionsScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DisclosureVersionsScreen>;

export const Ready: Story = { args: { loaded: disclosureVersionsScenarios['ready'] } };
export const Empty: Story = { args: { loaded: disclosureVersionsScenarios['empty'] } };
export const Loading: Story = { args: { loaded: disclosureVersionsScenarios['loading'] } };
export const CrossTenant404: Story = { args: { loaded: disclosureVersionsScenarios['not-found'] } };
