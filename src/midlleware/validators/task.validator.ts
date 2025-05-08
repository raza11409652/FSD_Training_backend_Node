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

export const updateTaskBodyPayload = [
  body("title")
    .isString()
    .optional()
    .withMessage("Title is required and should be a valid String"),
  body("description")
    .isString()
    .optional()
    .withMessage("Latitude is required in number"),
  body("project").optional().isNumeric().withMessage("Project is invalid"),
  body("status")
    .optional()
    .isString()
    .custom((val, { req }) => {
      const status = ["CREATED", "IN PROGRESS", "ON HOLD", "COMPLETED"];
      const payloadSession = req?.["payload"];
      const role = payloadSession?.["role"];
      if (role && role === "USER") {
        req.body = { status };
      }
      console.log(role);
      return status.includes(val);
    })
    .withMessage("Project is invalid"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      res.status(400).jsonp({ error: true, errors });
    } else {
      next();
    }
  },
];
