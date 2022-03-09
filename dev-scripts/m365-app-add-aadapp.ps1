# Method which creates  Custom AAD App
function  createCustomAADApp{
    param (
        [Parameter(Mandatory = $false)]
        [string]$AppName,
        [Parameter(Mandatory = $false)]
        [string]$APIPermissionList,
        [Parameter(Mandatory = $false)]
        [string]$AppManifestJSONFile = ""
    )

    # Checking Login status and initiate login if not logged
    $LoginStatus = m365 status
    if($LoginStatus -eq "Logged out")
    {
        Write-Host "Not logged in. Initiating Login process"
        m365 login
    }

    # Checking if manifest file exists
    if($AppManifestJSONFile -eq "")
    {
        Write-Host "Creating WITHOUT Manifest File"
        $AddedApp = (m365 aad app add --name $AppName --apisApplication $APIPermissionList  --redirectUris "https://login.microsoftonline.com/common/oauth2/nativeclient" --platform publicClient --output json) | ConvertFrom-Json
    }
    else
    {
        Write-Host "Creating using Manifest file"
        $AddedApp = (m365 aad app add --manifest $AppManifestJSONFile  --redirectUris "https://login.microsoftonline.com/common/oauth2/nativeclient" --platform publicClient --output json) | ConvertFrom-Json
    }
    
    return $AddedApp
}

function executeAADAppCreation {
    param (
        [Parameter(Mandatory = $false)]
        [boolean]$InitiateLogin = $false
    )
    $AppName = "Azure Dev Ops Login App - NO"
    $APIPermissionList = "https://microsoft.sharepoint-df.com/Sites.FullControl.All, https://graph.microsoft.com/Sites.Read.All"
    $AppManifestJSON = "@m365-app-add-aadapp.json"
    $AppOnlyPermission = $true

    # # Using Without Manifest File
    # $AddedApp = createCustomAADApp -AppName $AppName -APIPermissionList $APIPermissionList

    # Using Manifest File
    $AddedApp = createCustomAADApp -APIPermissionList $APIPermissionList -AppManifestJSONFile $AppManifestJSON

    Write-Host "AAD App Created with details. App ID : $($AddedApp.appId). Object ID : $($AddedApp.objectId). Tenant ID : $($AddedApp.tenantId)"

    # # Manually Opening the URL with the browser
    # Write-Host "Open this URL for consenting the permission - https://login.microsoftonline.com/$($AddedApp.tenantId)/v2.0/adminconsent?client_id=$($AddedApp.appId)&scope=.default"

    # Consenting the Application using Azure CLI
    az ad app permission admin-consent --id $($AddedApp.objectId)

    .\certificate\aad-app-certificate-add.ps1 -CertificatePath $CertificatePath -AppId $($AddedApp.objectId)

    # Check whether login has to be initiated
    if($InitiateLogin)
    {
        initiateLoginviaCertificate -AppId $($AddedApp.appId) -TenantId $($AddedApp.tenantId)
    }
}

function initiateLoginviaCertificate{
    param (
        [Parameter(Mandatory = $true)]
        [string]$AppId,
        [Parameter(Mandatory = $true)]
        [string]$TenantId
    )
    # Login in using the Certificate
    m365 logout

    m365 login --authType certificate --certificateFile $CertificatePath --password '' --appId $AppId --tenant $TenantId

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

# executeAADAppCreation -InitiateLogin $false

initiateLoginviaCertificate -AppId "ceefb710-f9cf-4618-af60-1a163f5ea74c" -TenantId "095efa67-57fa-40c7-b7cc-e96dc3e5780c"

# resetLogintoOriginalState


