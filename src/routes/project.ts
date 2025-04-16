import { Router } from "express";
import projectController from "../controller/project.controller";
import allowedRoles from "../midlleware/auth/role.validator";

const projectRoutes = Router();
// Get list of projects
projectRoutes.get("/", projectController.getListOfProjects);
// Get single project details
projectRoutes.get("/:id", () => {});
//Update project Details
projectRoutes.put("/:id", allowedRoles(["ADMIN"]), () => {});
//Delete single project
projectRoutes.delete("/:id", allowedRoles(["ADMIN"]), () => {});
//Create new project
projectRoutes.post(
  "/",
  allowedRoles(["ADMIN"]),
  projectController.newProjectCreation
);

export default projectRoutes;
