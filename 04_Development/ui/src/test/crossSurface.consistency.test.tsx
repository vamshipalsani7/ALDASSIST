/**
 * B9 cross-cutting verification — cross-surface consistency.
 *
 * Locks the structural guarantees that must hold IDENTICALLY across all four surface shells (Client, Agent,
 * Operations, Public), so a future change to one surface cannot silently diverge:
 *   • a skip link to #main (keyboard access),
 *   • a single <main id="main"> content landmark,
 *   • a labelled navigation landmark (nav[aria-label]),
 *   • a banner header.
 * And the CR-5 invariant: the cross-tenant `not-found` state renders a UNIFORM "does not exist" page that
 * leaks NOTHING about any protected object — verified both on the shared ScreenState and on the screen that
 * B9 refactored onto it (AssessmentVerdict).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { ClientShell } from '../shell/ClientShell';
import { AgentShell } from '../shell/AgentShell';
import { OpsShell } from '../shell/OpsShell';
import { PublicShell } from '../shell/PublicShell';
import { ScreenState } from '../shell/ScreenState';
import { AssessmentVerdictScreen } from '../screens/AssessmentVerdict/AssessmentVerdictScreen';

const SHELLS: Record<string, (child: React.ReactNode) => React.ReactElement> = {
  Client: (c) => <ClientShell>{c}</ClientShell>,
  Agent: (c) => <AgentShell>{c}</AgentShell>,
  Operations: (c) => <OpsShell>{c}</OpsShell>,
  Public: (c) => <PublicShell>{c}</PublicShell>,
};

describe('B9 cross-surface shell consistency', () => {
  for (const [surface, wrap] of Object.entries(SHELLS)) {
    describe(surface, () => {
      it('exposes a skip link to #main', () => {
        const { container } = render(wrap(<p>content</p>));
        const skip = container.querySelector('a.skip-link');
        expect(skip, `${surface}: skip link`).not.toBeNull();
        expect(skip?.getAttribute('href')).toBe('#main');
      });

      it('renders exactly one <main id="main"> wrapping the content', () => {
        const { container } = render(wrap(<p data-testid="content">content</p>));
        const mains = container.querySelectorAll('main#main');
        expect(mains.length, `${surface}: main#main count`).toBe(1);
        expect(mains[0].querySelector('[data-testid="content"]')).not.toBeNull();
      });

      it('exposes a labelled navigation landmark and a banner header', () => {
        const { container } = render(wrap(<p>content</p>));
        const nav = container.querySelector('nav[aria-label]');
        expect(nav, `${surface}: labelled nav`).not.toBeNull();
        expect((nav?.getAttribute('aria-label') || '').trim().length).toBeGreaterThan(0);
        expect(container.querySelector('header[role="banner"]'), `${surface}: banner`).not.toBeNull();
      });
    });
  }
});

describe('B9 CR-5 cross-tenant not-found leaks nothing', () => {
  it('shared ScreenState renders the uniform "does not exist" page', () => {
    const { container } = render(<ScreenState loaded={{ state: 'not-found' }} />);
    expect(container.textContent).toMatch(/does not exist/i);
    // Uniform panel, no object-derived scaffolding.
    expect(container.querySelector('.detail-grid')).toBeNull();
  });

  it('AssessmentVerdict (B9-refactored) not-found leaks no object identity', () => {
    const { container } = render(<AssessmentVerdictScreen loaded={{ state: 'not-found' }} />);
    expect(container.textContent).toMatch(/does not exist/i);
    // None of the ready-branch object scaffolding may appear.
    expect(container.querySelector('.detail-grid')).toBeNull();
    expect(container.querySelector('.verdict__label')).toBeNull();
    expect(container.querySelector('.ai-marker')).toBeNull();
  });
});
