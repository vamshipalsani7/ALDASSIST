/**
 * ALDASSIST Phase 8 — SC-A07 Review workspace ★★ (B6). The human review gate IN ACTION (CR-2/BR-01):
 * two panes — SOURCE (the ONE granted Disclosure version + the AI-generated analysis + cited passages) and
 * WORK (assertions, confidence, the ReviewDecision). The verdict reaches the client ONLY via Release here;
 * there is no bypass. Every assertion is provenance-linked or shown unverified (CR-6 fail-safe, via
 * AssertionView/EvidenceBlock). The grant exposes nothing else (IP-16); no client↔reviewer channel (A2).
 * `not-found` → outside the grant (CR-5). Two panes stack on narrow; the source pane is never removed.
 */
import type { Loaded, ReviewWorkspaceVM } from '../../contract';
import { EvidenceBlock, ConfidenceIndicator, AssertionView, ReferenceView, Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { REVIEW_DECISION } from '../agent-labels';

export function ReviewWorkspaceScreen({ loaded }: { loaded: Loaded<ReviewWorkspaceVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Reviews', 'Review workspace']} />
      <h1>Review workspace</h1>
      <p className="lock-banner" role="note"><Icon name="locked" /> {vm.grantNote}</p>
      <p className="text-muted">{vm.boundaryNote}</p>

      <div className="review-pane">
        {/* SOURCE pane — the granted material (never removed on narrow) */}
        <section aria-label="Source">
          <h2 className="section-heading">Source</h2>
          <p className="text-muted">Disclosure {vm.source.grantedDisclosure.version} · saved {vm.source.grantedDisclosure.savedAt}{vm.source.grantedDisclosure.immutable && <> · <Icon name="locked" /> immutable</>}</p>

          <h3 className="section-heading">Analysis</h3>
          <div className="ai-marker">
            <span className="ai-marker__label">AI-generated analysis</span>
            {vm.source.aiAnalysis.elements.map((el, i) => (
              <div className="reasoning-el" key={i}>
                <div className="reasoning-el__el">{el.element}</div>
                <div>{el.finding}</div>
                <ul>{el.references.map((r, j) => <ReferenceView key={j} reference={r} />)}</ul>
              </div>
            ))}
            {vm.source.aiAnalysis.statutoryExclusion.map((s, i) => (
              <p key={i}><strong>{s.provision}.</strong> {s.analysis}</p>
            ))}
          </div>

          <h3 className="section-heading">Evidence</h3>
          <EvidenceBlock evidence={vm.source.evidence} />
        </section>

        {/* WORK pane — assertions + decision */}
        <section aria-label="Work">
          <h2 className="section-heading">Your review</h2>
          <p className="text-muted">Each assertion is provenance-linked or shown unverified — an unresolved citation is never presented as fact.</p>
          {vm.work.assertions.map((a, i) => <AssertionView key={i} assertion={a} />)}

          <div className="status-pair"><ConfidenceIndicator confidence={vm.work.confidence} /></div>

          <h3 className="section-heading">Decision</h3>
          <ul className="plain-list">
            {vm.work.decisionOptions.map((o) => (
              <li className="notpursued" key={o.type}>
                <div className="status-pair">
                  <Button variant={o.type === 'release' ? 'primary' : 'secondary'}>
                    <Icon name={REVIEW_DECISION[o.type].icon} /> {o.label}
                  </Button>
                </div>
                <p className="text-muted">{o.note}</p>
              </li>
            ))}
          </ul>
          <p className="text-muted">{vm.work.releaseAffordance}</p>
          <p className="text-muted">{vm.work.editsNote}</p>
        </section>
      </div>
    </>
  );
}
