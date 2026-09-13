/**
 * ALDASSIST Phase 8 — Breadcrumbs (Catalogue 1.4). Object-hierarchy location; current = aria-current.
 */
import { Fragment } from 'react';

export function Breadcrumbs({ trail }: { trail: string[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {trail.map((crumb, i) => {
        const last = i === trail.length - 1;
        return (
          <Fragment key={i}>
            {last ? (
              <span aria-current="page">{crumb}</span>
            ) : (
              <>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {crumb}
                </a>
                <span className="breadcrumbs__sep" aria-hidden>
                  /
                </span>
              </>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
