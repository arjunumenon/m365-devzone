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
        # m365 aad app add --manifest $AppManifestJSONFile  --redirectUris "https://login.microsoftonline.com/common/oauth2/nativeclient" --platform publicClient --output json --debug
    }
    else
    {
        $AddedApp = (m365 aad app add --manifest $AppManifestJSONFile  --redirectUris "https://login.microsoftonline.com/common/oauth2/nativeclient" --platform publicClient --apisDelegated $APIPermissionList --output json) | ConvertFrom-Json
    }
    
    return $AddedApp
}

function executeAADAppCreation {
    $APIPermissionList = "https://graph.microsoft.com/Group.ReadWrite.All,https://graph.microsoft.com/Directory.Read.All"
    $AppManifestJSON = "@m365-app-add-aadapp.json"
    $AppOnlyPermission = $true
    $AddedApp = createCustomAADApp -APIPermissionList $APIPermissionList -AppManifestJSONFile $AppManifestJSON -IsAppOnlyPermission $AppOnlyPermission

    # m365 aad app add --manifest $AppManifestJSON  --platform publicClient --apisApplication $APIPermissionList --debug

    Write-Host "AAD App Created with details. App ID : $($AddedApp.appId). Object ID : $($AddedApp.objectId). Tenant ID : $($AddedApp.tenantId)"

    # # Manually Opening the URL with the browser
    # Write-Host "Open this URL for consenting the permission - https://login.microsoftonline.com/$($AddedApp.tenantId)/v2.0/adminconsent?client_id=$($AddedApp.appId)&scope=.default"

    # Consenting the Application using Azure CLI
    az ad app permission admin-consent --id $($AddedApp.objectId)

    .\certificate\aad-app-certificate-add.ps1 -CertificatePath $CertificatePath -AppId $($AddedApp.objectId)
}

function initiateLoginviaCertificate{
    # Login in using the Certificate
    m365 logout
    # $env:CLIMICROSOFT365_AADAPPID = $($AddedApp.appId)    
    # $env:CLIMICROSOFT365_TENANT = $($AddedApp.tenantId)

    $env:CLIMICROSOFT365_AADAPPID = "75f0b899-4313-4193-aa58-9cf758c05ebb"
    $env:CLIMICROSOFT365_TENANT = "095efa67-57fa-40c7-b7cc-e96dc3e5780c"


    m365 login --authType certificate --certificateFile $CertificatePath --password ''

    m365 status
}

function resetLogintoOriginalState{
    # Resetting the login
    m365 logout
    $env:CLIMICROSOFT365_AADAPPID = $null
    $env:CLIMICROSOFT365_TENANT = $null
    m365 login
}

# Adding the Client Certificate File to Azure AD App
$CertificatePath = ".\certificate\AUM Azure DevOps Deployment.pfx"

# executeAADAppCreation

initiateLoginviaCertificate

# resetLogintoOriginalState


