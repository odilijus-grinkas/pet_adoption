import express from "express";
import { PrismaClient } from "@prisma/client";
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
 */
const createRegularUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const postData = req.body;
    console.log("HIII");
    console.log(req.body);
    await prisma.user.create({
      data: {
        // id: postData.id,
        username: postData.name,
        password: postData.password,
        email: postData.email,
      },
    });
    // assign level 1 role
    await prisma.user_role.create({
      data: {
        user_id: postData.user_id,
        role_id: 1,
      },
    });
    res.status(200).json({ status: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};
/**
 * Updates user based on id.
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};
/**
 * Deletes user based on id
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverio klaida." });
  }
};
const loginUser = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
}
export { getAllUsers, getOneUser, createRegularUser, updateUser, deleteUser, loginUser };
