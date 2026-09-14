/**
 * ALDASSIST Phase 8 — shared availability-state renderer for the non-`ready` branches of Loaded<T>.
 * Centralises the states every screen must handle so they stay consistent (B0 §3.1).
 *
 * CR-5 (cross-tenant invisibility): the `not-found` branch renders a UNIFORM "does not exist" page
 * and NOTHING about any protected object — no id, title, breadcrumb, status, or rail. Screens call
 * this before rendering any object-derived context, so a cross-tenant object leaks nothing.
 * CR-12: `permission-denied` (same tenancy) is visible-but-locked with a reason + who can act —
 * distinct from the 404, never a silent escalation.
 */
import type { Loaded } from '../contract';
import { Button } from '../components';

type NonReady = Exclude<Loaded<unknown>, { state: 'ready' }>;

export function ScreenState({ loaded }: { loaded: NonReady }) {
  if (loaded.state === 'not-found') {
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
        <Button variant={loaded.empty.action.emphasis}>{loaded.empty.action.label}</Button>
      </div>
    );
  }
  if (loaded.state === 'error') {
    return (
      <div className="state-panel">
        <p>{loaded.error.reason}</p>
        <p className="text-muted">{loaded.error.nextStep}</p>
      </div>
    );
  }
  // permission-denied (same tenancy): visible-but-locked, reason + who can act (CR-12).
  return (
    <div className="state-panel state-panel--locked" role="status">
      <p>{loaded.denied.reason}</p>
      <p className="text-muted">{loaded.denied.whoCanAct}</p>
    </div>
  );
}
