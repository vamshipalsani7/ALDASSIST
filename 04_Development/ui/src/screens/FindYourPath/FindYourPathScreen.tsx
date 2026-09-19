/**
 * ALDASSIST Phase 8 — SC-P08 Find-your-path router (B8). Returns a REAL recommendation + a real cost range
 * (the corrected Dennemeyer pattern). No email required. If the cost range is unavailable, the
 * recommendation is shown WITHOUT a fabricated figure (the range is a SLOT — CR-19).
 */
import type { Loaded, FindYourPathVM } from '../../contract';
import { Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function FindYourPathScreen({ loaded }: { loaded: Loaded<FindYourPathVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const range = vm.costRange;
  return (
    <>
      <Breadcrumbs trail={['Find your path']} />
      <h1>Find your path</h1>
      <p className="lock-banner" role="note"><Icon name="info" /> {vm.noEmailNote}</p>
      {vm.questions.map((q) => (
        <fieldset className="field" key={q.id}>
          <legend>{q.prompt}</legend>
          {q.options.map((o) => <label className="radio" key={o.label}><input type="radio" name={q.id} /> {o.label}</label>)}
        </fieldset>
      ))}
      <div className="state-panel">
        <h2 className="section-heading">Recommendation</h2>
        <p><strong>{vm.recommendation.label}</strong></p>
        <p className="text-muted">{vm.recommendation.note}</p>
        <p className="text-muted">
          Estimated cost range: {range.status === 'resolved'
            ? range.value
            : 'not shown yet — the recommendation stands; a real range appears here once available (no figure is invented).'}
        </p>
        <div className="next-action-row"><Button variant={vm.recommendation.cta.emphasis}>{vm.recommendation.cta.label}</Button></div>
      </div>
    </>
  );
}
