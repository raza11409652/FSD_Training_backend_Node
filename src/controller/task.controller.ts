import { NextFunction, Response } from "express";
import { AppRequest } from "../types/request";
import taskService from "../service/task.service";
import { QueryParam } from "../types";
import { getPagination, getPaginationData } from "../utils/pagination";

class TaskController {
  async createNewTask(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const result = await taskService.newTask(req.body);
      res.jsonp(result);
    } catch (er) {
      next(er);
    }
  }

  async getTaskList(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as QueryParam;
      const { limit, skip } = getPagination(query.page || 1, query.size || 10);
      const { records, count } = await taskService.getTasks({}, limit, skip);
      //   res.json({ limit, skip });
      const response = getPaginationData(count, query.page, limit, records);
      res.jsonp(response);
    } catch (e) {
      next(e);
    }
  }

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
}
const taskController = new TaskController();
export default taskController;
