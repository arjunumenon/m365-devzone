import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { Attachment, CardFactory } from "botbuilder";
import { GenericAdaptiveCards, WelcomeCardData } from "../models/AdaptiveCardData";

export const adaptiveCardsUtils = {

    /**
     * @param welcomeCardData Welcome Card Data Model
     * @returns Get the Help / Welcome Card
     */
    getWelcomeCard(welcomeCardData : WelcomeCardData) : Attachment {
        const helpCommandJson =  getGenericAdaptiveCard("helpCommandResponse");
        return getAdaptiveCard(helpCommandJson,welcomeCardData);
    }
}
/**
 * 
 * @param cardFileName Name of the Adaptive Card JSON file
 * @returns Returns the Adaptive Card JSON
 */
function getGenericAdaptiveCard(cardFileName : string) : GenericAdaptiveCards {
    const cardJson : GenericAdaptiveCards = require(`../adaptiveCards/${cardFileName}.json`);
    return cardJson;
}
/**
 * 
 * @param responseCard Response Card which has to be generated
 * @param cardData Card Data Model
 * @returns Adaptive Card which can be returned via Partial Activity
 */
function getAdaptiveCard(responseCard : GenericAdaptiveCards, cardData? : WelcomeCardData | undefined) : Attachment {
    const cardJson = AdaptiveCards.declare(responseCard).render(cardData);
    return CardFactory.adaptiveCard(cardJson);
}