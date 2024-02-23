import express from "express"
import { PrismaClient } from '@prisma/client'
const PostClient = new PrismaClient().post

function validDate() {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 2);
    return currentDate.toISOString();
}

let ValidDate = validDate();

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

export const getOnePost = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;

        const OnePost = await PostClient.findUnique({
            where: {
                id: parseInt(id)
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

export const createPost = async (req: express.Request, res: express.Response) => {
    try {
        let postData = req.body
        const CreatedPost = await PostClient.create({
            data: {
                user_id: postData.user_id,
                city_id: postData.city_id,
                pet_name: postData.pet_name,
                description: postData.description,
                created: new Date(),
                status: postData.status,
                valid_until: ValidDate
            }
        })
        res.status(200).json({ data: CreatedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};

export const updatePost = async (req: express.Request, res: express.Response) => {
    try {
        const Id = req.params.id
        const newUserID = req.body.user_id
        const newCityID = req.body.city_id
        const newPetName = req.body.pet_name
        const newDescription = req.body.description
        const newStatus = req.body.status

        const UpdatedPost = await PostClient.update({
            where: {
                id: parseInt(Id)
            },
            data: {
                user_id: newUserID,
                city_id: newCityID,
                pet_name: newPetName,
                description: newDescription,
                status: newStatus
            }
        })
        res.status(200).json({ data: UpdatedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};

export const deletePost = async (req: express.Request, res: express.Response) => {
    try {
        const Id = req.params.id
        const deletedPost = await PostClient.delete({
            where: {
                id: parseInt(Id)
            }
        })
        res.status(200).json({ data: deletedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};