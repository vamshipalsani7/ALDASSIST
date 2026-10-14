/**
 * ALDASSIST Phase 9 — B12 (R0 slice): the prerender renders exactly the eight authorized R0 Public
 * pages from the frozen fixtures, faithfully, preserving every pending/SLOT/demo state (no invented
 * fee, deadline, or metric values). Content is asserted verbatim from the frozen fixtures; nothing here
 * authors or alters Public copy. (SC-P10 Glossary added per D-2026-042.)
 */
import { describe, it, expect } from 'vitest';
import { renderPublicPageHtml, R0_ROUTE_IDS, fileForPath } from './prerenderPublic';

describe('B12 R0 — the prerender covers exactly the eight authorized routes', () => {
  it('R0_ROUTE_IDS is exactly the eight authorized R0 routes', () => {
    expect([...R0_ROUTE_IDS].sort()).toEqual(
      ['SC-P01', 'SC-P04', 'SC-P05', 'SC-P08', 'SC-P09', 'SC-P10', 'SC-P11', 'SC-P12'].sort(),
    );
  });
  it('refuses any route outside the R0 set (e.g. Pricing SC-P06, PatentSearch SC-P02)', async () => {
    await expect(renderPublicPageHtml('SC-P06')).rejects.toThrow(/not an authorized R0 route/i);
    await expect(renderPublicPageHtml('SC-P02')).rejects.toThrow(/not an authorized R0 route/i);
  });
  it('maps paths to filenames ("/" → index.html)', () => {
    expect(fileForPath('/')).toBe('index.html');
    expect(fileForPath('/stage')).toBe('stage.html');
    expect(fileForPath('/find-your-path')).toBe('find-your-path.html');
  });
});

describe('B12 R0 — each page prerenders to a full static document with its frozen content', () => {
  it('every R0 page yields a complete HTML document with a mounted #root and body content', async () => {
    for (const id of R0_ROUTE_IDS) {
      const html = await renderPublicPageHtml(id);
      expect(html.startsWith('<!doctype html>')).toBe(true);
      expect(html).toContain('<div id="root">');
      expect(html.length).toBeGreaterThan(1000);
    }
  });

  const CASES: Array<{ id: string; label: string; contains: string[] }> = [
    { id: 'SC-P01', label: 'PublicHome', contains: ['Record it. Understand it. Protect it.', 'The Judgement'] },
    { id: 'SC-P04', label: 'StageLanding', contains: ['Idea stage'] },
    { id: 'SC-P05', label: 'SegmentLanding', contains: ['Universities'] },
    { id: 'SC-P08', label: 'FindYourPath', contains: ['Find your path', 'No email required'] },
    { id: 'SC-P09', label: 'Guides', contains: ['What is a disclosure?'] },
    { id: 'SC-P10', label: 'Glossary', contains: ['Glossary', 'Invention', 'Disclosure'] },
    { id: 'SC-P11', label: 'JurisdictionGuide', contains: ['India', 'Statutory window'] },
    { id: 'SC-P12', label: 'Reports', contains: ['Indian patent timelines', 'data note (demo)'] },
  ];
  for (const c of CASES) {
    it(`${c.label} renders its frozen content`, async () => {
      const html = await renderPublicPageHtml(c.id);
      for (const s of c.contains) expect(html).toContain(s);
    });
  }
});

describe('B12 R0 — pending/SLOT/demo states are preserved, never resolved to invented values', () => {
  it('fee SLOTs render as "amount not set" (never an invented fee) on Stage & Jurisdiction', async () => {
    for (const id of ['SC-P04', 'SC-P11']) {
      const html = await renderPublicPageHtml(id);
      expect(html).toContain('amount not set');
    }
  });
  it('deadline windows render as statutory-window slots, not invented dates/counts (Jurisdiction)', async () => {
    const html = await renderPublicPageHtml('SC-P11');
    expect(html).toContain('Statutory window');
  });
  it('Reports keeps its demo label and pending metric container (no invented number)', async () => {
    const html = await renderPublicPageHtml('SC-P12');
    expect(html).toContain('(demo)');
    expect(html).toContain('sample (demo)');
  });
});
