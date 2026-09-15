import type { Meta, StoryObj } from '@storybook/react';
import { QuoteEngagementScreen } from './QuoteEngagementScreen';
import { quoteScenarios } from '../../fixtures/scenarios/matters';

const meta: Meta<typeof QuoteEngagementScreen> = {
  title: 'Screens/SC-C19 Quote & Engagement',
  component: QuoteEngagementScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof QuoteEngagementScreen>;

export const Ready: Story = { args: { loaded: quoteScenarios['ready'] } };
export const NonOwnerLocked: Story = { args: { loaded: quoteScenarios['permission-denied'] } };
export const EngagementFailed: Story = { args: { loaded: quoteScenarios['error'] } };
export const Loading: Story = { args: { loaded: quoteScenarios['loading'] } };
export const CrossTenant404: Story = { args: { loaded: quoteScenarios['not-found'] } };
