/**
 * ALDASSIST Phase 8 — Icon. One line-icon set (Lucide, Phase 7 H.1, owner-approved D-2026-021).
 * Distinct SHAPE per meaning so signals survive greyscale/colour-blindness. Icons never carry
 * meaning alone — callers always render an accompanying text label (CR-4).
 */
import {
  Check, TriangleAlert, Info, Clock, Circle, BadgeCheck, Quote, Lock, CircleSlash,
  ChevronDown, ChevronRight, Flag, Bell, type LucideIcon,
} from 'lucide-react';

export type IconName =
  | 'success' | 'at-risk' | 'warning' | 'info' | 'waiting' | 'on-track'
  | 'reviewed' | 'provenance' | 'locked' | 'blocked'
  | 'expand' | 'collapse' | 'action-needed' | 'notify';

const MAP: Record<IconName, LucideIcon> = {
  success: Check,
  'at-risk': TriangleAlert,
  warning: TriangleAlert,
  info: Info,
  waiting: Clock,
  'on-track': Circle,
  reviewed: BadgeCheck,
  provenance: Quote,
  locked: Lock,
  blocked: CircleSlash,
  expand: ChevronDown,
  collapse: ChevronRight,
  'action-needed': Flag,
  notify: Bell,
};

export function Icon({ name, size = 16, className }: { name: IconName; size?: number; className?: string }) {
  const C = MAP[name];
  // aria-hidden: the icon is decorative reinforcement; meaning is carried by the sibling text label.
  return <C size={size} aria-hidden className={className} strokeWidth={2} />;
}
