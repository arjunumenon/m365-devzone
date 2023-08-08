import { TeamsFxBotCommandHandler } from "@microsoft/teamsfx";
import { MessageFactory } from "botbuilder";
import { welcomeCardUtils } from "../utils/commonUtils";

export class helpCommandHandler implements TeamsFxBotCommandHandler {
    triggerPatterns = "help";
    async handleCommandReceived(context, message) {
        console.log(`Bot received message: ${message.text}`);

        const userDisplayName = context.activity.from.name;
        return MessageFactory.attachment(welcomeCardUtils.generateAndReturnWelcomeCard(userDisplayName));
    }
}