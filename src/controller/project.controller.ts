import { NextFunction, Response } from "express";
import { AppRequest } from "../types/request";
import { QueryParam } from "../types";
import projectService from "../service/project.service";
import { getPagination, getPaginationData } from "../utils/pagination";
import taskService from "../service/task.service";

/**
 *Projects end point related controllers
 */
class ProjectController {
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async getListOfProjects(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const query: QueryParam = req.query as unknown as QueryParam;
      const { limit, skip } = getPagination(query.page || 1, query.size || 10);
      const { records, counts } = await projectService.getRecords(limit, skip);
      const response = getPaginationData(counts, query.page, limit, records);
      res.json(response);
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
  async newProjectCreation(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const name = req.body?.["name"];
      const description = req.body?.["description"];
      const createdBy = req.payload?.id;

      const result = await projectService.saveProject({
        name,
        description,
        createdBy,
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
  async getSingleProject(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const taskId = req.params?.["id"];
      const response = await projectService.getProject(Number(taskId));
      res.json(response);
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
  async deleteProject(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const taskId = req.params?.["id"];
      const response = await projectService.updateProject(Number(taskId), {
        isDeleted: true,
      });
      taskService
        .updateTaskUsingFilter({ project: Number(taskId) }, { isDeleted: true })
        .then((a) => console.log(`task updated`, a));
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
  async updateProject(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const taskId = req.params?.["id"];
      const response = await projectService.updateProject(
        Number(taskId),
        req.body
      );
      res.json({ count: response[0] });
    } catch (er) {
      next(er);
    }
  }
}

const projectController = new ProjectController();
export default projectController;
