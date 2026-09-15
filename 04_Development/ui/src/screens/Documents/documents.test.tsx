/**
 * SC-C17 governance: AI-authored vs human-authored content is visually AND structurally distinguishable
 * (IP-07) — an AI document is never presented as human-authored; a version referenced by a released
 * assessment / filing is marked immutable (BR-20).
 */
import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { DocumentsScreen } from './DocumentsScreen';
import { documentsScenarios } from '../../fixtures/scenarios/home';

describe('SC-C17 documents provenance', () => {
  it('distinguishes AI-generated from human-authored, and never labels the AI doc as human', () => {
    const { getByText } = render(<DocumentsScreen loaded={documentsScenarios['ready']} />);
    // AI row carries a distinct AI marker
    const aiRow = getByText('Assessment report').closest('tr')!;
    expect(within(aiRow).getByText('AI-generated')).toBeTruthy();
    expect(aiRow.textContent).not.toMatch(/Human ·/);
    // human row carries the reviewer's name, not the AI marker
    const humanRow = getByText('Disclosure v3').closest('tr')!;
    expect(within(humanRow).getByText(/Human ·/)).toBeTruthy();
    expect(within(humanRow).queryByText('AI-generated')).toBeNull();
  });

  it('offers an access-log entry point as a navigable link', () => {
    const { getByText } = render(<DocumentsScreen loaded={documentsScenarios['ready']} />);
    const link = getByText('View access log');
    expect(link.tagName).toBe('A');
  });

  it('marks a filed/assessed version immutable', () => {
    const { getByText } = render(<DocumentsScreen loaded={documentsScenarios['ready']} />);
    const immutableRow = getByText('Assessment report').closest('tr')!;
    expect(immutableRow.textContent).toMatch(/immutable/i);
    // a non-referenced draft is not locked
    const draftRow = getByText('Draft notes').closest('tr')!;
    expect(draftRow.textContent).not.toMatch(/immutable/i);
  });
});
