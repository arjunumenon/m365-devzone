#!/bin/bash

# requires jq: https://stedolan.github.io/jq/

defaultIFS=$IFS
IFS=$'\n'

SiteCollectionUrl="https://m365x997410.sharepoint.com"
CustomActionID="ef4d3746-56c9-41e8-92ba-4d66fd8a5b09"
CustomActionTitle="TestDialogueBox"
CustomActionName="Test Dialogue Box"
CustomActionProps='{"testMessage":"This is Awesome"}'

ClientSideComponentId="b50fe153-6aed-4115-ba1e-441f58539912"




# Get the list of Extensions
m365 spo customaction list --url $SiteCollectionUrl --output json

# # Get a Particular Custom Action Id
# m365 spo customaction get --url $SiteCollectionUrl --id $CustomActionID

# # Add Custom Actions
# m365 spo customaction add --url $SiteCollectionUrl --title $CustomActionTitle --name $CustomActionName --location "ClientSideExtension.ApplicationCustomizer" --clientSideComponentId $ClientSideComponentId --clientSideComponentProperties $CustomActionProps --debug

# # Set the Custom Actions for a particular Custom Action Id
# m365 spo customaction set --url $SiteCollectionUrl --id $CustomActionID --clientSideComponentProperties $CustomActionProps

# # Remove Custom Action
# m365 spo customaction remove --url $SiteCollectionUrl --id $CustomActionID

# # Clear all custom actions from the site
# m365 spo customaction clear --url $SiteCollectionUrl --confirm

