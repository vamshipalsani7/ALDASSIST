/**
 * ALDASSIST Phase 9 — B2a: identity/tenancy (M0.1) core types.
 *
 * The actor is SERVER-RESOLVED, never client-asserted (T-1 / D-2026-025). `principalType` is the
 * identity kind; the per-workspace membership role (Owner/Admin/Member/Viewer) is a distinct grant
 * shape handled in B2b, not here.
 */
export type PrincipalType = 'client_user' | 'agent' | 'institution_admin' | 'internal';

export interface Actor {
  id: string;
  principalType: PrincipalType;
  mfaSatisfied: boolean;
}

/** Server runtime mode. `live` actor resolution is fail-closed in B2 (session transport deferred). */
export type ServerRuntimeMode = 'fixture' | 'contract' | 'live';

/**
 * Principal types for which MFA is MANDATORY (T-6): Agents, Institution Admins, internal roles.
 * client_user is deliberately absent — client MFA policy is S-10 (UNRESOLVED) and is NOT gated here.
 */
export const MFA_MANDATORY_PRINCIPALS: readonly PrincipalType[] = ['agent', 'institution_admin', 'internal'];
