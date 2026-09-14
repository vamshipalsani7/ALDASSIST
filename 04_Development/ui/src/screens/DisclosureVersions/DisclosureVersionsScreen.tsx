/**
 * ALDASSIST Phase 8 — SC-C05 Disclosure current + version history (B2).
 * Shows the current Disclosure and the immutable conception-evidence trail (IP-02): each save is a new,
 * timestamped, immutable version; corrections are new versions, never edits. A version referenced by a
 * released Assessment or a filing is LOCKED and marked immutable (BR-20). Timestamps are real text,
 * never colour/badge-only. CR-5: the `not-found` branch reveals nothing about the object.
 */
import type { Loaded, DisclosureVersionsVM, DisclosureVersionVM } from '../../contract';
import { Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

function VersionRow({ v }: { v: DisclosureVersionVM }) {
  return (
    <li className="version">
      <span className="version__id mono">{v.version}{v.isCurrent && <span className="version__current"> · current</span>}</span>
      <span className="version__time">{v.savedAt}</span>
      {v.immutable ? (
        <span className="version__lock"><Icon name="locked" /> Immutable{v.referencedBy ? ` — ${v.referencedBy}` : ''}</span>
      ) : (
        <span className="text-muted">Editable draft version</span>
      )}
    </li>
  );
}

export function DisclosureVersionsScreen({ loaded }: { loaded: Loaded<DisclosureVersionsVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Inventions', vm.inventionId, 'Disclosure', 'Versions']} />
      <h1>Disclosure versions</h1>
      <p className="text-muted">Every save writes a new, timestamped version. Prior versions are never changed or deleted.</p>

      <h2 className="section-heading">Current</h2>
      <ul className="version-list"><VersionRow v={vm.current} /></ul>

      <h2 className="section-heading">History</h2>
      <ul className="version-list">
        {vm.history.map((v) => <VersionRow key={v.version + v.savedAt} v={v} />)}
      </ul>
    </>
  );
}
