$environmentName = "prod"

# Get App Service ID from Environment variable
$environmentConfigFilename = ".fx\states\state.$environmentName.json"
$appServiceInformation = Get-Content $environmentConfigFilename | ConvertFrom-Json | Select-Object -Property "fx-resource-frontend-hosting" -ExpandProperty "fx-resource-frontend-hosting"
$hostName =  $appServiceInformation.domain
$appServiceInfo = az webapp list --query "[?defaultHostName=='$hostName'].{Id: id}" | ConvertFrom-Json
Write-Host $appServiceInfo.Id

# Going to the Tab Folders in the App Service
cd tabs

npm install
$npmscriptCommand = "build:teamsfx:$environmentName"
npm run $npmscriptCommand

# Buidling the zip file to deploy to App Service
$deployFoldername = "build"
Compress-Archive -Path "$deployFoldername\*" -DestinationPath "$deployFoldername.zip" -Force

# Publishing the deploy folders to Azure App Service
az webapp deploy --ids $appServiceInfo.Id --src-path "$deployFoldername.zip" --verbose

# Removing the deploy ready folder
Remove-Item -Recurse -Force "$deployFoldername.zip"

cd ..