# Delete all Azure AD App

$CompleteAADApps = az ad app list --show-mine | ConvertFrom-Json

Write-Host "Total:" $CompleteAADApps.Count

Read-Host -Prompt "Press Enter to start deleting (CTRL + C to exit)"

foreach ($App in $CompleteAADApps)
{
    Write-Host "Deleting App with name :" $App.displayName
    m365 aad app remove --objectId $App.objectId --confirm
}