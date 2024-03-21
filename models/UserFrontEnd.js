const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchemaFE = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username harus diisi"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password harus diisi"],
  },
  email: {
    type: String,
    required: [true, "Email harus diisi"],
  },
});

userSchemaFE.methods.verifyPassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

const UserFE = mongoose.model("UsersFE", userSchemaFE);

module.exports = UserFE;
