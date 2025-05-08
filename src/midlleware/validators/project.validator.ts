import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const createNewProjectBodyPayload = [
  body("name")
    .isString()
    .withMessage("name is required and should be a valid String"),
  body("description")
    .isString()
    .optional()
    .withMessage("Description should be in string format"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      res.status(400).jsonp({ error: true, errors });
    } else {
      next();
    }
  },
];

export const updateProjectBodyPayload = [
  body("name")
    .isString()
    .optional()
    .withMessage("name is required and should be a valid String"),
  body("description")
    .isString()
    .optional()
    .withMessage("Description should be in string format"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      res.status(400).jsonp({ error: true, errors });
    } else {
      next();
    }
  },
];
