import { Router } from "express";
import authController from "../controller/auth.controller";

const authRoutes = Router();
authRoutes.get("/gcp-login", authController.handleGCPLogin);
authRoutes.get("/gcp-redirects", authController.handleGCPRedirects);

export default authRoutes;
