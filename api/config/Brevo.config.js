import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

// Authenticate using API key
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

// Export transactional email API
export const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
