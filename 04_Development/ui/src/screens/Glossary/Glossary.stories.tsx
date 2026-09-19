import type { Meta, StoryObj } from '@storybook/react';
import { GlossaryScreen } from './GlossaryScreen';
import { glossaryScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof GlossaryScreen> = { title: 'Screens/SC-P10 Glossary', component: GlossaryScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof GlossaryScreen>;
export const S_Index: Story = { args: { loaded: glossaryScenarios['index'] } };
export const S_Term: Story = { args: { loaded: glossaryScenarios['term'] } };
export const S_Loading: Story = { args: { loaded: glossaryScenarios['loading'] } };
