/**
 * ALDASSIST Phase 8 — SC-A09–A12 Practice (B6): profile · outcomes · capacity · earnings (grouped, tabbed).
 * Outcome statistics obey the n≥20 floor with sample size + confidence; below the floor → "not enough data
 * yet" (CR-21 / D-2026-019) — enforced structurally by AgentStatsVM. Go-live of PUBLISHED outcome stats is
 * L3-gated (a legal container). The confidence representation is a SLOT. Earnings/settlement render via
 * PriceDisplay only, with the L1 settlement presentation as a legal container — no invented figures (CR-19).
 */
import { useState } from 'react';
import type { Loaded, PracticeVM } from '../../contract';
import { Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { Tabs } from '../../shell/Tabs';
import { ScreenState } from '../../shell/ScreenState';
import { PriceDisplay } from '../../components';

const TABS = [
  { id: 'profile', label: 'Profile' }, { id: 'outcomes', label: 'Outcomes' },
  { id: 'capacity', label: 'Capacity' }, { id: 'earnings', label: 'Earnings' },
];

export function AgentPracticeScreen({ loaded }: { loaded: Loaded<PracticeVM> }) {
  const [tab, setTab] = useState('profile');
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Practice']} />
      <h1>Practice</h1>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />

      {tab === 'profile' && (
        <section className="tabpanel">
          <h2 className="section-heading">Profile</h2>
          <dl className="detail-grid">
            <div className="kv"><dt className="kv__label">Credentials</dt><dd className="kv__value">{vm.profile.credentials}</dd></div>
            <div className="kv"><dt className="kv__label">Background</dt><dd className="kv__value">{vm.profile.background}</dd></div>
            <div className="kv"><dt className="kv__label">Specializations</dt><dd className="kv__value">{vm.profile.specializations.join(', ')}</dd></div>
            <div className="kv"><dt className="kv__label">Languages</dt><dd className="kv__value">{vm.profile.languages.join(', ')}</dd></div>
          </dl>
          <p className="text-muted">{vm.profile.publicProfileNote}</p>
          <div className="next-action-row"><Button variant={vm.profile.editAction.emphasis}>{vm.profile.editAction.label}</Button></div>
        </section>
      )}

      {tab === 'outcomes' && (
        <section className="tabpanel">
          <h2 className="section-heading">Outcomes</h2>
          {vm.outcomes.stats.status === 'published' ? (
            <div className="state-panel">
              <p><strong>Sample size (n): {vm.outcomes.stats.n}</strong></p>
              {vm.outcomes.stats.confidence.status === 'pending-slot'
                ? <p className="text-muted">The confidence representation is not yet calibrated ({vm.outcomes.stats.confidence.slotId}); it appears here once set — never a bare number.</p>
                : vm.outcomes.stats.confidence.status === 'resolved'
                  ? <p>Confidence: {vm.outcomes.stats.confidence.value}</p>
                  : <p className="text-muted">Confidence representation temporarily unavailable.</p>}
              <p className="text-muted">{vm.outcomes.sampleSizeNote}</p>
            </div>
          ) : (
            <div className="state-panel" role="note">
              <p>{vm.outcomes.stats.note}</p>
            </div>
          )}
          <p className="text-muted">{vm.outcomes.agentVisibilityNote}</p>
          <p className="lock-banner" role="status">
            {vm.outcomes.publicationGate.status === 'pending-legal'
              ? `Publishing outcome statistics to clients is gated on legal review (${vm.outcomes.publicationGate.slotId}) and is not yet enabled.`
              : vm.outcomes.publicationGate.text}
          </p>
        </section>
      )}

      {tab === 'capacity' && (
        <section className="tabpanel">
          <h2 className="section-heading">Capacity</h2>
          <p className="text-muted">{vm.capacity.availabilityNote}</p>
          <dl className="detail-grid">
            <div className="kv"><dt className="kv__label">Specializations</dt><dd className="kv__value">{vm.capacity.specializations.join(', ')}</dd></div>
            <div className="kv"><dt className="kv__label">Limits</dt><dd className="kv__value">{vm.capacity.limits}</dd></div>
            <div className="kv"><dt className="kv__label">Conflicts</dt><dd className="kv__value">{vm.capacity.conflicts}</dd></div>
          </dl>
          <div className="next-action-row"><Button variant={vm.capacity.saveAction.emphasis}>{vm.capacity.saveAction.label}</Button></div>
        </section>
      )}

      {tab === 'earnings' && (
        <section className="tabpanel">
          <h2 className="section-heading">Earnings</h2>
          <PriceDisplay price={vm.earnings.settlement} />
          <p className="text-muted">
            {vm.earnings.settlementPresentation.status === 'pending-legal'
              ? `The settlement presentation follows legal review (${vm.earnings.settlementPresentation.slotId}).`
              : vm.earnings.settlementPresentation.text}
          </p>
          <p className="text-muted">{vm.earnings.note}</p>
        </section>
      )}
    </>
  );
}
