/**
 * ALDASSIST Phase 8 — SC-P13 Public agent profile (B8). The outcome-record surface. n≥20 floor + sample
 * size + confidence, below floor → "not enough data yet" (D-2026-019). Professional-fee display governed by
 * L1-04 (container). Publication go-live is L3-gated (container). Engage requires an account.
 */
import type { Loaded, AgentPublicProfileVM } from '../../contract';
import { Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { Stats } from '../AgentDirectory';

export function AgentPublicProfileScreen({ loaded }: { loaded: Loaded<AgentPublicProfileVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['Agents', vm.name]} />
      <h1>{vm.name}</h1>
      <dl className="detail-grid">
        <div className="kv"><dt className="kv__label">Credentials</dt><dd className="kv__value">{vm.credentials}</dd></div>
        <div className="kv"><dt className="kv__label">Background</dt><dd className="kv__value">{vm.background}</dd></div>
        <div className="kv"><dt className="kv__label">Specializations</dt><dd className="kv__value">{vm.specializations.join(', ')}</dd></div>
        <div className="kv"><dt className="kv__label">Jurisdiction</dt><dd className="kv__value">{vm.jurisdiction}</dd></div>
        <div className="kv"><dt className="kv__label">Languages</dt><dd className="kv__value">{vm.languages.join(', ')}</dd></div>
      </dl>

      <h2 className="section-heading">Outcomes</h2>
      <p><Stats stats={vm.stats} /></p>
      <p className="lock-banner" role="status">
        {vm.publicationGate.status === 'pending-legal'
          ? `Publishing outcome statistics is gated on legal review (${vm.publicationGate.slotId}) and is not yet enabled.`
          : vm.publicationGate.text}
      </p>

      <h2 className="section-heading">Professional fee</h2>
      <p className="text-muted">
        {vm.professionalFee.status === 'pending-legal'
          ? `Professional-fee display follows legal review (${vm.professionalFee.slotId}).`
          : vm.professionalFee.text}
      </p>

      <div className="next-action-row"><Button variant={vm.engage.emphasis}><Icon name="reviewed" /> {vm.engage.label}{vm.engage.gated ? ' (needs an account)' : ''}</Button></div>
    </>
  );
}
