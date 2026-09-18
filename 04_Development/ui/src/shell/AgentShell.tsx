/**
 * ALDASSIST Phase 8 — Agent surface shell (B6). Header + agent local nav + main content region with a
 * skip link. ONE surface at a time — context isolation is a confidentiality boundary (CR-5); the context
 * switcher (SC-A14) never blends surfaces. Reuses the client shell layout classes — no new CSS.
 */
import type { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { AgentSidebar } from './AgentSidebar';

export function AgentShell({ active = 'Today', children }: { active?: string; children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <AppHeader />
      <div className="client-layout">
        <AgentSidebar active={active} />
        <main className="client-main" id="main">
          {children}
        </main>
      </div>
    </>
  );
}
