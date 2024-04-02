import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

// Enable CORS (to allow localhost:3000 to use APIs)
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  }
);

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
app.post(
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

// Serve static files from the 'uploads' directory
app.use(express.static("../uploads")); // Adjust the path accordingly

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    // Multer error
    res.status(400).send("Multer error: " + err.message);
  } else {
    // Other errors
    res.status(500).send("Internal server error");
  }
});

export default app;
