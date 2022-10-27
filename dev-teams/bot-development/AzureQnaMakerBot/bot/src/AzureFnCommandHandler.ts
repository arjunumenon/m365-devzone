import { Activity, TurnContext } from "botbuilder"
import {
    CommandMessage,
    TeamsBotSsoPromptTokenResponse,
    TeamsFx,
    TeamsFxBotSsoCommandHandler,
    TriggerPatterns
} from "@microsoft/teamsfx"
import axios from 'axios';

export class AzureFnCommandHandler implements TeamsFxBotSsoCommandHandler {
    triggerPatterns: TriggerPatterns = "azurefn";

    async handleCommandReceived(
        context: TurnContext,
        message: CommandMessage,
        tokenResponse: TeamsBotSsoPromptTokenResponse
    ): Promise<string | Partial<Activity> | void> {
        await context.sendActivity("Invoking the Azure Function...");

        const teamsfx  = new TeamsFx().setSsoToken(tokenResponse.ssoToken);
        // const accessToken = await teamsfx.getCredential().getToken("");
        // // note: empty string argument on the previous line is required for now, this will be fixed in a later release
        // const response : any = await fetch(`https://azureqnama3a014dapi.azurewebsites.net/api/getQnAResponse`, {
        //     headers: {
        //         Authorization: `Bearer ${accessToken.token}`,
        //     },
        // });

        return await callFunction("getQnAResponse",teamsfx);
    }
    
}

async function callFunction(functionName: string, teamsfx?: TeamsFx) {
    const accessToken = await teamsfx.getCredential().getToken(""); // Get SSO token 
    // teamsfx.getConfig("apiEndpoint") will read REACT_APP_FUNC_ENDPOINT environment variable 
    const endpoint = teamsfx.getConfig("apiEndpoint");
    const response = await axios.get(endpoint + "/api/" + functionName, {
      headers: {
        authorization: "Bearer " + accessToken.token,
      },
    });
    return `Value Returned from Azure Function is : ${response.data.userInfoMessage}`;
  }