/**
 * ALDASSIST Phase 8 — Operations local nav (B7). Internal consoles. "Agent Verification" — never
 * "Marketplace" in the UI (CR-16), even though the internal route is /ops/marketplace/verification.
 * ≤2 nav levels. Reuses the client shell nav classes — no new CSS.
 */
const PRIMARY = ['Docket Health', 'Agent Verification', 'Rules', 'Quality', 'Business'];

export function OpsSidebar({ active = 'Docket Health' }: { active?: string }) {
  return (
    <nav className="client-sidebar" aria-label="Operations navigation">
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
    </nav>
  );
}
