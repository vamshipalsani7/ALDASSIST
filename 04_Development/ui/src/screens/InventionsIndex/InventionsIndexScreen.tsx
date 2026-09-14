/**
 * ALDASSIST Phase 8 — SC-C02 Inventions index — "the Vault" (B2).
 * The pre-filing spine: all inventions incl. Not pursued. Rows show the two-axis status pair
 * (lifecycle + attention, never merged — CR-4), technical domain, recorded date, next action.
 * Inventions are shown by OPAQUE id — titles are confidential (P4:§9.2). Real table semantics.
 * First-run empty teaches what an Invention is and offers "Record an invention" (P4:§19.1).
 */
import type { Loaded, InventionsIndexVM } from '../../contract';
import { StateChip, AttentionMarker, Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { INVENTION_CHIP } from '../labels';

export function InventionsIndexScreen({ loaded }: { loaded: Loaded<InventionsIndexVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Inventions']} />
      <div className="index-head">
        <h1>Inventions</h1>
        <Button variant={vm.recordAction.emphasis}>{vm.recordAction.label}</Button>
      </div>

      <div className="facets" aria-label="Filters">
        {vm.facets.map((f) => (
          <span className="facet" key={f.id}>{f.label} <span className="facet__count">({f.count})</span></span>
        ))}
      </div>

      <table className="index-table">
        <caption className="sr-only">Inventions in this workspace</caption>
        <thead>
          <tr>
            <th scope="col">Reference</th>
            <th scope="col">Status</th>
            <th scope="col">Technical domain</th>
            <th scope="col">Recorded</th>
            <th scope="col">Next action</th>
          </tr>
        </thead>
        <tbody>
          {vm.rows.map((r) => {
            const chip = INVENTION_CHIP[r.status.lifecycle];
            return (
              <tr key={r.id}>
                <td className="mono">{r.id}</td>
                {/* two-axis pair: lifecycle chip and attention marker are separate elements (CR-4) */}
                <td>
                  <span className="status-pair">
                    <StateChip label={chip.label} icon={chip.icon} />
                    <AttentionMarker attention={r.status.attention} />
                  </span>
                </td>
                <td>{r.technicalDomain}</td>
                <td>{r.recordedDate}</td>
                <td>
                  {r.nextAction.nothingNeeded
                    ? <span className="text-muted">{r.nextAction.label}</span>
                    : <Button variant={r.nextAction.emphasis}>{r.nextAction.label}</Button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
