/**
 * ALDASSIST Phase 8 — Lifecycle state chip (Catalogue 5.1). The Lifecycle axis.
 * Icon + text + colour, never colour-only (CR-4). Label comes from the object taxonomy — no invented
 * states (P5:X8). "Closed" always carries its reason (handled by the caller passing the reason in the label).
 */
import { Icon, type IconName } from './Icon';

export function StateChip({ label, icon }: { label: string; icon?: IconName }) {
  return (
    <span className="state-chip">
      {icon && (
        <span className="state-chip__icon">
          <Icon name={icon} />
        </span>
      )}
      <span>{label}</span>
    </span>
  );
}
