import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsBotSsoPromptTokenResponse, TeamsFx, TeamsFxBotCommandHandler, TeamsFxBotSsoCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import qnaEchoCard from "./adaptiveCards/questionechoCommand.json";
import { qnaEchoCardData } from "./cardModels";
import { QnARequestProperties } from "./models/IQnARequestProperties";
import { callAzureFunction } from "./services/services";
import { getRefinedResponse } from "./utils/util";

export class faqQnaCommandHandler implements TeamsFxBotSsoCommandHandler {
    triggerPatterns: TriggerPatterns = ".";

    async handleCommandReceived(
        context: TurnContext,
        message: CommandMessage,
        tokenResponse: TeamsBotSsoPromptTokenResponse
    ): Promise<string | Partial<Activity> | void> {
        console.log(`Bot received message: ${message.text}`);
        const teamsfx = new TeamsFx().setSsoToken(tokenResponse.ssoToken);

        const qnarequestProperties: QnARequestProperties = {
            question: message.text,
            top: 1
        }
        // Calling the Azure Function for getting the QnA Result from Azure Language Studio
        const azQnAResponse : any = await callAzureFunction("getAzLangStudioResponse", teamsfx, qnarequestProperties);
        const refinedResponse: string = await getRefinedResponse(azQnAResponse);
        // Render your adaptive card for reply message
        const cardData: qnaEchoCardData = {
            title: "This card will show the Question Asked by the user",
            body: "This card will show the Question Asked by the user",
            appName: "Azure QnA Bot",
            description: `You have asked the question : ${message.text}. Response is ${refinedResponse}`,
        };

        const cardJson = AdaptiveCards.declare(qnaEchoCard).render(cardData);
        return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
    }
}