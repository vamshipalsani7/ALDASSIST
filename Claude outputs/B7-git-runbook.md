# Phase 8 B7 — Git Runbook (stage → commit → push)

Run every command **on your machine** in `R:\ALDASSIST\04_Development\ui` (git resolves the repo's `.git`
from the `R:\ALDASSIST` root). I do not run git from this session. **Nothing here resets, restores, cleans,
checks out, amends, or force-pushes.** Never run `git add .`. `Claude outputs/` must stay untracked.

**Baseline:** `HEAD` is already **`72c8937` — Phase 8 B6**, committed and pushed. So the **only** uncommitted
change in the tree is B7 (the 29 files I delivered: 26 new + 3 modified shared). The 3 shared files contain
**B7 changes only** — no cumulative hunks from earlier batches — and stage whole. B7 added **no CSS or token
files**, so the shared set is just the contract barrel, ports, and the App harness.

> Fastest path: run the guarded script (same mechanism that worked for B6) —
> `powershell -ExecutionPolicy Bypass -File "R:\ALDASSIST\Claude outputs\b7_git_run.ps1"`
> It performs every step below with hard aborts and writes `R:\ALDASSIST\Claude outputs\b7_git_run.log`.
> The manual steps follow for reference / if you prefer to run them yourself.

---

## STEP 0 — Inspect (read-only, change nothing)

```bash
git rev-parse HEAD            # expect 72c8937… (Phase 8 B6)
git log -3 --oneline
git status
git diff --stat
git diff --name-only          # the 3 modified shared files (tracked)
git status --porcelain --untracked-files=all   # new files show as "??"
```

Confirm the change set is **exactly the 29 B7 files and nothing else**:

* **3 modified (tracked)** — must be precisely:
  `src/App.tsx`, `src/contract/index.ts`, `src/contract/ports.ts`
* **26 new (untracked)** — the ops contract/fixtures/shell + 5 consoles (full list in STEP 1).
* `Claude outputs/` — if listed, it must be **untracked**, and you will **not** stage it.
* Ignored/build dirs (`node_modules/`, `dist/`, `storybook-static/`) should not appear as staged/committed;
  do not stage them.

**If `HEAD` is not `72c8937`, or any tracked file OTHER than those 3 is modified, or any of the 3 shows a
hunk that is not Ops-related — STOP and send me `git diff` for that file.** Do not force-add or improvise.

---

## STEP 1 — Stage B7 only

### 1a. The 26 new files (each wholly B7)

```bash
git add \
  src/contract/ops.ts \
  src/screens/ops-labels.ts \
  src/fixtures/scenarios/ops.ts \
  src/fixtures/providers/FixtureOpsProviders.ts \
  src/shell/OpsShell.tsx \
  src/shell/OpsSidebar.tsx \
  src/screens/DocketHealth/DocketHealthScreen.tsx \
  src/screens/DocketHealth/index.ts \
  src/screens/DocketHealth/DocketHealth.stories.tsx \
  src/screens/DocketHealth/docketHealth.test.tsx \
  src/screens/AgentVerification/AgentVerificationScreen.tsx \
  src/screens/AgentVerification/index.ts \
  src/screens/AgentVerification/AgentVerification.stories.tsx \
  src/screens/AgentVerification/agentVerification.test.tsx \
  src/screens/RuleAuthoring/RuleAuthoringScreen.tsx \
  src/screens/RuleAuthoring/index.ts \
  src/screens/RuleAuthoring/RuleAuthoring.stories.tsx \
  src/screens/RuleAuthoring/ruleAuthoring.test.tsx \
  src/screens/QualityConsole/QualityConsoleScreen.tsx \
  src/screens/QualityConsole/index.ts \
  src/screens/QualityConsole/QualityConsole.stories.tsx \
  src/screens/QualityConsole/qualityConsole.test.tsx \
  src/screens/BusinessDashboard/BusinessDashboardScreen.tsx \
  src/screens/BusinessDashboard/index.ts \
  src/screens/BusinessDashboard/BusinessDashboard.stories.tsx \
  src/screens/BusinessDashboard/businessDashboard.test.tsx
```

That is exactly 26 paths.

### 1b. The 3 modified shared files (whole — each diff is entirely B7)

```bash
git add \
  src/App.tsx \
  src/contract/index.ts \
  src/contract/ports.ts
```

**Fallback — only if STEP 0 flagged a shared file as containing a non-B7 hunk** (it should not): stage that
file by hunk (`git add -p <file>`) and accept only B7 hunks — keywords: `ops` / `Ops`, `SC-O01`…`SC-O05`,
`export * from './ops'`, the ops ports block, `OpsShell` — skipping anything else, and tell me what it was.

---

## STEP 2 — Verify the staged set BEFORE committing

```bash
git diff --cached --name-only        # must list exactly the 29 files (26 new + 3 shared)
git diff --cached --name-only | wc -l # must print 29
git diff --cached --stat
git status                            # Claude outputs/ must remain untracked, NOT staged
```

If the count is not 29, or anything outside the 29 is staged, or `Claude outputs/` is staged — stop and
reconcile before committing.

---

## STEP 3 — Commit & push

```bash
git commit -m "Phase 8 B7: implement Operations surface"
git push origin main
```

---

## STEP 4 — Final verification

```bash
git log -3 --oneline                 # HEAD → "Phase 8 B7: implement Operations surface" over 72c8937 (B6)
git rev-parse HEAD
git rev-parse origin/main            # must equal HEAD (push landed)
git status                           # clean except untracked "Claude outputs/"
git status --ignored | grep -i "Claude outputs"   # confirm it's untracked, never committed
```

Expected end state: `HEAD == origin/main`, both pointing at the new B7 commit whose parent is `72c8937`;
working tree clean except the untracked `Claude outputs/`. The `LF→CRLF` lines are normal Git line-ending
advisories, not errors.

Do **not** start B8 — a human review comes next. The comprehensive Phase 8 audit remains deferred until
after B9.
