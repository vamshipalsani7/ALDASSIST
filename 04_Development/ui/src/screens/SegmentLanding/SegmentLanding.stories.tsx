import type { Meta, StoryObj } from '@storybook/react';
import { SegmentLandingScreen } from './SegmentLandingScreen';
import { segmentLandingScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof SegmentLandingScreen> = { title: 'Screens/SC-P05 Segment Landing', component: SegmentLandingScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof SegmentLandingScreen>;
export const S_Universities: Story = { args: { loaded: segmentLandingScenarios['universities'] } };
export const S_Patentagents: Story = { args: { loaded: segmentLandingScenarios['patent-agents'] } };
export const S_Loading: Story = { args: { loaded: segmentLandingScenarios['loading'] } };
