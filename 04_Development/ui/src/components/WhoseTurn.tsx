/**
 * ALDASSIST Phase 8 — Whose-turn indicator (Catalogue 5.3, the anti-silence backbone).
 * Names who is acting and roughly when. The estimate is a SlotValue — a range/label, NEVER a countdown,
 * and NEVER a fabricated time (CR-19). When the slot is unfilled, a calm placeholder is shown.
 */
import type { WhoseTurn as WhoseTurnVM, WhoseTurnActor, SlotValue, HumanReadableRange } from '../contract';

const ACTOR_LABEL: Record<WhoseTurnActor, string> = {
  'needs-you': 'Needs you',
  'awaiting-you': 'Awaiting you',
  'with-the-reviewer': 'With the reviewer',
  'awaiting-the-office': 'Awaiting the office',
  analysing: 'Analysing',
  'nothing-needed': 'Nothing needed',
};

function estimateText(estimate?: SlotValue<HumanReadableRange>): string | null {
  if (!estimate) return null;
  switch (estimate.status) {
    case 'resolved':
      return `expected ${estimate.value}`;
    case 'pending-slot':
      return 'expected timing not yet set'; // committed turnaround is an open SLOT (ADR §9)
    case 'unavailable':
      return 'expected timing temporarily unavailable';
  }
}

export function WhoseTurn({ whoseTurn }: { whoseTurn: WhoseTurnVM }) {
  const est = estimateText(whoseTurn.estimate);
  return (
    <span className="whose-turn">
      <span>{ACTOR_LABEL[whoseTurn.actor]}</span>
      {est && <span className="whose-turn__estimate">· {est}</span>}
    </span>
  );
}
