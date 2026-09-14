/**
 * ALDASSIST Phase 8 — accessible object-section tabs (Catalogue 1.5 / P4:§15), used by SC-C04.
 * A real ARIA tab/tabpanel widget: roving tabindex, arrow/Home/End key selection, one panel visible.
 * (B1's SC-C08 still uses the simpler nav `Tabs`, which had only one realised section.)
 */
import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import type { TabRef } from '../contract';

export function TabbedSections({
  tabs, active, onSelect, panels, label = 'Object sections',
}: {
  tabs: TabRef[];
  active: string;
  onSelect: (id: string) => void;
  panels: Record<string, ReactNode>;
  label?: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const ids = tabs.map((t) => t.id);

  function onKeyDown(e: KeyboardEvent) {
    const i = ids.indexOf(active);
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % ids.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + ids.length) % ids.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = ids.length - 1;
    if (next >= 0) {
      e.preventDefault();
      const id = ids[next];
      onSelect(id);
      refs.current[id]?.focus();
    }
  }

  return (
    <div className="tabbed">
      <div className="tabs" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => { refs.current[t.id] = el; }}
              className="tabs__tab"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(t.id)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className="tabpanel"
        >
          {t.id === active ? panels[t.id] : null}
        </div>
      ))}
    </div>
  );
}
