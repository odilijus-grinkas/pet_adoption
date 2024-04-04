import { createPost, deletePost, getAllPosts, getFilteredPosts, getOnePost, updatePost } from "../controller/PostController";
import { createValidation, updateValidation } from "../requests/PostRequest";

import { Router } from "express";
import authToken from "../utils/authToken";

const postsRouter = Router()

postsRouter.get("/post/all", getAllPosts)
postsRouter.get("/post/owned/:id", getAllPosts)

postsRouter.get("/post/all/:filter", getFilteredPosts)

postsRouter.get("/post/:id", getOnePost)

postsRouter.post("/post/create/regular", authToken, createValidation, async (req: any, res: any) => {
    createPost(req, res, 4)
})

postsRouter.post("/post/create/plus", authToken, createValidation, async (req: any, res: any) => {
    createPost(req, res, 3)
})

postsRouter.put("/post/:id", authToken, updateValidation, updatePost)

postsRouter.delete("/post/:id", authToken, deletePost)

export default postsRouter