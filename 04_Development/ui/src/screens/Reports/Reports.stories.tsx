import type { Meta, StoryObj } from '@storybook/react';
import { ReportsScreen } from './ReportsScreen';
import { reportsScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof ReportsScreen> = { title: 'Screens/SC-P12 Reports', component: ReportsScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof ReportsScreen>;
export const S_Ready: Story = { args: { loaded: reportsScenarios['ready'] } };
export const S_Loading: Story = { args: { loaded: reportsScenarios['loading'] } };
