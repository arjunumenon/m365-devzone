import { Activity, TurnContext } from "botbuilder"
import {
  CommandMessage,
  TeamsBotSsoPromptTokenResponse,
  TeamsFx,
  TeamsFxBotSsoCommandHandler,
  TriggerPatterns
} from "@microsoft/teamsfx"
import axios from 'axios';

interface QnARequestProperties {
  question: string;
  top: number;
}
export class AzureFnCommandHandler implements TeamsFxBotSsoCommandHandler {
  triggerPatterns: TriggerPatterns = ".";
  
  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage,
    tokenResponse: TeamsBotSsoPromptTokenResponse
  ): Promise<string | Partial<Activity> | void> {
    await context.sendActivity("Let me see what I can do for you...");
    const teamsfx = new TeamsFx().setSsoToken(tokenResponse.ssoToken);

    const qnarequestProperties: QnARequestProperties = {
      question: message.text,
      top: 1
    }

    // // Calling the Azure Function for getting the QnA Result
    // const azFunctionResult : any = await callFunction("getQnAResponse", teamsfx);

    // Calling the Azure Function for getting the QnA Result from Azure Language Studio
    const azLangStudioResult : any = await callFunction("getQnALangStudio", teamsfx, qnarequestProperties);

    return azLangStudioResult;
  }

}

// Call the Azure Function
async function callFunction(functionName: string, teamsfx?: TeamsFx, qnarequestProperties?: QnARequestProperties): Promise<any> {
  const accessToken = await teamsfx.getCredential().getToken(""); // Get SSO token 
  // teamsfx.getConfig("apiEndpoint") will read REACT_APP_FUNC_ENDPOINT environment variable 
  const endpoint = teamsfx.getConfig("apiEndpoint");
  let message: any = null;
  let funcErrorMsg: string = null;
  try {
    const response = await axios.get(endpoint + "/api/" + functionName, {
      headers: {
        authorization: "Bearer " + accessToken.token,
      },
      data: qnarequestProperties,
    });
    message = response.data;
    message = response.data.answers[0].answer;
  }
  catch (err : any) {
    if (err.response && err.response.status && err.response.status === 404) {
      funcErrorMsg =
        'There may be a problem with the deployment of Azure Function App, please deploy Azure Function (Run command palette "TeamsFx - Deploy Package") first before running this App';
    } else if (err.message === "Network Error") {
      funcErrorMsg =
        "Cannot call Azure Function due to network error, please check your network connection status and ";
      if (err.config.url.indexOf("localhost") >= 0) {
        funcErrorMsg +=
          'make sure to start Azure Function locally (Run "npm run start" command inside api folder from terminal) first before running this App';
      } else {
        funcErrorMsg +=
          'make sure to provision and deploy Azure Function (Run command palette "TeamsFx - Provision Resource" and "TeamsFx - Deploy Package") first before running this App';
      }
    } else {
      funcErrorMsg = err.toString();
      if (err.response?.data?.error) {
        funcErrorMsg += ": " + err.response.data.error;
      }
      alert(funcErrorMsg);
    }
  }
  return message;
}