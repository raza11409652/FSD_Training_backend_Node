import { Request } from "express";
import { JWTToken } from ".";
// import { QueryParam } from ".";

export interface AppRequest extends Request {
  payload?: JWTToken;
}
