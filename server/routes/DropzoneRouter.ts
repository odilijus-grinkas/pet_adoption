import { Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";
import cors from "cors"; // Import the cors middleware
import fs from "fs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dropzoneRouter = Router();

// Enable CORS for all routes
dropzoneRouter.use(cors());

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // Extract the timestamp from the original filename using regex
    const timestampMatch = file.originalname.match(/^(\d+)-/);
    // Check if a timestamp is found
    const timestamp = timestampMatch ? timestampMatch[1] : Date.now();
    // Get the file extension
    const extension = file.originalname.split('.').pop();
    // Concatenate timestamp and extension to form the new filename
    const newFilename = `${timestamp}.${extension}`;
    // Pass the new filename to the callback
    cb(null, newFilename);
  },
});


const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Check if the file mimetype starts with 'image/'
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limit file size to 10MB
  }
});

// Handle file upload
dropzoneRouter.post(
  "/upload/:id", // Update the route to include the postId parameter
  upload.single("photo"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      // No file uploaded
      return res.status(400).send("No file uploaded");
    }
    try {
      const postId = req.params.id; // Get post_id from the URL
      
      // Save uploaded file details to the database using Prisma
      const savedPhoto = await prisma.photo.create({
        data: {
          post_id: parseInt(postId), // Set the post_id from the URL
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

dropzoneRouter.delete("/delete/:filename", async (req: Request, res: Response) => {
  const { filename } = req.params;
  try {
    // Construct the file path relative to the current working directory
    const filePath = `./uploads/${filename}`;

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file from the file system
      fs.unlinkSync(filePath);
      // Remove the file entry from the database using Prisma
      await prisma.photo.deleteMany({
        where: {
          photo: filename,
        },
      });
      // Respond with success message
      res.status(200).json({ message: "File deleted successfully" });
    } else {
      // If the file doesn't exist, respond with a 404 error
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Internal server error");
  }
});


export default dropzoneRouter;
