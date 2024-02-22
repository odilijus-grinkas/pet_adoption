const express = require("express");
const db = require("./config/mysql.js");

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
app.use((req, res, next) => {
  req.db = db;
  next();
});

//added to check if server works, delete later.
app.get("/", (req, res) => {
  res.send(200);
});

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
