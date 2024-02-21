import { getAll } from "../models/PostModel";
import express from "express"

export const getAllPosts = async (req: express.Request, res: express.Response) => {
    try {
        const [posts] = await getAll(req.db);
        res.status(200).json({ data: posts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Serverio klaida" });
    }
};