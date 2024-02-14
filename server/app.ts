//const db = require("./config/mysql.js");
import express from "express";
import postsRoute from "./src/routes/PostRouter";
//const express = require("express");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
//import postsRouter from "./src/routes/PostRouter"

const app = express();

const port = process.env.PORT || 3001;

// Enable CORS (to allow localhost:3000 to use APIs)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Uncomment once database is added.
// Passing database connection, so that there's only 1 open pool on the whole server

// app.use((req, res, next) => {
//   req.db = db;
//   next();
// });

app.use("/", postsRoute)

// async function h1() {
//   // const results = await prisma.post.findMany();
//   const results = await prisma.post.findMany({
//     include: {
//       user: true,
//       city: true,
//     },
//   });
//   console.log(results);
// }
// h1();

//added to check if server works, delete later.
app.get("/", (req, res) => {
  res.send(200);
});

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});