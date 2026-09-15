import type { Meta, StoryObj } from '@storybook/react';
import { DocumentsScreen } from './DocumentsScreen';
import { documentsScenarios } from '../../fixtures/scenarios/home';

const meta: Meta<typeof DocumentsScreen> = {
  title: 'Screens/SC-C17 Documents',
  component: DocumentsScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DocumentsScreen>;

export const Ready: Story = { args: { loaded: documentsScenarios['ready'] } };
export const Empty: Story = { args: { loaded: documentsScenarios['empty'] } };
export const Loading: Story = { args: { loaded: documentsScenarios['loading'] } };
export const ErrorState: Story = { args: { loaded: documentsScenarios['error'] } };
