/**
 * ALDASSIST Phase 8 — PriceDisplay (Catalogue / IP-21). The ONLY money renderer (CR-15).
 *
 * Two modes — component (Platform + Professional + Official, separately identified) and bundled (a single
 * total). The rendering MODE is O-2026-001, which is OPEN: it arrives as a SlotValue and the component
 * never decides it. When the slot is unfilled, the component renders the recorded probable direction
 * (component breakdown) and says the presentation is an open decision — it does not fabricate a decision.
 *
 * Official fees are ALWAYS separately identifiable, in BOTH modes (CR-15 / P4:§21.1) — bundled mode shows
 * the single total AND the separable official-fee portion. Amounts are SlotValues and are NEVER invented
 * (CR-19): an unfilled amount renders as a container ("amount not set"), never a fabricated number. The L1
 * disclosure is a counsel-owned LegalContentSlot container. This component performs no payment.
 */
import type { PriceDisplayVM, PriceRenderingMode, FeeLineVM, SlotValue, LegalContentSlot } from '../contract';

function amountText(a: SlotValue<string>): string {
  if (a.status === 'resolved') return a.value;
  if (a.status === 'unavailable') return 'amount temporarily unavailable';
  return 'amount not set'; // pending-slot — never a fabricated figure
}

function Disclosure({ slot }: { slot: LegalContentSlot }) {
  if (slot.status === 'provided') return <p className="price__disclosure">{slot.text}</p>;
  // pending-legal — a container; counsel owns the wording (L1).
  return <p className="price__disclosure text-muted">Fee disclosures will appear here once provided.</p>;
}

function Line({ line }: { line: FeeLineVM }) {
  return (
    <li className="price__line">
      <span className="price__label">{line.label}</span>
      <span className="price__amount mono">{amountText(line.amount)}</span>
    </li>
  );
}

export function PriceDisplay({ price }: { price: PriceDisplayVM }) {
  const rm = price.renderingMode;
  const modeResolved = rm.status === 'resolved';
  const mode: PriceRenderingMode = rm.status === 'resolved' ? rm.value : 'component'; // probable direction when open
  const official = price.lines.find((l) => l.kind === 'official-fee');

  return (
    <div className="price" role="group" aria-label="Price">
      {mode === 'component' ? (
        <ul className="price__lines plain-list">
          {price.lines.map((l) => <Line key={l.kind} line={l} />)}
        </ul>
      ) : (
        <ul className="price__lines plain-list">
          <li className="price__line price__total">
            <span className="price__label">Total</span>
            <span className="price__amount mono">{amountText(price.bundledTotal)}</span>
          </li>
          {/* Official fees stay separately identifiable even in bundled mode (CR-15 / §21.1). */}
          {official && (
            <li className="price__line price__official">
              <span className="price__label">of which {official.label}</span>
              <span className="price__amount mono">{amountText(official.amount)}</span>
            </li>
          )}
        </ul>
      )}

      {!modeResolved && (
        <p className="text-muted">
          Pricing presentation is an open decision (O-2026-001); shown here in itemised form. Official fees
          are always shown separately.
        </p>
      )}

      <Disclosure slot={price.disclosure} />
    </div>
  );
}
