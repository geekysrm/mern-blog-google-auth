const express = require("express");

const app = express();

app.get("/", (req, res) =>
  res.send("Welcome to MERN stack blog with google oauth")
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));
