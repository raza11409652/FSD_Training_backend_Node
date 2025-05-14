import { NextFunction, Response } from "express";
import { AppRequest } from "../types/request";
import taskService from "../service/task.service";
import { QueryParam } from "../types";
import { getPagination, getPaginationData } from "../utils/pagination";

class TaskController {
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async createNewTask(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const result = await taskService.newTask({
        ...req.body,
        createdBy: req.payload?.id,
      });
      res.jsonp(result);
    } catch (er) {
      next(er);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param next
   */

  async getTaskList(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as QueryParam;
      const project = req.query?.project || undefined;
      const { limit, skip } = getPagination(query.page || 1, query.size || 10);
      const { records, count } = await taskService.getTasks(
        {
          ...(project && { project: Number(project) }),
        },
        limit,
        skip
      );
      //   res.json({ limit, skip });
      const response = getPaginationData(count, query.page, limit, records);
      res.jsonp(response);
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async deleteTask(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const taskId = req.params?.["id"];
      const result = await taskService.deleteTask(Number(taskId));
      //   console.log({ taskId });
      res.send({ result });
    } catch (er) {
      next(er);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async updateTask(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const taskId = req.params?.["id"];
      // console.log(req.body);
      const response = await taskService.updateTask(Number(taskId), req.body);
      res.json({ count: response[0] });
    } catch (er) {
      next(er);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async getSingleTask(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const taskId = req.params?.["id"];
      const response = await taskService.getTask(Number(taskId));
      res.json(response);
    } catch (er) {
      next(er);
    }
  }
}
const taskController = new TaskController();
export default taskController;
