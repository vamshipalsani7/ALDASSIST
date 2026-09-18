/**
 * SC-A07 governance: the review workspace is the CR-2/BR-01 gate in action — two panes, a Release
 * affordance is the only path a verdict reaches the client, provenance is fail-safe (CR-6: an unresolved
 * citation is never shown as an established fact), and an out-of-grant object reveals nothing (CR-5).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ReviewWorkspaceScreen } from './ReviewWorkspaceScreen';
import { reviewWorkspaceScenarios } from '../../fixtures/scenarios/agent';

describe('SC-A07 review workspace', () => {
  it('renders two panes — Source and Your review — with the source pane present', () => {
    const { getByRole } = render(<ReviewWorkspaceScreen loaded={reviewWorkspaceScenarios['ready']} />);
    expect(getByRole('heading', { name: 'Source' })).toBeTruthy();
    expect(getByRole('heading', { name: 'Your review' })).toBeTruthy();
  });

  it('offers Release as the gate — the verdict reaches the client only here', () => {
    const { getByRole } = render(<ReviewWorkspaceScreen loaded={reviewWorkspaceScenarios['ready']} />);
    expect(getByRole('button', { name: /Release to client/i })).toBeTruthy();
    // and the reviewer-name-on-release is stated
    const { container } = render(<ReviewWorkspaceScreen loaded={reviewWorkspaceScenarios['ready']} />);
    expect(container.textContent).toMatch(/your name is recorded as the reviewer/i);
  });

  it('fail-safe provenance (CR-6): an unresolved citation is shown as not established, never as fact', () => {
    const { container } = render(<ReviewWorkspaceScreen loaded={reviewWorkspaceScenarios['ready']} />);
    expect(container.textContent).toMatch(/Unverified — not shown as an established fact/i);
  });

  it('an out-of-grant object reveals nothing (CR-5 uniform 404)', () => {
    const { container } = render(<ReviewWorkspaceScreen loaded={reviewWorkspaceScenarios['not-found']} />);
    expect(container.textContent).toMatch(/does not exist/i);
    expect(container.textContent).not.toMatch(/Source|Release|Disclosure/);
  });
});
