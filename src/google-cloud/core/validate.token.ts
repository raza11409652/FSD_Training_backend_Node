import { OAuth2Client } from "google-auth-library";
import { gcAuthClient } from "./connection";
import appConfig from "../../config";
import { GCPJWTTokenPayload } from "../../types";

const gcValidateTokenAuth = async (t: string) => {
  const oauth2Client = gcAuthClient();
  const cred = await oauth2Client.getToken(t);
  return cred;
};

export const gcRefreshAccessToken = async (token: string) => {
  // const oauth2Client = gcAuthClient();
  // oauth2Client.setCredentials(cred);
  // const obj = oauth2Client.refreshAccessToken();
  const client = gcAuthClient();
  client.setCredentials({ refresh_token: token });
  // client.setCredentials(cred);
  const obj = client ? await client.refreshAccessToken() : null;
  return obj;
};
/**
 *
 * @param token
 * @returns
 */
export const validateGoogleIdToken = async (token: string) => {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: appConfig.gcp.clientId,
  });
  const payload = ticket.getPayload();
  return payload as GCPJWTTokenPayload;
};
// export const { validateGogoleIdToken };
export default gcValidateTokenAuth;
