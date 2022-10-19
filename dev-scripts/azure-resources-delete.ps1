$ResourceGroupName = "Teams-Dev-RnD"

az configure --defaults group="$ResourceGroupName"

# az group list

$ResourceList = (az resource list) | ConvertFrom-Json

Write-Host "Total Resource Count is : "$ResourceList.Count

ForEach($Resource in $ResourceList) {
    Write-Host "Resource ID is $($Resource.Id)"
    az resource delete --ids $Resource.Id
}