/**
 * ALDASSIST Phase 8 — SC-A00 Agent onboarding & verification (B6). Convert a prospective agent into a
 * Verified Agent. Value prop: your docket first, matters second. Verification PRECEDES any Zone-1 access;
 * while pending the account is limited (no reviews, no matching, no client material). On failure, a clear
 * reason + remediation, and no client access in the interim. Declared domains/conflicts/capacity are set
 * up front (BR-10). Credential fields are containers — this screen collects nothing in the fixture harness.
 */
import type { Loaded, AgentOnboardingVM } from '../../contract';
import { StateChip, Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { VERIFICATION_STATUS } from '../agent-labels';

export function AgentOnboardingScreen({ loaded }: { loaded: Loaded<AgentOnboardingVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const v = VERIFICATION_STATUS[vm.verification.status];

  return (
    <>
      <Breadcrumbs trail={['Onboarding']} />
      <h1>Become a Verified Agent</h1>
      <p className="trust-copy">{vm.valueProp}</p>

      <div className="status-pair">
        <span className="section-heading">Verification</span>
        <StateChip label={v.label} icon={v.icon} />
      </div>
      <p className="text-muted">{vm.verification.note}</p>
      {vm.verification.remediation && <p className="lock-banner" role="status">{vm.verification.remediation}</p>}

      <h2 className="section-heading">Credentials</h2>
      <dl className="detail-grid">
        {vm.credentialFields.map((f) => (
          <div className="kv" key={f.id}><dt className="kv__label">{f.label}</dt><dd className="kv__value">{f.note}</dd></div>
        ))}
      </dl>

      <h2 className="section-heading">Declarations</h2>
      <ul className="version-list">
        <li className="version"><span className="version__id">Domains</span><span className="text-muted">{vm.declarations.domains}</span></li>
        <li className="version"><span className="version__id">Conflicts</span><span className="text-muted">{vm.declarations.conflicts}</span></li>
        <li className="version"><span className="version__id">Capacity</span><span className="text-muted">{vm.declarations.capacity}</span></li>
      </ul>

      <h2 className="section-heading">Opt in</h2>
      <ul className="version-list">
        <li className="version"><span className="version__id">Review queue</span><span className="text-muted">{vm.optIns.reviewQueue}</span></li>
        <li className="version"><span className="version__id">Opportunities</span><span className="text-muted">{vm.optIns.opportunities}</span></li>
      </ul>

      <p className="text-muted">{vm.pendingLimitationsNote}</p>
      <div className="next-action-row"><Button variant={vm.submit.emphasis}>{vm.submit.label}</Button></div>
    </>
  );
}
