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
        $AddedApp = (m365 aad app add --manifest $AppManifestJSONFile  --redirectUris "https://login.microsoftonline.com/common/oauth2/nativeclient" --platform publicClient --apisApplication $APIPermissionList --output json) | ConvertFrom-Json
    }
    else
    {
        $AddedApp = (m365 aad app add --manifest $AppManifestJSONFile  --redirectUris "https://login.microsoftonline.com/common/oauth2/nativeclient" --platform publicClient --apisDelegated $APIPermissionList --output json) | ConvertFrom-Json
    }
    
    return $AddedApp
}

$APIPermissionList = "https://graph.microsoft.com/User.Read"
$AppManifestJSON = "@m365-app-add-aadapp.json"
$AddedApp = createCustomAADApp -APIPermissionList $APIPermissionList -AppManifestJSONFile $AppManifestJSON

Write-Host "AAD App Created with details. App ID : $($AddedApp.appId). Object ID : $($AddedApp.objectId)"
