$pfxPath = "$PSScriptRoot\AUM Azure DevOps Deployment.pfx"
$pfxPass = ""
$stsCertificate = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2 $pfxPath, $pfxPass, 20
$binCert = $stsCertificate.GetRawCertData()
$credValue = [System.Convert]::ToBase64String($binCert)

Write-Host $credValue