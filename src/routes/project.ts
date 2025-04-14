import { Router } from "express";
import projectController from "../controller/project.controller";

const projectRoutes = Router();
// Get list of projects
projectRoutes.get("/", projectController.getListOfProjects);
// Get single project details
projectRoutes.get("/:id", () => {});
//Update project Details
projectRoutes.put("/:id", () => {});
//Delete single project
projectRoutes.delete("/:id", () => {});
//Create new project
projectRoutes.post("/", projectController.newProjectCreation);

export default projectRoutes;
