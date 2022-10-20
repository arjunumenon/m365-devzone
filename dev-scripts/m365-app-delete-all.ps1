<#
.SYNOPSIS
Delete all
.DESCRIPTION
.EXAMPLE
.\m365-app-delete-all.ps1
Delete all AAD apps
#>

function executeDeleteAllAADApps {
    $CompleteAADApps = az ad app list --show-mine | ConvertFrom-Json

    Write-Host "Total:" $CompleteAADApps.Count

    Read-Host -Prompt "Press Enter to start deleting (CTRL + C to exit)"

    foreach ($App in $CompleteAADApps) {
        Write-Host "Deleting App with name :" $App.displayName
        m365 aad app remove --appId $App.appId --confirm
    }
}

executeDeleteAllAADApps