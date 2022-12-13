const config = {
  authorityHost: process.env.M365_AUTHORITY_HOST,
  tenantId: process.env.M365_TENANT_ID,
  clientId: process.env.M365_CLIENT_ID,
  clientSecret: process.env.M365_CLIENT_SECRET,
  qnaEndpoint: process.env.QNA_ENDPOINT,
  qnaProjectName: process.env.QNA_PROJECT_NAME,
  qnaSubscriptionKey: process.env.QNA_SUBSCRIPTION_KEY
};

export default config;
