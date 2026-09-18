import type { Meta, StoryObj } from '@storybook/react';
import { QualityConsoleScreen } from './QualityConsoleScreen';
import { qualityScenarios } from '../../fixtures/scenarios/ops';

const meta: Meta<typeof QualityConsoleScreen> = { title: 'Screens/SC-O04 Quality & Review', component: QualityConsoleScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof QualityConsoleScreen>;
export const Ready: Story = { args: { loaded: qualityScenarios['ready'] } };
export const Loading: Story = { args: { loaded: qualityScenarios['loading'] } };
