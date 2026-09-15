/**
 * ALDASSIST Phase 8 — inline navigable reference to a B2–B4 object (RelatedObjectRef). Every object
 * reference in a queue or notification is an actual link, one click from the object (P4:§12.5) — not
 * plain text. The fixture harness has no router, so the anchor is inert (preventDefault), exactly as the
 * shell's RelationshipRail links behave; Phase 9 supplies the real href. Reuses the existing
 * `.rel-rail__item` class — no new CSS (no Gate-A impact).
 */
import type { RelatedObjectRef } from '../contract';

export function ObjectLink({ object }: { object: RelatedObjectRef }) {
  return (
    <a className="rel-rail__item" href="#" onClick={(e) => e.preventDefault()} data-object-kind={object.kind}>
      {object.label}
    </a>
  );
}
