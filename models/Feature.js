const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Eits, isi dulu judul"],
  },
  qty: {
    type: Number,
    min: [0, "Gak boleh kurang dari satu ya"],
    required: [true, "Eits, isi dulu jumlahnya"],
  },
  imageUrl: {
    type: String,
    required: [true, "Eits, isi dulu icon"],
  },
  itemId: {
    type: ObjectId,
    ref: "Item",
  },
});

const Feature = mongoose.model("Feature", featureSchema);

module.exports = Feature;
