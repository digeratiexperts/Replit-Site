; Digerati Experts Desktop Agent Installer
; NSIS Installer Script
; Compiles to DigeratiExpertsAgent-Setup.exe

!include "MUI2.nsh"
!include "nsDialogs.nsh"
!include "LogicLib.nsh"
!include "x64.nsh"

; Name and file
Name "Digerati Experts Agent"
OutFile "DigeratiExpertsAgent-Setup.exe"
DefaultFolder "$ProgramFiles\DigeratiExpertsAgent"

; Installer icon
; Icon "logo.ico"

; Settings
SetCompress auto
SetDatablockOptimize on
SetOverwrite try
CRCCheck on
InstallDirRegKey HKLM "Software\Digerati Experts\Agent" "InstallDir"

; MUI Settings
!define MUI_ABORTWARNING
!define MUI_ABORTWARNING_CANCEL_DEFAULT
!define MUI_ICON "${NSISDIR}\Contrib\Graphics\Icons\orange-install.ico"
!define MUI_UNICON "${NSISDIR}\Contrib\Graphics\Icons\orange-uninstall.ico"

; Welcome page
!insertmacro MUI_PAGE_WELCOME

; License page
!insertmacro MUI_PAGE_LICENSE "README.txt"

; Directory page
!insertmacro MUI_PAGE_DIRECTORY

; Installation page
!insertmacro MUI_PAGE_INSTFILES

; Finish page
!define MUI_FINISHPAGE_RUN "$INSTDIR\agent.bat"
!define MUI_FINISHPAGE_RUN_TEXT "Launch Digerati Experts Agent"
!insertmacro MUI_PAGE_FINISH

; Uninstaller pages
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

; Language
!insertmacro MUI_LANGUAGE "English"

; Installer sections
Section "Install"
    SetOutPath "$INSTDIR"
    
    ; Create installation directory structure
    CreateDirectory "$INSTDIR"
    CreateDirectory "$APPDATA\DigeratiExpertsAgent"
    
    ; Copy application files
    File "install.ps1"
    File "install.bat"
    File "README.txt"
    File "uninstall.ps1"
    
    ; Create launcher batch file in installation directory
    FileOpen $0 "$INSTDIR\launch.bat" w
    FileWrite $0 "@echo off`r`n"
    FileWrite $0 "REM Digerati Experts Agent Launcher`r`n"
    FileWrite $0 "cd /d `"$APPDATA\DigeratiExpertsAgent`"`r`n"
    FileWrite $0 "if exist agent-config.json (`r`n"
    FileWrite $0 "    echo Digerati Experts Agent`r`n"
    FileWrite $0 "    echo.`r`n"
    FileWrite $0 "    echo Agent is configured and ready to use.`r`n"
    FileWrite $0 "    echo Connecting to portal...`r`n"
    FileWrite $0 "    timeout /t 2 /nobreak`r`n"
    FileWrite $0 ") else (`r`n"
    FileWrite $0 "    echo Digerati Experts Agent not configured.`r`n"
    FileWrite $0 "    echo Please run: powershell -ExecutionPolicy Bypass -File `"$INSTDIR\install.ps1`"`r`n"
    FileWrite $0 "    pause`r`n"
    FileWrite $0 ")`r`n"
    FileClose $0
    
    ; Create uninstaller batch
    FileOpen $0 "$INSTDIR\uninstall.bat" w
    FileWrite $0 "@echo off`r`n"
    FileWrite $0 "REM Uninstall Digerati Experts Agent`r`n"
    FileWrite $0 "echo Uninstalling Digerati Experts Agent...`r`n"
    FileWrite $0 "timeout /t 2 /nobreak`r`n"
    FileWrite $0 "rmdir /s /q `"$APPDATA\DigeratiExpertsAgent`"`r`n"
    FileWrite $0 "if exist `"%ProgramFiles%\DigeratiExpertsAgent`" rmdir /s /q `"%ProgramFiles%\DigeratiExpertsAgent`"`r`n"
    FileWrite $0 "reg delete HKCU\Software\Microsoft\Windows\CurrentVersion\Run /v DigeratiExpertsAgent /f 2>nul`r`n"
    FileWrite $0 "echo Uninstall complete!`r`n"
    FileWrite $0 "timeout /t 2 /nobreak`r`n"
    FileClose $0
    
    ; Write registry entries for uninstall
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\DigeratiExpertsAgent" "DisplayName" "Digerati Experts Agent"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\DigeratiExpertsAgent" "DisplayVersion" "1.0.0"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\DigeratiExpertsAgent" "Publisher" "Digerati Experts"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\DigeratiExpertsAgent" "DisplayIcon" "$INSTDIR\agent.bat"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\DigeratiExpertsAgent" "UninstallString" "$INSTDIR\uninst.exe"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\DigeratiExpertsAgent" "InstallLocation" "$INSTDIR"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\DigeratiExpertsAgent" "NoModify" "1"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\DigeratiExpertsAgent" "NoRepair" "1"
    
    ; Create StartMenu shortcut
    CreateDirectory "$SMPROGRAMS\Digerati Experts"
    CreateShortcut "$SMPROGRAMS\Digerati Experts\Agent.lnk" "$INSTDIR\agent.bat" "" "$INSTDIR\agent.bat" 0
    CreateShortcut "$SMPROGRAMS\Digerati Experts\Uninstall.lnk" "$INSTDIR\uninst.exe"
    
    ; Create Desktop shortcut
    CreateShortcut "$DESKTOP\Digerati Experts Agent.lnk" "$INSTDIR\agent.bat" "" "$INSTDIR\agent.bat" 0
    
    ; Run setup PowerShell script
    ExecWait "powershell -NoProfile -ExecutionPolicy Bypass -File `"$INSTDIR\install.ps1`""
    
    ; Write install info
    WriteRegStr HKLM "Software\Digerati Experts\Agent" "InstallDir" "$INSTDIR"
    WriteRegStr HKLM "Software\Digerati Experts\Agent" "Version" "1.0.0"
    
    MessageBox MB_OK "Digerati Experts Agent v1.0.0 has been successfully installed!$\n$\nLauncher available at:$\n$DESKTOP\Digerati Experts Agent.lnk"
SectionEnd

; Uninstaller section
Section "Uninstall"
    ; Remove registry entries
    DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\DigeratiExpertsAgent"
    DeleteRegKey HKLM "Software\Digerati Experts\Agent"
    
    ; Remove files
    Delete "$INSTDIR\*.ps1"
    Delete "$INSTDIR\*.bat"
    Delete "$INSTDIR\README.txt"
    RMDir "$INSTDIR"
    
    ; Remove shortcuts
    Delete "$SMPROGRAMS\Digerati Experts\Agent.lnk"
    Delete "$SMPROGRAMS\Digerati Experts\Uninstall.lnk"
    RMDir "$SMPROGRAMS\Digerati Experts"
    Delete "$DESKTOP\Digerati Experts Agent.lnk"
    
    ; Remove application data
    RMDir /r "$APPDATA\DigeratiExpertsAgent"
    
    MessageBox MB_OK "Digerati Experts Agent has been uninstalled."
SectionEnd

; Function to handle init
Function .onInit
    ${If} ${RunningX64}
        ; Running on 64-bit system
        StrCpy $INSTDIR "$ProgramFiles\DigeratiExpertsAgent"
    ${Else}
        ; Running on 32-bit system
        StrCpy $INSTDIR "$ProgramFiles\DigeratiExpertsAgent"
    ${EndIf}
FunctionEnd

; On install success
Function .onInstSuccess
    MessageBox MB_YESNO "Installation complete. Would you like to open the README?" IDNO +2
        ExecShell "open" "$INSTDIR\README.txt"
FunctionEnd
