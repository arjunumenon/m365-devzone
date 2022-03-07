<#
.SYNOPSIS
Add Certificate to the Azure AAD Application.
.DESCRIPTION
.EXAMPLE
.\aad-app-certificate-add.ps1 -CertificatePath ".\AUM Azure DevOps Deployment.pfx" -AppId "423dd174-251a-459c-bb1e-c8b766172075"
This will add the Certificate file (.PFX) to the Azure AAD Application.

.EXAMPLE
.\aad-app-certificate-add.ps1 -CertificatePath ".\AUM Azure DevOps Deployment.pfx" -AppId "423dd174-251a-459c-bb1e-c8b766172075" -CertificatePassword (ConvertTo-SecureString -String "MyPassword" -AsPlainText -Force)
This will add the Certificate file (.PFX) which has a password to the Azure AAD Application.
#>
Param(

   [Parameter(Mandatory=$true)]
   [string]$CertificatePath,

   [Parameter(Mandatory=$true)]
   [string]$AppId,

   [Parameter(Mandatory=$false)]
   [SecureString]$CertificatePassword
)

function AddCertificateToAzureADApp(){

    # Get the Certificate String from PFX File
    $EncodedCertificateString = [System.Convert]::ToBase64String(
    (Get-PfxCertificate -FilePath $CertificatePath).GetRawCertData())

    # Adding Certificate using Azure CLI
    az ad app credential reset --id $AppId --cert $EncodedCertificateString --append
}

AddCertificateToAzureADApp