import { Activity, TurnContext } from "botbuilder"
import {
    CommandMessage,
    TeamsBotSsoPromptTokenResponse,
    TeamsFx,
    TeamsFxBotSsoCommandHandler,
    TriggerPatterns
} from "@microsoft/teamsfx"

export class AzureFnCommandHandler implements TeamsFxBotSsoCommandHandler {
    triggerPatterns: TriggerPatterns = "azurefn";

    async handleCommandReceived(
        context: TurnContext,
        message: CommandMessage,
        tokenResponse: TeamsBotSsoPromptTokenResponse
    ): Promise<string | Partial<Activity> | void> {
        await context.sendActivity("Retrieving user information from Microsoft Graph ...");

        const teamsfx = new TeamsFx();
        const accessToken = await teamsfx.getCredential().getToken("");
        // note: empty string argument on the previous line is required for now, this will be fixed in a later release
        const response = await fetch(`https://azureqnama3a014dapi.azurewebsites.net/api/getQnAResponse`, {
            headers: {
                Authorization: `Bearer ${accessToken.token}`,
            },
        });

        return "Executed Azure Function Command Handler"
    }
}