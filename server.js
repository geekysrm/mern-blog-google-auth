const express = require("express");
const mongoose = require("mongoose");

const app = express();

// MongoDB configuration
const db = require("./config/keys").mongoURI;

// Use mongoose to connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err));

app.get("/", (req, res) =>
  res.send("Welcome to MERN stack blog with google oauth")
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));
