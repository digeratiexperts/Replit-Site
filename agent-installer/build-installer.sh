#!/bin/bash
# Build script for Digerati Experts Agent Windows Installer
# Requires NSIS to be installed

# Check if NSIS is installed
if ! command -v makensis &> /dev/null; then
    echo "NSIS is not installed. Please install NSIS to build the installer."
    echo "Download from: https://nsis.sourceforge.io/"
    exit 1
fi

# Build the installer
echo "Building Digerati Experts Agent Windows Installer..."
makensis DigeratiExpertsAgent.nsi

if [ $? -eq 0 ]; then
    echo "✓ Installer built successfully!"
    echo "Output: DigeratiExpertsAgent-Setup.exe"
else
    echo "✗ Build failed!"
    exit 1
fi
