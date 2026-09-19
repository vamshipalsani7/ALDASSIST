/**
 * SC-P03 governance: the AI plain-language summary is LABELLED AI (CR-6), distinct from register content;
 * status carries source/freshness per field; sparse register fields render as "not available from the
 * register" — never fabricated; save/alert is account-gated; own-invention warning routes to the Vault.
 */
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { PatentDocumentScreen } from './PatentDocumentScreen';
import { patentDocumentScenarios } from '../../fixtures/scenarios/public';

describe('SC-P03 patent document', () => {
  it('labels the AI plain-language summary as AI-generated', () => {
    const { container } = render(<PatentDocumentScreen loaded={patentDocumentScenarios['ready']} />);
    expect(container.querySelector('.ai-marker__label')?.textContent).toMatch(/AI-generated/i);
  });

  it('carries source/freshness on the status timeline', () => {
    const view = render(<PatentDocumentScreen loaded={patentDocumentScenarios['ready']} />);
    fireEvent.click(view.getByRole('button', { name: 'Status' }));
    expect(view.container.textContent).toMatch(/source:/i);
  });

  it('renders sparse register fields as "not available from the register", never fabricated', () => {
    const view = render(<PatentDocumentScreen loaded={patentDocumentScenarios['sparse']} />);
    fireEvent.click(view.getByRole('button', { name: 'Claims' }));
    expect(view.container.textContent).toMatch(/not available from the register/i);
  });

  it('save/alert is account-gated and own-invention routes to the Vault', () => {
    const { container } = render(<PatentDocumentScreen loaded={patentDocumentScenarios['ready']} />);
    expect(container.textContent).toMatch(/needs a free account/i);
    expect(container.textContent).toMatch(/Vault/);
  });
});
