import { Router } from "express";
import userController from "../controller/user.controller";
import { updateUserProfile } from "../midlleware/validators/user.validator";

const userRoutes = Router();

userRoutes.get("/", userController.handleGetUserList);
userRoutes.put("/:id", updateUserProfile, userController.handleUpdateUserProfile);

export default userRoutes;
