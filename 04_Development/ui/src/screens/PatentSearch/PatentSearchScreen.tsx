/**
 * ALDASSIST Phase 8 — SC-P02 Patent Search (B8). The free wedge — full Zone-2 register search, no account.
 * The public register search is visually/behaviourally DISTINCT from the authenticated app search (Zone-2
 * vs Zone-1). A confidentiality notice + own-invention warning route a suspected own invention to the Vault
 * (FR-S11). Register data carries source + freshness (FR-S05); zero results teach honestly (via ScreenState
 * empty); upstream failure → cached + staleness, never an error page. Save/alert is account-gated.
 */
import type { Loaded, PatentSearchVM } from '../../contract';
import { Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function PatentSearchScreen({ loaded }: { loaded: Loaded<PatentSearchVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Search']} />
      {/* Zone-2 register search — clearly labelled as the public register, distinct from the app. */}
      <div className="index-head"><h1>Search the public register</h1></div>
      <p className="lock-banner" role="note"><Icon name="info" /> {vm.confidentialityNotice}</p>
      {vm.ownInventionWarning && <p className="lock-banner" role="status"><Icon name="at-risk" /> {vm.ownInventionWarning}</p>}
      <p className="text-muted">Zone 2 · public register · source: {vm.freshness.source}{vm.freshness.stale ? ' · showing last-known value' : ''}</p>

      <div className="detail-grid">
        <div>
          <table className="index-table">
            <caption className="sr-only">Register results for "{vm.query}"</caption>
            <thead><tr><th scope="col">Number</th><th scope="col">Jurisdiction</th><th scope="col">Title</th><th scope="col">Applicant</th><th scope="col">Legal status</th><th scope="col">Source</th></tr></thead>
            <tbody>
              {vm.results.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{r.number}</td>
                  <td>{r.jurisdiction}</td>
                  <td>{r.title}</td>
                  <td>{r.applicant}</td>
                  <td>{r.legalStatus}</td>
                  <td className="text-muted">{r.freshness.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="next-action-row"><Button variant={vm.saveSearch.emphasis}>{vm.saveSearch.label}{vm.saveSearch.gated ? ' (needs a free account)' : ''}</Button></div>
        </div>
        <aside className="rel-rail" aria-label="Filters">
          <div className="rel-rail__title">Filters</div>
          {vm.facets.map((f) => (
            <div key={f.id}>
              <div className="section-heading">{f.label}</div>
              {f.options.map((o) => <a key={o.label} className="rel-rail__item" href="#" onClick={(e) => e.preventDefault()}>{o.label} ({o.count})</a>)}
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
