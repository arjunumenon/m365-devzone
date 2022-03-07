# Login using Certificate

$env:CLIMICROSOFT365_AADAPPID = "908bf715-2b6a-4ec4-b624-0def0cbb0da6"
$env:CLIMICROSOFT365_TENANT = "095efa67-57fa-40c7-b7cc-e96dc3e5780c"


m365 login --authType certificate --certificateFile ".\AUM Azure DevOps Deployment.pfx" --password ''