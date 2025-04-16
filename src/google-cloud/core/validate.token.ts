import { gcAuthClient } from "./connection";

const gcValidateTokenAuth = async (t: string) => {
  const oauth2Client = gcAuthClient();
  const cred = await oauth2Client.getToken(t);
  //   oauth2Client.setCredentials(tokens);
  return cred;
};

export default gcValidateTokenAuth;
