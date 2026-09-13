/**
 * ALDASSIST Phase 8 — object-page header (Phase 7 C.2 skeleton): Identity → status pair → next action → tabs.
 * Presentation-generic: it receives already-resolved display props (the screen maps its object's
 * lifecycle → chip label/icon), so the header never needs to know the object taxonomy.
 */
import type { KeyValue, AttentionState, WhoseTurn as WhoseTurnVM, NextActionVM, TabRef } from '../contract';
import { StateChip, AttentionMarker, WhoseTurn, Button } from '../components';
import type { IconName } from '../components';
import { Tabs } from './Tabs';

export interface ObjectHeaderProps {
  title: string;
  identity: KeyValue[];
  lifecycle: { label: string; icon?: IconName };
  attention: AttentionState;
  whoseTurn: WhoseTurnVM;
  nextAction: NextActionVM;
  tabs: TabRef[];
  activeTab: string;
  onTab: (id: string) => void;
}

export function ObjectHeader(props: ObjectHeaderProps) {
  const { title, identity, lifecycle, attention, whoseTurn, nextAction, tabs, activeTab, onTab } = props;
  return (
    <div className="object-header">
      <h1>{title}</h1>

      <div className="object-header__identity-grid">
        {identity.map((kv, i) => (
          <span className="kv" key={i}>
            <span className="kv__label">{kv.label}:</span>
            <span className={`kv__value${kv.mono ? ' mono' : ''}`}>{kv.value}</span>
          </span>
        ))}
      </div>

      {/* Two-axis status pair — the two axes are separate elements and never merge (CR-4). */}
      <div className="status-pair">
        <StateChip label={lifecycle.label} icon={lifecycle.icon} />
        <AttentionMarker attention={attention} />
        <WhoseTurn whoseTurn={whoseTurn} />
      </div>

      {/* Exactly one next action; "Nothing needed" is a valid, calm resolution. */}
      <div className="next-action-row">
        {nextAction.nothingNeeded ? (
          <span className="whose-turn">{nextAction.label}</span>
        ) : (
          <Button variant={nextAction.emphasis}>{nextAction.label}</Button>
        )}
      </div>

      <Tabs tabs={tabs} active={activeTab} onSelect={onTab} />
    </div>
  );
}
