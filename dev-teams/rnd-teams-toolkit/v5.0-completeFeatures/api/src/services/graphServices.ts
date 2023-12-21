
import { OnBehalfOfUserCredential, createMicrosoftGraphClientWithCredential } from "@microsoft/teamsfx";
import { oboAuthConfig } from "../models/authModel";

export async function getUserProfile(accessToken: string): Promise<any> {
    const oboCredential = new OnBehalfOfUserCredential(accessToken, oboAuthConfig);
    // Create a graph client with default scope to access user's Microsoft 365 data after user has consented.
    const graphClient = createMicrosoftGraphClientWithCredential(
      oboCredential,
      [".default"]
    );
    const profile: any = await graphClient.api("/me").get();
    return profile;
}