const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const auth = require("./routes/api/auth");
const posts = require("./routes/api/posts");

require("./models/User.js");

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["somesecretsauce"]
  })
);

// MongoDB configuration
const db = require("./config/keys").mongoURI;

// Use mongoose to connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require("./config/passport");

//Use routes from routes folder
//app.use("/api/auth", auth);
//app.use("/api/posts", posts);

require("./routes/api/auth.js")(app);
require("./routes/api/posts.js")(app);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));
