# ALDASSIST Phase 8 -- Audit accuracy-fix guarded Git runbook (stage -> commit -> push), with hard aborts.
# Mirrors the proven B6/B7/B8/B9 mechanism. Nothing here amends, force-pushes, resets, restores, cleans, or
# checks out. Never uses `git add .`. `Claude outputs/` must stay untracked. Runs from the repo ROOT so every
# pathspec is repo-relative and unambiguous.
#
# Fix vs B9: ErrorActionPreference = 'Continue' (NOT Stop) so git's normal stderr progress on push/commit is
# NOT treated as a terminating error; commit/push success is gated explicitly on $LASTEXITCODE.

$ErrorActionPreference = 'Continue'
$log = 'R:\ALDASSIST\Claude outputs\accuracy_git_run.log'
if (Test-Path $log) { Remove-Item $log -Force }
function Log($m) { Write-Host $m; Add-Content -Path $log -Value $m }
function Abort($m) { Log ("ABORT: " + $m); Log ("RESULT=ABORT reason=" + $m); exit 1 }

Log ("Accuracy-fix git run @ " + (Get-Date -Format o))

# --- baseline / constants -------------------------------------------------------------------------
$repoRoot   = 'R:\ALDASSIST'
$parentB9   = 'c1fa2deeafcff5a2727fd98e0fa369b1d64dd276'
$headPrefix = 'c1fa2de'
$commitMsg  = 'Phase 8 audit accuracy fixes (M1 open-slot coverage, M2 lexicon module, M3 traceability, L5 Gate-A baseline)'

# 5 modified (tracked)
$modified = @(
  '04_Development/ui/B9-verification-runbook.md',
  '04_Development/ui/scripts/verify.mjs',
  '04_Development/ui/src/fixtures/scenarios/ops.ts',
  '04_Development/ui/src/test/openSlots.preservation.test.ts',
  '04_Development/ui/src/test/vocabulary.crosscutting.test.ts'
)
# 2 new (untracked)
$newfiles = @(
  '04_Development/ui/Phase-8-External-Source-Traceability.md',
  '04_Development/ui/src/test/vocabulary.lexicon.ts'
)
$expectedAll = ($modified + $newfiles | Sort-Object)
Log ("expected: modified=" + $modified.Count + " new=" + $newfiles.Count + " total=" + $expectedAll.Count)
if ($expectedAll.Count -ne 7) { Abort ("expected-set is not 7 (got " + $expectedAll.Count + ")") }

# --- STEP 0: location + branch + HEAD ---------------------------------------------------------------
Set-Location $repoRoot
if (-not (Test-Path (Join-Path $repoRoot '.git'))) { Abort "no .git at repo root" }
Log ("cwd = " + (Get-Location).Path)

$branch = (& git rev-parse --abbrev-ref HEAD 2>$null).Trim()
Log ("branch = " + $branch)
if ($branch -ne 'main') { Abort ("branch is not main: " + $branch) }

$head = (& git rev-parse HEAD 2>$null).Trim()
Log ("HEAD = " + $head)
if (-not $head.StartsWith($headPrefix)) { Abort ("HEAD is not the B9 baseline " + $headPrefix + " (got " + $head + ")") }

# --- STEP 1: inspect working tree -------------------------------------------------------------------
Log "== git status --porcelain =="
$porc = & git status --porcelain 2>$null
foreach ($l in $porc) { Log $l }

$mod = New-Object System.Collections.Generic.List[string]
$unt = New-Object System.Collections.Generic.List[string]
$other = New-Object System.Collections.Generic.List[string]
foreach ($l in $porc) {
  if ([string]::IsNullOrWhiteSpace($l)) { continue }
  $code = $l.Substring(0,2)
  $path = $l.Substring(3).Trim()
  if ($path.StartsWith('"') -and $path.EndsWith('"')) { $path = $path.Substring(1, $path.Length-2) }
  if ($code -eq '??') {
    if ($path.StartsWith('Claude outputs/')) { continue }   # allowed, never staged (collapsed or expanded)
    $unt.Add($path)
  } elseif ($code -eq ' M' -or $code -eq 'M ' -or $code -eq 'MM') {
    $mod.Add($path)
  } else {
    $other.Add($code + ' ' + $path)                         # any add/delete/rename/copy/typechange -> unexpected
  }
}

if ($other.Count -gt 0) { foreach ($o in $other) { Log ("UNEXPECTED: " + $o) }; Abort ("unexpected status entries: " + $other.Count) }

$modSorted = ($mod | Sort-Object)
$untSorted = ($unt | Sort-Object)
$modExp = ($modified | Sort-Object)
$untExp = ($newfiles | Sort-Object)

Log "== modified (tracked) -- expect exactly the 5 =="
foreach ($m in $modSorted) { Log ("  M  " + $m) }
if ((($modSorted -join "`n")) -ne (($modExp -join "`n"))) { Abort "modified-tracked set does not match the exact 5 files" }

Log "== new (untracked, excl. 'Claude outputs/') -- expect exactly the 2 =="
foreach ($u in $untSorted) { Log ("  ?? " + $u) }
if ((($untSorted -join "`n")) -ne (($untExp -join "`n"))) { Abort "untracked set does not match the exact 2 files" }

# all 7 exist on disk
foreach ($f in $expectedAll) {
  $abs = Join-Path $repoRoot ($f -replace '/', '\')
  if (-not (Test-Path $abs)) { Abort ("expected file missing on disk: " + $f) }
}
Log "all 7 expected files present on disk"

# --- STEP 2: stage ONLY the 7 explicit paths -------------------------------------------------------
Log "== staging 7 explicit paths (no 'git add .') =="
foreach ($f in $expectedAll) { & git add -- $f }

$staged = @(& git diff --cached --name-only 2>$null | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' } | Sort-Object)
Log ("staged count = " + $staged.Count)
foreach ($s in $staged) { Log ("  + " + $s) }

if ($staged.Count -ne 7) { Abort ("staged count is not 7 (got " + $staged.Count + ")") }
if ((($staged -join "`n")) -ne (($expectedAll -join "`n"))) { Abort "staged set does not match the exact 7 files" }
if ($staged | Where-Object { $_ -match 'Claude outputs' }) { Abort "'Claude outputs' was staged" }
if ($staged | Where-Object { $_ -notlike '04_Development/ui/*' }) { Abort "a staged path is outside 04_Development/ui" }

# no residual unstaged tracked modifications (everything intended is staged)
$unstaged = @(& git diff --name-only 2>$null | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })
if ($unstaged.Count -gt 0) { foreach ($u in $unstaged) { Log ("RESIDUAL UNSTAGED: " + $u) }; Abort ("residual unstaged tracked modifications: " + $unstaged.Count) }

# --- STEP 3: commit (gate on exit code, not on stderr) ---------------------------------------------
Log "== commit =="
$commitOut = & git commit -m $commitMsg 2>&1
$commitCode = $LASTEXITCODE
$commitOut | ForEach-Object { Log $_ }
if ($commitCode -ne 0) { Abort ("git commit failed (exit " + $commitCode + ")") }

$newHead = (& git rev-parse HEAD 2>$null).Trim()
$parent  = (& git rev-parse HEAD^ 2>$null).Trim()
Log ("new HEAD = " + $newHead)
Log ("parent   = " + $parent)
if ($parent -ne $parentB9) { Abort ("commit parent is not the B9 commit (got " + $parent + ")") }
if ($newHead -eq $head)    { Abort "HEAD did not advance after commit" }

# --- STEP 4: push (gate on exit code, not on stderr) -----------------------------------------------
Log "== push origin main =="
$pushOut = & git push origin main 2>&1
$pushCode = $LASTEXITCODE
$pushOut | ForEach-Object { Log $_ }
if ($pushCode -ne 0) { Abort ("git push failed (exit " + $pushCode + ")") }

$originMain = (& git rev-parse origin/main 2>$null).Trim()
Log ("origin/main = " + $originMain)
if ($originMain -ne $newHead) { Abort ("origin/main != HEAD after push (origin/main=" + $originMain + ")") }

# --- STEP 5: final verification ---------------------------------------------------------------------
Log "== final status =="
& git status 2>&1 | ForEach-Object { Log $_ }

Log "== files in the commit =="
& git show --stat --oneline $newHead 2>&1 | ForEach-Object { Log $_ }

$committedCount = @(& git show --name-only --pretty=format: $newHead 2>$null | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }).Count
Log ("committed file count = " + $committedCount)
if ($committedCount -ne 7) { Abort ("committed file count is not 7 (got " + $committedCount + ")") }

Log "== final log (expect accuracy-fix commit immediately after B9) =="
& git log -3 --oneline 2>&1 | ForEach-Object { Log $_ }

Log ("RESULT=SUCCESS commit=" + $newHead + " parent=" + $parent + " staged=7 committed=" + $committedCount)
