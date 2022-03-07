$CertificatePath = ".\AUM Azure DevOps Deployment.pfx"
$AppId = "423dd174-251a-459c-bb1e-c8b766172075"

# Get the Certificate String from PFX File
$EncodedCertificateString = [System.Convert]::ToBase64String(
    (Get-PfxCertificate -FilePath $CertificatePath).GetRawCertData())

# Adding Certificate using Azure CLI
az ad app credential reset --id $AppId --cert $EncodedCertificateString --append