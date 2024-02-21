import { Router } from "express";

import { getAllPosts } from "../controller/PostController";

const postsRouter = Router()

postsRouter.get("/", getAllPosts)

export default postsRouter