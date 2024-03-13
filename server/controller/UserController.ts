import express from "express";
import { PrismaClient } from "@prisma/client";
import _, { take } from "underscore";
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Returns permission id: 1=regular, 2=userPlus, 3=mod, 4=admin
 * @param id:number
 */
const getUserPermissions = async (id: number) => {
  const user: any = await prisma.user.findFirst({
    where: { id: id },
    include: { user_role: true },
  });
  if (user == null) {
    return -1;
  } else {
    return user.user_role[0].role_id;
  }
};
/**
 * Fetches id, username & roles of every user INCLUDING user_role object that contains role_id parameter.
 * role_id can be either: 1 (regular user), 2 (userPlus), 3 (moderator), 4 (admin)
 * Can only be used by mod/admin roles
 */
const getAllUsers = async (req: express.Request, res: express.Response) => {
  if (req.tokenInfo !== undefined && req.tokenInfo.role_id < 3)
    return res.status(403).json({ message: "Access denied." });
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        user_role: true,
      },
    });
    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};
/**
 * Fetches 1 user's id and username based on id parameter.
 * Body requires: id
 * Can only be used by user to whom data belongs or mod/admin
 */
const getOneUser = async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  if (
    req.tokenInfo !== undefined &&
    req.tokenInfo.role_id <= 2 &&
    req.tokenInfo.id != id
  )
    return res.status(403).json({ message: "Access denied." });
  try {
    const users = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        user_role: true,
      },
    });
    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};
/**
 * Creates new user while assigning them role id 1.
 * Body requires: username, password, email
 */
const createUser = async (
  req: express.Request,
  res: express.Response,
  roleLevel: number
) => {
  if (req.tokenInfo) {
    const routePath = req.originalUrl;
    if (
      routePath == "/api/user/create/mod" ||
      routePath == "/api/user/create/admin"
    ) {
      // Doesn't allow non-admins to create mods/admins
      if (!(req.tokenInfo.role_id < 4)) {
        return res.status(403).json({ message: "Access denied." });
      }
    } else {
      // Doesn't allow non-admins/mods to create plus users
      if (!(req.tokenInfo.role_id < 3))
        return res.status(403).json({ message: "Access denied." });
    }
  }
  try {
    const postData = req.body;
    const username = String(postData.username);
    const password = String(postData.password);
    const passwordHash = await bcrypt.hash(password, 5);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: passwordHash,
        email: postData.email,
      },
    });
    // assign level 1 role
    await prisma.user_role.create({
      data: {
        user_id: newUser.id,
        role_id: roleLevel,
      },
    });
    res.status(200).json({ status: "OK" });
  } catch (err: any) {
    if (err.code == "P2002") {
      res.status(403).json({ message: "User already exists." });
    } else {
      console.log(err);
      res.status(500).json({ message: "Serverio klaida." });
    }
  }
};
/**
 * Updates user based on id.
 * Body requires: id, username, email, password
 * Only user to whom data belongs or admin/mod can update user.
 */
const updateUser = async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  const postData = req.body;
  if (
    req.tokenInfo !== undefined &&
    req.tokenInfo.role_id <= 2 &&
    req.tokenInfo.id != id
  )
    return res.status(403).json({ message: "Access denied." });
  const newPasswordHash = await bcrypt.hash(String(postData.password), 5);
  try {
    const users = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: postData.username,
        password: newPasswordHash,
        email: postData.email,
      },
    });
    res.status(200).json({ status: "OK" });
  } catch (err: any) {
    if (err.code == "P2002") {
      res.status(403).json({ message: "Username or Email already exists." });
    } else {
      console.log(err);
      res.status(500).json({ message: "Serverio klaida." });
    }
  }
};
/**
 * Deletes user based on id
 * Body requires: id
 * Only user to whom account belongs or admin/mod can delete user.
 */
const deleteUser = async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  if (
    req.tokenInfo !== undefined &&
    req.tokenInfo.role_id <= 2 &&
    req.tokenInfo.id != id
  )
    return res.status(403).json({ message: "Access denied." });
  try {
    const users = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ status: "OK" });
  } catch (err: any) {
    if (err.code == "P2025") {
      res.status(500).json({ message: "User does not exist." });
    } else {
      console.log(err);
      res.status(500).json({ message: "Serverio klaida." });
    }
  }
};
/**
 * Returns user's id and token if credentials are correct
 * Body requires: username, password
 */
const loginUser = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  const password = req.body.password;
  // Check if username/password doesn't exist
  if (!username || !password) {
    res.status(403).json({ message: "Username or Password absent." });
    return;
  }
  try {
    const user: any = await prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        user_role: true,
      },
    });
    if (_.isEmpty(user)) {
      res.status(403).json({ message: "User does not exist." });
    } else {
      const correctPassword = await bcrypt.compare(
        String(password),
        user.password
      );
      if (correctPassword) {
        // If login successful, sends id & token containing id & role_id
        let token = jwt.sign(
          { id: user.id, role_id: user.user_role[0].role_id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1d", // Specify how long until token expires.
          }
        );
        res.status(200).json({ id: user.id, token: token });
      } else {
        res.status(403).json({ message: "Wrong password." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};

export {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserPermissions,
};
