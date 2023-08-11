import * as restify from "restify";
import { workflowApp } from "./internal/initialize";
import { TeamsBot } from "./teamsBot";
import "isomorphic-fetch";
import * as path from "path";

// This template uses `restify` to serve HTTP responses.
// Create a restify server.
const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\nBot Started, ${server.name} listening to ${server.url}`);
});

// Register an API endpoint with `restify`. Teams sends messages to your application
// through this endpoint.
//
// The Teams Toolkit bot registration configures the bot with `/api/messages` as the
// Bot Framework endpoint. If you customize this route, update the Bot registration
// in `/templates/provision/bot.bicep`.
const teamsBot = new TeamsBot();
server.post("/api/messages", async (req, res) => {
  await workflowApp.requestHandler(req, res).catch((err) => {
    // Error message including "412" means it is waiting for user's consent, which is a normal process of SSO, sholdn't throw this error.
    if (!err.message.includes("412")) {
      throw err;
    }
  });
  // await workflowApp.requestHandler(req, res, async (context) => {
  //   await teamsBot.run(context);
  // });
});


server.get(
  "/auth-:name(start|end).html",
  restify.plugins.serveStatic({
      directory: path.join(__dirname, "public"),
  })
);
