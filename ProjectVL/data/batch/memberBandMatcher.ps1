# Get the current script directory
$scriptDir = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition

# Define paths to JSON files using relative paths
$bandsJsonPath = Join-Path -Path $scriptDir -ChildPath "..\json\bands.json"
$membersJsonPath = Join-Path -Path $scriptDir -ChildPath "..\json\members.json"
$updatedMembersJsonPath = Join-Path -Path $scriptDir -ChildPath "..\json\updated_members.json"

# Load JSON data
$bandsJson = Get-Content -Path $bandsJsonPath -Raw | ConvertFrom-Json
$membersJson = Get-Content -Path $membersJsonPath -Raw | ConvertFrom-Json

# Create a dictionary for quick lookup of band keys by band name
$bandKeyDict = @{}
foreach ($band in $bandsJson) {
    $bandKeyDict[$band.bandName] = $band.key
}

# Update members with bandKey
foreach ($member in $membersJson) {
    $bandName = $member.bandName
    $expectedBandKey = $bandKeyDict[$bandName]

    if ($member.PSObject.Properties.Match('bandKey').Count -eq 0) {
        # bandKey does not exist, add it
        $member | Add-Member -MemberType NoteProperty -Name bandKey -Value $expectedBandKey
        Write-Host "Added bandKey for: $($member.name) with value: $expectedBandKey" -ForegroundColor Green
    } else {
        # bandKey exists, validate it
        if ($member.bandKey -ne $expectedBandKey) {
            Write-Host "Updating bandKey for: $($member.name) from $($member.bandKey) to $expectedBandKey" -ForegroundColor Yellow
            $member.bandKey = $expectedBandKey
        }
    }
}

# Convert updated members to JSON and save to file
$updatedMembersJson = $membersJson | ConvertTo-Json -Depth 3
Set-Content -Path $updatedMembersJsonPath -Value $updatedMembersJson

# Generate timestamp
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

# Create backup of the current members.json file with a timestamp
$membersJsonDir = Split-Path -Path $membersJsonPath -Parent
$backupMembersJsonName = "members_$timestamp.json"
$backupMembersJsonPath = Join-Path -Path $membersJsonDir -ChildPath $backupMembersJsonName
Rename-Item -Path $membersJsonPath -NewName $backupMembersJsonName

# Rename updated_members.json to members.json
Rename-Item -Path $updatedMembersJsonPath -NewName "members.json"

Write-Host "Updated members JSON saved to $membersJsonPath" -ForegroundColor Green
Write-Host "Backup of original members JSON saved to $backupMembersJsonPath" -ForegroundColor Green