/**
 * ALDASSIST Phase 8 — SC-C00 Workspace creation interstitial (B2).
 * The client tenancy is born the moment an Invention first needs holding (DL:D-2026-015). Minimal
 * setup only (name). The creator becomes Owner; an invitee joins with an assigned role that is never
 * Owner. Invitation-expired/invalid is the `error` state. Not an object page — no cross-tenant 404.
 */
import type { Loaded, WorkspaceSetupVM } from '../../contract';
import { Button } from '../../components';
import { ScreenState } from '../../shell/ScreenState';

const ROLE_LABEL = { admin: 'Admin', member: 'Member', viewer: 'Viewer' } as const;

export function WorkspaceSetupScreen({ loaded }: { loaded: Loaded<WorkspaceSetupVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <div className="interstitial">
      <div className="interstitial__card">
        <h1>{vm.mode === 'create' ? 'Create your workspace' : 'Join a workspace'}</h1>
        <p className="text-muted">{vm.roleExplanation}</p>

        {vm.mode === 'create' ? (
          <div className="field">
            <label htmlFor="ws-name">{vm.nameFieldLabel}</label>
            <input id="ws-name" type="text" autoComplete="off" />
          </div>
        ) : (
          <p className="interstitial__role">
            You are joining as <strong>{vm.assignedRole ? ROLE_LABEL[vm.assignedRole] : 'Member'}</strong>.
          </p>
        )}

        <div className="next-action-row">
          <Button variant={vm.primaryAction.emphasis}>{vm.primaryAction.label}</Button>
        </div>
        <p className="text-muted interstitial__defer">
          This is a minimal setup — you can adjust everything else later in Settings.
        </p>
      </div>
    </div>
  );
}
