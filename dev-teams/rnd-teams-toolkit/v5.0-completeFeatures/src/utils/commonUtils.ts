import { Attachment } from "botbuilder";
import { WelcomeCardData } from "../models/AdaptiveCardData";
import { adaptiveCardsUtils } from "./generateAdaptiveCards";

export const welcomeCardUtils = {
    generateAndReturnWelcomeCard(userDisplayName: string): Attachment {
        // Render your adaptive card for reply message
        const helpCardData: WelcomeCardData = {
            initiator: userDisplayName!= undefined ? userDisplayName : "User",
        };
        return adaptiveCardsUtils.getWelcomeCard(helpCardData)
    }
}

export const aadUtils = {
    
    async getDisplayNamefromAADObjectId(aadObjectId: string): Promise<string> {

        //Sending Undefined for now. Will be updated Later
        return undefined;

    }
}