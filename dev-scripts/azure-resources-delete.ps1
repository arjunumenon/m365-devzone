$ResourceGroupName = "TCS-teams-DEV"

az configure --defaults group="$ResourceGroupName"

# az group list

$ResourceList = (az resource list) | ConvertFrom-Json

ForEach($Resource in $ResourceList) {
    Write-Host "Resource ID is $($Resource.Id)"
    az resource delete --ids $Resource.Id
}