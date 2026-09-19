/**
 * ALDASSIST Phase 8 — SC-P09 Learn / guides (grouped: index + article) (B8). Authority-tier content built
 * for citation. Fee/timeline figures derive from the Rules Engine, not hand-authored (P4:§24.2). Single
 * content hub. Inline glossary auto-links point at the shared glossary record.
 */
import type { Loaded, GuidesVM } from '../../contract';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function GuidesScreen({ loaded }: { loaded: Loaded<GuidesVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  if (vm.mode === 'index' && vm.index) {
    return (
      <>
        <Breadcrumbs trail={['Learn', 'Guides']} />
        <h1>Guides</h1>
        <ul className="version-list">
          {vm.index.items.map((g) => (
            <li className="version" key={g.slug}><span className="version__id">{g.title}</span><span className="text-muted">{g.summary}</span></li>
          ))}
        </ul>
      </>
    );
  }
  const a = vm.article!;
  return (
    <>
      <Breadcrumbs trail={['Learn', 'Guides', a.title]} />
      <h1>{a.title}</h1>
      <div className="detail-grid">
        <div>
          <p>{a.body}</p>
          <p className="text-muted">{a.figuresNote}</p>
          <h2 className="section-heading">Glossary</h2>
          <p className="text-muted">{a.glossaryLinks.map((g) => (
            <a key={g.term} className="rel-rail__item" href="#" onClick={(e) => e.preventDefault()}>{g.term}</a>
          ))}</p>
        </div>
        <aside className="rel-rail" aria-label="On this page">
          <div className="rel-rail__title">On this page</div>
          {a.toc.map((t) => <a key={t.id} className="rel-rail__item" href="#" onClick={(e) => e.preventDefault()}>{t.label}</a>)}
          <div className="rel-rail__title">Related</div>
          {a.related.map((r) => <span className="rel-rail__item" key={r.label}>{r.label}</span>)}
        </aside>
      </div>
    </>
  );
}
