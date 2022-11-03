import {Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import qnaEchoCard from "./adaptiveCards/questionechoCommand.json";
import { qnaEchoCardData } from "./cardModels";

export class azureqnaCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = ".";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    console.log(`Bot received message: ${message.text}`);

    // Render your adaptive card for reply message
    const cardData: qnaEchoCardData = {
      title: "This card will show the Question Asked by the user",
      body: "This card will show the Question Asked by the user",
      appName: "Azure QnA Bot",
      description : `You have asked the question : ${message.text}`,
    };

    const cardJson = AdaptiveCards.declare(qnaEchoCard).render(cardData);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}