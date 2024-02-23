import express from "express";
import { PrismaClient } from "@prisma/client";
import _ from "underscore";
const prisma = new PrismaClient();

/**
 * Fetches full data of every user.
 */
const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};
/**
 * Fetches 1 user based on id parameter.
 * Body requires: id
 */
const getOneUser = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  try {
    const users = await prisma.user.findUnique({
      where: { id: parseInt(id) },
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
const createRegularUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const postData = req.body;
    const newUser = await prisma.user.create({
      data: {
        username: postData.username,
        password: postData.password,
        email: postData.email,
      },
    });
    // assign level 1 role
    await prisma.user_role.create({
      data: {
        user_id: newUser.id,
        role_id: 1,
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
 */
const updateUser = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const postData = req.body;
  try {
    const users = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        username: postData.username,
        password: postData.password,
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
 */
const deleteUser = async (req: express.Request, res: express.Response) => {
  const postData = req.body;
  try {
    const users = await prisma.user.delete({
      where: {
        id: parseInt(postData.id),
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
 * Returns user id if credentials are correct (will be token later)
 * Body requires: username, password
 */
const loginUser = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user: any = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (_.isEmpty(user)) {
      res.status(403).json({ message: "User does not exist." });
    } else {
      if (password == user.password) {
        res.status(200).json({ id: user.id });
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
  createRegularUser,
  updateUser,
  deleteUser,
  loginUser,
};
