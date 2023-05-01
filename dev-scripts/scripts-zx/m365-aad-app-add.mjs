#!/usr/bin/env zx

async function createAADApp(appName, apiPermissions){
    console.log(`Creating Azure AD app ${appName}...`);
    const app = JSON.parse(await $`m365 aad app add --name ${appName} --apisDelegated ${apiPermissions}  --redirectUris 'https://login.microsoftonline.com/common/oauth2/nativeclient' --platform publicClient --grantAdminConsent --output json`);
    console.log(`Created Azure AD app ${appName} with id ${app.appId}`);
    return app;
}
const appName = 'AUM Testing App';
const apiPermissions = 'https://graph.microsoft.com/User.Read'; 

const appCreated = createAADApp(appName, apiPermissions);

console.log(`Created Azure AD app ${appCreated.appName} with id ${appCreated.appId}`);