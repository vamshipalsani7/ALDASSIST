import type { Meta, StoryObj } from '@storybook/react';
import { BusinessDashboardScreen } from './BusinessDashboardScreen';
import { businessScenarios } from '../../fixtures/scenarios/ops';

const meta: Meta<typeof BusinessDashboardScreen> = { title: 'Screens/SC-O05 Business Metrics', component: BusinessDashboardScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof BusinessDashboardScreen>;
export const Ready: Story = { args: { loaded: businessScenarios['ready'] } };
export const Loading: Story = { args: { loaded: businessScenarios['loading'] } };
