import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getCompleteUserProfile } from "../services/graphServices";

export async function getUserProfile(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const accessToken = request.query.get('AccessToken');

    const name = request.query.get('name') || await request.text() || 'world';

    const profile = await getCompleteUserProfile(accessToken);

    return { body: `Hello, ${name}!` };
};

app.http('getUserProfile', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: getUserProfile
});
