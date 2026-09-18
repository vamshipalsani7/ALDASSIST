/**
 * ALDASSIST Phase 8 — Operations surface shell (B7). Internal-only (MFA + justification, P4:§2.3).
 * Header + ops local nav + main content region with a skip link. Reuses the client shell layout classes
 * — no new CSS.
 */
import type { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { OpsSidebar } from './OpsSidebar';

export function OpsShell({ active = 'Docket Health', children }: { active?: string; children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <AppHeader />
      <div className="client-layout">
        <OpsSidebar active={active} />
        <main className="client-main" id="main">
          {children}
        </main>
      </div>
    </>
  );
}
