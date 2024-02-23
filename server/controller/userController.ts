import {PrismaClient} from "@prisma/client";

const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
      const AllPosts = await PostClient.findMany({
      })
      res.status(200).json({ data: AllPosts });
  } catch (err) {
      console.log(err);
      res.status(500).json({ status: "error", message: "Serverio klaida" });
  }
};


export {getAllUsers}