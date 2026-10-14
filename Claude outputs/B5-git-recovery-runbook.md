# Phase 8 Backlog Recovery — Git Runbook (B3 → B4 → B5)

Run every command **on your machine** in `R:\ALDASSIST\04_Development\ui` (the repo root that has `.git`).
I cannot run git from this session (no device shell), so you execute; I've made each step copy‑pasteable and
guarded. **Nothing here resets, restores, checks out, or cleans anything.** `git add -p` is interactive — you
approve each hunk. Never run `git add .`. `Claude outputs/` must stay untracked.

Working tree already contains: all B3+B4+B5 code **plus the B5 blocker fixes** I just delivered
(validated in the cloud: typecheck 0, 86/86 tests, Gate‑A 211, Gate‑B 0, build 0, Storybook 0).

---

## STEP 0 — Inspect (read-only, change nothing)

```bash
git status
git diff --stat
git diff --name-only
git log -5 --oneline
```

Confirm `HEAD` is **`a0b192c`** (Phase 8 B2). If it isn't, **stop** and tell me.
Note the full modified-file list from `git diff --name-only` — you'll map each shared file to a batch below.
Untracked new files (the B3/B4/B5 screens etc.) will appear under "Untracked files"; that's expected.

The files split into two kinds:

* **New files** — belong entirely to one batch. Stage by explicit path (lists below).
* **Shared/modified files** — carry cumulative hunks from several batches. Stage the right hunks with
  `git add -p`. The shared set is at most: `src/App.tsx`, `src/contract/index.ts`, `src/contract/ports.ts`,
  `src/screens/labels.ts`, `src/components/index.ts`, `src/styles/components.css`,
  `scripts/build-tokens.mjs`, `src/tokens/tokens.generated.css`. (B5 itself touches **only** the first four.)

Hunk keyword guide for `git add -p` (`y` = stage this hunk, `n` = skip, `s` = split):

| Batch | Stage hunks mentioning… |
|-------|--------------------------|
| **B3** | `portfolio`, `Portfolio`, `Deadline`/`deadlines`, `applicationDetail`, `SC-C10/11/12/13`, `DEADLINE_STATE_CHIP`, `export * from './portfolio'` |
| **B4** | `matters`, `Matter`, `Costs`, `Matching`, `Quote`, `PriceDisplay`, `SC-C14/15/16/18/19`, `MATTER_CHIP`, `export * from './matters'`, `.price`/`.four-cell`/`.match-card`, `vault.text.title` / `--vault-text-title` |
| **B5** | `home`/`Home`, `Documents`, `Settings`, `Notifications`, `ObjectLink`, `SC-C01/17/20/21`, `NOTIFICATION_CLASS`, `export * from './home'` |

---

## STEP 1 — B3 (Client Portfolio & Deadlines)

**New files (stage exactly these):**

```bash
git add \
  src/screens/PortfolioIndex/index.ts \
  src/screens/PortfolioIndex/PortfolioIndexScreen.tsx \
  src/screens/PortfolioIndex/PortfolioIndex.stories.tsx \
  src/screens/PortfolioIndex/portfolio.test.tsx \
  src/screens/ApplicationDetail/index.ts \
  src/screens/ApplicationDetail/ApplicationDetailScreen.tsx \
  src/screens/ApplicationDetail/ApplicationDetail.stories.tsx \
  src/screens/ApplicationDetail/applicationDetail.test.tsx \
  src/screens/DeadlinesIndex/index.ts \
  src/screens/DeadlinesIndex/DeadlinesIndexScreen.tsx \
  src/screens/DeadlinesIndex/DeadlinesIndex.stories.tsx \
  src/screens/DeadlinesIndex/deadlinesIndex.test.tsx \
  src/screens/DeadlineDetail/index.ts \
  src/screens/DeadlineDetail/DeadlineDetailScreen.tsx \
  src/screens/DeadlineDetail/DeadlineDetail.stories.tsx \
  src/screens/DeadlineDetail/deadlineDetail.test.tsx \
  src/contract/portfolio.ts \
  src/fixtures/scenarios/portfolio.ts \
  src/fixtures/providers/FixturePortfolioProviders.ts
```

**Shared-file B3 hunks** (only files that STEP 0 showed as modified; skip any that aren't):

```bash
git add -p src/App.tsx
git add -p src/contract/index.ts
git add -p src/contract/ports.ts
git add -p src/screens/labels.ts
# only if STEP 0 shows them modified AND a hunk is portfolio/deadline-related:
git add -p src/styles/components.css
git add -p scripts/build-tokens.mjs
git add -p src/tokens/tokens.generated.css
```

**Verify, then commit & push:**

```bash
git diff --cached --name-only      # must be B3 files only
git diff --cached --stat
git status                         # Claude outputs/ must remain untracked, NOT staged

git commit -m "Phase 8 B3: implement Client Portfolio and Deadlines"
git push origin main
git log -4 --oneline
```

Optional validation before pushing (if node is set up on the device):
`npm run typecheck && npm test && npm run build && npm run check:tokens` (expect Gate‑A = 211).

---

## STEP 2 — B4 (Client Matter, Costs & Matching + PriceDisplay)

**New files:**

```bash
git add \
  src/screens/MattersIndex/index.ts \
  src/screens/MattersIndex/MattersIndexScreen.tsx \
  src/screens/MattersIndex/MattersIndex.stories.tsx \
  src/screens/MattersIndex/mattersIndex.test.tsx \
  src/screens/MatterWorkspace/index.ts \
  src/screens/MatterWorkspace/MatterWorkspaceScreen.tsx \
  src/screens/MatterWorkspace/MatterWorkspace.stories.tsx \
  src/screens/MatterWorkspace/matterWorkspace.test.tsx \
  src/screens/Costs/index.ts \
  src/screens/Costs/CostsScreen.tsx \
  src/screens/Costs/Costs.stories.tsx \
  src/screens/Costs/costs.test.tsx \
  src/screens/Matching/index.ts \
  src/screens/Matching/MatchingScreen.tsx \
  src/screens/Matching/Matching.stories.tsx \
  src/screens/Matching/matching.test.tsx \
  src/screens/QuoteEngagement/index.ts \
  src/screens/QuoteEngagement/QuoteEngagementScreen.tsx \
  src/screens/QuoteEngagement/QuoteEngagement.stories.tsx \
  src/screens/QuoteEngagement/quoteEngagement.test.tsx \
  src/components/PriceDisplay.tsx \
  src/components/PriceDisplay.stories.tsx \
  src/components/priceDisplay.test.tsx \
  src/contract/matters.ts \
  src/fixtures/scenarios/matters.ts \
  src/fixtures/providers/FixtureMattersProviders.ts
```

**Shared-file B4 hunks** (`components/index.ts` gets the `PriceDisplay` export here; the CSS/token files
get their `.price`/`.four-cell`/`.match-card` and `vault.text.title` hunks here):

```bash
git add -p src/App.tsx
git add -p src/contract/index.ts
git add -p src/contract/ports.ts
git add -p src/screens/labels.ts
git add -p src/components/index.ts
git add -p src/styles/components.css
git add -p scripts/build-tokens.mjs
git add -p src/tokens/tokens.generated.css
```

**Verify, then commit & push:**

```bash
git diff --cached --name-only      # B4 files only
git diff --cached --stat
git status

git commit -m "Phase 8 B4: implement Client Matter, Costs and Matching"
git push origin main
git log -4 --oneline
```

---

## STEP 3 — B5 (Client Home, Documents, Settings, Notifications)

The B5 blocker fixes are already in the working tree (SC‑C01 two‑axis on every item + deadline‑proximity
criticality sort + real object links; SC‑C17 access‑log entry point; SC‑C20 billing via PriceDisplay + Admin
role locked; SC‑C21 real object links). B5 touches **no** CSS or token files.

**New files:**

```bash
git add \
  src/screens/Home/index.ts \
  src/screens/Home/HomeScreen.tsx \
  src/screens/Home/Home.stories.tsx \
  src/screens/Home/home.test.tsx \
  src/screens/Documents/index.ts \
  src/screens/Documents/DocumentsScreen.tsx \
  src/screens/Documents/Documents.stories.tsx \
  src/screens/Documents/documents.test.tsx \
  src/screens/Settings/index.ts \
  src/screens/Settings/SettingsScreen.tsx \
  src/screens/Settings/Settings.stories.tsx \
  src/screens/Settings/settings.test.tsx \
  src/screens/Notifications/index.ts \
  src/screens/Notifications/NotificationsScreen.tsx \
  src/screens/Notifications/Notifications.stories.tsx \
  src/screens/Notifications/notifications.test.tsx \
  src/contract/home.ts \
  src/fixtures/scenarios/home.ts \
  src/fixtures/providers/FixtureHomeProviders.ts \
  src/shell/ObjectLink.tsx
```

**Shared files — B5 gets the remainder.** After B3 and B4 are committed, whatever is still uncommitted in
these four files IS B5, so stage them whole:

```bash
git add \
  src/App.tsx \
  src/contract/index.ts \
  src/contract/ports.ts \
  src/screens/labels.ts
```

**Verify, then commit & push:**

```bash
git diff --cached --name-only      # B5 files only
git diff --cached --stat
git status

git commit -m "Phase 8 B5: implement Client Home, Documents and Settings"
git push origin main
git log -5 --oneline
```

---

## FINAL SAFETY INVARIANT (run after all three commits)

```bash
git status
```

Expected: **working tree clean except untracked `Claude outputs/`** (and anything else you deliberately keep
untracked). If any *tracked* file still shows as modified/unstaged, the three commits did **not** absorb the
whole working tree — **stop and tell me** rather than force‑adding; we'll find the stray hunk together.

```bash
git log -5 --oneline        # a0b192c (B2) → B3 → B4 → B5, in order
git status --ignored | grep -i "Claude outputs"   # confirm it's untracked/ignored, never committed
```

Do **not** start B6 — a human review comes next.

> Optional: append your usual co‑author/session trailer to each commit message if you want it in history; I
> kept the subject lines exactly as you specified.
