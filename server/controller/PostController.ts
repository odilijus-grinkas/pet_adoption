import express from "express"
import { PrismaClient } from '@prisma/client'
const PostClient = new PrismaClient().post
import { postValidation } from "../requests/PostRequest";
import { parse } from "path";
const jwt = require("jsonwebtoken");

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
        })
        res.status(200).json({ data: AllPosts });
    } catch (err) {
        console.log(err);
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
 * Body requires: user_id,city_id,species_id,pet_name,description,status
 */
export const createPost = async (
    req: any,
    res: any,
    roleLevel: number
) => {
    try {
        const [post, valid, messages] = postValidation(req);
        if (!valid) {
            return res.status(400).json({
                status: "fail",
                message: "Validacijos klaida",
                error_messages: messages,
            });
        }

        const routePath = req.originalUrl;
        const userId = parseInt(req.tokenInfo.id);
        const userPostCount = await PostClient.count({
            where: { user_id: userId },
        });

        if (routePath === "/api/post/create/mod" || routePath === "/api/post/create/admin" || routePath === "/api/post/create/plus") {
            if (req.tokenInfo.role_id === 1) {
                return res.status(403).json({ message: "Access denied." });
            }
        }

        if (routePath === "/api/post/create/regular" && userPostCount >= 3) {
            return res.status(400).json({
                status: "fail",
                message: "You have reached the maximum number of posts allowed.",
            });
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

export const updatePost = async (req: any, res: express.Response) => {
    const postId = parseInt(req.params.id);
    const [post, valid, messages] = postValidation(req);

    if (!valid) {
        return res.status(400).json({
            status: "fail",
            message: "Validacijos klaida",
            error_messages: messages,
        });
    }

    try {
        // Find the post
        const existingPost = await PostClient.findUnique({
            where: { id: postId },
            select: { user_id: true }
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Check if the current user is the post creator or has sufficient privileges
        const userId = existingPost.user_id;
        // const userRoleId = req.tokenInfo.role_id;
        // const currentUserId = req.tokenInfo.id;

        if (req.tokenInfo.role_id <= 2 && req.tokenInfo.id != userId) return res.status(401).json({ message: "Access denied." })

        // Update the post
        const updatedPost = await PostClient.update({
            where: { id: postId },
            data: {
                city_id: parseInt(post.city_id),
                species_id: parseInt(post.species_id),
                pet_name: post.pet_name,
                description: post.description,
                status: post.status
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
 */
export const deletePost = async (req: any, res: express.Response) => {
    const Id = req.params.id
    const onepost = await PostClient.findUnique({
        where: { id: parseInt(Id) },
    });
    if (onepost) {
        const userId = onepost.user_id;
        if (req.tokenInfo.role_id <= 2 && req.tokenInfo.id != userId) return res.status(401).json({ message: "Access denied." })
    }
    try {
        const postId = parseInt(req.params.id);
        const deletedPost = await PostClient.delete({
            where: {
                id: postId
            }
        });
        if (deletedPost) {
            res.status(200).json({ data: deletedPost });
        } else {
            res.status(404).json({ status: "error", message: "Post not found" });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};