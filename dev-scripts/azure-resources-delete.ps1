<#
.SYNOPSIS
Delete all the resources from a specified resource group
.DESCRIPTION
.EXAMPLE
.\azure-resources-delete.ps1 -resourcegroupName "Resourcegroup-to-delete"
Delete all the resources from a specified resource group
#>
Param(
    [Parameter(Mandatory = $true)]
    [string]$resourcegroupName
)

function executeDeleteAzureResources {
    az configure --defaults group="$resourcegroupName"

    # az group list

    $ResourceList = (az resource list) | ConvertFrom-Json

    Write-Host "Total Resource Count is : "$ResourceList.Count

    ForEach ($Resource in $ResourceList) {
        Write-Host "Deleting Resource with ID :  $($Resource.Id)"
        az resource delete --ids $Resource.Id
    }
}

executeDeleteAzureResources