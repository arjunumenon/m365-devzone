// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
    TeamsFx,
    getTediousConnectionConfig,
} = require("@microsoft/teamsfx");
const { Connection, Request } = require('tedious');

/**
 * This function handles requests sent from teamsfx client SDK.
 * The HTTP request should contain an SSO token in the header and any content in the body.
 * The SSO token should be queried from Teams client by teamsfx client SDK.
 * Before trigger this function, teamsfx binding would process the SSO token and generate teamsfx configuration.
 *
 * This function initializes the teamsfx Server SDK with the configuration and calls these APIs:
 * - getUserInfo() - Get the user's information from the received SSO token.
 * - getMicrosoftGraphClientWithUserIdentity() - Get a graph client to access user's Microsoft 365 data.
 *
 * The response contains multiple message blocks constructed into a JSON object, including:
 * - An echo of the request body.
 * - The display name encoded in the SSO token.
 * - Current user's Microsoft 365 profile if the user has consented.
 *
 * @param {Context} context - The Azure Functions context object.
 * @param {HttpRequest} req - The HTTP request.
 * @param {teamsfxConfig} config - The teamsfx configuration generated by teamsfx binding.
 */
module.exports = async function (context, req, config) {
    let connection;
    try {
        const method = req.method.toLowerCase();
        const accessToken = config.AccessToken;
        const teamsfx = new TeamsFx().setSsoToken(accessToken);
        // Get the user info from access token
        const currentUser = await teamsfx.getUserInfo();
        const objectId = currentUser.objectId;
        var query;

        switch (method) {
            case "get":
                query = `select id, description, isCompleted, objectId from dbo.Todo where channelOrChatId = '${req.query.channelOrChatId}'`;
                break;
            case "put":
                if (req.body.description) {
                    query = `update dbo.Todo set description = N'${req.body.description}' where id = ${req.body.id}`;
                } else {
                    query = `update dbo.Todo set isCompleted = ${req.body.isCompleted ? 1 : 0} where id = ${req.body.id}`;
                }
                break;
            case "post":
                query = `insert into dbo.Todo (description, objectId, isCompleted, channelOrChatId) values (N'${req.body.description}','${objectId}',${req.body.isCompleted ? 1 : 0},'${req.body.channelOrChatId}')`;
                break;
            case "delete":
                query = "delete from dbo.Todo where " + (req.body ? `id = ${req.body.id}` : `objectId = '${objectId}'`);
                break;
        }
        connection = await getSQLConnection(teamsfx);
        // Execute SQL through TeamsFx server SDK generated connection and return result
        const result = await execQuery(query, connection);
        return {
            status: 200,
            body: result
        }
    }
    catch (err) {
        return {
            status: 500,
            body: {
                error: err.message
            }
        }
    }
    finally {
        if (connection) {
            connection.close();
        }
    }
}

async function getSQLConnection(teamsfx) {
    const config = await getTediousConnectionConfig(teamsfx);
    const connection = new Connection(config);
    return new Promise((resolve, reject) => {
        connection.on('connect', err => {
            if (err) {
                reject(err);
            }
            resolve(connection);
        })
        connection.on('debug', function (err) {
            console.log('debug:', err);
        });
    })
}

async function execQuery(query, connection) {
    return new Promise((resolve, reject) => {
        const res = [];
        const request = new Request(query, (err) => {
            if (err) {
                reject(err);
            }
        });

        request.on('row', columns => {
            const row = {};
            columns.forEach(column => {
                row[column.metadata.colName] = column.value;
            });
            res.push(row)
        });

        request.on('requestCompleted', () => {
            resolve(res)
        });

        request.on("error", err => {
            reject(err);
        });

        connection.execSql(request);
    })
}
