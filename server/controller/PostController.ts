import express from "express"
import { PrismaClient } from '@prisma/client'
const PostClient = new PrismaClient().post
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
export const createPost = async (req: express.Request, res: express.Response) => {
    const [post, valid, messages] = postValidation(req);
    if (valid) {
        try {
            const CreatedPost = await PostClient.create({
                data: {
                    user_id: parseInt(post.user_id),
                    city_id: parseInt(post.city_id),
                    species_id: parseInt(post.species_id),
                    pet_name: post.pet_name,
                    description: post.description,
                    created: new Date(),
                    status: post.status,
                    valid_until: ValidDate
                }
            })
            res.status(200).json({ data: CreatedPost });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: "error", message: "Serverio klaida" });
        }
    } else {
        res.status(400).json({
            status: "fail",
            message: "Validacijos klaida",
            error_messages: messages,
        });
    }
};
/**
 * Updates post based on id
 * Body requires: id, user_id,city_id,species_id,pet_name,description,status
 */
export const updatePost = async (req: express.Request, res: express.Response) => {
    const [post, valid, messages] = postValidation(req);
    const Id = req.params.id
    if (valid) {
        try {
            const UpdatedPost = await PostClient.update({
                where: {
                    id: parseInt(Id)
                },
                data: {
                    user_id: parseInt(post.user_id),
                    city_id: parseInt(post.city_id),
                    species_id: parseInt(post.species_id),
                    pet_name: post.pet_name,
                    description: post.description,
                    status: post.status
                }
            })
            res.status(200).json({ data: UpdatedPost });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: "error", message: "Serverio klaida" });
        }
    } else {
        res.status(400).json({
            status: "fail",
            message: "Validacijos klaida",
            error_messages: messages,
        });
    }
};
/**
 * Deletes post based on id
 * Body requires: id
 */
export const deletePost = async (req: express.Request, res: express.Response) => {
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