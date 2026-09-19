import type { Meta, StoryObj } from '@storybook/react';
import { FindYourPathScreen } from './FindYourPathScreen';
import { findYourPathScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof FindYourPathScreen> = { title: 'Screens/SC-P08 Find Your Path', component: FindYourPathScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof FindYourPathScreen>;
export const S_Ready: Story = { args: { loaded: findYourPathScenarios['ready'] } };
export const S_Loading: Story = { args: { loaded: findYourPathScenarios['loading'] } };
