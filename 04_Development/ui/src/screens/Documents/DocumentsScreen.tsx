/**
 * ALDASSIST Phase 8 — SC-C17 Documents (B5). All documents with provenance: class · version · source,
 * related matter/application, date. AI-authored vs human-authored content is visually AND structurally
 * distinguishable (IP-07): the authorship cell renders an "AI-generated" marker or the human author's
 * name. A version referenced by a released assessment / filing is immutable (BR-20). Real table semantics.
 */
import type { Loaded, DocumentsIndexVM, Authorship } from '../../contract';
import { Icon, AiAuthorshipMarker } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

function AuthorCell({ authorship }: { authorship: Authorship }) {
  if (authorship.by === 'ai') {
    // AI-authored — a distinct marker, never shown as human-authored (IP-07).
    return <AiAuthorshipMarker />;
  }
  return <span>Human · {authorship.reviewerName}</span>;
}

export function DocumentsScreen({ loaded }: { loaded: Loaded<DocumentsIndexVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Documents']} />
      <div className="index-head">
        <h1>Documents</h1>
        {/* Access-log entry point — who accessed this workspace, incl. any time-boxed support access. A
            navigable link (inert in the fixture harness), mirroring SC-C20 security.accessLogNote. */}
        <a className="rel-rail__item" href="#" onClick={(e) => e.preventDefault()}>{vm.accessLog.label}</a>
      </div>
      <div className="facets" aria-label="Filters">
        {vm.facets.map((f) => <span className="facet" key={f.id}>{f.label} <span className="facet__count">({f.count})</span></span>)}
      </div>

      <table className="index-table">
        <caption className="sr-only">All documents with provenance</caption>
        <thead>
          <tr>
            <th scope="col">Document</th>
            <th scope="col">Class</th>
            <th scope="col">Version</th>
            <th scope="col">Source</th>
            <th scope="col">Author</th>
            <th scope="col">Related</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {vm.rows.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.docClass}</td>
              <td className="mono">
                {d.version}{d.immutable && <span className="version__lock"> <Icon name="locked" /> immutable</span>}
              </td>
              <td>{d.source}</td>
              <td><AuthorCell authorship={d.authorship} /></td>
              <td className="mono">{d.relatedRef}</td>
              <td>{d.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
