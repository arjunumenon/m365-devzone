import { TeamsActivityHandler } from "botbuilder";
import { aadUtils, welcomeCardUtils } from "./utils/commonUtils";

// An empty teams activity handler.
// You can add your customization code here to extend your bot logic if needed.
export class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

            // Sends welcome messages to conversation members when they join the conversation.
        // Messages are only sent to conversation members who aren't the bot.
        this.onMembersAdded(async (context, next) => {
          // Iterate over all new members added to the conversation
          for (const idx in context.activity.membersAdded) {
              // Greet anyone that was not the target (recipient) of this message.
              // Since the bot is the recipient for events from the channel,
              // context.activity.membersAdded === context.activity.recipient.Id indicates the
              // bot was added to the conversation, and the opposite indicates this is a user.
              if (context.activity.membersAdded[idx].id !== context.activity.recipient.id) {
                  //Load the Welcome Card initially
                  //Setting the Displayname as Undefined for now. Will be updated Later
                  const userDisplayName = await aadUtils.getDisplayNamefromAADObjectId(context.activity.membersAdded[idx].id);
                  const card = welcomeCardUtils.generateAndReturnWelcomeCard(userDisplayName)
                  await context.sendActivity({ attachments: [card] });
              }
          }

          // By calling next() you ensure that the next BotHandler is run.
          await next();
      });
  }
}
