import type { Meta, StoryObj } from '@storybook/react';
import { ReviewsQueueScreen } from './ReviewsQueueScreen';
import { reviewsQueueScenarios } from '../../fixtures/scenarios/agent';

const meta: Meta<typeof ReviewsQueueScreen> = { title: 'Screens/SC-A06 Reviews Queue', component: ReviewsQueueScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof ReviewsQueueScreen>;
export const Ready: Story = { args: { loaded: reviewsQueueScenarios['ready'] } };
export const Empty: Story = { args: { loaded: reviewsQueueScenarios['empty'] } };
export const Loading: Story = { args: { loaded: reviewsQueueScenarios['loading'] } };
