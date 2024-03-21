const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
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
  firstName: {
    type: String,
    // required: [true, "Eits, isi dulu nama depan kamu"],
  },
  lastName: {
    type: String,
    // required: [true, "Eits, isi dulu nama belakang kamu"],
  },
  email: {
    type: String,
    required: [true, "Eits, isi dulu email kamu"],
  },
  handphone: {
    type: String,
    // required: [true, "Eits, isi dulu nomor handphone kamu"],
  },
});

memberSchema.methods.verifyPassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
