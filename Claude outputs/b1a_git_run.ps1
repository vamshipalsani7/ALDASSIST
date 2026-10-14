# ALDASSIST Phase 9 — B1a guarded commit + push runner.
# Commits EXACTLY the verified 11-file B1a change set, linear, no force/amend/reset/rebase.
# Aborts unless HEAD == the frozen tip and the working-tree + staged set are exactly those 11 files.
$log = 'R:\ALDASSIST\Claude outputs\b1a_git_run.log'
try { Start-Transcript -Path $log -Force | Out-Null } catch {}
function Die($m){ Write-Output "ABORT: $m"; try { Stop-Transcript | Out-Null } catch {}; exit 1 }

Set-Location 'R:\ALDASSIST'
Write-Output "=== B1a git run @ $(Get-Date -Format o) ==="

$frozen = '0ddf8bbdc4adbe4afe87e46ed4bf2b98f6741f06'
$head = (git rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) { Die "git rev-parse HEAD failed" }
Write-Output "HEAD before: $head"
if ($head -ne $frozen) { Die "HEAD is not the frozen tip $frozen" }

$files = @(
 '04_Development/ui/src/App.tsx',
 '04_Development/ui/src/components/CitationResolverContext.tsx',
 '04_Development/ui/src/runtime/mode.ts',
 '04_Development/ui/src/runtime/registry.ts',
 '04_Development/ui/src/runtime/fixtureRegistry.ts',
 '04_Development/ui/src/runtime/buildRegistry.ts',
 '04_Development/ui/src/runtime/RegistryContext.tsx',
 '04_Development/ui/src/runtime/ProviderScreen.tsx',
 '04_Development/ui/src/runtime/routes.tsx',
 '04_Development/ui/src/runtime/RouterShell.tsx',
 '04_Development/ui/src/runtime/runtime.test.tsx'
)
$expected = $files | Sort-Object

Write-Output "=== working tree BEFORE (porcelain -uall) ==="
$before = git status --porcelain -uall
if ($LASTEXITCODE -ne 0) { Die "git status failed" }
$before | ForEach-Object { Write-Output $_ }
$changed = @($before | Where-Object { $_ -ne '' } | ForEach-Object { ($_ -replace '^...','').Trim().Trim('"') } | Sort-Object)
$d1 = Compare-Object -ReferenceObject $expected -DifferenceObject $changed
if ($d1) { Write-Output ($d1 | Format-Table | Out-String); Die "working tree changes are not exactly the 11 B1a files" }
Write-Output "GUARD OK: working tree = exactly the 11 B1a files."

git add -- $files
if ($LASTEXITCODE -ne 0) { Die "git add failed" }
$staged = @(git diff --cached --name-only)
if ($LASTEXITCODE -ne 0) { Die "git diff --cached failed" }
$stagedSorted = @($staged | ForEach-Object { $_.Trim() } | Sort-Object)
$d2 = Compare-Object -ReferenceObject $expected -DifferenceObject $stagedSorted
if ($d2) { Write-Output ($d2 | Format-Table | Out-String); Die "staged set is not exactly the 11 B1a files" }
Write-Output "=== staged (exactly 11) ==="; $staged | ForEach-Object { Write-Output $_ }

$msg  = "Phase 9 B1a: runtime & composition foundation"
$body = "Composition root + typed provider registry (D-2026-026), three runtime modes with live fail-closed, injection seam over all 56 screens, routing/URL shell (D-2026-028). The Floor green: 197 tests, all gates at documented baselines. Accepted per completed preflight + documentation consistency check. No frozen contract/screen/fixture touched."
$a1   = "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
$a2   = "Claude-Session: https://claude.ai/code/session_01MhGzJgfLmyombEA2qnEfem"
git commit -m $msg -m $body -m $a1 -m $a2
if ($LASTEXITCODE -ne 0) { Die "git commit failed" }

Write-Output "=== pushing to origin main ==="
git push origin main 2>&1 | ForEach-Object { Write-Output $_ }
if ($LASTEXITCODE -ne 0) { Die "git push failed" }

Write-Output "=== VERIFY ==="
$newHead    = (git rev-parse HEAD).Trim()
$originMain = (git rev-parse origin/main).Trim()
Write-Output "COMMIT_HASH: $newHead"
Write-Output "ORIGIN_MAIN: $originMain"
Write-Output ("HEAD_EQ_ORIGIN: " + ($newHead -eq $originMain))
Write-Output "=== git status ==="; (git status) | ForEach-Object { Write-Output $_ }
Write-Output "=== commit contents (name-status) ==="; (git show --stat --name-status HEAD) | ForEach-Object { Write-Output $_ }
Write-Output "=== DONE_OK ==="
try { Stop-Transcript | Out-Null } catch {}
