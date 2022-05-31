import express = require("express");
import { ClientCredentialRequest, ConfidentialClientApplication, OnBehalfOfRequest } from "@azure/msal-node";
import Axios from "axios";
import { Chat } from "@microsoft/microsoft-graph-types-beta";
import { getItem, setItem } from "node-persist";
import { validateToken } from "./AuthUtils";

export const StandupAgendaRouter = (options: any): express.Router => {
    const router = express.Router();

    router.get(
        '/meetingDetails/:meetingId',
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const token = await validateToken(req);

                // get OBO token
                try {
                    const cca = new ConfidentialClientApplication({
                        auth: {
                            clientId: process.env.M365_CLIENT_ID as string,
                            clientSecret: process.env.M365_CLIENT_SECRET,
                            authority: `https://login.microsoftonline.com/${process.env.M365_TENANT_ID}`
                        }
                    });
                    const response = await cca.acquireTokenOnBehalfOf(<OnBehalfOfRequest>{
                        oboAssertion: token,
                        scopes: ["OnlineMeetings.Read", "Chat.Read"]
                    });

                    // use OBO access token to call MS graph for meeting detail
                    if (response && response.accessToken) {
                        const authHeader: any = {
                            headers: {
                                Authorization: `Bearer ${response.accessToken}`
                            }
                        };

                        // get meeting detail
                        try {
                            // base64 decode meeting ID & strip surrounding 0# #0
                            const chatId = Buffer.from(req.params.meetingId, "base64").toString("ascii").replace(/^0#|#0$/g, "");
                            // get chat details
                            const chat = await Axios.get<Chat>(`https://graph.microsoft.com/beta/chats/${chatId}`, authHeader);
                            // get meeting detail (via chat detail)
                            const onlineMeetings = await Axios.get(`https://graph.microsoft.com/v1.0/me/onlineMeetings?$filter=JoinWebUrl eq '${chat.data.onlineMeetingInfo?.joinWebUrl}'`, authHeader);

                            // return first meeting detail returned
                            if (onlineMeetings?.data?.value?.length > 0) {
                                res.type('application/json');
                                res.end(JSON.stringify(onlineMeetings?.data?.value[0]));
                            } else {
                                console.error('bad data returned from online meeting request: ', onlineMeetings);
                                throw new Error('500: bad data returned from online meeting request');
                            }
                        } // \get meeting detail
                        catch (err) { throw new Error(`error getting meeting detail: ${err.message}`); };
                    } else {
                        // \use OBO access token to call MS graph for meeting detail
                        throw new Error(`no access token returned`);
                    }
                }
                // \get OBO token
                catch (err) { throw new Error(`obo token acq error: ${err.message}`) };
            }
            // \validate token
            catch (err) { throw new Error(`token validation error: ${err.message}`) };
        });

    return router;
};