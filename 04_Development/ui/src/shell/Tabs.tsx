/**
 * ALDASSIST Phase 8 — object-section navigation (Catalogue 1.5 / P4:§15).
 *
 * B1 note: in this slice the sections do NOT yet switch tabpanels (only "Overview" is realised), so
 * using ARIA `tablist`/`tab`/`tabpanel` semantics would be misleading. This renders as ordinary
 * navigation (a labelled nav with `aria-current` on the active item). When real per-section panels land
 * (B2), this becomes a true tab/tabpanel widget with roving focus and arrow-key selection. Horizontal
 * scroll on mobile, active item always visible, never a dropdown (WP-4 B.3).
 */
import type { TabRef } from '../contract';

export function Tabs({ tabs, active, onSelect }: { tabs: TabRef[]; active: string; onSelect: (id: string) => void }) {
  return (
    <nav className="tabs" aria-label="Object sections">
      {tabs.map((t) => (
        <button
          key={t.id}
          className="tabs__tab"
          aria-current={t.id === active ? 'true' : undefined}
          onClick={() => onSelect(t.id)}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
