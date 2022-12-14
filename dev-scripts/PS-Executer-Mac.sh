# PSFileName="m365-app-add-aadapp"
PSFileName="m365-aad-app-add"
ParameterList="-AppName 'AUM TEST App Creation App'"

pwsh $(echo "$PSFileName.ps1  $ParameterList")