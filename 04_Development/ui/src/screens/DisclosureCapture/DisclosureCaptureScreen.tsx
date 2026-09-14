/**
 * ALDASSIST Phase 8 — SC-C03 Disclosure capture (guided flow) (B2).
 * Structured Zone-1 capture that becomes the immutable record. Fixed step order; the prior-disclosure
 * interrogation CANNOT be skipped (FR-D03). The completeness check is Tier-1 AI — structure/prompt
 * only, NEVER patentability (P3:§12.1), and is labelled as such. Soft edit-session lock: when another
 * editor holds it, no takeover is offered; idle auto-release is a pending SLOT (S-8), never invented.
 */
import type { Loaded, DisclosureCaptureVM } from '../../contract';
import { Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function DisclosureCaptureScreen({ loaded }: { loaded: Loaded<DisclosureCaptureVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const locked = vm.lock.heldByOther;

  return (
    <>
      <Breadcrumbs trail={['Inventions', vm.inventionId, 'Record disclosure']} />
      <h1>Record the disclosure</h1>
      <p className="text-muted">{vm.autosaveNote}</p>

      {/* Soft edit-session lock — sequential, not concurrent (A3). No takeover control offered. */}
      {locked && (
        <div className="lock-banner" role="status">
          <Icon name="locked" />
          <span>
            Being edited by <strong>{vm.lock.heldByName}</strong>
            {vm.lock.since ? ` · started ${vm.lock.since}` : ''}. You'll be able to edit when they finish.
            {vm.lock.idleTimeout.status === 'pending-slot' && (
              <span className="text-muted"> (Automatic release after inactivity is not yet configured.)</span>
            )}
          </span>
        </div>
      )}

      <ol className="steps">
        {vm.steps.map((s) => {
          const current = s.id === vm.currentStepId;
          return (
            <li key={s.id} className={`step${current ? ' step--current' : ''}`} aria-current={current ? 'step' : undefined}>
              <span className="step__marker">{s.complete ? <Icon name="success" /> : <Icon name="waiting" />}</span>
              <span className="step__label">{s.label}</span>
              {s.mandatoryNonSkippable && <span className="step__required">Required — cannot be skipped</span>}
            </li>
          );
        })}
      </ol>

      {/* Tier-1 completeness assistant — clearly labelled: structure/prompts only, never patentability. */}
      <section className="ai-marker" aria-label="Completeness check">
        <span className="ai-marker__label">Tier-1 completeness check — structure &amp; prompts only</span>
        <p>{vm.completeness.disclaimer}</p>
        <ul>
          {vm.completeness.prompts.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </section>

      <div className="next-action-row">
        <Button variant="primary" disabled={locked}>Save &amp; continue</Button>
        {locked && <span className="text-muted">Editing is locked while another person has the session.</span>}
      </div>
    </>
  );
}
