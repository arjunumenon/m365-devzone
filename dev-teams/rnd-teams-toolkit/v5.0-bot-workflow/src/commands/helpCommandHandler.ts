import { TeamsFxBotCommandHandler } from "@microsoft/teamsfx";
import {  MessageFactory } from "botbuilder";
import { WelcomeCardData } from "../models/AdaptiveCardData";
import { adaptiveCardsUtils } from "../utils/generateAdaptiveCards";

export class helpCommandHandler implements TeamsFxBotCommandHandler {
    triggerPatterns = "help";
    async handleCommandReceived(context, message) {
        console.log(`Bot received message: ${message.text}`);
        // Render your adaptive card for reply message
        const helpCardData : WelcomeCardData = {
            initiator: context.activity.from.name,
        };
        return MessageFactory.attachment(adaptiveCardsUtils.getWelcomeCard(helpCardData));
    }
}