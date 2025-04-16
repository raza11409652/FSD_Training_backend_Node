import { Router } from "express";
import authController from "../controller/auth.controller";
import { jwtAuthValidationSession } from "../midlleware/auth/jwt.auth";

const authRoutes = Router();
authRoutes.get("/gcp-login", authController.handleGCPLogin);
authRoutes.get("/gcp-redirects", authController.handleGCPRedirects);
authRoutes.get(
  "/profile",
  jwtAuthValidationSession,
  authController.getUserProfile
);
// authRoutes.get(
//     "/profile",
//     jwtAuthValidationSession,
//     authController.getUserProfile
//   );

export default authRoutes;
