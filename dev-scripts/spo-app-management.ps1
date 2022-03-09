
function removeCustomAppAll{
    param (
        [Parameter(Mandatory = $true)]
        [string]$URL
    )

    $CustomApp = m365 spo app list --scope sitecollection --appCatalogUrl $URL --output json | ConvertFrom-Json

    Foreach ($IndiApp in $CustomApp)
    {
        $AppId = $IndiApp.ID
        Write-Host "####  Start Removing App :  $AppId    #####"
        removeCustomApp -URL $URL -AppId $AppId
    }
}

function removeCustomApp{
    param (
        [Parameter(Mandatory = $true)]
        [string]$URL,
        [Parameter(Mandatory = $true)]
        [string]$AppId
    )

    #Uninstalling the App
    uninstallCustomApp -URL $SiteCollectionUrl -AppId $AppId

    #Retract the App
    retractCustomApp -URL $SiteCollectionUrl -AppId $AppId

    #Removing App
    Write-Host "Removing from App Catalog. App ID : $AppId"
    m365 spo app remove  --scope sitecollection  --id $AppId --appCatalogUrl $SiteCollectionUrl --confirm
}

function retractCustomApp{
    param (
        [Parameter(Mandatory = $true)]
        [string]$URL,
        [Parameter(Mandatory = $true)]
        [string]$AppId
    )

    Write-Host "Retracting from Site. App ID : $AppId"
    m365 spo app retract --id $AppId --scope sitecollection --appCatalogUrl $URL --confirm
}

function uninstallCustomApp{
    param (
        [Parameter(Mandatory = $true)]
        [string]$URL,
        [Parameter(Mandatory = $true)]
        [string]$AppId
    )

    Write-Host "Uninstalling from Site. App ID : $AppId"
    m365 spo app uninstall --scope sitecollection --id $AppId --siteUrl $URL --confirm
}

function addAllCustomApps{
    param (
        [Parameter(Mandatory = $true)]
        [string]$PackagelistFolder,
        [Parameter(Mandatory = $true)]
        [string]$URL,
        [Parameter(Mandatory=$false)]
        [boolean]$IsAdd = $true,
        [Parameter(Mandatory=$false)]
        [boolean]$IsDeploy = $true,
        [Parameter(Mandatory=$false)]
        [boolean]$IsInstall = $true
    )

    $PackageLists = Get-ChildItem -Path $PackagelistFolder -file
    
    Foreach($PackageName in $PackageLists)
    {
        Write-Host "#####     Adding Package : $PackageName  ########"
        addCustomApp -PackageFolder $PackagelistFolder -packageName $PackageName -URL $URL
    }
}

function addCustomApp{
    param (
        [Parameter(Mandatory = $true)]
        [string]$PackageFolder,
        [Parameter(Mandatory = $true)]
        [string]$packageName,
        [Parameter(Mandatory = $true)]
        [string]$URL,
        [Parameter(Mandatory=$false)]
        [boolean]$IsAdd = $true,
        [Parameter(Mandatory=$false)]
        [boolean]$IsDeploy = $true,
        [Parameter(Mandatory=$false)]
        [boolean]$IsInstall = $true
    )

    $CompletePath = "$PackageFolder\$packageName"

    if($IsAdd)
    {
        Write-Host "Adding App Catalog : $packageName"
        $AppId = m365 spo app add --filePath $CompletePath --scope sitecollection --appCatalogUrl $URL
    }

    if($IsDeploy)
    {
        #Deploy the app
        deployCustomApp -URL $URL -AppId $AppId
    }

    if($IsInstall)
    {
        #Install Custom App
        installCustomApp -URL $URL -AppId $AppId
    }
}

function deployCustomApp{
    param (
        [Parameter(Mandatory = $true)]
        [string]$AppId,
        [Parameter(Mandatory = $true)]
        [string]$URL
    )

    Write-Host "Deploying App with ID : $AppId"
    m365 spo app deploy --id $AppId --scope sitecollection --appCatalogUrl $URL
}

function installCustomApp{
    param (
        [Parameter(Mandatory = $true)]
        [string]$AppId,
        [Parameter(Mandatory = $true)]
        [string]$URL
    )

    Write-Host "Installing App with ID : $AppId"
    m365 spo app install --id $AppId --siteUrl $URL --scope sitecollection
}

function listCustomAppDisplay{
    param (
        [Parameter(Mandatory = $true)]
        [string]$URL
    )

    m365 spo app list --scope sitecollection --appCatalogUrl $URL
}

function downloadCustomAppPackages{
    param (
        [Parameter(Mandatory = $true)]
        [string]$DownloadFolder,
        [Parameter(Mandatory = $true)]
        [string]$URL
    )

    # #Tenant App Catalog
    # $CustomApp = m365 spo app list --output json | ConvertFrom-Json
    
    #Site Collection App Catalog
    $CustomApp = m365 spo app list --scope sitecollection --appCatalogUrl $URL --output json | ConvertFrom-Json

    Foreach ($IndiApp in $CustomApp)
    {
        $AppId = $IndiApp.ID        
        $PackageName = $(m365 spo file get --webUrl $URL --id $AppId --output json  | ConvertFrom-Json)[0].Name

        Write-Host "####  Start Downloading App :  $PackageName    #####"
        #Download File
        $CompleteDownloadFile = "$DownloadFolder\$PackageName"
        m365 spo file get --webUrl $URL --id $AppId --asFile --path $CompleteDownloadFile
    }
    
    $AppId = "61d57277-658f-4ced-828f-33428ec400c6"
    $PackageName = $(m365 spo file get --webUrl $URL --id $AppId --output json  | ConvertFrom-Json)[0].Name

    #Download File
    $CompleteDownloadFile = "$DownloadFolder\$PackageName"
    m365 spo file get --webUrl $URL --id $AppId --asFile --path $CompleteDownloadFile
}

#TCSTEG - Production
$SiteCollectionUrl = "https://aum365.sharepoint.com/sites/M365CLI/"

$AppId = "9b7b3cab-513e-4ef3-aa3d-309c7c87af92"
$packageName = "tutorial-dashboard" + ".sppkg"
# $packageName = "rn-d-sp-fx-extension-deployment + ".sppkg"
# $packageFolder = "./Solution"
# # Direct Package Folder - For Testing and UAT
# $packageFolder = "\\wsl$\Ubuntu-18.04\home\arjun\labs-codes\m365-devzone\dev-sp\spfx-extn-rnd\sharepoint\solution\"
$packageFolder = "C:\Arjun\Codes\m365-devzone\dev-viva\tutorial-dashboard\sharepoint\solution\"
$DownloadFolder = "./Solution-Downloads"


#List App
listCustomAppDisplay -URL $SiteCollectionUrl

# #Add All Packages from the Folder
# addAllCustomApps -PackagelistFolder $packageFolder -URL $SiteCollectionUrl

# #Adding App
# addCustomApp -PackageFolder $packageFolder -packageName $packageName -URL $SiteCollectionUrl

# #Deploy App - Single
# installCustomApp -AppId $AppId -URL $SiteCollectionUrl

# #Install App - Single
# installCustomApp -AppId $AppId -URL $SiteCollectionUrl

# #Download App Packages
# downloadCustomAppPackages -DownloadFolder $DownloadFolder -URL $SiteCollectionUrl

# #Remove All Custom App
# removeCustomAppAll -URL $SiteCollectionUrl

# Remove Custom App
removeCustomApp -URL $SiteCollectionUrl -AppId $AppId
