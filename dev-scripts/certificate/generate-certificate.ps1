# # Generate Certificate Approach
<#
.SYNOPSIS
Add Certificate to the Azure AAD Application.
.DESCRIPTION
.EXAMPLE
.\generate-certificate.ps1 -CertCommonName "AUM Azure DevOps Deployment" -CertStartDate "2022-02-02" -CertEndDate "2024-02-02"
This will add the Certificate file (.PFX) to the Azure AAD Application.
#>
Param(

   [Parameter(Mandatory=$true)]
   [string]$CertCommonName,

   [Parameter(Mandatory=$true)]
   [DateTime]$CertStartDate,

   [Parameter(Mandatory=$true)]
   [DateTime]$CertEndDate
)

function GenerateCertificate(){
    .\Create-SelfSignedCertificate.ps1 -CommonName $CertCommonName -StartDate $CertStartDate  -EndDate $CertEndDate
}

GenerateCertificate