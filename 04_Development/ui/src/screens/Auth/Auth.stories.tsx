import type { Meta, StoryObj } from '@storybook/react';
import { AuthScreen } from './AuthScreen';
import { authScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof AuthScreen> = { title: 'Screens/SC-P16 Auth', component: AuthScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof AuthScreen>;
export const S_Signup: Story = { args: { loaded: authScenarios['sign-up'] } };
export const S_Loading: Story = { args: { loaded: authScenarios['loading'] } };
