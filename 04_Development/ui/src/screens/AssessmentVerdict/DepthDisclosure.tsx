/**
 * ALDASSIST Phase 8 — three-depth progressive disclosure (Phase 7 B.3 / §16). Depth 1 always visible;
 * depths 2/3 expand with a consistent affordance and a "you are at depth N" cue; depth 3 is never removed,
 * only nested. On an unfavourable verdict the coverage (depth 3) is never collapsed by default (caller
 * passes defaultOpen).
 */
import { useId, useState, type ReactNode } from 'react';
import { Icon } from '../../components';

export function DepthDisclosure({
  depth,
  title,
  defaultOpen = false,
  children,
}: {
  depth: 2 | 3;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <section className="depth">
      <button className="depth__toggle" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? 'expand' : 'collapse'} />
        <span>{title}</span>
        <span className="depth__marker">· depth {depth}</span>
      </button>
      {open && (
        <div className="depth__body" id={panelId}>
          {children}
        </div>
      )}
    </section>
  );
}
