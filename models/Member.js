const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

// memberSchema.methods.verifyPassword = async function (password) {
//   const user = this;
//   const isMatch = await bcrypt.compare(password, user.password);
//   return isMatch;
// };

// memberSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password") || user.isNew) {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       const hash = await bcrypt.hash(user.password, salt);
//       user.password = hash;
//       next();
//     } catch (err) {
//       return next(err);
//     }
//   } else {
//     return next();
//   }
// });

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
