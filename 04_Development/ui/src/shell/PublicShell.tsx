/**
 * ALDASSIST Phase 8 — Public surface shell (B8). Anonymous, no authenticated sidebar. Header + main +
 * footer with a skip link. Reuses `.client-main` for the content column — no new CSS.
 */
import type { ReactNode } from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <PublicHeader />
      <main className="client-main" id="main">
        {children}
      </main>
      <PublicFooter />
    </>
  );
}
