import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { Attachment, CardFactory } from "botbuilder";
import { DummyActionCardData, DummyActionResponseCardData, GenericAdaptiveCards, WelcomeCardData } from "../models/AdaptiveCardData";

export const adaptiveCardsUtils = {

    /**
     * @param welcomeCardData Welcome Card Data Model
     * @returns Get the Help / Welcome Card
     */
    getWelcomeCard(welcomeCardData: WelcomeCardData): Attachment {
        const helpCommandJson = getGenericAdaptiveCard("helpCommandResponse");
        return getAdaptiveCard(helpCommandJson, welcomeCardData);
    },

    /**
     * 
     * @param dummyActionData Dummy Action Card Data Model
     * @returns Returns the Adaptive Card for Dummy Action
     */
    getDummyActionCard(dummyActionData: DummyActionCardData): Attachment {
        const dummyActionCardJson = getGenericAdaptiveCard("dummyActionCard");
        return getAdaptiveCard(dummyActionCardJson, dummyActionData);
    },

    /**
     * 
     * @param dummyActionResponseData Dummy Action Response Card Data Model
     * @returns Adaptive Card for Action Response Data
     */
    getDummyActionCardResponse(dummyActionResponseData: DummyActionResponseCardData): any {
        const dummyActionResponseCardJson = getGenericAdaptiveCard("dummyActionCardResponse");
        //Since we are returning the Adaptive Card as IAdaptiveCard, we need to pass the last parameter as true. Card Action Response only supports IAdaptiveCard
        return getAdaptiveCard(dummyActionResponseCardJson, dummyActionResponseData, true);
    }
}
/**
 * 
 * @param cardFileName Name of the Adaptive Card JSON file
 * @returns Returns the Adaptive Card JSON
 */
function getGenericAdaptiveCard(cardFileName: string): GenericAdaptiveCards {
    const cardJson: GenericAdaptiveCards = require(`../adaptiveCards/${cardFileName}.json`);
    return cardJson;
}

/**
 * 
 * @param responseCard Response Card which has to be generated
 * @param cardData Card Data Model
 * @param getInIAdaptiveCard If true, returns the Adaptive Card as IAdaptiveCard. Otherwise, returns as Attachment
 * @returns Adaptive Card which can be returned via Partial Activity
 */
function getAdaptiveCard(responseCard: GenericAdaptiveCards, cardData?: WelcomeCardData | DummyActionCardData | DummyActionResponseCardData, getInIAdaptiveCard: boolean = false): Attachment | any {
    const cardIAdaptiveCard = AdaptiveCards.declare(responseCard).render(cardData);
    return getInIAdaptiveCard ? cardIAdaptiveCard : CardFactory.adaptiveCard(cardIAdaptiveCard);
}