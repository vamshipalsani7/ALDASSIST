/**
 * ALDASSIST Phase 8 — SC-C07 Assessments list for one Invention, newest first (B2).
 * Each row shows the two-axis status pair (Analysing/In review/Released + attention — CR-4), the
 * requested date, the assessed immutable disclosure version, and the reviewer once named (BR-01).
 * CR-2: a verdict label is shown ONLY on a released row — never before human release. Real table
 * semantics. CR-5: the `not-found` branch reveals nothing about the object.
 */
import type { Loaded, AssessmentsListVM } from '../../contract';
import { StateChip, AttentionMarker } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { ASSESSMENT_CHIP, VERDICT_LABEL } from '../labels';

export function AssessmentsListScreen({ loaded }: { loaded: Loaded<AssessmentsListVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Inventions', vm.inventionId, 'Assessments']} />
      <h1>Assessments</h1>

      <table className="index-table">
        <caption className="sr-only">Assessments for this invention, newest first</caption>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Requested</th>
            <th scope="col">Assessed version</th>
            <th scope="col">Reviewer</th>
            <th scope="col">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {vm.rows.map((r) => {
            const chip = ASSESSMENT_CHIP[r.status.lifecycle];
            return (
              <tr key={r.id}>
                <td>
                  <span className="status-pair">
                    <StateChip label={chip.label} icon={chip.icon} />
                    <AttentionMarker attention={r.status.attention} />
                  </span>
                </td>
                <td>{r.requestedDate}</td>
                <td className="mono">{r.assessedVersion}</td>
                <td>{r.reviewerName ?? <span className="text-muted">—</span>}</td>
                <td>
                  {/* CR-2: a verdict is shown ONLY when the assessment lifecycle is 'released'. The gate
                      is the lifecycle itself — a verdictLabel on any pre-release row is never exposed. */}
                  {r.status.lifecycle === 'released' && r.verdictLabel
                    ? VERDICT_LABEL[r.verdictLabel]
                    : <span className="text-muted">Not released yet</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
