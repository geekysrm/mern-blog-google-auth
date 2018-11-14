const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
  }
});

module.exports = User = mongoose.model("users", UserSchema);

// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const userSchema = new Schema({
//   googleId: String,
//   email: String,
//   facebookId: String,
//   name: String
// });
// mongoose.model("users", userSchema);
