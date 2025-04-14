import { Request } from "express";
// import { QueryParam } from ".";

export interface AppRequest extends Request {
  payload?: { [key: string]: any };
}
