import { NextFunction, Request, Response } from "express";
import { body, matchedData, validationResult } from "express-validator";
import { AppRequest } from "../../types/request";

export const createNewTaskBodyPayload = [
  body("title")
    .isString()
    .withMessage("Title is required and should be a valid String"),
  body("description").isString().optional().withMessage("Invalid description"),
  body("project").isNumeric().withMessage("Project is required"),
  body("assignedTo")
    .isNumeric()
    .optional()
    .withMessage("User id should be a number"),
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

export const updateTaskBodyPayload = [
  body("title")
    .isString()
    .optional()
    .withMessage("Title is required and should be a valid String"),
  body("description").isString().optional().withMessage("Invalid description"),
  body("project").optional().isNumeric().withMessage("Project is invalid"),
  body("status")
    .optional()
    .isString()
    .custom((val) => {
      const status = ["CREATED", "IN PROGRESS", "ON HOLD", "COMPLETED"];
      // console.log(role);
      return status.includes(val);
    })
    .withMessage("Status is invalid"),
  body("assignedTo")
    .isNumeric()
    .optional()
    .withMessage("User id should be a number"),
  body("dueDate").isDate().optional().withMessage("Should be a valid Date"),
  (req: AppRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      res.status(400).jsonp({ error: true, errors });
    } else {
      const payloadSession = req?.["payload"];
      const role = payloadSession?.["role"];
      console.log({ role });
      if (role && role === "USER") {
        req.body = { status: req.body.status };
      } else {
        req.body = matchedData(req);
      }
      next();
    }
  },
];
