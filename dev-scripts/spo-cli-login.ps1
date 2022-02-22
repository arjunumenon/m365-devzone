# # Generate Certificate Approach
$CertCommonName = "AUM Azure DevOps Deployment"
$CertStartDate = "2022-02-02"
$CertEndDate = "2022-10-02"
.\Create-SelfSignedCertificate.ps1 -CommonName $CertCommonName -StartDate $CertStartDate  -EndDate $CertEndDate