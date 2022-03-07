$CertificateValue = Get-PfxCertificate -FilePath ".\AUM Azure DevOps Deployment.pfx"
$CertificateThumbPrintValue = get-content ".\AUM Azure DevOps Deployment.pfx" -Encoding Byte
$CertificateValue = [System.Convert]::ToBase64String($CertificateThumbPrintValue)

Write-Host $CertificateValue