/**
 * ALDASSIST Phase 8 — SC-C21 Notification centre (B5). Grouped by CLASS in a fixed order (P4:§18.2),
 * never chronologically — the class carries the meaning, and the order is enforced by the SCREEN from
 * NOTIFICATION_CLASS_ORDER (not trusted from the data). Governance encoded structurally:
 *  - A Critical notification is unmutable and cannot be dismissed without acknowledgement/action — so a
 *    Critical item renders ONLY an "Acknowledge & act" affordance; no mute, no bare dismiss.
 *  - Every other class offers a calm "Mark read". No fabricated urgency (CR-19): a reassurance item says
 *    plainly that nothing is needed.
 *  - Empty is a positive, honest state: "You're all caught up." Items link to the B2–B4 objects.
 */
import type { Loaded, NotificationsVM, NotificationGroupVM, NotificationClass } from '../../contract';
import { Button, Icon, WhoseTurn } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { ObjectLink } from '../../shell/ObjectLink';
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
            <div className="status-pair">
              <strong>{n.title}</strong>
              <WhoseTurn whoseTurn={n.whoseTurn} />
            </div>
            {n.object && <p className="text-muted"><ObjectLink object={n.object} /></p>}
            <div className="next-action-row">
              {isCritical
                // Critical: unmutable, cannot be dismissed without acknowledgement — the ONLY affordance.
                ? <Button variant="primary">Acknowledge &amp; act</Button>
                : <Button variant="secondary">Mark read</Button>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NotificationsScreen({ loaded }: { loaded: Loaded<NotificationsVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  // The screen enforces the fixed class order — it does not trust the order of the incoming groups.
  const byClass = new Map<NotificationClass, NotificationGroupVM>(vm.groups.map((g) => [g.class, g]));
  const ordered = NOTIFICATION_CLASS_ORDER
    .map((c) => byClass.get(c))
    .filter((g): g is NotificationGroupVM => !!g && g.items.length > 0);

  return (
    <>
      <Breadcrumbs trail={['Notifications']} />
      <h1>Notifications</h1>
      {ordered.length === 0
        ? <div className="state-panel" role="status"><p>You're all caught up.</p></div>
        : ordered.map((g) => <Group group={g} key={g.class} />)}
    </>
  );
}
