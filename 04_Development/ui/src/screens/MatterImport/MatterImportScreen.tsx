/**
 * ALDASSIST Phase 8 — SC-A04 Matter import ★ (B6). The adoption unlock: bring existing matters in and get
 * instant docket value. Per-matter completeness for deadline computation; on incomplete data the UI states
 * EXACTLY what is missing per matter and still delivers partial value for complete matters — nothing is
 * silently mis-computed (F22 failure). Dates are computed by the Deadline Engine, only rendered (X9/D1).
 *
 * DR-02 stays OPEN: import performs NO de-duplication. `dedupNote` states the absence; the screen never
 * invents a merge/dedup step. Import is scoped to the agent's own tenancy — not marketplace matters.
 */
import type { Loaded, MatterImportVM } from '../../contract';
import { StateChip, Button, Icon } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { DEADLINE_STATE_CHIP } from '../labels';

export function MatterImportScreen({ loaded }: { loaded: Loaded<MatterImportVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Matters', 'Import']} />
      <h1>Import matters</h1>
      <p className="text-muted">{vm.inputsNote}</p>
      <p className="lock-banner" role="note"><Icon name="info" /> {vm.dedupNote}</p>
      <p className="text-muted">{vm.ownTenancyNote}</p>

      <h2 className="section-heading">Preview</h2>
      <ul className="version-list">
        {vm.preview.map((m, i) => (
          <li className="version" key={i}>
            <span className="version__id mono">{m.ref}</span>
            {m.completeness.complete
              ? <StateChip label="Complete" icon="success" />
              : <StateChip label="Incomplete" icon="at-risk" />}
            {m.completeness.complete
              ? (m.computedDeadlines.length > 0
                  ? <span className="text-muted">Computed: {m.computedDeadlines.map((d) => `${d.label} (${d.date})`).join(', ')} <StateChip label={DEADLINE_STATE_CHIP[m.computedDeadlines[0].state].label} icon={DEADLINE_STATE_CHIP[m.computedDeadlines[0].state].icon} /></span>
                  : <span className="text-muted">No deadlines computed.</span>)
              : <span className="text-muted">Missing: {m.completeness.missing.join(', ')} — this matter is not imported with computed deadlines until supplied; complete matters above still import.</span>}
          </li>
        ))}
      </ul>

      <div className="next-action-row"><Button variant={vm.importAction.emphasis}>{vm.importAction.label}</Button></div>
    </>
  );
}
