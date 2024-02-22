import { Router } from "express";

import { getAllPosts, getOnePost, createPost, updatePost, deletePost } from "../controller/PostController";

const postsRouter = Router()

postsRouter.get("/", getAllPosts)
postsRouter.get("/:id", getOnePost)
postsRouter.post("/", createPost)
postsRouter.put("/:id", updatePost)
postsRouter.delete("/:id", deletePost)

export default postsRouter