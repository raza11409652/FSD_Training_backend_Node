import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const createNewTaskBodyPayload = [
  body("title")
    .isString()
    .withMessage("Title is required and should be a valid String"),
  body("description")
    .isString()
    .optional()
    .withMessage("Latitude is required in number"),
  body("project").isNumeric().withMessage("Project is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      res.status(400).jsonp({ error: true, errors });
    } else {
      next();
    }
  },
];
