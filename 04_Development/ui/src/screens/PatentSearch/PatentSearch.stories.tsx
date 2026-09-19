import type { Meta, StoryObj } from '@storybook/react';
import { PatentSearchScreen } from './PatentSearchScreen';
import { patentSearchScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof PatentSearchScreen> = { title: 'Screens/SC-P02 Patent Search', component: PatentSearchScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof PatentSearchScreen>;
export const S_Ready: Story = { args: { loaded: patentSearchScenarios['ready'] } };
export const S_Stale: Story = { args: { loaded: patentSearchScenarios['stale'] } };
export const S_Empty: Story = { args: { loaded: patentSearchScenarios['empty'] } };
export const S_Loading: Story = { args: { loaded: patentSearchScenarios['loading'] } };
