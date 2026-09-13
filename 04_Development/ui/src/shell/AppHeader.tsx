/**
 * ALDASSIST Phase 8 — global header (Catalogue 1.1). Wordmark is ALDASSIST (CR-16), never [Mark]/[Platform].
 * Attention badge = count in "Needs you", one click from every screen (IA-2). role=banner.
 */
import { Icon } from '../components/Icon';

export function AppHeader({ needsYouCount = 1 }: { needsYouCount?: number }) {
  return (
    <header className="app-header" role="banner">
      <span className="app-header__wordmark">ALDASSIST</span>
      <span className="app-header__spacer" />
      <span className="app-header__badge" aria-label={`${needsYouCount} items need you`}>
        <Icon name="notify" size={18} />
        <span>{needsYouCount}</span>
      </span>
    </header>
  );
}
