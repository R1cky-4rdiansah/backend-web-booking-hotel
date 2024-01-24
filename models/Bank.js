const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  nameBank: {
    type: String,
    required: [true, "Eits, isi dulu nama bank"],
  },
  noRekening: {
    type: String,
    required: [true, "Eits, isi dulu nomor rekening"],
  },
  name: {
    type: String,
    required: [true, "Eits, isi dulu nama penransfer"],
  },
});

const Bank = mongoose.model("Bank", bankSchema);

module.exports = Bank;
