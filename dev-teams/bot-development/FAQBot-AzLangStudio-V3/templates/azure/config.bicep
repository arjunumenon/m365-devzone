@secure()
param provisionParameters object
param provisionOutputs object

// Get existing app settings for merge
var currentAppSettings = list('${ provisionOutputs.azureWebAppBotOutput.value.resourceId }/config/appsettings', '2021-02-01').properties

// Merge TeamsFx configurations to Bot resources
module teamsFxAzureWebAppBotConfig './teamsFx/azureWebAppBotConfig.bicep' = {
  name: 'teamsFxAzureWebAppBotConfig'
  params: {
    provisionParameters: provisionParameters
    provisionOutputs: provisionOutputs
    currentAppSettings: currentAppSettings
  }
}

// Get existing app settings for merge
var functionApiCurrentConfigs = reference('${ provisionOutputs.azureFunctionApiOutput.value.functionAppResourceId }/config/web', '2021-02-01')
var functionApiCurrentAppSettings = list('${ provisionOutputs.azureFunctionApiOutput.value.functionAppResourceId }/config/appsettings', '2021-02-01').properties

// Merge TeamsFx configurations to Azure Function App
module teamsFxAzureFunctionApiConfig './teamsFx/azureFunctionApiConfig.bicep' = {
  name: 'teamsFxAzureFunctionApiConfig'
  params: {
    provisionParameters: provisionParameters
    provisionOutputs: provisionOutputs
    currentConfigs: functionApiCurrentConfigs
    currentAppSettings: functionApiCurrentAppSettings
  }
}