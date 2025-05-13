import { NextFunction, Request, Response } from "express";
import { gcAuthentication } from "../google-cloud";
import gcValidateTokenAuth from "../google-cloud/core/validate.token";
import { decodeJWTToken, generateToken } from "../utils/jwt";
import { GCPJWTTokenPayload, JWTToken } from "../types";
import userService from "../service/user.service";
import { AppRequest } from "../types/request";
// import appConfig from "../config";
// const user
class AuthController {
  async handleGCPLogin(_: Request, res: Response, next: NextFunction) {
    try {
      const response = await gcAuthentication();
      res.send(response);
    } catch (e) {
      next(e);
    }
  }
  async handleGCPRedirects(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const code = query.code || "";
      if (code) {
        // console.log(code);
        const validateToken = await gcValidateTokenAuth(code as string);
        const token = validateToken.tokens.id_token;
        if (!token) throw new Error("Token not found");
        const payload = decodeJWTToken(token) as GCPJWTTokenPayload;
        // console.log({ payload });
        // This case will not happened
        // if (payload.azp !== appConfig.gcp.clientId)
        //   throw new Error("client ID Mismatched");
        // const obj = { email: payload.email };
        // !! case 1 -
        // Scenario on this is a new user
        let userData: { [key: string]: any } | null =
          await userService.getUserByEmail(payload.email);
        if (!userData) {
          // Need to create user
          userData = await userService.newUser({
            name: payload.name,
            profileImage: payload.picture,
            email: payload.email,
          });
        }

        userData = new Object(userData);
        // console.log({ userData });
        let tokenJWT: JWTToken = {
          email: userData?.["email"] || (userData?.dataValues?.email as string),
          role: userData?.["role"] || (userData?.dataValues?.role as string),
          type: "SESSION",
          id: userData?.["id"] || (userData?.dataValues?.id as number),
        };
        // console.log({ tokenJWT });
        const sessionToken = generateToken(tokenJWT);
        const refreshToken = generateToken({ ...tokenJWT, type: "REFRESH" });

        // console.log({ sessionToken, refreshToken });
        const URL = `https://fsd-task-mgt.vercel.app/auth/init?session=${sessionToken}&refresh=${refreshToken}`;
        // res
        // .cookie(
        //   "Au",
        //   { refresh: refreshToken, session: sessionToken },
        //   {}
        // )
        res.redirect(302, URL);
      } else {
        throw new Error("Code is not found in the query param");
      }
    } catch (e) {
      console.log("ERROR", e);
      next(e);
    }
  }

  async getUserProfile(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const email = req.payload?.email || "";
      const userData = await userService.getUserByEmail(email);
      res.jsonp(userData);
    } catch (er) {
      next(er);
    }
  }
}
const authController = new AuthController();
export default authController;
