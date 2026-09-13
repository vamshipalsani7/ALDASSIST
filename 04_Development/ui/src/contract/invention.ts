/**
 * ALDASSIST Phase 8 — contract: Invention lifecycle + object-header identity.
 * B0 §3.3, §5.1, §5.2. Only the parts the first slice (verdict screen header) needs are realised here;
 * the full InventionDetailVM is scheduled with B2.
 */
import type {
  TwoAxisStatus, WhoseTurn, NextActionVM, TabRef, RelatedObjectRef, KeyValue, OpaqueId,
} from './primitives';

/** Lifecycle states — verbatim from Phase 7 B.8 / P4:§11.2. No invented states (P5:X8). */
export type InventionLifecycle =
  | 'drafting'
  | 'recorded'
  | 'assessing'
  | 'assessed'
  | 'filing'
  | 'protected'
  | 'not-pursued'
  | 'lapsed';

/** The object-page skeleton header (B0 §5.1): Identity → status pair → next action → tabs → rail. */
export interface ObjectHeaderVM<L> {
  id: OpaqueId;
  title: string; // confidential titles are opaque/placeholder in fixtures (P4:§9.2)
  identity: KeyValue[]; // domain, recorded date, inventors, ids
  status: TwoAxisStatus<L>; // both axes, always
  nextAction: NextActionVM; // exactly one primary
  whoseTurn: WhoseTurn;
  tabs: TabRef[]; // ≤ 2 nav levels
  relationshipRail: RelatedObjectRef[]; // related objects, one click away
}

export type InventionHeaderVM = ObjectHeaderVM<InventionLifecycle>;
