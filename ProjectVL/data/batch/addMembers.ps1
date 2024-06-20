# Get the current script directory
$scriptDir = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition

# Path to the JSON file (relative to the script location)
$jsonFilePath = Join-Path -Path $scriptDir -ChildPath "..\json\members.json"

# Load the JSON file
$members = Get-Content -Path $jsonFilePath | ConvertFrom-Json

# Iterate over each member
foreach ($member in $members) {
    if ($member.PSObject.Properties.Match('id').Count -eq 0) {
        # Create the key
        $birthday = $member.birthday -replace '-', ''
        $bandKey = $member.bandKey
        $name = $member.name -replace ' ', '' -replace '[^\x00-\x7F]', '' -replace '[^a-zA-Z]', ''
        $name = $name.ToLower()

        $key = "$birthday`_$bandKey`_$name"
        $member | Add-Member -NotePropertyName 'id' -NotePropertyValue $key
        Write-Host "Added id for: $($member.name) with value: $key" -ForegroundColor Green
    }
}

# Generate timestamp
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

# Create backup of the current members.json file with a timestamp
$membersJsonDir = Split-Path -Path $jsonFilePath -Parent
$backupMembersJsonName = "members_$timestamp.json"
$backupMembersJsonPath = Join-Path -Path $membersJsonDir -ChildPath $backupMembersJsonName
Rename-Item -Path $jsonFilePath -NewName $backupMembersJsonName

# Convert back to JSON and save the updated file
$updatedJson = $members | ConvertTo-Json -Depth 10
Set-Content -Path $jsonFilePath -Value $updatedJson

Write-Host "Updated members JSON saved to $jsonFilePath" -ForegroundColor Green
Write-Host "Backup of original members JSON saved to $backupMembersJsonPath" -ForegroundColor Green
