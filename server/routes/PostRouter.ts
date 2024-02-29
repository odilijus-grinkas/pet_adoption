import { Router } from "express";

import { getAllPosts, getOnePost, createPost, updatePost, deletePost } from "../controller/PostController";
import { createValidation, updateValidation } from "../requests/PostRequest";

const postsRouter = Router()

postsRouter.get("/post/all", getAllPosts)
postsRouter.get("/post/:id", getOnePost)
postsRouter.post("/post/create", createValidation, createPost)
postsRouter.put("/post/:id", updateValidation, updatePost)
postsRouter.delete("/post/:id", deletePost)

export default postsRouter