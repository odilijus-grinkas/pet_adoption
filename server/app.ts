import express from "express";
import postsRouter from "./routes/PostRouter";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

// Enable CORS (to allow localhost:3000 to use APIs)
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.get("/", (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
});

app.use("/api", postsRouter)

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
