import type { Meta, StoryObj } from '@storybook/react';
import { PricingScreen } from './PricingScreen';
import { pricingScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof PricingScreen> = { title: 'Screens/SC-P06 Pricing', component: PricingScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof PricingScreen>;
export const S_Ready: Story = { args: { loaded: pricingScenarios['ready'] } };
export const S_Loading: Story = { args: { loaded: pricingScenarios['loading'] } };
