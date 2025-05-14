import { Router } from "express";
import taskController from "../controller/task.controller";
import {
  createNewTaskBodyPayload,
  updateTaskBodyPayload,
} from "../midlleware/validators/task.validator";
import allowedRoles from "../midlleware/auth/role.validator";

const taskRoutes = Router();
// Get list of tasks
taskRoutes.get(
  "/",
  allowedRoles(["ADMIN", "TASK_CREATOR", "USER"]),
  taskController.getTaskList
);
// Get single project details
taskRoutes.get(
  "/:id",
  // allowedRoles(["ADMIN", "TASK_CREATOR", "USER"]),
  taskController.getSingleTask
);
//Update task Details
taskRoutes.put(
  "/:id",
  // allowedRoles(["ADMIN", "TASK_CREATOR", "USER"]),
  updateTaskBodyPayload,
  taskController.updateTask
);
//Delete single task
taskRoutes.delete("/:id", allowedRoles(["ADMIN"]), taskController.deleteTask);
//Create new Task
taskRoutes.post(
  "/",
  allowedRoles(["ADMIN", "TASK_CREATOR"]),
  createNewTaskBodyPayload,
  taskController.createNewTask
);

export default taskRoutes;
