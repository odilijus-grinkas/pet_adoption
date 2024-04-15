import {
  // createPost,
  deletePost,
  getAllCities,
  getAllSpeciesCharacteristicsAndOptions,
  getAllUserPosts,
  getFilteredPosts,
  getOnePost,
  updatePost,
  createCity,
  createPostwithOptions,
  // updatePostwithOptions
} from "../controller/PostController";
import { createValidation, updateValidation } from "../requests/PostRequest";

import { Router } from "express";
import authToken from "../utils/authToken";

const postsRouter = Router();

postsRouter.get("/post/all/:filter", getFilteredPosts);

postsRouter.get("/post/test/:species", getAllSpeciesCharacteristicsAndOptions);

postsRouter.get("/post/cities", getAllCities);

postsRouter.get("/post/owned/:id", getAllUserPosts);

postsRouter.get("/post/:id", getOnePost);

// postsRouter.post(
//   "/post/create/regular",
//   authToken,
//   createValidation,
//   async (req: any, res: any) => {
//     createPost(req, res, 4);
//   }
// );

// postsRouter.post(
//   "/post/create/plus",
//   authToken,
//   createValidation,
//   async (req: any, res: any) => {
//     createPost(req, res, 3);
//   }
// );

postsRouter.post(
  "/post/create/regular",
  authToken,
  createValidation,
  async (req: any, res: any) => {
    createPostwithOptions(req, res, 4);
  }
);

postsRouter.post(
  "/post/create/plus",
  authToken,
  createValidation,
  async (req: any, res: any) => {
    createPostwithOptions(req, res, 3);
  }
);

postsRouter.post("/post/createCity", authToken, createCity);

postsRouter.put("/post/:id", authToken, updateValidation, updatePost);
// postsRouter.put("/post/:id", authToken, updateValidation, updatePostwithOptions);

postsRouter.delete("/post/:id", authToken, deletePost);

export default postsRouter;
