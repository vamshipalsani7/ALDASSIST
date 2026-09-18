/**
 * ALDASSIST Phase 8 — SC-A14 Agent notification centre + context switcher (B6). Notifications grouped by
 * CLASS in the fixed order (P4:§18.2), enforced by the screen; a Critical notification is unmutable and
 * offers only Acknowledge & act (no mute / no bare dismiss). The context switcher appears only for
 * multi-role users and switches SURFACES — one context at a time, never blended (CR-5). Object references
 * are real links.
 */
import type { Loaded, AgentNotificationsVM, NotificationGroupVM, NotificationClass } from '../../contract';
import { Button, Icon, WhoseTurn } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { ObjectLink } from '../../shell/ObjectLink';
import { ContextSwitcher } from '../../shell/ContextSwitcher';
import { NOTIFICATION_CLASS, NOTIFICATION_CLASS_ORDER } from '../labels';

function Group({ group }: { group: NotificationGroupVM }) {
  const meta = NOTIFICATION_CLASS[group.class];
  const isCritical = group.class === 'critical';
  return (
    <section>
      <h2 className="section-heading"><Icon name={meta.icon} /> {meta.label}</h2>
      <ul className="plain-list">
        {group.items.map((n) => (
          <li className="notpursued" key={n.id}>
            <div className="status-pair"><strong>{n.title}</strong><WhoseTurn whoseTurn={n.whoseTurn} /></div>
            {n.object && <p className="text-muted"><ObjectLink object={n.object} /></p>}
            <div className="next-action-row">
              {isCritical
                ? <Button variant="primary">Acknowledge &amp; act</Button>
                : <Button variant="secondary">Mark read</Button>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AgentNotificationsScreen({ loaded }: { loaded: Loaded<AgentNotificationsVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  const byClass = new Map<NotificationClass, NotificationGroupVM>(vm.groups.map((g) => [g.class, g]));
  const ordered = NOTIFICATION_CLASS_ORDER
    .map((c) => byClass.get(c))
    .filter((g): g is NotificationGroupVM => !!g && g.items.length > 0);

  return (
    <>
      <Breadcrumbs trail={['Notifications']} />
      <h1>Notifications</h1>
      <ContextSwitcher contexts={vm.contexts} />
      {ordered.length === 0
        ? <div className="state-panel" role="status"><p>You're all caught up.</p></div>
        : ordered.map((g) => <Group group={g} key={g.class} />)}
    </>
  );
}
