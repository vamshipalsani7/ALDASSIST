/**
 * ALDASSIST Phase 8 — SC-A05 Agent matter detail (brief + work) (B6). Where the agent works an engaged
 * matter to filing. The BRIEF composes the Disclosure + the released Assessment (with provenance, ADR:§11)
 * + client context. The primary act is FILE WITH THE OFFICE — a human agent action, on client approval
 * (BR-09/T3); the platform never files autonomously. Documents distinguish AI-generated vs human-authored
 * (IP-07). Messaging is matter-confined (A2). Billing crosses L1 via PriceDisplay. There is NO drafting /
 * prosecution surface — the agent uploads externally-prepared documents (CR-17). `not-found` → CR-5.
 */
import { useState } from 'react';
import type { Loaded, AgentMatterDetailVM, Authorship } from '../../contract';
import { StateChip, AttentionMarker, WhoseTurn, PriceDisplay, Button, Icon, AiAuthorshipMarker } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { RelationshipRail } from '../../shell/RelationshipRail';
import { Tabs } from '../../shell/Tabs';
import { ScreenState } from '../../shell/ScreenState';
import { MATTER_CHIP, DEADLINE_STATE_CHIP } from '../labels';

function Author({ a }: { a: Authorship }) {
  return a.by === 'ai'
    ? <AiAuthorshipMarker />
    : <span>Human · {a.reviewerName}</span>;
}

export function AgentMatterDetailScreen({ loaded }: { loaded: Loaded<AgentMatterDetailVM> }) {
  const [tab, setTab] = useState('brief');
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Matters', vm.ref]} />
      <div className="detail-grid">
        <div>
          <div className="status-pair">
            <h1>{vm.ref}</h1>
            <StateChip label={MATTER_CHIP[vm.status.lifecycle].label} icon={MATTER_CHIP[vm.status.lifecycle].icon} />
            <AttentionMarker attention={vm.status.attention} />
          </div>
          <p className="text-muted">{vm.where} · {vm.whatsNext}</p>
          <WhoseTurn whoseTurn={vm.whoseTurn} />

          <Tabs tabs={vm.tabs} active={tab} onSelect={setTab} />

          {tab === 'brief' && (
            <section className="tabpanel">
              <h2 className="section-heading">Brief</h2>
              <p className="text-muted">Disclosure {vm.brief.disclosure.version} · saved {vm.brief.disclosure.savedAt}{vm.brief.disclosure.immutable && <> · <Icon name="locked" /> immutable</>}</p>
              <p><strong>Released assessment:</strong> {vm.brief.releasedAssessment.verdictLabel} — reviewed by {vm.brief.releasedAssessment.reviewer}, released {vm.brief.releasedAssessment.releasedAt}</p>
              <p className="text-muted">{vm.brief.releasedAssessment.provenanceNote}</p>
              <p>{vm.brief.clientContext}</p>
            </section>
          )}

          {tab === 'deadlines' && (
            <section className="tabpanel">
              <h2 className="section-heading">Deadlines</h2>
              <ul className="version-list">
                {vm.deadlines.map((d, i) => (
                  <li className="version" key={i}><span className="version__id">{d.label}</span><span className="version__time mono">{d.date}</span><StateChip label={DEADLINE_STATE_CHIP[d.state].label} icon={DEADLINE_STATE_CHIP[d.state].icon} /></li>
                ))}
              </ul>
            </section>
          )}

          {tab === 'documents' && (
            <section className="tabpanel">
              <h2 className="section-heading">Documents</h2>
              <ul className="version-list">
                {vm.documents.map((d, i) => (
                  <li className="version" key={i}>
                    <span className="version__id">{d.label}</span>
                    <Author a={d.author} />
                    <span className="version__time mono">{d.date}</span>
                    {d.immutable && <span className="version__lock"><Icon name="locked" /> immutable</span>}
                  </li>
                ))}
              </ul>
              <p className="text-muted">{vm.uploadNote}</p>
            </section>
          )}

          {tab === 'client' && (
            <section className="tabpanel">
              <h2 className="section-heading">Client</h2>
              <p className="text-muted">{vm.clientThreadNote}</p>
            </section>
          )}

          {tab === 'billing' && (
            <section className="tabpanel">
              <h2 className="section-heading">Billing</h2>
              <PriceDisplay price={vm.billing} />
            </section>
          )}

          <div className="next-action-row"><Button variant={vm.fileAction.emphasis}>{vm.fileAction.label}</Button></div>
          <p className="text-muted">{vm.uploadNote}</p>
        </div>
        <RelationshipRail items={vm.relationshipRail} />
      </div>
    </>
  );
}
