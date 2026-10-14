/**
 * ALDASSIST Phase 9 — B4: Client Vault read services (Zone 1; M1.2 + M0.5 + M0.10).
 *
 * Each service takes the SERVER-RESOLVED actor (T-1 / D-2026-025) and returns the frozen `Loaded<VM>`
 * envelope, shaped from real Zone-1 data. Tenancy is enforced through the B2 grant layer
 * (`authorizeWorkspace`), never bypassed: a member sees the object (`ready`); an actor outside the
 * object's workspace gets `not-found` carrying nothing (CR-5, server-side). At the viewer floor a
 * member is always ≥ viewer, so `permission-denied` cannot arise for a pure read — the only non-grant
 * outcome is `not-found`.
 *
 * Confidentiality: an invention's `title` is Zone-1 confidential and is NEVER placed in the index VM
 * (`InventionRowVM` carries only the opaque id, per P4:§9.2); the owner's own detail header may show it.
 * Runs on the Zone-1 pool. No product port is wired to a live client transport here (live session is
 * deferred/fail-closed); these are the server-side services the ports will bind to once a session exists.
 */
import { sql, type Kysely } from 'kysely';
import type { Database } from '../../db/types';
import type { Actor } from '../identity/types';
import { authorizeWorkspace } from '../identity/grants';
import type { Loaded, NextActionVM, AttentionState } from '../../../src/contract/primitives';
import type { InventionLifecycle } from '../../../src/contract/invention';
import type {
  InventionsIndexVM,
  InventionRowVM,
  InventionDetailVM,
  DisclosureVersionsVM,
  DisclosureVersionVM,
  DisclosureCaptureVM,
  DisclosureStepId,
} from '../../../src/contract/vault';

const RECORD_ACTION: NextActionVM = { verb: 'Record', label: 'Record an invention', emphasis: 'primary' };
const CONTINUE_ACTION: NextActionVM = { verb: 'Record', label: 'Continue disclosure', emphasis: 'primary' };

const STEP_LABELS: Record<DisclosureStepId, string> = {
  problem: 'Problem',
  'prior-approaches': 'Prior approaches',
  invention: 'The invention',
  'how-it-works': 'How it works',
  variants: 'Variants',
  advantages: 'Advantages',
  'prior-disclosure': 'Prior disclosure',
};
const STEP_ORDER: DisclosureStepId[] = [
  'problem', 'prior-approaches', 'invention', 'how-it-works', 'variants', 'advantages', 'prior-disclosure',
];

const DATE = sql<string>`to_char(recorded_date, 'YYYY-MM-DD')`;
const SAVED_AT = sql<string>`to_char(saved_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`;

/** Resolve the invention only if the actor may view its workspace; else null (→ not-found, CR-5). */
async function visibleInvention(db: Kysely<Database>, actor: Actor, inventionId: string) {
  const inv = await db
    .selectFrom('vault.invention')
    .select(['id', 'workspace_id', 'title', 'technical_domain', 'lifecycle', 'attention'])
    .select(DATE.as('recorded_date'))
    .where('id', '=', inventionId)
    .executeTakeFirst();
  if (!inv) return null;
  const authz = await authorizeWorkspace(db, actor, { workspaceId: inv.workspace_id, requiredRole: 'viewer' });
  return authz.decision === 'granted' ? inv : null;
}

/** SC-C02 — inventions index for a workspace the actor belongs to (titles never included). */
export async function loadInventionsIndex(
  db: Kysely<Database>,
  actor: Actor,
  workspaceId: string,
): Promise<Loaded<InventionsIndexVM>> {
  const authz = await authorizeWorkspace(db, actor, { workspaceId, requiredRole: 'viewer' });
  if (authz.decision !== 'granted') return { state: 'not-found' };

  const invs = await db
    .selectFrom('vault.invention')
    .select(['id', 'technical_domain', 'lifecycle', 'attention'])
    .select(DATE.as('recorded_date'))
    .where('workspace_id', '=', workspaceId)
    .orderBy('recorded_date', 'desc')
    .execute();

  const rows: InventionRowVM[] = invs.map((r) => ({
    id: r.id,
    status: { lifecycle: r.lifecycle as InventionLifecycle, attention: r.attention as AttentionState },
    technicalDomain: r.technical_domain,
    recordedDate: r.recorded_date,
    nextAction: { verb: 'Record', label: 'Continue', emphasis: 'secondary' },
  }));
  return { state: 'ready', data: { rows, facets: [], recordAction: RECORD_ACTION } };
}

/** SC-C04 — invention detail (CR-5 not-found server-side). */
export async function loadInventionDetail(
  db: Kysely<Database>,
  actor: Actor,
  inventionId: string,
): Promise<Loaded<InventionDetailVM>> {
  const inv = await visibleInvention(db, actor, inventionId);
  if (!inv) return { state: 'not-found' };
  const status = { lifecycle: inv.lifecycle as InventionLifecycle, attention: inv.attention as AttentionState };
  return {
    state: 'ready',
    data: {
      header: {
        id: inv.id,
        title: inv.title, // the authorised owner sees their own title
        identity: [
          { label: 'Technical domain', value: inv.technical_domain },
          { label: 'Recorded', value: inv.recorded_date },
        ],
        status,
        nextAction: CONTINUE_ACTION,
        whoseTurn: { actor: 'needs-you' },
        tabs: [
          { id: 'overview', label: 'Overview' },
          { id: 'disclosure', label: 'Disclosure' },
          { id: 'documents', label: 'Documents' },
        ],
        relationshipRail: [],
      },
      tabs: [
        { id: 'overview', label: 'Overview', content: { kind: 'summary', summary: 'Recorded invention.', protectionByJurisdiction: [] } },
        { id: 'documents', label: 'Documents', content: { kind: 'empty', teaches: 'Documents will appear here.', action: { verb: 'Record', label: 'Add', emphasis: 'secondary' } } },
      ],
      activeTabDefault: 'overview',
    },
  };
}

/** SC-C05 — immutable disclosure version history (BR-20). */
export async function loadDisclosureVersions(
  db: Kysely<Database>,
  actor: Actor,
  inventionId: string,
): Promise<Loaded<DisclosureVersionsVM>> {
  const inv = await visibleInvention(db, actor, inventionId);
  if (!inv) return { state: 'not-found' };

  const versions = await db
    .selectFrom('vault.disclosure_version')
    .select(['version', 'immutable', 'referenced_by'])
    .select(SAVED_AT.as('saved_at'))
    .where('invention_id', '=', inventionId)
    .orderBy('version', 'desc')
    .execute();
  if (versions.length === 0) {
    return { state: 'empty', empty: { teaches: 'Disclosure versions appear here once you record one.', action: CONTINUE_ACTION } };
  }
  const maxV = versions[0].version;
  const history: DisclosureVersionVM[] = versions.map((v) => ({
    version: `v${v.version}`,
    savedAt: v.saved_at,
    immutable: v.immutable,
    referencedBy: v.referenced_by ?? undefined,
    isCurrent: v.version === maxV,
  }));
  const current = history.find((h) => h.isCurrent) as DisclosureVersionVM;
  return { state: 'ready', data: { inventionId, current, history } };
}

/** SC-C03 — disclosure capture state. */
export async function loadDisclosureCapture(
  db: Kysely<Database>,
  actor: Actor,
  inventionId: string,
): Promise<Loaded<DisclosureCaptureVM>> {
  const inv = await visibleInvention(db, actor, inventionId);
  if (!inv) return { state: 'not-found' };

  const disc = await db
    .selectFrom('vault.disclosure')
    .select(['current_step_id'])
    .where('invention_id', '=', inventionId)
    .executeTakeFirst();
  if (!disc) {
    return { state: 'empty', empty: { teaches: 'Start the guided disclosure to build the record.', action: CONTINUE_ACTION } };
  }
  const currentStepId = disc.current_step_id as DisclosureStepId;
  const currentIndex = STEP_ORDER.indexOf(currentStepId);
  return {
    state: 'ready',
    data: {
      inventionId,
      steps: STEP_ORDER.map((id, i) => ({
        id,
        label: STEP_LABELS[id],
        complete: i < currentIndex,
        mandatoryNonSkippable: id === 'prior-disclosure' ? true : undefined,
      })),
      currentStepId,
      completeness: {
        tier: 'tier-1-structure-only',
        disclaimer: 'Checks structure and prompts only — never patentability.',
        prompts: [],
      },
      // Idle auto-release is a Phase-6 proposal, not baseline — a pending slot (S-8), never invented.
      lock: { heldByOther: false, idleTimeout: { status: 'pending-slot', slotId: 'S-8', source: 'owner-decision' } },
      autosaveNote: 'Every save writes an immutable version (BR-20).',
    },
  };
}
