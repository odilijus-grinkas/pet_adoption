import { Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dropzoneRouter = Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Accept all file types
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Handle file upload
dropzoneRouter.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    console.log("upload");
    if (!req.file) {
      // No file uploaded
      return res.status(400).send("No file uploaded");
    }
    try {
      // Save uploaded file details to the database using Prisma
      const savedPhoto = await prisma.photo.create({
        data: {
          post_id: req.body.post_id, // Sending post_id in the request body
          photo: req.file.filename, // Save the filename of the uploaded photo
        },
      });

      console.log("File uploaded and saved to database:", savedPhoto);
      res.send("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("Internal server error");
    }
  }
);

export default dropzoneRouter;
