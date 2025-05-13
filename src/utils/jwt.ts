import * as jwt from "jsonwebtoken";
import { JWTToken } from "../types";
import appConfig from "../config";
const decodeJWTToken = (token: string) => {
  const payload = jwt.decode(token);
  return payload;
};

const generateToken = (p: JWTToken) => {
  const KEY =
    p.type === "REFRESH" ? `REF-${appConfig.jwtToken}` : appConfig.jwtToken;
  const expiresIn = p.type === "REFRESH" ? "30d" : "72h";
  // console.log({ KEY, expiresIn });
  const token = jwt.sign(p, KEY, { expiresIn });
  return token;
};

const validateJWTToken = (token: string, isRefresh = false) => {
  const KEY = isRefresh ? `REF-${appConfig.jwtToken}` : appConfig.jwtToken;
  return jwt.verify(token, KEY);
};
export { decodeJWTToken, generateToken, validateJWTToken };
