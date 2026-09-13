/**
 * ALDASSIST Phase 8 — Client surface shell. Header + local nav + main content region with a skip link.
 * One surface at a time (context switch is a confidentiality boundary; not exercised in the B1 slice).
 */
import type { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { ClientSidebar } from './ClientSidebar';

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <AppHeader />
      <div className="client-layout">
        <ClientSidebar active="Inventions" />
        <main className="client-main" id="main">
          {children}
        </main>
      </div>
    </>
  );
}
