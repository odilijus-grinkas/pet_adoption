import { Router } from "express";

import { getAllPosts, getOnePost, createPost, updatePost, deletePost } from "../controller/PostController";

const postsRouter = Router()

postsRouter.get("/post/all", getAllPosts)
postsRouter.get("/post/:id", getOnePost)
postsRouter.post("/post/create", createPost)
postsRouter.put("/post/:id", updatePost)
postsRouter.delete("/post/:id", deletePost)

export default postsRouter