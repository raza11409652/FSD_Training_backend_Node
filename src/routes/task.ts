import { Router } from "express";
import taskController from "../controller/task.controller";
import { createNewTaskBodyPayload } from "../midlleware/validators/task.validator";

const taskRoutes = Router();
// Get list of tasks
taskRoutes.get("/", taskController.getTaskList);
// Get single project details
taskRoutes.get("/:id", () => {});
//Update task Details
taskRoutes.put("/:id", () => {});
//Delete single task
taskRoutes.delete("/:id", taskController.deleteTask);
//Create new Task
taskRoutes.post("/", createNewTaskBodyPayload, taskController.createNewTask);

export default taskRoutes;
