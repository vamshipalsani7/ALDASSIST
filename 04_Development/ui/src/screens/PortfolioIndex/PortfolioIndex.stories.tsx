import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioIndexScreen } from './PortfolioIndexScreen';
import { portfolioScenarios } from '../../fixtures/scenarios/portfolio';

const meta: Meta<typeof PortfolioIndexScreen> = {
  title: 'Screens/SC-C10 Portfolio Index',
  component: PortfolioIndexScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof PortfolioIndexScreen>;

export const Ready: Story = { args: { loaded: portfolioScenarios['ready'] } };
export const EmptyFirstRun: Story = { args: { loaded: portfolioScenarios['empty'] } };
export const Loading: Story = { args: { loaded: portfolioScenarios['loading'] } };
export const ErrorState: Story = { args: { loaded: portfolioScenarios['error'] } };
