import type { Meta, StoryObj } from '@storybook/react';
import { PublicHomeScreen } from './PublicHomeScreen';
import { publicHomeScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof PublicHomeScreen> = { title: 'Screens/SC-P01 Public Home', component: PublicHomeScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof PublicHomeScreen>;
export const S_Ready: Story = { args: { loaded: publicHomeScenarios['ready'] } };
export const S_Loading: Story = { args: { loaded: publicHomeScenarios['loading'] } };
