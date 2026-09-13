/**
 * ALDASSIST Phase 8 — Relationship rail (Catalogue; P4:§12.5). Every related object one click away.
 */
import type { RelatedObjectRef } from '../contract';

export function RelationshipRail({ items }: { items: RelatedObjectRef[] }) {
  return (
    <aside className="rel-rail" aria-label="Related objects">
      <div className="rel-rail__title">Related</div>
      {items.map((r) => (
        <a key={r.id} className="rel-rail__item" href="#" onClick={(e) => e.preventDefault()}>
          {r.label}
        </a>
      ))}
    </aside>
  );
}
