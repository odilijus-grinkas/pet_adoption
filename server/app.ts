import express from "express";
import db from "./config/mysql";
import { Pool } from "mysql2/promise";
import postsRouter from "./routes/PostRouter";

const app = express();

const port = process.env.PORT || 3001;

//test prisma 👇 delete this
// import testPrisma from "./prisma-test-query";
// testPrisma();

// Enable CORS (to allow localhost:3000 to use APIs)
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

declare module 'express-serve-static-core' {
  interface Request {
    db: Pool;
  }
}

// Passing database connection, so that there's only 1 open pool on the whole server
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.db = db;
  next();
});

//added to check if server works, delete later.
// app.get("/", (req: express.Request, res: express.Response) => {
//   res.sendStatus(200);
// });

app.use("/", postsRouter)

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
