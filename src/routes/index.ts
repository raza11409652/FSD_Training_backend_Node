import { Router } from "express";
import projectRoutes from "./project";
import taskRoutes from "./task";

const appRoutes = Router();

appRoutes.use("/projects", projectRoutes);
appRoutes.use("/tasks", taskRoutes);

appRoutes.get("/", (_, res) => {
  res.send("OK");
});
export default appRoutes;
