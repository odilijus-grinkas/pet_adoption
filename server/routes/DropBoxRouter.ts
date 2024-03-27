import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";

import path from "path";

const app = express();
const PORT = 3001;

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
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
  // Accept only certain file types
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false); // Pass null for the error parameter and false to reject the file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Handle file upload
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  console.log(req.file); // This should log the uploaded file details
  res.send("File uploaded successfully");
});

// Serve static files from the 'uploads' directory
app.use(express.static("uploads"));

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
