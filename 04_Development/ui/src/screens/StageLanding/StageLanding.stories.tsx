import type { Meta, StoryObj } from '@storybook/react';
import { StageLandingScreen } from './StageLandingScreen';
import { stageLandingScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof StageLandingScreen> = { title: 'Screens/SC-P04 Stage Landing', component: StageLandingScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof StageLandingScreen>;
export const S_Ready: Story = { args: { loaded: stageLandingScenarios['ready'] } };
export const S_Loading: Story = { args: { loaded: stageLandingScenarios['loading'] } };
