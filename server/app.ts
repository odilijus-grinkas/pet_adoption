import express from "express";
import bodyParser from "body-parser";
import postsRouter from "./routes/PostRouter";
import userRouter from "./routes/UserRouter";
import main from "./prisma/seed";

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

// Enable CORS (to allow localhost:3000 to use APIs)
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

async function seeding() {
  try {
    await main();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
seeding();


app.use("/api", postsRouter)
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
