/**
 * ALDASSIST Phase 8 — SC-C20 Settings (B5). Profile · Workspace & members · Notifications · Billing ·
 * Security · Data. Two governance shapes are encoded structurally:
 *  - Open decisions are SLOT CONTAINERS, never filled: the per-class notification channel default (S-7),
 *    the client MFA policy (S-10) and data residency (L7) render as "not yet set" panels — no invented
 *    default is shown (CR-19). A container is not a broken control; it explains what will appear once set.
 *  - Owner-only controls (billing, workspace deletion) are shown VISIBLE-BUT-LOCKED to other roles with a
 *    reason + who can act (IP-15) — never hidden (no silent gap) and never an auto-escalation.
 * "Critical notifications cannot be muted" is stated here (P4:§18.2), matching the SC-C21 enforcement.
 */
import type { Loaded, SettingsVM, LockInfo, SlotValue } from '../../contract';
import { Icon, PriceDisplay } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

/** A SlotValue rendered as a CONTAINER — never a fabricated value (CR-19). Filled only when resolved. */
function SlotContainer({ slot, label }: { slot: SlotValue<string>; label: string }) {
  if (slot.status === 'resolved') {
    return <p className="kv__value">{slot.value}</p>;
  }
  const note = slot.status === 'pending-slot'
    ? 'is not configured yet — the setting will appear here once it is set.'
    : 'is temporarily unavailable — it will appear here again shortly.';
  return (
    <div className="state-panel" role="note">
      <p className="text-muted">{label} {note}</p>
    </div>
  );
}

/** Owner-only control shown visible-but-locked: reason + who can act, never hidden (IP-15). */
function LockNote({ locked }: { locked: LockInfo }) {
  return (
    <p className="lock-banner" role="status">
      <Icon name="locked" /> {locked.reason} <span className="text-muted">{locked.whoCanAct}</span>
    </p>
  );
}

export function SettingsScreen({ loaded }: { loaded: Loaded<SettingsVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Settings']} />
      <h1>Settings</h1>

      {/* Profile */}
      <section>
        <h2 className="section-heading">Profile</h2>
        <p className="text-muted">{vm.profileNote}</p>
      </section>

      {/* Workspace & members */}
      <section>
        <h2 className="section-heading">Workspace</h2>
        <dl className="detail-grid">
          <div className="kv"><dt className="kv__label">Name</dt><dd className="kv__value">{vm.workspaceName}</dd></div>
        </dl>
        <h3 className="section-heading">Members</h3>
        <ul className="version-list">
          {vm.members.map((m) => (
            <li className="version" key={m.name}>
              <span className="version__id">{m.name}</span>
              <span className="text-muted">{m.role}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Notifications */}
      <section>
        <h2 className="section-heading">Notifications</h2>
        {/* Stated here and enforced on SC-C21: Critical is unmutable. */}
        <p className="lock-banner" role="status">
          <Icon name="at-risk" /> {vm.notifications.criticalNote}
        </p>
        <dl className="detail-grid">
          <div className="kv">
            <dt className="kv__label">Default channel</dt>
            <dd><SlotContainer slot={vm.notifications.channelDefault} label="The per-class default channel" /></dd>
          </div>
        </dl>
      </section>

      {/* Billing — Owner-only. Figures cross the L1 boundary via PriceDisplay (the only money renderer);
          amounts stay pending-slot and O-2026-001 stays OPEN. Admin/non-Owner see it visible-but-locked. */}
      <section>
        <h2 className="section-heading">Billing</h2>
        <p className="text-muted">{vm.billing.note}</p>
        <PriceDisplay price={vm.billing.price} />
        {vm.billing.locked && <LockNote locked={vm.billing.locked} />}
      </section>

      {/* Security */}
      <section>
        <h2 className="section-heading">Security</h2>
        <dl className="detail-grid">
          <div className="kv">
            <dt className="kv__label">Multi-factor authentication</dt>
            <dd><SlotContainer slot={vm.security.mfaPolicy} label="The workspace MFA policy" /></dd>
          </div>
          <div className="kv"><dt className="kv__label">Active sessions</dt><dd className="kv__value">{vm.security.sessionsNote}</dd></div>
          <div className="kv"><dt className="kv__label">Access log</dt><dd className="kv__value">{vm.security.accessLogNote}</dd></div>
        </dl>
      </section>

      {/* Data */}
      <section>
        <h2 className="section-heading">Data</h2>
        <dl className="detail-grid">
          <div className="kv">
            <dt className="kv__label">Data residency</dt>
            <dd><SlotContainer slot={vm.data.residency} label="Data residency" /></dd>
          </div>
          <div className="kv"><dt className="kv__label">Export</dt><dd className="kv__value">{vm.data.exportNote}</dd></div>
          <div className="kv"><dt className="kv__label">Retention</dt><dd className="kv__value">{vm.data.retentionNote}</dd></div>
        </dl>
        <h3 className="section-heading">Delete workspace data</h3>
        <p className="text-muted">{vm.data.deletion.note}</p>
        {vm.data.deletion.locked && <LockNote locked={vm.data.deletion.locked} />}
      </section>
    </>
  );
}
