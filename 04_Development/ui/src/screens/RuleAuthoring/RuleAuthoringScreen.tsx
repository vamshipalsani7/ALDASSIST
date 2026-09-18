/**
 * ALDASSIST Phase 8 — SC-O03 Rule Authoring Console ★ (B7). Author/version jurisdiction rules AS DATA
 * (AP-02) — the source of every deadline and official fee (BR-14). The rule's statutory source is
 * provenance-linked (CR-6, via AssertionView). Versions are immutable and reproducible (BR-07). Publication
 * is GATED: it appears only when every golden case passes AND the pre-publication impact is reviewed, and
 * it requires dual control (P3:§4.1). The portfolio-impact count is a pending slot (Phase 9 data). Official
 * fees derive here; how they are DISPLAYED to clients (O-2026-001) stays open elsewhere.
 */
import type { Loaded, RuleAuthoringVM } from '../../contract';
import { StateChip, AssertionView, Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { GOLDEN_RESULT, RULE_VERSION_STATUS } from '../ops-labels';

export function RuleAuthoringScreen({ loaded }: { loaded: Loaded<RuleAuthoringVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Rules', vm.jurisdiction, vm.ruleId]} />
      <h1>Rule Authoring — {vm.ruleId}</h1>
      <p className="text-muted">{vm.jurisdiction} · {vm.editorNote}</p>

      <h2 className="section-heading">Source</h2>
      {/* Statutory source — provenance-linked or shown unverified (CR-6). */}
      <AssertionView assertion={vm.sourceCitation} />

      <h2 className="section-heading">Version history</h2>
      <ul className="version-list">
        {vm.versions.map((v) => (
          <li className="version" key={v.version}>
            <span className="version__id mono">{v.version}</span>
            <StateChip label={RULE_VERSION_STATUS[v.status].label} icon={RULE_VERSION_STATUS[v.status].icon} />
            {v.publishedAt && <span className="version__time mono">{v.publishedAt}</span>}
            <span className="text-muted">{v.note}</span>
          </li>
        ))}
      </ul>

      <h2 className="section-heading">Golden cases</h2>
      <ul className="version-list">
        {vm.goldenCases.map((g) => (
          <li className="version" key={g.id}>
            <span className="version__id">{g.label}</span>
            <StateChip label={GOLDEN_RESULT[g.result].label} icon={GOLDEN_RESULT[g.result].icon} />
          </li>
        ))}
      </ul>

      <h2 className="section-heading">Pre-publication impact</h2>
      <p className="text-muted">{vm.impact.summary}</p>
      <p className="text-muted">
        Affected across the live portfolio: {vm.impact.affectedCount.status === 'resolved'
          ? vm.impact.affectedCount.value
          : 'not yet computed — the impact figure appears here once measured.'}
      </p>

      <h2 className="section-heading">Publish</h2>
      <p className="text-muted">{vm.gate.dualControlNote}</p>
      <p className="text-muted">{vm.feesDeriveNote}</p>
      <div className="next-action-row">
        {/* Publish is present ONLY when tests pass + impact reviewed — a failing suite blocks publication. */}
        {vm.publish
          ? <Button variant={vm.publish.emphasis}>{vm.publish.label}</Button>
          : <span className="lock-banner" role="status"><Icon name="blocked" /> {vm.blockedNote}</span>}
      </div>
    </>
  );
}
