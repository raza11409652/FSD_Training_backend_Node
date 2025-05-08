import { NextFunction, Response } from "express";
import { QueryParam } from "../types";
import { AppRequest } from "../types/request";
import { getPagination, getPaginationData } from "../utils/pagination";
import userService from "../service/user.service";
import { STATUS_CODES } from "../error-handler/appError";

class UserController {
  async handleGetUserList(req: AppRequest, res: Response) {
    // return
    const query = req.query as unknown as QueryParam;
    const { limit, skip } = getPagination(query.page || 1, query.size || 10);
    const { records, counts } = await userService.getRecords(limit, skip, {});
    const response = getPaginationData(counts, query.page, limit, records);
    res.json(response);
  }
  async handleUpdateUserProfile(
    req: AppRequest,
    res: Response,
    next: NextFunction
  ) {
    // res.json(req.body);
    try {
      if (req.body) {
        const response = await userService.updateUser(
          Number(req.params.id),
          req.body
        );
        res.json(response?.[0]);
      } else {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "Invalid request" });
      }
    } catch (er) {
      next(er);
    }
  }
}

const userController = new UserController();
export default userController;
