import { Router } from "express";
import projectController from "../controller/project.controller";
import allowedRoles from "../midlleware/auth/role.validator";
import {
  createNewProjectBodyPayload,
  updateProjectBodyPayload,
} from "../midlleware/validators/project.validator";

const projectRoutes = Router();
// Get list of projects
projectRoutes.get("/", projectController.getListOfProjects);
// Get single project details
projectRoutes.get("/:id", projectController.getSingleProject);
//Update project Details
projectRoutes.put(
  "/:id",
  allowedRoles(["ADMIN"]),
  updateProjectBodyPayload,
  projectController.updateProject
);
//Delete single project
projectRoutes.delete(
  "/:id",
  allowedRoles(["ADMIN"]),
  projectController.deleteProject
);
//Create new project
projectRoutes.post(
  "/",
  allowedRoles(["ADMIN"]),
  createNewProjectBodyPayload,
  projectController.newProjectCreation
);

export default projectRoutes;
