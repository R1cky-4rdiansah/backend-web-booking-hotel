const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Eits, isi dulu judulnya"],
  },
  price: {
    type: String,
    required: [true, "Eits, isi dulu harganya"],
  },
  country: {
    type: String,
    default: "Indonesia",
  },
  city: {
    type: String,
    required: [true, "Eits, isi dulu nama kotanya"],
  },
  isPopular: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Eits, isi dulu deskripsinya"],
  },
  imageId: [
    {
      type: ObjectId,
      ref: "Image",
    },
  ],
  featureId: [
    {
      type: ObjectId,
      ref: "Feature",
    },
  ],
  activityId: [
    {
      type: ObjectId,
      ref: "Activity",
    },
  ],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
