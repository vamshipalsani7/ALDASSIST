/**
 * ALDASSIST Phase 8 — SC-P01 Public Home (B8). Orients a stranger to the three layers (Record · Judgement
 * · Work) and routes to the wedge (search) or first value. Proof is verifiable artifacts, not testimonial
 * carousels (P4:§4.1). Calm, no urgency theatre; banned marketing terms avoided (P4:§10.3).
 */
import type { Loaded, PublicHomeVM } from '../../contract';
import { Button } from '../../components';
import { ScreenState } from '../../shell/ScreenState';

export function PublicHomeScreen({ loaded }: { loaded: Loaded<PublicHomeVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <section className="state-panel">
        <h1>{vm.hero.headline}</h1>
        <p className="trust-copy">{vm.hero.sub}</p>
        <div className="next-action-row">
          <Button variant={vm.hero.primaryCta.emphasis}>{vm.hero.primaryCta.label}</Button>
          <Button variant={vm.hero.secondaryCta.emphasis}>{vm.hero.secondaryCta.label}</Button>
        </div>
      </section>

      <h2 className="section-heading">How it works</h2>
      <div className="facets">
        {vm.layers.map((l) => (
          <div className="four-cell__cell" key={l.title}><strong>{l.title}</strong><span className="text-muted">{l.body}</span></div>
        ))}
      </div>

      <h2 className="section-heading">Proof, not promises</h2>
      <ul className="version-list">
        {vm.proof.map((p) => <li className="version" key={p.label}><span className="version__id">{p.label}</span></li>)}
      </ul>

      <div className="next-action-row"><Button variant={vm.pathFinder.emphasis}>{vm.pathFinder.label}</Button></div>
    </>
  );
}
