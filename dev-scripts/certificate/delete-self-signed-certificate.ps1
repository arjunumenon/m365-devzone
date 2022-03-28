<#
.SYNOPSIS
Deletes already created Certificate Authority.
.DESCRIPTION
.EXAMPLE
.\delete-self-signed-certificate.ps1 -CommonName "AUM CI-CD Deployment App Certificate"
This will delete the certificate from CErttificate Store which has the Name above
#>
Param(

   [Parameter(Mandatory=$true)]
   [string]$CommonName
)


function deleteSelfSignedCertificate{
    $CertificateList = Get-ChildItem -Path "Cert:\CurrentUser\My" | Where-Object {$_.Subject -Match "$CommonName"} | Select-Object Thumbprint, FriendlyName

    Foreach($Certificate in $CertificateList)
    {
        Write-Host "Deleting Certificate with Friendly Name :  '$($Certificate.FriendlyName)' and Thumbprint : '$($Certificate.Thumbprint)'"
        Remove-Item -Path "Cert:\CurrentUser\My\$($Certificate.Thumbprint)" -DeleteKey
    }
}

deleteSelfSignedCertificate