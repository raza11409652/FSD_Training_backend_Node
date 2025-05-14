import { Router } from "express";
import userController from "../controller/user.controller";
import {
  updateUserProfile,
  createUserProfile,
} from "../midlleware/validators/user.validator";
import allowedRoles from "../midlleware/auth/role.validator";

const userRoutes = Router();

userRoutes.get("/", allowedRoles(["ADMIN"]), userController.handleGetUserList);
userRoutes.put(
  "/:id",
  allowedRoles(["ADMIN"]),
  updateUserProfile,
  userController.handleUpdateUserProfile
);
userRoutes.post(
  "/",
  allowedRoles(["ADMIN"]),
  createUserProfile,
  userController.createUserProfile
);

export default userRoutes;
