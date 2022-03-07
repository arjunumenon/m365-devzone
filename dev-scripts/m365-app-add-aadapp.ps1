# Method which creates  Custom AAD App
function  createCustomAADApp{
    param (
        [Parameter(Mandatory = $true)]
        [string]$APIPermissionList,
        [Parameter(Mandatory = $true)]
        [string]$AppManifestJSONFile,
         [Parameter(Mandatory = $true)]
        [boolean]$IsAppOnlyPermission
    )

    # Checking Login status and initiate login if not logged
    $LoginStatus = m365 status
    if($LoginStatus -eq "Logged out")
    {
        Write-Host "Not logged in. Initiating Login process"
        m365 login
    }

    # Create custom App with needed permission
    if($IsAppOnlyPermission)
    {
        $AddedApp = (m365 aad app add --manifest $AppManifestJSONFile  --redirectUris "https://login.microsoftonline.com/common/oauth2/nativeclient" --platform publicClient --output json) | ConvertFrom-Json
        Write-Host $AddedApp
    }
    else
    {
        $AddedApp = (m365 aad app add --manifest $AppManifestJSONFile  --redirectUris "https://login.microsoftonline.com/common/oauth2/nativeclient" --platform publicClient --apisDelegated $APIPermissionList --output json) | ConvertFrom-Json
    }
    
    return $AddedApp
}

$APIPermissionList = "https://graph.microsoft.com/Group.ReadWrite.All,https://graph.microsoft.com/Directory.Read.All"
$AppManifestJSON = "@m365-app-add-aadapp.json"
$AppOnlyPermission = $true
$AddedApp = createCustomAADApp -APIPermissionList $APIPermissionList -AppManifestJSONFile $AppManifestJSON -IsAppOnlyPermission $AppOnlyPermission

# m365 aad app add --manifest $AppManifestJSON  --platform publicClient --apisApplication $APIPermissionList --debug

Write-Host "AAD App Created with details. App ID : $($AddedApp.appId). Object ID : $($AddedApp.objectId). Tenant ID : $($AddedApp.tenantId)"

Write-Host "Open this URL for consenting the permission - https://login.microsoftonline.com/$($AddedApp.tenantId)/v2.0/adminconsent?client_id=$($AddedApp.appId)&scope=.default"
