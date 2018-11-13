const express = require("express");
const mongoose = require("mongoose");

const auth = require("./routes/api/auth");
const posts = require("./routes/api/posts");

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

// Use routes from routes folder
app.use("/api/auth", auth);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));
