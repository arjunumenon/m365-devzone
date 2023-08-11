import { Activity, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { adaptiveCardsUtils } from "../utils/generateAdaptiveCards";
import { DummyActionCardData } from "../models/AdaptiveCardData";

/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
export class InvokeDummyActionCardCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "invokeCard";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    console.log(`Bot received message: ${message.text}`);

    // Render your adaptive card for reply message
    const dummyActionCardData: DummyActionCardData = {
      title: "You have invoked Dummy Action Card",
      body: `Congratulations ${context.activity.from.name} ! You have invoked dummy action card. Click the button below to trigger an action.`,
    };

    return MessageFactory.attachment(adaptiveCardsUtils.getDummyActionCard(dummyActionCardData));
  }
}
