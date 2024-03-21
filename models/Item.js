const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  title: {
    type: String,
    required: [true, "Eits, isi dulu judulnya"],
  },
  price: {
    type: Number,
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
    default: false,
  },
  description: {
    type: String,
    required: [true, "Eits, isi dulu deskripsinya"],
  },
  unit: {
    type: String,
    default: "malam",
  },
  sumBooking: {
    type: Number,
    default: 0,
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
