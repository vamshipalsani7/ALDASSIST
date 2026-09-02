# Phase 6 — WP-2: MVP Screen Inventory

**Phase:** 6 — UX & Interaction Design · **Work package:** WP-2
**Type:** Phase 6 baseline document — **FROZEN** v0.1 (1 September 2026).
**Status:** **FROZEN** — Phase 6 (UX & Interaction Design), declared frozen 1 September 2026 by the repository owner (Vamshi); recorded in `01_Strategy/Roadmap.md` (Frozen Baseline) and `01_Strategy/Decision Log.md` (D-2026-020). **DR-01 and DR-02 remain explicitly deferred** (see the Deferred Decision Register). Not modified without an explicit architectural decision; this freeze changes no design substance in this file.
**Date:** 1 September 2026
**Companion:** `Phase-6-WP1-Journey-Map-and-Navigation-v0.1.md` (journeys, navigation, IA).
**Governing baseline (frozen):** Phase 3 PRD · Phase 4 IA · Phase 5 User Flows · Assessment Lifecycle ADR · post-freeze Decision Log D-2026-014…019.

> **Rule of engagement.** DERIVE what the baseline decides · DESIGN what Phase 6 owns · FLAG what is genuinely missing · ASK only when a real new decision is unavoidable. No invented state, business rule, legal wording, pricing/SLA value, confidence or statistical threshold, or permission. Unspecified values → **`[SLOT: …]`**. Genuine gaps → **`[FLAG: …]`**.

---

## 0. How this inventory is organised

Every screen is an instance of a Phase 4 template `[P4:§14]` and follows the object-page skeleton where applicable `[P4:§15]`. Each entry uses the **15-field specification**:

1. Name · 2. Purpose · 3. User/role · 4. Entry points · 5. Exit points · 6. Primary action · 7. Secondary actions · 8. Information displayed · 9. Loading state · 10. Empty state · 11. Error state · 12. Permission rules · 13. Underlying Phase 5 flow · 14. Architecture/business constraints · 15. V2 exclusions.

**Template codes** `[P4:§14]`: PT-1…PT-12 (public), AT-1…AT-9 (application). **Trace tags** as in WP-1. **Surfaces:** Public `SC-P`, Client `SC-C`, Agent `SC-A`, Operations `SC-O`. Institution is **V2** and appears only in §7 as an excluded surface.

Where several routes share one template and differ only in content (e.g. the six `/for/*` landings), they are specified once as a **grouped instance** with the variants named — legitimate under `[P4:§14.3]` and avoids manufacturing near-duplicate blocks.

**Global states applied to every screen (stated once, not repeated):** WCAG 2.2 AA landmarks/focus/skip-links `[P4:§22]`; status never colour-only `[P4:§22.3]`; nothing critical in hover-only `[P4:§20.2]`; cross-tenancy denials render as 404 "does not exist" `[P4:§19.3]`/`[IA-5]`; external-source failure = cached data + staleness stamp, never an error page `[P3:NFR-A05]`. Per-screen fields below note only *screen-specific* additions.

---

## 1. Public surface (`/`) — SC-P

### SC-P01 · Public Home  · PT-1
1. **Name:** Public Home (`/`).
2. **Purpose:** Orient a stranger to the three layers (Record · Judgement · Work) and route them to the wedge (search) or first value.
3. **User/role:** Anonymous; Registered (Free).
4. **Entry:** Direct/organic; wordmark from any public page.
5. **Exit:** `/search`; `/find-your-path`; `/solutions/*`; `/for/*`; sign-up (J-B).
6. **Primary action:** Start free / Search `[P4:PT-1]`.
7. **Secondary:** Explore Solutions; run the Cost Planner; read Learn.
8. **Info displayed:** Hero; the three layers; proof (verifiable artifacts, not testimonial carousels `[P4:§4.1]`); path-finder entry; footer with Trust `[P4:§12.2]`.
9. **Loading:** Static/edge-cached; instant.
10. **Empty:** N/A (curated page).
11. **Error:** Standard shell if a module fails; core links always render.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1.
14. **Constraints:** Banned terms list `[P4:§10.3]`; calm/no urgency theatre `[Philosophy §5]`; ALDASSIST wordmark `[DL:D-2026-014]`.
15. **V2 exclusions:** No licensing-marketplace messaging; no institutional pitch beyond `/for/universities`.

### SC-P02 · Patent Search (input + results)  · PT-4
1. **Name:** Public register search (`/search`, `/search?q=`).
2. **Purpose:** The free wedge — full Zone 2 register search with no account `[P4:IA-8]`.
3. **User/role:** Anonymous; any.
4. **Entry:** Global nav Search; Home; deep links.
5. **Exit:** `/patents/{jur}/{number}`; refine query; account gate on *save search/alert* (→ J-B).
6. **Primary action:** Open a document `[P4:PT-4]`.
7. **Secondary:** Facet/filter `[P4:§13.3]`; save search (gated); set alert (gated).
8. **Info displayed:** Query input; facet rail (jurisdiction/date/applicant/inventor/classification/legal status); results; **confidentiality notice** `[P3:FR-S11]`; source/freshness `[P3:FR-S05]`.
9. **Loading:** Result skeletons; facet counts resolve progressively.
10. **Empty (zero results):** What was searched · why nothing matched · one adjustment · one alternate path `[P4:§19.2]`.
11. **Error:** Upstream unavailable → cached + staleness stamp `[P3:NFR-A05]`.
12. **Permissions:** Public read; saving/alerts require Free account.
13. **Phase 5 flow:** F1, F13.
14. **Constraints:** **Zone 2 only**; the public input is visually/behaviourally distinct from app search `[P4:§13.1]`; FR-S11 warning routes suspected-own-invention to the Vault `[P4:§4.2]`.
15. **V2 exclusions:** No portfolio-monitoring overlays; no competitor/citation alerts.

### SC-P03 · Patent Document page  ★ · PT-5
1. **Name:** Patent document (`/patents/{jur}/{number}`).
2. **Purpose:** SEO crown-jewel; genuine added value over the official register; alert/save entry.
3. **User/role:** Anonymous; any.
4. **Entry:** Search results; organic; citations from other docs.
5. **Exit:** Family siblings; cited/cited-by; set alert (→ J-B/F13); Vault (if own-invention warning).
6. **Primary action:** Save / set status alert `[P4:PT-5]`.
7. **Secondary:** Navigate tabbed sections; view family; retrieve official documents.
8. **Info displayed:** Bibliographic header; #overview (+ clearly-labelled AI plain-language summary — Tier-0 on published docs `[P3:§12.1]`); #claims; #description; #status timeline (source + freshness); #family; #citations; #documents `[P4:§4]`.
9. **Loading:** Rendered on first request then cached `[P4:§4.2]`; section skeletons.
10. **Empty:** Sparse-upstream fields shown as "not available from the register"; page `noindex` until enriched `[P4:§23.2]`.
11. **Error:** Register unavailable → cached + staleness stamp.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1, F13.
14. **Constraints:** Freshness stamp per field `[P3:FR-S05]`; AI summary labelled `[P3:§12.3 r5]`; FR-S11 own-invention warning `[P4:§4.2]`.
15. **V2 exclusions:** No monitoring/citation-alert overlay.

### SC-P04 · Stage landings (grouped)  · PT-3
1. **Name:** Solutions by stage (`/solutions/idea-stage|ready-to-file|application-pending|patent-portfolio`).
2. **Purpose:** Lifecycle entry for visitors who can place themselves on the spine.
3. **User/role:** Anonymous.
4. **Entry:** Solutions dropdown; Home; path finder.
5. **Exit:** Stage-appropriate CTA; Pricing; Cost Planner; sign-up.
6. **Primary action:** Contextual to stage `[P4:PT-3]`.
7. **Secondary:** Pricing pointer `[L1]`; path finder.
8. **Info displayed:** Stage framing; what happens here; what it costs `[L1]`; next step.
9. **Loading:** Static.
10. **Empty:** N/A.
11. **Error:** Standard shell.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1.
14. **Constraints:** Price references via PriceDisplay `[P4:IA-7]`; two-axis nothing here; no location-permutation pages `[P4:§4.1]`.
15. **V2 exclusions:** `patent-portfolio` presents MVP portfolio tracking only; no monitoring/renewals CTAs.

### SC-P05 · Segment landings (grouped)  · PT-2
1. **Name:** Audience landings (`/for/startups|companies|researchers|inventors|universities|patent-agents`).
2. **Purpose:** Segment entry (who are you?); `/for/patent-agents` doubles as the supply-side front door.
3. **User/role:** Anonymous (prospective client or agent).
4. **Entry:** "For Agents" top-level; Solutions; Home.
5. **Exit:** Start free; For-agents → J-S1 onboarding; Pricing.
6. **Primary action:** Start free (client) / value-prop CTA (agent) `[P4:PT-2]`.
7. **Secondary:** Path finder; pricing pointer `[L1]`.
8. **Info displayed:** Segment framing; relevant capabilities; pricing pointer.
9-11. **Loading/Empty/Error:** Static; N/A; standard shell.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1; F21 (agents).
14. **Constraints:** `/for/universities` markets **client-app researcher access**, not the V2 institution module `[P4:§7.1]`.
15. **V2 exclusions:** No institutional intake/approval/budget features surfaced as available.

### SC-P06 · Pricing  · PT-6 `[L1]`
1. **Name:** Pricing (`/pricing`).
2. **Purpose:** Real, published numbers — a category differentiator `[P4:§12.2]`.
3. **User/role:** Anonymous.
4. **Entry:** Top-level Pricing; landings; Cost Planner.
5. **Exit:** Start free; Cost Planner; sign-up.
6. **Primary action:** Start / calculate `[P4:PT-6]`.
7. **Secondary:** Jump to official fees; "what affects price."
8. **Info displayed:** Fixed-price service catalogue; **official fees by entity type**; honest variance explanation `[P4:§4]`. Rendered by PriceDisplay — **component mode primary, both modes supported** `[DL:O-2026-001]`; official fees always separately identifiable `[P4:§21.1]`.
9. **Loading:** Fee figures from Rules Engine `[P3:BR-14]`; skeleton on the price component.
10. **Empty:** N/A.
11. **Error:** Rules Engine unavailable → last-known fees + freshness; never a hardcoded fallback `[P3:BR-14]`.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1.
14. **Constraints:** No "affordable/cheap/starting from ₹X" `[P4:§10.3]`; PriceDisplay only `[P4:IA-7]`. Rendering = **`[SLOT: L1 rendering; component primary, both modes; legally OPEN — O-2026-001]`**.
15. **V2 exclusions:** No multi-currency; no enterprise pricing.

### SC-P07 · Cost Planner  · PT-7 `[L1]`
1. **Name:** Cost Planner (`/tools/cost-planner`).
2. **Purpose:** Ungated 20-year lifetime-cost projection — honest arithmetic `[Philosophy §3]`.
3. **User/role:** Anonymous.
4. **Entry:** Tools; Pricing; guides; Home.
5. **Exit:** Export/use output; sign-up to save; Find-your-path.
6. **Primary action:** Use output `[P4:PT-7]`.
7. **Secondary:** Adjust inputs; export; view assumptions.
8. **Info displayed:** Inputs; live 20-year projection with component labelling `[L1]`; entity-type basis; rule-version basis `[P4:§16.1]`.
9. **Loading:** Live recompute from Rules Engine.
10. **Empty:** Default worked example on first load.
11. **Error:** Rules Engine unavailable → last-known + freshness stamp.
12. **Permissions:** Public — **no email gate** `[P4:IA-8]`/`[P3:FR-C01]`.
13. **Phase 5 flow:** F1.
14. **Constraints:** Never gated `[P4:§4.1]`; official fees from Rules Engine `[P3:BR-14]`; PriceDisplay `[P4:IA-7]`.
15. **V2 exclusions:** No multi-currency; no portfolio-wide forecast (that is the authenticated `/app/costs/forecast`).

### SC-P08 · Find-your-path router  · PT-12
1. **Name:** Path finder (`/find-your-path`).
2. **Purpose:** Serve visitors who can place themselves on neither segment nor lifecycle; return a real recommendation + cost range `[P4:§2.1]`.
3. **User/role:** Anonymous.
4. **Entry:** Home; landings; Tools.
5. **Exit:** Recommended action (a stage/segment page, search, or sign-up).
6. **Primary action:** Recommended action `[P4:PT-12]`.
7. **Secondary:** Restart; refine answers.
8. **Info displayed:** Question sequence; recommendation; cost range `[L1]`.
9. **Loading:** Step transitions; final recompute.
10. **Empty:** First question on load.
11. **Error:** If cost range unavailable, show the recommendation without a fabricated figure `[SLOT]`.
12. **Permissions:** Public — **no email required** `[P4:§2.1]`.
13. **Phase 5 flow:** F1 (can't-self-place).
14. **Constraints:** Real recommendation + real range (the corrected Dennemeyer pattern) `[P4:§2.1]`.
15. **V2 exclusions:** No institutional routing.

### SC-P09 · Learn — guides (grouped)  · PT-8
1. **Name:** Guides index + article (`/learn/guides`, `/learn/guides/{slug}`).
2. **Purpose:** Authority-tier content; build for citation `[P4:§23.1]`.
3. **User/role:** Anonymous.
4. **Entry:** Learn; organic; inline glossary links.
5. **Exit:** Related tool; related `/solutions` stage; glossary term.
6. **Primary action:** Related action `[P4:PT-8]`.
7. **Secondary:** TOC; related guides; glossary inline links.
8. **Info displayed:** Article; TOC; related; glossary auto-links `[P4:§23.3]`.
9-11. **Loading/Empty/Error:** Cached; index empty-state teaches the hub; standard shell.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1.
14. **Constraints:** Fee/timeline figures derive from Rules Engine, not hand-authored `[P4:§24.2]`; single content hub (no separate blog) `[P4:§4.1]`.
15. **V2 exclusions:** None specific.

### SC-P10 · Glossary (grouped)  · PT-9
1. **Name:** Glossary index + term (`/learn/glossary`, `/learn/glossary/{term}`).
2. **Purpose:** Public terminology surface; single source shared with in-product tooltips `[P4:§24.2]`.
3. **User/role:** Anonymous.
4. **Entry:** Learn; inline links; in-product "learn more."
5. **Exit:** Related terms; guides.
6. **Primary action:** — (reference) `[P4:PT-9]`.
7. **Secondary:** Related terms; usage notes.
8. **Info displayed:** Plain-language + term-of-art definition; usage; related; jurisdiction `[P4:§24.1]`.
9-11. **Loading/Empty/Error:** Cached; index lists all; standard shell.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1.
14. **Constraints:** Rendered from the same record as tooltips — cannot diverge `[P4:§24.2]`; dual-register rule `[P4:§10.1]`.
15. **V2 exclusions:** None.

### SC-P11 · Jurisdiction guide  · PT-8 variant
1. **Name:** Jurisdiction guide (`/learn/jurisdictions/{jur}`) — MVP: India, PCT.
2. **Purpose:** Process/timeline/fee overview per jurisdiction.
3-7. **User/Entry/Exit/Actions:** Anonymous; Learn/flows; to guides/tools; primary = related action.
8. **Info displayed:** Process overview; timelines; fee structure (from Rules Engine); common pitfalls `[P4:§24.1]`.
9-11. **Loading/Empty/Error:** Cached; MVP shows India+PCT only; Rules Engine failure → last-known + freshness.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1.
14. **Constraints:** Figures from Rules Engine `[P4:§24.2]`; jurisdiction is a path segment `[P4:U8]`.
15. **V2 exclusions:** Only India/PCT for MVP `[P3:§12.4]`; US/EP/etc. are V2+.

### SC-P12 · Reports  · PT-8 variant
1. **Name:** Research reports (`/learn/reports/{slug}`).
2. **Purpose:** Original research, built for citation `[P4:§23.1]`.
3-7. Anonymous; Learn/organic; to guides/tools; primary = related action.
8. **Info displayed:** Title; methodology; data; findings; publication date `[P4:§24.1]`.
9-11. Cached; index empty-state; standard shell.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1.
14. **Constraints:** No unverifiable statistics as headline `[P4:§23.5]`.
15. **V2 exclusions:** None.

### SC-P13 · Public agent directory + profile  · PT-10 `[L1]`
1. **Name:** Agent directory + public profile (`/agents`, `/agents/{slug}`).
2. **Purpose:** Public, SEO-relevant agent profiles; the outcome-record surface `[P3:M2.4]`.
3. **User/role:** Anonymous; prospective client.
4. **Entry:** Directory; organic; from matching results.
5. **Exit:** Engage (→ app matching/quote, requires account) `[L1]`.
6. **Primary action:** Engage `[P4:PT-10]`.
7. **Secondary:** Filter directory; view credentials/specializations.
8. **Info displayed:** Verified credentials; technical background; specializations; jurisdiction; languages; **outcome statistics only at n≥20 with sample size + confidence indicator; below floor "not enough data yet"** `[DL:D-2026-019]`/`[P3:BR-17]`; professional-fee display governed by L1 `[L1-04]`.
9. **Loading:** Profile skeleton; stats block resolves separately.
10. **Empty:** New agent below the floor → "not enough data yet" (no statistic) `[DL:D-2026-019]`.
11. **Error:** Stats unavailable → omit block, never a fabricated number.
12. **Permissions:** Public read; Engage requires account + Owner role downstream.
13. **Phase 5 flow:** F14 context.
14. **Constraints:** n≥20 floor; sample size + confidence always shown; **publication go-live is L3-gated** `[DL:D-2026-019]`. Confidence-indicator representation = **`[SLOT]`**. Professional-fee display = **`[SLOT: L1-04]`**.
15. **V2 exclusions:** No licensing-marketplace listings.

### SC-P14 · Trust pages (grouped)  · PT-11
1. **Name:** Trust (`/trust/security|ai|limitations|subprocessors|status`).
2. **Purpose:** Structured, honest disclosure; model providers named; no-training pledge `[P4:§4]`.
3-7. Anonymous; footer (every page); to relevant policy; primary = —.
8. **Info displayed:** Security; AI policy (providers named `[P3:§12.6]`); limitations (what we can/can't do); subprocessors; status.
9-11. Cached; N/A; standard shell.
12. **Permissions:** Public.
13. **Phase 5 flow:** F1.
14. **Constraints:** Providers named publicly `[P3:§12.6]`; limitations page states the 18-month blind spot honestly `[P3:§12.5]`. Legal wording = **`[SLOT: L4 privilege/disclaimer wording — counsel]`**.
15. **V2 exclusions:** None.

### SC-P15 · Company + Legal (grouped)  · PT-11 variant
1. **Name:** Company (`/company/*`) + Legal (`/legal/terms|privacy|disclaimer`).
2. **Purpose:** Corporate + legal content.
8. **Info displayed:** About/careers/contact; terms/privacy/disclaimer. Contracting parties & fee terms in `/legal/terms` governed by L1 `[L1-20]`.
12-15. Public; F1; legal wording = **`[SLOT: L1-20, L4 — counsel]`**; no V2 features implied.

### SC-P16 · Account creation & sign-in
1. **Name:** Sign up / Sign in / Email verification.
2. **Purpose:** The single conversion gate at ongoing value `[P4:IA-8]`.
3. **User/role:** Anonymous → Registered.
4. **Entry:** Any account-gated action (save search, alert, start Disclosure), "Start free," "Sign in."
5. **Exit:** **Return to the action being attempted** `[P5:F2]`; if starting a Disclosure → J-C/J-D.
6. **Primary action:** Create account / verify email / sign in.
7. **Secondary:** Resend verification; recover password; switch to sign-in.
8. **Info displayed:** Email input; verification prompt; **no phone, no sales contact** `[P3:J1]`.
9. **Loading:** Verification-sending state.
10. **Empty:** N/A.
11. **Error:** Verification incomplete → action held, account inert until verified, resend offered; email already registered → routed to sign-in with intent preserved `[P5:F2 failure]`.
12. **Permissions:** Public → Free.
13. **Phase 5 flow:** F2.
14. **Constraints:** Context preserved across the gate `[P5:F2]`; **no Workspace created here** (A1) `[DL:D-2026-015]`.
15. **V2 exclusions:** No SSO/enterprise identity (not in MVP scope; treat as **`[SLOT: MFA applies to agent/internal; client MFA policy per §4.1]`**).

---

## 2. Client surface (`/app`) — SC-C

### SC-C00 · Workspace creation interstitial
1. **Name:** Workspace setup (interstitial on first Disclosure).
2. **Purpose:** Create the client tenancy at the moment an Invention first needs holding (A1) `[DL:D-2026-015]`.
3. **User/role:** Registered (becomes Workspace Owner) or invitee joining an existing Workspace.
4. **Entry:** First "Record an invention"; an invitation link.
5. **Exit:** Into J-D (disclosure capture) with a valid Workspace context.
6. **Primary action:** Create workspace (name only) `[P5:F3]`.
7. **Secondary:** Accept invitation (join with assigned role); defer other setup to Settings.
8. **Info displayed:** Workspace name field; role explanation for invitees.
9. **Loading:** Create/join spinner.
10. **Empty:** N/A (single-step).
11. **Error:** Invitation expired/invalid → clear message + path to request a fresh invitation `[P5:F3 failure]`.
12. **Permissions:** Owner on creation; invitee joins as Admin/Member/Viewer (never Owner) `[P5:F3]`/`[P3:§4.1]`.
13. **Phase 5 flow:** F3.
14. **Constraints:** Named Inventor without membership gets **no** Workspace, only Invention visibility `[P4:IA-5]`; minimal setup only `[P5:F3]`.
15. **V2 exclusions:** No institutional ownership wrapper `[DL:D-2026-015 A3]`.

### SC-C01 · Home — Action queue  ★ · AT-1
1. **Name:** Client Home / action queue (`/app`).
2. **Purpose:** The most-visited authenticated screen; answer "what needs me?" in seconds `[P5:§12.5]`.
3. **User/role:** All Workspace roles; Named Inventor (scoped subset).
4. **Entry:** Sign-in (J-C3 returning); wordmark; attention badge `⚑`.
5. **Exit:** Any object detail; the single action per queue item.
6. **Primary action:** Act on the top *Needs you* item `[P4:§18.1]`.
7. **Secondary:** Open *Waiting on others*; *Recently changed*; portfolio glance.
8. **Info displayed:** Four fixed regions in order — **Needs you** (what · why · by when · one action) → **Waiting on others** (who · what · expected when) → **Recently changed (7d)** → **Portfolio at a glance** (counts by state · next 90 days · spend `[L1]`) `[P4:§18.1]`.
9. **Loading:** Region skeletons; *Needs you* first.
10. **Empty (first-run):** "What this workspace is for; the lifecycle in one line" → **Record your first invention** `[P4:§19.1]`.
11. **Error:** Per-region degradation; the queue never renders a false "all clear" if data is stale (staleness shown).
12. **Permissions:** Role-scoped; Members see no costs/billing `[P4:§17.2]`; Viewer read-only; Named Inventor sees only their Invention(s) `[P4:IA-5]`.
13. **Phase 5 flow:** F20.
14. **Constraints:** Two-axis status on every item `[AP-14]`; *Needs you* vs *Waiting on others* is the core distinction `[P5:§12.5]`; sort = deadline proximity then criticality `[P4:§13.4]`.
15. **V2 exclusions:** No portfolio-monitoring/competitor-alert widgets.

### SC-C02 · Inventions index  · AT-2
1. **Name:** Inventions (`/app/inventions`).
2. **Purpose:** The Vault — the pre-filing spine; all Inventions incl. *Not pursued* `[P4:§5.1]`.
3. **User/role:** Workspace roles; Named Inventor (own only).
4. **Entry:** Global nav; Home; Portfolio cross-link.
5. **Exit:** Invention detail; `/app/inventions/new`.
6. **Primary action:** Record an invention `[P4:§19.1]`.
7. **Secondary:** Filter (state/technical domain/date/has-applications) `[P4:§13.3]`; switch view; bulk actions.
8. **Info displayed:** Invention rows with **lifecycle + attention** pair, technical domain, recorded date, next action.
9. **Loading:** List skeleton; facet counts progressive.
10. **Empty (first-run):** "What an Invention is; why recording early matters" → **Record an invention** `[P4:§19.1]`.
11. **Error:** Standard; filters preserved in URL `[P4:U5]`.
12. **Permissions:** Members/Owner/Admin create; Viewer read-only; Named Inventor sees only own `[P4:§17.2]`.
13. **Phase 5 flow:** F4 entry, F20.
14. **Constraints:** Invention-as-spine `[IA-1]`; opaque IDs (titles confidential) `[P4:§9.2]`; two-axis status.
15. **V2 exclusions:** No re-assessment-with-diff affordance `[P5:§9-C]`.

### SC-C03 · Disclosure capture (guided flow)  ★ · AT-4
1. **Name:** Disclosure capture (`/app/inventions/new`, `/app/inventions/{id}/disclosure/edit`).
2. **Purpose:** Structured, guided Zone-1 capture that becomes the immutable record `[P3:M1.2]`.
3. **User/role:** Owner/Admin/Member (not Viewer); the current edit-session holder (A3).
4. **Entry:** Record an invention; resume from *Drafting*; Invention detail.
5. **Exit:** Mark complete → Invention *Recorded* → next action "Request assessment"; save-and-resume exit.
6. **Primary action:** Save & continue / Mark complete `[P5:F4]`.
7. **Secondary:** Add attachments; add Named Inventors; view version history; leave (auto-saved).
8. **Info displayed:** Step progress; one question group per step (problem → prior approaches → invention → how it works → variants → advantages); **mandatory prior-disclosure interrogation** `[P3:FR-D03]`; completeness check output (Tier-1 AI: structure/prompt only, **never patentability**) `[P3:§12.1]`; **edit-session lock indicator** ("being edited by X" when held by another) — see §8.4 WP-1.
9. **Loading:** Per-step save; completeness-check running state.
10. **Empty:** Fresh guided flow with first step.
11. **Error:** Attachment upload fails → **text disclosure unaffected and saved**, retry offered `[P5:F4 failure]`; abandon → persists in *Drafting*, all versions intact `[P5:§8-B]`.
12. **Permissions:** Edit roles only; **soft edit-session lock**, sequential not concurrent (A3) `[DL:D-2026-015]`; Named Inventors without membership view only `[P4:§17.2]`.
13. **Phase 5 flow:** F4; F3 (workspace on first).
14. **Constraints:** **Zone 1 from first keystroke** `[P3:D2]`; every save = immutable version `[P3:FR-D02]`/`[BR-20]`; prior-disclosure step cannot be skipped; no AI patentability at capture `[P3:§12.1]`.
15. **V2 exclusions:** No concurrent multi-inventor editing; no consent model; no institutional intake `[DL:D-2026-015 A3]`/`[P5:§10]`. **`[FLAG: A3 handoff — soft-lock designed; single-designated-editor restriction would be a new permission decision]`**.

### SC-C04 · Invention detail  ★ · AT-3
1. **Name:** Invention detail (`/app/inventions/{id}`).
2. **Purpose:** The hub for one Invention across its whole life; dignified even in *Not pursued* `[P4:§15.1]`.
3. **User/role:** Workspace roles; Named Inventor (if named).
4. **Entry:** Inventions index; Home; relationship rails; breadcrumbs.
5. **Exit:** Disclosure/versions; Assessments; Applications; Decisions; Documents; Request assessment; Find an agent.
6. **Primary action:** Contextual next action — *Continue recording* / *Request assessment* / *Decide* / *Find an agent* / *View applications* `[P4:§15.1]`.
7. **Secondary:** Tab navigation; relationship rail (Applications · Matters · Assessments · Documents).
8. **Info displayed:** Identity (title · domain · recorded date · inventors); **status pair**; next action; tabs (Overview · Disclosure · Assessments · Applications · Decisions · Documents); plain-language summary; own-history timeline; protection status across jurisdictions `[P4:§15.1]`.
9. **Loading:** Header first, then tab content.
10. **Empty:** Tabs with no content teach what will appear and offer the enabling action.
11. **Error:** Standard.
12. **Permissions:** Members no costs/billing; Viewer read-only; Named Inventor sees this Invention only, never workspace/portfolio `[P4:§17.2]`.
13. **Phase 5 flow:** F4, F9, F10, F11, F20.
14. **Constraints:** Object skeleton `[P4:§15]`; relationship graph one-click `[P4:§12.5]`; **Not pursued is a complete page, not a husk** `[P4:§15.1]`; assessment travels with the Invention `[ADR:§11]`.
15. **V2 exclusions:** No renewals tab surfaced as active; no re-assessment diff.

### SC-C05 · Disclosure & versions
1. **Name:** Disclosure current + version history (`/disclosure`, `/disclosure/versions`).
2. **Purpose:** Show the current Disclosure and the immutable conception-evidence trail `[P4:§5]`.
3-7. **User/Entry/Exit/Actions:** Edit/view roles; Invention detail; to edit flow (SC-C03) or assessment; primary = Edit (if permitted)/Request assessment; secondary = view a prior version.
8. **Info displayed:** Current version; timestamped version list; which version is referenced by a released Assessment/filing (immutable marker) `[BR-20]`.
9-11. **Loading/Empty/Error:** Version-list skeleton; empty until first save; standard.
12. **Permissions:** As SC-C04; edit gated by the soft-lock `[DL:D-2026-015]`.
13. **Phase 5 flow:** F4.
14. **Constraints:** Immutable versions `[P3:FR-D02]`/`[BR-20]`; Zone 1.
15. **V2 exclusions:** No diff-against-prior-assessment view `[P5:§9-C]`.

### SC-C06 · Assessment request
1. **Name:** Request assessment (flow/modal on a *Recorded* Invention).
2. **Purpose:** Start the free, human-reviewed assessment `[ADR:§7]`.
3. **User/role:** Owner/Admin/Member.
4. **Entry:** Invention detail next action; Disclosure complete.
5. **Exit:** Assessment *Analysing*; user told they'll be notified.
6. **Primary action:** Request assessment `[P5:F5]`.
7. **Secondary:** Choose jurisdiction(s) (India/PCT) and assessment type; cancel.
8. **Info displayed:** Jurisdiction/type selection; **"free, no payment, no engagement"** `[ADR:§7]`; honest expectation — automated analysis then human review with a **committed turnaround** `[SLOT: turnaround]` `[ADR:§9]`.
9. **Loading:** Submit → *Requested*/*Analysing* transition.
10. **Empty:** N/A.
11. **Error:** Disclosure not complete → blocked with a clear reason, routed back to finish F4 `[P5:F5 alt]`; analysis can't start → holds in *Requested*, "queued not lost," retry `[P5:F5 failure]`.
12. **Permissions:** Edit roles; not Viewer.
13. **Phase 5 flow:** F5.
14. **Constraints:** **No payment/Engagement** `[P5:X5]`; **no gate** on free assessment `[DL:D-2026-017]`; MVP jurisdictions India/PCT only `[P3:§12.4]`; retired "hours/seconds" language banned `[P4:§10.3]`.
15. **V2 exclusions:** No paid/expedited tier; no eligibility gate.

### SC-C07 · Assessments list (per Invention)
1. **Name:** Assessments (`/app/inventions/{id}/assessments`).
2. **Purpose:** All assessments for an Invention, newest first `[P4:§15.1]`.
3-7. Workspace roles; Invention detail tab; to assessment detail; primary = open latest; secondary = open a prior assessment.
8. **Info displayed:** Each assessment: verdict, reviewer, date, assessed Disclosure version, status (Analysing/In review/Released).
9-11. Skeleton list; empty until first request; standard.
12. **Permissions:** As SC-C04.
13. **Phase 5 flow:** F6, F9.
14. **Constraints:** Two-axis (lifecycle + attention) per row; assessment travels with Invention `[ADR:§11]`.
15. **V2 exclusions:** No cross-assessment diff.

### SC-C08 · Assessment detail — the verdict  ★★ · AT-7 / AT-3
1. **Name:** Assessment detail (`/app/inventions/{id}/assessments/{aid}`).
2. **Purpose:** The highest-stakes screen — where the trust promise is kept or broken `[P5:§12.2]`/`[P4:§15.2]`.
3. **User/role:** Any role with permission on the Invention.
4. **Entry:** Assessments list; Home *Needs you* (verdict ready); notification.
5. **Exit:** Decide not to file (SC-C09/J-H); Decide to file (J-I → matching); Inconclusive → supply-what's-missing → new assessment (SC-C06).
6. **Primary action:** Decide (file / don't file) `[P4:§15.1]`.
7. **Secondary:** Expand reasoning (depth 2); open evidence (depth 3); click any citation to source; view reviewer notes; re-assess.
8. **Info displayed (three depths)** `[P4:§16]`: **D1 Verdict** — *Looks protectable / Protectable with changes / Unlikely to be protectable / Not enough to assess* `[P4:§11.6]`, confidence + basis `[SLOT: confidence representation]`, plain-language meaning, next steps; **D2 Reasoning** — element-by-element, each blocking/relevant reference and why, statutory-exclusion analysis (India s.3(k)/s.3(d)); **D3 Evidence** — every assertion clickable to exact source `[BR-02]`, full reference list, coverage statement, 18-month blind-spot notice; **Persistent** — reviewer name + notes, date, assessed Disclosure version `[BR-01]`.
9. **Loading:** While *Analysing/In review*, this screen shows the lifecycle state + whose-turn + expected turnaround, not a blank; released content loads depth 1 first.
10. **Empty:** Pre-release state (In review) shows reviewer-pending status, never a partial/unreviewed verdict `[BR-01]`.
11. **Error:** **A citation that fails to resolve is not shown as verified** — the assertion fails safe `[P5:X2]`/`[P4:§15.2]`; assessment job failure → plain explanation, what was retained, retry/escalation `[P4:§19.3]`.
12. **Permissions:** View per Invention permission; only Owner can proceed to engage/pay downstream `[P4:§17.2]`.
13. **Phase 5 flow:** F9 (F6 produces it).
14. **Constraints:** **Human review gate — no unreviewed verdict ever shown** `[BR-01]`/`[P5:X1]`; provenance mandatory `[BR-02]`; citations a **primary visual element**, not footnotes `[P4:§15.2]`; coverage statement **never collapsed by default on unfavourable** `[P4:§15.2]`; unfavourable designed at least as carefully as favourable `[P5:§12.2]`; AI vs human content visually distinguishable `[P3:§12.3 r5]`.
15. **V2 exclusions:** No re-assessment diff view `[P5:§9-C]`; no in-product drafting from the verdict.

### SC-C09 · Decision record (file / not file)
1. **Name:** Record decision (`/app/inventions/{id}/decisions`, + action from assessment).
2. **Purpose:** Capture the client's decision with rationale (BR-09); realise the first-class "don't file" outcome `[P5:F10]`.
3. **User/role:** Owner (to file); Owner/Admin/Member may record a not-file decision `[SLOT: which roles may record a not-file Decision — §4.1 gives create/edit to Member; engage/pay is Owner-only; recording a Decision entity is not explicitly role-mapped]`.
4. **Entry:** Assessment detail; Invention detail.
5. **Exit:** *Not pursued* (with alternatives) or → J-I/matching.
6. **Primary action:** Record decision `[P3:BR-09]`.
7. **Secondary:** View alternatives (design around / trade secret / defensive publication / defer); reconsider later.
8. **Info displayed:** Decision type; actor; rationale; **four alternatives with equal visual weight** on not-file `[P4:§11.6]`; "no money, no engagement" `[ADR:§7]`.
9-10. **Loading/Empty:** Submit transition; N/A.
11. **Error:** None material on not-file (creates nothing that can fail) `[P5:F10]`.
12. **Permissions:** Engage/pay = Owner only `[P4:§17.2]`; Member filing intent routes to request Owner action `[P5:X13]`.
13. **Phase 5 flow:** F10, F11.
14. **Constraints:** Decision entity requires a human actor `[BR-09]`; Invention persists in Vault on not-file `[AP-01]`; alternatives are options, not consolation `[P4:§11.6]`.
15. **V2 exclusions:** No automated defensive-publication service; no abandon/renew tooling (renewals V2).

### SC-C10 · Portfolio index  · AT-2
1. **Name:** Portfolio (`/app/portfolio`).
2. **Purpose:** Filed Applications — the post-filing operational spine `[P4:§5.1]`.
3-7. Workspace roles; nav/Home/Invention cross-link; to Application detail; primary = open application; secondary = view switch (list/family/timeline/map), filter.
8. **Info displayed:** Application rows: lifecycle state + official sub-status + attention; jurisdiction; family; agent; next deadline `[P4:§13.3]`.
9-11. Skeleton; **first-run empty** = "why empty (nothing filed); relationship to Inventions" → Go to Inventions `[P4:§19.1]`; standard.
12. **Permissions:** Members no costs; Viewer read-only; Named Inventor sees only applications on their Invention `[P4:§17.2]`.
13. **Phase 5 flow:** F16, F19, F20.
14. **Constraints:** Applications are children of Inventions `[IA-1]`; two-axis status; opaque internal IDs in `/app` `[P4:§9.2]`.
15. **V2 exclusions:** No portfolio monitoring; renewals view is V2.

### SC-C11 · Application detail (incl. silence + Responding)  ★ · AT-3
1. **Name:** Application detail (`/app/portfolio/{appId}` + `/status`, `/deadlines`, `/documents`, `/costs`, `/family`).
2. **Purpose:** Track one filed Application; carry the silence view and the status-only Responding state `[P4:§15.3]`/`[DL:D-2026-016]`.
3. **User/role:** Workspace roles; Named Inventor (status/deadlines/documents for their Invention's application) `[P4:§17.2]`.
4. **Entry:** Portfolio; Home; status-change notification; Invention → Applications.
5. **Exit:** Deadline detail; Matter; Family sibling; parent Invention; upload response (Responding).
6. **Primary action:** Contextual — *Confirm deadline* / *Review response* / *Decide renewal (V2)* / **"Nothing needed — next expected event ~[date]"** `[P4:§15.3]`.
7. **Secondary:** Open timeline; deadlines; documents; costs `[L1]`; family.
8. **Info displayed:** Identity (official number · title · jurisdiction · filing/priority dates); **status pair with official sub-status** `[P4:§11.3]`; event timeline with **source + freshness per entry**; **silence view** when quiet `[P4:§19.4]`; at *Responding*: status + response deadline + agent-uploaded filed response + honest "agent handling off-platform" copy `[DL:D-2026-016]`.
9. **Loading:** Header/status first; timeline streamed.
10. **Empty:** **Silence view** ★ — "Nothing has happened — and that's expected," last event, expected-next range `[SLOT: range from Rules Engine/field timelines]`, "nothing required from you," "monitoring daily," + [What happens next]/[Why so long] `[P4:§19.4]`.
11. **Error:** Register unavailable → last-known + staleness stamp `[P3:NFR-A05]`; source/computation conflict → honest human-checked position, routed to Docket Ops `[P3:§20.3]`.
12. **Permissions:** Members no costs; Viewer read-only; Named Inventor narrow subset; assigned Agent sees within matter scope only `[P4:§17.2]`.
13. **Phase 5 flow:** F19; J-N/§9-A (Responding); F16 (creation).
14. **Constraints:** Two-axis status `[AP-14]`; **"Closed" never without its reason** `[P4:§11.3]`; deadlines computed + human-confirmable `[P5:X9]`; **Responding is status-only — no prosecution workspace** `[DL:D-2026-016]`/`[P5:§9-A]`; deadline safety `[AP-07]`.
15. **V2 exclusions:** **No in-product examination-response authoring, no prosecution workspace, no renewals** `[P5:§10]`.

### SC-C12 · Deadlines index  · AT-6
1. **Name:** Deadlines (`/app/deadlines`, `?view=calendar|list`).
2. **Purpose:** All client deadlines across applications; safety-critical visibility `[AP-07]`.
3-7. Workspace roles; nav/Home; to deadline detail; primary = open the due/approaching item; secondary = calendar/list switch, filter (criticality/state/range/jurisdiction/application) `[P4:§13.3]`.
8. **Info displayed:** Deadline rows with **criticality + state** (Upcoming/Approaching/Due/Confirmed/Met/Missed/Superseded/N-A) `[P4:§11.5]`, application, date; criticality never colour-only `[P4:§22.3]`.
9-11. Skeleton/calendar render; **first-run empty** = "deadlines appear once something is filed" `[P4:§19.1]`; standard.
12. **Permissions:** Workspace-scoped; Viewer read-only.
13. **Phase 5 flow:** F19; C-2 notifications.
14. **Constraints:** Deadlines computed from versioned rules, never authored `[P5:X9]`/`[P3:D1]`; criticality shown with icon+text+colour `[P4:§22.3]`.
15. **V2 exclusions:** No renewals calendar as an active feature.

### SC-C13 · Deadline detail (computation trace)
1. **Name:** Deadline detail (`/app/deadlines/{id}`).
2. **Purpose:** Depth-3 transparency — the exact computation behind a date `[P4:§16.1]`/`[BR-13]`.
3-7. Workspace roles; deadlines index/application; to application/matter; primary = (client) acknowledge/understand; secondary = view rule/trace.
8. **Info displayed:** D1 date + criticality; D2 why (trigger event + window); D3 **full computation trace** — rule ID, version, statutory citation, calendar adjustment, available extensions `[P4:§16.1]`/`[BR-13]`. (Governing Rule visible to agents/ops only `[P4:§12.5]`.)
9-11. Skeleton; N/A; trace unavailable → show date + honest "trace loading/unavailable," never a fabricated basis.
12. **Permissions:** Clients see the trace; the underlying Rule object is agent/ops-only `[P4:§12.5]`.
13. **Phase 5 flow:** F19; §8-G at-risk.
14. **Constraints:** **Human confirmation for critical deadlines** `[BR-03]`/`[P5:X9]`; trace stored with the deadline `[BR-13]`; never silently modify deadline history `[AP-07]`.
15. **V2 exclusions:** None.

### SC-C14 · Matters index  · AT-2
1. **Name:** Matters (`/app/matters`).
2. **Purpose:** The client's professional engagements.
3-7. Owner/Admin/Member (Members no costs); nav/Home; to matter workspace; primary = open matter; secondary = filter (state/agent/invention/date), sort by last activity `[P4:§13.4]`.
8. **Info displayed:** Matter rows: state (Quoted/Engaged/In progress/Awaiting you/Awaiting the office/Complete/Closed) `[P4:§11.4]`, agent, invention, whose-turn, cost cell `[L1]`.
9-11. Skeleton; empty = "engagements appear when you engage an agent"; standard.
12. **Permissions:** Owner/Admin full; Member no costs `[P4:§17.2]`; Viewer read-only.
13. **Phase 5 flow:** F15, F16, F17.
14. **Constraints:** Cross-tenancy invisibility `[IA-5]`; cost cell via PriceDisplay `[L1]`.
15. **V2 exclusions:** None specific.

### SC-C15 · Matter workspace  ★ · AT-3
1. **Name:** Matter workspace (`/app/matters/{id}` + `/activity`, `/documents`, `/decisions`, `/costs`).
2. **Purpose:** The engaged-work surface; always answer the four questions `[P4:§15.4]`.
3. **User/role:** Owner/Admin/Member (Member no costs); assigned Agent (agent-side surface SC-A05).
4. **Entry:** Matters index; Home; notification; from Application/Invention.
5. **Exit:** Approve/decline a requested decision; open documents; deadlines; costs; parent Invention/Application.
6. **Primary action:** The current requested client action (e.g. **review the application document before filing**) `[P3:J3 step9]`.
7. **Secondary:** Message within the matter (C-1); view documents/decisions/deadlines/costs.
8. **Info displayed:** **Four-cell header — Where · What's next · Needs you · Cost `[L1]`** in every state (incl. "Nothing needed") `[P4:§15.4]`; Activity timeline + in-context messages `[P3:M1.6]`; documents; decisions requested of the client; costs `[L1]`.
9. **Loading:** Header cells first; activity streamed.
10. **Empty:** New matter with "Nothing needed" valid in the third cell `[P4:§15.4]`.
11. **Error:** Message push fails → in-app persistence; message never lost `[P5:F17 failure]`; payment-related errors handled in SC-C19.
12. **Permissions:** Matter-scoped; **communication confined to the active matter; no client↔reviewer channel** `[DL:D-2026-015 A2]`; Members no costs `[P4:§17.2]`.
13. **Phase 5 flow:** F16, F17.
14. **Constraints:** Four questions always answered `[P4:§15.4]`; **communication never crosses matter/tenancy boundaries** `[P5:X6,X7]`; client approval is a human decision `[BR-09]`; client files nothing — the agent files `[BR-09/T3]`.
15. **V2 exclusions:** **No drafting/prosecution workspace** — the agent uploads a prepared document `[P5:§9-A]`/`[P5:§10]`.

### SC-C16 · Costs  · AT-7 `[L1]`
1. **Name:** Costs (`/app/costs/summary`, `/invoices`, `/forecast`).
2. **Purpose:** Spend to date, committed, forecast; 20-year projection across the portfolio `[P4:§5]`.
3. **User/role:** Owner/Admin (**not** Member — Members have no costs) `[P4:§17.2]`.
4. **Entry:** Nav; Home portfolio glance; matter/application cost cells.
5. **Exit:** Invoice detail; billing settings; application/matter costs.
6. **Primary action:** Review spend / open invoice `[P4:§5]`.
7. **Secondary:** Switch summary/invoices/forecast; export.
8. **Info displayed:** Spend to date; committed; forecast; **invoice structure (single or multiple issuers)** `[L1-10]`; 20-year projection `[L1-09]`; official fees separately identifiable `[P4:§21.1]`.
9-11. Skeleton; empty = "costs appear once you engage/file"; Rules Engine/billing unavailable → last-known + freshness, no hardcoded fees `[BR-14]`.
12. **Permissions:** Owner/Admin only; Viewer/Member excluded from costs `[P4:§17.2]`.
13. **Phase 5 flow:** F15, F16.
14. **Constraints:** PriceDisplay only `[P4:IA-7]`; component primary/both modes `[DL:O-2026-001]`; official fees from Rules Engine `[BR-14]`.
15. **V2 exclusions:** No multi-currency; renewals cost lines are V2.

### SC-C17 · Documents index  · AT-2
1. **Name:** Documents (`/app/documents`).
2. **Purpose:** All documents, searchable/filterable, with provenance and access log `[P4:§5]`.
3-7. Workspace roles; nav; to a document; primary = open; secondary = filter (type/matter/application/date/source) `[P4:§13.3]`.
8. **Info displayed:** Document rows: class, version, source, matter/application, date; access log entry point `[P4:§24.3]`.
9-11. Skeleton; empty = "documents appear as you record, assess and file"; standard.
12. **Permissions:** Role/zone-scoped; Docket Ops sees metadata only, bodies consent-gated `[BR-16]`; cross-tenancy invisible `[IA-5]`.
13. **Phase 5 flow:** F16, F19.
14. **Constraints:** Zone/retention respected `[P3:§19]`; immutable filed-document retention `[BR-18]`.
15. **V2 exclusions:** No drafting/versioning workspace for specifications (V2).

### SC-C18 · Find an agent — matching  · AT-2 / PT-10-linked `[L1]`
1. **Name:** Agent Matching / Engagement — matching (`/app/find-an-agent`, `/results`).
2. **Purpose:** Match a client to a Verified Agent on published fixed prices, conflict-checked first `[Glossary: Agent Matching]`/`[P3:M1.5]`.
3. **User/role:** **Workspace Owner** `[P4:§17.2]`.
4. **Entry:** Decision to file (J-I) from a favourable/qualified verdict.
5. **Exit:** Agent quote (SC-C19); notify-me if none available; back to Invention.
6. **Primary action:** Select an agent → view quote `[P5:F14]`.
7. **Secondary:** Filter matches; open a public profile; compare rationale.
8. **Info displayed:** Matched agents with **rationale** (e.g. "matters in this domain · availability") and **fixed published prices before engagement** `[FR-M01,FR-M03,BR-06]`; profiles with credentials, background, jurisdiction, languages, outcome stats **only at n≥20 with sample size + confidence indicator** `[DL:D-2026-019]`; pricing via PriceDisplay `[L1-05]`.
9. **Loading:** Conflict check runs **before any agent is shown** `[BR-10]`; match list skeleton after check.
10. **Empty:** No agent in domain/jurisdiction → honest message + notify-me; Invention/Assessment persist; **no fabricated matches** `[P5:F14 alt]`.
11. **Error:** Conflict check can't complete → matching does not proceed; "temporary hold, not a rejection" — **fails closed** `[BR-10]`/`[P5:F14 failure]`.
12. **Permissions:** Owner only; conflicted agents silently excluded `[P5:§8-H]`.
13. **Phase 5 flow:** F14.
14. **Constraints:** Use **"Agent Matching / Engagement," never "Marketplace"** `[DL:D-2026-013/ADR §13.8]`; conflict-first `[BR-10]`; fixed pricing `[BR-06]`; n≥20 + sample size + confidence `[DL:D-2026-019]`; L3 gates stat publication.
15. **V2 exclusions:** No licensing marketplace; no reviewer-continuity forcing.

### SC-C19 · Quote & engagement (checkout)  ★ `[L1]`
1. **Name:** Agent quote + engagement acceptance (`/app/find-an-agent/{agentId}/quote`, checkout).
2. **Purpose:** Turn an accepted fixed-price quote into an Engagement + Matter `[P5:F15]`.
3. **User/role:** Workspace Owner only `[P4:§17.2]`.
4. **Entry:** From matching (SC-C18).
5. **Exit:** Matter workspace (SC-C15) on success; back to matching on failure/agent-unavailable.
6. **Primary action:** Accept scope & quote → engage `[P5:F15]`.
7. **Secondary:** Review scope; request scope change (→ new quote) `[BR-06]`; view what/whom you're contracting with `[L1-06]`.
8. **Info displayed:** Scope; fixed-price quote via PriceDisplay (component primary/both modes; official fees separable) `[L1-05,06,12]`; contracting parties `[L1-06]` `[SLOT: L1 wording — legal]`.
9. **Loading:** Payment processing state.
10. **Empty:** N/A.
11. **Error:** **Payment fails → Matter NOT created; Invention holds in *Assessed*; "nothing at risk, no deadline exists"; retry offered** `[P5:§8-K]`/`[P4:§19.3]`; agent unavailable between quote and acceptance → return to matching, scope preserved `[P5:F15 alt]`.
12. **Permissions:** Owner only; conflict check already passed `[P5:F15 pre]`.
13. **Phase 5 flow:** F15.
14. **Constraints:** **Engagement/Matter/payment appear here, never before the free assessment** `[P5:X5]`/`[ADR:§7]`; matter-scoped grant on acceptance `[P6/D4]`; fixed pricing `[BR-06]`; PriceDisplay `[IA-7]`.
15. **V2 exclusions:** No multi-currency; no split-jurisdiction bundling beyond one Application per jurisdiction `[P5:F16 alt]`.

### SC-C20 · Settings  · AT-8
1. **Name:** Settings (`/app/settings/profile|workspace|members|notifications|billing|security|data`).
2. **Purpose:** Account, workspace, members, notification, billing, security, data controls.
3. **User/role:** Owner (full); Admin (all except billing/deletion); Member/Viewer limited `[P3:§4.1]`.
4. **Entry:** Utility nav (avatar).
5. **Exit:** Back to app; destructive actions isolated.
6. **Primary action:** Save a settings group `[P4:§14.2 AT-8]`.
7. **Secondary:** Invite members; set notification preferences; manage MFA/sessions/access log; export/retention/deletion.
8. **Info displayed:** Profile; workspace; members + roles; notification preferences (**Critical cannot be muted, stated here**) `[P4:§18.2]`; billing `[L1]`; security (MFA, sessions, access log); data (export, retention, deletion).
9-11. Form states; N/A; validation errors associated programmatically `[P4:§22.3]`.
12. **Permissions:** Billing/deletion = Owner only; access log visible to Owner incl. support impersonation `[BR-16]`.
13. **Phase 5 flow:** F18 (preferences); F2/F3 context.
14. **Constraints:** **Critical class unmutable** `[P4:§18.2]`; support access justified/time-boxed/logged `[BR-16]`; destructive actions isolated `[P4:§14.2]`.
15. **V2 exclusions:** No enterprise SSO; no data-residency selector as an active control (residency is a workspace attribute; activation is L7-dependent) `[SLOT: L7]`.

### SC-C21 · Notification centre (client)
1. **Name:** Notifications (client).
2. **Purpose:** Grouped, class-ordered notification surface `[P4:§18.2]`.
3-7. All roles; attention badge `⚑`/utility; to the referenced object; primary = act on a Critical/Action item; secondary = mark read (non-critical), open digest.
8. **Info displayed:** Grouped by class **Critical → Action required → Progress → Informational** (not chronological) `[P4:§18.2]`; each with object link and whose-turn.
9-11. Skeleton; empty = "you're all caught up" (honest, not urgency theatre); delivery-failure of Critical escalates to Docket Ops `[P5:§8-F]`.
12. **Permissions:** Per-user; role-scoped objects only.
13. **Phase 5 flow:** F18.
14. **Constraints:** Critical cannot be dismissed without acknowledgement/action and **cannot be muted** `[P4:§18.2]`; proactive-reassurance content on quiet items `[P3:§16.3]`.
15. **V2 exclusions:** None.

---

## 3. Agent surface (`/agent`) — SC-A

Authoritative agent sitemap/nav = `[P4:§6, §12.4]`. All agent access is MFA-gated `[P4:§2.3]` and matter/grant-scoped `[P6]`.

### SC-A00 · Agent onboarding & verification  · AT-4
1. **Name:** Agent onboarding (registration → verification → profile).
2. **Purpose:** Convert a prospective agent into a Verified Agent; supply-side cold start `[P5:F21]`.
3. **User/role:** Prospective agent; Agent Org Admin.
4. **Entry:** `/for/patent-agents`; referral.
5. **Exit:** Verified → Today/Import; pending → limited account.
6. **Primary action:** Submit for verification `[P5:F21]`.
7. **Secondary:** Declare technical domains, specializations, conflicts; set capacity; opt into review queue and/or opportunities.
8. **Info displayed:** Value prop (**your docket first, matters second**) `[P3:J6]`; credential fields (registration number, qualification, identity); verification status; domain/conflict declaration.
9. **Loading:** Verification submitted/pending state (register check + manual review) `[P3:§26 D6, M4.3]`.
10. **Empty:** Guided first step.
11. **Error:** Verification fails → clear reason + remediation; **no client Zone 1 access in the interim** `[P5:F21 failure]`.
12. **Permissions:** Pending = limited account (no review, no match, no client material) `[P5:F21 alt]`.
13. **Phase 5 flow:** F21.
14. **Constraints:** Declared domains drive review-queue routing `[ADR:§5]`; verification precedes any Zone 1 access `[P5:F21]`; conflicts declared up front `[BR-10]`.
15. **V2 exclusions:** No captive-practice/in-house reviewer wrapper (deferred) `[ADR:§8]`.

### SC-A01 · Today
1. **Name:** Agent Today (`/agent`).
2. **Purpose:** "What must I do today" — risk-ranked queue, the agent's session start `[P3:J7]`.
3. **User/role:** Verified Agent; Agent Org Admin.
4. **Entry:** Sign-in; wordmark; context switch.
5. **Exit:** Docket item; matter; **review-queue item**; opportunity.
6. **Primary action:** Act on the top risk-ranked item `[P4:§12.4]`.
7. **Secondary:** Jump to Docket/Reviews/Matters/Opportunities.
8. **Info displayed:** Risk-ranked items spanning docket deadlines, matter actions, and **review-queue items** `[P4:§6]`; two-axis status.
9-11. Region skeletons; **first-run empty** = value prop → **Import your matters** `[P4:§19.1]`; standard.
12. **Permissions:** Agent-scoped; only assigned matters and domain-matched review items appear `[P4:§17.3]`.
13. **Phase 5 flow:** F20 (agent), F7, F23.
14. **Constraints:** Docket and review are **distinct rhythms**, surfaced without blending `[P4:§6.1]`/`[P5:§12.7]`; deadline safety `[AP-07]`.
15. **V2 exclusions:** No drafting/prosecution task cards (V2).

### SC-A02 · Docket + deadline detail  · AT-6
1. **Name:** Agent docket (`/agent/docket`, `?view=calendar|list`) + deadline detail (`/{deadlineId}`).
2. **Purpose:** All deadlines across all matters and all sources — the docket that can't fail `[P3:ICP-2]`.
3-7. Verified Agent; Today/nav; to deadline detail/matter; primary = **confirm a critical deadline** `[BR-03]`; secondary = calendar/list, filter.
8. **Info displayed:** Deadlines with criticality + state; source; matter/application; **confirmation action**; computation trace at depth 3 (incl. governing Rule, agent-visible) `[P4:§12.5]`/`[BR-13]`.
9-11. Skeleton/calendar; **first-run empty** = import path prominent `[P4:§19.1]`; register-source stale → last-known + freshness.
12. **Permissions:** Agent's own + assigned-matter deadlines only; no cross-tenant aggregation `[P4:§17.3]`.
13. **Phase 5 flow:** F22, F16, §8-G.
14. **Constraints:** **Human confirmation of critical deadlines** `[BR-03]`/`[X9]`; never silently modify/delete deadline history `[AP-07]`; computed from versioned rules `[D1]`.
15. **V2 exclusions:** None (docket is core MVP).

### SC-A03 · Matters index (platform + own)  · AT-2
1. **Name:** Agent matters (`/agent/matters`, `?source=platform|own`, `?state=`).
2. **Purpose:** All matters the agent works — engaged platform matters and imported own-practice matters.
3-7. Verified Agent; Today/nav; to matter/import; primary = open matter; secondary = **Import matters** (prominent), filter by source/state.
8. **Info displayed:** Matter rows: state, invention/application, client (within scope), whose-turn, next deadline; source tag (platform/own).
9-11. Skeleton; **empty** = "Import path prominent; opportunities secondary" → **Import matters** `[P4:§19.1]`; standard.
12. **Permissions:** **Only assigned matters; no aggregation of a client's holdings across matters the agent isn't engaged on** `[P4:§17.3]`/`[P6]`.
13. **Phase 5 flow:** F16, F22.
14. **Constraints:** Matter-scoped access `[BR-05 + ADR review-grant notice]`; cross-tenancy invisibility `[IA-5]`.
15. **V2 exclusions:** None.

### SC-A04 · Matter import  ★ · AT-4
1. **Name:** Import practice matters (`/agent/matters/import`).
2. **Purpose:** The adoption unlock — bring existing matters in, get instant docket value `[P4:§6.1]`.
3. **User/role:** Verified Agent; Agent Org Admin.
4. **Entry:** Empty state; onboarding; matters index (all three routes) `[P4:§6.1]`.
5. **Exit:** Imported matters in the docket with computed deadlines.
6. **Primary action:** Import matters `[P5:F22]`.
7. **Secondary:** Map/confirm fields; review per-matter completeness.
8. **Info displayed:** Import inputs; per-matter completeness for deadline computation; computed deadlines preview.
9. **Loading:** Import + deadline computation running.
10. **Empty:** Guided first import.
11. **Error:** Incomplete data → **exactly what's missing per matter; partial value for complete matters; nothing silently mis-computed** `[P5:F22 failure]`.
12. **Permissions:** Agent's own tenancy; **not** marketplace matters `[P5:F22]`.
13. **Phase 5 flow:** F22.
14. **Constraints:** Deadline Engine computes from versioned rules `[D1]`; deadline safety `[AP-07]`.
15. **V2 exclusions:** None.

### SC-A05 · Agent matter detail (brief + work)
1. **Name:** Agent matter (`/agent/matters/{id}` + `/brief`, `/deadlines`, `/documents`, `/client`, `/billing`).
2. **Purpose:** Where the agent works an engaged matter to filing `[P4:§6]`.
3. **User/role:** Assigned Verified Agent.
4. **Entry:** Today; matters index; opportunity acceptance.
5. **Exit:** File with office (on client approval); message client; upload documents.
6. **Primary action:** Progress the matter → **file with the office** (human action, on client approval) `[BR-09/T3]`.
7. **Secondary:** Open brief; upload prepared application document; clarify with client (C-1); manage deadlines/billing `[L1]`.
8. **Info displayed:** **Brief** (Disclosure + released Assessment with provenance + client context) `[P4:§6]`; deadlines; documents; client thread; billing `[L1-15]`.
9-11. Section skeletons; new matter shows the brief; **filing to office fails → Application NOT marked Filed, no false deadline** `[P5:F16 failure]`.
12. **Permissions:** **Matter-scoped only** — no other matter, no aggregate portfolio, no other agent's work `[P4:§17.2]`/`[P6]`.
13. **Phase 5 flow:** F16, F17.
14. **Constraints:** **Agent files; platform never files autonomously** `[BR-09/T3]`; one accountable agent per Application `[BR-19]`; communication matter-confined `[A2]`; assessment travels with the Invention into matter scope `[ADR:§11]`.
15. **V2 exclusions:** **`/draft` (Drafting Workspace M2.2) and `/prosecution` (M2.3) are V2 — not present in MVP; the agent uploads externally-prepared documents** `[P4:§6 sitemap]`/`[P5:§9-A]`.

### SC-A06 · Reviews queue  ★ · AT-2
1. **Name:** Review queue (`/agent/reviews`).
2. **Purpose:** The BR-01 gate — domain-matched assessment reviews; throughput-critical `[P4:§6.1]`/`[P5:§12.6]`.
3. **User/role:** Verified Agent (reviewer role), domain-matched, conflict-free.
4. **Entry:** Today; agent nav (top-level Reviews).
5. **Exit:** Review workspace (SC-A07).
6. **Primary action:** Take an item `[P5:F23]`.
7. **Secondary:** Filter within domain; view queue depth/wait.
8. **Info displayed:** Domain-filtered queue items (no client identity beyond what the review grant permits) `[ADR:§6]`; item age; expected turnaround `[SLOT]`.
9. **Loading:** Queue skeleton.
10. **Empty:** "No items in your domains right now" (honest, not urgency).
11. **Error:** Standard; if saturation policy is active, ops-side handling `[ADR:§9]`.
12. **Permissions:** **Conflicted items never appear** `[ADR:§5]`; only domain-matched items `[ADR:§5]`; a review grant is issued only on taking an item `[ADR:§6]`.
13. **Phase 5 flow:** F7, F23.
14. **Constraints:** **Separate destination from Matters** `[P4:§6.1]`; review is a distinct rhythm `[P5:§12.7]`; the whole client experience waits behind this `[BR-01]`.
15. **V2 exclusions:** None.

### SC-A07 · Review workspace  ★★ · AT-5 (two-pane)
1. **Name:** Review workspace (`/agent/reviews/{id}`).
2. **Purpose:** Review, edit and release an assessment under a review grant — the human review gate in action `[P5:F23]`/`[P5:F8]`.
3. **User/role:** Assigned reviewer (Verified Agent) holding a review grant.
4. **Entry:** Take an item from the queue (SC-A06).
5. **Exit:** Release (verdict → client) or return to queue (decline/timeout).
6. **Primary action:** Record `ReviewDecision` & release `[BR-01]`.
7. **Secondary:** Edit assertions (diffs captured); check each citation against source; mark Inconclusive; decline/return.
8. **Info displayed:** **Two panes** — source pane (Disclosure version + AI analysis + cited passages) and work pane (assertions, edits, decision) `[P4:AT-5]`; **only this one Disclosure version + the analysis** `[ADR:§6]`; reviewer-name-on-release affordance.
9. **Loading:** Panes load the granted material; edits autosave as diffs.
10. **Empty:** N/A (always has the item).
11. **Error:** Reviewer becomes unavailable/times out → **grant expires, item reassigned; client still sees "In review"** `[P5:§8-D]`; boundary-violation attempt → **denied and audited** `[P5:§8-J]`.
12. **Permissions:** **Review grant only — exactly one Disclosure version + analysis, one ReviewDecision, expiring on release/reassignment; reviewer sees nothing else in that Workspace** `[ADR:§6]`/`[P4:§17.2 Decision-F notice]`/`[P5:X6,X7]`.
13. **Phase 5 flow:** F8, F23, §8-C/§8-D/§8-J.
14. **Constraints:** **Mandatory review, no bypass** `[BR-01]`/`[P5:X1]`; edits captured for OP-6 quality metric `[P3:M4.2]`/`[FR-A08]`; **hunt false negatives** `[P3:§12.5]`; provenance preserved `[BR-02]`; **no client↔reviewer channel** `[A2]`; reviewer ≠ drafter `[ADR:§5]`.
15. **V2 exclusions:** No drafting from within review; no ongoing client relationship created `[ADR:§6]`.

### SC-A08 · Opportunities  · AT-2 + detail `[L1]`
1. **Name:** Opportunities (`/agent/opportunities`, `/{id}`).
2. **Purpose:** Available Agent-Matching filing opportunities the agent can accept `[P4:§6]`.
3-7. Verified Agent; Today/nav; to matter on acceptance; primary = **accept/decline** `[P5:F14 agent-side]`; secondary = view scope/fee/conflict status.
8. **Info displayed:** Scope; **fee display governed by L1** `[L1-14]`; conflict status; client context within permitted scope.
9-11. Skeleton; empty = "no opportunities in your domains now"; standard.
12. **Permissions:** Only conflict-clear, domain-relevant opportunities; acceptance triggers client-side Engagement/Matter (SC-C19) `[P5:F15]`.
13. **Phase 5 flow:** F14 (agent side), F15.
14. **Constraints:** Conflict check gates offer `[BR-10]`; fee via PriceDisplay `[L1]`; fixed pricing `[BR-06]`.
15. **V2 exclusions:** No licensing-marketplace listings.

### SC-A09–A12 · Practice (grouped)  · AT-3/AT-8 `[L1 on earnings]`
1. **Name:** Practice — profile (`/agent/practice/profile`), outcomes (`/outcomes`), capacity (`/capacity`), earnings (`/earnings`).
2. **Purpose:** Manage public profile `[P3:M2.4]`; own outcome statistics (seen by the agent **with n before clients see them**); availability/specializations/limits; settlement view `[L1-16]`.
3. **User/role:** Verified Agent; Agent Org Admin (org-level).
4-7. From agent nav; to public profile preview/settings; primary = edit profile / set capacity / view earnings; secondary = view own outcomes with n.
8. **Info displayed:** Profile (credentials, background, specializations, languages); **own outcome stats with sample size** `[BR-17]`; capacity/specializations/conflicts; earnings/settlement `[L1-16]` `[SLOT: L1 settlement presentation]`.
9-11. Skeletons; outcomes **below n≥20 show "not enough data yet"** `[DL:D-2026-019]`; standard.
12. **Permissions:** Agent/org-scoped; the public rendering of the profile is SC-P13, governed by L1/L3.
13. **Phase 5 flow:** F21, F14 context.
14. **Constraints:** **n≥20 floor + sample size + confidence for anything client-visible; go-live L3-gated** `[DL:D-2026-019]`; providers/verification honesty; earnings via PriceDisplay logic where money shown `[IA-7]`.
15. **V2 exclusions:** No licensing-revenue surfaces.

### SC-A13 · Agent settings  · AT-8
1. **Name:** Agent settings (`/agent/settings`).
2. **Purpose:** Agent account, security (MFA), notification and org preferences.
3-8. Verified Agent/Org Admin; utility nav; save settings; MFA/sessions; notification preferences (Critical unmutable) `[P4:§18.2]`; conflict-list management (org) `[BR-10]`.
9-11. Form states; N/A; validation errors associated.
12. **Permissions:** Org Admin manages agents/capacity/conflicts/billing `[P3:§4.1]`.
13. **Phase 5 flow:** F21, F18.
14. **Constraints:** MFA required for agents `[P4:§2.3]`; conflict declarations feed BR-10.
15. **V2 exclusions:** None.

### SC-A14 · Notification centre (agent) + context switcher (shared)
1. **Name:** Agent notifications; context switcher.
2. **Purpose:** Class-ordered notifications for the agent; switch surfaces for multi-role users `[P4:§18.2, §2.3]`.
3-8. Verified Agent (also inventor, etc.); utility nav; to referenced object / other surface; primary = act on Critical/Action item / switch context; grouped Critical→Action→Progress→Informational; **one context at a time** `[P4:§2.3]`.
9-12. As SC-C21; context switcher appears only for multi-role users; **no blended contexts** `[P5:§3]`.
13. **Phase 5 flow:** F18, F20.
14. **Constraints:** Critical unmutable `[P4:§18.2]`; context isolation is a confidentiality requirement `[P6]`.
15. **V2 exclusions:** None.

---

## 4. Operations surface (`/ops`) — SC-O (MVP-required subset)

Internal only; MFA + justification `[P4:§2.3]`. WP-2 specifies the consoles the customer flows structurally depend on. Full ops-console UX depth is scheduled with later WPs; these entries fix purpose, states and constraints.

### SC-O01 · Docket Health Console  ★ · AT-9
1. **Name:** Docket Health Console (`/ops/docket` + `/unconfirmed`, `/discrepancies`, `/undelivered`, `/escalations`).
2. **Purpose:** The most important internal screen — the operational spine of deadline safety and rights-affecting delivery `[P3:M4.1]`/`[P4:§8]`.
3. **User/role:** Docket Ops; Trust & Safety (escalations).
4. **Entry:** Default `/ops` landing; paged escalations `[P3:§16.5]`.
5. **Exit:** Resolve a discrepancy; confirm a critical deadline; act on an undelivered Critical.
6. **Primary action:** Resolve/confirm the top-risk item `[P3:M4.1]`.
7. **Secondary:** Filter saved views; open the underlying object; record intervention.
8. **Info displayed:** Unconfirmed critical deadlines; source discrepancies; **undelivered critical notifications**; escalations — dense table with inline actions `[P4:AT-9]`.
9-11. Table skeleton; empty = "no open items" (a good state, honestly shown); a failed Critical notification **surfaces here and pages Docket Ops** `[P5:§8-F]`/`[X10]`.
12. **Permissions:** Internal; metadata/deadlines/events/status; **Disclosure bodies consent-gated** `[BR-16]`; every access audited/justified.
13. **Phase 5 flow:** §8-D, §8-F, §8-G; F16/F19 discrepancies.
14. **Constraints:** **Human confirmation of critical deadlines** `[BR-03]`; a platform-attributable miss is Sev-1 with RCA + 24h client disclosure `[P3:NFR-C01]`/`[Metrics OP-5]`; never skip review to clear a queue `[ADR:§9]`.
15. **V2 exclusions:** None (core MVP).

### SC-O02 · Marketplace Ops — agent verification  · AT-9
1. **Name:** Agent verification (`/ops/marketplace/verification`, + `/supply`, `/conflicts`, `/disputes`).
2. **Purpose:** Gate J-S1 — credential review before an agent acts `[P3:M4.3]`.
3-7. Marketplace Ops; ops nav / onboarding escalation; to agent record; primary = approve/reject verification; secondary = manage supply/conflicts/disputes.
8. **Info displayed:** Credential submissions; official-register check result `[P3:§26 D6]`; capacity by domain; conflict/dispute queues.
9-11. Skeleton; empty queue; register-check unavailable → hold, honest status, no auto-approve.
12. **Permissions:** Internal, audited.
13. **Phase 5 flow:** F21.
14. **Constraints:** Verification precedes any client Zone 1 access `[P5:F21]`; conflict basis feeds BR-10.
15. **V2 exclusions:** No captive-practice management.

### SC-O03 · Rule Authoring Console  ★ · AT-9
1. **Name:** Rule Authoring Console (`/ops/rules`, `/{jurisdiction}`, `/{ruleId}`, `/tests`, `/impact`).
2. **Purpose:** Author/version jurisdiction rules as data — the source of every deadline and official fee `[P3:M4.4]`/`[D1]`.
3-7. Rule Author; ops nav; to rule editor/tests/impact; primary = publish a rule version (gated by tests + impact); secondary = run golden cases, view pre-publication impact.
8. **Info displayed:** Rule editor + **source citation** + version history; golden-case test suites; **pre-publication impact report across the live portfolio** `[P4:§8]`.
9-11. Editor states; empty jurisdiction; test failures block publication.
12. **Permissions:** Rule Author only; dual-control per `[P3:§4.1]`.
13. **Phase 5 flow:** underpins F16/F19/J-N deadlines.
14. **Constraints:** **Rules are data, never code** `[AP-02]`/`[D1]`; immutable versioned rules; historical computations reproducible `[BR-07]`; official fees derive here `[BR-14]`.
15. **V2 exclusions:** MVP seeds India + PCT `[P3:§12.4]`.

### SC-O04 · Quality & Review Console  · AT-9
1. **Name:** Quality & Review Console (`/ops/quality`, `/ai`, `/agents`, `/samples`).
2. **Purpose:** Monitor AI edit rate/severity and agent/review quality — where OP-6 is measured `[P3:M4.2]`.
3-8. Quality Reviewer; ops nav; to samples/regressions; primary = review a sample/regression; **edit rate, severity, eval results, regressions; outcome quality; review sampling queue** `[P4:§8]`. OP-6 target/threshold and "material" definition are **fixed** `[DL:D-2026-018]` — display them, don't invent.
9-11. Dashboards; empty; standard.
12. **Permissions:** Internal, audited.
13. **Phase 5 flow:** F6/F23 quality loop.
14. **Constraints:** No silent capability drift — T2 model/prompt changes need eval + recorded approval `[P3:§12.3 r6]`; "material" per `[DL:D-2026-018]` (validation pending — a slot for the validation step, not the definition).
15. **V2 exclusions:** None.

### SC-O05 · Business metrics dashboard  · AT-9
1. **Name:** Business dashboard (`/ops/business`).
2. **Purpose:** The Phase 2 headline metrics `[P4:§8]`/`[P3:§6]`.
3-8. Internal; ops nav; primary = read; displays **OP-1, OP-3, OP-4, OP-5** (headline four) `[Metrics §5]` plus OP-2/OP-6 as defined. **OP-1 = >25%/~15%; OP-2 = calibrated, no invented target; OP-5 split (platform-attributable zero/Sev-1 vs total operational); OP-6 <15%/<20%** `[DL:D-2026-018]`.
9-11. Dashboard states; sparse-data metrics shown honestly (no fabricated targets).
12. **Permissions:** Internal.
13. **Phase 5 flow:** — (operational).
14. **Constraints:** **Do not invent OP-2 target** `[DL:D-2026-018]`; metric definitions are canonical in Metrics.md.
15. **V2 exclusions:** None.

---

## 5. Cross-cutting UI elements (apply across surfaces)

These are not standalone destinations but are specified because every screen inherits them:

- **Global app search** `[P4:§13.2]` — fixed result grouping: Inventions → Applications → Matters → Documents → Deadlines → Public register; each capped at five; public register always last, labelled external. Zone-legible: app search (Z1) is visually/behaviourally distinct from public search (Z2) `[P4:§13.1]`.
- **Attention badge `⚑`** — count of *Needs you*, one click from every authenticated screen `[P4:IA-2/§12.3]`.
- **Relationship rail** — on every object detail; every directly related object one click away `[P4:§12.5]`.
- **Breadcrumbs** — object-hierarchy based, on all detail pages `[P4:§12.6]`.
- **PriceDisplay component** — the only money renderer; two modes (component primary) `[P4:§21.1]`/`[DL:O-2026-001]`.
- **Contextual help / tooltips** — rendered from the same glossary record as `/learn/glossary` `[P4:§24.2]`.

---

## 6. Responsive note (full treatment in WP-4)

Per-surface mobile priority is fixed by `[P4:§20.1]` (High: public search/documents, cost planner, client action queue/deadlines, agent docket; Medium: assessment reading, disclosure capture, institution; Low: agent drafting/prosecution [V2], ops). Adaptation rules (bottom bar, filter sheets, stacked two-pane with pane switcher, sticky next-action, status pair never truncated) are `[P4:§20.2]`. WP-4 designs these; WP-2 records the constraint so no screen is specified in a way that violates it (e.g. nothing critical in hover-only).

---

## 7. Excluded surfaces & screens (V2+ — not designed in Phase 6 MVP)

Recorded so the boundary is explicit and Phase 6 leaves room for the seams `[P5:§10]`/`[P4:§7]`:

| Excluded | Where it will live | Authority |
|---|---|---|
| Institution surface (`/institution/*`) — intake, triage, ownership, approvals, budget, policy, publication-risk | V2 Layer 3 | `[P4:§7]`, `[P5:§10]` |
| Drafting Workspace (`/agent/matters/{id}/draft`) | V2 (M2.2) | `[DL:D-2026-010]`, `[P4:§6]` |
| Prosecution Workspace (`/agent/matters/{id}/prosecution`) + in-product examination response | V2 (M2.3) | `[P5:§9-A/§10]` |
| Renewals (`/app/portfolio/{appId}/renewals`) + abandon/renew decision | V2 (M1.8) | `[P4:§5]`, `[P5:§10]` |
| Portfolio monitoring (competitor/citation alerts) | V2 | `[P5:§10]` |
| Re-assessment-with-diff view | V2 (FR-A11) | `[P5:§9-C]` |
| Licensing marketplace | V4+ | `[P5:§10]`, `[Glossary: Marketplace]` |
| Multi-currency / outbound-corridor flows | V2 | `[P5:§10]` |
| Public API / developer flows | V3 (M5.1) | `[P5:§10]` |
| Native mobile app | V2+ | `[P4:§20]`, `[P3:TA-10]` |

**Within MVP agent matter detail, `/draft` and `/prosecution` tabs are absent** — the agent uploads externally-prepared documents `[P5:§9-A]`.

---

## 8. Screen index (MVP)

| ID | Screen | Surface | Template | ★ |
|---|---|---|---|---|
| SC-P01 | Public Home | Public | PT-1 | |
| SC-P02 | Patent search | Public | PT-4 | |
| SC-P03 | Patent document page | Public | PT-5 | ★ |
| SC-P04 | Stage landings | Public | PT-3 | |
| SC-P05 | Segment landings | Public | PT-2 | |
| SC-P06 | Pricing | Public | PT-6 | |
| SC-P07 | Cost Planner | Public | PT-7 | |
| SC-P08 | Find-your-path | Public | PT-12 | |
| SC-P09 | Learn — guides | Public | PT-8 | |
| SC-P10 | Glossary | Public | PT-9 | |
| SC-P11 | Jurisdiction guide | Public | PT-8 | |
| SC-P12 | Reports | Public | PT-8 | |
| SC-P13 | Agent directory + profile | Public | PT-10 | |
| SC-P14 | Trust pages | Public | PT-11 | |
| SC-P15 | Company + Legal | Public | PT-11 | |
| SC-P16 | Account creation & sign-in | Public | — | |
| SC-C00 | Workspace creation interstitial | Client | — | |
| SC-C01 | Home — action queue | Client | AT-1 | ★ |
| SC-C02 | Inventions index | Client | AT-2 | |
| SC-C03 | Disclosure capture | Client | AT-4 | ★ |
| SC-C04 | Invention detail | Client | AT-3 | ★ |
| SC-C05 | Disclosure & versions | Client | AT-3 | |
| SC-C06 | Assessment request | Client | AT-4 | |
| SC-C07 | Assessments list | Client | AT-2 | |
| SC-C08 | Assessment detail (verdict) | Client | AT-7/AT-3 | ★★ |
| SC-C09 | Decision record | Client | — | |
| SC-C10 | Portfolio index | Client | AT-2 | |
| SC-C11 | Application detail (+silence/Responding) | Client | AT-3 | ★ |
| SC-C12 | Deadlines index | Client | AT-6 | |
| SC-C13 | Deadline detail (trace) | Client | AT-3 | |
| SC-C14 | Matters index | Client | AT-2 | |
| SC-C15 | Matter workspace | Client | AT-3 | ★ |
| SC-C16 | Costs | Client | AT-7 | |
| SC-C17 | Documents index | Client | AT-2 | |
| SC-C18 | Find an agent — matching | Client | AT-2 | |
| SC-C19 | Quote & engagement (checkout) | Client | — | ★ |
| SC-C20 | Settings | Client | AT-8 | |
| SC-C21 | Notification centre (client) | Client | — | |
| SC-A00 | Agent onboarding & verification | Agent | AT-4 | |
| SC-A01 | Today | Agent | AT-1 | |
| SC-A02 | Docket + deadline detail | Agent | AT-6 | |
| SC-A03 | Matters index | Agent | AT-2 | |
| SC-A04 | Matter import | Agent | AT-4 | ★ |
| SC-A05 | Agent matter detail | Agent | AT-3 | |
| SC-A06 | Reviews queue | Agent | AT-2 | ★ |
| SC-A07 | Review workspace | Agent | AT-5 | ★★ |
| SC-A08 | Opportunities | Agent | AT-2 | |
| SC-A09–A12 | Practice (profile/outcomes/capacity/earnings) | Agent | AT-3/AT-8 | |
| SC-A13 | Agent settings | Agent | AT-8 | |
| SC-A14 | Agent notifications + context switcher | Agent | — | |
| SC-O01 | Docket Health Console | Ops | AT-9 | ★ |
| SC-O02 | Agent verification | Ops | AT-9 | |
| SC-O03 | Rule Authoring Console | Ops | AT-9 | ★ |
| SC-O04 | Quality & Review Console | Ops | AT-9 | |
| SC-O05 | Business dashboard | Ops | AT-9 | |

---

## 9. Design slots register (values the baseline leaves open — none invented)

| # | Slot | Screens | Authority |
|---|---|---|---|
| S-1 | Committed review turnaround value | SC-C06, SC-C08, SC-A06/07 | ADR §9 |
| S-2 | Assessment confidence representation | SC-C08 | AP-08, §12.3.4 |
| S-3 | Agent-stat confidence-indicator representation | SC-P13, SC-C18, SC-A09–12 | D-2026-019 |
| S-4 | L1 pricing rendering (component primary, both modes) | SC-P06/07, SC-C16/18/19, SC-A05/08/12 | O-2026-001 |
| S-5 | Expected-next-event range (silence view) | SC-C11 | Rules Engine/field timelines |
| S-6 | L6 post-engagement retention window | (access revocation, §8-I) | Phase 3 §26.1 L6 |
| S-7 | Per-class default channel preferences (where §16.2 unset) | SC-C20/21, SC-A13/14 | Phase 3 §16.2 |
| S-8 | Edit-session idle timeout | SC-C03/05 | not specified |
| S-9 | Legal content (UPL / privilege / residency / advertising) | SC-P06/13/14/15, SC-C19/20 | L2/L3/L4/L7 |
| S-10 | Not-file Decision-entity role mapping | SC-C09 | §4.1 (create/edit vs engage/pay) |
| S-11 | Client MFA policy (agents/internal MFA is fixed) | SC-P16, SC-C20 | Phase 4 §2.3 |
| S-12 | OP-6 "material" real-diff validation step | SC-O04 | D-2026-018 (definition fixed; validation pending) |

Every slot is a marked placeholder. None is filled with an invented value.

---

## 10. Flags register (genuine questions — not decided)

| # | Flag | Screen | Nature |
|---|---|---|---|
| F-1 | **A3 sequential-edit handoff:** soft-lock over existing edit roles is derivable and designed (SC-C03). A **new decision is required only if** edit access is intended to be restricted to a *single designated editor* (not serialized across all edit-capable Members), which would change the §4.1 permission model. | SC-C03/C05 | Potential permission decision — carried, not decided |
| F-2 | **Not-file Decision role mapping (S-10):** §4.1 maps create/edit (Member) and engage/pay (Owner) but does not explicitly say which roles may record a *not-file* Decision entity. Designed provisionally as "any edit-capable role may record a not-file Decision; engage/pay stays Owner-only." | SC-C09 | Minor permission clarification if you want it narrowed |

No other item rises to a required decision. Everything else is a design slot (§9) or an already-decided constraint.

---

## 11. Traceability summary (screen → baseline)

Full screen-by-screen traceability is embedded per entry (fields 13–14). Consolidated by cluster:

| Screen cluster | Phase 5 | Phase 4 IA | ADR / Phase 3 | Decision Log |
|---|---|---|---|---|
| Public (SC-P01–16) | F1, F2, F13 | §4, §12.2, §23, IA-8 | FR-S01/05/11, FR-C01, §12.1/12.6 | D-2026-014, O-2026-001, D-2026-019 |
| Client Vault/Assessment (SC-C00–09) | F3, F4, F5, F6, F9, F10, F11 | §5, §15.1/15.2, §16, §11.2/11.6 | ADR §4/6/7/9, BR-01/02/09/20, M1.2/1.3, §12.1/12.5 | D-2026-015 (A1/A3), D-2026-017 |
| Client Portfolio/Deadlines (SC-C10–13) | F16, F19, §9-A | §5.1, §15.3, §19.4, §11.3/11.5 | D1, §18/20.3, BR-03/13, NFR-A05, AP-07 | D-2026-016 |
| Client Matter/Costs/Matching (SC-C14–19) | F14, F15, F16, F17 | §15.4, §21, §17.2 | BR-06/10/17/19, P6/D4, ADR §11 | D-2026-019, O-2026-001, D-2026-015 (A2) |
| Client Settings/Notifications (SC-C20–21) | F18 | §18.2/18.3 | §16.2/16.3/16.5, BR-16 | — |
| Agent (SC-A00–14) | F7, F8, F16, F21, F22, F23 | §6, §6.1, §12.4, §17.2/17.3 | BR-01/02/05/19, ADR §5/6/9, M2.1/2.4, §12.5, FR-A08 | D-2026-019, O-2026-001 |
| Ops (SC-O01–05) | §8-D/F/G | §8 | M4.1/4.2/4.3/4.4, BR-03/07/14/16, NFR-C01, §12.3, D1, AP-02 | D-2026-018 |

---

*End of Phase 6 — WP-2 (v0.1). Working document. Awaiting owner review before WP-3.*



