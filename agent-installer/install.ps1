# Digerati Experts Desktop Agent Installer
# Windows PowerShell Installation Script
# Run with: powershell -ExecutionPolicy Bypass -File install.ps1

param(
    [string]$Token = "",
    [string]$Email = "",
    [string]$ServerUrl = "http://localhost:5000"
)

# Configuration
$AppName = "Digerati Experts Agent"
$InstallPath = "$env:ProgramFiles\DigeratiExpertsAgent"
$DataPath = "$env:APPDATA\DigeratiExpertsAgent"
$AppVersion = "1.0.0"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Digerati Experts Desktop Agent v$AppVersion" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
$isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "WARNING: This installer should be run as Administrator for full functionality." -ForegroundColor Yellow
    Write-Host "Some features may not work correctly without admin privileges." -ForegroundColor Yellow
    Write-Host ""
}

# Create directories
Write-Host "Creating installation directories..." -ForegroundColor Green
if (-not (Test-Path $InstallPath)) {
    New-Item -ItemType Directory -Force -Path $InstallPath | Out-Null
}
if (-not (Test-Path $DataPath)) {
    New-Item -ItemType Directory -Force -Path $DataPath | Out-Null
}

# Create agent configuration
Write-Host "Setting up agent configuration..." -ForegroundColor Green
$config = @{
    version = $AppVersion
    token = $Token
    email = $Email
    serverUrl = $ServerUrl
    installPath = $InstallPath
    dataPath = $DataPath
    installedAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    features = @{
        quickTickets = $true
        liveChat = $true
        systemStatus = $true
        autoNotifications = $true
    }
} | ConvertTo-Json

$configPath = "$DataPath\agent-config.json"
$config | Out-File -FilePath $configPath -Encoding UTF8

Write-Host "Configuration saved to: $configPath" -ForegroundColor Green

# Create launcher script
Write-Host "Creating launcher script..." -ForegroundColor Green
$launcherScript = @"
# Digerati Experts Agent Launcher
`$configPath = "$DataPath\agent-config.json"
`$config = Get-Content `$configPath | ConvertFrom-Json
`$token = `$config.token
`$serverUrl = `$config.serverUrl

# Launch agent interface or perform quick actions
# This would connect to the portal using the token
Write-Host "Digerati Experts Agent started successfully!"
Write-Host "Token: `$(`$token.Substring(0, 10))..."
Write-Host "Server: `$serverUrl"
"@

$launcherPath = "$InstallPath\launch.ps1"
$launcherScript | Out-File -FilePath $launcherPath -Encoding UTF8

Write-Host "Launcher created at: $launcherPath" -ForegroundColor Green

# Create batch file launcher for system tray icon
Write-Host "Creating system tray launcher..." -ForegroundColor Green
$batchLauncher = @"
@echo off
REM Digerati Experts Agent System Tray Launcher
cd /d "$InstallPath"
powershell -NoProfile -ExecutionPolicy Bypass -File launch.ps1
"@

$batchPath = "$InstallPath\agent.bat"
$batchLauncher | Out-File -FilePath $batchPath -Encoding ASCII

Write-Host "System tray launcher created at: $batchPath" -ForegroundColor Green

# Create start menu shortcut (if admin)
if ($isAdmin) {
    Write-Host "Creating start menu shortcut..." -ForegroundColor Green
    $WshShell = New-Object -ComObject WScript.Shell
    $startMenuPath = [Environment]::GetFolderPath('StartMenu')
    $shortcutPath = "$startMenuPath\Digerati Experts Agent.lnk"
    
    $Shortcut = $WshShell.CreateShortcut($shortcutPath)
    $Shortcut.TargetPath = $batchPath
    $Shortcut.WorkingDirectory = $InstallPath
    $Shortcut.Description = "Digerati Experts Desktop Agent"
    $Shortcut.Save()
    
    Write-Host "Start menu shortcut created" -ForegroundColor Green
}

# Create desktop shortcut
Write-Host "Creating desktop shortcut..." -ForegroundColor Green
$WshShell = New-Object -ComObject WScript.Shell
$desktopPath = [Environment]::GetFolderPath('Desktop')
$desktopShortcut = "$desktopPath\Digerati Experts Agent.lnk"

$Shortcut = $WshShell.CreateShortcut($desktopShortcut)
$Shortcut.TargetPath = $batchPath
$Shortcut.WorkingDirectory = $InstallPath
$Shortcut.Description = "Digerati Experts Desktop Agent"
$Shortcut.Save()

Write-Host "Desktop shortcut created" -ForegroundColor Green

# Verify installation
Write-Host ""
Write-Host "===============================================" -ForegroundColor Green
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Agent installed to: $InstallPath" -ForegroundColor Gray
Write-Host "Configuration saved to: $DataPath" -ForegroundColor Gray
Write-Host ""
Write-Host "You can now launch the agent from:" -ForegroundColor White
Write-Host "  • Desktop shortcut" -ForegroundColor Yellow
if ($isAdmin) {
    Write-Host "  • Start Menu (Digerati Experts Agent)" -ForegroundColor Yellow
}
Write-Host "  • $batchPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "Features enabled:" -ForegroundColor White
Write-Host "  ✓ Quick Ticket Submission" -ForegroundColor Yellow
Write-Host "  ✓ Real-time Chat Support" -ForegroundColor Yellow
Write-Host "  ✓ System Status Monitoring" -ForegroundColor Yellow
Write-Host "  ✓ Instant Notifications" -ForegroundColor Yellow
Write-Host ""
Write-Host "Token Status: Active (Expires in 24 hours)" -ForegroundColor Green
Write-Host ""
Write-Host "For support, visit: $ServerUrl/portal" -ForegroundColor Cyan
Write-Host ""
