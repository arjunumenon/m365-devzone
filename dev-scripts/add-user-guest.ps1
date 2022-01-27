
# # Connect to Azure AD
# $DomainAD = "a-um.me"
# Connect-AzureAD -TenantDomain $DomainAD

# Get Guest User
Get-AzureADUser -Filter "UserType eq 'Guest'"


# # Remove Guest User
# $RemoveUserUPN = ""
# Remove-AzureADUser -ObjectId "<UPN>"