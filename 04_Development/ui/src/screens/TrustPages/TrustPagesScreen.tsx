/**
 * ALDASSIST Phase 8 — SC-P14 Trust pages (grouped) (B8). Structured, honest disclosure. Model providers
 * are named publicly (AI page); the limitations page states the 18-month blind spot honestly. Legal wording
 * is a LegalContentSlot container (L4 — counsel), never authored here.
 */
import type { Loaded, TrustPageVM } from '../../contract';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { TRUST_LABEL } from '../public-labels';

export function TrustPagesScreen({ loaded }: { loaded: Loaded<TrustPageVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['Trust', TRUST_LABEL[vm.page]]} />
      <h1>{vm.title}</h1>
      {vm.sections.map((s, i) => (
        <section key={i}><h2 className="section-heading">{s.heading}</h2><p>{s.body}</p></section>
      ))}
      {vm.providersNamed && (
        <section><h2 className="section-heading">Model providers</h2>
          <ul>{vm.providersNamed.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </section>
      )}
      {vm.blindSpotNote && <p className="lock-banner" role="status">{vm.blindSpotNote}</p>}
      <p className="text-muted">
        {vm.legalWording.status === 'pending-legal'
          ? `Legal wording on this page follows counsel review (${vm.legalWording.slotId}).`
          : vm.legalWording.text}
      </p>
    </>
  );
}
