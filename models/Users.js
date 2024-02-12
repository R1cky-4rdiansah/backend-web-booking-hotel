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
  if (user.isModified("password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
