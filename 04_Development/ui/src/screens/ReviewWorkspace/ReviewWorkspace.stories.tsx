import type { Meta, StoryObj } from '@storybook/react';
import { ReviewWorkspaceScreen } from './ReviewWorkspaceScreen';
import { reviewWorkspaceScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof ReviewWorkspaceScreen> = { title: 'Screens/SC-A07 Review Workspace', component: ReviewWorkspaceScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof ReviewWorkspaceScreen>;
export const Ready: Story = { args: { loaded: reviewWorkspaceScenarios['ready'] } };
export const NotFound: Story = { args: { loaded: reviewWorkspaceScenarios['not-found'] } };
export const Loading: Story = { args: { loaded: reviewWorkspaceScenarios['loading'] } };
