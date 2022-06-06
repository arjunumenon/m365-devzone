@secure()
param provisionParameters object
var resourceBaseName = provisionParameters.resourceBaseName
var storageName = contains(provisionParameters, 'frontendHostingStorageName') ? provisionParameters['frontendHostingStorageName'] : '${resourceBaseName}tab' // Try to read name for frontend hosting Storage Account from parameters
var storageSku = contains(provisionParameters, 'frontendHostingStorageSku') ? provisionParameters['frontendHostingStorageSku'] : 'Standard_LRS' // Try to read SKU for frontend hosting Storage Account from parameters

// Azure Storage that hosts your static web site
resource storage 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  kind: 'StorageV2'
  location: resourceGroup().location
  name: storageName
  properties: {
    supportsHttpsTrafficOnly: true
  }
  sku: {
    name: storageSku // You can follow https://aka.ms/teamsfx-bicep-add-param-tutorial to add frontendHostingStorageSku property to provisionParameters to override the default value "Standard_LRS".
  }
}

// var siteDomain = replace(replace(storage.properties.primaryEndpoints.web, 'https://', ''), '/', '')

// output resourceId string = storage.id
// output endpoint string = 'https://${siteDomain}'
// output domain string = siteDomain
// output indexPath string = '/index.html#'

var serverfarmsName = contains(provisionParameters, 'botServerfarmsName') ? provisionParameters['botServerfarmsName'] : '${resourceBaseName}tab' // Try to read name for App Service Plan from parameters
var webAppSKU = contains(provisionParameters, 'botWebAppSKU') ? provisionParameters['botWebAppSKU'] : 'S1' // Try to read SKU for Azure Web App from parameters
var webAppName = contains(provisionParameters, 'botSitesName') ? provisionParameters['botSitesName'] : '${resourceBaseName}tab' // Try to read name for Azure Web App from parameters

// Compute resources for your Web App
resource serverfarm 'Microsoft.Web/serverfarms@2021-02-01' = {
  kind: 'app'
  location: resourceGroup().location
  name: serverfarmsName
  sku: {
    name: webAppSKU
  }
}
// Web App that hosts tab files
resource webApp 'Microsoft.Web/sites@2021-02-01' = {
  kind: 'app'
  location: resourceGroup().location
  name: webAppName
  properties: {
    serverFarmId: serverfarm.id
    httpsOnly: true
    siteConfig: {
      alwaysOn: true
      appSettings: [
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'true' // Execute build steps on your site during deployment
        }
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '~14' // Set NodeJS version to 14.x for your site
        }
        {
          name: 'RUNNING_ON_AZURE'
          value: '1'
        }
      ]
      ftpsState: 'FtpsOnly'
    }
  }
}

var siteDomain = webApp.properties.defaultHostName

output resourceId string = storage.id
output endpoint string = 'https://${webApp.properties.defaultHostName}'
output domain string = siteDomain
output indexPath string = '/index.html#'
