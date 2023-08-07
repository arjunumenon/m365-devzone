import { TurnContext, InvokeResponse } from "botbuilder";
import { TeamsFxAdaptiveCardActionHandler, InvokeResponseFactory } from "@microsoft/teamsfx";
import { DummyActionResponseCardData } from "../models/AdaptiveCardData";
import { adaptiveCardsUtils } from "../utils/generateAdaptiveCards";

/**
 * The `DoStuffActionHandler` registers an action with the `TeamsFxBotActionHandler` and responds
 * with an Adaptive Card if the user clicks the Adaptive Card action with `triggerVerb`.
 */
export class DummyActionHandler implements TeamsFxAdaptiveCardActionHandler {
  /**
   * A global unique string associated with the `Action.Execute` action.
   * The value should be the same as the `verb` property which you define in your adaptive card JSON.
   */
  triggerVerb = "dummyAction";

  async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> {
    console.log(`Bot received action: ${this.triggerVerb}. Data: ${JSON.stringify(actionData)}`);
    /**
     * You can send an adaptive card to respond to the card action invoke.
     */
    const actionResponseCardData: DummyActionResponseCardData = {
      title: "Your action is completed Successfully!",
      body: `Congratulations ${context.activity.from.name}! Your dummy action is processed successfully.`,
    };

    return InvokeResponseFactory.adaptiveCard(adaptiveCardsUtils.getDummyActionResponseCard(actionResponseCardData));

    /**
     * If you want to send invoke response with text message, you can:
     * 
     return InvokeResponseFactory.textMessage("[ACK] Successfully!");
    */

    /**
     * If you want to send invoke response with error message, you can:
     *
     * return InvokeResponseFactory.errorResponse(InvokeResponseErrorCode.BadRequest, "The incoming request is invalid.");
     */
  }
}
