/**
 * ALDASSIST Phase 8 — Citation / evidence panel (Catalogue 8.4). Accessible modal dialog with a REAL
 * focus trap: role=dialog + aria-modal, focus moved in on open and restored to the trigger on close,
 * Tab / Shift+Tab cannot leave the dialog, Escape and backdrop close it. (Interim hand-rolled dialog;
 * Radix adoption scheduled for B2+ where interactive complexity grows.)
 */
import { useCallback, useEffect, useRef, type ReactNode } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CitationPanel({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const focusables = useCallback((): HTMLElement[] => {
    const root = dialogRef.current;
    if (!root) return [];
    // Exclude explicitly hidden nodes; do not rely on layout (offsetParent) so this works under jsdom too.
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true',
    );
  }, []);

  // Move focus in on open; restore to the triggering element on close/unmount.
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const first = focusables()[0] ?? dialogRef.current;
    first?.focus();
    return () => {
      restoreRef.current?.focus?.();
    };
  }, [open, focusables]);

  // Escape to close; Tab / Shift+Tab wrap within the dialog (the focus trap).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        dialogRef.current?.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!dialogRef.current?.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open, onClose, focusables]);

  if (!open) return null;
  return (
    <div className="dialog-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog" role="dialog" aria-modal="true" aria-label={title} ref={dialogRef} tabIndex={-1}>
        <h2 style={{ fontSize: 'var(--font-size-600)' }}>{title}</h2>
        {children}
        <div style={{ marginTop: 'var(--space-5)' }}>
          <button className="btn btn--secondary" onClick={onClose}>
            Back to the assessment
          </button>
        </div>
      </div>
    </div>
  );
}
