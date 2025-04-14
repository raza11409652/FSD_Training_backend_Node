import { NextFunction, Response } from "express";
import { AppRequest } from "../types/request";
import { QueryParam } from "../types";
import projectService from "../service/project.service";
import { getPagination, getPaginationData } from "../utils/pagination";

/**
 *Projects end point related controllers
 */
class ProjectController {
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

  async newProjectCreation(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const name = req.body?.["name"];
      const result = await projectService.saveProject({ name });
      res.jsonp(result);
    } catch (er) {
      next(er);
    }
  }
}

const projectController = new ProjectController();
export default projectController;
