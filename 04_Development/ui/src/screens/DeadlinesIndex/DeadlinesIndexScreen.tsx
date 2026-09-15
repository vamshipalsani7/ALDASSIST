/**
 * ALDASSIST Phase 8 — SC-C12 Deadlines index — safety-critical visibility (B3).
 * All client deadlines across applications. Rows show the state axis (Upcoming/Approaching/Due/Confirmed/
 * Met/Missed/Superseded/N-A, P4:§11.5) and a separate criticality axis, each icon + text, never colour-only
 * (CR-4 / P4:§22.3). Dates are computed by the Rules Engine and only rendered here — never authored
 * (X9/D1). Client-facing label is "Deadlines" (the agent surface calls it "Docket"). No fake urgency, no
 * countdown. A client cannot confirm a critical deadline — that is an agent/ops act.
 */
import { useState } from 'react';
import type { Loaded, DeadlinesIndexVM, DeadlineCriticalityVM } from '../../contract';
import { StateChip, AttentionMarker, Icon, Button } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { DEADLINE_STATE_CHIP } from '../labels';

function Criticality({ c }: { c: DeadlineCriticalityVM }) {
  // icon + text, never colour-only; `elevated` raises the icon emphasis only.
  return (
    <span className={`attention ${c.elevated ? 'attention--at-risk' : ''}`}>
      <span className="attention__icon"><Icon name={c.elevated ? 'at-risk' : 'info'} /></span>
      {c.label}
    </span>
  );
}

export function DeadlinesIndexScreen({ loaded }: { loaded: Loaded<DeadlinesIndexVM> }) {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Deadlines']} />
      <div className="index-head">
        <h1>Deadlines</h1>
        <span className="status-pair" role="group" aria-label="View">
          <Button variant={view === 'list' ? 'primary' : 'secondary'} aria-pressed={view === 'list'} onClick={() => setView('list')}>List</Button>
          <Button variant={view === 'calendar' ? 'primary' : 'secondary'} aria-pressed={view === 'calendar'} onClick={() => setView('calendar')}>Calendar</Button>
        </span>
      </div>

      <div className="facets" aria-label="Filters">
        {vm.facets.map((f) => (
          <span className="facet" key={f.id}>{f.label} <span className="facet__count">({f.count})</span></span>
        ))}
      </div>

      {view === 'calendar' ? (
        <div className="state-panel"><p className="text-muted">Calendar view groups the same deadlines by date. The list view below shows every deadline with its state and criticality.</p></div>
      ) : (
        <table className="index-table">
          <caption className="sr-only">All deadlines across your applications</caption>
          <thead>
            <tr>
              <th scope="col">Deadline</th>
              <th scope="col">Application</th>
              <th scope="col">Date</th>
              <th scope="col">State</th>
              <th scope="col">Criticality</th>
            </tr>
          </thead>
          <tbody>
            {vm.rows.map((r) => {
              const chip = DEADLINE_STATE_CHIP[r.state];
              return (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td className="mono">{r.applicationRef}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className="status-pair">
                      <StateChip label={chip.label} icon={chip.icon} />
                      <AttentionMarker attention={r.attention} />
                    </span>
                  </td>
                  <td><Criticality c={r.criticality} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
