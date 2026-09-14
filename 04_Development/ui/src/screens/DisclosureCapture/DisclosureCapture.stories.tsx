import type { Meta, StoryObj } from '@storybook/react';
import { DisclosureCaptureScreen } from './DisclosureCaptureScreen';
import { disclosureCaptureScenarios } from '../../fixtures/scenarios/vault';

const meta: Meta<typeof DisclosureCaptureScreen> = {
  title: 'Screens/SC-C03 Disclosure Capture',
  component: DisclosureCaptureScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DisclosureCaptureScreen>;

export const Ready: Story = { args: { loaded: disclosureCaptureScenarios['ready'] } };
export const LockedByAnotherEditor: Story = { args: { loaded: disclosureCaptureScenarios['locked-by-other'] } };
export const Loading: Story = { args: { loaded: disclosureCaptureScenarios['loading'] } };
export const CrossTenant404: Story = { args: { loaded: disclosureCaptureScenarios['not-found'] } };
