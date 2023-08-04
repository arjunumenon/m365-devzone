import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { TeamsFxBotCommandHandler } from "@microsoft/teamsfx";
import { CardFactory, MessageFactory } from "botbuilder";
import  helpCommandResponse  from "../adaptiveCards/helpCommandResponse.json";

export class helpCommandHandler implements TeamsFxBotCommandHandler {
    triggerPatterns = "help";
    async handleCommandReceived(context, message) {
        console.log(`Bot received message: ${message.text}`);
        // Render your adaptive card for reply message
        const cardData = {
            initiator: context.activity.from.name,
        };
        const cardJson = AdaptiveCards.declare(helpCommandResponse).render(cardData);
        return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
    }
}