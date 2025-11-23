@echo off
REM Digerati Experts Desktop Agent Installer
REM This batch file launches the PowerShell installer

setlocal enabledelayedexpansion

echo.
echo ===============================================
echo Digerati Experts Desktop Agent Installer
echo ===============================================
echo.

REM Check for PowerShell
where /q powershell
if errorlevel 1 (
    echo ERROR: PowerShell is required but not found on this system.
    echo Please install PowerShell and try again.
    pause
    exit /b 1
)

REM Launch PowerShell installer
REM The token will be passed via command line
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1" %*

if errorlevel 1 (
    echo.
    echo Installation failed. Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo Installation completed successfully!
pause
