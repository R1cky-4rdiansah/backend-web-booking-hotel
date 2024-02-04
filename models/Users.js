const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Isi dulu usernamenya"],
  },
  password: {
    type: String,
    required: [true, "Isi dulu passwordya"],
  },
});

usersSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }
      console.log("HASH: ", hash);
      user.password = hash;
      console.log("USER.PASSWORD: ", user.password);
      next();
    });
  });
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
