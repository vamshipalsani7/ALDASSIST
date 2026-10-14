@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "R:\ALDASSIST\Claude outputs\b1a_git_run.ps1"
echo %ERRORLEVEL% > "R:\ALDASSIST\Claude outputs\b1a_run.done"
