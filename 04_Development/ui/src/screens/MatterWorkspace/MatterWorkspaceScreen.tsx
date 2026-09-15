/**
 * ALDASSIST Phase 8 — SC-C15 Matter workspace ★ — the engaged-work surface (B4).
 * Always answers the four questions (Where · What's next · Needs you · Cost, P4:§15.4) in every state,
 * including "Nothing needed". Activity timeline carries source + freshness; messaging is confined to this
 * matter (no cross-matter/tenancy channel). The client files nothing — the agent files. The cost cell is a
 * PriceDisplay container (or hidden for roles without cost access). CR-5: `not-found` reveals nothing.
 */
import { useState, type ReactNode } from 'react';
import type { Loaded, MatterWorkspaceVM, CostCellVM } from '../../contract';
import { StateChip, AttentionMarker, WhoseTurn, PriceDisplay, Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { RelationshipRail } from '../../shell/RelationshipRail';
import { TabbedSections } from '../../shell/TabbedSections';
import { ScreenState } from '../../shell/ScreenState';
import { MATTER_CHIP } from '../labels';

function Cost({ cell }: { cell: CostCellVM }) {
  if (cell.kind === 'hidden') return <span className="text-muted">{cell.reason}</span>;
  return <PriceDisplay price={cell.price} />;
}

export function MatterWorkspaceScreen({ loaded }: { loaded: Loaded<MatterWorkspaceVM> }) {
  const [active, setActive] = useState('activity');
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const chip = MATTER_CHIP[vm.status.lifecycle];

  const panels: Record<string, ReactNode> = {
    activity: (
      <ul className="version-list">
        {vm.activity.map((e, i) => (
          <li className="version" key={i}>
            <span className="version__id">{e.event}</span>
            <span className="version__time">{e.date}</span>
            <span className="text-muted">{e.freshness.source}</span>
          </li>
        ))}
        <li className="text-muted">{vm.messagesNote}</li>
      </ul>
    ),
    documents: <div className="state-panel"><p className="text-muted">Documents your agent shares appear here. You review; your agent files.</p></div>,
    decisions: <div className="state-panel"><p className="text-muted">Decisions requested of you in this matter appear here.</p></div>,
    costs: <Cost cell={vm.header.cost} />,
  };

  return (
    <>
      <Breadcrumbs trail={['Matters', vm.ref]} />
      <div className="detail-grid">
        <div>
          <h1>{vm.ref}</h1>
          <div className="status-pair">
            <StateChip label={chip.label} icon={chip.icon} />
            <AttentionMarker attention={vm.status.attention} />
          </div>
          {vm.status.closedReason && <p className="text-muted" role="note">Closed — {vm.status.closedReason}</p>}

          {/* Four-cell header — always answers the four questions (P4:§15.4). */}
          <div className="four-cell">
            <div className="four-cell__cell"><span className="four-cell__label">Where</span><span>{vm.header.where}</span></div>
            <div className="four-cell__cell"><span className="four-cell__label">What's next</span><span>{vm.header.whatsNext}</span></div>
            <div className="four-cell__cell"><span className="four-cell__label">Needs you</span>
              <span>{vm.header.needsYou.nothingNeeded ? 'Nothing needed' : vm.header.needsYou.label}</span>
            </div>
            <div className="four-cell__cell"><span className="four-cell__label">Cost</span><Cost cell={vm.header.cost} /></div>
          </div>

          {!vm.header.needsYou.nothingNeeded && (
            <div className="next-action-row"><Button variant={vm.header.needsYou.emphasis}>{vm.header.needsYou.label}</Button></div>
          )}
          <div className="status-pair"><WhoseTurn whoseTurn={{ actor: vm.status.attention === 'action-needed' ? 'needs-you' : 'nothing-needed' }} /></div>

          <TabbedSections tabs={vm.tabs} active={active} onSelect={setActive} panels={panels} label="Matter sections" />
        </div>
        <RelationshipRail items={vm.relationshipRail} />
      </div>
    </>
  );
}
