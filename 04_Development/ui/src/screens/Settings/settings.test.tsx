/**
 * SC-C20 governance: the client MFA policy (S-10) and per-class channel default (S-7) render as SLOT
 * CONTAINERS, never filled (CR-19); "Critical notifications cannot be muted" is stated; billing and
 * workspace deletion are Owner-only, shown visible-but-locked to other roles with a reason + who can act
 * (IP-15), never hidden.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SettingsScreen } from './SettingsScreen';
import { settingsScenarios } from '../../fixtures/scenarios/home';

describe('SC-C20 settings governance', () => {
  it('renders open decisions (MFA, channel default) as unfilled containers, not invented values', () => {
    const { container } = render(<SettingsScreen loaded={settingsScenarios['owner']} />);
    expect(container.textContent).toMatch(/MFA policy is not configured yet/i);
    expect(container.textContent).toMatch(/default channel is not configured yet/i);
    // data residency is likewise a container
    expect(container.textContent).toMatch(/Data residency is not configured yet/i);
  });

  it('states that Critical notifications cannot be muted', () => {
    const { container } = render(<SettingsScreen loaded={settingsScenarios['owner']} />);
    expect(container.textContent).toMatch(/Critical notifications cannot be muted/i);
  });

  it('owner sees billing and deletion unlocked', () => {
    const { container } = render(<SettingsScreen loaded={settingsScenarios['owner']} />);
    expect(container.textContent).not.toMatch(/visible to the Owner only/i);
    expect(container.textContent).not.toMatch(/limited to the Owner/i);
  });

  it('billing crosses the L1 boundary via PriceDisplay and invents no figures', () => {
    const { container } = render(<SettingsScreen loaded={settingsScenarios['owner']} />);
    // the only money renderer; official fee separately identifiable; amounts are unfilled slots
    expect(container.querySelector('.price')).toBeTruthy();
    expect(container.textContent).toContain('Official fee');
    expect(container.textContent).toContain('amount not set');
    expect(container.textContent).not.toMatch(/[₹$€£]\s*\d/);
  });

  it('an Admin cannot act on billing/deletion — both are visible-but-locked, routed to the Owner', () => {
    const { container } = render(<SettingsScreen loaded={settingsScenarios['admin-locked']} />);
    expect(container.textContent).toMatch(/Billing/);
    expect(container.textContent).toMatch(/visible to the Owner only/i);
    expect(container.textContent).toMatch(/limited to the Owner/i);
    expect(container.textContent).toMatch(/Ask the Workspace Owner/i);
  });

  it('non-owner sees billing and deletion visible-but-locked with who can act', () => {
    const { container } = render(<SettingsScreen loaded={settingsScenarios['member-locked']} />);
    // billing still visible (not hidden) but locked
    expect(container.textContent).toMatch(/Billing/);
    expect(container.textContent).toMatch(/visible to the Owner only/i);
    expect(container.textContent).toMatch(/limited to the Owner/i);
    expect(container.textContent).toMatch(/Ask the Workspace Owner/i);
  });
});
