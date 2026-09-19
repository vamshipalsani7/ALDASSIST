/**
 * ALDASSIST Phase 8 — SC-P05 Segment landings (grouped) (B8). Audience entry. `/for/patent-agents` is the
 * supply-side front door; `/for/universities` markets client-app researcher access — NOT the V2 institution
 * module. No institutional intake/approval/budget features surfaced as available.
 */
import type { Loaded, SegmentLandingVM } from '../../contract';
import { Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { SEGMENT_LABEL } from '../public-labels';

export function SegmentLandingScreen({ loaded }: { loaded: Loaded<SegmentLandingVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  return (
    <>
      <Breadcrumbs trail={['For', SEGMENT_LABEL[vm.segment]]} />
      <h1>For {SEGMENT_LABEL[vm.segment]}</h1>
      <p className="trust-copy">{vm.framing}</p>
      <h2 className="section-heading">What you can do</h2>
      <ul className="version-list">
        {vm.capabilities.map((c) => <li className="version" key={c}><span className="version__id">{c}</span></li>)}
      </ul>
      {vm.note && <p className="lock-banner" role="note">{vm.note}</p>}
      <div className="next-action-row">
        <Button variant={vm.cta.emphasis}>{vm.cta.label}</Button>
        <Button variant={vm.pricingPointer.emphasis}>{vm.pricingPointer.label}</Button>
      </div>
    </>
  );
}
