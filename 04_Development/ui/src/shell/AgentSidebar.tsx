/**
 * ALDASSIST Phase 8 — agent local nav (B6; Catalogue 1.2 / P4:§6.1/§12.4). Reviews is a TOP-LEVEL agent
 * destination, kept distinct from Matters (docket and review are separate rhythms). "Agent Matching /
 * Engagement" wording — never "Marketplace" (CR-16); the agent-facing surface is "Opportunities".
 * ≤2 nav levels (IA-6). Reuses the client shell nav classes — no new CSS.
 */
const PRIMARY = ['Today', 'Docket', 'Matters', 'Reviews', 'Opportunities', 'Practice'];

export function AgentSidebar({ active = 'Today' }: { active?: string }) {
  return (
    <nav className="client-sidebar" aria-label="Agent navigation">
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
