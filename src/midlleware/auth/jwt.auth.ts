import { NextFunction, Response } from "express";
import { AppError, STATUS_CODES } from "../../error-handler/appError";
import { validateJWTToken } from "../../utils/jwt";
import { AppRequest } from "../../types/request";
import { JWTToken } from "../../types";
import userService from "../../service/user.service";

const jwtAuthValidationSession = async (
  req: AppRequest,
  _: Response,
  next: NextFunction
) => {
  try {
    const authToken = (req.headers?.["Authorization"] ||
      req.headers?.["authorization"]) as string;
    if (authToken) {
      const hTokens = authToken.split(" ");
      if (hTokens?.[0] !== "Bearer") {
        throw new Error("Invalid session type");
      }
      const t = hTokens?.[1];
      const payload = validateJWTToken(t);

      const obj = payload as JWTToken;
      const userData: { [key: string]: any } | null =
        await userService.getUserByEmail(obj.email);
      // console.log()
      req.payload = {
        ...obj,
        role: userData?.["role"] || (userData?.dataValues?.role as string),
      };
      // console.log(req.payload);
      next();
    } else {
      next(new AppError(STATUS_CODES.UN_AUTHORIZED, "Header token not found"));
    }
  } catch (er) {
    next(new AppError(STATUS_CODES.UN_AUTHORIZED, "Invalid session"));
  }
};
export { jwtAuthValidationSession };
