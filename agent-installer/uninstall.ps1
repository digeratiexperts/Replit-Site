# Digerati Experts Desktop Agent Uninstaller
# PowerShell Uninstall Script

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Digerati Experts Agent Uninstaller" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
$isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "WARNING: Some features may not work without admin privileges." -ForegroundColor Yellow
    Write-Host ""
}

# Define paths
$InstallPath = "$env:ProgramFiles\DigeratiExpertsAgent"
$DataPath = "$env:APPDATA\DigeratiExpertsAgent"

Write-Host "Uninstalling Digerati Experts Agent..." -ForegroundColor Green
Write-Host ""

# Remove application data
if (Test-Path $DataPath) {
    Write-Host "Removing configuration files..." -ForegroundColor Green
    Remove-Item -Path $DataPath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Configuration removed from: $DataPath" -ForegroundColor Green
}

# Remove installation files
if (Test-Path $InstallPath) {
    Write-Host "Removing application files..." -ForegroundColor Green
    Remove-Item -Path $InstallPath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Application files removed from: $InstallPath" -ForegroundColor Green
}

# Remove Start Menu shortcuts
$StartMenuPath = [Environment]::GetFolderPath('StartMenu')
$AgentShortcut = "$StartMenuPath\Digerati Experts Agent.lnk"
if (Test-Path $AgentShortcut) {
    Remove-Item -Path $AgentShortcut -Force -ErrorAction SilentlyContinue
    Write-Host "Start Menu shortcut removed" -ForegroundColor Green
}

# Remove Desktop shortcut
$DesktopPath = [Environment]::GetFolderPath('Desktop')
$DesktopShortcut = "$DesktopPath\Digerati Experts Agent.lnk"
if (Test-Path $DesktopShortcut) {
    Remove-Item -Path $DesktopShortcut -Force -ErrorAction SilentlyContinue
    Write-Host "Desktop shortcut removed" -ForegroundColor Green
}

# Remove registry entries
if ($isAdmin) {
    Write-Host "Removing registry entries..." -ForegroundColor Green
    $RegPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
    Remove-ItemProperty -Path $RegPath -Name "DigeratiExpertsAgent" -ErrorAction SilentlyContinue
    Write-Host "Registry entries removed" -ForegroundColor Green
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Green
Write-Host "Uninstall Complete!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""
Write-Host "Digerati Experts Agent has been successfully uninstalled."
Write-Host ""
Write-Host "For feedback or issues, visit: https://digeratiexperts.com"
Write-Host ""

# Pause before exit
Read-Host "Press Enter to close"
