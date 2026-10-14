# Phase 8 B6 — guarded staging/commit/push (v2). Hard-aborts before any write if a gate fails.
# Repo root: R:\ALDASSIST (.git here). cwd = 04_Development\ui. Staged paths are cwd-relative; git
# status/diff report repo-root-relative (prefixed 04_Development/ui/), which the gates account for.
# v2 fixes: Add-Content uses -Path (not -FilePath); parsed git commands use 2>$null so git's advisory
# "LF will be replaced by CRLF" warnings never pollute the filename lists the gates compare.
$ErrorActionPreference = 'Continue'
$RepoRootPrefix = '04_Development/ui/'
$log = 'R:\ALDASSIST\Claude outputs\b6_git_run.log'
$dir = Split-Path $log
if (!(Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
Set-Content -Path $log -Value ("B6 git run v2 @ " + (Get-Date -Format o))
function Log([string]$m){ Add-Content -Path $log -Value $m; Write-Output $m }
function Fail([string]$m){ Log ("ABORT: " + $m); Log "RESULT=ABORT"; exit 1 }

Set-Location 'R:\ALDASSIST\04_Development\ui'
Log ("cwd = " + (Get-Location).Path)

$root = (git rev-parse --show-toplevel 2>$null) -join "`n"
Log ("repo toplevel = " + $root)

$branch = (git rev-parse --abbrev-ref HEAD 2>$null) -join "`n"
Log ("branch = " + $branch)
if ($branch -ne 'main') { Fail ("branch is '$branch', expected 'main'") }

$head = (git rev-parse HEAD 2>$null) -join "`n"
Log ("HEAD = " + $head)
if (-not ($head -like '67eac0a*')) { Fail ("HEAD is '$head', expected 67eac0a...") }

# index must be clean at start (nothing pre-staged)
$pre = @(git diff --cached --name-only 2>$null)
if ($pre.Count -gt 0) { Log ("pre-staged:`n" + ($pre -join "`n")); Fail "index not clean at start" }

Log "== STEP 0: git status --porcelain =="
$st = @(git status --porcelain 2>$null)
Log ($st -join "`n")

# expected sets (cwd-relative for staging; repo-relative for verification)
$shared = @(
  'src/App.tsx','src/contract/index.ts','src/contract/ports.ts',
  'scripts/build-tokens.mjs','src/tokens/tokens.generated.css','src/styles/components.css'
)
$newfiles = @(
  'src/contract/agent.ts','src/screens/agent-labels.ts','src/fixtures/scenarios/agent.ts','src/fixtures/providers/FixtureAgentProviders.ts',
  'src/shell/AgentShell.tsx','src/shell/AgentSidebar.tsx','src/shell/ContextSwitcher.tsx',
  'src/screens/AgentOnboarding/AgentOnboardingScreen.tsx','src/screens/AgentOnboarding/index.ts','src/screens/AgentOnboarding/AgentOnboarding.stories.tsx',
  'src/screens/AgentToday/AgentTodayScreen.tsx','src/screens/AgentToday/index.ts','src/screens/AgentToday/AgentToday.stories.tsx','src/screens/AgentToday/agentToday.test.tsx',
  'src/screens/AgentDocket/AgentDocketScreen.tsx','src/screens/AgentDocket/index.ts','src/screens/AgentDocket/AgentDocket.stories.tsx',
  'src/screens/AgentMattersIndex/AgentMattersIndexScreen.tsx','src/screens/AgentMattersIndex/index.ts','src/screens/AgentMattersIndex/AgentMattersIndex.stories.tsx',
  'src/screens/MatterImport/MatterImportScreen.tsx','src/screens/MatterImport/index.ts','src/screens/MatterImport/MatterImport.stories.tsx','src/screens/MatterImport/matterImport.test.tsx',
  'src/screens/AgentMatterDetail/AgentMatterDetailScreen.tsx','src/screens/AgentMatterDetail/index.ts','src/screens/AgentMatterDetail/AgentMatterDetail.stories.tsx','src/screens/AgentMatterDetail/agentMatterDetail.test.tsx',
  'src/screens/ReviewsQueue/ReviewsQueueScreen.tsx','src/screens/ReviewsQueue/index.ts','src/screens/ReviewsQueue/ReviewsQueue.stories.tsx',
  'src/screens/ReviewWorkspace/ReviewWorkspaceScreen.tsx','src/screens/ReviewWorkspace/index.ts','src/screens/ReviewWorkspace/ReviewWorkspace.stories.tsx','src/screens/ReviewWorkspace/reviewWorkspace.test.tsx',
  'src/screens/Opportunities/OpportunitiesScreen.tsx','src/screens/Opportunities/index.ts','src/screens/Opportunities/Opportunities.stories.tsx','src/screens/Opportunities/opportunities.test.tsx',
  'src/screens/AgentPractice/AgentPracticeScreen.tsx','src/screens/AgentPractice/index.ts','src/screens/AgentPractice/AgentPractice.stories.tsx','src/screens/AgentPractice/agentPractice.test.tsx',
  'src/screens/AgentSettings/AgentSettingsScreen.tsx','src/screens/AgentSettings/index.ts','src/screens/AgentSettings/AgentSettings.stories.tsx',
  'src/screens/AgentNotifications/AgentNotificationsScreen.tsx','src/screens/AgentNotifications/index.ts','src/screens/AgentNotifications/AgentNotifications.stories.tsx','src/screens/AgentNotifications/agentNotifications.test.tsx'
)
$all = $shared + $newfiles
Log ("expected shared=" + $shared.Count + " new=" + $newfiles.Count + " total=" + $all.Count)
if ($all.Count -ne 56) { Fail ("internal expected list is " + $all.Count + ", not 56") }

# GATE: modified TRACKED files (unstaged) must be EXACTLY the 6 shared (repo-relative). 2>$null so CRLF
# advisory warnings do not enter the list.
$expectedMod = ($shared | ForEach-Object { $RepoRootPrefix + $_ } | Sort-Object)
$actualMod = @(git diff --name-only 2>$null) | Sort-Object
Log "== unstaged tracked modifications (expect exactly the 6 shared) =="
Log ($actualMod -join "`n")
if (($actualMod -join '|') -ne ($expectedMod -join '|')) { Fail "modified tracked set != the 6 expected shared files" }

# GATE: every expected file exists on disk
foreach ($f in $newfiles) { if (!(Test-Path $f)) { Fail ("missing new file: " + $f) } }
foreach ($f in $shared)   { if (!(Test-Path $f)) { Fail ("missing shared file: " + $f) } }

# STAGE only the explicit 56 (never 'git add .'). Log add output (incl. CRLF warnings) but do not parse it.
Log "== staging 56 explicit paths =="
git add -- $all 2>&1 | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
if ($LASTEXITCODE -ne 0) { Fail ("git add exit " + $LASTEXITCODE) }

# GATE: staged set is EXACTLY the 56 expected (repo-relative), none under 'Claude outputs'
$expectedStaged = ($all | ForEach-Object { $RepoRootPrefix + $_ } | Sort-Object)
$staged = @(git diff --cached --name-only 2>$null) | Sort-Object
Log "== staged set =="
Log ($staged -join "`n")
Log ("staged count = " + $staged.Count)
if ($staged.Count -ne 56) { Fail ("staged count " + $staged.Count + " != 56") }
if ($staged | Where-Object { $_ -match 'Claude outputs' }) { Fail "Claude outputs is staged" }
if (($staged -join '|') -ne ($expectedStaged -join '|')) { Fail "staged set != the 56 expected B6 files" }

# GATE: no residual unstaged tracked modifications (would mean a non-B6 tracked file changed)
$resid = @(git diff --name-only 2>$null)
if ($resid.Count -gt 0) { Log ("residual unstaged tracked mods:`n" + ($resid -join "`n")); Fail "unexpected tracked modification outside the 56" }

# All gates passed -> commit
Log "== commit =="
git commit -m "Phase 8 B6: implement Agent surface" 2>&1 | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
if ($LASTEXITCODE -ne 0) { Fail ("git commit exit " + $LASTEXITCODE) }

$newhead = (git rev-parse HEAD 2>$null) -join "`n"
$parent  = (git rev-parse HEAD^ 2>$null) -join "`n"
Log ("new HEAD = " + $newhead)
Log ("parent   = " + $parent)
if (-not ($parent -like '67eac0a*')) { Fail ("parent " + $parent + " != 67eac0a") }

# Push
Log "== push origin main =="
git push origin main 2>&1 | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
if ($LASTEXITCODE -ne 0) { Fail ("git push exit " + $LASTEXITCODE) }

$om = (git rev-parse origin/main 2>$null) -join "`n"
Log ("origin/main = " + $om)
if ($om -ne $newhead) { Fail ("origin/main " + $om + " != HEAD " + $newhead) }

Log "== final status =="
@(git status 2>$null) | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
Log "== final log =="
@(git log -3 --oneline 2>$null) | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }

Log ("RESULT=SUCCESS commit=" + $newhead + " parent=" + $parent)
exit 0
