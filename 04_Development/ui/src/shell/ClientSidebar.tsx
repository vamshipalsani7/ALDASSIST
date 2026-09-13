/**
 * ALDASSIST Phase 8 — client local nav (Catalogue 1.2 / P4:§12.3). Seven primary items + Settings
 * (visually separated). Inventions ≠ Portfolio kept distinct. Agent-Matching is NOT a nav item (contextual).
 * (B1 renders the nav statically; routing wired in B2.)
 */
const PRIMARY = ['Home', 'Inventions', 'Portfolio', 'Deadlines', 'Matters', 'Costs', 'Documents'];

export function ClientSidebar({ active = 'Inventions' }: { active?: string }) {
  return (
    <nav className="client-sidebar" aria-label="Client navigation">
      {PRIMARY.map((item) => (
        <a
          key={item}
          className="client-sidebar__item"
          href="#"
          aria-current={item === active ? 'page' : undefined}
          onClick={(e) => e.preventDefault()}
        >
          {item}
        </a>
      ))}
      <span className="client-sidebar__sep" />
      <a className="client-sidebar__item" href="#" onClick={(e) => e.preventDefault()}>
        Settings
      </a>
    </nav>
  );
}
