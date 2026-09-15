/**
 * ALDASSIST Phase 8 — SC-C18 Agent Matching / Engagement (B4). NEVER "Marketplace" (D-2026-013).
 * Agents are shown only after the conflict check passes (a ready view implies it did; a check that cannot
 * complete fails closed → the `error` state, a temporary hold not a rejection). Each match shows a
 * rationale and a FIXED published price (PriceDisplay container). Outcome statistics are shown only at
 * n≥20 with a confidence indicator; below the floor, "not enough data yet" (D-2026-019) — enforced by the
 * VM's shape. No fabricated matches; no fake urgency. Owner-only entry.
 */
import type { Loaded, MatchingVM, AgentMatchVM } from '../../contract';
import { PriceDisplay, Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

function Stats({ m }: { m: AgentMatchVM }) {
  if (m.stats.status === 'below-floor') return <p className="text-muted">{m.stats.note}</p>;
  // published: n ≥ 20 — always shown WITH the sample size and a confidence indicator (its representation is a slot).
  return (
    <p className="text-muted">
      Based on {m.stats.n} matters (sample size shown). Confidence: {m.stats.confidence.status === 'resolved' ? m.stats.confidence.value : 'representation not set'}.
    </p>
  );
}

function Match({ m }: { m: AgentMatchVM }) {
  return (
    <div className="match-card">
      <h3>{m.name}</h3>
      <p className="match-card__rationale">{m.rationale}</p>
      <p className="text-muted">{m.credentials} · {m.jurisdiction}</p>
      <h4 className="section-heading">Published price</h4>
      <PriceDisplay price={m.publishedPrice} />
      <Stats m={m} />
      <div className="next-action-row"><Button variant="primary">Select this agent — view quote</Button></div>
    </div>
  );
}

export function MatchingScreen({ loaded }: { loaded: Loaded<MatchingVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Find an agent']} />
      <h1>Find an agent</h1>
      <p className="trust-copy"><Icon name="success" /> Conflict check complete — these agents are clear to work with you.</p>
      <p className="text-muted">Agents are matched on your invention's domain and shown with their fixed published prices before you engage.</p>

      {vm.matches.map((m) => <Match key={m.id} m={m} />)}
    </>
  );
}
