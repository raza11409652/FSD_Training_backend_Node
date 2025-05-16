import { google } from "googleapis";
import { GCAuth } from "../../types";
import appConfig from "../../config";
export const gcAuthDetails = {
  client_id: appConfig.gcp.clientId,
  project_id: appConfig.gcp.projectId,
  client_secret: appConfig.gcp.clientSecret,
  redirect_url: appConfig.gcp.redirectURL,
};
const SCOPES = ["email", "profile"];
export const gcAuthClient = () => {
  const oauth2Client = new google.auth.OAuth2(
    gcAuthDetails.client_id,
    gcAuthDetails.client_secret,
    gcAuthDetails.redirect_url
  );
  return oauth2Client;
};
const gcAuthentication = async () => {
  const oauth2Client = gcAuthClient();
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  return url;
};
export default gcAuthentication;

export const gcGetAuthFromJson = (a: GCAuth) => {
  return google.auth.fromJSON(a);
};
