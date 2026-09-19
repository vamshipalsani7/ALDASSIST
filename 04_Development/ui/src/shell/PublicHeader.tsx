/**
 * ALDASSIST Phase 8 — public global header (B8). Wordmark ALDASSIST (CR-16). Public top-nav; the public
 * register Search is Zone-2 and visually/behaviourally distinct from the authenticated app search. Reuses
 * the existing `.app-header` classes — no new CSS.
 */
const NAV = ['Solutions', 'For Agents', 'Pricing', 'Tools', 'Learn', 'Trust', 'Search'];

export function PublicHeader() {
  return (
    <header className="app-header" role="banner">
      <span className="app-header__wordmark">ALDASSIST</span>
      <nav aria-label="Public navigation" className="facets">
        {NAV.map((item) => (
          <a key={item} className="facet" href="#" onClick={(e) => e.preventDefault()}>{item}</a>
        ))}
      </nav>
      <span className="app-header__spacer" />
      <a className="btn btn--primary" href="#" onClick={(e) => e.preventDefault()}>Start free</a>
    </header>
  );
}
