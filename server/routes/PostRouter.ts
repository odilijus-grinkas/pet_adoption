import { Request, Response } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getFilteredPosts,
  getOnePost,
  updatePost,
} from "../controller/PostController";
import { createValidation, updateValidation } from "../requests/PostRequest";

import { Router } from "express";
import authToken from "../utils/authToken";

const postsRouter = Router();

// Get all posts or posts owned by a user
postsRouter.get("/post/all", getAllPosts);
postsRouter.get("/post/owned/:id", getAllPosts);

// Get filtered posts
postsRouter.get("/post/all/:filter", getFilteredPosts);

// Get one post by id
postsRouter.get("/post/:id", getOnePost);

// Create regular post
postsRouter.post(
  "/post/create/regular",
  authToken,
  createValidation,
  async (req: Request, res: Response) => {
    createPost(req, res, 4); // Pass species_id for regular posts
  }
);

// Create plus post
postsRouter.post(
  "/post/create/plus",
  authToken,
  createValidation,
  async (req: Request, res: Response) => {
    createPost(req, res, 3); // Pass species_id for plus posts
  }
);

// Update post
postsRouter.put("/post/:id", authToken, updateValidation, updatePost);

// Delete post
postsRouter.delete("/post/:id", authToken, deletePost);

export default postsRouter;
