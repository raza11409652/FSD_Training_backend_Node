import { NextFunction, Request, Response } from "express";
import { body, matchedData, validationResult } from "express-validator";

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
      req.body = matchedData(req);
      next();
    }
  },
];

export const createUserProfile = [
  body("role")
    .isString()
    .withMessage("Role is invalid")
    .custom((val, {}) => {
      const allowed = ["ADMIN", "TASK_CREATOR", "USER"];
      return allowed.includes(val);
    }),
  body("name").isString().withMessage("Name  should be in string format"),
  body("email")
    .isEmail()
    .custom((val: string) => {
      const emailSplits = val.split("@");
      const domain = emailSplits?.[1] || "";
      // console.log({ domain });
      const allowedDomain = ["gmail.com", "tigeranalytics.com"];
      return allowedDomain.includes(domain);
    })
    .withMessage("Email  should be in string format and valid email"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      res.status(400).jsonp({ error: true, errors });
    } else {
      req.body = matchedData(req);
      next();
    }
  },
];
