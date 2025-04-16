import { google } from "googleapis";
import { GCAuth } from "../../types";
import appConfig from "../../config";
export const gcAuthDetails = {
  client_id: appConfig.gcp.clientId,
  project_id: appConfig.gcp.projectId,
  // auth_uri: "https://accounts.google.com/o/oauth2/auth",
  // token_uri: "https://oauth2.googleapis.com/token",
  // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: appConfig.gcp.clientSecret,
  redirect_url: appConfig.gcp.redirectURL,
};
console.log(gcAuthDetails);
const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
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
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    // If you only need one scope you can pass it as a string
    scope: SCOPES,
  });
  return url;
};
export default gcAuthentication;

export const gcGetAuthFromJson = (a: GCAuth) => {
  return google.auth.fromJSON(a);
};
