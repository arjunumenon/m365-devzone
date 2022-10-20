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

    $ResourceList = (az resource list --query "[?resourceGroup=='$resourcegroupName'].{ Name: name, Id: id}") | ConvertFrom-Json

    Write-Host "Total Resource Count is : "$ResourceList.Count

    ForEach ($Resource in $ResourceList) {
        Write-Host "Deleting Resource :  $($Resource.Name)"
        az resource delete --ids $Resource.Id
    }
}

executeDeleteAzureResources