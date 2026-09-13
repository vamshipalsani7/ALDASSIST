import type { Meta, StoryObj } from '@storybook/react';
import { AttentionMarker } from './AttentionMarker';
import { StateChip } from './StateChip';

const meta: Meta = { title: 'Trust primitives/Two-axis status' };
export default meta;

export const LifecycleChips: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <StateChip label="Analysing" icon="waiting" />
      <StateChip label="In review" icon="waiting" />
      <StateChip label="Released" icon="success" />
      <StateChip label="Closed — refused" icon="blocked" />
    </div>
  ),
};

export const AttentionMarkers: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <AttentionMarker attention="on-track" />
      <AttentionMarker attention="action-needed" />
      <AttentionMarker attention="at-risk" />
    </div>
  ),
};
