import { Router } from "express";

import { getAllPosts, getOnePost, createPost, updatePost, deletePost } from "../controller/PostController";
import { createValidation, updateValidation } from "../requests/PostRequest";
import authToken from "../utils/authToken";

const postsRouter = Router()

postsRouter.get("/post/all", getAllPosts)

postsRouter.get("/post/:id", getOnePost)

postsRouter.post("/post/create/regular", authToken, createValidation, async (req: any, res: any) => {
    createPost(req, res, 4)
})

postsRouter.post("/post/create/plus", authToken, createValidation, async (req: any, res: any) => {
    createPost(req, res, 3)
})

postsRouter.post("/post/create/mod", authToken, createValidation, async (req: any, res: any) => {
    createPost(req, res, 2)
})

postsRouter.post("/post/create/admin", authToken, createValidation, async (req: any, res: any) => {
    createPost(req, res, 1)
})

postsRouter.put("/post/:id", authToken, updateValidation, updatePost)

postsRouter.delete("/post/:id", authToken, deletePost)

export default postsRouter