/**
 * ALDASSIST Phase 8 — SC-P16 Account creation & sign-in (B8). The single conversion gate at ongoing value.
 * Email only — no phone, no sales contact. Returns to the action being attempted (F2). Creating an account
 * creates NO Workspace (A1) — a workspace is created only on the first Disclosure. Client MFA policy is a
 * SLOT (agent/internal MFA is fixed).
 */
import type { Loaded, AuthVM } from '../../contract';
import { Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function AuthScreen({ loaded }: { loaded: Loaded<AuthVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['Account', vm.mode === 'sign-in' ? 'Sign in' : vm.mode === 'verify' ? 'Verify' : 'Sign up']} />
      <h1>{vm.mode === 'sign-in' ? 'Sign in' : vm.mode === 'verify' ? 'Verify your email' : 'Create a free account'}</h1>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
        <p className="text-muted">{vm.emailNote}</p>
      </div>
      <p className="text-muted">{vm.verificationNote}</p>
      <p className="text-muted">{vm.noPhoneNote}</p>
      <p className="lock-banner" role="note"><Icon name="info" /> {vm.noWorkspaceNote}</p>
      <p className="text-muted">{vm.returnToActionNote}</p>
      <p className="text-muted">
        Multi-factor authentication: {vm.mfa.status === 'resolved' ? vm.mfa.value : 'the client MFA policy is not yet configured — it will appear here once set.'}
      </p>
      <div className="next-action-row"><Button variant={vm.primaryCta.emphasis}>{vm.primaryCta.label}</Button></div>
    </>
  );
}
