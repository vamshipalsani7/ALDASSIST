/**
 * ALDASSIST Phase 8 — SC-C09 Record decision (file / not-file) (B2). DR-01 AGNOSTIC.
 *
 * A Decision entity requires a human actor (BR-09); no AI output is the sole basis (IP-10). On not-file
 * the four alternatives are shown at EQUAL visual weight — options, not consolation (P4:§11.6) — with no
 * negative colour-coding. Not-file → the Invention becomes Not pursued but PERSISTS in the Vault (AP-01).
 * "No money, no engagement."
 *
 * DR-01 (deferred): which role may record a not-file Decision is NOT decided. This screen presupposes no
 * role — the capability is read from a pending owner-decision slot and the interaction is presented
 * permission-agnostically. The ONE baseline-fixed permission here is that engage/pay (filing) is
 * Owner-only (P4:§17.2); a non-Owner's filing intent routes to request Owner action (IP-15), never an
 * auto-escalation. CR-5: the `not-found` branch reveals nothing about the object.
 */
import { useState } from 'react';
import type { Loaded, DecisionVM, DecisionType } from '../../contract';
import { Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function DecisionRecordScreen({ loaded }: { loaded: Loaded<DecisionVM> }) {
  const [choice, setChoice] = useState<DecisionType | null>(null);
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  // DR-01-agnostic: we do NOT hard-code a role for recording a not-file decision. The authority is a
  // pending owner-decision slot; the interaction is offered to whichever role DR-01 authorises.
  const notFileAuthorityPending = vm.capability.mayRecordNotFileDecision.status === 'pending-slot';

  const alts: { key: string; heading: string; body: string }[] = [
    { key: 'design-around', heading: 'Design around', body: vm.alternatives.designAround },
    { key: 'trade-secret', heading: 'Trade secret', body: vm.alternatives.tradeSecret },
    { key: 'defensive-publication', heading: 'Defensive publication', body: vm.alternatives.defensivePublication },
    { key: 'defer', heading: 'Defer & re-assess', body: vm.alternatives.deferAndReassess },
  ];

  return (
    <>
      <Breadcrumbs trail={['Inventions', vm.inventionId, 'Record decision']} />
      <h1>Record a decision</h1>
      <p className="trust-copy">{vm.trustCopy}</p>

      <fieldset className="field">
        <legend>What would you like to record?</legend>
        <label className="radio">
          <input type="radio" name="decision" value="file" checked={choice === 'file'} onChange={() => setChoice('file')} />
          File this invention
        </label>
        <label className="radio">
          <input type="radio" name="decision" value="not-file" checked={choice === 'not-file'} onChange={() => setChoice('not-file')} />
          Decide not to file (for now)
        </label>
      </fieldset>

      {choice === 'file' && (
        // engage/pay is Owner-only — the one fixed permission; non-Owner intent routes to the Owner (IP-15).
        <div className="state-panel" role="note">
          <p>Filing engages a professional and is limited to the Workspace Owner.</p>
          <p className="text-muted">If you are not the Owner, your request to file is sent to the Owner to act on — nothing is escalated automatically.</p>
        </div>
      )}

      {choice === 'not-file' && (
        <div className="decision-notfile">
          <h2 className="section-heading">Your options</h2>
          {/* Four alternatives at EQUAL visual weight — options, not consolation. No negative colouring. */}
          <div className="alternatives__grid">
            {alts.map((a) => (
              <div className="alternatives__card" key={a.key}>
                <h4>{a.heading}</h4>
                {a.body}
              </div>
            ))}
          </div>

          <div className="field">
            <label htmlFor="dec-rationale">{vm.rationaleLabel}</label>
            <textarea id="dec-rationale" rows={3} />
          </div>

          <p className="text-muted">
            This invention will move to <strong>Not pursued</strong> and stays in your Vault — the decision can be revisited.
          </p>
          {notFileAuthorityPending && (
            <p className="text-muted">
              Who may record this decision is set by a workspace policy that isn't configured yet; this step is shown to whichever role that policy authorises.
            </p>
          )}
          <div className="next-action-row">
            <Button variant="primary">Record decision</Button>
          </div>
        </div>
      )}
    </>
  );
}
