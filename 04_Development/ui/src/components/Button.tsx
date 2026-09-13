/**
 * ALDASSIST Phase 8 — Button (Catalogue 2.1–2.4). One primary per screen (IA-2). ≥44px target.
 * Disabled conveys "why" via the `disabledReason` (rendered by the caller near the control) — I.3.
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

export function Button({
  variant = 'secondary',
  children,
  ...rest
}: { variant?: Variant; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`btn btn--${variant}`} {...rest}>
      {children}
    </button>
  );
}
