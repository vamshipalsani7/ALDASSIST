/**
 * ALDASSIST Phase 8 — public footer (B8). Trust + Company/Legal links on every public page (P4:§12.2).
 * Reuses the existing `.facets` chip classes — no new CSS.
 */
const TRUST = ['Security', 'AI policy', 'Limitations', 'Subprocessors', 'Status'];
const LEGAL = ['About', 'Terms', 'Privacy', 'Disclaimer'];

export function PublicFooter() {
  return (
    <footer role="contentinfo">
      <div className="section-heading">Trust</div>
      <nav aria-label="Trust" className="facets">
        {TRUST.map((t) => <a key={t} className="facet" href="#" onClick={(e) => e.preventDefault()}>{t}</a>)}
      </nav>
      <div className="section-heading">Company &amp; Legal</div>
      <nav aria-label="Company and legal" className="facets">
        {LEGAL.map((t) => <a key={t} className="facet" href="#" onClick={(e) => e.preventDefault()}>{t}</a>)}
      </nav>
    </footer>
  );
}
