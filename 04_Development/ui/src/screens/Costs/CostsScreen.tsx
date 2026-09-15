/**
 * ALDASSIST Phase 8 — SC-C16 Costs (B4). Spend to date, committed, forecast, invoices, and a 20-year
 * projection container. Official fees are always separately identifiable and come from the Rules Engine —
 * never hardcoded (P4:§21.1 / BR-14); every figure is a PriceDisplay/SLOT container, never invented (CR-19).
 * Owner/Admin only — a Member/Viewer is shown Loaded's `permission-denied` (visible-but-locked, IP-15).
 */
import type { Loaded, CostsVM } from '../../contract';
import { PriceDisplay } from '../../components';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';

export function CostsScreen({ loaded }: { loaded: Loaded<CostsVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;

  return (
    <>
      <Breadcrumbs trail={['Costs']} />
      <h1>Costs</h1>

      <h2 className="section-heading">Spend to date</h2>
      <PriceDisplay price={vm.spendToDate} />
      <h2 className="section-heading">Committed</h2>
      <PriceDisplay price={vm.committed} />
      <h2 className="section-heading">Forecast</h2>
      <PriceDisplay price={vm.forecast} />

      <h2 className="section-heading">Invoices</h2>
      <table className="index-table">
        <caption className="sr-only">Invoices</caption>
        <thead><tr><th scope="col">Invoice</th><th scope="col">Issuer</th><th scope="col">Amount</th></tr></thead>
        <tbody>
          {vm.invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.label}</td>
              <td>{inv.issuer}</td>
              <td className="mono">{inv.amount.status === 'resolved' ? inv.amount.value : 'amount not set'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="section-heading">Projection</h2>
      <p className="text-muted">{vm.projectionNote}</p>
    </>
  );
}
