# Get the current script directory
$scriptDir = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition

# Path to the JSON file (relative to the script location)
$jsonFilePath = Join-Path -Path $scriptDir -ChildPath "..\json\bands.json"

# Base directory where the folders will be created (relative to the script location)
$baseDir = Join-Path -Path $scriptDir -ChildPath "..\..\assets\images\bands"

# Load the JSON data
$jsonData = Get-Content -Path $jsonFilePath -Raw | ConvertFrom-Json

# Function to create directories with console logging
function Create-Directories {
    param (
        [array]$bandsData,
        [string]$baseDir
    )

    foreach ($band in $bandsData) {
        # Generate folder name from the key
        $folderName = $band.key
        # Create the full path
        $fullPath = Join-Path -Path $baseDir -ChildPath $folderName
        # Create the directory if it doesn't exist
        if (-not (Test-Path -Path $fullPath)) {
            New-Item -Path $fullPath -ItemType Directory
            $logMessage = "Created directory: $fullPath"
            Write-Host $logMessage -ForegroundColor Green
        } else {
            $logMessage = "Directory already exists: $fullPath"
            Write-Host $logMessage -ForegroundColor Yellow
        }
    }
}

# Create the directories and log the results
Create-Directories -bandsData $jsonData -baseDir $baseDir

Write-Host "Directories created in $baseDir" -ForegroundColor Cyan