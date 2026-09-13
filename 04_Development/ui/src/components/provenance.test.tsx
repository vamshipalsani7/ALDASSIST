/**
 * CR-6 — provenance, fail-closed. A `verified` assertion must not render as established unless its
 * citation resolves through the provider layer BEFORE rendering (not on click). An unresolved citation
 * makes the assertion render as unverified. The same rule applies to depth-2 references.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EvidenceBlock } from './EvidenceBlock';
import { ReferenceView } from './ReferenceView';
import { ProvenanceCitation } from './ProvenanceCitation';
import { CitationResolverProvider } from './CitationResolverContext';
import { makeCitation } from '../fixtures/passages';
import type { EvidenceVM, CitationResolver } from '../contract';

// A resolver that always fails to resolve (simulates a citation that cannot be verified).
const nullResolver: CitationResolver = { async resolve() { return null; } };

const base = {
  referenceList: [{ id: 'REF-ALPHA', label: 'REF-α — synthetic prior-art record' }],
  coverageStatement: 'coverage',
  blindSpotNotice: 'blind spot',
};

describe('CR-6 fail-closed: verified assertion + resolver returns null', () => {
  it('does NOT render the assertion as verified/established; shows it unverified with no citation affordance', async () => {
    const evidence: EvidenceVM = {
      ...base,
      assertions: [{ kind: 'verified', text: 'Discloses a fixed threshold.', citation: makeCitation('REF-ALPHA', '¶17') }],
    };
    render(
      <CitationResolverProvider resolver={nullResolver}>
        <EvidenceBlock evidence={evidence} />
      </CitationResolverProvider>,
    );
    // After resolution fails, the assertion is marked unverified…
    expect(await screen.findByText(/Unverified — not shown as an established fact/i)).toBeInTheDocument();
    // …and it offers NO citation affordance (nothing claims verification).
    expect(screen.queryByRole('button', { name: /Open Cited passage/i })).toBeNull();
  });
});

describe('CR-6: a successfully resolved citation permits the verified presentation', () => {
  it('renders the primary citation affordance once the citation has resolved', async () => {
    const evidence: EvidenceVM = {
      ...base,
      assertions: [{ kind: 'verified', text: 'Discloses a fixed threshold.', citation: makeCitation('REF-ALPHA', '¶17') }],
    };
    // Default context = fixture resolver, which resolves REF-ALPHA.
    render(<EvidenceBlock evidence={evidence} />);
    expect(await screen.findByRole('button', { name: /Open Cited passage/i })).toBeInTheDocument();
    // No unverified mark on a resolved assertion.
    expect(screen.queryByText(/Unverified — not shown as an established fact/i)).toBeNull();
  });
});

describe('CR-6: a contract-unverified assertion is always unverified', () => {
  it('marks it unverified and offers no citation affordance', () => {
    const evidence: EvidenceVM = {
      ...base,
      assertions: [{ kind: 'unverified', text: 'A further reference may bear on this.', note: 'citation-unresolved' }],
    };
    render(<EvidenceBlock evidence={evidence} />);
    expect(screen.getByText(/Unverified — not shown as an established fact/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Open Cited passage/i })).toBeNull();
  });
});

describe('CR-6 fail-closed for depth-2 references', () => {
  it('a reference whose citation cannot resolve is marked Unverified, not shown as supported', async () => {
    render(
      <CitationResolverProvider resolver={nullResolver}>
        <ul>
          <ReferenceView reference={{ label: 'REF-β', why: 'context', citation: makeCitation('REF-BETA', '¶9') }} />
        </ul>
      </CitationResolverProvider>,
    );
    expect(await screen.findByText(/Unverified/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Open Cited passage/i })).toBeNull();
  });
});

describe('CR-6: the citation panel shows the resolved passage', () => {
  it('opens and displays the exact cited passage', async () => {
    const user = userEvent.setup();
    render(<ProvenanceCitation citation={makeCitation('REF-ALPHA', '¶17')} />);
    await user.click(screen.getByRole('button', { name: /Open Cited passage/i }));
    expect(await screen.findByText(/A threshold value is configured once at manufacture/i)).toBeInTheDocument();
  });
});
