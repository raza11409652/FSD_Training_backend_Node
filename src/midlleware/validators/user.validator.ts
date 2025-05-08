import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const updateUserProfile = [
  body("role")
    .optional()
    .isString()
    .withMessage("Role is invalid")
    .custom((val, {}) => {
      const allowed = ["ADMIN", "TASK_CREATOR", "USER"];
      return allowed.includes(val);
    }),
  body("name")
    .isString()
    .optional()
    .withMessage("Name  should be in string format"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      res.status(400).jsonp({ error: true, errors });
    } else {
      next();
    }
  },
];
