import type { Meta, StoryObj } from '@storybook/react';
import { RuleAuthoringScreen } from './RuleAuthoringScreen';
import { ruleAuthoringScenarios } from '../../fixtures/scenarios/ops';

const meta: Meta<typeof RuleAuthoringScreen> = { title: 'Screens/SC-O03 Rule Authoring', component: RuleAuthoringScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof RuleAuthoringScreen>;
export const Ready: Story = { args: { loaded: ruleAuthoringScenarios['ready'] } };
export const GateBlocked: Story = { args: { loaded: ruleAuthoringScenarios['gate-blocked'] } };
export const Loading: Story = { args: { loaded: ruleAuthoringScenarios['loading'] } };
