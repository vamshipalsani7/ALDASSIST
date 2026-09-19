/**
 * ALDASSIST Phase 8 — SC-P04 Stage landings (grouped) (B8). Lifecycle entry per stage. Price references
 * render via PriceDisplay only (P4:IA-7). MVP portfolio tracking only — no monitoring/renewals CTAs.
 */
import type { Loaded, StageLandingVM } from '../../contract';
import { Button, PriceDisplay } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { STAGE_LABEL } from '../public-labels';

export function StageLandingScreen({ loaded }: { loaded: Loaded<StageLandingVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['Solutions', STAGE_LABEL[vm.stage]]} />
      <h1>{STAGE_LABEL[vm.stage]}</h1>
      <p className="trust-copy">{vm.framing}</p>
      <h2 className="section-heading">What happens here</h2>
      <p>{vm.whatHappens}</p>
      <h2 className="section-heading">What it costs</h2>
      <PriceDisplay price={vm.cost} />
      <div className="next-action-row"><Button variant={vm.nextStep.emphasis}>{vm.nextStep.label}</Button></div>
    </>
  );
}
