
# Connect to Azure AD
$DomainAD = "a-um.me"
Connect-AzureAD -TenantDomain $DomainAD

# Get Guest User
$GuestUser = Get-AzureADUser -Filter "UserType eq 'Guest'"
Write-Host $GuestUser
Write-Host $GuestUser.UserPrincipalName

# Adding Users as Guest User
$InviteGuestUserEmail = $false
$GuestUserList = Import-Csv -Path .\add-user-guest.csv

Foreach ($GuestUser in $GuestUserList) {
    Write-Host "Adding Guest User : $($GuestUser.Name)"

    New-AzureADMSInvitation -InvitedUserDisplayName $GuestUser.Name -InvitedUserEmailAddress $GuestUser.Email -InviteRedirectURL $GuestUser.RedirectURL -SendInvitationMessage $InviteGuestUserEmail
}

# # Remove Guest User
# $RemoveUserUPN = "alland_M365x538893.onmicrosoft.com#EXT#@aumonline.onmicrosoft.com"
# Remove-AzureADUser -ObjectId $RemoveUserUPN