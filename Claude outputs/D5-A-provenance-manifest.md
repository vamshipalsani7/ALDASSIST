# D5-A — Mechanical Source Acquisition — Provenance Manifest

**Task:** D5-A mechanical source acquisition (owner-authorized, source-material only).
**Acquisition date:** 2026-10-05.
**Scope:** provenance of record for the three designated D5 source documents. SOURCE MATERIAL ONLY — no provision interpreted, no rule→deadline mapping, no fee/deadline/applicant-category values extracted, no ALDASSIST data/fixtures/golden-cases created. The D-2026-044 guardrail remains in force: representative data stays `authoritative=false` until the separate legal/provenance process completes.
**Acquisition method & limitation:** this session cannot store the original binary PDFs (its web rules prohibit programmatic file download via curl/wget/HTTP libraries, and copyright + the task's no-copy constraint bar storing the full statutory texts). This manifest is therefore a **reference-of-record** pointing at the official IP India source documents, with identification/version metadata confirmed from each source masthead (metadata only). The originals remain at the official URLs below for direct download by the owner/legal.

---

## A. Patents Act, 1970 — **D5 source**
- **Title:** The Patents Act, 1970 (Act No. 39 of 1970).
- **Publisher / authority:** IP India (Office of the Controller General of Patents, Designs & Trade Marks), Government of India.
- **Official URL (document):** https://ipindia.gov.in/frontend/pdf/patents/1_113_1_The_Patents_Act__1970___incorporating_all_amendments_till_1-08-2024.pdf
- **Official URL (landing page):** https://ipindia.gov.in/acts/patent-act-1970
- **Document type:** consolidated statute (PDF).
- **Version/amendment metadata (as stated by source):** filename asserts "incorporating all amendments till 01-08-2024"; commencement 19 Sep 1970. ⚠ See Flag A-1 (masthead amendment reference differs from filename).
- **To be extracted eventually (NOT now, legal review):** the specific sections governing MVP deadlines/powers + their citations.

## B. Patents Rules, 2003 (as amended) — **D5 source**
- **Title:** The Patents Rules, 2003.
- **Publisher / authority:** IP India, Government of India.
- **Official URL (document):** https://ipindia.gov.in/frontend/pdf/patents/rules/Indian_Patent_Rules_2003__1_.pdf
- **Document type:** consolidated subordinate legislation (PDF).
- **Version/amendment metadata (as stated by source):** source note "updated till 21-09-2021." ⚠ See Flag B-1 (consolidated copy may lag later amendment notifications).
- **To be extracted eventually (NOT now, legal review):** the specific rules → deadline windows (offset/unit/from), extensions/restoration, calendar/working-day rule references, and citations.

## C. First Schedule / official fee schedule — **D5 source (authoritative statutory fee data)**
- **Title (as shown):** "Details of the Forms required to be filed under The Patents Rules 2003" (official fees / First Schedule).
- **Publisher / authority:** IP India, Government of India.
- **Official URL (document):** https://ipindia.gov.in/frontend/pdf/forms_and_official_fees/Schedule_1.pdf
- **Document type:** official fee schedule (PDF).
- **Version/amendment metadata (as stated by source):** none shown in the header. ⚠ See Flag C-1 (no explicit version/effective-date metadata).
- **To be extracted eventually (NOT now, legal review):** authoritative fee amounts per entry + applicant-category structure + `fee_ref` mapping. NOTE: authoritative statutory fee DATA is distinct from product pricing / fee-sharing PRESENTATION (L1 / O-2026-001) — not in this task.

---

## Source-document ambiguities / missing metadata (flags — for owner/legal, NOT resolved here)
- **Flag A-1:** the Act document's stated amendment-through date is inconsistent between its filename ("till 01-08-2024") and its masthead content reference (latest amendment seen: Act 33 of 2021). The exact in-force amendment status must be confirmed on the document at acquisition.
- **Flag B-1:** the consolidated Patents Rules copy is noted "updated till 21-09-2021"; the Rules have been amended by later notifications, so this consolidated PDF may not reflect the current in-force text (incl. fee changes). Current amendment status must be confirmed.
- **Flag C-1:** the fee-schedule PDF shows no explicit version/effective-date in its header; its in-force version must be tied to the current Patents Rules amendment.
- **General:** all three require capture of the *current in-force* version + effective date at the point of authoritative use (§18.2 `effective_from`/`effective_to`/`supersedes`) — a legal-review step, not part of this mechanical acquisition.

## Confirmations
- **No ALDASSIST application data or code modified** — no rules, fixtures, golden cases, `authoritative=true` data, DB schema/migrations, server code, contracts, tests, UI, or vocabulary were created or changed.
- **No Decision Log modification.**
- **No calendar authority decided; no applicant/fee categories decided; no legal ambiguity resolved; no provision mapped.**
- **No Git operations** — no commit, push, stage, reset, clean, or stash; HEAD remains `0ddf8bbdc4adbe4afe87e46ed4bf2b98f6741f06`.
- This manifest is a standalone deliverable; it was **not** written into the ALDASSIST repository.

**STOP.** No rule extraction, legal mapping, authoritative-data creation, golden-case creation, or implementation performed. Those require separate owner authorization.
