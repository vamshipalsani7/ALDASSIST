import type { Meta, StoryObj } from '@storybook/react';
import { MatchingScreen } from './MatchingScreen';
import { matchingScenarios } from '../../fixtures/scenarios/matters';

const meta: Meta<typeof MatchingScreen> = {
  title: 'Screens/SC-C18 Agent Matching',
  component: MatchingScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof MatchingScreen>;

export const Ready: Story = { args: { loaded: matchingScenarios['ready'] } };
export const NoAgentNotifyMe: Story = { args: { loaded: matchingScenarios['empty'] } };
export const ConflictCheckHold: Story = { args: { loaded: matchingScenarios['error'] } };
export const Loading: Story = { args: { loaded: matchingScenarios['loading'] } };
