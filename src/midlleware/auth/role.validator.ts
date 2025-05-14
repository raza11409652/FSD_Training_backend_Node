import { NextFunction, Response } from "express";
import { AppRequest } from "../../types/request";
import { AppError, STATUS_CODES } from "../../error-handler/appError";
import { UserRole } from "../../types";

const allowedRoles = (roles: UserRole[] | "*") => {
  return (req: AppRequest, _: Response, next: NextFunction) => {
    try {
      const sessionRole = req.payload?.role as UserRole;
      // console.log(sessionRole);
      if (Array.isArray(roles) === false && roles === "*") {
        next();
      } else if (roles.includes(sessionRole)) {
        next();
      } else {
        next(new AppError(STATUS_CODES.FORBIDDEN, "Resource is forbidden"));
      }
    } catch (er) {
      next(er);
    }
  };
};
export default allowedRoles;
