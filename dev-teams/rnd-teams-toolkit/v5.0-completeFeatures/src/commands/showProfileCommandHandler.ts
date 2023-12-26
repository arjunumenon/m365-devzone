import { Activity, TurnContext } from "botbuilder";
import {
    CommandMessage,
    TeamsFxBotSsoCommandHandler,
    TeamsBotSsoPromptTokenResponse,
    OnBehalfOfUserCredential,
    OnBehalfOfCredentialAuthConfig,
    createApiClient,
    BearerTokenAuthProvider,
} from "@microsoft/teamsfx";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import "isomorphic-fetch";

const oboAuthConfig: OnBehalfOfCredentialAuthConfig = {
    authorityHost: process.env.M365_AUTHORITY_HOST,
    clientId: process.env.M365_CLIENT_ID,
    tenantId: process.env.M365_TENANT_ID,
    clientSecret: process.env.M365_CLIENT_SECRET,
};

export class ShowProfile implements TeamsFxBotSsoCommandHandler {
    triggerPatterns = "showProfile";
    async handleCommandReceived(
        context: TurnContext,
        message: CommandMessage,
        tokenResponse: TeamsBotSsoPromptTokenResponse
    ): Promise<string | Partial<Activity> | void> {
        console.log(`Bot received message: ${message.text}`);

        await context.sendActivity("Retrieving user information from Microsoft Graph ...");

        // Init OnBehalfOfUserCredential instance with SSO token
        const oboCredential = new OnBehalfOfUserCredential(tokenResponse.ssoToken, oboAuthConfig);

        // Create an instance of the TokenCredentialAuthenticationProvider by passing the tokenCredential instance and options to the constructor
        const authProvider = new TokenCredentialAuthenticationProvider(oboCredential, {
            scopes: ["User.Read"],
        });

        // Initialize Graph client instance with authProvider
        const graphClient = Client.initWithMiddleware({
            authProvider: authProvider,
        });

        await getProfileFromAzureFunction(tokenResponse.ssoToken);

        // Call graph api use `graph` instance to get user profile information
        const me = await graphClient.api("/me").get();

        if (me) {
            // Bot will send the user profile info to user
            return `Your command is '${message.text}' and you're logged in as ${me.displayName} (${me.userPrincipalName}).`;
        } else {
            return "Could not retrieve profile information from Microsoft Graph.";
        }

    }
}

async function getProfileFromAzureFunction(ssoToken: string): Promise<void> {
    const functionName = process.env.REACT_APP_FUNC_NAME;
    const functionEndpoint = process.env.REACT_APP_FUNC_ENDPOINT;

    const apiClient = createApiClient(`${functionEndpoint}/api/`, new BearerTokenAuthProvider(async () => (ssoToken)));
    let responseAPI = null;

    try {
        responseAPI = await apiClient.post(`${functionName}`);
    } catch (error) {
        console.log(error);
    }

    console.log(responseAPI);
}