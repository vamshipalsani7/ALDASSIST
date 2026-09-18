import type { Meta, StoryObj } from '@storybook/react';
import { DocketHealthScreen } from './DocketHealthScreen';
import { docketHealthScenarios } from '../../fixtures/scenarios/ops';

const meta: Meta<typeof DocketHealthScreen> = { title: 'Screens/SC-O01 Docket Health', component: DocketHealthScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof DocketHealthScreen>;
export const Ready: Story = { args: { loaded: docketHealthScenarios['ready'] } };
export const Clear: Story = { args: { loaded: docketHealthScenarios['clear'] } };
export const Loading: Story = { args: { loaded: docketHealthScenarios['loading'] } };
export const ErrorState: Story = { args: { loaded: docketHealthScenarios['error'] } };
