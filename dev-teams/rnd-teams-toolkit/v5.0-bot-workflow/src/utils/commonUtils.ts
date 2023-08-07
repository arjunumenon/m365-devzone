import { Attachment } from "botbuilder";
import { WelcomeCardData } from "../models/AdaptiveCardData";
import { adaptiveCardsUtils } from "./generateAdaptiveCards";

export const welcomeCardUtils = {
    generateAndReturnWelcomeCard(userDisplayName: string): Attachment {
        // Render your adaptive card for reply message
        const helpCardData: WelcomeCardData = {
            initiator: userDisplayName,
        };
        return adaptiveCardsUtils.getWelcomeCard(helpCardData)
    }
}