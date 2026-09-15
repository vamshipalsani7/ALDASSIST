/**
 * ALDASSIST Phase 8 — SC-C13 Deadline detail — the computation trace (B3). IP-09 three-depth transparency.
 *  D1 — the date + criticality + state.
 *  D2 — why: the trigger event + the window.
 *  D3 — the full computation trace: rule id, version, statutory citation, calendar adjustment, extensions.
 *
 * The date is computed by the Rules Engine and only rendered (never authored). The underlying Rule object
 * is agent/ops-only — the client sees the trace, not the Rule. When the trace is unavailable the screen
 * shows the date with an honest "trace unavailable" and NEVER a fabricated basis (a deadline analogue of the
 * IP-08 fail-safe). A client ACKNOWLEDGES/understands — confirming a critical deadline is an agent/ops act
 * (BR-03), never the client's. CR-5: the `not-found` branch reveals nothing about the deadline.
 */
import type { Loaded, DeadlineDetailVM } from '../../contract';
import { StateChip, Icon, Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { DEADLINE_STATE_CHIP } from '../labels';

export function DeadlineDetailScreen({ loaded }: { loaded: Loaded<DeadlineDetailVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const chip = DEADLINE_STATE_CHIP[vm.state];

  return (
    <>
      <Breadcrumbs trail={['Deadlines', vm.title]} />

      {/* D1 — the date + criticality + state */}
      <h1>{vm.title}</h1>
      <p className="status-pair">
        <StateChip label={chip.label} icon={chip.icon} />
        <span className={`attention ${vm.criticality.elevated ? 'attention--at-risk' : ''}`}>
          <span className="attention__icon"><Icon name={vm.criticality.elevated ? 'at-risk' : 'info'} /></span>
          {vm.criticality.label}
        </span>
      </p>
      <p><strong>Date:</strong> {vm.date} · <span className="mono">{vm.applicationRef}</span></p>

      {/* D2 — why (trigger + window) */}
      <details className="depth" open>
        <summary className="depth__toggle">Why this date</summary>
        <div className="depth__body">
          <p>{vm.why.trigger}</p>
          <p className="text-muted">{vm.why.window}</p>
        </div>
      </details>

      {/* D3 — the full computation trace, or an honest unavailable state (never a fabricated basis) */}
      <details className="depth">
        <summary className="depth__toggle">How this date was computed (trace)</summary>
        <div className="depth__body">
          {vm.trace.status === 'available' ? (
            <ul className="plain-list">
              <li><strong>Rule:</strong> <span className="mono">{vm.trace.detail.ruleId}</span> ({vm.trace.detail.ruleVersion})</li>
              <li><strong>Statutory basis:</strong> {vm.trace.detail.statutoryCitation}</li>
              <li><strong>Calendar adjustment:</strong> {vm.trace.detail.calendarAdjustment}</li>
              <li><strong>Extensions:</strong> {vm.trace.detail.extensions}</li>
            </ul>
          ) : (
            <p className="text-muted">
              The computation trace is temporarily unavailable. The date above stands — we do not show a basis
              we cannot verify.
            </p>
          )}
        </div>
      </details>

      {/* Client acknowledges — confirmation of a critical deadline is an agent/ops act, never the client's. */}
      <p className="text-muted" role="note">{vm.confirmationNote}</p>
      <div className="next-action-row">
        <Button variant={vm.clientAction.emphasis}>{vm.clientAction.label}</Button>
      </div>
    </>
  );
}
