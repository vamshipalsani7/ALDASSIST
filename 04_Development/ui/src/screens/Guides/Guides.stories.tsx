import type { Meta, StoryObj } from '@storybook/react';
import { GuidesScreen } from './GuidesScreen';
import { guidesScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof GuidesScreen> = { title: 'Screens/SC-P09 Guides', component: GuidesScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof GuidesScreen>;
export const S_Index: Story = { args: { loaded: guidesScenarios['index'] } };
export const S_Article: Story = { args: { loaded: guidesScenarios['article'] } };
export const S_Loading: Story = { args: { loaded: guidesScenarios['loading'] } };
