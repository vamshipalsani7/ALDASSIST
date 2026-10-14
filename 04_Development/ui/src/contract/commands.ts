/**
 * ALDASSIST Phase 9 — B3: the command (write) surface. ADDITIVE sibling to the frozen `ports.ts`
 * (P9-ADR-03 Option A; G-1 = YES / D-2026-027). This is a NEW file: every frozen Phase-8 contract file
 * — including the barrel `index.ts` — stays byte-for-byte unchanged, so this module is consumed by
 * DIRECT import (`../contract/commands`), never via the barrel.
 *
 * Commands are kept separate from read ports (`ports.ts`) and from queries (a later `queries.ts`). One
 * operation per mutating action, mirroring the ten controlled-lexicon verbs of `NextActionVM`
 * (P4:§10.4). Every mutation carries an idempotency key (P9-ADR-05). The actor is NEVER named in the
 * envelope — it is server-resolved (T-1 / D-2026-025).
 *
 * Result is a discriminated union (ADR-03): `accepted | rejected | permission-denied | conflict`. There
 * is no `not-found` arm: to preserve CR-5, a command against an object outside the actor's tenancy/grant
 * resolves to a neutral `rejected` (which reveals nothing), while an in-tenancy-but-above-role failure
 * resolves to `permission-denied`.
 */
import type { OpaqueId } from './primitives';

/** The ten mutating verbs — the controlled lexicon of NextActionVM.verb (P4:§10.4). */
export type CommandVerb =
  | 'Record' | 'Assess' | 'Engage' | 'File' | 'Respond'
  | 'Confirm' | 'Decide' | 'Release' | 'Import' | 'Review';

/** Discriminated command result (P9-ADR-03 Option A). */
export type CommandResult =
  | { status: 'accepted'; commandId: string }
  | { status: 'rejected'; reason: string }
  | { status: 'permission-denied'; reason: string; whoCanAct: string }
  | { status: 'conflict'; reason: string };

/** Every mutation carries an idempotency key (ADR-05). The actor is resolved server-side, never here. */
export interface CommandEnvelope<P> {
  idempotencyKey: string;
  params: P;
}

// ── Per-verb parameter shapes (representative; product shapes arrive in later batches) ───────────────
export interface RecordParams { workspaceId: OpaqueId; title: string }
export interface ImportParams { workspaceId: OpaqueId }
export interface AssessParams { matterId: OpaqueId }
export interface EngageParams { matterId: OpaqueId }
export interface FileParams { matterId: OpaqueId }
export interface RespondParams { matterId: OpaqueId; message: string }
export interface ConfirmParams { matterId: OpaqueId }
export interface DecideParams { disclosureVersionId: OpaqueId; reviewDecisionId: OpaqueId }
export interface ReleaseParams { disclosureVersionId: OpaqueId; reviewDecisionId: OpaqueId }
export interface ReviewParams { disclosureVersionId: OpaqueId; reviewDecisionId: OpaqueId }

/**
 * The command port — symmetrical with the read ports in `ports.ts`, one operation per verb. A server
 * implementation binds the server-resolved actor; the caller supplies only the idempotency key + params.
 */
export interface CommandPort {
  record(cmd: CommandEnvelope<RecordParams>): Promise<CommandResult>;
  import(cmd: CommandEnvelope<ImportParams>): Promise<CommandResult>;
  assess(cmd: CommandEnvelope<AssessParams>): Promise<CommandResult>;
  engage(cmd: CommandEnvelope<EngageParams>): Promise<CommandResult>;
  file(cmd: CommandEnvelope<FileParams>): Promise<CommandResult>;
  respond(cmd: CommandEnvelope<RespondParams>): Promise<CommandResult>;
  confirm(cmd: CommandEnvelope<ConfirmParams>): Promise<CommandResult>;
  decide(cmd: CommandEnvelope<DecideParams>): Promise<CommandResult>;
  release(cmd: CommandEnvelope<ReleaseParams>): Promise<CommandResult>;
  review(cmd: CommandEnvelope<ReviewParams>): Promise<CommandResult>;
}
