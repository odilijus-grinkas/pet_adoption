import express from "express"
import { PrismaClient } from '@prisma/client'
const PostClient = new PrismaClient().post
const FilterClient = new PrismaClient().post_option
import { postValidation } from "../requests/PostRequest";

function validDate() {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 2);
    return currentDate.toISOString();
}

let ValidDate = validDate();


/**
 * Fetches full data of every post.
 */
export const getAllPosts = async (req: express.Request, res: express.Response) => {
    try {
        const AllPosts = await PostClient.findMany({
            include: {
                species: true,
                city: true
            }
        })
        res.status(200).json({ data: AllPosts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};
export const getFilteredPosts = async (req: express.Request, res: express.Response) => {
    try {
        const param = req.params;
        const filtered = param.filter.split('&');


        // Query the database using the extracted filter value
        const FilteredPosts = await FilterClient.findMany({
            include: {
                post: { include: { species: true, city: true } },
                option: true
            },
            where: {
                option: {
                    value: {
                        in: filtered
                    }
                }
            }
        });

        // Send the filtered posts in the response
        res.status(200).json({ data: FilteredPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};
/**
 * Fetches 1 post based on id parameter.
 * Body requires: id
 */
export const getOnePost = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;

        const OnePost = await PostClient.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                user: true,
                city: true,
                species: true
            }
        })
        if (OnePost) {
            res.status(200).json({ data: OnePost });
        } else {
            res.status(404).json({ status: "error" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};
/**
 * Creates new post while assigning them incremented id
 * Body requires: city_id,species_id,pet_name,description
 * Normal user can create 3 posts. Admins, mods and plus users can create unlimited posts.
 */
export const createPost = async (
    req: express.Request,
    res: express.Response,
    roleLevel: number
) => {
    try {
        const [post, valid, messages] = postValidation(req);
        if (!valid) {
            return res.status(400).json({
                message: "Validacijos klaida",
                error_messages: messages,
            });
        }

        const routePath = req.originalUrl;
        let userId: number;

        if (req.tokenInfo !== undefined) {
            userId = req.tokenInfo.id;
        } else {
            return
        }

        const userPostCount = await PostClient.count({
            where: { user_id: userId },
        });

        if (routePath === "/api/post/create/plus") {
            if (req.tokenInfo !== undefined && req.tokenInfo.role_id === 1) {
                return res.status(403).json({ message: "Access denied." });
            }
        }

        if (routePath === "/api/post/create/regular" && userPostCount >= 3) {
            return res.status(400).json({
                message: "You have reached the maximum number of posts allowed.",
            });
        }

        if (req.tokenInfo !== undefined && req.tokenInfo.role_id === 1) {
            post.status = 0;
        } else {
            post.status = 1;
        }

        const CreatedPost = await PostClient.create({
            data: {
                user_id: userId,
                city_id: parseInt(post.city_id),
                species_id: parseInt(post.species_id),
                pet_name: post.pet_name,
                description: post.description,
                created: new Date(),
                status: post.status,
                valid_until: new Date(),
            },
        });

        res.status(200).json({ data: CreatedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};
/**
 * Updates post based on id
 * Body requires: id, city_id, species_id, pet_name, description
 * Only user to whom data belongs or admin/mod can update post.
 */
export const updatePost = async (req: express.Request, res: express.Response) => {
    const postId = parseInt(req.params.id);
    const [post, valid, messages] = postValidation(req);

    if (!valid) {
        return res.status(400).json({
            message: "Validacijos klaida",
            error_messages: messages,
        });
    }

    try {
        const existingPost = await PostClient.findUnique({
            where: { id: postId },
            select: { user_id: true }
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found." });
        }

        const userId = existingPost.user_id;

        if (req.tokenInfo !== undefined && req.tokenInfo.role_id <= 2 && req.tokenInfo.id != userId) return res.status(401).json({ message: "Access denied." })

        const updatedPost = await PostClient.update({
            where: { id: postId },
            data: {
                city_id: parseInt(post.city_id),
                species_id: parseInt(post.species_id),
                pet_name: post.pet_name,
                description: post.description
            }
        });

        res.status(200).json({ data: updatedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};

/**
 * Deletes post based on id
 * Body requires: id
 * Only user to whom data belongs or admin/mod can delete post.
 */
export const deletePost = async (req: express.Request, res: express.Response) => {
    try {
        const Id = req.params.id;
        const onepost = await PostClient.findUnique({
            where: { id: parseInt(Id) },
        });

        if (!onepost) {
            return res.status(404).json({ status: "error", message: "Post not found" });
        }

        const userId = onepost.user_id;
        if (req.tokenInfo !== undefined && req.tokenInfo.role_id <= 2 && req.tokenInfo.id != userId) {
            return res.status(401).json({ message: "Access denied." });
        }

        const postId = parseInt(req.params.id);
        const deletedPost = await PostClient.delete({
            where: { id: postId }
        });

        if (deletedPost) {
            return res.status(200).json({ data: deletedPost });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};