const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Eits, isi dulu nama depan kamu"],
  },
  lastName: {
    type: String,
    required: [true, "Eits, isi dulu nama belakang kamu"],
  },
  email: {
    type: String,
    required: [true, "Eits, isi dulu email kamu"],
  },
  handphone: {
    type: String,
    required: [true, "Eits, isi dulu nomor handphone kamu"],
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
