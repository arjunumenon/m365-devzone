import { DummyActionHandler } from "../cardActions/dummyActionHandler";
import { InvokeDummyActionCardCommandHandler } from "../commands/invokeDummyActionCommandHandler";
import { BotBuilderCloudAdapter } from "@microsoft/teamsfx";
import ConversationBot = BotBuilderCloudAdapter.ConversationBot;
import config from "./config";
import { helpCommandHandler } from "../commands/helpCommandHandler";
import { ShowProfile } from "../commands/showProfileCommandHandler";

// Create the conversation bot and register the command and card action handlers for your app.
export const workflowApp = new ConversationBot({
  // The bot id and password to create CloudAdapter.
  // See https://aka.ms/about-bot-adapter to learn more about adapters.
  adapterConfig: {
    MicrosoftAppId: config.botId,
    MicrosoftAppPassword: config.botPassword,
    MicrosoftAppType: "MultiTenant",
  },
  ssoConfig: {
    aad: {
      scopes: ["User.Read"],
    },
  },
  command: {
    enabled: true,
    commands: [new InvokeDummyActionCardCommandHandler(), new helpCommandHandler()],
    ssoCommands: [new ShowProfile()],
  },
  cardAction: {
    enabled: true,
    actions: [new DummyActionHandler()],
  },
});
