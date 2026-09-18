/**
 * ALDASSIST Phase 8 — context switcher (B6, shared; P4:§2.3). For multi-role users only: switch SURFACES,
 * never blend them — one context at a time is a confidentiality requirement (CR-5). Renders nothing for a
 * single-role user (empty `contexts`). Inert in the fixture harness. Reuses existing facet classes — no CSS.
 */
import type { AgentContextVM } from '../contract';

export function ContextSwitcher({ contexts }: { contexts: AgentContextVM[] }) {
  if (contexts.length === 0) return null; // single-role user → no switcher
  return (
    <div className="facets" role="group" aria-label="Switch context (one at a time)">
      {contexts.map((c) => (
        <a
          key={c.id}
          className="facet"
          href="#"
          aria-current={c.current ? 'true' : undefined}
          onClick={(e) => e.preventDefault()}
        >
          {c.label}{c.current ? ' (current)' : ''}
        </a>
      ))}
    </div>
  );
}
