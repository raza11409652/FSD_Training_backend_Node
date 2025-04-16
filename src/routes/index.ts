import { Router } from "express";
import projectRoutes from "./project";
import taskRoutes from "./task";
import authRoutes from "./auth";

const appRoutes = Router();

appRoutes.use("/projects", projectRoutes);
appRoutes.use("/tasks", taskRoutes);
// auth is a public accessible URL End Points
appRoutes.use("/auth", authRoutes);

appRoutes.get("/", (_, res) => {
  res.send("OK");
});
export default appRoutes;
