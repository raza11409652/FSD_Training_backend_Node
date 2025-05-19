import { NextFunction, Request, Response } from "express";
import {
  gcAuthentication,
  gcRefreshAccessToken,
  gcValidateTokenAuth,
} from "../google-cloud";

import { decodeJWTToken } from "../utils/jwt";
import { GCPJWTTokenPayload } from "../types";
import userService from "../service/user.service";
import { AppRequest } from "../types/request";
import appConfig from "../config";
import { AppError, STATUS_CODES } from "../error-handler/appError";
import getPermission from "../data/permission";
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
        const { tokens } = await gcValidateTokenAuth(code as string);
        const token = tokens.id_token;
        // const refreshToken = tokens.refresh_token || "";
        // const { tokens } = await oAuth2Client.getToken(code);

        // Store the tokens securely
        // console.log("Access Token:", tokens.access_token);
        // console.log("Refresh Token:", tokens.refresh_token);
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
          // userData = await userService.newUser({
          //   name: payload.name,
          //   profileImage: payload.picture,
          //   email: payload.email,
          // });
          // If user is not present in the database prevent the signup process
          // console.log({ userData, token, refreshToken }, "USER DON'T EXIST");
          res.redirect(
            302,
            `${appConfig.frontEndURL}?error_status=403&message=LOGIN_FAILED`
          );
        } else {
          console.log({ userData, token, tokens }, "USER EXIST");
          const URL = `${appConfig.frontEndURL}/auth/init?session=${token}&refresh=${tokens.access_token}`;
          res.redirect(302, URL);
        }

        // userData = new Object(userData);
        // // console.log({ userData });
        // let tokenJWT: JWTToken = {
        //   email: userData?.["email"] || (userData?.dataValues?.email as string),
        //   role: userData?.["role"] || (userData?.dataValues?.role as string),
        //   type: "SESSION",
        //   id: userData?.["id"] || (userData?.dataValues?.id as number),
        // };
        // // console.log({ tokenJWT });
        // const sessionToken = generateToken(tokenJWT);
        // const refreshToken = generateToken({ ...tokenJWT, type: "REFRESH" });

        // console.log({ sessionToken, refreshToken });
        //https://fsd-task-mgt.vercel.app

        // res
        // .cookie(
        //   "Au",
        //   { refresh: refreshToken, session: sessionToken },
        //   {}
        // )
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
      const userData: { [key: string]: any } | null =
        await userService.getUserByEmail(email);
      const role = userData?.["role"] || "";
      if (!role) throw new Error("Role is not retrieved");
      const permission = getPermission(role);
      res.jsonp({ user: userData, permission });
    } catch (er) {
      next(er);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param next
   */

  async handleRefreshToken(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const token = req.body.token || "";
      if (!token)
        throw new AppError(
          STATUS_CODES.UN_AUTHORIZED,
          "TOKEN is not present in the request"
        );
      console.log(appConfig.gcp);
      // const _res = gcGetAuthFromJson({
      //   client_id: appConfig.gcp.clientId,
      //   client_secret: appConfig.gcp.clientSecret,
      //   type: "authorized_user",
      //   refresh_token: token,
      // });
      // console.log({ _res });
      const { credentials } = (await gcRefreshAccessToken(token)) || {
        credentials: { id_token: null, access_token: null },
      };
      res.json({
        sessionToken: credentials.id_token,
        refreshToken: credentials.access_token,
      });
    } catch (er: any) {
      console.log(er);
      next(new AppError(STATUS_CODES.UN_AUTHORIZED, er.message));
    }
  }
}

const authController = new AuthController();

export default authController;
