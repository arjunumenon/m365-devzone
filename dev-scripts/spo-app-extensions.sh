#!/bin/bash

# requires jq: https://stedolan.github.io/jq/

defaultIFS=$IFS
IFS=$'\n'

SiteCollectionUrl="https://m365x997410.sharepoint.com"
CustomActionID="e7270dd9-26b3-4d53-b158-1e4fb17cb7bb"
CustomActionProps='{"testMessage":"This is Awesome"}'




# # Get the list of Extensions
# m365 spo customaction list --url $SiteCollectionUrl --output json


# m365 spo customaction get --url $SiteCollectionUrl --id $CustomActionID


# m365 spo customaction set --url $SiteCollectionUrl --id $CustomActionID --clientSideComponentProperties $CustomActionProps

