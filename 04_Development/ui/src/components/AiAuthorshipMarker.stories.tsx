import type { Meta, StoryObj } from '@storybook/react';
import { AiAuthorshipMarker } from './AiAuthorshipMarker';

const meta: Meta<typeof AiAuthorshipMarker> = {
  title: 'Trust/AiAuthorshipMarker',
  component: AiAuthorshipMarker,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof AiAuthorshipMarker>;

// Inline badge — an authorship cell in a list/table (AgentMatterDetail, Documents).
export const InlineDefault: Story = { args: { label: 'AI-generated' } };

// Bordered block wrapping AI-authored content (AssessmentVerdict, PatentDocument, ReviewWorkspace).
export const Block: Story = {
  args: {
    block: true,
    label: 'AI-generated',
    children: <p>Plain-language summary rendered inside the bordered AI-authored block.</p>,
  },
};

// Per-context descriptor is a prop — existing wording is preserved, never normalised.
export const BlockAnalysis: Story = {
  args: {
    block: true,
    label: 'AI-generated analysis',
    children: <p>Reasoning content.</p>,
  },
};
