/**
 * ALDASSIST Phase 8 — SC-O02 Agent Verification (B7). Gate J-S1: credential review before an agent acts.
 * Labelled "Agent Verification" — NEVER "Marketplace" in the UI (CR-16). Verification precedes any client
 * Zone-1 access (F21). An official-register check that is UNAVAILABLE is a HOLD: the approve affordance is
 * absent by construction — the platform never auto-approves. Conflict/dispute queues shown. Internal, audited.
 */
import type { Loaded, AgentVerificationVM, RegisterCheckVM, VerificationSubmissionVM } from '../../contract';
import { StateChip, Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { VERIFICATION_STATUS, REGISTER_CHECK } from '../ops-labels';

function RegisterChip({ check }: { check: RegisterCheckVM }) {
  const m = REGISTER_CHECK[check.status];
  return <StateChip label={m.label} icon={m.icon} />;
}

function Submission({ s }: { s: VerificationSubmissionVM }) {
  const v = VERIFICATION_STATUS[s.status];
  return (
    <li className="notpursued">
      <div className="status-pair">
        <strong>{s.agentName}</strong>
        <StateChip label={v.label} icon={v.icon} />
        <RegisterChip check={s.registerCheck} />
      </div>
      <p className="text-muted">{s.credentials} · Domains: {s.domains.join(', ')}</p>
      <p className="text-muted">{s.registerCheck.note}</p>
      <p className="text-muted">Conflicts: {s.conflicts}</p>
      <div className="next-action-row">
        {/* Approve exists ONLY when the register check is not on hold — never auto-approve. */}
        {s.approve
          ? <Button variant={s.approve.emphasis}>{s.approve.label}</Button>
          : <span className="text-muted"><Icon name="blocked" /> On hold — cannot approve until the register check completes.</span>}
        <Button variant={s.reject.emphasis}>{s.reject.label}</Button>
      </div>
    </li>
  );
}

export function AgentVerificationScreen({ loaded }: { loaded: Loaded<AgentVerificationVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Agent Verification']} />
      <h1>Agent Verification</h1>
      <p className="text-muted">{vm.precedenceNote}</p>
      <p className="lock-banner" role="note"><Icon name="info" /> {vm.holdNote}</p>

      <h2 className="section-heading">Submissions</h2>
      <ul className="plain-list">
        {vm.submissions.map((s) => <Submission s={s} key={s.id} />)}
      </ul>

      <h2 className="section-heading">Conflicts &amp; disputes</h2>
      <ul className="version-list">
        {vm.disputes.map((d) => (
          <li className="version" key={d.id}><span className="version__id">{d.label}</span><span className="text-muted">{d.note}</span></li>
        ))}
        {vm.disputes.length === 0 && <li className="text-muted">No open conflicts or disputes.</li>}
      </ul>
    </>
  );
}
