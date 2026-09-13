import type { Meta, StoryObj } from '@storybook/react';
import { AssessmentVerdictScreen } from './AssessmentVerdictScreen';
import { assessmentScenarios } from '../../fixtures/scenarios/assessment';

const meta: Meta<typeof AssessmentVerdictScreen> = {
  title: 'Screens/SC-C08 Assessment Verdict',
  component: AssessmentVerdictScreen,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof AssessmentVerdictScreen>;

export const Analysing: Story = { args: { loaded: assessmentScenarios['analysing'] } };
export const InReview: Story = { args: { loaded: assessmentScenarios['in-review'] } };
export const LooksProtectable: Story = { args: { loaded: assessmentScenarios['released-favourable'] } };
export const ProtectableWithChanges: Story = { args: { loaded: assessmentScenarios['released-qualified'] } };
export const UnlikelyToBeProtectable: Story = { args: { loaded: assessmentScenarios['released-unfavourable'] } };
export const NotEnoughToAssess: Story = { args: { loaded: assessmentScenarios['inconclusive'] } };
export const ProvenanceUnresolved: Story = { args: { loaded: assessmentScenarios['provenance-unresolved'] } };
export const Loading: Story = { args: { loaded: assessmentScenarios['loading'] } };
export const Empty: Story = { args: { loaded: assessmentScenarios['empty'] } };
export const ErrorState: Story = { args: { loaded: assessmentScenarios['error'] } };
export const PermissionDenied: Story = { args: { loaded: assessmentScenarios['permission-denied'] } };
export const CrossTenant404: Story = { args: { loaded: assessmentScenarios['not-found'] } };
