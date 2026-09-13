/**
 * ALDASSIST Phase 8 — Attention marker (Catalogue 5.2). The Attention axis: On track / Action needed / At risk.
 * Rendered INDEPENDENTLY of the lifecycle chip, always (CR-4/AP-14). Distinguished by icon SHAPE + text
 * (survives greyscale), colour is confirmatory only.
 */
import type { AttentionState } from '../contract';
import { Icon, type IconName } from './Icon';

const CONFIG: Record<AttentionState, { label: string; icon: IconName }> = {
  'on-track': { label: 'On track', icon: 'on-track' },
  'action-needed': { label: 'Action needed', icon: 'action-needed' },
  'at-risk': { label: 'At risk', icon: 'at-risk' },
};

export function AttentionMarker({ attention }: { attention: AttentionState }) {
  const c = CONFIG[attention];
  return (
    <span className={`attention attention--${attention}`}>
      <span className="attention__icon">
        <Icon name={c.icon} />
      </span>
      <span>{c.label}</span>
    </span>
  );
}
