import type { Meta, StoryObj } from '@storybook/react';
import { MatterImportScreen } from './MatterImportScreen';
import { matterImportScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof MatterImportScreen> = { title: 'Screens/SC-A04 Matter Import', component: MatterImportScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof MatterImportScreen>;
export const Ready: Story = { args: { loaded: matterImportScenarios['ready'] } };
export const Loading: Story = { args: { loaded: matterImportScenarios['loading'] } };
