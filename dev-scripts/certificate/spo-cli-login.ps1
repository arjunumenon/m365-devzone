# Login using Certificate

$AADAppId = "f5a3f4dd-fdf0-435b-b524-175e214bf816"
$AADTenantId = "095efa67-57fa-40c7-b7cc-e96dc3e5780c"
$certificateFile = ".\Certificates\Certificate.pfx"
$AppClientSecret = "wgp7Q~PWLtTNrAwjZawO-sYMSQjylRI6kW5dY"

# # Using Certificate File
# m365 login --authType certificate --certificateFile $certificateFile --password $password --appId $appId --tenant $TenantId

# Using AAD Client Secret
m365 login --authType secret --appId $AADAppId --tenant $AADTenantId --secret $AppClientSecret