# Phase 8 B8 — guarded staging/commit/push. Hard-aborts before any write if a gate fails.
# Repo root: R:\ALDASSIST (.git here). cwd = 04_Development\ui. Same proven pattern as B6/B7:
# Add-Content -Path; parsed git commands use 2>$null so CRLF advisory warnings never pollute the lists.
$ErrorActionPreference = 'Continue'
$RepoRootPrefix = '04_Development/ui/'
$log = 'R:\ALDASSIST\Claude outputs\b8_git_run.log'
$dir = Split-Path $log
if (!(Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
Set-Content -Path $log -Value ("B8 git run @ " + (Get-Date -Format o))
function Log([string]$m){ Add-Content -Path $log -Value $m; Write-Output $m }
function Fail([string]$m){ Log ("ABORT: " + $m); Log "RESULT=ABORT"; exit 1 }

Set-Location 'R:\ALDASSIST\04_Development\ui'
Log ("cwd = " + (Get-Location).Path)

$branch = (git rev-parse --abbrev-ref HEAD 2>$null) -join "`n"
Log ("branch = " + $branch)
if ($branch -ne 'main') { Fail ("branch is '$branch', expected 'main'") }

$head = (git rev-parse HEAD 2>$null) -join "`n"
Log ("HEAD = " + $head)
if (-not ($head -like 'f3b1c27*')) { Fail ("HEAD is '$head', expected f3b1c27...") }

$pre = @(git diff --cached --name-only 2>$null)
if ($pre.Count -gt 0) { Log ("pre-staged:`n" + ($pre -join "`n")); Fail "index not clean at start" }

Log "== STEP 0: git status --porcelain =="
Log ((@(git status --porcelain 2>$null)) -join "`n")

$shared = @(
  'src/App.tsx','src/contract/index.ts','src/contract/ports.ts'
)
$newfiles = @(
  'src/contract/public.ts',
  'src/fixtures/providers/FixturePublicProviders.ts',
  'src/fixtures/scenarios/public.ts',
  'src/screens/AgentDirectory/AgentDirectory.stories.tsx',
  'src/screens/AgentDirectory/AgentDirectoryScreen.tsx',
  'src/screens/AgentDirectory/index.ts',
  'src/screens/AgentPublicProfile/AgentPublicProfile.stories.tsx',
  'src/screens/AgentPublicProfile/AgentPublicProfileScreen.tsx',
  'src/screens/AgentPublicProfile/agentPublicProfile.test.tsx',
  'src/screens/AgentPublicProfile/index.ts',
  'src/screens/Auth/Auth.stories.tsx',
  'src/screens/Auth/AuthScreen.tsx',
  'src/screens/Auth/auth.test.tsx',
  'src/screens/Auth/index.ts',
  'src/screens/CompanyLegal/CompanyLegal.stories.tsx',
  'src/screens/CompanyLegal/CompanyLegalScreen.tsx',
  'src/screens/CompanyLegal/index.ts',
  'src/screens/CostPlanner/CostPlanner.stories.tsx',
  'src/screens/CostPlanner/CostPlannerScreen.tsx',
  'src/screens/CostPlanner/costPlanner.test.tsx',
  'src/screens/CostPlanner/index.ts',
  'src/screens/FindYourPath/FindYourPath.stories.tsx',
  'src/screens/FindYourPath/FindYourPathScreen.tsx',
  'src/screens/FindYourPath/findYourPath.test.tsx',
  'src/screens/FindYourPath/index.ts',
  'src/screens/Glossary/Glossary.stories.tsx',
  'src/screens/Glossary/GlossaryScreen.tsx',
  'src/screens/Glossary/glossary.test.tsx',
  'src/screens/Glossary/index.ts',
  'src/screens/Guides/Guides.stories.tsx',
  'src/screens/Guides/GuidesScreen.tsx',
  'src/screens/Guides/index.ts',
  'src/screens/JurisdictionGuide/JurisdictionGuide.stories.tsx',
  'src/screens/JurisdictionGuide/JurisdictionGuideScreen.tsx',
  'src/screens/JurisdictionGuide/index.ts',
  'src/screens/PatentDocument/PatentDocument.stories.tsx',
  'src/screens/PatentDocument/PatentDocumentScreen.tsx',
  'src/screens/PatentDocument/index.ts',
  'src/screens/PatentDocument/patentDocument.test.tsx',
  'src/screens/PatentSearch/PatentSearch.stories.tsx',
  'src/screens/PatentSearch/PatentSearchScreen.tsx',
  'src/screens/PatentSearch/index.ts',
  'src/screens/PatentSearch/patentSearch.test.tsx',
  'src/screens/Pricing/Pricing.stories.tsx',
  'src/screens/Pricing/PricingScreen.tsx',
  'src/screens/Pricing/index.ts',
  'src/screens/Pricing/pricing.test.tsx',
  'src/screens/PublicHome/PublicHome.stories.tsx',
  'src/screens/PublicHome/PublicHomeScreen.tsx',
  'src/screens/PublicHome/index.ts',
  'src/screens/PublicHome/publicHome.test.tsx',
  'src/screens/Reports/Reports.stories.tsx',
  'src/screens/Reports/ReportsScreen.tsx',
  'src/screens/Reports/index.ts',
  'src/screens/SegmentLanding/SegmentLanding.stories.tsx',
  'src/screens/SegmentLanding/SegmentLandingScreen.tsx',
  'src/screens/SegmentLanding/index.ts',
  'src/screens/StageLanding/StageLanding.stories.tsx',
  'src/screens/StageLanding/StageLandingScreen.tsx',
  'src/screens/StageLanding/index.ts',
  'src/screens/TrustPages/TrustPages.stories.tsx',
  'src/screens/TrustPages/TrustPagesScreen.tsx',
  'src/screens/TrustPages/index.ts',
  'src/screens/TrustPages/trustPages.test.tsx',
  'src/screens/public-labels.ts',
  'src/shell/PublicFooter.tsx',
  'src/shell/PublicHeader.tsx',
  'src/shell/PublicShell.tsx'
)
$all = $shared + $newfiles
Log ("expected shared=" + $shared.Count + " new=" + $newfiles.Count + " total=" + $all.Count)
if ($all.Count -ne 71) { Fail ("internal expected list is " + $all.Count + ", not 71") }

# GATE: modified TRACKED files (unstaged) must be EXACTLY the 3 shared (repo-relative)
$expectedMod = ($shared | ForEach-Object { $RepoRootPrefix + $_ } | Sort-Object)
$actualMod = @(git diff --name-only 2>$null) | Sort-Object
Log "== unstaged tracked modifications (expect exactly the 3 shared) =="
Log ($actualMod -join "`n")
if (($actualMod -join '|') -ne ($expectedMod -join '|')) { Fail "modified tracked set != the 3 expected shared files" }

foreach ($f in $newfiles) { if (!(Test-Path $f)) { Fail ("missing new file: " + $f) } }
foreach ($f in $shared)   { if (!(Test-Path $f)) { Fail ("missing shared file: " + $f) } }

Log "== staging 71 explicit paths =="
git add -- $all 2>&1 | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
if ($LASTEXITCODE -ne 0) { Fail ("git add exit " + $LASTEXITCODE) }

$expectedStaged = ($all | ForEach-Object { $RepoRootPrefix + $_ } | Sort-Object)
$staged = @(git diff --cached --name-only 2>$null) | Sort-Object
Log "== staged set =="
Log ($staged -join "`n")
Log ("staged count = " + $staged.Count)
if ($staged.Count -ne 71) { Fail ("staged count " + $staged.Count + " != 71") }
if ($staged | Where-Object { $_ -match 'Claude outputs' }) { Fail "Claude outputs is staged" }
if (($staged -join '|') -ne ($expectedStaged -join '|')) { Fail "staged set != the 71 expected B8 files" }

$resid = @(git diff --name-only 2>$null)
if ($resid.Count -gt 0) { Log ("residual unstaged tracked mods:`n" + ($resid -join "`n")); Fail "unexpected tracked modification outside the 71" }

Log "== commit =="
git commit -m "Phase 8 B8: implement Public surface" 2>&1 | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
if ($LASTEXITCODE -ne 0) { Fail ("git commit exit " + $LASTEXITCODE) }

$newhead = (git rev-parse HEAD 2>$null) -join "`n"
$parent  = (git rev-parse HEAD^ 2>$null) -join "`n"
Log ("new HEAD = " + $newhead)
Log ("parent   = " + $parent)
if (-not ($parent -like 'f3b1c27*')) { Fail ("parent " + $parent + " != f3b1c27") }

Log "== push origin main =="
git push origin main 2>&1 | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
if ($LASTEXITCODE -ne 0) { Fail ("git push exit " + $LASTEXITCODE) }

$om = (git rev-parse origin/main 2>$null) -join "`n"
Log ("origin/main = " + $om)
if ($om -ne $newhead) { Fail ("origin/main " + $om + " != HEAD " + $newhead) }

Log "== final status =="
@(git status 2>$null) | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
Log "== files in the commit =="
@(git show --stat --oneline HEAD 2>$null) | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }
Log "== final log =="
@(git log -3 --oneline 2>$null) | ForEach-Object { Add-Content -Path $log -Value ([string]$_) }

Log ("RESULT=SUCCESS commit=" + $newhead + " parent=" + $parent)
exit 0
