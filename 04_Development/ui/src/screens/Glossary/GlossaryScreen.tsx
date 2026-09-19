/**
 * ALDASSIST Phase 8 — SC-P10 Glossary (grouped: index + term) (B8). Public terminology surface, rendered
 * from the SAME record as in-product tooltips — the two cannot diverge (P4:§24.2). Dual-register:
 * plain-language + term-of-art definition (P4:§10.1).
 */
import type { Loaded, GlossaryVM } from '../../contract';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function GlossaryScreen({ loaded }: { loaded: Loaded<GlossaryVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  if (vm.mode === 'index' && vm.index) {
    return (
      <>
        <Breadcrumbs trail={['Learn', 'Glossary']} />
        <h1>Glossary</h1>
        <ul className="version-list">
          {vm.index.terms.map((t) => <li className="version" key={t.slug}><span className="version__id">{t.term}</span><span className="text-muted">{t.plain}</span></li>)}
        </ul>
      </>
    );
  }
  const t = vm.term!;
  return (
    <>
      <Breadcrumbs trail={['Learn', 'Glossary', t.term]} />
      <h1>{t.term}</h1>
      <dl className="detail-grid">
        <div className="kv"><dt className="kv__label">In plain language</dt><dd className="kv__value">{t.plainLanguage}</dd></div>
        <div className="kv"><dt className="kv__label">Term of art</dt><dd className="kv__value">{t.termOfArt}</dd></div>
        <div className="kv"><dt className="kv__label">Usage</dt><dd className="kv__value">{t.usage}</dd></div>
        <div className="kv"><dt className="kv__label">Jurisdiction</dt><dd className="kv__value">{t.jurisdiction}</dd></div>
      </dl>
      <p className="text-muted">Related: {t.related.map((r) => r.term).join(', ')}</p>
      <p className="text-muted">{t.sharedRecordNote}</p>
    </>
  );
}
