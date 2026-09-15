/**
 * ALDASSIST Phase 8 — SC-C11 Application detail (silence + Responding status-only) ★ (B3).
 *
 * Carries three structural modes of one filed application:
 *  - active     → the event timeline (each entry names its source + freshness; NFR-A05).
 *  - quiet      → the SILENCE view: "nothing has happened — and that's expected", the last event, and the
 *                 expected-next-event RANGE, which is a SLOT (S-5) rendered as a container — never an
 *                 invented time and never a countdown (CR-19 / Philosophy §5).
 *  - responding → STATUS-ONLY: the Responding status, the response deadline, the agent-uploaded filed
 *                 response, and an honest "handled off-platform" note. There is NO prosecution workspace or
 *                 response-authoring affordance — status-only is enforced by the VM's shape (DL:D-2026-016).
 *
 * "'Closed' never without its reason" (P4:§11.3): a closed status renders its reason. CR-5: the `not-found`
 * branch reveals nothing about the application. Register unavailable → last-known + staleness (IP-18).
 */
import { useState, type ReactNode } from 'react';
import type {
  Loaded, ApplicationDetailVM, ApplicationHeaderVM, TimelineEntryVM, SlotValue, HumanReadableRange,
} from '../../contract';
import { StateChip, WhoseTurn, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ObjectHeader } from '../../shell/ObjectHeader';
import { RelationshipRail } from '../../shell/RelationshipRail';
import { TabbedSections } from '../../shell/TabbedSections';
import { ScreenState } from '../../shell/ScreenState';
import { DEADLINE_STATE_CHIP } from '../labels';

function Freshness({ e }: { e: TimelineEntryVM }) {
  return (
    <span className="text-muted">
      {e.freshness.source}{e.freshness.stale ? ' · last known (may be out of date)' : ''}
    </span>
  );
}

function Timeline({ entries }: { entries: TimelineEntryVM[] }) {
  return (
    <ul className="version-list">
      {entries.map((e, i) => (
        <li className="version" key={i}>
          <span className="version__id">{e.event}</span>
          <span className="version__time">{e.date}</span>
          <Freshness e={e} />
        </li>
      ))}
    </ul>
  );
}

function expectedText(slot: SlotValue<HumanReadableRange>): string {
  if (slot.status === 'resolved') return `Next expected event: ${slot.value}.`;
  if (slot.status === 'unavailable') return 'The expected timing for the next event is temporarily unavailable.';
  return 'The expected timing for the next event will appear here once it is set.'; // pending slot — no invented time
}

function StatusPanel({ vm }: { vm: ApplicationDetailVM }) {
  if (vm.mode === 'active') {
    return (
      <>
        {vm.staleness?.stale && (
          <p className="lock-banner" role="status">
            <Icon name="info" /> Showing the last-known position from {vm.staleness.source}. The register was
            not reachable just now, so this may be out of date.
          </p>
        )}
        <Timeline entries={vm.timeline} />
      </>
    );
  }
  if (vm.mode === 'quiet') {
    // Silence view — a designed state, never a blank; no countdown.
    return (
      <div className="notpursued" role="note">
        <p><strong>Nothing has happened — and that's expected.</strong></p>
        <p>{vm.reassurance}</p>
        <p className="text-muted">Last event: {vm.lastEvent.event} ({vm.lastEvent.date}) — {vm.lastEvent.freshness.source}</p>
        <p className="text-muted">{expectedText(vm.expectedNextEvent)}</p>
        <details className="depth"><summary className="depth__toggle">What happens next</summary><div className="depth__body">{vm.whatHappensNext}</div></details>
        <details className="depth"><summary className="depth__toggle">Why so long</summary><div className="depth__body">{vm.whySoLong}</div></details>
      </div>
    );
  }
  // responding — STATUS-ONLY: status + deadline + off-platform note + uploaded response. No authoring.
  return (
    <div>
      <p className="status-pair">
        <StateChip label={`${vm.responseDeadline.label}: ${vm.responseDeadline.date}`} icon={DEADLINE_STATE_CHIP[vm.responseDeadline.state].icon} />
      </p>
      <p>{vm.offPlatformNote}</p>
      {vm.filedResponse
        ? <p className="text-muted">Filed response uploaded by {vm.filedResponse.uploadedBy} on {vm.filedResponse.date}: {vm.filedResponse.label}</p>
        : <p className="text-muted">The filed response will be uploaded here once your agent submits it.</p>}
    </div>
  );
}

function Placeholder({ text }: { text: string }) {
  return <div className="state-panel"><p className="text-muted">{text}</p></div>;
}

export function ApplicationDetailScreen({ loaded }: { loaded: Loaded<ApplicationDetailVM> }) {
  const [active, setActive] = useState('status');
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;

  const vm = loaded.data;
  const h: ApplicationHeaderVM = vm.header;
  const identity = [
    { label: 'Official number', value: h.identity.officialNumber, mono: true },
    { label: 'Title', value: h.identity.title },
    { label: 'Jurisdiction', value: h.identity.jurisdiction },
    { label: 'Filed', value: h.identity.filingDate },
    { label: 'Priority', value: h.identity.priorityDate },
    { label: 'Official sub-status', value: h.status.officialSubStatus },
  ];
  const panels: Record<string, ReactNode> = {
    status: <StatusPanel vm={vm} />,
    deadlines: <Placeholder text="This application's deadlines are listed on your Deadlines page." />,
    documents: <Placeholder text="Documents filed for this application appear here." />,
    costs: <Placeholder text="Costs for this application appear here." />,
    family: <Placeholder text="Related applications in this family appear here." />,
  };

  return (
    <>
      <Breadcrumbs trail={['Portfolio', h.identity.officialNumber]} />
      <div className="detail-grid">
        <div>
          <ObjectHeader
            title={`Application ${h.identity.officialNumber}`}
            identity={identity}
            lifecycle={{ label: h.status.lifecycle }}
            attention={h.status.attention}
            whoseTurn={h.whoseTurn}
            nextAction={h.nextAction}
            tabs={h.tabs}
            activeTab={active}
            onTab={setActive}
            showTabs={false}
          />
          {/* "'Closed' never without its reason" (P4:§11.3) */}
          {h.status.closedReason && (
            <p className="text-muted" role="note">Closed — {h.status.closedReason}</p>
          )}
          <div className="status-pair"><WhoseTurn whoseTurn={h.whoseTurn} /></div>
          <TabbedSections tabs={h.tabs} active={active} onSelect={setActive} panels={panels} label="Application sections" />
        </div>
        <RelationshipRail items={h.relationshipRail} />
      </div>
    </>
  );
}
