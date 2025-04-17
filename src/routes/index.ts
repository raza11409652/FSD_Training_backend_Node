import { Router } from "express";
import projectRoutes from "./project";
import taskRoutes from "./task";
import authRoutes from "./auth";
import { jwtAuthValidationSession } from "../midlleware/auth/jwt.auth";

const appRoutes = Router();

appRoutes.use("/projects", jwtAuthValidationSession, projectRoutes);
appRoutes.use("/tasks", jwtAuthValidationSession, taskRoutes);
// auth is a public accessible URL End Points
appRoutes.use("/auth", authRoutes);

appRoutes.get("/", (_, res) => {
  res.send("OK");
});
export default appRoutes;
