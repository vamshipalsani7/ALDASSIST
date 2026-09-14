/**
 * ALDASSIST Phase 8 — SC-C04 Invention detail — the hub for one Invention across its whole life,
 * dignified even in Not pursued (B2). Object skeleton (identity → two-axis status → single next action
 * → tabs → relationship rail). Tabs are a real tab/tabpanel widget. Empty tabs teach and offer the
 * enabling action. CR-5: the `not-found` branch reveals NOTHING about the object.
 */
import { useState } from 'react';
import type { Loaded, InventionDetailVM, InventionTabContent } from '../../contract';
import { Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ObjectHeader } from '../../shell/ObjectHeader';
import { RelationshipRail } from '../../shell/RelationshipRail';
import { TabbedSections } from '../../shell/TabbedSections';
import { ScreenState } from '../../shell/ScreenState';
import { INVENTION_CHIP } from '../labels';

function TabContent({ content }: { content: InventionTabContent }) {
  if (content.kind === 'summary') {
    return (
      <div>
        <p className="verdict__meaning">{content.summary}</p>
        <div className="object-header__identity-grid">
          {content.protectionByJurisdiction.map((kv, i) => (
            <span className="kv" key={i}>
              <span className="kv__label">{kv.label}:</span> <span className="kv__value">{kv.value}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (content.kind === 'related') {
    return (
      <ul className="plain-list">
        {content.items.map((it) => (
          <li key={it.id}><a className="rel-rail__item" href="#" onClick={(e) => e.preventDefault()}>{it.label}</a></li>
        ))}
      </ul>
    );
  }
  // empty: teach one thing + offer the enabling action
  return (
    <div className="state-panel">
      <p>{content.teaches}</p>
      <Button variant={content.action.emphasis}>{content.action.label}</Button>
    </div>
  );
}

export function InventionDetailScreen({ loaded }: { loaded: Loaded<InventionDetailVM> }) {
  const [active, setActive] = useState<string>('overview');
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;

  const vm = loaded.data;
  const chip = INVENTION_CHIP[vm.header.status.lifecycle];
  const panels = Object.fromEntries(vm.tabs.map((t) => [t.id, <TabContent content={t.content} />]));

  return (
    <>
      <Breadcrumbs trail={['Inventions', vm.header.id]} />
      <div className="detail-grid">
        <div>
          <ObjectHeader
            title={vm.header.title}
            identity={vm.header.identity}
            lifecycle={chip}
            attention={vm.header.status.attention}
            whoseTurn={vm.header.whoseTurn}
            nextAction={vm.header.nextAction}
            tabs={vm.header.tabs}
            activeTab={active}
            onTab={setActive}
            showTabs={false}
          />

          {/* Not pursued is a complete, dignified page — not a husk (P4:§15.1). */}
          {vm.notPursued && (
            <div className="notpursued" role="note">
              <p>{vm.notPursued.note}</p>
              {vm.notPursued.alternativesTaken && vm.notPursued.alternativesTaken.length > 0 && (
                <ul>{vm.notPursued.alternativesTaken.map((a, i) => <li key={i}>{a}</li>)}</ul>
              )}
            </div>
          )}

          <TabbedSections tabs={vm.header.tabs} active={active} onSelect={setActive} panels={panels} label="Invention sections" />
        </div>
        <RelationshipRail items={vm.header.relationshipRail} />
      </div>
    </>
  );
}
