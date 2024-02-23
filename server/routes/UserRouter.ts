import { Router } from "express";
import * as UserController from "../controller/UserController";

const userRouter = Router();

userRouter.get("/user/all", UserController.getAllUsers);
userRouter.get("/user/:id", UserController.getOneUser);
userRouter.get("/login", UserController.loginUser);
userRouter.post("/user/create-regular", UserController.createRegularUser);
userRouter.put("/user/:id", UserController.updateUser);
userRouter.delete("/user/delete", UserController.deleteUser);

export default userRouter;