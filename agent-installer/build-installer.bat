@echo off
REM Build script for Digerati Experts Agent Windows Installer
REM Requires NSIS to be installed

echo Building Digerati Experts Agent Windows Installer...

REM Try to find NSIS installation
set NSIS_PATH=C:\Program Files\NSIS
set NSIS_EXE=%NSIS_PATH%\makensis.exe

if exist "%NSIS_EXE%" (
    echo Found NSIS at %NSIS_PATH%
    "%NSIS_EXE%" DigeratiExpertsAgent.nsi
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo Installation successful!
        echo Output: DigeratiExpertsAgent-Setup.exe
        pause
    ) else (
        echo.
        echo Build failed!
        pause
        exit /b 1
    )
) else (
    echo NSIS is not installed at the default location.
    echo Please install NSIS from: https://nsis.sourceforge.io/
    echo Then run this script again.
    pause
    exit /b 1
)
