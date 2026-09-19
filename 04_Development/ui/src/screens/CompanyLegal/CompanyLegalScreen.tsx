/**
 * ALDASSIST Phase 8 — SC-P15 Company + Legal (grouped) (B8). Corporate + legal content. Contracting parties
 * & fee terms in /legal/terms are governed by L1 (L1-20); legal wording is a LegalContentSlot container
 * (counsel), never authored here. No V2 features implied.
 */
import type { Loaded, CompanyLegalVM } from '../../contract';
import { Breadcrumbs } from '../../shell/Breadcrumbs';
import { ScreenState } from '../../shell/ScreenState';
import { COMPANY_LEGAL_LABEL } from '../public-labels';

const LEGAL_PAGES = new Set(['terms', 'privacy', 'disclaimer']);

export function CompanyLegalScreen({ loaded }: { loaded: Loaded<CompanyLegalVM> }) {
  if (loaded.state !== 'ready') return <ScreenState loaded={loaded} />;
  const vm = loaded.data;
  const isLegal = LEGAL_PAGES.has(vm.page);
  return (
    <>
      <Breadcrumbs trail={[isLegal ? 'Legal' : 'Company', COMPANY_LEGAL_LABEL[vm.page]]} />
      <h1>{vm.title}</h1>
      <p>{vm.body}</p>
      {isLegal && (
        <p className="text-muted">
          {vm.legalWording.status === 'pending-legal'
            ? `The binding legal text follows counsel review (${vm.legalWording.slotId}).`
            : vm.legalWording.text}
        </p>
      )}
    </>
  );
}
