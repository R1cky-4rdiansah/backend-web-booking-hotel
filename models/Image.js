const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Eits, isi dulu foto"],
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
