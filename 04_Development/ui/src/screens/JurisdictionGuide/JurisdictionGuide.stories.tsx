import type { Meta, StoryObj } from '@storybook/react';
import { JurisdictionGuideScreen } from './JurisdictionGuideScreen';
import { jurisdictionScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof JurisdictionGuideScreen> = { title: 'Screens/SC-P11 Jurisdiction Guide', component: JurisdictionGuideScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof JurisdictionGuideScreen>;
export const S_India: Story = { args: { loaded: jurisdictionScenarios['india'] } };
export const S_Loading: Story = { args: { loaded: jurisdictionScenarios['loading'] } };
