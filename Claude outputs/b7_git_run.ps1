# Phase 8 B7 — guarded staging/commit/push. Hard-aborts before any write if a gate fails.
# Repo root: R:\ALDASSIST (.git here). cwd = 04_Development\ui. Staged paths are cwd-relative; git
# status/diff report repo-root-relative (prefixed 04_Development/ui/), which the gates account for.
# Same proven pattern as the B6 run: Add-Content -Path; parsed git commands use 2>$null so git's advisory
# "LF will be replaced by CRLF" warnings never pollute the filename lists the gates compare.
$ErrorActionPreference = 'Continue'
$RepoRootPrefix = '04_Development/ui/'
$log = 'R:\ALDASSIST\Claude outputs\b7_git_run.log'
$dir = Split-Path $log
if (!(Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
Set-Content -Path $log -Value ("B7 git run @ " + (Get-Date -Format o))
function Log([string]$m){ Add-Content -Path $log -Value $m; Write-Output $m }
function Fail([string]$m){ Log ("ABORT: " + $m); Log "RESULT=ABORT"; exit 1 }

Set-Location 'R:\ALDASSIST\04_Development\ui'
Log ("cwd = " + (Get-Location).Path)

$branch = (git rev-parse --abbrev-ref HEAD 2>$null) -join "`n"
Log ("branch = " + $branch)
if ($branch -ne 'main') { Fail ("branch is '$branch', expected 'main'") }

$head = (git rev-parse HEAD 2>$null) -join "`n"
Log ("HEAD = " + $head)
if (-not ($head -like '72c8937*')) { Fail ("HEAD is '$head', expected 72c8937...") }

$pre = @(git diff --cached --name-only 2>$null)
if ($pre.Count -gt 0) { Log ("pre-staged:`n" + ($pre -join "`n")); Fail "index not clean at start" }

Log "== STEP 0: git status --porcelain =="
Log ((@(git status --porcelain 2>$null)) -join "`n")

$shared = @(
  'src/App.tsx','src/contract/index.ts','src/contract/ports.ts'
)
$newfiles = @(
  'src/contract/ops.ts','src/screens/ops-labels.ts','src/fixtures/scenarios/ops.ts','src/fixtures/providers/FixtureOpsProviders.ts',
  'src/shell/OpsShell.tsx','src/shell/OpsSidebar.tsx',
  'src/screens/DocketHealth/DocketHealthScreen.tsx','src/screens/DocketHealth/index.ts','src/screens/DocketHealth/DocketHealth.stories.tsx','src/screens/DocketHealth/docketHealth.test.tsx',
  'src/screens/AgentVerification/AgentVerificationScreen.tsx','src/screens/AgentVerification/index.ts','src/screens/AgentVerification/AgentVerification.stories.tsx','src/screens/AgentVerification/agentVerification.test.tsx',
  'src/screens/RuleAuthoring/RuleAuthoringScreen.tsx','src/screens/RuleAuthoring/index.ts','src/screens/RuleAuthoring/RuleAuthoring.stories.tsx','src/screens/RuleAuthoring/ruleAuthoring.test.tsx',
  'src/screens/QualityConsole/QualityConsoleScreen.tsx','src/screens/QualityConsole/index.ts','src/screens/QualityConsole/QualityConsole.stories.tsx','src/screens/QualityConsole/qualityConsole.test.tsx',
  'src/screens/BusinessDashboard/BusinessDashboardScreen.tsx','src/screens/BusinessDashboard/index.ts','src/screens/BusinessDashboard/BusinessDashboard.stories.tsx','src/screens/BusinessDashboard/businessDashboard.test.tsx'
)
$all = $shared + $newfiles
Log ("expected shared=" + $shared.Count + " new=" + $newfiles.Count + " total=" + $all.Count)
if ($all.Count -ne 29) { Fail ("internal expected list is " + $all.Count + ", not 29") }

# GATE: modified TRACKED files (unstaged) must be EXACTLY the 3 shared (repo-relative)
$expectedMod = ($shared | ForEach-Object { $RepoRootPrefix + $_ } | Sort-Object)
$actualMod = @(git diff --name-only 2>$null) | Sort-Object
Log "== unstaged tracked modifications (expect exactly the 3 shared) =="
Log ($actualMod -join "`n")
if (($actualMod -join '|') -ne ($expectedMod -join '|')) { Fail "modified tracked set != the 3 expected shared files" }

foreach ($f in $newfiles) { if (!(Test-Path $f)) { Fail ("missing new file: " + $f) } }
foreach ($f in $shared)   { if (!(Test-Path $f)) { Fail ("missing shared file: " + $f) } }

Log "== staging 29 explicit paths =="
git add -- $all 2>&1 | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
if ($LASTEXITCODE -ne 0) { Fail ("git add exit " + $LASTEXITCODE) }

$expectedStaged = ($all | ForEach-Object { $RepoRootPrefix + $_ } | Sort-Object)
$staged = @(git diff --cached --name-only 2>$null) | Sort-Object
Log "== staged set =="
Log ($staged -join "`n")
Log ("staged count = " + $staged.Count)
if ($staged.Count -ne 29) { Fail ("staged count " + $staged.Count + " != 29") }
if ($staged | Where-Object { $_ -match 'Claude outputs' }) { Fail "Claude outputs is staged" }
if (($staged -join '|') -ne ($expectedStaged -join '|')) { Fail "staged set != the 29 expected B7 files" }

$resid = @(git diff --name-only 2>$null)
if ($resid.Count -gt 0) { Log ("residual unstaged tracked mods:`n" + ($resid -join "`n")); Fail "unexpected tracked modification outside the 29" }

Log "== commit =="
git commit -m "Phase 8 B7: implement Operations surface" 2>&1 | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
if ($LASTEXITCODE -ne 0) { Fail ("git commit exit " + $LASTEXITCODE) }

$newhead = (git rev-parse HEAD 2>$null) -join "`n"
$parent  = (git rev-parse HEAD^ 2>$null) -join "`n"
Log ("new HEAD = " + $newhead)
Log ("parent   = " + $parent)
if (-not ($parent -like '72c8937*')) { Fail ("parent " + $parent + " != 72c8937") }

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
