/**
 * ALDASSIST Phase 9 — B2a: mandatory-MFA policy (T-6).
 *
 * MFA is MANDATORY for Agents, Institution Admins, and internal roles: such a principal without a
 * satisfied MFA state is denied. Client-user MFA policy is S-10 (UNRESOLVED) and is NOT enforced here
 * — `Settings` keeps it a container; this function must not gate client users.
 *
 * This enforces the POLICY (is MFA required and satisfied?). The concrete second-factor challenge
 * rides with the deferred live session/auth transport and is not implemented in B2.
 */
import type { Actor } from './types';
import { MFA_MANDATORY_PRINCIPALS } from './types';

export interface MfaPolicyResult {
  satisfied: boolean;
  reason?: string;
}

export function checkMfaPolicy(actor: Actor): MfaPolicyResult {
  if (MFA_MANDATORY_PRINCIPALS.includes(actor.principalType) && !actor.mfaSatisfied) {
    return { satisfied: false, reason: `MFA required for principal type '${actor.principalType}'` };
  }
  return { satisfied: true };
}
