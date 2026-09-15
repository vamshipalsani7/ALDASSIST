/**
 * SC-C11 governance: CR-5 cross-tenant invisibility, "'Closed' never without its reason" (P4:§11.3),
 * the Responding STATUS-ONLY constraint (DL:D-2026-016), and the Silence view's expected-next-event SLOT
 * (S-5) — a container, never an invented time or countdown (CR-19).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ApplicationDetailScreen } from './ApplicationDetailScreen';
import { applicationDetailScenarios } from '../../fixtures/scenarios/portfolio';

const IDENTITY_LEAKS = ['2026/DEL/000123', 'Application for INV-7F3A', 'Under examination', 'Portfolio', 'Status'];

describe('SC-C11 CR-5 cross-tenant 404', () => {
  it('exposes no application identity on not-found', () => {
    const { container } = render(<ApplicationDetailScreen loaded={{ state: 'not-found' }} />);
    for (const leak of IDENTITY_LEAKS) expect(container.innerHTML).not.toContain(leak);
    expect(container.textContent).toContain('does not exist');
  });
  it('is distinct from same-tenancy permission-denied', () => {
    const denied = render(<ApplicationDetailScreen loaded={applicationDetailScenarios['permission-denied']} />);
    expect(denied.container.textContent).toContain('Ask the Workspace Owner');
  });
});

describe("SC-C11 'Closed' never without its reason (P4:§11.3)", () => {
  it('renders the closed reason', () => {
    const { container } = render(<ApplicationDetailScreen loaded={applicationDetailScenarios['closed-with-reason']} />);
    expect(container.textContent).toMatch(/Closed —/);
    expect(container.textContent).toContain('Withdrawn by the applicant before publication');
  });
});

describe('SC-C11 Responding is STATUS-ONLY (DL:D-2026-016)', () => {
  it('shows status + off-platform note and NO response-authoring affordance', () => {
    const { container } = render(<ApplicationDetailScreen loaded={applicationDetailScenarios['responding-status-only']} />);
    // status-only surface: honest off-platform copy + the tracked deadline
    expect(container.textContent).toContain('not a prosecution workspace');
    expect(container.textContent).toMatch(/Examination-response deadline/);
    // NO authoring: no editable field, and none of the drafting/compose verbs
    expect(container.querySelector('textarea')).toBeNull();
    for (const verb of ['Draft response', 'Compose', 'Write response', 'Submit response', 'Author']) {
      expect(container.textContent).not.toContain(verb);
    }
  });
});

describe('SC-C11 Silence view — expected-next-event is a SLOT (S-5), never invented (CR-19)', () => {
  it('renders the silence copy and a pending-slot expected timing, with no countdown', () => {
    const scenario = applicationDetailScenarios['quiet-silence'];
    // VM-level: the expected-next-event is a pending slot (not a fabricated time).
    if (scenario.state === 'ready' && scenario.data.mode === 'quiet') {
      expect(scenario.data.expectedNextEvent.status).toBe('pending-slot');
    } else {
      throw new Error('expected quiet scenario');
    }
    const { container } = render(<ApplicationDetailScreen loaded={scenario} />);
    expect(container.textContent).toContain("Nothing has happened — and that's expected");
    expect(container.textContent).toContain('will appear here once it is set'); // pending-slot rendering
    // no fake urgency / countdown
    for (const bad of ['days left', 'hours left', 'countdown', 'left to respond']) {
      expect(container.textContent!.toLowerCase()).not.toContain(bad);
    }
  });
});
