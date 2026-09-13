import type { Meta, StoryObj } from '@storybook/react';
import { ProvenanceCitation } from './ProvenanceCitation';
import { HumanReviewIndicator } from './HumanReviewIndicator';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import { EvidenceBlock } from './EvidenceBlock';
import type { Citation, ConfidenceVM, EvidenceVM } from '../contract';

const meta: Meta = { title: 'Trust primitives/Provenance & review' };
export default meta;

const citation: Citation = {
  accessibleName: 'Cited passage in REF-α (synthetic), ¶17',
  passage: { documentId: 'REF-ALPHA', locator: '¶17' },
  source: 'ai-derived',
};

export const Citation_: StoryObj = {
  name: 'Provenance citation (primary element, not a footnote)',
  render: () => <ProvenanceCitation citation={citation} />,
};

export const ReviewSeal: StoryObj = {
  name: 'Human-review indicator (Released only)',
  render: () => <HumanReviewIndicator reviewerName="A. Reviewer, Verified Agent (demo)" releasedAt="2026-09-03T09:00:00+05:30" />,
};

const confidencePending: ConfidenceVM = {
  basisText: 'Based on the located art and the disclosed combination.',
  scale: { status: 'pending-slot', slotId: 'S-2 confidence representation', source: 'measurement' },
};
export const Confidence: StoryObj = {
  name: 'Confidence — basis shown, scale is a SLOT',
  render: () => <ConfidenceIndicator confidence={confidencePending} />,
};

const evidence: EvidenceVM = {
  assertions: [
    { kind: 'verified', text: 'The closest located reference discloses a fixed threshold.', citation },
    { kind: 'unverified', text: 'A further reference may bear on the recalibration step.', note: 'citation-unresolved' },
  ],
  referenceList: [{ id: 'REF-ALPHA', label: 'REF-α — synthetic prior-art record' }],
  coverageStatement: 'Searched: public register corpus (demo). Not searched: unpublished applications within the 18-month window.',
  blindSpotNotice: 'Applications filed within the last 18 months may not yet be public.',
};
export const Evidence_: StoryObj = {
  name: 'Evidence block (fail-safe: one assertion unverified)',
  render: () => <EvidenceBlock evidence={evidence} />,
};
