
import { OnBehalfOfUserCredential } from "@microsoft/teamsfx";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { oboAuthConfig } from "../models/authModel";

export async function getUserProfile(accessToken: string): Promise<any> {
    // Init OnBehalfOfUserCredential instance with SSO token
    const oboCredential = new OnBehalfOfUserCredential(accessToken, oboAuthConfig);

    // Create an instance of the TokenCredentialAuthenticationProvider by passing the tokenCredential instance and options to the constructor
    const authProvider = new TokenCredentialAuthenticationProvider(oboCredential, {
        scopes: ["User.Read"],
    });

    // Initialize Graph client instance with authProvider
    const graphClient = Client.initWithMiddleware({
        authProvider: authProvider,
    });

    // Call graph api use `graph` instance to get user profile information
    const me = await graphClient.api("/me").get();

    return me;
}