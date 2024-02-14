import { Router } from "express";

import { getAllPosts } from "../controller/PostsController";

const postsRouter = Router()

postsRouter.get("/", getAllPosts)

export default postsRouter