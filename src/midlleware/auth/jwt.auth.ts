import { NextFunction, Response } from "express";
import { AppError, STATUS_CODES } from "../../error-handler/appError";
import { validateJWTToken } from "../../utils/jwt";
import { AppRequest } from "../../types/request";
import { JWTToken } from "../../types";

const jwtAuthValidationSession = (
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
      req.payload = payload as JWTToken;
      next();
    } else {
      next(new AppError(STATUS_CODES.UN_AUTHORIZED, "Header token not found"));
    }
  } catch (er) {
    next(new AppError(STATUS_CODES.UN_AUTHORIZED, "Invalid session"));
  }
};
export { jwtAuthValidationSession };
