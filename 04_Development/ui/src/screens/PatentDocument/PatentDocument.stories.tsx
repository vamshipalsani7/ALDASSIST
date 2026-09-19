import type { Meta, StoryObj } from '@storybook/react';
import { PatentDocumentScreen } from './PatentDocumentScreen';
import { patentDocumentScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof PatentDocumentScreen> = { title: 'Screens/SC-P03 Patent Document', component: PatentDocumentScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof PatentDocumentScreen>;
export const S_Ready: Story = { args: { loaded: patentDocumentScenarios['ready'] } };
export const S_Sparse: Story = { args: { loaded: patentDocumentScenarios['sparse'] } };
export const S_Loading: Story = { args: { loaded: patentDocumentScenarios['loading'] } };
