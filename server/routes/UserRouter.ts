import { Router } from "express";
import * as UserController from "../controller/UserController";
import authToken from "../utils/authToken";

const userRouter = Router();

userRouter.get("/user/all", authToken, UserController.getAllUsers);
userRouter.get("/user/:id", authToken, UserController.getOneUser);
userRouter.post("/login", UserController.loginUser);

// post methods for creating a new user with different roles (only admin creates mods/admins, both admin & mod create plus)
userRouter.post("/user/create/regular", async (req, res) => {
  UserController.createUser(req, res, 4);
});
userRouter.post("/user/create/plus", authToken, async (req, res) => {
  UserController.createUser(req, res, 3);
});
userRouter.post("/user/create/mod", authToken, async (req, res) => {
  UserController.createUser(req, res, 2);
});
userRouter.post("/user/create/admin", authToken, async (req, res) => {
  UserController.createUser(req, res, 1);
});

userRouter.put("/user/:id", authToken, UserController.updateUser);
userRouter.delete("/user/:id", authToken, UserController.deleteUser);

export default userRouter;
