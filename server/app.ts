import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";

import bodyParser from "body-parser";
import dropzoneRouter from "./routes/DropzoneRouter";
import postsRouter from "./routes/PostRouter";
import userRouter from "./routes/UserRouter";

// import main from "./prisma/seed";

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

const port = process.env.PORT || 3001;

// Enable CORS (to allow localhost:3000 to use APIs)
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  }
);

// async function seeding() {
//   try {
//     await main();
//     console.log('Database seeded successfully');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//   }
// }
// seeding();

app.use("/api", postsRouter);
app.use("/api", userRouter);
app.use("/", dropzoneRouter);

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
