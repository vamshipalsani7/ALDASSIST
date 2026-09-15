import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from './PriceDisplay';
import { priceDisplayScenarios } from '../fixtures/scenarios/matters';

const meta: Meta<typeof PriceDisplay> = {
  title: 'Trust/PriceDisplay',
  component: PriceDisplay,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof PriceDisplay>;

// O-2026-001 is OPEN: the default renders the probable direction (component) + an open-decision note.
export const OpenDecision: Story = { args: { price: priceDisplayScenarios['open-decision'] } };
export const ComponentMode: Story = { args: { price: priceDisplayScenarios['component'] } };
export const BundledMode: Story = { args: { price: priceDisplayScenarios['bundled'] } };
