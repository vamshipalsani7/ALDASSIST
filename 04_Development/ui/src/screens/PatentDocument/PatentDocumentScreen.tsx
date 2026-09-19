/**
 * ALDASSIST Phase 8 — SC-P03 Patent Document page ★ (B8). SEO crown-jewel; genuine added value over the
 * register. Bibliographic header + tabbed sections. The AI plain-language summary is LABELLED AI (CR-6),
 * distinct from register content. Status timeline carries source + freshness PER field. Sparse register
 * fields are shown as "not available from the register" — never fabricated. FR-S11 own-invention warning
 * routes to the Vault. Save/alert is account-gated. Register unavailable → cached + staleness (ScreenState).
 */
import { useState } from 'react';
import type { Loaded, PatentDocumentVM } from '../../contract';
import { Button, Icon, AiAuthorshipMarker } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { Tabs } from '../../shell/Tabs';
import { ScreenState } from '../../shell/ScreenState';

export function PatentDocumentScreen({ loaded }: { loaded: Loaded<PatentDocumentVM> }) {
  const [tab, setTab] = useState('overview');
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const h = vm.header;

  return (
    <>
      <Breadcrumbs trail={['Search', h.number]} />
      <div className="index-head"><h1>{h.number} · {h.jurisdiction}</h1></div>
      <dl className="detail-grid">
        <div className="kv"><dt className="kv__label">Title</dt><dd className="kv__value">{h.title}</dd></div>
        <div className="kv"><dt className="kv__label">Applicant</dt><dd className="kv__value">{h.applicant}</dd></div>
        <div className="kv"><dt className="kv__label">Inventors</dt><dd className="kv__value">{h.inventors}</dd></div>
        <div className="kv"><dt className="kv__label">Filing date</dt><dd className="kv__value mono">{h.filingDate}</dd></div>
      </dl>
      {vm.ownInventionWarning && <p className="lock-banner" role="status"><Icon name="at-risk" /> {vm.ownInventionWarning}</p>}
      <p className="text-muted">{vm.sparseNote}</p>
      <div className="next-action-row"><Button variant={vm.saveAlert.emphasis}>{vm.saveAlert.label}{vm.saveAlert.gated ? ' (needs a free account)' : ''}</Button></div>

      <Tabs tabs={vm.tabs} active={tab} onSelect={setTab} />

      {tab === 'overview' && (
        <section className="tabpanel">
          <h2 className="section-heading">Plain-language summary</h2>
          <AiAuthorshipMarker block>
            <p>{vm.aiSummary.text}</p>
          </AiAuthorshipMarker>
        </section>
      )}
      {tab === 'claims' && (
        <section className="tabpanel"><h2 className="section-heading">Claims</h2>
          {vm.claims.length > 0 ? <ul>{vm.claims.map((c, i) => <li key={i}>{c}</li>)}</ul> : <p className="text-muted">not available from the register</p>}
        </section>
      )}
      {tab === 'description' && (
        <section className="tabpanel"><h2 className="section-heading">Description</h2><p>{vm.description}</p></section>
      )}
      {tab === 'status' && (
        <section className="tabpanel"><h2 className="section-heading">Status</h2>
          <ul className="version-list">
            {vm.statusTimeline.map((s, i) => (
              <li className="version" key={i}><span className="version__id">{s.event}</span><span className="version__time mono">{s.date}</span><span className="text-muted">source: {s.freshness.source}{s.freshness.stale ? ' · last-known' : ''}</span></li>
            ))}
          </ul>
        </section>
      )}
      {tab === 'family' && (
        <section className="tabpanel"><h2 className="section-heading">Family</h2>
          {vm.family.length > 0
            ? <ul className="version-list">{vm.family.map((f, i) => <li className="version" key={i}><span className="version__id mono">{f.number}</span><span>{f.jurisdiction}</span><span className="text-muted">{f.relation}</span></li>)}</ul>
            : <p className="text-muted">not available from the register</p>}
        </section>
      )}
      {tab === 'citations' && (
        <section className="tabpanel"><h2 className="section-heading">Citations</h2>
          <p className="text-muted">Cites: {vm.citations.cites.map((c) => `${c.number} (${c.jurisdiction})`).join(', ') || '—'}</p>
          <p className="text-muted">Cited by: {vm.citations.citedBy.map((c) => `${c.number} (${c.jurisdiction})`).join(', ') || '—'}</p>
        </section>
      )}
      {tab === 'documents' && (
        <section className="tabpanel"><h2 className="section-heading">Documents</h2>
          <ul className="version-list">{vm.documents.map((d, i) => <li className="version" key={i}><span className="version__id">{d.label}</span></li>)}</ul>
        </section>
      )}
    </>
  );
}
