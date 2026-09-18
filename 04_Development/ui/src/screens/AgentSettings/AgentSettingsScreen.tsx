/**
 * ALDASSIST Phase 8 — SC-A13 Agent settings (B6). Account · security · notifications · org. MFA is
 * REQUIRED for agents (fixed — not the client-MFA SLOT). Critical notifications cannot be muted (P4:§18.2).
 * The per-class default channel is a SLOT container (S-7), never invented. Org Admin manages agents,
 * capacity, conflicts and billing.
 */
import type { Loaded, AgentSettingsVM, SlotValue } from '../../contract';
import { Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

function Channel({ slot }: { slot: SlotValue<string> }) {
  if (slot.status === 'resolved') return <dd className="kv__value">{slot.value}</dd>;
  return <dd><div className="state-panel" role="note"><p className="text-muted">The per-class default channel is not configured yet — it will appear here once set.</p></div></dd>;
}

export function AgentSettingsScreen({ loaded }: { loaded: Loaded<AgentSettingsVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Settings']} />
      <h1>Agent settings</h1>

      <section>
        <h2 className="section-heading">Account</h2>
        <p className="text-muted">{vm.accountNote}</p>
      </section>

      <section>
        <h2 className="section-heading">Security</h2>
        <dl className="detail-grid">
          <div className="kv"><dt className="kv__label">Multi-factor authentication</dt><dd className="kv__value">{vm.security.mfaNote}</dd></div>
          <div className="kv"><dt className="kv__label">Active sessions</dt><dd className="kv__value">{vm.security.sessionsNote}</dd></div>
        </dl>
      </section>

      <section>
        <h2 className="section-heading">Notifications</h2>
        <p className="lock-banner" role="status"><Icon name="at-risk" /> {vm.notifications.criticalNote}</p>
        <dl className="detail-grid">
          <div className="kv"><dt className="kv__label">Default channel</dt><Channel slot={vm.notifications.channelDefault} /></div>
        </dl>
      </section>

      <section>
        <h2 className="section-heading">Organisation</h2>
        <dl className="detail-grid">
          <div className="kv"><dt className="kv__label">Conflict list</dt><dd className="kv__value">{vm.org.conflictListNote}</dd></div>
          <div className="kv"><dt className="kv__label">Members</dt><dd className="kv__value">{vm.org.membersNote}</dd></div>
        </dl>
      </section>
    </>
  );
}
