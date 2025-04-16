import { NextFunction, Request, Response } from "express";
import { gcAuthentication } from "../google-cloud";
import gcValidateTokenAuth from "../google-cloud/core/validate.token";
import { decodeJWTToken } from "../utils/jwt";
import { GCPJWTTokenPayload } from "../types";
import userService from "../service/user.service";
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
        // This case will not happened
        // if (payload.azp !== appConfig.gcp.clientId)
        //   throw new Error("client ID Mismatched");
        // const obj = { email: payload.email };
        // !! case 1 -
        // Scenario on this is a new user
        let userData = await userService.getUserByEmail(payload.email);
        if (!userData) {
          // Need to create user
          userData = await userService.newUser({
            name: payload.name,
            profileImage: payload.picture,
            email: payload.email,
          });
        }
        // console.log({id:userData})

        res.send(userData);
      } else {
        throw new Error("Code is not found in the query param");
      }
    } catch (e) {
      //   console.log("ERROR", e);
      next(e);
    }
  }
}
const authController = new AuthController();
export default authController;
