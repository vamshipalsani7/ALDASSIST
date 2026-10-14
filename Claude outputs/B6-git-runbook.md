# Phase 8 B6 — Git Runbook (stage → commit → push)

Run every command **on your machine** in `R:\ALDASSIST\04_Development\ui` (git resolves the repo's `.git`
from there). I do not run git from this session. **Nothing here resets, restores, cleans, or checks out.**
Never run `git add .`. `Claude outputs/` must stay untracked.

**Key fact that makes this simpler than the B3→B5 recovery:** `HEAD` is already **`67eac0a` — Phase 8 B5**,
committed and pushed. So the **only** uncommitted change in the tree is B6 (the 56 files I delivered). The 6
shared files therefore contain **B6 changes only** — no cumulative hunks from earlier batches — and stage
whole. STEP 0 verifies this before you touch the index; a hunk fallback is included only for the case where
STEP 0 shows something unexpected.

---

## STEP 0 — Inspect (read-only, change nothing)

```bash
git rev-parse HEAD            # expect 67eac0a… (Phase 8 B5)
git log -3 --oneline
git status
git diff --stat
git diff --name-only          # the 6 modified shared files (tracked)
git status --porcelain --untracked-files=all   # new files show as "??"
```

Confirm the change set is **exactly the 56 B6 files and nothing else**:

* **6 modified (tracked)** — must be precisely:
  `src/App.tsx`, `src/contract/index.ts`, `src/contract/ports.ts`,
  `scripts/build-tokens.mjs`, `src/tokens/tokens.generated.css`, `src/styles/components.css`
* **50 new (untracked)** — the agent contract/fixtures/shell + 12 screens (full list in STEP 1).
* `Claude outputs/` — if listed at all, it must be **untracked**, and you will **not** stage it.
* Ignored build dirs (`node_modules/`, `dist/`, `storybook-static/`) should not appear (they're
  git-ignored); if any does, do **not** stage it — it is not part of B6.

**If `HEAD` is not `67eac0a`, or any tracked file OTHER than those 6 is modified, or any of the 6 shows a
hunk that is not agent/review-workspace related — STOP and send me `git diff` for that file.** Do not
force-add or work around it.

---

## STEP 1 — Stage B6 only

### 1a. The 50 new files (safe to add by explicit path — each is wholly B6)

```bash
git add \
  src/contract/agent.ts \
  src/screens/agent-labels.ts \
  src/fixtures/scenarios/agent.ts \
  src/fixtures/providers/FixtureAgentProviders.ts \
  src/shell/AgentShell.tsx \
  src/shell/AgentSidebar.tsx \
  src/shell/ContextSwitcher.tsx \
  src/screens/AgentOnboarding/AgentOnboardingScreen.tsx \
  src/screens/AgentOnboarding/index.ts \
  src/screens/AgentOnboarding/AgentOnboarding.stories.tsx \
  src/screens/AgentToday/AgentTodayScreen.tsx \
  src/screens/AgentToday/index.ts \
  src/screens/AgentToday/AgentToday.stories.tsx \
  src/screens/AgentToday/agentToday.test.tsx \
  src/screens/AgentDocket/AgentDocketScreen.tsx \
  src/screens/AgentDocket/index.ts \
  src/screens/AgentDocket/AgentDocket.stories.tsx \
  src/screens/AgentMattersIndex/AgentMattersIndexScreen.tsx \
  src/screens/AgentMattersIndex/index.ts \
  src/screens/AgentMattersIndex/AgentMattersIndex.stories.tsx \
  src/screens/MatterImport/MatterImportScreen.tsx \
  src/screens/MatterImport/index.ts \
  src/screens/MatterImport/MatterImport.stories.tsx \
  src/screens/MatterImport/matterImport.test.tsx \
  src/screens/AgentMatterDetail/AgentMatterDetailScreen.tsx \
  src/screens/AgentMatterDetail/index.ts \
  src/screens/AgentMatterDetail/AgentMatterDetail.stories.tsx \
  src/screens/AgentMatterDetail/agentMatterDetail.test.tsx \
  src/screens/ReviewsQueue/ReviewsQueueScreen.tsx \
  src/screens/ReviewsQueue/index.ts \
  src/screens/ReviewsQueue/ReviewsQueue.stories.tsx \
  src/screens/ReviewWorkspace/ReviewWorkspaceScreen.tsx \
  src/screens/ReviewWorkspace/index.ts \
  src/screens/ReviewWorkspace/ReviewWorkspace.stories.tsx \
  src/screens/ReviewWorkspace/reviewWorkspace.test.tsx \
  src/screens/Opportunities/OpportunitiesScreen.tsx \
  src/screens/Opportunities/index.ts \
  src/screens/Opportunities/Opportunities.stories.tsx \
  src/screens/Opportunities/opportunities.test.tsx \
  src/screens/AgentPractice/AgentPracticeScreen.tsx \
  src/screens/AgentPractice/index.ts \
  src/screens/AgentPractice/AgentPractice.stories.tsx \
  src/screens/AgentPractice/agentPractice.test.tsx \
  src/screens/AgentSettings/AgentSettingsScreen.tsx \
  src/screens/AgentSettings/index.ts \
  src/screens/AgentSettings/AgentSettings.stories.tsx \
  src/screens/AgentNotifications/AgentNotificationsScreen.tsx \
  src/screens/AgentNotifications/index.ts \
  src/screens/AgentNotifications/AgentNotifications.stories.tsx \
  src/screens/AgentNotifications/agentNotifications.test.tsx
```

That is exactly 50 paths.

### 1b. The 6 modified shared files

Because `HEAD` is B5, each of these files' whole diff is B6 (agent exports/ports, the agent harness
entries, the `reviewpane.gap` token, its generated line, and the `.review-pane` block). Stage them whole:

```bash
git add \
  src/App.tsx \
  src/contract/index.ts \
  src/contract/ports.ts \
  scripts/build-tokens.mjs \
  src/tokens/tokens.generated.css \
  src/styles/components.css
```

**Fallback — only if STEP 0 flagged a shared file as containing a non-B6 hunk** (it should not): stage that
one file by hunk instead, selecting only B6 hunks and skipping anything else:

```bash
git add -p <that-file>
```

B6 hunk keywords to accept: `agent` / `Agent`, `SC-A00`…`SC-A14`, `export * from './agent'`, the agent
ports block, `AgentShell`, `reviewpane.gap` / `--reviewpane-gap`, `.review-pane`. Skip any hunk that does
not match — and tell me what it was.

---

## STEP 2 — Verify the staged set BEFORE committing

```bash
git diff --cached --name-only        # must list exactly the 56 files (50 new + 6 shared)
git diff --cached --name-only | wc -l # must print 56
git diff --cached --stat
git status                            # Claude outputs/ must remain untracked, NOT staged
```

Confirm no file outside the 56 is staged, and `Claude outputs/` is not among them. If the count is not 56,
stop and reconcile before committing.

---

## STEP 3 — Commit & push

```bash
git commit -m "Phase 8 B6: implement Agent surface"
git push origin main
```

> Optional: append your usual co-author/session trailer to the message if you keep it in history; the
> subject line above is exact, as requested.

---

## STEP 4 — Final verification

```bash
git log -3 --oneline                 # HEAD → "Phase 8 B6: implement Agent surface" over 67eac0a (B5)
git rev-parse HEAD
git rev-parse origin/main            # must equal HEAD (push landed)
git status                           # clean except untracked "Claude outputs/"
git status --ignored | grep -i "Claude outputs"   # confirm it's untracked/ignored, never committed
```

Expected end state: `HEAD == origin/main`, both pointing at the new B6 commit whose parent is `67eac0a`;
working tree clean except the untracked `Claude outputs/`.

Do **not** start B7 — a human review comes next. The comprehensive Phase 8 audit remains scheduled only
after B9.
