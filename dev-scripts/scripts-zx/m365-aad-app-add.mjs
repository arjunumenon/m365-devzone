#!/usr/bin/env zx

async function createAADApp(appName, apiPermissions) {
    console.log(`Creating Azure AD app ${appName}...`);
    let createdApp = null;
    try {
        createdApp = JSON.parse(await $`m365 aad app add --name ${appName} --apisDelegated ${apiPermissions}  --redirectUris 'https://login.microsoftonline.com/common/oauth2/nativeclient' --platform spa --grantAdminConsent  --multitenant --withSecret --output json`);
        // console.log(`Created Azure AD app ${appName} with id ${createdApp.appId}`);
        // console.log(createdApp);
    }
    catch (err) {
        console.error(`  ${chalk.red(err.stderr)}`);
    }
    return createdApp;
}
const appName = 'AUM Testing App';
const apiPermissions = 'https://graph.microsoft.com/User.Read';

const appCreated = await createAADApp(appName, apiPermissions);
if (appCreated === null) {
    console.error(`   ${chalk.red(`Failed to create the App with Name ${appName}`)}`);
}
else {
    console.log(`Created Azure AD app ${appCreated.appName} with id ${appCreated.appId}`);
}