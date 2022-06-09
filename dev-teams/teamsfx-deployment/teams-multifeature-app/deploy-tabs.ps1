$environmentName = "Prod"

# Get App Service ID from Environment variable
$environmentConfigFilename = ".fx\states\state.$environmentName.json"

$appServiceInformation = Get-Content $environmentConfigFilename | ConvertFrom-Json | Select-Object -Property "fx-resource-frontend-hosting" -ExpandProperty "fx-resource-frontend-hosting"
$hostName =  $appServiceInformation.domain
$appServiceInfo = az webapp list --query "[?defaultHostName=='$hostName'].{Id: id}" | ConvertFrom-Json
Write-Host $appServiceInfo.Id

# # teamsfx deploy function  --env $environmentName --interactive false