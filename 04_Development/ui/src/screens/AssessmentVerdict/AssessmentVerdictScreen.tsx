/**
 * ALDASSIST Phase 8 — SC-C08 Assessment detail / verdict (the ★★ trust-critical screen).
 * Composes the trust primitives. Enforced by construction: no verdict is rendered before human release
 * (CR-2); every verified assertion resolves its citation or is shown unverified (CR-6); confidence states
 * its basis and is never a legal determination (AP-05); coverage never collapses by default on
 * unfavourable (CR-6); the two-axis status is always shown (CR-4).
 *
 * CR-5 (cross-tenant invisibility): the `not-found` branch renders a uniform "does not exist" page and
 * NOTHING about the protected object — no breadcrumb, id, title, tabs, status, rail, or assessment
 * identity. Object-derived context (incl. the breadcrumb) is rendered ONLY in the `ready` branch.
 */
import { useState } from 'react';
import type { Loaded, AssessmentVM, AssessmentLifecycle, VerdictLabel, WhoseTurn as WhoseTurnVM } from '../../contract';
import type { IconName } from '../../components';
import {
  HumanReviewIndicator, ConfidenceIndicator, EvidenceBlock, WhoseTurn, Button, ReferenceView,
} from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ObjectHeader } from '../../shell/ObjectHeader';
import { RelationshipRail } from '../../shell/RelationshipRail';
import { DepthDisclosure } from './DepthDisclosure';

const LIFECYCLE_CHIP: Record<AssessmentLifecycle, { label: string; icon: IconName }> = {
  requested: { label: 'Requested', icon: 'waiting' },
  analysing: { label: 'Analysing', icon: 'waiting' },
  'in-review': { label: 'In review', icon: 'waiting' },
  released: { label: 'Released', icon: 'success' },
  decided: { label: 'Decided', icon: 'success' },
};

const VERDICT_LABEL: Record<VerdictLabel, string> = {
  'looks-protectable': 'Looks protectable',
  'protectable-with-changes': 'Protectable with changes',
  'unlikely-to-be-protectable': 'Unlikely to be protectable',
  'not-enough-to-assess': 'Not enough to assess',
};

export function AssessmentVerdictScreen({ loaded }: { loaded: Loaded<AssessmentVM> }) {
  const [activeTab, setActiveTab] = useState('overview');

  // --- availability states: NO object-derived context is rendered ----------
  if (loaded.state === 'not-found') {
    // Cross-tenant 404: uniform "does not exist" — reveals nothing about the object (CR-5).
    return (
      <div className="state-panel" role="status">
        <p>This page does not exist.</p>
      </div>
    );
  }
  if (loaded.state === 'loading') {
    return (
      <div aria-busy="true" aria-label="Loading">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--wide" />
        <div className="skeleton" />
        <div className="skeleton skeleton--wide" />
      </div>
    );
  }
  if (loaded.state === 'empty') {
    return (
      <div className="state-panel">
        <p>{loaded.empty.teaches}</p>
        <Button variant="primary">{loaded.empty.action.label}</Button>
      </div>
    );
  }
  if (loaded.state === 'error') {
    return (
      <div className="state-panel">
        <p>{loaded.error.reason}</p>
        <p style={{ color: 'var(--color-text-muted)' }}>{loaded.error.nextStep}</p>
      </div>
    );
  }
  if (loaded.state === 'permission-denied') {
    // Same-tenancy: visible-but-locked, with a reason and who to ask — distinct from the 404 (CR-12).
    return (
      <div className="state-panel state-panel--locked" role="status">
        <p>{loaded.denied.reason}</p>
        <p style={{ color: 'var(--color-text-muted)' }}>{loaded.denied.whoCanAct}</p>
      </div>
    );
  }

  // --- ready: object-derived context is safe to render ---------------------
  const a = loaded.data;
  const chip = LIFECYCLE_CHIP[a.header.status.lifecycle];
  const inventionRef = a.header.relationshipRail.find((r) => r.kind === 'invention');
  const trail = ['Inventions', inventionRef?.label ?? 'Invention', 'Assessment'];

  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="detail-grid">
        <div>
          <ObjectHeader
            title={a.header.title}
            identity={a.header.identity}
            lifecycle={chip}
            attention={a.header.status.attention}
            whoseTurn={a.header.whoseTurn}
            nextAction={a.header.nextAction}
            tabs={a.header.tabs}
            activeTab={activeTab}
            onTab={setActiveTab}
          />
          {a.status === 'analysing' || a.status === 'in-review' ? (
            <PreReleasePanel whoseTurn={a.header.whoseTurn} status={a.status} />
          ) : (
            <Verdict data={a} labelText={VERDICT_LABEL} />
          )}
        </div>
        <RelationshipRail items={a.header.relationshipRail} />
      </div>
    </>
  );
}

/** Pre-release: lifecycle + whose-turn + expected turnaround. NEVER a partial/unreviewed verdict (BR-01). */
function PreReleasePanel({ whoseTurn, status }: { whoseTurn: WhoseTurnVM; status: 'analysing' | 'in-review' }) {
  return (
    <div className="state-panel">
      <h2 style={{ marginBottom: 'var(--space-3)' }}>{status === 'analysing' ? 'Analysing' : 'In review'}</h2>
      <p>
        {status === 'analysing'
          ? 'The automated analysis is running. You will be notified — there is no need to wait here.'
          : 'A Verified Agent is reviewing the analysis. The verdict is shown only after their review.'}
      </p>
      <WhoseTurn whoseTurn={whoseTurn} />
    </div>
  );
}

function Verdict({
  data,
  labelText,
}: {
  data: Extract<AssessmentVM, { status: 'released' }>;
  labelText: Record<VerdictLabel, string>;
}) {
  const v = data.verdict;
  const isUnfavourable = v.depth1.label === 'unlikely-to-be-protectable' || v.depth1.label === 'not-enough-to-assess';

  return (
    <article>
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <HumanReviewIndicator reviewerName={v.review.reviewerName} releasedAt={v.review.releasedAt} />
      </div>

      <div className="verdict__label">{labelText[v.depth1.label]}</div>
      <p className="verdict__meaning">{v.depth1.plainMeaning}</p>
      <div style={{ maxWidth: 'var(--layout-container-reading-max)', margin: 'var(--space-4) 0' }}>
        <ConfidenceIndicator confidence={v.depth1.confidence} />
      </div>
      {v.depth1.recommendedNextSteps.length > 0 && (
        <ul>
          {v.depth1.recommendedNextSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}

      {v.alternatives && (
        <div className="alternatives">
          <h3>Alternatives</h3>
          <div className="alternatives__grid">
            <div className="alternatives__card"><h4>Design around</h4>{v.alternatives.designAround}</div>
            <div className="alternatives__card"><h4>Trade secret</h4>{v.alternatives.tradeSecret}</div>
            <div className="alternatives__card"><h4>Defensive publication</h4>{v.alternatives.defensivePublication}</div>
            <div className="alternatives__card"><h4>Defer &amp; re-assess</h4>{v.alternatives.deferAndReassess}</div>
          </div>
        </div>
      )}

      {/* Depth 2 — AI-authored reasoning; references presented with a resolvable citation carry the
          same provenance affordance (CR-6). */}
      <DepthDisclosure depth={2} title="Reasoning">
        <div className="ai-marker">
          <span className="ai-marker__label">AI-generated analysis</span>
          {v.depth2.elements.map((el, i) => (
            <div className="reasoning-el" key={i}>
              <div className="reasoning-el__el">{el.element}</div>
              <div>{el.finding}</div>
              <ul>
                {el.references.map((r, j) => (
                  <ReferenceView key={j} reference={r} />
                ))}
              </ul>
            </div>
          ))}
          {v.depth2.statutoryExclusion.map((s, i) => (
            <p key={i}>
              <strong>{s.provision}.</strong> {s.analysis}
            </p>
          ))}
        </div>
      </DepthDisclosure>

      {/* Depth 3 — evidence. Default-open on unfavourable so coverage is never collapsed by default. */}
      <DepthDisclosure depth={3} title="Evidence" defaultOpen={isUnfavourable}>
        <EvidenceBlock evidence={v.depth3} />
      </DepthDisclosure>
    </article>
  );
}
