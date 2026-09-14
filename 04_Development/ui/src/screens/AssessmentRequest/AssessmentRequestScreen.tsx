/**
 * ALDASSIST Phase 8 — SC-C06 Request assessment (B2).
 * Starts the free, human-reviewed assessment. Jurisdiction is India/PCT only. The trust promise is
 * verbatim ("free — no payment and no engagement", ADR:§7). The committed review turnaround is a SLOT
 * (CR-19) — the retired "hours/seconds" language is banned, so timing is shown as "not yet set" when
 * the slot is unfilled. When the disclosure is incomplete the request is blocked with a clear reason
 * and a route back to finish it (F5 alt). CR-5: `not-found` reveals nothing about the object.
 */
import { useState } from 'react';
import type { Loaded, AssessmentRequestVM } from '../../contract';
import { Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

function turnaroundText(vm: AssessmentRequestVM): string {
  const t = vm.turnaround;
  if (t.status === 'resolved') return `Committed review turnaround: ${t.value}.`;
  if (t.status === 'unavailable') return 'Committed review turnaround is temporarily unavailable.';
  return 'A committed review turnaround will be shown here once it is set.'; // pending slot — no invented time
}

export function AssessmentRequestScreen({ loaded }: { loaded: Loaded<AssessmentRequestVM> }) {
  const [selected, setSelected] = useState<Record<string, boolean>>({ india: true });
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Inventions', vm.inventionId, 'Request assessment']} />
      <h1>Request an assessment</h1>

      {/* Verbatim trust copy — free, no payment, no engagement (ADR:§7). */}
      <p className="trust-copy"><Icon name="reviewed" /> {vm.trustCopy}</p>

      {vm.disclosureComplete ? (
        <>
          <fieldset className="field">
            <legend>Jurisdiction</legend>
            {vm.jurisdictions.map((j) => (
              <label key={j.id} className="checkbox">
                <input
                  type="checkbox"
                  checked={!!selected[j.id]}
                  onChange={(e) => setSelected((s) => ({ ...s, [j.id]: e.target.checked }))}
                />
                {j.label}
              </label>
            ))}
          </fieldset>

          <p>{vm.reviewNote}</p>
          <p className="text-muted">{turnaroundText(vm)}</p>

          <div className="next-action-row">
            <Button variant={vm.primaryAction.emphasis}>{vm.primaryAction.label}</Button>
          </div>
        </>
      ) : (
        // Blocked: disclosure not complete → clear reason + route back to finish (F5 alt).
        <div className="state-panel state-panel--locked" role="status">
          <p>This invention's disclosure isn't complete yet, so it can't be assessed.</p>
          <p className="text-muted">Finish the disclosure first — your progress is saved.</p>
          <div className="next-action-row"><Button variant="primary">Continue the disclosure</Button></div>
        </div>
      )}
    </>
  );
}
