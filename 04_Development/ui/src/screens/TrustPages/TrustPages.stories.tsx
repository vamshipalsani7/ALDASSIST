import type { Meta, StoryObj } from '@storybook/react';
import { TrustPagesScreen } from './TrustPagesScreen';
import { trustScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof TrustPagesScreen> = { title: 'Screens/SC-P14 Trust Pages', component: TrustPagesScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof TrustPagesScreen>;
export const S_Ai: Story = { args: { loaded: trustScenarios['ai'] } };
export const S_Limitations: Story = { args: { loaded: trustScenarios['limitations'] } };
export const S_Loading: Story = { args: { loaded: trustScenarios['loading'] } };
