import { NextFunction, Response } from "express";
import { AppError, STATUS_CODES } from "../../error-handler/appError";
import { AppRequest } from "../../types/request";
import userService from "../../service/user.service";
import { validateGoogleIdToken } from "../../google-cloud/core/validate.token";

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
      const payload = await validateGoogleIdToken(t);
      const userData: { [key: string]: any } | null =
        await userService.getUserByEmail(payload.email);
      if (!userData) throw new Error("Invalid request");
      req.payload = {
        email: payload.email,
        role: userData?.["role"],
        type: "SESSION",
        id: userData?.id,
      };
      next();
    } else {
      next(new AppError(STATUS_CODES.UN_AUTHORIZED, "Header token not found"));
    }
  } catch (er) {
    next(new AppError(STATUS_CODES.UN_AUTHORIZED, "Invalid session"));
  }
};
export { jwtAuthValidationSession };
