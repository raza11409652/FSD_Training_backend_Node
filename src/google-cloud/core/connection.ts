import { google } from "googleapis";
import { GCAuth } from "../../types";
import appConfig from "../../config";
// import { JWT } from "google-auth-library";
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
    access_type: "online",
    scope: SCOPES,
  });
  return url;
  // const client = new JWT({
  //   project_id: gcAuthDetails.project_id,
  //   clientId: gcAuthDetails.client_id,
  //   clientSecret: gcAuthDetails.client_secret,
  //   redirectUri: gcAuthDetails.redirect_url,
  // });

  // const res = client.generateAuthUrl({ scopes: scop });
  // // console.log(res.data);
  // return res;
};
export default gcAuthentication;

export const gcGetAuthFromJson = (a: GCAuth) => {
  return google.auth.fromJSON(a);
};
