import { Router } from "express";
import * as UserController from "../controller/UserController";

const userRouter = Router();

userRouter.get("/user/all", UserController.getAllUsers);
userRouter.get("/user/:id", UserController.getOneUser);
userRouter.get("/login", UserController.loginUser);

// post methods for creating a new user with different roles
userRouter.post("/user/create/regular", async (req, res) => {
  UserController.createUser(req, res, 1);
});
userRouter.post("/user/create/plus", async (req, res) => {
  UserController.createUser(req, res, 2);
});
userRouter.post("/user/create/mod", async (req, res) => {
  UserController.createUser(req, res, 3);
});
userRouter.post("/user/create/admin", async (req, res) => {
  UserController.createUser(req, res, 4);
});

userRouter.put("/user/:id", UserController.updateUser);
userRouter.delete("/user/delete", UserController.deleteUser);

export default userRouter;
