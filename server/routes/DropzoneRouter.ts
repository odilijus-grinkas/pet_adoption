import { Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dropzoneRouter = Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
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
  "/upload",
  upload.single("photo"), // Use 'photo' instead of 'file'
  async (req: Request, res: Response) => {
    if (!req.file) {
      // No file uploaded
      return res.status(400).send("No file uploaded");
    }
    try {
      // Save uploaded file details to the database using Prisma
      const postId = req.body.postId;
      const savedPhoto = await prisma.photo.create({
        data: {
          // Assuming post_id is sent in the request body
          post_id: postId,
          // Save the filename of the uploaded photo
          photo: req.file.filename,
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
