import express from "express"
const { PrismaClient } = require("@prisma/client");
const PostClient = new PrismaClient().post

export const getAllPosts = async (req: express.Request, res: express.Response) => {
    try {
        const AllPosts = await PostClient.findMany({
            include: {
                user: true,
                city: true
            }
        })
        res.status(200).json({ data: AllPosts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
}